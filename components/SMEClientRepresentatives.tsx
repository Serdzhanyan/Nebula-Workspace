
import React, { useState, useEffect } from 'react';
import { Users, Search, Check, Shield, Plus, MoreHorizontal, Trash2 } from 'lucide-react';
import { SMECompany } from '../types';

interface Props {
  company: SMECompany;
}

interface Representative {
  name: string;
  role: string;
  authority: 'Full' | 'Limited' | 'View Only';
  status: 'Active' | 'Inactive';
  email: string;
}

export const SMEClientRepresentatives: React.FC<Props> = ({ company: initialCompany }) => {
  const [selectedCompany, setSelectedCompany] = useState<SMECompany>(initialCompany);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  // Mock data for dropdown context switching
  const companiesList: (Partial<SMECompany> & { representatives: Representative[] })[] = [
      { 
          id: '1', 
          name: 'TechNova Solutions Ltd.', 
          representatives: [
              { name: 'Sarah Jenkins', role: 'CEO', authority: 'Full', status: 'Active', email: 'sarah.j@technova.io' },
              { name: 'John Smith', role: 'CFO', authority: 'Full', status: 'Active', email: 'john.s@technova.io' },
              { name: 'Emily Davis', role: 'Legal Counsel', authority: 'Limited', status: 'Active', email: 'e.davis@technova.io' }
          ]
      },
      { 
          id: '2', 
          name: 'GreenLeaf Logistics',
          representatives: [
              { name: 'Michael Chen', role: 'Owner', authority: 'Full', status: 'Active', email: 'm.chen@greenleaf.com' },
              { name: 'David Wilson', role: 'Ops Manager', authority: 'Limited', status: 'Inactive', email: 'd.wilson@greenleaf.com' }
          ]
      },
      { 
          id: '3', 
          name: 'Quantum Dynamics',
          representatives: [
              { name: 'Robert Ford', role: 'Director', authority: 'Full', status: 'Active', email: 'r.ford@quantum.inc' }
          ]
      }
  ];

  // Cast initialCompany to include representatives for type safety in this component scope
  const [currentRepresentatives, setCurrentRepresentatives] = useState<Representative[]>(
      (companiesList.find(c => c.id === initialCompany.id)?.representatives) || []
  );

  useEffect(() => {
    setSelectedCompany(initialCompany);
    setCurrentRepresentatives((companiesList.find(c => c.id === initialCompany.id)?.representatives) || []);
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
      setCurrentRepresentatives(comp.representatives);
      setSearchTerm("");
      setShowDropdown(false);
  };

  const getAuthorityColor = (auth: string) => {
      switch(auth) {
          case 'Full': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
          case 'Limited': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800';
          default: return 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600';
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
                    placeholder="Search company for representatives..." 
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
                    <Users size={20} className="text-blue-500" /> Authorized Representatives: {selectedCompany.name}
                </h3>
                <button className="flex items-center gap-1 text-xs font-bold text-white bg-indigo-600 px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
                    <Plus size={14} /> Add Representative
                </button>
             </div>

             {currentRepresentatives && currentRepresentatives.length > 0 ? (
                 <div className="space-y-3">
                     {currentRepresentatives.map((rep, idx) => (
                         <div key={idx} className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                             <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 font-bold">
                                     {rep.name.charAt(0)}
                                 </div>
                                 <div>
                                     <p className="font-bold text-sm text-slate-900 dark:text-white">{rep.name}</p>
                                     <p className="text-xs text-slate-500">{rep.role} • {rep.email}</p>
                                 </div>
                             </div>
                             
                             <div className="flex items-center gap-6">
                                <div className="flex flex-col items-end">
                                    <span className="text-[10px] text-slate-400 uppercase tracking-wide mb-1">Authority</span>
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded border uppercase ${getAuthorityColor(rep.authority)}`}>
                                        {rep.authority}
                                    </span>
                                </div>
                                <div className="flex flex-col items-end w-20">
                                     <span className="text-[10px] text-slate-400 uppercase tracking-wide mb-1">Status</span>
                                     <span className={`text-xs font-medium ${rep.status === 'Active' ? 'text-emerald-500' : 'text-slate-400'}`}>
                                         {rep.status}
                                     </span>
                                </div>
                                <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                                    <MoreHorizontal size={18} />
                                </button>
                             </div>
                         </div>
                     ))}
                 </div>
             ) : (
                 <div className="text-center py-12 text-slate-400 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-xl">
                     <Users size={32} className="mx-auto mb-2 opacity-50" />
                     <p>No authorized representatives found.</p>
                 </div>
             )}
        </div>
    </div>
  );
};
