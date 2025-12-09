
import React from 'react';
import { AlertOctagon, Activity } from 'lucide-react';
import { SMECompany } from '../types';

interface Props {
  company: SMECompany;
}

export const SMEClientRisks: React.FC<Props> = ({ company }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-2">
         <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
             <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                 <AlertOctagon size={20} className="text-red-500" /> Risk Assessment
             </h3>
             <div className="flex items-center justify-between mb-6">
                 <div>
                     <p className="text-sm text-slate-500 dark:text-slate-400">Overall Risk Level</p>
                     <p className={`text-2xl font-bold ${company.risk === 'Low' ? 'text-emerald-500' : company.risk === 'Medium' ? 'text-amber-500' : 'text-red-500'}`}>{company.risk}</p>
                 </div>
                 <div className="w-16 h-16 rounded-full border-4 border-slate-100 dark:border-slate-800 flex items-center justify-center text-xs font-bold text-slate-400">
                     {company.kyc?.riskScore}/100
                 </div>
             </div>
             <div className="space-y-3">
                 <div className="text-sm flex justify-between">
                     <span className="text-slate-600 dark:text-slate-300">Geo Risk</span>
                     <span className="font-bold text-emerald-500">Low</span>
                 </div>
                 <div className="text-sm flex justify-between">
                     <span className="text-slate-600 dark:text-slate-300">Industry Risk</span>
                     <span className="font-bold text-amber-500">Medium</span>
                 </div>
                 <div className="text-sm flex justify-between">
                     <span className="text-slate-600 dark:text-slate-300">Transaction Volume</span>
                     <span className="font-bold text-emerald-500">Low</span>
                 </div>
             </div>
         </div>
         <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
             <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                 <Activity size={20} className="text-indigo-500" /> Automated Scoring
             </h3>
             <p className="text-sm text-slate-500 mb-4">AI-driven analysis based on recent activity.</p>
             <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 text-center">
                 <p className="text-sm font-medium text-slate-900 dark:text-white">Pattern Recognition</p>
                 <p className="text-xs text-slate-500 mt-1">No anomalies detected in the last 90 days.</p>
             </div>
         </div>
    </div>
  );
};
