import React from 'react';
import { motion } from 'framer-motion';
import { copy } from '../lib/copy';

const Services: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="/dioramas/implementations.png" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/25"></div>
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="font-serif text-4xl md:text-5xl text-white mb-16 text-center drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
          Implementaciones
        </h2>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {copy.services.map((service, index) => (
            <motion.div
              key={index}
              className="glass-card hover:border-accent-hover transition-all duration-300 flex flex-col"
              variants={cardVariants}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{service.icon}</span>
                <h3 className="font-serif text-2xl text-white">
                  {service.title}
                </h3>
              </div>

              <p className="text-text-secondary mb-4 leading-relaxed flex-grow">
                {service.desc}
              </p>

              {/* Claim */}
              <div className="border-l-4 border-accent-hover pl-4 mb-3 bg-accent-hover/10 py-2">
                <p className="text-accent-hover font-mono text-sm font-bold">
                  {service.claim}
                </p>
              </div>

              {/* Limits */}
              <p className="text-text-secondary/70 text-xs italic">
                <strong>Limitaciones:</strong> {service.limits}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;