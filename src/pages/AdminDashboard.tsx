import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddItemForm from '@/components/admin/AddItemForm';
import EditForm from '@/components/admin/EditForm';

interface ProductItem {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
  category: string;
  shortDescription: string;
  longDescription: string;
  features: string[];
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('product');
  const [ProductItems, setProductItems] = useState<ProductItem[]>([]);
  const [showProductItems, setShowProductItems] = useState<ProductItem[]>([]);
  const [isAddItem, setIsAddItem] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editItem, setEditItem] = useState<ProductItem | null>(null);
  const filterTitleRef = useRef<HTMLInputElement | null>(null);
  const filterCategoryRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const ADMIN_EMAIL = 'admin@gmail.com';
  const ADMIN_PASSWORD = 'admin123';

  const contacts = [
    {
      id: '1',
      name: 'bhumika',
      email: 'bhumika@gmail.com',
      phno: 924525243,
      message: 'Hello I really liked the carpets I want to order 100 of these',
    },
    {
      id: '2',
      name: 'madhvi',
      email: 'madhvi@gmail.com',
      phno: 88675467,
      message: 'Hey want to colab with you for my new hotel',
    },
  ];

  const orders = [
    {
      id: '1',
      name: 'bhumika',
      email: 'bhumika@gmail.com',
      phno: 924525243,
      message: 'Hello I really liked the carpets I want to order 100 of these',
      category: 'carpets',
      title: 'Carpet 1',
      quantity: 44,
    },
    {
      id: '2',
      name: 'priyanka',
      email: 'priyanka@gmail.com',
      phno: 88675467,
      message: 'Hey want to colab with you for my new hotel',
      category: 'durries',
      title: 'Durrie 1',
      quantity: 32,
    },
    {
      id: '3',
      name: 'madhvi',
      email: 'madhvi@gmail.com',
      phno: 88675467,
      message: 'My family want to buy you cushions and throws',
      category: 'Cushions',
      title: 'Cushion 1',
      quantity: 70,
    },
  ];

  useEffect(() => {
    if (isAuthenticated) {
      fetchProductItems();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/');
  };

  const fetchProductItems = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get('https://a-s-textiles.vercel.app/v1/products/getallProducts');
      const result = response.data.data;
      // console.log(data)
      console.log("this is resul ",result)
      if (Array.isArray(result)) {
        setProductItems(result);
        setShowProductItems(result);
        console.log("this is product item ", ProductItems);
      } else {
        setError('Unexpected response format from server');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch product items');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleFilterItem = () => {
    const filterTitle = filterTitleRef.current?.value || '';
    const filterCategory = filterCategoryRef.current?.value || '';
    let filtered = ProductItems;

    if (filterTitle && filterCategory) {
      filtered = ProductItems.filter(
        (item) =>
          item.title.toLowerCase() === filterTitle.toLowerCase() &&
          item.category.toLowerCase() === filterCategory.toLowerCase()
      );
    } else if (filterTitle) {
      filtered = ProductItems.filter(
        (item) => item.title.toLowerCase() === filterTitle.toLowerCase()
      );
    } else if (filterCategory) {
      filtered = ProductItems.filter(
        (item) => item.category.toLowerCase() === filterCategory.toLowerCase()
      );
    } else {
      setError('No items with this filter');
    }

    setShowProductItems(filtered);
  };

  const handleDeleteItem = (id: string) => {
    setProductItems(ProductItems.filter((item) => item.id !== id));
    setShowProductItems(showProductItems.filter((item) => item.id !== id));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl text-black font-bold mb-6 text-center">Admin Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded mb-4"
              placeholder="Email"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded mb-6"
              placeholder="Password"
              required
            />
            <button className="w-full bg-olive text-white py-2 rounded hover:bg-olive-dark">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 mx-auto">
      <div className="container mx-auto px-4 py-6 ">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold text-black">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <div className="min-h-screen flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <aside className="md:w-64 bg-white border rounded p-4 flex md:flex-col gap-2">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">Dashboard</h2>
            <button
              onClick={() => setActiveTab('product')}
              className={`w-full py-2 rounded ${
                activeTab === 'product' ? 'bg-olive text-white' : 'hover:bg-gray-100'
              }`}
            >
              Products
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full py-2 rounded ${
                activeTab === 'orders' ? 'bg-olive text-white' : 'hover:bg-gray-100'
              }`}
            >
              Orders
            </button>
            <button
              onClick={() => setActiveTab('contacts')}
              className={`w-full py-2 rounded ${
                activeTab === 'contacts' ? 'bg-olive text-white' : 'hover:bg-gray-100'
              }`}
            >
              Contact
            </button>
          </aside>

          {/* Main Content */}
          <main className="flex-1 bg-white p-4 rounded shadow overflow-x-auto">
            {activeTab === 'product' && (
              <div className="flex flex-col space-y-6">
                {!isAddItem && !isEdit && (
                  <button
                    type="submit"
                    onClick={() => setIsAddItem(true)}
                    className="bg-olive text-white px-6 py-2 rounded hover:bg-olive-dark place-self-end"
                  >
                    Add New Item
                  </button>
                )}
                {error && <div className="text-red-500 font-medium">{error}</div>}
                {isAddItem && (
                  <AddItemForm
                    setIsAddItem={setIsAddItem}
                    handleFileChange={handleFileChange}
                    loading={loading}
                  />
                )}
                {isEdit && editItem && (
                  <EditForm editItem={editItem} setIsEdit={setIsEdit} />
                )}

                {!isEdit && !isAddItem && (
                  <div>
                    <div className="mb-4">
                      <h1 className="text-2xl font-bold text-black mb-4">Filter Item</h1>
                      <div className="flex flex-wrap gap-4">
                        <input
                          type="text"
                          placeholder="Title"
                          ref={filterTitleRef}
                          className="flex-1 min-w-[120px] px-4 py-2 border rounded"
                        />
                        <input
                          type="text"
                          placeholder="Category"
                          ref={filterCategoryRef}
                          className="flex-1 min-w-[120px] px-4 py-2 border rounded"
                        />
                        <button
                          onClick={handleFilterItem}
                          disabled={loading}
                          className="bg-olive text-white px-6 py-2 rounded hover:bg-olive-dark"
                        >
                          {loading ? 'Filtering...' : 'Filter'}
                        </button>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {showProductItems.map((item) => (
                        <div
                          key={item.id}
                          className="bg-gray-50 rounded-lg overflow-hidden shadow"
                        >
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-48 object-cover"
                          />
                          <div className="p-4">
                            <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                              {item.category}
                            </span>
                            <h3 className="font-semibold text-gray-800 mt-2">{item.title}</h3>
                            <div className="flex justify-between mt-2">
                              <button
                                onClick={() => handleDeleteItem(item.id)}
                                className="text-red-500 hover:text-red-700 text-sm"
                              >
                                Delete
                              </button>
                              <button
                                onClick={() => {
                                  setEditItem(item);
                                  setIsEdit(true);
                                }}
                                className="text-green-500 hover:text-green-700 text-sm"
                              >
                                Edit
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'contacts' && (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100 text-left">
                      <th className="p-3">Name</th>
                      <th className="p-3">Email</th>
                      <th className="p-3">Phone</th>
                      <th className="p-3">Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((contact) => (
                      <tr key={contact.id} className="border-b">
                        <td className="p-3">{contact.name}</td>
                        <td className="p-3">{contact.email}</td>
                        <td className="p-3">{contact.phno}</td>
                        <td className="p-3">{contact.message}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100 text-left">
                      <th className="p-3">Name</th>
                      <th className="p-3">Email</th>
                      <th className="p-3">Phno</th>
                      <th className="p-3">Message</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Title</th>
                      <th className="p-3">Quantity</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((form) => (
                      <tr key={form.id} className="border-b">
                        <td className="p-3">{form.name}</td>
                        <td className="p-3">{form.email}</td>
                        <td className="p-3">{form.phno}</td>
                        <td className="p-3">{form.message}</td>
                        <td className="p-3">{form.category}</td>
                        <td className="p-3">{form.title}</td>
                        <td className="p-3">{form.quantity}</td>
                        <td className='flex items-center justify-center'>
                          <button className='bg-red-600 text-white py-1 px-2 rounded-md'>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </main>
          {/* 🧾 Delete Confirmation Modal */}
        {deleteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-xl p-6 w-[90%] max-w-md text-center">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Delete Item</h2>
              <p className="text-gray-600 mb-6">Are you sure you want to delete this item?</p>
              <div className="flex justify-center gap-4">
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => {
                    if (deleteItemId) handleDeleteItem(deleteItemId);
                    setDeleteModalOpen(false);
                    setDeleteItemId(null);
                  }}
                >
                  Delete
                </button>
                <button
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                  onClick={() => {
                    setDeleteModalOpen(false);
                    setDeleteItemId(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
          </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
