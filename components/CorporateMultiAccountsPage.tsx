
import React, { useState, useMemo } from 'react';
/* Added missing Clock import */
import { Search, Filter, Download, Wallet, Globe, ArrowRightLeft, TrendingUp, MoreHorizontal, Plus, DollarSign, Euro, PoundSterling, JapaneseYen, Check, AlertCircle, RefreshCw, ArrowUpRight, ArrowDownLeft, Clock } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';

interface CurrencyAccount {
  id: string;
  currency: 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CAD';
  balance: number;
  name: string;
  accountNumber: string;
  status: 'Active' | 'Restricted' | 'Frozen';
  type: 'Operational' | 'Savings' | 'Holding';
  lastActivity: string;
}

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  currency: string;
  type: 'credit' | 'debit';
  status: 'Completed' | 'Pending';
}

interface CompanyAccounts {
  id: string;
  name: string;
  industry: string;
  accounts: CurrencyAccount[];
  transactions: Transaction[];
}

export const CorporateMultiAccountsPage: React.FC = () => {
  // Mock Data
  const companies: CompanyAccounts[] = [
    {
      id: '1',
      name: 'TechNova Solutions Ltd.',
      industry: 'Technology',
      accounts: [
        { id: 'acc1', currency: 'USD', balance: 1250000.50, name: 'Main Operating', accountNumber: 'US-88219022', status: 'Active', type: 'Operational', lastActivity: '2 hours ago' },
        { id: 'acc2', currency: 'EUR', balance: 450200.00, name: 'Euro Operations', accountNumber: 'EU-99102331', status: 'Active', type: 'Operational', lastActivity: '1 day ago' },
        { id: 'acc3', currency: 'GBP', balance: 125000.00, name: 'UK Sales', accountNumber: 'GB-22019921', status: 'Active', type: 'Holding', lastActivity: '3 days ago' },
        { id: 'acc4', currency: 'JPY', balance: 5000000, name: 'Asia Pacific', accountNumber: 'JP-11029933', status: 'Restricted', type: 'Operational', lastActivity: '1 week ago' },
      ],
      transactions: [
          { id: 'tx1', date: 'Oct 24', description: 'AWS Service Charge', amount: 4500.00, currency: 'USD', type: 'debit', status: 'Completed' },
          { id: 'tx2', date: 'Oct 23', description: 'Client Payout - Siemens', amount: 12500.00, currency: 'EUR', type: 'credit', status: 'Completed' },
          { id: 'tx3', date: 'Oct 22', description: 'Inter-company Transfer', amount: 50000.00, currency: 'GBP', type: 'debit', status: 'Pending' },
      ]
    },
    {
      id: '2',
      name: 'GreenLeaf Logistics',
      industry: 'Logistics',
      accounts: [
        { id: 'acc5', currency: 'USD', balance: 85000.00, name: 'US Logistics', accountNumber: 'US-55210011', status: 'Active', type: 'Operational', lastActivity: '5 hours ago' },
        { id: 'acc6', currency: 'CAD', balance: 120000.00, name: 'Canadian Fleet', accountNumber: 'CA-33210022', status: 'Active', type: 'Operational', lastActivity: 'Yesterday' }
      ],
      transactions: [
          { id: 'tx4', date: 'Oct 24', description: 'Fuel Card Settlement', amount: 2100.00, currency: 'USD', type: 'debit', status: 'Completed' },
      ]
    },
    {
      id: '3',
      name: 'Quantum Dynamics',
      industry: 'Manufacturing',
      accounts: [
         { id: 'acc7', currency: 'EUR', balance: 2500000.00, name: 'HQ Treasury', accountNumber: 'DE-88211001', status: 'Active', type: 'Savings', lastActivity: 'Just now' },
         { id: 'acc8', currency: 'USD', balance: 500000.00, name: 'US Sales', accountNumber: 'US-11223344', status: 'Active', type: 'Operational', lastActivity: '4 hours ago' }
      ],
      transactions: []
    }
  ];

  const [selectedCompany, setSelectedCompany] = useState<CompanyAccounts>(companies[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [exchangeFrom, setExchangeFrom] = useState<string>('USD');
  const [exchangeTo, setExchangeTo] = useState<string>('EUR');
  const [exchangeAmount, setExchangeAmount] = useState<string>('');

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCompany = (company: CompanyAccounts) => {
    setSelectedCompany(company);
    setSearchTerm("");
    setShowDropdown(false);
  };

  const getCurrencyIcon = (currency: string) => {
      switch(currency) {
          case 'USD': return <DollarSign size={18} />;
          case 'EUR': return <Euro size={18} />;
          case 'GBP': return <PoundSterling size={18} />;
          case 'JPY': return <JapaneseYen size={18} />;
          default: return <span className="text-xs font-bold">{currency}</span>;
      }
  };

  const getStatusColor = (status: string) => {
      switch(status) {
          case 'Active': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
          case 'Restricted': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800';
          case 'Frozen': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
          default: return 'bg-slate-100 text-slate-700';
      }
  };

  // Mock Exchange Rates
  const rates: Record<string, number> = {
      'USD': 1, 'EUR': 0.92, 'GBP': 0.77, 'JPY': 150.5, 'CAD': 1.35
  };

  const calculateExchange = () => {
      if (!exchangeAmount) return 0;
      const amountInBase = parseFloat(exchangeAmount) / rates[exchangeFrom];
      return amountInBase * rates[exchangeTo];
  };

  const chartData = selectedCompany.accounts.map(acc => ({
      name: acc.currency,
      value: acc.balance / rates[acc.currency], // Convert to USD for pie chart proportionality
      displayValue: acc.balance,
      originalCurrency: acc.currency
  }));

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];

  const totalLiquidityUSD = selectedCompany.accounts.reduce((acc, curr) => {
      return acc + (curr.balance / rates[curr.currency]);
  }, 0);

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-2 space-y-6">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Globe className="text-indigo-500" /> Multi-Currency Accounts
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
             Manage global liquidity, foreign exchange, and international transfers.
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto relative z-20">
            <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search company account..." 
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
                                            <p className="text-xs text-slate-500">{comp.industry}</p>
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
                <Plus size={18} /> Add Account
            </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
          
          {/* Left: Overview & Holdings */}
          <div className="lg:col-span-2 space-y-6">
              
              {/* Liquidity Dashboard */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                  <div className="flex justify-between items-start mb-6">
                      <div>
                          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Liquidity (USD Eqv)</p>
                          <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">
                              ${totalLiquidityUSD.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                          </h3>
                      </div>
                      <div className="flex gap-2">
                          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                              <Download size={14} /> Statement
                          </button>
                          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                              <Filter size={14} /> Filter
                          </button>
                      </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-8">
                      {/* Chart */}
                      <div className="h-64 w-full md:w-1/2 relative">
                          <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                  <Pie
                                      data={chartData}
                                      cx="50%"
                                      cy="50%"
                                      innerRadius={60}
                                      outerRadius={80}
                                      paddingAngle={5}
                                      dataKey="value"
                                  >
                                      {chartData.map((entry, index) => (
                                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={0} />
                                      ))}
                                  </Pie>
                                  <Tooltip 
                                      content={({ active, payload }) => {
                                          if (active && payload && payload.length) {
                                            const data = payload[0].payload;
                                            return (
                                              <div className="bg-white dark:bg-slate-800 p-3 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 text-xs">
                                                  <p className="font-bold text-slate-900 dark:text-white">{data.name}</p>
                                                  <p className="text-slate-500">{data.originalCurrency} {data.displayValue.toLocaleString()}</p>
                                              </div>
                                            );
                                          }
                                          return null;
                                      }}
                                  />
                              </PieChart>
                          </ResponsiveContainer>
                          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                              <span className="text-3xl font-bold text-slate-900 dark:text-white">{selectedCompany.accounts.length}</span>
                              <span className="text-xs text-slate-500 uppercase tracking-wide">Accounts</span>
                          </div>
                      </div>

                      {/* Legend / List */}
                      <div className="flex-1 space-y-3 overflow-y-auto max-h-64">
                          {selectedCompany.accounts.map((acc, idx) => (
                              <div key={acc.id} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                                  <div className="flex items-center gap-3">
                                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
                                      <div>
                                          <p className="font-bold text-slate-900 dark:text-white text-sm">{acc.currency}</p>
                                          <p className="text-[10px] text-slate-500">{acc.type}</p>
                                      </div>
                                  </div>
                                  <div className="text-right">
                                      <p className="font-bold text-slate-900 dark:text-white text-sm">{acc.balance.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
                                      <p className="text-[10px] text-slate-500">{acc.status}</p>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
              </div>

              {/* Accounts List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedCompany.accounts.map(acc => (
                      <div key={acc.id} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group">
                          <div className="flex justify-between items-start mb-4">
                              <div className="flex items-center gap-3">
                                  <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-300">
                                      {getCurrencyIcon(acc.currency)}
                                  </div>
                                  <div>
                                      <h4 className="font-bold text-slate-900 dark:text-white">{acc.name}</h4>
                                      <p className="text-xs text-slate-500 font-mono">{acc.accountNumber}</p>
                                  </div>
                              </div>
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${getStatusColor(acc.status)}`}>
                                  {acc.status}
                              </span>
                          </div>
                          
                          <div className="mb-6">
                              <p className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                                  {acc.balance.toLocaleString(undefined, {style: 'currency', currency: acc.currency})}
                              </p>
                              <p className="text-xs text-slate-500 mt-1">Last activity: {acc.lastActivity}</p>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                              <button className="py-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-lg text-xs font-bold hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors">
                                  Transfer
                              </button>
                              <button className="py-2 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                  Details
                              </button>
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          {/* Right Column: Tools & History */}
          <div className="space-y-6">
              
              {/* FX Calculator */}
              <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg">
                  <div className="flex items-center gap-2 mb-6">
                      <RefreshCw size={20} className="text-indigo-200" />
                      <h3 className="font-bold text-lg">Quick Exchange</h3>
                  </div>

                  <div className="space-y-4">
                      <div>
                          <div className="flex justify-between text-xs text-indigo-200 mb-1">
                              <span>Sell</span>
                              <span>Bal: {selectedCompany.accounts.find(a => a.currency === exchangeFrom)?.balance.toLocaleString() || 0}</span>
                          </div>
                          <div className="flex bg-white/10 rounded-xl p-1 border border-white/20">
                              <input 
                                  type="number" 
                                  placeholder="0.00"
                                  value={exchangeAmount}
                                  onChange={(e) => setExchangeAmount(e.target.value)}
                                  className="w-full bg-transparent border-none text-white placeholder-indigo-300 px-3 outline-none font-mono font-bold"
                              />
                              <select 
                                  value={exchangeFrom}
                                  onChange={(e) => setExchangeFrom(e.target.value)}
                                  className="bg-black/20 text-white border-none rounded-lg text-sm font-bold px-2 outline-none cursor-pointer"
                              >
                                  {Object.keys(rates).map(c => <option key={c} value={c} className="text-black">{c}</option>)}
                              </select>
                          </div>
                      </div>

                      <div className="flex justify-center -my-2 relative z-10">
                          <button 
                            onClick={() => {
                                const temp = convertFrom;
                                setConvertFrom(convertTo);
                                setConvertTo(temp);
                            }}
                            className="p-2 bg-indigo-600 text-white rounded-full shadow-md hover:scale-110 transition-transform"
                          >
                              <ArrowRightLeft size={16} className="rotate-90" />
                          </button>
                      </div>

                      <div>
                          <div className="flex justify-between text-xs text-indigo-200 mb-1">
                              <span>To</span>
                              <span>Rate: 1 {exchangeFrom} = {(rates[exchangeTo] / rates[exchangeFrom]).toFixed(4)} {exchangeTo}</span>
                          </div>
                          <div className="flex bg-white/10 rounded-xl p-1 border border-white/20">
                              <div className="w-full px-3 py-2 text-white font-mono font-bold">
                                  {exchangeAmount ? calculateExchange().toFixed(2) : '0.00'}
                              </div>
                              <select 
                                  value={exchangeTo}
                                  onChange={(e) => setExchangeTo(e.target.value)}
                                  className="bg-black/20 text-white border-none rounded-lg text-sm font-bold px-2 outline-none cursor-pointer"
                              >
                                  {Object.keys(rates).map(c => <option key={c} value={c} className="text-black">{c}</option>)}
                              </select>
                          </div>
                      </div>

                      <button className="w-full py-3 bg-white text-indigo-600 rounded-xl font-bold text-sm hover:bg-indigo-50 transition-colors shadow-md mt-2">
                          Review Exchange
                      </button>
                  </div>
              </div>

              {/* Recent Activity Feed */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex-1 flex flex-col">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-4">Recent Transactions</h3>
                  <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                      {selectedCompany.transactions.length > 0 ? (
                          selectedCompany.transactions.map((tx) => (
                              <div key={tx.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-700">
                                  <div className="flex items-center gap-3">
                                      <div className={`p-2 rounded-lg ${tx.type === 'credit' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400' : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400'}`}>
                                          {tx.type === 'credit' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                                      </div>
                                      <div>
                                          <p className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">{tx.description}</p>
                                          <p className="text-xs text-slate-500">{tx.date} • {tx.status}</p>
                                      </div>
                                  </div>
                                  <span className={`text-sm font-bold ${tx.type === 'credit' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white'}`}>
                                      {tx.type === 'credit' ? '+' : '-'}{tx.amount.toLocaleString(undefined, { style: 'currency', currency: tx.currency })}
                                  </span>
                              </div>
                          ))
                      ) : (
                          <div className="flex flex-col items-center justify-center h-40 text-slate-400">
                              <Wallet size={32} className="mb-2 opacity-20" />
                              <p className="text-sm font-medium">No recent transactions</p>
                          </div>
                      )}
                  </div>
                  <button className="w-full mt-4 py-2 text-xs font-bold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 border-t border-slate-100 dark:border-slate-800 pt-3 transition-colors">
                      View All Activity
                  </button>
              </div>

          </div>
      </div>
    </div>
  );
};
