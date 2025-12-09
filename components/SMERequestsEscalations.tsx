
import React from 'react';
import { TrendingUp, ArrowUp } from 'lucide-react';

export const SMERequestsEscalations: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm animate-in fade-in slide-in-from-bottom-2">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <TrendingUp size={20} className="text-amber-500" /> Escalations
        </h3>
        
        <div className="space-y-4">
             <div className="p-4 border border-amber-200 dark:border-amber-900/30 rounded-xl bg-amber-50/50 dark:bg-amber-900/10">
                 <div className="flex justify-between items-start">
                     <div>
                         <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                             <ArrowUp size={16} className="text-amber-600" /> High Priority: Account Blocked
                         </h4>
                         <p className="text-xs text-slate-500 mt-1">Client unable to process payroll. Escalated by L1 Support.</p>
                     </div>
                     <span className="text-xs font-bold text-amber-700 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400 px-2 py-1 rounded">Level 2</span>
                 </div>
             </div>
        </div>
    </div>
  );
};
