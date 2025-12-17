
import React, { useState } from 'react';
/* Added missing Settings import from lucide-react */
import { Search, Filter, Download, DollarSign, ShieldCheck, CheckCircle2, XCircle, AlertTriangle, Clock, FileText, ChevronRight, User, Building2, MoreHorizontal, Plus, ChevronDown, Check, Eye, Send, ShieldAlert, Fingerprint, Activity, RefreshCw, X, ArrowRight, Settings } from 'lucide-react';

interface VerificationStep {
  id: string;
  name: string;
  status: 'Completed' | 'Current' | 'Pending' | 'Flagged';
  actor?: string;
  timestamp?: string;
}

interface LargePayment {
  id: string;
  reference: string;
  beneficiary: string;
  bankName: string;
  amount: number;
  currency: string;
  date: string;
  type: 'Domestic' | 'International' | 'Internal';
  status: 'Pending Verification' | 'Awaiting Sign-off' | 'Processing' | 'Held' | 'Confirmed';
  riskScore: number;
  purpose: string;
  verificationSteps: VerificationStep[];
}

interface CompanyPaymentProfile {
  id: string;
  name: string;
  industry: string;
  pendingTotal: string;
  pendingCount: number;
  threshold: string;
  payments: LargePayment[];
}

export const CorporateLargePaymentPage: React.FC = () => {
  // Mock Data
  const companies: CompanyPaymentProfile[] = [
    {
      id: '1',
      name: 'TechNova Solutions Ltd.',
      industry: 'Technology',
      pendingTotal: '$1.45M',
      pendingCount: 2,
      threshold: '$100,000',
      payments: [
        {
          id: 'LP-8821',
          reference: 'TX-NY-0092',
          beneficiary: 'Global Cloud Infrastructure',
          bankName: 'Silicon Valley Bank',
          amount: 1250000,
          currency: 'USD',
          date: 'Today, 09:45 AM',
          type: 'Domestic',
          status: 'Pending Verification',
          riskScore: 12,
          purpose: 'Annual server hosting and bandwidth fees for North American region.',
          verificationSteps: [
            { id: 'v1', name: 'Identity Verification', status: 'Completed', actor: 'Sarah Jenkins', timestamp: '09:50 AM' },
            { id: 'v2', name: 'Dual Authorization', status: 'Current', actor: 'Awaiting John Smith' },
            { id: 'v3', name: 'Sanctions Check', status: 'Pending' },
            { id: 'v4', name: 'Final Confirmation', status: 'Pending' }
          ]
        },
        {
          id: 'LP-8822',
          reference: 'TX-HK-1102',
          beneficiary: 'Asia Logi-Systems',
          bankName: 'HSBC Hong Kong',
          amount: 200000,
          currency: 'USD',
          date: 'Yesterday, 14:20 PM',
          type: 'International',
          status: 'Awaiting Sign-off',
          riskScore: 28,
          purpose: 'New office equipment procurement for Singapore branch.',
          verificationSteps: [
            { id: 'v5', name: 'Identity Verification', status: 'Completed', actor: 'Marcus Thorne', timestamp: 'Oct 24, 15:00' },
            { id: 'v6', name: 'Dual Authorization', status: 'Completed', actor: 'Sarah Jenkins', timestamp: 'Oct 24, 16:30' },
            { id: 'v7', name: 'Sanctions Check', status: 'Completed', actor: 'System', timestamp: 'Oct 24, 16:32' },
            { id: 'v8', name: 'Final Confirmation', status: 'Current' }
          ]
        }
      ]
    },
    {
      id: '2',
      name: 'GreenLeaf Logistics',
      industry: 'Logistics',
      // Added missing pendingTotal property to match CompanyPaymentProfile interface
      pendingTotal: '$85,000',
      pendingCount: 1,
      threshold: '$50,000',
      payments: [
        {
          id: 'LP-7711',
          reference: 'TX-FUEL-22',
          beneficiary: 'Pacific Petroleum Corp',
          bankName: 'Chase Bank',
          amount: 85000,
          currency: 'USD',
          date: 'Oct 24, 11:00 AM',
          type: 'Domestic',
          status: 'Held',
          riskScore: 82,
          purpose: 'Bulk fuel purchase for delivery fleet Q4 prep.',
          verificationSteps: [
            { id: 'v9', name: 'Identity Verification', status: 'Completed', actor: 'Michael Chen', timestamp: '11:05 AM' },
            { id: 'v10', name: 'Dual Authorization', status: 'Flagged', actor: 'System', timestamp: '11:10 AM' },
            { id: 'v11', name: 'Security Review', status: 'Pending' }
          ]
        }
      ]
    },
    {
      id: '3',
      name: 'Quantum Dynamics',
      industry: 'Manufacturing',
      pendingTotal: '$0',
      pendingCount: 0,
      threshold: '$250,000',
      payments: []
    }
  ];

  const [selectedCompany, setSelectedCompany] = useState<CompanyPaymentProfile>(companies[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<LargePayment | null>(companies[0].payments[0] || null);
  const [filterType, setFilterType] = useState("All");

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCompany = (company: CompanyPaymentProfile) => {
    setSelectedCompany(company);
    setSearchTerm("");
    setShowDropdown(false);
    setSelectedPayment(company.payments.length > 0 ? company.payments[0] : null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'text-emerald-700 bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
      case 'Pending Verification':
      case 'Awaiting Sign-off':
      case 'Processing': return 'text-blue-700 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      case 'Held': return 'text-red-700 bg-red-100 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
      default: return 'text-slate-600 bg-slate-100 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700';
    }
  };

  const getRiskColor = (score: number) => {
    if (score >= 75) return 'text-red-600';
    if (score >= 50) return 'text-amber-600';
    return 'text-emerald-600';
  };

  const formatCurrency = (val: number, currency: string) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency, maximumFractionDigits: 0 }).format(val);
  };

  const filteredPayments = selectedCompany.payments.filter(p => filterType === "All" || p.type === filterType);

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-2 space-y-6">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <DollarSign className="text-indigo-500" /> Large Payment Control
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
             Confirmation and audit for high-value transactions and treasury movements.
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto relative z-20">
            <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search company or reference..." 
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
                                            <p className="text-xs text-slate-500">Threshold: {comp.threshold}</p>
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
                <Settings size={18} /> Control Rules
            </button>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Queue Total</p>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{selectedCompany.pendingTotal}</h3>
              </div>
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl">
                  <Activity size={24} />
              </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Items for Review</p>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{selectedCompany.pendingCount}</h3>
              </div>
              <div className="p-3 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-xl">
                  <Clock size={24} />
              </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Reporting Threshold</p>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{selectedCompany.threshold}</h3>
              </div>
              <div className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-xl">
                  <ShieldCheck size={24} />
              </div>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
          
          {/* Left Column: Transaction Feed */}
          <div className="lg:col-span-2 flex flex-col gap-4 overflow-y-auto pr-2">
              <div className="flex justify-between items-center mb-2 px-1">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">Active Queue</h3>
                  <div className="flex gap-2">
                       <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">
                           <Filter size={14} /> Filter
                       </button>
                  </div>
              </div>

              {filteredPayments.length > 0 ? filteredPayments.map(payment => (
                  <div 
                    key={payment.id} 
                    onClick={() => setSelectedPayment(payment)}
                    className={`bg-white dark:bg-slate-900 p-5 rounded-2xl border transition-all cursor-pointer group hover:shadow-md relative overflow-hidden ${
                        selectedPayment?.id === payment.id 
                        ? 'border-indigo-500 ring-1 ring-indigo-500 shadow-md' 
                        : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700'
                    }`}
                  >
                      <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                              <div className={`p-2.5 rounded-xl ${
                                  payment.type === 'International' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30' :
                                  'bg-blue-100 text-blue-600 dark:bg-blue-900/30'
                              }`}>
                                  <DollarSign size={20} />
                              </div>
                              <div>
                                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">{payment.beneficiary}</h4>
                                  <p className="text-xs text-slate-500 font-mono mt-0.5">{payment.reference} • {payment.type}</p>
                              </div>
                          </div>
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${getStatusColor(payment.status)}`}>
                              {payment.status}
                          </span>
                      </div>

                      <div className="flex justify-between items-end">
                          <div className="text-xs text-slate-500 space-y-1">
                              <p>Execution Date: <span className="font-medium text-slate-700 dark:text-slate-300">{payment.date}</span></p>
                              <div className="flex items-center gap-2 mt-2">
                                 <div className="flex -space-x-1">
                                     {payment.verificationSteps.map((step, i) => (
                                         <div key={i} className={`w-3 h-3 rounded-full border-2 border-white dark:border-slate-900 ${
                                             step.status === 'Completed' ? 'bg-emerald-50' :
                                             step.status === 'Current' ? 'bg-indigo-500' :
                                             step.status === 'Flagged' ? 'bg-red-500' : 'bg-slate-200'
                                         }`} />
                                     ))}
                                 </div>
                                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Chain Status</span>
                              </div>
                          </div>
                          <div className="text-right">
                              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">Amount</p>
                              <p className="text-2xl font-bold text-slate-900 dark:text-white">{formatCurrency(payment.amount, payment.currency)}</p>
                          </div>
                      </div>
                  </div>
              )) : (
                  <div className="text-center py-16 text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                      <ShieldCheck size={48} className="mx-auto mb-2 opacity-30" />
                      <p className="font-medium">No large payments requiring confirmation.</p>
                  </div>
              )}
          </div>

          {/* Right Column: Detail & Workflow */}
          <div className="space-y-6">
              {selectedPayment ? (
                  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col h-full animate-in slide-in-from-right duration-300">
                      <div className="flex justify-between items-start mb-6">
                          <div>
                              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Review & Verify</h3>
                              <p className="text-xs text-slate-500">ID: {selectedPayment.id}</p>
                          </div>
                          <button onClick={() => setSelectedPayment(null)} className="md:hidden text-slate-400"><X size={20} /></button>
                      </div>

                      <div className="space-y-6 flex-1">
                          {/* Payment Metadata */}
                          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700">
                              <div className="flex justify-between mb-4">
                                  <div>
                                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Beneficiary Bank</p>
                                      <p className="text-sm font-bold text-slate-900 dark:text-white">{selectedPayment.bankName}</p>
                                  </div>
                                  <div className="text-right">
                                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Risk Score</p>
                                      <p className={`text-sm font-bold ${getRiskColor(selectedPayment.riskScore)}`}>{selectedPayment.riskScore}/100</p>
                                  </div>
                              </div>
                              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Purpose</p>
                              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">"{selectedPayment.purpose}"</p>
                          </div>

                          {/* Steps Stepper */}
                          <div className="relative pl-6 space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100 dark:before:bg-slate-800">
                              {selectedPayment.verificationSteps.map((step) => (
                                  <div key={step.id} className="relative group">
                                      <div className={`absolute -left-[31px] top-0 w-6 h-6 rounded-full border-4 border-white dark:border-slate-900 z-10 flex items-center justify-center transition-all ${
                                          step.status === 'Completed' ? 'bg-emerald-500' :
                                          step.status === 'Current' ? 'bg-indigo-600 animate-pulse' :
                                          step.status === 'Flagged' ? 'bg-red-500' :
                                          'bg-slate-200 dark:bg-slate-800'
                                      }`}>
                                          {step.status === 'Completed' && <Check size={10} className="text-white" />}
                                          {step.status === 'Flagged' && <AlertTriangle size={10} className="text-white" />}
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
                                              {step.timestamp && <span className="text-[10px] text-slate-400 font-medium">{step.timestamp}</span>}
                                          </div>
                                          {step.actor && (
                                              <p className="text-xs text-slate-500 flex items-center gap-1">
                                                  <User size={10} /> {step.actor}
                                              </p>
                                          )}
                                      </div>
                                  </div>
                              ))}
                          </div>

                          {/* Action Bar */}
                          <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-700 space-y-3">
                              <div className="grid grid-cols-2 gap-3">
                                  <button className="py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition-colors shadow-sm flex items-center justify-center gap-2">
                                      <CheckCircle2 size={16} /> Confirm
                                  </button>
                                  <button className="py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                                      <RefreshCw size={16} /> Hold & Audit
                                  </button>
                              </div>
                              <button className="w-full py-2.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm font-bold hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors flex items-center justify-center gap-2">
                                  <XCircle size={16} /> Deny Transaction
                              </button>
                          </div>
                      </div>
                  </div>
              ) : (
                  <div className="bg-slate-50 dark:bg-slate-900/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 p-8 flex flex-col items-center justify-center text-center h-full text-slate-400">
                      <Fingerprint size={48} className="mb-4 opacity-20" />
                      <p className="font-medium">Select a payment from the queue to view audit chain</p>
                  </div>
              )}
          </div>
      </div>
    </div>
  );
};
