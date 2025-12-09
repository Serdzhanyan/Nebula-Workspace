
import React from 'react';
import { Eye, Activity } from 'lucide-react';

export const SMEPaymentsMonitoring: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm animate-in fade-in slide-in-from-bottom-2">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <Eye size={20} className="text-amber-500" /> Suspicious Activity Monitoring
        </h3>
        
        <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-900/50">
            <Activity size={32} className="text-slate-400 mb-2 animate-pulse" />
            <p className="text-sm font-medium text-slate-500">Live Monitoring Active</p>
            <p className="text-xs text-slate-400">Scanning real-time transactions...</p>
        </div>
        
        <div className="mt-6">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Recent Flags</h4>
            <div className="space-y-2 text-sm">
                <div className="flex justify-between p-2 border-b border-slate-100 dark:border-slate-800">
                    <span>Structuring Detection</span>
                    <span className="text-slate-500">2 mins ago</span>
                </div>
                 <div className="flex justify-between p-2 border-b border-slate-100 dark:border-slate-800">
                    <span>Velocity Limit Exceeded</span>
                    <span className="text-slate-500">15 mins ago</span>
                </div>
            </div>
        </div>
    </div>
  );
};
