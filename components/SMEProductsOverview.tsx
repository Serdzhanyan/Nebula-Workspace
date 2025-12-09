
import React from 'react';
import { Package, CreditCard, Percent, Briefcase } from 'lucide-react';

export const SMEProductsOverview: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 rounded-lg"><Package size={20} /></div>
                    <span className="text-xs font-bold uppercase text-slate-500">Active Products</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">8</p>
                <p className="text-xs text-slate-400 font-medium mt-1">Across 4 categories</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-lg"><Briefcase size={20} /></div>
                    <span className="text-xs font-bold uppercase text-slate-500">Loan Exposure</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">$450,000</p>
                <p className="text-xs text-emerald-500 font-medium mt-1">Good Standing</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg"><CreditCard size={20} /></div>
                    <span className="text-xs font-bold uppercase text-slate-500">Active Cards</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">12</p>
                <p className="text-xs text-slate-400 font-medium mt-1">5 Virtual, 7 Physical</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-lg"><Percent size={20} /></div>
                    <span className="text-xs font-bold uppercase text-slate-500">Current Tariff</span>
                </div>
                <p className="text-lg font-bold text-slate-900 dark:text-white truncate">Business Pro</p>
                <button className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline mt-1">Change Plan</button>
            </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4">Recommended for You</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-lg"><Package size={18} /></div>
                        <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">Equipment Leasing</h4>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Upgrade your machinery with flexible leasing terms tailored for manufacturing.</p>
                </div>
                <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 rounded-lg"><Package size={18} /></div>
                        <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">Overnight Deposits</h4>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Earn interest on idle cash balances with our automated overnight sweep.</p>
                </div>
            </div>
        </div>
    </div>
  );
};
