// import React, getProductByTitle from 'react';
// import { useState } from 'react';
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { useToast } from "@/components/ui/use-toast";
// import { Product } from '../lib/data'; // Corrected import path
// import { getProductByTitle } from '../lib/data'; // Corrected import path

// interface DetailFormProps {
//   mainProduct: Product;
// }

// const DetailForm: React.FC<DetailFormProps> = ({ mainProduct }) => {
//   // The rest of the DetailForm component code is exactly the same as the previous answer.
//   // Paste the full DetailForm code here. It works perfectly in this environment.
//   // ... (Paste the full DetailForm component code from the previous response here)
//   const { toast } = useToast();
//   const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
//   const [searchQuery, setSearchQuery] = useState('');
//   const [foundProduct, setFoundProduct] = useState<Product | null>(null);
//   const [quantity, setQuantity] = useState(1);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { id, value } = e.target;
//     setFormData(prev => ({ ...prev, [id]: value }));
//   };

//   const handleSearchProduct = async () => {
//     if (!searchQuery.trim()) return;
//     const product = await getProductByTitle(searchQuery);
//     setFoundProduct(product || null);
//     if (!product) {
//         toast({ title: "Product not found", description: "No product matches that title.", variant: "destructive" });
//     }
//   };
  
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);

//     const leadData = {
//       leadDetails: { ...formData },
//       mainProduct: {
//         id: mainProduct.id,
//         title: mainProduct.title
//       },
//       addOnProduct: foundProduct ? {
//         id: foundProduct.id,
//         title: foundProduct.title,
//         quantity: quantity
//       } : null
//     };

//     try {
//       // In a real app, this would be a real fetch call.
//       // We are simulating it here.
//       console.log('Submitting data to POST /v1/product-leads/newProductLead:', leadData);
//       await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      
//       toast({
//         title: "Success!",
//         description: "Your details have been sent. We will contact you shortly.",
//         className: "bg-black text-white",
//       });
      
//       setFormData({ name: '', phone: '', email: '', message: '' });
//       setSearchQuery('');
//       setFoundProduct(null);
//       setQuantity(1);

//     } catch (error) {
//       console.error("Submission failed:", error);
//       toast({
//         title: "Submission Failed",
//         description: "There was an error sending your details. Please try again.",
//         variant: "destructive"
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Card className="max-w-4xl mx-auto shadow-xl">
//       <CardHeader className="text-center">
//         <CardTitle className="text-3xl font-bold text-gray-900">Request a Quote</CardTitle>
//         <CardDescription>Fill out the form below and we'll get back to you.</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit} className="space-y-8">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-2"><Label htmlFor="name">Full Name</Label><Input id="name" value={formData.name} onChange={handleInputChange} placeholder="John Doe" required /></div>
//             <div className="space-y-2"><Label htmlFor="email">Email Address</Label><Input id="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="john.doe@example.com" required /></div>
//             <div className="space-y-2"><Label htmlFor="phone">Phone Number</Label><Input id="phone" value={formData.phone} onChange={handleInputChange} placeholder="+1 (555) 123-4567" required /></div>
//             <div className="space-y-2"><Label htmlFor="message">Message</Label><Textarea id="message" value={formData.message} onChange={handleInputChange} placeholder="I'm interested in..." /></div>
//           </div>
//           <div className="border-t pt-8 space-y-4">
//             <h3 className="text-lg font-semibold text-gray-800">Add Another Product? (Optional)</h3>
//             <div className="flex items-center gap-2"><Input id="search-addon" placeholder="Search product title..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} /><Button type="button" onClick={handleSearchProduct} variant="outline" className="border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white">Search</Button></div>
//             {foundProduct && (<div className="border p-4 rounded-lg bg-gray-50 flex items-center justify-between gap-4"><div className="flex items-center gap-4"><img src={foundProduct.imageUrl} alt={foundProduct.title} className="w-16 h-16 object-cover rounded-md" /><div><p className="font-semibold">{foundProduct.title}</p><p className="text-sm text-gray-500">${foundProduct.price.toFixed(2)}</p></div></div><div className="w-32"><Label htmlFor="quantity" className="text-sm">Quantity</Label><Input id="quantity" type="number" min="1" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="mt-1"/></div></div>)}
//           </div>
//           <Button type="submit" disabled={isLoading} className="w-full bg-gray-900 hover:bg-gray-700 text-white text-lg py-6">{isLoading ? 'Sending...' : 'Submit Inquiry'}</Button>
//         </form>
//       </CardContent>
//     </Card>
//   );
// };

// export default DetailForm;