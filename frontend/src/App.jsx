import React, { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import FloatingShape from "./custom-components/ui/FloatingShape";
import SignUpScreen from "./pages/SignUpScreen";
import LoginScreen from "./pages/LoginScreen";
import VerifyEmailOTP from "./pages/VerifyEmailOTP";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./zustand/store/authStore";
import Dashboard from "./pages/Dashboard";
import LoadingSpinner from "./custom-components/ui/LoadingSpinner";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { initializeGA } from "./utils/analytics";

// RedirectAuthUser Component
const RedirectAuthUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />;
  }
  return children;
};

// ProtectedRoute Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (!user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }
  return children;
};

const App = () => {
  const { isCheckingAuth, checkAuth } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    checkAuth();
    initializeGA();
  
    const handleRouteChange = () => {
      const path = location.pathname + location.search;
      if (window.gtag) {
        window.gtag('config', import.meta.env.VITE_GA_TRACKING_ID, {
          page_path: path,
        });
      }
    };
  
    handleRouteChange();
    return () => {
      handleRouteChange();
    };
  }, [checkAuth, location]); 

  // Show loading or checking state while authentication status is being determined
  if (isCheckingAuth) {
    return (
      <div className="">
        <LoadingSpinner />
      </div>
    );
  }

  // Determine if the current route is the Dashboard route
  const isDashboardRoute = location.pathname.startsWith('/dashboard');

  return (
    <div
      className={`min-h-screen w-full ${
        isDashboardRoute
          ? 'bg-white'
          : 'bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900'
      } flex items-center justify-center relative overflow-hidden`}
    >
      {/* Render FloatingShape components only if not on the Dashboard */}
      {!isDashboardRoute && (
        <>
          <FloatingShape
            color="bg-green-500"
            size="w-64 h-64"
            top="-5%"
            left="10%"
            delay={0}
          />
          <FloatingShape
            color="bg-green-500"
            size="w-48 h-48"
            top="70%"
            left="80%"
            delay={5}
          />
          <FloatingShape
            color="bg-green-500"
            size="w-32 h-32"
            top="40%"
            left="10%"
            delay={2}
          />
        </>
      )}
      <Routes>
        {/* Public Routes */}
        <Route
          path="/signup"
          element={
            <RedirectAuthUser>
              <SignUpScreen />
            </RedirectAuthUser>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectAuthUser>
              <LoginScreen />
            </RedirectAuthUser>
          }
        />
        <Route path="/verify-email" element={<VerifyEmailOTP />} />
        <Route
          path="/forgot-password"
          element={
            <RedirectAuthUser>
              <ForgotPassword />
            </RedirectAuthUser>
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            <RedirectAuthUser>
              <ResetPassword />
            </RedirectAuthUser>
          }
        />
        {/* Dashboard Route */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/* Catch-all Route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      <Toaster position="top-right" />
    </div>
  );
};

export default App;
