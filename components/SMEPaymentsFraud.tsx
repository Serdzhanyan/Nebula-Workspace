
import React from 'react';
import { AlertOctagon } from 'lucide-react';

export const SMEPaymentsFraud: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm animate-in fade-in slide-in-from-bottom-2">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <AlertOctagon size={20} className="text-red-600" /> Fraud Alerts
        </h3>
        
        <div className="text-center py-12">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600 dark:text-emerald-400">
                <AlertOctagon size={32} />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white">All Systems Secure</h4>
            <p className="text-sm text-slate-500 mt-1">No active fraud alerts detected in the last 24 hours.</p>
        </div>
    </div>
  );
};
