
import React from 'react';
import { FileText, Download } from 'lucide-react';

export const SMEPaymentsDocs: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm animate-in fade-in slide-in-from-bottom-2">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <FileText size={20} className="text-blue-500" /> Transaction Documentation
        </h3>
        
        <div className="space-y-2">
            {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                        <FileText size={18} className="text-slate-400" />
                        <div>
                            <p className="text-sm font-bold text-slate-900 dark:text-white">Wire_Confirmation_#8821{i}.pdf</p>
                            <p className="text-xs text-slate-500">Generated Oct 24, 2024</p>
                        </div>
                    </div>
                    <button className="p-2 text-slate-400 hover:text-indigo-600"><Download size={16} /></button>
                </div>
            ))}
        </div>
    </div>
  );
};
