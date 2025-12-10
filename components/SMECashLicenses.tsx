
import React, { useState } from 'react';
import { Award, UploadCloud, Search, Check, Plus, X, Save, Calendar, FileText, AlertCircle } from 'lucide-react';

interface License {
  id: string;
  type: string;
  number: string;
  expiry: string;
  status: 'Active' | 'Expired' | 'Pending';
}

interface CompanyData {
  id: string;
  name: string;
  licenses: License[];
}

export const SMECashLicenses: React.FC = () => {
  // Mock Data
  const companiesList: CompanyData[] = [
      {
          id: '1',
          name: 'TechNova Solutions Ltd.',
          licenses: [
              { id: 'LIC-001', type: 'State Banking License', number: 'CA-99210-B', expiry: 'Dec 31, 2025', status: 'Active' },
              { id: 'LIC-002', type: 'FinTech Operation Permit', number: 'FT-2023-X', expiry: 'Jun 30, 2024', status: 'Expired' }
          ]
      },
      {
          id: '2',
          name: 'GreenLeaf Logistics',
          licenses: [
              { id: 'LIC-003', type: 'Import/Export License', number: 'US-CBP-8821', expiry: 'Oct 15, 2026', status: 'Active' }
          ]
      },
      {
          id: '3',
          name: 'Quantum Dynamics',
          licenses: []
      }
  ];

  const [selectedCompany, setSelectedCompany] = useState<CompanyData>(companiesList[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  
  // Add License State
  const [isAdding, setIsAdding] = useState(false);
  const [newLicense, setNewLicense] = useState({ type: '', number: '', expiry: '' });

  const filteredCompanies = companiesList.filter(c =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCompany = (comp: CompanyData) => {
      setSelectedCompany(comp);
      setSearchTerm("");
      setShowDropdown(false);
      setIsAdding(false);
  };

  const handleAddLicense = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newLicense.type || !newLicense.number) return;
      
      const license: License = {
          id: `LIC-${Date.now()}`,
          type: newLicense.type,
          number: newLicense.number,
          expiry: newLicense.expiry || 'N/A',
          status: 'Pending'
      };

      const updatedCompany = {
          ...selectedCompany,
          licenses: [license, ...selectedCompany.licenses]
      };
      
      setSelectedCompany(updatedCompany);
      setIsAdding(false);
      setNewLicense({ type: '', number: '', expiry: '' });
  };

  const getStatusColor = (status: string) => {
      switch(status) {
          case 'Active': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
          case 'Expired': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
          case 'Pending': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800';
          default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
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
                    placeholder="Search company for licenses..."
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
                    <Award size={20} className="text-purple-500" /> Licenses & Permits: {selectedCompany.name}
                </h3>
                <button 
                    onClick={() => setIsAdding(true)}
                    className="flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-3 py-1.5 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors shadow-sm"
                >
                    <Plus size={14} /> Add License
                </button>
            </div>

            {/* Add License Form */}
            {isAdding && (
                <div className="mb-6 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700 animate-in slide-in-from-top-2">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-4">Enter New License Information</h4>
                    <form onSubmit={handleAddLicense} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1.5">License Type</label>
                                <input 
                                    type="text" 
                                    placeholder="e.g. Operating Permit"
                                    required
                                    value={newLicense.type}
                                    onChange={(e) => setNewLicense({...newLicense, type: e.target.value})}
                                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1.5">License Number</label>
                                <input 
                                    type="text" 
                                    placeholder="e.g. LIC-123456"
                                    required
                                    value={newLicense.number}
                                    onChange={(e) => setNewLicense({...newLicense, number: e.target.value})}
                                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                        </div>
                        <div>
                             <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1.5">Expiry Date</label>
                             <input 
                                type="date"
                                required
                                value={newLicense.expiry}
                                onChange={(e) => setNewLicense({...newLicense, expiry: e.target.value})}
                                className="w-full md:w-1/2 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                             />
                        </div>
                        <div className="flex gap-2 justify-end pt-2">
                             <button 
                                type="button"
                                onClick={() => setIsAdding(false)}
                                className="px-4 py-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 text-sm font-medium"
                             >
                                 Cancel
                             </button>
                             <button 
                                type="submit"
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors flex items-center gap-2"
                             >
                                 <Save size={14} /> Save Record
                             </button>
                        </div>
                    </form>
                </div>
            )}
            
            {selectedCompany.licenses.length > 0 ? (
                <div className="space-y-3">
                     {selectedCompany.licenses.map((lic) => (
                         <div key={lic.id} className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                             <div className="flex items-center gap-4">
                                 <div className="p-2 bg-white dark:bg-slate-800 rounded-lg text-slate-500 border border-slate-200 dark:border-slate-700 shadow-sm">
                                     <FileText size={24} />
                                 </div>
                                 <div>
                                     <p className="text-sm font-bold text-slate-900 dark:text-white">{lic.type}</p>
                                     <p className="text-xs text-slate-500 font-mono mt-0.5">{lic.number}</p>
                                 </div>
                             </div>
                             
                             <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                                 <div className="flex items-center gap-2 text-xs text-slate-500">
                                     <Calendar size={14} />
                                     <span>Expires: {lic.expiry}</span>
                                 </div>
                                 <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${getStatusColor(lic.status)}`}>
                                     {lic.status}
                                 </span>
                             </div>
                         </div>
                     ))}
                </div>
            ) : (
                <div className="text-center py-12 text-slate-400 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-xl">
                    <Award size={32} className="mx-auto mb-2 opacity-50" />
                    <p>No licenses recorded for this company.</p>
                </div>
            )}
        </div>
    </div>
  );
};
