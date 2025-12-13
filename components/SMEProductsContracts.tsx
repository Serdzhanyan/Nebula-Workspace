
import React, { useState } from 'react';
import { FileText, Download, Search, Check, Plus, Calendar, AlertCircle, Clock, ChevronRight, Eye, MoreHorizontal, FileSignature } from 'lucide-react';

interface Contract {
  id: string;
  name: string;
  type: string;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Expiring' | 'Expired' | 'Pending';
  value: string;
  signatories: string[];
}

interface CompanyData {
  id: string;
  name: string;
  contracts: Contract[];
}

export const SMEProductsContracts: React.FC = () => {
  // Mock Data
  const companiesList: CompanyData[] = [
      {
          id: '1',
          name: 'TechNova Solutions Ltd.',
          contracts: [
              { 
                  id: 'CTR-2021-001', 
                  name: 'Master Service Agreement', 
                  type: 'Service', 
                  startDate: 'Oct 12, 2021', 
                  endDate: 'Oct 12, 2025', 
                  status: 'Active', 
                  value: '$1,200,000',
                  signatories: ['Sarah Jenkins', 'John Doe']
              },
              { 
                  id: 'CTR-2023-LN1', 
                  name: 'Working Capital Loan Agreement', 
                  type: 'Financial', 
                  startDate: 'Jan 15, 2023', 
                  endDate: 'Jan 15, 2026', 
                  status: 'Active', 
                  value: '$250,000',
                  signatories: ['Sarah Jenkins', 'Bank Rep']
              },
              { 
                  id: 'CTR-2024-ND', 
                  name: 'Non-Disclosure Agreement', 
                  type: 'Legal', 
                  startDate: 'Jan 01, 2024', 
                  endDate: 'Indefinite', 
                  status: 'Active', 
                  value: 'N/A',
                  signatories: ['Sarah Jenkins']
              }
          ]
      },
      {
          id: '2',
          name: 'GreenLeaf Logistics',
          contracts: [
              { 
                  id: 'CTR-2022-LSE', 
                  name: 'Fleet Lease Agreement', 
                  type: 'Leasing', 
                  startDate: 'Mar 20, 2022', 
                  endDate: 'Mar 20, 2025', 
                  status: 'Expiring', 
                  value: '$45,000/yr',
                  signatories: ['Michael Chen']
              },
              { 
                  id: 'CTR-2024-SUP', 
                  name: 'Supplier Framework', 
                  type: 'Service', 
                  startDate: 'Jun 01, 2024', 
                  endDate: 'Jun 01, 2025', 
                  status: 'Pending', 
                  value: 'Variable',
                  signatories: ['Michael Chen', 'Vendor X']
              }
          ]
      },
      {
          id: '3',
          name: 'Quantum Dynamics',
          contracts: []
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
          case 'Active': return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800';
          case 'Expiring': return 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800';
          case 'Pending': return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800';
          case 'Expired': return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800';
          default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
      }
  };

  const handleAction = (action: string, contract: string) => {
      alert(`${action} action triggered for contract ${contract}`);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 relative">
         {/* Search Bar */}
        <div className="relative z-20">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                    type="text"
                    placeholder="Search company for contracts..."
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
                    <FileSignature size={20} className="text-blue-500" /> Contracts: {selectedCompany.name}
                </h3>
                <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm">
                    <Plus size={16} /> New Contract
                </button>
            </div>
            
            {selectedCompany.contracts.length > 0 ? (
                <div className="space-y-4">
                     {selectedCompany.contracts.map((contract) => (
                         <div key={contract.id} className="p-5 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors shadow-sm group">
                             <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                                 <div className="flex items-start gap-4">
                                     <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-500">
                                         <FileText size={24} />
                                     </div>
                                     <div>
                                         <h4 className="font-bold text-lg text-slate-900 dark:text-white leading-tight">{contract.name}</h4>
                                         <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                                             <span className="font-mono bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">{contract.id}</span>
                                             <span>•</span>
                                             <span>{contract.type}</span>
                                         </div>
                                     </div>
                                 </div>
                                 <div className="flex items-center gap-3">
                                     <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${getStatusColor(contract.status)}`}>
                                         {contract.status}
                                     </span>
                                     <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                                         <MoreHorizontal size={18} />
                                     </button>
                                 </div>
                             </div>
                             
                             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                                 <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-800">
                                     <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wide mb-1">Duration</p>
                                     <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                                         <Calendar size={14} className="text-slate-400" />
                                         {contract.startDate} - {contract.endDate}
                                     </div>
                                 </div>
                                 <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-800">
                                     <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wide mb-1">Value</p>
                                     <p className="font-bold text-slate-900 dark:text-white">{contract.value}</p>
                                 </div>
                                 <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-800">
                                     <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wide mb-1">Signatories</p>
                                     <p className="text-sm text-slate-700 dark:text-slate-300 truncate" title={contract.signatories.join(', ')}>
                                         {contract.signatories.join(', ')}
                                     </p>
                                 </div>
                             </div>

                             <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-700">
                                 <button 
                                     onClick={() => handleAction('View Details', contract.id)}
                                     className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
                                 >
                                     <Eye size={14} /> View Details
                                 </button>
                                 <button 
                                     onClick={() => handleAction('Download', contract.id)}
                                     className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                                 >
                                     <Download size={14} /> Download PDF
                                 </button>
                                 {contract.status === 'Expiring' && (
                                     <button 
                                         onClick={() => handleAction('Renew', contract.id)}
                                         className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-900/50 rounded-lg transition-colors"
                                     >
                                         <Clock size={14} /> Renew Now
                                     </button>
                                 )}
                             </div>
                         </div>
                     ))}
                </div>
            ) : (
                <div className="text-center py-12 text-slate-400 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-xl">
                    <FileText size={32} className="mx-auto mb-2 opacity-50" />
                    <p>No contracts found for this company.</p>
                </div>
            )}
        </div>
    </div>
  );
};
