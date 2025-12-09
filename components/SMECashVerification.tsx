
import React from 'react';
import { ShieldCheck, FileCheck } from 'lucide-react';

export const SMECashVerification: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm animate-in fade-in slide-in-from-bottom-2">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <ShieldCheck size={20} className="text-emerald-500" /> Document Verification
        </h3>
        <div className="space-y-3">
             <div className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-700 rounded-xl">
                 <div className="flex items-center gap-3">
                     <FileCheck size={18} className="text-slate-500" />
                     <span className="text-sm font-bold text-slate-900 dark:text-white">Signatory Authorization Form</span>
                 </div>
                 <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded">Verified</span>
             </div>
             <div className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-700 rounded-xl">
                 <div className="flex items-center gap-3">
                     <FileCheck size={18} className="text-slate-500" />
                     <span className="text-sm font-bold text-slate-900 dark:text-white">Board Resolution</span>
                 </div>
                 <span className="text-xs font-bold text-amber-600 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded">Pending Review</span>
             </div>
        </div>
    </div>
  );
};
