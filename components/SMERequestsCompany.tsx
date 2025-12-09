
import React from 'react';
import { Building2, ArrowRight } from 'lucide-react';

export const SMERequestsCompany: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm animate-in fade-in slide-in-from-bottom-2">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <Building2 size={20} className="text-blue-500" /> Company Requests
        </h3>
        
        <div className="space-y-4">
            <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl">
                <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">Update Legal Address</h4>
                    <span className="text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-0.5 rounded">New</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500 mt-2 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg">
                    <span>Current: 123 Old St.</span>
                    <ArrowRight size={14} />
                    <span className="font-bold text-slate-900 dark:text-white">New: 456 Innovation Dr.</span>
                </div>
                <div className="flex gap-2 mt-4">
                    <button className="px-4 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700">Process</button>
                    <button className="px-4 py-1.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800">Request Docs</button>
                </div>
            </div>
        </div>
    </div>
  );
};
