import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import StickyChat from '@/components/StickyChat';

interface ServiceDetailProps {
  service: {
    id: number;
    title: string;
    description: string;
    image: string;
    benefits: string[];
    materials: string[];
    process: string[];
    galleryImages?: string[];
  };
}

const ServiceDetail = ({ service }: ServiceDetailProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const autoPlayDelay = 3000; // 3 seconds delay between slides

  useEffect(() => {
    window.scrollTo(0, 0);
    // Debug viewport width
    console.log('Viewport width:', window.innerWidth);
  }, []);

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.98]);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 0.8
      }
    }
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 0.8
      }
    }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 0.8
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  // Function to truncate description to 10 words
  const truncateDescription = (description: string) => {
    const words = description.split(' ');
    if (words.length <= 10) return description;
    return words.slice(0, 10).join(' ') + '...';
  };

  const nextImage = useCallback(() => {
    if (service.galleryImages) {
      setCurrentImageIndex(prev => (prev + 1) % (service.galleryImages.length - 1));
      setSliderPosition(prev => {
        const nextPos = prev - window.innerWidth;
        // Reset position when reaching the end
        return currentImageIndex === service.galleryImages.length - 2 ? 0 : nextPos;
      });
    }
  }, [service.galleryImages, currentImageIndex]);

  const prevImage = useCallback(() => {
    if (service.galleryImages) {
      setCurrentImageIndex(prev => 
        prev === 0 
          ? service.galleryImages.length - 2 
          : prev - 1
      );
      setSliderPosition(prev => {
        const nextPos = prev + window.innerWidth;
        // Set position to end when going from first to last
        return currentImageIndex === 0 ? -((service.galleryImages.length - 2) * window.innerWidth) : nextPos;
      });
    }
  }, [service.galleryImages, currentImageIndex]);

  // Auto-play functionality
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (isPlaying && service.galleryImages && service.galleryImages.length > 1) {
      intervalId = setInterval(() => {
        nextImage();
      }, autoPlayDelay);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isPlaying, nextImage, service.galleryImages]);

  const togglePlayPause = () => {
    setIsPlaying(prev => !prev);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
    setSliderPosition(-index * window.innerWidth);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main>
        {/* Hero Banner */}
        <motion.section 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative h-[50vh] md:h-[70vh] flex items-center"
        >
          <div className="absolute inset-0 z-0">
            <motion.img 
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5 }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80"></div>
          </div>
          
          <motion.div 
            className="container mx-auto px-4 z-10"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <Link to="/services" className="inline-flex items-center text-white/90 mb-8 hover:text-gold transition-all duration-300 group">
                <ArrowLeft className="mr-2 transform group-hover:-translate-x-1 transition-transform" size={18} />
                Back to Services
              </Link>
            </motion.div>
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-playfair font-bold text-white mb-4 md:mb-6"
            >
              {service.title}
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="text-lg md:text-xl text-cream/90 max-w-2xl"
            >
              {truncateDescription(service.description)}
            </motion.p>
          </motion.div>
        </motion.section>
        
        {/* Service Details */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-start"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
            >
              <motion.div variants={slideInLeft} className="space-y-8 md:space-y-12">
                <div>
                  <h2 className="text-3xl md:text-4xl font-playfair text-olive mb-6 relative">
                    {service.title}
                    <span className="absolute -bottom-2 left-0 w-20 h-0.5 bg-gold"></span>
                  </h2>
                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed text-justify">
                    {service.description}
                  </p>
                </div>
                
                <motion.div 
                  variants={itemVariants}
                  className="bg-white rounded-xl p-6 md:p-8 shadow-lg border border-olive/5"
                >
                  <h3 className="text-xl md:text-2xl font-playfair text-olive mb-6 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-gold">
                      <path d="M2 20h20"></path>
                      <path d="M5 4h14a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"></path>
                      <path d="M6 10h12v4a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-4z"></path>
                      <path d="M6 15h12"></path>
                    </svg>
                    Materials Used
                  </h3>
                  <motion.div 
                    className="flex flex-wrap gap-2 md:gap-3"
                    variants={staggerContainer}
                  >
                    {service.materials.map((material, index) => (
                      <motion.span 
                        key={index} 
                        variants={itemVariants}
                        className="px-3 py-1.5 md:px-4 md:py-2 bg-cream-light text-olive rounded-full text-sm font-medium border border-olive/10 cursor-default"
                      >
                        {material}
                      </motion.span>
                    ))}
                  </motion.div>
                </motion.div>
                
                <motion.div 
                  variants={itemVariants}
                  className="bg-white rounded-xl p-6 md:p-8 shadow-lg border border-olive/5"
                >
                  <h3 className="text-xl md:text-2xl font-playfair text-olive mb-6 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-gold">
                      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                      <path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z"></path>
                      <path d="M12 11h4"></path>
                      <path d="M12 16h4"></path>
                      <path d="M8 11h.01"></path>
                      <path d="M8 16h.01"></path>
                    </svg>
                    Our Process
                  </h3>
                  <motion.div 
                    className="relative"
                    variants={staggerContainer}
                  >
                    <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-olive/10"></div>
                    <ol className="space-y-4 md:space-y-6">
                      {service.process.map((step, index) => (
                        <motion.li 
                          key={index} 
                          variants={itemVariants}
                          className="relative pl-10 md:pl-12"
                        >
                          <span className="absolute left-0 top-0 bg-olive text-white w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center text-sm font-medium shadow-md">
                            {index + 1}
                          </span>
                          <div className="bg-cream-light/50 rounded-lg p-3 md:p-4 border border-olive/5">
                            <span className="text-olive font-medium">{step}</span>
                          </div>
                        </motion.li>
                      ))}
                    </ol>
                  </motion.div>
                </motion.div>
              </motion.div>
              
              <motion.div 
                variants={slideInRight}
                className="flex flex-col gap-6"
              >
                {service.galleryImages ? (
                  <>
                    {/* First Large Image */}
                    <motion.div 
                      variants={itemVariants}
                      className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-xl shadow-lg"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.img
                        src={service.galleryImages[0]}
                        alt={`${service.title} Main`}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      />
                      <motion.div 
                        className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300"
                      />
                    </motion.div>

                    {/* Image Carousel */}
                    {service.galleryImages.length > 1 && (
                      <motion.div
                        variants={itemVariants}
                        className="relative w-full h-[300px] md:h-[400px] overflow-hidden rounded-xl shadow-lg bg-black touch-none perspective-[1200px]"
                        onMouseEnter={() => setIsPlaying(false)}
                        onMouseLeave={() => setIsPlaying(true)}
                        onTouchStart={() => setIsPlaying(false)}
                        onTouchEnd={(e) => {
                          if (e.touches.length === 0) {
                            setIsPlaying(true);
                          }
                        }}
                      >
                        <motion.div
                          className="flex h-full"
                          style={{ 
                            position: 'relative',
                            transformStyle: 'preserve-3d',
                          }}
                        >
                          {service.galleryImages.slice(1).map((img, index) => (
                            <motion.div
                              key={index}
                              className="absolute top-0 left-0 w-full h-full origin-left"
                              initial={{ opacity: 0, rotateY: -90 }}
                              animate={{
                                opacity: index === currentImageIndex ? 1 : 0,
                                rotateY: index === currentImageIndex ? 0 : 
                                        index < currentImageIndex ? 90 : -90,
                                transition: {
                                  opacity: { duration: 0.5 },
                                  rotateY: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
                                }
                              }}
                              style={{
                                zIndex: index === currentImageIndex ? 2 : 1,
                                backfaceVisibility: 'hidden'
                              }}
                            >
                              <motion.div 
                                className="relative w-full h-full overflow-hidden rounded-lg"
                                style={{
                                  transformStyle: 'preserve-3d',
                                }}
                              >
                                <motion.img
                                  src={img}
                                  alt={`${service.title} ${index + 2}`}
                                  className="absolute inset-0 w-full h-full object-cover select-none"
                                  initial={false}
                                  animate={{ 
                                    scale: index === currentImageIndex ? 1 : 0.9
                                  }}
                                  transition={{ duration: 0.8 }}
                                  draggable={false}
                                />
                                {/* Page shadow effect */}
                                <motion.div
                                  className="absolute inset-0 pointer-events-none"
                                  initial={{ opacity: 0 }}
                                  animate={{
                                    opacity: index === currentImageIndex ? 1 : 0,
                                    background: 'linear-gradient(to right, rgba(0,0,0,0.2) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.2) 100%)'
                                  }}
                                  transition={{ duration: 0.5 }}
                                />
                                {/* Page edge highlight */}
                                <motion.div
                                  className="absolute right-0 top-0 bottom-0 w-[1px] bg-white/20"
                                  initial={{ opacity: 0 }}
                                  animate={{
                                    opacity: index === currentImageIndex ? 1 : 0
                                  }}
                                  transition={{ duration: 0.5 }}
                                />
                              </motion.div>
                            </motion.div>
                          ))}
                        </motion.div>

                        {/* Dots Navigation */}
                        <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-4 z-10">
                          {service.galleryImages.slice(1).map((_, index) => (
                            <motion.button
                              key={index}
                              className={`w-4 h-4 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                                index === currentImageIndex 
                                  ? 'bg-white scale-125' 
                                  : 'bg-white/40 hover:bg-white/60'
                              }`}
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => {
                                goToImage(index);
                                setIsPlaying(false);
                                setTimeout(() => setIsPlaying(true), 2000);
                              }}
                            />
                          ))}
                        </div>

                        {/* Progress Bar */}
                        <motion.div 
                          className="absolute bottom-0 left-0 h-1.5 md:h-1 bg-white"
                          initial={{ width: "0%", opacity: 0.3 }}
                          animate={{ 
                            width: "100%",
                            opacity: isPlaying ? 0.5 : 0.2,
                            transition: {
                              width: {
                                duration: autoPlayDelay / 1000,
                                ease: "linear",
                                repeat: isPlaying ? Infinity : 0,
                                repeatType: "loop"
                              }
                            }
                          }}
                        />

                        {/* Pause state overlay */}
                        <motion.div
                          className="absolute inset-0 bg-black pointer-events-none"
                          initial={{ opacity: 0 }}
                          animate={{ 
                            opacity: isPlaying ? 0 : 0.1 
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>
                    )}
                  </>
                ) : (
                  // Fallback content when no gallery images
                  <motion.div 
                    variants={itemVariants}
                    className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-xl shadow-lg"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    />
                    <motion.div 
                      className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300"
                    />
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          </div>
        </section>
        
        {/* Call to Action */}
        <motion.section 
          className="py-16 md:py-20 bg-cream-light"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <div className="container mx-auto px-4">
            <motion.div 
              variants={fadeInUp}
              className="max-w-3xl mx-auto bg-white rounded-xl p-8 md:p-12 text-center shadow-lg border border-olive/10"
            >
              <h2 className="text-2xl md:text-3xl font-playfair font-medium text-olive mb-4 md:mb-6">
                Ready to transform your space?
              </h2>
              
              <p className="text-muted-foreground text-base md:text-lg mb-8 md:mb-10 max-w-xl mx-auto">
                Our experts are ready to help you create the perfect design for your home or office.
                Contact us for a free consultation.
              </p>
              
              <motion.div 
                className="flex flex-wrap justify-center gap-4 md:gap-6"
                variants={staggerContainer}
              >
                <motion.div variants={itemVariants}>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link 
                      to="/contact" 
                      className="btn-primary px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-medium inline-flex items-center"
                    >
                      Get a Free Quote
                    </Link>
                  </motion.div>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <a
                      href="https://wa.me/919999979079"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-medium inline-flex items-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Chat with Our Expert
                    </a>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </main>
      
      <Footer />
      <StickyChat />
    </div>
  );
};

export default ServiceDetail;
