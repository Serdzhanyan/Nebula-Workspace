
import React, { useState } from 'react';
import { DollarSign, Clock, Plus, Search, Check, Calculator, FileText, PieChart } from 'lucide-react';

interface Loan {
  id: string;
  type: string;
  amount: string;
  remaining: string;
  rate: string;
  term: string;
  startDate: string;
  nextPayment: string;
  status: 'Active' | 'Pending' | 'Paid Off' | 'Defaulted';
  progress: number;
}

interface CompanyData {
  id: string;
  name: string;
  loans: Loan[];
}

export const SMEProductsLoans: React.FC = () => {
  // Mock Data
  const companiesList: CompanyData[] = [
      {
          id: '1',
          name: 'TechNova Solutions Ltd.',
          loans: [
              { id: 'LN-2023-882', type: 'Working Capital Loan', amount: '$250,000', remaining: '$125,400', rate: '5.5%', term: '36 Months', startDate: 'Jan 15, 2023', nextPayment: 'Nov 01, 2024', status: 'Active', progress: 50 },
              { id: 'LN-2022-101', type: 'Equipment Financing', amount: '$50,000', remaining: '$0', rate: '4.2%', term: '24 Months', startDate: 'Mar 10, 2022', nextPayment: '-', status: 'Paid Off', progress: 100 }
          ]
      },
      {
          id: '2',
          name: 'GreenLeaf Logistics',
          loans: [
              { id: 'LN-2024-555', type: 'Line of Credit', amount: '$100,000', remaining: '$45,000', rate: '6.0%', term: 'Revolving', startDate: 'Jun 20, 2024', nextPayment: 'Nov 15, 2024', status: 'Active', progress: 55 }
          ]
      },
      {
          id: '3',
          name: 'Quantum Dynamics',
          loans: []
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

  const getStatusColor = (status: string) => {
      switch(status) {
          case 'Active': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
          case 'Paid Off': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
          case 'Pending': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800';
          default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
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
                    placeholder="Search company for loan portfolio..."
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
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                    <DollarSign size={20} className="text-emerald-500" /> Active Loans: {selectedCompany.name}
                </h3>
                <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200/50 dark:shadow-none">
                    <Plus size={16} /> New Application
                </button>
            </div>
            
            {selectedCompany.loans.length > 0 ? (
                <div className="space-y-6">
                     {selectedCompany.loans.map((loan) => (
                         <div key={loan.id} className="p-5 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors shadow-sm">
                             <div className="flex justify-between items-start mb-4">
                                 <div>
                                     <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-1">{loan.type}</h4>
                                     <p className="text-xs text-slate-500 font-mono">Ref: #{loan.id}</p>
                                 </div>
                                 <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase border ${getStatusColor(loan.status)}`}>
                                     {loan.status}
                                 </span>
                             </div>
                             
                             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                 <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-800">
                                     <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wide mb-1">Principal</p>
                                     <p className="font-bold text-slate-900 dark:text-white text-lg">{loan.amount}</p>
                                 </div>
                                 <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-800">
                                     <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wide mb-1">Remaining</p>
                                     <p className="font-bold text-indigo-600 dark:text-indigo-400 text-lg">{loan.remaining}</p>
                                 </div>
                                 <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-800">
                                     <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wide mb-1">Rate / Term</p>
                                     <p className="font-medium text-slate-800 dark:text-slate-200">{loan.rate} • {loan.term}</p>
                                 </div>
                                 <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-800">
                                     <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wide mb-1">Next Payment</p>
                                     <p className="font-medium text-slate-800 dark:text-slate-200">{loan.nextPayment}</p>
                                 </div>
                             </div>
                             
                             <div className="mb-4">
                                 <div className="flex justify-between items-center mb-1 text-xs">
                                     <span className="text-slate-500 font-medium">Repayment Progress</span>
                                     <span className="font-bold text-slate-700 dark:text-slate-300">{loan.progress}%</span>
                                 </div>
                                 <div className="w-full bg-slate-100 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                                     <div 
                                         className={`h-full transition-all duration-1000 ${loan.progress === 100 ? 'bg-emerald-500' : 'bg-indigo-600'}`} 
                                         style={{ width: `${loan.progress}%` }}
                                     ></div>
                                 </div>
                             </div>
                             
                             {loan.status === 'Active' && (
                                 <div className="flex gap-3 justify-end pt-4 border-t border-slate-100 dark:border-slate-700">
                                     <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                                         <Clock size={16} /> View Schedule
                                     </button>
                                     <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-700 transition-colors shadow-sm">
                                         <DollarSign size={16} /> Make Payment
                                     </button>
                                 </div>
                             )}
                         </div>
                     ))}
                </div>
            ) : (
                <div className="text-center py-12 text-slate-400 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-xl">
                    <PieChart size={32} className="mx-auto mb-2 opacity-50" />
                    <p>No active loans found for this company.</p>
                </div>
            )}
        </div>
    </div>
  );
};
