import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Product } from '../lib/data';
import { X, Search } from 'lucide-react';

// Interfaces and initial state remain the same
interface SelectedProduct {
  product: Product;
  quantity: number;
}

interface DetailFormProps {
  mainProduct: Product;
}

const DetailForm: React.FC<DetailFormProps> = ({ mainProduct }) => {
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  
  const [searchTitle, setSearchTitle] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [allAvailableCategories, setAllAvailableCategories] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [selectedAddOnProducts, setSelectedAddOnProducts] = useState<SelectedProduct[]>([]);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [isProductListLoading, setIsProductListLoading] = useState(false);
  const [noResultsFound, setNoResultsFound] = useState(false);

  // All useEffects and handlers remain the same...
  useEffect(() => {
    const fetchAllProducts = async () => {
      setIsProductListLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BACKEND_URL}/v1/products/getallProducts?limit=1000`);
        const products: Product[] = response.data?.data?.products || [];
        setAllProducts(products);
        const filteredForRecs = products.filter(p => p.id !== mainProduct.id);
        setRecommendedProducts(filteredForRecs.slice(0, 3));
        const uniqueCategories = [...new Set<string>(products.map(p => p.category))];
        setAllAvailableCategories(uniqueCategories);
      } catch (error) {
        console.error("Failed to fetch product list:", error);
        toast({ title: "Error", description: "Could not load the product list.", variant: "destructive" });
      } finally {
        setIsProductListLoading(false);
      }
    };
    fetchAllProducts();
  }, [mainProduct.id, toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const performSearch = (title: string, category: string) => {
    setNoResultsFound(false);
    if (!title && !category) {
      setSearchResults([]);
      return;
    }
    const filtered = allProducts.filter(product => {
      const titleMatch = title ? product.title.toLowerCase().includes(title.toLowerCase()) : true;
      const categoryMatch = category ? product.category === category : true;
      const notAlreadySelected = !selectedAddOnProducts.some(p => p.product.id === product.id);
      return titleMatch && categoryMatch && notAlreadySelected;
    });
    setSearchResults(filtered.slice(0, 5));
    if (filtered.length === 0 && (title || category)) {
      setNoResultsFound(true);
    }
  };
  
  const handleTitleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setSearchTitle(newTitle);
    performSearch(newTitle, filterCategory);
  };
  
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = event.target.value;
    setFilterCategory(newCategory);
    performSearch(searchTitle, newCategory);
  };
  
  const handleSelectProduct = (product: Product) => {
    setSelectedAddOnProducts(prev => [...prev, { product, quantity: 1 }]);
    setSearchTitle('');
    setFilterCategory(''); // Also reset category filter for a clean state
    setSearchResults([]);
    setNoResultsFound(false);
    toast({ title: "Product Added", description: `${product.title} added to your inquiry.` });
  };

  const handleRemoveAddOnProduct = (productIdToRemove: string) => {
    setSelectedAddOnProducts(prev => prev.filter(item => item.product.id !== productIdToRemove));
  };

  const handleAddOnQuantityChange = (productId: string, newQuantity: number) => {
    setSelectedAddOnProducts(prev => prev.map(item => item.product.id === productId ? { ...item, quantity: Math.max(1, newQuantity) } : item));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const leadData = {
      leadDetails: { ...formData },
      mainProduct: { id: mainProduct.id, title: mainProduct.title, category: mainProduct.category },
      addOnProducts: selectedAddOnProducts.map(item => ({ id: item.product.id, title: item.product.title, category: item.product.category, quantity: item.quantity })),
      timestamp: new Date().toISOString(),
      status: "new"
    };
    try {
      await axios.post(`${import.meta.env.VITE_API_BACKEND_URL}/v1/product-leads/newProductLead`, leadData);
      toast({ title: "Success!", description: "Your inquiry has been sent.", className: "bg-black text-white" });
      setFormData({ name: '', phone: '', email: '', message: '' });
      setSearchTitle('');
      setFilterCategory('');
      setSelectedAddOnProducts([]);
      setSearchResults([]);
    } catch (error) {
      console.error("Submission failed:", error);
      toast({ title: "Submission Failed", description: "Please try again.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-gray-900">Order From Us</CardTitle>
        <CardDescription>Fill out the form below and we'll get back to you.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: User Details (unchanged) */}
          <div className="flex flex-col gap-3">
             <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                 <div className="space-y-2"><Label htmlFor="name">Full Name</Label><Input id="name" value={formData.name} onChange={handleInputChange} placeholder="John Doe" required /></div>
                 <div className="space-y-2"><Label htmlFor="email">Email Address</Label><Input id="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="john.doe@example.com" required /></div>
             </div>
             <div className="space-y-2"><Label htmlFor="phone">Phone Number</Label><Input id="phone" value={formData.phone} onChange={handleInputChange} placeholder="+1 (555) 123-4567" required /></div>
             <div className="block space-y-2"><Label htmlFor="message">Message</Label><Textarea id="message" value={formData.message} onChange={handleInputChange} placeholder="I'm interested in..." /></div>
           </div>

          {/* Section 2: Add-on Products */}
          <div className="border-t pt-8 space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Add More Products (Optional)</h3>
            
            {/* Search UI (no logic change, just placement) */}
            <div className="space-y-2">
                <Label htmlFor="search-title">Search for products</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative">
                        <Input id="search-title" placeholder="Search by title..." value={searchTitle} onChange={handleTitleSearchChange} disabled={isProductListLoading} autoComplete="off" />
                        {/* The search results dropdown is absolutely positioned, so it doesn't affect layout */}
                    </div>
                    <select id="category-select" value={filterCategory} onChange={handleCategoryChange} className="p-2 border border-input rounded-md bg-transparent cursor-pointer focus:ring-1 focus:ring-ring" disabled={isProductListLoading}>
                        <option value="">All Categories</option>
                        {allAvailableCategories.map((cat) => ( <option key={cat} value={cat}>{cat}</option>))}
                    </select>
                </div>
            </div>

            {/* --- START: MODIFIED DYNAMIC CONTENT AREA --- */}
            {/* This container now has a minimum height to prevent layout shift */}
            <div className="min-h-[16rem] transition-all duration-300">
              {searchResults.length > 0 ? (
                // State 1: Show Search Results
                <div className="bg-white border border-gray-200 rounded-md shadow-lg">
                  <ul className="py-1 max-h-60 overflow-y-auto">
                    {searchResults.map((product) => (
                      <li key={product.id} className="px-3 py-2 cursor-pointer hover:bg-gray-100 flex items-center gap-3" onClick={() => handleSelectProduct(product)}>
                        <img src={product.imageUrl} alt={product.title} className="w-10 h-10 object-cover rounded-sm" />
                        <span>{product.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : noResultsFound ? (
                // State 2: Show "No Results" message
                <div className="flex items-center justify-center h-full text-gray-500">
                  <p>No products match your criteria.</p>
                </div>
              ) : (
                // State 3: Show Recommended Products (Default state)
                <div>
                  <h4 className="text-md font-semibold text-gray-500 mb-2">Or Add a Suggestion:</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {recommendedProducts.map((recProduct) => (
                      !selectedAddOnProducts.some(p => p.product.id === recProduct.id) && (
                        <div key={recProduct.id} className="border rounded-lg p-2 flex items-center justify-between gap-2 bg-gray-50/80">
                          <div className="flex items-center gap-3 overflow-hidden">
                            <img src={recProduct.imageUrl} alt={recProduct.title} className="w-12 h-12 object-cover rounded-md flex-shrink-0" />
                            <p className="text-sm font-medium truncate">{recProduct.title}</p>
                          </div>
                          <Button type="button" size="sm" className="bg-black hover:bg-gray-800 text-white flex-shrink-0" onClick={() => handleSelectProduct(recProduct)}>Add</Button>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* --- END: MODIFIED DYNAMIC CONTENT AREA --- */}


            {/* List of Selected Add-on Products (unchanged) */}
            {selectedAddOnProducts.length > 0 && (
              <div className="space-y-3 pt-4">
                <h4 className="font-medium text-gray-700">Your Selected Products:</h4>
                {selectedAddOnProducts.map(({ product, quantity }) => (
                  <div key={product.id} className="border p-3 rounded-lg bg-gray-50 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-grow min-w-[200px]"><img src={product.imageUrl} alt={product.title} className="w-16 h-16 object-cover rounded-md" /><div><p className="font-semibold">{product.title}</p><p className="text-sm text-gray-500">${product.price}</p></div></div>
                    <div className="flex-shrink-0 w-24"><Label htmlFor={`quantity-${product.id}`} className="text-xs">Quantity</Label><Input id={`quantity-${product.id}`} type="number" min="1" value={quantity} onChange={(e) => handleAddOnQuantityChange(product.id, Number(e.target.value))} className="mt-1" /></div>
                    <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveAddOnProduct(product.id)} className="flex-shrink-0"><X className="h-5 w-5 text-gray-500" /></Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 3: Submission Button (unchanged) */}
          <Button type="submit" disabled={isLoading} className="w-full bg-gray-900 hover:bg-gray-700 text-white text-lg py-6">{isLoading ? 'Sending...' : 'Submit Inquiry'}</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DetailForm;