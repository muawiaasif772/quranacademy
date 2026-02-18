
import React, { useState } from 'react';

export const PlanCalculator: React.FC = () => {
  const [classesPerWeek, setClassesPerWeek] = useState(3);
  const [duration, setDuration] = useState(30);

  const getRecommendedPlan = () => {
    if (classesPerWeek <= 2) return 'Starter';
    if (classesPerWeek <= 3) return 'Standard';
    return 'Premium';
  };

  const getPrice = () => {
    if (classesPerWeek <= 2) return 45;
    if (classesPerWeek <= 3) return 65;
    return 100;
  };

  return (
    <div className="relative group">
      <div className="absolute -inset-4 bg-[#074E3C22] rounded-[3rem] blur-3xl opacity-50"></div>
      <div className="relative bg-white dark:bg-[#161616] p-10 md:p-16 rounded-[3rem] border-2 border-[#074E3C11] shadow-2xl overflow-hidden">
        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-10 tracking-tight">Personalized Plan Calculator</h3>
        
        <div className="space-y-12">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400">Classes Per Week</label>
              <span className="text-2xl font-black text-[#074E3C]">{classesPerWeek} Sessions</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="7" 
              step="1" 
              value={classesPerWeek} 
              onChange={(e) => setClassesPerWeek(Number(e.target.value))}
              className="w-full h-2 bg-slate-100 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#074E3C]"
            />
          </div>

          <div className="space-y-6">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 block">Class Duration</label>
            <div className="grid grid-cols-3 gap-4">
              {[30, 45, 60].map((val) => (
                <button 
                  key={val}
                  onClick={() => setDuration(val)}
                  className={`py-4 rounded-2xl font-black text-sm transition-all ${duration === val ? 'bg-[#074E3C] text-white shadow-xl' : 'bg-slate-50 dark:bg-white/5 text-slate-500 hover:text-[#074E3C]'}`}
                >
                  {val} Mins
                </button>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t border-slate-100 dark:border-white/5">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Recommended</p>
                <p className="text-2xl font-black text-slate-900 dark:text-white">{getRecommendedPlan()}</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Monthly Cost</p>
                <p className="text-4xl font-black text-[#074E3C]">${getPrice()}</p>
              </div>
            </div>
            <p className="mt-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              Estimated {classesPerWeek * 4} interactive classes per month.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
