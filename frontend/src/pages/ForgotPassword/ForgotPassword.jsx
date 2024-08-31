import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Loader, MoveLeft } from "lucide-react";
import { useAuthStore } from "../../zustand/store/authStore";
import toast from "react-hot-toast";
import Input from "../../custom-components/ui/Input";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { passwordReset, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const handlePassword = async (e) => {
    e.preventDefault();
    try {
      await passwordReset(email);
      setIsSubmitted(true);
      toast.success("Password reset email sent");
    } catch (error) {
      toast.error("Failed to send password reset email");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg p-8 rounded-xl shadow-sm overflow-hidden h-full mx-2 relative"
    >
      <div className="sm:p-2 md:p-8">
        {isSubmitted ? (
          <div className="text-center">
            <h2 className="sm:text-xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
              Check Your Email
            </h2>
            <div className="flex items-center justify-center flex-col">
              <div className="size-14 my-3 rounded-full text-white bg-green-500 flex items-center justify-center">
                <Mail />
              </div>
              <p className="mb-4 text-center">
                If an account exists for <span>{email}</span>, a password reset
                link will be sent shortly.
              </p>
            </div>
          </div>
        ) : (
          <>
            <h2 className="sm:text-xl md:text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
              Forgot Password
            </h2>
            <p className="mb-4 text-center">
              Enter your email address and we'll send you a resetting password
              link.
            </p>
            <form onSubmit={handlePassword}>
              <Input
                placeholder="Enter email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={Mail}
              />
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}
              <motion.button
                className="custom-btn disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader className="animate-spin inline-block mr-2" />
                ) : (
                  "Send Reset Link"
                )}
              </motion.button>
            </form>
          </>
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 w-full px-8 py-3 bg-gray-900 bg-opacity-50 flex justify-center">
        <p
          className="flex items-center justify-center gap-1 cursor-pointer hover:text-opacity-95 text-green-500 text-md font-medium"
          onClick={() => navigate("/login")}
        >
          <MoveLeft /> Back to Login
        </p>
      </div>
    </motion.div>
  );
};

export default ForgotPassword;
