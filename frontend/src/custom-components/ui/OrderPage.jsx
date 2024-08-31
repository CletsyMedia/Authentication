import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  FaShoppingCart,
  FaClipboardList,
  FaCheckCircle,
  FaMoneyBillWave,
  FaChartLine,
  FaChartPie,
} from "react-icons/fa";
import { Search, Edit, Trash2 } from "lucide-react";

const dailyOrdersData = [
  { date: "2024-08-01", orders: 120 },
  { date: "2024-08-02", orders: 150 },
  { date: "2024-08-03", orders: 180 },
  { date: "2024-08-04", orders: 200 },
  { date: "2024-08-05", orders: 170 },
  { date: "2024-08-06", orders: 220 },
  { date: "2024-08-07", orders: 250 },
];

const cityDistributionData = [
  { city: "New York", value: 400 },
  { city: "Los Angeles", value: 300 },
  { city: "Chicago", value: 200 },
  { city: "Houston", value: 150 },
  { city: "Phoenix", value: 100 },
];

const orderListData = [
  {
    code: "HBN01",
    date: "2024-08-01",
    city: "New York",
    amount: "$150.00",
    status: "Completed",
  },
  {
    code: "HBN02",
    date: "2024-08-02",
    city: "Los Angeles",
    amount: "$200.00",
    status: "Pending",
  },
  {
    code: "HBN03",
    date: "2024-08-03",
    city: "Chicago",
    amount: "$250.00",
    status: "Completed",
  },
  {
    code: "HBN04",
    date: "2024-08-04",
    city: "Houston",
    amount: "$180.00",
    status: "Completed",
  },
  {
    code: "HBN05",
    date: "2024-08-05",
    city: "Phoenix",
    amount: "$300.00",
    status: "Pending",
  },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6F61"];

const OrderPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrders = orderListData.filter((order) =>
    order.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      <h1 className="text-xl md:text-2xl lg:text-4xl font-bold mb-4 md:mb-6 text-left">Order Dashboard</h1>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Total Orders Card */}
        <div className="bg-gradient-to-r from-blue-300 to-blue-500 dark:from-blue-800 dark:to-blue-900 p-4 sm:p-6 rounded-xl shadow-lg flex items-center justify-between">
          <div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3">
              Total Orders
            </h3>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold">1,245</p>
          </div>
          <div className="text-3xl sm:text-4xl md:text-5xl text-blue-600 dark:text-blue-300">
            <FaShoppingCart />
          </div>
        </div>

        {/* Pending Orders Card */}
        <div className="bg-gradient-to-r from-yellow-300 to-yellow-500 dark:from-yellow-800 dark:to-yellow-900 p-4 sm:p-6 rounded-xl shadow-lg flex items-center justify-between">
          <div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3">
              Pending Orders
            </h3>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold">123</p>
          </div>
          <div className="text-3xl sm:text-4xl md:text-5xl text-yellow-500 dark:text-yellow-300">
            <FaClipboardList />
          </div>
        </div>

        {/* Completed Orders Card */}
        <div className="bg-gradient-to-r from-green-300 to-green-500 dark:from-green-800 dark:to-green-900 p-4 sm:p-6 rounded-xl shadow-lg flex items-center justify-between">
          <div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3">
              Completed Orders
            </h3>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold">1,100</p>
          </div>
          <div className="text-3xl sm:text-4xl md:text-5xl text-green-600 dark:text-green-300">
            <FaCheckCircle />
          </div>
        </div>

        {/* Total Revenue Card */}
        <div className="bg-gradient-to-r from-red-300 to-red-500 dark:from-red-800 dark:to-red-900 p-4 sm:p-6 rounded-xl shadow-lg flex items-center justify-between">
          <div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3">
              Total Revenue
            </h3>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold">
              $120,000
            </p>
          </div>
          <div className="text-3xl sm:text-4xl md:text-5xl text-red-600 dark:text-red-300">
            <FaMoneyBillWave />
          </div>
        </div>
      </section>

      <section className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Orders Chart */}
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-lg">
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 flex items-center">
            <FaChartLine className="mr-2 text-blue-500" />
            Daily Orders
          </h3>
          <div className="h-48 sm:h-56 md:h-64">
            <ResponsiveContainer>
              <LineChart data={dailyOrdersData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="orders" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* City Distribution Chart */}
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-lg">
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 flex items-center">
            <FaChartPie className="mr-2 text-orange-500" />
            City Distribution
          </h3>
          <div className="h-48 sm:h-56 md:h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={cityDistributionData}
                  dataKey="value"
                  nameKey="city"
                  outerRadius="80%"
                  fill="#8884d8"
                  label
                >
                  {cityDistributionData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-800 p-6 rounded-lg mt-6 shadow-sm esm-table sm-table xsm-table w-full overflow-x-auto">
        <div className="flex items-center justify-between mb-4 sm-max:flex-col sm-max:gap-2">
          <h2 className="text-xl font-semibold">Order List</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="p-2 border bg-transparent outline-none border-gray-300 rounded-lg dark:border-gray-700 dark:bg-gray-900 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search
              className="absolute top-2 right-2 text-gray-500 dark:text-gray-400"
              size={18}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                <th className="p-2">Order Code</th>
                <th className="p-2">Date</th>
                <th className="p-2">City</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Status</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr
                    key={order.code}
                    className="border-b dark:border-gray-700"
                  >
                    <td className="p-2">{order.code}</td>
                    <td className="p-2">{order.date}</td>
                    <td className="p-2">{order.city}</td>
                    <td className="p-2">{order.amount}</td>
                    <td className="p-2">{order.status}</td>
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
                  <td colSpan="6" className="p-2 text-center">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default OrderPage;
