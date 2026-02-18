
import React from 'react';
import { UserCheck, Clock, BarChart3, GraduationCap } from 'lucide-react';

export const WhatsIncluded: React.FC = () => {
  const items = [
    { icon: UserCheck, title: 'Verified Tutors', desc: 'Background checked scholars and graduates from Al-Azhar University.' },
    { icon: Clock, title: 'Flexible Timings', desc: 'We work across all timezones. Schedule your classes when it suits you.' },
    { icon: BarChart3, title: 'Monthly Reports', desc: 'Detailed analytics of your progress, pronunciation, and memorization goals.' },
    { icon: GraduationCap, title: 'Certificates', desc: 'Official Noor Al-Quran certification upon successful completion of each level.' }
  ];

  return (
    <section className="py-32 px-4 bg-white dark:bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight">What's <span className="text-[#074E3C]">Included</span></h2>
          <p className="mt-6 text-xl text-slate-500 font-medium">Beyond just classes, we provide a complete ecosystem for growth.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-start space-x-8 p-10 bg-[#f3f9f7] dark:bg-[#161616] rounded-[2.5rem] border-2 border-white dark:border-white/5 shadow-xl">
              <div className="w-16 h-16 bg-[#074E3C] text-white rounded-3xl flex items-center justify-center shrink-0 shadow-lg">
                <item.icon size={32} />
              </div>
              <div>
                <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-4">{item.title}</h4>
                <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
