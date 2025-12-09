
import React, { useState, useEffect } from 'react';
import { User, Plus, Trash2, Search, Check } from 'lucide-react';
import { SMECompany } from '../types';

interface Props {
  company: SMECompany;
}

export const SMEClientDirectors: React.FC<Props> = ({ company: initialCompany }) => {
  const [selectedCompany, setSelectedCompany] = useState<SMECompany>(initialCompany);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  // Mock data for dropdown context switching
  const companiesList: Partial<SMECompany>[] = [
      { 
          id: '1', 
          name: 'TechNova Solutions Ltd.', 
          directors: [
              { name: 'Sarah Jenkins', role: 'Director', appointed: 'Oct 2021' },
              { name: 'Marcus Thorne', role: 'Director', appointed: 'Jul 2024' }
          ]
      },
      { 
          id: '2', 
          name: 'GreenLeaf Logistics',
          directors: [
              { name: 'Michael Chen', role: 'Managing Director', appointed: 'Mar 2020' }
          ]
      },
      { 
          id: '3', 
          name: 'Quantum Dynamics',
          directors: [
              { name: 'Robert Ford', role: 'Chairman', appointed: 'Jan 2019' },
              { name: 'Bernard Lowe', role: 'Executive Director', appointed: 'Feb 2020' },
              { name: 'Dolores Abernathy', role: 'Non-Executive Director', appointed: 'Mar 2022' }
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
      // Merge selected partial data with current full data structure for display
      const enrichedCompany = {
          ...selectedCompany,
          ...comp,
          directors: comp.directors || []
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
                    placeholder="Search company for director info..." 
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
                    <User size={20} className="text-indigo-500" /> Board of Directors: {selectedCompany.name}
                </h3>
                <button className="flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-3 py-1.5 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors">
                    <Plus size={14} /> Add Director
                </button>
             </div>

             {selectedCompany.directors && selectedCompany.directors.length > 0 ? (
                 <div className="space-y-3">
                     {selectedCompany.directors.map((director, idx) => (
                         <div key={idx} className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:shadow-sm transition-shadow">
                             <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 font-bold">
                                     {director.name.charAt(0)}
                                 </div>
                                 <div>
                                     <p className="font-bold text-sm text-slate-900 dark:text-white">{director.name}</p>
                                     <p className="text-xs text-slate-500">{director.role}</p>
                                 </div>
                             </div>
                             <div className="flex items-center gap-4">
                                 <div className="text-right">
                                     <p className="text-[10px] text-slate-400 uppercase tracking-wide">Appointed</p>
                                     <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{director.appointed}</p>
                                 </div>
                                 <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                                     <Trash2 size={16} />
                                 </button>
                             </div>
                         </div>
                     ))}
                 </div>
             ) : (
                 <div className="text-center py-12 text-slate-400">No director information found.</div>
             )}
        </div>
    </div>
  );
};
