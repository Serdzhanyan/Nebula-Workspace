
import React from 'react';
import { AlertTriangle, MessageCircle } from 'lucide-react';

export const SMERequestsComplaints: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm animate-in fade-in slide-in-from-bottom-2">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <AlertTriangle size={20} className="text-red-500" /> Complaints
        </h3>
        
        <div className="space-y-4">
             <div className="p-4 border border-red-100 dark:border-red-900/30 bg-red-50/50 dark:bg-red-900/10 rounded-xl">
                 <div className="flex gap-3">
                     <MessageCircle size={20} className="text-red-500 mt-1" />
                     <div>
                         <h4 className="font-bold text-slate-900 dark:text-white text-sm">Service Interruption</h4>
                         <p className="text-xs text-slate-500 mt-1">GreenLeaf Logistics reported downtime on payment gateway.</p>
                     </div>
                 </div>
                 <div className="mt-3 pl-8 flex gap-2">
                     <button className="text-xs font-bold text-red-600 hover:underline">View Details</button>
                     <button className="text-xs font-bold text-slate-500 hover:underline">Assign to Tech</button>
                 </div>
             </div>
        </div>
    </div>
  );
};
