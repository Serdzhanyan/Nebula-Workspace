
import React, { useState } from 'react';
import { ShieldAlert, Search, Check, AlertTriangle, Eye, X, CheckCircle2 } from 'lucide-react';

interface AMLCheck {
  id: string;
  transactionRef: string;
  amount: string;
  beneficiary: string;
  flagReason: string;
  riskLevel: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'Cleared' | 'Escalated';
  date: string;
}

interface CompanyData {
  id: string;
  name: string;
  amlChecks: AMLCheck[];
}

export const SMEPaymentsAML: React.FC = () => {
  // Mock Data
  const companiesList: CompanyData[] = [
      {
          id: '1',
          name: 'TechNova Solutions Ltd.',
          amlChecks: [
              { id: 'AML-001', transactionRef: 'TX-9921', amount: '$45,000.00', beneficiary: 'Global Mfg (Panama)', flagReason: 'High Risk Jurisdiction', riskLevel: 'High', status: 'Pending', date: 'Oct 24, 2024' },
              { id: 'AML-002', transactionRef: 'TX-8820', amount: '$12,000.00', beneficiary: 'Local Supplier', flagReason: 'Structuring Pattern', riskLevel: 'Medium', status: 'Cleared', date: 'Oct 20, 2024' }
          ]
      },
      {
          id: '2',
          name: 'GreenLeaf Logistics',
          amlChecks: [
              { id: 'AML-003', transactionRef: 'TX-7711', amount: '$5,500.00', beneficiary: 'Unknown Entity', flagReason: 'Rapid Velocity', riskLevel: 'Medium', status: 'Pending', date: 'Oct 23, 2024' }
          ]
      },
      {
          id: '3',
          name: 'Quantum Dynamics',
          amlChecks: []
      }
  ];

  const [selectedCompany, setSelectedCompany] = useState<CompanyData>(companiesList[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [investigatingId, setInvestigatingId] = useState<string | null>(null);

  const filteredCompanies = companiesList.filter(c =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCompany = (comp: CompanyData) => {
      setSelectedCompany(comp);
      setSearchTerm("");
      setShowDropdown(false);
      setInvestigatingId(null);
  };

  const handleAction = (checkId: string, action: 'Cleared' | 'Escalated') => {
      const updatedChecks = selectedCompany.amlChecks.map(check => 
          check.id === checkId ? { ...check, status: action } : check
      );
      setSelectedCompany({ ...selectedCompany, amlChecks: updatedChecks });
      if (investigatingId === checkId) setInvestigatingId(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
         {/* Search Bar */}
        <div className="relative z-20">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                    type="text"
                    placeholder="Search company for AML checks..."
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
                <ShieldAlert size={20} className="text-red-500" /> AML Monitoring: {selectedCompany.name}
            </h3>
            
            {selectedCompany.amlChecks.length > 0 ? (
                <div className="space-y-4">
                     {selectedCompany.amlChecks.map((check) => (
                         <div key={check.id} className={`p-4 border rounded-xl transition-colors ${investigatingId === check.id ? 'border-indigo-300 dark:border-indigo-700 bg-slate-50 dark:bg-slate-800/50' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900'}`}>
                             <div className="flex justify-between items-start mb-3">
                                 <div>
                                     <div className="flex items-center gap-2 mb-1">
                                         <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                                             check.riskLevel === 'High' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 
                                             'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                                         }`}>
                                             {check.riskLevel} Risk
                                         </span>
                                         <span className="text-xs text-slate-400 font-mono">{check.transactionRef}</span>
                                     </div>
                                     <p className="font-bold text-sm text-slate-900 dark:text-white">{check.amount} to {check.beneficiary}</p>
                                     <p className="text-xs text-red-500 mt-1 font-medium flex items-center gap-1">
                                         <AlertTriangle size={12} /> Flag: {check.flagReason}
                                     </p>
                                 </div>
                                 <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                                     check.status === 'Cleared' ? 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800' :
                                     check.status === 'Escalated' ? 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800' :
                                     'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800'
                                 }`}>
                                     {check.status}
                                 </span>
                             </div>

                             {check.status === 'Pending' && (
                                 <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-2">
                                     {investigatingId === check.id ? (
                                         <div className="flex gap-2 w-full animate-in fade-in slide-in-from-right-2">
                                             <button 
                                                onClick={() => handleAction(check.id, 'Escalated')}
                                                className="flex-1 py-2 bg-red-600 text-white rounded-lg text-xs font-bold hover:bg-red-700 transition-colors"
                                             >
                                                 Confirm Suspicion (Escalate)
                                             </button>
                                             <button 
                                                onClick={() => handleAction(check.id, 'Cleared')}
                                                className="flex-1 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition-colors"
                                             >
                                                 Clear Flag
                                             </button>
                                             <button 
                                                onClick={() => setInvestigatingId(null)}
                                                className="px-3 py-2 border border-slate-200 dark:border-slate-700 text-slate-500 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                                             >
                                                 Cancel
                                             </button>
                                         </div>
                                     ) : (
                                         <button 
                                            onClick={() => setInvestigatingId(check.id)}
                                            className="flex items-center gap-1 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-lg text-xs font-bold hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors"
                                         >
                                             <Eye size={14} /> Investigate
                                         </button>
                                     )}
                                 </div>
                             )}
                         </div>
                     ))}
                </div>
            ) : (
                <div className="text-center py-12 text-slate-400 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-xl">
                    <CheckCircle2 size={32} className="mx-auto mb-2 opacity-50 text-emerald-500" />
                    <p>No active AML flags for this company.</p>
                </div>
            )}
        </div>
    </div>
  );
};
