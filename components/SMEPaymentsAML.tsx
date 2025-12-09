
import React from 'react';
import { ShieldAlert, Search } from 'lucide-react';

export const SMEPaymentsAML: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm animate-in fade-in slide-in-from-bottom-2">
        <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldAlert size={20} className="text-red-500" /> AML Checks
            </h3>
            <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input type="text" placeholder="Search entity..." className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none" />
            </div>
        </div>
        
        <div className="space-y-3">
             <div className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-xl flex justify-between items-center">
                 <div>
                     <p className="font-bold text-slate-900 dark:text-white">Transaction #TX-9921</p>
                     <p className="text-xs text-red-600 dark:text-red-400 mt-1">Flagged: Beneficiary in High Risk Jurisdiction</p>
                 </div>
                 <button className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-lg text-xs font-bold">Investigate</button>
             </div>
             <div className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl flex justify-between items-center">
                 <div>
                     <p className="font-bold text-slate-900 dark:text-white">Transaction #TX-9920</p>
                     <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">Cleared: No matches found</p>
                 </div>
                 <span className="text-xs font-mono text-slate-400">10:42 AM</span>
             </div>
        </div>
    </div>
  );
};
