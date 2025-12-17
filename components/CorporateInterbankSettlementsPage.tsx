
import React, { useState } from 'react';
// Added missing ChevronRight import
import { Search, Filter, Download, Landmark, ArrowRightLeft, Globe, Activity, FileText, Plus, ChevronDown, Check, Eye, DollarSign, RefreshCw, X, Clock, ShieldCheck, TrendingUp, BarChart3, ArrowUpRight, ArrowDownLeft, ChevronRight } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, Cell } from 'recharts';

interface SettlementAccount {
  id: string;
  bankName: string;
  accountType: 'Nostro' | 'Vostro' | 'Clearing';
  currency: string;
  balance: number;
  status: 'Active' | 'Under Reconciliation' | 'Suspended';
  lastSettlement: string;
  location: string;
}

interface SettlementTransaction {
  id: string;
  reference: string;
  type: 'Inbound' | 'Outbound' | 'Netting';
  counterpartyBank: string;
  amount: number;
  currency: string;
  date: string;
  method: 'SWIFT' | 'RTGS' | 'Fedwire' | 'ACH';
  status: 'Completed' | 'Pending' | 'Queued' | 'Failed';
}

interface CompanySettlementProfile {
  id: string;
  name: string;
  industry: string;
  netPosition: number;
  liquidityTarget: number;
  accounts: SettlementAccount[];
  transactions: SettlementTransaction[];
}

export const CorporateInterbankSettlementsPage: React.FC = () => {
  // Mock Data
  const companies: CompanySettlementProfile[] = [
    {
      id: '1',
      name: 'TechNova Solutions Ltd.',
      industry: 'Technology',
      netPosition: 4250000,
      liquidityTarget: 5000000,
      accounts: [
        { id: 'SA1', bankName: 'JP Morgan Chase', accountType: 'Nostro', currency: 'USD', balance: 2500000, status: 'Active', lastSettlement: '2 hours ago', location: 'New York, US' },
        { id: 'SA2', bankName: 'HSBC London', accountType: 'Nostro', currency: 'GBP', balance: 850000, status: 'Active', lastSettlement: '5 hours ago', location: 'London, UK' },
        { id: 'SA3', bankName: 'Deutsche Bank', accountType: 'Clearing', currency: 'EUR', balance: 900000, status: 'Under Reconciliation', lastSettlement: '1 day ago', location: 'Frankfurt, DE' },
      ],
      transactions: [
        { id: 'ST1', reference: 'SW-99210', type: 'Outbound', counterpartyBank: 'Barclays', amount: 150000, currency: 'USD', date: 'Today, 10:45 AM', method: 'SWIFT', status: 'Completed' },
        { id: 'ST2', reference: 'RT-88201', type: 'Inbound', counterpartyBank: 'CitiBank', amount: 450000, currency: 'USD', date: 'Today, 09:15 AM', method: 'RTGS', status: 'Pending' },
        { id: 'ST3', reference: 'FW-77122', type: 'Netting', counterpartyBank: 'Central Bank', amount: 1200000, currency: 'USD', date: 'Yesterday', method: 'Fedwire', status: 'Completed' },
      ]
    },
    {
      id: '2',
      name: 'GreenLeaf Logistics',
      industry: 'Logistics',
      netPosition: 850000,
      liquidityTarget: 1000000,
      accounts: [
        { id: 'SA4', bankName: 'Wells Fargo', accountType: 'Nostro', currency: 'USD', balance: 850000, status: 'Active', lastSettlement: '3 hours ago', location: 'Chicago, US' }
      ],
      transactions: [
        { id: 'ST4', reference: 'AC-1120', type: 'Outbound', counterpartyBank: 'BofA', amount: 25000, currency: 'USD', date: 'Today, 08:00 AM', method: 'ACH', status: 'Queued' }
      ]
    },
    {
      id: '3',
      name: 'Quantum Dynamics',
      industry: 'Manufacturing',
      // Fixed: Removed 'headquarters' property which is not in CompanySettlementProfile
      netPosition: 12000000,
      liquidityTarget: 15000000,
      accounts: [
        { id: 'SA5', bankName: 'Commerzbank', accountType: 'Nostro', currency: 'EUR', balance: 10000000, status: 'Active', lastSettlement: 'Just now', location: 'Berlin, DE' },
        { id: 'SA6', bankName: 'BNP Paribas', accountType: 'Vostro', currency: 'EUR', balance: 2000000, status: 'Active', lastSettlement: '4 hours ago', location: 'Paris, FR' }
      ],
      transactions: []
    }
  ];

  const [selectedCompany, setSelectedCompany] = useState<CompanySettlementProfile>(companies[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<SettlementAccount | null>(companies[0].accounts[0] || null);
  const [filterMethod, setFilterMethod] = useState("All");

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCompany = (company: CompanySettlementProfile) => {
    setSelectedCompany(company);
    setSearchTerm("");
    setShowDropdown(false);
    setSelectedAccount(company.accounts.length > 0 ? company.accounts[0] : null);
  };

  const formatCurrency = (val: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(val);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Completed': 
      case 'Active': return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
      case 'Pending':
      case 'Queued':
      case 'Under Reconciliation': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800';
      case 'Failed':
      case 'Suspended': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
      default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  const filteredTransactions = selectedCompany.transactions.filter(t => 
    filterMethod === "All" || t.method === filterMethod
  );

  // Chart Data
  const liquidityTrend = [
    { time: '08:00', pos: 3800000 },
    { time: '10:00', pos: 4100000 },
    { time: '12:00', pos: 3950000 },
    { time: '14:00', pos: 4250000 },
    { time: '16:00', pos: 4600000 },
    { time: '18:00', pos: 4400000 },
  ];

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-2 space-y-6">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Landmark className="text-indigo-500" /> Interbank Settlements
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
             Manage Nostro/Vostro accounts, RTGS clearing, and cross-border liquidity positions.
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto relative z-20">
            <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search interbank records..." 
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
                                            <p className="text-xs text-slate-500">Net Position: {formatCurrency(comp.netPosition)}</p>
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
                <Plus size={18} /> Initiate Settlement
            </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between overflow-hidden relative">
              <div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none">
                  <Activity size={120} />
              </div>
              <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Net Position (USD)</p>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{formatCurrency(selectedCompany.netPosition)}</h3>
                  <p className="text-xs text-emerald-500 font-medium mt-1 flex items-center gap-1"><ArrowUpRight size={12}/> +4.2% today</p>
              </div>
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl">
                  <Globe size={24} />
              </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Pending Liquidity</p>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
                      {formatCurrency(selectedCompany.transactions.filter(t => t.status === 'Pending').reduce((acc, t) => acc + (t.type === 'Inbound' ? t.amount : -t.amount), 0))}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">Expected inflows/outflows</p>
              </div>
              <div className="p-3 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-xl">
                  <Clock size={24} />
              </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Settlement Efficiency</p>
                  <h3 className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">99.8%</h3>
                  <p className="text-xs text-slate-400 mt-1">Success rate (30 days)</p>
              </div>
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl">
                  <ShieldCheck size={24} />
              </div>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
          
          {/* Left Column: Nostro Accounts & Transactions */}
          <div className="lg:col-span-2 flex flex-col gap-6 overflow-y-auto pr-2">
              
              {/* Accounts Row */}
              <div className="space-y-4">
                  <div className="flex justify-between items-center px-1">
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white">Nostro / Vostro Accounts</h3>
                      <button className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">Reconcile All</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedCompany.accounts.map(acc => (
                          <div 
                            key={acc.id} 
                            onClick={() => setSelectedAccount(acc)}
                            className={`p-5 rounded-2xl border transition-all cursor-pointer group hover:shadow-md bg-white dark:bg-slate-900 ${
                                selectedAccount?.id === acc.id 
                                ? 'border-indigo-500 ring-1 ring-indigo-500 shadow-md' 
                                : 'border-slate-200 dark:border-slate-800'
                            }`}
                          >
                              <div className="flex justify-between items-start mb-4">
                                  <div className="flex items-center gap-3">
                                      <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                                          <Landmark size={20} />
                                      </div>
                                      <div>
                                          <h4 className="font-bold text-slate-900 dark:text-white text-sm">{acc.bankName}</h4>
                                          <p className="text-xs text-slate-500 mt-0.5">{acc.accountType} • {acc.location}</p>
                                      </div>
                                  </div>
                                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${getStatusColor(acc.status)}`}>
                                      {acc.status}
                                  </span>
                              </div>
                              <div className="flex justify-between items-end">
                                  <div className="text-xs text-slate-500">
                                      <p className="font-medium text-slate-700 dark:text-slate-300">{acc.currency} Balance</p>
                                      <p className="text-2xl font-bold text-slate-900 dark:text-white">{acc.balance.toLocaleString()}</p>
                                  </div>
                                  <div className="text-right">
                                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Last Action</p>
                                      <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">{acc.lastSettlement}</p>
                                  </div>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>

              {/* Transactions Table */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
                  <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                          <h3 className="font-bold text-lg text-slate-900 dark:text-white">Settlement Queue</h3>
                          <p className="text-xs text-slate-500 mt-1">Real-time status of clearing operations</p>
                      </div>
                      <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                          {['All', 'SWIFT', 'RTGS', 'ACH'].map(method => (
                              <button
                                key={method}
                                onClick={() => setFilterMethod(method)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                    filterMethod === method 
                                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-sm' 
                                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                                }`}
                              >
                                  {method}
                              </button>
                          ))}
                      </div>
                  </div>
                  <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                          <thead className="bg-slate-50 dark:bg-slate-900/50 text-xs font-bold uppercase text-slate-500 dark:text-slate-400">
                              <tr>
                                  <th className="p-4 pl-6">Reference</th>
                                  <th className="p-4">Type</th>
                                  <th className="p-4">Counterparty</th>
                                  <th className="p-4">Amount</th>
                                  <th className="p-4">Method</th>
                                  <th className="p-4 pr-6">Status</th>
                              </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                              {filteredTransactions.map(tx => (
                                  <tr key={tx.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                      <td className="p-4 pl-6 font-mono text-xs">{tx.reference}</td>
                                      <td className="p-4">
                                          <div className="flex items-center gap-2">
                                              {tx.type === 'Inbound' ? <ArrowDownLeft size={14} className="text-emerald-500" /> : <ArrowUpRight size={14} className="text-red-500" />}
                                              <span className="font-medium">{tx.type}</span>
                                          </div>
                                      </td>
                                      <td className="p-4 text-slate-600 dark:text-slate-300">{tx.counterpartyBank}</td>
                                      <td className="p-4 font-bold text-slate-900 dark:text-white">{formatCurrency(tx.amount, tx.currency)}</td>
                                      <td className="p-4">
                                          <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-[10px] font-bold text-slate-500">{tx.method}</span>
                                      </td>
                                      <td className="p-4 pr-6">
                                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${getStatusColor(tx.status)}`}>
                                              {tx.status}
                                          </span>
                                      </td>
                                  </tr>
                              ))}
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>

          {/* Right Column: Liquidity Analysis */}
          <div className="space-y-6">
              
              {/* Liquidity Forecast */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col h-[380px]">
                  <div className="flex justify-between items-center mb-6">
                      <h3 className="font-bold text-slate-900 dark:text-white text-base">Liquidity Position</h3>
                      <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400"><RefreshCw size={16}/></button>
                  </div>
                  <div className="flex-1 w-full min-h-0">
                      <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={liquidityTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                              <defs>
                                  <linearGradient id="colorPos" x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                  </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                              <XAxis dataKey="time" hide />
                              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                              <Tooltip 
                                  contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                  formatter={(val: number) => [formatCurrency(val), 'Net Position']}
                              />
                              <Area type="monotone" dataKey="pos" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorPos)" />
                          </AreaChart>
                      </ResponsiveContainer>
                  </div>
                  <div className="mt-4 flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                      <div className="text-xs text-slate-500">Target Coverage</div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">
                          {((selectedCompany.netPosition / selectedCompany.liquidityTarget) * 100).toFixed(1)}%
                      </div>
                  </div>
              </div>

              {/* Action Sidebar Section */}
              {selectedAccount ? (
                  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm animate-in slide-in-from-right duration-300">
                      <div className="flex justify-between items-start mb-6">
                          <h3 className="font-bold text-slate-900 dark:text-white">Account Control</h3>
                          <button onClick={() => setSelectedAccount(null)} className="md:hidden text-slate-400"><X size={20} /></button>
                      </div>
                      
                      <div className="space-y-4">
                          <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Swift / BIC</p>
                              <p className="text-sm font-bold text-slate-900 dark:text-white font-mono">CHASEUS33XXX</p>
                          </div>
                          
                          <button className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                              <div className="flex items-center gap-3">
                                  <FileText size={18} className="text-indigo-500" />
                                  <span className="text-sm font-medium">Daily Reconciliation</span>
                              </div>
                              <ChevronRight size={16} className="text-slate-300" />
                          </button>
                          <button className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                              <div className="flex items-center gap-3">
                                  <Activity size={18} className="text-emerald-500" />
                                  <span className="text-sm font-medium">Liquidity Sweep</span>
                              </div>
                              <ChevronRight size={16} className="text-slate-300" />
                          </button>
                          
                          <div className="pt-6 border-t border-slate-100 dark:border-slate-700">
                              <button className="w-full py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm flex items-center justify-center gap-2">
                                  <ArrowRightLeft size={16} /> Inter-Bank Transfer
                              </button>
                          </div>
                      </div>
                  </div>
              ) : (
                  <div className="bg-slate-50 dark:bg-slate-900/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 p-8 flex flex-col items-center justify-center text-center h-48 text-slate-400">
                      <Landmark size={32} className="mb-2 opacity-20" />
                      <p className="text-sm">Select an account for controls</p>
                  </div>
              )}
          </div>
      </div>
    </div>
  );
};
