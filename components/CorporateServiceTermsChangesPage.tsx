import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  ChevronDown, 
  Check, 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
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
  Settings
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
  Cell 
} from 'recharts';

interface TermChangeRequest {
  id: string;
  type: 'Tariff Plan' | 'Interest Rate' | 'Credit Limit' | 'Covenant Waive' | 'Service Tier';
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'Approved' | 'Rejected' | 'Under Review';
  date: string;
  requester: string;
  impactScore: number; // 0-100
}

interface CompanyTermsProfile {
  id: string;
  name: string;
  industry: string;
  currentTier: string;
  pendingChanges: number;
  avgTurnaround: string;
  requests: TermChangeRequest[];
}

export const CorporateServiceTermsChangesPage: React.FC = () => {
  // Mock Data
  const companies: CompanyTermsProfile[] = [
    {
      id: '1',
      name: 'TechNova Solutions Ltd.',
      industry: 'Technology',
      currentTier: 'Enterprise Platinum',
      pendingChanges: 2,
      avgTurnaround: '3.5h',
      requests: [
        { id: 'TR-001', type: 'Interest Rate', description: 'Request for -25bps reduction on Revolving Line CL1 due to improved AA rating.', priority: 'High', status: 'Pending', date: 'Today, 10:15 AM', requester: 'Sarah Jenkins (CEO)', impactScore: 85 },
        { id: 'TR-002', type: 'Credit Limit', description: 'Increase daily ACH transfer limit to $5M for Q4 vendor payments.', priority: 'Medium', status: 'Under Review', date: 'Yesterday', requester: 'John Smith (CFO)', impactScore: 60 },
        { id: 'TR-003', type: 'Tariff Plan', description: 'Migration to "Global Scaling" bundle for consolidated subsidiary billing.', priority: 'Low', status: 'Approved', date: 'Oct 20, 2024', requester: 'Legal Dept', impactScore: 40 }
      ]
    },
    {
      id: '2',
      name: 'GreenLeaf Logistics',
      industry: 'Logistics',
      currentTier: 'Standard Corporate',
      pendingChanges: 1,
      avgTurnaround: '2h 15m',
      requests: [
        { id: 'TR-004', type: 'Tariff Plan', description: 'Switch to High-Volume Freight tariff for peak holiday season.', priority: 'High', status: 'Under Review', date: 'Today, 08:30 AM', requester: 'Michael Chen (Ops)', impactScore: 92 },
        { id: 'TR-005', type: 'Service Tier', description: 'Enable 24/7 dedicated concierge support for international drivers.', priority: 'Medium', status: 'Rejected', date: 'Oct 22, 2024', requester: 'Michael Chen (Ops)', impactScore: 30 }
      ]
    },
    {
      id: '3',
      name: 'Quantum Dynamics',
      industry: 'Manufacturing',
      currentTier: 'Industrial Core',
      pendingChanges: 0,
      avgTurnaround: '5h 40m',
      requests: [
        { id: 'TR-006', type: 'Covenant Waive', description: 'Temporary waiver for debt-to-equity covenant during restructuring phase.', priority: 'High', status: 'Approved', date: 'Oct 15, 2024', requester: 'Board of Directors', impactScore: 98 }
      ]
    }
  ];

  const [selectedCompany, setSelectedCompany] = useState<CompanyTermsProfile>(companies[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filterType, setFilterType] = useState("All");
  const [selectedRequest, setSelectedRequest] = useState<TermChangeRequest | null>(companies[0].requests[0] || null);

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredRequests = useMemo(() => {
    return selectedCompany.requests.filter(r => 
      filterType === 'All' || r.type === filterType
    );
  }, [selectedCompany, filterType]);

  const handleSelectCompany = (company: CompanyTermsProfile) => {
    setSelectedCompany(company);
    setSearchTerm("");
    setShowDropdown(false);
    setSelectedRequest(company.requests.length > 0 ? company.requests[0] : null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
      case 'Under Review': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      case 'Pending': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800';
      case 'Rejected': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getPriorityColor = (priority: string) => {
      switch(priority) {
          case 'High': return 'text-red-600 bg-red-50 dark:bg-red-900/20';
          case 'Medium': return 'text-amber-600 bg-amber-50 dark:bg-amber-900/20';
          default: return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20';
      }
  };

  const distributionData = [
      { name: 'Interest Rate', value: selectedCompany.requests.filter(r => r.type === 'Interest Rate').length, color: '#6366f1' },
      { name: 'Tariff', value: selectedCompany.requests.filter(r => r.type === 'Tariff Plan').length, color: '#10b981' },
      { name: 'Limit', value: selectedCompany.requests.filter(r => r.type === 'Credit Limit').length, color: '#f59e0b' },
      { name: 'Other', value: selectedCompany.requests.filter(r => !['Interest Rate', 'Tariff Plan', 'Credit Limit'].includes(r.type)).length, color: '#ec4899' },
  ].filter(d => d.value > 0);

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-2 space-y-6">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <RefreshCw className="text-indigo-500" /> Changes to Terms
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
             Process requests for rate adjustments, limit increases, and service plan migrations.
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto relative z-20">
            <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search client or request ID..." 
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
                                        className="w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 border-b border-slate-100 dark:border-slate-700 last:border-0 flex justify-between items-center group transition-colors"
                                    >
                                        <div>
                                            <p className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{comp.name}</p>
                                            <p className="text-xs text-slate-500">{comp.currentTier}</p>
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
            
            <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 dark:shadow-none">
                <Plus size={18} /> New Request
            </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Current Tier</p>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white truncate">{selectedCompany.currentTier}</h3>
              <p className="text-xs text-indigo-500 font-medium mt-1 flex items-center gap-1"><Zap size={12}/> High Utilization</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Pending Changes</p>
              <h3 className={`text-2xl font-bold ${selectedCompany.pendingChanges > 0 ? 'text-amber-500' : 'text-slate-900 dark:text-white'}`}>{selectedCompany.pendingChanges} Requests</h3>
              <p className="text-xs text-slate-400 mt-1">Requiring underwriter review</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Avg. Resolution</p>
              <h3 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{selectedCompany.avgTurnaround}</h3>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1"><Clock size={12}/> Processing efficiency</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">SLA Compliance</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">98.5%</h3>
              <p className="text-xs text-emerald-500 font-medium mt-1 flex items-center gap-1"><CheckCircle2 size={12}/> Within 24h goal</p>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
          
          {/* Left Column: Requests List */}
          <div className="lg:col-span-2 flex flex-col gap-4 overflow-y-auto pr-2 pb-10">
              <div className="flex justify-between items-center mb-2 px-1">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">Active Requests</h3>
                  <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                      {['All', 'Tariff Plan', 'Interest Rate', 'Credit Limit'].map(t => (
                          <button
                            key={t}
                            onClick={() => setFilterType(t)}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                filterType === t 
                                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-sm' 
                                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                            }`}
                          >
                              {t === 'Interest Rate' ? 'Rates' : t === 'Tariff Plan' ? 'Plans' : t === 'Credit Limit' ? 'Limits' : t}
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
                                          <Settings size={20} />
                                      </div>
                                      <div>
                                          <h4 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{req.type} Adjustment</h4>
                                          <p className="text-xs text-slate-500 font-mono mt-0.5">{req.id} • {req.requester}</p>
                                      </div>
                                  </div>
                                  <div className="flex flex-col items-end gap-2">
                                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${getStatusColor(req.status)}`}>
                                          {req.status}
                                      </span>
                                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${getPriorityColor(req.priority)}`}>
                                          {req.priority} Priority
                                      </span>
                                  </div>
                              </div>

                              <div className="flex justify-between items-end">
                                  <div className="text-xs text-slate-500 space-y-1">
                                      <p className="line-clamp-1 max-w-md italic">"{req.description}"</p>
                                      <div className="flex items-center gap-2 mt-2">
                                          <Calendar size={14} className="text-slate-400" />
                                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Submitted: {req.date}</span>
                                      </div>
                                  </div>
                                  <div className="text-right">
                                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">Impact Score</p>
                                      <div className="flex items-center gap-2">
                                          <div className="w-24 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                              <div className={`h-full ${req.impactScore > 75 ? 'bg-red-500' : 'bg-indigo-500'}`} style={{width: `${req.impactScore}%`}}></div>
                                          </div>
                                          <span className="text-sm font-bold text-slate-900 dark:text-white">{req.impactScore}</span>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      ))}
                  </div>
              ) : (
                  <div className="text-center py-16 text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                      <RefreshCw size={48} className="mx-auto mb-2 opacity-30" />
                      <p className="font-medium">No term change requests found.</p>
                  </div>
              )}
          </div>

          {/* Right Column: Workflow & Details */}
          <div className="space-y-6">
              {selectedRequest ? (
                  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col h-full animate-in slide-in-from-right duration-300">
                      <div className="flex justify-between items-start mb-6">
                          <div>
                              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Request Breakdown</h3>
                              <p className="text-xs text-slate-500">REF: {selectedRequest.id}</p>
                          </div>
                          <button onClick={() => setSelectedRequest(null)} className="md:hidden text-slate-400 p-1 hover:bg-slate-100 rounded-lg transition-colors"><X size={20} /></button>
                      </div>

                      <div className="space-y-6 flex-1">
                          {/* Distribution Overview */}
                          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 flex flex-col gap-4 shadow-inner overflow-hidden relative h-48">
                                <div className="flex justify-between items-center relative z-10">
                                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide">Change Distribution</h4>
                                </div>
                                <div className="flex-1 w-full relative z-10">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={distributionData}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                                            <XAxis dataKey="name" hide />
                                            <YAxis hide />
                                            <Tooltip cursor={{fill: 'transparent'}} />
                                            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                                {distributionData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                          </div>

                          {/* Request Details */}
                          <div>
                              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-4">Request Log</h4>
                              <div className="space-y-4">
                                  <div className="flex gap-3">
                                      <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg h-fit">
                                          <User size={16} />
                                      </div>
                                      <div>
                                          <p className="text-xs font-bold text-slate-900 dark:text-white">{selectedRequest.requester}</p>
                                          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                                              {selectedRequest.description}
                                          </p>
                                      </div>
                                  </div>
                                  <div className="flex gap-3">
                                      <div className="p-2 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg h-fit">
                                          <Shield size={16} />
                                      </div>
                                      <div>
                                          <p className="text-xs font-bold text-slate-900 dark:text-white">System Policy Check</p>
                                          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                                              Request complies with corporate tier guidelines for {selectedRequest.type}. Impact Score: {selectedRequest.impactScore}.
                                          </p>
                                      </div>
                                  </div>
                              </div>
                          </div>

                          {/* Action Bar */}
                          <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-700 space-y-3">
                              <div className="grid grid-cols-2 gap-3">
                                  <button className="py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all active:scale-95 shadow-sm flex items-center justify-center gap-2">
                                      <CheckCircle2 size={16} /> Approve
                                  </button>
                                  <button className="py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95 shadow-sm">
                                      Reject
                                  </button>
                              </div>
                              <button className="w-full py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-sm">
                                  <FileText size={16} /> Request Memo
                              </button>
                              <button className="w-full py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center gap-2">
                                  <Download size={16} /> Export Analysis
                              </button>
                          </div>
                      </div>
                  </div>
              ) : (
                  <div className="bg-slate-50 dark:bg-slate-900/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 p-8 flex flex-col items-center justify-center text-center h-full text-slate-400">
                      <TrendingUp size={48} className="mb-4 opacity-20" />
                      <p className="font-medium">Select a term change request to view details</p>
                  </div>
              )}
          </div>
      </div>
    </div>
  );
};
