
import React, { useState, useEffect } from 'react';
import { Activity, Search, Check, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';

interface ProcessingItem {
  id: string;
  name: string;
  type: string;
  status: 'Processing' | 'Completed' | 'Failed' | 'Queued';
  progress: number;
  startTime: string;
  estimatedCompletion?: string;
}

interface CompanyData {
  id: string;
  name: string;
  statuses: ProcessingItem[];
}

export const SMECashStatuses: React.FC = () => {
  // Mock Data
  const companiesList: CompanyData[] = [
      {
          id: '1',
          name: 'TechNova Solutions Ltd.',
          statuses: [
              { id: 'PROC-001', name: 'Batch #9921 - Monthly Payroll', type: 'Payroll', status: 'Processing', progress: 65, startTime: '10 mins ago', estimatedCompletion: '5 mins' },
              { id: 'PROC-002', name: 'Intl Wire Transfer - Vendor X', type: 'Wire', status: 'Queued', progress: 0, startTime: 'Scheduled for 2:00 PM' }
          ]
      },
      {
          id: '2',
          name: 'GreenLeaf Logistics',
          statuses: [
              { id: 'PROC-003', name: 'Bulk Invoice Payment', type: 'ACH', status: 'Completed', progress: 100, startTime: '1 hour ago' },
              { id: 'PROC-004', name: 'Tax Remittance', type: 'Tax', status: 'Processing', progress: 45, startTime: '2 mins ago', estimatedCompletion: '1 min' }
          ]
      },
      {
          id: '3',
          name: 'Quantum Dynamics',
          statuses: [
               { id: 'PROC-005', name: 'Dividend Distribution', type: 'Wire', status: 'Failed', progress: 20, startTime: 'Yesterday', estimatedCompletion: 'Action Required' }
          ]
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
          case 'Completed': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
          case 'Processing': return 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400';
          case 'Queued': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
          case 'Failed': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
          default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
      }
  };

  const getStatusIcon = (status: string) => {
      switch(status) {
          case 'Completed': return <CheckCircle2 size={16} />;
          case 'Processing': return <Activity size={16} />;
          case 'Queued': return <Clock size={16} />;
          case 'Failed': return <AlertCircle size={16} />;
          default: return <Activity size={16} />;
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
                    placeholder="Search company for processing status..."
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
                <Activity size={20} className="text-blue-500" /> Processing Statuses: {selectedCompany.name}
            </h3>
            
            {selectedCompany.statuses.length > 0 ? (
                <div className="space-y-4">
                    {selectedCompany.statuses.map((item) => (
                        <div key={item.id} className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1">{item.type}</span>
                                    <span className="text-sm font-bold text-slate-800 dark:text-white">{item.name}</span>
                                </div>
                                <span className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${getStatusColor(item.status)}`}>
                                    {getStatusIcon(item.status)}
                                    {item.status}
                                </span>
                            </div>
                            
                            <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden mb-2">
                                <div 
                                    className={`h-full transition-all duration-1000 ${
                                        item.status === 'Completed' ? 'bg-emerald-500' : 
                                        item.status === 'Failed' ? 'bg-red-500' :
                                        item.status === 'Queued' ? 'bg-amber-500' : 'bg-indigo-500'
                                    }`} 
                                    style={{ width: `${item.progress}%` }}
                                ></div>
                            </div>
                            
                            <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                                <span>Started: {item.startTime}</span>
                                {item.estimatedCompletion && <span>Est. finish: {item.estimatedCompletion}</span>}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 text-slate-400 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-xl">
                    <Activity size={32} className="mx-auto mb-2 opacity-50" />
                    <p>No active processes found for this company.</p>
                </div>
            )}
        </div>
    </div>
  );
};
