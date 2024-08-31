import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Input from "../../custom-components/ui/Input";
import { Eye, EyeOff, Lock, Loader } from "lucide-react";
import { useAuthStore } from "../../zustand/store/authStore";
import toast from "react-hot-toast";

const ResetPasswordPage = () => {
  const { resetPassword, isLoading, error } = useAuthStore();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams(); // Use useParams to get the token from URL

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      await resetPassword(password, token); // Ensure the token is passed correctly
      toast.success("Password reset successful");
      navigate('/login');
    } catch (error) {
      toast.error("Password reset failed");
    }
  };

  // Determine if the button should be disabled
  const isButtonDisabled = isLoading || !password || !confirmPassword || password !== confirmPassword;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg p-8 rounded-xl shadow-sm overflow-hidden h-full mx-2 relative"
    >
      <div className="sm:p-2 md:p-8 flex flex-col items-center justify-center">
        <h2 className="sm:text-xl md:text-3xl mb-4 font-bold text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="relative mb-4">
            <Input 
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={Lock}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <Eye className="text-gray-500" /> : <EyeOff className="text-gray-500" />}
            </button>
          </div>
          <div className="relative mb-4">
            <Input 
              placeholder="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              icon={Lock}
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer"
              aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
            >
              {showConfirmPassword ? <Eye className="text-gray-500" /> : <EyeOff className="text-gray-500" />}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
          <motion.button 
            className={`custom-btn ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''} w-full`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isButtonDisabled}
          >
            {isLoading ? <Loader className="animate-spin inline-block mr-2" /> : "Set New Password"}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default ResetPasswordPage;
