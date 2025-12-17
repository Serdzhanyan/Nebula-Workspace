
import React, { useState } from 'react';
import { Search, Filter, ShieldAlert, AlertTriangle, CheckCircle, TrendingUp, AlertOctagon, MoreHorizontal, ChevronDown, Download, Eye, FileText, Activity, Globe, Scale } from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip, AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';

interface RiskFactor {
  category: string;
  score: number; // 0-100, higher is riskier
  status: 'Low' | 'Medium' | 'High' | 'Critical';
}

interface RiskAlert {
  id: string;
  type: string;
  date: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  description: string;
}

interface RiskProfile {
  id: string;
  name: string;
  industry: string;
  overallScore: number; // 0-100, higher is safer/better
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  lastAssessment: string;
  nextReview: string;
  factors: RiskFactor[];
  alerts: RiskAlert[];
  trendData: { month: string; score: number }[];
}

export const CorporateRiskAssessmentsPage: React.FC = () => {
  // Mock Data
  const companies: RiskProfile[] = [
    {
      id: '1',
      name: 'TechNova Solutions Ltd.',
      industry: 'Technology',
      overallScore: 88,
      riskLevel: 'Low',
      lastAssessment: 'Oct 10, 2024',
      nextReview: 'Oct 10, 2025',
      factors: [
        { category: 'Financial', score: 15, status: 'Low' },
        { category: 'Operational', score: 20, status: 'Low' },
        { category: 'Legal', score: 10, status: 'Low' },
        { category: 'Reputational', score: 5, status: 'Low' },
        { category: 'Strategic', score: 25, status: 'Medium' },
      ],
      alerts: [],
      trendData: [
        { month: 'May', score: 85 }, { month: 'Jun', score: 86 }, { month: 'Jul', score: 84 },
        { month: 'Aug', score: 88 }, { month: 'Sep', score: 87 }, { month: 'Oct', score: 88 }
      ]
    },
    {
      id: '2',
      name: 'GreenLeaf Logistics',
      industry: 'Logistics',
      overallScore: 62,
      riskLevel: 'Medium',
      lastAssessment: 'Sep 15, 2024',
      nextReview: 'Mar 15, 2025',
      factors: [
        { category: 'Financial', score: 45, status: 'Medium' },
        { category: 'Operational', score: 60, status: 'High' },
        { category: 'Legal', score: 30, status: 'Low' },
        { category: 'Reputational', score: 20, status: 'Low' },
        { category: 'Strategic', score: 40, status: 'Medium' },
      ],
      alerts: [
        { id: 'A1', type: 'Credit Limit', date: '2 days ago', severity: 'Medium', description: 'Utilization exceeded 85% of approved limit.' },
        { id: 'A2', type: 'Late Filing', date: '1 week ago', severity: 'Low', description: 'Delayed submission of quarterly tax documents.' }
      ],
      trendData: [
        { month: 'May', score: 75 }, { month: 'Jun', score: 72 }, { month: 'Jul', score: 68 },
        { month: 'Aug', score: 65 }, { month: 'Sep', score: 64 }, { month: 'Oct', score: 62 }
      ]
    },
    {
      id: '3',
      name: 'Quantum Dynamics',
      industry: 'Manufacturing',
      overallScore: 35,
      riskLevel: 'Critical',
      lastAssessment: 'Oct 24, 2024',
      nextReview: 'Nov 24, 2024',
      factors: [
        { category: 'Financial', score: 85, status: 'Critical' },
        { category: 'Operational', score: 50, status: 'Medium' },
        { category: 'Legal', score: 70, status: 'High' },
        { category: 'Reputational', score: 40, status: 'Medium' },
        { category: 'Strategic', score: 60, status: 'High' },
      ],
      alerts: [
        { id: 'A3', type: 'Sanctions Match', date: 'Today', severity: 'Critical', description: 'Potential match found on OFAC sanctions list.' },
        { id: 'A4', type: 'Liquidity Crisis', date: '3 days ago', severity: 'High', description: 'Current ratio dropped below covenant requirements.' }
      ],
      trendData: [
        { month: 'May', score: 60 }, { month: 'Jun', score: 55 }, { month: 'Jul', score: 45 },
        { month: 'Aug', score: 40 }, { month: 'Sep', score: 38 }, { month: 'Oct', score: 35 }
      ]
    }
  ];

  const [selectedCompany, setSelectedCompany] = useState<RiskProfile>(companies[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [riskFilter, setRiskFilter] = useState("All");

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCompany = (company: RiskProfile) => {
    setSelectedCompany(company);
    setSearchTerm("");
    setShowDropdown(false);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Low': return 'text-emerald-600 bg-emerald-50 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800';
      case 'Medium': return 'text-amber-600 bg-amber-50 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800';
      case 'High': return 'text-orange-600 bg-orange-50 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800';
      case 'Critical': return 'text-red-600 bg-red-50 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#10b981'; // Emerald
    if (score >= 60) return '#f59e0b'; // Amber
    if (score >= 40) return '#f97316'; // Orange
    return '#ef4444'; // Red
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-2 space-y-6">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldAlert className="text-indigo-500" /> End-to-End Risk Assessment
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
             Holistic risk monitoring across financial, operational, and compliance vectors.
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search company risk profile..." 
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
                                        {selectedCompany.id === comp.id && <CheckCircle size={16} className="text-indigo-600 dark:text-indigo-400" />}
                                    </button>
                                ))
                            ) : (
                                <div className="p-4 text-center text-slate-500 text-sm">No companies found</div>
                            )}
                        </div>
                    </>
                )}
            </div>
            
            <div className="relative">
                <select 
                    value={riskFilter}
                    onChange={(e) => setRiskFilter(e.target.value)}
                    className="appearance-none pl-4 pr-10 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-sm"
                >
                    <option value="All">All Risks</option>
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
                <Filter size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Metrics & Profile */}
          <div className="space-y-6">
              {/* Score Card */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm relative overflow-hidden">
                  <div className="flex justify-between items-start mb-4 relative z-10">
                      <div>
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white">{selectedCompany.name}</h3>
                          <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold uppercase border ${getRiskColor(selectedCompany.riskLevel)}`}>
                              {selectedCompany.riskLevel} Risk
                          </span>
                      </div>
                      <div className="text-right">
                          <p className="text-xs text-slate-500 uppercase font-bold tracking-wide">Safety Score</p>
                          <p className="text-4xl font-bold" style={{ color: getScoreColor(selectedCompany.overallScore) }}>
                              {selectedCompany.overallScore}
                          </p>
                      </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-6 relative z-10">
                       <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50">
                           <p className="text-xs text-slate-500 dark:text-slate-400">Last Assessment</p>
                           <p className="font-semibold text-slate-900 dark:text-white mt-1">{selectedCompany.lastAssessment}</p>
                       </div>
                       <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50">
                           <p className="text-xs text-slate-500 dark:text-slate-400">Next Review</p>
                           <p className="font-semibold text-slate-900 dark:text-white mt-1">{selectedCompany.nextReview}</p>
                       </div>
                  </div>

                  {/* Decorative Background Chart */}
                   <div className="absolute -bottom-6 -right-6 opacity-5 pointer-events-none">
                      <Activity size={180} />
                   </div>
              </div>

              {/* Trend Chart */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm h-64 flex flex-col">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-sm flex items-center gap-2">
                      <TrendingUp size={16} className="text-indigo-500" /> 6-Month Score Trend
                  </h3>
                  <div className="flex-1 w-full min-h-0">
                      <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={selectedCompany.trendData}>
                              <defs>
                                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                  </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} domain={[0, 100]} />
                              <Tooltip 
                                  contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                  itemStyle={{ color: '#1e293b' }}
                              />
                              <Area type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                          </AreaChart>
                      </ResponsiveContainer>
                  </div>
              </div>

              {/* Actions */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-sm">Risk Actions</h3>
                  <div className="space-y-3">
                      <button className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Generate Audit Report</span>
                          <Download size={16} className="text-slate-400 group-hover:text-indigo-500" />
                      </button>
                      <button className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Schedule Deep Dive</span>
                          <Activity size={16} className="text-slate-400 group-hover:text-indigo-500" />
                      </button>
                      <button className="w-full flex items-center justify-between p-3 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors group">
                          <span className="text-sm font-bold text-red-600 dark:text-red-400">Escalate for Review</span>
                          <AlertOctagon size={16} className="text-red-500" />
                      </button>
                  </div>
              </div>
          </div>

          {/* Right Column: Detailed Breakdown */}
          <div className="lg:col-span-2 space-y-6">
              
              {/* Radar Chart & Categories */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col md:flex-row gap-8">
                  <div className="flex-1 min-h-[300px]">
                      <h3 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                          <Scale size={18} className="text-blue-500" /> Risk Exposure Profile
                      </h3>
                      <p className="text-xs text-slate-500 mb-4">Risk intensity by category (Outward is higher risk)</p>
                      <ResponsiveContainer width="100%" height="100%">
                          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={selectedCompany.factors}>
                              <PolarGrid stroke="#e2e8f0" />
                              <PolarAngleAxis dataKey="category" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                              <Radar
                                  name="Risk Score"
                                  dataKey="score"
                                  stroke="#f59e0b"
                                  strokeWidth={2}
                                  fill="#f59e0b"
                                  fillOpacity={0.4}
                              />
                              <Tooltip 
                                  contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                  itemStyle={{ color: '#1e293b' }}
                              />
                          </RadarChart>
                      </ResponsiveContainer>
                  </div>

                  <div className="flex-1">
                      <h3 className="font-bold text-slate-900 dark:text-white mb-4">Risk Factors Breakdown</h3>
                      <div className="space-y-4">
                          {selectedCompany.factors.map((factor, idx) => (
                              <div key={idx} className="space-y-1">
                                  <div className="flex justify-between items-center text-sm">
                                      <span className="font-medium text-slate-700 dark:text-slate-300">{factor.category}</span>
                                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                                          factor.status === 'Critical' ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400' :
                                          factor.status === 'High' ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400' :
                                          factor.status === 'Medium' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400' :
                                          'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400'
                                      }`}>{factor.status} ({factor.score})</span>
                                  </div>
                                  <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                                      <div 
                                          className={`h-full rounded-full ${
                                              factor.score > 75 ? 'bg-red-500' : 
                                              factor.score > 50 ? 'bg-orange-500' : 
                                              factor.score > 25 ? 'bg-amber-500' : 'bg-emerald-500'
                                          }`} 
                                          style={{ width: `${factor.score}%` }}
                                      ></div>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
              </div>

              {/* Active Alerts */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                  <div className="flex justify-between items-center mb-6">
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                          <AlertTriangle size={20} className="text-red-500" /> Active Risk Alerts
                      </h3>
                      <span className="text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-1 rounded-full">
                          {selectedCompany.alerts.length} Pending
                      </span>
                  </div>

                  {selectedCompany.alerts.length > 0 ? (
                      <div className="space-y-3">
                          {selectedCompany.alerts.map((alert) => (
                              <div key={alert.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors shadow-sm bg-white dark:bg-slate-900">
                                  <div className="flex justify-between items-start mb-2">
                                      <div className="flex items-center gap-2">
                                          <AlertOctagon size={16} className={`
                                              ${alert.severity === 'Critical' ? 'text-red-600' : 
                                                alert.severity === 'High' ? 'text-orange-500' : 
                                                alert.severity === 'Medium' ? 'text-amber-500' : 'text-blue-500'}
                                          `} />
                                          <span className="font-bold text-slate-900 dark:text-white text-sm">{alert.type}</span>
                                      </div>
                                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase border ${
                                          alert.severity === 'Critical' ? 'bg-red-50 text-red-600 border-red-100 dark:bg-red-900/20 dark:text-red-400' :
                                          alert.severity === 'High' ? 'bg-orange-50 text-orange-600 border-orange-100 dark:bg-orange-900/20 dark:text-orange-400' :
                                          alert.severity === 'Medium' ? 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400' :
                                          'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400'
                                      }`}>
                                          {alert.severity}
                                      </span>
                                  </div>
                                  <p className="text-sm text-slate-600 dark:text-slate-300 pl-6 mb-3">{alert.description}</p>
                                  <div className="flex justify-between items-center pl-6 pt-2 border-t border-slate-100 dark:border-slate-800">
                                      <span className="text-xs text-slate-400">{alert.date}</span>
                                      <div className="flex gap-2">
                                          <button className="text-xs font-bold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors">Dismiss</button>
                                          <button className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
                                              <Eye size={12} /> Investigate
                                          </button>
                                      </div>
                                  </div>
                              </div>
                          ))}
                      </div>
                  ) : (
                      <div className="text-center py-12 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-xl">
                          <CheckCircle size={32} className="mx-auto mb-2 opacity-50 text-emerald-500" />
                          <p className="text-slate-500 dark:text-slate-400 font-medium">No active risk alerts.</p>
                      </div>
                  )}
              </div>

              {/* Geo & Sector Info */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                   <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                      <Globe size={20} className="text-cyan-500" /> Contextual Risk Data
                   </h3>
                   <div className="grid grid-cols-2 gap-4">
                       <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700">
                           <p className="text-xs text-slate-500 uppercase font-bold mb-1">Geo Risk</p>
                           <p className="text-sm font-medium text-slate-900 dark:text-white">North America (Low)</p>
                       </div>
                       <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700">
                           <p className="text-xs text-slate-500 uppercase font-bold mb-1">Industry Sector</p>
                           <p className="text-sm font-medium text-slate-900 dark:text-white">{selectedCompany.industry} (Med)</p>
                       </div>
                       <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700">
                           <p className="text-xs text-slate-500 uppercase font-bold mb-1">Politically Exposed</p>
                           <p className="text-sm font-medium text-slate-900 dark:text-white">None Detected</p>
                       </div>
                       <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700">
                           <p className="text-xs text-slate-500 uppercase font-bold mb-1">Adverse Media</p>
                           <p className="text-sm font-medium text-slate-900 dark:text-white">0 Matches</p>
                       </div>
                   </div>
              </div>

          </div>
      </div>
    </div>
  );
};
