
import React, { useState } from 'react';
import { FileText, Clock, CheckCircle2, Search, Check, AlertCircle } from 'lucide-react';

interface Application {
  id: string;
  type: string;
  date: string;
  status: 'Under Review' | 'Approved' | 'Rejected' | 'Pending Info';
}

interface CompanyData {
  id: string;
  name: string;
  applications: Application[];
}

export const SMECashApplications: React.FC = () => {
  // Mock Data
  const companiesList: CompanyData[] = [
      {
          id: '1',
          name: 'TechNova Solutions Ltd.',
          applications: [
              { id: 'APP-001', type: 'Business Checking - USD', date: 'Oct 24, 2024', status: 'Under Review' },
              { id: 'APP-002', type: 'Savings Account - EUR', date: 'Oct 10, 2024', status: 'Approved' }
          ]
      },
      {
          id: '2',
          name: 'GreenLeaf Logistics',
          applications: [
              { id: 'APP-003', type: 'Merchant Account', date: 'Sep 15, 2024', status: 'Pending Info' }
          ]
      },
      {
          id: '3',
          name: 'Quantum Dynamics',
          applications: []
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

  const getStatusColor = (status: string) => {
      switch(status) {
          case 'Approved': return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400';
          case 'Under Review': return 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400';
          case 'Rejected': return 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400';
          default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
      }
  };

    const getStatusIcon = (status: string) => {
      switch(status) {
          case 'Approved': return <CheckCircle2 size={18} />;
          case 'Under Review': return <Clock size={18} />;
          case 'Rejected': return <AlertCircle size={18} />;
          default: return <FileText size={18} />;
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
                    placeholder="Search company for applications..."
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
                <FileText size={20} className="text-indigo-500" /> Account Applications: {selectedCompany.name}
            </h3>

            {selectedCompany.applications.length > 0 ? (
                <div className="space-y-4">
                    {selectedCompany.applications.map((app) => (
                        <div key={app.id} className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${
                                    app.status === 'Approved' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600' :
                                    app.status === 'Under Review' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600' :
                                    'bg-slate-100 dark:bg-slate-800 text-slate-500'
                                }`}>
                                    {getStatusIcon(app.status)}
                                </div>
                                <div>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white">{app.type}</p>
                                    <p className="text-xs text-slate-500">Submitted on {app.date}</p>
                                </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(app.status)}`}>
                                {app.status}
                            </span>
                        </div>
                    ))}
                </div>
            ) : (
                 <div className="text-center py-12 text-slate-400 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-xl">
                     <FileText size={32} className="mx-auto mb-2 opacity-50" />
                     <p>No active applications found for this company.</p>
                 </div>
            )}
        </div>
    </div>
  );
};
