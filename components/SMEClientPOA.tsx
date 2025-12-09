
import React, { useState, useEffect } from 'react';
import { FileText, Search, Check, Shield, Download, AlertCircle } from 'lucide-react';
import { SMECompany } from '../types';

interface Props {
  company: SMECompany;
}

interface POA {
  id: string;
  grantor: string;
  attorney: string;
  type: 'General' | 'Limited' | 'Durable' | 'Springing';
  status: 'Active' | 'Revoked' | 'Expired';
  effectiveDate: string;
  expirationDate: string;
  scope: string;
}

export const SMEClientPOA: React.FC<Props> = ({ company: initialCompany }) => {
  const [selectedCompany, setSelectedCompany] = useState<SMECompany>(initialCompany);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  // Mock data for dropdown context switching
  const companiesList: (Partial<SMECompany> & { poaList: POA[] })[] = [
      { 
          id: '1', 
          name: 'TechNova Solutions Ltd.', 
          poaList: [
              { id: 'POA-001', grantor: 'Sarah Jenkins', attorney: 'Marcus Thorne', type: 'General', status: 'Active', effectiveDate: 'Jan 01, 2024', expirationDate: 'Dec 31, 2024', scope: 'Full financial authority' },
              { id: 'POA-002', grantor: 'TechNova Solutions Ltd.', attorney: 'Emily Davis', type: 'Limited', status: 'Active', effectiveDate: 'Mar 15, 2024', expirationDate: 'Mar 15, 2025', scope: 'Real estate transactions only' }
          ]
      },
      { 
          id: '2', 
          name: 'GreenLeaf Logistics',
          poaList: [
              { id: 'POA-003', grantor: 'Michael Chen', attorney: 'David Wilson', type: 'Limited', status: 'Expired', effectiveDate: 'Jan 01, 2023', expirationDate: 'Jan 01, 2024', scope: 'Vehicle registration' }
          ]
      },
      { 
          id: '3', 
          name: 'Quantum Dynamics',
          poaList: []
      }
  ];

  // Initialize with empty list or specific mock if ID matches, 
  // but for this demo, we'll default to the first mock's list if IDs match, else empty
  const [currentPOAs, setCurrentPOAs] = useState<POA[]>(
      (companiesList.find(c => c.id === initialCompany.id)?.poaList) || []
  );

  useEffect(() => {
    setSelectedCompany(initialCompany);
    setCurrentPOAs((companiesList.find(c => c.id === initialCompany.id)?.poaList) || []);
  }, [initialCompany]);

  const filteredCompanies = companiesList.filter(c => 
      c.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCompany = (comp: any) => {
      const enrichedCompany = {
          ...selectedCompany,
          ...comp,
      };
      setSelectedCompany(enrichedCompany as SMECompany);
      setCurrentPOAs(comp.poaList);
      setSearchTerm("");
      setShowDropdown(false);
  };

  const getStatusColor = (status: string) => {
      switch(status) {
          case 'Active': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
          case 'Revoked': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
          case 'Expired': return 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600';
          default: return 'bg-slate-100 text-slate-700';
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
                    placeholder="Search company for POA info..." 
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
                 <Shield size={20} className="text-indigo-500" /> Powers of Attorney: {selectedCompany.name}
             </h3>

             {currentPOAs && currentPOAs.length > 0 ? (
                 <div className="space-y-4">
                     {currentPOAs.map((poa, idx) => (
                         <div key={idx} className="p-5 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                             <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                                 <div className="flex items-start gap-3">
                                     <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500 mt-1">
                                         <FileText size={20} />
                                     </div>
                                     <div>
                                         <h4 className="font-bold text-slate-900 dark:text-white text-sm">{poa.type} Power of Attorney</h4>
                                         <p className="text-xs text-slate-500 mt-1">ID: {poa.id}</p>
                                     </div>
                                 </div>
                                 <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase border ${getStatusColor(poa.status)}`}>
                                     {poa.status}
                                 </span>
                             </div>
                             
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                                 <div>
                                     <span className="text-slate-400 text-xs block mb-0.5">Grantor</span>
                                     <span className="font-medium text-slate-800 dark:text-slate-200">{poa.grantor}</span>
                                 </div>
                                 <div>
                                     <span className="text-slate-400 text-xs block mb-0.5">Attorney-in-Fact</span>
                                     <span className="font-medium text-slate-800 dark:text-slate-200">{poa.attorney}</span>
                                 </div>
                                 <div>
                                     <span className="text-slate-400 text-xs block mb-0.5">Effective Date</span>
                                     <span className="font-medium text-slate-800 dark:text-slate-200">{poa.effectiveDate}</span>
                                 </div>
                                 <div>
                                     <span className="text-slate-400 text-xs block mb-0.5">Expiration Date</span>
                                     <span className="font-medium text-slate-800 dark:text-slate-200">{poa.expirationDate}</span>
                                 </div>
                                 <div className="md:col-span-2">
                                     <span className="text-slate-400 text-xs block mb-0.5">Scope of Authority</span>
                                     <p className="text-slate-600 dark:text-slate-300 italic">{poa.scope}</p>
                                 </div>
                             </div>

                             <div className="mt-4 flex justify-end">
                                 <button className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 px-3 py-1.5 rounded-lg transition-colors">
                                     <Download size={14} /> Download Document
                                 </button>
                             </div>
                         </div>
                     ))}
                 </div>
             ) : (
                 <div className="text-center py-12 text-slate-400 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-xl">
                     <AlertCircle size={32} className="mx-auto mb-2 opacity-50" />
                     <p>No Power of Attorney records found for this company.</p>
                 </div>
             )}
        </div>
    </div>
  );
};
