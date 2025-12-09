
import React from 'react';
import { DollarSign, Check } from 'lucide-react';

export const SMEPaymentsLarge: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm animate-in fade-in slide-in-from-bottom-2">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <DollarSign size={20} className="text-emerald-500" /> Large Payment Confirmation
        </h3>
        
        <div className="space-y-4">
             <div className="p-5 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm hover:shadow-md transition-all">
                 <div className="flex justify-between items-start mb-4">
                     <div>
                         <p className="text-xs text-slate-500 uppercase font-bold tracking-wide">Amount</p>
                         <p className="text-3xl font-bold text-slate-900 dark:text-white">$250,000.00</p>
                     </div>
                     <span className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-3 py-1 rounded-full text-xs font-bold">Pending 2FA</span>
                 </div>
                 <div className="flex justify-between items-end border-t border-slate-100 dark:border-slate-800 pt-4">
                     <div>
                         <p className="text-sm font-bold text-slate-800 dark:text-white">Capital Equipment Purchase</p>
                         <p className="text-xs text-slate-500">Recipient: Heavy Machinery Inc.</p>
                     </div>
                     <div className="flex gap-2">
                         <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700">Confirm</button>
                         <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-50">Hold</button>
                     </div>
                 </div>
             </div>
        </div>
    </div>
  );
};
