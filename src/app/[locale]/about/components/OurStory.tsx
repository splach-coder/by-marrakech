// src/app/[locale]/about/components/OurStory.tsx
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { BookOpen, Target, Users, Award } from 'lucide-react';

export default function OurStory() {
  const [activeTab, setActiveTab] = useState('story');

  const tabs = [
    { id: 'story', label: 'Our Story', icon: BookOpen },
    { id: 'mission', label: 'Our Mission', icon: Target },
    { id: 'team', label: 'Our Team', icon: Users },
    { id: 'experience', label: 'Our Experience', icon: Award },
  ];

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm text-text-tertiary uppercase tracking-wider">
              OUR JOURNEY
            </span>
            <div className="w-4 h-4 text-text-tertiary">↓</div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-primary leading-tight mb-8">
            Discover what makes<br />
            Xhosen the premier choice<br />
            for authentic experiences
          </h2>

          {/* Tabs */}
          <div className="flex flex-wrap gap-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-primary text-white'
                      : 'bg-white text-text-primary border-2 border-border hover:border-primary'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-primary via-[#a63333] to-[#b84a3a] rounded-2xl p-12 md:p-16 text-center"
        >
          <p className="text-white text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Discover the journey that shaped Xhosen into Morocco's premier travel agency.
          </p>
        </motion.div>
      </div>
    </section>
  );
}