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
          viewport={{ once: true, margin: "100px" }}
          className="space-y-16"
        >
          {/* Main Title */}
          <motion.h2
            variants={itemVariants}
            className="font-serif text-4xl md:text-5xl text-text-primary text-center leading-tight"
          >
            {copy.about.title}
          </motion.h2>

          {/* Intro Paragraphs */}
          <motion.div variants={itemVariants} className="glass-card space-y-6">
            {copy.about.intro.map((paragraph, idx) => (
              <p
                key={idx}
                className="text-text-primary text-lg leading-relaxed font-light"
                dangerouslySetInnerHTML={renderHTML(paragraph)}
              />
            ))}
          </motion.div>

          {/* Manifesto Section */}
          <motion.div variants={itemVariants} className="space-y-8">
            <h3 className="font-serif text-3xl text-accent-base border-l-4 border-accent-base pl-4">
              {copy.about.manifesto.title}
            </h3>
            <div className="text-text-secondary text-lg leading-relaxed whitespace-pre-line">
              <p dangerouslySetInnerHTML={renderHTML(copy.about.manifesto.text.split('\n\n')[0])} />
              <br />
              <p dangerouslySetInnerHTML={renderHTML(copy.about.manifesto.text.split('\n\n')[1])} />
            </div>
            <ul className="space-y-4 ml-4">
              {copy.about.manifesto.items.map((item, idx) => (
                <li key={idx} className="flex gap-3 text-text-primary text-lg">
                  <span className="text-accent-base shrink-0 mt-1">▹</span>
                  <span dangerouslySetInnerHTML={renderHTML(item)} />
                </li>
              ))}
            </ul>
          </motion.div>

          {/* RAG Section */}
          <motion.div variants={itemVariants} className="space-y-8">
            <h3 className="font-serif text-3xl text-accent-base border-l-4 border-accent-base pl-4">
              {copy.about.rag.title}
            </h3>
            <div className="text-text-secondary text-lg leading-relaxed whitespace-pre-line">
              <p dangerouslySetInnerHTML={renderHTML(copy.about.rag.text)} />
            </div>
            <ul className="space-y-4 ml-4">
              {copy.about.rag.items.map((item, idx) => (
                <li key={idx} className="flex gap-3 text-text-primary text-lg">
                  <span className="text-accent-base shrink-0 mt-1">▹</span>
                  <span dangerouslySetInnerHTML={renderHTML(item)} />
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Purpose Section */}
          <motion.div variants={itemVariants} className="glass-card border-l-4 border-l-accent-hover">
            <h3 className="font-serif text-2xl text-text-primary mb-4">
              {copy.about.purpose.title}
            </h3>
            <p
              className="text-text-secondary text-lg leading-relaxed mb-8"
              dangerouslySetInnerHTML={renderHTML(copy.about.purpose.text)}
            />
            <p className="font-serif text-2xl md:text-3xl text-center text-text-primary italic">
              "{copy.about.purpose.quote}"
            </p>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default About;