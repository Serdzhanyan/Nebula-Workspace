
import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, CreditCard, PieChart, Search, Check, Download, FileText, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { SMECompany } from '../types';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, AreaChart, Area } from 'recharts';

interface Props {
  company: SMECompany;
}

export const SMEClientFinancials: React.FC<Props> = ({ company: initialCompany }) => {
  const [selectedCompany, setSelectedCompany] = useState<SMECompany>(initialCompany);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  // Mock companies list for the dropdown
  const companiesList: Partial<SMECompany>[] = [
      { id: '1', name: 'TechNova Solutions Ltd.', industry: 'Technology', revenue: '$4.2M' },
      { id: '2', name: 'GreenLeaf Logistics', industry: 'Logistics', revenue: '$12.5M' },
      { id: '3', name: 'Quantum Dynamics', industry: 'Manufacturing', revenue: '$8.1M' },
      { id: '4', name: 'Solaris Energy', industry: 'Energy', revenue: '$22.4M' }
  ];

  // Sync prop changes
  useEffect(() => {
    setSelectedCompany(initialCompany);
  }, [initialCompany]);

  const filteredCompanies = companiesList.filter(c => 
      c.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCompany = (comp: Partial<SMECompany>) => {
      // Simulate switching company context
      const enrichedCompany = {
          ...selectedCompany,
          ...comp,
          // Mocking distinct values for demo effect
          revenue: comp.id === '2' ? '$12.5M' : comp.id === '3' ? '$8.1M' : '$4.2M', 
      };
      setSelectedCompany(enrichedCompany as SMECompany);
      setSearchTerm("");
      setShowDropdown(false);
  };

   const revenueData = [
    { name: 'Q1', value: selectedCompany.id === '2' ? 250000 : 120000 },
    { name: 'Q2', value: selectedCompany.id === '2' ? 280000 : 145000 },
    { name: 'Q3', value: selectedCompany.id === '2' ? 310000 : 160000 },
    { name: 'Q4', value: selectedCompany.id === '2' ? 350000 : 190000 },
  ];

  const expenseData = [
    { month: 'Jan', amount: 45000 },
    { month: 'Feb', amount: 52000 },
    { month: 'Mar', amount: 49000 },
    { month: 'Apr', amount: 60000 },
    { month: 'May', amount: 55000 },
    { month: 'Jun', amount: 58000 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
        {/* Search Bar */}
        <div className="relative z-20">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search company for financial profile..." 
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowDropdown(true);
                    }}
                    onFocus={() => setShowDropdown(true)}
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-slate-900 dark:text-white"
                />
            </div>
            {showDropdown && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)}></div>
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden z-20">
                        {filteredCompanies.length > 0 ? (
                            filteredCompanies.map(comp => (
                                <button
                                    key={comp.id}
                                    onClick={() => handleSelectCompany(comp)}
                                    className="w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 border-b border-slate-100 dark:border-slate-800 last:border-0 flex justify-between items-center group transition-colors"
                                >
                                    <div>
                                        <p className="font-bold text-slate-900 dark:text-white text-sm">{comp.name}</p>
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

        <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedCompany.name}</h3>
            <span className="text-sm text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">FY 2024</span>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-lg"><DollarSign size={20} /></div>
                    <span className="text-xs font-bold uppercase text-slate-500">Total Revenue</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{selectedCompany.revenue}</p>
                <p className="text-xs text-emerald-500 font-medium mt-1 flex items-center gap-1"><ArrowUpRight size={14} /> +12% vs last year</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg"><CreditCard size={20} /></div>
                    <span className="text-xs font-bold uppercase text-slate-500">Credit Score</span>
                </div>
                <div className="flex justify-between items-end">
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">780</p>
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded">Excellent</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-3 overflow-hidden">
                    <div className="bg-blue-500 h-full w-[78%]"></div>
                </div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-lg"><PieChart size={20} /></div>
                    <span className="text-xs font-bold uppercase text-slate-500">Profit Margin</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">18.5%</p>
                <p className="text-xs text-slate-400 font-medium mt-1">Industry Avg: 15%</p>
            </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm h-[350px] flex flex-col">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6">Revenue Trend (Quarterly)</h3>
                <div className="flex-1 w-full min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                            <Tooltip 
                                cursor={{ fill: 'transparent' }} 
                                contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                            />
                            <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm h-[350px] flex flex-col">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6">Operational Expenses</h3>
                <div className="flex-1 w-full min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={expenseData}>
                            <defs>
                                <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                            <Tooltip />
                            <Area type="monotone" dataKey="amount" stroke="#f59e0b" fillOpacity={1} fill="url(#colorExpense)" strokeWidth={3} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>

        {/* Financial Statements */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4">Financial Statements</h3>
            <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500">
                            <FileText size={20} />
                        </div>
                        <div>
                            <p className="font-bold text-sm text-slate-900 dark:text-white">Balance Sheet 2023</p>
                            <p className="text-xs text-slate-500">Audited • Dec 31, 2023</p>
                        </div>
                    </div>
                    <button className="text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 p-2 rounded-lg transition-colors">
                        <Download size={18} />
                    </button>
                </div>
                <div className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500">
                            <FileText size={20} />
                        </div>
                        <div>
                            <p className="font-bold text-sm text-slate-900 dark:text-white">Profit & Loss Statement Q3</p>
                            <p className="text-xs text-slate-500">Internal • Sep 30, 2024</p>
                        </div>
                    </div>
                    <button className="text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 p-2 rounded-lg transition-colors">
                        <Download size={18} />
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};
