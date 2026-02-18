import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Send, Loader2, CheckCircle } from 'lucide-react';
import { submitLead } from '../services/api';

export const Contact: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    const formData = new FormData(e.currentTarget);
    const data = {
      type: 'contact' as const,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      country: formData.get('country') as string,
      message: formData.get('message') as string,
    };

    const res = await submitLead(data);
    if (res.success) setStatus('success');
    else setStatus('error');
  };

  return (
    <div className="bg-[#FFFDF6] dark:bg-[#0D0D0D] min-h-screen pt-32 pb-24 px-4 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h1 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter">
            Get in <span className="text-[#074E3C]">Touch</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { icon: Phone, title: 'Call/WhatsApp', value: '+1 (234) 567-890', color: 'bg-[#074E3C]' },
                { icon: Mail, title: 'Email Support', value: 'info@nooralquran.com', color: 'bg-[#074E3C]' },
                { icon: MessageCircle, title: 'Live Chat', value: 'Available 24/7', color: 'bg-[#074E3C]' },
                { icon: MapPin, title: 'Global Reach', value: '50+ Countries', color: 'bg-[#074E3C]' }
              ].map((item, idx) => (
                <div key={idx} className="bg-white dark:bg-[#161616] p-8 rounded-[2.5rem] border-2 border-[#074E3C11] shadow-xl hover:shadow-2xl transition-all group">
                  <div className={`w-14 h-14 ${item.color} text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                    <item.icon size={28} />
                  </div>
                  <h4 className="text-slate-400 uppercase tracking-widest text-[10px] font-black mb-1">{item.title}</h4>
                  <p className="text-xl font-black text-slate-900 dark:text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-[#161616] p-10 md:p-16 rounded-[3rem] border-2 border-[#074E3C11] shadow-2xl">
            {status === 'success' ? (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-emerald-100 text-[#074E3C] rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                  <CheckCircle size={48} />
                </div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Message Sent!</h2>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <input required name="name" type="text" placeholder="Full Name" className="w-full bg-[#f3f9f7] dark:bg-[#0D0D0D] border-2 border-[#074E3C11] focus:border-[#074E3C] rounded-2xl p-5 outline-none font-bold transition-all" />
                <input required name="email" type="email" placeholder="Email Address" className="w-full bg-[#f3f9f7] dark:bg-[#0D0D0D] border-2 border-[#074E3C11] focus:border-[#074E3C] rounded-2xl p-5 outline-none font-bold transition-all" />
                <textarea required name="message" rows={5} placeholder="Your Message" className="w-full bg-[#f3f9f7] dark:bg-[#0D0D0D] border-2 border-[#074E3C11] focus:border-[#074E3C] rounded-2xl p-5 outline-none font-bold transition-all resize-none"></textarea>
                <button type="submit" disabled={status === 'loading'} className="w-full bg-[#074E3C] text-white py-6 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-xl">
                  {status === 'loading' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};