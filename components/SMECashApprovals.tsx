
import React, { useState } from 'react';
import { Gavel, Search, Check, X, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';

interface ApprovalRequest {
  id: string;
  type: string;
  description: string;
  date: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  priority: 'High' | 'Medium' | 'Low';
}

interface CompanyData {
  id: string;
  name: string;
  approvals: ApprovalRequest[];
}

export const SMECashApprovals: React.FC = () => {
  // Mock Data
  const companiesList: CompanyData[] = [
      {
          id: '1',
          name: 'TechNova Solutions Ltd.',
          approvals: [
              { id: 'LEG-001', type: 'Account Opening', description: 'Legal review of corporate structure for new USD account.', date: 'Oct 24, 2024', status: 'Pending', priority: 'High' },
              { id: 'LEG-002', type: 'Signatory Addition', description: 'Review of board resolution adding John Smith as signatory.', date: 'Oct 20, 2024', status: 'Approved', priority: 'Medium' }
          ]
      },
      {
          id: '2',
          name: 'GreenLeaf Logistics',
          approvals: [
              { id: 'LEG-003', type: 'Credit Line Increase', description: 'Legal risk assessment for $500k credit facility extension.', date: 'Oct 22, 2024', status: 'Pending', priority: 'High' },
              { id: 'LEG-004', type: 'Cross-Border Trade', description: 'Compliance check for new trade route with Vietnam.', date: 'Oct 15, 2024', status: 'Rejected', priority: 'Low' }
          ]
      },
      {
          id: '3',
          name: 'Quantum Dynamics',
          approvals: []
      }
  ];

  const [selectedCompany, setSelectedCompany] = useState<CompanyData>(companiesList[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredCompanies = companiesList.filter(c =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCompany = (comp: CompanyData) => {
      setSelectedCompany(comp);
      setSearchTerm("");
      setShowDropdown(false);
  };

  const handleAction = (reqId: string, action: 'Approved' | 'Rejected') => {
      const updatedApprovals = selectedCompany.approvals.map(req => 
          req.id === reqId ? { ...req, status: action } : req
      );
      setSelectedCompany({ ...selectedCompany, approvals: updatedApprovals });
  };

  const getPriorityColor = (priority: string) => {
      switch(priority) {
          case 'High': return 'text-red-500 bg-red-50 dark:bg-red-900/20';
          case 'Medium': return 'text-amber-500 bg-amber-50 dark:bg-amber-900/20';
          case 'Low': return 'text-blue-500 bg-blue-50 dark:bg-blue-900/20';
          default: return 'text-slate-500 bg-slate-100 dark:bg-slate-800';
      }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
         {/* Search Bar */}
        <div className="relative z-20">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                    type="text"
                    placeholder="Search company for legal approvals..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowDropdown(true);
                    }}
                    onFocus={() => setShowDropdown(true)}
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-slate-900 dark:text-white"
                />
            </div>
            {showDropdown && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)}></div>
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden z-20">
                        {filteredCompanies.length > 0 ? (
                            filteredCompanies.map(comp => (
                                <button
                                    key={comp.id}
                                    onClick={() => handleSelectCompany(comp)}
                                    className="w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 border-b border-slate-100 dark:border-slate-800 last:border-0 flex justify-between items-center group transition-colors"
                                >
                                    <div>
                                        <p className="font-bold text-slate-900 dark:text-white text-sm">{comp.name}</p>
                                    </div>
                                    {selectedCompany.id === comp.id && <Check size={16} className="text-indigo-600 dark:text-indigo-400" />}
                                </button>
                            ))
                        ) : (
                            <div className="p-4 text-center text-slate-500 text-sm">No companies found</div>
                        )}
                    </div>
                </>
            )}
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Gavel size={20} className="text-slate-500" /> Legal Approvals: {selectedCompany.name}
            </h3>

            {selectedCompany.approvals.length > 0 ? (
                <div className="space-y-4">
                     {selectedCompany.approvals.map((req) => (
                         <div key={req.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                             <div className="flex justify-between items-start mb-3">
                                 <div>
                                     <div className="flex items-center gap-2 mb-1">
                                         <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${getPriorityColor(req.priority)}`}>
                                             {req.priority} Priority
                                         </span>
                                         <span className="text-xs text-slate-400 font-mono">{req.id}</span>
                                     </div>
                                     <p className="font-bold text-sm text-slate-900 dark:text-white">{req.type}</p>
                                 </div>
                                 <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                                     req.status === 'Approved' ? 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800' :
                                     req.status === 'Rejected' ? 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800' :
                                     'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800'
                                 }`}>
                                     {req.status}
                                 </span>
                             </div>
                             
                             <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800 mb-4">
                                 <p className="text-xs text-slate-600 dark:text-slate-300">{req.description}</p>
                                 <p className="text-[10px] text-slate-400 mt-2">Submitted: {req.date}</p>
                             </div>

                             {req.status === 'Pending' && (
                                 <div className="flex gap-2 justify-end">
                                     <button 
                                        onClick={() => handleAction(req.id, 'Approved')}
                                        className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition-colors"
                                     >
                                         <CheckCircle2 size={14} /> Approve
                                     </button>
                                     <button 
                                        onClick={() => handleAction(req.id, 'Rejected')}
                                        className="flex items-center gap-1 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                                     >
                                         <X size={14} /> Reject
                                     </button>
                                 </div>
                             )}
                         </div>
                     ))}
                </div>
            ) : (
                <div className="text-center py-12 text-slate-400 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-xl">
                    <Check size={32} className="mx-auto mb-2 opacity-50 text-emerald-500" />
                    <p>No pending legal approvals for this company.</p>
                </div>
            )}
        </div>
    </div>
  );
};
