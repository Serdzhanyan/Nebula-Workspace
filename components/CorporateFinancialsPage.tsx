
import React, { useState } from 'react';
import { Search, Filter, Download, FileText, TrendingUp, TrendingDown, DollarSign, PieChart, ArrowUpRight, ArrowDownRight, Calendar, ChevronDown, Check, Printer, Share2 } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Legend } from 'recharts';

interface FinancialPeriod {
  period: string; // e.g., "Q3 2024"
  revenue: number;
  costOfGoods: number;
  grossProfit: number;
  operatingExpenses: number;
  netIncome: number;
  assets: number;
  liabilities: number;
  equity: number;
  cashFlowOp: number;
  cashFlowInv: number;
  cashFlowFin: number;
}

interface CompanyFinancials {
  id: string;
  name: string;
  industry: string;
  currency: string;
  fiscalYearEnd: string;
  data: FinancialPeriod[];
}

export const CorporateFinancialsPage: React.FC = () => {
  // Mock Data
  const companies: CompanyFinancials[] = [
    {
      id: '1',
      name: 'TechNova Solutions Ltd.',
      industry: 'Technology',
      currency: 'USD',
      fiscalYearEnd: 'Dec 31',
      data: [
        { period: 'Q4 2023', revenue: 1200000, costOfGoods: 400000, grossProfit: 800000, operatingExpenses: 500000, netIncome: 300000, assets: 2500000, liabilities: 1000000, equity: 1500000, cashFlowOp: 320000, cashFlowInv: -50000, cashFlowFin: -20000 },
        { period: 'Q1 2024', revenue: 1100000, costOfGoods: 380000, grossProfit: 720000, operatingExpenses: 480000, netIncome: 240000, assets: 2600000, liabilities: 1050000, equity: 1550000, cashFlowOp: 280000, cashFlowInv: -100000, cashFlowFin: 0 },
        { period: 'Q2 2024', revenue: 1350000, costOfGoods: 420000, grossProfit: 930000, operatingExpenses: 550000, netIncome: 380000, assets: 2800000, liabilities: 1100000, equity: 1700000, cashFlowOp: 400000, cashFlowInv: -80000, cashFlowFin: -50000 },
        { period: 'Q3 2024', revenue: 1500000, costOfGoods: 450000, grossProfit: 1050000, operatingExpenses: 600000, netIncome: 450000, assets: 3100000, liabilities: 1150000, equity: 1950000, cashFlowOp: 480000, cashFlowInv: -120000, cashFlowFin: -10000 },
      ]
    },
    {
      id: '2',
      name: 'GreenLeaf Logistics',
      industry: 'Logistics',
      currency: 'USD',
      fiscalYearEnd: 'Dec 31',
      data: [
        { period: 'Q4 2023', revenue: 800000, costOfGoods: 600000, grossProfit: 200000, operatingExpenses: 150000, netIncome: 50000, assets: 1200000, liabilities: 800000, equity: 400000, cashFlowOp: 60000, cashFlowInv: -20000, cashFlowFin: 10000 },
        { period: 'Q1 2024', revenue: 820000, costOfGoods: 610000, grossProfit: 210000, operatingExpenses: 155000, netIncome: 55000, assets: 1250000, liabilities: 820000, equity: 430000, cashFlowOp: 65000, cashFlowInv: -10000, cashFlowFin: 0 },
        { period: 'Q2 2024', revenue: 850000, costOfGoods: 620000, grossProfit: 230000, operatingExpenses: 160000, netIncome: 70000, assets: 1300000, liabilities: 840000, equity: 460000, cashFlowOp: 75000, cashFlowInv: -30000, cashFlowFin: -10000 },
        { period: 'Q3 2024', revenue: 900000, costOfGoods: 650000, grossProfit: 250000, operatingExpenses: 170000, netIncome: 80000, assets: 1400000, liabilities: 880000, equity: 520000, cashFlowOp: 85000, cashFlowInv: -40000, cashFlowFin: -5000 },
      ]
    },
    {
      id: '3',
      name: 'Quantum Dynamics',
      industry: 'Manufacturing',
      currency: 'EUR',
      fiscalYearEnd: 'Jun 30',
      data: [
         { period: 'Q2 2024', revenue: 2500000, costOfGoods: 1500000, grossProfit: 1000000, operatingExpenses: 800000, netIncome: 200000, assets: 5000000, liabilities: 3000000, equity: 2000000, cashFlowOp: 250000, cashFlowInv: -100000, cashFlowFin: 0 },
         { period: 'Q3 2024', revenue: 2600000, costOfGoods: 1550000, grossProfit: 1050000, operatingExpenses: 820000, netIncome: 230000, assets: 5200000, liabilities: 3100000, equity: 2100000, cashFlowOp: 280000, cashFlowInv: -50000, cashFlowFin: -20000 }
      ]
    }
  ];

  const [selectedCompany, setSelectedCompany] = useState<CompanyFinancials>(companies[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [view, setView] = useState<'overview' | 'bs' | 'pl' | 'cf'>('overview');
  const [periodFilter, setPeriodFilter] = useState("Quarterly");

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCompany = (company: CompanyFinancials) => {
    setSelectedCompany(company);
    setSearchTerm("");
    setShowDropdown(false);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: selectedCompany.currency, maximumFractionDigits: 0 }).format(val);
  };

  const formatCompactNumber = (number: number) => {
    return new Intl.NumberFormat('en-US', { notation: "compact", compactDisplay: "short", currency: selectedCompany.currency, style: "currency" }).format(number);
  };

  // Latest Period Data
  const latest = selectedCompany.data[selectedCompany.data.length - 1];
  const previous = selectedCompany.data[selectedCompany.data.length - 2];
  
  // Calculate Growth
  const revenueGrowth = ((latest.revenue - previous.revenue) / previous.revenue) * 100;
  const profitGrowth = ((latest.netIncome - previous.netIncome) / previous.netIncome) * 100;

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-2 space-y-6">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <DollarSign className="text-emerald-500" /> Financial Statements
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
             Balance Sheet, Profit & Loss, and Cash Flow analysis.
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
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
                                            <p className="text-xs text-slate-500">{comp.industry} • {comp.currency}</p>
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
            
            <div className="flex bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-1">
                <button 
                  onClick={() => setPeriodFilter("Quarterly")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${periodFilter === 'Quarterly' ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                >
                  Quarterly
                </button>
                <button 
                  onClick={() => setPeriodFilter("Annual")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${periodFilter === 'Annual' ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                >
                  Annual
                </button>
            </div>

            <button className="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">
                <Download size={18} />
            </button>
        </div>
      </div>

      {/* Company Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
             <div>
                 <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{selectedCompany.name}</h1>
                 <div className="flex items-center gap-3 mt-2 text-sm text-slate-500 dark:text-slate-400">
                     <span className="flex items-center gap-1"><FileText size={14} /> ID: {selectedCompany.id}</span>
                     <span>•</span>
                     <span>{selectedCompany.industry}</span>
                     <span>•</span>
                     <span>FY Ends: {selectedCompany.fiscalYearEnd}</span>
                 </div>
             </div>
             
             <div className="flex gap-4">
                 <div className="text-right">
                     <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Total Assets</p>
                     <p className="text-2xl font-bold text-slate-900 dark:text-white">{formatCompactNumber(latest.assets)}</p>
                 </div>
                 <div className="w-px bg-slate-200 dark:bg-slate-700"></div>
                 <div className="text-right">
                     <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Net Income (TTM)</p>
                     <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{formatCompactNumber(latest.netIncome)}</p>
                 </div>
             </div>
         </div>

         {/* Navigation Tabs */}
         <div className="flex gap-6 mt-8 border-b border-slate-200 dark:border-slate-700">
             {[
               { id: 'overview', label: 'Overview' },
               { id: 'bs', label: 'Balance Sheet' },
               { id: 'pl', label: 'Profit & Loss' },
               { id: 'cf', label: 'Cash Flow' }
             ].map(tab => (
                 <button
                    key={tab.id}
                    onClick={() => setView(tab.id as any)}
                    className={`pb-4 text-sm font-medium transition-colors relative ${
                        view === tab.id 
                        ? 'text-indigo-600 dark:text-indigo-400' 
                        : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                 >
                     {tab.label}
                     {view === tab.id && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-t-full"></span>}
                 </button>
             ))}
         </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        {view === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Stats Cards */}
                <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Revenue</p>
                        <div className="flex items-baseline gap-2 mt-1">
                            <span className="text-2xl font-bold text-slate-900 dark:text-white">{formatCompactNumber(latest.revenue)}</span>
                            <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${revenueGrowth >= 0 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                                {revenueGrowth >= 0 ? '+' : ''}{revenueGrowth.toFixed(1)}%
                            </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-2">vs previous period</p>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Gross Profit</p>
                        <div className="flex items-baseline gap-2 mt-1">
                            <span className="text-2xl font-bold text-slate-900 dark:text-white">{formatCompactNumber(latest.grossProfit)}</span>
                            <span className="text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                                {((latest.grossProfit / latest.revenue) * 100).toFixed(1)}% Margin
                            </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-2">of Revenue</p>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                         <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Net Income</p>
                         <div className="flex items-baseline gap-2 mt-1">
                            <span className="text-2xl font-bold text-slate-900 dark:text-white">{formatCompactNumber(latest.netIncome)}</span>
                            <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${profitGrowth >= 0 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                                {profitGrowth >= 0 ? '+' : ''}{profitGrowth.toFixed(1)}%
                            </span>
                         </div>
                         <p className="text-xs text-slate-400 mt-2">vs previous period</p>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                         <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Op Cash Flow</p>
                         <div className="flex items-baseline gap-2 mt-1">
                            <span className="text-2xl font-bold text-slate-900 dark:text-white">{formatCompactNumber(latest.cashFlowOp)}</span>
                         </div>
                         <p className="text-xs text-slate-400 mt-2">Operating Activities</p>
                    </div>
                </div>

                {/* Charts */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm h-[400px] flex flex-col">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6">Financial Performance Trend</h3>
                    <div className="flex-1 w-full min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={selectedCompany.data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                    </linearGradient>
                                    <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="period" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} tickFormatter={(val) => formatCompactNumber(val)} />
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                    itemStyle={{ color: '#1e293b' }}
                                    formatter={(value: number) => formatCurrency(value)}
                                />
                                <Legend />
                                <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                                <Area type="monotone" dataKey="netIncome" name="Net Income" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorNet)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm h-[400px] flex flex-col">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6">Capital Structure</h3>
                    <div className="flex-1 w-full min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={selectedCompany.data}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                                <XAxis dataKey="period" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} tickFormatter={(val) => formatCompactNumber(val)} />
                                <Tooltip 
                                    cursor={{fill: 'transparent'}}
                                    contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                    itemStyle={{ color: '#1e293b' }}
                                    formatter={(value: number) => formatCurrency(value)}
                                />
                                <Legend />
                                <Bar dataKey="assets" name="Assets" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="liabilities" name="Liabilities" fill="#ef4444" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        )}

        {/* Detailed Tables (BS, P&L, CF) */}
        {view !== 'overview' && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2">
                <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                        {view === 'bs' ? 'Balance Sheet' : view === 'pl' ? 'Profit & Loss Statement' : 'Cash Flow Statement'}
                    </h3>
                    <div className="flex gap-2">
                         <button className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                             <Share2 size={18} />
                         </button>
                         <button className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                             <Printer size={18} />
                         </button>
                    </div>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/80 dark:bg-slate-800/80 text-xs font-bold uppercase text-slate-500 dark:text-slate-400">
                                <th className="p-4 pl-6 w-1/3">Line Item</th>
                                {selectedCompany.data.map((d, i) => (
                                    <th key={i} className="p-4 text-right">{d.period}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                            {/* Render rows based on active view */}
                            {view === 'pl' && (
                                <>
                                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                                        <td className="p-4 pl-6 font-bold text-slate-800 dark:text-white">Revenue</td>
                                        {selectedCompany.data.map((d, i) => <td key={i} className="p-4 text-right font-medium">{formatCurrency(d.revenue)}</td>)}
                                    </tr>
                                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 text-slate-600 dark:text-slate-300">
                                        <td className="p-4 pl-6">Cost of Goods Sold</td>
                                        {selectedCompany.data.map((d, i) => <td key={i} className="p-4 text-right">({formatCurrency(d.costOfGoods)})</td>)}
                                    </tr>
                                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 bg-slate-50/50 dark:bg-slate-900/50 font-semibold text-slate-900 dark:text-white">
                                        <td className="p-4 pl-6">Gross Profit</td>
                                        {selectedCompany.data.map((d, i) => <td key={i} className="p-4 text-right">{formatCurrency(d.grossProfit)}</td>)}
                                    </tr>
                                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 text-slate-600 dark:text-slate-300">
                                        <td className="p-4 pl-6">Operating Expenses</td>
                                        {selectedCompany.data.map((d, i) => <td key={i} className="p-4 text-right">({formatCurrency(d.operatingExpenses)})</td>)}
                                    </tr>
                                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 bg-indigo-50/30 dark:bg-indigo-900/10 font-bold text-indigo-700 dark:text-indigo-400">
                                        <td className="p-4 pl-6">Net Income</td>
                                        {selectedCompany.data.map((d, i) => <td key={i} className="p-4 text-right">{formatCurrency(d.netIncome)}</td>)}
                                    </tr>
                                </>
                            )}

                            {view === 'bs' && (
                                <>
                                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 bg-slate-100/50 dark:bg-slate-800/50">
                                        <td className="p-4 pl-6 font-bold text-slate-800 dark:text-white uppercase text-xs tracking-wider" colSpan={selectedCompany.data.length + 1}>Assets</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                                        <td className="p-4 pl-6 font-medium text-slate-800 dark:text-white">Total Assets</td>
                                        {selectedCompany.data.map((d, i) => <td key={i} className="p-4 text-right font-medium">{formatCurrency(d.assets)}</td>)}
                                    </tr>
                                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 bg-slate-100/50 dark:bg-slate-800/50">
                                        <td className="p-4 pl-6 font-bold text-slate-800 dark:text-white uppercase text-xs tracking-wider" colSpan={selectedCompany.data.length + 1}>Liabilities & Equity</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                                        <td className="p-4 pl-6 font-medium text-slate-800 dark:text-white">Total Liabilities</td>
                                        {selectedCompany.data.map((d, i) => <td key={i} className="p-4 text-right text-red-600 dark:text-red-400">{formatCurrency(d.liabilities)}</td>)}
                                    </tr>
                                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                                        <td className="p-4 pl-6 font-medium text-slate-800 dark:text-white">Total Equity</td>
                                        {selectedCompany.data.map((d, i) => <td key={i} className="p-4 text-right text-emerald-600 dark:text-emerald-400">{formatCurrency(d.equity)}</td>)}
                                    </tr>
                                </>
                            )}

                            {view === 'cf' && (
                                <>
                                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                                        <td className="p-4 pl-6 text-slate-700 dark:text-slate-300">Operating Activities</td>
                                        {selectedCompany.data.map((d, i) => <td key={i} className="p-4 text-right">{formatCurrency(d.cashFlowOp)}</td>)}
                                    </tr>
                                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                                        <td className="p-4 pl-6 text-slate-700 dark:text-slate-300">Investing Activities</td>
                                        {selectedCompany.data.map((d, i) => <td key={i} className={`p-4 text-right ${d.cashFlowInv < 0 ? 'text-red-500' : ''}`}>{formatCurrency(d.cashFlowInv)}</td>)}
                                    </tr>
                                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                                        <td className="p-4 pl-6 text-slate-700 dark:text-slate-300">Financing Activities</td>
                                        {selectedCompany.data.map((d, i) => <td key={i} className={`p-4 text-right ${d.cashFlowFin < 0 ? 'text-red-500' : ''}`}>{formatCurrency(d.cashFlowFin)}</td>)}
                                    </tr>
                                    <tr className="bg-indigo-50/30 dark:bg-indigo-900/10 font-bold text-slate-900 dark:text-white border-t-2 border-slate-200 dark:border-slate-700">
                                        <td className="p-4 pl-6">Net Cash Flow</td>
                                        {selectedCompany.data.map((d, i) => {
                                            const net = d.cashFlowOp + d.cashFlowInv + d.cashFlowFin;
                                            return <td key={i} className={`p-4 text-right ${net >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{formatCurrency(net)}</td>;
                                        })}
                                    </tr>
                                </>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};
