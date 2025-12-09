
import React from 'react';
import { CreditCard, MoreHorizontal, Plus } from 'lucide-react';

export const SMECashAccounts: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
        <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Active Accounts</h3>
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors">
                <Plus size={16} /> Open New Account
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-lg relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10"><CreditCard size={100} /></div>
                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Business Checking</p>
                            <p className="text-lg font-bold">**** 4291</p>
                        </div>
                        <span className="bg-emerald-500 text-white px-2 py-0.5 rounded text-[10px] font-bold">Active</span>
                    </div>
                    <div>
                        <p className="text-3xl font-bold mb-1">$1,240,500.00</p>
                        <p className="text-xs text-slate-400">Available Balance</p>
                    </div>
                </div>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative group">
                 <div className="flex justify-between items-start mb-6">
                    <div>
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Operational Savings</p>
                        <p className="text-lg font-bold text-slate-900 dark:text-white">**** 8821</p>
                    </div>
                    <button className="text-slate-400 hover:text-indigo-600"><MoreHorizontal size={18} /></button>
                </div>
                <div>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white mb-1">$450,000.00</p>
                    <p className="text-xs text-slate-500">Available Balance</p>
                </div>
            </div>
        </div>
    </div>
  );
};
