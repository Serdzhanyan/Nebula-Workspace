
import React, { useState } from 'react';
import { Search, Filter, Download, DollarSign, FileText, CheckCircle2, AlertTriangle, ArrowRightLeft, Building2, Calendar, ChevronDown, Check, Plus, UploadCloud, RefreshCw, Globe, PieChart } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell, PieChart as RePieChart, Pie } from 'recharts';

interface CurrencyContract {
  id: string;
  number: string;
  counterparty: string;
  currency: string;
  totalAmount: number;
  utilizedAmount: number;
  startDate: string;
  expiryDate: string;
  status: 'Active' | 'Closed' | 'Pending';
  type: 'Import' | 'Export' | 'Loan';
}

interface CurrencyOperation {
  id: string;
  date: string;
  type: 'Transfer' | 'Sale' | 'Purchase';
  amount: number;
  currency: string;
  counterparty: string;
  contractId: string;
  status: 'Approved' | 'Pending Review' | 'Rejected' | 'Requires Docs';
}

interface CompanyCurrencyProfile {
  id: string;
  name: string;
  industry: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  contracts: CurrencyContract[];
  operations: CurrencyOperation[];
}

export const CorporateCurrencyControlPage: React.FC = () => {
  // Mock Data
  const companies: CompanyCurrencyProfile[] = [
    {
      id: '1',
      name: 'TechNova Solutions Ltd.',
      industry: 'Technology',
      riskLevel: 'Low',
      contracts: [
        { id: 'C1', number: 'IMP-2024-001', counterparty: 'Global Chips Inc.', currency: 'USD', totalAmount: 5000000, utilizedAmount: 1250000, startDate: '2024-01-01', expiryDate: '2024-12-31', status: 'Active', type: 'Import' },
        { id: 'C2', number: 'EXP-2024-055', counterparty: 'EuroTech GmbH', currency: 'EUR', totalAmount: 2000000, utilizedAmount: 1800000, startDate: '2023-06-01', expiryDate: '2024-06-01', status: 'Active', type: 'Export' },
        { id: 'C3', number: 'LN-2023-882', counterparty: 'Asian Venture Corp', currency: 'JPY', totalAmount: 100000000, utilizedAmount: 100000000, startDate: '2023-01-15', expiryDate: '2025-01-15', status: 'Active', type: 'Loan' },
      ],
      operations: [
        { id: 'OP1', date: 'Oct 24, 2024', type: 'Transfer', amount: 50000, currency: 'USD', counterparty: 'Global Chips Inc.', contractId: 'IMP-2024-001', status: 'Approved' },
        { id: 'OP2', date: 'Oct 23, 2024', type: 'Sale', amount: 150000, currency: 'EUR', counterparty: 'EuroTech GmbH', contractId: 'EXP-2024-055', status: 'Pending Review' },
        { id: 'OP3', date: 'Oct 20, 2024', type: 'Purchase', amount: 25000, currency: 'USD', counterparty: 'Global Chips Inc.', contractId: 'IMP-2024-001', status: 'Requires Docs' },
      ]
    },
    {
      id: '2',
      name: 'GreenLeaf Logistics',
      industry: 'Logistics',
      riskLevel: 'Medium',
      contracts: [
        { id: 'C4', number: 'IMP-2024-102', counterparty: 'China Parts Ltd.', currency: 'CNY', totalAmount: 8000000, utilizedAmount: 4000000, startDate: '2024-03-01', expiryDate: '2025-03-01', status: 'Active', type: 'Import' }
      ],
      operations: [
        { id: 'OP4', date: 'Oct 25, 2024', type: 'Transfer', amount: 200000, currency: 'CNY', counterparty: 'China Parts Ltd.', contractId: 'IMP-2024-102', status: 'Approved' }
      ]
    },
    {
      id: '3',
      name: 'Quantum Dynamics',
      industry: 'Manufacturing',
      riskLevel: 'High',
      contracts: [
         { id: 'C5', number: 'EXP-2024-900', counterparty: 'Global Defense', currency: 'USD', totalAmount: 10000000, utilizedAmount: 500000, startDate: '2024-09-01', expiryDate: '2026-09-01', status: 'Pending', type: 'Export' }
      ],
      operations: []
    }
  ];

  const [selectedCompany, setSelectedCompany] = useState<CompanyCurrencyProfile>(companies[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState<'contracts' | 'operations' | 'analytics'>('contracts');
  const [filterType, setFilterType] = useState("All");

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCompany = (company: CompanyCurrencyProfile) => {
    setSelectedCompany(company);
    setSearchTerm("");
    setShowDropdown(false);
  };

  const formatCurrency = (val: number, currency: string) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency, maximumFractionDigits: 0 }).format(val);
  };

  const getStatusColor = (status: string) => {
      switch(status) {
          case 'Active': 
          case 'Approved': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
          case 'Pending':
          case 'Pending Review': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800';
          case 'Requires Docs': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800';
          case 'Rejected': 
          case 'Closed': return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700';
          default: return 'bg-slate-100 text-slate-700';
      }
  };

  // Filtered Lists
  const filteredContracts = selectedCompany.contracts.filter(c => filterType === 'All' || c.type === filterType);
  const filteredOperations = selectedCompany.operations; // Add filter logic if needed

  // Chart Data
  const chartData = selectedCompany.operations.map(op => ({
      name: op.date.split(',')[0], // Extract date part
      amount: op.amount,
      type: op.type
  }));

  const pieData = [
      { name: 'Import', value: selectedCompany.contracts.filter(c => c.type === 'Import').length, color: '#6366f1' },
      { name: 'Export', value: selectedCompany.contracts.filter(c => c.type === 'Export').length, color: '#10b981' },
      { name: 'Loan', value: selectedCompany.contracts.filter(c => c.type === 'Loan').length, color: '#f59e0b' },
  ].filter(d => d.value > 0);

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-2 space-y-6">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <RefreshCw className="text-indigo-500" /> Currency Control
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
             Manage foreign trade contracts, validate operations, and ensure compliance.
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

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Active Contracts</p>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{selectedCompany.contracts.filter(c => c.status === 'Active').length}</h3>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
                  <FileText size={24} />
              </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Pending Operations</p>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{selectedCompany.operations.filter(o => o.status !== 'Approved').length}</h3>
              </div>
              <div className="p-3 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-xl">
                  <RefreshCw size={24} />
              </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Compliance Risk</p>
                  <h3 className={`text-3xl font-bold ${selectedCompany.riskLevel === 'Low' ? 'text-emerald-500' : selectedCompany.riskLevel === 'Medium' ? 'text-amber-500' : 'text-red-500'}`}>
                      {selectedCompany.riskLevel}
                  </h3>
              </div>
              <div className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-xl">
                  <AlertTriangle size={24} />
              </div>
          </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col overflow-hidden min-h-[500px]">
          {/* Tabs */}
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 px-6 py-2">
               <div className="flex gap-6">
                   <button 
                       onClick={() => setActiveTab('contracts')}
                       className={`py-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'contracts' ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                   >
                       Contracts
                   </button>
                   <button 
                       onClick={() => setActiveTab('operations')}
                       className={`py-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'operations' ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                   >
                       Operations
                   </button>
                   <button 
                       onClick={() => setActiveTab('analytics')}
                       className={`py-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'analytics' ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                   >
                       Analytics
                   </button>
               </div>
               
               {activeTab === 'contracts' && (
                   <div className="flex gap-2">
                       <button className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-2">
                           <Filter size={14} /> Filter
                       </button>
                       <button className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 transition-colors shadow-sm flex items-center gap-2">
                           <Plus size={14} /> Register Contract
                       </button>
                   </div>
               )}
          </div>

          <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50 dark:bg-slate-900/50">
              
              {activeTab === 'contracts' && (
                  <div className="space-y-4">
                      {filteredContracts.length > 0 ? filteredContracts.map(contract => (
                          <div key={contract.id} className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all group relative overflow-hidden">
                              <div className={`absolute top-0 left-0 w-1 h-full ${contract.type === 'Import' ? 'bg-blue-500' : contract.type === 'Export' ? 'bg-emerald-500' : 'bg-purple-500'}`}></div>
                              
                              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 pl-3">
                                  <div>
                                      <div className="flex items-center gap-3 mb-1">
                                          <span className="text-xs font-mono text-slate-400 bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">{contract.number}</span>
                                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase border ${getStatusColor(contract.status)}`}>
                                              {contract.status}
                                          </span>
                                      </div>
                                      <h4 className="font-bold text-slate-900 dark:text-white text-lg">{contract.counterparty}</h4>
                                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                                          {contract.type} Contract • Expires: {contract.expiryDate}
                                      </p>
                                  </div>
                                  
                                  <div className="text-right">
                                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Total Amount</p>
                                      <p className="text-xl font-bold text-slate-900 dark:text-white">{formatCurrency(contract.totalAmount, contract.currency)}</p>
                                  </div>
                              </div>
                              
                              <div className="pl-3">
                                  <div className="flex justify-between text-xs mb-1.5">
                                      <span className="font-medium text-slate-600 dark:text-slate-300">Utilized: {formatCurrency(contract.utilizedAmount, contract.currency)}</span>
                                      <span className="font-bold text-indigo-600 dark:text-indigo-400">{Math.round((contract.utilizedAmount / contract.totalAmount) * 100)}%</span>
                                  </div>
                                  <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                                      <div 
                                          className={`h-full rounded-full transition-all duration-1000 ${
                                              (contract.utilizedAmount / contract.totalAmount) > 0.9 ? 'bg-amber-500' : 'bg-indigo-500'
                                          }`} 
                                          style={{ width: `${(contract.utilizedAmount / contract.totalAmount) * 100}%` }}
                                      ></div>
                                  </div>
                              </div>

                              <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 pl-3">
                                   <button className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                       View Documents
                                   </button>
                                   <button className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-lg text-xs font-bold hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors">
                                       Add Operation
                                   </button>
                              </div>
                          </div>
                      )) : (
                          <div className="text-center py-16">
                              <p className="text-slate-500 dark:text-slate-400">No contracts found.</p>
                          </div>
                      )}
                  </div>
              )}

              {activeTab === 'operations' && (
                  <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                      <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                              <thead className="bg-slate-50/50 dark:bg-slate-900/50 text-xs uppercase text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-700">
                                  <tr>
                                      <th className="p-4 pl-6">Operation Type</th>
                                      <th className="p-4">Counterparty</th>
                                      <th className="p-4">Contract Ref</th>
                                      <th className="p-4">Amount</th>
                                      <th className="p-4">Date</th>
                                      <th className="p-4">Status</th>
                                      <th className="p-4 pr-6 text-right">Actions</th>
                                  </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-sm">
                                  {filteredOperations.length > 0 ? filteredOperations.map(op => (
                                      <tr key={op.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                                          <td className="p-4 pl-6 font-medium text-slate-900 dark:text-white">
                                              {op.type}
                                          </td>
                                          <td className="p-4 text-slate-600 dark:text-slate-300">{op.counterparty}</td>
                                          <td className="p-4 text-slate-500 font-mono text-xs">{op.contractId}</td>
                                          <td className="p-4 font-bold text-slate-900 dark:text-white">{formatCurrency(op.amount, op.currency)}</td>
                                          <td className="p-4 text-slate-500">{op.date}</td>
                                          <td className="p-4">
                                              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${getStatusColor(op.status)}`}>
                                                  {op.status === 'Approved' && <CheckCircle2 size={12} />}
                                                  {op.status === 'Pending Review' && <AlertTriangle size={12} />}
                                                  {op.status}
                                              </span>
                                          </td>
                                          <td className="p-4 pr-6 text-right">
                                              {op.status === 'Requires Docs' && (
                                                  <button className="text-indigo-600 dark:text-indigo-400 text-xs font-bold hover:underline flex items-center justify-end gap-1 ml-auto">
                                                      <UploadCloud size={12} /> Upload
                                                  </button>
                                              )}
                                              {op.status === 'Pending Review' && (
                                                  <button className="text-slate-500 dark:text-slate-400 text-xs font-bold hover:text-slate-700 dark:hover:text-slate-200">
                                                      Details
                                                  </button>
                                              )}
                                          </td>
                                      </tr>
                                  )) : (
                                      <tr>
                                          <td colSpan={7} className="p-8 text-center text-slate-500 dark:text-slate-400">No operations found.</td>
                                      </tr>
                                  )}
                              </tbody>
                          </table>
                      </div>
                  </div>
              )}

              {activeTab === 'analytics' && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
                      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col">
                          <h4 className="font-bold text-slate-900 dark:text-white mb-6">Contract Types Distribution</h4>
                          <div className="flex-1 w-full min-h-[300px]">
                              <ResponsiveContainer width="100%" height="100%">
                                  <RePieChart>
                                      <Pie
                                          data={pieData}
                                          cx="50%"
                                          cy="50%"
                                          innerRadius={60}
                                          outerRadius={80}
                                          paddingAngle={5}
                                          dataKey="value"
                                      >
                                          {pieData.map((entry, index) => (
                                              <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                          ))}
                                      </Pie>
                                      <Tooltip />
                                      <Legend verticalAlign="bottom" height={36} />
                                  </RePieChart>
                              </ResponsiveContainer>
                          </div>
                      </div>

                      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col">
                          <h4 className="font-bold text-slate-900 dark:text-white mb-6">Operation Volume (Last 30 Days)</h4>
                           <div className="flex-1 w-full min-h-[300px] flex items-center justify-center text-slate-400 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
                                <p>Chart placeholder for operation volume</p>
                           </div>
                      </div>
                  </div>
              )}
          </div>
      </div>
    </div>
  );
};
