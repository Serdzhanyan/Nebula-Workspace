
import React, { useState, useEffect } from 'react';
import { UserCheck, AlertTriangle, Search, Check } from 'lucide-react';
import { SMECompany } from '../types';

interface Props {
  company: SMECompany;
}

export const SMEClientBeneficiaries: React.FC<Props> = ({ company: initialCompany }) => {
  const [selectedCompany, setSelectedCompany] = useState<SMECompany>(initialCompany);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  // Mock data for dropdown context switching
  const companiesList: Partial<SMECompany>[] = [
      { 
          id: '1', 
          name: 'TechNova Solutions Ltd.', 
          beneficiaries: [
              { name: 'Sarah Jenkins', share: 45, verified: true },
              { name: 'Marcus Thorne', share: 30, verified: true },
              { name: 'Unknown Investor', share: 25, verified: false }
          ]
      },
      { 
          id: '2', 
          name: 'GreenLeaf Logistics',
          beneficiaries: [
              { name: 'Michael Chen', share: 100, verified: true }
          ]
      },
      { 
          id: '3', 
          name: 'Quantum Dynamics',
          beneficiaries: [
               { name: 'Robert Ford', share: 40, verified: true },
               { name: 'Arnold Weber', share: 40, verified: false },
               { name: 'Ford Foundation', share: 20, verified: true }
          ]
      }
  ];

  useEffect(() => {
    setSelectedCompany(initialCompany);
  }, [initialCompany]);

  const filteredCompanies = companiesList.filter(c => 
      c.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCompany = (comp: Partial<SMECompany>) => {
      const enrichedCompany = {
          ...selectedCompany,
          ...comp,
          beneficiaries: comp.beneficiaries || []
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
                    placeholder="Search company for beneficiary info..." 
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
                 <UserCheck size={20} className="text-emerald-500" /> Ultimate Beneficial Owners (UBO): {selectedCompany.name}
             </h3>
             
             {selectedCompany.beneficiaries && selectedCompany.beneficiaries.length > 0 ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {selectedCompany.beneficiaries.map((ben, idx) => (
                         <div key={idx} className="p-5 border border-slate-200 dark:border-slate-700 rounded-xl relative overflow-hidden group hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
                             <div className={`absolute top-0 left-0 w-1 h-full ${ben.verified ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                             <div className="flex justify-between items-start mb-2">
                                 <span className="text-sm font-bold text-slate-900 dark:text-white">{ben.name}</span>
                                 {ben.verified ? (
                                     <span className="text-[10px] bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-2 py-0.5 rounded font-bold uppercase">Verified</span>
                                 ) : (
                                     <span className="text-[10px] bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-2 py-0.5 rounded font-bold uppercase flex items-center gap-1"><AlertTriangle size={10} /> Pending</span>
                                 )}
                             </div>
                             <div className="flex justify-between items-end mt-4">
                                 <div>
                                     <p className="text-[10px] text-slate-400 uppercase tracking-wide">Shareholding</p>
                                     <p className="text-xl font-bold text-slate-800 dark:text-slate-200">{ben.share}%</p>
                                 </div>
                                 {!ben.verified && (
                                     <button className="text-xs font-bold text-indigo-600 hover:underline">Request Docs</button>
                                 )}
                             </div>
                         </div>
                     ))}
                 </div>
             ) : (
                 <div className="text-center py-12 text-slate-400">No beneficiary information found.</div>
             )}
        </div>
    </div>
  );
};
