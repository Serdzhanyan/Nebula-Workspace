
import React, { useState } from 'react';
import { Wallet, TrendingUp, ArrowUpRight, ArrowDownLeft, CreditCard, Search, Check } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface CashData {
  id: string;
  name: string;
  liquidity: string;
  incoming: string;
  activeAccounts: number;
  growth: string;
}

export const SMECashOverview: React.FC = () => {
  const companies: CashData[] = [
      { id: '1', name: 'TechNova Solutions Ltd.', liquidity: '$2,450,000', incoming: '$125,000', activeAccounts: 14, growth: '+8.5%' },
      { id: '2', name: 'GreenLeaf Logistics', liquidity: '$850,000', incoming: '$45,200', activeAccounts: 5, growth: '+3.2%' },
      { id: '3', name: 'Quantum Dynamics', liquidity: '$5,200,000', incoming: '$890,000', activeAccounts: 22, growth: '+12.1%' }
  ];

  const [selectedCompany, setSelectedCompany] = useState<CashData>(companies[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredCompanies = companies.filter(c => 
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getChartData = (companyId: string) => {
      const multiplier = companyId === '1' ? 1 : companyId === '2' ? 0.35 : 2.5;
      return [
        { month: 'May', incoming: 420000 * multiplier, outgoing: 380000 * multiplier },
        { month: 'Jun', incoming: 350000 * multiplier, outgoing: 400000 * multiplier },
        { month: 'Jul', incoming: 550000 * multiplier, outgoing: 420000 * multiplier },
        { month: 'Aug', incoming: 480000 * multiplier, outgoing: 410000 * multiplier },
        { month: 'Sep', incoming: 620000 * multiplier, outgoing: 450000 * multiplier },
        { month: 'Oct', incoming: 750000 * multiplier, outgoing: 520000 * multiplier },
      ];
  };

  const chartData = getChartData(selectedCompany.id);

  const formatYAxis = (value: number) => {
      if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
      if (value >= 1000) return `$${(value / 1000).toFixed(0)}k`;
      return `$${value}`;
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
        {/* Search Bar */}
        <div className="relative z-20">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search company for cash dashboard..." 
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowDropdown(true);
                    }}
                    onFocus={() => setShowDropdown(true)}
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-slate-900 dark:text-white"
                />
            </div>
            {showDropdown && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)}></div>
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden z-20">
                        {filteredCompanies.length > 0 ? (
                            filteredCompanies.map(comp => (
                                <button
                                    key={comp.id}
                                    onClick={() => {
                                        setSelectedCompany(comp);
                                        setSearchTerm("");
                                        setShowDropdown(false);
                                    }}
                                    className="w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 border-b border-slate-100 dark:border-slate-800 last:border-0 flex justify-between items-center group transition-colors"
                                >
                                    <div>
                                        <p className="font-bold text-slate-900 dark:text-white text-sm">{comp.name}</p>
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

        <div className="flex items-center justify-between">
             <h3 className="text-xl font-bold text-slate-900 dark:text-white">Dashboard: {selectedCompany.name}</h3>
             <span className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-500">Real-time Data</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 rounded-lg"><Wallet size={20} /></div>
                    <span className="text-xs font-bold uppercase text-slate-500">Total Liquidity</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{selectedCompany.liquidity}</p>
                <p className="text-xs text-emerald-500 font-medium mt-1 flex items-center gap-1"><ArrowUpRight size={12}/> {selectedCompany.growth} this month</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-lg"><ArrowDownLeft size={20} /></div>
                    <span className="text-xs font-bold uppercase text-slate-500">Incoming (Pending)</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{selectedCompany.incoming}</p>
                <p className="text-xs text-slate-400 font-medium mt-1">Transactions processing</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg"><CreditCard size={20} /></div>
                    <span className="text-xs font-bold uppercase text-slate-500">Active Accounts</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{selectedCompany.activeAccounts}</p>
                <p className="text-xs text-slate-400 font-medium mt-1">Multi-currency enabled</p>
            </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm h-[400px] flex flex-col">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <TrendingUp size={20} className="text-indigo-500" /> Cash Flow Overview
            </h3>
            <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorIncoming" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorOutgoing" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                        <XAxis 
                            dataKey="month" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#94a3b8', fontSize: 12 }} 
                            dy={10}
                        />
                        <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#94a3b8', fontSize: 12 }} 
                            tickFormatter={formatYAxis}
                        />
                        <Tooltip 
                            contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                            itemStyle={{ color: '#1e293b' }}
                            formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                        />
                        <Legend iconType="circle" />
                        <Area type="monotone" dataKey="incoming" name="Incoming" stroke="#10b981" fillOpacity={1} fill="url(#colorIncoming)" strokeWidth={2} />
                        <Area type="monotone" dataKey="outgoing" name="Outgoing" stroke="#f43f5e" fillOpacity={1} fill="url(#colorOutgoing)" strokeWidth={2} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    </div>
  );
};
