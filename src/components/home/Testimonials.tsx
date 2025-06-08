import React, { useState, useEffect } from 'react';

const testimonials = [
	{
		id: 1,
		name: 'Sarah Thompson',
		role: 'Homeowner, Melbourne, Australia',
		quote: 'The rugs we ordered from A.S. Textiles instantly elevated our living space. The craftsmanship is simply unmatched — every detail feels personal and authentic.',
		image: 'https://randomuser.me/api/portraits/women/68.jpg', // Indian woman
		rating: 5,
	},
	{
		id: 2,
		name: 'Julien Moreau',
		role: 'Hotel Manager, Paris, France',
		quote: 'Our boutique hotel needed decor that stood out. The poufs, throws, and wall art from A.S. Textiles brought warmth and style to every room. Guests love it — and so do we.',
		image: 'https://randomuser.me/api/portraits/men/75.jpg', // Indian man
		rating: 5,
	},
	{
		id: 3,
		name: 'Katherine Chen',
		role: 'Interior Designer, Toronto, Canada',
		quote: 'Working with A.S. Textiles has been a seamless experience. Their export quality, on-time delivery, and stunning variety make them our go-to supplier for handmade home decor.',
		image: 'https://randomuser.me/api/portraits/women/65.jpg', // Indian woman
		rating: 5,
	},
	{
		id: 4,
		name: 'Anna Becker',
		role: 'Homeowner, Berlin, Germany',
		quote: "As someone who values sustainable luxury, I was impressed by the eco-conscious materials and ethical production behind A.S. Textiles' products. They're beautiful and meaningful.",
		image: 'https://randomuser.me/api/portraits/men/66.jpg', // Indian man
		rating: 5,
	},
];

const Testimonials = () => {
	const [activeIndex, setActiveIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setActiveIndex((current) => (current + 1) % testimonials.length);
		}, 5000);

		return () => clearInterval(interval);
	}, []);

	return (
		<section className="py-20 bg-white text-gray-800">
			<div className="container mx-auto px-4">
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-playfair font-medium text-gray-900 pb-2 relative inline-block">
						Client Testimonials
					</h2>
					<div className="h-[3px] w-2/3 bg-gold mx-auto mt-2"></div>
					<p className="text-xl md:text-2xl font-playfair italic text-gray-600 mt-4 mb-8">
						What Our Clients Say About Us
					</p>
				</div>

				<div className="relative max-w-4xl mx-auto">
					{/* Testimonial Slider */}
					<div className="overflow-hidden">
						<div
							className="flex transition-transform duration-500 ease-in-out"
							style={{ transform: `translateX(-${activeIndex * 100}%)` }}
						>
							{testimonials.map((testimonial) => (
								<div key={testimonial.id} className="w-full flex-shrink-0 px-4">
									<div className="bg-gray-50 shadow-md rounded-lg p-8 text-center">
										{/* Name initial instead of image */}
										<div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center border-2 border-gold bg-gold/10 text-olive font-bold text-3xl">
											{testimonial.name.charAt(0)}
										</div>

										<div className="flex justify-center mb-4">
											{[...Array(5)].map((_, i) => (
												<svg
													key={i}
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 24 24"
													fill={i < testimonial.rating ? '#D4AF37' : '#cccccc'}
													className="w-5 h-5"
												>
													<path
														fillRule="evenodd"
														d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
														clipRule="evenodd"
													/>
												</svg>
											))}
										</div>

										<blockquote className="text-lg italic mb-4 text-gray-700">
											"{testimonial.quote}"
										</blockquote>

										<div className="font-playfair font-medium text-olive">
											{testimonial.name}
										</div>

										<div className="text-sm text-gray-500">
											{testimonial.role}
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Navigation Dots */}
					<div className="flex justify-center mt-8 space-x-2">
						{testimonials.map((_, index) => (
							<button
								key={index}
								onClick={() => setActiveIndex(index)}
								className={`w-3 h-3 rounded-full transition-colors ${
									activeIndex === index ? 'bg-gold' : 'bg-gray-300'
								}`}
								aria-label={`Go to testimonial ${index + 1}`}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Testimonials;
