
import React from 'react';
import { Award, UploadCloud } from 'lucide-react';

export const SMECashLicenses: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm animate-in fade-in slide-in-from-bottom-2">
        <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <Award size={20} className="text-purple-500" /> Licenses & Permits
            </h3>
            <button className="flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                <UploadCloud size={14} /> Upload License
            </button>
        </div>
        
        <div className="space-y-3">
             <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-700">
                 <p className="text-sm font-bold text-slate-900 dark:text-white">State Banking License</p>
                 <p className="text-xs text-slate-500">Valid until Dec 31, 2025</p>
             </div>
        </div>
    </div>
  );
};
