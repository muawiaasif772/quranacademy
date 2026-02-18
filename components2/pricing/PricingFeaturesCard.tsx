
import React from 'react';
import { ShieldCheck, Clock, Users, Globe } from 'lucide-react';

export const PricingFeaturesCard: React.FC = () => {
  const cards = [
    { icon: Users, title: '1-on-1 Focus', desc: 'No group distractions. Just you and your teacher working together.' },
    { icon: ShieldCheck, title: 'Kids Safety', desc: 'Secure digital environment with continuous quality monitoring.' },
    { icon: Clock, title: 'Flexible Timing', desc: 'Reschedule or pause your classes with a 24-hour notice policy.' },
    { icon: Globe, title: 'Global Scholars', desc: 'Certified native speakers and graduates from Al-Azhar University.' }
  ];

  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, idx) => (
            <div key={idx} className="bg-white dark:bg-[#161616] p-10 rounded-[2.5rem] border-2 border-[#074E3C11] shadow-xl hover:shadow-2xl transition-all group">
              <div className="w-16 h-16 bg-[#f3f9f7] dark:bg-[#0D0D0D] rounded-3xl flex items-center justify-center mb-8 shadow-inner group-hover:rotate-12 transition-all">
                <card.icon className="text-[#074E3C]" size={32} />
              </div>
              <h4 className="text-xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">{card.title}</h4>
              <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
