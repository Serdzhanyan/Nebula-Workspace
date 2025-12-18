
import React, { useState, useEffect } from 'react';
import { History as HistoryIcon, FileDiff, Search, Check } from 'lucide-react';
import { SMECompany } from '../types';

interface Props {
  company: SMECompany;
}

export const SMEClientChanges: React.FC<Props> = ({ company: initialCompany }) => {
  const [selectedCompany, setSelectedCompany] = useState<SMECompany>(initialCompany);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  // Mock data for dropdown context switching
  const companiesList: Partial<SMECompany>[] = [
      { 
          id: '1', 
          name: 'TechNova Solutions Ltd.', 
          changeHistory: [
            { id: 'ch1', type: 'Address Change', date: 'Aug 10, 2024', status: 'Approved', oldValue: '45 Old Rd', newValue: '123 Innovation Blvd', requestor: 'Sarah Jenkins' },
            { id: 'ch2', type: 'Director Appointment', date: 'Jul 22, 2024', status: 'Approved', oldValue: '-', newValue: 'Marcus Thorne', requestor: 'Legal Dept' },
            { id: 'ch3', type: 'Share Capital Increase', date: 'Jan 15, 2024', status: 'Approved', oldValue: '10000', newValue: '50000', requestor: 'Sarah Jenkins' }
          ]
      },
      { 
          id: '2', 
          name: 'GreenLeaf Logistics',
          changeHistory: [
             { id: 'ch4', type: 'Trade Name Update', date: 'Sep 05, 2023', status: 'Approved', oldValue: 'GL Transport', newValue: 'GreenLeaf Logistics', requestor: 'Michael Chen' },
             { id: 'ch5', type: 'Bank Account Addition', date: 'Feb 12, 2023', status: 'Pending', oldValue: '-', newValue: 'Chase Operating', requestor: 'Finance Team' }
          ]
      },
      { 
          id: '3', 
          name: 'Quantum Dynamics',
          changeHistory: []
      }
  ];

  useEffect(() => {
    setSelectedCompany(initialCompany);
  }, [initialCompany]);

  const filteredCompanies = companiesList.filter(c => 
      c.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCompany = (comp: Partial<SMECompany>) => {
      // Merge selected partial data with current full data structure for display
      const enrichedCompany = {
          ...selectedCompany,
          ...comp,
          changeHistory: comp.changeHistory || []
      };
      setSelectedCompany(enrichedCompany as SMECompany);
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
                    placeholder="Search company for change history..." 
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
                <HistoryIcon size={20} className="text-amber-500" /> Change History: {selectedCompany.name}
            </h3>
            {selectedCompany.changeHistory && selectedCompany.changeHistory.length > 0 ? (
                <div className="space-y-4">
                    {selectedCompany.changeHistory.map((change, idx) => (
                        <div key={idx} className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-2">
                                    <div className="p-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500">
                                        <FileDiff size={16} />
                                    </div>
                                    <span className="font-bold text-slate-900 dark:text-white text-sm">{change.type}</span>
                                </div>
                                <span className="text-xs text-slate-500">{change.date}</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:gap-8 text-xs mt-3 pl-9 bg-slate-50 dark:bg-slate-800/30 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                                <div>
                                    <span className="text-slate-400 uppercase font-bold text-[10px] block mb-0.5">Previous Value</span>
                                    <p className="text-slate-600 dark:text-slate-300 font-medium break-all">{change.oldValue}</p>
                                </div>
                                <div className="hidden sm:block border-r border-slate-200 dark:border-slate-700"></div>
                                <div>
                                    <span className="text-slate-400 uppercase font-bold text-[10px] block mb-0.5">New Value</span>
                                    <p className="text-slate-900 dark:text-white font-bold break-all">{change.newValue}</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center mt-3 pl-9 pt-2">
                                <span className="text-xs text-slate-500">Requested by <span className="font-medium text-slate-700 dark:text-slate-300">{change.requestor}</span></span>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase border ${
                                    change.status === 'Approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-800' :
                                    change.status === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-900/20 dark:border-amber-800' :
                                    'bg-red-50 text-red-600 border-red-100 dark:bg-red-900/20 dark:border-red-800'
                                }`}>{change.status}</span>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-xl">
                    <p className="text-slate-500 dark:text-slate-400 font-medium">No change history records found for this company.</p>
                </div>
            )}
        </div>
    </div>
  );
};
