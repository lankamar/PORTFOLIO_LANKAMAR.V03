import React from 'react';
import { motion } from 'framer-motion';
import { copy } from '../lib/copy';

const About: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const renderHTML = (html: string) => ({ __html: html });

  return (
    <section id="about" className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="/dioramas/framework.png" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/25"></div>
      </div>
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Title */}
          <motion.h2
            className="font-serif text-4xl md:text-5xl text-white mb-4 text-center drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]"
            variants={itemVariants}
          >
            {copy.about.title}
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="text-accent-hover text-xl mb-8 text-center font-mono tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
            variants={itemVariants}
          >
            {copy.about.subtitle}
          </motion.p>

          {/* Intro */}
          <motion.p
            className="text-white text-lg leading-relaxed mb-12 text-center max-w-3xl mx-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
            variants={itemVariants}
          >
            {copy.about.intro}
          </motion.p>

          {/* 4 Sections Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {copy.about.sections.map((section: any, idx: number) => (
              <motion.div
                key={idx}
                className="glass-card hover:border-accent-hover transition-all duration-300"
                variants={itemVariants}
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl">{section.icon}</span>
                  <div>
                    <h3 className="font-serif text-2xl text-white mb-3">
                      {section.title}
                    </h3>
                    <p
                      className="text-text-secondary leading-relaxed"
                      dangerouslySetInnerHTML={renderHTML(section.content)}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;