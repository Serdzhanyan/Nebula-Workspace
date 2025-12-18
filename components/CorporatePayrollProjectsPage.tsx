import React, { useState, useMemo } from 'react';
import { Search, Filter, Download, Users, DollarSign, Clock, CheckCircle2, AlertTriangle, FileText, Plus, ChevronDown, Check, Eye, Trash2, Activity, RefreshCw, X, Play, CreditCard, PieChart as PieIcon, Briefcase, TrendingUp } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

interface PayrollEmployee {
  id: string;
  name: string;
  role: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Flagged';
}

interface PayrollProject {
  id: string;
  reference: string;
  name: string;
  type: 'Salary' | 'Bonus' | 'Contractor';
  period: string;
  totalAmount: number;
  employeeCount: number;
  status: 'Draft' | 'Processing' | 'Completed' | 'Failed';
  uploadDate: string;
  taxAmount: number;
  employees: PayrollEmployee[];
}

interface CompanyPayrollProfile {
  id: string;
  name: string;
  industry: string;
  totalMonthlyVolume: number;
  totalEmployees: number;
  projects: PayrollProject[];
}

export const CorporatePayrollProjectsPage: React.FC = () => {
  // Mock Data
  const companies: CompanyPayrollProfile[] = [
    {
      id: '1',
      name: 'TechNova Solutions Ltd.',
      industry: 'Technology',
      totalMonthlyVolume: 1450000,
      totalEmployees: 1240,
      projects: [
        {
          id: 'PRJ-101',
          reference: 'PAY-2024-OCT-01',
          name: 'Main Office Staff - Oct',
          type: 'Salary',
          period: 'Oct 01 - Oct 31, 2024',
          totalAmount: 450200,
          employeeCount: 112,
          status: 'Draft',
          uploadDate: 'Oct 24, 2024',
          taxAmount: 85000,
          employees: [
            { id: 'E1', name: 'Alice Johnson', role: 'Engineer', amount: 8500, status: 'Pending' },
            { id: 'E2', name: 'Bob Smith', role: 'Designer', amount: 7200, status: 'Pending' },
            { id: 'E3', name: 'Charlie Davis', role: 'Manager', amount: 9500, status: 'Pending' }
          ]
        },
        {
          id: 'PRJ-102',
          reference: 'PAY-2024-BON-05',
          name: 'Q3 Sales Commissions',
          type: 'Bonus',
          period: 'Jul 01 - Sep 30, 2024',
          totalAmount: 125000,
          employeeCount: 15,
          status: 'Completed',
          uploadDate: 'Oct 05, 2024',
          taxAmount: 22000,
          employees: [
            { id: 'E4', name: 'David Lee', role: 'Sales Lead', amount: 15000, status: 'Paid' }
          ]
        }
      ]
    },
    {
      id: '2',
      name: 'GreenLeaf Logistics',
      industry: 'Logistics',
      totalMonthlyVolume: 680000,
      totalEmployees: 450,
      projects: [
        {
          id: 'PRJ-201',
          reference: 'LOG-PAY-WK42',
          name: 'Driver Weekly Payout',
          type: 'Contractor',
          period: 'Oct 14 - Oct 20, 2024',
          totalAmount: 68500,
          employeeCount: 45,
          status: 'Processing',
          uploadDate: 'Oct 21, 2024',
          taxAmount: 0,
          employees: []
        }
      ]
    },
    {
      id: '3',
      name: 'Quantum Dynamics',
      industry: 'Manufacturing',
      totalMonthlyVolume: 2500000,
      totalEmployees: 3200,
      projects: []
    }
  ];

  const [selectedCompany, setSelectedCompany] = useState<CompanyPayrollProfile>(companies[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedProject, setSelectedProject] = useState<PayrollProject | null>(companies[0].projects[0] || null);
  const [filterType, setFilterType] = useState("All");

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredProjects = useMemo(() => {
    return selectedCompany.projects.filter(p => 
      filterType === 'All' || p.type === filterType
    );
  }, [selectedCompany, filterType]);

  const handleSelectCompany = (company: CompanyPayrollProfile) => {
    setSelectedCompany(company);
    setSearchTerm("");
    setShowDropdown(false);
    setSelectedProject(company.projects.length > 0 ? company.projects[0] : null);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
      case 'Processing': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      case 'Draft': return 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700';
      case 'Failed': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  // Pie Chart Data for Project Types
  const typeMixData = [
      { name: 'Salary', value: selectedCompany.projects.filter(p => p.type === 'Salary').length, color: '#6366f1' },
      { name: 'Bonus', value: selectedCompany.projects.filter(p => p.type === 'Bonus').length, color: '#10b981' },
      { name: 'Contractor', value: selectedCompany.projects.filter(p => p.type === 'Contractor').length, color: '#f59e0b' },
  ].filter(d => d.value > 0);

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-2 space-y-6">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="text-indigo-500" /> Payroll Projects
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
             Manage salary disbursements, bonus batches, and tax remittances.
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto relative z-20">
            <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search company payroll..." 
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
                                            <p className="text-xs text-slate-500">Industry: {comp.industry} • {comp.totalEmployees} Employees</p>
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
                <Plus size={18} /> Create Batch
            </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Monthly Volume</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{formatCurrency(selectedCompany.totalMonthlyVolume)}</h3>
              <p className="text-xs text-emerald-500 font-medium mt-1 flex items-center gap-1"><TrendingUp size={12}/> +4.2% vs prev</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Total Workforce</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedCompany.totalEmployees}</h3>
              <p className="text-xs text-slate-400 mt-1">Full-time & Contractors</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Open Batches</p>
              <h3 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  {selectedCompany.projects.filter(p => p.status !== 'Completed').length}
              </h3>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1"><Clock size={12}/> Awaiting execution</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Tax Liability</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {formatCurrency(selectedCompany.projects.reduce((acc, p) => acc + p.taxAmount, 0))}
              </h3>
              <p className="text-xs text-slate-400 mt-1">Estimated Q4</p>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
          
          {/* Left Column: Projects Feed */}
          <div className="lg:col-span-2 flex flex-col gap-4 overflow-y-auto pr-2 pb-10">
              <div className="flex justify-between items-center mb-2 px-1">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">Payroll Feed</h3>
                  <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                      {['All', 'Salary', 'Bonus', 'Contractor'].map(t => (
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

              {filteredProjects.map(project => (
                  <div 
                    key={project.id} 
                    onClick={() => setSelectedProject(project)}
                    className={`bg-white dark:bg-slate-900 p-5 rounded-2xl border transition-all cursor-pointer group hover:shadow-md relative overflow-hidden ${
                        selectedProject?.id === project.id 
                        ? 'border-indigo-500 ring-1 ring-indigo-500 shadow-md' 
                        : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700'
                    }`}
                  >
                      <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                              <div className={`p-2.5 rounded-xl ${
                                  project.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30' :
                                  'bg-slate-100 text-slate-600 dark:bg-slate-800'
                              }`}>
                                  <CreditCard size={20} />
                              </div>
                              <div>
                                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">{project.name}</h4>
                                  <p className="text-xs text-slate-500 font-mono mt-0.5">{project.reference} • {project.type}</p>
                              </div>
                          </div>
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${getStatusColor(project.status)}`}>
                              {project.status}
                          </span>
                      </div>

                      <div className="flex justify-between items-end">
                          <div className="text-xs text-slate-500 space-y-1">
                              <p>Period: <span className="font-medium text-slate-700 dark:text-slate-300">{project.period}</span></p>
                              <div className="flex items-center gap-2 mt-2">
                                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Engagement</span>
                                 <div className="w-48 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                     <div 
                                        className={`h-full ${project.status === 'Completed' ? 'bg-emerald-500' : 'bg-indigo-500'}`} 
                                        style={{ width: `${project.status === 'Completed' ? 100 : 40}%` }}
                                     />
                                 </div>
                              </div>
                          </div>
                          <div className="text-right">
                              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">Batch Total</p>
                              <p className="text-xl font-bold text-slate-900 dark:text-white">
                                  {formatCurrency(project.totalAmount)}
                              </p>
                          </div>
                      </div>
                  </div>
              ))}

              {filteredProjects.length === 0 && (
                  <div className="text-center py-16 text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                      <Users size={48} className="mx-auto mb-2 opacity-30" />
                      <p className="font-medium">No payroll projects found for this selection.</p>
                  </div>
              )}
          </div>

          {/* Right Column: Project Deep Dive */}
          <div className="space-y-6">
              {selectedProject ? (
                  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col h-full animate-in slide-in-from-right duration-300">
                      <div className="flex justify-between items-start mb-6">
                          <div>
                              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Batch Analysis</h3>
                              <p className="text-xs text-slate-500">ID: {selectedProject.id}</p>
                          </div>
                          <button onClick={() => setSelectedProject(null)} className="md:hidden text-slate-400 p-1 hover:bg-slate-100 rounded-lg transition-colors"><X size={20} /></button>
                      </div>

                      <div className="space-y-6 flex-1">
                          {/* Mini Summary Chart */}
                          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 flex flex-col gap-4 shadow-inner overflow-hidden relative">
                                <div className="flex justify-between items-center relative z-10">
                                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide">Category Allocation</h4>
                                    <span className="text-[10px] font-bold text-indigo-500 flex items-center gap-1"><PieIcon size={10} /> Mix</span>
                                </div>
                                <div className="h-40 w-full relative z-10">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={[{name: 'Net Pay', value: selectedProject.totalAmount - selectedProject.taxAmount}, {name: 'Tax/Ded', value: selectedProject.taxAmount}]}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={45}
                                                outerRadius={65}
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                <Cell fill="#6366f1" />
                                                <Cell fill="#f43f5e" />
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                          </div>

                          {/* Detail Table */}
                          <div>
                              <div className="flex justify-between items-center mb-3 px-1">
                                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sample Employee Log</h4>
                                  <button className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline">View All {selectedProject.employeeCount}</button>
                              </div>
                              <div className="space-y-2">
                                  {selectedProject.employees.map(emp => (
                                      <div key={emp.id} className="p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800/50 flex justify-between items-center group hover:border-indigo-200 transition-colors shadow-sm">
                                          <div>
                                              <p className="text-sm font-bold text-slate-800 dark:text-white">{emp.name}</p>
                                              <p className="text-[10px] text-slate-500">{emp.role}</p>
                                          </div>
                                          <div className="text-right">
                                              <p className="text-sm font-bold text-slate-900 dark:text-white">{formatCurrency(emp.amount)}</p>
                                              <span className={`text-[10px] font-bold uppercase ${emp.status === 'Paid' ? 'text-emerald-500' : 'text-amber-500'}`}>{emp.status}</span>
                                          </div>
                                      </div>
                                  ))}
                                  {selectedProject.employees.length === 0 && (
                                      <p className="text-xs text-slate-400 italic text-center py-4">No individual logs available for this batch type.</p>
                                  )}
                              </div>
                          </div>

                          {/* Action Bar */}
                          <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-700 space-y-3">
                              <div className="grid grid-cols-2 gap-3">
                                  <button className="py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all active:scale-95 shadow-sm flex items-center justify-center gap-2">
                                      <Play size={16} /> Execute Batch
                                  </button>
                                  <button className="py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95 shadow-sm">
                                      Preview Report
                                  </button>
                              </div>
                              <button className="w-full py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center gap-2">
                                  <RefreshCw size={16} /> Re-Calculate Taxes
                              </button>
                              <button className="w-full py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center gap-2">
                                  <Download size={16} /> Download CSV Template
                              </button>
                          </div>
                      </div>
                  </div>
              ) : (
                  <div className="bg-slate-50 dark:bg-slate-900/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 p-8 flex flex-col items-center justify-center text-center h-full text-slate-400">
                      <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-800 mb-4 opacity-50 shadow-inner">
                        <DollarSign size={48} />
                      </div>
                      <p className="font-medium">Select a payroll project to view disbursement details</p>
                      <p className="text-xs mt-1">Employee lists and execution controls will appear here.</p>
                  </div>
              )}
          </div>
      </div>
    </div>
  );
};
