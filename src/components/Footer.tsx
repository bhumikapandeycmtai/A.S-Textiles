import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-olive text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-playfair font-semibold">AYRAJ<span className="text-gold">.</span></h3>
            <p className="text-cream">
              Reimagining interiors with luxury designs that transform ordinary spaces into royal experiences.
            </p>
            <div className="flex space-x-4 pt-4">
              <a 
                href="https://wa.me/919310891509"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-cream flex items-center justify-center hover:bg-cream hover:text-olive transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              </a>
              <a 
                href="mailto:A.stextiles78@gmail.com"
                className="w-10 h-10 rounded-full border border-cream flex items-center justify-center hover:bg-cream hover:text-olive transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-playfair font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-gold transition-colors inline-block">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gold transition-colors inline-block">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-gold transition-colors inline-block">Services</Link>
              </li>
              {/* <li>
                <Link to="/gallery" className="hover:text-gold transition-colors inline-block">Gallery</Link>
              </li> */}
              <li>
                <Link to="/contact" className="hover:text-gold transition-colors inline-block">Contact Us</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-playfair font-semibold">Contact Us</h3>
            <div className="space-y-3">
              <p className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 mt-0.5 text-gold flex-shrink-0" />
                <span>Hari Nagar, Ram Swaroop Chowk, Kacha Kabri Fatak<br />Panipat 132103</span>
              </p>
              <p className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-gold" />
                <a href="tel:+919812640115" className="hover:text-gold transition-colors mr-4">+91 9812640115</a>
                <a href="tel:+919253709350" className="hover:text-gold transition-colors">+91 9253709350</a>
              </p>
              <p className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-gold" />
                <a href="mailto:hanumatint@gmail.com" className="hover:text-gold transition-colors">hanumatint@gmail.com</a>
              </p>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-cream/30 mt-10 pt-6 text-center">
          <p>&copy; {new Date().getFullYear()} A.S Textiles. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
