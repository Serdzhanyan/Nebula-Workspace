
import React, { useState } from 'react';
import { Search, Filter, Download, RefreshCw, ArrowRightLeft, TrendingUp, TrendingDown, DollarSign, Euro, PoundSterling, JapaneseYen, Plus, Globe, History, ChevronDown, Check, ArrowRight } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface CurrencyHolding {
  code: string;
  name: string;
  symbol: string;
  balance: number;
  valueInBase: number;
  trend: 'up' | 'down' | 'neutral';
  change: number;
}

interface FXTransaction {
  id: string;
  type: 'Spot' | 'Forward' | 'Swap';
  pair: string;
  amount: string;
  rate: number;
  date: string;
  status: 'Settled' | 'Pending';
}

interface CompanyProfile {
  id: string;
  name: string;
  baseCurrency: string;
  holdings: CurrencyHolding[];
  transactions: FXTransaction[];
}

export const CorporateCurrencyAccountsPage: React.FC = () => {
  // Mock Data
  const companies: CompanyProfile[] = [
    {
      id: '1',
      name: 'TechNova Solutions Ltd.',
      baseCurrency: 'USD',
      holdings: [
        { code: 'USD', name: 'US Dollar', symbol: '$', balance: 1250000.00, valueInBase: 1250000.00, trend: 'neutral', change: 0 },
        { code: 'EUR', name: 'Euro', symbol: '€', balance: 450000.00, valueInBase: 486000.00, trend: 'up', change: 1.2 },
        { code: 'GBP', name: 'British Pound', symbol: '£', balance: 120000.00, valueInBase: 152400.00, trend: 'down', change: -0.5 },
        { code: 'JPY', name: 'Japanese Yen', symbol: '¥', balance: 5000000, valueInBase: 33500.00, trend: 'up', change: 0.8 },
      ],
      transactions: [
          { id: 'FX-101', type: 'Spot', pair: 'USD/EUR', amount: '€50,000', rate: 0.92, date: 'Oct 24, 10:30 AM', status: 'Settled' },
          { id: 'FX-102', type: 'Spot', pair: 'USD/GBP', amount: '£25,000', rate: 0.79, date: 'Oct 23, 02:15 PM', status: 'Settled' },
          { id: 'FX-103', type: 'Forward', pair: 'USD/JPY', amount: '¥1,000,000', rate: 149.50, date: 'Oct 20, 09:00 AM', status: 'Pending' },
      ]
    },
    {
      id: '2',
      name: 'GreenLeaf Logistics',
      baseCurrency: 'USD',
      holdings: [
        { code: 'USD', name: 'US Dollar', symbol: '$', balance: 85000.00, valueInBase: 85000.00, trend: 'neutral', change: 0 },
        { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', balance: 120000.00, valueInBase: 88800.00, trend: 'up', change: 0.4 },
        { code: 'MXN', name: 'Mexican Peso', symbol: '$', balance: 500000.00, valueInBase: 27500.00, trend: 'down', change: -1.1 },
      ],
      transactions: [
          { id: 'FX-201', type: 'Spot', pair: 'USD/CAD', amount: 'C$10,000', rate: 1.35, date: 'Oct 24, 11:00 AM', status: 'Settled' },
      ]
    },
    {
      id: '3',
      name: 'Quantum Dynamics',
      baseCurrency: 'EUR',
      holdings: [
         { code: 'EUR', name: 'Euro', symbol: '€', balance: 2500000.00, valueInBase: 2500000.00, trend: 'neutral', change: 0 },
         { code: 'USD', name: 'US Dollar', symbol: '$', balance: 500000.00, valueInBase: 462962.00, trend: 'down', change: -0.2 },
         { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr', balance: 150000.00, valueInBase: 159000.00, trend: 'up', change: 0.9 },
      ],
      transactions: []
    }
  ];

  // Market Rates Mock Data for Chart
  const rateHistoryData = [
      { time: '09:00', rate: 1.081 },
      { time: '10:00', rate: 1.083 },
      { time: '11:00', rate: 1.082 },
      { time: '12:00', rate: 1.085 },
      { time: '13:00', rate: 1.084 },
      { time: '14:00', rate: 1.087 },
      { time: '15:00', rate: 1.089 },
  ];

  const [selectedCompany, setSelectedCompany] = useState<CompanyProfile>(companies[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  
  // Converter State
  const [convertFrom, setConvertFrom] = useState('USD');
  const [convertTo, setConvertTo] = useState('EUR');
  const [convertAmount, setConvertAmount] = useState('');

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCompany = (company: CompanyProfile) => {
    setSelectedCompany(company);
    setSearchTerm("");
    setShowDropdown(false);
  };

  const getCurrencyIcon = (code: string) => {
      switch(code) {
          case 'USD': return <DollarSign size={20} />;
          case 'EUR': return <Euro size={20} />;
          case 'GBP': return <PoundSterling size={20} />;
          case 'JPY': return <JapaneseYen size={20} />;
          default: return <span className="font-bold text-sm">{code}</span>;
      }
  };

  const getTrendIcon = (trend: string) => {
      if (trend === 'up') return <TrendingUp size={16} className="text-emerald-500" />;
      if (trend === 'down') return <TrendingDown size={16} className="text-red-500" />;
      return <div className="w-4 h-1 bg-slate-300 rounded-full"></div>;
  };

  // Mock conversion rate
  const getExchangeRate = (from: string, to: string) => {
      if (from === to) return 1;
      // Simplified mock rates
      const rates: {[key: string]: number} = {
          'USD': 1, 'EUR': 0.92, 'GBP': 0.79, 'JPY': 149.5, 'CAD': 1.36, 'MXN': 18.1, 'CHF': 0.89
      };
      const fromRate = rates[from] || 1;
      const toRate = rates[to] || 1;
      return toRate / fromRate;
  };

  const convertedValue = convertAmount ? (parseFloat(convertAmount) * getExchangeRate(convertFrom, convertTo)).toFixed(2) : '0.00';
  const currentRate = getExchangeRate(convertFrom, convertTo).toFixed(4);

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-2 space-y-6">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <RefreshCw className="text-indigo-500" /> Currency Accounts
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
             Manage foreign exchange exposure, spot trades, and multi-currency balances.
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto relative z-20">
            <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search company accounts..." 
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
                                        className="w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 border-b border-slate-100 dark:border-slate-800 last:border-0 flex justify-between items-center group transition-colors"
                                    >
                                        <div>
                                            <p className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{comp.name}</p>
                                            <p className="text-xs text-slate-500">Base: {comp.baseCurrency}</p>
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
            
            <button className="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">
                <Filter size={18} />
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 dark:shadow-none">
                <Plus size={18} /> Open Balance
            </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
          
          {/* Left Column: Holdings */}
          <div className="lg:col-span-2 space-y-6">
              {/* Holdings Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedCompany.holdings.map((holding) => (
                      <div key={holding.code} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group">
                          <div className="flex justify-between items-start mb-4">
                              <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
                                      {getCurrencyIcon(holding.code)}
                                  </div>
                                  <div>
                                      <h4 className="font-bold text-slate-900 dark:text-white">{holding.name}</h4>
                                      <p className="text-xs text-slate-500 font-mono">{holding.code}</p>
                                  </div>
                              </div>
                              <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-lg">
                                  {getTrendIcon(holding.trend)}
                                  <span className={`text-xs font-bold ${holding.trend === 'up' ? 'text-emerald-600' : holding.trend === 'down' ? 'text-red-600' : 'text-slate-500'}`}>
                                      {holding.change > 0 ? '+' : ''}{holding.change}%
                                  </span>
                              </div>
                          </div>
                          
                          <div className="mb-4">
                              <p className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                                  {holding.symbol}{holding.balance.toLocaleString(undefined, {minimumFractionDigits: 2})}
                              </p>
                              <p className="text-xs text-slate-500 mt-1">
                                  ≈ {formatCurrency(holding.valueInBase, selectedCompany.baseCurrency)}
                              </p>
                          </div>

                          <div className="flex gap-2">
                              <button className="flex-1 py-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-lg text-xs font-bold hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors">
                                  Transfer
                              </button>
                              <button className="flex-1 py-2 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                                  History
                              </button>
                          </div>
                      </div>
                  ))}
              </div>

              {/* Transactions History */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col flex-1">
                  <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                      <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <History size={18} className="text-slate-400" /> FX History
                      </h3>
                      <button className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">View All</button>
                  </div>
                  <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                          <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-xs font-bold uppercase text-slate-500 dark:text-slate-400">
                              <tr>
                                  <th className="p-4 pl-6">Type</th>
                                  <th className="p-4">Pair</th>
                                  <th className="p-4">Amount</th>
                                  <th className="p-4">Rate</th>
                                  <th className="p-4">Date</th>
                                  <th className="p-4 pr-6">Status</th>
                              </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-sm">
                              {selectedCompany.transactions.length > 0 ? (
                                  selectedCompany.transactions.map(tx => (
                                      <tr key={tx.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                                          <td className="p-4 pl-6 font-medium text-slate-900 dark:text-white">{tx.type}</td>
                                          <td className="p-4 text-indigo-600 dark:text-indigo-400 font-bold">{tx.pair}</td>
                                          <td className="p-4 font-mono">{tx.amount}</td>
                                          <td className="p-4 text-slate-500">{tx.rate.toFixed(4)}</td>
                                          <td className="p-4 text-slate-500">{tx.date}</td>
                                          <td className="p-4 pr-6">
                                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border ${
                                                  tx.status === 'Settled' ? 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-900' : 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-900'
                                              }`}>
                                                  {tx.status}
                                              </span>
                                          </td>
                                      </tr>
                                  ))
                              ) : (
                                  <tr>
                                      <td colSpan={6} className="p-8 text-center text-slate-500 dark:text-slate-400">No recent FX transactions found.</td>
                                  </tr>
                              )}
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>

          {/* Right Column: Converter & Market */}
          <div className="space-y-6">
              
              {/* FX Converter Widget */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white shadow-lg border border-slate-700">
                  <div className="flex items-center gap-2 mb-6">
                      <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                        <ArrowRightLeft size={20} />
                      </div>
                      <h3 className="font-bold text-lg">Quick Convert</h3>
                  </div>

                  <div className="space-y-4">
                      {/* From */}
                      <div>
                          <div className="flex justify-between text-xs text-slate-400 mb-1">
                              <span>Sell</span>
                              <span>Bal: {selectedCompany.holdings.find(h => h.code === convertFrom)?.balance.toLocaleString()}</span>
                          </div>
                          <div className="flex bg-black/20 rounded-xl p-1 border border-white/10 focus-within:border-white/30 transition-colors">
                              <input 
                                  type="number" 
                                  placeholder="0.00"
                                  value={convertAmount}
                                  onChange={(e) => setConvertAmount(e.target.value)}
                                  className="w-full bg-transparent border-none text-white placeholder-slate-500 px-3 py-2 outline-none font-mono font-bold text-lg"
                              />
                              <div className="relative">
                                  <select 
                                      value={convertFrom}
                                      onChange={(e) => setConvertFrom(e.target.value)}
                                      className="h-full bg-white/10 text-white border-none rounded-lg text-sm font-bold pl-3 pr-8 outline-none cursor-pointer hover:bg-white/20 transition-colors appearance-none"
                                  >
                                      {selectedCompany.holdings.map(h => <option key={h.code} value={h.code} className="text-black">{h.code}</option>)}
                                  </select>
                                  <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                              </div>
                          </div>
                      </div>

                      <div className="flex justify-center -my-2 relative z-10">
                          <button 
                            onClick={() => {
                                const temp = convertFrom;
                                setConvertFrom(convertTo);
                                setConvertTo(temp);
                            }}
                            className="p-2 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-500 transition-colors border-4 border-slate-900"
                          >
                              <ArrowRightLeft size={16} className="rotate-90" />
                          </button>
                      </div>

                      {/* To */}
                      <div>
                          <div className="flex justify-between text-xs text-slate-400 mb-1">
                              <span>Buy</span>
                              <span>Rate: {currentRate}</span>
                          </div>
                          <div className="flex bg-black/20 rounded-xl p-1 border border-white/10">
                              <div className="w-full px-3 py-3 text-white font-mono font-bold text-lg">
                                  {convertedValue}
                              </div>
                              <div className="relative">
                                  <select 
                                      value={convertTo}
                                      onChange={(e) => setConvertTo(e.target.value)}
                                      className="h-full bg-white/10 text-white border-none rounded-lg text-sm font-bold pl-3 pr-8 outline-none cursor-pointer hover:bg-white/20 transition-colors appearance-none"
                                  >
                                      {['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'MXN', 'CHF'].map(c => <option key={c} value={c} className="text-black">{c}</option>)}
                                  </select>
                                  <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                              </div>
                          </div>
                      </div>

                      <button className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm transition-colors shadow-lg mt-2 flex items-center justify-center gap-2">
                          Review Trade <ArrowRight size={16} />
                      </button>
                  </div>
              </div>

              {/* Live Rate Chart */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm h-64 flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                      <div>
                          <h4 className="font-bold text-slate-900 dark:text-white text-sm">EUR / USD</h4>
                          <p className="text-xs text-emerald-500 font-bold flex items-center gap-1">
                              1.089 <TrendingUp size={12} /> +0.45%
                          </p>
                      </div>
                      <div className="flex gap-1">
                          {['1H', '1D', '1W'].map(t => (
                              <button key={t} className={`px-2 py-1 text-[10px] font-bold rounded ${t === '1D' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300' : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>{t}</button>
                          ))}
                      </div>
                  </div>
                  <div className="flex-1 w-full min-h-0">
                      <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={rateHistoryData}>
                              <defs>
                                  <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                  </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                              <XAxis dataKey="time" hide />
                              <YAxis domain={['auto', 'auto']} hide />
                              <Tooltip 
                                  contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', fontSize: '12px' }}
                                  itemStyle={{ color: '#1e293b' }}
                              />
                              <Area type="monotone" dataKey="rate" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorRate)" />
                          </AreaChart>
                      </ResponsiveContainer>
                  </div>
              </div>

              {/* Market News / Alerts */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-4">Market Insights</h4>
                  <div className="space-y-4">
                      <div className="flex gap-3 items-start">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                          <div>
                              <p className="text-xs font-medium text-slate-800 dark:text-slate-200 leading-snug">ECB signals potential rate cut in Q4, impacting EUR strength.</p>
                              <span className="text-[10px] text-slate-400 block mt-1">2 hours ago • Reuters</span>
                          </div>
                      </div>
                      <div className="flex gap-3 items-start">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></div>
                          <div>
                              <p className="text-xs font-medium text-slate-800 dark:text-slate-200 leading-snug">USD/JPY hits new monthly high amidst bond yield shifts.</p>
                              <span className="text-[10px] text-slate-400 block mt-1">4 hours ago • Bloomberg</span>
                          </div>
                      </div>
                  </div>
              </div>

          </div>
      </div>
    </div>
  );
};

// Helper function
function formatCurrency(val: number, currency: string) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(val);
}
