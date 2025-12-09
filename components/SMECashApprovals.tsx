
import React from 'react';
import { Gavel, Check } from 'lucide-react';

export const SMECashApprovals: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm animate-in fade-in slide-in-from-bottom-2">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <Gavel size={20} className="text-slate-500" /> Legal Approvals
        </h3>
        <div className="p-12 text-center text-slate-500 dark:text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl">
            <Check size={48} className="mx-auto text-emerald-500 mb-4 opacity-50" />
            <p className="font-medium">No pending approvals</p>
            <p className="text-sm mt-1">All legal requirements have been met for current accounts.</p>
        </div>
    </div>
  );
};
