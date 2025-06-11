
import React, { useEffect } from 'react';
import HeroSection from '@/components/home/HeroSection';
import ServiceOverview from '@/components/home/ServiceOverview';
import AboutPreview from '@/components/home/AboutPreview';
// import PortfolioPreview from '@/components/home/PortfolioPreview';
import Testimonials from '@/components/home/Testimonials';
import CtaBanner from '@/components/home/CtaBanner';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import StickyChat from '@/components/StickyChat';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main>
        <HeroSection />
        <ServiceOverview />
        <AboutPreview />
        <Testimonials />
        <CtaBanner />
      </main>
      <Footer />
      <StickyChat />
    </div>
  );
};

export default Index;
