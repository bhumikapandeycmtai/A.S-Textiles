export interface ServiceType {
  id: number;
  title: string;
  description: string;
  image: string;
  detailed: boolean;
  slug: string;
  benefits: string[];
  materials: string[];
  process: string[];
  galleryImages?: string[];
}

const servicesData: ServiceType[] = [
  {
    id: 1,
    title: 'Designer Wallpapers',
    description: 'Transform your space with a symphony of color, texture, and imagination. Each wallpaper is a window to a new world—where minimalist elegance meets bold expression, and subtle patterns whisper stories of timeless beauty. From serene nature scenes and abstract artistry to vintage motifs and futuristic vibes, these wallpapers are more than decor—they\'re an experience. We specialize in working with leading brands like Versace, Sabyasachi, Boråstapeter (Sweden), Mirage, Excel and custom-embroidered wallpapers.',
    image: '/images/Wallpapers/IMG_5713.jpg',
    detailed: true,
    slug: 'designer-wallpapers',
    benefits: [],
    materials: ['Premium vinyl', 'Textured papers', 'Grasscloth', 'Digital prints', 'Hand-painted designs', '3D panels'],
    process: [
      'Design consultation and wallpaper selection',
      'Wall preparation and surface smoothing',
      'Professional application with pattern matching',
      'Trimming and finishing for a perfect look',
      'Final inspection and clean-up'
    ],
    galleryImages: [
      '/images/Wallpapers/IMG_5713.jpg',
      '/images/Wallpapers/IMG_5714.jpg',
      '/images/Wallpapers/IMG_5719.jpg',
      '/images/Wallpapers/IMG_5716.jpg',
      '/images/Wallpapers/IMG_5717.jpg'
    ]
  },
  {
    id: 2,
    title: 'Wooden Flooring',
    description: `Discover the pinnacle of artisanal elegance with our handmade luxury wooden flooring, masterfully crafted in Europe from the continent’s most distinguished hardwoods. Sourced from the pristine forests of Europe and Russia, each plank is a celebration of natural beauty and enduring strength.
    
    Designed for those who appreciate the extraordinary, this flooring transforms spaces into sanctuaries of grandeur. Whether gracing the halls of a private residence, a boutique hotel, or a luxury retail space, it offers a sensorial experience that blends tradition with modern indulgence.
    
    Intricately inlaid with gleaming brass and hand-set with precious stones—such as lapis lazuli, onyx, and mother-of-pearl—this flooring transcends function to become a statement of refined taste. The interplay of rich wood, luminous metal, and radiant gemstones creates a surface that is both captivating and timeless.
    
    Tailored for the most discerning interiors, this is flooring elevated to art—where every step resonates with heritage, craftsmanship, and quiet opulence.
    
    Each installation is a one-of-one creation, tailored with precision to the client’s vision. No detail is too small, no design too ambitious. From the heart of Europe’s artisan tradition, this is flooring to be lived on—and admired for generations.`,
    image: '/images/Wooden flooring/27c4eba8-c6ef-4f71-bb62-9c337d1c12f2.JPG',
    detailed: true,
    slug: 'wooden-flooring',
    
    benefits: [
      'Adds natural warmth and beauty to your space',
      'Increases property value',
      'Durable and long-lasting with proper care',
      'Improves indoor air quality compared to carpets'
    ],
    materials: ['Oak', 'Walnut', 'Cherry', 'Maple', 'Exotic hardwoods'],
    process: [
      'Initial consultation and space assessment',
      'Selection of wood type, finish, and pattern',
      'Subfloor preparation and conditioning',
      'Professional installation by skilled craftsmen',
      'Finishing, sealing, and final inspection'
    ],
    galleryImages: [
      '/images/Wooden flooring/27c4eba8-c6ef-4f71-bb62-9c337d1c12f2.JPG',
      '/images/Wooden flooring/938cc853-ba4c-4825-b2df-4f8fabc961aa.JPG',
      '/images/Wooden flooring/66e0373b-0051-4823-9b1a-0ca93037407f.JPG',
      '/images/Wooden flooring/IMG_6396.JPG',
      '/images/Wooden flooring/IMG_6397.JPG'
    ]
  },
  {
    id: 3,
    title: 'Furniture Doors',
    description: 'Elegant and durable furniture doors to enhance your interiors.\n\nWhere craftsmanship meets grandeur—our luxurious wooden carving main doors are more than entrances; they are bold statements of timeless elegance. Hand-carved from the finest hardwoods, each door is a masterpiece of intricate detail and enduring strength. With motifs inspired by royal architecture and natural beauty, these doors welcome you home with a sense of prestige, tradition, and unmatched artistry.',
    image: '/images/Furniture-doors/IMG_83944.jpg',
    detailed: true,
    slug: 'furniture-doors',
    benefits: [
      'Enhances the aesthetic appeal of your furniture',
      'Durable and long-lasting',
      'Customizable designs to fit your style',
      'Easy to maintain and clean'
    ],
    materials: ['Teak', 'Rosewood', 'Mahogany', 'Sheesham', 'Oak'],
    process: [
      'Design consultation and concept development',
      'Wood selection based on design requirements',
      'Precision cutting and assembly',
      'Finishing, polishing, and quality inspection'
    ],
    galleryImages: [
      '/images/Furniture-doors/IMG_8394.JPG',
      '/images/Furniture-doors/IMG_8299.JPG',
      '/images/Furniture-doors/IMG_8298.JPG',
      '/images/Furniture-doors/IMG_8292.JPG',
      '/images/Furniture-doors/IMG_8293.JPG'
    ]
  },
  {
    id: 4,
    title: 'Carpets',
    description: 'Elegant and durable furniture doors to enhance your interiors.\n\nWhere craftsmanship meets grandeur—our luxurious wooden carving main doors are more than entrances; they are bold statements of timeless elegance. Hand-carved from the finest hardwoods, each door is a masterpiece of intricate detail and enduring strength. With motifs inspired by royal architecture and natural beauty, these doors welcome you home with a sense of prestige, tradition, and unmatched artistry.\n\nStep into a world of opulence where every thread tells a story of craftsmanship and elegance. Our luxurious high end carpets blend timeless design with rich textures, transforming ordinary floors into canvases of sophistication. Woven with premium materials and inspired by heritage artistry, each piece is a masterpiece—inviting warmth, comfort, and grandeur into your living space. We exclusively deal in high-end woolen, silk, knotted, and tufted carpets.',
    image: '/images/Carpets/IMG_5125.JPG',
    detailed: true,
    slug: 'carpets',
    benefits: [
      'Adds warmth and comfort to your space',
      'Wide variety of styles and designs',
      'Easy to clean and maintain',
      'Improves indoor air quality compared to hard floors'
    ],
    materials: ['Wool', 'Nylon', 'Polyester', 'Acrylic', 'Silk'],
    process: [
      'Site evaluation and measurement',
      'Selection of carpet style and design',
      'Professional installation with proper underlayment',
      'Finishing touches and quality inspection'
    ],
    galleryImages: [
      '/images/Carpets/IMG_6807.JPG',
      '/images/Carpets/IMG_5125.JPG',
      '/images/Carpets/271c8130-8046-4c68-b79f-37edf746b3b1.JPG',
      '/images/Carpets/2e79f3a6-e595-4f38-a17e-3f130e6b3b3b.JPG',
      '/images/Carpets/41f4d41a-95ad-475b-8cde-4d957bd9c231.JPG'
    ]
  },
  {
    id: 5,
    title: 'Furniture Consoles',
    description: 'Stylish furniture consoles to complement your living space.',
    image: '/images/Furniture-consoles/IMG_8386.JPG',
    detailed: true,
    slug: 'furniture-consoles',
    benefits: [
      'Adds elegance and functionality to your space',
      'Durable and long-lasting',
      'Customizable designs to fit your style',
      'Easy to maintain and clean'
    ],
    materials: ['Teak', 'Rosewood', 'Mahogany', 'Sheesham', 'Oak'],
    process: [
      'Design consultation and concept development',
      'Wood selection based on design requirements',
      'Precision cutting and assembly',
      'Finishing, polishing, and quality inspection'
    ],
    galleryImages: [
      '/images/Furniture-consoles/IMG_8386.JPG',
      '/images/Furniture-consoles/IMG_8387.JPG',
      '/images/Furniture-consoles/IMG_8388.JPG',
      '/images/Furniture-consoles/IMG_8389.JPG',
      '/images/Furniture-consoles/IMG_8390.JPG'
    ]
  },
  {
    id: 6,
    title: 'Furniture Sofas',
    description: 'Elegant and durable furniture doors to enhance your interiors.\n\nWhere craftsmanship meets grandeur—our luxurious wooden carving main doors are more than entrances; they are bold statements of timeless elegance. Hand-carved from the finest hardwoods, each door is a masterpiece of intricate detail and enduring strength. With motifs inspired by royal architecture and natural beauty, these doors welcome you home with a sense of prestige, tradition, and unmatched artistry.\n\nStep into a world of opulence where every thread tells a story of craftsmanship and elegance. Our luxurious high end carpets blend timeless design with rich textures, transforming ordinary floors into canvases of sophistication. Woven with premium materials and inspired by heritage artistry, each piece is a masterpiece—inviting warmth, comfort, and grandeur into your living space. We exclusively deal in high-end woolen, silk, knotted, and tufted carpets.\n\nElegance sculpted into every curve—our luxurious wooden carving sofas are the epitome of regal comfort and timeless artistry. Handcrafted by master artisans, each piece features intricate carvings on rich hardwood frames, seamlessly blending tradition with sophistication. Upholstered in premium fabrics and designed for both comfort and visual grandeur, these sofas are not just furniture—they are heirlooms of elegance that transform any space into a royal retreat.',
    image: '/images/Furniture-sofas/IMG_8313.JPG',
    detailed: true,
    slug: 'furniture-sofas',
    benefits: [
      'Provides comfort and style',
      'Wide variety of styles and designs',
      'Durable and long-lasting',
      'Easy to maintain and clean'
    ],
    materials: ['Leather', 'Fabric', 'Wood', 'Metal'],
    process: [
      'Design consultation and concept development',
      'Material selection based on design requirements',
      'Precision cutting and assembly',
      'Finishing, polishing, and quality inspection'
    ],
    galleryImages: [
      '/images/Furniture-sofas/IMG_8313.JPG',
      '/images/Furniture-sofas/IMG_8310.JPG',
      '/images/Furniture-sofas/IMG_8314.JPG',
      '/images/Furniture-sofas/4B24DC39-DACC-4EC9-B24C-4FBE9108D5B3.JPG',
      '/images/Furniture-sofas/IMG_8308.JPG'
    ]
  },
  {
    id: 7,
    title: 'Dinnerware & Tableware',
    description: 'Elegant and durable furniture doors to enhance your interiors.\n\nWhere craftsmanship meets grandeur—our luxurious wooden carving main doors are more than entrances; they are bold statements of timeless elegance. Hand-carved from the finest hardwoods, each door is a masterpiece of intricate detail and enduring strength. With motifs inspired by royal architecture and natural beauty, these doors welcome you home with a sense of prestige, tradition, and unmatched artistry.\n\nStep into a world of opulence where every thread tells a story of craftsmanship and elegance. Our luxurious high end carpets blend timeless design with rich textures, transforming ordinary floors into canvases of sophistication. Woven with premium materials and inspired by heritage artistry, each piece is a masterpiece—inviting warmth, comfort, and grandeur into your living space. We exclusively deal in high-end woolen, silk, knotted, and tufted carpets.\n\nElegance sculpted into every curve—our luxurious wooden carving sofas are the epitome of regal comfort and timeless artistry. Handcrafted by master artisans, each piece features intricate carvings on rich hardwood frames, seamlessly blending tradition with sophistication. Upholstered in premium fabrics and designed for both comfort and visual grandeur, these sofas are not just furniture—they are heirlooms of elegance that transform any space into a royal retreat.\n\nElevate every dining moment with our complete collection of luxurious high-end dinnerware and tableware—where sophistication meets timeless design. Crafted from the finest porcelain, crystal, and precious metals, each piece is a statement of elegance and refined taste. Delicate detailing, artisanal finishes, and flawless craftsmanship come together to transform your table into a masterpiece of opulence. Whether hosting a grand celebration or an intimate gathering, this dinnerware collection redefines luxury—one exquisite setting at a time. We deal in exquisite brands like Noritake & Vignetto.',
    image: '/images/Dinnerware & Tableware/IMG_5975.jpg',
    detailed: true,
    slug: 'dinnerware-tableware',
    benefits: [
      'Enhances the aesthetic appeal of your dining table',
      'Durable and long-lasting',
      'Wide variety of styles and designs',
      'Easy to maintain and clean'
    ],
    materials: ['Ceramic', 'Porcelain', 'Glass', 'Metal'],
    process: [
      'Design consultation and concept development',
      'Material selection based on design requirements',
      'Precision cutting and assembly',
      'Finishing, polishing, and quality inspection'
    ],
    galleryImages: [
      '/images/Dinnerware & Tableware/IMG_5975.jpg',
      '/images/Dinnerware & Tableware/IMG_5972.jpg',
      '/images/Dinnerware & Tableware/IMG_5973.jpg',
      '/images/Dinnerware & Tableware/IMG_5975.jpg',
      '/images/Dinnerware & Tableware/IMG_5977.jpg'
    ]
  },
  {
    id: 8,
    title: 'Furniture Kitchen',
    description: 'Where craftsmanship meets grandeur—our luxurious wooden carving doors, sofas, kitchens, carpets, and dinnerware are more than just decor—they’re bold statements of timeless elegance. Handcrafted from the finest materials, each piece reflects rich tradition, intricate detailing, and elite comfort.\n\nFrom hand-carved hardwood doors and regal sofas to bespoke kitchens and heritage-inspired carpets, our collection transforms every space into a masterpiece. Add to that our refined dinnerware from brands like Noritake & Vignetto, and you have a complete expression of luxury living.\n\nElegance, comfort, and sophistication—crafted to last and designed to impress.',
    image: '/images/Furniture-kitchen/IMG_7407.JPG',
    detailed: true,
    slug: 'furniture-kitchen',
    benefits: [
      'Enhances the aesthetic appeal of your kitchen',
      'Durable and long-lasting',
      'Customizable designs to fit your style',
      'Easy to maintain and clean'
    ],
    materials: ['Teak', 'Rosewood', 'Mahogany', 'Sheesham', 'Oak'],
    process: [
      'Design consultation and concept development',
      'Wood selection based on design requirements',
      'Precision cutting and assembly',
      'Finishing, polishing, and quality inspection'
    ],
    galleryImages: [
      '/images/Furniture-kitchen/IMG_7407.JPG',
      '/images/Furniture-kitchen/IMG_7408.JPG',
      '/images/Furniture-kitchen/IMG_8372.JPG',
      '/images/Furniture-kitchen/IMG_8373.JPG',
      '/images/Furniture-kitchen/IMG_8374.JPG'
    ]
  },
  {
    id: 9,
    title: 'Tiles',
    description: 'Where craftsmanship meets grandeur—our luxury collection spans intricately carved wooden doors, regal sofas, bespoke kitchens, artistic carpets, elegant dinnerware, and handcrafted tiles. Each piece is a statement of timeless elegance, crafted from the finest materials to reflect prestige, tradition, and design mastery.\n\nFrom royal hardwood carvings to heritage-inspired carpets and porcelain dinnerware from brands like Noritake & Vignetto, every detail echoes sophistication. Our artisanal tiles—handmade from fine porcelain, luminous glass, and natural stone—blend art with architecture, elevating surfaces with texture, depth, and lasting beauty.\n\nEvery creation is a celebration of craftsmanship—designed to transform spaces into living experiences of comfort, style, and luxury.',
    image: '/images/Tiles/PHOTO-2025-04-19-15-20-56 7.jpg',
    detailed: true,
    slug: 'tiles',
    benefits: [
      'Wide range of designs, patterns and textures',
      'Highly durable and water-resistant',
      'Easy to clean and maintain',
      'Excellent for high-traffic areas'
    ],
    materials: ['Ceramic', 'Porcelain', 'Natural stone', 'Marble', 'Glass', 'Mosaic'],
    process: [
      'Space assessment and design consultation',
      'Material and pattern selection',
      'Surface preparation and waterproofing',
      'Professional installation with precision cutting',
      'Grouting, sealing and final cleaning'
    ],
    galleryImages: [
      '/images/Tiles/PHOTO-2025-04-19-15-20-56 7.jpg',
      
      '/images/Tiles/PHOTO-2025-04-17-15-37-43 3.JPG',
      '/images/Tiles/PHOTO-2025-04-17-15-37-43 4.JPG',
      '/images/Tiles/PHOTO-2025-04-19-15-20-56 11.jpg',
      '/images/Tiles/PHOTO-2025-04-19-15-20-56 10.jpg'
    ]
  }
];

export default servicesData;
