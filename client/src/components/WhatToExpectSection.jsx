import React, { useState } from 'react';
import { Cpu, Layers, Award, Users, Bot, Zap } from 'lucide-react';
import FadeIn from './FadeIn';

const expectations = [
  {
    id: 'exp-1',
    icon: '/assets/expect-ai-powered.png',
    fallbackIcon: Cpu,
    title: 'AI-powered design tools',
    description: 'Enhance your everyday workflow with intelligent AI assistance.'
  },
  {
    id: 'exp-2',
    icon: '/assets/expect-automate.png',
    fallbackIcon: Layers,
    title: 'Latest SOLIDWORKS 2027 features',
    description: 'Test-drive the newest tools and capabilities.'
  },
  {
    id: 'exp-3',
    icon: '/assets/expect-explore.png',
    fallbackIcon: Award,
    title: 'Best practices & expert tips',
    description: 'Learn from SOLIDWORKS professionals.'
  },
  {
    id: 'exp-4',
    icon: '/assets/expect-connect.png',
    fallbackIcon: Users,
    title: 'Connect with peers',
    description: 'Network with engineers and professionals in your area.'
  },
  {
    id: 'exp-5',
    icon: '/assets/expect-chatbot.png',
    fallbackIcon: Bot,
    title: 'AI Virtual Companions',
    description: 'Get intelligent assistance throughout your work.'
  },
  {
    id: 'exp-6',
    icon: '/assets/expect-airounded.png',
    fallbackIcon: Zap,
    title: 'Work smarter & faster',
    description: 'Discover how AI can accelerate your design process.'
  }
];

function ExpectationItem({ item, index = 0 }) {
  const [imgError, setImgError] = useState(false);
  const FallbackIcon = item.fallbackIcon;

  return (
    <FadeIn direction="up" delay={index * 80} className="h-full">
      <div className="h-full relative overflow-hidden flex items-center gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:shadow-red-950/5 hover:border-red-300 hover:-translate-y-1.5 active:scale-[0.99] active:translate-y-0 transition-all duration-300 ease-out cursor-pointer group before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1.5 before:bg-brand-red before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:duration-300">
        
        {/* Animated Icon Badge */}
        <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-red-50 via-slate-50 to-red-50/40 border border-red-100/90 flex items-center justify-center p-2.5 shadow-sm group-hover:scale-110 group-hover:rotate-2 group-hover:shadow-md group-hover:ring-4 group-hover:ring-red-100/80 group-hover:border-red-300 transition-all duration-300 ease-out flex-shrink-0">
          {!imgError ? (
            <img
              src={item.icon}
              alt={item.title}
              className="w-full h-full object-contain filter contrast-125 transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                if (!e.currentTarget.dataset.triedBackend) {
                  e.currentTarget.dataset.triedBackend = 'true';
                  e.currentTarget.src = `https://solidworks-banglore.onrender.com${item.icon}`;
                } else {
                  setImgError(true);
                }
              }}
              loading="lazy"
            />
          ) : (
            <FallbackIcon className="w-7 h-7 text-brand-red transition-transform duration-300 group-hover:scale-110" />
          )}
        </div>

        {/* Title — Description with smooth typography transitions */}
        <div className="flex-1 text-sm sm:text-[15px] leading-relaxed select-text">
          <strong className="font-extrabold text-slate-900 text-base sm:text-[17px] group-hover:text-brand-red transition-colors duration-200 inline-block">
            {item.title}
          </strong>
          <span className="text-brand-red font-black mx-2 select-none inline-block group-hover:translate-x-0.5 group-hover:scale-125 transition-transform duration-300 ease-out">
            —
          </span>
          <span className="text-slate-600 group-hover:text-slate-800 transition-colors duration-200 font-normal">
            {item.description}
          </span>
        </div>
      </div>
    </FadeIn>
  );
}

export default function WhatToExpectSection({ items = expectations }) {
  return (
    <section id="what-to-expect" className="space-y-6">
      {/* Section Header */}
      <FadeIn direction="up">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-1 bg-brand-red rounded-full"></span>
            <span className="text-xs font-black uppercase tracking-widest text-brand-red">
              WHAT TO EXPECT
            </span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Save your spot today and discover how you can:
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Explore key takeaways and practical engineering insights planned for you.
          </p>
        </div>
      </FadeIn>

      {/* 6 Points in 2-Column Clean Cards with Interactive Transitions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
        {items.map((item, idx) => (
          <ExpectationItem key={item.id} item={item} index={idx} />
        ))}
      </div>
    </section>
  );
}
