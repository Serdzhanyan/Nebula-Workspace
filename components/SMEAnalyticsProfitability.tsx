
import React, { useState } from 'react';
import { PieChart, TrendingUp, Users, Search, ChevronDown, Check, DollarSign, ArrowUpRight, ArrowDownRight, Briefcase, CreditCard, BarChart3, Download, Activity, Wallet } from 'lucide-react';
import { ResponsiveContainer, PieChart as RePieChart, Pie, Cell, Tooltip, Legend, AreaChart, Area, XAxis, YAxis, CartesianGrid, BarChart, Bar } from 'recharts';

interface ProductPerformance {
    name: string;
    revenue: number;
    profit: number;
    margin: number;
}

interface MonthlyMetric {
    month: string;
    revenue: number;
    expenses: number;
    profit: number;
}

interface CompanyProfitability {
    id: string;
    name: string;
    industry: string;
    metrics: {
        totalRevenue: string;
        netProfit: string;
        margin: string;
        marginChange: string; // e.g. "+2.5%"
        revenueChange: string;
    };
    revenueTrend: MonthlyMetric[];
    productMix: ProductPerformance[];
    topClients: { name: string; revenue: string; margin: string }[];
}

export const SMEAnalyticsProfitability: React.FC = () => {
    // Mock Data
    const companies: CompanyProfitability[] = [
        {
            id: '1',
            name: 'TechNova Solutions Ltd.',
            industry: 'Technology',
            metrics: {
                totalRevenue: '$4,250,000',
                netProfit: '$850,000',
                margin: '20.0%',
                marginChange: '+1.5%',
                revenueChange: '+12.4%'
            },
            revenueTrend: [
                { month: 'Jan', revenue: 300000, expenses: 240000, profit: 60000 },
                { month: 'Feb', revenue: 320000, expenses: 250000, profit: 70000 },
                { month: 'Mar', revenue: 350000, expenses: 260000, profit: 90000 },
                { month: 'Apr', revenue: 340000, expenses: 270000, profit: 70000 },
                { month: 'May', revenue: 380000, expenses: 280000, profit: 100000 },
                { month: 'Jun', revenue: 420000, expenses: 300000, profit: 120000 },
            ],
            productMix: [
                { name: 'Cloud Services', revenue: 1500000, profit: 450000, margin: 30 },
                { name: 'Consulting', revenue: 1200000, profit: 240000, margin: 20 },
                { name: 'Licensing', revenue: 800000, profit: 100000, margin: 12.5 },
                { name: 'Hardware', revenue: 750000, profit: 60000, margin: 8 },
            ],
            topClients: [
                { name: 'Global Corp', revenue: '$1.2M', margin: '22%' },
                { name: 'Acme Inc', revenue: '$850k', margin: '18%' },
                { name: 'Stark Ind', revenue: '$500k', margin: '25%' }
            ]
        },
        {
            id: '2',
            name: 'GreenLeaf Logistics',
            industry: 'Logistics',
            metrics: {
                totalRevenue: '$12,500,000',
                netProfit: '$1,250,000',
                margin: '10.0%',
                marginChange: '-0.5%',
                revenueChange: '+5.2%'
            },
            revenueTrend: [
                { month: 'Jan', revenue: 1800000, expenses: 1600000, profit: 200000 },
                { month: 'Feb', revenue: 1900000, expenses: 1750000, profit: 150000 },
                { month: 'Mar', revenue: 2000000, expenses: 1800000, profit: 200000 },
                { month: 'Apr', revenue: 2100000, expenses: 1900000, profit: 200000 },
                { month: 'May', revenue: 2200000, expenses: 1950000, profit: 250000 },
                { month: 'Jun', revenue: 2500000, expenses: 2250000, profit: 250000 },
            ],
            productMix: [
                { name: 'Freight', revenue: 8000000, profit: 640000, margin: 8 },
                { name: 'Warehousing', revenue: 3000000, profit: 450000, margin: 15 },
                { name: 'Last Mile', revenue: 1500000, profit: 160000, margin: 10.6 },
            ],
            topClients: [
                { name: 'MegaMart', revenue: '$4.5M', margin: '8%' },
                { name: 'Shopify Sellers', revenue: '$2.1M', margin: '12%' }
            ]
        },
         {
            id: '3',
            name: 'Quantum Dynamics',
            industry: 'Manufacturing',
            metrics: {
                totalRevenue: '$8,100,000',
                netProfit: '$2,100,000',
                margin: '25.9%',
                marginChange: '+4.2%',
                revenueChange: '+18.5%'
            },
            revenueTrend: [
                { month: 'Jan', revenue: 1000000, expenses: 800000, profit: 200000 },
                { month: 'Feb', revenue: 1100000, expenses: 850000, profit: 250000 },
                { month: 'Mar', revenue: 1200000, expenses: 900000, profit: 300000 },
                { month: 'Apr', revenue: 1400000, expenses: 1000000, profit: 400000 },
                { month: 'May', revenue: 1600000, expenses: 1100000, profit: 500000 },
                { month: 'Jun', revenue: 1800000, expenses: 1350000, profit: 450000 },
            ],
            productMix: [
                { name: 'Components', revenue: 5000000, profit: 1500000, margin: 30 },
                { name: 'R&D Services', revenue: 2000000, profit: 500000, margin: 25 },
                { name: 'Patents', revenue: 1100000, profit: 100000, margin: 9 },
            ],
            topClients: [
                { name: 'DefTech', revenue: '$3.2M', margin: '28%' },
                { name: 'SpaceX', revenue: '$1.8M', margin: '24%' }
            ]
        }
    ];

    const [selectedCompany, setSelectedCompany] = useState<CompanyProfitability>(companies[0]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);

    const filteredCompanies = companies.filter(c => 
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelectCompany = (company: CompanyProfitability) => {
        setSelectedCompany(company);
        setSearchTerm("");
        setShowDropdown(false);
    };

    const formatCurrency = (value: number) => {
        if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
        if (value >= 1000) return `$${(value / 1000).toFixed(0)}k`;
        return `$${value}`;
    };

    const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            
            {/* Company Selector */}
            <div className="relative z-30">
                <div className="relative">
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
                        className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-slate-900 dark:text-white transition-all"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                        <ChevronDown size={16} />
                    </div>
                </div>
                
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

            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                     <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedCompany.name}</h2>
                     <p className="text-sm text-slate-500 dark:text-slate-400">Profitability Dashboard</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
                    <Download size={16} /> Export Financials
                </button>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                            <DollarSign size={20} />
                        </div>
                        <span className="text-xs font-bold uppercase text-slate-500">Total Revenue (YTD)</span>
                    </div>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">{selectedCompany.metrics.totalRevenue}</p>
                    <p className={`text-xs font-medium mt-1 ${selectedCompany.metrics.revenueChange.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>
                         {selectedCompany.metrics.revenueChange} vs last year
                    </p>
                </div>
                
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-center gap-2 mb-2">
                         <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg">
                            <Wallet size={20} />
                        </div>
                        <span className="text-xs font-bold uppercase text-slate-500">Net Profit (YTD)</span>
                    </div>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">{selectedCompany.metrics.netProfit}</p>
                    <p className="text-xs text-slate-500 mt-1">After expenses & tax</p>
                </div>

                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg">
                            <Activity size={20} />
                        </div>
                        <span className="text-xs font-bold uppercase text-slate-500">Profit Margin</span>
                    </div>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">{selectedCompany.metrics.margin}</p>
                    <p className={`text-xs font-medium mt-1 ${selectedCompany.metrics.marginChange.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>
                         {selectedCompany.metrics.marginChange} variance
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Main Trend Chart */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col h-[400px]">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6">Financial Performance</h3>
                    <div className="flex-1 w-full min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={selectedCompany.revenueTrend} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                    </linearGradient>
                                    <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} tickFormatter={formatCurrency} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                    itemStyle={{ color: '#1e293b' }}
                                    formatter={(value: number) => [formatCurrency(value), '']}
                                />
                                <Legend iconType="circle" />
                                <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
                                <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" fill="none" />
                                <Area type="monotone" dataKey="profit" name="Net Profit" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorProfit)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Product Profitability */}
                <div className="lg:col-span-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col h-[400px]">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6">Profit by Segment</h3>
                    <div className="flex-1 w-full min-h-0 relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <RePieChart>
                                <Pie
                                    data={selectedCompany.productMix}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="profit"
                                >
                                    {selectedCompany.productMix.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={0} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                     contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                     itemStyle={{ color: '#1e293b' }}
                                     formatter={(value: number) => formatCurrency(value)}
                                />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" />
                            </RePieChart>
                        </ResponsiveContainer>
                         <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
                             <span className="text-3xl font-bold text-slate-900 dark:text-white">100%</span>
                             <span className="text-xs text-slate-500 uppercase tracking-wide">Profit</span>
                         </div>
                    </div>
                </div>
            </div>

            {/* Top Clients / Projects */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">Top Revenue Sources</h3>
                    <button className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline">View All</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {selectedCompany.topClients.map((client, idx) => (
                        <div key={idx} className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${idx === 0 ? 'bg-indigo-500' : idx === 1 ? 'bg-purple-500' : 'bg-blue-500'}`}>
                                        {client.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900 dark:text-white text-sm">{client.name}</p>
                                        <p className="text-xs text-slate-500">Key Account</p>
                                    </div>
                                </div>
                                <span className="text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-2 py-1 rounded">
                                    {client.margin} Margin
                                </span>
                            </div>
                            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center">
                                <span className="text-xs text-slate-500 uppercase font-bold">Revenue Contrib.</span>
                                <span className="font-bold text-slate-900 dark:text-white">{client.revenue}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
