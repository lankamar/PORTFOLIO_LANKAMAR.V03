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
    <section className="py-24 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl text-text-primary mb-16 text-center">
          Servicios
        </h2>
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "100px" }}
        >
          {copy.services.map((service, idx) => (
            <motion.div
              key={idx}
              className="glass-card group"
              variants={cardVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-4xl mb-6" role="img" aria-label={service.emoji_alt}>
                {service.icon}
              </div>
              <h3 className="font-serif text-2xl text-text-primary mb-4">
                {service.title}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;