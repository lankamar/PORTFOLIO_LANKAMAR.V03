import React from 'react';
import NeuralBackground from '../components/NeuralBackground';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import About from '../components/About';
import ScrollProgress from '../components/ScrollProgress';

export default function PortfolioPage() {
  return (
    <div className="relative min-h-screen">
      <ScrollProgress />
      
      {/* Visual System Background */}
      <div className="hero-bg" aria-hidden="true" />
      
      {/* Algorithm: Canvas 30fps */}
      <NeuralBackground />

      <main className="relative z-10 flex flex-col">
        <Hero />
        <About />
        <Services />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
