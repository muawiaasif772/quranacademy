
import React from 'react';

export const PricingHero: React.FC = () => {
  return (
    <section className="pt-32 pb-20 px-4 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[#074E3C05] pointer-events-none"></div>
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center space-x-2 bg-white dark:bg-[#161616] border border-[#074E3C22] px-4 py-2 rounded-full mb-8 shadow-sm">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-[#074E3C]">Transparent Pricing</span>
        </div>
        <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tighter text-slate-900 dark:text-white">
          Simple Plans for <br />
          <span className="animate-shimmer bg-clip-text text-transparent bg-gradient-to-r from-[#074E3C] via-[#2D7A68] to-[#074E3C]">
            Every Learner
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto font-medium">
          Whether you're starting with Noorani Qaida or pursuing an advanced Ijazah, we have a flexible plan that fits your schedule and budget.
        </p>
      </div>
    </section>
  );
};
