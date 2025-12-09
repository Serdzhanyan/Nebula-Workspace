
import React from 'react';
import { Truck } from 'lucide-react';

export const SMEProductsLeasing: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm animate-in fade-in slide-in-from-bottom-2">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <Truck size={20} className="text-amber-500" /> Equipment Leasing
        </h3>
        
        <div className="space-y-4">
             <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl flex justify-between items-center">
                 <div>
                     <p className="font-bold text-slate-900 dark:text-white">Delivery Fleet 2024</p>
                     <p className="text-xs text-slate-500">5 Vehicles • Contract #L-9921</p>
                 </div>
                 <div className="text-right">
                     <p className="font-bold text-slate-900 dark:text-white">$2,400/mo</p>
                     <p className="text-[10px] text-slate-400">Ends Dec 2026</p>
                 </div>
             </div>
        </div>
    </div>
  );
};
