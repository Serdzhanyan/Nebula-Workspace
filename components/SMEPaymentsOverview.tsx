
import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownLeft, AlertCircle, Activity, Search, Check } from 'lucide-react';

interface PaymentData {
  id: string;
  name: string;
  volume: string;
  transactions: number;
  pending: number;
  outgoing: string;
  incoming: string;
}

export const SMEPaymentsOverview: React.FC = () => {
  // Mock Data
  const companiesList: PaymentData[] = [
      {
          id: '1',
          name: 'TechNova Solutions Ltd.',
          volume: '$4.2M',
          transactions: 1240,
          pending: 18,
          outgoing: '$2.8M',
          incoming: '$1.4M'
      },
      {
          id: '2',
          name: 'GreenLeaf Logistics',
          volume: '$1.8M',
          transactions: 650,
          pending: 5,
          outgoing: '$1.2M',
          incoming: '$0.6M'
      },
      {
          id: '3',
          name: 'Quantum Dynamics',
          volume: '$8.5M',
          transactions: 2100,
          pending: 42,
          outgoing: '$5.1M',
          incoming: '$3.4M'
      }
  ];

  const [selectedCompany, setSelectedCompany] = useState<PaymentData>(companiesList[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredCompanies = companiesList.filter(c =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCompany = (comp: PaymentData) => {
      setSelectedCompany(comp);
      setSearchTerm("");
      setShowDropdown(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
         {/* Search Bar */}
        <div className="relative z-20">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                    type="text"
                    placeholder="Search company for payment overview..."
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

        <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Payments Dashboard: {selectedCompany.name}</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 rounded-lg"><Activity size={20} /></div>
                    <span className="text-xs font-bold uppercase text-slate-500">Total Volume (24h)</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{selectedCompany.volume}</p>
                <p className="text-xs text-slate-400 font-medium mt-1">{selectedCompany.transactions.toLocaleString()} Transactions</p>
            </div>
             <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-lg"><AlertCircle size={20} /></div>
                    <span className="text-xs font-bold uppercase text-slate-500">Pending Review</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{selectedCompany.pending}</p>
                <p className="text-xs text-amber-500 font-medium mt-1">Requires Attention</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg"><ArrowUpRight size={20} /></div>
                    <span className="text-xs font-bold uppercase text-slate-500">Outgoing</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{selectedCompany.outgoing}</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-lg"><ArrowDownLeft size={20} /></div>
                    <span className="text-xs font-bold uppercase text-slate-500">Incoming</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{selectedCompany.incoming}</p>
            </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
             <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6">Recent Transactions</h3>
             <div className="space-y-4">
                 {[1,2,3,4,5].map(i => (
                     <div key={i} className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                         <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 font-bold">
                                 {i % 2 === 0 ? 'S' : 'A'}
                             </div>
                             <div>
                                 <p className="font-bold text-sm text-slate-900 dark:text-white">Vendor Payment #{2000+i}</p>
                                 <p className="text-xs text-slate-500">Processed via ACH • {i * 5} mins ago</p>
                             </div>
                         </div>
                         <span className="font-mono font-bold text-slate-900 dark:text-white">
                             {i % 2 === 0 ? '- $12,500.00' : '+ $4,200.00'}
                         </span>
                     </div>
                 ))}
             </div>
        </div>
    </div>
  );
};
