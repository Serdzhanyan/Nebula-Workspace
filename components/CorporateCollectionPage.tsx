import React, { useState, useMemo } from 'react';
/* Fixed: Added missing ArrowRightLeft import */
import { Search, Filter, Download, Plus, ChevronDown, Check, DollarSign, Activity, Clock, CheckCircle2, AlertTriangle, FileText, MoreHorizontal, RefreshCw, X, ArrowUpRight, TrendingUp, Briefcase, Landmark, ArrowRightLeft } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';

interface CollectionRecord {
  id: string;
  reference: string;
  debtor: string;
  amount: number;
  currency: string;
  dueDate: string;
  status: 'Pending' | 'Success' | 'Failed' | 'In Progress';
  type: 'Invoicing' | 'Direct Debit' | 'Cash Collection';
  priority: 'High' | 'Medium' | 'Low';
}

interface CompanyCollectionProfile {
  id: string;
  name: string;
  industry: string;
  totalCollected: number;
  pendingAmount: number;
  successRate: number;
  avgDaysToCollect: number;
  records: CollectionRecord[];
  history: { period: string; collected: number; target: number }[];
}

export const CorporateCollectionPage: React.FC = () => {
  // Mock Data
  const companies: CompanyCollectionProfile[] = [
    {
      id: '1',
      name: 'TechNova Solutions Ltd.',
      industry: 'Technology',
      totalCollected: 1250000,
      pendingAmount: 450000,
      successRate: 94.5,
      avgDaysToCollect: 12,
      records: [
        { id: 'CR-101', reference: 'INV-9921', debtor: 'Global Chips HK', amount: 45000, currency: 'USD', dueDate: 'Oct 28, 2024', status: 'Pending', type: 'Invoicing', priority: 'High' },
        { id: 'CR-102', reference: 'DD-8820', debtor: 'Azure Cloud Svcs', amount: 12500, currency: 'USD', dueDate: 'Oct 24, 2024', status: 'Success', type: 'Direct Debit', priority: 'Medium' },
        { id: 'CR-103', reference: 'CSH-7712', debtor: 'Local Retailer Inc', amount: 5000, currency: 'USD', dueDate: 'Oct 20, 2024', status: 'Success', type: 'Cash Collection', priority: 'Low' },
        { id: 'CR-104', reference: 'INV-9925', debtor: 'NextGen Systems', amount: 85000, currency: 'USD', dueDate: 'Nov 05, 2024', status: 'In Progress', type: 'Invoicing', priority: 'High' },
      ],
      history: [
        { period: 'May', collected: 180000, target: 200000 },
        { period: 'Jun', collected: 220000, target: 200000 },
        { period: 'Jul', collected: 210000, target: 220000 },
        { period: 'Aug', collected: 250000, target: 230000 },
        { period: 'Sep', collected: 280000, target: 250000 },
        { period: 'Oct', collected: 310000, target: 300000 },
      ]
    },
    {
      id: '2',
      name: 'GreenLeaf Logistics',
      industry: 'Logistics',
      totalCollected: 450000,
      pendingAmount: 120000,
      successRate: 88.2,
      avgDaysToCollect: 18,
      records: [
        { id: 'CR-201', reference: 'INV-GL-44', debtor: 'EcoStore Ltd', amount: 15000, currency: 'USD', dueDate: 'Oct 24, 2024', status: 'Failed', type: 'Direct Debit', priority: 'High' },
        { id: 'CR-202', reference: 'INV-GL-45', debtor: 'BioCargo Group', amount: 22000, currency: 'USD', dueDate: 'Oct 22, 2024', status: 'Success', type: 'Invoicing', priority: 'Medium' },
      ],
      history: [
        { period: 'Aug', collected: 120000, target: 150000 },
        { period: 'Sep', collected: 140000, target: 150000 },
        { period: 'Oct', collected: 190000, target: 180000 },
      ]
    },
    {
      id: '3',
      name: 'Quantum Dynamics',
      industry: 'Manufacturing',
      totalCollected: 2800000,
      pendingAmount: 0,
      successRate: 100,
      avgDaysToCollect: 8,
      records: [],
      history: []
    }
  ];

  const [selectedCompany, setSelectedCompany] = useState<CompanyCollectionProfile>(companies[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredRecords = useMemo(() => {
    return selectedCompany.records.filter(r => 
      filterStatus === 'All' || r.status === filterStatus
    );
  }, [selectedCompany, filterStatus]);

  const handleSelectCompany = (company: CompanyCollectionProfile) => {
    setSelectedCompany(company);
    setSearchTerm("");
    setShowDropdown(false);
  };

  const formatCurrency = (val: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(val);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Success': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
      case 'Pending': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800';
      case 'In Progress': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      case 'Failed': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-2 space-y-6">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Landmark className="text-indigo-500" /> Collection Management
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
             Track account receivables, manage direct debits, and monitor collection efficiency.
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto relative z-20">
            <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search company collections..." 
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
                                        className="w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 border-b border-slate-100 dark:border-slate-700 last:border-0 flex justify-between items-center group transition-colors"
                                    >
                                        <div>
                                            <p className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{comp.name}</p>
                                            <p className="text-xs text-slate-500">{comp.industry} • Collected: {formatCurrency(comp.totalCollected)}</p>
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
                <Plus size={18} /> New Collection
            </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Total Collected (YTD)</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{formatCurrency(selectedCompany.totalCollected)}</h3>
              <p className="text-xs text-emerald-500 font-medium mt-1 flex items-center gap-1"><TrendingUp size={12}/> +8.2% vs target</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Pending Amount</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{formatCurrency(selectedCompany.pendingAmount)}</h3>
              <p className="text-xs text-slate-400 mt-1">Across {selectedCompany.records.filter(r => r.status === 'Pending').length} invoices</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Success Rate</p>
              <h3 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{selectedCompany.successRate}%</h3>
              <p className="text-xs text-slate-400 mt-1">Paid on first request</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Avg. Collection Time</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedCompany.avgDaysToCollect} Days</h3>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1"><Clock size={12}/> Industry Avg: 15d</p>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
          
          {/* Left Column: Collection Records List */}
          <div className="lg:col-span-2 flex flex-col gap-4 overflow-y-auto pr-2 pb-10">
              <div className="flex justify-between items-center mb-2 px-1">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">Active Receivables</h3>
                  <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                      {['All', 'Pending', 'In Progress', 'Success', 'Failed'].map(t => (
                          <button
                            key={t}
                            onClick={() => setFilterStatus(t)}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                filterStatus === t 
                                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-sm' 
                                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                            }`}
                          >
                              {t}
                          </button>
                      ))}
                  </div>
              </div>

              {filteredRecords.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                      {filteredRecords.map(record => (
                          <div 
                            key={record.id} 
                            className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all group cursor-pointer"
                          >
                              <div className="flex justify-between items-start mb-4">
                                  <div className="flex items-center gap-3">
                                      <div className={`p-2.5 rounded-xl ${
                                          record.status === 'Success' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30' :
                                          record.status === 'Failed' ? 'bg-red-100 text-red-600 dark:bg-red-900/30' :
                                          'bg-slate-100 text-slate-600 dark:bg-slate-700'
                                      }`}>
                                          <ArrowRightLeft size={20} className={record.type === 'Cash Collection' ? 'rotate-90' : ''} />
                                      </div>
                                      <div>
                                          <h4 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{record.debtor}</h4>
                                          <p className="text-xs text-slate-500 font-mono mt-0.5">{record.reference} • {record.type}</p>
                                      </div>
                                  </div>
                                  <div className="flex flex-col items-end gap-2">
                                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${getStatusColor(record.status)}`}>
                                          {record.status}
                                      </span>
                                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${
                                          record.priority === 'High' ? 'bg-red-50 text-red-600 border-red-100 dark:bg-red-900/20' : 
                                          'bg-slate-50 text-slate-500 border-slate-100 dark:bg-slate-800'
                                      }`}>
                                          {record.priority} Priority
                                      </span>
                                  </div>
                              </div>

                              <div className="flex justify-between items-end">
                                  <div className="text-xs text-slate-500 space-y-1">
                                      <p>Due Date: <span className="font-medium text-slate-700 dark:text-slate-300">{record.dueDate}</span></p>
                                      <div className="flex items-center gap-2 mt-2">
                                          <div className="flex -space-x-1">
                                              {[1, 2].map(i => (
                                                  <div key={i} className="w-5 h-5 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[8px] font-bold text-slate-500">
                                                      A
                                                  </div>
                                              ))}
                                          </div>
                                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Assigned Agents</span>
                                      </div>
                                  </div>
                                  <div className="text-right">
                                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">Amount</p>
                                      <p className="text-xl font-bold text-slate-900 dark:text-white">
                                          {formatCurrency(record.amount, record.currency)}
                                      </p>
                                  </div>
                              </div>
                              
                              <div className="flex gap-2 pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 opacity-0 group-hover:opacity-100 transition-opacity">
                                   <button className="flex-1 py-1.5 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors">
                                       Send Reminder
                                   </button>
                                   <button className="flex-1 py-1.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                       View History
                                   </button>
                                   <button className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
                                       <MoreHorizontal size={16} />
                                   </button>
                              </div>
                          </div>
                      ))}
                  </div>
              ) : (
                  <div className="text-center py-16 text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                      <Landmark size={48} className="mx-auto mb-2 opacity-30" />
                      <p className="font-medium">No collection records match your filter.</p>
                  </div>
              )}
          </div>

          {/* Right Column: Analytics Sidebar */}
          <div className="space-y-6">
              {/* Collection Efficiency Chart */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col h-[400px]">
                  <div className="flex justify-between items-center mb-6">
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white">Monthly Collection</h3>
                      <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 transition-colors">
                          <RefreshCw size={16} />
                      </button>
                  </div>
                  
                  <div className="flex-1 w-full min-h-0">
                      <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={selectedCompany.history}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                              <XAxis dataKey="period" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                              <YAxis hide />
                              <Tooltip 
                                  contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                  formatter={(val: number) => [formatCurrency(val), 'Collected']}
                                  cursor={{ fill: 'transparent' }}
                              />
                              <Bar dataKey="target" fill="#e2e8f0" radius={[4, 4, 0, 0]} barSize={24} />
                              <Bar dataKey="collected" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={24} />
                          </BarChart>
                      </ResponsiveContainer>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between text-xs text-slate-500 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                      <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-indigo-500"></div> Realized</span>
                      <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-slate-300"></div> Target</span>
                  </div>
              </div>

              {/* Debt Aging Bucket */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-4">Aging Analysis</h3>
                  <div className="space-y-4">
                      <div className="space-y-1.5">
                          <div className="flex justify-between text-xs mb-1">
                              <span className="text-slate-500">0-30 Days</span>
                              <span className="font-bold text-slate-700 dark:text-slate-200">65%</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-500" style={{ width: '65%' }}></div>
                          </div>
                      </div>
                      <div className="space-y-1.5">
                          <div className="flex justify-between text-xs mb-1">
                              <span className="text-slate-500">31-60 Days</span>
                              <span className="font-bold text-slate-700 dark:text-slate-200">20%</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                              <div className="h-full bg-amber-500" style={{ width: '20%' }}></div>
                          </div>
                      </div>
                      <div className="space-y-1.5">
                          <div className="flex justify-between text-xs mb-1">
                              <span className="text-slate-500">60+ Days</span>
                              <span className="font-bold text-slate-700 dark:text-slate-200">15%</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                              <div className="h-full bg-red-500" style={{ width: '15%' }}></div>
                          </div>
                      </div>
                  </div>
                  <button className="w-full mt-6 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2">
                      <FileText size={14} /> Full Aging Report
                  </button>
              </div>

              {/* Automation Prompt */}
              <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white shadow-lg">
                   <div className="flex items-center gap-3 mb-4">
                       <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                           <TrendingUp size={20} />
                       </div>
                       <h4 className="font-bold">Smart Recovery</h4>
                   </div>
                   <p className="text-xs leading-relaxed opacity-90 mb-4">
                       Automate payment reminders and SMS notifications for high-risk accounts to improve liquidity by up to 12%.
                   </p>
                   <button className="w-full py-2 bg-white text-indigo-600 rounded-lg text-xs font-bold hover:bg-indigo-50 transition-colors">
                       Setup Automation
                   </button>
              </div>
          </div>
      </div>
    </div>
  );
};
