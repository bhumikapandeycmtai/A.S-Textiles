export interface ServicesType {
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

export const servicesData: ServicesType[] = [
  {
    id: 1,
    title: "Carpets",
    description: "Hand-woven and tufted carpets that blend trend, tradition, and craftsmanship.",
    image: "/images/Carpets/bg.jpg",
    detailed: true,
    slug: "carpets",
    benefits: [
      "Crafted by skilled artisans",
      "Durable and luxurious finish",
      "Available in a variety of designs and yarns"
    ],
    materials: ["Cotton", "Wool", "PET Yarn", "Various blended yarns"],
    process: ["Tufting", "Hand weaving", "Finishing", "Quality checks"],
    galleryImages: [
                    "/images/Carpets/carpet1.jpg",
                    "/images/Carpets/carpet2.jpg",
                    "/images/Carpets/carpet3.jpg",
                    "/images/Carpets/carpet4.jpg",
                    "/images/Carpets/carpet5.jpg",
                   ]
  },
  {
    id: 2,
    title: "Durries & Kilims",
    description: "Traditional and contemporary durries made from premium yarns using Punja, Pit-loom, and Frame-loom techniques.",
    image: "/images/Durries/bg.jpg",
    detailed: true,
    slug: "durries-kilims",
    benefits: [
      "Rich cultural appeal",
      "Reversible and lightweight",
      "Perfect for warm and cool climates"
    ],
    materials: ["Cotton", "Wool", "PET Yarn"],
    process: ["Loom weaving", "Design dyeing", "Manual finishing"],
    galleryImages: [
                      "/images/Durries/durries1.jpg",
                      "/images/Durries/durries2.jpg",
                      "/images/Durries/durries3.jpg",
                      "/images/Durries/durries4.jpg",
                      "/images/Durries/durries5.jpg",
                   ]
  },
  {
    id: 3,
    title: "Pillows & Throws",
    description: "Stylish and comfortable cushions made using kilim, embroidery, tufted, and printed techniques.",
    image: "https://i.pinimg.com/736x/2d/bc/17/2dbc17d2679258dfc69f960f2358a033.jpg",
    detailed: true,
    slug: "cushions-pillows",
    benefits: [
      "Adds comfort and style",
      "Available in unique textures and patterns",
      "Crafted with high-quality fabrics"
    ],
    materials: ["Cotton", "Embroidered fabrics", "Printed fabrics"],
    process: ["Cutting", "Sewing", "Stuffing", "Finishing"],
    galleryImages: [
                    "https://i.pinimg.com/736x/e4/97/f0/e497f0d7b9d6ad488429ebbac009d5fb.jpg",
                    "https://i.pinimg.com/736x/47/d9/84/47d9847ff966d4ec73f45be02d855293.jpg",
                    "https://i.pinimg.com/736x/c4/c7/a0/c4c7a0e0fd8651b6dfa5e9dbdc922739.jpg",
                    "https://i.pinimg.com/736x/4d/0c/43/4d0c43d4862e20032f4ea17364b12818.jpg",
                    "https://i.pinimg.com/736x/a3/83/35/a38335330728356f566916e79239f59f.jpg",
                  ]
  },
  {
    id: 4,
    title: "Bath Rugs",
    description: "Soft, absorbent bath mats crafted using tabletop and frame-loom techniques for style and function.",
    image: "https://i.pinimg.com/736x/ad/4e/a7/ad4ea7a17d37d6096a78fda3ae2d1724.jpg",
    detailed: true,
    slug: "bath-rugs",
    benefits: [
      "Quick-drying and highly absorbent",
      "Comfortable underfoot",
      "Stylish addition to bathrooms"
    ],
    materials: ["Cotton", "Blended fibers"],
    process: ["Tufting", "Weaving", "Trimming and quality checks"],
    galleryImages: [
                      "https://i.pinimg.com/736x/20/94/5b/20945bbc6c667daf0a5add85de7cbf0b.jpg", 
                      "https://i.pinimg.com/736x/d2/96/d3/d296d3aaaeb2d47f3b8bfedc1bb53278.jpg",
                      "https://i.pinimg.com/736x/4b/32/7a/4b327a9a63badd129f2bce130210e3b9.jpg",
                      "https://i.pinimg.com/736x/ca/7d/3d/ca7d3dc8ae1ac544ec76b1b06abfdc56.jpg",
                      "https://i.pinimg.com/736x/67/cf/8a/67cf8aea523b2806a4006abf760e499b.jpg",
                   ]
  },
  {
    id: 5,
    title: "Poufs & Stools",
    description: "Handcrafted poufs and stools offering extra seating with unique designs and textures.",
    image: "https://i.pinimg.com/736x/8a/1e/12/8a1e126ab18c2fdaa3479ceda0adf19d.jpg",
    detailed: true,
    slug: "poufs-stools",
    benefits: [
      "Functional and stylish",
      "Available in multiple shapes and textures",
      "Durable for daily use"
    ],
    materials: ["Cotton", "Wool", "Jute", "Printed fabrics"],
    process: ["Weaving", "Stuffing", "Assembly"],
    galleryImages: [
                       "https://i.pinimg.com/736x/da/1b/f7/da1bf79f88f9b8b5baa347832c8e3a7b.jpg",
                       "https://i.pinimg.com/736x/78/9e/16/789e160704e092eb2c79458fcf97de85.jpg",
                       "https://i.pinimg.com/736x/a1/e4/56/a1e456d6211dbf13567645887c88f89d.jpg",
                       "https://i.pinimg.com/736x/96/3c/83/963c838c11df52aa93ef043a0d491e67.jpg",
                       "https://i.pinimg.com/736x/43/c3/2d/43c32d7cf0d9d16383d53cf1fb7e061d.jpg",
                   ]
  },
  {
    id: 6,
    title: "Wall Art & Storage",
    description: "Macramé, woven, and printed wall hangings and baskets that add artistic charm to your interiors.",
    image: "https://i.pinimg.com/736x/d0/28/67/d028670a245083c51e262cede1ce7510.jpg",
    detailed: true,
    slug: "wall-art-storage",
    benefits: [
      "Visually striking home accents",
      "Natural materials and textures",
      "Functional storage with aesthetic value"
    ],
    materials: ["Jute", "Cotton", "Screen-printed fabrics"],
    process: ["Braiding", "Macramé knotting", "Framing and finishing"],
    galleryImages: [  
                      "https://i.pinimg.com/736x/c6/b0/fa/c6b0fa9b16e6b2559408b8f6bec4dcdd.jpg",
                      "https://i.pinimg.com/736x/f6/74/72/f674724a318b4f5f1bfffa96163c494c.jpg",
                      "https://i.pinimg.com/736x/f9/bb/d2/f9bbd2280a60b21b267de0a9d655a743.jpg",
                      "https://i.pinimg.com/736x/c9/e8/86/c9e8860642d009f5b052c63109696ada.jpg",
                      "https://i.pinimg.com/736x/30/de/52/30de528e09b921b688d2932a76a89611.jpg"
                   ]
  },
];

export default servicesData;
