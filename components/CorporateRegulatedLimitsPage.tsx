
import React, { useState } from 'react';
import { Search, Filter, Download, Shield, Sliders, AlertTriangle, CheckCircle2, TrendingUp, DollarSign, CreditCard, RefreshCw, Lock, Edit2, ArrowRight } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

interface Limit {
  id: string;
  name: string;
  category: 'Transaction' | 'Card' | 'FX' | 'Trade';
  limitAmount: number;
  currentUsage: number;
  currency: string;
  period: 'Daily' | 'Monthly' | 'Per Transaction';
  status: 'Active' | 'Pending Review' | 'Locked';
  lastUpdated: string;
}

interface CompanyLimitsProfile {
  id: string;
  name: string;
  industry: string;
  riskRating: 'Low' | 'Medium' | 'High';
  limits: Limit[];
}

export const CorporateRegulatedLimitsPage: React.FC = () => {
  // Mock Data
  const companies: CompanyLimitsProfile[] = [
    {
      id: '1',
      name: 'TechNova Solutions Ltd.',
      industry: 'Technology',
      riskRating: 'Low',
      limits: [
        { id: 'L1', name: 'Daily Wire Transfer', category: 'Transaction', limitAmount: 500000, currentUsage: 125000, currency: 'USD', period: 'Daily', status: 'Active', lastUpdated: 'Oct 01, 2024' },
        { id: 'L2', name: 'Monthly ACH Volume', category: 'Transaction', limitAmount: 2000000, currentUsage: 1850000, currency: 'USD', period: 'Monthly', status: 'Active', lastUpdated: 'Sep 15, 2024' },
        { id: 'L3', name: 'Corporate Card Spend', category: 'Card', limitAmount: 100000, currentUsage: 45200, currency: 'USD', period: 'Monthly', status: 'Active', lastUpdated: 'Oct 20, 2024' },
        { id: 'L4', name: 'FX Spot Limit', category: 'FX', limitAmount: 250000, currentUsage: 0, currency: 'USD', period: 'Per Transaction', status: 'Active', lastUpdated: 'Aug 10, 2024' },
      ]
    },
    {
      id: '2',
      name: 'GreenLeaf Logistics',
      industry: 'Logistics',
      riskRating: 'Medium',
      limits: [
        { id: 'L5', name: 'Daily Wire Transfer', category: 'Transaction', limitAmount: 150000, currentUsage: 142000, currency: 'USD', period: 'Daily', status: 'Active', lastUpdated: 'Oct 22, 2024' },
        { id: 'L6', name: 'Fuel Card Fleet', category: 'Card', limitAmount: 50000, currentUsage: 38000, currency: 'USD', period: 'Monthly', status: 'Active', lastUpdated: 'Oct 05, 2024' },
        { id: 'L7', name: 'Trade Finance Line', category: 'Trade', limitAmount: 500000, currentUsage: 200000, currency: 'USD', period: 'Monthly', status: 'Pending Review', lastUpdated: 'Oct 24, 2024' }
      ]
    },
    {
      id: '3',
      name: 'Quantum Dynamics',
      industry: 'Manufacturing',
      riskRating: 'High',
      limits: [
         { id: 'L8', name: 'Daily Wire Transfer', category: 'Transaction', limitAmount: 1000000, currentUsage: 150000, currency: 'EUR', period: 'Daily', status: 'Active', lastUpdated: 'Sep 30, 2024' },
         { id: 'L9', name: 'Hedging Limit', category: 'FX', limitAmount: 2000000, currentUsage: 1950000, currency: 'EUR', period: 'Monthly', status: 'Locked', lastUpdated: 'Oct 23, 2024' }
      ]
    }
  ];

  const [selectedCompany, setSelectedCompany] = useState<CompanyLimitsProfile>(companies[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filterCategory, setFilterCategory] = useState("All");

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCompany = (company: CompanyLimitsProfile) => {
    setSelectedCompany(company);
    setSearchTerm("");
    setShowDropdown(false);
  };

  const getUtilizationColor = (percentage: number) => {
      if (percentage >= 90) return 'bg-red-500';
      if (percentage >= 75) return 'bg-amber-500';
      return 'bg-emerald-500';
  };

  const getCategoryIcon = (category: string) => {
      switch(category) {
          case 'Transaction': return <DollarSign size={18} />;
          case 'Card': return <CreditCard size={18} />;
          case 'FX': return <RefreshCw size={18} />;
          case 'Trade': return <TrendingUp size={18} />;
          default: return <Shield size={18} />;
      }
  };

  const formatCurrency = (val: number, currency: string) => {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency, maximumFractionDigits: 0 }).format(val);
  };

  const filteredLimits = selectedCompany.limits.filter(l => filterCategory === "All" || l.category === filterCategory);

  // Chart Data Preparation
  const chartData = selectedCompany.limits.map(l => ({
      name: l.name.split(' ').slice(0, 2).join(' '), // Short name
      usage: (l.currentUsage / l.limitAmount) * 100,
      color: getUtilizationColor((l.currentUsage / l.limitAmount) * 100).replace('bg-', '')
  }));

  // Map tailwind class names to hex colors for Recharts
  const getColorHex = (className: string) => {
      if (className.includes('red')) return '#ef4444';
      if (className.includes('amber')) return '#f59e0b';
      return '#10b981';
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-2 space-y-6">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sliders className="text-indigo-500" /> Regulated Limits
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
             Monitor and configure operational financial boundaries and exposure caps.
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto relative z-20">
            <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search company limits..." 
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
                                        {selectedCompany.id === comp.id && <CheckCircle2 size={16} className="text-indigo-600 dark:text-indigo-400" />}
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

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
          
          {/* Left Column: Overview & Stats */}
          <div className="space-y-6">
              
              {/* Company Summary Card */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                      <Shield size={120} />
                  </div>
                  <div className="relative z-10">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{selectedCompany.name}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{selectedCompany.industry}</p>
                      
                      <div className="flex items-center gap-2 mb-6">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${
                              selectedCompany.riskRating === 'Low' ? 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800' :
                              selectedCompany.riskRating === 'Medium' ? 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800' :
                              'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800'
                          }`}>
                              {selectedCompany.riskRating} Risk Profile
                          </span>
                      </div>

                      <div className="space-y-4">
                          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700">
                              <p className="text-xs text-slate-500 uppercase font-bold tracking-wide mb-1">Total Exposure</p>
                              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                  {formatCurrency(selectedCompany.limits.reduce((acc, l) => acc + l.limitAmount, 0), selectedCompany.limits[0]?.currency || 'USD')}
                              </p>
                          </div>
                      </div>
                  </div>
              </div>

              {/* Utilization Chart */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm h-72 flex flex-col">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-sm flex items-center gap-2">
                      <TrendingUp size={16} className="text-indigo-500" /> Limit Utilization
                  </h3>
                  <div className="flex-1 w-full min-h-0">
                      <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                              <XAxis type="number" hide domain={[0, 100]} />
                              <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} width={80} />
                              <Tooltip 
                                  cursor={{fill: 'transparent'}}
                                  contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                  formatter={(value: number) => `${value.toFixed(1)}%`}
                              />
                              <Bar dataKey="usage" radius={[0, 4, 4, 0]} barSize={16}>
                                  {chartData.map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={getColorHex(entry.color)} />
                                  ))}
                              </Bar>
                          </BarChart>
                      </ResponsiveContainer>
                  </div>
              </div>
          </div>

          {/* Right Column: Limits List */}
          <div className="lg:col-span-2 flex flex-col gap-6">
              
              {/* Filters */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {['All', 'Transaction', 'Card', 'FX', 'Trade'].map(cat => (
                      <button
                          key={cat}
                          onClick={() => setFilterCategory(cat)}
                          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap border ${
                              filterCategory === cat 
                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' 
                              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                          }`}
                      >
                          {cat}
                      </button>
                  ))}
              </div>

              {/* Limits Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto pr-2" style={{ maxHeight: 'calc(100vh - 250px)' }}>
                  {filteredLimits.map((limit) => {
                      const percentage = (limit.currentUsage / limit.limitAmount) * 100;
                      const colorClass = getUtilizationColor(percentage);

                      return (
                          <div key={limit.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
                              {limit.status === 'Locked' && (
                                  <div className="absolute top-0 right-0 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-3 py-1 rounded-bl-xl text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 border-b border-l border-red-200 dark:border-red-800">
                                      <Lock size={10} /> Locked
                                  </div>
                              )}
                              {limit.status === 'Pending Review' && (
                                  <div className="absolute top-0 right-0 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 px-3 py-1 rounded-bl-xl text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 border-b border-l border-amber-200 dark:border-amber-800">
                                      <AlertTriangle size={10} /> In Review
                                  </div>
                              )}

                              <div className="flex justify-between items-start mb-4 mt-2">
                                  <div className="flex items-center gap-3">
                                      <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-300">
                                          {getCategoryIcon(limit.category)}
                                      </div>
                                      <div>
                                          <h4 className="font-bold text-slate-900 dark:text-white text-sm">{limit.name}</h4>
                                          <p className="text-xs text-slate-500">{limit.period} Limit</p>
                                      </div>
                                  </div>
                              </div>

                              <div className="space-y-2 mb-4">
                                  <div className="flex justify-between text-xs font-medium">
                                      <span className="text-slate-500 dark:text-slate-400">Used: {formatCurrency(limit.currentUsage, limit.currency)}</span>
                                      <span className="text-slate-900 dark:text-white">{percentage.toFixed(1)}%</span>
                                  </div>
                                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                                      <div 
                                          className={`h-full rounded-full transition-all duration-1000 ${colorClass}`} 
                                          style={{ width: `${Math.min(percentage, 100)}%` }}
                                      ></div>
                                  </div>
                                  <div className="flex justify-between text-xs">
                                      <span className="text-slate-400">0</span>
                                      <span className="font-bold text-slate-700 dark:text-slate-300">{formatCurrency(limit.limitAmount, limit.currency)}</span>
                                  </div>
                              </div>

                              <div className="flex gap-2 pt-4 border-t border-slate-100 dark:border-slate-700">
                                  <button 
                                    disabled={limit.status === 'Locked'}
                                    className="flex-1 py-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-lg text-xs font-bold hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
                                  >
                                      <Edit2 size={12} /> Edit Limit
                                  </button>
                                  <button className="flex-1 py-2 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5">
                                      History <ArrowRight size={12} />
                                  </button>
                              </div>
                          </div>
                      );
                  })}
              </div>

          </div>
      </div>
    </div>
  );
};
