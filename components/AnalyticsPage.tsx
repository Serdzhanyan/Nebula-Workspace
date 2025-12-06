
import React, { useState } from 'react';
import { BarChart3, TrendingUp, PieChart, Calendar, Download, DollarSign, Users, Award, ArrowUpRight, ArrowDownRight, Filter, Lightbulb, Activity, Target, FileText, FileBarChart, Layers, MessageSquare, ThumbsUp, Globe, Link as LinkIcon, Share2, Check, RefreshCw, Facebook, Twitter, Linkedin, Instagram, X, Briefcase, Clock, Megaphone, Zap } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart as RePieChart, Pie, Legend } from 'recharts';

export const AnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState('This Year');
  const [activeTab, setActiveTab] = useState<'overview' | 'leads' | 'social' | 'reports'>('overview');

  // Mock Data
  const revenueData = [
    { month: 'Jan', revenue: 65000, target: 55000 },
    { month: 'Feb', revenue: 59000, target: 55000 },
    { month: 'Mar', revenue: 80000, target: 60000 },
    { month: 'Apr', revenue: 81000, target: 60000 },
    { month: 'May', revenue: 56000, target: 65000 },
    { month: 'Jun', revenue: 95000, target: 70000 },
    { month: 'Jul', revenue: 110000, target: 75000 },
    { month: 'Aug', revenue: 105000, target: 75000 },
    { month: 'Sep', revenue: 125000, target: 80000 },
    { month: 'Oct', revenue: 115000, target: 85000 },
  ];

  const sourceData = [
    { name: 'Organic Search', value: 35, color: '#6366f1' },
    { name: 'Referral', value: 25, color: '#8b5cf6' },
    { name: 'Social Media', value: 20, color: '#ec4899' },
    { name: 'Direct', value: 15, color: '#10b981' },
    { name: 'Paid Ads', value: 5, color: '#f59e0b' },
  ];

  const leadCategoryData = [
    { name: 'Technology', value: 45, color: '#3b82f6' },
    { name: 'Finance', value: 25, color: '#10b981' },
    { name: 'Healthcare', value: 20, color: '#f59e0b' },
    { name: 'Retail', value: 10, color: '#ef4444' },
  ];

  const sentimentData = [
    { name: 'Positive', value: 65, color: '#10b981' },
    { name: 'Neutral', value: 25, color: '#6366f1' },
    { name: 'Negative', value: 10, color: '#ef4444' },
  ];

  const adPerformanceData = [
    { name: 'Google Ads', spend: 12000, revenue: 45000 },
    { name: 'Facebook', spend: 8500, revenue: 22000 },
    { name: 'LinkedIn', spend: 15000, revenue: 38000 },
    { name: 'Instagram', spend: 5000, revenue: 12000 },
  ];

  const topPerformers = [
    { name: 'Sarah Lee', sales: 450000, deals: 24, quota: 110, avatar: 'https://picsum.photos/100/100?random=1' },
    { name: 'Alex Johnson', sales: 380000, deals: 18, quota: 95, avatar: 'https://picsum.photos/100/100?random=2' },
    { name: 'James D.', sales: 310000, deals: 21, quota: 88, avatar: 'https://picsum.photos/100/100?random=3' },
    { name: 'Emma Watson', sales: 290000, deals: 15, quota: 82, avatar: 'https://picsum.photos/100/100?random=4' },
  ];

  const formatCurrency = (val: number) => {
    if (val >= 1000) return `$${(val / 1000).toFixed(0)}k`;
    return `$${val}`;
  };

  return (
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-start md:items-center">
        <div>
           <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="text-indigo-500" /> Sales Analytics
           </h2>
           <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Performance metrics, revenue analysis, and team insights.
           </p>
        </div>
        
        <div className="flex gap-2">
            <div className="relative">
                <select 
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="appearance-none pl-4 pr-10 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-sm"
                >
                    <option>This Quarter</option>
                    <option>This Year</option>
                    <option>Last Year</option>
                </select>
                <Calendar size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors shadow-sm">
                <Download size={16} /> Quick Export
            </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-fit mb-6 overflow-x-auto">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'overview' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('leads')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'leads' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
          >
            Lead Intelligence
          </button>
          <button 
            onClick={() => setActiveTab('social')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'social' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
          >
            Social Monitor
          </button>
          <button 
            onClick={() => setActiveTab('reports')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'reports' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
          >
            Reports
          </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-2">
          
          {activeTab === 'overview' && (
            <div className="animate-in fade-in slide-in-from-bottom-2">
                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Revenue</span>
                            <div className="p-1.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg">
                                <DollarSign size={16} />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">$886,000</h3>
                        <div className="flex items-center gap-1 mt-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                            <ArrowUpRight size={12} /> +12.5% <span className="font-normal text-slate-400 ml-1">vs last period</span>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Avg Deal Size</span>
                            <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                                <PieChart size={16} />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">$12,450</h3>
                        <div className="flex items-center gap-1 mt-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                            <ArrowUpRight size={12} /> +5.2% <span className="font-normal text-slate-400 ml-1">vs last period</span>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Conversion Rate</span>
                            <div className="p-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg">
                                <TrendingUp size={16} />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">24.8%</h3>
                        <div className="flex items-center gap-1 mt-1 text-xs font-bold text-red-500">
                            <ArrowDownRight size={12} /> -1.2% <span className="font-normal text-slate-400 ml-1">vs last period</span>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sales Velocity</span>
                            <div className="p-1.5 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg">
                                <Users size={16} />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">18 Days</h3>
                        <div className="flex items-center gap-1 mt-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                            <ArrowUpRight size={12} /> -2 days <span className="font-normal text-slate-400 ml-1">faster</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Revenue Chart */}
                    <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm min-h-[400px] flex flex-col">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-slate-900 dark:text-white">Revenue vs Target</h3>
                            <div className="flex items-center gap-4 text-xs">
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                                    <span className="text-slate-500 dark:text-slate-400">Revenue</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                                    <span className="text-slate-500 dark:text-slate-400">Target</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 w-full min-h-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
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
                                        tickFormatter={formatCurrency}
                                    />
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                        itemStyle={{ color: '#1e293b' }}
                                    />
                                    <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                                    <Area type="monotone" dataKey="target" stroke="#34d399" strokeWidth={2} strokeDasharray="5 5" fill="transparent" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Source Chart */}
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm min-h-[400px] flex flex-col">
                        <h3 className="font-bold text-slate-900 dark:text-white mb-2">Deal Source</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Where your closed deals came from</p>
                        
                        <div className="flex-1 w-full min-h-0 relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <RePieChart>
                                    <Pie
                                        data={sourceData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {sourceData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                        ))}
                                    </Pie>
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                        itemStyle={{ color: '#1e293b' }}
                                    />
                                </RePieChart>
                            </ResponsiveContainer>
                            {/* Center Label */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-3xl font-bold text-slate-900 dark:text-white">100%</span>
                                <span className="text-xs text-slate-500 uppercase font-medium">Total</span>
                            </div>
                        </div>

                        <div className="space-y-3 mt-4">
                            {sourceData.map((item, i) => (
                                <div key={i} className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                                        <span className="text-slate-600 dark:text-slate-300">{item.name}</span>
                                    </div>
                                    <span className="font-bold text-slate-900 dark:text-white">{item.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Strategic Insights Section */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm mb-8">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-xl hidden sm:block">
                            <Lightbulb size={24} />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
                                Strategic Insights <span className="sm:hidden text-indigo-500"><Lightbulb size={18} /></span>
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                                Collection and analysis of data on clients, sales, and other metrics for making informed decisions.
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-700/50 hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Target size={16} className="text-blue-500" />
                                        <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Targeting Opportunity</h4>
                                    </div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                        Most high-value clients are located in the <strong>West Coast</strong> region (65%). Consider increasing ad spend in this geo.
                                    </p>
                                </div>
                                <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-700/50 hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Activity size={16} className="text-emerald-500" />
                                        <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Sales Cycle Velocity</h4>
                                    </div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                        Deals involving <strong>Video Calls</strong> close 20% faster than email-only threads. Encourage team to schedule demos early.
                                    </p>
                                </div>
                                <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-700/50 hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors">
                                    <div className="flex items-center gap-2 mb-2">
                                        <TrendingUp size={16} className="text-amber-500" />
                                        <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Churn Risk</h4>
                                    </div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                        Clients with less than <strong>2 interactions/month</strong> show a 40% higher risk of churn. Automated check-ins recommended.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Team Performance */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden mb-8">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                            <Award className="text-amber-500" /> Top Performers
                        </h3>
                        <button className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors">
                            View Full Leaderboard
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-slate-50/50 dark:bg-slate-900/30 text-xs uppercase text-slate-500 dark:text-slate-400 font-semibold">
                                <tr>
                                    <th className="p-4 pl-6">Rep</th>
                                    <th className="p-4">Sales Volume</th>
                                    <th className="p-4">Deals Closed</th>
                                    <th className="p-4">Quota Attainment</th>
                                    <th className="p-4 pr-6"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                                {topPerformers.map((rep, i) => (
                                    <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors">
                                        <td className="p-4 pl-6">
                                            <div className="flex items-center gap-3">
                                                <div className="relative">
                                                    <img src={rep.avatar} alt={rep.name} className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700" />
                                                    {i === 0 && <div className="absolute -top-1 -right-1 bg-amber-400 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] shadow-sm">👑</div>}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm text-slate-900 dark:text-white">{rep.name}</p>
                                                    <p className="text-xs text-slate-500">Sales Executive</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm font-bold text-slate-700 dark:text-slate-200">
                                            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(rep.sales)}
                                        </td>
                                        <td className="p-4 text-sm text-slate-600 dark:text-slate-400">
                                            {rep.deals}
                                        </td>
                                        <td className="p-4">
                                            <div className="w-full max-w-[140px]">
                                                <div className="flex justify-between text-xs mb-1">
                                                    <span className="font-bold text-slate-700 dark:text-slate-300">{rep.quota}%</span>
                                                </div>
                                                <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                                                    <div 
                                                        className={`h-full rounded-full ${rep.quota >= 100 ? 'bg-emerald-500' : 'bg-indigo-500'}`} 
                                                        style={{ width: `${Math.min(rep.quota, 100)}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 pr-6 text-right">
                                            <button className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline">View Profile</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
          )}

          {activeTab === 'leads' && (
              <div className="animate-in fade-in slide-in-from-bottom-2 space-y-6">
                  {/* Collecting & Categorizing Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white shadow-lg">
                      <h2 className="text-2xl font-bold mb-2">Lead Intelligence</h2>
                      <p className="text-blue-100 max-w-2xl">
                          Collecting, categorizing, and processing leads for further engagement in the sales process. 
                          Automated ingestion from multiple sources ensures no opportunity is missed.
                      </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Categorization Chart */}
                      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 flex flex-col min-h-[350px]">
                          <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6">Categorization by Industry</h3>
                          <div className="flex-1 relative">
                              <ResponsiveContainer width="100%" height="100%">
                                  <RePieChart>
                                      <Pie
                                          data={leadCategoryData}
                                          cx="50%"
                                          cy="50%"
                                          innerRadius={60}
                                          outerRadius={100}
                                          paddingAngle={5}
                                          dataKey="value"
                                      >
                                          {leadCategoryData.map((entry, index) => (
                                              <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                          ))}
                                      </Pie>
                                      <Tooltip />
                                      <Legend verticalAlign="bottom" height={36} />
                                  </RePieChart>
                              </ResponsiveContainer>
                          </div>
                      </div>

                      {/* Processing Queue */}
                      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
                          <div className="flex justify-between items-center mb-6">
                              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Processing Queue</h3>
                              <span className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-2 py-1 rounded text-xs font-bold">12 Pending</span>
                          </div>
                          
                          <div className="space-y-4">
                              {[
                                  { name: 'John Doe', company: 'TechStart', source: 'LinkedIn', time: '10m ago' },
                                  { name: 'Alice Smith', company: 'Innovate Corp', source: 'Web Form', time: '35m ago' },
                                  { name: 'Robert Fox', company: 'Logistics Co', source: 'Referral', time: '1h ago' },
                                  { name: 'Emily Davis', company: 'Design Hub', source: 'Email', time: '2h ago' }
                              ].map((lead, i) => (
                                  <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                                      <div className="flex items-center gap-3">
                                          <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-500">
                                              {lead.name.charAt(0)}
                                          </div>
                                          <div>
                                              <p className="text-sm font-semibold text-slate-800 dark:text-white">{lead.name}</p>
                                              <p className="text-xs text-slate-500">{lead.company} • {lead.source}</p>
                                          </div>
                                      </div>
                                      <button className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors">
                                          Process
                                      </button>
                                  </div>
                              ))}
                          </div>
                          <button className="w-full mt-4 py-2 border border-dashed border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 rounded-xl text-sm font-medium hover:border-indigo-400 hover:text-indigo-500 transition-colors">
                              View All Pending Leads
                          </button>
                      </div>
                  </div>
              </div>
          )}

          {activeTab === 'social' && (
              <div className="animate-in fade-in slide-in-from-bottom-2 space-y-6">
                  {/* Account Linking Section */}
                  <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                          <LinkIcon size={20} className="text-indigo-500" /> Connected Accounts
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                          Link social media accounts to monitor and analyze discussions about your company and products.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between bg-slate-50 dark:bg-slate-900/50">
                              <div className="flex items-center gap-3">
                                  <div className="p-2 bg-blue-600 text-white rounded-lg"><Linkedin size={20} /></div>
                                  <div>
                                      <p className="text-sm font-bold text-slate-900 dark:text-white">LinkedIn</p>
                                      <p className="text-xs text-emerald-500 font-medium">Connected</p>
                                  </div>
                              </div>
                              <button className="text-slate-400 hover:text-red-500 transition-colors"><X size={16} /></button>
                          </div>

                          <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between bg-slate-50 dark:bg-slate-900/50">
                              <div className="flex items-center gap-3">
                                  <div className="p-2 bg-sky-500 text-white rounded-lg"><Twitter size={20} /></div>
                                  <div>
                                      <p className="text-sm font-bold text-slate-900 dark:text-white">X / Twitter</p>
                                      <p className="text-xs text-emerald-500 font-medium">Connected</p>
                                  </div>
                              </div>
                              <button className="text-slate-400 hover:text-red-500 transition-colors"><X size={16} /></button>
                          </div>

                          <div className="p-4 border border-dashed border-slate-300 dark:border-slate-600 rounded-xl flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer group">
                              <div className="flex items-center gap-3">
                                  <div className="p-2 bg-blue-700 text-white rounded-lg opacity-70 group-hover:opacity-100"><Facebook size={20} /></div>
                                  <div>
                                      <p className="text-sm font-bold text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white">Facebook</p>
                                      <p className="text-xs text-slate-400">Not Connected</p>
                                  </div>
                              </div>
                              <button className="text-indigo-600 dark:text-indigo-400 text-xs font-bold">Link</button>
                          </div>

                          <div className="p-4 border border-dashed border-slate-300 dark:border-slate-600 rounded-xl flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer group">
                              <div className="flex items-center gap-3">
                                  <div className="p-2 bg-pink-600 text-white rounded-lg opacity-70 group-hover:opacity-100"><Instagram size={20} /></div>
                                  <div>
                                      <p className="text-sm font-bold text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white">Instagram</p>
                                      <p className="text-xs text-slate-400">Not Connected</p>
                                  </div>
                              </div>
                              <button className="text-indigo-600 dark:text-indigo-400 text-xs font-bold">Link</button>
                          </div>
                      </div>
                  </div>

                  {/* Social Listening Section */}
                  <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                          <div>
                              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                  <MessageSquare className="text-pink-500" /> Social Listening & Reviews
                              </h3>
                              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                  Live feed of discussions about your company from linked accounts.
                              </p>
                          </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          {/* Sentiment Chart */}
                          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-700/50 p-5 flex flex-col">
                              <h4 className="text-sm font-bold text-slate-800 dark:text-white mb-4">Sentiment Analysis</h4>
                              <div className="flex-1 min-h-[200px] relative">
                                  <ResponsiveContainer width="100%" height="100%">
                                      <RePieChart>
                                          <Pie
                                              data={sentimentData}
                                              cx="50%"
                                              cy="50%"
                                              innerRadius={60}
                                              outerRadius={80}
                                              paddingAngle={5}
                                              dataKey="value"
                                          >
                                              {sentimentData.map((entry, index) => (
                                                  <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                              ))}
                                          </Pie>
                                          <Tooltip />
                                      </RePieChart>
                                  </ResponsiveContainer>
                                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                      <span className="text-2xl font-bold text-slate-900 dark:text-white">85%</span>
                                      <span className="text-xs text-slate-500 uppercase font-medium">Positive</span>
                                  </div>
                              </div>
                              <div className="flex justify-center gap-4 mt-2">
                                  <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div> Positive
                                  </div>
                                  <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                                      <div className="w-2 h-2 rounded-full bg-indigo-500"></div> Neutral
                                  </div>
                                  <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                                      <div className="w-2 h-2 rounded-full bg-red-500"></div> Negative
                                  </div>
                              </div>
                          </div>

                          {/* Discussions Feed */}
                          <div className="lg:col-span-2 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-700/50 p-5">
                              <h4 className="text-sm font-bold text-slate-800 dark:text-white mb-4">Recent Discussions</h4>
                              <div className="space-y-3">
                                  {[
                                      { source: 'LinkedIn', user: 'TechDaily', content: 'Nebula Workspace is redefining remote collaboration. The new AI features are a game changer.', sentiment: 'positive', time: '2h ago' },
                                      { source: 'Twitter', user: '@dev_jane', content: 'Just tried the new CRM module. Super intuitive! #SaaS #Productivity', sentiment: 'positive', time: '4h ago' },
                                      { source: 'G2 Crowd', user: 'Verified User', content: 'Great platform, but I wish the mobile app was faster.', sentiment: 'neutral', time: '1d ago' },
                                  ].map((item, i) => (
                                      <div key={i} className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700 flex gap-3">
                                          <div className={`p-2 rounded-full h-fit ${item.sentiment === 'positive' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/20' : 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/20'}`}>
                                              {item.sentiment === 'positive' ? <ThumbsUp size={14} /> : <MessageSquare size={14} />}
                                          </div>
                                          <div className="flex-1">
                                              <div className="flex justify-between items-start mb-1">
                                                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{item.user} <span className="text-slate-400 font-normal">on {item.source}</span></span>
                                                  <span className="text-[10px] text-slate-400">{item.time}</span>
                                              </div>
                                              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">"{item.content}"</p>
                                          </div>
                                      </div>
                                  ))}
                              </div>
                          </div>
                      </div>
                  </div>

                  {/* Channel & Affiliate Tracking Section */}
                  <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
                      <div className="flex justify-between items-start mb-6">
                          <div>
                              <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                                  <Megaphone size={20} className="text-indigo-500" /> Channel & Affiliate Performance
                              </h3>
                              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                  Track effectiveness of advertising channels, affiliate programs, and new client attraction.
                              </p>
                          </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {/* Advertising Effectiveness */}
                          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-700/50 p-5 flex flex-col min-h-[300px]">
                              <h4 className="text-sm font-bold text-slate-800 dark:text-white mb-4">Advertising ROI (Spend vs Revenue)</h4>
                              <div className="flex-1 w-full min-h-0">
                                  <ResponsiveContainer width="100%" height="100%">
                                      <BarChart data={adPerformanceData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                                          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" opacity={0.5} />
                                          <XAxis type="number" hide />
                                          <YAxis dataKey="name" type="category" width={80} tick={{ fill: '#64748b', fontSize: 11 }} />
                                          <Tooltip 
                                              cursor={{fill: 'transparent'}}
                                              contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                              itemStyle={{ color: '#1e293b', fontSize: '12px' }}
                                          />
                                          <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                                          <Bar dataKey="spend" name="Ad Spend" fill="#cbd5e1" radius={[0, 4, 4, 0]} barSize={12} />
                                          <Bar dataKey="revenue" name="Revenue" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={12} />
                                      </BarChart>
                                  </ResponsiveContainer>
                              </div>
                          </div>

                          {/* Affiliate & Acquisition Stats */}
                          <div className="flex flex-col gap-6">
                              {/* Affiliate Program */}
                              <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex-1">
                                  <div className="flex items-center justify-between mb-4">
                                      <h4 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
                                          <Users size={16} className="text-emerald-500" /> Affiliate Program
                                      </h4>
                                      <span className="text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-2 py-0.5 rounded font-medium">Active</span>
                                  </div>
                                  <div className="grid grid-cols-3 gap-4 text-center">
                                      <div>
                                          <div className="text-2xl font-bold text-slate-900 dark:text-white">42</div>
                                          <div className="text-[10px] text-slate-500 uppercase tracking-wide font-medium mt-1">Partners</div>
                                      </div>
                                      <div>
                                          <div className="text-2xl font-bold text-slate-900 dark:text-white">1.2k</div>
                                          <div className="text-[10px] text-slate-500 uppercase tracking-wide font-medium mt-1">Clicks</div>
                                      </div>
                                      <div>
                                          <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">$8.5k</div>
                                          <div className="text-[10px] text-slate-500 uppercase tracking-wide font-medium mt-1">Revenue</div>
                                      </div>
                                  </div>
                              </div>

                              {/* Client Attraction */}
                              <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex-1">
                                  <h4 className="text-sm font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                                      <Zap size={16} className="text-amber-500" /> New Client Attraction
                                  </h4>
                                  <div className="space-y-3">
                                      <div className="flex items-center justify-between text-xs">
                                          <span className="text-slate-600 dark:text-slate-300">Organic Search</span>
                                          <div className="flex items-center gap-2">
                                              <div className="w-24 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                                  <div className="h-full bg-blue-500" style={{ width: '45%' }}></div>
                                              </div>
                                              <span className="font-bold w-8 text-right">45%</span>
                                          </div>
                                      </div>
                                      <div className="flex items-center justify-between text-xs">
                                          <span className="text-slate-600 dark:text-slate-300">Paid Ads</span>
                                          <div className="flex items-center gap-2">
                                              <div className="w-24 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                                  <div className="h-full bg-indigo-500" style={{ width: '30%' }}></div>
                                              </div>
                                              <span className="font-bold w-8 text-right">30%</span>
                                          </div>
                                      </div>
                                      <div className="flex items-center justify-between text-xs">
                                          <span className="text-slate-600 dark:text-slate-300">Affiliate / Referrals</span>
                                          <div className="flex items-center gap-2">
                                              <div className="w-24 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                                  <div className="h-full bg-emerald-500" style={{ width: '25%' }}></div>
                                              </div>
                                              <span className="font-bold w-8 text-right">25%</span>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          )}

          {activeTab === 'reports' && (
              <div className="animate-in fade-in slide-in-from-bottom-2 space-y-6">
                  {/* Reporting Header */}
                  <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
                      <div className="flex justify-between items-start mb-6">
                          <div>
                              <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                                  <FileBarChart className="text-indigo-500" /> Analytical Reports
                              </h3>
                              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
                                  Generate and download comprehensive reports on sales performance, client insights, employee activity, and other key metrics.
                              </p>
                          </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                          {/* Sales Report */}
                          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors group bg-slate-50 dark:bg-slate-900/30">
                              <div className="flex items-center gap-3 mb-3">
                                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg">
                                      <DollarSign size={20} />
                                  </div>
                                  <h4 className="font-bold text-slate-800 dark:text-white text-sm">Sales Performance</h4>
                              </div>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 h-10 line-clamp-2">
                                  Detailed breakdown of revenue, deal velocity, and conversion rates by region.
                              </p>
                              <button className="w-full py-2.5 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-bold border border-slate-200 dark:border-slate-700 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors flex items-center justify-center gap-2">
                                  <FileText size={14} /> Generate PDF
                              </button>
                          </div>

                          {/* Client Report */}
                          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors group bg-slate-50 dark:bg-slate-900/30">
                              <div className="flex items-center gap-3 mb-3">
                                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                                      <Briefcase size={20} />
                                  </div>
                                  <h4 className="font-bold text-slate-800 dark:text-white text-sm">Client Insights</h4>
                              </div>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 h-10 line-clamp-2">
                                  Demographics, LTV analysis, and churn risk assessment for customer base.
                              </p>
                              <button className="w-full py-2.5 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-bold border border-slate-200 dark:border-slate-700 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors flex items-center justify-center gap-2">
                                  <FileText size={14} /> Generate CSV
                              </button>
                          </div>

                          {/* Employee Activity Report */}
                          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors group bg-slate-50 dark:bg-slate-900/30">
                              <div className="flex items-center gap-3 mb-3">
                                  <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg">
                                      <Clock size={20} />
                                  </div>
                                  <h4 className="font-bold text-slate-800 dark:text-white text-sm">Employee Activity</h4>
                              </div>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 h-10 line-clamp-2">
                                  Log of calls made, emails sent, and meetings held by each team member.
                              </p>
                              <button className="w-full py-2.5 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-bold border border-slate-200 dark:border-slate-700 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors flex items-center justify-center gap-2">
                                  <FileText size={14} /> Generate Report
                              </button>
                          </div>

                          {/* Pipeline Analysis */}
                          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors group bg-slate-50 dark:bg-slate-900/30">
                              <div className="flex items-center gap-3 mb-3">
                                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg">
                                      <Layers size={20} />
                                  </div>
                                  <h4 className="font-bold text-slate-800 dark:text-white text-sm">Pipeline Health</h4>
                              </div>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 h-10 line-clamp-2">
                                  Stage duration analysis, leakages, and forecast accuracy metrics.
                              </p>
                              <button className="w-full py-2.5 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-bold border border-slate-200 dark:border-slate-700 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors flex items-center justify-center gap-2">
                                  <FileText size={14} /> Generate PDF
                              </button>
                          </div>

                          {/* Marketing ROI */}
                          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors group bg-slate-50 dark:bg-slate-900/30">
                              <div className="flex items-center gap-3 mb-3">
                                  <div className="p-2 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg">
                                      <Target size={20} />
                                  </div>
                                  <h4 className="font-bold text-slate-800 dark:text-white text-sm">Marketing ROI</h4>
                              </div>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 h-10 line-clamp-2">
                                  Campaign effectiveness, cost per lead, and channel attribution.
                              </p>
                              <button className="w-full py-2.5 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-bold border border-slate-200 dark:border-slate-700 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors flex items-center justify-center gap-2">
                                  <FileText size={14} /> Generate Report
                              </button>
                          </div>

                          {/* Custom Analytical Info */}
                          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors group bg-slate-50 dark:bg-slate-900/30">
                              <div className="flex items-center gap-3 mb-3">
                                  <div className="p-2 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg">
                                      <Activity size={20} />
                                  </div>
                                  <h4 className="font-bold text-slate-800 dark:text-white text-sm">Raw Data Export</h4>
                              </div>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 h-10 line-clamp-2">
                                  Export raw analytical data for external processing or custom analysis.
                              </p>
                              <button className="w-full py-2.5 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-bold border border-slate-200 dark:border-slate-700 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors flex items-center justify-center gap-2">
                                  <Download size={14} /> Export CSV
                              </button>
                          </div>
                      </div>
                  </div>
              </div>
          )}
      </div>
    </div>
  );
};
