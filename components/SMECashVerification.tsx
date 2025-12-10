
import React, { useState } from 'react';
import { ShieldCheck, FileCheck, Search, Check, X, Eye, FileText } from 'lucide-react';

interface DocumentToVerify {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  status: 'Pending' | 'Verified' | 'Rejected';
}

interface CompanyData {
  id: string;
  name: string;
  documents: DocumentToVerify[];
}

export const SMECashVerification: React.FC = () => {
  // Mock Data
  const companiesList: CompanyData[] = [
      {
          id: '1',
          name: 'TechNova Solutions Ltd.',
          documents: [
              { id: 'DOC-001', name: 'Signatory Authorization Form', type: 'Legal', uploadDate: 'Oct 24, 2024', status: 'Pending' },
              { id: 'DOC-002', name: 'Board Resolution #22', type: 'Corporate', uploadDate: 'Oct 23, 2024', status: 'Verified' }
          ]
      },
      {
          id: '2',
          name: 'GreenLeaf Logistics',
          documents: [
              { id: 'DOC-003', name: 'Beneficial Owner Declaration', type: 'Compliance', uploadDate: 'Oct 20, 2024', status: 'Pending' },
              { id: 'DOC-004', name: 'Tax Compliance Certificate', type: 'Tax', uploadDate: 'Oct 19, 2024', status: 'Rejected' }
          ]
      },
      {
          id: '3',
          name: 'Quantum Dynamics',
          documents: []
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

  const handleAction = (docId: string, action: 'Verified' | 'Rejected') => {
      const updatedDocs = selectedCompany.documents.map(d => 
          d.id === docId ? { ...d, status: action } : d
      );
      setSelectedCompany({ ...selectedCompany, documents: updatedDocs });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
         {/* Search Bar */}
        <div className="relative z-20">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                    type="text"
                    placeholder="Search company for document verification..."
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
                <ShieldCheck size={20} className="text-emerald-500" /> Document Verification: {selectedCompany.name}
            </h3>

            {selectedCompany.documents.length > 0 ? (
                <div className="space-y-4">
                     {selectedCompany.documents.map((doc) => (
                         <div key={doc.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                             <div className="flex justify-between items-start mb-4">
                                 <div className="flex items-center gap-3">
                                     <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500">
                                         <FileText size={20} />
                                     </div>
                                     <div>
                                         <p className="font-bold text-sm text-slate-900 dark:text-white">{doc.name}</p>
                                         <p className="text-xs text-slate-500">{doc.type} • Uploaded {doc.uploadDate}</p>
                                     </div>
                                 </div>
                                 <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                                     doc.status === 'Verified' ? 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800' :
                                     doc.status === 'Rejected' ? 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800' :
                                     'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800'
                                 }`}>
                                     {doc.status}
                                 </span>
                             </div>
                             
                             <div className="flex items-center gap-3 pl-12">
                                 <button className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                                     <Eye size={14} /> View Document
                                 </button>
                                 
                                 {doc.status === 'Pending' && (
                                     <div className="flex gap-2 ml-auto">
                                         <button 
                                            onClick={() => handleAction(doc.id, 'Verified')}
                                            className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition-colors"
                                         >
                                             <Check size={14} /> Approve
                                         </button>
                                         <button 
                                            onClick={() => handleAction(doc.id, 'Rejected')}
                                            className="flex items-center gap-1 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                                         >
                                             <X size={14} /> Reject
                                         </button>
                                     </div>
                                 )}
                             </div>
                         </div>
                     ))}
                </div>
            ) : (
                <div className="text-center py-12 text-slate-400 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-xl">
                    <FileCheck size={32} className="mx-auto mb-2 opacity-50" />
                    <p>No pending verifications for this company.</p>
                </div>
            )}
        </div>
    </div>
  );
};
