
import React from 'react';
import { Users, UploadCloud } from 'lucide-react';

export const SMEProductsPayroll: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm animate-in fade-in slide-in-from-bottom-2">
        <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <Users size={20} className="text-indigo-500" /> Payroll Projects
            </h3>
            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700">
                <UploadCloud size={16} /> Upload Batch
            </button>
        </div>
        
        <div className="space-y-4">
             <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                 <div className="flex justify-between items-center mb-2">
                     <p className="font-bold text-slate-900 dark:text-white">Main Office Staff</p>
                     <span className="text-xs font-mono text-slate-500">ID: PR-001</span>
                 </div>
                 <div className="flex gap-6 text-sm">
                     <div>
                         <span className="text-slate-500 text-xs block">Employees</span>
                         <span className="font-medium text-slate-800 dark:text-white">112</span>
                     </div>
                     <div>
                         <span className="text-slate-500 text-xs block">Next Payout</span>
                         <span className="font-medium text-slate-800 dark:text-white">Oct 31, 2024</span>
                     </div>
                     <div>
                         <span className="text-slate-500 text-xs block">Total Amount</span>
                         <span className="font-medium text-slate-800 dark:text-white">$450,200</span>
                     </div>
                 </div>
             </div>
        </div>
    </div>
  );
};
