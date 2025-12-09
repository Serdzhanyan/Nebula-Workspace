
import React from 'react';
import { Activity } from 'lucide-react';

export const SMECashStatuses: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm animate-in fade-in slide-in-from-bottom-2">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <Activity size={20} className="text-blue-500" /> Processing Statuses
        </h3>
        <div className="space-y-4">
             <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-slate-800 dark:text-white">Batch #9921 - Payroll</span>
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 px-2 py-1 rounded">Processing</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-indigo-500 h-full w-[65%]"></div>
                </div>
                <p className="text-xs text-slate-500 mt-2">Started 10 mins ago • Est. completion 5 mins</p>
             </div>
        </div>
    </div>
  );
};
