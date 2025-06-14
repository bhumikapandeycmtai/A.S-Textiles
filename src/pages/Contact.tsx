import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import StickyChat from '@/components/StickyChat';
import { Badge } from "@/components/ui/badge";
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    timestamp: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError('');
  setSuccess(false);

  try {
    const date = new Date().toISOString()
    await axios.post('https://a-s-textiles.vercel.app/v1/contacts/newContact', {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      timestamp: date,
      status: "new"
    });

    setSuccess(true);
    setFormData({ name: '', email: '', phone: '', message: '', timestamp: '' });
  } catch (err) {
    setError('Failed to send message. Please try again.');
    console.error('Error submitting form:', err);
  } finally {
    setLoading(false);
  }
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream-light">
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[50vh] flex items-center">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2074&auto=format&fit=crop"
              alt="Contact Us"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
          </div>
          
          <div className="container mx-auto px-4 z-10 text-center">
            <Badge variant="outline" className="mb-6 text-gold border-gold/50 bg-black/20 backdrop-blur-sm">
              Connect With Us
            </Badge>
            <h1 className="text-3xl md:text-6xl font-playfair font-bold text-white mb-2 sm:mb-6">
              Get in Touch
            </h1>
            <p className="text-base sm:text-xl text-cream/90 max-w-3xl mx-auto">
              Transform your space into a masterpiece. Contact us to begin your journey.
            </p>
          </div>
        </section>

        {/* Contact Information Cards */}
        <section className="py-16 bg-cream-light relative z-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 -mt-32">
              <div className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-1 transition-transform duration-300">
                <div className="bg-gradient-to-br from-gold to-olive w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-olive text-center mb-4">Call Us</h3>
                <p className="text-gray-600 text-center">
                  <a href="tel:+919310891509" className="hover:text-gold transition-colors">
                    +91 9310891509
                  </a>
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-1 transition-transform duration-300">
                <div className="bg-gradient-to-br from-gold to-olive w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-olive text-center mb-4">Email Us</h3>
                <p className="text-gray-600 text-center">
                  <a href="mailto:A.stextiles78@gmail.com" className="hover:text-gold transition-colors">
                    A.stextiles78@gmail.com
                  </a>
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-1 transition-transform duration-300">
                <div className="bg-gradient-to-br from-gold to-olive w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-olive text-center mb-4">Visit Us</h3>
                <p className="text-gray-600 text-center">
                  Hari Nagar, Ram Swaroop Chowk, Kacha Kabri Fatak<br />
                  Panipat 132103
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 bg-cream-light">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-playfair font-bold text-olive mb-4">Send Us a Message</h2>
                  <p className="text-gray-600">We'd love to hear from you. Let us know how we can help.</p>
                </div>

                {success ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-olive mb-4">Thank You!</h3>
                    <p className="text-gray-600 mb-8">
                      Your message has been sent successfully. We'll get back to you soon.
                    </p>
                    <button
                      onClick={() => setSuccess(false)}
                      className="bg-gradient-to-r from-gold to-olive text-white px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 mb-2 font-medium">Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2 font-medium">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium">Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-transparent"
                        required
                      ></textarea>
                    </div>

                    {error && (
                      <div className="p-4 bg-red-50 text-red-500 text-center rounded-lg">
                        {error}
                      </div>
                    )}
                    
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-gold to-olive text-white py-4 rounded-lg hover:opacity-90 transition-opacity font-medium text-lg"
                    >
                      {loading ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="h-[500px] relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27803.96244888516!2d76.91856675358193!3d29.41431679903187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ddbce137cc249%3A0x2f40dee69b9a9f86!2sHari%20Nagar%2C%20Panipat%2C%20Haryana%20132103!5e0!3m2!1sen!2sin!4v1749642364692!5m2!1sen!2sin"
            
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0"
          ></iframe>
        </section>
      </main>
      
      <Footer />
      <StickyChat />
    </div>
  );
};

export default Contact;
