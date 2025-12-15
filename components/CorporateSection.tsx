
import React from 'react';
import { FileText, Download, Filter, Search, MoreHorizontal, Plus } from 'lucide-react';

interface CorporateSectionProps {
  title: string;
  id: string;
}

export const CorporateSection: React.FC<CorporateSectionProps> = ({ title, id }) => {
  return (
    <div className="flex-1 h-full flex flex-col overflow-hidden bg-slate-50 dark:bg-slate-950 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Header */}
      <div className="px-8 py-6 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center bg-white dark:bg-slate-900 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{title}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage settings, configurations, and records for {title}.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-200">
            <Download size={16} /> Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm">
            <Plus size={16} /> Add Record
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col h-full min-h-[500px]">
            {/* Toolbar */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex gap-4">
                 <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                        type="text" 
                        placeholder={`Search ${title}...`}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white transition-all"
                    />
                </div>
                <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <Filter size={16} /> Filter
                </button>
            </div>

            {/* Empty State / Placeholder */}
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-slate-50/30 dark:bg-slate-900/30">
                <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 shadow-sm border border-slate-200 dark:border-slate-700">
                    <FileText size={32} className="text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Section Under Development</h3>
                <p className="text-slate-500 dark:text-slate-400 max-w-md mb-8 leading-relaxed">
                    The <strong>{title}</strong> interface is currently being built. Future updates will include full data tables, interactive charts, and management tools.
                </p>
                
                {/* Mock List to look populated */}
                <div className="w-full max-w-2xl space-y-3 opacity-60 pointer-events-none">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-16 w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center px-4 gap-4">
                            <div className="w-8 h-8 rounded bg-slate-200 dark:bg-slate-700"></div>
                            <div className="flex-1 h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/3"></div>
                            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/6"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
