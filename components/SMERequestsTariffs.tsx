
import React, { useState, useEffect } from 'react';
import { Tag, ArrowRight, Search, ChevronDown, Check, X, AlertCircle, Clock, FileText, CheckCircle2 } from 'lucide-react';

interface TariffRequest {
  id: string;
  currentPlan: string;
  requestedPlan: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  date: string;
  priority: 'High' | 'Medium' | 'Low';
  requester: string;
}

interface Company {
  id: string;
  name: string;
  industry: string;
  requests: TariffRequest[];
}

export const SMERequestsTariffs: React.FC = () => {
  // Mock Data
  const allCompanies: Company[] = [
      {
          id: '1',
          name: 'TechNova Solutions Ltd.',
          industry: 'Technology',
          requests: [
              {
                  id: 'TR-992',
                  currentPlan: 'Standard Business',
                  requestedPlan: 'Enterprise Plus',
                  reason: 'Need increased API limits and dedicated support for Q4 expansion.',
                  status: 'Pending',
                  date: 'Oct 24, 2024',
                  priority: 'High',
                  requester: 'Sarah Jenkins'
              },
              {
                  id: 'TR-850',
                  currentPlan: 'Basic',
                  requestedPlan: 'Standard Business',
                  reason: 'Team grew from 5 to 12 members.',
                  status: 'Approved',
                  date: 'Jan 15, 2024',
                  priority: 'Medium',
                  requester: 'John Smith'
              }
          ]
      },
      {
          id: '2',
          name: 'GreenLeaf Logistics',
          industry: 'Logistics',
          requests: [
              {
                  id: 'TR-105',
                  currentPlan: 'Enterprise',
                  requestedPlan: 'Standard Business',
                  reason: 'Downsizing operations in European region.',
                  status: 'Pending',
                  date: 'Oct 20, 2024',
                  priority: 'Medium',
                  requester: 'Michael Chen'
              }
          ]
      },
      {
          id: '3',
          name: 'Quantum Dynamics',
          industry: 'Manufacturing',
          requests: []
      }
  ];

  // State
  const [selectedCompany, setSelectedCompany] = useState<Company>(allCompanies[0]);
  const [currentRequests, setCurrentRequests] = useState<TariffRequest[]>(allCompanies[0].requests);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  // Sync requests when company changes
  useEffect(() => {
    setCurrentRequests(selectedCompany.requests);
  }, [selectedCompany]);

  const filteredCompanies = allCompanies.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCompany = (company: Company) => {
    setSelectedCompany(company);
    setSearchTerm("");
    setShowDropdown(false);
  };

  const handleAction = (id: string, newStatus: 'Approved' | 'Rejected') => {
    setCurrentRequests(prev => prev.map(req =>
      req.id === id ? { ...req, status: newStatus } : req
    ));
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
      case 'Rejected': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
      case 'Pending': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
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
                    placeholder="Search company for tariff requests..." 
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowDropdown(true);
                    }}
                    onFocus={() => setShowDropdown(true)}
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-slate-900 dark:text-white transition-all"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    <ChevronDown size={16} />
                </div>
            </div>
            
            {showDropdown && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)}></div>
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden z-20 max-h-60 overflow-y-auto">
                        {filteredCompanies.length > 0 ? (
                            filteredCompanies.map(comp => (
                                <button
                                    key={comp.id}
                                    onClick={() => handleSelectCompany(comp)}
                                    className="w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 border-b border-slate-100 dark:border-slate-800 last:border-0 flex justify-between items-center group transition-colors"
                                >
                                    <div>
                                        <p className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{comp.name}</p>
                                        <p className="text-xs text-slate-500">{comp.industry}</p>
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

        {/* Content Area */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                        <Tag size={20} className="text-purple-500" /> 
                        Tariff Changes: {selectedCompany.name}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Viewing {currentRequests.length} plan change requests
                    </p>
                </div>
            </div>
            
            <div className="space-y-4">
                {currentRequests.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-xl">
                        <Tag size={32} className="mx-auto mb-2 opacity-50 text-slate-400" />
                        <p className="text-slate-500 dark:text-slate-400">No tariff change requests found for this company.</p>
                    </div>
                ) : (
                    currentRequests.map((req) => (
                        <div key={req.id} className="p-5 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all shadow-sm group">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                     <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs text-slate-400 font-mono">{req.id}</span>
                                        {req.priority === 'High' && (
                                            <span className="text-[10px] font-bold bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400 px-1.5 py-0.5 rounded border border-red-200 dark:border-red-900/30 flex items-center gap-1">
                                                <AlertCircle size={10} /> Urgent
                                            </span>
                                        )}
                                     </div>
                                     <div className="flex items-center gap-2 text-xs text-slate-500">
                                         <Clock size={12} /> {req.date} • Requested by {req.requester}
                                     </div>
                                </div>
                                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase border ${getStatusStyle(req.status)}`}>
                                    {req.status}
                                </span>
                            </div>
                            
                            <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-100 dark:border-slate-800 mb-4">
                                <div className="text-center flex-1">
                                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wide">Current Plan</p>
                                    <p className="font-bold text-slate-700 dark:text-slate-300 mt-1">{req.currentPlan}</p>
                                </div>
                                <div className="flex items-center justify-center px-4">
                                    <div className="p-1.5 bg-slate-200 dark:bg-slate-700 rounded-full">
                                        <ArrowRight size={16} className="text-slate-500 dark:text-slate-400" />
                                    </div>
                                </div>
                                <div className="text-center flex-1">
                                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wide">Requested Plan</p>
                                    <p className="font-bold text-indigo-600 dark:text-indigo-400 mt-1">{req.requestedPlan}</p>
                                </div>
                            </div>
                            
                            <div className="mb-4">
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1">Reason for Change</span>
                                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                    {req.reason}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-100 dark:border-slate-700/50">
                                {req.status === 'Pending' ? (
                                    <>
                                        <button 
                                            onClick={() => handleAction(req.id, 'Approved')}
                                            className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700 transition-colors shadow-sm flex items-center gap-1.5"
                                        >
                                            <CheckCircle2 size={14} /> Approve Change
                                        </button>
                                        <button 
                                            onClick={() => handleAction(req.id, 'Rejected')}
                                            className="px-4 py-2 border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors flex items-center gap-1.5"
                                        >
                                            <X size={14} /> Reject
                                        </button>
                                    </>
                                ) : (
                                    <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                                        <FileText size={14} /> Request processed. No further actions needed.
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    </div>
  );
};
