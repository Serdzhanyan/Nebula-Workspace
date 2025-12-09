
import React from 'react';
import { Mail, Paperclip } from 'lucide-react';

export const SMERequestsCorrespondence: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm animate-in fade-in slide-in-from-bottom-2">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <Mail size={20} className="text-indigo-500" /> Client Correspondence
        </h3>
        
        <div className="space-y-4">
             <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl">
                 <div className="flex gap-4">
                     <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 font-bold">
                         SJ
                     </div>
                     <div className="flex-1">
                         <div className="flex justify-between items-center mb-1">
                             <h4 className="font-bold text-sm text-slate-900 dark:text-white">Sarah Jenkins</h4>
                             <span className="text-xs text-slate-400">Today, 10:30 AM</span>
                         </div>
                         <p className="text-sm text-slate-600 dark:text-slate-300">Re: Question about international transfer limits</p>
                         <p className="text-xs text-slate-500 mt-2 line-clamp-2">Hi Team, we are planning a large equipment purchase from Germany next month. Could you clarify the daily limit for SWIFT transfers?</p>
                         <div className="mt-3 flex gap-2">
                             <button className="text-xs font-bold text-indigo-600 hover:underline">Reply</button>
                             <button className="text-xs font-bold text-slate-500 hover:underline">Forward</button>
                         </div>
                     </div>
                 </div>
             </div>
        </div>
    </div>
  );
};
