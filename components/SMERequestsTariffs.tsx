
import React from 'react';
import { Tag, ArrowRight } from 'lucide-react';

export const SMERequestsTariffs: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm animate-in fade-in slide-in-from-bottom-2">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <Tag size={20} className="text-purple-500" /> Tariff Change Requests
        </h3>
        
        <div className="space-y-4">
             <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl">
                 <div className="flex justify-between items-center mb-4">
                     <h4 className="font-bold text-slate-900 dark:text-white text-sm">TechNova Solutions Ltd.</h4>
                     <span className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">Ticket #TR-992</span>
                 </div>
                 <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg">
                     <div className="text-center">
                         <p className="text-xs text-slate-500 uppercase">Current</p>
                         <p className="font-bold text-slate-700 dark:text-slate-300">Standard Business</p>
                     </div>
                     <ArrowRight size={20} className="text-slate-400" />
                     <div className="text-center">
                         <p className="text-xs text-slate-500 uppercase">Requested</p>
                         <p className="font-bold text-indigo-600 dark:text-indigo-400">Enterprise Plus</p>
                     </div>
                 </div>
                 <div className="mt-4 flex justify-end">
                     <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-bold rounded-lg hover:bg-indigo-700">Execute Change</button>
                 </div>
             </div>
        </div>
    </div>
  );
};
