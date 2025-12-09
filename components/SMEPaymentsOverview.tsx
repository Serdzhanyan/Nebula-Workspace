
import React from 'react';
import { ArrowUpRight, ArrowDownLeft, AlertCircle, Activity } from 'lucide-react';

export const SMEPaymentsOverview: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 rounded-lg"><Activity size={20} /></div>
                    <span className="text-xs font-bold uppercase text-slate-500">Total Volume (24h)</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">$4.2M</p>
                <p className="text-xs text-slate-400 font-medium mt-1">1,240 Transactions</p>
            </div>
             <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-lg"><AlertCircle size={20} /></div>
                    <span className="text-xs font-bold uppercase text-slate-500">Pending Review</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">18</p>
                <p className="text-xs text-amber-500 font-medium mt-1">Requires Attention</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg"><ArrowUpRight size={20} /></div>
                    <span className="text-xs font-bold uppercase text-slate-500">Outgoing</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">$2.8M</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-lg"><ArrowDownLeft size={20} /></div>
                    <span className="text-xs font-bold uppercase text-slate-500">Incoming</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">$1.4M</p>
            </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
             <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6">Recent Transactions</h3>
             <div className="space-y-4">
                 {[1,2,3,4,5].map(i => (
                     <div key={i} className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                         <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 font-bold">
                                 {i % 2 === 0 ? 'S' : 'A'}
                             </div>
                             <div>
                                 <p className="font-bold text-sm text-slate-900 dark:text-white">Vendor Payment #{2000+i}</p>
                                 <p className="text-xs text-slate-500">Processed via ACH • 2 mins ago</p>
                             </div>
                         </div>
                         <span className="font-mono font-bold text-slate-900 dark:text-white">
                             {i % 2 === 0 ? '- $12,500.00' : '+ $4,200.00'}
                         </span>
                     </div>
                 ))}
             </div>
        </div>
    </div>
  );
};
