
import React from 'react';
import { StickyNote, Plus } from 'lucide-react';

export const SMERequestsNotes: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm animate-in fade-in slide-in-from-bottom-2">
        <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <StickyNote size={20} className="text-yellow-500" /> Comments & Internal Notes
            </h3>
            <button className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700">
                <Plus size={14} /> Add Note
            </button>
        </div>
        
        <div className="space-y-4">
             <div className="p-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-100 dark:border-yellow-900/30 rounded-xl">
                 <p className="text-sm text-slate-800 dark:text-slate-200 mb-2">"Client requested express processing for international payments. Approved by Manager on Oct 20."</p>
                 <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                     <span>Added by Alex J.</span>
                     <span>Oct 20, 2024</span>
                 </div>
             </div>
        </div>
    </div>
  );
};
