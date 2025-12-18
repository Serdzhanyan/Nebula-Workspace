import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  ChevronDown, 
  Check, 
  Package, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  MoreHorizontal, 
  RefreshCw, 
  X, 
  TrendingUp, 
  ArrowRight, 
  Zap, 
  Shield, 
  User, 
  Calendar,
  Layers,
  MessageSquare,
  FileCheck,
  CreditCard,
  Landmark,
  Globe
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  Cell,
  PieChart,
  Pie
} from 'recharts';

interface RequestStep {
  id: string;
  name: string;
  status: 'Completed' | 'Current' | 'Pending' | 'Flagged';
  date?: string;
}

interface ServiceRequest {
  id: string;
  type: 'Credit Line' | 'Escrow Account' | 'Virtual Cards' | 'Acquiring POS' | 'FX Facility';
  subject: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'New' | 'Under Review' | 'Pending Docs' | 'Approved' | 'Rejected';
  date: string;
  requester: string;
  estimatedValue: string;
  workflow: RequestStep[];
}

interface CompanyRequestProfile {
  id: string;
  name: string;
  industry: string;
  totalRequests: number;
  avgSLA: string;
  trustScore: number;
  requests: ServiceRequest[];
}

export const CorporateNewServiceRequestsPage: React.FC = () => {
  // Mock Data
  const companies: CompanyRequestProfile[] = [
    {
      id: '1',
      name: 'TechNova Solutions Ltd.',
      industry: 'Technology',
      totalRequests: 12,
      avgSLA: '4.5h',
      trustScore: 92,
      requests: [
        { 
          id: 'SR-101', 
          type: 'Credit Line', 
          subject: 'Expansion Capital Request', 
          description: 'Requesting a $2M increase to existing revolving credit line for European hardware rollout.', 
          priority: 'High', 
          status: 'Under Review', 
          date: 'Today, 10:15 AM', 
          requester: 'Sarah Jenkins', 
          estimatedValue: '$2,000,000',
          workflow: [
            { id: 'w1', name: 'Identity Check', status: 'Completed', date: 'Oct 24' },
            { id: 'w2', name: 'Credit Scoring', status: 'Completed', date: 'Oct 24' },
            { id: 'w3', name: 'Underwriter Review', status: 'Current' },
            { id: 'w4', name: 'Final Sign-off', status: 'Pending' }
          ]
        },
        { 
          id: 'SR-102', 
          type: 'Virtual Cards', 
          subject: 'Team Expense Management', 
          description: 'Issuance of 25 virtual cards for the engineering department with $5k monthly limits.', 
          priority: 'Medium', 
          status: 'New', 
          date: 'Today, 08:30 AM', 
          requester: 'Marcus Thorne', 
          estimatedValue: '$125,000/mo',
          workflow: [
            { id: 'w5', name: 'Validation', status: 'Current' },
            { id: 'w6', name: 'Issuance', status: 'Pending' }
          ]
        },
        { 
          id: 'SR-103', 
          type: 'Escrow Account', 
          subject: 'Acquisition Settlement', 
          description: 'Setting up a temporary escrow account for the final settlement of a subsidiary purchase.', 
          priority: 'High', 
          status: 'Pending Docs', 
          date: 'Yesterday', 
          requester: 'Legal Team', 
          estimatedValue: '$5,000,000',
          workflow: [
            { id: 'w7', name: 'Structure Review', status: 'Completed', date: 'Oct 23' },
            { id: 'w8', name: 'Kyb Compliance', status: 'Flagged' },
            { id: 'w9', name: 'Opening', status: 'Pending' }
          ]
        }
      ]
    },
    {
      id: '2',
      name: 'GreenLeaf Logistics',
      industry: 'Logistics',
      totalRequests: 4,
      avgSLA: '2h',
      trustScore: 85,
      requests: [
        { 
          id: 'SR-201', 
          type: 'Acquiring POS', 
          subject: 'Warehouse POS Deployment', 
          description: 'Request for 10 SmartPOS X5 terminals for new Chicago distribution center.', 
          priority: 'Medium', 
          status: 'Approved', 
          date: 'Oct 22, 2024', 
          requester: 'Michael Chen', 
          estimatedValue: '$12k/mo volume',
          workflow: [
            { id: 'w10', name: 'Order Processing', status: 'Completed', date: 'Oct 22' },
            { id: 'w11', name: 'Shipping', status: 'Completed', date: 'Oct 23' }
          ]
        }
      ]
    },
    {
      id: '3',
      name: 'Quantum Dynamics',
      industry: 'Manufacturing',
      totalRequests: 0,
      avgSLA: '-',
      trustScore: 78,
      requests: []
    }
  ];

  const [selectedCompany, setSelectedCompany] = useState<CompanyRequestProfile>(companies[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(companies[0].requests[0] || null);

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredRequests = useMemo(() => {
    return selectedCompany.requests.filter(r => 
      filterStatus === 'All' || r.status === filterStatus
    );
  }, [selectedCompany, filterStatus]);

  const handleSelectCompany = (company: CompanyRequestProfile) => {
    setSelectedCompany(company);
    setSearchTerm("");
    setShowDropdown(false);
    setSelectedRequest(company.requests.length > 0 ? company.requests[0] : null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
      case 'Under Review': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      case 'New': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800';
      case 'Pending Docs': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800';
      case 'Rejected': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getTypeIcon = (type: string) => {
      switch(type) {
          case 'Credit Line': return <Landmark size={20} />;
          case 'Virtual Cards': return <CreditCard size={20} />;
          case 'Escrow Account': return <Shield size={20} />;
          case 'Acquiring POS': return <Zap size={20} />;
          case 'FX Facility': return <Globe size={20} />;
          default: return <Package size={20} />;
      }
  };

  const pieData = [
      { name: 'Financial', value: selectedCompany.requests.filter(r => r.type === 'Credit Line' || r.type === 'FX Facility').length, color: '#6366f1' },
      { name: 'Operational', value: selectedCompany.requests.filter(r => r.type === 'Virtual Cards' || r.type === 'Acquiring POS').length, color: '#10b981' },
      { name: 'Legal/Escrow', value: selectedCompany.requests.filter(r => r.type === 'Escrow Account').length, color: '#f59e0b' },
  ].filter(d => d.value > 0);

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-2 space-y-6">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-1">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Plus className="text-indigo-500" /> New Service Requests
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
             Process client applications for new products, accounts, and facilities.
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto relative z-20">
            <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search by company or request ID..." 
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowDropdown(true);
                    }}
                    onFocus={() => setShowDropdown(true)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-slate-900 dark:text-white transition-all shadow-sm focus:bg-white dark:focus:bg-slate-900"
                />
                
                {showDropdown && (
                    <>
                        <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)}></div>
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden z-20 max-h-60 overflow-y-auto animate-in zoom-in-95 duration-200">
                            {filteredCompanies.length > 0 ? (
                                filteredCompanies.map(comp => (
                                    <button
                                        key={comp.id}
                                        onClick={() => handleSelectCompany(comp)}
                                        className="w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 border-b border-slate-100 dark:border-slate-800 last:border-0 flex justify-between items-center group transition-colors"
                                    >
                                        <div>
                                            <p className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{comp.name}</p>
                                            <p className="text-xs text-slate-500">{comp.industry} • {comp.totalRequests} Requests</p>
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
            
            <button className="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">
                <Download size={18} />
            </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Open Requests</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedCompany.requests.filter(r => r.status !== 'Approved' && r.status !== 'Rejected').length}</h3>
              <p className="text-xs text-indigo-500 font-medium mt-1 flex items-center gap-1"><TrendingUp size={12}/> High Volume Month</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Avg. Resolution</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedCompany.avgSLA}</h3>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1"><Clock size={12}/> Within SLA limits</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Trust Score</p>
              <h3 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{selectedCompany.trustScore}%</h3>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-indigo-500" style={{ width: `${selectedCompany.trustScore}%` }}></div>
              </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Awaiting Signature</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {selectedCompany.requests.filter(r => r.status === 'Under Review').length}
              </h3>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1"><AlertCircle size={12}/> Final check</p>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
          
          {/* Left Column: Request List */}
          <div className="lg:col-span-2 flex flex-col gap-4 overflow-y-auto pr-2 pb-10">
              <div className="flex justify-between items-center mb-2 px-1">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">Recent Applications</h3>
                  <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                      {['All', 'New', 'Under Review', 'Pending Docs', 'Approved'].map(t => (
                          <button
                            key={t}
                            onClick={() => setFilterStatus(t)}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                filterStatus === t 
                                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-sm' 
                                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                            }`}
                          >
                              {t === 'Under Review' ? 'Review' : t === 'Pending Docs' ? 'Docs' : t}
                          </button>
                      ))}
                  </div>
              </div>

              {filteredRequests.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                      {filteredRequests.map(req => (
                          <div 
                            key={req.id} 
                            onClick={() => setSelectedRequest(req)}
                            className={`bg-white dark:bg-slate-900 p-5 rounded-2xl border transition-all cursor-pointer group hover:shadow-md relative overflow-hidden ${
                                selectedRequest?.id === req.id 
                                ? 'border-indigo-500 ring-1 ring-indigo-500 shadow-md' 
                                : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700'
                            }`}
                          >
                              <div className="flex justify-between items-start mb-4">
                                  <div className="flex items-center gap-3">
                                      <div className={`p-2.5 rounded-xl ${
                                          req.status === 'Approved' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30' :
                                          'bg-slate-100 text-slate-600 dark:bg-slate-800'
                                      }`}>
                                          {getTypeIcon(req.type)}
                                      </div>
                                      <div>
                                          <h4 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{req.subject}</h4>
                                          <p className="text-xs text-slate-500 font-mono mt-0.5">{req.id} • {req.type}</p>
                                      </div>
                                  </div>
                                  <div className="flex flex-col items-end gap-2">
                                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${getStatusColor(req.status)}`}>
                                          {req.status}
                                      </span>
                                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                          req.priority === 'High' ? 'bg-red-50 text-red-600 dark:bg-red-900/20' : 
                                          'bg-slate-50 text-slate-500 border-slate-100 dark:bg-slate-800'
                                      }`}>
                                          {req.priority} Priority
                                      </span>
                                  </div>
                              </div>

                              <div className="flex justify-between items-end">
                                  <div className="text-xs text-slate-500 space-y-1">
                                      <p>Requester: <span className="font-medium text-slate-700 dark:text-slate-300">{req.requester}</span></p>
                                      <div className="flex items-center gap-2 mt-2">
                                         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Workflow Progress</span>
                                         <div className="w-24 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                             <div 
                                                className={`h-full ${req.status === 'Approved' ? 'bg-emerald-500' : 'bg-indigo-500'}`} 
                                                style={{ width: `${(req.workflow.filter(w => w.status === 'Completed').length / req.workflow.length) * 100}%` }}
                                             />
                                         </div>
                                      </div>
                                  </div>
                                  <div className="text-right">
                                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">Value Est.</p>
                                      <p className="text-xl font-bold text-slate-900 dark:text-white">{req.estimatedValue}</p>
                                  </div>
                              </div>
                          </div>
                      ))}
                  </div>
              ) : (
                  <div className="text-center py-16 text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                      <Package size={48} className="mx-auto mb-2 opacity-30" />
                      <p className="font-medium">No requests match the current filter.</p>
                  </div>
              )}
          </div>

          {/* Right Column: Request Details & Workflow */}
          <div className="space-y-6">
              {selectedRequest ? (
                  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col h-full animate-in slide-in-from-right duration-300">
                      <div className="flex justify-between items-start mb-6">
                          <div>
                              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Audit & Review</h3>
                              <p className="text-xs text-slate-500">REF: {selectedRequest.id}</p>
                          </div>
                          <button onClick={() => setSelectedRequest(null)} className="md:hidden text-slate-400"><X size={20} /></button>
                      </div>

                      <div className="space-y-8 flex-1">
                          {/* Description Box */}
                          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 shadow-inner">
                              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Request Overview</p>
                              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">"{selectedRequest.description}"</p>
                          </div>

                          {/* Stepper */}
                          <div className="relative pl-6 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100 dark:before:bg-slate-800">
                              {selectedRequest.workflow.map((step) => (
                                  <div key={step.id} className="relative group">
                                      <div className={`absolute -left-[31px] top-0 w-6 h-6 rounded-full border-4 border-white dark:border-slate-900 z-10 flex items-center justify-center transition-all ${
                                          step.status === 'Completed' ? 'bg-emerald-500 shadow-sm shadow-emerald-500/50' :
                                          step.status === 'Current' ? 'bg-indigo-600 animate-pulse ring-4 ring-indigo-500/20' :
                                          step.status === 'Flagged' ? 'bg-red-500 shadow-sm shadow-red-500/50' :
                                          'bg-slate-200 dark:bg-slate-800'
                                      }`}>
                                          {step.status === 'Completed' && <Check size={10} className="text-white" />}
                                          {step.status === 'Flagged' && <AlertCircle size={10} className="text-white" />}
                                      </div>
                                      
                                      <div>
                                          <div className="flex justify-between items-baseline mb-0.5">
                                              <p className={`text-sm font-bold ${
                                                  step.status === 'Completed' ? 'text-slate-900 dark:text-white' :
                                                  step.status === 'Current' ? 'text-indigo-600 dark:text-indigo-400' :
                                                  'text-slate-400'
                                              }`}>
                                                  {step.name}
                                              </p>
                                              {step.date && <span className="text-[10px] text-slate-400 font-medium">{step.date}</span>}
                                          </div>
                                      </div>
                                  </div>
                              ))}
                          </div>

                          {/* Action Bar */}
                          <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-700 space-y-3">
                              <div className="grid grid-cols-2 gap-3">
                                  <button className="py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all active:scale-95 shadow-sm flex items-center justify-center gap-2">
                                      <FileCheck size={16} /> Approve
                                  </button>
                                  <button className="py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95 shadow-sm">
                                      Reject
                                  </button>
                              </div>
                              <button className="w-full py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-sm">
                                  <MessageSquare size={16} /> Message Client
                              </button>
                              <button className="w-full py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center gap-2">
                                  <Download size={16} /> Export Dossier
                              </button>
                          </div>
                      </div>
                  </div>
              ) : (
                  <div className="bg-slate-50 dark:bg-slate-900/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 p-8 flex flex-col items-center justify-center text-center h-full text-slate-400">
                      <Layers size={48} className="mb-4 opacity-20" />
                      <p className="font-medium">Select a service request to view verification steps</p>
                  </div>
              )}
          </div>
      </div>
    </div>
  );
};
