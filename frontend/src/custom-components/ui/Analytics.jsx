import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  Legend
} from 'recharts';
import { FaChartLine, FaChartBar, FaChartPie, FaDownload, FaCalendarAlt } from 'react-icons/fa';

// Sample data for charts
const lineData = [
  { name: 'Jan', tasksCompleted: 2400, userSignUps: 1500 },
  { name: 'Feb', tasksCompleted: 3000, userSignUps: 2000 },
  { name: 'Mar', tasksCompleted: 2200, userSignUps: 1800 },
  { name: 'Apr', tasksCompleted: 2780, userSignUps: 2200 },
  { name: 'May', tasksCompleted: 1890, userSignUps: 1700 },
  { name: 'Jun', tasksCompleted: 2390, userSignUps: 2500 },
  { name: 'Jul', tasksCompleted: 3490, userSignUps: 2800 },
];

const barData = [
  { name: 'Jan', sales: 4000, visits: 2400 },
  { name: 'Feb', sales: 3000, visits: 1398 },
  { name: 'Mar', sales: 2000, visits: 9800 },
  { name: 'Apr', sales: 2780, visits: 3908 },
  { name: 'May', sales: 1890, visits: 4800 },
  { name: 'Jun', sales: 2390, visits: 3800 },
  { name: 'Jul', sales: 3490, visits: 4300 },
];

const pieData = [
  { name: 'Completed', value: 400 },
  { name: 'Pending', value: 300 },
  { name: 'Overdue', value: 300 },
];

const areaData = [
  { name: 'Jan', cumulativeTasks: 2400 },
  { name: 'Feb', cumulativeTasks: 5400 },
  { name: 'Mar', cumulativeTasks: 7600 },
  { name: 'Apr', cumulativeTasks: 10380 },
  { name: 'May', cumulativeTasks: 12270 },
  { name: 'Jun', cumulativeTasks: 14660 },
  { name: 'Jul', cumulativeTasks: 18150 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const AnalyticsPage = () => {
  const [dateRange, setDateRange] = useState('Last 30 Days');

  const handleDateRangeChange = (e) => {
    setDateRange(e.target.value);
    // Add logic to filter data based on the selected date range
  };

  return (
    <main className="flex-1 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-sm min-h-full px-1 overflow-y-scroll">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-left">Analytics Dashboard</h2>

      {/* Date Range Selector */}
      <div className="mb-6 flex items-center space-x-4">
        <label htmlFor="date-range" className="text-lg font-semibold">Date Range:</label>
        <select
          id="date-range"
          className="p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800"
          value={dateRange}
          onChange={handleDateRangeChange}
        >
          <option value="Last 7 Days">Last 7 Days</option>
          <option value="Last 30 Days">Last 30 Days</option>
          <option value="Last 6 Months">Last 6 Months</option>
          <option value="Last Year">Last Year</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Line Chart */}
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm">
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 flex items-center">
            <FaChartLine className="mr-2 text-blue-500" />
            Activity Trends
          </h3>
          <div className="h-48 sm:h-56 md:h-64">
            <ResponsiveContainer>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  content={({ payload }) => (
                    <div className="bg-white dark:bg-gray-700 p-2 rounded">
                      {payload && payload.length ? (
                        <div>
                          <p><strong>{payload[0].payload.name}</strong></p>
                          <p>Tasks Completed: {payload[0].value}</p>
                          <p>User Sign-Ups: {payload[1].value}</p>
                        </div>
                      ) : null}
                    </div>
                  )}
                />
                <Line type="monotone" dataKey="tasksCompleted" stroke="#8884d8" dot={{ fill: '#8884d8' }} animationDuration={1500} />
                <Line type="monotone" dataKey="userSignUps" stroke="#82ca9d" dot={{ fill: '#82ca9d' }} animationDuration={1500} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm">
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 flex items-center">
            <FaChartBar className="mr-2 text-green-500" />
            Sales Performance
          </h3>
          <div className="h-48 sm:h-56 md:h-64">
            <ResponsiveContainer>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  content={({ payload }) => (
                    <div className="bg-white dark:bg-gray-700 p-2 rounded">
                      {payload && payload.length ? (
                        <div>
                          <p><strong>{payload[0].payload.name}</strong></p>
                          <p>Sales: {payload[0].value}</p>
                          <p>Visits: {payload[1].value}</p>
                        </div>
                      ) : null}
                    </div>
                  )}
                />
                <Legend />
                <Bar dataKey="sales" fill="#8884d8" animationDuration={1500} />
                <Bar dataKey="visits" fill="#82ca9d" animationDuration={1500} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

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
                <Tooltip
                  content={({ payload }) => (
                    <div className="bg-white dark:bg-gray-700 p-2 rounded">
                      {payload && payload.length ? (
                        <div>
                          <p><strong>{payload[0].name}</strong></p>
                          <p>Value: {payload[0].value}</p>
                        </div>
                      ) : null}
                    </div>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Area Chart */}
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm">
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 flex items-center">
            {/* <FaAreaChart className="mr-2 text-purple-500" /> */}
            Cumulative Tasks
          </h3>
          <div className="h-48 sm:h-56 md:h-64">
            <ResponsiveContainer>
              <AreaChart data={areaData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  content={({ payload }) => (
                    <div className="bg-white dark:bg-gray-700 p-2 rounded">
                      {payload && payload.length ? (
                        <div>
                          <p><strong>{payload[0].payload.name}</strong></p>
                          <p>Cumulative Tasks: {payload[0].value}</p>
                        </div>
                      ) : null}
                    </div>
                  )}
                />
                <Area type="monotone" dataKey="cumulativeTasks" stroke="#8884d8" fillOpacity={0.3} fill="#8884d8" animationDuration={1500} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Export Button */}
      <div className="mt-6 flex justify-end">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 flex items-center"
          onClick={() => alert('Export functionality is not yet implemented.')}
        >
          <FaDownload className="mr-2" />
          Export Data
        </button>
      </div>
    </main>
  );
};

export default AnalyticsPage;
