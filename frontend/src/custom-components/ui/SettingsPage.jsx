import React, { useState } from 'react';
import { Bell, Shield, Plus, Trash2 } from 'lucide-react';
import googleIcon from '../../resources/images/google-icon.svg';
import facebookIcon from '../../resources/images/facebook.svg';

const Settings = () => {
  const [pushNotifications, setPushNotifications] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  return (
    <main className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      <h1 className="text-xl md:text-2xl lg:text-4xl font-bold mb-4 md:mb-6 text-left">Settings</h1>

      <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Bell className="w-6 h-6 text-blue-500 mr-2" />
          Notifications
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="sm-max:text-sm md:text-lg">Push Notifications</span>
            <input 
              type="checkbox"
              defaultChecked
              className="checkbox checkbox-lg sm-max:checkbox-sm sm-max:rounded border-gray-200 [--chkbg:theme(colors.blue.600)] [--chkfg:white] checked:border-blue-600" 
              checked={pushNotifications} 
              onChange={() => setPushNotifications(!pushNotifications)} 
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="sm-max:text-sm md:text-lg">Email Notifications</span>
            <input 
              type="checkbox"
              defaultChecked
              className="checkbox checkbox-lg sm-max:checkbox-sm sm-max:rounded border-gray-200 [--chkbg:theme(colors.blue.600)] [--chkfg:white] checked:border-blue-600" 
              checked={emailNotifications} 
              onChange={() => setEmailNotifications(!emailNotifications)} 
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="sm-max:text-sm md:text-lg">SMS Notifications</span>
            <input 
              type="checkbox"
              defaultChecked
              className="checkbox checkbox-lg sm-max:checkbox-sm sm-max:rounded border-gray-200 [--chkbg:theme(colors.blue.600)] [--chkfg:white] checked:border-blue-600" 
              checked={smsNotifications} 
              onChange={() => setSmsNotifications(!smsNotifications)} 
            />
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Shield className="w-6 h-6 text-green-500 mr-2" />
          Security
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="sm-max:text-sm md:text-lg">Two Factor Authentication</span>
            <input 
              type="checkbox"
              defaultChecked
              className="checkbox checkbox-lg sm-max:checkbox-sm sm-max:rounded border-gray-200 [--chkbg:theme(colors.blue.600)] [--chkfg:white] checked:border-blue-600" 
              checked={twoFactorAuth} 
              onChange={() => setTwoFactorAuth(!twoFactorAuth)} 
            />
          </div>
          <button className="btn btn-primary sm-max:p-2 mt-4 text-white">Change Password</button>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Plus className="w-6 h-6 text-teal-500 mr-2" />
          Connected Accounts
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={googleIcon} alt="Google" className="w-8 h-8" />
              <span className="text-lg">Google</span>
            </div>
            <button className="btn btn-outline btn-sm">Connected</button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={facebookIcon} alt="Facebook" className="w-8 h-8" />
              <span className="text-lg">Facebook</span>
            </div>
            <button className="btn btn-outline btn-sm">Connected</button>
          </div>
          <button className="btn btn-outline w-full mt-4">Add Account</button>
        </div>
      </section>

      <section className="bg-red-50 dark:bg-red-900 p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4 flex items-center text-red-500">
          <Trash2 className="w-6 h-6 text-red-500 mr-2" />
          Danger Zone
        </h2>
        <p className="mb-4">Permanently delete your account and all its content. This action cannot be undone.</p>
        <button className="btn btn-error w-full">Delete Account</button>
      </section>
    </main>
  );
};

export default Settings;
