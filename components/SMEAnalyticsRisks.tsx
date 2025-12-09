
import React from 'react';
import { AlertOctagon, ShieldAlert, Globe } from 'lucide-react';

export const SMEAnalyticsRisks: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-2xl border border-red-100 dark:border-red-900/30">
                 <div className="flex items-center gap-2 mb-2 text-red-600 dark:text-red-400">
                     <AlertOctagon size={24} />
                     <h3 className="font-bold text-lg">High Risk Clients</h3>
                 </div>
                 <p className="text-3xl font-bold text-slate-900 dark:text-white">12</p>
                 <p className="text-xs text-red-500 mt-1">Requires immediate review</p>
             </div>
             <div className="bg-amber-50 dark:bg-amber-900/10 p-6 rounded-2xl border border-amber-100 dark:border-amber-900/30">
                 <div className="flex items-center gap-2 mb-2 text-amber-600 dark:text-amber-400">
                     <ShieldAlert size={24} />
                     <h3 className="font-bold text-lg">Compliance Flags</h3>
                 </div>
                 <p className="text-3xl font-bold text-slate-900 dark:text-white">45</p>
                 <p className="text-xs text-amber-500 mt-1">Pending KYC updates</p>
             </div>
             <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                 <div className="flex items-center gap-2 mb-2 text-slate-600 dark:text-slate-400">
                     <Globe size={24} />
                     <h3 className="font-bold text-lg">Geo Exposure</h3>
                 </div>
                 <p className="text-3xl font-bold text-slate-900 dark:text-white">18%</p>
                 <p className="text-xs text-slate-500 mt-1">High-risk jurisdictions</p>
             </div>
         </div>

         <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
             <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4">Risk Distribution Map</h3>
             <div className="h-64 flex items-center justify-center bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 text-slate-400">
                 [Interactive Risk Heatmap Placeholder]
             </div>
         </div>
    </div>
  );
};
