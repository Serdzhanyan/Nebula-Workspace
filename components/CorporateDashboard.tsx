
import React, { useState } from 'react';
import { Search, Filter, TrendingUp, TrendingDown, AlertTriangle, FileText, CheckCircle2, MoreHorizontal, ArrowUpRight, DollarSign, Activity, ChevronDown, Download, Plus } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export const CorporateDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All Sectors");

  const companies = [
    { id: '1', name: 'TechNova Solutions Ltd.', industry: 'Technology', status: 'Active', revenue: '$4.2M' },
    { id: '2', name: 'GreenLeaf Logistics', industry: 'Logistics', status: 'Active', revenue: '$12.5M' },
    { id: '3', name: 'Quantum Dynamics', industry: 'Manufacturing', status: 'Pending Review', revenue: '$8.1M' },
    { id: '4', name: 'Stark Industries', industry: 'Defense', status: 'Active', revenue: '$42.0B' },
    { id: '5', name: 'Acme Corp', industry: 'Conglomerate', status: 'Active', revenue: '$1.2M' },
    { id: '6', name: 'Wayne Enterprises', industry: 'Conglomerate', status: 'Active', revenue: '$35.0B' },
  ];

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const revenueData = [
    { month: 'Jan', value: 45000 },
    { month: 'Feb', value: 52000 },
    { month: 'Mar', value: 49000 },
    { month: 'Apr', value: 62000 },
    { month: 'May', value: 58000 },
    { month: 'Jun', value: 75000 },
  ];

  const recentActivities = [
    { id: '1', type: 'Application', company: 'Quantum Dynamics', detail: 'New loan application submitted', time: '10 min ago', icon: FileText, color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30' },
    { id: '2', type: 'Alert', company: 'Stark Industries', detail: 'Unusual transaction volume detected', time: '45 min ago', icon: AlertTriangle, color: 'text-amber-600 bg-amber-100 dark:bg-amber-900/30' },
    { id: '3', type: 'Approval', company: 'GreenLeaf Logistics', detail: 'Credit limit increase approved', time: '2 hours ago', icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30' },
  ];

  const handleSearchSelect = (companyName: string) => {
    setSearchTerm(companyName);
    setShowSearchDropdown(false);
  };

  return (
    <div className="flex-1 h-full flex flex-col overflow-y-auto bg-slate-50 dark:bg-slate-950 animate-in fade-in slide-in-from-bottom-2 duration-300">
      
      {/* Header & Controls */}
      <div className="px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Corporate Dashboard</h1>
                <p className="text-slate-500 dark:text-slate-400">Overview of client portfolios, recent activities, and performance metrics.</p>
            </div>
            
            <div className="flex gap-3 w-full md:w-auto">
                <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm text-slate-700 dark:text-slate-200">
                    <Download size={16} /> Reports
                </button>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 dark:shadow-none">
                    <Plus size={16} /> New Application
                </button>
            </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 relative z-30">
            <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search companies, IDs, or contacts..." 
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowSearchDropdown(true);
                    }}
                    onFocus={() => setShowSearchDropdown(true)}
                    className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm text-slate-900 dark:text-white"
                />
                
                {/* Search Dropdown */}
                {showSearchDropdown && (
                    <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowSearchDropdown(false)}></div>
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-20 max-h-80 overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
                        {filteredCompanies.length > 0 ? (
                            <>
                                <div className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-50 dark:bg-slate-950/50">Companies</div>
                                {filteredCompanies.map(company => (
                                    <button 
                                        key={company.id}
                                        onClick={() => handleSearchSelect(company.name)}
                                        className="w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 border-b border-slate-100 dark:border-slate-800 last:border-0 flex items-center justify-between group transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">
                                                {company.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{company.name}</p>
                                                <p className="text-xs text-slate-500">{company.industry}</p>
                                            </div>
                                        </div>
                                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                                            company.status === 'Active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                                        }`}>{company.status}</span>
                                    </button>
                                ))}
                            </>
                        ) : (
                            <div className="p-8 text-center text-slate-500 text-sm">No results found.</div>
                        )}
                    </div>
                    </>
                )}
            </div>

            <div className="relative">
                <button 
                    onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                    className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm w-full md:w-auto justify-between text-slate-700 dark:text-slate-200"
                >
                    <div className="flex items-center gap-2">
                        <Filter size={16} /> {selectedFilter}
                    </div>
                    <ChevronDown size={14} className={`transition-transform duration-200 ${showFilterDropdown ? 'rotate-180' : ''}`} />
                </button>
                
                {showFilterDropdown && (
                    <>
                        <div className="fixed inset-0 z-10" onClick={() => setShowFilterDropdown(false)}></div>
                        <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-1 z-20 animate-in fade-in zoom-in-95 duration-200">
                            {['All Sectors', 'Technology', 'Logistics', 'Finance', 'Manufacturing', 'Retail'].map(filter => (
                                <button
                                    key={filter}
                                    onClick={() => {
                                        setSelectedFilter(filter);
                                        setShowFilterDropdown(false);
                                    }}
                                    className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${selectedFilter === filter ? 'text-indigo-600 font-medium' : 'text-slate-600 dark:text-slate-300'}`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all group">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                        <DollarSign size={24} />
                    </div>
                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-full">
                        <TrendingUp size={12} /> +12.5%
                    </span>
                </div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">$142.5M</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Total Portfolio Value</p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all group">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                        <Activity size={24} />
                    </div>
                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-full">
                        <TrendingUp size={12} /> +5.2%
                    </span>
                </div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">842</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Active Credit Lines</p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all group">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
                        <FileText size={24} />
                    </div>
                    <span className="flex items-center gap-1 text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">
                        12 Pending
                    </span>
                </div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">$45.2M</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Applications in Pipeline</p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all group">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 group-hover:scale-110 transition-transform">
                        <AlertTriangle size={24} />
                    </div>
                    <span className="flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-full">
                        <TrendingDown size={12} /> +2
                    </span>
                </div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">3</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Critical Risk Alerts</p>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Chart */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">Portfolio Growth</h3>
                    <div className="flex gap-2">
                        <span className="flex items-center gap-1 text-xs text-slate-500"><div className="w-2 h-2 rounded-full bg-indigo-500"></div> Revenue</span>
                        <span className="flex items-center gap-1 text-xs text-slate-500"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> New Clients</span>
                    </div>
                </div>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                itemStyle={{ color: '#1e293b' }}
                            />
                            <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">Recent Activity</h3>
                    <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700">View All</button>
                </div>
                <div className="space-y-4">
                    {recentActivities.map((activity) => (
                        <div key={activity.id} className="flex gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-800">
                            <div className={`p-2.5 rounded-lg h-fit ${activity.color}`}>
                                <activity.icon size={18} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-slate-900 dark:text-white">{activity.company}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{activity.detail}</p>
                            </div>
                            <span className="text-[10px] font-medium text-slate-400 whitespace-nowrap">{activity.time}</span>
                        </div>
                    ))}
                </div>
                <button className="w-full mt-4 py-2.5 border-t border-slate-100 dark:border-slate-800 text-slate-500 text-xs font-medium hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
                    View 12 more updates
                </button>
            </div>
        </div>

        {/* Key Accounts Table */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">Key Accounts</h3>
                <div className="flex gap-2">
                    <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 transition-colors">
                        <Filter size={18} />
                    </button>
                    <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 transition-colors">
                        <MoreHorizontal size={18} />
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50/50 dark:bg-slate-900/50 text-xs font-bold uppercase text-slate-500 dark:text-slate-400">
                        <tr>
                            <th className="px-6 py-4">Company</th>
                            <th className="px-6 py-4">Industry</th>
                            <th className="px-6 py-4">Total Revenue</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                        {companies.slice(0, 5).map((company) => (
                            <tr key={company.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group cursor-pointer">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-xs text-slate-600 dark:text-slate-300">
                                            {company.name.charAt(0)}
                                        </div>
                                        <span className="font-medium text-slate-900 dark:text-white">{company.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-slate-500">{company.industry}</td>
                                <td className="px-6 py-4 font-bold text-slate-700 dark:text-slate-300">{company.revenue}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
                                        company.status === 'Active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                                    }`}>
                                        {company.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-xs font-bold text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 flex items-center gap-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                        Details <ArrowUpRight size={14} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

      </div>
    </div>
  );
};
