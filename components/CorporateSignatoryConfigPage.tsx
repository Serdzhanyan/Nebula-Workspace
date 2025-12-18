import React, { useState, useMemo } from 'react';
import { Search, Filter, Download, UserPlus, PenTool, CheckCircle2, XCircle, MoreHorizontal, Clock, FileSignature, ShieldCheck, Key, Eye, Trash2, ChevronDown, Check, X, Smartphone, Globe, Briefcase, Activity, Edit2, RefreshCw, Users, Shield, DollarSign, Scale } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';

interface SigningAuthority {
  id: string;
  name: string;
  role: string;
  level: 'A' | 'B' | 'C'; // A: Unlimited, B: Mid, C: Low
  limit: number;
  status: 'Active' | 'Pending' | 'Revoked';
  type: 'Sole' | 'Joint';
  lastActive: string;
  avatar: string;
  permissions: { id: string; name: string; enabled: boolean }[];
}

interface CompanySignatoryProfile {
  id: string;
  name: string;
  industry: string;
  totalSignatories: number;
  pendingReviews: number;
  highestLimit: string;
  signatories: SigningAuthority[];
}

export const CorporateSignatoryConfigPage: React.FC = () => {
  // Mock Data
  const companies: CompanySignatoryProfile[] = [
    {
      id: '1',
      name: 'TechNova Solutions Ltd.',
      industry: 'Technology',
      totalSignatories: 4,
      pendingReviews: 1,
      highestLimit: 'Unlimited',
      signatories: [
        { 
          id: 'SIG-101', 
          name: 'Sarah Jenkins', 
          role: 'Chief Executive Officer', 
          level: 'A', 
          limit: 1000000000, 
          status: 'Active', 
          type: 'Sole', 
          lastActive: 'Now', 
          avatar: 'https://picsum.photos/100/100?random=60',
          permissions: [
            { id: 'p1', name: 'Approve M&A', enabled: true },
            { id: 'p2', name: 'Open New Accounts', enabled: true },
            { id: 'p3', name: 'Treasury Movement', enabled: true }
          ]
        },
        { 
          id: 'SIG-102', 
          name: 'John Smith', 
          role: 'Chief Financial Officer', 
          level: 'A', 
          limit: 5000000, 
          status: 'Active', 
          type: 'Joint', 
          lastActive: '4h ago', 
          avatar: 'https://picsum.photos/100/100?random=61',
          permissions: [
            { id: 'p1', name: 'Approve M&A', enabled: false },
            { id: 'p2', name: 'Open New Accounts', enabled: true },
            { id: 'p3', name: 'Treasury Movement', enabled: true }
          ]
        },
        { 
          id: 'SIG-103', 
          name: 'Emily Davis', 
          role: 'Legal Counsel', 
          level: 'B', 
          limit: 500000, 
          status: 'Pending', 
          type: 'Joint', 
          lastActive: 'Yesterday', 
          avatar: 'https://picsum.photos/100/100?random=62',
          permissions: [
            { id: 'p1', name: 'Approve M&A', enabled: false },
            { id: 'p2', name: 'Open New Accounts', enabled: false },
            { id: 'p3', name: 'Treasury Movement', enabled: false }
          ]
        }
      ]
    },
    {
      id: '2',
      name: 'GreenLeaf Logistics',
      industry: 'Logistics',
      totalSignatories: 2,
      pendingReviews: 0,
      highestLimit: '$2.5M',
      signatories: [
        { 
          id: 'SIG-201', 
          name: 'Michael Chen', 
          role: 'Director of Operations', 
          level: 'A', 
          limit: 2500000, 
          status: 'Active', 
          type: 'Sole', 
          lastActive: '1d ago', 
          avatar: 'https://picsum.photos/100/100?random=63',
          permissions: [{ id: 'p1', name: 'Fleet Purchase', enabled: true }]
        }
      ]
    },
    {
      id: '3',
      name: 'Quantum Dynamics',
      industry: 'Manufacturing',
      totalSignatories: 1,
      pendingReviews: 2,
      highestLimit: '$10M',
      signatories: []
    }
  ];

  const [selectedCompany, setSelectedCompany] = useState<CompanySignatoryProfile>(companies[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filterLevel, setFilterLevel] = useState("All");
  const [selectedSignatory, setSelectedSignatory] = useState<SigningAuthority | null>(companies[0].signatories[0] || null);

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSignatories = useMemo(() => {
    return selectedCompany.signatories.filter(s => 
      filterLevel === 'All' || s.level === filterLevel
    );
  }, [selectedCompany, filterLevel]);

  const handleSelectCompany = (company: CompanySignatoryProfile) => {
    setSelectedCompany(company);
    setSearchTerm("");
    setShowDropdown(false);
    setSelectedSignatory(company.signatories.length > 0 ? company.signatories[0] : null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
      case 'Pending': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800';
      case 'Revoked': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const formatCurrency = (val: number) => {
      if (val >= 1000000000) return 'Unlimited';
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact' }).format(val);
  };

  const limitChartData = selectedCompany.signatories.map(s => ({
      name: s.name.split(' ')[0],
      limit: s.limit > 10000000 ? 10000000 : s.limit // Capped for visualization
  }));

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-2 space-y-6">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileSignature className="text-indigo-500" /> Signatory Configuration
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
             Manage authorized signers, signing hierarchies, and financial mandate limits.
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto relative z-20">
            <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search company or signatory..." 
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
                                            <p className="text-xs text-slate-500">{comp.industry} • {comp.totalSignatories} Signers</p>
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
                <UserPlus size={18} /> Add Signatory
            </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Total Signers</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedCompany.totalSignatories}</h3>
              <p className="text-xs text-emerald-500 font-medium mt-1 flex items-center gap-1"><Activity size={12}/> Mandate Active</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Pending Reviews</p>
              <h3 className={`text-2xl font-bold ${selectedCompany.pendingReviews > 0 ? 'text-amber-500' : 'text-slate-900 dark:text-white'}`}>{selectedCompany.pendingReviews}</h3>
              <p className="text-xs text-slate-400 mt-1">Updates requiring audit</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Highest Authority</p>
              <h3 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{selectedCompany.highestLimit}</h3>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1"><ShieldCheck size={12}/> Level A Clear</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Corporate Mandate</p>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white truncate">Joint / Sole Mixed</h3>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1"><Scale size={12}/> Legal Compliant</p>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
          
          {/* Left Column: Signatory Directory */}
          <div className="lg:col-span-2 flex flex-col gap-4 overflow-y-auto pr-2 pb-10">
              <div className="flex justify-between items-center mb-2 px-1">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">Authorized List</h3>
                  <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                      {['All', 'A', 'B', 'C'].map(level => (
                          <button
                            key={level}
                            onClick={() => setFilterLevel(level)}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                filterLevel === level 
                                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-sm' 
                                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                            }`}
                          >
                              {level === 'All' ? 'All Levels' : `Level ${level}`}
                          </button>
                      ))}
                  </div>
              </div>

              {filteredSignatories.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                      {filteredSignatories.map(sig => (
                          <div 
                            key={sig.id} 
                            onClick={() => setSelectedSignatory(sig)}
                            className={`bg-white dark:bg-slate-900 p-5 rounded-2xl border transition-all cursor-pointer group hover:shadow-md relative overflow-hidden ${
                                selectedSignatory?.id === sig.id 
                                ? 'border-indigo-500 ring-1 ring-indigo-500 shadow-md' 
                                : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700'
                            }`}
                          >
                              <div className="flex justify-between items-start mb-4">
                                  <div className="flex items-center gap-3">
                                      <img src={sig.avatar} className="w-12 h-12 rounded-xl object-cover border border-slate-100 dark:border-slate-800 shadow-sm" alt={sig.name} />
                                      <div>
                                          <h4 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{sig.name}</h4>
                                          <p className="text-xs text-slate-500 font-medium mt-0.5">{sig.role}</p>
                                      </div>
                                  </div>
                                  <div className="flex flex-col items-end gap-2">
                                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${getStatusColor(sig.status)}`}>
                                          {sig.status}
                                      </span>
                                      <span className="text-[10px] font-bold bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded border border-indigo-100 dark:border-indigo-900/30 uppercase">Level {sig.level} Authority</span>
                                  </div>
                              </div>

                              <div className="flex justify-between items-end">
                                  <div className="text-xs text-slate-500 space-y-1">
                                      <p>Signature Type: <span className="font-bold text-slate-700 dark:text-slate-300">{sig.type} Mandate</span></p>
                                      <div className="flex items-center gap-2 mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                         <Clock size={12} /> Last action {sig.lastActive}
                                      </div>
                                  </div>
                                  <div className="text-right">
                                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">Signing Limit</p>
                                      <p className="text-xl font-bold text-slate-900 dark:text-white">
                                          {formatCurrency(sig.limit)}
                                      </p>
                                  </div>
                              </div>
                          </div>
                      ))}
                  </div>
              ) : (
                  <div className="text-center py-16 text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                      <ShieldCheck size={48} className="mx-auto mb-2 opacity-30" />
                      <p className="font-medium">No signatories found for this filter.</p>
                  </div>
              )}
          </div>

          {/* Right Column: Mandate Details */}
          <div className="space-y-6">
              {selectedSignatory ? (
                  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col h-full animate-in slide-in-from-right duration-300">
                      <div className="flex justify-between items-start mb-6">
                          <div>
                              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Mandate Detail</h3>
                              <p className="text-xs text-slate-500">ID: {selectedSignatory.id}</p>
                          </div>
                          <button onClick={() => setSelectedSignatory(null)} className="md:hidden text-slate-400 p-1 hover:bg-slate-100 rounded-lg transition-colors"><X size={20} /></button>
                      </div>

                      <div className="space-y-6 flex-1">
                          {/* Limit Overview Visual */}
                          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 flex flex-col gap-4 shadow-inner overflow-hidden relative">
                                <div className="flex justify-between items-center relative z-10">
                                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide">Comparative Limits</h4>
                                    <span className="text-[10px] font-bold text-indigo-500 flex items-center gap-1">Group Exposure</span>
                                </div>
                                <div className="h-40 w-full relative z-10">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={limitChartData}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.3} />
                                            <XAxis dataKey="name" hide />
                                            <YAxis hide />
                                            <Bar dataKey="limit" radius={[4, 4, 0, 0]} fill="#6366f1">
                                                {limitChartData.map((entry, index) => (
                                                    <Cell key={index} fill={entry.name === selectedSignatory.name.split(' ')[0] ? '#6366f1' : '#e2e8f0'} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                          </div>

                          {/* Specific Functional Permissions */}
                          <div>
                              <div className="flex justify-between items-center mb-3 px-1">
                                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Functional Rights</h4>
                              </div>
                              <div className="space-y-2">
                                  {selectedSignatory.permissions.map(perm => (
                                      <div key={perm.id} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800/50 hover:border-indigo-200 transition-colors shadow-sm">
                                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{perm.name}</span>
                                          {perm.enabled ? <CheckCircle2 size={16} className="text-emerald-500" /> : <XCircle size={16} className="text-slate-300" />}
                                      </div>
                                  ))}
                              </div>
                          </div>

                          {/* Security Tier */}
                          <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-900/40">
                               <div className="flex items-center justify-between mb-2">
                                   <div className="flex items-center gap-2">
                                       <Shield size={16} className="text-indigo-600 dark:text-indigo-400" />
                                       <span className="text-xs font-bold text-indigo-900 dark:text-indigo-200">Auth Method</span>
                                   </div>
                                   <span className="text-[10px] font-bold text-emerald-600 uppercase">Hardware Key</span>
                               </div>
                               <p className="text-xs text-indigo-700 dark:text-indigo-300 leading-relaxed">
                                   Operations above $50k require physical YubiKey validation and mobile push confirmation.
                               </p>
                          </div>

                          {/* Action Bar */}
                          <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-700 space-y-3">
                              <div className="grid grid-cols-2 gap-3">
                                  <button className="py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all active:scale-95 shadow-sm flex items-center justify-center gap-2">
                                      <Edit2 size={16} /> Edit Limits
                                  </button>
                                  <button className="py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95 shadow-sm">
                                      View Audit Log
                                  </button>
                              </div>
                              <button className="w-full py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-sm">
                                  <RefreshCw size={16} /> Re-verify Identity
                              </button>
                              <button className="w-full py-2.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm font-bold hover:bg-red-100 dark:hover:bg-red-900/40 transition-all active:scale-95 flex items-center justify-center gap-2 border border-red-100 dark:border-red-900/30">
                                  <XCircle size={16} /> Revoke Authority
                              </button>
                          </div>
                      </div>
                  </div>
              ) : (
                  <div className="bg-slate-50 dark:bg-slate-900/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 p-8 flex flex-col items-center justify-center text-center h-full text-slate-400">
                      <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-800 mb-4 opacity-50 shadow-inner">
                        <PenTool size={48} />
                      </div>
                      <p className="font-medium">Select a signatory to manage authority and limits</p>
                      <p className="text-xs mt-1">Financial mandate rules and rights will appear here.</p>
                  </div>
              )}
          </div>
      </div>
    </div>
  );
};
