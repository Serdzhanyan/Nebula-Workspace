
import React, { useState } from 'react';
import { DollarSign, Check, Search, X, ShieldCheck, AlertCircle, CheckCircle2, XCircle, Clock } from 'lucide-react';

interface LargePayment {
  id: string;
  amount: string;
  beneficiary: string;
  description: string;
  date: string;
  status: 'Pending' | 'Confirmed' | 'Rejected' | 'On Hold';
  riskCheck: 'Passed' | 'Flagged';
  twoFactor: 'Verified' | 'Pending';
}

interface CompanyData {
  id: string;
  name: string;
  payments: LargePayment[];
}

export const SMEPaymentsLarge: React.FC = () => {
  // Mock Data
  const companiesList: CompanyData[] = [
      {
          id: '1',
          name: 'TechNova Solutions Ltd.',
          payments: [
              { id: 'LP-001', amount: '$250,000.00', beneficiary: 'Heavy Machinery Inc.', description: 'Capital Equipment Purchase', date: 'Oct 24, 2024', status: 'Pending', riskCheck: 'Passed', twoFactor: 'Pending' },
              { id: 'LP-002', amount: '$120,000.00', beneficiary: 'Cloud Host Provider', description: 'Annual Infrastructure prepayment', date: 'Oct 22, 2024', status: 'Confirmed', riskCheck: 'Passed', twoFactor: 'Verified' }
          ]
      },
      {
          id: '2',
          name: 'GreenLeaf Logistics',
          payments: [
              { id: 'LP-003', amount: '$500,000.00', beneficiary: 'Global Shipping Partners', description: 'Fleet Expansion Deposit', date: 'Oct 23, 2024', status: 'Pending', riskCheck: 'Flagged', twoFactor: 'Verified' }
          ]
      },
      {
          id: '3',
          name: 'Quantum Dynamics',
          payments: []
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

  const handleAction = (id: string, action: 'Confirmed' | 'Rejected' | 'On Hold') => {
      const updatedPayments = selectedCompany.payments.map(p => 
          p.id === id ? { ...p, status: action } : p
      );
      setSelectedCompany({ ...selectedCompany, payments: updatedPayments });
  };

  const getStatusColor = (status: string) => {
      switch(status) {
          case 'Confirmed': return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800';
          case 'Rejected': return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800';
          case 'On Hold': return 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800';
          default: return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800';
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
                    placeholder="Search company for large payments..."
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
                <DollarSign size={20} className="text-emerald-500" /> Large Payment Confirmation: {selectedCompany.name}
            </h3>
            
            {selectedCompany.payments.length > 0 ? (
                <div className="space-y-4">
                     {selectedCompany.payments.map((payment) => (
                         <div key={payment.id} className="p-5 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors shadow-sm">
                             <div className="flex justify-between items-start mb-4">
                                 <div>
                                     <p className="text-xs text-slate-500 uppercase font-bold tracking-wide mb-1">Amount</p>
                                     <p className="text-3xl font-bold text-slate-900 dark:text-white">{payment.amount}</p>
                                 </div>
                                 <div className="flex flex-col items-end gap-2">
                                     <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${getStatusColor(payment.status)}`}>
                                         {payment.status}
                                     </span>
                                     <div className="flex gap-2">
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border flex items-center gap-1 ${payment.riskCheck === 'Passed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-900/30' : 'bg-red-50 text-red-700 border-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/30'}`}>
                                            <ShieldCheck size={10} /> Risk: {payment.riskCheck}
                                        </span>
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border flex items-center gap-1 ${payment.twoFactor === 'Verified' ? 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900/30' : 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-900/30'}`}>
                                            <ShieldCheck size={10} /> 2FA: {payment.twoFactor}
                                        </span>
                                     </div>
                                 </div>
                             </div>
                             
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm">
                                 <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-800">
                                     <p className="text-slate-500 text-xs mb-1">Beneficiary</p>
                                     <p className="font-bold text-slate-800 dark:text-white">{payment.beneficiary}</p>
                                 </div>
                                 <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-800">
                                     <p className="text-slate-500 text-xs mb-1">Description / Reference</p>
                                     <p className="font-medium text-slate-800 dark:text-white">{payment.description}</p>
                                 </div>
                             </div>

                             {payment.status === 'Pending' && (
                                 <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
                                     <button 
                                        onClick={() => handleAction(payment.id, 'On Hold')}
                                        className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                                     >
                                         <Clock size={16} /> Hold
                                     </button>
                                     <button 
                                        onClick={() => handleAction(payment.id, 'Rejected')}
                                        className="flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm font-bold hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                                     >
                                         <XCircle size={16} /> Reject
                                     </button>
                                     <button 
                                        onClick={() => handleAction(payment.id, 'Confirmed')}
                                        className="flex items-center gap-2 px-6 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-700 transition-colors shadow-sm"
                                     >
                                         <CheckCircle2 size={16} /> Confirm Payment
                                     </button>
                                 </div>
                             )}
                         </div>
                     ))}
                </div>
            ) : (
                <div className="text-center py-12 text-slate-400 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-xl">
                    <DollarSign size={32} className="mx-auto mb-2 opacity-50 text-emerald-500" />
                    <p>No large payments requiring confirmation.</p>
                </div>
            )}
        </div>
    </div>
  );
};
