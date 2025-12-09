
import React from 'react';
import { Search, AlertTriangle } from 'lucide-react';

export const SMEPaymentsSuspicious: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm animate-in fade-in slide-in-from-bottom-2">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <Search size={20} className="text-red-500" /> Manual Verification
        </h3>
        
        <div className="p-4 border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/10 rounded-xl mb-6 flex items-start gap-3">
            <AlertTriangle size={20} className="text-red-500 shrink-0 mt-0.5" />
            <div>
                <h4 className="font-bold text-red-700 dark:text-red-400 text-sm">High Priority Review</h4>
                <p className="text-xs text-red-600 dark:text-red-300 mt-1">Transactions flagged by AI with >90% fraud probability require immediate manual clearing.</p>
            </div>
        </div>

        <div className="text-center py-12 text-slate-400 border border-slate-100 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-900/50">
            <p className="font-medium">No suspicious transactions pending manual review.</p>
            <p className="text-xs mt-1">Great job!</p>
        </div>
    </div>
  );
};
