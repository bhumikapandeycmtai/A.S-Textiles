import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
const AdminNav = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <nav className="hidden lg:flex items-center space-x-8">
                <NavLink to="/" isScrolled={isScrolled}>Home</NavLink>
                <NavLink to="/about" isScrolled={isScrolled}>About Us</NavLink>
                <NavLink to="/services" isScrolled={isScrolled}>Services</NavLink>
                <NavLink to="/contact" isScrolled={isScrolled}>Contact</NavLink>
                <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/919812640115"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                >
                Get Quote
                </motion.a>
        </nav>
  )
}
const NavLink = ({ to, isScrolled, children }: NavLinkProps) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Link
      to={to}
      className={cn(
        'font-medium text-base hover:text-gold transition-colors relative',
        isScrolled ? 'text-olive' : 'text-white',
      )}
    >
      {children}
    </Link>
  </motion.div>
);

export default AdminNav
