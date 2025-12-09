
import React from 'react';
import { AlertTriangle, CheckCircle2, Server } from 'lucide-react';

export const SMEAnalyticsIncidents: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <AlertTriangle size={20} className="text-amber-500" /> Incident Log
            </h3>
            
            <div className="space-y-4">
                <div className="p-4 border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/10 rounded-xl">
                    <div className="flex justify-between items-start">
                        <div>
                            <h4 className="font-bold text-red-700 dark:text-red-400 text-sm">Payment Gateway Latency</h4>
                            <p className="text-xs text-red-600 dark:text-red-300 mt-1">API response time > 5s detected in EU region.</p>
                        </div>
                        <span className="text-xs font-bold text-red-600 dark:text-red-400">10 mins ago</span>
                    </div>
                </div>
                
                <div className="p-4 border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50 dark:bg-emerald-900/10 rounded-xl">
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 size={18} className="text-emerald-500" />
                            <div>
                                <h4 className="font-bold text-emerald-700 dark:text-emerald-400 text-sm">Scheduled Maintenance Completed</h4>
                                <p className="text-xs text-emerald-600 dark:text-emerald-300 mt-1">Database migration successful.</p>
                            </div>
                        </div>
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">2 hours ago</span>
                    </div>
                </div>
            </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
             <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4">System Uptime</h3>
             <div className="flex items-center gap-4">
                 <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center gap-3 border border-slate-200 dark:border-slate-700 flex-1">
                     <Server size={24} className="text-indigo-500" />
                     <div>
                         <p className="text-xs text-slate-500 uppercase font-bold">Core Banking</p>
                         <p className="text-xl font-bold text-slate-900 dark:text-white">99.99%</p>
                     </div>
                 </div>
                 <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center gap-3 border border-slate-200 dark:border-slate-700 flex-1">
                     <Server size={24} className="text-blue-500" />
                     <div>
                         <p className="text-xs text-slate-500 uppercase font-bold">Payment API</p>
                         <p className="text-xl font-bold text-slate-900 dark:text-white">99.95%</p>
                     </div>
                 </div>
             </div>
        </div>
    </div>
  );
};
