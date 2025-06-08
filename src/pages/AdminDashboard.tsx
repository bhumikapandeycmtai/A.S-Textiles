import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db, storage } from '@/config/firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
}

interface ContactForm {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: any;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('gallery');
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [contactForms, setContactForms] = useState<ContactForm[]>([]);
  const [newItem, setNewItem] = useState({ title: '', category: '', image: '' });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // Hardcoded admin credentials
  const ADMIN_EMAIL = 'admin@ayraj.com';
  const ADMIN_PASSWORD = 'admin123';

  useEffect(() => {
    if (isAuthenticated) {
      fetchGalleryItems();
      fetchContactForms();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = async () => {
    setIsAuthenticated(false);
    navigate('/');
  };

  const fetchGalleryItems = async () => {
    const querySnapshot = await getDocs(collection(db, 'gallery'));
    const items = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as GalleryItem[];
    setGalleryItems(items);
  };

  const fetchContactForms = async () => {
    const querySnapshot = await getDocs(collection(db, 'contacts'));
    const forms = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as ContactForm[];
    setContactForms(forms);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setLoading(true);
    try {
      const storageRef = ref(storage, `gallery/${selectedFile.name}`);
      await uploadBytes(storageRef, selectedFile);
      const imageUrl = await getDownloadURL(storageRef);

      const docRef = await addDoc(collection(db, 'gallery'), {
        title: newItem.title,
        category: newItem.category,
        image: imageUrl
      });

      setGalleryItems([...galleryItems, { id: docRef.id, ...newItem, image: imageUrl }]);
      setNewItem({ title: '', category: '', image: '' });
      setSelectedFile(null);
    } catch (error) {
      console.error('Error adding item:', error);
    }
    setLoading(false);
  };

  const handleDeleteItem = async (id: string, imageUrl: string) => {
    try {
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);
      await deleteDoc(doc(db, 'gallery', id));
      setGalleryItems(galleryItems.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-olive text-white py-2 rounded hover:bg-olive-dark"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveTab('gallery')}
              className={`px-4 py-2 rounded ${
                activeTab === 'gallery' ? 'bg-olive text-white' : 'bg-gray-200'
              }`}
            >
              Gallery Management
            </button>
            <button
              onClick={() => setActiveTab('contacts')}
              className={`px-4 py-2 rounded ${
                activeTab === 'contacts' ? 'bg-olive text-white' : 'bg-gray-200'
              }`}
            >
              Contact Forms
            </button>
          </div>

          {activeTab === 'gallery' && (
            <div>
              <form onSubmit={handleAddItem} className="mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="Title"
                    value={newItem.title}
                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                    className="p-2 border rounded"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Category"
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                    className="p-2 border rounded"
                    required
                  />
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="p-2 border rounded"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-4 bg-olive text-white px-6 py-2 rounded hover:bg-olive-dark"
                >
                  {loading ? 'Adding...' : 'Add Item'}
                </button>
              </form>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryItems.map((item) => (
                  <div key={item.id} className="bg-gray-50 rounded-lg overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-bold">{item.title}</h3>
                      <p className="text-gray-600">{item.category}</p>
                      <button
                        onClick={() => handleDeleteItem(item.id, item.image)}
                        className="mt-2 text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'contacts' && (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Message
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {contactForms.map((form) => (
                    <tr key={form.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{form.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{form.email}</td>
                      <td className="px-6 py-4">{form.message}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(form.timestamp?.toDate()).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard; 