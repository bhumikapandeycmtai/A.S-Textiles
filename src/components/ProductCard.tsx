import { useNavigate } from 'react-router-dom';
import React from 'react';
import { Product } from '@/lib/data'; // Assuming you have a path alias setup for @

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  const handleViewProduct = () => {
    navigate(`/products/${product.id}`);
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleViewProduct();
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col group transition-all duration-300 ease-in-out hover:shadow-2xl hover:cursor-pointer"
      onClick={handleViewProduct}
    >
      <div className="overflow-hidden">
        <img src={product.imageUrl} alt={product.title} className="w-full h-52 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110" />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start gap-4 mb-3">
          <h3 className="text-lg font-bold text-gray-800">{product.title}</h3>
          <p className="text-lg font-semibold text-gray-900 whitespace-nowrap">${product.price.toFixed(2)}</p>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-4">{product.shortDescription}</p>
        <div className="mt-auto">
          <button onClick={handleButtonClick} className="w-full bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 ease-in-out hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800">
            View Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;