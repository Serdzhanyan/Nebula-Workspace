
import React from 'react';
import { Check, Plus } from 'lucide-react';

export const SMEProductsServices: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm animate-in fade-in slide-in-from-bottom-2">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6">Additional Services</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="p-4 border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-900/10 rounded-xl flex items-center justify-between">
                 <div>
                     <p className="font-bold text-slate-900 dark:text-white">SMS Notifications</p>
                     <p className="text-xs text-slate-500">Real-time alerts for all transactions</p>
                 </div>
                 <span className="bg-emerald-500 text-white p-1 rounded-full"><Check size={16} /></span>
             </div>
             
             <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between hover:border-indigo-300 transition-colors cursor-pointer">
                 <div>
                     <p className="font-bold text-slate-900 dark:text-white">Concierge Service</p>
                     <p className="text-xs text-slate-500">24/7 Personal Assistant support</p>
                 </div>
                 <button className="text-indigo-600 hover:bg-indigo-50 p-2 rounded-lg"><Plus size={18} /></button>
             </div>
             
             <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between hover:border-indigo-300 transition-colors cursor-pointer">
                 <div>
                     <p className="font-bold text-slate-900 dark:text-white">Legal Review</p>
                     <p className="text-xs text-slate-500">Contract templates & review</p>
                 </div>
                 <button className="text-indigo-600 hover:bg-indigo-50 p-2 rounded-lg"><Plus size={18} /></button>
             </div>
        </div>
    </div>
  );
};
