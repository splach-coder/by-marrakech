'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { Plus } from 'lucide-react';
import { getFaq } from '@/data/transferData';

export default function FAQSection() {
  const locale = useLocale();
  const t = useTranslations('home.faq');
  const faq = getFaq(locale);
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-24 py-24 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <span className="text-xs font-bold tracking-[0.25em] text-primary uppercase mb-3 block">{t('label')}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#3D322C] font-serif leading-tight">{t('title')}</h2>
            <p className="mt-5 text-text-secondary leading-relaxed">{t('subtitle')}</p>
          </motion.div>

          {/* Right: accordion */}
          <div className="lg:col-span-2 space-y-3">
            {faq.map((item, i) => {
              const isOpen = open === i;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className={`border rounded-md overflow-hidden transition-colors duration-300 ${
                    isOpen ? 'border-secondary bg-[#FFFBF5]' : 'border-border bg-white'
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-[13px] md:text-sm font-black uppercase tracking-[0.1em] text-text-primary">
                      {item.question}
                    </span>
                    <span
                      className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isOpen ? 'bg-secondary rotate-45' : 'bg-background'
                      }`}
                    >
                      <Plus className={`w-4 h-4 ${isOpen ? 'text-[#3b2f2f]' : 'text-text-secondary'}`} />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <p className="px-6 pb-6 text-sm md:text-[15px] text-text-secondary leading-relaxed">{item.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
