import React from 'react'
import { motion } from 'framer-motion'
const LoadingSpinner = () => {
  return (
    <div className='min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900'>
      <motion.div 
      className="w-16 h-16 border-4 border-t-4 border-t-green-500 border-green-200 rounded-full"
      animate={{ rotate: 360 }}
      transition={{ loop: Infinity, duration: 1, ease: "linear" }}
      />
    </div>
  )
}

export default LoadingSpinner