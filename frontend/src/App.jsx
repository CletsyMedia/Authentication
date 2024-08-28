import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import FloatingShape from "./components/ui/FloatingShape";
import SignUpScreen from "./pages/SignUpScreen";
import LoginScreen from "./pages/LoginScreen";
import VerifyEmailOTP from "./pages/VerifyEmailOTP";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./zustand/store/authStore";
import Dashboard from "./pages/Dashboard";
import LoadingSpinner from "./components/ui/LoadingSpinner";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

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

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Show loading or checking state while authentication status is being determined
  if (isCheckingAuth) {
    return (
      <div className="">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">
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
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
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
        {/* Catching all routes */}
        <Route
          path="*"
          element={
              <Navigate to="/" replace />
          }
        />
      </Routes>
      <Toaster position="top-right" />
    </div>
  );
};

export default App;
