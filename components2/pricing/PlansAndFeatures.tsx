
import React from 'react';
import { Link } from 'react-router-dom';
import { Check, MessageCircle, Star } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: '45',
    tagline: 'Ideal for busy schedules',
    sessions: '2 Classes / Week',
    features: ['30 Min 1-on-1 Sessions', 'Male/Female Tutor Choice', 'Monthly Progress Report', 'Rescheduling Allowed', 'Digital Learning Material'],
    popular: false
  },
  {
    name: 'Standard',
    price: '65',
    tagline: 'Our most effective pace',
    sessions: '3 Classes / Week',
    features: ['30 Min 1-on-1 Sessions', 'Priority Tutor Matching', 'Weekly Progress Analytics', 'Extended Rescheduling', 'Full Portal Access', 'Certificate of Level Completion'],
    popular: true
  },
  {
    name: 'Premium',
    price: '100',
    tagline: 'Accelerated spiritual growth',
    sessions: '5 Classes / Week',
    features: ['30 Min 1-on-1 Sessions', 'Senior Ijazah Holders', 'Daily Evaluation Tracking', 'Unlimited Rescheduling', 'Exclusive Webinars', 'Ijazah Track Consultation'],
    popular: false
  }
];

export const PlansAndFeatures: React.FC = () => {
  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div 
              key={idx} 
              className={`group relative p-[2px] rounded-[3rem] transition-all duration-500 ${plan.popular ? 'bg-gradient-to-br from-[#074E3C] to-transparent shadow-2xl scale-105 z-10' : 'bg-slate-100 dark:bg-white/5 hover:bg-[#074E3C44]'}`}
            >
              <div className="bg-[#FFFAEA] dark:bg-[#161616] p-10 md:p-12 rounded-[3rem] h-full flex flex-col relative overflow-hidden">
                {plan.popular && (
                  <div className="absolute top-8 right-8">
                    <div className="bg-[#074E3C] text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center space-x-1 shadow-lg">
                      <Star size={10} fill="currentColor" />
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}
                
                <div className="mb-10">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">{plan.name}</h3>
                  <p className="text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-widest">{plan.tagline}</p>
                </div>

                <div className="flex items-baseline mb-8">
                  <span className="text-6xl font-black text-slate-900 dark:text-white">${plan.price}</span>
                  <span className="text-slate-500 ml-2 font-bold uppercase tracking-widest text-xs">/ month</span>
                </div>

                <div className="bg-[#074E3C11] dark:bg-white/5 p-4 rounded-2xl mb-10 text-center">
                  <span className="text-[#074E3C] dark:text-emerald-400 font-black tracking-tight">{plan.sessions}</span>
                </div>

                <ul className="space-y-5 mb-12 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-sm font-bold text-slate-700 dark:text-slate-300">
                      <Check className="text-[#074E3C] mr-3 mt-0.5 shrink-0" size={18} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-4">
                  <Link 
                    to="/book-free-trial" 
                    className={`w-full block text-center py-5 rounded-2xl font-black text-lg transition-all transform active:scale-95 shadow-xl ${plan.popular ? 'bg-[#074E3C] text-white hover:bg-slate-900 shadow-[#074E3C33]' : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-2 border-slate-100 dark:border-white/5 hover:border-[#074E3C]'}`}
                  >
                    Book Free Trial
                  </Link>
                  <a 
                    href="https://wa.me/1234567890" 
                    className="w-full flex items-center justify-center space-x-2 text-slate-500 dark:text-slate-400 hover:text-[#074E3C] font-black text-sm uppercase tracking-widest transition-colors"
                  >
                    <MessageCircle size={18} />
                    <span>Talk on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
