import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Badge } from "@/components/ui/badge";

const myWorkProjects = [
  {
    id: 1,
    title: 'Modern Living Room Design',
    category: 'Interior Design',
    image: '/images/my-work/IMG_8095.jpeg',
    description: 'Contemporary living space with elegant furnishings and natural light'
  },
  {
    id: 2,
    title: 'Elegant Dining Space',
    category: 'Interior Design',
    image: '/images/my-work/IMG_8085.jpeg',
    description: 'Luxurious dining area combining comfort with sophistication'
  },
  {
    id: 3,
    title: 'Contemporary Kitchen',
    category: 'Kitchen Design',
    image: '/images/my-work/IMG_8093.jpeg',
    description: 'Modern kitchen with premium finishes and state-of-the-art appliances'
  },
  {
    id: 4,
    title: 'Luxury Bedroom Suite',
    category: 'Interior Design',
    image: '/images/my-work/IMG_8097.jpeg',
    description: 'Serene bedroom retreat with custom furnishings and premium textiles'
  },
  {
    id: 5,
    title: 'Modern Bathroom Design',
    category: 'Bathroom Design',
    image: '/images/my-work/IMG_8083.jpeg',
    description: 'Spa-like bathroom featuring premium fixtures and elegant tiling'
  },
  {
    id: 6,
    title: 'Stylish Home Office',
    category: 'Interior Design',
    image: '/images/my-work/e3a50543-2907-4ef1-abf8-7434efb0d44e.jpeg',
    description: 'Productive workspace blending functionality with sophisticated design'
  },
  {
    id: 7,
    title: 'Luxurious Master Suite',
    category: 'Interior Design',
    image: '/images/my-work/09d323ab-a630-4362-9103-2f9d504a2e88.jpeg',
    description: 'Opulent master bedroom with custom lighting and premium finishes'
  },
  {
    id: 8,
    title: 'Modern Entertainment Area',
    category: 'Living Space',
    image: '/images/my-work/9feb0480-dba2-4898-b2db-ce279ee25a46.jpeg',
    description: 'Contemporary entertainment space designed for comfort and style'
  },
  {
    id: 9,
    title: 'Designer Kitchen Space',
    category: 'Kitchen Design',
    image: '/images/my-work/5d50b21a-adc6-451c-a410-c7a089074dae.jpeg',
    description: 'Gourmet kitchen featuring modern appliances and elegant design'
  },
  {
    id: 10,
    title: 'Elegant Living Area',
    category: 'Living Space',
    image: '/images/my-work/f7b582a8-a48b-4c1f-ad59-5779ab056ac1.jpeg',
    description: 'Sophisticated living space with premium furnishings and decor'
  },
  {
    id: 11,
    title: 'Contemporary Family Room',
    category: 'Living Space',
    image: '/images/my-work/25ceab74-b3d4-422f-b203-fd93de96614b (1).jpeg',
    description: 'Modern family room designed for both comfort and style'
  }
];

const MyWork = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ image: string; title: string } | null>(null);

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const openModal = (image: string, title: string) => {
    setSelectedImage({ image, title });
    document.body.style.overflow = 'hidden';
  };

  return (
    <div className="min-h-screen bg-cream-light">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1920&auto=format&fit=crop"
            alt="AYRAJ Luxury Projects"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>

        <div className={`relative z-10 text-center text-white max-w-4xl mx-auto px-6 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
          <Badge variant="outline" className="mb-6 text-gold border-gold/50 bg-black/20 backdrop-blur-sm">
            Our Signature Projects
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-playfair">
            Crafting Luxurious Spaces
          </h1>
          <p className="text-xl text-cream/90 max-w-3xl mx-auto">
            Explore our portfolio of meticulously designed and executed projects that showcase our commitment to excellence.
          </p>
        </div>
      </section>

      {/* Projects Grid Section */}
      <section className="py-20 bg-gradient-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-olive mb-6 font-playfair">Featured Projects</h2>
            <p className="text-xl text-olive/80 max-w-3xl mx-auto">
              Each project is a unique blend of creativity, functionality, and luxury craftsmanship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {myWorkProjects.map((project) => (
              <div
                key={project.id}
                className="group relative overflow-hidden rounded-xl cursor-pointer bg-white"
                onClick={() => openModal(project.image, project.title)}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[9999] bg-black"
          onClick={closeModal}
        >
          <div 
            className="relative w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
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
            <div className="w-full h-full flex items-center justify-center">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="max-w-full max-h-full w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default MyWork; 