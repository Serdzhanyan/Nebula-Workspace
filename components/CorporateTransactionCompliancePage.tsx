
import React, { useState } from 'react';
import { Search, Filter, Download, ShieldAlert, CheckCircle2, XCircle, AlertTriangle, FileText, Globe, DollarSign, Activity, RefreshCw, X, Eye, ShieldCheck, User, ArrowRight, Info, ExternalLink } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface ComplianceCheck {
  id: string;
  rule: string;
  status: 'Pass' | 'Fail' | 'Warning';
  details: string;
}

interface ComplianceTransaction {
  id: string;
  reference: string;
  beneficiary: string;
  amount: number;
  currency: string;
  date: string;
  type: 'Inbound' | 'Outbound' | 'Internal';
  riskScore: number;
  status: 'Flagged' | 'Cleared' | 'Under Review' | 'Blocked';
  checks: ComplianceCheck[];
  documentation?: string[];
}

interface CompanyComplianceProfile {
  id: string;
  name: string;
  industry: string;
  riskThreshold: number;
  totalMonitored: number;
  flaggedCount: number;
  transactions: ComplianceTransaction[];
}

export const CorporateTransactionCompliancePage: React.FC = () => {
  // Mock Data
  const companies: CompanyComplianceProfile[] = [
    {
      id: '1',
      name: 'TechNova Solutions Ltd.',
      industry: 'Technology',
      riskThreshold: 70,
      totalMonitored: 1240,
      flaggedCount: 3,
      transactions: [
        {
          id: 'T1',
          reference: 'TX-99210-A',
          beneficiary: 'Global Chips HK',
          amount: 450000,
          currency: 'USD',
          date: 'Today, 10:30 AM',
          type: 'Outbound',
          riskScore: 82,
          status: 'Flagged',
          checks: [
            { id: 'c1', rule: 'Sanctions List', status: 'Pass', details: 'No exact matches found in OFAC/EU lists.' },
            { id: 'c2', rule: 'High-Risk Jurisdiction', status: 'Warning', details: 'Beneficiary bank located in a transitional monitoring zone.' },
            { id: 'c3', rule: 'Velocity Check', status: 'Fail', details: 'Third transfer to this beneficiary within 48 hours exceeding tier limit.' }
          ],
          documentation: ['Invoice_882.pdf', 'Contracts_Q4.pdf']
        },
        {
          id: 'T2',
          reference: 'TX-99212-B',
          beneficiary: 'Azure Cloud Svcs',
          amount: 15000,
          currency: 'USD',
          date: 'Today, 09:15 AM',
          type: 'Outbound',
          riskScore: 12,
          status: 'Cleared',
          checks: [
            { id: 'c4', rule: 'White-list Match', status: 'Pass', details: 'Verified recurring vendor.' }
          ]
        }
      ]
    },
    {
      id: '2',
      name: 'GreenLeaf Logistics',
      industry: 'Logistics',
      riskThreshold: 65,
      totalMonitored: 850,
      flaggedCount: 1,
      transactions: [
        {
          id: 'T3',
          reference: 'TX-GL-554',
          beneficiary: 'EuroParts GmbH',
          amount: 12500,
          currency: 'EUR',
          date: 'Yesterday, 16:45 PM',
          type: 'Outbound',
          riskScore: 35,
          status: 'Under Review',
          checks: [
            { id: 'c5', rule: 'Currency Control', status: 'Warning', details: 'Transaction requires specific tax residency certificate.' }
          ],
          documentation: ['Tax_Cert_2024.pdf']
        }
      ]
    },
    {
      id: '3',
      name: 'Quantum Dynamics',
      industry: 'Manufacturing',
      riskThreshold: 75,
      totalMonitored: 2100,
      flaggedCount: 0,
      transactions: []
    }
  ];

  const [selectedCompany, setSelectedCompany] = useState<CompanyComplianceProfile>(companies[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedTx, setSelectedTx] = useState<ComplianceTransaction | null>(companies[0].transactions[0] || null);
  const [filterStatus, setFilterStatus] = useState("All");

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTransactions = selectedCompany.transactions.filter(t => 
    filterStatus === "All" || t.status === filterStatus
  );

  const handleSelectCompany = (company: CompanyComplianceProfile) => {
    setSelectedCompany(company);
    setSearchTerm("");
    setShowDropdown(false);
    setSelectedTx(company.transactions.length > 0 ? company.transactions[0] : null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Cleared': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
      case 'Flagged': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
      case 'Under Review': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800';
      case 'Blocked': return 'bg-slate-900 text-white dark:bg-slate-700 border-slate-950 dark:border-slate-600';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-red-500';
    if (score >= 50) return 'text-amber-500';
    return 'text-emerald-500';
  };

  const formatCurrency = (val: number, currency: string) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency, maximumFractionDigits: 0 }).format(val);
  };

  // Chart Data
  const monitoringTrend = [
    { time: '08:00', risk: 15 },
    { time: '10:00', risk: 45 },
    { time: '12:00', risk: 82 },
    { time: '14:00', risk: 35 },
    { time: '16:00', risk: 20 },
    { time: '18:00', risk: 10 },
  ];

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-2 space-y-6">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldAlert className="text-indigo-500" /> Transaction Compliance
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
             Real-time monitoring and verification of cross-border and high-value transactions.
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto relative z-20">
            <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search monitored company..." 
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
            
            <button className="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">
                <Filter size={18} />
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 dark:shadow-none">
                <RefreshCw size={18} /> Scan All
            </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between overflow-hidden relative">
              <div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none">
                  <Activity size={120} />
              </div>
              <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Monitored Transactions</p>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{selectedCompany.totalMonitored.toLocaleString()}</h3>
                  <p className="text-xs text-emerald-500 font-medium mt-1">99.8% Clean</p>
              </div>
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl">
                  <Globe size={24} />
              </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Flagged Activity</p>
                  <h3 className="text-3xl font-bold text-red-600 dark:text-red-400">{selectedCompany.flaggedCount}</h3>
                  <p className="text-xs text-red-400 mt-1">Requires Immediate Action</p>
              </div>
              <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl">
                  <ShieldAlert size={24} />
              </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">System Risk Threshold</p>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{selectedCompany.riskThreshold}</h3>
                  <p className="text-xs text-slate-400 mt-1">Auto-block above threshold</p>
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
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">Active Feed</h3>
                  <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                      {['All', 'Flagged', 'Under Review', 'Cleared'].map(s => (
                          <button
                            key={s}
                            onClick={() => setFilterStatus(s)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                filterStatus === s 
                                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-sm' 
                                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                            }`}
                          >
                              {s}
                          </button>
                      ))}
                  </div>
              </div>

              {filteredTransactions.length > 0 ? filteredTransactions.map(tx => (
                  <div 
                    key={tx.id} 
                    onClick={() => setSelectedTx(tx)}
                    className={`bg-white dark:bg-slate-900 p-5 rounded-2xl border transition-all cursor-pointer group hover:shadow-md relative overflow-hidden ${
                        selectedTx?.id === tx.id 
                        ? 'border-indigo-500 ring-1 ring-indigo-500 shadow-md' 
                        : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700'
                    }`}
                  >
                      <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                              <div className={`p-2.5 rounded-xl ${
                                  tx.type === 'Inbound' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30' :
                                  'bg-slate-100 text-slate-600 dark:bg-slate-800'
                              }`}>
                                  <ArrowRight size={20} className={tx.type === 'Inbound' ? 'rotate-180' : ''} />
                              </div>
                              <div>
                                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">{tx.beneficiary}</h4>
                                  <p className="text-xs text-slate-500 font-mono mt-0.5">{tx.reference} • {tx.type}</p>
                              </div>
                          </div>
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${getStatusColor(tx.status)}`}>
                              {tx.status}
                          </span>
                      </div>

                      <div className="flex justify-between items-end">
                          <div className="text-xs text-slate-500 space-y-1">
                              <p>Execution: <span className="font-medium text-slate-700 dark:text-slate-300">{tx.date}</span></p>
                              <div className="flex items-center gap-2 mt-2">
                                 <div className="flex -space-x-1">
                                     {tx.checks.map((check, i) => (
                                         <div key={i} className={`w-3 h-3 rounded-full border-2 border-white dark:border-slate-900 ${
                                             check.status === 'Pass' ? 'bg-emerald-500' :
                                             check.status === 'Warning' ? 'bg-amber-500' :
                                             'bg-red-500'
                                         }`} />
                                     ))}
                                 </div>
                                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{tx.checks.length} Automated Checks</span>
                              </div>
                          </div>
                          <div className="text-right">
                              <p className="text-2xl font-bold text-slate-900 dark:text-white">{formatCurrency(tx.amount, tx.currency)}</p>
                              <p className={`text-[10px] font-bold ${getScoreColor(tx.riskScore)}`}>
                                  Compliance Risk: {tx.riskScore}/100
                              </p>
                          </div>
                      </div>
                  </div>
              )) : (
                  <div className="text-center py-16 text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                      <ShieldCheck size={48} className="mx-auto mb-2 opacity-30" />
                      <p className="font-medium">No transactions found for this category.</p>
                  </div>
              )}
          </div>

          {/* Right Column: Investigation Details */}
          <div className="space-y-6">
              {selectedTx ? (
                  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col h-full animate-in slide-in-from-right duration-300">
                      <div className="flex justify-between items-start mb-6">
                          <div>
                              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Audit Details</h3>
                              <p className="text-xs text-slate-500">{selectedTx.reference}</p>
                          </div>
                          <button onClick={() => setSelectedTx(null)} className="md:hidden text-slate-400"><X size={20} /></button>
                      </div>

                      <div className="space-y-6 flex-1">
                          {/* Risk Score Widget */}
                          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 flex items-center justify-between">
                              <div>
                                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">AI Risk Confidence</span>
                                  <div className={`text-3xl font-bold ${getScoreColor(selectedTx.riskScore)}`}>{selectedTx.riskScore}%</div>
                              </div>
                              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
                                  <AlertTriangle className={selectedTx.riskScore > 50 ? 'text-amber-500 animate-pulse' : 'text-slate-400'} size={24} />
                              </div>
                          </div>

                          {/* Individual Rule Results */}
                          <div>
                              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-1">Rule Analysis</h4>
                              <div className="space-y-3">
                                  {selectedTx.checks.map(check => (
                                      <div key={check.id} className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800/50 group">
                                          <div className="flex justify-between items-center mb-2">
                                              <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">{check.rule}</span>
                                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                                                  check.status === 'Pass' ? 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' :
                                                  check.status === 'Warning' ? 'text-amber-500 bg-amber-50 dark:bg-amber-900/20' :
                                                  'text-red-500 bg-red-50 dark:bg-red-900/20'
                                              }`}>
                                                  {check.status}
                                              </span>
                                          </div>
                                          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{check.details}</p>
                                      </div>
                                  ))}
                              </div>
                          </div>

                          {/* Documents List */}
                          {selectedTx.documentation && (
                              <div>
                                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-1">Associated Evidence</h4>
                                  <div className="space-y-2">
                                      {selectedTx.documentation.map((doc, idx) => (
                                          <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800/50 hover:bg-slate-50 transition-colors cursor-pointer">
                                              <div className="flex items-center gap-3">
                                                  <FileText size={16} className="text-indigo-500" />
                                                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{doc}</span>
                                              </div>
                                              <Download size={14} className="text-slate-400" />
                                          </div>
                                      ))}
                                  </div>
                              </div>
                          )}

                          {/* Actions */}
                          <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-700 space-y-3">
                              <div className="grid grid-cols-2 gap-3">
                                  <button className="py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition-colors shadow-sm flex items-center justify-center gap-2">
                                      <ShieldCheck size={16} /> Clear Transaction
                                  </button>
                                  <button className="py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                      Request Info
                                  </button>
                              </div>
                              <button className="w-full py-2.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm font-bold hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors flex items-center justify-center gap-2">
                                  <XCircle size={16} /> Block & Report
                              </button>
                          </div>
                      </div>
                  </div>
              ) : (
                  <div className="bg-slate-50 dark:bg-slate-900/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 p-8 flex flex-col items-center justify-center text-center h-full text-slate-400">
                      <ShieldAlert size={48} className="mb-4 opacity-20" />
                      <p className="font-medium">Select a transaction to inspect its compliance score</p>
                  </div>
              )}
          </div>
      </div>
    </div>
  );
};
