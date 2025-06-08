import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

const AboutPreview = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Smooth spring animation for mouse movement
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 300 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Split text into words for animation
  const titleWords = "About A.S Textiles".split(" ");
  const subtitleWords = "Rooted in Tradition, Designed for the World".split(" ");
  const descriptionWords = "A.S. Textiles is a premier handloom export company based in Panipat, India, renowned for crafting high-quality home furnishings that blend traditional artistry with global design sensibilities. With a rich legacy in textiles and a focus on export markets, we offer a wide range of handcrafted products including rugs, carpets, cushions, throws, poufs, bath mats, and wall decor. Every piece is thoughtfully designed and meticulously made to bring comfort, beauty, and timeless style into homes around the world.".split(" ");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const imageVariants = {
    hidden: { 
      scale: 0.8,
      opacity: 0,
      x: -200,
      rotateY: -45,
      perspective: 1000,
      filter: "blur(10px)"
    },
    visible: {
      scale: 1,
      opacity: 1,
      x: 0,
      rotateY: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 20,
        mass: 1.5,
        duration: 1.5
      }
    }
  };

  const wordVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
      filter: "blur(10px)",
      textShadow: "0 0 0px rgba(0,0,0,0)"
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      textShadow: "0 2px 4px rgba(0,0,0,0.2)",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 1,
        delay: 0.1 * i
      }
    })
  };

  const badgeVariants = {
    hidden: { 
      scale: 0,
      rotate: -45,
      opacity: 0,
      y: 50
    },
    visible: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: 0.6
      }
    },
    hover: {
      scale: 1.1,
      rotate: [0, -5, 5, 0],
      transition: {
        rotate: {
          duration: 0.8,
          ease: "easeInOut",
          repeat: Infinity
        }
      }
    }
  };

  const featureVariants = {
    hidden: { 
      opacity: 0,
      x: -50,
      filter: "blur(5px)"
    },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: 0.2 * i
      }
    }),
    hover: {
      x: 15,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 15
      }
    }
  };

  const buttonVariants = {
    hidden: { 
      opacity: 0,
      y: 30,
      filter: "blur(5px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: 1
      }
    },
    hover: {
      scale: 1.05,
      y: -2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 15
      }
    },
    tap: {
      scale: 0.95,
      y: 0
    }
  };

  // Handle mouse movement for parallax effect
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX - innerWidth / 2) / 25;
    const y = (clientY - innerHeight / 2) / 25;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <motion.section 
      style={{ opacity, scale }}
      className="py-20 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      onMouseMove={handleMouseMove}
    >
      <div className="container mx-auto px-4">
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Image Container */}
          <motion.div 
            className="relative"
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div 
              className="rounded-lg overflow-hidden shadow-2xl"
              style={{
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
              }}
            >
              <motion.img
            src="https://i.pinimg.com/736x/e7/2a/d3/e72ad37f56b69894bd1df472927d34bc.jpg"
            alt="Luxury Interior"
                className="w-full h-full object-cover"
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ 
                  duration: 1.8,
                  ease: [0.6, -0.05, 0.01, 0.99]
                }}
              />
            </motion.div>
            <motion.div 
              variants={badgeVariants}
              className="absolute -bottom-8 -right-8 bg-gold text-white p-6 rounded-lg shadow-xl hidden md:block"
              style={{
                background: "linear-gradient(135deg, #D4AF37 0%, #FBF5B7 100%)",
                boxShadow: "0 10px 30px rgba(212, 175, 55, 0.3)"
              }}
            >
              <motion.p 
                className="font-playfair text-2xl font-medium"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 2, 0],
                  textShadow: [
                    "0 0 0px rgba(255,255,255,0)",
                    "0 0 10px rgba(255,255,255,0.5)",
                    "0 0 0px rgba(255,255,255,0)"
                  ]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                28+ Years
              </motion.p>
              <p className="text-sm opacity-90">of Excellence</p>
            </motion.div>
          </motion.div>
          
          {/* Content */}
          <motion.div 
            className="space-y-6"
            variants={containerVariants}
            style={{ y }}
          >
            {/* Title with word by word animation */}
            <div className="flex flex-wrap gap-2">
              {titleWords.map((word, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={wordVariants}
                  className="section-title inline-block"
                  style={{
                    textShadow: "0 2px 4px rgba(0,0,0,0.1)"
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </div>

            {/* Subtitle with word by word animation */}
            <div className="flex flex-wrap gap-2">
              {subtitleWords.map((word, i) => (
                <motion.span
                  key={i}
                  custom={i + titleWords.length}
                  variants={wordVariants}
                  className="section-subtitle inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </div>
            
            {/* Description with word by word animation */}
            <div className="flex flex-wrap gap-2">
              {descriptionWords.map((word, i) => (
                <motion.span
                  key={i}
                  custom={i + titleWords.length + subtitleWords.length}
                  variants={wordVariants}
                  className="text-muted-foreground inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </div>
            
            <motion.div 
              className="space-y-6 my-8"
              variants={containerVariants}
            >
              {[
                {
                  title: "Global-Standard Quality",
                  description: "Export-grade craftsmanship backed by SMETA-certified ethical and quality practices."
                },
                {
                  title: "Authentic Handloom Expertise",
                  description: "Traditional weaving techniques from India’s textile heartland, infused with modern aesthetics."
                },
                {
                  title: "Wide Product Range",
                  description: "From tufted carpets to macramé wall hangings — versatile designs for every space and style."
                }
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  variants={featureVariants}
                  custom={index}
                  className="flex items-start group" 
                  whileHover="hover"
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, 0],
                      filter: [
                        "drop-shadow(0 0 0px rgba(212, 175, 55, 0))",
                        "drop-shadow(0 0 8px rgba(212, 175, 55, 0.5))",
                        "drop-shadow(0 0 0px rgba(212, 175, 55, 0))"
                      ]
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2
                    }}
                  >
                    <CheckCircle className="h-6 w-6 text-gold mr-3 flex-shrink-0 mt-0.5" />
                  </motion.div>
                  <div className="transform transition-all duration-300 group-hover:translate-x-2">
                    <h3 className="font-medium text-lg text-black group-hover:text-gold transition-colors duration-300">{feature.title}</h3>
                    <p className="text-muted-foreground group-hover:text-black/70 transition-colors duration-300">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="relative"
            >
              <Link 
                to="/about" 
                className="btn-primary inline-flex items-center relative overflow-hidden group bg-black hover:bg-black/90 text-white"
                style={{
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)"
                }}
              >
                <span className="relative z-10">Learn More About Us</span>
                <motion.span
                  className="relative z-10 ml-2"
                  animate={{ 
                    x: [0, 5, 0],
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <ArrowRight size={18} />
                </motion.span>
                <motion.div
                  className="absolute inset-0 bg-white/10"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AboutPreview;
