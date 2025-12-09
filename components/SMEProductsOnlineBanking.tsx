
import React from 'react';
import { Globe, UserPlus, Lock } from 'lucide-react';

export const SMEProductsOnlineBanking: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm animate-in fade-in slide-in-from-bottom-2">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <Globe size={20} className="text-cyan-500" /> Online Banking Users
        </h3>
        
        <div className="space-y-3">
             <div className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-xl">
                 <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-500">
                         SJ
                     </div>
                     <div>
                         <p className="font-bold text-sm text-slate-900 dark:text-white">Sarah Jenkins</p>
                         <p className="text-xs text-slate-500">Admin Access • Last login: 2 mins ago</p>
                     </div>
                 </div>
                 <button className="text-slate-400 hover:text-indigo-600"><Lock size={16} /></button>
             </div>
             
             <button className="w-full py-3 border border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-slate-500 hover:text-indigo-600 hover:border-indigo-300 transition-colors flex items-center justify-center gap-2">
                 <UserPlus size={16} /> Add User Access
             </button>
        </div>
    </div>
  );
};
