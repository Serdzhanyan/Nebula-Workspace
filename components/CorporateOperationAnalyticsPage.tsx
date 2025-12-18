import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Activity, 
  TrendingUp, 
  Zap, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  MoreHorizontal, 
  RefreshCw, 
  X, 
  BarChart3, 
  PieChart as PieIcon, 
  Layers, 
  Globe, 
  Cpu, 
  ArrowUpRight, 
  ArrowDownRight,
  ShieldCheck,
  Check,
  // Added missing ChevronRight import
  ChevronRight
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  BarChart, 
  Bar, 
  Cell,
  PieChart,
  Pie,
  Legend
} from 'recharts';

interface OpMetric {
  id: string;
  name: string;
  type: 'API' | 'Database' | 'Network' | 'Worker';
  latency: string;
  throughput: string;
  status: 'Healthy' | 'Degraded' | 'Critical';
  errorRate: number;
}

interface AnalyticsCompany {
  id: string;
  name: string;
  industry: string;
  healthScore: number;
  totalVolume: string;
  uptime: string;
  metrics: OpMetric[];
  trendData: { time: string; requests: number; errors: number }[];
}

export const CorporateOperationAnalyticsPage: React.FC = () => {
  const companies: AnalyticsCompany[] = [
    {
      id: '1',
      name: 'TechNova Solutions Ltd.',
      industry: 'Technology',
      healthScore: 98,
      totalVolume: '1.2M',
      uptime: '99.99%',
      metrics: [
        { id: 'm1', name: 'Core Auth API', type: 'API', latency: '42ms', throughput: '15k/min', status: 'Healthy', errorRate: 0.01 },
        { id: 'm2', name: 'Global Payment Switch', type: 'Network', latency: '120ms', throughput: '8k/min', status: 'Healthy', errorRate: 0.05 },
        { id: 'm3', name: 'User Data Cluster', type: 'Database', latency: '15ms', throughput: '45k/min', status: 'Healthy', errorRate: 0.02 },
      ],
      trendData: [
        { time: '00:00', requests: 4000, errors: 20 }, { time: '04:00', requests: 3000, errors: 15 },
        { time: '08:00', requests: 12000, errors: 60 }, { time: '12:00', requests: 18000, errors: 85 },
        { time: '16:00', requests: 15000, errors: 70 }, { time: '20:00', requests: 9000, errors: 40 },
      ]
    },
    {
      id: '2',
      name: 'GreenLeaf Logistics',
      industry: 'Logistics',
      healthScore: 82,
      totalVolume: '450k',
      uptime: '98.50%',
      metrics: [
        { id: 'm4', name: 'Tracking Gateway', type: 'API', latency: '350ms', throughput: '2k/min', status: 'Degraded', errorRate: 1.2 },
        { id: 'm5', name: 'Route Optimization', type: 'Worker', latency: '5s', throughput: '500/min', status: 'Healthy', errorRate: 0.1 },
      ],
      trendData: [
        { time: '08:00', requests: 5000, errors: 120 }, { time: '12:00', requests: 8000, errors: 300 },
        { time: '16:00', requests: 6000, errors: 150 },
      ]
    },
    {
      id: '3',
      name: 'Quantum Dynamics',
      industry: 'Manufacturing',
      healthScore: 94,
      totalVolume: '8.5M',
      uptime: '99.95%',
      metrics: [
        { id: 'm6', name: 'IoT Edge Ingestion', type: 'API', latency: '12ms', throughput: '120k/min', status: 'Healthy', errorRate: 0.001 },
      ],
      trendData: [
        { time: 'Q1', requests: 2000000, errors: 500 }, { time: 'Q2', requests: 3500000, errors: 800 },
        { time: 'Q3', requests: 4000000, errors: 1000 },
      ]
    }
  ];

  const [selectedCompany, setSelectedCompany] = useState<AnalyticsCompany>(companies[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [timeRange, setTimeRange] = useState("24h");
  const [selectedMetric, setSelectedMetric] = useState<OpMetric | null>(null);

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCompany = (company: AnalyticsCompany) => {
    setSelectedCompany(company);
    setSearchTerm("");
    setShowDropdown(false);
    setSelectedMetric(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Healthy': return 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800';
      case 'Degraded': return 'text-amber-500 bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-800';
      case 'Critical': return 'text-red-500 bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-800';
      default: return 'text-slate-500 bg-slate-50';
    }
  };

  const typeData = [
    { name: 'Success', value: 99.4, color: '#10b981' },
    { name: 'Errors', value: 0.6, color: '#ef4444' },
  ];

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-2 space-y-6">
      
      {/* Header & Functional Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-50">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Activity className="text-indigo-500" /> Operation Analytics
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
             Real-time monitoring of system throughput, health, and service levels.
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto relative">
            <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search company or subsystem..." 
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowDropdown(true);
                    }}
                    onFocus={() => setShowDropdown(true)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-slate-900 dark:text-white transition-all shadow-sm focus:bg-white dark:focus:bg-slate-900"
                />
                
                {showDropdown && (
                    <>
                        <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)}></div>
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden z-20 max-h-60 overflow-y-auto animate-in zoom-in-95 duration-200">
                            {filteredCompanies.length > 0 ? (
                                filteredCompanies.map(comp => (
                                    <button
                                        key={comp.id}
                                        onClick={() => handleSelectCompany(comp)}
                                        className="w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 border-b border-slate-100 dark:border-slate-800 last:border-0 flex justify-between items-center group transition-colors"
                                    >
                                        <div>
                                            <p className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{comp.name}</p>
                                            <p className="text-xs text-slate-500">{comp.industry} • Health: {comp.healthScore}%</p>
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
            
            <div className="flex bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-1 shadow-sm">
                {['24h', '7d', '30d'].map((r) => (
                    <button
                        key={r}
                        onClick={() => setTimeRange(r)}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${timeRange === r ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                    >
                        {r}
                    </button>
                ))}
            </div>

            <button className="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
                <Download size={18} />
            </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group">
              <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-xl group-hover:scale-110 transition-transform">
                      <Activity size={24} />
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400 px-2 py-1 rounded-full">
                      <TrendingUp size={12}/> +4.2%
                  </div>
              </div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Health Score</p>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{selectedCompany.healthScore}%</h3>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group">
              <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl group-hover:scale-110 transition-transform">
                      <Globe size={24} />
                  </div>
                  <div className="text-xs font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">
                      Rolling 24h
                  </div>
              </div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Total Throughput</p>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{selectedCompany.totalVolume} Req</h3>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group">
              <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-xl group-hover:scale-110 transition-transform">
                      <ShieldCheck size={24} />
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-emerald-500">
                      <ArrowUpRight size={12}/> Stable
                  </div>
              </div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">System Uptime</p>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{selectedCompany.uptime}</h3>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group">
              <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-xl group-hover:scale-110 transition-transform">
                      <Zap size={24} />
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-red-500 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-full">
                      <TrendingUp size={12}/> +12ms
                  </div>
              </div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Avg. Latency</p>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">42ms</h3>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
          
          {/* Left Column: Trend & Distribution */}
          <div className="lg:col-span-2 flex flex-col gap-6 overflow-y-auto pr-2 pb-10">
              
              {/* Traffic Chart */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-[400px]">
                  <div className="flex justify-between items-center mb-6">
                      <div>
                          <h3 className="font-bold text-lg text-slate-900 dark:text-white">Operation Volume</h3>
                          <p className="text-xs text-slate-500">Requests vs Errors across all hubs</p>
                      </div>
                      <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest">
                          <span className="flex items-center gap-1.5 text-indigo-500"><div className="w-2 h-2 rounded-full bg-indigo-500"></div> Requests</span>
                          <span className="flex items-center gap-1.5 text-red-500"><div className="w-2 h-2 rounded-full bg-red-500"></div> Errors</span>
                      </div>
                  </div>
                  <div className="flex-1 w-full min-h-0">
                      <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={selectedCompany.trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                              <defs>
                                  <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                  </linearGradient>
                                  <linearGradient id="colorErrors" x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2}/>
                                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                                  </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                              <Tooltip 
                                  contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                  itemStyle={{ fontSize: '12px', fontWeight: '600' }}
                              />
                              <Area type="monotone" dataKey="requests" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorRequests)" />
                              <Area type="monotone" dataKey="errors" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorErrors)" />
                          </AreaChart>
                      </ResponsiveContainer>
                  </div>
              </div>

              {/* Sub-system Monitor */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                  <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white">Sub-system Performance</h3>
                      <button className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">Diagnostics</button>
                  </div>
                  <div className="divide-y divide-slate-100 dark:divide-slate-800">
                      {selectedCompany.metrics.map((metric) => (
                          <div 
                            key={metric.id} 
                            onClick={() => setSelectedMetric(metric)}
                            className={`p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-center justify-between cursor-pointer group ${selectedMetric?.id === metric.id ? 'bg-indigo-50/50 dark:bg-indigo-900/10' : ''}`}
                          >
                              <div className="flex items-center gap-4">
                                  <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-500 group-hover:text-indigo-500 transition-colors">
                                      {metric.type === 'API' ? <Globe size={20} /> : metric.type === 'Database' ? <Layers size={20} /> : <Cpu size={20} />}
                                  </div>
                                  <div>
                                      <h4 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-indigo-600 transition-colors">{metric.name}</h4>
                                      <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                                          <span>Type: {metric.type}</span>
                                          <span>•</span>
                                          <span>Latency: {metric.latency}</span>
                                      </div>
                                  </div>
                              </div>
                              <div className="flex items-center gap-6">
                                  <div className="text-right hidden sm:block">
                                      <p className="text-[10px] text-slate-400 uppercase font-bold">Throughput</p>
                                      <p className="text-sm font-bold text-slate-900 dark:text-white">{metric.throughput}</p>
                                  </div>
                                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${getStatusColor(metric.status)}`}>
                                      {metric.status}
                                  </span>
                                  <ChevronRight size={16} className="text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          </div>

          {/* Right Column: Detailed Inspector */}
          <div className="space-y-6">
              {selectedMetric ? (
                  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col h-full animate-in slide-in-from-right duration-300">
                      <div className="flex justify-between items-start mb-6">
                          <div>
                              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Node Inspector</h3>
                              <p className="text-xs text-slate-500">{selectedMetric.name}</p>
                          </div>
                          <button onClick={() => setSelectedMetric(null)} className="p-1 hover:bg-slate-100 rounded-lg text-slate-400"><X size={20} /></button>
                      </div>

                      <div className="space-y-6 flex-1">
                          {/* Success Rate Chart */}
                          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Request Success Rate</h4>
                              <div className="h-40 relative">
                                  <ResponsiveContainer width="100%" height="100%">
                                      <PieChart>
                                          <Pie
                                              data={[{name: 'Success', value: 100 - selectedMetric.errorRate}, {name: 'Error', value: selectedMetric.errorRate}]}
                                              cx="50%" cy="50%" innerRadius={45} outerRadius={60} paddingAngle={5} dataKey="value"
                                          >
                                              <Cell fill="#10b981" />
                                              <Cell fill="#ef4444" />
                                          </Pie>
                                          <Tooltip />
                                      </PieChart>
                                  </ResponsiveContainer>
                                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-2">
                                      <span className="text-2xl font-bold text-slate-900 dark:text-white">{(100 - selectedMetric.errorRate).toFixed(2)}%</span>
                                  </div>
                              </div>
                          </div>

                          <div className="space-y-4">
                              <div className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm">
                                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Live Metrics</p>
                                  <div className="grid grid-cols-2 gap-4">
                                      <div>
                                          <p className="text-[10px] text-slate-500">Errors (5m)</p>
                                          <p className="text-lg font-bold text-red-500">{(selectedMetric.errorRate * 12).toFixed(0)}</p>
                                      </div>
                                      <div>
                                          <p className="text-[10px] text-slate-500">CPU Usage</p>
                                          <p className="text-lg font-bold text-slate-900 dark:text-white">24%</p>
                                      </div>
                                  </div>
                              </div>

                              <div className="p-4 bg-indigo-50/50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-900/30 rounded-xl">
                                  <h5 className="text-xs font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-2 mb-2">
                                      <Zap size={14} /> AI Recommendation
                                  </h5>
                                  <p className="text-xs text-indigo-600 dark:text-indigo-400 leading-relaxed">
                                      Based on latency spikes at 12:00, we recommend scaling the {selectedMetric.type} instances by 20% to maintain sub-50ms resolution.
                                  </p>
                              </div>
                          </div>

                          <div className="mt-auto pt-6 space-y-3 border-t border-slate-100 dark:border-slate-800">
                               <button className="w-full py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-sm">
                                  <RefreshCw size={16} /> Re-deploy Subsystem
                               </button>
                               <button className="w-full py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all">
                                  Access Raw Logs
                               </button>
                          </div>
                      </div>
                  </div>
              ) : (
                  <div className="bg-slate-50 dark:bg-slate-900/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 p-8 flex flex-col items-center justify-center text-center h-full text-slate-400">
                      <BarChart3 size={48} className="mb-4 opacity-20" />
                      <p className="font-medium">Select a subsystem to inspect live node data</p>
                  </div>
              )}
          </div>
      </div>
    </div>
  );
};