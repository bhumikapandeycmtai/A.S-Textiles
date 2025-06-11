// 3. Product Card Sub-Component (UPDATED)
interface Product {
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

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const handleViewProduct = () => {
    // In a real app, you would navigate to the product page
    // e.g., router.push(`/products/${product.id}`);
    console.log(`Navigating to view product: ${product.id}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col group transition-all duration-300 ease-in-out hover:shadow-2xl hover:cursor-pointer"
    onClick={handleViewProduct}>
      <div className="overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-52 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start gap-4 mb-3">
          <h3 className="text-lg font-bold text-gray-800">{product.title}</h3>
          {/* Replaced blue text with a more neutral, dark gray for price */}
          <p className="text-lg font-semibold text-gray-900 whitespace-nowrap">
            ${product.price.toFixed(2)}
          </p>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-4">
          {product.shortDescription}
        </p>
        
        {/* --- NEW BUTTON ADDED HERE --- */}
        <div className="mt-auto">
          <button
            onClick={handleViewProduct}
            className="w-full bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 ease-in-out hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
          >
            View Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard