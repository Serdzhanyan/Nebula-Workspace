
import React from 'react';
import { Layers, UploadCloud } from 'lucide-react';

export const SMEPaymentsMass: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm animate-in fade-in slide-in-from-bottom-2">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <Layers size={20} className="text-indigo-500" /> Mass Payment Processing
        </h3>
        
        <div className="p-8 border-2 border-dashed border-indigo-200 dark:border-indigo-900 rounded-xl bg-indigo-50/50 dark:bg-indigo-900/10 text-center mb-8">
            <UploadCloud size={48} className="mx-auto text-indigo-400 mb-3" />
            <h4 className="font-bold text-slate-900 dark:text-white">Upload Payment File</h4>
            <p className="text-xs text-slate-500 mb-4">CSV, XML, or JSON formats supported</p>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700">Select File</button>
        </div>

        <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-3">Recent Batches</h4>
            <div className="space-y-3">
                 <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                     <div>
                         <p className="font-bold text-sm text-slate-900 dark:text-white">Batch #2024-10-24-A</p>
                         <p className="text-xs text-slate-500">145 Records • $24,500.00</p>
                     </div>
                     <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-1 rounded">Completed</span>
                 </div>
            </div>
        </div>
    </div>
  );
};
