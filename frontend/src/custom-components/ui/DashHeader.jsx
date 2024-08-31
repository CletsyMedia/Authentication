import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../zustand/store/authStore';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { getGreetings } from '../../utils/getGreeting';
import ThemeToggler from './ThemeToggler';
import Clock from './Clock';
import ProfileDrawer from '../../custom-components/ui/ProfileDrawer';
import { Bell } from 'lucide-react';

const DashHeader = () => {
  const { updateProfile, user } = useAuthStore();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [profileImage, setProfileImage] = useState(user?.profileImage || localStorage.getItem('profileImage') || '/default-profile.png');

  useEffect(() => {
    setName(user?.name || '');
    setEmail(user?.email || '');
    setProfileImage(user?.profileImage || localStorage.getItem('profileImage') || '/default-profile.png');
  }, [user]);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        localStorage.setItem('profileImage', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      await updateProfile(name);
      localStorage.setItem('profileImage', profileImage);
      localStorage.setItem('userName', name);
      localStorage.setItem('userEmail', email);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const greeting = getGreetings();

  return (
    <>
      <header className="fixed right-0 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-4 shadow-md w-full flex justify-between items-center z-30">
        <div className="custom-padding sm-max:pl-[3.3rem] sm-max:text-sm md:text-xl font-bold flex items-center gap-1">
          <p>{greeting}</p>
          <p className="clock-hide"> <Clock /></p>
        </div>
        <div className='flex items-center gap-2'> 
          <div className="relative">
            <button className="flex items-center justify-center p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors">
              <Bell className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>
            <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 bg-red-500 text-white text-xs font-semibold rounded-full -translate-x-1/2 translate-y-1/2">
              0
            </span>
          </div>

          {/* Theme Toggler */}
          <ThemeToggler />

          {/* Profile Drawer Button */}
          <button
            onClick={toggleDrawer}
            className="flex items-center space-x-2 bg-gray-200 dark:bg-gray-800 p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
          >
            <img
              src={profileImage}
              alt="Profile"
              className="w-8 h-8 rounded-full border-2 border-gray-400 dark:border-gray-600 object-cover cursor-pointer"
            />
          </button>
        </div>
      </header>

      {/* Profile Drawer Component */}
      <ProfileDrawer
        isOpen={isDrawerOpen}
        onClose={toggleDrawer}
        profileImage={profileImage}
        onProfileImageChange={handleProfileImageChange}
        name={name}
        onNameChange={setName}
        email={email}
        onEmailChange={setEmail} // Still passing in case of future use, but read-only in current implementation
        onSave={handleSave}
      />

      {/* Overlay */}
      {isDrawerOpen && (
        <div
          onClick={toggleDrawer}
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
        ></div>
      )}
    </>
  );
};

export default DashHeader;
