
import React, { useState } from 'react';
import { Search, Filter, Download, DollarSign, Layers, CheckCircle2, AlertTriangle, ArrowRight, User, Clock, ShieldCheck, ExternalLink, MoreHorizontal, X, FileText, Plus, ChevronDown, Check, Activity, Globe } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts';

interface PaymentStep {
  id: string;
  name: string;
  status: 'Completed' | 'Current' | 'Pending' | 'Flagged';
  actor?: string;
  date?: string;
}

interface ComplexPayment {
  id: string;
  reference: string;
  beneficiary: string;
  amount: number;
  currency: string;
  date: string;
  type: 'International Wire' | 'Treasury Transfer' | 'High Value' | 'Batch Disbursement';
  status: 'In Progress' | 'Verified' | 'Executed' | 'Held';
  riskScore: number;
  steps: PaymentStep[];
  reason: string;
}

interface CompanyComplexProfile {
  id: string;
  name: string;
  industry: string;
  activeComplexPayments: number;
  pendingApprovals: number;
  avgResolutionTime: string;
  payments: ComplexPayment[];
}

export const CorporateComplexPaymentsPage: React.FC = () => {
  // Mock Data
  const companies: CompanyComplexProfile[] = [
    {
      id: '1',
      name: 'TechNova Solutions Ltd.',
      industry: 'Technology',
      activeComplexPayments: 3,
      pendingApprovals: 1,
      avgResolutionTime: '4h 12m',
      payments: [
        {
          id: 'P1',
          reference: 'WIRE-2024-8821',
          beneficiary: 'Global Hardware Ltd. (Hong Kong)',
          amount: 1250000,
          currency: 'USD',
          date: 'Oct 24, 2024',
          type: 'International Wire',
          status: 'In Progress',
          riskScore: 15,
          reason: 'Large procurement of chipsets for Q4 production.',
          steps: [
            { id: 's1', name: 'Internal Initiation', status: 'Completed', actor: 'Sarah Jenkins', date: '09:00 AM' },
            { id: 's2', name: 'Treasury Review', status: 'Completed', actor: 'John Smith', date: '10:15 AM' },
            { id: 's3', name: 'Compliance / AML', status: 'Current' },
            { id: 's4', name: 'Final Release', status: 'Pending' }
          ]
        },
        {
          id: 'P2',
          reference: 'BATCH-PAY-001',
          beneficiary: 'Europe Payroll Hub',
          amount: 450000,
          currency: 'EUR',
          date: 'Oct 23, 2024',
          type: 'Batch Disbursement',
          status: 'Verified',
          riskScore: 5,
          reason: 'Monthly payroll for EU subsidiaries.',
          steps: [
            { id: 'b1', name: 'Initiation', status: 'Completed', actor: 'HR Dept', date: 'Yesterday' },
            { id: 'b2', name: 'Batch Validation', status: 'Completed', actor: 'System', date: 'Yesterday' },
            { id: 'b3', name: 'Final Approval', status: 'Completed', actor: 'Sarah Jenkins', date: 'Today' },
            { id: 'b4', name: 'Execution', status: 'Current' }
          ]
        }
      ]
    },
    {
      id: '2',
      name: 'GreenLeaf Logistics',
      industry: 'Logistics',
      activeComplexPayments: 1,
      pendingApprovals: 2,
      avgResolutionTime: '2h 45m',
      payments: [
        {
          id: 'P3',
          reference: 'TX-LOG-992',
          beneficiary: 'South Ports Authority',
          amount: 85000,
          currency: 'USD',
          date: 'Oct 24, 2024',
          type: 'High Value',
          status: 'Held',
          riskScore: 72,
          reason: 'Urgent customs clearance and port docking fees.',
          steps: [
            { id: 'l1', name: 'Initiation', status: 'Completed', actor: 'Michael Chen' },
            { id: 'l2', name: 'Risk Scoring', status: 'Flagged', actor: 'System' },
            { id: 'l3', name: 'Manual Override', status: 'Pending' }
          ]
        }
      ]
    },
    {
      id: '3',
      name: 'Quantum Dynamics',
      industry: 'Manufacturing',
      activeComplexPayments: 0,
      pendingApprovals: 0,
      avgResolutionTime: '6h 20m',
      payments: []
    }
  ];

  const [selectedCompany, setSelectedCompany] = useState<CompanyComplexProfile>(companies[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<ComplexPayment | null>(companies[0].payments[0] || null);
  const [filterType, setFilterType] = useState("All");

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCompany = (company: CompanyComplexProfile) => {
    setSelectedCompany(company);
    setSearchTerm("");
    setShowDropdown(false);
    setSelectedPayment(company.payments.length > 0 ? company.payments[0] : null);
  };

  const getStatusColor = (status: string) => {
      switch(status) {
          case 'Executed':
          case 'Completed': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
          case 'In Progress':
          case 'Current': return 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800';
          case 'Verified': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
          case 'Held':
          case 'Flagged': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
          default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700';
      }
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
            <Layers className="text-indigo-500" /> Complex Payments
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
             Multi-stage approval workflows, international wires, and high-value treasury operations.
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto relative z-20">
            <div className="relative flex-1 md:w-80">
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
                    className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-slate-900 dark:text-white"
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
                                        className="w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 border-b border-slate-100 dark:border-slate-700 last:border-0 flex justify-between items-center group transition-colors"
                                    >
                                        <div>
                                            <p className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{comp.name}</p>
                                            <p className="text-xs text-slate-500">{comp.industry}</p>
                                        </div>
                                        {selectedCompany.id === comp.id && <CheckCircle2 size={16} className="text-indigo-600 dark:text-indigo-400" />}
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
                <Plus size={18} /> New Payment
            </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Active Complex Flows</p>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{selectedCompany.activeComplexPayments}</h3>
              </div>
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl">
                  <Activity size={24} />
              </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Pending Approval</p>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{selectedCompany.pendingApprovals}</h3>
              </div>
              <div className="p-3 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-xl">
                  <ShieldCheck size={24} />
              </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Avg. Resolution</p>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{selectedCompany.avgResolutionTime}</h3>
              </div>
              <div className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-xl">
                  <Clock size={24} />
              </div>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
          
          {/* Left Column: Payments List */}
          <div className="lg:col-span-2 flex flex-col gap-4 overflow-y-auto pr-2">
              <div className="flex justify-between items-center mb-2 px-1">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">Recent Complex Operations</h3>
                  <div className="flex gap-2">
                       <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
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
                                  payment.type === 'International Wire' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30' :
                                  payment.type === 'Batch Disbursement' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30' :
                                  'bg-slate-100 text-slate-600 dark:bg-slate-800'
                              }`}>
                                  {payment.type === 'International Wire' ? <Globe size={20} /> : <Layers size={20} />}
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
                              <p>Initiated: <span className="font-medium text-slate-700 dark:text-slate-300">{payment.date}</span></p>
                              <div className="flex items-center gap-2 mt-2">
                                 <div className="flex -space-x-2">
                                     {payment.steps.map((step, i) => (
                                         <div key={i} className={`w-2.5 h-2.5 rounded-full border-2 border-white dark:border-slate-900 ${
                                             step.status === 'Completed' ? 'bg-emerald-500' :
                                             step.status === 'Current' ? 'bg-indigo-500' :
                                             step.status === 'Flagged' ? 'bg-red-500' : 'bg-slate-200'
                                         }`} />
                                     ))}
                                 </div>
                                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Workflow Progress</span>
                              </div>
                          </div>
                          <div className="text-right">
                              <p className="text-2xl font-bold text-slate-900 dark:text-white">{formatCurrency(payment.amount, payment.currency)}</p>
                              <p className={`text-[10px] font-bold ${payment.riskScore > 50 ? 'text-red-500' : 'text-emerald-500'}`}>
                                  Risk Score: {payment.riskScore}/100
                              </p>
                          </div>
                      </div>
                  </div>
              )) : (
                  <div className="text-center py-16 text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                      <DollarSign size={48} className="mx-auto mb-2 opacity-30" />
                      <p className="font-medium">No complex payments found.</p>
                  </div>
              )}
          </div>

          {/* Right Column: Workflow Details */}
          <div className="space-y-6">
              {selectedPayment ? (
                  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col h-full animate-in slide-in-from-right duration-300">
                      <div className="flex justify-between items-start mb-6">
                          <h3 className="font-bold text-lg text-slate-900 dark:text-white">Workflow Tracker</h3>
                          <button onClick={() => setSelectedPayment(null)} className="md:hidden text-slate-400"><X size={20} /></button>
                      </div>

                      <div className="space-y-8 flex-1">
                          {/* Reason Box */}
                          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700">
                              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Payment Reason</p>
                              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">"{selectedPayment.reason}"</p>
                          </div>

                          {/* Stepper */}
                          <div className="relative pl-6 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100 dark:before:bg-slate-800">
                              {selectedPayment.steps.map((step, idx) => (
                                  <div key={step.id} className="relative group">
                                      {/* Dot */}
                                      <div className={`absolute -left-[31px] top-0 w-6 h-6 rounded-full border-4 border-white dark:border-slate-900 z-10 flex items-center justify-center transition-all ${
                                          step.status === 'Completed' ? 'bg-emerald-500 shadow-sm shadow-emerald-500/50' :
                                          step.status === 'Current' ? 'bg-indigo-600 animate-pulse ring-4 ring-indigo-500/20' :
                                          step.status === 'Flagged' ? 'bg-red-500 shadow-sm shadow-red-500/50' :
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
                                              {step.date && <span className="text-[10px] text-slate-400 font-medium">{step.date}</span>}
                                          </div>
                                          {step.actor && (
                                              <p className="text-xs text-slate-500 flex items-center gap-1">
                                                  <User size={10} /> {step.actor}
                                              </p>
                                          )}
                                          {step.status === 'Current' && (
                                              <p className="text-[10px] font-bold text-indigo-500 uppercase mt-2 tracking-widest">Active Step</p>
                                          )}
                                      </div>
                                  </div>
                              ))}
                          </div>

                          {/* Action Bar */}
                          <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-700 space-y-3">
                              <div className="grid grid-cols-2 gap-3">
                                  <button className="py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm flex items-center justify-center gap-2">
                                      <ShieldCheck size={16} /> Verify
                                  </button>
                                  <button className="py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                      Details
                                  </button>
                              </div>
                              <button className="w-full py-2.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm font-bold hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors flex items-center justify-center gap-2">
                                  <AlertTriangle size={16} /> Flag / Hold Payment
                              </button>
                          </div>
                      </div>
                  </div>
              ) : (
                  <div className="bg-slate-50 dark:bg-slate-900/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 p-8 flex flex-col items-center justify-center text-center h-full text-slate-400">
                      <Layers size={48} className="mb-4 opacity-20" />
                      <p className="font-medium">Select a payment to view its workflow</p>
                  </div>
              )}
          </div>
      </div>
    </div>
  );
};
