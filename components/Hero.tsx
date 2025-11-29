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
    <section className="min-h-screen w-full flex items-center justify-center relative pt-16">
      <motion.div
        className="max-w-4xl mx-auto px-4 text-center z-10"
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

        {/* Title */}
        <motion.h1
          className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary mb-6 drop-shadow-text"
          variants={itemVariants}
        >
          {copy.hero.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="font-mono uppercase tracking-widest text-accent-hover mb-8 text-lg font-bold drop-shadow-md"
          variants={itemVariants}
        >
          {copy.hero.subtitle}
        </motion.p>

        {/* Lead */}
        <motion.p
          className="max-w-2xl mx-auto text-text-primary text-lg md:text-xl leading-relaxed mb-12 font-light drop-shadow-md"
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