import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { motion } from "framer-motion";
import Input from "../../custom-components/ui/Input";
import { Eye, EyeOff, Lock, Loader, Mail, User } from "lucide-react";
import PasswordMeter from "../../custom-components/ui/PasswordMeter";
import { useAuthStore } from "../../zustand/store/authStore";

const SignUpScreen = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // const isLoading = false;
  const{ signUp, error, isLoading } = useAuthStore();
  const isButtonDisabled = isLoading || !name || !email || !password;
 

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signUp(name, email, password);
      navigate("/verify-email");
    } catch (error) {
      console.log(error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg p-8 rounded-xl shadow-sm overflow-hidden h-full mx-2"
    >
      <div className="sm:p-2 md:p-8">
        <h2 className="sm:text-xl md:text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Create Account
        </h2>
        <form onSubmit={handleSignUp}>

          <Input 
            placeholder="Full Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            icon={User}  
          />

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
            >
              {showPassword ? <Eye className="text-gray-500" /> : <EyeOff className="text-gray-500" />}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          {/* Password strength check */}
          <PasswordMeter password={password} />

          <motion.button 
            className="custom-btn disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isButtonDisabled}
          >
            {isLoading ? <Loader className="animate-spin inline-block mr-2" /> : "Sign Up"}
          </motion.button>
        </form>
      </div>
      <div className="absolute bottom-0 left-0 right-0 w-full px-8 py-3 bg-gray-900 bg-opacity-50 flex justify-center">
        <p className="text-gray-400 text-sm">Already have an account?{' '}<span className="cursor-pointer hover:underline text-green-500" onClick={() => navigate('/login')}>Sign In</span></p>
      </div>
    </motion.div>
  );
};

export default SignUpScreen;
