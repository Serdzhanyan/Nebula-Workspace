
import React, { useState } from 'react';
import { Truck, Search, Check, Calendar, FileText, ArrowRight, DollarSign, RefreshCw, Clock } from 'lucide-react';

interface LeaseContract {
  id: string;
  asset: string;
  type: string;
  monthlyPayment: string;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Expiring Soon' | 'Closed';
  progress: number;
}

interface CompanyData {
  id: string;
  name: string;
  leases: LeaseContract[];
}

export const SMEProductsLeasing: React.FC = () => {
  // Mock Data
  const companiesList: CompanyData[] = [
      {
          id: '1',
          name: 'TechNova Solutions Ltd.',
          leases: [
              { id: 'L-9921', asset: 'Delivery Fleet 2024', type: 'Vehicle', monthlyPayment: '$2,400', startDate: 'Jan 2024', endDate: 'Dec 2026', status: 'Active', progress: 30 },
              { id: 'L-8810', asset: 'Data Center Servers', type: 'Equipment', monthlyPayment: '$5,500', startDate: 'Mar 2022', endDate: 'Mar 2025', status: 'Expiring Soon', progress: 85 }
          ]
      },
      {
          id: '2',
          name: 'GreenLeaf Logistics',
          leases: [
              { id: 'L-7722', asset: 'Forklift Fleet', type: 'Equipment', monthlyPayment: '$1,200', startDate: 'Jun 2023', endDate: 'Jun 2026', status: 'Active', progress: 45 }
          ]
      },
      {
          id: '3',
          name: 'Quantum Dynamics',
          leases: []
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
          case 'Expiring Soon': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800';
          case 'Closed': return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
          default: return 'bg-slate-100 text-slate-700';
      }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 relative">
         {/* Search Bar */}
        <div className="relative z-20">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                    type="text"
                    placeholder="Search company for leasing..."
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
                <Truck size={20} className="text-amber-500" /> Equipment Leasing: {selectedCompany.name}
            </h3>
            
            {selectedCompany.leases.length > 0 ? (
                <div className="space-y-4">
                     {selectedCompany.leases.map((lease) => (
                         <div key={lease.id} className="p-5 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors shadow-sm">
                             <div className="flex justify-between items-start mb-4">
                                 <div>
                                     <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-1">{lease.asset}</h4>
                                     <p className="text-xs text-slate-500 font-mono">Contract #{lease.id} • {lease.type}</p>
                                 </div>
                                 <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase border ${getStatusColor(lease.status)}`}>
                                     {lease.status}
                                 </span>
                             </div>
                             
                             <div className="flex flex-col md:flex-row gap-6 mb-6">
                                 <div className="flex-1 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                                     <div>
                                         <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wide">Monthly Payment</p>
                                         <p className="font-bold text-slate-900 dark:text-white text-lg">{lease.monthlyPayment}</p>
                                     </div>
                                     <DollarSign size={20} className="text-emerald-500" />
                                 </div>
                                 <div className="flex-1 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                                     <div>
                                         <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wide">Term</p>
                                         <p className="font-medium text-slate-800 dark:text-slate-200">{lease.startDate} - {lease.endDate}</p>
                                     </div>
                                     <Calendar size={20} className="text-indigo-500" />
                                 </div>
                             </div>

                             <div className="mb-4">
                                 <div className="flex justify-between items-center mb-1 text-xs">
                                     <span className="text-slate-500 font-medium">Lease Duration</span>
                                     <span className="font-bold text-slate-700 dark:text-slate-300">{lease.progress}% Complete</span>
                                 </div>
                                 <div className="w-full bg-slate-100 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                                     <div 
                                         className={`h-full transition-all duration-1000 ${lease.progress > 80 ? 'bg-amber-500' : 'bg-indigo-600'}`} 
                                         style={{ width: `${lease.progress}%` }}
                                     ></div>
                                 </div>
                             </div>
                             
                             <div className="flex gap-3 justify-end pt-4 border-t border-slate-100 dark:border-slate-700">
                                 <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                                     <FileText size={16} /> View Contract
                                 </button>
                                 <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm">
                                     <RefreshCw size={16} /> Request Extension
                                 </button>
                             </div>
                         </div>
                     ))}
                </div>
            ) : (
                <div className="text-center py-12 text-slate-400 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-xl">
                    <Truck size={32} className="mx-auto mb-2 opacity-50" />
                    <p>No active lease agreements found for this company.</p>
                </div>
            )}
        </div>
    </div>
  );
};
