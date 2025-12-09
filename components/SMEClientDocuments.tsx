
import React, { useState, useEffect } from 'react';
import { Files, Download, UploadCloud, AlertCircle, Search, Check } from 'lucide-react';
import { SMECompany } from '../types';

interface Props {
  company: SMECompany;
}

export const SMEClientDocuments: React.FC<Props> = ({ company: initialCompany }) => {
  const [selectedCompany, setSelectedCompany] = useState<SMECompany>(initialCompany);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  // Mock data for dropdown context switching
  const companiesList: Partial<SMECompany>[] = [
      { 
          id: '1', 
          name: 'TechNova Solutions Ltd.', 
          corporateDocuments: [
              { name: 'Business License 2024', status: 'Current', date: 'Jan 15, 2024' },
              { name: 'Tax Clearance', status: 'Expired', date: 'Dec 31, 2023' },
              { name: 'Certificate of Incorporation', status: 'Current', date: 'Oct 12, 2021' }
          ]
      },
      { 
          id: '2', 
          name: 'GreenLeaf Logistics',
          corporateDocuments: [
               { name: 'Operating Agreement', status: 'Current', date: 'Mar 20, 2020' },
               { name: 'Insurance Policy', status: 'Missing' }
          ]
      },
      { 
          id: '3', 
          name: 'Quantum Dynamics',
          corporateDocuments: [
              { name: 'Articles of Organization', status: 'Current', date: 'Feb 10, 2022' }
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
          corporateDocuments: comp.corporateDocuments || []
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
                    placeholder="Search company for documents..." 
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
                    <Files size={20} className="text-blue-500" /> Corporate Documents: {selectedCompany.name}
                </h3>
                <button className="flex items-center gap-1 text-xs font-bold text-white bg-indigo-600 px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
                    <UploadCloud size={14} /> Upload New
                </button>
             </div>

             {selectedCompany.corporateDocuments && selectedCompany.corporateDocuments.length > 0 ? (
                 <div className="space-y-3">
                     {selectedCompany.corporateDocuments.map((doc, idx) => (
                         <div key={idx} className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                             <div className="flex items-center gap-4">
                                 <div className={`p-2 rounded-lg ${
                                     doc.status === 'Missing' || doc.status === 'Expired' ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400' : 
                                     'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                                 }`}>
                                     {doc.status === 'Missing' ? <AlertCircle size={18} /> : <Files size={18} />}
                                 </div>
                                 <div>
                                     <p className="font-bold text-sm text-slate-900 dark:text-white">{doc.name}</p>
                                     <p className="text-xs text-slate-500">{doc.date ? `Updated ${doc.date}` : 'Action Required'}</p>
                                 </div>
                             </div>
                             <div className="flex items-center gap-4">
                                 <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
                                     doc.status === 'Approved' || doc.status === 'Current' ? 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-800' :
                                     'bg-red-50 text-red-600 border-red-100 dark:bg-red-900/20 dark:border-red-800'
                                 }`}>
                                     {doc.status}
                                 </span>
                                 {doc.status !== 'Missing' && (
                                     <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                                         <Download size={16} />
                                     </button>
                                 )}
                             </div>
                         </div>
                     ))}
                 </div>
             ) : (
                 <div className="text-center py-12 text-slate-400">No documents found.</div>
             )}
        </div>
    </div>
  );
};
