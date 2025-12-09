
import React from 'react';
import { FileQuestion, Send } from 'lucide-react';

export const SMERequestsDocuments: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm animate-in fade-in slide-in-from-bottom-2">
        <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <FileQuestion size={20} className="text-blue-500" /> Document Requests
            </h3>
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors">
                <Send size={16} /> New Request
            </button>
        </div>
        
        <div className="space-y-4">
             <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl flex justify-between items-center">
                 <div>
                     <h4 className="font-bold text-sm text-slate-900 dark:text-white">Updated Business License</h4>
                     <p className="text-xs text-slate-500">Requested from TechNova Solutions Ltd.</p>
                 </div>
                 <span className="text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-2 py-1 rounded">Pending Client</span>
             </div>
        </div>
    </div>
  );
};
