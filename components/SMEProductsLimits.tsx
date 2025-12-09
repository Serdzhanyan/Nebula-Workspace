
import React from 'react';
import { Sliders } from 'lucide-react';

export const SMEProductsLimits: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm animate-in fade-in slide-in-from-bottom-2">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <Sliders size={20} className="text-slate-500" /> Transaction Limits
        </h3>
        
        <div className="space-y-6">
             <div>
                 <div className="flex justify-between mb-2">
                     <label className="text-sm font-bold text-slate-700 dark:text-slate-200">Daily Transfer Limit</label>
                     <span className="text-sm font-bold text-indigo-600">$50,000</span>
                 </div>
                 <input type="range" className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700" />
                 <p className="text-xs text-slate-500 mt-1">Maximum allowed for online transfers per day.</p>
             </div>
             
             <div>
                 <div className="flex justify-between mb-2">
                     <label className="text-sm font-bold text-slate-700 dark:text-slate-200">Corporate Card Monthly Limit</label>
                     <span className="text-sm font-bold text-indigo-600">$100,000</span>
                 </div>
                 <input type="range" className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700" />
             </div>
             
             <div className="flex justify-end">
                 <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700">Save Limits</button>
             </div>
        </div>
    </div>
  );
};
