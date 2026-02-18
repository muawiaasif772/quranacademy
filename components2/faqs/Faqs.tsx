
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqData = [
  { 
    id: '1', 
    question: 'How do I start my free trial class?', 
    answer: 'Simply click "Book Free Trial" anywhere on our site. Fill in your details, and a student advisor will contact you within 24 hours to schedule your evaluation session. No credit card required.' 
  },
  { 
    id: '2', 
    question: 'Can I choose between a male and female tutor?', 
    answer: 'Yes, absolutely. We respect your preferences and cultural values. You can select either a qualified male or female teacher for yourself or your children at the time of registration.' 
  },
  { 
    id: '3', 
    question: 'What happens if I miss a scheduled class?', 
    answer: 'We have a flexible rescheduling policy. As long as you notify us or your teacher at least 24 hours in advance, the class credit remains in your account and can be made up later.' 
  },
  { 
    id: '4', 
    question: 'Is it safe for children to learn online?', 
    answer: 'Safety is our top priority. Our virtual classrooms are monitored, and all our tutors undergo a rigorous background check. We encourage parents to be present during initial sessions.' 
  },
  { 
    id: '5', 
    question: 'What payment methods do you accept?', 
    answer: 'We accept all major credit/debit cards (Visa, Mastercard, Amex) and PayPal. Payments are processed through secure gateways, and we use monthly recurring billing for convenience.' 
  },
  { 
    id: '6', 
    question: 'Can I record my classes for later review?', 
    answer: 'Yes, our portal allows for easy session recording. This is a great tool for students to review their Tajweed corrections and practice between live sessions.' 
  }
];

export const Faqs: React.FC = () => {
  const [openIds, setOpenIds] = useState<string[]>(['1', '2']);

  const toggle = (id: string) => {
    setOpenIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <section className="py-32 px-4 relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight">Got <span className="text-[#074E3C]">Questions?</span></h2>
          <p className="mt-6 text-xl text-slate-500 font-medium">Everything you need to know about our tuition and platform.</p>
        </div>
        
        <div className="space-y-6">
          {faqData.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div 
                key={faq.id} 
                className={`bg-white dark:bg-[#161616] p-8 md:p-10 rounded-[2.5rem] border-2 transition-all duration-500 cursor-pointer ${isOpen ? 'border-[#074E3C] shadow-2xl' : 'border-slate-100 dark:border-white/5 hover:border-[#074E3C44]'}`}
                onClick={() => toggle(faq.id)}
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">{faq.question}</h4>
                  <div className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-500 ${isOpen ? 'bg-[#074E3C] text-white rotate-180' : 'bg-slate-50 dark:bg-white/5 text-slate-400'}`}>
                    {isOpen ? <Minus size={24} strokeWidth={3} /> : <Plus size={24} strokeWidth={3} />}
                  </div>
                </div>
                <div className={`overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-96 opacity-100 mt-8' : 'max-h-0 opacity-0'}`}>
                  <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
