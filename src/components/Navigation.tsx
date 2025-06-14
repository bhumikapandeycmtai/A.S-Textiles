import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);


  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      // --- CHANGE 1: Update background logic ---
      // The background is now white/shadowed if scrolled OR if the menu is open.
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled || isMenuOpen
          ? 'bg-white/95 shadow-md py-2' 
          : 'bg-transparent py-4'
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <motion.img
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              src="/images/ASTextiles.jpg"
              alt="A.S textiles Logo"
              className={cn(
                'h-16 w-auto transition-all duration-300',
              )}
            />
          </Link>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="lg:hidden text-2xl z-10" // Add z-10 to ensure it's above the menu content
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {/* --- CHANGE 2: Update icon color logic --- */}
            {/* The icon color is now dark if scrolled OR if the menu is open. */}
            <span className={cn(
              'transition-colors',
              isScrolled || isMenuOpen ? 'text-olive' : 'text-white'
            )}>
              {isMenuOpen ? '✕' : '☰'} {/* Using a proper close icon '✕' */}
            </span>
          </motion.button>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center space-x-8">
            <NavLink to="/" isScrolled={isScrolled}>Home</NavLink>
            <NavLink to="/about" isScrolled={isScrolled}>About Us</NavLink>
            <NavLink to="/services" isScrolled={isScrolled}>Services</NavLink>
            <NavLink to="/products" isScrolled={isScrolled}>Products</NavLink>
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
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              // --- CHANGE 3: Simplify mobile menu styling ---
              // Remove bg, shadow, rounded corners, and top margin.
              // The parent <header> now provides the background and shadow.
              className="lg:hidden pt-4 pb-2 flex flex-col items-center space-y-4 overflow-hidden"
            >
              <MobileNavLink to="/" onClick={() => setIsMenuOpen(false)}>Home</MobileNavLink>
              <MobileNavLink to="/about" onClick={() => setIsMenuOpen(false)}>About Us</MobileNavLink>
              <MobileNavLink to="/services" onClick={() => setIsMenuOpen(false)}>Services</MobileNavLink>
              <MobileNavLink to="/products" onClick={() => setIsMenuOpen(false)}>Products</MobileNavLink>
              <MobileNavLink to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</MobileNavLink>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/919812640115"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full text-center justify-center mt-2" // Add some margin top to separate from links
                onClick={() => setIsMenuOpen(false)}
              >
                Get Quote
              </motion.a>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

// --- No changes needed for these sub-components ---

interface NavLinkProps {
  to: string;
  isScrolled: boolean;
  children: React.ReactNode;
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

interface MobileNavLinkProps {
  to: string;
  onClick: () => void;
  children: React.ReactNode;
}

const MobileNavLink = ({ to, onClick, children }: MobileNavLinkProps) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="w-full"
  >
    <Link
      to={to}
      onClick={onClick}
      className="text-olive font-medium text-base hover:text-gold transition-colors w-full text-center py-2 block"
    >
      {children}
    </Link>
  </motion.div>
);

export default Navigation;