import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import { useAuthStore } from "../../zustand/store/authStore";
import toast from "react-hot-toast";

const VerifyEmailOTP = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const { error, isLoading, verifyEmail } = useAuthStore();

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/[^0-9]/.test(value)) return;

    const newOtp = otp.slice();
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (e, index) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text');
    const pastedOtp = pasteData.split("").filter(char => /[0-9]/.test(char)).slice(0, 6);

    const newOtp = otp.slice();
    for (let i = 0; i < pastedOtp.length; i++) {
      newOtp[i] = pastedOtp[i];
    }
    setOtp(newOtp);

    if (pastedOtp.length && index + pastedOtp.length < 6) {
      inputRefs.current[index + pastedOtp.length].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (isLoading) return;

    try {
      await verifyEmail(otpValue);
      navigate('/');
      toast.success("Email verified successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Verification failed");
    }
  };

  // Determine if the button should be disabled
  const isButtonDisabled = isLoading || otp.some(digit => digit === "");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-sm w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg p-8 rounded-xl shadow-sm overflow-hidden h-full mx-2"
    >
      <h2 className="text-xl font-bold mb-6 text-center bg-gradient-to-r from-green-500 to-emerald-500 text-transparent bg-clip-text">
        Verify Your Email
      </h2>
      <div className="flex flex-col items-center justify-center gap-1">
        <small className="text-center">
          Enter the 6-digit code sent to your email
        </small>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex items-center justify-center gap-2 w-full mt-2">
            {Array(6)
              .fill("")
              .map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={otp[index]}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={(e) => handlePaste(e, index)}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className="w-10 h-10 text-xl text-center bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 placeholder-gray-400 transition-all duration-200"
                  aria-label={`OTP digit ${index + 1}`}
                />
              ))}
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <motion.button
            className="custom-btn disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isButtonDisabled}
          >
            {isLoading ? <Loader className="animate-spin mx-auto" /> : "Verify Email"}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default VerifyEmailOTP;
