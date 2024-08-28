import React from 'react'
import { motion } from 'framer-motion'
import { useAuthStore } from '../../zustand/store/authStore'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    logout();
    navigate('/login');
  }
  return (
    <div>
      <form onSubmit={handleLogout}>
        <motion.button className="custom-btn">
          Logout
        </motion.button>
      </form>
    </div>
  )
}

export default Dashboard