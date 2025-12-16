import React from 'react';
import { copy } from '../lib/copy';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="/dioramas/open-questions.png" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/25"></div>
      </div>
      <div className="max-w-3xl mx-auto relative z-10">
        <h2 className="font-serif text-4xl md:text-5xl text-white mb-6 text-center drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
          {copy.contact.title}
        </h2>
        <p className="text-text-secondary text-lg text-center mb-12 leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
          {copy.contact.description}
        </p>

        {/* Open Research Questions */}
        <motion.div
          className="glass-card mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <ul className="space-y-6">
            {copy.contact.questions.map((question: string, idx: number) => (
              <li key={idx} className="flex items-start gap-4">
                <span className="text-accent-hover text-2xl font-serif">?</span>
                <p className="text-white leading-relaxed text-lg">
                  {question}
                </p>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Collaboration Note */}
        <motion.div
          className="glass-card border-accent-hover"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-text-secondary leading-relaxed text-center">
            {copy.contact.note}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;