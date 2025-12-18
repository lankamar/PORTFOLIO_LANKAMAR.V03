import React, { useState } from 'react';
import { copy } from '../lib/copy';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: '',
    website: '' // Honeypot
  });
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const validateField = (name: string, value: string) => {
    if (name === 'nombre') {
      if (!value.trim()) return 'Nombre requerido';
      if (value.length > 100) return 'Máximo 100 caracteres';
    }
    if (name === 'email') {
      if (!value.trim()) return 'Email requerido';
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) return 'Email inválido';
    }
    if (name === 'mensaje') {
      if (!value.trim()) return 'Mensaje requerido';
      if (value.length > 1000) return 'Máximo 1000 caracteres';
    }
    return '';
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    const fields = ['nombre', 'email', 'mensaje'];
    
    fields.forEach(field => {
      const error = validateField(field, formData[field as keyof typeof formData]);
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => {
      const next = { ...prev };
      if (error) {
        next[name] = error;
      } else {
        delete next[name];
      }
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // HONEYPOT CHECK
    if (formData.website && formData.website.length > 0) {
      // Silently fail for bots
      return;
    }

    if (!validate()) return;

    setStatus('submitting');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Form Submitted:', {
        ...formData,
        timestamp: new Date().toISOString()
      });

      setStatus('success');
      setFormData({ nombre: '', email: '', mensaje: '', website: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);

    } catch (error) {
      console.error('Error:', error);
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error on type
    if (errors[name]) {
        setErrors(prev => {
            const next = { ...prev };
            delete next[name];
            return next;
        });
    }
  };

  return (
    <section id="contact" className="py-24 px-4 relative z-10">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl text-text-primary mb-6 text-center">
          {copy.contact.title}
        </h2>
        <p className="text-text-secondary text-lg text-center mb-12 leading-relaxed">
          {copy.contact.description}
        </p>

        <motion.form 
            onSubmit={handleSubmit} 
            className="glass-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
          {/* HONEYPOT FIELD */}
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="sr-only"
            tabIndex={-1}
            aria-hidden="true"
            autoComplete="off"
          />

          {/* NOMBRE */}
          <div className="mb-6">
            <label htmlFor="nombre" className="block text-text-primary font-mono mb-2">
              Nombre
            </label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              maxLength={100}
              value={formData.nombre}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full bg-black/30 border rounded-lg px-4 py-3 text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent-hover transition-colors ${errors.nombre ? 'border-red-500' : 'border-accent-base'}`}
              placeholder="Tu nombre"
            />
            {errors.nombre && (
              <p className="text-red-400 text-sm mt-1 font-mono">{errors.nombre}</p>
            )}
          </div>

          {/* EMAIL */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-text-primary font-mono mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full bg-black/30 border rounded-lg px-4 py-3 text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent-hover transition-colors ${errors.email ? 'border-red-500' : 'border-accent-base'}`}
              placeholder="tu@email.com"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1 font-mono">{errors.email}</p>
            )}
          </div>

          {/* MENSAJE */}
          <div className="mb-8">
            <label htmlFor="mensaje" className="block text-text-primary font-mono mb-2">
              Mensaje
            </label>
            <textarea
              id="mensaje"
              name="mensaje"
              rows={5}
              maxLength={1000}
              value={formData.mensaje}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full bg-black/30 border rounded-lg px-4 py-3 text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent-hover resize-none transition-colors ${errors.mensaje ? 'border-red-500' : 'border-accent-base'}`}
              placeholder="Tu mensaje aquí..."
            />
            {errors.mensaje && (
              <p className="text-red-400 text-sm mt-1 font-mono">{errors.mensaje}</p>
            )}
          </div>

          {status === 'success' && (
             <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 p-4 bg-green-900/20 border border-green-800 rounded text-green-100 text-center font-mono"
             >
                Mensaje enviado. Conexión establecida.
             </motion.div>
          )}
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;