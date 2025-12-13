
import React, { useState, useEffect } from 'react';
import { CheckSquare, UserCheck, Search, ChevronDown, Check, X, AlertCircle, Clock, FileText, Building2 } from 'lucide-react';

interface RequestDetail {
  label: string;
  value: string;
}

interface ApprovalRequest {
  id: string;
  type: string;
  date: string;
  description: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  priority: 'High' | 'Medium' | 'Low';
  requester: string;
  details?: RequestDetail[];
}

interface Company {
  id: string;
  name: string;
  industry: string;
  approvals: ApprovalRequest[];
}

export const SMERequestsApprovals: React.FC = () => {
  // Mock Data
  const allCompanies: Company[] = [
      {
          id: '1',
          name: 'TechNova Solutions Ltd.',
          industry: 'Technology',
          approvals: [
              {
                  id: 'CHG-101',
                  type: 'Director Appointment',
                  date: 'Oct 24, 2024',
                  description: 'Appoint Marcus Thorne as CTO. Board resolution attached.',
                  status: 'Pending',
                  priority: 'High',
                  requester: 'Sarah Jenkins',
                  details: [
                      { label: 'New Director', value: 'Marcus Thorne' },
                      { label: 'Role', value: 'Chief Technology Officer' }
                  ]
              },
              {
                  id: 'CHG-102',
                  type: 'Address Change',
                  date: 'Oct 20, 2024',
                  description: 'Update registered office address to new HQ.',
                  status: 'Approved',
                  priority: 'Medium',
                  requester: 'Legal Dept',
                  details: [
                      { label: 'Old Address', value: '45 Old Rd' },
                      { label: 'New Address', value: '123 Innovation Blvd' }
                  ]
              }
          ]
      },
      {
          id: '2',
          name: 'GreenLeaf Logistics',
          industry: 'Logistics',
          approvals: [
              {
                  id: 'CHG-201',
                  type: 'Share Capital Increase',
                  date: 'Oct 22, 2024',
                  description: 'Increase authorized share capital by $50,000.',
                  status: 'Pending',
                  priority: 'High',
                  requester: 'Michael Chen',
                   details: [
                      { label: 'Current Capital', value: '$10,000' },
                      { label: 'New Capital', value: '$60,000' }
                  ]
              },
              {
                  id: 'CHG-202',
                  type: 'Adding Beneficiary',
                  date: 'Sep 15, 2024',
                  description: 'Addition of new UBO with 25% share.',
                  status: 'Rejected',
                  priority: 'High',
                  requester: 'Compliance Team',
                  details: [
                      { label: 'Beneficiary', value: 'John Doe' },
                      { label: 'Reason', value: 'Incomplete KYC' }
                  ]
              }
          ]
      },
      {
          id: '3',
          name: 'Quantum Dynamics',
          industry: 'Manufacturing',
          approvals: []
      }
  ];

  // State
  const [selectedCompany, setSelectedCompany] = useState<Company>(allCompanies[0]);
  const [currentApprovals, setCurrentApprovals] = useState<ApprovalRequest[]>(allCompanies[0].approvals);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  // Sync approvals when company changes
  useEffect(() => {
    setCurrentApprovals(selectedCompany.approvals);
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
    setCurrentApprovals(prev => prev.map(req =>
      req.id === id ? { ...req, status: newStatus } : req
    ));
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
      case 'Rejected': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
      case 'Pending': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800';
      default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  const getPriorityColor = (priority: string) => {
      switch(priority) {
          case 'High': return 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400';
          case 'Medium': return 'text-amber-600 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400';
          case 'Low': return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400';
          default: return 'text-slate-500';
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
                    placeholder="Search company for approvals..." 
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
                        <CheckSquare size={20} className="text-emerald-500" /> 
                        Change Approvals: {selectedCompany.name}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Viewing {currentApprovals.length} requests requiring review
                    </p>
                </div>
            </div>
            
            <div className="space-y-4">
                {currentApprovals.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-xl">
                        <UserCheck size={32} className="mx-auto mb-2 opacity-50 text-slate-400" />
                        <p className="text-slate-500 dark:text-slate-400">No approval requests found for this company.</p>
                    </div>
                ) : (
                    currentApprovals.map((req) => (
                        <div key={req.id} className="p-5 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all shadow-sm group">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-start gap-3">
                                    <div className={`mt-0.5 p-1.5 rounded-lg ${
                                        req.priority === 'High' ? 'bg-red-100 dark:bg-red-900/20' :
                                        req.priority === 'Medium' ? 'bg-amber-100 dark:bg-amber-900/20' :
                                        'bg-blue-100 dark:bg-blue-900/20'
                                    }`}>
                                        <AlertCircle size={16} className={
                                            req.priority === 'High' ? 'text-red-600 dark:text-red-400' :
                                            req.priority === 'Medium' ? 'text-amber-600 dark:text-amber-400' :
                                            'text-blue-600 dark:text-blue-400'
                                        } />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-bold text-slate-900 dark:text-white text-sm">{req.type}</h4>
                                            <span className="text-xs text-slate-400 font-mono">{req.id}</span>
                                        </div>
                                        <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                                            <Clock size={12} /> {req.date} • Requested by {req.requester}
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
                                {req.status === 'Pending' ? (
                                    <>
                                        <button 
                                            onClick={() => handleAction(req.id, 'Approved')}
                                            className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700 transition-colors shadow-sm flex items-center gap-1.5"
                                        >
                                            <Check size={14} /> Approve Request
                                        </button>
                                        <button 
                                            onClick={() => handleAction(req.id, 'Rejected')}
                                            className="px-3 py-1.5 border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors flex items-center gap-1.5"
                                        >
                                            <X size={14} /> Reject
                                        </button>
                                    </>
                                ) : (
                                    <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                                        <FileText size={14} /> Decision recorded. No further actions needed.
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
