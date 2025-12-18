
import React, { useState } from 'react';
import { Search, Filter, Download, RefreshCw, ArrowRightLeft, TrendingUp, TrendingDown, DollarSign, Euro, PoundSterling, JapaneseYen, Plus, Globe, History as HistoryIcon, ChevronDown, Check, ArrowRight, X, Eye, ShieldCheck, Activity, Landmark, FileText, Zap, AlertCircle, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface CurrencyTrade {
  id: string;
  reference: string;
  type: 'Spot' | 'Forward' | 'Swap';
  pair: string;
  amount: number;
  rate: number;
  date: string;
  status: 'Completed' | 'Pending' | 'Awaiting Settlement' | 'Held';
  counterparty: string;
  valueDate: string;
  fees: string;
}

interface CompanyFXProfile {
  id: string;
  name: string;
  industry: string;
  baseCurrency: string;
  dailyVolume: string;
  activeHedges: number;
  avgSpread: string;
  trades: CurrencyTrade[];
}

export const CorporateCurrencyTransactionsPage: React.FC = () => {
  // Mock Data
  const companies: CompanyFXProfile[] = [
    {
      id: '1',
      name: 'TechNova Solutions Ltd.',
      industry: 'Technology',
      baseCurrency: 'USD',
      dailyVolume: '$2.4M',
      activeHedges: 8,
      avgSpread: '0.05%',
      trades: [
        { id: 'T1', reference: 'FX-SP-9921', type: 'Spot', pair: 'EUR/USD', amount: 250000, rate: 1.0821, date: 'Today, 10:30 AM', status: 'Pending', counterparty: 'JP Morgan', valueDate: 'Oct 26, 2024', fees: '$125.00' },
        { id: 'T2', reference: 'FX-FW-8820', type: 'Forward', pair: 'GBP/USD', amount: 15000, rate: 1.2945, date: 'Yesterday, 14:15 PM', status: 'Awaiting Settlement', counterparty: 'HSBC', valueDate: 'Dec 01, 2024', fees: '$45.00' },
        { id: 'T3', reference: 'FX-SW-7712', type: 'Swap', pair: 'USD/JPY', amount: 500000, rate: 149.20, date: 'Oct 22, 2024', status: 'Completed', counterparty: 'CitiBank', valueDate: 'Oct 22, 2024', fees: '$200.00' },
      ]
    },
    {
      id: '2',
      name: 'GreenLeaf Logistics',
      industry: 'Logistics',
      baseCurrency: 'USD',
      dailyVolume: '$0.8M',
      activeHedges: 2,
      avgSpread: '0.12%',
      trades: [
        { id: 'T4', reference: 'FX-SP-5541', type: 'Spot', pair: 'USD/CAD', amount: 50000, rate: 1.3650, date: 'Today, 11:00 AM', status: 'Held', counterparty: 'BofA', valueDate: 'Oct 24, 2024', fees: '$60.00' }
      ]
    },
    {
      id: '3',
      name: 'Quantum Dynamics',
      industry: 'Manufacturing',
      baseCurrency: 'EUR',
      dailyVolume: '$5.2M',
      activeHedges: 15,
      avgSpread: '0.03%',
      trades: []
    }
  ];

  const [selectedCompany, setSelectedCompany] = useState<CompanyFXProfile>(companies[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState<CurrencyTrade | null>(companies[0].trades[0] || null);
  const [filterType, setFilterType] = useState("All");

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTrades = selectedCompany.trades.filter(t => 
    filterType === "All" || t.type === filterType
  );

  const handleSelectCompany = (company: CompanyFXProfile) => {
    setSelectedCompany(company);
    setSearchTerm("");
    setShowDropdown(false);
    setSelectedTrade(company.trades.length > 0 ? company.trades[0] : null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'text-emerald-700 bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
      case 'Pending':
      case 'Awaiting Settlement': return 'text-blue-700 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      case 'Held': return 'text-red-700 bg-red-100 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
      default: return 'text-slate-600 bg-slate-100 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700';
    }
  };

  const marketRates = [
    { time: '09:00', rate: 1.081 },
    { time: '10:00', rate: 1.083 },
    { time: '11:00', rate: 1.082 },
    { time: '12:00', rate: 1.085 },
    { time: '13:00', rate: 1.084 },
    { time: '14:00', rate: 1.087 },
  ];

  const formatCurrency = (val: number, currency: string) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency, maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-2 space-y-6">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <RefreshCw className="text-indigo-500" /> Currency Transactions
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
             Manage foreign exchange operations, hedging strategies, and liquidity movements.
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto relative z-20">
            <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search company or trade ref..." 
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
                                            <p className="text-xs text-slate-500">Base: {comp.baseCurrency} • {comp.industry}</p>
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
                <Plus size={18} /> New Trade
            </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Daily FX Volume</p>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedCompany.dailyVolume}</h3>
              </div>
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl">
                  <Activity size={24} />
              </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Active Hedges</p>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedCompany.activeHedges}</h3>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
                  <ShieldCheck size={24} />
              </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Avg. Spread</p>
                  <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{selectedCompany.avgSpread}</h3>
              </div>
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl">
                  <TrendingUp size={24} />
              </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Pending Ops</p>
                  <h3 className="text-2xl font-bold text-amber-600 dark:text-amber-400">{selectedCompany.trades.filter(t => t.status === 'Pending').length}</h3>
              </div>
              <div className="p-3 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-xl">
                  <Clock size={24} />
              </div>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
          
          {/* Left Column: Transaction Feed */}
          <div className="lg:col-span-2 flex flex-col gap-4 overflow-y-auto pr-2">
              <div className="flex justify-between items-center mb-2 px-1">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">Recent Operations</h3>
                  <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                      {['All', 'Spot', 'Forward', 'Swap'].map(t => (
                          <button
                            key={t}
                            onClick={() => setFilterType(t)}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                filterType === t 
                                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-sm' 
                                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                            }`}
                          >
                              {t}
                          </button>
                      ))}
                  </div>
              </div>

              {filteredTrades.length > 0 ? filteredTrades.map(trade => (
                  <div 
                    key={trade.id} 
                    onClick={() => setSelectedTrade(trade)}
                    className={`bg-white dark:bg-slate-900 p-5 rounded-2xl border transition-all cursor-pointer group hover:shadow-md relative overflow-hidden ${
                        selectedTrade?.id === trade.id 
                        ? 'border-indigo-500 ring-1 ring-indigo-500 shadow-md' 
                        : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700'
                    }`}
                  >
                      <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                              <div className={`p-2.5 rounded-xl ${
                                  trade.type === 'Spot' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30' :
                                  trade.type === 'Forward' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30' :
                                  'bg-amber-100 text-amber-600 dark:bg-amber-900/30'
                              }`}>
                                  <ArrowRightLeft size={20} />
                              </div>
                              <div>
                                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">{trade.pair}</h4>
                                  <p className="text-xs text-slate-500 font-mono mt-0.5">{trade.reference} • {trade.type}</p>
                              </div>
                          </div>
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${getStatusColor(trade.status)}`}>
                              {trade.status}
                          </span>
                      </div>

                      <div className="flex justify-between items-end">
                          <div className="text-xs text-slate-500 space-y-1">
                              <p>Counterparty: <span className="font-medium text-slate-700 dark:text-slate-300">{trade.counterparty}</span></p>
                              <p>Execution: <span className="font-medium text-slate-700 dark:text-slate-300">{trade.date}</span></p>
                          </div>
                          <div className="text-right">
                              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Amount</p>
                              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                  {trade.pair.split('/')[0]} {trade.amount.toLocaleString()}
                              </p>
                              <p className="text-xs text-slate-500 mt-0.5">Rate: {trade.rate}</p>
                          </div>
                      </div>
                  </div>
              )) : (
                  <div className="text-center py-16 text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                      <RefreshCw size={48} className="mx-auto mb-2 opacity-30" />
                      <p className="font-medium">No transactions found for this company.</p>
                  </div>
              )}
          </div>

          {/* Right Column: Execution & Market */}
          <div className="space-y-6">
              {selectedTrade ? (
                  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col h-full animate-in slide-in-from-right duration-300">
                      <div className="flex justify-between items-start mb-6">
                          <div>
                              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Execution Audit</h3>
                              <p className="text-xs text-slate-500">{selectedTrade.reference}</p>
                          </div>
                          <button onClick={() => setSelectedTrade(null)} className="md:hidden text-slate-400"><X size={20} /></button>
                      </div>

                      <div className="space-y-6 flex-1">
                          {/* Live Rate Context */}
                          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 flex flex-col gap-4">
                              <div className="flex justify-between items-center">
                                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide">Market Context (EUR/USD)</h4>
                                  <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-1"><Zap size={10} /> Live</span>
                              </div>
                              <div className="h-24 w-full">
                                  <ResponsiveContainer width="100%" height="100%">
                                      <AreaChart data={marketRates}>
                                          <defs>
                                              <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                                                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                                                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                              </linearGradient>
                                          </defs>
                                          <Area type="monotone" dataKey="rate" stroke="#6366f1" strokeWidth={2} fill="url(#colorRate)" />
                                      </AreaChart>
                                  </ResponsiveContainer>
                              </div>
                              <div className="flex justify-between text-xs">
                                  <span className="text-slate-500">Execution Rate: <strong>{selectedTrade.rate}</strong></span>
                                  <span className="text-emerald-500 font-bold">In-the-money</span>
                              </div>
                          </div>

                          {/* Trade Summary */}
                          <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                  <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                                      <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Value Date</p>
                                      <p className="text-sm font-bold text-slate-900 dark:text-white">{selectedTrade.valueDate}</p>
                                  </div>
                                  <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                                      <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Total Fees</p>
                                      <p className="text-sm font-bold text-slate-900 dark:text-white">{selectedTrade.fees}</p>
                                  </div>
                              </div>
                              <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                                  <p className="text-[10px] text-slate-400 font-bold uppercase mb-2">Counterparty</p>
                                  <div className="flex items-center gap-3">
                                      <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300">
                                          <Landmark size={16} />
                                      </div>
                                      <p className="font-bold text-slate-900 dark:text-white text-sm">{selectedTrade.counterparty}</p>
                                  </div>
                              </div>
                          </div>

                          {/* Actions */}
                          <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-700 space-y-3">
                              <div className="grid grid-cols-2 gap-3">
                                  <button className="py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm flex items-center justify-center gap-2">
                                      <CheckCircle2 size={16} /> Execute
                                  </button>
                                  <button className="py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                      Edit Order
                                  </button>
                              </div>
                              <button className="w-full py-2.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm font-bold hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors flex items-center justify-center gap-2">
                                  <XCircle size={16} /> Cancel Trade
                              </button>
                              <button className="w-full py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                                  <FileText size={16} /> View Confirmation
                              </button>
                          </div>
                      </div>
                  </div>
              ) : (
                  <div className="bg-slate-50 dark:bg-slate-900/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 p-8 flex flex-col items-center justify-center text-center h-full text-slate-400">
                      <ArrowRightLeft size={48} className="mb-4 opacity-20" />
                      <p className="font-medium">Select a transaction to manage its execution lifecycle</p>
                  </div>
              )}
          </div>
      </div>
    </div>
  );
};
