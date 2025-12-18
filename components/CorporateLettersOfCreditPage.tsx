import React, { useState, useMemo } from 'react';
import { Search, Filter, Download, Plus, ChevronDown, Check, DollarSign, Activity, Clock, CheckCircle2, AlertCircle, FileText, MoreHorizontal, RefreshCw, X, ArrowUpRight, TrendingUp, Landmark, ShieldCheck, Globe, Scale, FileSignature, FileCheck } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, PieChart, Pie } from 'recharts';

interface LCStep {
  name: string;
  status: 'Completed' | 'Current' | 'Pending';
  date?: string;
}

interface LetterOfCredit {
  id: string;
  reference: string;
  beneficiary: string;
  amount: number;
  currency: string;
  type: 'Import' | 'Export' | 'Standby';
  status: 'Issued' | 'Advice' | 'Negotiation' | 'Paid' | 'Expired';
  expiryDate: string;
  issuingBank: string;
  advisingBank: string;
  workflow: LCStep[];
}

interface CompanyLCProfile {
  id: string;
  name: string;
  industry: string;
  totalActiveValue: number;
  activeCount: number;
  expiringSoon: number;
  utilizationRate: number;
  lcs: LetterOfCredit[];
}

export const CorporateLettersOfCreditPage: React.FC = () => {
  // Mock Data
  const companies: CompanyLCProfile[] = [
    {
      id: '1',
      name: 'TechNova Solutions Ltd.',
      industry: 'Technology',
      totalActiveValue: 8500000,
      activeCount: 12,
      expiringSoon: 3,
      utilizationRate: 68,
      lcs: [
        { 
          id: 'LC-101', 
          reference: 'IM-99210-24', 
          beneficiary: 'Global Chips HK', 
          amount: 1200000, 
          currency: 'USD', 
          type: 'Import', 
          status: 'Issued', 
          expiryDate: 'Dec 15, 2024', 
          issuingBank: 'Nebula Corporate Bank', 
          advisingBank: 'HSBC Hong Kong',
          workflow: [
            { name: 'Application', status: 'Completed', date: 'Oct 01' },
            { name: 'Issuance', status: 'Completed', date: 'Oct 05' },
            { name: 'Advice', status: 'Completed', date: 'Oct 08' },
            { name: 'Negotiation', status: 'Current' },
            { name: 'Settlement', status: 'Pending' }
          ]
        },
        { 
          id: 'LC-102', 
          reference: 'EX-88210-24', 
          beneficiary: 'EuroTech GmbH', 
          amount: 450000, 
          currency: 'EUR', 
          type: 'Export', 
          status: 'Advice', 
          expiryDate: 'Nov 20, 2024', 
          issuingBank: 'Deutsche Bank', 
          advisingBank: 'Nebula Corporate Bank',
          workflow: [
            { name: 'Application', status: 'Completed', date: 'Oct 10' },
            { name: 'Issuance', status: 'Completed', date: 'Oct 12' },
            { name: 'Advice', status: 'Current' },
            { name: 'Presentation', status: 'Pending' }
          ]
        },
        { 
          id: 'LC-103', 
          reference: 'ST-77120-24', 
          beneficiary: 'PowerGrid Utilities', 
          amount: 2500000, 
          currency: 'USD', 
          type: 'Standby', 
          status: 'Issued', 
          expiryDate: 'Jan 30, 2025', 
          issuingBank: 'Nebula Corporate Bank', 
          advisingBank: 'CitiBank',
          workflow: [
            { name: 'Application', status: 'Completed' },
            { name: 'Issuance', status: 'Completed' },
            { name: 'Active', status: 'Current' }
          ]
        }
      ]
    },
    {
      id: '2',
      name: 'GreenLeaf Logistics',
      industry: 'Logistics',
      totalActiveValue: 1200000,
      activeCount: 4,
      expiringSoon: 1,
      utilizationRate: 45,
      lcs: [
        { 
          id: 'LC-201', 
          reference: 'IM-GL-001', 
          beneficiary: 'China Port Logistics', 
          amount: 800000, 
          currency: 'USD', 
          type: 'Import', 
          status: 'Negotiation', 
          expiryDate: 'Oct 31, 2024', 
          issuingBank: 'Nebula Corporate Bank', 
          advisingBank: 'Bank of China',
          workflow: [
            { name: 'Application', status: 'Completed' },
            { name: 'Issuance', status: 'Completed' },
            { name: 'Negotiation', status: 'Current' }
          ]
        }
      ]
    },
    {
      id: '3',
      name: 'Quantum Dynamics',
      industry: 'Manufacturing',
      totalActiveValue: 0,
      activeCount: 0,
      expiringSoon: 0,
      utilizationRate: 0,
      lcs: []
    }
  ];

  const [selectedCompany, setSelectedCompany] = useState<CompanyLCProfile>(companies[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedLC, setSelectedLC] = useState<LetterOfCredit | null>(companies[0].lcs[0] || null);

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredLCs = useMemo(() => {
    return selectedCompany.lcs.filter(l => 
      filterStatus === 'All' || l.status === filterStatus
    );
  }, [selectedCompany, filterStatus]);

  const handleSelectCompany = (company: CompanyLCProfile) => {
    setSelectedCompany(company);
    setSearchTerm("");
    setShowDropdown(false);
    setSelectedLC(company.lcs.length > 0 ? company.lcs[0] : null);
  };

  const formatCurrency = (val: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(val);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Issued': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      case 'Advice': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800';
      case 'Negotiation': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800';
      case 'Paid': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
      case 'Expired': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getTypeIcon = (type: string) => {
      switch(type) {
          case 'Import': return <Download size={18} />;
          case 'Export': return <ArrowUpRight size={18} />;
          case 'Standby': return <ShieldCheck size={18} />;
          default: return <FileText size={18} />;
      }
  };

  const distributionData = [
      { name: 'Import', value: selectedCompany.lcs.filter(l => l.type === 'Import').length, color: '#6366f1' },
      { name: 'Export', value: selectedCompany.lcs.filter(l => l.type === 'Export').length, color: '#10b981' },
      { name: 'Standby', value: selectedCompany.lcs.filter(l => l.type === 'Standby').length, color: '#f59e0b' },
  ].filter(d => d.value > 0);

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-2 space-y-6">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileSignature className="text-indigo-500" /> Letters of Credit (L/C)
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
             Manage trade finance instruments, track presentation status, and mitigate counterparty risk.
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto relative z-20">
            <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search L/C by company or reference..." 
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
                                            <p className="text-xs text-slate-500">Active L/Cs: {comp.activeCount}</p>
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
                <Plus size={18} /> Issue L/C
            </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Total Active Value</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{formatCurrency(selectedCompany.totalActiveValue)}</h3>
              <p className="text-xs text-emerald-500 font-medium mt-1 flex items-center gap-1"><TrendingUp size={12}/> {selectedCompany.activeCount} Total Documents</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Expiring (30d)</p>
              <h3 className={`text-2xl font-bold ${selectedCompany.expiringSoon > 0 ? 'text-amber-500' : 'text-slate-900 dark:text-white'}`}>{selectedCompany.expiringSoon} L/Cs</h3>
              <p className="text-xs text-slate-400 mt-1">Requiring rollover audit</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Credit Utilization</p>
              <h3 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{selectedCompany.utilizationRate}%</h3>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-indigo-500" style={{ width: `${selectedCompany.utilizationRate}%` }}></div>
              </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Awaiting Docs</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {selectedCompany.lcs.filter(l => l.status === 'Negotiation').length} Batches
              </h3>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1"><Clock size={12}/> Pending verification</p>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
          
          {/* Left Column: L/C Records List */}
          <div className="lg:col-span-2 flex flex-col gap-4 overflow-y-auto pr-2 pb-10">
              <div className="flex justify-between items-center mb-2 px-1">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">Trade Instruments</h3>
                  <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                      {['All', 'Issued', 'Advice', 'Negotiation', 'Paid'].map(t => (
                          <button
                            key={t}
                            onClick={() => setFilterStatus(t)}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                filterStatus === t 
                                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-sm' 
                                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                            }`}
                          >
                              {t}
                          </button>
                      ))}
                  </div>
              </div>

              {filteredLCs.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                      {filteredLCs.map(lc => (
                          <div 
                            key={lc.id} 
                            onClick={() => setSelectedLC(lc)}
                            className={`bg-white dark:bg-slate-900 p-5 rounded-2xl border transition-all cursor-pointer group hover:shadow-md relative overflow-hidden ${
                                selectedLC?.id === lc.id 
                                ? 'border-indigo-500 ring-1 ring-indigo-500 shadow-md' 
                                : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700'
                            }`}
                          >
                              <div className="flex justify-between items-start mb-4">
                                  <div className="flex items-center gap-3">
                                      <div className={`p-2.5 rounded-xl ${
                                          lc.status === 'Paid' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30' :
                                          'bg-slate-100 text-slate-600 dark:bg-slate-800'
                                      }`}>
                                          {getTypeIcon(lc.type)}
                                      </div>
                                      <div>
                                          <h4 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{lc.beneficiary}</h4>
                                          <p className="text-xs text-slate-500 font-mono mt-0.5">{lc.reference} • {lc.type}</p>
                                      </div>
                                  </div>
                                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${getStatusColor(lc.status)}`}>
                                      {lc.status}
                                  </span>
                              </div>

                              <div className="flex justify-between items-end">
                                  <div className="text-xs text-slate-500 space-y-1">
                                      <p>Expiry: <span className="font-medium text-slate-700 dark:text-slate-300">{lc.expiryDate}</span></p>
                                      <div className="flex items-center gap-2 mt-2">
                                          <div className="flex -space-x-1">
                                              {[1, 2].map(i => (
                                                  <div key={i} className="w-5 h-5 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[8px] font-bold text-slate-500">
                                                      B
                                                  </div>
                                              ))}
                                          </div>
                                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Issuing: {lc.issuingBank.split(' ')[0]}</span>
                                      </div>
                                  </div>
                                  <div className="text-right">
                                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">Limit Value</p>
                                      <p className="text-xl font-bold text-slate-900 dark:text-white">
                                          {formatCurrency(lc.amount, lc.currency)}
                                      </p>
                                  </div>
                              </div>
                          </div>
                      ))}
                  </div>
              ) : (
                  <div className="text-center py-16 text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                      <FileSignature size={48} className="mx-auto mb-2 opacity-30" />
                      <p className="font-medium">No instruments found for this company.</p>
                  </div>
              )}
          </div>

          {/* Right Column: L/C Details & Tracking */}
          <div className="space-y-6">
              {selectedLC ? (
                  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col h-full animate-in slide-in-from-right duration-300">
                      <div className="flex justify-between items-start mb-6">
                          <div>
                              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Instrument Audit</h3>
                              <p className="text-xs text-slate-500">Ref: {selectedLC.reference}</p>
                          </div>
                          <button onClick={() => setSelectedLC(null)} className="md:hidden text-slate-400 p-1 hover:bg-slate-100 rounded-lg transition-colors"><X size={20} /></button>
                      </div>

                      <div className="space-y-6 flex-1">
                          {/* Distribution Chart */}
                          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 flex flex-col gap-4 shadow-inner overflow-hidden relative h-48">
                                <div className="flex justify-between items-center relative z-10">
                                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide">Category Exposure</h4>
                                </div>
                                <div className="flex-1 w-full relative z-10">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={distributionData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={40}
                                                outerRadius={60}
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {distributionData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                          </div>

                          {/* Workflow Tracking */}
                          <div>
                              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-4">Lifecycle Tracker</h4>
                              <div className="relative pl-6 space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100 dark:before:bg-slate-800">
                                  {selectedLC.workflow.map((step, idx) => (
                                      <div key={idx} className="relative group">
                                          <div className={`absolute -left-[31px] top-0 w-6 h-6 rounded-full border-4 border-white dark:border-slate-900 z-10 flex items-center justify-center transition-all ${
                                              step.status === 'Completed' ? 'bg-emerald-500 shadow-sm shadow-emerald-500/50' :
                                              step.status === 'Current' ? 'bg-indigo-600 animate-pulse ring-4 ring-indigo-500/20' :
                                              'bg-slate-200 dark:bg-slate-800'
                                          }`}>
                                              {step.status === 'Completed' && <Check size={10} className="text-white" />}
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
                          </div>

                          {/* Action Bar */}
                          <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-700 space-y-3">
                              <div className="grid grid-cols-2 gap-3">
                                  <button className="py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all active:scale-95 shadow-sm flex items-center justify-center gap-2">
                                      <RefreshCw size={16} /> Amend L/C
                                  </button>
                                  <button className="py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95 shadow-sm">
                                      View SWIFT
                                  </button>
                              </div>
                              <button className="w-full py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-sm">
                                  <FileCheck size={16} /> Process Documents
                              </button>
                              <button className="w-full py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center gap-2">
                                  <Download size={16} /> Export Draft
                              </button>
                          </div>
                      </div>
                  </div>
              ) : (
                  <div className="bg-slate-50 dark:bg-slate-900/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 p-8 flex flex-col items-center justify-center text-center h-full text-slate-400">
                      <Landmark size={48} className="mb-4 opacity-20" />
                      <p className="font-medium">Select a trade instrument to view details</p>
                  </div>
              )}
          </div>
      </div>
    </div>
  );
};