import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect } from "react";

interface ToastProps {
  message: string;
  show: boolean;
  success?: boolean; // Optional, defaults to 'success'
  onClose?: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, show, success = true, onClose }) => {
  useEffect(() => {
    if (show && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  const bgColor =
    success === true ? "bg-green-500" : success === false ? "bg-red-500" : "bg-gray-500";

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className={`fixed top-6 right-6 z-50 text-white px-6 py-3 rounded-lg shadow-lg ${bgColor}`}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
