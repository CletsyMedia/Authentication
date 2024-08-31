import React, { useState } from 'react';
import { Search, Edit, Trash2, User, Users, Activity, Lock } from 'lucide-react';

const UserPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data for the user list
  const users = [
    { id: 1, name: 'Alice Johnson', email: 'alice@gmail.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Bob Smith', email: 'bob@gmail.com', role: 'Editor', status: 'Inactive' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@gmail.com', role: 'Subscriber', status: 'Active' },
    { id: 4, name: 'Dana White', email: 'dana@yahoo.com', role: 'Admin', status: 'Active' },
    { id: 5, name: 'Ella Green', email: 'ella@yahoo.com', role: 'Editor', status: 'Inactive' },
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen px-1">
      <h1 className="text-xl md:text-2xl lg:text-4xl font-bold mb-4 md:mb-6 text-left">User Page</h1>

      {/* Cards Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-r from-blue-400 to-blue-600 dark:from-blue-800 dark:to-blue-900 text-white p-6 rounded-lg shadow-lg flex items-center space-x-4">
          <User className="w-8 h-8" />
          <div>
            <h3 className="text-lg font-semibold">Total Users</h3>
            <p className="text-2xl font-bold">1,234</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-400 to-green-600 dark:from-green-800 dark:to-green-900 text-white p-6 rounded-lg shadow-lg flex items-center space-x-4">
          <Users className="w-8 h-8" />
          <div>
            <h3 className="text-lg font-semibold">Active Users</h3>
            <p className="text-2xl font-bold">567</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-400 to-red-600 dark:from-red-800 dark:to-red-900 text-white p-6 rounded-lg shadow-lg flex items-center space-x-4">
          <Activity className="w-8 h-8" />
          <div>
            <h3 className="text-lg font-semibold">Inactive Users</h3>
            <p className="text-2xl font-bold">89</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 dark:from-yellow-800 dark:to-yellow-900 text-white p-6 rounded-lg shadow-lg flex items-center space-x-4">
          <Lock className="w-8 h-8" />
          <div>
            <h3 className="text-lg font-semibold">Admins</h3>
            <p className="text-2xl font-bold">45</p>
          </div>
        </div>
      </section>

      {/* Table Section */}
      <section className="bg-white dark:bg-gray-800 p-6 sm:p-3 rounded-lg shadow-sm esm-table sm-table xsm-table w-full overflow-x-auto">
        <div className="flex items-center justify-between mb-4 sm-max:flex-col sm-max:gap-2">
          <h2 className="text-xl font-semibold sm:text-lg">User List</h2>
          <div className="relative sm-max:w-full">
            <input
              type="text"
              placeholder="Search..."
              className="p-2 border bg-transparent outline-none border-gray-300 rounded-lg dark:border-gray-700 dark:bg-gray-900 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute top-2 right-2 text-gray-500 dark:text-gray-400" size={18} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse dark:border-gray-700">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Role</th>
                <th className="p-2">Status</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b dark:border-gray-700">
                    <td className="p-2">{user.name}</td>
                    <td className="p-2">{user.email}</td>
                    <td className="p-2">{user.role}</td>
                    <td className="p-2">{user.status}</td>
                    <td className="p-2 flex items-center space-x-2">
                      <button className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-2 text-center">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default UserPage;
