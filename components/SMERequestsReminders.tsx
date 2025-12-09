
import React from 'react';
import { Bell, Calendar } from 'lucide-react';

export const SMERequestsReminders: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm animate-in fade-in slide-in-from-bottom-2">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <Bell size={20} className="text-amber-500" /> Data Update Reminders
        </h3>
        
        <div className="space-y-4">
             <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl flex gap-4 items-center">
                 <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500">
                     <Calendar size={20} />
                 </div>
                 <div>
                     <h4 className="font-bold text-sm text-slate-900 dark:text-white">Annual KYC Review</h4>
                     <p className="text-xs text-slate-500">GreenLeaf Logistics due in 30 days</p>
                 </div>
                 <button className="ml-auto px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700">
                     Send Reminder
                 </button>
             </div>
        </div>
    </div>
  );
};
