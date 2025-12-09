
import React from 'react';
import { Smartphone, Plus } from 'lucide-react';

export const SMEProductsAcquiring: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm animate-in fade-in slide-in-from-bottom-2">
        <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <Smartphone size={20} className="text-blue-500" /> Acquiring & POS
            </h3>
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors">
                <Plus size={16} /> Request Terminal
            </button>
        </div>
        
        <div className="space-y-4">
             <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl flex justify-between items-center">
                 <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-400">
                         <Smartphone size={24} />
                     </div>
                     <div>
                         <p className="font-bold text-slate-900 dark:text-white">SmartPOS X5</p>
                         <p className="text-xs text-slate-500">TID: 88291002 • Location: Main Store</p>
                     </div>
                 </div>
                 <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-2 py-1 rounded text-xs font-bold uppercase">Online</span>
             </div>
             
             <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700">
                 <div className="flex justify-between text-sm font-medium mb-2">
                     <span className="text-slate-600 dark:text-slate-300">Transaction Rate (Visa/MC)</span>
                     <span className="text-slate-900 dark:text-white font-bold">1.9% + $0.10</span>
                 </div>
                 <div className="flex justify-between text-sm font-medium">
                     <span className="text-slate-600 dark:text-slate-300">QR Payment Rate</span>
                     <span className="text-slate-900 dark:text-white font-bold">0.8%</span>
                 </div>
             </div>
        </div>
    </div>
  );
};
