
import React, { useState, useMemo } from 'react';
import { Search, Filter, Download, Landmark, ArrowRightLeft, Activity, Plus, ChevronDown, Check, Eye, DollarSign, RefreshCw, X, Clock, ShieldCheck, TrendingUp, BarChart3, ArrowUpRight, ArrowDownLeft, Lock, AlertTriangle, CheckCircle2, Zap, Scale } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface OverdraftAccount {
  id: string;
  accountName: string;
  accountNumber: string;
  limit: number;
  utilized: number;
  interestRate: string; // e.g., "LIBOR + 2.5%"
  status: 'Active' | 'Limit Warning' | 'Exceeded' | 'Frozen';
  gracePeriod: string;
  lastUsed: string;
}

interface CompanyOverdraftProfile {
  id: string;
  name: string;
  industry: string;
  totalLimit: number;
  totalUtilized: number;
  avgRate: string;
  accounts: OverdraftAccount[];
  usageHistory: { day: string; value: number }[];
}

export const CorporateOverdraftsPage: React.FC = () => {
  // Mock Data
  const companies: CompanyOverdraftProfile[] = [
    {
      id: '1',
      name: 'TechNova Solutions Ltd.',
      industry: 'Technology',
      totalLimit: 1200000,
      totalUtilized: 450000,
      avgRate: '4.8%',
      accounts: [
        { id: 'OA1', accountName: 'Primary Operating - USD', accountNumber: '**** 8821', limit: 800000, utilized: 320000, interestRate: '4.5%', status: 'Active', gracePeriod: '5 Days', lastUsed: '2 hours ago' },
        { id: 'OA2', accountName: 'Payroll Reserve - EUR', accountNumber: '**** 4402', limit: 300000, utilized: 130000, interestRate: '5.2%', status: 'Limit Warning', gracePeriod: '3 Days', lastUsed: 'Yesterday' },
        { id: 'OA3', accountName: 'R&D Innovation Fund', accountNumber: '**** 1109', limit: 100000, utilized: 0, interestRate: '4.0%', status: 'Active', gracePeriod: '7 Days', lastUsed: '1 week ago' },
      ],
      usageHistory: [
        { day: 'Mon', value: 250000 }, { day: 'Tue', value: 310000 }, { day: 'Wed', value: 480000 },
        { day: 'Thu', value: 420000 }, { day: 'Fri', value: 450000 }, { day: 'Sat', value: 440000 }, { day: 'Sun', value: 450000 }
      ]
    },
    {
      id: '2',
      name: 'GreenLeaf Logistics',
      industry: 'Logistics',
      totalLimit: 500000,
      totalUtilized: 485000,
      avgRate: '6.2%',
      accounts: [
        { id: 'OA4', accountName: 'Fleet Operations', accountNumber: '**** 5541', limit: 500000, utilized: 485000, interestRate: '6.2%', status: 'Exceeded', gracePeriod: '2 Days', lastUsed: '1 hour ago' }
      ],
      usageHistory: [
        { day: 'Mon', value: 400000 }, { day: 'Tue', value: 420000 }, { day: 'Wed', value: 450000 },
        { day: 'Thu', value: 490000 }, { day: 'Fri', value: 485000 }, { day: 'Sat', value: 480000 }, { day: 'Sun', value: 485000 }
      ]
    },
    {
      id: '3',
      name: 'Quantum Dynamics',
      industry: 'Manufacturing',
      totalLimit: 2500000,
      totalUtilized: 120000,
      avgRate: '3.9%',
      accounts: [
        { id: 'OA5', accountName: 'HQ Treasury', accountNumber: '**** 0012', limit: 2000000, utilized: 120000, interestRate: '3.5%', status: 'Active', gracePeriod: '10 Days', lastUsed: '3 days ago' },
        { id: 'OA6', accountName: 'Materials Procurement', accountNumber: '**** 9931', limit: 500000, utilized: 0, interestRate: '4.2%', status: 'Active', gracePeriod: '5 Days', lastUsed: 'Never' }
      ],
      usageHistory: [
        { day: 'Mon', value: 100000 }, { day: 'Tue', value: 110000 }, { day: 'Wed', value: 120000 },
        { day: 'Thu', value: 115000 }, { day: 'Fri', value: 120000 }, { day: 'Sat', value: 110000 }, { day: 'Sun', value: 120000 }
      ]
    }
  ];

  const [selectedCompany, setSelectedCompany] = useState<CompanyOverdraftProfile>(companies[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<OverdraftAccount | null>(companies[0].accounts[0] || null);
  const [filterStatus, setFilterStatus] = useState("All");

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAccounts = useMemo(() => {
    return selectedCompany.accounts.filter(acc => 
      filterStatus === 'All' || acc.status === filterStatus
    );
  }, [selectedCompany, filterStatus]);

  const handleSelectCompany = (company: CompanyOverdraftProfile) => {
    setSelectedCompany(company);
    setSearchTerm("");
    setShowDropdown(false);
    setSelectedAccount(company.accounts.length > 0 ? company.accounts[0] : null);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
      case 'Limit Warning': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800';
      case 'Exceeded': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
      case 'Frozen': return 'bg-slate-900 text-white dark:bg-slate-700 border-slate-950 dark:border-slate-600';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const utilizationPercentage = (selectedCompany.totalUtilized / selectedCompany.totalLimit) * 100;

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-2 space-y-6">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Zap className="text-indigo-500" /> Overdraft Management
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
             Configure short-term liquidity buffers and monitor unarranged overdraft exposure.
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto relative z-20">
            <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search company overdrafts..." 
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
                                            <p className="text-xs text-slate-500">Utilization: {((comp.totalUtilized / comp.totalLimit) * 100).toFixed(1)}%</p>
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
                <Plus size={18} /> Setup Overdraft
            </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Combined Limit</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{formatCurrency(selectedCompany.totalLimit)}</h3>
              <p className="text-xs text-slate-400 mt-1">Arranged buffers</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Current Usage</p>
              <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{formatCurrency(selectedCompany.totalUtilized)}</h3>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${utilizationPercentage > 85 ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
                      {utilizationPercentage.toFixed(1)}%
                  </span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className={`h-full ${utilizationPercentage > 85 ? 'bg-red-500' : 'bg-emerald-500'}`} style={{ width: `${Math.min(utilizationPercentage, 100)}%` }}></div>
              </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Avg Interest Rate</p>
              <h3 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{selectedCompany.avgRate}</h3>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1"><TrendingUp size={12}/> Effective APR</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Active Warnings</p>
              <h3 className={`text-2xl font-bold ${selectedCompany.accounts.some(a => a.status === 'Exceeded') ? 'text-red-600' : 'text-slate-900 dark:text-white'}`}>
                  {selectedCompany.accounts.filter(a => a.status !== 'Active').length}
              </h3>
              <p className="text-xs text-slate-400 mt-1">Require audit</p>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
          
          {/* Left Column: Overdraft Facilities */}
          <div className="lg:col-span-2 flex flex-col gap-4 overflow-y-auto pr-2 pb-10">
              <div className="flex justify-between items-center mb-2 px-1">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">Facility Directory</h3>
                  <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                      {['All', 'Active', 'Limit Warning', 'Exceeded'].map(t => (
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

              {filteredAccounts.map(account => (
                  <div 
                    key={account.id} 
                    onClick={() => setSelectedAccount(account)}
                    className={`bg-white dark:bg-slate-900 p-5 rounded-2xl border transition-all cursor-pointer group hover:shadow-md relative overflow-hidden ${
                        selectedAccount?.id === account.id 
                        ? 'border-indigo-500 ring-1 ring-indigo-500 shadow-md' 
                        : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700'
                    }`}
                  >
                      <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                              <div className={`p-2.5 rounded-xl ${
                                  account.status === 'Active' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30' :
                                  account.status === 'Exceeded' ? 'bg-red-50 text-red-600 dark:bg-red-900/30' :
                                  'bg-amber-50 text-amber-600 dark:bg-amber-900/30'
                              }`}>
                                  <Landmark size={20} />
                              </div>
                              <div>
                                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">{account.accountName}</h4>
                                  <p className="text-xs text-slate-500 font-mono mt-0.5">{account.accountNumber} • Rate: {account.interestRate}</p>
                              </div>
                          </div>
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${getStatusColor(account.status)}`}>
                              {account.status}
                          </span>
                      </div>

                      <div className="flex justify-between items-end">
                          <div className="text-xs text-slate-500 space-y-1">
                              <p>Last Activity: <span className="font-medium text-slate-700 dark:text-slate-300">{account.lastUsed}</span></p>
                              <div className="flex items-center gap-2 mt-2">
                                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Utilization</span>
                                 <div className="w-48 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                     <div 
                                        className={`h-full ${account.utilized > account.limit ? 'bg-red-500' : 'bg-indigo-500'}`} 
                                        style={{ width: `${Math.min((account.utilized / account.limit) * 100, 100)}%` }}
                                     />
                                 </div>
                                 <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">
                                     {((account.utilized / account.limit) * 100).toFixed(0)}%
                                 </span>
                              </div>
                          </div>
                          <div className="text-right">
                              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">Drawn Balance</p>
                              <p className="text-xl font-bold text-slate-900 dark:text-white">
                                  {formatCurrency(account.utilized)}
                              </p>
                          </div>
                      </div>
                  </div>
              ))}

              {filteredAccounts.length === 0 && (
                  <div className="text-center py-16 text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                      <Zap size={48} className="mx-auto mb-2 opacity-30" />
                      <p className="font-medium">No overdraft facilities match your filter.</p>
                  </div>
              )}
          </div>

          {/* Right Column: Account Analytics & Controls */}
          <div className="space-y-6">
              {selectedAccount ? (
                  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col h-full animate-in slide-in-from-right duration-300">
                      <div className="flex justify-between items-start mb-6">
                          <div>
                              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Account Detail</h3>
                              <p className="text-xs text-slate-500">Ref: {selectedAccount.id}</p>
                          </div>
                          <button onClick={() => setSelectedAccount(null)} className="md:hidden text-slate-400 p-1 hover:bg-slate-100 rounded-lg transition-colors"><X size={20} /></button>
                      </div>

                      <div className="space-y-6 flex-1">
                          {/* Daily Exposure Chart */}
                          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 flex flex-col gap-4 shadow-inner">
                              <div className="flex justify-between items-center">
                                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide">Daily Peak Usage</h4>
                                  <span className="text-[10px] font-bold text-indigo-500 flex items-center gap-1"><TrendingUp size={10} /> 7D View</span>
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

                          {/* Term Detail Grid */}
                          <div className="grid grid-cols-2 gap-4">
                              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm">
                                  <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Interest Rate</p>
                                  <p className="font-bold text-slate-900 dark:text-white text-base">{selectedAccount.interestRate}</p>
                              </div>
                              <div className={`p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm`}>
                                  <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Grace Period</p>
                                  <p className="font-bold text-slate-900 dark:text-white text-base">{selectedAccount.gracePeriod}</p>
                              </div>
                          </div>

                          {/* Compliance / Covenant Mini-Section */}
                          <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-900/40">
                               <div className="flex items-center gap-2 mb-2">
                                   <ShieldCheck size={16} className="text-indigo-600 dark:text-indigo-400" />
                                   <span className="text-xs font-bold text-indigo-900 dark:text-indigo-200">Arranged Facility</span>
                               </div>
                               <p className="text-xs text-indigo-700 dark:text-indigo-300 leading-relaxed">
                                   This facility is arrangements for unsecured short-term funding. Unarranged drawing beyond {formatCurrency(selectedAccount.limit)} will incur a step-up rate of +200bps.
                               </p>
                          </div>

                          {/* Action Bar */}
                          <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-700 space-y-3">
                              <div className="grid grid-cols-2 gap-3">
                                  <button className="py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all active:scale-95 shadow-sm flex items-center justify-center gap-2">
                                      <RefreshCw size={16} /> Repay Balance
                                  </button>
                                  <button className="py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95 shadow-sm">
                                      View History
                                  </button>
                              </div>
                              <button className="w-full py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center gap-2">
                                  <Scale size={16} /> Change Limit
                              </button>
                              <button className="w-full py-2.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm font-bold hover:bg-red-100 dark:hover:bg-red-900/40 transition-all active:scale-95 flex items-center justify-center gap-2 border border-red-100 dark:border-red-900/30">
                                  <Lock size={16} /> Freeze Access
                              </button>
                          </div>
                      </div>
                  </div>
              ) : (
                  <div className="bg-slate-50 dark:bg-slate-900/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 p-8 flex flex-col items-center justify-center text-center h-full text-slate-400">
                      <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-800 mb-4 opacity-50 shadow-inner">
                        <Activity size={48} />
                      </div>
                      <p className="font-medium">Select an account to manage overdraft status</p>
                      <p className="text-xs mt-1">Detailed utilization analytics and controls will appear here.</p>
                  </div>
              )}
          </div>
      </div>
    </div>
  );
};
