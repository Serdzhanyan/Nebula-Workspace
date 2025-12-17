
import React, { useState } from 'react';
import { Search, Filter, Download, PieChart, CreditCard, Building2, TrendingUp, AlertCircle, Plus, MoreHorizontal, Edit2, ArrowRightLeft, Check, ChevronDown, DollarSign } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';

interface DepartmentLimit {
  id: string;
  department: string;
  category: string;
  limitAmount: number;
  spentAmount: number;
  period: 'Monthly' | 'Quarterly' | 'Yearly';
  status: 'Active' | 'Frozen' | 'Review Needed';
  lastUpdated: string;
}

interface CompanyProfile {
  id: string;
  name: string;
  industry: string;
  totalBudget: number;
  currency: string;
  fiscalYearEnd: string;
  limits: DepartmentLimit[];
}

export const CorporateLimitsPage: React.FC = () => {
  // Mock Data
  const companies: CompanyProfile[] = [
    {
      id: '1',
      name: 'TechNova Solutions Ltd.',
      industry: 'Technology',
      totalBudget: 1200000,
      currency: 'USD',
      fiscalYearEnd: 'Dec 31',
      limits: [
        { id: 'L1', department: 'Engineering', category: 'Cloud Infrastructure', limitAmount: 450000, spentAmount: 380000, period: 'Quarterly', status: 'Active', lastUpdated: '2 days ago' },
        { id: 'L2', department: 'Sales', category: 'Travel & Entertainment', limitAmount: 150000, spentAmount: 142000, period: 'Quarterly', status: 'Review Needed', lastUpdated: '1 week ago' },
        { id: 'L3', department: 'Marketing', category: 'Ad Spend', limitAmount: 300000, spentAmount: 120000, period: 'Quarterly', status: 'Active', lastUpdated: '3 days ago' },
        { id: 'L4', department: 'HR', category: 'Recruitment', limitAmount: 80000, spentAmount: 45000, period: 'Yearly', status: 'Active', lastUpdated: '1 month ago' },
        { id: 'L5', department: 'Operations', category: 'Office Supplies', limitAmount: 50000, spentAmount: 12000, period: 'Monthly', status: 'Active', lastUpdated: '5 days ago' },
      ]
    },
    {
      id: '2',
      name: 'GreenLeaf Logistics',
      industry: 'Logistics',
      totalBudget: 850000,
      currency: 'USD',
      fiscalYearEnd: 'Jun 30',
      limits: [
        { id: 'L6', department: 'Fleet Mgmt', category: 'Fuel', limitAmount: 500000, spentAmount: 420000, period: 'Monthly', status: 'Active', lastUpdated: 'Yesterday' },
        { id: 'L7', department: 'Operations', category: 'Maintenance', limitAmount: 200000, spentAmount: 85000, period: 'Quarterly', status: 'Active', lastUpdated: '2 weeks ago' },
        { id: 'L8', department: 'Admin', category: 'General', limitAmount: 50000, spentAmount: 48000, period: 'Monthly', status: 'Review Needed', lastUpdated: '3 days ago' },
      ]
    },
    {
      id: '3',
      name: 'Quantum Dynamics',
      industry: 'Manufacturing',
      totalBudget: 2500000,
      currency: 'EUR',
      fiscalYearEnd: 'Dec 31',
      limits: [
         { id: 'L9', department: 'R&D', category: 'Materials', limitAmount: 1200000, spentAmount: 600000, period: 'Yearly', status: 'Active', lastUpdated: '1 month ago' },
         { id: 'L10', department: 'Sales', category: 'Events', limitAmount: 400000, spentAmount: 395000, period: 'Yearly', status: 'Frozen', lastUpdated: 'Oct 01' }
      ]
    }
  ];

  const [selectedCompany, setSelectedCompany] = useState<CompanyProfile>(companies[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filterDept, setFilterDept] = useState("All");

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCompany = (company: CompanyProfile) => {
    setSelectedCompany(company);
    setSearchTerm("");
    setShowDropdown(false);
  };

  const getUtilizationColor = (percentage: number) => {
      if (percentage >= 100) return 'bg-red-600';
      if (percentage >= 90) return 'bg-red-500';
      if (percentage >= 75) return 'bg-amber-500';
      return 'bg-emerald-500';
  };

  const getUtilizationText = (percentage: number) => {
    if (percentage >= 100) return 'text-red-600';
    if (percentage >= 90) return 'text-red-500';
    if (percentage >= 75) return 'text-amber-500';
    return 'text-emerald-500';
  };

  const formatCurrency = (val: number, currency: string) => {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency, maximumFractionDigits: 0 }).format(val);
  };

  const filteredLimits = selectedCompany.limits.filter(l => filterDept === "All" || l.department === filterDept);
  const departments = ['All', ...Array.from(new Set(selectedCompany.limits.map(l => l.department)))];

  // Prepare chart data
  const chartData = selectedCompany.limits.map(l => ({
      name: l.category,
      Limit: l.limitAmount,
      Spent: l.spentAmount,
      Remaining: l.limitAmount - l.spentAmount
  }));

  const totalSpent = selectedCompany.limits.reduce((acc, curr) => acc + curr.spentAmount, 0);
  const totalRemaining = selectedCompany.totalBudget - totalSpent;
  const overallUtilization = (totalSpent / selectedCompany.totalBudget) * 100;

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-2 space-y-6">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Building2 className="text-indigo-500" /> Corporate Limits
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
             Manage internal budgets, cost centers, and departmental spending caps.
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto relative z-20">
            <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search company budget..." 
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
                <Plus size={18} /> Allocate Budget
            </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Total Allocation</p>
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg">
                      <CreditCard size={20} />
                  </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{formatCurrency(selectedCompany.totalBudget, selectedCompany.currency)}</h3>
              <p className="text-xs text-slate-400 mt-1">Fiscal Year Ends: {selectedCompany.fiscalYearEnd}</p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Total Spent</p>
                  <div className="p-2 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg">
                      <TrendingUp size={20} />
                  </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{formatCurrency(totalSpent, selectedCompany.currency)}</h3>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className={`h-full ${getUtilizationColor(overallUtilization)}`} style={{width: `${Math.min(overallUtilization, 100)}%`}}></div>
              </div>
              <p className={`text-xs mt-1 font-medium ${getUtilizationText(overallUtilization)}`}>{overallUtilization.toFixed(1)}% Utilized</p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Available</p>
                  <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg">
                      <PieChart size={20} />
                  </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{formatCurrency(totalRemaining, selectedCompany.currency)}</h3>
              <p className="text-xs text-slate-400 mt-1">Remaining budget for period</p>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
          
          {/* Main Chart */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col">
              <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg">Budget vs. Actual</h3>
                  <div className="flex gap-2">
                       <select 
                          value={filterDept}
                          onChange={(e) => setFilterDept(e.target.value)}
                          className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs rounded-lg px-3 py-1.5 outline-none font-medium cursor-pointer"
                       >
                           {departments.map(d => <option key={d} value={d}>{d} Dept</option>)}
                       </select>
                  </div>
              </div>
              <div className="flex-1 w-full min-h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                          <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} tickFormatter={(val) => `${val/1000}k`} />
                          <Tooltip 
                              cursor={{fill: 'transparent'}}
                              contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                              formatter={(value: number) => formatCurrency(value, selectedCompany.currency)}
                          />
                          <Legend />
                          <Bar dataKey="Limit" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="Spent" fill="#6366f1" radius={[4, 4, 0, 0]} />
                      </BarChart>
                  </ResponsiveContainer>
              </div>
          </div>

          {/* Limits List */}
          <div className="flex flex-col gap-4 overflow-y-auto pr-2">
              <div className="flex justify-between items-center mb-1">
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg">Active Limits</h3>
                  <button className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">View All</button>
              </div>
              
              {filteredLimits.map(limit => {
                  const percent = (limit.spentAmount / limit.limitAmount) * 100;
                  const colorClass = getUtilizationColor(percent);
                  
                  return (
                      <div key={limit.id} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group">
                          <div className="flex justify-between items-start mb-3">
                              <div>
                                  <div className="flex items-center gap-2">
                                      <span className="font-bold text-slate-900 dark:text-white">{limit.category}</span>
                                      {limit.status === 'Review Needed' && <AlertCircle size={14} className="text-amber-500" />}
                                  </div>
                                  <p className="text-xs text-slate-500">{limit.department} • {limit.period}</p>
                              </div>
                              <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                                  <MoreHorizontal size={18} />
                              </button>
                          </div>
                          
                          <div className="mb-3">
                              <div className="flex justify-between text-xs mb-1.5">
                                  <span className="text-slate-500 dark:text-slate-400 font-medium">
                                      {formatCurrency(limit.spentAmount, selectedCompany.currency)}
                                  </span>
                                  <span className={`font-bold ${getUtilizationText(percent)}`}>{percent.toFixed(0)}%</span>
                              </div>
                              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                                  <div className={`h-full rounded-full ${colorClass}`} style={{ width: `${Math.min(percent, 100)}%` }}></div>
                              </div>
                              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                                  <span>0</span>
                                  <span>Limit: {formatCurrency(limit.limitAmount, selectedCompany.currency)}</span>
                              </div>
                          </div>
                          
                          <div className="flex gap-2 pt-3 border-t border-slate-100 dark:border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity">
                               <button className="flex-1 py-1.5 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-1">
                                  <Edit2 size={12} /> Edit
                               </button>
                               <button className="flex-1 py-1.5 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors flex items-center justify-center gap-1">
                                  <ArrowRightLeft size={12} /> Transfer
                               </button>
                          </div>
                      </div>
                  );
              })}
          </div>
      </div>
    </div>
  );
};
