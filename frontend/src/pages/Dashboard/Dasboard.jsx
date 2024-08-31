import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DashboardHome from '../../custom-components/ui/DashHome';
import DashSidebar from '../../custom-components/ui/DashSidebar';
import DashHeader from '../../custom-components/ui/DashHeader';
import { ThemeProvider } from '../../context/ThemeContext';
import Analytics from '../../custom-components/ui/Analytics';
import Settings from '../../custom-components/ui/SettingsPage';
import ProductPage from '../../custom-components/ui/ProductsPage';
import UsersPage from '../../custom-components/ui/UsersPage';
import OrderPage from '../../custom-components/ui/OrderPage';

const Dashboard = () => {
  return (
    <ThemeProvider>
      <div className='dashboard-container flex min-h-screen w-full'>
        <DashSidebar />
        <div className="flex-1 flex flex-col custom-padding">
          <DashHeader />
          <main className="flex-1 p-4 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-sm mt-20">
            <Routes>
              <Route path="/" element={<DashboardHome />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/products" element={<ProductPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/orders" element={<OrderPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Dashboard;
