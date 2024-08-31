import React, { useRef } from 'react';

const ProfileDrawer = ({ isOpen, onClose, profileImage, onProfileImageChange, name, onNameChange, email, onEmailChange, onSave }) => {
  const fileInputRef = useRef(null);

  const openFileChooser = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className={`fixed inset-y-0 right-0 z-40 transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-lg max-w-sm sm-max:max-w-3xl w-full`}>
      <div className="flex flex-col min-h-full">
        <div className="flex justify-end p-4">
          <button onClick={onClose} className="text-gray-800 dark:text-gray-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="flex flex-col items-center mb-4">
            <img
              src={profileImage}
              alt="Profile"
              className="w-24 h-24 rounded-full border-2 border-gray-400 dark:border-gray-600 mb-4 object-cover cursor-pointer"
              onClick={openFileChooser}
            />
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={onProfileImageChange}
            />
            <h2 className="text-xl font-semibold">{name || 'Username'}</h2>
          </div>
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Username"
              className="input input-bordered w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              value={email}
              readOnly
            />
            <input
              type="password"
              placeholder="***********"
              className="input input-bordered w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              readOnly
            />
            <button
              className="btn btn-primary text-white w-full"
              onClick={onSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDrawer;
