
import React from 'react';
import { Lock, TrendingUp } from 'lucide-react';

export const SMEProductsDeposits: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm animate-in fade-in slide-in-from-bottom-2">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <Lock size={20} className="text-blue-500" /> Fixed Deposits
        </h3>
        
        <div className="space-y-4">
             <div className="p-5 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-xl border border-indigo-100 dark:border-indigo-900/50">
                 <div className="flex justify-between items-start mb-4">
                     <div>
                         <p className="text-xs text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wide">12-Month Growth</p>
                         <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">$100,000.00</p>
                     </div>
                     <span className="bg-white dark:bg-slate-800 px-2 py-1 rounded-lg text-xs font-bold text-emerald-500 flex items-center gap-1 shadow-sm">
                         <TrendingUp size={12} /> 4.5% APY
                     </span>
                 </div>
                 <div className="w-full bg-white dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                     <div className="bg-indigo-500 h-full w-[35%]"></div>
                 </div>
                 <p className="text-xs text-slate-500 mt-2">Matures on Aug 15, 2025</p>
             </div>
        </div>
    </div>
  );
};
