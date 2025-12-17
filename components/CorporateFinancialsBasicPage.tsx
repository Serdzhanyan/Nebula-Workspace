
import React, { useState } from 'react';
import { Search, Filter, Download, FileText, TrendingUp, TrendingDown, DollarSign, PieChart, ArrowUpRight, ArrowDownRight, Calendar, ChevronDown, Check, Printer, Share2, BarChart2 } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Legend, PieChart as RePieChart, Pie, Cell } from 'recharts';

interface FinancialRecord {
  period: string;
  revenue: number;
  expenses: number;
  netIncome: number;
  assets: number;
  liabilities: number;
  equity: number;
}

interface CompanyFinancials {
  id: string;
  name: string;
  industry: string;
  currency: string;
  data: FinancialRecord[];
}

export const CorporateFinancialsBasicPage: React.FC = () => {
  // Mock Data
  const companies: CompanyFinancials[] = [
    {
      id: '1',
      name: 'TechNova Solutions Ltd.',
      industry: 'Technology',
      currency: 'USD',
      data: [
        { period: '2023 Q1', revenue: 1000000, expenses: 750000, netIncome: 250000, assets: 2000000, liabilities: 800000, equity: 1200000 },
        { period: '2023 Q2', revenue: 1100000, expenses: 800000, netIncome: 300000, assets: 2100000, liabilities: 850000, equity: 1250000 },
        { period: '2023 Q3', revenue: 1250000, expenses: 900000, netIncome: 350000, assets: 2300000, liabilities: 900000, equity: 1400000 },
        { period: '2023 Q4', revenue: 1400000, expenses: 950000, netIncome: 450000, assets: 2500000, liabilities: 950000, equity: 1550000 },
      ]
    },
    {
      id: '2',
      name: 'GreenLeaf Logistics',
      industry: 'Logistics',
      currency: 'USD',
      data: [
        { period: '2023 Q1', revenue: 800000, expenses: 700000, netIncome: 100000, assets: 1500000, liabilities: 1000000, equity: 500000 },
        { period: '2023 Q2', revenue: 820000, expenses: 710000, netIncome: 110000, assets: 1550000, liabilities: 1020000, equity: 530000 },
        { period: '2023 Q3', revenue: 850000, expenses: 730000, netIncome: 120000, assets: 1600000, liabilities: 1050000, equity: 550000 },
        { period: '2023 Q4', revenue: 900000, expenses: 750000, netIncome: 150000, assets: 1700000, liabilities: 1100000, equity: 600000 },
      ]
    },
     {
      id: '3',
      name: 'Quantum Dynamics',
      industry: 'Manufacturing',
      currency: 'EUR',
      data: [
         { period: '2023 Q1', revenue: 2000000, expenses: 1800000, netIncome: 200000, assets: 5000000, liabilities: 3000000, equity: 2000000 },
         { period: '2023 Q2', revenue: 2100000, expenses: 1850000, netIncome: 250000, assets: 5200000, liabilities: 3100000, equity: 2100000 },
         { period: '2023 Q3', revenue: 2200000, expenses: 1900000, netIncome: 300000, assets: 5400000, liabilities: 3200000, equity: 2200000 },
         { period: '2023 Q4', revenue: 2400000, expenses: 2000000, netIncome: 400000, assets: 5600000, liabilities: 3300000, equity: 2300000 },
      ]
    }
  ];

  const [selectedCompany, setSelectedCompany] = useState<CompanyFinancials>(companies[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [view, setView] = useState<'overview' | 'bs' | 'pl'>('overview');

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

  const currentData = selectedCompany.data[selectedCompany.data.length - 1];
  const previousData = selectedCompany.data[selectedCompany.data.length - 2];

  const revenueChange = ((currentData.revenue - previousData.revenue) / previousData.revenue) * 100;
  const netIncomeChange = ((currentData.netIncome - previousData.netIncome) / previousData.netIncome) * 100;

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-2 space-y-6">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="text-blue-500" /> Financial Statements
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
             Detailed Balance Sheet and Profit & Loss Analysis.
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
            
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">
                <Filter size={16} /> Filters
            </button>
            <button className="p-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors shadow-sm">
                <Download size={18} />
            </button>
        </div>
      </div>

      {/* Main Card */}
      <div className="flex-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col overflow-hidden">
        {/* Company Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
             <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center font-bold text-xl">
                     {selectedCompany.name.charAt(0)}
                 </div>
                 <div>
                     <h2 className="text-xl font-bold text-slate-900 dark:text-white">{selectedCompany.name}</h2>
                     <p className="text-sm text-slate-500 dark:text-slate-400">Reporting Period: FY 2023</p>
                 </div>
             </div>
             
             <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                 {(['overview', 'bs', 'pl'] as const).map(tab => (
                     <button
                        key={tab}
                        onClick={() => setView(tab)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                            view === tab 
                            ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-sm' 
                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                        }`}
                     >
                         {tab === 'overview' ? 'Overview' : tab === 'bs' ? 'Balance Sheet' : 'Profit & Loss'}
                     </button>
                 ))}
             </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-8">
            {view === 'overview' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
                    {/* KPIs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700">
                             <p className="text-xs text-slate-500 font-bold uppercase tracking-wide mb-1">Total Revenue</p>
                             <p className="text-2xl font-bold text-slate-900 dark:text-white">{formatCurrency(currentData.revenue)}</p>
                             <span className={`text-xs font-medium flex items-center gap-1 mt-1 ${revenueChange >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                                 {revenueChange >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />} {revenueChange.toFixed(1)}% vs prev
                             </span>
                        </div>
                        <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700">
                             <p className="text-xs text-slate-500 font-bold uppercase tracking-wide mb-1">Net Income</p>
                             <p className="text-2xl font-bold text-slate-900 dark:text-white">{formatCurrency(currentData.netIncome)}</p>
                             <span className={`text-xs font-medium flex items-center gap-1 mt-1 ${netIncomeChange >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                                 {netIncomeChange >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />} {netIncomeChange.toFixed(1)}% vs prev
                             </span>
                        </div>
                        <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700">
                             <p className="text-xs text-slate-500 font-bold uppercase tracking-wide mb-1">Total Assets</p>
                             <p className="text-2xl font-bold text-slate-900 dark:text-white">{formatCurrency(currentData.assets)}</p>
                             <span className="text-xs text-slate-500 mt-1">As of End of Period</span>
                        </div>
                        <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700">
                             <p className="text-xs text-slate-500 font-bold uppercase tracking-wide mb-1">Liabilities</p>
                             <p className="text-2xl font-bold text-slate-900 dark:text-white">{formatCurrency(currentData.liabilities)}</p>
                             <span className="text-xs text-slate-500 mt-1">Total Outstanding</span>
                        </div>
                    </div>

                    {/* Charts Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[400px]">
                        <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-6">Revenue & Net Income Trend</h3>
                            <div className="flex-1 w-full min-h-0">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={selectedCompany.data}>
                                        <defs>
                                            <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                            </linearGradient>
                                            <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="period" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                                        <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val/1000}k`} />
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                                        <Tooltip 
                                            contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                            formatter={(value: number) => formatCurrency(value)}
                                        />
                                        <Legend />
                                        <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRev)" />
                                        <Area type="monotone" dataKey="netIncome" name="Net Income" stroke="#10b981" fillOpacity={1} fill="url(#colorNet)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-6">Asset Composition</h3>
                            <div className="flex-1 w-full min-h-0">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={selectedCompany.data}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                                        <XAxis dataKey="period" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                                        <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val/1000}k`} />
                                        <Tooltip 
                                            contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                            formatter={(value: number) => formatCurrency(value)}
                                            cursor={{fill: 'transparent'}}
                                        />
                                        <Legend />
                                        <Bar dataKey="assets" name="Total Assets" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={30} />
                                        <Bar dataKey="liabilities" name="Liabilities" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={30} />
                                        <Bar dataKey="equity" name="Equity" fill="#10b981" radius={[4, 4, 0, 0]} barSize={30} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {(view === 'bs' || view === 'pl') && (
                <div className="animate-in fade-in slide-in-from-bottom-2">
                    <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 dark:bg-slate-900/50">
                                <tr>
                                    <th className="p-4 font-bold text-slate-500 dark:text-slate-400">Line Item</th>
                                    {selectedCompany.data.map((d, i) => (
                                        <th key={i} className="p-4 text-right font-bold text-slate-900 dark:text-white">{d.period}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {view === 'bs' ? (
                                    <>
                                        <tr className="bg-slate-50/50 dark:bg-slate-900/30"><td colSpan={selectedCompany.data.length + 1} className="p-2 pl-4 text-xs font-bold text-slate-500 uppercase tracking-wide">Assets</td></tr>
                                        <tr>
                                            <td className="p-4 font-medium text-slate-700 dark:text-slate-200">Total Assets</td>
                                            {selectedCompany.data.map((d, i) => <td key={i} className="p-4 text-right text-slate-600 dark:text-slate-400">{formatCurrency(d.assets)}</td>)}
                                        </tr>
                                        <tr className="bg-slate-50/50 dark:bg-slate-900/30"><td colSpan={selectedCompany.data.length + 1} className="p-2 pl-4 text-xs font-bold text-slate-500 uppercase tracking-wide">Liabilities & Equity</td></tr>
                                        <tr>
                                            <td className="p-4 font-medium text-slate-700 dark:text-slate-200">Total Liabilities</td>
                                            {selectedCompany.data.map((d, i) => <td key={i} className="p-4 text-right text-red-600 dark:text-red-400">{formatCurrency(d.liabilities)}</td>)}
                                        </tr>
                                        <tr>
                                            <td className="p-4 font-medium text-slate-700 dark:text-slate-200">Shareholders' Equity</td>
                                            {selectedCompany.data.map((d, i) => <td key={i} className="p-4 text-right text-emerald-600 dark:text-emerald-400">{formatCurrency(d.equity)}</td>)}
                                        </tr>
                                    </>
                                ) : (
                                    <>
                                        <tr>
                                            <td className="p-4 font-bold text-slate-900 dark:text-white">Revenue</td>
                                            {selectedCompany.data.map((d, i) => <td key={i} className="p-4 text-right font-bold text-slate-900 dark:text-white">{formatCurrency(d.revenue)}</td>)}
                                        </tr>
                                        <tr>
                                            <td className="p-4 text-slate-700 dark:text-slate-200 pl-8">Operating Expenses</td>
                                            {selectedCompany.data.map((d, i) => <td key={i} className="p-4 text-right text-red-500">({formatCurrency(d.expenses)})</td>)}
                                        </tr>
                                        <tr className="bg-slate-50 dark:bg-slate-800/30 font-bold">
                                            <td className="p-4 text-slate-900 dark:text-white">Net Income</td>
                                            {selectedCompany.data.map((d, i) => <td key={i} className="p-4 text-right text-emerald-600 dark:text-emerald-400">{formatCurrency(d.netIncome)}</td>)}
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
    </div>
  );
};
