import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from 'framer-motion';

// Predefined image paths for each category
const categoryImages = {
  'Majestic Door': [
    // Furniture-doors
    { id: 'Majestic Door-1', image: '/images/Furniture-doors/IMG_8289 (2).JPG', title: 'Designer Door' },
    { id: 'Majestic Door-2', image: '/images/Furniture-doors/IMG_8290.JPG', title: 'Designer Door' },
    { id: 'Majestic Door-3', image: '/images/Furniture-doors/IMG_8291.JPG', title: 'Designer Door' },
    { id: 'Majestic Door-4', image: '/images/Furniture-doors/IMG_8292.JPG', title: 'Designer Door' },
    { id: 'Majestic Door-5', image: '/images/Furniture-doors/IMG_8293.JPG', title: 'Designer Door' },
    { id: 'Majestic Door-6', image: '/images/Furniture-doors/IMG_8294.JPG', title: 'Designer Door' }
  ],
  'Furniture consoles': [
    // Furniture-consoles
    { id: 'Furniture consoles-1', image: '/images/Furniture-consoles/IMG_8386.JPG', title: 'Console' },
    { id: 'Furniture consoles-2', image: '/images/Furniture-consoles/IMG_8387.JPG', title: 'Console' },
    { id: 'Furniture consoles-3', image: '/images/Furniture-consoles/IMG_8388.JPG', title: 'Console' },
    { id: 'Furniture consoles-4', image: '/images/Furniture-consoles/IMG_8389.JPG', title: 'Console' },
    { id: 'Furniture consoles-5', image: '/images/Furniture-consoles/IMG_8390.JPG', title: 'Console' },
    { id: 'Furniture consoles-6', image: '/images/Furniture-consoles/IMG_8396.JPG', title: 'Console' }
  ],
  'Aura Sofas': [
    // Furniture-sofas
    { id: 'Aura Sofas-1', image: '/images/Furniture-sofas/PHOTO-2025-04-17-15-38-42.JPG', title: 'Sofa' },
    { id: 'Aura Sofas-2', image: '/images/Furniture-sofas/PHOTO-2025-04-17-15-38-42 4.JPG', title: 'Sofa' },
    { id: 'Aura Sofas-3', image: '/images/Furniture-sofas/IMG_8385.JPG', title: 'Sofa' },
    { id: 'Aura Sofas-4', image: '/images/Furniture-sofas/IMG_8383.JPG', title: 'Sofa' },
    { id: 'Aura Sofas-5', image: '/images/Furniture-sofas/IMG_8382.JPG', title: 'Sofa' },
    { id: 'Aura Sofas-6', image: '/images/Furniture-sofas/IMG_8377.JPG', title: 'Sofa' }
  ],
  'Divine Kitchens': [
    // Furniture-kitchen
    { id: 'Divine Kitchens-1', image: '/images/Furniture-kitchen/PHOTO-2025-04-17-15-38-42 3.JPG', title: 'Kitchen' },
    { id: 'Divine Kitchens-2', image: '/images/Furniture-kitchen/PHOTO-2025-04-17-15-38-41.JPG', title: 'Kitchen' },
    { id: 'Divine Kitchens-3', image: '/images/Furniture-kitchen/IMG_8376.JPG', title: 'Kitchen' },
    { id: 'Divine Kitchens-4', image: '/images/Furniture-kitchen/IMG_8375.JPG', title: 'Kitchen' },
    { id: 'Divine Kitchens-5', image: '/images/Furniture-kitchen/IMG_8374.JPG', title: 'Kitchen' },
    { id: 'Divine Kitchens-6', image: '/images/Furniture-kitchen/IMG_8373.JPG', title: 'Kitchen' }
  ],
  'Carpets': [
    // Carpets
    { id: 'Carpets-1', image: '/images/Carpets/IMG_6807.JPG', title: 'Carpet' },
    { id: 'Carpets-2', image: '/images/Carpets/IMG_5125.JPG', title: 'Carpet' },
    { id: 'Carpets-3', image: '/images/Carpets/5eff7b7d-1ca0-474e-bd9c-7e9dd2788095.JPG', title: 'Carpet' },
    { id: 'Carpets-4', image: '/images/Carpets/41f4d41a-95ad-475b-8cde-4d957bd9c231.JPG', title: 'Carpet' },
    { id: 'Carpets-5', image: '/images/Carpets/2e79f3a6-e595-4f38-a17e-3f130e6b3b3b.JPG', title: 'Carpet' },
    { id: 'Carpets-6', image: '/images/Carpets/271c8130-8046-4c68-b79f-37edf746b3b1.JPG', title: 'Carpet' }
  ],
  'Dinnerware': [
    // Dinnerware & Tableware
    { id: 'Dinnerware-1', image: '/images/Dinnerware & Tableware/IMG_5978.jpg', title: 'Dinnerware' },
    { id: 'Dinnerware-2', image: '/images/Dinnerware & Tableware/IMG_5977.jpg', title: 'Dinnerware' },
    { id: 'Dinnerware-3', image: '/images/Dinnerware & Tableware/IMG_5975.jpg', title: 'Dinnerware' },
    { id: 'Dinnerware-4', image: '/images/Dinnerware & Tableware/IMG_5973.jpg', title: 'Dinnerware' },
    { id: 'Dinnerware-5', image: '/images/Dinnerware & Tableware/IMG_5972.jpg', title: 'Dinnerware' },
    { id: 'Dinnerware-6', image: '/images/Dinnerware & Tableware/IMG_5970.jpg', title: 'Dinnerware' }
  ],
  'Wooden': [
    // Wooden flooring
    { id: 'Wooden-1', image: '/images/Wooden flooring/IMG_6397.JPG', title: 'Wooden Flooring' },
    { id: 'Wooden-2', image: '/images/Wooden flooring/IMG_6396.JPG', title: 'Wooden Flooring' },
    { id: 'Wooden-3', image: '/images/Wooden flooring/IMG_5818.JPG', title: 'Wooden Flooring' },
    { id: 'Wooden-4', image: '/images/Wooden flooring/IMG_5815.JPG', title: 'Wooden Flooring' },
    { id: 'Wooden-5', image: '/images/Wooden flooring/IMG_5071.JPG', title: 'Wooden Flooring' },
    { id: 'Wooden-6', image: '/images/Wooden flooring/IMG_2169.JPG', title: 'Wooden Flooring' }
  ],
  'Tiles': [
    // Tiles
    { id: 'Tiles-1', image: '/images/Tiles/PHOTO-2025-04-19-15-22-18.jpg', title: 'Tile' },
    { id: 'Tiles-2', image: '/images/Tiles/PHOTO-2025-04-19-15-22-18 8.JPG', title: 'Tile' },
    { id: 'Tiles-3', image: '/images/Tiles/PHOTO-2025-04-19-15-22-18 7.JPG', title: 'Tile' },
    { id: 'Tiles-4', image: '/images/Tiles/PHOTO-2025-04-19-15-22-18 6.JPG', title: 'Tile' },
    { id: 'Tiles-5', image: '/images/Tiles/PHOTO-2025-04-19-15-22-18 5.JPG', title: 'Tile' },
    { id: 'Tiles-6', image: '/images/Tiles/PHOTO-2025-04-19-15-22-18 4.jpg', title: 'Tile' }
  ],
  'Wallpapers': [
    // Wallpapers
    { id: 'Wallpapers-1', image: '/images/Wallpapers/IMG_7907.JPG', title: 'Wallpaper' },
    { id: 'Wallpapers-2', image: '/images/Wallpapers/IMG_5733.jpg', title: 'Wallpaper' },
    { id: 'Wallpapers-3', image: '/images/Wallpapers/IMG_5732.jpg', title: 'Wallpaper' },
    { id: 'Wallpapers-4', image: '/images/Wallpapers/IMG_5731.jpg', title: 'Wallpaper' },
    { id: 'Wallpapers-5', image: '/images/Wallpapers/IMG_5730.jpg', title: 'Wallpaper' },
    { id: 'Wallpapers-6', image: '/images/Wallpapers/IMG_5729.jpg', title: 'Wallpaper' }
  ]
};

const categories = [
  'Wallpapers',
  'Majestic Door',
  'Carpets',
  'Furniture consoles',
  'Aura Sofas',
  'Dinnerware',
  'Divine Kitchens',
  'Wooden',
  'Tiles'
];

const myWorkProjects = [
  {
    id: 1,
    title: 'Modern Living Room Design',
    category: 'Interior Design',
    image: '/images/my-work/IMG_8095.jpeg',
    type: 'image'
  },
  {
    id: 2,
    title: 'Elegant Dining Space',
    category: 'Interior Design',
    image: '/images/my-work/IMG_8085.jpeg',
    type: 'image'
  },
  {
    id: 3,
    title: 'Contemporary Kitchen',
    category: 'Kitchen Design',
    image: '/images/my-work/IMG_8093.jpeg',
    type: 'image'
  },
  {
    id: 4,
    title: 'Luxury Bedroom Suite',
    category: 'Interior Design',
    image: '/images/my-work/IMG_8097.jpeg',
    type: 'image'
  },
  {
    id: 5,
    title: 'Modern Bathroom Design',
    category: 'Bathroom Design',
    image: '/images/my-work/IMG_8083.jpeg',
    type: 'image'
  },
  {
    id: 6,
    title: 'Stylish Home Office',
    category: 'Interior Design',
    image: '/images/my-work/e3a50543-2907-4ef1-abf8-7434efb0d44e.jpeg',
    type: 'image'
  }
];

const PortfolioPreview = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [showAll, setShowAll] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ image: string; title: string } | null>(null);

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const openModal = (image: string, title: string) => {
    setSelectedImage({ image, title });
    document.body.style.overflow = 'hidden';
  };

  const filteredGallery = activeCategory === 'All'
    ? Object.values(categoryImages).flat()
    : categoryImages[activeCategory as keyof typeof categoryImages] || [];
  
  const displayedGallery = showAll ? filteredGallery : filteredGallery.slice(0, 9);
  const hasMoreImages = filteredGallery.length > 9;

  // Animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.6,0.01,0.05,0.95] } }
  };
  const subtitleVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, delay: 0.2, ease: [0.6,0.01,0.05,0.95] } }
  };
  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.08, boxShadow: "0 4px 20px rgba(212,175,55,0.15)", transition: { type: "spring", stiffness: 400, damping: 15 } },
    active: { scale: 0.97 }
  };
  const galleryItemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: (i) => ({ opacity: 1, y: 0, scale: 1, transition: { delay: 0.1 * i, duration: 0.7, type: "spring", stiffness: 80 } })
  };

  return (
    <section className="py-20 bg-gradient-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            className="section-title"
            variants={titleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.7 }}
            style={{ textShadow: "0 4px 16px rgba(0,0,0,0.08)" }}
          >
            Our Portfolio
          </motion.h2>
          <motion.p
            className="section-subtitle"
            variants={subtitleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.7 }}
            style={{ textShadow: "0 2px 8px rgba(212,175,55,0.08)" }}
          >
            Explore Our Recent Projects
          </motion.p>
        </div>

        {/* Tabs */}
        <div className="mb-12">
          <Tabs defaultValue="portfolio" className="w-full">
            <TabsList className="w-full flex justify-center mb-8 bg-white/50">
              <TabsTrigger value="portfolio" className="text-base px-6 py-3">Portfolio</TabsTrigger>
              <TabsTrigger value="mywork" className="text-base px-6 py-3">My Work</TabsTrigger>
            </TabsList>

            {/* Portfolio Tab Content */}
            <TabsContent value="portfolio">
              {/* Filter Buttons */}
              <div className="grid grid-cols-3 gap-2 md:flex md:flex-wrap md:justify-center md:gap-4 mb-12">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => {
                      setActiveCategory(category);
                      setShowAll(false);
                    }}
                    className={`px-3 py-2 md:px-6 md:py-3 rounded-md transition-colors text-sm md:text-base ${
                      activeCategory === category
                        ? 'bg-olive text-white'
                        : 'bg-cream text-olive hover:bg-olive/10'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Gallery Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedGallery.map(item => (
                  <div 
                    key={item.id} 
                    className={`gallery-item relative overflow-hidden rounded-xl cursor-pointer ${
                      item.id.startsWith('Majestic Door') ? 'md:col-span-1 lg:col-span-1' : ''
                    }`}
                    onClick={() => openModal(item.image, item.title)}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className={`w-full object-contain transition-transform duration-300 group-hover:scale-110 ${
                        item.id.startsWith('Majestic Door') 
                          ? 'h-[500px]' // Taller height for doors
                          : 'h-80' // Normal height for other items
                      }`}
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <h3 className="text-white font-playfair text-xl font-medium">
                        {item.title}
                      </h3>
                      <p className="text-cream/80 text-sm">
                        {item.id.split('-')[0]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* View All Button */}
              {hasMoreImages && !showAll && (
                <div className="text-center mt-8">
                  <button
                    onClick={() => setShowAll(true)}
                    className="px-8 py-3 bg-olive text-white rounded-md hover:bg-olive-dark transition-colors"
                  >
                    View All {activeCategory === 'All' ? 'Images' : `${activeCategory} Images`}
                  </button>
                </div>
              )}
            </TabsContent>

            {/* My Work Tab Content */}
            <TabsContent value="mywork">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myWorkProjects.map(project => (
                  <div 
                    key={project.id} 
                    className="gallery-item relative overflow-hidden rounded-xl cursor-pointer"
                    onClick={() => openModal(project.image, project.title)}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <h3 className="text-white font-playfair text-xl font-medium">
                        {project.title}
                      </h3>
                      <p className="text-cream/80 text-sm">
                        {project.category}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4 md:p-6"
            onClick={closeModal}
          >
            <div 
              className="relative w-full max-w-4xl mx-auto rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                aria-label="Close modal"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
              </button>

              {/* Image container */}
              <div className="relative aspect-[4/3] w-full bg-black/30">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Image title */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4 backdrop-blur-sm">
                <h3 className="text-lg md:text-xl font-playfair text-center">
                  {selectedImage.title}
                </h3>
              </div>
            </div>
          </div>
        )}

        <div className="text-center mt-12">
          <Link to="/gallery" className="btn-primary inline-flex">
            View Full Gallery <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PortfolioPreview;
