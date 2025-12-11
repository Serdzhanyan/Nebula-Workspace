
import React, { useState } from 'react';
import { FileText, Download, Search, Check, Eye, Archive, MoreHorizontal, Trash2 } from 'lucide-react';

interface TransactionDoc {
  id: string;
  name: string;
  type: 'Invoice' | 'Receipt' | 'Confirmation' | 'Statement';
  date: string;
  size: string;
  status: 'Available' | 'Archived';
}

interface CompanyData {
  id: string;
  name: string;
  documents: TransactionDoc[];
}

export const SMEPaymentsDocs: React.FC = () => {
  // Mock Data
  const companiesList: CompanyData[] = [
      {
          id: '1',
          name: 'TechNova Solutions Ltd.',
          documents: [
              { id: 'DOC-101', name: 'Wire_Confirmation_#8821.pdf', type: 'Confirmation', date: 'Oct 24, 2024', size: '1.2 MB', status: 'Available' },
              { id: 'DOC-102', name: 'Invoice_INV-2024-001.pdf', type: 'Invoice', date: 'Oct 23, 2024', size: '450 KB', status: 'Available' },
              { id: 'DOC-103', name: 'Monthly_Statement_Sep2024.pdf', type: 'Statement', date: 'Oct 01, 2024', size: '2.4 MB', status: 'Archived' }
          ]
      },
      {
          id: '2',
          name: 'GreenLeaf Logistics',
          documents: [
              { id: 'DOC-104', name: 'Receipt_#99210.pdf', type: 'Receipt', date: 'Oct 22, 2024', size: '120 KB', status: 'Available' }
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
  const [activeDocMenu, setActiveDocMenu] = useState<string | null>(null);

  const filteredCompanies = companiesList.filter(c =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCompany = (comp: CompanyData) => {
      setSelectedCompany(comp);
      setSearchTerm("");
      setShowDropdown(false);
      setActiveDocMenu(null);
  };

  const handleAction = (docId: string, action: 'Archive' | 'Delete' | 'Download') => {
      if (action === 'Delete') {
          if (window.confirm('Are you sure you want to delete this document?')) {
               const updatedDocs = selectedCompany.documents.filter(d => d.id !== docId);
               setSelectedCompany({ ...selectedCompany, documents: updatedDocs });
          }
      } else if (action === 'Archive') {
          const updatedDocs = selectedCompany.documents.map(d => 
              d.id === docId ? { ...d, status: 'Archived' as const } : d
          );
          setSelectedCompany({ ...selectedCompany, documents: updatedDocs });
      } else {
          alert(`Downloading ${docId}...`);
      }
      setActiveDocMenu(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
         {/* Search Bar */}
        <div className="relative z-20">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                    type="text"
                    placeholder="Search company for transaction docs..."
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
                <FileText size={20} className="text-blue-500" /> Transaction Documentation: {selectedCompany.name}
            </h3>
            
            {selectedCompany.documents.length > 0 ? (
                <div className="space-y-3">
                    {selectedCompany.documents.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-500">
                                    <FileText size={24} />
                                </div>
                                <div>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white">{doc.name}</p>
                                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                                        <span className="bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded text-slate-600 dark:text-slate-300">{doc.type}</span>
                                        <span>• {doc.date}</span>
                                        <span>• {doc.size}</span>
                                        {doc.status === 'Archived' && <span className="text-amber-500 font-medium">• Archived</span>}
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                                <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors" title="Preview">
                                    <Eye size={18} />
                                </button>
                                <button 
                                    onClick={() => handleAction(doc.id, 'Download')}
                                    className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors" 
                                    title="Download"
                                >
                                    <Download size={18} />
                                </button>
                                
                                <div className="relative">
                                    <button 
                                        onClick={() => setActiveDocMenu(activeDocMenu === doc.id ? null : doc.id)}
                                        className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                                    >
                                        <MoreHorizontal size={18} />
                                    </button>
                                    
                                    {activeDocMenu === doc.id && (
                                        <>
                                            <div className="fixed inset-0 z-10" onClick={() => setActiveDocMenu(null)}></div>
                                            <div className="absolute right-0 top-full mt-2 w-40 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-1 z-20 animate-in fade-in zoom-in-95 duration-200">
                                                <button 
                                                    onClick={() => handleAction(doc.id, 'Archive')}
                                                    className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2"
                                                >
                                                    <Archive size={14} className="text-slate-400" /> Archive
                                                </button>
                                                <div className="h-px bg-slate-100 dark:bg-slate-700 my-1"></div>
                                                <button 
                                                    onClick={() => handleAction(doc.id, 'Delete')}
                                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 flex items-center gap-2"
                                                >
                                                    <Trash2 size={14} /> Delete
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 text-slate-400 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-xl">
                    <FileText size={32} className="mx-auto mb-2 opacity-50" />
                    <p>No documents found for this company.</p>
                </div>
            )}
        </div>
    </div>
  );
};
