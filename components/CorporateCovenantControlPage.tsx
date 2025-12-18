
import React, { useState } from 'react';
import { Search, Filter, Download, Shield, Scale, AlertTriangle, CheckCircle2, TrendingUp, DollarSign, Activity, ChevronRight, MoreHorizontal, X, FileText, Plus, ChevronDown, Check, ArrowRight, BarChart3, Clock, Lock, XCircle } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface Covenant {
  id: string;
  name: string;
  category: 'Financial' | 'Reporting' | 'Operational';
  threshold: string;
  actual: string;
  headroom: string;
  status: 'Pass' | 'Warning' | 'Fail';
  nextTestDate: string;
  description: string;
}

interface CompanyCovenantProfile {
  id: string;
  name: string;
  industry: string;
  totalCovenants: number;
  warnings: number;
  complianceScore: number;
  covenants: Covenant[];
  headroomHistory: { month: string; value: number }[];
}

export const CorporateCovenantControlPage: React.FC = () => {
  // Mock Data
  const companies: CompanyCovenantProfile[] = [
    {
      id: '1',
      name: 'TechNova Solutions Ltd.',
      industry: 'Technology',
      totalCovenants: 8,
      warnings: 1,
      complianceScore: 94,
      covenants: [
        { id: 'COV1', name: 'Debt to Equity Ratio', category: 'Financial', threshold: '< 2.5x', actual: '1.8x', headroom: '28%', status: 'Pass', nextTestDate: 'Dec 31, 2024', description: 'Total liabilities divided by total shareholder equity.' },
        { id: 'COV2', name: 'Interest Coverage', category: 'Financial', threshold: '> 3.0x', actual: '4.2x', headroom: '40%', status: 'Pass', nextTestDate: 'Dec 31, 2024', description: 'EBITDA divided by total interest expense.' },
        { id: 'COV3', name: 'Current Ratio', category: 'Financial', threshold: '> 1.2x', actual: '1.25x', headroom: '4%', status: 'Warning', nextTestDate: 'Nov 15, 2024', description: 'Current assets divided by current liabilities.' },
        { id: 'COV4', name: 'Annual Audit Submission', category: 'Reporting', threshold: '< 120 Days', actual: '95 Days', headroom: '21%', status: 'Pass', nextTestDate: 'Apr 30, 2025', description: 'Submission of audited financials post-FYE.' }
      ],
      headroomHistory: [
        { month: 'May', value: 92 }, { month: 'Jun', value: 90 }, { month: 'Jul', value: 94 },
        { month: 'Aug', value: 93 }, { month: 'Sep', value: 95 }, { month: 'Oct', value: 94 }
      ]
    },
    {
      id: '2',
      name: 'GreenLeaf Logistics',
      industry: 'Logistics',
      totalCovenants: 5,
      warnings: 2,
      complianceScore: 78,
      covenants: [
        { id: 'COV5', name: 'Fixed Charge Coverage', category: 'Financial', threshold: '> 1.5x', actual: '1.45x', headroom: '-3%', status: 'Fail', nextTestDate: 'Immediate', description: 'Measures ability to cover fixed charges like insurance, taxes.' },
        { id: 'COV6', name: 'Asset Coverage', category: 'Financial', threshold: '> 2.0x', actual: '2.1x', headroom: '5%', status: 'Warning', nextTestDate: 'Oct 31, 2024', description: 'Total assets minus intangible assets vs debt.' }
      ],
      headroomHistory: [
        { month: 'May', value: 85 }, { month: 'Jun', value: 82 }, { month: 'Jul', value: 80 },
        { month: 'Aug', value: 75 }, { month: 'Sep', value: 78 }, { month: 'Oct', value: 78 }
      ]
    },
    {
      id: '3',
      name: 'Quantum Dynamics',
      industry: 'Manufacturing',
      totalCovenants: 12,
      warnings: 0,
      complianceScore: 100,
      covenants: [],
      headroomHistory: []
    }
  ];

  const [selectedCompany, setSelectedCompany] = useState<CompanyCovenantProfile>(companies[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCovenant, setSelectedCovenant] = useState<Covenant | null>(companies[0].covenants[0] || null);
  const [filterCategory, setFilterCategory] = useState("All");

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCompany = (company: CompanyCovenantProfile) => {
    setSelectedCompany(company);
    setSearchTerm("");
    setShowDropdown(false);
    setSelectedCovenant(company.covenants.length > 0 ? company.covenants[0] : null);
  };

  const getStatusColor = (status: string) => {
      switch(status) {
          case 'Pass': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
          case 'Warning': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800';
          case 'Fail': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
          default: return 'bg-slate-100 text-slate-700';
      }
  };

  const getStatusIcon = (status: string) => {
      switch(status) {
          case 'Pass': return <CheckCircle2 size={16} className="text-emerald-500" />;
          case 'Warning': return <AlertTriangle size={16} className="text-amber-500" />;
          case 'Fail': return <XCircle size={16} className="text-red-500" />;
          default: return null;
      }
  };

  const filteredCovenants = selectedCompany.covenants.filter(c => filterCategory === "All" || c.category === filterCategory);

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-2 space-y-6 overflow-hidden">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-1">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Shield className="text-indigo-500" /> Covenant Control
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
             Automated monitoring of loan covenants, financial ratios, and reporting obligations.
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto relative z-20">
            <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search company covenants..." 
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
                                            <p className="text-xs text-slate-500">Compliance: {comp.complianceScore}%</p>
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
                <Plus size={18} /> Define Covenant
            </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Compliance Score</p>
                  <h3 className={`text-3xl font-bold ${selectedCompany.complianceScore >= 90 ? 'text-emerald-500' : 'text-amber-500'}`}>{selectedCompany.complianceScore}%</h3>
              </div>
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl">
                  <Shield size={24} />
              </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Active Covenants</p>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{selectedCompany.totalCovenants}</h3>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
                  <Scale size={24} />
              </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Active Warnings</p>
                  <h3 className={`text-3xl font-bold ${selectedCompany.warnings > 0 ? 'text-amber-600' : 'text-emerald-500'}`}>{selectedCompany.warnings}</h3>
              </div>
              <div className="p-3 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-xl">
                  <AlertTriangle size={24} />
              </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Awaiting Test</p>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
                      {selectedCompany.covenants.filter(c => c.status === 'Pending').length || 2}
                  </h3>
              </div>
              <div className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-xl">
                  <Clock size={24} />
              </div>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
          
          {/* Left Column: Covenants List */}
          <div className="lg:col-span-2 flex flex-col gap-4 overflow-y-auto pr-2">
              <div className="flex justify-between items-center mb-2 px-1">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">Covenant Registry</h3>
                  <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl shadow-sm">
                      {['All', 'Financial', 'Reporting', 'Operational'].map(cat => (
                          <button
                            key={cat}
                            onClick={() => setFilterCategory(cat)}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                filterCategory === cat 
                                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-sm' 
                                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                            }`}
                          >
                              {cat}
                          </button>
                      ))}
                  </div>
              </div>

              {filteredCovenants.length > 0 ? filteredCovenants.map(covenant => (
                  <div 
                    key={covenant.id} 
                    onClick={() => setSelectedCovenant(covenant)}
                    className={`bg-white dark:bg-slate-900 p-5 rounded-2xl border transition-all cursor-pointer group hover:shadow-md relative overflow-hidden ${
                        selectedCovenant?.id === covenant.id 
                        ? 'border-indigo-500 ring-1 ring-indigo-500 shadow-md' 
                        : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700'
                    }`}
                  >
                      <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                              <div className={`p-2.5 rounded-xl ${
                                  covenant.status === 'Pass' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30' :
                                  covenant.status === 'Warning' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30' :
                                  'bg-red-100 text-red-600 dark:bg-red-900/30'
                              }`}>
                                  {getStatusIcon(covenant.status)}
                              </div>
                              <div>
                                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">{covenant.name}</h4>
                                  <p className="text-xs text-slate-500 font-mono mt-0.5">{covenant.id} • {covenant.category}</p>
                              </div>
                          </div>
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${getStatusColor(covenant.status)}`}>
                              {covenant.status}
                          </span>
                      </div>

                      <div className="flex justify-between items-end">
                          <div className="text-xs text-slate-500 space-y-1">
                              <p>Threshold: <span className="font-bold text-slate-800 dark:text-slate-200">{covenant.threshold}</span></p>
                              <p>Actual: <span className="font-bold text-slate-800 dark:text-slate-200">{covenant.actual}</span></p>
                          </div>
                          <div className="text-right">
                              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">Headroom</p>
                              <p className={`text-xl font-bold ${covenant.status === 'Pass' ? 'text-emerald-500' : 'text-amber-500'}`}>{covenant.headroom}</p>
                          </div>
                      </div>
                  </div>
              )) : (
                  <div className="text-center py-16 text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                      <Shield size={48} className="mx-auto mb-2 opacity-30" />
                      <p className="font-medium">No covenants found for this category.</p>
                  </div>
              )}
          </div>

          {/* Right Column: Control Panel */}
          <div className="space-y-6">
              {selectedCovenant ? (
                  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col h-full animate-in slide-in-from-right duration-300">
                      <div className="flex justify-between items-start mb-6">
                          <div>
                              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Covenant Detail</h3>
                              <p className="text-xs text-slate-500">Next Testing: {selectedCovenant.nextTestDate}</p>
                          </div>
                          <button onClick={() => setSelectedCovenant(null)} className="md:hidden text-slate-400"><X size={20} /></button>
                      </div>

                      <div className="space-y-6 flex-1">
                          {/* Explanation */}
                          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700">
                              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Definition</p>
                              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">"{selectedCovenant.description}"</p>
                          </div>

                          {/* Historical Compliance */}
                          <div className="h-48 relative bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800 p-4">
                              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Historical Headroom</p>
                              <div className="h-32 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={selectedCompany.headroomHistory}>
                                        <defs>
                                            <linearGradient id="colorHeadroom" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="month" hide />
                                        <YAxis hide domain={[0, 100]} />
                                        <Tooltip 
                                            contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', fontSize: '11px' }}
                                            itemStyle={{ color: '#1e293b' }}
                                        />
                                        <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorHeadroom)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                              </div>
                          </div>

                          {/* Detail Grid */}
                          <div className="grid grid-cols-2 gap-4">
                              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm">
                                  <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Testing Frequency</p>
                                  <p className="font-bold text-slate-900 dark:text-white text-sm">Quarterly</p>
                              </div>
                              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm">
                                  <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Remediation</p>
                                  <p className="font-bold text-slate-900 dark:text-white text-sm">30 Day Cure</p>
                              </div>
                          </div>

                          {/* Action Bar */}
                          <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-700 space-y-3">
                              <div className="grid grid-cols-2 gap-3">
                                  <button className="py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm flex items-center justify-center gap-2">
                                      <Activity size={16} /> Re-Calculate
                                  </button>
                                  <button className="py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                      View Evidence
                                  </button>
                              </div>
                              <button className="w-full py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-sm">
                                  <Download size={16} /> Export Compliance Cert
                              </button>
                              <button className="w-full py-2.5 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-xl text-sm font-bold hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-colors flex items-center justify-center gap-2">
                                  <AlertTriangle size={16} /> Request Waiver
                              </button>
                          </div>
                      </div>
                  </div>
              ) : (
                  <div className="bg-slate-50 dark:bg-slate-900/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 p-8 flex flex-col items-center justify-center text-center h-full text-slate-400">
                      <Lock size={48} className="mb-4 opacity-20" />
                      <p className="font-medium">Select a covenant to review control metrics</p>
                  </div>
              )}
          </div>
      </div>
    </div>
  );
};
