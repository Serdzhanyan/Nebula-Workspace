import React, { useState, useMemo } from 'react';
import { Search, Filter, Download, Landmark, ArrowRightLeft, Globe, Activity, FileText, Plus, ChevronDown, Check, Eye, DollarSign, RefreshCw, X, Clock, ShieldCheck, TrendingUp, BarChart3, ArrowUpRight, ArrowDownLeft, ShieldAlert, Zap, Scale, CheckCircle2, Lock } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, Cell, PieChart, Pie } from 'recharts';

interface CreditLine {
  id: string;
  type: 'Revolving' | 'Term Loan' | 'Overdraft' | 'Letter of Credit';
  limit: number;
  utilized: number;
  interestRate: string;
  status: 'Active' | 'Under Review' | 'Frozen' | 'Closed';
  expiryDate: string;
  nextReview: string;
  covenants: { name: string; status: 'Pass' | 'Fail' | 'Warning' }[];
}

interface CompanyCreditProfile {
  id: string;
  name: string;
  industry: string;
  totalLimit: number;
  totalUtilized: number;
  riskRating: 'AAA' | 'AA' | 'A' | 'BBB' | 'BB';
  creditLines: CreditLine[];
  usageHistory: { month: string; value: number }[];
}

export const CorporateCreditLineManagementPage: React.FC = () => {
  // Mock Data
  const companies: CompanyCreditProfile[] = [
    {
      id: '1',
      name: 'TechNova Solutions Ltd.',
      industry: 'Technology',
      totalLimit: 5000000,
      totalUtilized: 1250000,
      riskRating: 'AA',
      creditLines: [
        { id: 'CL1', type: 'Revolving', limit: 3000000, utilized: 800000, interestRate: '4.5%', status: 'Active', expiryDate: 'Dec 31, 2025', nextReview: 'Jun 15, 2025', covenants: [{ name: 'Debt to Equity', status: 'Pass' }, { name: 'Interest Coverage', status: 'Pass' }] },
        { id: 'CL2', type: 'Letter of Credit', limit: 2000000, utilized: 450000, interestRate: '2.1%', status: 'Active', expiryDate: 'Mar 10, 2026', nextReview: 'Sep 10, 2024', covenants: [{ name: 'Current Ratio', status: 'Warning' }] }
      ],
      usageHistory: [
        { month: 'May', value: 850000 }, { month: 'Jun', value: 920000 }, { month: 'Jul', value: 1100000 },
        { month: 'Aug', value: 1050000 }, { month: 'Sep', value: 1200000 }, { month: 'Oct', value: 1250000 }
      ]
    },
    {
      id: '2',
      name: 'GreenLeaf Logistics',
      industry: 'Logistics',
      totalLimit: 1500000,
      totalUtilized: 1420000,
      riskRating: 'BBB',
      creditLines: [
        { id: 'CL3', type: 'Overdraft', limit: 1500000, utilized: 1420000, interestRate: '6.2%', status: 'Under Review', expiryDate: 'Oct 31, 2024', nextReview: 'Immediate', covenants: [{ name: 'Asset Coverage', status: 'Fail' }] }
      ],
      usageHistory: [
        { month: 'May', value: 1100000 }, { month: 'Jun', value: 1150000 }, { month: 'Jul', value: 1300000 },
        { month: 'Aug', value: 1350000 }, { month: 'Sep', value: 1400000 }, { month: 'Oct', value: 1420000 }
      ]
    },
    {
      id: '3',
      name: 'Quantum Dynamics',
      industry: 'Manufacturing',
      totalLimit: 10000000,
      totalUtilized: 2500000,
      riskRating: 'AAA',
      creditLines: [
        { id: 'CL4', type: 'Term Loan', limit: 10000000, utilized: 2500000, interestRate: '3.8%', status: 'Active', expiryDate: 'Aug 10, 2030', nextReview: 'Aug 10, 2025', covenants: [{ name: 'Fixed Charge Coverage', status: 'Pass' }] }
      ],
      usageHistory: [
        { month: 'May', value: 2400000 }, { month: 'Jun', value: 2450000 }, { month: 'Jul', value: 2500000 },
        { month: 'Aug', value: 2500000 }, { month: 'Sep', value: 2500000 }, { month: 'Oct', value: 2500000 }
      ]
    }
  ];

  const [selectedCompany, setSelectedCompany] = useState<CompanyCreditProfile>(companies[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeLine, setActiveLine] = useState<CreditLine | null>(companies[0].creditLines[0] || null);
  const [filterType, setFilterType] = useState("All");

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCompany = (company: CompanyCreditProfile) => {
    setSelectedCompany(company);
    setSearchTerm("");
    setShowDropdown(false);
    setActiveLine(company.creditLines.length > 0 ? company.creditLines[0] : null);
  };

  const filteredCreditLines = useMemo(() => {
    return selectedCompany.creditLines.filter(line => 
      filterType === 'All' || line.type.toLowerCase().includes(filterType.toLowerCase())
    );
  }, [selectedCompany, filterType]);

  const formatCurrency = (val: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(val);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
      case 'Under Review': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800';
      case 'Frozen': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
      default: return 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700';
    }
  };

  const getCovenantColor = (status: string) => {
    switch (status) {
      case 'Pass': return 'text-emerald-500';
      case 'Warning': return 'text-amber-500';
      case 'Fail': return 'text-red-500';
      default: return 'text-slate-400';
    }
  };

  const utilizationPercentage = (selectedCompany.totalUtilized / selectedCompany.totalLimit) * 100;

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Landmark className="text-indigo-500" /> Credit Line Management
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
             Oversee credit facilities, monitor covenants, and manage corporate borrowing capacity.
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto relative z-20">
            <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search company credit records..." 
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
                                            <p className="text-xs text-slate-500">Rating: {comp.riskRating} • Limit: {formatCurrency(comp.totalLimit)}</p>
                                        </div>
                                        {selectedCompany.id === comp.id && <Check className="text-indigo-600 dark:text-indigo-400" size={16} />}
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
                <Plus size={18} /> New Facility
            </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Total Credit Limit</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{formatCurrency(selectedCompany.totalLimit)}</h3>
              <p className="text-xs text-slate-400 mt-1">Aggregated across all lines</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Utilization</p>
              <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{(utilizationPercentage).toFixed(1)}%</h3>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${utilizationPercentage > 80 ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
                      {utilizationPercentage > 80 ? 'High' : 'Healthy'}
                  </span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className={`h-full ${utilizationPercentage > 80 ? 'bg-red-500' : 'bg-emerald-500'}`} style={{ width: `${Math.min(utilizationPercentage, 100)}%` }}></div>
              </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Risk Rating</p>
              <h3 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{selectedCompany.riskRating}</h3>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1"><ShieldCheck size={12}/> Investment Grade</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Next Review</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedCompany.creditLines[0]?.nextReview || 'TBD'}</h3>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1"><Clock size={12}/> Periodic Audit</p>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
          
          {/* Left Column: Credit Facilities List */}
          <div className="lg:col-span-2 flex flex-col gap-4 overflow-y-auto pr-2">
              <div className="flex justify-between items-center mb-2 px-1">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">Active Facilities</h3>
                  <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                      {['All', 'Revolving', 'Overdraft', 'Loan'].map(t => (
                          <button
                            key={t}
                            onClick={() => setFilterType(t)}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                filterType === t 
                                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-sm' 
                                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                            }`}
                          >
                              {t}
                          </button>
                      ))}
                  </div>
              </div>

              {filteredCreditLines.map(line => (
                  <div 
                    key={line.id} 
                    onClick={() => setActiveLine(line)}
                    className={`bg-white dark:bg-slate-900 p-5 rounded-2xl border transition-all cursor-pointer group hover:shadow-md relative overflow-hidden ${
                        activeLine?.id === line.id 
                        ? 'border-indigo-500 ring-1 ring-indigo-500 shadow-md' 
                        : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700'
                    }`}
                  >
                      <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                              <div className={`p-2.5 rounded-xl ${
                                  line.type === 'Revolving' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30' :
                                  line.type === 'Term Loan' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30' :
                                  'bg-slate-100 text-slate-600 dark:bg-slate-800'
                              }`}>
                                  <ArrowRightLeft size={20} />
                              </div>
                              <div>
                                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">{line.type} Facility</h4>
                                  <p className="text-xs text-slate-500 font-mono mt-0.5">{line.id} • Rate: {line.interestRate}</p>
                              </div>
                          </div>
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${getStatusColor(line.status)}`}>
                              {line.status}
                          </span>
                      </div>

                      <div className="flex justify-between items-end">
                          <div className="text-xs text-slate-500 space-y-1">
                              <p>Expires: <span className="font-medium text-slate-700 dark:text-slate-300">{line.expiryDate}</span></p>
                              <div className="flex items-center gap-2 mt-2">
                                 <div className="flex -space-x-1">
                                     {line.covenants.map((cov, i) => (
                                         <div key={i} className={`w-3 h-3 rounded-full border-2 border-white dark:border-slate-900 ${
                                             cov.status === 'Pass' ? 'bg-emerald-500' :
                                             cov.status === 'Warning' ? 'bg-amber-500' :
                                             cov.status === 'Fail' ? 'bg-red-500' : 'bg-slate-200'
                                         }`} title={cov.name} />
                                     ))}
                                 </div>
                                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Covenant Health</span>
                              </div>
                          </div>
                          <div className="text-right">
                              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">Utilized / Limit</p>
                              <p className="text-xl font-bold text-slate-900 dark:text-white">
                                  {formatCurrency(line.utilized)} <span className="text-slate-400 font-normal">/ {formatCurrency(line.limit)}</span>
                              </p>
                          </div>
                      </div>
                  </div>
              ))}
          </div>

          {/* Right Column: Facility Analytics & Controls */}
          <div className="space-y-6">
              {activeLine ? (
                  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col h-full animate-in slide-in-from-right duration-300">
                      <div className="flex justify-between items-start mb-6">
                          <div>
                              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Facility Detail</h3>
                              <p className="text-xs text-slate-500">Ref: {activeLine.id}</p>
                          </div>
                          <button onClick={() => setActiveLine(null)} className="md:hidden text-slate-400 p-1 hover:bg-slate-100 rounded-lg transition-colors"><X size={20} /></button>
                      </div>

                      <div className="space-y-6 flex-1">
                          {/* Utilization Chart */}
                          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 flex flex-col gap-4 shadow-inner">
                              <div className="flex justify-between items-center">
                                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide">Historical Utilization</h4>
                                  <span className="text-[10px] font-bold text-indigo-500 flex items-center gap-1"><TrendingUp size={10} /> Trend</span>
                              </div>
                              <div className="h-24 w-full">
                                  <ResponsiveContainer width="100%" height="100%">
                                      <AreaChart data={selectedCompany.usageHistory}>
                                          <defs>
                                              <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                                                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                                                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                              </linearGradient>
                                          </defs>
                                          <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2} fill="url(#colorUsage)" />
                                      </AreaChart>
                                  </ResponsiveContainer>
                              </div>
                          </div>

                          {/* Covenants Detail */}
                          <div>
                              <div className="flex justify-between items-center mb-3 px-1">
                                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Financial Covenants</h4>
                                  <button className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline">Compliance Docs</button>
                              </div>
                              <div className="space-y-2">
                                  {activeLine.covenants.map((cov, i) => (
                                      <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800/50 hover:border-indigo-200 transition-colors shadow-sm">
                                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{cov.name}</span>
                                          <div className="flex items-center gap-2">
                                              <span className={`text-[10px] font-bold uppercase ${getCovenantColor(cov.status)}`}>{cov.status}</span>
                                              {cov.status === 'Pass' ? <CheckCircle2 size={14} className="text-emerald-500" /> : <ShieldAlert size={14} className="text-amber-500" />}
                                          </div>
                                      </div>
                                  ))}
                              </div>
                          </div>

                          {/* Action Bar */}
                          <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-700 space-y-3">
                              <div className="grid grid-cols-2 gap-3">
                                  <button className="py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all active:scale-95 shadow-sm flex items-center justify-center gap-2">
                                      <DollarSign size={16} /> Draw Funds
                                  </button>
                                  <button className="py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95 shadow-sm">
                                      Request Review
                                  </button>
                              </div>
                              <button className="w-full py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center gap-2">
                                  <Scale size={16} /> Modify Terms
                              </button>
                              <button className="w-full py-2.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm font-bold hover:bg-red-100 dark:hover:bg-red-900/40 transition-all active:scale-95 flex items-center justify-center gap-2 border border-red-100 dark:border-red-900/30">
                                  <Lock size={16} /> Freeze Credit Line
                              </button>
                          </div>
                      </div>
                  </div>
              ) : (
                  <div className="bg-slate-50 dark:bg-slate-900/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 p-8 flex flex-col items-center justify-center text-center h-full text-slate-400">
                      <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-800 mb-4 opacity-50 shadow-inner">
                        <Landmark size={48} />
                      </div>
                      <p className="font-medium">Select a credit facility to manage limits and compliance</p>
                      <p className="text-xs mt-1">Detailed analysis and real-time controls will appear here.</p>
                  </div>
              )}
          </div>
      </div>
    </div>
  );
};
