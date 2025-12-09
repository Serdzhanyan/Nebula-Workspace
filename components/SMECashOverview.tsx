
import React from 'react';
import { Wallet, TrendingUp, ArrowUpRight, ArrowDownLeft, CreditCard } from 'lucide-react';

export const SMECashOverview: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 rounded-lg"><Wallet size={20} /></div>
                    <span className="text-xs font-bold uppercase text-slate-500">Total Liquidity</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">$2,450,000</p>
                <p className="text-xs text-emerald-500 font-medium mt-1 flex items-center gap-1"><ArrowUpRight size={12}/> +8.5% this month</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-lg"><ArrowDownLeft size={20} /></div>
                    <span className="text-xs font-bold uppercase text-slate-500">Incoming (Pending)</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">$125,000</p>
                <p className="text-xs text-slate-400 font-medium mt-1">12 transactions processing</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg"><CreditCard size={20} /></div>
                    <span className="text-xs font-bold uppercase text-slate-500">Active Accounts</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">14</p>
                <p className="text-xs text-slate-400 font-medium mt-1">Across 3 currencies</p>
            </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4">Cash Flow Overview</h3>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-900/50 text-slate-400">
                <TrendingUp size={32} className="mb-2 opacity-50" />
                <span className="text-sm font-medium">Chart visualization would go here</span>
            </div>
        </div>
    </div>
  );
};
