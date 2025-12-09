
import React from 'react';
import { CheckSquare, UserCheck } from 'lucide-react';

export const SMERequestsApprovals: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm animate-in fade-in slide-in-from-bottom-2">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <CheckSquare size={20} className="text-emerald-500" /> Change Approvals
        </h3>
        
        <div className="space-y-4">
             <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl flex items-start gap-4">
                 <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 rounded-lg">
                     <UserCheck size={20} />
                 </div>
                 <div className="flex-1">
                     <div className="flex justify-between items-start">
                         <h4 className="font-bold text-slate-900 dark:text-white text-sm">Director Appointment</h4>
                         <span className="text-xs text-slate-400">Oct 24, 2024</span>
                     </div>
                     <p className="text-xs text-slate-500 mt-1">Appoint Marcus Thorne as CTO. Board resolution attached.</p>
                     <div className="flex gap-2 mt-3">
                        <button className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded hover:bg-emerald-700">Approve</button>
                        <button className="px-3 py-1.5 bg-red-600 text-white text-xs font-bold rounded hover:bg-red-700">Reject</button>
                     </div>
                 </div>
             </div>
        </div>
    </div>
  );
};
