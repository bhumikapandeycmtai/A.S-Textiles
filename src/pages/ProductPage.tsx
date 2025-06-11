import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById, Product } from '@/lib/data';
import { Badge } from "@/components/ui/badge";
import { Check } from 'lucide-react';
// import DetailForm from "@/components/DetailForm";

const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      setIsLoading(true);
      const data = await getProductById(productId);
      setProduct(data || null);
      setIsLoading(false);
    };

    fetchProduct();
  }, [productId]);

  if (isLoading) {
    return <div className="text-center py-20">Loading product details...</div>;
  }

  if (!product) {
    return <div className="text-center py-20 text-red-500">Product not found.</div>;
  }

  return (
    <div className="bg-gray-50 font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="bg-white p-4 rounded-2xl shadow-lg sticky top-8">
            <img src={product.imageUrl} alt={product.title} className="w-full h-auto object-cover rounded-xl" />
          </div>
          <div className="space-y-6">
            <Badge variant="outline" className="text-sm border-gray-800 text-gray-800">{product.category}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">{product.title}</h1>
            <p className="text-3xl font-semibold text-gray-800">${product.price.toFixed(2)}</p>
            <p className="text-lg text-gray-600 leading-relaxed">{product.longDescription}</p>
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Features</h3>
              <ul className="space-y-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-24">
          {/* <DetailForm mainProduct={product} /> */}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;