
import React, { useState, useEffect } from 'react';
import { AlertTriangle, MessageCircle, Search, ChevronDown, Check, AlertCircle as AlertIcon, Clock, CheckCircle2, ArrowUpRight, MoreHorizontal, ShieldAlert, XCircle } from 'lucide-react';

interface Complaint {
  id: string;
  title: string;
  description: string;
  date: string;
  status: 'New' | 'In Progress' | 'Resolved' | 'Escalated' | 'Closed';
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  category: 'Service' | 'Technical' | 'Billing' | 'Compliance';
  reporter: string;
  ticketId: string;
}

interface Company {
  id: string;
  name: string;
  industry: string;
  complaints: Complaint[];
}

export const SMERequestsComplaints: React.FC = () => {
  // Mock Data
  const allCompanies: Company[] = [
      {
          id: '1',
          name: 'TechNova Solutions Ltd.',
          industry: 'Technology',
          complaints: [
              {
                  id: 'CMP-101',
                  ticketId: 'TKT-9921',
                  title: 'API Latency & Timeouts',
                  description: 'Experiencing severe latency on the payment API endpoints during peak hours. This is affecting our checkout conversion rates.',
                  date: 'Oct 24, 2024',
                  status: 'In Progress',
                  priority: 'High',
                  category: 'Technical',
                  reporter: 'Marcus Thorne (CTO)'
              },
              {
                  id: 'CMP-102',
                  ticketId: 'TKT-8820',
                  title: 'Incorrect Billing Tier Applied',
                  description: 'We were charged for the Enterprise tier this month despite downgrading to Pro on the 1st.',
                  date: 'Oct 20, 2024',
                  status: 'New',
                  priority: 'Medium',
                  category: 'Billing',
                  reporter: 'Sarah Jenkins (CEO)'
              }
          ]
      },
      {
          id: '2',
          name: 'GreenLeaf Logistics',
          industry: 'Logistics',
          complaints: [
              {
                  id: 'CMP-201',
                  ticketId: 'TKT-7711',
                  title: 'Service Interruption - Payment Gateway',
                  description: 'Complete outage of the POS terminals in the Chicago warehouse. Drivers cannot process payments on delivery.',
                  date: 'Oct 25, 2024',
                  status: 'Escalated',
                  priority: 'Critical',
                  category: 'Service',
                  reporter: 'Michael Chen (Ops)'
              },
               {
                  id: 'CMP-202',
                  ticketId: 'TKT-7715',
                  title: 'Data Privacy Concern',
                  description: 'Requesting audit log for user access on Oct 15th due to suspicious login attempt alerts.',
                  date: 'Oct 18, 2024',
                  status: 'Resolved',
                  priority: 'High',
                  category: 'Compliance',
                  reporter: 'Compliance Officer'
              }
          ]
      },
      {
          id: '3',
          name: 'Quantum Dynamics',
          industry: 'Manufacturing',
          complaints: []
      }
  ];

  // State
  const [selectedCompany, setSelectedCompany] = useState<Company>(allCompanies[0]);
  const [currentComplaints, setCurrentComplaints] = useState<Complaint[]>(allCompanies[0].complaints);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  // Sync complaints when company changes
  useEffect(() => {
    setCurrentComplaints(selectedCompany.complaints);
  }, [selectedCompany]);

  const filteredCompanies = allCompanies.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCompany = (company: Company) => {
    setSelectedCompany(company);
    setSearchTerm("");
    setShowDropdown(false);
  };

  const handleAction = (id: string, newStatus: Complaint['status']) => {
    setCurrentComplaints(prev => prev.map(req =>
      req.id === id ? { ...req, status: newStatus } : req
    ));
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Resolved': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
      case 'Escalated': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
      case 'In Progress': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800';
      case 'New': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      case 'Closed': return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700';
      default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  const getPriorityIcon = (priority: string) => {
      switch(priority) {
          case 'Critical': return <ShieldAlert size={16} className="text-red-600" />;
          case 'High': return <AlertIcon size={16} className="text-orange-500" />;
          case 'Medium': return <AlertIcon size={16} className="text-amber-500" />;
          default: return <Clock size={16} className="text-blue-500" />;
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
                    placeholder="Search company for complaints..." 
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
                        <AlertTriangle size={20} className="text-red-500" /> 
                        Complaints & Issues: {selectedCompany.name}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Viewing {currentComplaints.length} active records
                    </p>
                </div>
            </div>
            
            <div className="space-y-4">
                {currentComplaints.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-xl">
                        <CheckCircle2 size={32} className="mx-auto mb-2 opacity-50 text-emerald-500" />
                        <p className="text-slate-500 dark:text-slate-400">No active complaints found for this company.</p>
                    </div>
                ) : (
                    currentComplaints.map((item) => (
                        <div key={item.id} className={`p-5 border rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all shadow-sm group ${
                            item.priority === 'Critical' ? 'border-red-200 dark:border-red-900/50 bg-red-50/10' : 'border-slate-200 dark:border-slate-700'
                        }`}>
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-start gap-3">
                                    <div className="mt-1">
                                        {getPriorityIcon(item.priority)}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xs font-mono text-slate-400">{item.ticketId}</span>
                                            <span className="text-xs font-bold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded">{item.category}</span>
                                        </div>
                                        <h4 className="font-bold text-slate-900 dark:text-white text-base">{item.title}</h4>
                                        <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                                            Reported by {item.reporter} • {item.date}
                                        </p>
                                    </div>
                                </div>
                                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase border ${getStatusStyle(item.status)}`}>
                                    {item.status}
                                </span>
                            </div>
                            
                            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 pl-8 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800/50">
                                {item.description}
                            </p>

                            <div className="flex flex-wrap gap-2 pl-8 pt-2">
                                {item.status === 'New' && (
                                    <button 
                                        onClick={() => handleAction(item.id, 'In Progress')}
                                        className="px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-1.5"
                                    >
                                        <MessageCircle size={14} /> Acknowledge
                                    </button>
                                )}
                                
                                {(item.status === 'New' || item.status === 'In Progress') && (
                                    <>
                                        <button 
                                            onClick={() => handleAction(item.id, 'Resolved')}
                                            className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700 transition-colors shadow-sm flex items-center gap-1.5"
                                        >
                                            <CheckCircle2 size={14} /> Resolve
                                        </button>
                                        <button 
                                            onClick={() => handleAction(item.id, 'Escalated')}
                                            className="px-3 py-1.5 border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors flex items-center gap-1.5"
                                        >
                                            <ArrowUpRight size={14} /> Escalate
                                        </button>
                                    </>
                                )}
                                
                                {item.status === 'Resolved' && (
                                    <button 
                                        onClick={() => handleAction(item.id, 'Closed')}
                                        className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
                                    >
                                        <XCircle size={14} /> Close Ticket
                                    </button>
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
