
import React from 'react';
import { FileText, Clock, CheckCircle2 } from 'lucide-react';

export const SMECashApplications: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm animate-in fade-in slide-in-from-bottom-2">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <FileText size={20} className="text-indigo-500" /> Account Applications
        </h3>
        <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-xl">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-lg">
                        <Clock size={18} />
                    </div>
                    <div>
                        <p className="font-bold text-sm text-slate-900 dark:text-white">Business Checking - USD</p>
                        <p className="text-xs text-slate-500">Submitted on Oct 24, 2024</p>
                    </div>
                </div>
                <span className="px-3 py-1 bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 rounded-full text-xs font-bold">Under Review</span>
            </div>
            <div className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-xl">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-lg">
                        <CheckCircle2 size={18} />
                    </div>
                    <div>
                        <p className="font-bold text-sm text-slate-900 dark:text-white">Savings Account - EUR</p>
                        <p className="text-xs text-slate-500">Submitted on Oct 10, 2024</p>
                    </div>
                </div>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 rounded-full text-xs font-bold">Approved</span>
            </div>
        </div>
    </div>
  );
};
