
import React, { useState } from 'react';
import { Search, Filter, Download, Target, TrendingUp, AlertTriangle, CheckCircle2, XCircle, CreditCard, DollarSign, Calendar, ChevronRight, PieChart, BarChart3, ArrowRight } from 'lucide-react';
import { ResponsiveContainer, RadialBarChart, RadialBar, Legend, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

interface Requirement {
  id: string;
  name: string;
  category: 'Card Volume' | 'Wire Count' | 'FX Volume' | 'Balance';
  targetAmount: number;
  currentAmount: number;
  period: 'Monthly' | 'Quarterly' | 'Yearly';
  status: 'Met' | 'At Risk' | 'Missed' | 'On Track';
  deadline: string;
}

interface CompanySpendingProfile {
  id: string;
  name: string;
  industry: string;
  complianceStatus: 'Compliant' | 'At Risk' | 'Non-Compliant';
  nextReviewDate: string;
  requirements: Requirement[];
}

export const CorporateSpendingRequirementsPage: React.FC = () => {
  // Mock Data
  const companies: CompanySpendingProfile[] = [
    {
      id: '1',
      name: 'TechNova Solutions Ltd.',
      industry: 'Technology',
      complianceStatus: 'Compliant',
      nextReviewDate: 'Nov 30, 2024',
      requirements: [
        { id: 'R1', name: 'Min. Corporate Card Spend', category: 'Card Volume', targetAmount: 50000, currentAmount: 62500, period: 'Monthly', status: 'Met', deadline: 'Oct 31' },
        { id: 'R2', name: 'International Wires', category: 'Wire Count', targetAmount: 20, currentAmount: 18, period: 'Monthly', status: 'On Track', deadline: 'Oct 31' },
        { id: 'R3', name: 'FX Trading Volume', category: 'FX Volume', targetAmount: 1000000, currentAmount: 1200000, period: 'Quarterly', status: 'Met', deadline: 'Dec 31' },
      ]
    },
    {
      id: '2',
      name: 'GreenLeaf Logistics',
      industry: 'Logistics',
      complianceStatus: 'At Risk',
      nextReviewDate: 'Oct 31, 2024',
      requirements: [
        { id: 'R4', name: 'Fleet Card Usage', category: 'Card Volume', targetAmount: 25000, currentAmount: 18000, period: 'Monthly', status: 'At Risk', deadline: 'Oct 31' },
        { id: 'R5', name: 'Avg. Daily Balance', category: 'Balance', targetAmount: 100000, currentAmount: 95000, period: 'Monthly', status: 'At Risk', deadline: 'Oct 31' }
      ]
    },
    {
      id: '3',
      name: 'Quantum Dynamics',
      industry: 'Manufacturing',
      complianceStatus: 'Non-Compliant',
      nextReviewDate: 'Nov 15, 2024',
      requirements: [
         { id: 'R6', name: 'Min. FX Volume', category: 'FX Volume', targetAmount: 500000, currentAmount: 120000, period: 'Monthly', status: 'Missed', deadline: 'Sep 30' },
         { id: 'R7', name: 'Operating Account Flow', category: 'Balance', targetAmount: 2000000, currentAmount: 2500000, period: 'Quarterly', status: 'Met', deadline: 'Dec 31' }
      ]
    }
  ];

  const [selectedCompany, setSelectedCompany] = useState<CompanySpendingProfile>(companies[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCompany = (company: CompanySpendingProfile) => {
    setSelectedCompany(company);
    setSearchTerm("");
    setShowDropdown(false);
  };

  const getStatusColor = (status: string) => {
      switch(status) {
          case 'Met': 
          case 'Compliant': return 'text-emerald-600 bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800';
          case 'On Track': return 'text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800';
          case 'At Risk': return 'text-amber-600 bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800';
          case 'Missed': 
          case 'Non-Compliant': return 'text-red-600 bg-red-50 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800';
          default: return 'text-slate-600 bg-slate-50 border-slate-200';
      }
  };

  const getProgressColor = (status: string) => {
      switch(status) {
          case 'Met': return '#10b981';
          case 'On Track': return '#3b82f6';
          case 'At Risk': return '#f59e0b';
          case 'Missed': return '#ef4444';
          default: return '#cbd5e1';
      }
  };

  const formatCurrency = (val: number) => {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  const filteredRequirements = selectedCompany.requirements.filter(r => filterStatus === 'All' || r.status === filterStatus);

  // Prepare Radial Chart Data
  const radialData = selectedCompany.requirements.map(r => ({
      name: r.name,
      uv: Math.min((r.currentAmount / r.targetAmount) * 100, 100),
      fill: getProgressColor(r.status)
  }));

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-2 space-y-6">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Target className="text-indigo-500" /> Spending Requirements
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
             Track contractual spending obligations and volume commitments.
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto relative z-20">
            <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search company..." 
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
          
          {/* Left Column: Overview & Visuals */}
          <div className="space-y-6">
              
              {/* Compliance Score Card */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col items-center relative overflow-hidden">
                  <div className="w-full flex justify-between items-start mb-2 z-10">
                      <div>
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white">{selectedCompany.name}</h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Spending Compliance</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${getStatusColor(selectedCompany.complianceStatus)}`}>
                          {selectedCompany.complianceStatus}
                      </span>
                  </div>

                  <div className="h-64 w-full relative z-10 -ml-4">
                      <ResponsiveContainer width="100%" height="100%">
                          <RadialBarChart 
                              cx="50%" 
                              cy="50%" 
                              innerRadius="30%" 
                              outerRadius="90%" 
                              barSize={15} 
                              data={radialData}
                              startAngle={180} 
                              endAngle={0}
                          >
                              <RadialBar
                                  background
                                  dataKey="uv"
                                  cornerRadius={10}
                                  label={{ position: 'insideStart', fill: '#fff', fontSize: 10, fontWeight: 'bold' }}
                              />
                              <Legend 
                                  iconSize={8} 
                                  layout="vertical" 
                                  verticalAlign="bottom" 
                                  align="center"
                                  wrapperStyle={{ fontSize: '11px', paddingTop: '20px' }}
                              />
                              <Tooltip 
                                  contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                  itemStyle={{ color: '#1e293b' }}
                                  formatter={(value: number) => `${value.toFixed(0)}%`}
                              />
                          </RadialBarChart>
                      </ResponsiveContainer>
                  </div>

                  <div className="w-full pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center text-sm z-10">
                      <span className="text-slate-500">Next Review:</span>
                      <span className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <Calendar size={14} className="text-indigo-500" /> {selectedCompany.nextReviewDate}
                      </span>
                  </div>
              </div>

              {/* Actions */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-sm uppercase tracking-wide">Quick Actions</h3>
                  <div className="space-y-3">
                      <button className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
                          <div className="flex items-center gap-3">
                              <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-lg">
                                  <BarChart3 size={18} />
                              </div>
                              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Simulate Spend</span>
                          </div>
                          <ChevronRight size={16} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
                      </button>
                      <button className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
                          <div className="flex items-center gap-3">
                              <div className="p-2 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-lg">
                                  <AlertTriangle size={18} />
                              </div>
                              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Request Waiver</span>
                          </div>
                          <ChevronRight size={16} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
                      </button>
                  </div>
              </div>
          </div>

          {/* Right Column: Requirements List */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col overflow-hidden">
              <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                   <h3 className="font-bold text-lg text-slate-900 dark:text-white">Active Requirements</h3>
                   <div className="flex gap-2">
                       {['All', 'Met', 'At Risk', 'Missed'].map(filter => (
                           <button 
                               key={filter}
                               onClick={() => setFilterStatus(filter)}
                               className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                                   filterStatus === filter 
                                   ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' 
                                   : 'bg-white dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                               }`}
                           >
                               {filter}
                           </button>
                       ))}
                   </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {filteredRequirements.length > 0 ? (
                      filteredRequirements.map(req => {
                          const progress = Math.min((req.currentAmount / req.targetAmount) * 100, 100);
                          const isCount = req.category === 'Wire Count';

                          return (
                              <div key={req.id} className="p-5 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all bg-white dark:bg-slate-900 group">
                                  <div className="flex justify-between items-start mb-4">
                                      <div className="flex items-center gap-3">
                                          <div className={`p-2 rounded-lg ${
                                              req.category === 'Card Volume' ? 'bg-purple-50 text-purple-600' :
                                              req.category === 'Wire Count' ? 'bg-blue-50 text-blue-600' :
                                              req.category === 'FX Volume' ? 'bg-emerald-50 text-emerald-600' :
                                              'bg-slate-100 text-slate-600'
                                          } dark:bg-slate-800`}>
                                              {req.category === 'Card Volume' ? <CreditCard size={20} /> :
                                               req.category === 'Wire Count' ? <TrendingUp size={20} /> :
                                               <DollarSign size={20} />}
                                          </div>
                                          <div>
                                              <h4 className="font-bold text-slate-900 dark:text-white text-sm">{req.name}</h4>
                                              <p className="text-xs text-slate-500">{req.period} Target • Deadline: {req.deadline}</p>
                                          </div>
                                      </div>
                                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase border ${getStatusColor(req.status)}`}>
                                          {req.status}
                                      </span>
                                  </div>

                                  <div className="space-y-2">
                                      <div className="flex justify-between text-xs font-medium">
                                          <span className="text-slate-600 dark:text-slate-400">
                                              Progress: {isCount ? req.currentAmount : formatCurrency(req.currentAmount)}
                                          </span>
                                          <span className="text-slate-900 dark:text-white">
                                              Target: {isCount ? req.targetAmount : formatCurrency(req.targetAmount)}
                                          </span>
                                      </div>
                                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden">
                                          <div 
                                              className="h-full rounded-full transition-all duration-1000"
                                              style={{ 
                                                  width: `${progress}%`,
                                                  backgroundColor: getProgressColor(req.status)
                                              }}
                                          ></div>
                                      </div>
                                  </div>

                                  <div className="flex justify-end mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <button className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
                                          View Transactions <ArrowRight size={12} />
                                      </button>
                                  </div>
                              </div>
                          );
                      })
                  ) : (
                      <div className="flex flex-col items-center justify-center py-16 text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl">
                          <CheckCircle2 size={48} className="mb-4 opacity-20" />
                          <p className="font-medium">No requirements match this filter.</p>
                      </div>
                  )}
              </div>
          </div>
      </div>
    </div>
  );
};
