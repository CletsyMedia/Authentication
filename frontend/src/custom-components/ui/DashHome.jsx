import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { FaTasks, FaCalendarDay, FaChartBar, FaChartPie, FaUsers } from 'react-icons/fa';

// Sample data for charts
const pieData = [
  { name: 'Completed', value: 400 },
  { name: 'Pending', value: 300 },
  { name: 'Overdue', value: 300 },
];

const barData = [
  { name: 'Jan', tasksCompleted: 4000, tasksPending: 2400 },
  { name: 'Feb', tasksCompleted: 3000, tasksPending: 1398 },
  { name: 'Mar', tasksCompleted: 2000, tasksPending: 9800 },
  { name: 'Apr', tasksCompleted: 2780, tasksPending: 3908 },
  { name: 'May', tasksCompleted: 1890, tasksPending: 4800 },
  { name: 'Jun', tasksCompleted: 2390, tasksPending: 3800 },
  { name: 'Jul', tasksCompleted: 3490, tasksPending: 4300 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const DashboardContent = () => {
  return (
    <main className="flex-1 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-sm min-h-full -z-50">
      <h2 className="text-xl md:text-2xl lg:text-4xl font-bold mb-4 md:mb-6 text-left">Dashboard Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* Total Tasks Card */}
        <div className="bg-gradient-to-r from-green-300 to-green-500 dark:from-green-800 dark:to-green-900 p-4 sm:p-6 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3">Total Tasks</h3>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold">5,678</p>
          </div>
          <div className="text-3xl sm:text-4xl md:text-5xl text-green-700 dark:text-green-300">
            <FaTasks />
          </div>
        </div>

        {/* Upcoming Deadlines Card */}
        <div className="bg-gradient-to-r from-blue-300 to-blue-500 dark:from-blue-800 dark:to-blue-900 p-4 sm:p-6 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3">Upcoming Deadlines</h3>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold">12</p>
          </div>
          <div className="text-3xl sm:text-4xl md:text-5xl text-blue-600 dark:text-blue-300">
            <FaCalendarDay />
          </div>
        </div>

        {/* Tasks Completed Card */}
        <div className="bg-gradient-to-r from-yellow-300 to-yellow-500 dark:from-yellow-800 dark:to-yellow-900 p-4 sm:p-6 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3">Tasks Completed</h3>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold">45</p>
          </div>
          <div className="text-3xl sm:text-4xl md:text-5xl text-yellow-500 dark:text-yellow-300">
            <FaTasks />
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm">
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 flex items-center">
            <FaChartPie className="mr-2 text-orange-500" />
            Task Distribution
          </h3>
          <div className="h-48 sm:h-56 md:h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" outerRadius="80%" fill="#8884d8" label>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm">
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 flex items-center">
            <FaChartBar className="mr-2 text-blue-500" />
            Monthly Task Performance
          </h3>
          <div className="h-48 sm:h-56 md:h-64">
            <ResponsiveContainer>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="tasksCompleted" fill="#8884d8" animationDuration={1000} />
                <Bar dataKey="tasksPending" fill="#82ca9d" animationDuration={1000} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardContent;
