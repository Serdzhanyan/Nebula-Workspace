
import React from 'react';
import { RefreshCw, MessageCircle } from 'lucide-react';

export const SMEPaymentsRefunds: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm animate-in fade-in slide-in-from-bottom-2">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <RefreshCw size={20} className="text-purple-500" /> Refunds & Clarifications
        </h3>
        <div className="space-y-4">
             <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                 <div className="flex justify-between items-start mb-2">
                     <span className="text-sm font-bold text-slate-900 dark:text-white">Order #ORD-2021 Refund Request</span>
                     <span className="text-xs font-bold bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 px-2 py-0.5 rounded">New</span>
                 </div>
                 <div className="flex items-start gap-2 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-100 dark:border-slate-700 mb-3">
                     <MessageCircle size={16} className="text-slate-400 mt-0.5" />
                     <p className="text-xs text-slate-600 dark:text-slate-300">"Customer claims duplicate charge on credit card statement. Please verify and refund."</p>
                 </div>
                 <div className="flex justify-end gap-2">
                     <button className="text-xs font-bold text-slate-500 hover:text-slate-700 px-3 py-1.5">Dismiss</button>
                     <button className="text-xs font-bold bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700">Process Refund</button>
                 </div>
             </div>
        </div>
    </div>
  );
};
