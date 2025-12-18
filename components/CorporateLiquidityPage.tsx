import React, { useState, useMemo } from 'react';
import { Search, Filter, Download, Plus, ChevronDown, Check, DollarSign, Activity, Clock, CheckCircle2, AlertTriangle, FileText, MoreHorizontal, RefreshCw, X, ArrowUpRight, TrendingUp, Landmark, ShieldCheck, Globe, Scale, Zap, ArrowRightLeft, Layers, BarChart3, PieChart as PieIcon, Briefcase } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, PieChart, Pie, BarChart, Bar } from 'recharts';

interface CashPool {
  id: string;
  name: string;
  headerAccount: string;
  type: 'ZBA' | 'Target' | 'Notional';
  currency: string;
  balance: number;
  participants: number;
  status: 'Active' | 'Paused' | 'Review';
}

interface LiquidityProfile {
  id: string;
  name: string;
  industry: string;
  totalLiquidity: number; // USD Eqv
  targetPosition: number;
  netDailyFlow: number;
  activePoolsCount: number;
  pools: CashPool[];
  flowHistory: { time: string; inbound: number; outbound: number }[];
  allocation: { name: string; value: number; color: string }[];
}

export const CorporateLiquidityPage: React.FC = () => {
  // Mock Data
  const companies: LiquidityProfile[] = [
    {
      id: '1',
      name: 'TechNova Solutions Ltd.',
      industry: 'Technology',
      totalLiquidity: 14500000,
      targetPosition: 12000000,
      netDailyFlow: 450000,
      activePoolsCount: 4,
      pools: [
        { id: 'P1', name: 'Global Tech ZBA', headerAccount: 'US-882190', type: 'ZBA', currency: 'USD', balance: 8500000, participants: 12, status: 'Active' },
        { id: 'P2', name: 'Euro Operations Pool', headerAccount: 'EU-991023', type: 'Target', currency: 'EUR', balance: 4200000, participants: 8, status: 'Active' },
        { id: 'P3', name: 'APAC Notional', headerAccount: 'SG-220199', type: 'Notional', currency: 'SGD', balance: 1200000, status: 'Paused', participants: 5 },
        { id: 'P4', name: 'UK Treasury Hub', headerAccount: 'GB-110299', type: 'ZBA', currency: 'GBP', balance: 600000, status: 'Active', participants: 3 },
      ],
      flowHistory: [
        { time: '09:00', inbound: 120000, outbound: 80000 },
        { time: '11:00', inbound: 350000, outbound: 280000 },
        { time: '13:00', inbound: 480000, outbound: 520000 },
        { time: '15:00', inbound: 620000, outbound: 450000 },
        { time: '17:00', inbound: 750000, outbound: 300000 },
      ],
      allocation: [
        { name: 'North America', value: 65, color: '#6366f1' },
        { name: 'EMEA', value: 25, color: '#10b981' },
        { name: 'APAC', value: 10, color: '#f59e0b' },
      ]
    },
    {
      id: '2',
      name: 'GreenLeaf Logistics',
      industry: 'Logistics',
      totalLiquidity: 4200000,
      targetPosition: 5000000,
      netDailyFlow: -120000,
      activePoolsCount: 2,
      pools: [
        { id: 'P5', name: 'US Operations ZBA', headerAccount: 'US-552100', type: 'ZBA', currency: 'USD', balance: 3500000, participants: 45, status: 'Active' },
        { id: 'P6', name: 'Mexico Cash Hub', headerAccount: 'MX-332100', type: 'Target', currency: 'MXN', balance: 700000, participants: 15, status: 'Active' },
      ],
      flowHistory: [
        { time: '09:00', inbound: 50000, outbound: 120000 },
        { time: '11:00', inbound: 120000, outbound: 180000 },
        { time: '13:00', inbound: 180000, outbound: 350000 },
        { time: '15:00', inbound: 320000, outbound: 400000 },
        { time: '17:00', inbound: 450000, outbound: 570000 },
      ],
      allocation: [
        { name: 'North America', value: 85, color: '#6366f1' },
        { name: 'LATAM', value: 15, color: '#ec4899' },
      ]
    },
    {
      id: '3',
      name: 'Quantum Dynamics',
      industry: 'Manufacturing',
      totalLiquidity: 28000000,
      targetPosition: 25000000,
      netDailyFlow: 1200000,
      activePoolsCount: 6,
      pools: [
         { id: 'P7', name: 'Global Treasury ZBA', headerAccount: 'DE-882110', type: 'ZBA', currency: 'EUR', balance: 22000000, participants: 32, status: 'Active' },
         { id: 'P8', name: 'North America Hub', headerAccount: 'US-112233', type: 'ZBA', currency: 'USD', balance: 6000000, participants: 12, status: 'Active' },
      ],
      flowHistory: [
        { time: '09:00', inbound: 1000000, outbound: 400000 },
        { time: '12:00', inbound: 2500000, outbound: 1200000 },
        { time: '15:00', inbound: 3800000, outbound: 2600000 },
      ],
      allocation: [
        { name: 'Europe', value: 75, color: '#6366f1' },
        { name: 'North America', value: 25, color: '#3b82f6' },
      ]
    }
  ];

  const [selectedCompany, setSelectedCompany] = useState<LiquidityProfile>(companies[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filterType, setFilterType] = useState("All");
  const [selectedPool, setSelectedPool] = useState<CashPool | null>(companies[0].pools[0]);

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPools = useMemo(() => {
    return selectedCompany.pools.filter(p => 
      filterType === 'All' || p.type === filterType
    );
  }, [selectedCompany, filterType]);

  const handleSelectCompany = (company: LiquidityProfile) => {
    setSelectedCompany(company);
    setSearchTerm("");
    setShowDropdown(false);
    setSelectedPool(company.pools.length > 0 ? company.pools[0] : null);
  };

  const formatCurrency = (val: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency, notation: 'compact', maximumFractionDigits: 1 }).format(val);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
      case 'Paused': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800';
      case 'Review': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-2 space-y-6">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <RefreshCw className="text-indigo-500 animate-spin-slow" /> Liquidity Management
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
             Optimize cash concentration, inter-company loans, and global net positions.
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto relative z-20">
            <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search company or pool ID..." 
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
                                            <p className="text-xs text-slate-500">{comp.industry} • {formatCurrency(comp.totalLiquidity)}</p>
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
                <Plus size={18} /> Create Pool
            </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Global Liquidity</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{formatCurrency(selectedCompany.totalLiquidity)}</h3>
              <div className="flex items-center gap-1 mt-1 text-xs text-emerald-500 font-medium">
                  <TrendingUp size={12}/> {((selectedCompany.totalLiquidity / selectedCompany.targetPosition) * 100).toFixed(1)}% of Target
              </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Active Pools</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedCompany.activePoolsCount}</h3>
              <p className="text-xs text-slate-400 mt-1">Cross-border concentration</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Net Daily Flow</p>
              <h3 className={`text-2xl font-bold ${selectedCompany.netDailyFlow >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {formatCurrency(selectedCompany.netDailyFlow)}
              </h3>
              <p className="text-xs text-slate-400 mt-1">Settlement projections</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Utilization Rate</p>
              <h3 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">72.4%</h3>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-indigo-500" style={{ width: '72.4%' }}></div>
              </div>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
          
          {/* Left Column: Cash Pools List */}
          <div className="lg:col-span-2 flex flex-col gap-4 overflow-y-auto pr-2 pb-10">
              <div className="flex justify-between items-center mb-2 px-1">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">Liquidity Pools</h3>
                  <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                      {['All', 'ZBA', 'Target', 'Notional'].map(t => (
                          <button
                            key={t}
                            onClick={() => setFilterType(t)}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                filterType === t 
                                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-sm' 
                                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                            }`}
                          >
                              {t}
                          </button>
                      ))}
                  </div>
              </div>

              {filteredPools.map(pool => (
                  <div 
                    key={pool.id} 
                    onClick={() => setSelectedPool(pool)}
                    className={`bg-white dark:bg-slate-900 p-5 rounded-2xl border transition-all cursor-pointer group hover:shadow-md relative overflow-hidden ${
                        selectedPool?.id === pool.id 
                        ? 'border-indigo-500 ring-1 ring-indigo-500 shadow-md' 
                        : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700'
                    }`}
                  >
                      <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                              <div className={`p-2.5 rounded-xl ${
                                  pool.status === 'Active' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30' :
                                  'bg-slate-100 text-slate-600 dark:bg-slate-800'
                              }`}>
                                  <Layers size={20} />
                              </div>
                              <div>
                                  <h4 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{pool.name}</h4>
                                  <p className="text-xs text-slate-500 font-mono mt-0.5">{pool.type} • Header: {pool.headerAccount}</p>
                              </div>
                          </div>
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${getStatusColor(pool.status)}`}>
                              {pool.status}
                          </span>
                      </div>

                      <div className="flex justify-between items-end">
                          <div className="text-xs text-slate-500 space-y-1">
                              <p>Participants: <span className="font-medium text-slate-700 dark:text-slate-300">{pool.participants} accounts</span></p>
                              <div className="flex items-center gap-2 mt-2">
                                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Pool Integrity</span>
                                 <div className="w-24 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                     <div className="h-full bg-emerald-500" style={{ width: '92%' }}></div>
                                 </div>
                              </div>
                          </div>
                          <div className="text-right">
                              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">Pool Balance</p>
                              <p className="text-xl font-bold text-slate-900 dark:text-white">
                                  {formatCurrency(pool.balance, pool.currency)}
                              </p>
                          </div>
                      </div>
                  </div>
              ))}

              {filteredPools.length === 0 && (
                  <div className="text-center py-16 text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                      <Briefcase size={48} className="mx-auto mb-2 opacity-30" />
                      <p className="font-medium">No pools found for this selection.</p>
                  </div>
              )}
          </div>

          {/* Right Column: Deep Analysis & Tools */}
          <div className="space-y-6">
              {/* Regional Allocation Chart */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col h-72">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wide mb-4 flex items-center gap-2">
                      <Globe size={16} className="text-blue-500" /> Geography
                  </h3>
                  <div className="flex-1 w-full min-h-0">
                      <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                              <Pie
                                  data={selectedCompany.allocation}
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={45}
                                  outerRadius={65}
                                  paddingAngle={5}
                                  dataKey="value"
                              >
                                  {selectedCompany.allocation.map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                  ))}
                              </Pie>
                              <Tooltip />
                              <Legend verticalAlign="bottom" align="center" iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                          </PieChart>
                      </ResponsiveContainer>
                  </div>
              </div>

              {/* Cash Flow Forecast */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col h-80">
                  <div className="flex justify-between items-center mb-6">
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wide flex items-center gap-2">
                          <Activity size={16} className="text-emerald-500" /> Net Flows
                      </h3>
                      <button className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline">Full Forecast</button>
                  </div>
                  <div className="flex-1 w-full min-h-0">
                      <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={selectedCompany.flowHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                              <defs>
                                  <linearGradient id="colorIn" x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                  </linearGradient>
                                  <linearGradient id="colorOut" x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2}/>
                                      <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                                  </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                              <XAxis dataKey="time" hide />
                              <YAxis hide />
                              <Tooltip />
                              <Area type="monotone" dataKey="inbound" stroke="#10b981" fillOpacity={1} fill="url(#colorIn)" strokeWidth={2} />
                              <Area type="monotone" dataKey="outbound" stroke="#f43f5e" fillOpacity={1} fill="url(#colorOut)" strokeWidth={2} />
                          </AreaChart>
                      </ResponsiveContainer>
                  </div>
              </div>

              {/* Stress Test Widget */}
              <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-2xl p-6 text-white shadow-xl">
                   <div className="flex items-center gap-3 mb-6">
                       <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                           <ShieldCheck size={20} className="text-emerald-400" />
                       </div>
                       <h4 className="font-bold">Liquidity Guard</h4>
                   </div>
                   <div className="space-y-4">
                       <div className="flex justify-between items-center text-xs">
                           <span className="opacity-70">Stress Test Level</span>
                           <span className="font-bold text-emerald-400">Moderate</span>
                       </div>
                       <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                            <p className="text-[10px] text-slate-400 mb-2 uppercase font-bold tracking-widest">Projection (30D)</p>
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-xl font-bold">Safe</p>
                                    <p className="text-[10px] opacity-60">No shortfalls detected</p>
                                </div>
                                <CheckCircle2 size={24} className="text-emerald-400" />
                            </div>
                       </div>
                       <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-bold transition-all shadow-lg">
                           Run Simulation
                       </button>
                   </div>
              </div>
          </div>
      </div>
    </div>
  );
};
