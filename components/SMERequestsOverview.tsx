
import React from 'react';
import { MessageSquare, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';

export const SMERequestsOverview: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 rounded-lg"><MessageSquare size={20} /></div>
                    <span className="text-xs font-bold uppercase text-slate-500">Total Active</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">24</p>
                <p className="text-xs text-slate-400 font-medium mt-1">Across all categories</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-lg"><AlertCircle size={20} /></div>
                    <span className="text-xs font-bold uppercase text-slate-500">Urgent</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">3</p>
                <p className="text-xs text-red-500 font-medium mt-1">Requires immediate action</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-lg"><Clock size={20} /></div>
                    <span className="text-xs font-bold uppercase text-slate-500">Pending Approval</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">8</p>
                <p className="text-xs text-amber-500 font-medium mt-1">Avg wait: 2 days</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-lg"><CheckCircle2 size={20} /></div>
                    <span className="text-xs font-bold uppercase text-slate-500">Resolved (Month)</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">156</p>
                <p className="text-xs text-emerald-500 font-medium mt-1">98% SLA met</p>
            </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
             <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6">Recent Requests</h3>
             <div className="space-y-4">
                 {[1,2,3].map(i => (
                     <div key={i} className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                         <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 font-bold">
                                 #{1000+i}
                             </div>
                             <div>
                                 <p className="font-bold text-sm text-slate-900 dark:text-white">Tariff Change Request</p>
                                 <p className="text-xs text-slate-500">TechNova Solutions • 2 hours ago</p>
                             </div>
                         </div>
                         <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-xs font-bold">In Progress</span>
                     </div>
                 ))}
             </div>
        </div>
    </div>
  );
};
