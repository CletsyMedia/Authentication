import React, { useState } from 'react';
import { 
  Home, 
  BarChart, 
  Package, 
  Users, 
  ShoppingCart, 
  Settings, 
  LogOut, 
  CircleChevronLeft, 
  CircleChevronRight 
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../zustand/store/authStore';
import ConfirmationModal from './ConfirmationModal';

const Sidebar = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const getLinkClass = (path) => {
    return location.pathname === path 
      ? 'flex items-center gap-2 p-2 rounded cursor-pointer bg-gray-300 dark:bg-gray-700 w-full'
      : 'flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 w-full';
  };

  return (
    <>
      <aside
        className={`bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-md flex flex-col transition-all duration-300 ease-in-out z-40 ${
          isOpen 
            ? 'lg:w-64 md:w-64 sm:w-64 w-64'
            : 'lg:w-64 md:w-16 sm:w-16 w-16'
        }`}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden absolute top-4 left-full -translate-x-full text-gray-600 dark:text-gray-300"
        >
          {isOpen ? <CircleChevronLeft /> : <CircleChevronRight />}
        </button>
        <div className="p-4 flex-1">
          <h1 className={`lg:opacity-100 text-2xl font-bold mb-6 pt-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            Dashboard
          </h1>
          <nav>
            <ul className='flex flex-col gap-4'>
              <li className={getLinkClass('/dashboard')}>
                <Link to="/dashboard" className="flex items-center gap-2 w-full">
                  <Home className={`w-5 h-5 ${isOpen ? 'w-6 h-6' : 'w-4 h-4'} text-blue-500`} />
                  <span className={`${isOpen ? 'block' : 'hidden'} lg:block`}>Overview</span>
                </Link>
              </li>
              <li className={getLinkClass('/dashboard/analytics')}>
                <Link to="/dashboard/analytics" className="flex items-center gap-2 w-full">
                  <BarChart className={`w-5 h-5 ${isOpen ? 'w-6 h-6' : 'w-4 h-4'} text-green-500`} />
                  <span className={`${isOpen ? 'block' : 'hidden'} lg:block`}>Analytics</span>
                </Link>
              </li>
              <li className={getLinkClass('/dashboard/products')}>
                <Link to="/dashboard/products" className="flex items-center gap-2 w-full">
                  <Package className={`w-5 h-5 ${isOpen ? 'w-6 h-6' : 'w-4 h-4'} text-purple-500`} />
                  <span className={`${isOpen ? 'block' : 'hidden'} lg:block`}>Products</span>
                </Link>
              </li>
              <li className={getLinkClass('/dashboard/users')}>
                <Link to="/dashboard/users" className="flex items-center gap-2 w-full">
                  <Users className={`w-5 h-5 ${isOpen ? 'w-6 h-6' : 'w-4 h-4'} text-teal-500`} />
                  <span className={`${isOpen ? 'block' : 'hidden'} lg:block`}>Users</span>
                </Link>
              </li>
              <li className={getLinkClass('/dashboard/orders')}>
                <Link to="/dashboard/orders" className="flex items-center gap-2 w-full">
                  <ShoppingCart className={`w-5 h-5 ${isOpen ? 'w-6 h-6' : 'w-4 h-4'} text-orange-500`} />
                  <span className={`${isOpen ? 'block' : 'hidden'} lg:block`}>Orders</span>
                </Link>
              </li>
              <li className={getLinkClass('/dashboard/settings')}>
                <Link to="/dashboard/settings" className="flex items-center gap-2 w-full">
                  <Settings className={`w-5 h-5 ${isOpen ? 'w-6 h-6' : 'w-4 h-4'} text-gray-500`} />
                  <span className={`${isOpen ? 'block' : 'hidden'} lg:block`}>Settings</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="p-4">
          <button 
            className="flex items-center gap-2 w-full p-2 rounded hover:bg-gray-300 dark:hover:bg-gray-700 text-red-500"
            onClick={() => setIsModalOpen(true)}
          >
            <LogOut className={`w-5 h-5 ${isOpen ? 'w-6 h-6' : 'w-4 h-4'} text-red-500`} />
            <span className={`${isOpen ? 'block' : 'hidden'} lg:block`}>Logout</span>
          </button>
        </div>
      </aside>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default Sidebar;
