
import React, { useState, useEffect } from 'react';
import { Building2, ArrowRight, Search, Check, Clock, FileText, CheckCircle2, XCircle, AlertCircle, ChevronDown, MoreHorizontal } from 'lucide-react';

interface RequestDetail {
  label: string;
  value: string;
}

interface Request {
  id: string;
  type: string;
  status: 'New' | 'In Progress' | 'Completed' | 'Pending Docs' | 'Rejected';
  date: string;
  description: string;
  details?: RequestDetail[];
  priority: 'High' | 'Medium' | 'Low';
}

interface Company {
  id: string;
  name: string;
  industry: string;
  requests: Request[];
}

export const SMERequestsCompany: React.FC = () => {
  // Mock Data
  const allCompanies: Company[] = [
    {
      id: '1',
      name: 'TechNova Solutions Ltd.',
      industry: 'Technology',
      requests: [
        {
          id: 'REQ-101',
          type: 'Update Legal Address',
          status: 'New',
          date: 'Oct 24, 2024',
          priority: 'Medium',
          description: 'Request to update registered office address due to relocation.',
          details: [
             { label: 'Current Address', value: '123 Old St, Tech Park' },
             { label: 'New Address', value: '456 Innovation Dr, Cyber City' }
          ]
        },
        {
          id: 'REQ-102',
          type: 'Add Signatory',
          status: 'In Progress',
          date: 'Oct 20, 2024',
          priority: 'High',
          description: 'Adding CFO John Smith as an authorized signatory for accounts.',
        }
      ]
    },
    {
      id: '2',
      name: 'GreenLeaf Logistics',
      industry: 'Logistics',
      requests: [
         {
          id: 'REQ-201',
          type: 'Change of Directors',
          status: 'Pending Docs',
          date: 'Oct 22, 2024',
          priority: 'High',
          description: 'Appointment of new director Michael Chen. Waiting for ID proofs.',
        },
        {
          id: 'REQ-202',
          type: 'Trade Name Update',
          status: 'Completed',
          date: 'Sep 15, 2024',
          priority: 'Low',
          description: 'Updated trade name from GL Transport to GreenLeaf Logistics.',
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
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentRequests, setCurrentRequests] = useState<Request[]>(allCompanies[0].requests);

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

  const updateRequestStatus = (id: string, newStatus: Request['status']) => {
    setCurrentRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: newStatus } : req
    ));
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'New': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      case 'In Progress': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800';
      case 'Pending Docs': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800';
      case 'Completed': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
      case 'Rejected': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
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
                    placeholder="Search company..." 
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
                        <Building2 size={20} className="text-blue-500" /> 
                        {selectedCompany.name}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Viewing {currentRequests.length} requests
                    </p>
                </div>
                
                {/* Stats Summary */}
                <div className="flex gap-3">
                   <div className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
                      <span className="text-xs text-slate-500 block">Pending</span>
                      <span className="font-bold text-slate-900 dark:text-white">{currentRequests.filter(r => r.status !== 'Completed' && r.status !== 'Rejected').length}</span>
                   </div>
                   <div className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
                      <span className="text-xs text-slate-500 block">Completed</span>
                      <span className="font-bold text-slate-900 dark:text-white">{currentRequests.filter(r => r.status === 'Completed').length}</span>
                   </div>
                </div>
            </div>
            
            <div className="space-y-4">
                {currentRequests.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-xl">
                        <FileText size={32} className="mx-auto mb-2 opacity-50 text-slate-400" />
                        <p className="text-slate-500 dark:text-slate-400">No requests found for this company.</p>
                    </div>
                ) : (
                    currentRequests.map((req) => (
                        <div key={req.id} className="p-5 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all shadow-sm group">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-start gap-3">
                                    <div className={`mt-0.5 p-1.5 rounded-lg ${
                                        req.priority === 'High' ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400' :
                                        req.priority === 'Medium' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400' :
                                        'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                                    }`}>
                                        <AlertCircle size={16} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-bold text-slate-900 dark:text-white text-sm">{req.type}</h4>
                                            <span className="text-xs text-slate-400 font-mono">{req.id}</span>
                                        </div>
                                        <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                                            <Clock size={12} /> {req.date}
                                        </p>
                                    </div>
                                </div>
                                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase border ${getStatusStyle(req.status)}`}>
                                    {req.status}
                                </span>
                            </div>
                            
                            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 pl-11">
                                {req.description}
                            </p>

                            {/* Details Grid */}
                            {req.details && (
                                <div className="ml-11 mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                                    {req.details.map((detail, idx) => (
                                        <div key={idx} className="flex items-center gap-2">
                                            <span className="text-xs font-bold text-slate-500 uppercase">{detail.label}:</span>
                                            <span className="text-xs font-medium text-slate-900 dark:text-white">{detail.value}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                            
                            <div className="flex flex-wrap gap-2 pl-11 pt-2 border-t border-slate-100 dark:border-slate-700/50 mt-2">
                                {req.status === 'New' || req.status === 'In Progress' ? (
                                    <>
                                        <button 
                                            onClick={() => updateRequestStatus(req.id, 'In Progress')}
                                            className="px-3 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 transition-colors shadow-sm flex items-center gap-1.5"
                                        >
                                            <CheckCircle2 size={14} /> Process Request
                                        </button>
                                        <button 
                                            onClick={() => updateRequestStatus(req.id, 'Pending Docs')}
                                            className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
                                        >
                                            <FileText size={14} /> Request Docs
                                        </button>
                                        <button 
                                            onClick={() => updateRequestStatus(req.id, 'Rejected')}
                                            className="px-3 py-1.5 border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors flex items-center gap-1.5"
                                        >
                                            <XCircle size={14} /> Reject
                                        </button>
                                    </>
                                ) : req.status === 'Pending Docs' ? (
                                    <button 
                                        onClick={() => updateRequestStatus(req.id, 'In Progress')}
                                        className="px-3 py-1.5 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 text-xs font-bold rounded-lg hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors flex items-center gap-1.5"
                                    >
                                        Docs Received (Resume)
                                    </button>
                                ) : (
                                    <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                                        <CheckCircle2 size={14} /> No further actions available
                                    </div>
                                )}
                                <div className="ml-auto">
                                    <button className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded hover:bg-slate-100 dark:hover:bg-slate-800">
                                        <MoreHorizontal size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    </div>
  );
};
