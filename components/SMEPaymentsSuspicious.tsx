
import React, { useState } from 'react';
import { Search, AlertTriangle, Check, XCircle, CheckCircle2, ShieldAlert, ArrowRight } from 'lucide-react';

interface SuspiciousTx {
  id: string;
  amount: string;
  beneficiary: string;
  date: string;
  reason: string;
  riskScore: number;
  status: 'Pending' | 'Verified' | 'Blocked' | 'Escalated';
}

interface CompanyData {
  id: string;
  name: string;
  transactions: SuspiciousTx[];
}

export const SMEPaymentsSuspicious: React.FC = () => {
  // Mock Data
  const companiesList: CompanyData[] = [
      {
          id: '1',
          name: 'TechNova Solutions Ltd.',
          transactions: [
              { id: 'TX-9921', amount: '$45,000.00', beneficiary: 'Shell Co. (Cayman)', date: 'Oct 24, 2024', reason: 'High-risk jurisdiction & round amount', riskScore: 88, status: 'Pending' },
              { id: 'TX-8822', amount: '$12,400.00', beneficiary: 'Unknown Vendor', date: 'Oct 23, 2024', reason: 'Velocity limit exceeded', riskScore: 65, status: 'Verified' }
          ]
      },
      {
          id: '2',
          name: 'GreenLeaf Logistics',
          transactions: [
              { id: 'TX-7711', amount: '$2,500.00', beneficiary: 'Fast Cash Svcs', date: 'Oct 22, 2024', reason: 'Pattern mismatch', riskScore: 72, status: 'Pending' }
          ]
      },
      {
          id: '3',
          name: 'Quantum Dynamics',
          transactions: []
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

  const handleAction = (txId: string, action: 'Verified' | 'Blocked' | 'Escalated') => {
      const updatedTx = selectedCompany.transactions.map(tx => 
          tx.id === txId ? { ...tx, status: action } : tx
      );
      setSelectedCompany({ ...selectedCompany, transactions: updatedTx });
  };

  const getStatusColor = (status: string) => {
      switch(status) {
          case 'Verified': return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800';
          case 'Blocked': return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800';
          case 'Escalated': return 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800';
          default: return 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300';
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
                    placeholder="Search company for manual verification..."
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
                <ShieldAlert size={20} className="text-red-500" /> Manual Suspicious Verification: {selectedCompany.name}
            </h3>
            
            {selectedCompany.transactions.length > 0 ? (
                <div className="space-y-4">
                     {selectedCompany.transactions.map((tx) => (
                         <div key={tx.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                             <div className="flex justify-between items-start mb-3">
                                 <div>
                                     <div className="flex items-center gap-2 mb-1">
                                         <span className="text-xs font-mono text-slate-400">{tx.id}</span>
                                         <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                                             tx.riskScore > 80 ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                                         }`}>
                                             Risk Score: {tx.riskScore}
                                         </span>
                                     </div>
                                     <p className="font-bold text-sm text-slate-900 dark:text-white">
                                         {tx.amount} <span className="text-slate-400 font-normal">to</span> {tx.beneficiary}
                                     </p>
                                 </div>
                                 <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${getStatusColor(tx.status)}`}>
                                     {tx.status}
                                 </span>
                             </div>
                             
                             <div className="flex items-start gap-2 bg-red-50 dark:bg-red-900/10 p-3 rounded-lg border border-red-100 dark:border-red-900/30 mb-4">
                                 <AlertTriangle size={16} className="text-red-500 mt-0.5 shrink-0" />
                                 <div>
                                     <p className="text-xs font-bold text-red-700 dark:text-red-400">Flagged Reason:</p>
                                     <p className="text-xs text-red-600 dark:text-red-300">{tx.reason}</p>
                                 </div>
                             </div>

                             {tx.status === 'Pending' && (
                                 <div className="flex gap-2 justify-end pt-2 border-t border-slate-100 dark:border-slate-700">
                                     <button 
                                        onClick={() => handleAction(tx.id, 'Verified')}
                                        className="flex items-center gap-1 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-emerald-600 dark:text-emerald-400 rounded-lg text-xs font-bold hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
                                     >
                                         <CheckCircle2 size={14} /> Verify & Clear
                                     </button>
                                     <button 
                                        onClick={() => handleAction(tx.id, 'Escalated')}
                                        className="flex items-center gap-1 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-amber-600 dark:text-amber-400 rounded-lg text-xs font-bold hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors"
                                     >
                                         <ArrowRight size={14} /> Escalate
                                     </button>
                                     <button 
                                        onClick={() => handleAction(tx.id, 'Blocked')}
                                        className="flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-bold hover:bg-red-700 transition-colors"
                                     >
                                         <XCircle size={14} /> Block
                                     </button>
                                 </div>
                             )}
                         </div>
                     ))}
                </div>
            ) : (
                <div className="text-center py-12 text-slate-400 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-xl">
                    <ShieldAlert size={32} className="mx-auto mb-2 opacity-50 text-emerald-500" />
                    <p>No suspicious transactions pending manual review.</p>
                </div>
            )}
        </div>
    </div>
  );
};
