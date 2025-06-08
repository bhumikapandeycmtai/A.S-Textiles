import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import servicesData from '@/data/servicesData';

const ServiceOverview = () => {
  const [activeCardId, setActiveCardId] = useState<number | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);

  const isMobile = () => window.innerWidth < 768;

  const truncateDescription = (description: string) => {
    const words = description.split(' ');
    if (words.length <= 10) return description;
    return words.slice(0, 10).join(' ') + '...';
  };

  // Simple sliding animation variants for cards
  const cardVariants = (index: number) => ({
    hidden: { 
      opacity: 0,
      x: index % 2 === 0 ? -100 : 100,
    },
    visible: { 
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        duration: 0.6,
        delay: index * 0.2
      }
    },
    hover: {
      y: -10,
      transition: {
        duration: 0.2
      }
    }
  });

  // Content animations
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const contentVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: 0.1
      }
    }
  };

  const linkVariants = {
    hidden: { 
      opacity: 0,
      x: -10
    },
    visible: { 
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: 0.2
      }
    },
    hover: {
      x: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  // Title animations
  const titleVariants = {
    hidden: { 
      opacity: 0,
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 0.8,
        delay: 0.1
      }
    }
  };

  const subtitleVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 0.8,
        delay: 0.2
      }
    }
  };

  return (
    <section className="py-16 md:py-20 overflow-hidden relative bg-gradient-to-b from-cream-light via-cream-light/95 to-cream-light">
      {/* Premium gradient overlay */}
      <motion.div
        className="absolute inset-0 opacity-50"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255,215,0,0.1) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.h2 
            variants={titleVariants}
            className="section-title text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 relative"
          >
            <motion.span
              className="relative z-10"
              animate={{
                textShadow: [
                  '0 0 10px rgba(255,215,0,0.3)',
                  '0 0 20px rgba(255,215,0,0.5)',
                  '0 0 10px rgba(255,215,0,0.3)'
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <span className="relative inline-block">
                <span className="relative z-10">Our Services</span>
                <motion.span 
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-gold/40 via-gold to-gold/40" 
                  initial={{ width: "0%", left: "50%" }}
                  animate={{ width: "100%", left: "0%" }}
                  transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                />
              </span>
            </motion.span>
          </motion.h2>
          <motion.p 
            variants={subtitleVariants}
            className="section-subtitle text-lg md:text-xl text-gray-600/80 font-light italic mt-2"
          >
            Explore Our Premium Offerings
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service, index) => (
            <motion.div
              key={service.id}
              variants={cardVariants(index)}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, margin: "-50px" }}
              onHoverStart={() => setHoveredCardId(service.id)}
              onHoverEnd={() => setHoveredCardId(null)}
              onClick={() => {
                if (isMobile()) {
                  setActiveCardId(activeCardId === service.id ? null : service.id);
                }
              }}
              className="group relative h-[280px] rounded-xl overflow-hidden shadow-lg bg-white"
            >
              <img
                src={service.image}
                alt={service.title}
                className={`w-full h-full transition-all duration-300 ${
                  ['Furniture Doors', 'Furniture Consoles'].includes(service.title)
                    ? 'object-contain'
                    : 'object-cover'
                }`}
              />
              <AnimatePresence>
                {(activeCardId === service.id || hoveredCardId === service.id) && (
                  <motion.div
                    variants={overlayVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent"
                  >
                    <motion.div 
                      variants={contentVariants}
                      className="absolute bottom-0 left-0 right-0 p-6 text-white"
                    >
                      <motion.h3 
                        className="text-xl md:text-2xl font-medium text-white mb-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        {service.title}
                      </motion.h3>
                      <motion.p 
                        className="text-cream/90 text-sm md:text-base mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        {truncateDescription(service.description)}
                      </motion.p>
                      <motion.div
                        variants={linkVariants}
                        whileHover="hover"
                      >
                        <Link
                          to={`/services/${service.slug}`}
                          className="inline-flex items-center text-gold hover:text-gold-light transition-colors"
                        >
                          Learn More
                          <motion.span 
                            className="ml-2"
                            animate={{ 
                              x: [0, 5, 0],
                              scale: [1, 1.2, 1]
                            }}
                            transition={{ 
                              repeat: Infinity, 
                              duration: 1.5,
                              ease: "easeInOut"
                            }}
                          >
                            <ArrowRight size={18} />
                          </motion.span>
                        </Link>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceOverview;
