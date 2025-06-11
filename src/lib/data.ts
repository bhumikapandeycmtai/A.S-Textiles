// This file simulates a database or an API backend.

export interface Product {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
  category: string;
  shortDescription: string;
  longDescription: string;
  features: string[];
  createdAt: string;
  updatedAt: string;
}

const dummyProducts: Product[] = [
  // ... (Paste the full dummyProducts array from the previous answer here)
  {
    id: 'prod_h01',
    imageUrl: 'https://i.pinimg.com/736x/da/1b/f7/da1bf79f88f9b8b5baa347832c8e3a7b.jpg',
    title: 'Hand-Woven Jute Storage Basket',
    price: 45.00,
    category: 'Storage & Organization',
    shortDescription: 'Eco-friendly and stylish, this jute basket is perfect for organizing magazines, toys, or blankets. A touch of rustic charm for any room.',
    longDescription: 'Each basket is meticulously hand-woven by skilled artisans using natural, sustainable jute fibers. Its sturdy construction ensures it holds its shape, while the soft texture is safe for kids and pets. A perfect blend of functionality and natural beauty.',
    features: ['100% Natural Jute', 'Hand-Woven by Artisans', 'Sturdy & Durable', 'Eco-Friendly'],
    createdAt: '2023-10-26T10:00:00Z',
    updatedAt: '2023-10-26T10:00:00Z',
  },
  {
    id: 'prod_h02',
    imageUrl: 'https://i.pinimg.com/736x/da/1b/f7/da1bf79f88f9b8b5baa347832c8e3a7b.jpg',
    title: 'Bohemian Macrame Wall Art',
    price: 79.99,
    category: 'Wall Decor',
    shortDescription: 'Add a touch of bohemian elegance to your walls with this handcrafted macrame piece. Made from 100% natural cotton rope.',
    longDescription: 'This beautiful macrame wall hanging is designed to be a centerpiece. Its intricate knots and flowing tassels create a sense of calm and artistry, making it an ideal addition to a living room, bedroom, or nursery.',
    features: ['100% Natural Cotton', 'Intricate Knotting Detail', 'Includes Wooden Dowel', 'Adds Textural Interest'],
    createdAt: '2023-10-25T14:30:00Z',
    updatedAt: '2023-10-25T14:30:00Z',
  },
  // Add all other products here...
];

// Simulates an async API call to get all products
export const getProducts = async (): Promise<Product[]> => {
  return new Promise(resolve => setTimeout(() => resolve(dummyProducts), 300));
};

// Simulates an async API call to get a single product by its ID
export const getProductById = async (id: string): Promise<Product | undefined> => {
  return new Promise(resolve => {
    const product = dummyProducts.find(p => p.id === id);
    setTimeout(() => resolve(product), 300);
  });
};

// Simulates an async API call to find a product by title
export const getProductByTitle = async (title: string): Promise<Product | undefined> => {
    return new Promise(resolve => {
      const product = dummyProducts.find(p => p.title.toLowerCase() === title.toLowerCase().trim());
      setTimeout(() => resolve(product), 300);
    });
};