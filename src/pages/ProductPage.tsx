import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Check, Ruler } from 'lucide-react'; // Added Ruler icon for a nice touch
import DetailForm from "@/components/DetailForm";
import Navigation from '@/components/Navigation';
import axios from 'axios';

// --- 1. UPDATE THE PRODUCT INTERFACE ---
export interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  imageUrl: string;
  shortDescription: string;
  longDescription: string;
  features: string[];
  size: { // Define the final, parsed shape of the size object
    length: number;
    width: number;
  };
  createdAt: string,
  updatedAt: string
}

const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!productId) {
      setError("Product Not Found");
      setIsLoading(false);
      return;
    }

    const fetchProduct = async () => {
      setIsLoading(true);
      setError("");
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BACKEND_URL}/v1/products/getProduct/${productId}`);
        const data = response.data.data;

        if (data) {
          // --- 2. UPDATE FETCH LOGIC TO PARSE SIZE ---
          
          // Parse features (existing logic)
          if (data.features && typeof data.features === 'string') {
            try { data.features = JSON.parse(data.features); } catch { data.features = []; }
          } else if (!Array.isArray(data.features)) {
            data.features = [];
          }

          // Parse size, providing a default for older items
          let parsedSize = { length: 0, width: 0 };
          if (data.size && typeof data.size === 'string') {
            try { parsedSize = JSON.parse(data.size); } catch { /* keep default */ }
          } else if (typeof data.size === 'object' && data.size !== null) {
            parsedSize = data.size;
          }
          
          // Set the final, cleaned product object to state
          setProduct({ ...data, size: parsedSize });

        } else {
          setError("Product Not Found");
        }
      } catch (apiError) {
        console.error("Error fetching product:", apiError);
        setError("Failed to load product details. Check your connection.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  return (
    <div className="bg-gray-50 font-sans">
      <Navigation />
      <section className="relative h-[50vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1617104424032-b9bd6972d0e4?q=80&w=1992&auto=format&fit=crop"
            alt="Interior Services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-playfair font-bold text-white mb-4">
            Product Details
          </h1>
        </div>
      </section>
      
      {isLoading && <div className="text-center py-20">Loading product details...</div>}
      {error && <div className="text-center py-20 text-red-500">{error}</div>}
      
      {/* --- 3. FIX POTENTIAL CRASH BY CHECKING FOR `product` --- */}
      {!isLoading && !error && product && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start" >
            <div className="bg-white p-4 rounded-2xl shadow-lg sticky top-24">
              <img src={product.imageUrl} alt={product.title} className="w-full max-h-[70vh] object-contain rounded-xl" />
            </div>
            <div className="space-y-6">
              <Badge variant="outline" className="text-sm border-gray-800 text-gray-800">{product.category}</Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">{product.title}</h1>
              <p className="text-3xl font-semibold text-gray-800">${product.price}</p>
              
              <div className='flex flex-col gap-2'>
                <h4 className="text-xl font-bold text-gray-900">Description</h4>
                <p className="text-lg text-gray-600 leading-relaxed">{product.shortDescription}</p>
              </div>
              
              <div className='flex flex-col gap-2'>
                <h4 className="text-xl font-bold text-gray-900">Details</h4>
                <p className="text-lg text-gray-600 leading-relaxed">{product.longDescription}</p>
              </div>

              {/* --- 4. ADD THE UI TO DISPLAY SIZE --- */}
              {/* This section will only render if size data exists and is valid */}
              {product.size && (product.size.length > 0 || product.size.width > 0) && (
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Dimensions</h3>
                  <div className="flex items-center gap-3">
                    <Ruler className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-700">
                      {product.size.length} in (L) × {product.size.width} in (W)
                    </span>
                  </div>
                </div>
              )}
              
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
            <DetailForm mainProduct={product} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;