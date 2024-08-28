import React from "react";

const Input = ({ icon: Icon, ...props }) => {
  return (
    <div className="relative mb-6">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icon className="size-5 text-green-500" />
      </div>
      <input
        className="w-full bg-gray-800 bg-opacity-50 text-white rounded-lg pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 placeholder-gray-400 transition-all duration-200"
        {...props}
      />
    </div>
  );
};

export default Input;
