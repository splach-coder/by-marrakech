// src/app/[locale]/contact/components/NewsletterSection.tsx
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <section className="py-16 md:py-20 bg-background-cream">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Section Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm text-text-tertiary uppercase tracking-wider">
                NEWSLETTER
              </span>
              <div className="w-4 h-4 text-text-tertiary">↓</div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary leading-tight mb-6">
              Subscribe To Our Newsletter
            </h2>
          </div>

          {/* Newsletter Form */}
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
                <Mail className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <div className="flex-1">
              <p className="text-text-tertiary mb-6 leading-relaxed">
                Stay up to date with our latest news, updates, and special offers 
                by subscribing to our newsletter.
              </p>
              
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-6 py-3 border-2 border-border rounded-lg focus:border-primary focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-all whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}