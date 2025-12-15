
import React, { useState } from 'react';
import { DollarSign, Users, AlertTriangle, Activity, TrendingUp, TrendingDown, Calendar, Filter, Download, ArrowUpRight, PieChart, Briefcase } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, LineChart, Line, PieChart as RePieChart, Pie, Cell, Legend } from 'recharts';

export const SMEAnalyticsOverview: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'1M' | '6M' | '1Y'>('6M');
  const [selectedMetric, setSelectedMetric] = useState<'revenue' | 'clients' | 'risk'>('revenue');

  // Mock Data Generators
  const getRevenueData = (range: string) => {
      if (range === '1M') return Array.from({ length: 4 }, (_, i) => ({ name: `Week ${i+1}`, value: 150000 + Math.random() * 50000 }));
      if (range === '6M') return [
          { name: 'May', value: 450000 }, { name: 'Jun', value: 520000 }, { name: 'Jul', value: 480000 },
          { name: 'Aug', value: 610000 }, { name: 'Sep', value: 590000 }, { name: 'Oct', value: 750000 }
      ];
      return ['Q1', 'Q2', 'Q3', 'Q4'].map(q => ({ name: q, value: 1200000 + Math.random() * 500000 }));
  };

  const getClientData = (range: string) => {
      if (range === '1M') return Array.from({ length: 4 }, (_, i) => ({ name: `Week ${i+1}`, value: 20 + Math.random() * 10 }));
      if (range === '6M') return [
          { name: 'May', value: 120 }, { name: 'Jun', value: 135 }, { name: 'Jul', value: 140 },
          { name: 'Aug', value: 155 }, { name: 'Sep', value: 160 }, { name: 'Oct', value: 180 }
      ];
      return ['Q1', 'Q2', 'Q3', 'Q4'].map(q => ({ name: q, value: 400 + Math.random() * 100 }));
  };

  const getRiskData = (range: string) => {
      if (range === '1M') return Array.from({ length: 4 }, (_, i) => ({ name: `Week ${i+1}`, value: Math.floor(Math.random() * 5) }));
      if (range === '6M') return [
          { name: 'May', value: 12 }, { name: 'Jun', value: 8 }, { name: 'Jul', value: 15 },
          { name: 'Aug', value: 10 }, { name: 'Sep', value: 5 }, { name: 'Oct', value: 7 }
      ];
      return ['Q1', 'Q2', 'Q3', 'Q4'].map(q => ({ name: q, value: 20 + Math.random() * 10 }));
  };

  const revenueMixData = [
      { name: 'Transaction Fees', value: 45, color: '#6366f1' },
      { name: 'Subscription', value: 30, color: '#8b5cf6' },
      { name: 'FX Margins', value: 15, color: '#10b981' },
      { name: 'Lending', value: 10, color: '#f59e0b' },
  ];

  const currentData = selectedMetric === 'revenue' ? getRevenueData(timeRange) : selectedMetric === 'clients' ? getClientData(timeRange) : getRiskData(timeRange);

  const formatCurrency = (val: number) => {
    if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `$${(val / 1000).toFixed(0)}k`;
    return `$${val}`;
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
        {/* Header Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Performance Overview</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Track key metrics and portfolio health</p>
            </div>
            <div className="flex items-center bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                {(['1M', '6M', '1Y'] as const).map((range) => (
                    <button
                        key={range}
                        onClick={() => setTimeRange(range)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            timeRange === range 
                            ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm' 
                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                        }`}
                    >
                        {range}
                    </button>
                ))}
            </div>
        </div>

        {/* Interactive Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div 
                onClick={() => setSelectedMetric('revenue')}
                className={`p-6 rounded-2xl border cursor-pointer transition-all relative overflow-hidden group ${
                    selectedMetric === 'revenue' 
                    ? 'bg-white dark:bg-slate-800 border-indigo-500 ring-1 ring-indigo-500 shadow-lg' 
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700'
                }`}
            >
                <div className={`absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform duration-500 ${selectedMetric === 'revenue' ? 'opacity-10' : ''}`}>
                    <DollarSign size={100} />
                </div>
                <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2.5 rounded-xl ${selectedMetric === 'revenue' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                        <DollarSign size={20} />
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-wider ${selectedMetric === 'revenue' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500'}`}>Total Revenue</span>
                </div>
                <p className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">$4.2M</p>
                <div className="flex items-center gap-1 mt-2 text-xs font-bold text-emerald-500">
                    <TrendingUp size={14} /> +12.5% <span className="text-slate-400 font-normal ml-1">vs last period</span>
                </div>
            </div>

            <div 
                onClick={() => setSelectedMetric('clients')}
                className={`p-6 rounded-2xl border cursor-pointer transition-all relative overflow-hidden group ${
                    selectedMetric === 'clients' 
                    ? 'bg-white dark:bg-slate-800 border-emerald-500 ring-1 ring-emerald-500 shadow-lg' 
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700'
                }`}
            >
                <div className={`absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform duration-500 ${selectedMetric === 'clients' ? 'opacity-10' : ''}`}>
                    <Users size={100} />
                </div>
                <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2.5 rounded-xl ${selectedMetric === 'clients' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                        <Users size={20} />
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-wider ${selectedMetric === 'clients' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500'}`}>Active Clients</span>
                </div>
                <p className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">1,240</p>
                <div className="flex items-center gap-1 mt-2 text-xs font-bold text-emerald-500">
                    <TrendingUp size={14} /> +5.2% <span className="text-slate-400 font-normal ml-1">vs last period</span>
                </div>
            </div>

            <div 
                onClick={() => setSelectedMetric('risk')}
                className={`p-6 rounded-2xl border cursor-pointer transition-all relative overflow-hidden group ${
                    selectedMetric === 'risk' 
                    ? 'bg-white dark:bg-slate-800 border-amber-500 ring-1 ring-amber-500 shadow-lg' 
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-amber-300 dark:hover:border-amber-700'
                }`}
            >
                <div className={`absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform duration-500 ${selectedMetric === 'risk' ? 'opacity-10' : ''}`}>
                    <AlertTriangle size={100} />
                </div>
                <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2.5 rounded-xl ${selectedMetric === 'risk' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                        <AlertTriangle size={20} />
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-wider ${selectedMetric === 'risk' ? 'text-amber-600 dark:text-amber-400' : 'text-slate-500'}`}>Risk Alerts</span>
                </div>
                <p className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">24</p>
                <div className="flex items-center gap-1 mt-2 text-xs font-bold text-red-500">
                    <TrendingDown size={14} /> -2 <span className="text-slate-400 font-normal ml-1">active incidents</span>
                </div>
            </div>
        </div>

        {/* Main Chart Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 flex flex-col h-[400px]">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white capitalize">{selectedMetric} Trends</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Performance over {timeRange === '1M' ? 'last 30 days' : timeRange === '6M' ? 'last 6 months' : 'last year'}</p>
                    </div>
                    <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-indigo-600 transition-colors">
                        <Download size={18} />
                    </button>
                </div>
                <div className="flex-1 w-full min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                        {selectedMetric === 'revenue' ? (
                            <AreaChart data={currentData}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} tickFormatter={formatCurrency} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                    itemStyle={{ color: '#1e293b' }}
                                    formatter={(value: number) => [formatCurrency(value), 'Revenue']}
                                />
                                <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                            </AreaChart>
                        ) : selectedMetric === 'clients' ? (
                            <BarChart data={currentData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <Tooltip 
                                    cursor={{fill: 'transparent'}}
                                    contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                    itemStyle={{ color: '#1e293b' }}
                                />
                                <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        ) : (
                            <LineChart data={currentData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                    itemStyle={{ color: '#1e293b' }}
                                />
                                <Line type="monotone" dataKey="value" stroke="#f59e0b" strokeWidth={3} dot={{r: 4, fill: "#f59e0b", strokeWidth: 2, stroke: "#fff"}} />
                            </LineChart>
                        )}
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="lg:col-span-1 flex flex-col gap-6">
                 {/* Revenue Mix */}
                 <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 flex-1 min-h-[250px] flex flex-col">
                     <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-4 uppercase tracking-wide flex items-center gap-2">
                        <PieChart size={16} className="text-indigo-500" /> Revenue Mix
                     </h3>
                     <div className="flex-1 relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <RePieChart>
                                <Pie
                                    data={revenueMixData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={50}
                                    outerRadius={70}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {revenueMixData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" iconSize={8} />
                            </RePieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none pb-8">
                            <span className="text-2xl font-bold text-slate-900 dark:text-white">100%</span>
                        </div>
                     </div>
                 </div>

                 {/* Top Industries List */}
                 <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 flex-1">
                     <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-4 uppercase tracking-wide flex items-center gap-2">
                        <Briefcase size={16} className="text-blue-500" /> Top Industries
                     </h3>
                     <div className="space-y-4">
                         {[
                             { name: 'Technology', value: 45, color: 'bg-blue-500' },
                             { name: 'Logistics', value: 30, color: 'bg-indigo-500' },
                             { name: 'Retail', value: 15, color: 'bg-emerald-500' },
                             { name: 'Healthcare', value: 10, color: 'bg-amber-500' }
                         ].map((item, i) => (
                             <div key={i}>
                                 <div className="flex justify-between text-xs mb-1.5">
                                     <span className="font-medium text-slate-700 dark:text-slate-300">{item.name}</span>
                                     <span className="font-bold text-slate-900 dark:text-white">{item.value}%</span>
                                 </div>
                                 <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                     <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.value}%` }}></div>
                                 </div>
                             </div>
                         ))}
                     </div>
                 </div>
            </div>
        </div>
    </div>
  );
};
