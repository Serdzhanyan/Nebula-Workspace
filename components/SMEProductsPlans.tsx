
import React from 'react';
import { Check } from 'lucide-react';

export const SMEProductsPlans: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm animate-in fade-in slide-in-from-bottom-2">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6 text-center">Available Tariff Plans</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 border border-slate-200 dark:border-slate-700 rounded-2xl hover:border-indigo-300 transition-all text-center">
                <h4 className="font-bold text-slate-900 dark:text-white">Start</h4>
                <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2 mb-1">$0</p>
                <p className="text-xs text-slate-500 mb-6">/ month</p>
                <ul className="space-y-3 text-left text-sm text-slate-600 dark:text-slate-400 mb-6">
                    <li className="flex gap-2"><Check size={16} className="text-emerald-500" /> 5 Free Transfers</li>
                    <li className="flex gap-2"><Check size={16} className="text-emerald-500" /> 1 Card</li>
                </ul>
                <button className="w-full py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50">Select</button>
            </div>
            
            <div className="p-6 border-2 border-indigo-500 rounded-2xl bg-indigo-50/10 text-center relative transform scale-105 shadow-md">
                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-500 text-white px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide">Current</span>
                <h4 className="font-bold text-indigo-600 dark:text-indigo-400">Business Pro</h4>
                <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2 mb-1">$49</p>
                <p className="text-xs text-slate-500 mb-6">/ month</p>
                <ul className="space-y-3 text-left text-sm text-slate-600 dark:text-slate-400 mb-6">
                    <li className="flex gap-2"><Check size={16} className="text-emerald-500" /> 50 Free Transfers</li>
                    <li className="flex gap-2"><Check size={16} className="text-emerald-500" /> 5 Cards</li>
                    <li className="flex gap-2"><Check size={16} className="text-emerald-500" /> Priority Support</li>
                </ul>
                <button className="w-full py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold">Manage</button>
            </div>
            
             <div className="p-6 border border-slate-200 dark:border-slate-700 rounded-2xl hover:border-indigo-300 transition-all text-center">
                <h4 className="font-bold text-slate-900 dark:text-white">Enterprise</h4>
                <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2 mb-1">$199</p>
                <p className="text-xs text-slate-500 mb-6">/ month</p>
                <ul className="space-y-3 text-left text-sm text-slate-600 dark:text-slate-400 mb-6">
                    <li className="flex gap-2"><Check size={16} className="text-emerald-500" /> Unlimited Transfers</li>
                    <li className="flex gap-2"><Check size={16} className="text-emerald-500" /> Unlimited Cards</li>
                    <li className="flex gap-2"><Check size={16} className="text-emerald-500" /> Dedicated Manager</li>
                </ul>
                <button className="w-full py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50">Upgrade</button>
            </div>
        </div>
    </div>
  );
};
