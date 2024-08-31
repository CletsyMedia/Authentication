import React, { useState } from 'react';
import { Search, Edit, Trash2, Tag, TrendingUp, ArrowDown, DollarSign } from 'lucide-react';

const ProductPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data for the product list
  const products = [
    { id: 1, name: 'Wireless Earbuds', category: 'Electronics', price: 59.99, stock: 143, sales: 1200, image: 'https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2lyZWxlc3MlMjBlYXJidWRzfGVufDB8fDB8fHww' },
    { id: 2, name: 'Leather Wallet', category: 'Accessories', price: 39.99, stock: 89, sales: 800, image: 'https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2lyZWxlc3MlMjBlYXJidWRzfGVufDB8fDB8fHww' },
    { id: 3, name: 'Smart Watch', category: 'Electronics', price: 199.99, stock: 56, sales: 650, image: 'https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2lyZWxlc3MlMjBlYXJidWRzfGVufDB8fDB8fHww' },
    { id: 4, name: 'Yoga Mat', category: 'Fitness', price: 29.99, stock: 210, sales: 950, image: 'https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2lyZWxlc3MlMjBlYXJidWRzfGVufDB8fDB8fHww' },
    { id: 5, name: 'Coffee Maker', category: 'Home', price: 79.99, stock: 78, sales: 720, image: 'https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2lyZWxlc3MlMjBlYXJidWRzfGVufDB8fDB8fHww' },
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      <h1 className="text-xl md:text-2xl lg:text-4xl font-bold mb-4 md:mb-6 text-left">Product Page</h1>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm flex items-center space-x-4">
          <Tag className="w-8 h-8 text-blue-500" />
          <div>
            <h3 className="text-lg font-semibold">Total Products</h3>
            <p className="text-2xl font-bold">1,234</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm flex items-center space-x-4">
          <TrendingUp className="w-8 h-8 text-green-500" />
          <div>
            <h3 className="text-lg font-semibold">Top Selling</h3>
            <p className="text-2xl font-bold">567</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm flex items-center space-x-4">
          <ArrowDown className="w-8 h-8 text-red-500" />
          <div>
            <h3 className="text-lg font-semibold">Decline Stock</h3>
            <p className="text-2xl font-bold">12</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm flex items-center space-x-4">
          <DollarSign className="w-8 h-8 text-yellow-500" />
          <div>
            <h3 className="text-lg font-semibold">Total Revenue</h3>
            <p className="text-2xl font-bold">$12,345</p>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-800 p-6 sm-max:p-3 rounded-lg shadow-sm esm-table sm-table xsm-table w-full overflow-x-auto">
        <div className="flex items-center justify-between mb-4 sm-max:flex-col sm-max:gap-2">
          <h2 className="text-xl font-semibold sm:text-lg">Product List</h2>
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
                <th className="p-2">Image</th>
                <th className="p-2">Name</th>
                <th className="p-2">Category</th>
                <th className="p-2">Price</th>
                <th className="p-2">Stock</th>
                <th className="p-2">Sales</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b dark:border-gray-700">
                    <td className="p-2">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                    </td>
                    <td className="p-2">{product.name}</td>
                    <td className="p-2">{product.category}</td>
                    <td className="p-2">${product.price.toFixed(2)}</td>
                    <td className="p-2">{product.stock}</td>
                    <td className="p-2">{product.sales}</td>
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
                  <td colSpan="7" className="p-2 text-center">No products found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default ProductPage;
