
import React from 'react';
import { DollarSign, Clock, Plus } from 'lucide-react';

export const SMEProductsLoans: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm animate-in fade-in slide-in-from-bottom-2">
        <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <DollarSign size={20} className="text-emerald-500" /> Active Loans
            </h3>
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors">
                <Plus size={16} /> New Application
            </button>
        </div>
        
        <div className="space-y-4">
             <div className="p-5 border border-slate-200 dark:border-slate-700 rounded-xl">
                 <div className="flex justify-between items-start mb-4">
                     <div>
                         <h4 className="font-bold text-slate-900 dark:text-white">Working Capital Loan</h4>
                         <p className="text-xs text-slate-500">Ref: #LN-2023-882</p>
                     </div>
                     <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-2 py-1 rounded text-xs font-bold uppercase">Active</span>
                 </div>
                 
                 <div className="grid grid-cols-3 gap-4 mb-4">
                     <div>
                         <p className="text-xs text-slate-500 uppercase font-bold">Principal</p>
                         <p className="font-semibold text-slate-800 dark:text-slate-200">$250,000</p>
                     </div>
                     <div>
                         <p className="text-xs text-slate-500 uppercase font-bold">Remaining</p>
                         <p className="font-semibold text-slate-800 dark:text-slate-200">$125,400</p>
                     </div>
                     <div>
                         <p className="text-xs text-slate-500 uppercase font-bold">Next Payment</p>
                         <p className="font-semibold text-slate-800 dark:text-slate-200">Nov 01, 2024</p>
                     </div>
                 </div>
                 
                 <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                     <div className="bg-indigo-600 h-full w-[50%]"></div>
                 </div>
                 <p className="text-xs text-right text-slate-400 mt-1">50% Repaid</p>
             </div>
        </div>
    </div>
  );
};
