
import React, { useState } from 'react';
import { Search, Filter, Download, Plus, Landmark, Lock, Shield, Clock, CheckCircle2, AlertTriangle, FileText, ArrowRight, DollarSign, Briefcase, RefreshCw, X, ChevronRight } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

interface AccountCondition {
  id: string;
  description: string;
  status: 'Met' | 'Pending';
  dateMet?: string;
}

interface SpecialAccount {
  id: string;
  name: string;
  accountNumber: string;
  type: 'Escrow' | 'Trust' | 'Security Deposit' | 'Blocked' | 'Merchant Settlement';
  currency: string;
  balance: number;
  status: 'Active' | 'Frozen' | 'Closing' | 'Pending Release';
  purpose: string;
  beneficiary?: string;
  releaseDate?: string;
  conditions?: AccountCondition[];
  interestRate?: string;
}

interface CompanySpecialProfile {
  id: string;
  name: string;
  industry: string;
  totalSpecialBalance: number;
  activeEscrows: number;
  accounts: SpecialAccount[];
}

export const CorporateSpecialAccountsPage: React.FC = () => {
  // Mock Data
  const companies: CompanySpecialProfile[] = [
    {
      id: '1',
      name: 'TechNova Solutions Ltd.',
      industry: 'Technology',
      totalSpecialBalance: 3250000,
      activeEscrows: 1,
      accounts: [
        { 
          id: 'SA-001', 
          name: 'M&A Escrow - Project Alpha', 
          accountNumber: 'ESC-9921001', 
          type: 'Escrow', 
          currency: 'USD', 
          balance: 2500000, 
          status: 'Active', 
          purpose: 'Merger acquisition holdback funds',
          beneficiary: 'StartUp Inc. Shareholders',
          releaseDate: 'Dec 31, 2024',
          conditions: [
            { id: 'c1', description: 'Regulatory Approval', status: 'Met', dateMet: 'Oct 15, 2024' },
            { id: 'c2', description: 'Final Audit Sign-off', status: 'Pending' }
          ]
        },
        { 
          id: 'SA-002', 
          name: 'Employee Benefit Trust', 
          accountNumber: 'TRT-8812002', 
          type: 'Trust', 
          currency: 'USD', 
          balance: 750000, 
          status: 'Active', 
          purpose: 'Annual employee profit sharing pool',
          interestRate: '4.2%'
        }
      ]
    },
    {
      id: '2',
      name: 'GreenLeaf Logistics',
      industry: 'Logistics',
      totalSpecialBalance: 150000,
      activeEscrows: 0,
      accounts: [
        { 
          id: 'SA-003', 
          name: 'Customs Guarantee Fund', 
          accountNumber: 'BLK-7711003', 
          type: 'Blocked', 
          currency: 'EUR', 
          balance: 150000, 
          status: 'Frozen', 
          purpose: 'Collateral for import duties',
          releaseDate: 'Indefinite'
        }
      ]
    },
    {
      id: '3',
      name: 'Quantum Dynamics',
      industry: 'Manufacturing',
      totalSpecialBalance: 500000,
      activeEscrows: 0,
      accounts: [
         { 
          id: 'SA-004', 
          name: 'Lease Security Deposit', 
          accountNumber: 'SEC-1122004', 
          type: 'Security Deposit', 
          currency: 'USD', 
          balance: 500000, 
          status: 'Active', 
          purpose: 'Factory premise security deposit',
          beneficiary: 'Industrial Real Estate Corp'
        }
      ]
    }
  ];

  const [selectedCompany, setSelectedCompany] = useState<CompanySpecialProfile>(companies[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<SpecialAccount | null>(companies[0].accounts[0] || null);

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCompany = (company: CompanySpecialProfile) => {
    setSelectedCompany(company);
    setSearchTerm("");
    setShowDropdown(false);
    setSelectedAccount(company.accounts.length > 0 ? company.accounts[0] : null);
  };

  const formatCurrency = (val: number, currency: string) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency, maximumFractionDigits: 0 }).format(val);
  };

  const getStatusColor = (status: string) => {
      switch(status) {
          case 'Active': return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800';
          case 'Pending Release': return 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800';
          case 'Frozen': 
          case 'Blocked': return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800';
          case 'Closing': return 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600';
          default: return 'bg-slate-100 text-slate-700';
      }
  };

  const getTypeIcon = (type: string) => {
      switch(type) {
          case 'Escrow': return <Shield size={18} />;
          case 'Trust': return <Briefcase size={18} />;
          case 'Blocked': return <Lock size={18} />;
          case 'Security Deposit': return <Landmark size={18} />;
          default: return <FileText size={18} />;
      }
  };

  // Pie Chart Data for Types
  const typeData = [
      { name: 'Escrow', value: selectedCompany.accounts.filter(a => a.type === 'Escrow').length, color: '#6366f1' },
      { name: 'Trust', value: selectedCompany.accounts.filter(a => a.type === 'Trust').length, color: '#10b981' },
      { name: 'Blocked', value: selectedCompany.accounts.filter(a => a.type === 'Blocked').length, color: '#ef4444' },
      { name: 'Other', value: selectedCompany.accounts.filter(a => !['Escrow', 'Trust', 'Blocked'].includes(a.type)).length, color: '#f59e0b' },
  ].filter(d => d.value > 0);

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-2 space-y-6">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Landmark className="text-indigo-500" /> Special Accounts
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
             Manage Escrow, Trust, Blocked, and other special purpose accounts.
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
            
            <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 dark:shadow-none">
                <Plus size={18} /> Open Special Account
            </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Total Restricted Liquidity</p>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{formatCurrency(selectedCompany.totalSpecialBalance, 'USD')}</h3>
              </div>
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl">
                  <Lock size={24} />
              </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Active Escrows</p>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{selectedCompany.activeEscrows}</h3>
              </div>
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl">
                  <Shield size={24} />
              </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Blocked Funds</p>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
                      {formatCurrency(selectedCompany.accounts.filter(a => a.type === 'Blocked').reduce((acc, curr) => acc + curr.balance, 0), 'USD')}
                  </h3>
              </div>
              <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl">
                  <AlertTriangle size={24} />
              </div>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
          
          {/* Left Column: Account List */}
          <div className="lg:col-span-2 flex flex-col gap-4 overflow-y-auto pr-2">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">Accounts Overview</h3>
              
              {selectedCompany.accounts.length > 0 ? selectedCompany.accounts.map(account => (
                  <div 
                    key={account.id} 
                    onClick={() => setSelectedAccount(account)}
                    className={`bg-white dark:bg-slate-900 p-5 rounded-2xl border transition-all cursor-pointer group hover:shadow-md ${
                        selectedAccount?.id === account.id 
                        ? 'border-indigo-500 ring-1 ring-indigo-500 shadow-md' 
                        : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700'
                    }`}
                  >
                      <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                              <div className={`p-2.5 rounded-xl ${
                                  account.type === 'Escrow' ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400' :
                                  account.type === 'Blocked' ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400' :
                                  'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                              }`}>
                                  {getTypeIcon(account.type)}
                              </div>
                              <div>
                                  <h4 className="font-bold text-slate-900 dark:text-white">{account.name}</h4>
                                  <p className="text-xs text-slate-500 font-mono">{account.accountNumber}</p>
                              </div>
                          </div>
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase border ${getStatusColor(account.status)}`}>
                              {account.status}
                          </span>
                      </div>
                      
                      <div className="flex justify-between items-end">
                          <div className="text-xs text-slate-500 space-y-1">
                              <p>Type: <span className="font-medium text-slate-700 dark:text-slate-300">{account.type}</span></p>
                              {account.releaseDate && <p>Release: <span className="font-medium text-slate-700 dark:text-slate-300">{account.releaseDate}</span></p>}
                          </div>
                          <div className="text-right">
                              <p className="text-2xl font-bold text-slate-900 dark:text-white">{formatCurrency(account.balance, account.currency)}</p>
                              {account.interestRate && <p className="text-xs text-emerald-600 font-medium">+{account.interestRate} APR</p>}
                          </div>
                      </div>
                  </div>
              )) : (
                  <div className="text-center py-16 text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                      <Landmark size={32} className="mx-auto mb-2 opacity-50" />
                      <p className="font-medium">No special accounts found.</p>
                  </div>
              )}
          </div>

          {/* Right Column: Details & Actions */}
          <div className="space-y-6">
              {selectedAccount ? (
                  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col h-full animate-in slide-in-from-right duration-300">
                      <div className="flex justify-between items-start mb-6">
                          <h3 className="font-bold text-lg text-slate-900 dark:text-white">Account Details</h3>
                          <button onClick={() => setSelectedAccount(null)} className="md:hidden text-slate-400"><X size={20} /></button>
                      </div>

                      <div className="space-y-6 flex-1">
                          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700">
                              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Purpose</p>
                              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{selectedAccount.purpose}</p>
                          </div>

                          {selectedAccount.beneficiary && (
                              <div>
                                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Beneficiary</p>
                                  <div className="flex items-center gap-2 text-sm font-medium text-slate-900 dark:text-white">
                                      <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-xs text-indigo-600 dark:text-indigo-400 font-bold">
                                          {selectedAccount.beneficiary.charAt(0)}
                                      </div>
                                      {selectedAccount.beneficiary}
                                  </div>
                              </div>
                          )}

                          {selectedAccount.conditions && selectedAccount.conditions.length > 0 && (
                              <div>
                                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Release Conditions</p>
                                  <div className="space-y-3">
                                      {selectedAccount.conditions.map(cond => (
                                          <div key={cond.id} className="flex items-center justify-between p-3 border border-slate-100 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800">
                                              <span className="text-sm text-slate-700 dark:text-slate-300">{cond.description}</span>
                                              {cond.status === 'Met' ? (
                                                  <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-full border border-emerald-100 dark:border-emerald-900/30">
                                                      <CheckCircle2 size={10} /> Met
                                                  </span>
                                              ) : (
                                                  <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded-full border border-amber-100 dark:border-amber-900/30">
                                                      <Clock size={10} /> Pending
                                                  </span>
                                              )}
                                          </div>
                                      ))}
                                  </div>
                              </div>
                          )}
                          
                          {/* Actions */}
                          <div className="grid grid-cols-2 gap-3 mt-auto pt-6 border-t border-slate-100 dark:border-slate-700">
                              <button className="py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm">
                                  Deposit Funds
                              </button>
                              <button className="py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                  View Statement
                              </button>
                              {selectedAccount.status !== 'Frozen' && (
                                  <button className="col-span-2 py-2.5 border border-indigo-200 dark:border-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-xl text-sm font-bold hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors">
                                      Release / Transfer Funds
                                  </button>
                              )}
                          </div>
                      </div>
                  </div>
              ) : (
                  <div className="bg-slate-50 dark:bg-slate-900/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 p-8 flex flex-col items-center justify-center text-center h-full text-slate-400">
                      <FileText size={48} className="mb-4 opacity-20" />
                      <p className="font-medium">Select an account to view details</p>
                  </div>
              )}
          </div>
      </div>
    </div>
  );
};
