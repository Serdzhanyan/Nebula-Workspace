import React, { useState } from 'react';
/* Added missing X and RefreshCw imports */
/* Fixed: Added missing DollarSign import */
import { Search, Filter, Download, ShieldCheck, CheckCircle2, XCircle, Clock, AlertTriangle, FileText, ChevronRight, User, Building2, Gavel, MoreHorizontal, Plus, ChevronDown, Check, Eye, Send, FileSignature, X, RefreshCw, Layers, ShieldAlert, Fingerprint, DollarSign } from 'lucide-react';

interface VerificationStage {
  id: string;
  name: string;
  status: 'Passed' | 'Pending' | 'Flagged' | 'Reviewing';
  actor?: string;
  timestamp?: string;
  notes?: string;
}

interface VerificationRequest {
  id: string;
  reference: string;
  type: 'Transaction' | 'Profile Change' | 'New Onboarding' | 'Limit Increase';
  subject: string;
  amount?: string;
  priority: 'Urgent' | 'High' | 'Normal';
  dateSubmitted: string;
  currentStage: string;
  status: 'In Progress' | 'Blocked' | 'Completed' | 'Rejected';
  stages: VerificationStage[];
}

interface CompanyVerificationProfile {
  id: string;
  name: string;
  industry: string;
  pendingCount: number;
  avgCompletionTime: string;
  securityTier: 'Standard' | 'Enhanced' | 'Strict';
  requests: VerificationRequest[];
}

export const CorporateVerificationPage: React.FC = () => {
  // Mock Data
  const companies: CompanyVerificationProfile[] = [
    {
      id: '1',
      name: 'TechNova Solutions Ltd.',
      industry: 'Technology',
      pendingCount: 3,
      /* Fixed: Removed non-existent property avgCompletionNumber based on interface definition */
      avgCompletionTime: '4.2h',
      securityTier: 'Enhanced',
      requests: [
        {
          id: 'VR-8821',
          reference: 'TX-55092',
          type: 'Transaction',
          subject: 'Outbound Wire: $1.2M to Global Chips',
          amount: '$1,200,000',
          priority: 'High',
          dateSubmitted: 'Oct 24, 09:00 AM',
          currentStage: 'Security Review',
          status: 'In Progress',
          stages: [
            { id: 'v1', name: 'AML Clearance', status: 'Passed', actor: 'System', timestamp: 'Oct 24, 09:05 AM', notes: 'No watchlist matches found.' },
            { id: 'v2', name: 'Compliance Review', status: 'Passed', actor: 'Sarah Jenkins', timestamp: 'Oct 24, 10:30 AM', notes: 'Supporting invoice verified.' },
            { id: 'v3', name: 'Security Review', status: 'Reviewing', actor: 'Michael Chen', notes: 'Verifying beneficiary bank details.' },
            { id: 'v4', name: 'Executive Approval', status: 'Pending' }
          ]
        },
        {
          id: 'VR-8822',
          reference: 'CHG-992',
          type: 'Profile Change',
          subject: 'CEO Change: Sarah Jenkins to Marcus Thorne',
          priority: 'Urgent',
          dateSubmitted: 'Oct 24, 11:45 AM',
          currentStage: 'Compliance Review',
          status: 'In Progress',
          stages: [
            { id: 'v5', name: 'Document Verification', status: 'Passed', actor: 'System', timestamp: 'Oct 24, 12:00 PM' },
            { id: 'v6', name: 'Compliance Review', status: 'Reviewing', actor: 'Emily Davis' },
            { id: 'v7', name: 'Security Review', status: 'Pending' },
            { id: 'v8', name: 'Board Audit', status: 'Pending' }
          ]
        }
      ]
    },
    {
      id: '2',
      name: 'GreenLeaf Logistics',
      industry: 'Logistics',
      pendingCount: 1,
      avgCompletionTime: '2.5h',
      securityTier: 'Standard',
      requests: [
        {
          id: 'VR-7711',
          reference: 'LIM-004',
          type: 'Limit Increase',
          subject: 'Daily Transfer Limit: $150k -> $500k',
          priority: 'Normal',
          dateSubmitted: 'Oct 25, 10:15 AM',
          currentStage: 'Risk Assessment',
          status: 'Blocked',
          stages: [
            { id: 'v9', name: 'Internal Audit', status: 'Passed', actor: 'John Smith', timestamp: 'Oct 25, 10:30 AM' },
            { id: 'v10', name: 'Risk Assessment', status: 'Flagged', actor: 'System', notes: 'Historical volume does not support requested limit.' },
            { id: 'v11', name: 'Manual Review', status: 'Pending' }
          ]
        }
      ]
    },
    {
      id: '3',
      name: 'Quantum Dynamics',
      industry: 'Manufacturing',
      pendingCount: 0,
      avgCompletionTime: '6.1h',
      securityTier: 'Strict',
      requests: []
    }
  ];

  const [selectedCompany, setSelectedCompany] = useState<CompanyVerificationProfile>(companies[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<VerificationRequest | null>(companies[0].requests[0] || null);
  const [filterType, setFilterType] = useState("All");

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCompany = (company: CompanyVerificationProfile) => {
    setSelectedCompany(company);
    setSearchTerm("");
    setShowDropdown(false);
    setSelectedRequest(company.requests.length > 0 ? company.requests[0] : null);
  };

  const getStatusColor = (status: string) => {
      switch(status) {
          case 'Completed': 
          case 'Passed': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
          case 'In Progress':
          case 'Reviewing': return 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800';
          case 'Blocked': 
          case 'Flagged': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
          case 'Pending': return 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700';
          default: return 'bg-slate-100 text-slate-700';
      }
  };

  const getPriorityColor = (priority: string) => {
      switch(priority) {
          case 'Urgent': return 'text-red-600 bg-red-50 dark:bg-red-900/20';
          case 'High': return 'text-orange-600 bg-orange-50 dark:bg-orange-900/20';
          default: return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20';
      }
  };

  const filteredRequests = selectedCompany.requests.filter(r => filterType === "All" || r.type === filterType);

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-2 space-y-6">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="text-indigo-500" /> Multi-Stage Verification
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
             Verify complex operations through cross-departmental approval workflows.
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto relative z-20">
            <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search company or verification ID..." 
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowDropdown(true);
                    }}
                    onFocus={() => setShowDropdown(true)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-slate-900 dark:text-white transition-all"
                />
                
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
                                            <p className="text-xs text-slate-500">{comp.industry} • Security: {comp.securityTier}</p>
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
                <ShieldCheck size={18} /> Verification Settings
            </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Queue Size</p>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{selectedCompany.pendingCount}</h3>
              </div>
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl">
                  <RefreshCw size={24} className={selectedCompany.pendingCount > 0 ? "animate-spin-slow" : ""} />
              </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Avg. Completion</p>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{selectedCompany.avgCompletionTime}</h3>
              </div>
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl">
                  <Clock size={24} />
              </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Security Tier</p>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{selectedCompany.securityTier}</h3>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl">
                  <ShieldAlert size={24} />
              </div>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
          
          {/* Left Column: Verification Queue */}
          <div className="lg:col-span-2 flex flex-col gap-4 overflow-y-auto pr-2">
              <div className="flex justify-between items-center mb-2 px-1">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">Active Queue</h3>
                  <div className="flex gap-2">
                       <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">
                           <Filter size={14} /> Filter
                       </button>
                  </div>
              </div>

              {filteredRequests.length > 0 ? filteredRequests.map(request => (
                  <div 
                    key={request.id} 
                    onClick={() => setSelectedRequest(request)}
                    className={`bg-white dark:bg-slate-900 p-5 rounded-2xl border transition-all cursor-pointer group hover:shadow-md relative overflow-hidden ${
                        selectedRequest?.id === request.id 
                        ? 'border-indigo-500 ring-1 ring-indigo-500 shadow-md' 
                        : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700'
                    }`}
                  >
                      <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                              <div className={`p-2.5 rounded-xl ${
                                  request.type === 'Transaction' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30' :
                                  request.type === 'Profile Change' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30' :
                                  'bg-slate-100 text-slate-600 dark:bg-slate-800'
                              }`}>
                                  {request.type === 'Transaction' ? <DollarSign size={20} /> : <User size={20} />}
                              </div>
                              <div>
                                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">{request.subject}</h4>
                                  <p className="text-xs text-slate-500 font-mono mt-0.5">{request.id} • {request.type}</p>
                              </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${getStatusColor(request.status)}`}>
                                  {request.status}
                              </span>
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${getPriorityColor(request.priority)}`}>
                                  {request.priority}
                              </span>
                          </div>
                      </div>

                      <div className="flex justify-between items-end">
                          <div className="text-xs text-slate-500 space-y-1">
                              <p>Submitted: <span className="font-medium text-slate-700 dark:text-slate-300">{request.dateSubmitted}</span></p>
                              <div className="flex items-center gap-2 mt-2">
                                 <div className="flex -space-x-1">
                                     {request.stages.map((stage, i) => (
                                         <div key={i} className={`w-3 h-3 rounded-full border-2 border-white dark:border-slate-900 ${
                                             stage.status === 'Passed' ? 'bg-emerald-500' :
                                             stage.status === 'Reviewing' ? 'bg-indigo-500' :
                                             stage.status === 'Flagged' ? 'bg-red-500' : 'bg-slate-200'
                                         }`} />
                                     ))}
                                 </div>
                                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Chain Status</span>
                              </div>
                          </div>
                          <div className="text-right">
                              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">Current Stage</p>
                              <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{request.currentStage}</p>
                          </div>
                      </div>
                  </div>
              )) : (
                  <div className="text-center py-16 text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                      <ShieldCheck size={48} className="mx-auto mb-2 opacity-30" />
                      <p className="font-medium">No pending verifications for this company.</p>
                  </div>
              )}
          </div>

          {/* Right Column: Stage Details */}
          <div className="space-y-6">
              {selectedRequest ? (
                  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col h-full animate-in slide-in-from-right duration-300">
                      <div className="flex justify-between items-start mb-6">
                          <h3 className="font-bold text-lg text-slate-900 dark:text-white">Workflow Timeline</h3>
                          <button onClick={() => setSelectedRequest(null)} className="md:hidden text-slate-400"><X size={20} /></button>
                      </div>

                      <div className="space-y-6 flex-1">
                          {/* Stepper */}
                          <div className="relative pl-6 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100 dark:before:bg-slate-800">
                              {selectedRequest.stages.map((stage) => (
                                  <div key={stage.id} className="relative group">
                                      {/* Dot */}
                                      <div className={`absolute -left-[31px] top-0 w-6 h-6 rounded-full border-4 border-white dark:border-slate-900 z-10 flex items-center justify-center transition-all ${
                                          stage.status === 'Passed' ? 'bg-emerald-500' :
                                          stage.status === 'Reviewing' ? 'bg-indigo-600 animate-pulse' :
                                          stage.status === 'Flagged' ? 'bg-red-500' :
                                          'bg-slate-200 dark:bg-slate-800'
                                      }`}>
                                          {stage.status === 'Passed' && <Check size={10} className="text-white" />}
                                          {stage.status === 'Flagged' && <AlertTriangle size={10} className="text-white" />}
                                      </div>
                                      
                                      <div>
                                          <div className="flex justify-between items-baseline mb-0.5">
                                              <p className={`text-sm font-bold ${
                                                  stage.status === 'Passed' ? 'text-slate-900 dark:text-white' :
                                                  stage.status === 'Reviewing' ? 'text-indigo-600 dark:text-indigo-400' :
                                                  'text-slate-400'
                                              }`}>
                                                  {stage.name}
                                              </p>
                                              {stage.timestamp && <span className="text-[10px] text-slate-400 font-medium">{stage.timestamp}</span>}
                                          </div>
                                          {stage.actor && (
                                              <p className="text-xs text-slate-500 flex items-center gap-1">
                                                  <User size={10} /> {stage.actor}
                                              </p>
                                          )}
                                          {stage.notes && (
                                              <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-2 rounded italic">
                                                  "{stage.notes}"
                                              </p>
                                          )}
                                      </div>
                                  </div>
                              ))}
                          </div>

                          {/* Action Bar */}
                          <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-700 space-y-3">
                              <div className="grid grid-cols-2 gap-3">
                                  <button className="py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition-colors shadow-sm flex items-center justify-center gap-2">
                                      <Check size={16} /> Approve Stage
                                  </button>
                                  <button className="py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                                      <RefreshCw size={16} /> Request Info
                                  </button>
                              </div>
                              <button className="w-full py-2.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm font-bold hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors flex items-center justify-center gap-2">
                                  <AlertTriangle size={16} /> Flag for Investigation
                              </button>
                          </div>
                      </div>
                  </div>
              ) : (
                  <div className="bg-slate-50 dark:bg-slate-900/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 p-8 flex flex-col items-center justify-center text-center h-full text-slate-400">
                      <Fingerprint size={48} className="mb-4 opacity-20" />
                      <p className="font-medium">Select a request to view verification steps</p>
                  </div>
              )}
          </div>
      </div>
    </div>
  );
};
