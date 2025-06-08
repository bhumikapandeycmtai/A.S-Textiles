"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Home,
  Palette,
  Hammer,
  Crown,
  Sparkles,
  Award,
  Users,
  Clock,
  CheckCircle,
  ArrowRight,
  Star,
} from "lucide-react"
import Footer from "@/components/Footer"
import Navigation from '@/components/Navigation';
import { Link } from "react-router-dom";

export default function AboutUs() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const services = [
    {
      icon: <Home className="w-8 h-8" />,
      title: "Handwoven Rugs & Carpets",
      description:
        "Tufted, woven, or knotted — our rugs carry stories in every strand, suited for both minimalist and luxurious spaces.",
    },
    {
      icon: <Crown className="w-8 h-8" />,
      title: "Traditional Durries & Kilims",
      description:
        "Lightweight and reversible, our handloom durries offer the perfect blend of color, comfort, and cultural legacy.",
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Poufs, Benches & Stools",
      description:
        "Durable and decorative, these multifunctional pieces are ideal for modern homes needing extra style and seating.",
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Artisan Cushion Covers",
      description: "Embroidered, printed, or tufted — our cushions add texture and identity to any interior.",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Throws & Blankets",
      description: "Cozy yet elegant, our throws are perfect for layering with furniture or gifting timeless comfort.",
    },
    {
      icon: <Hammer className="w-8 h-8" />,
      title: "Storage Baskets & Home Accents",
      description:
        "aided and screen-printed pieces that merge utility with artisan charm.",
    },
  ]

  const values = [
    {
      icon: <Star className="w-6 h-6" />,
      title: "Authenticity",
      description: "Every creation is a reflection of India’s rich handloom legacy and skilled artisanship",
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Craftsmanship",
      description: "Meticulous weaving and finishing ensure unmatched quality in every thread",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Timeless Appeal",
      description: "Our designs blend tradition and trend, making every piece enduringly stylish",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Client-Centric Approach",
      description: "From concept to creation, we offer tailored textile solutions for every interior need",
    },
  ]

  return (
    <div className="min-h-screen bg-cream-light">
      <Navigation />
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://i.pinimg.com/736x/9e/84/1b/9e841b74ea7de67056ebba9eb303f304.jpg"
            alt="A.S Textiles Handloom"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>

        <div
          className={`relative z-10 text-center text-white max-w-4xl mx-auto px-6 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <Badge variant="outline" className="mb-6 text-gold border-gold/50 bg-black/20 backdrop-blur-sm">
            Crafting Luxury Since 1997
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gold to-gold bg-clip-text text-transparent">
            A.S Textiles
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-cream font-light leading-relaxed">
            Where timeless craftsmanship meets refined luxury
          </p>
          {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gold hover:bg-olive text-white px-8 py-3">
              Explore Our Work
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gold text-gold hover:bg-gold hover:text-white px-8 py-3"
            >
              Schedule Consultation
            </Button>
          </div> */}
        </div>
      </section>

      {/* About Introduction */}
      <section className="py-20 px-6 bg-cream-light">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-olive mb-6">Weaving Heritage into Modern Homes</h2>
            <div className="w-24 h-1 bg-gold mx-auto mb-8" />
            <p className="text-xl text-olive max-w-3xl mx-auto leading-relaxed">
              At A.S. Textiles, we weave tradition into every thread — crafting handloom pieces that bring warmth, texture, and timeless elegance to modern homes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-olive">The Art of Handcrafted Living</h3>
              <p className="text-olive leading-relaxed">
               From the historic city of Panipat, our collections blend India's rich textile legacy with contemporary design. Whether it's a handwoven rug, a tufted pouf, or a macramé wall hanging — each item is a result of dedicated craftsmanship, sustainable practices, and an eye for global trends.
              </p>
              <p className="text-olive leading-relaxed">
                Our fully export-oriented production unit ensures high-volume capabilities while maintaining artisan-quality detail, making us a trusted partner for retailers, designers, and decor lovers worldwide.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://i.pinimg.com/736x/17/8b/8c/178b8c4077e0fd442568785af4482af3.jpg"
                alt="Luxury Interior Craftsmanship"
                className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-olive mb-6">Our Signature Collections</h2>
            <p className="text-xl text-olive max-w-3xl mx-auto">
              Elevating interiors with textures, techniques, and traditions that span generations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm"
              >
                <CardContent className="p-8">
                  <div className="text-gold mb-6 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-olive mb-4">{service.title}</h3>
                  <p className="text-olive leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Turnkey Construction */}
      <section className="py-20 bg-cream-light">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="https://i.pinimg.com/736x/8d/4f/a0/8d4fa0e1495bc26e2360b86257cab4de.jpg"
                alt="Complete Home Styling Solutions"
                className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
              />
            </div>
            <div className="space-y-6">
              <Badge className="bg-gold/10 text-gold hover:bg-gold/20">Complete Solutions</Badge>
              <h3 className="text-4xl font-bold text-olive">Complete Home Styling Solutions</h3>
              <p className="text-olive leading-relaxed">
                At A.S. Textiles, we go beyond making home furnishings — we help craft complete interior experiences.
                From handwoven rugs and cushions to artisanal wall hangings and bath rugs, our collections are designed to elevate every corner of your space with elegance and authenticity.
              </p>
              <p className="text-olive leading-relaxed ">
               Our in-house team of designers and textile experts collaborates closely with clients to develop cohesive, custom-styled decor solutions.
               With a focus on quality, tradition, and trend, we transform your interiors with textures that tell a story — rooted in Indian craftsmanship and made for modern living.
              </p>
              <Link to="/my-work">
                <Button className="bg-olive hover:bg-olive text-white mt-4">
                  Explore Our Collections
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 bg-cream">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-olive mb-6">Our Philosophy</h2>
            <p className="text-xl text-olive max-w-3xl mx-auto leading-relaxed">
              At A.S. Textiles, luxury is defined not by excess, but by the art of handcrafted excellence, rooted in heritage, driven by quality, and woven with purpose.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gold/20 transition-colors duration-300">
                  <div className="text-gold">{value.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-olive mb-3">{value.title}</h3>
                <p className="text-olive">{value.description}</p>
              </div>
            ))}
          </div>

          <Separator className="my-16" />

          <div className="text-center space-y-6">
            <p className="text-lg text-olive max-w-4xl mx-auto leading-relaxed">
              We source premium yarns, uphold ethical production standards, and work with skilled artisans from India's textile heartland. 
              Every creation by A.S. Textiles carries forward a legacy of craftsmanship — beautifully woven for homes across the world.
            </p>
            <p className="text-xl font-semibold text-olive">
              With each product, we offer more than just decor — we deliver handmade elegance, designed to last and crafted with care.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-cream-light">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-olive mb-6">Why Choose A.S. Textiles</h2>
            <p className="text-xl text-olive">What sets us apart in global handloom and home furnishing exports</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-gold to-olive rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-olive mb-3">Skilled Craftsmanship</h3>
              <p className="text-olive">
                Handwoven by master artisans using traditional techniques passed down through generations.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-gold to-olive rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-olive mb-3">Export-Grade Quality</h3>
              <p className="text-olive">Certified quality standards and global compliance for trusted partnerships across continents</p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-gold to-olive rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-olive mb-3">Custom Design Capability</h3>
              <p className="text-olive">Exclusive design development tailored for seasonal trends, client inspirations, or unique interiors</p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-gold to-olive rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-olive mb-3">Ethical & Reliable</h3>
              <p className="text-olive">Strict quality control, timely delivery, and socially responsible manufacturing — all under one roof</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-gold to-olive text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Welcome to A.S Textiles</h2>
          <p className="text-xl mb-8 text-white/90">Where your dream space becomes a handcrafted reality</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact">
              <Button size="lg" className="bg-olive text-gold hover:bg-olive hover:text-white px-8 py-3">
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </a>
            <a href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white bg-gold text-black hover:bg-white hover:text-gold px-8 py-3"
              >
                Schedule Consultation
              </Button>
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
