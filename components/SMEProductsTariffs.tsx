
import React from 'react';
import { Tag, Check } from 'lucide-react';

export const SMEProductsTariffs: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <Tag size={20} className="text-purple-500" /> Current Plan
            </h3>
            <div className="flex items-start justify-between p-4 bg-purple-50 dark:bg-purple-900/10 rounded-xl border border-purple-100 dark:border-purple-900/30 mt-4">
                <div>
                    <h4 className="font-bold text-purple-900 dark:text-purple-100 text-lg">Business Professional</h4>
                    <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">$49.99 / month</p>
                    <ul className="mt-4 space-y-2">
                        <li className="flex items-center gap-2 text-sm text-purple-800 dark:text-purple-200"><Check size={14} /> 50 Free Transfers</li>
                        <li className="flex items-center gap-2 text-sm text-purple-800 dark:text-purple-200"><Check size={14} /> Multi-currency Accounts</li>
                        <li className="flex items-center gap-2 text-sm text-purple-800 dark:text-purple-200"><Check size={14} /> Dedicated Support</li>
                    </ul>
                </div>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-bold hover:bg-purple-700">Change Plan</button>
            </div>
        </div>
        
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
             <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4">Active Service Packages</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl flex justify-between items-center">
                     <div>
                         <p className="font-bold text-slate-900 dark:text-white">Payroll Plus</p>
                         <p className="text-xs text-slate-500">Automated tax handling</p>
                     </div>
                     <div className="form-checkbox">
                        <input type="checkbox" checked readOnly className="w-5 h-5 text-indigo-600 rounded" />
                     </div>
                 </div>
                 <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl flex justify-between items-center">
                     <div>
                         <p className="font-bold text-slate-900 dark:text-white">Legal Advisory</p>
                         <p className="text-xs text-slate-500">2 hrs/month consultation</p>
                     </div>
                     <div className="form-checkbox">
                        <input type="checkbox" checked readOnly className="w-5 h-5 text-indigo-600 rounded" />
                     </div>
                 </div>
             </div>
        </div>
    </div>
  );
};
