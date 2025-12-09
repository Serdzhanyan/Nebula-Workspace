
import React from 'react';
import { FileText, Download } from 'lucide-react';

export const SMEProductsContracts: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm animate-in fade-in slide-in-from-bottom-2">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <FileText size={20} className="text-slate-500" /> Contract History
        </h3>
        
        <div className="space-y-3">
             <div className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                 <div className="flex items-center gap-3">
                     <FileText size={20} className="text-slate-400" />
                     <div>
                         <p className="font-bold text-sm text-slate-900 dark:text-white">Master Service Agreement</p>
                         <p className="text-xs text-slate-500">Signed Oct 2021</p>
                     </div>
                 </div>
                 <button className="p-2 text-slate-400 hover:text-indigo-600"><Download size={18} /></button>
             </div>
             <div className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                 <div className="flex items-center gap-3">
                     <FileText size={20} className="text-slate-400" />
                     <div>
                         <p className="font-bold text-sm text-slate-900 dark:text-white">Loan Agreement #LN-2023</p>
                         <p className="text-xs text-slate-500">Signed Mar 2023</p>
                     </div>
                 </div>
                 <button className="p-2 text-slate-400 hover:text-indigo-600"><Download size={18} /></button>
             </div>
        </div>
    </div>
  );
};
