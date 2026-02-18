
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';

export const PricingCta: React.FC = () => {
  return (
    <section className="py-40 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="relative p-[2px] rounded-[4rem] bg-gradient-to-br from-[#074E3C] via-[#2D7A68] to-transparent shadow-2xl overflow-hidden group">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-[#074E3C22] blur-[150px] rounded-full pointer-events-none"></div>
          <div className="bg-[#FFFAEA] dark:bg-[#161616] p-16 md:p-32 rounded-[4rem] text-center relative z-10">
            <h2 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white mb-10 tracking-tighter leading-none">
              Start Your <span className="text-[#074E3C]">30-Min</span> <br /> Free Trial
            </h2>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-16 leading-relaxed font-medium">
              Join 5,000+ students worldwide and experience the most personalized online Quran learning platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/book-free-trial" className="bg-[#074E3C] hover:bg-slate-900 text-white px-12 py-6 rounded-3xl font-black text-2xl shadow-2xl shadow-[#074E3C33] hover:shadow-black/20 transition-all transform hover:-translate-y-2 flex items-center justify-center space-x-4 group/btn">
                <span>Register Now</span>
                <ArrowRight size={28} className="group-hover/btn:translate-x-2 transition-transform" />
              </Link>
              <a href="https://wa.me/1234567890" className="bg-white dark:bg-white/5 text-slate-900 dark:text-white border-4 border-slate-100 dark:border-white/10 px-12 py-6 rounded-3xl font-black text-2xl hover:bg-slate-50 dark:hover:bg-white/10 transition-all transform hover:-translate-y-2 flex items-center justify-center space-x-4">
                <MessageCircle size={28} />
                <span>Quick WhatsApp</span>
              </a>
            </div>
            
            <p className="mt-12 text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
              Available in UK, USA, Canada, Australia & Worldwide
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
