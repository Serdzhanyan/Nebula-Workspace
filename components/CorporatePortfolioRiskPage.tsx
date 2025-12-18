import React, { useState, useMemo } from 'react';
import { Search, Filter, Download, ShieldAlert, Activity, TrendingUp, TrendingDown, AlertTriangle, CheckCircle2, ChevronDown, Check, Info, FileText, Scale, Zap, BarChart3, PieChart as PieChartIcon, Share2, RefreshCw, X, ArrowRight, UserPlus, ShieldCheck, DollarSign } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Cell, PieChart, Pie, Legend, ScatterChart, Scatter, ZAxis } from 'recharts';

interface RiskMetric {
  category: string;
  score: number; // 0-100 (Higher is riskier)
  impact: 'High' | 'Medium' | 'Low';
  trend: 'Improving' | 'Stable' | 'Deteriorating';
}

interface PortfolioAsset {
  id: string;
  name: string;
  type: string;
  exposure: number;
  rating: string;
  pd: number; // Probability of Default
  lgd: number; // Loss Given Default
}

interface PortfolioRiskProfile {
  id: string;
  name: string;
  industry: string;
  overallRiskScore: number;
  totalExposure: number;
  expectedLoss: number;
  economicCapital: number;
  lastStressTest: string;
  metrics: RiskMetric[];
  assets: PortfolioAsset[];
  sectorExposure: { name: string; value: number; color: string }[];
}

export const CorporatePortfolioRiskPage: React.FC = () => {
  // Mock Data for different companies
  const companies: PortfolioRiskProfile[] = [
    {
      id: '1',
      name: 'TechNova Solutions Ltd.',
      industry: 'Technology',
      overallRiskScore: 28,
      totalExposure: 15000000,
      expectedLoss: 125000,
      economicCapital: 850000,
      lastStressTest: 'Oct 20, 2024',
      metrics: [
        { category: 'Credit Risk', score: 22, impact: 'High', trend: 'Improving' },
        { category: 'Market Risk', score: 35, impact: 'Medium', trend: 'Stable' },
        { category: 'Operational Risk', score: 18, impact: 'Medium', trend: 'Improving' },
        { category: 'Concentration Risk', score: 40, impact: 'Low', trend: 'Stable' }
      ],
      assets: [
        { id: 'A1', name: 'US Revolving Line', type: 'Credit Line', exposure: 5000000, rating: 'AA', pd: 0.05, lgd: 45 },
        { id: 'A2', name: 'Euro Expansion Loan', type: 'Term Loan', exposure: 8000000, rating: 'A+', pd: 0.12, lgd: 40 },
        { id: 'A3', name: 'Trade Finance Facility', type: 'Guarantees', exposure: 2000000, rating: 'AA-', pd: 0.08, lgd: 35 }
      ],
      sectorExposure: [
        { name: 'Software', value: 60, color: '#6366f1' },
        { name: 'Hardware', value: 25, color: '#8b5cf6' },
        { name: 'Services', value: 15, color: '#ec4899' }
      ]
    },
    {
      id: '2',
      name: 'GreenLeaf Logistics',
      industry: 'Logistics',
      overallRiskScore: 54,
      totalExposure: 4500000,
      expectedLoss: 210000,
      economicCapital: 320000,
      lastStressTest: 'Sep 12, 2024',
      metrics: [
        { category: 'Credit Risk', score: 55, impact: 'High', trend: 'Deteriorating' },
        { category: 'Market Risk', score: 42, impact: 'High', trend: 'Stable' },
        { category: 'Operational Risk', score: 68, impact: 'Medium', trend: 'Stable' },
        { category: 'Concentration Risk', score: 30, impact: 'Low', trend: 'Improving' }
      ],
      assets: [
        { id: 'A4', name: 'Fleet Leasing Fund', type: 'Lease', exposure: 3000000, rating: 'BBB', pd: 1.5, lgd: 60 },
        { id: 'A5', name: 'Fuel Hedge Contract', type: 'Derivative', exposure: 1500000, rating: 'BB+', pd: 3.2, lgd: 20 }
      ],
      sectorExposure: [
        { name: 'Transportation', value: 70, color: '#f59e0b' },
        { name: 'Warehousing', value: 30, color: '#10b981' }
      ]
    },
    {
      id: '3',
      name: 'Quantum Dynamics',
      industry: 'Manufacturing',
      overallRiskScore: 72,
      totalExposure: 28000000,
      expectedLoss: 1450000,
      economicCapital: 2500000,
      lastStressTest: 'Oct 24, 2024',
      metrics: [
        { category: 'Credit Risk', score: 82, impact: 'High', trend: 'Deteriorating' },
        { category: 'Market Risk', score: 65, impact: 'High', trend: 'Stable' },
        { category: 'Operational Risk', score: 45, impact: 'Medium', trend: 'Stable' },
        { category: 'Concentration Risk', score: 90, impact: 'High', trend: 'Deteriorating' }
      ],
      assets: [
        { id: 'A6', name: 'Factory Alpha Bond', type: 'Bond', exposure: 20000000, rating: 'B-', pd: 8.5, lgd: 70 },
        { id: 'A7', name: 'R&D Bridge Loan', type: 'Bridge', exposure: 8000000, rating: 'CCC', pd: 12.0, lgd: 85 }
      ],
      sectorExposure: [
        { name: 'Heavy Industry', value: 90, color: '#ef4444' },
        { name: 'Robotics', value: 10, color: '#3b82f6' }
      ]
    }
  ];

  const [selectedCompany, setSelectedCompany] = useState<PortfolioRiskProfile>(companies[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<PortfolioAsset | null>(null);

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCompany = (company: PortfolioRiskProfile) => {
    setSelectedCompany(company);
    setSearchTerm("");
    setShowDropdown(false);
    setSelectedAsset(null);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact', maximumFractionDigits: 1 }).format(val);
  };

  const getRiskColor = (score: number) => {
    if (score >= 70) return '#ef4444'; // Red
    if (score >= 40) return '#f59e0b'; // Amber
    return '#10b981'; // Emerald
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'Improving': return <TrendingUp size={14} className="text-emerald-500" />;
      case 'Deteriorating': return <TrendingDown size={14} className="text-red-500" />;
      default: return <Activity size={14} className="text-slate-400" />;
    }
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-2 space-y-6">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldAlert className="text-indigo-500" /> Portfolio Risk Dashboard
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
             Aggregated credit risk analysis, concentration monitoring, and stress testing.
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto relative z-20">
            <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search company portfolio..." 
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
                                            <p className="text-xs text-slate-500">{comp.industry} • Risk: {comp.overallRiskScore}%</p>
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
            
            <button className="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">
                <Download size={18} />
            </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center relative overflow-hidden">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 z-10">Overall Risk Score</p>
              <div className="relative w-24 h-24 flex items-center justify-center z-10">
                  <svg className="w-full h-full transform -rotate-90">
                      <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100 dark:text-slate-800" />
                      {/* Fixed: Removed duplicate stroke attribute */}
                      <circle cx="48" cy="48" r="40" strokeWidth="8" fill="transparent" strokeDasharray={251} strokeDashoffset={251 - (251 * selectedCompany.overallRiskScore / 100)} stroke={getRiskColor(selectedCompany.overallRiskScore)} strokeLinecap="round" className="transition-all duration-1000" />
                  </svg>
                  <span className="absolute text-2xl font-bold text-slate-900 dark:text-white">{selectedCompany.overallRiskScore}%</span>
              </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-1">
                  <DollarSign size={16} className="text-indigo-500" />
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Exposure</p>
              </div>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{formatCurrency(selectedCompany.totalExposure)}</h3>
              <p className="text-xs text-slate-400 mt-1">Aggregated across all units</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle size={16} className="text-amber-500" />
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Expected Loss (EL)</p>
              </div>
              <h3 className="text-3xl font-bold text-amber-600 dark:text-amber-400">{formatCurrency(selectedCompany.expectedLoss)}</h3>
              <p className="text-xs text-slate-400 mt-1">Annual projected impairment</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-1">
                  <Scale size={16} className="text-emerald-500" />
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Economic Capital</p>
              </div>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{formatCurrency(selectedCompany.economicCapital)}</h3>
              <p className="text-xs text-slate-400 mt-1">Required buffer at 99.9% CI</p>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
          
          {/* Left Column: Metrics & Concentration */}
          <div className="lg:col-span-2 flex flex-col gap-4 overflow-y-auto pr-2 pb-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Risk Categories List */}
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm h-full">
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                          <Activity size={20} className="text-indigo-500" /> Component Analysis
                      </h3>
                      <div className="space-y-6">
                          {selectedCompany.metrics.map((m, idx) => (
                              <div key={idx} className="group">
                                  <div className="flex justify-between items-center mb-2">
                                      <div className="flex items-center gap-2">
                                          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{m.category}</span>
                                          {getTrendIcon(m.trend)}
                                      </div>
                                      <span className="text-xs font-bold text-slate-900 dark:text-white">{m.score}%</span>
                                  </div>
                                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                      <div className="h-full bg-indigo-500 rounded-full transition-all duration-1000 group-hover:bg-indigo-400" style={{ width: `${m.score}%` }}></div>
                                  </div>
                                  <div className="flex justify-between mt-1">
                                      <span className="text-[10px] text-slate-400 uppercase font-bold">Impact: {m.impact}</span>
                                      <span className="text-[10px] text-slate-400 uppercase font-bold">{m.trend}</span>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>

                  {/* Sector Concentration Pie */}
                  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm h-full flex flex-col">
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                          <PieChartIcon size={20} className="text-purple-500" /> Sector Exposure
                      </h3>
                      <div className="flex-1 w-full relative">
                          <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                  <Pie
                                      data={selectedCompany.sectorExposure}
                                      cx="50%"
                                      cy="50%"
                                      innerRadius={50}
                                      outerRadius={70}
                                      paddingAngle={8}
                                      dataKey="value"
                                  >
                                      {selectedCompany.sectorExposure.map((entry, index) => (
                                          <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                      ))}
                                  </Pie>
                                  <Tooltip 
                                    contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                    itemStyle={{ color: '#1e293b' }}
                                  />
                                  <Legend verticalAlign="bottom" align="center" iconType="circle" />
                              </PieChart>
                          </ResponsiveContainer>
                      </div>
                  </div>
              </div>

              {/* Asset Quality Table */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
                  <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                          <BarChart3 size={20} className="text-emerald-500" /> Portfolio Assets
                      </h3>
                      <button className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">View All Assets</button>
                  </div>
                  <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                          <thead className="bg-slate-50/50 dark:bg-slate-900/50 text-xs font-bold uppercase text-slate-500 dark:text-slate-400">
                              <tr>
                                  <th className="p-4 pl-6">Asset Name</th>
                                  <th className="p-4">Rating</th>
                                  <th className="p-4">Exposure</th>
                                  <th className="p-4">PD (%)</th>
                                  <th className="p-4">LGD (%)</th>
                                  <th className="p-4 pr-6 text-right">Actions</th>
                              </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-sm">
                              {selectedCompany.assets.map(asset => (
                                  <tr key={asset.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors group cursor-pointer" onClick={() => setSelectedAsset(asset)}>
                                      <td className="p-4 pl-6">
                                          <div>
                                              <p className="font-bold text-slate-900 dark:text-white">{asset.name}</p>
                                              <p className="text-[10px] text-slate-500 uppercase tracking-widest">{asset.type}</p>
                                          </div>
                                      </td>
                                      <td className="p-4">
                                          <span className={`px-2 py-1 rounded font-bold text-xs ${
                                              asset.rating.startsWith('A') ? 'bg-emerald-50 text-emerald-600' : 
                                              asset.rating.startsWith('B') ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'
                                          }`}>
                                              {asset.rating}
                                          </span>
                                      </td>
                                      <td className="p-4 font-medium text-slate-700 dark:text-slate-200">{formatCurrency(asset.exposure)}</td>
                                      <td className="p-4 font-mono text-slate-500">{asset.pd}%</td>
                                      <td className="p-4 font-mono text-slate-500">{asset.lgd}%</td>
                                      <td className="p-4 pr-6 text-right">
                                          <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors opacity-0 group-hover:opacity-100">
                                              <ArrowRight size={18} />
                                          </button>
                                      </td>
                                  </tr>
                              ))}
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>

          {/* Right Column: Mitigation & Controls */}
          <div className="space-y-6">
              
              {/* Asset Detail Overlay (If selected) */}
              {selectedAsset ? (
                  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm animate-in slide-in-from-right duration-300">
                      <div className="flex justify-between items-start mb-6">
                          <div>
                              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Asset Risk Profile</h3>
                              <p className="text-xs text-slate-500">Ref: {selectedAsset.id}</p>
                          </div>
                          <button onClick={() => setSelectedAsset(null)} className="p-2 hover:bg-slate-100 rounded-full"><X size={20} /></button>
                      </div>
                      
                      <div className="space-y-6">
                          <div className="grid grid-cols-2 gap-4">
                              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                                  <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">PD Score</p>
                                  <p className="text-lg font-bold text-slate-900 dark:text-white">{selectedAsset.pd}%</p>
                              </div>
                              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                                  <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Rating</p>
                                  <p className="font-bold text-indigo-600 dark:text-indigo-400 text-lg">{selectedAsset.rating}</p>
                              </div>
                          </div>
                          
                          <div>
                              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Risk Sensitivity</h4>
                              <div className="space-y-3">
                                  <div className="flex justify-between items-center text-xs">
                                      <span className="text-slate-600 dark:text-slate-400">Interest Rate Spike (+200bps)</span>
                                      <span className="text-red-500 font-bold">-$45k</span>
                                  </div>
                                  <div className="flex justify-between items-center text-xs">
                                      <span className="text-slate-600 dark:text-slate-400">Currency Volatility (+10%)</span>
                                      <span className="text-emerald-500 font-bold">+$12k</span>
                                  </div>
                              </div>
                          </div>

                          <div className="pt-4 border-t border-slate-100 dark:border-slate-700 space-y-2">
                               <button className="w-full py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all active:scale-95 shadow-sm flex items-center justify-center gap-2">
                                   Simulate Re-Rating
                               </button>
                               <button className="w-full py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95 shadow-sm">
                                   Mitigation Strategy
                               </button>
                          </div>
                      </div>
                  </div>
              ) : (
                  <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white shadow-xl">
                      <div className="flex items-center gap-3 mb-6">
                          <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                              <Zap size={24} />
                          </div>
                          <div>
                              <h3 className="font-bold text-lg">Stress Test Engine</h3>
                              <p className="text-xs text-indigo-100">Last run: {selectedCompany.lastStressTest}</p>
                          </div>
                      </div>
                      
                      <div className="space-y-4">
                          <button className="w-full py-3 bg-white text-indigo-600 rounded-xl font-bold text-sm hover:bg-indigo-50 transition-all flex items-center justify-center gap-2">
                              <Activity size={16} /> Run Full Simulation
                          </button>
                          
                          <div className="p-4 bg-black/20 rounded-xl border border-white/10">
                              <p className="text-xs font-bold text-indigo-200 uppercase mb-3 tracking-widest">Base Scenario</p>
                              <div className="flex justify-between items-center">
                                  <span className="text-xs">EL Delta</span>
                                  <span className="text-sm font-bold text-emerald-300">-2.4%</span>
                              </div>
                              <div className="flex justify-between items-center mt-2">
                                  <span className="text-xs">Capital Impact</span>
                                  <span className="text-sm font-bold text-white">$14k</span>
                              </div>
                          </div>
                      </div>
                  </div>
              )}

              {/* Mitigation Plan Card */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                      <ShieldCheck size={18} className="text-emerald-500" /> Risk Mitigation
                  </h3>
                  <div className="space-y-4">
                      <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                          <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                              Collateral coverage for <strong>Term Loan A</strong> increased to 120% of principal.
                          </p>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                          <AlertTriangle size={16} className="text-amber-500 mt-0.5 shrink-0" />
                          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                              Exposure to <strong>Robotics</strong> sector is 15% above internal soft-cap.
                          </p>
                      </div>
                      <button className="w-full py-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                          View Detailed Strategy Plan
                      </button>
                  </div>
              </div>

          </div>
      </div>
      
      {/* Hidden Fallback UI for Empty Portfolio */}
      {selectedCompany.assets.length === 0 && (
          <div className="bg-slate-50 dark:bg-slate-900/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 p-8 flex flex-col items-center justify-center text-center h-full text-slate-400">
              <DollarSign size={48} className="mb-4 opacity-20" />
              <p className="font-medium">No assets found for this category.</p>
          </div>
      )}
    </div>
  );
};
