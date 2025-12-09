
import React from 'react';
import { CreditCard, Lock, Eye } from 'lucide-react';

export const SMEProductsCards: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm animate-in fade-in slide-in-from-bottom-2">
        <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <CreditCard size={20} className="text-purple-500" /> Corporate Cards
            </h3>
            <button className="text-xs text-indigo-600 font-bold hover:underline">Manage Limits</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-lg relative overflow-hidden group">
                <div className="flex justify-between items-start mb-8">
                    <p className="font-medium text-sm opacity-80">Business Platinum</p>
                    <img src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png" className="h-8 opacity-80" alt="chip" />
                </div>
                <p className="font-mono text-xl tracking-widest mb-4">**** **** **** 4291</p>
                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-[10px] uppercase opacity-60">Card Holder</p>
                        <p className="font-medium">Sarah Jenkins</p>
                    </div>
                    <p className="font-medium">12/25</p>
                </div>
            </div>
            
            <div className="flex flex-col justify-center space-y-3">
                 <div className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-700 rounded-xl">
                     <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Show PIN</span>
                     <button className="text-slate-400 hover:text-indigo-600"><Eye size={18}/></button>
                 </div>
                 <div className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-700 rounded-xl">
                     <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Freeze Card</span>
                     <button className="text-slate-400 hover:text-red-500"><Lock size={18}/></button>
                 </div>
            </div>
        </div>
    </div>
  );
};
