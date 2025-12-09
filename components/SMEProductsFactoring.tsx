
import React from 'react';
import { ArrowUpRight, FileText } from 'lucide-react';

export const SMEProductsFactoring: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm animate-in fade-in slide-in-from-bottom-2">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <ArrowUpRight size={20} className="text-indigo-500" /> Factoring
        </h3>
        
        <div className="p-12 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-900/50">
            <FileText size={48} className="mx-auto text-slate-300 mb-4" />
            <h4 className="font-bold text-slate-900 dark:text-white mb-1">Turn Invoices into Cash</h4>
            <p className="text-sm text-slate-500 mb-6 max-w-md mx-auto">Get up to 90% of your invoice value immediately. Improve your cash flow today.</p>
            <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700">Submit Invoice</button>
        </div>
    </div>
  );
};
