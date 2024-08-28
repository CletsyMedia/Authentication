import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Input from "../../components/ui/Input";
import { Eye, EyeOff, Lock, Loader, Mail } from "lucide-react";
import { useAuthStore } from "../../zustand/store/authStore";
import toast from "react-hot-toast";

const LoginScreen = () => {
  const navigate = useNavigate();
  const { login, error, isLoading } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
      toast.success("Login successful");
    } catch (error) {
    }

    
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isButtonDisabled = isLoading || !email || !password;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg p-8 rounded-xl shadow-sm overflow-hidden h-full mx-2 relative"
    >
      <div className="sm:p-2 md:p-8">
        <h2 className="sm:text-xl md:text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Welcome Back
        </h2>
        <form onSubmit={handleLogin}>
          <Input 
            placeholder="Enter email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={Mail}  
          />

          <div className="relative">
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
          {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-1">
              <input 
                id="remember" 
                type="checkbox" 
                defaultChecked 
                className="checkbox checkbox-xs rounded border-gray-500 [--chkbg:theme(colors.green.600)] [--chkfg:white] checked:border-green-800" 
              />
              <label htmlFor="remember" className="text-gray-400 cursor-pointer">Remember me</label>
            </div>

            <span 
              className="text-green-500 text-sm hover:underline cursor-pointer"
              onClick={() => navigate('/forgot-password')}
            >
              Forgot Password?
            </span>
          </div>

          <motion.button 
            className="custom-btn disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isButtonDisabled}
          >
            {isLoading ? <Loader className="animate-spin inline-block mr-2" /> : "Login"}
          </motion.button>
        </form>
      </div>
      <div className="absolute bottom-0 left-0 right-0 w-full px-8 py-3 bg-gray-900 bg-opacity-50 flex justify-center">
        <p className="text-gray-400 text-sm">
          Don't have an account?{' '}
          <span 
            className="cursor-pointer hover:underline text-green-500"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </span>
        </p>
      </div>
    </motion.div>
  );
};

export default LoginScreen;
