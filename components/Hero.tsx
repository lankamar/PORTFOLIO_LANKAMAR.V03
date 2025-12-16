import React from 'react';
import { motion } from 'framer-motion';
import { copy } from '../lib/copy';

const Hero: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <section className="min-h-screen w-full flex items-start justify-center relative pt-24 overflow-hidden">
      {/* Diorama Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/dioramas/home-hero.png"
          alt=""
          className="w-full h-full object-cover"
        />
        {/* Minimal overlay - let characters show through */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/25"></div>
      </div>

      <motion.div
        className="max-w-4xl mx-auto px-4 text-center z-10 relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Console Command */}
        <motion.p
          className="font-mono text-sm md:text-base text-accent-base mb-8 tracking-widest drop-shadow-md"
          variants={itemVariants}
        >
          {copy.hero.console}
        </motion.p>

        {/* Title - positioned where left character points */}
        <motion.h1
          className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]"
          variants={itemVariants}
        >
          {copy.hero.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="font-mono uppercase tracking-widest text-accent-hover/90 mb-6 text-base font-bold drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
          variants={itemVariants}
        >
          {copy.hero.subtitle}
        </motion.p>

        {/* Lead - shortened to not cover characters */}
        <motion.p
          className="max-w-3xl mx-auto text-white text-base md:text-lg leading-relaxed mb-8 font-light drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
          variants={itemVariants}
        >
          {copy.hero.lead}
        </motion.p>

      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-70"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg
          className="w-6 h-6 text-accent-base drop-shadow-lg"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </section>
  );
};

export default Hero;