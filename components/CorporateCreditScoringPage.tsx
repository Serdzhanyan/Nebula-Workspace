import React, { useState } from 'react';
import { Search, Filter, Download, CreditCard, TrendingUp, AlertTriangle, ShieldCheck, Activity, ChevronDown, Check, ArrowUpRight, ArrowDownRight, History as HistoryIcon, FileText, Info } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Cell, RadialBarChart, RadialBar, Legend, PolarAngleAxis } from 'recharts';

interface CreditScoreHistory {
  month: string;
  score: number;
}

interface RiskFactor {
  category: string;
  score: number; // 0-100 (High is good/safe)
  impact: 'High' | 'Medium' | 'Low';
  status: 'Stable' | 'Improving' | 'Declining';
}

interface CreditProfile {
  id: string;
  name: string;
  industry: string;
  creditScore: number;
  creditRating: string; // AAA, AA, A, BBB, etc.
  creditLimit: number;
  utilizedLimit: number;
  paymentTerms: string;
  lastReviewDate: string;
  nextReviewDate: string;
  history: CreditScoreHistory[];
  riskFactors: RiskFactor[];
}

export const CorporateCreditScoringPage: React.FC = () => {
  // Mock Data
  const companies: CreditProfile[] = [
    {
      id: '1',
      name: 'TechNova Solutions Ltd.',
      industry: 'Technology',
      creditScore: 780,
      creditRating: 'AA',
      creditLimit: 500000,
      utilizedLimit: 125000,
      paymentTerms: 'Net 30',
      lastReviewDate: 'Oct 15, 2024',
      nextReviewDate: 'Apr 15, 2025',
      history: [
        { month: 'May', score: 750 }, { month: 'Jun', score: 755 }, { month: 'Jul', score: 760 },
        { month: 'Aug', score: 765 }, { month: 'Sep', score: 775 }, { month: 'Oct', score: 780 }
      ],
      riskFactors: [
        { category: 'Payment History', score: 95, impact: 'High', status: 'Stable' },
        { category: 'Market Stability', score: 80, impact: 'Medium', status: 'Improving' },
        { category: 'Financial Health', score: 85, impact: 'High', status: 'Stable' },
        { category: 'Debt Ratio', score: 70, impact: 'Medium', status: 'Declining' }
      ]
    },
    {
      id: '2',
      name: 'GreenLeaf Logistics',
      industry: 'Logistics',
      creditScore: 650,
      creditRating: 'BBB',
      creditLimit: 150000,
      utilizedLimit: 140000,
      paymentTerms: 'Net 15',
      lastReviewDate: 'Sep 20, 2024',
      nextReviewDate: 'Dec 20, 2024',
      history: [
        { month: 'May', score: 680 }, { month: 'Jun', score: 670 }, { month: 'Jul', score: 660 },
        { month: 'Aug', score: 655 }, { month: 'Sep', score: 650 }, { month: 'Oct', score: 650 }
      ],
      riskFactors: [
        { category: 'Payment History', score: 60, impact: 'High', status: 'Declining' },
        { category: 'Market Stability', score: 50, impact: 'High', status: 'Stable' },
        { category: 'Financial Health', score: 70, impact: 'Medium', status: 'Stable' },
        { category: 'Debt Ratio', score: 40, impact: 'High', status: 'Declining' }
      ]
    },
    {
      id: '3',
      name: 'Quantum Dynamics',
      industry: 'Manufacturing',
      creditScore: 820,
      creditRating: 'AAA',
      creditLimit: 1000000,
      utilizedLimit: 250000,
      paymentTerms: 'Net 60',
      lastReviewDate: 'Aug 10, 2024',
      nextReviewDate: 'Aug 10, 2025',
      history: [
        { month: 'May', score: 800 }, { month: 'Jun', score: 805 }, { month: 'Jul', score: 810 },
        { month: 'Aug', score: 815 }, { month: 'Sep', score: 818 }, { month: 'Oct', score: 820 }
      ],
      riskFactors: [
        { category: 'Payment History', score: 98, impact: 'High', status: 'Stable' },
        { category: 'Market Stability', score: 90, impact: 'Medium', status: 'Improving' },
        { category: 'Financial Health', score: 92, impact: 'High', status: 'Stable' },
        { category: 'Debt Ratio', score: 85, impact: 'Medium', status: 'Stable' }
      ]
    }
  ];

  const [selectedCompany, setSelectedCompany] = useState<CreditProfile>(companies[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCompany = (company: CreditProfile) => {
    setSelectedCompany(company);
    setSearchTerm("");
    setShowDropdown(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 800) return '#10b981'; // Emerald
    if (score >= 700) return '#3b82f6'; // Blue
    if (score >= 600) return '#f59e0b'; // Amber
    return '#ef4444'; // Red
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  // Radial Chart Data
  const gaugeData = [
    { name: 'Score', value: selectedCompany.creditScore, fill: getScoreColor(selectedCompany.creditScore) },
  ];

  const utilizationPercentage = (selectedCompany.utilizedLimit / selectedCompany.creditLimit) * 100;

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-2 space-y-6">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Activity className="text-indigo-500" /> Corporate Credit Scoring
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
             Real-time credit monitoring, limit management, and risk analysis.
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto relative z-20">
            <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search company credit profile..." 
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
                                        {selectedCompany.id === comp.id && <Check className="text-indigo-600 dark:text-indigo-400" size={16} />}
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

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
          
          {/* Left Column: Score & Limits */}
          <div className="space-y-6">
              
              {/* Credit Score Card */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center relative overflow-hidden">
                  <div className="w-full flex justify-between items-start mb-4 z-10">
                      <div>
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white">{selectedCompany.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded font-medium">{selectedCompany.industry}</span>
                              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-2 py-0.5 rounded">Rating: {selectedCompany.creditRating}</span>
                          </div>
                      </div>
                  </div>

                  <div className="relative w-48 h-48 flex items-center justify-center mb-4">
                       <ResponsiveContainer width="100%" height="100%">
                          <RadialBarChart 
                              innerRadius="80%" 
                              outerRadius="100%" 
                              barSize={10} 
                              data={gaugeData} 
                              startAngle={180} 
                              endAngle={0}
                          >
                              <PolarAngleAxis type="number" domain={[0, 900]} angleAxisId={0} tick={false} />
                              <RadialBar background dataKey="value" cornerRadius={10} />
                          </RadialBarChart>
                       </ResponsiveContainer>
                       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/4 text-center">
                           <span className="text-5xl font-bold text-slate-900 dark:text-white block">{selectedCompany.creditScore}</span>
                           <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Credit Score</span>
                       </div>
                  </div>
                  
                  <div className="w-full grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-700 z-10">
                      <div className="text-center">
                          <p className="text-xs text-slate-500 mb-1">Last Review</p>
                          <p className="font-semibold text-slate-900 dark:text-white text-sm">{selectedCompany.lastReviewDate}</p>
                      </div>
                      <div className="text-center border-l border-slate-100 dark:border-slate-700">
                           <p className="text-xs text-slate-500 mb-1">Next Review</p>
                          <p className="font-semibold text-slate-900 dark:text-white text-sm">{selectedCompany.nextReviewDate}</p>
                      </div>
                  </div>
              </div>

              {/* Credit Utilization */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                      <CreditCard size={18} className="text-blue-500" /> Credit Utilization
                  </h3>
                  
                  <div className="space-y-6">
                      <div>
                          <div className="flex justify-between items-end mb-2">
                              <span className="text-sm text-slate-600 dark:text-slate-300">Current Usage</span>
                              <span className="text-lg font-bold text-slate-900 dark:text-white">{formatCurrency(selectedCompany.utilizedLimit)}</span>
                          </div>
                          <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full transition-all duration-1000 ${utilizationPercentage > 80 ? 'bg-red-500' : utilizationPercentage > 50 ? 'bg-amber-500' : 'bg-emerald-500'}`} 
                                style={{ width: `${utilizationPercentage}%` }}
                              ></div>
                          </div>
                          <div className="flex justify-between mt-2 text-xs text-slate-500">
                              <span>0%</span>
                              <span>Limit: {formatCurrency(selectedCompany.creditLimit)}</span>
                          </div>
                      </div>

                      <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 flex justify-between items-center">
                          <div>
                              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Payment Terms</p>
                              <p className="text-lg font-bold text-slate-900 dark:text-white mt-1">{selectedCompany.paymentTerms}</p>
                          </div>
                          <button className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                              Request Change
                          </button>
                      </div>

                      <div className="flex gap-3">
                          <button className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200/50 dark:shadow-none">
                              Increase Limit
                          </button>
                          <button className="flex-1 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                              View History
                          </button>
                      </div>
                  </div>
              </div>
          </div>

          {/* Center/Right Column: Trends & Factors */}
          <div className="lg:col-span-2 space-y-6">
              
              {/* Score Trend Chart */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-[350px]">
                  <div className="flex justify-between items-center mb-6">
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                          <TrendingUp size={20} className="text-emerald-500" /> 6-Month Score Trend
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                          <span className="flex items-center gap-1"><ArrowUpRight size={14} className="text-emerald-500" /> Improving</span>
                      </div>
                  </div>
                  <div className="flex-1 w-full min-h-0">
                      <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={selectedCompany.history} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                              <defs>
                                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="5%" stopColor={getScoreColor(selectedCompany.creditScore)} stopOpacity={0.3}/>
                                      <stop offset="95%" stopColor={getScoreColor(selectedCompany.creditScore)} stopOpacity={0}/>
                                  </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                              <YAxis domain={[300, 900]} axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                              <Tooltip 
                                  contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                  itemStyle={{ color: '#1e293b' }}
                              />
                              <Area 
                                type="monotone" 
                                dataKey="score" 
                                stroke={getScoreColor(selectedCompany.creditScore)} 
                                strokeWidth={3} 
                                fillOpacity={1} 
                                fill="url(#colorScore)" 
                              />
                          </AreaChart>
                      </ResponsiveContainer>
                  </div>
              </div>

              {/* Risk Factors */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="flex justify-between items-center mb-6">
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                          <ShieldCheck size={20} className="text-purple-500" /> Risk Factors Analysis
                      </h3>
                      <button className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">View Full Report</button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedCompany.riskFactors.map((factor, idx) => (
                          <div key={idx} className="p-4 border border-slate-100 dark:border-slate-700/50 rounded-xl bg-slate-50 dark:bg-slate-800/30 hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors">
                              <div className="flex justify-between items-start mb-3">
                                  <span className="font-bold text-sm text-slate-800 dark:text-slate-200">{factor.category}</span>
                                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase border ${
                                      factor.status === 'Improving' ? 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-900' :
                                      factor.status === 'Declining' ? 'bg-red-50 text-red-600 border-red-100 dark:bg-red-900/20 dark:border-red-900' :
                                      'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
                                  }`}>
                                      {factor.status}
                                  </span>
                              </div>
                              <div className="flex items-center gap-3">
                                  <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                      <div 
                                          className={`h-full rounded-full ${
                                              factor.score >= 80 ? 'bg-emerald-500' : 
                                              factor.score >= 60 ? 'bg-blue-500' : 
                                              factor.score >= 40 ? 'bg-amber-500' : 'bg-red-500'
                                          }`} 
                                          style={{ width: `${factor.score}%` }}
                                      ></div>
                                  </div>
                                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 w-8 text-right">{factor.score}</span>
                              </div>
                              <p className="text-[10px] text-slate-500 mt-2">Impact: <span className="font-semibold">{factor.impact}</span></p>
                          </div>
                      ))}
                  </div>
              </div>

              {/* External Data Sources */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4">External Bureau Data</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl flex flex-col items-center text-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">Experian</span>
                          <span className="text-2xl font-bold text-slate-900 dark:text-white">Low Risk</span>
                          <span className="text-[10px] text-emerald-500 font-medium mt-1">Updated 2d ago</span>
                      </div>
                      <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl flex flex-col items-center text-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">Equifax</span>
                          <span className="text-2xl font-bold text-slate-900 dark:text-white">A+</span>
                          <span className="text-[10px] text-emerald-500 font-medium mt-1">Updated 5d ago</span>
                      </div>
                      <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl flex flex-col items-center text-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">Dun & Bradstreet</span>
                          <span className="text-2xl font-bold text-slate-900 dark:text-white">85</span>
                          <span className="text-[10px] text-slate-500 font-medium mt-1">Paydex Score</span>
                      </div>
                  </div>
              </div>

          </div>
      </div>
    </div>
  );
};
