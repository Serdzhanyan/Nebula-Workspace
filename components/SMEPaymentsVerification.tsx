
import React from 'react';
import { CheckCircle2, XCircle, FileText } from 'lucide-react';

export const SMEPaymentsVerification: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm animate-in fade-in slide-in-from-bottom-2">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <CheckCircle2 size={20} className="text-blue-500" /> Outgoing Payment Verification
        </h3>
        <div className="space-y-4">
            {[1, 2].map((item) => (
                <div key={item} className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <span className="text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-2 py-0.5 rounded uppercase">Manual Review</span>
                            <h4 className="font-bold text-slate-900 dark:text-white mt-2">Wire Transfer to Oversea Supplier</h4>
                            <p className="text-sm text-slate-500">Beneficiary: Global Mfg Ltd. (CN)</p>
                        </div>
                        <div className="text-right">
                            <span className="text-xl font-bold text-slate-900 dark:text-white">$45,000.00</span>
                            <p className="text-xs text-slate-400">Created by: Finance Dept</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-800 mb-4">
                        <FileText size={16} className="text-slate-400" />
                        <span className="text-sm text-slate-600 dark:text-slate-300">Invoice #INV-2024-00{item} attached</span>
                        <button className="text-xs text-indigo-600 font-bold ml-auto hover:underline">View</button>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex-1 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-700 transition-colors">Approve</button>
                        <button className="flex-1 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">Reject</button>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};
