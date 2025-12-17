

import React, { useState } from 'react';
import { Search, Filter, Download, Shield, FileSignature, Users, CheckCircle2, AlertCircle, XCircle, Plus, MoreHorizontal, FileText, Calendar, PenTool, Eye, Trash2, Check, ChevronDown, Lock } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

interface POA {
  id: string;
  grantor: string;
  attorney: string;
  type: 'General' | 'Limited' | 'Durable' | 'Springing';
  status: 'Active' | 'Revoked' | 'Expired' | 'Pending';
  effectiveDate: string;
  expirationDate: string;
  scope: string[];
  documentUrl?: string;
}

interface Signatory {
  id: string;
  name: string;
  role: string;
  authLevel: 'A' | 'B' | 'C'; // A = Unlimited, B = < $100k, C = < $10k
  signingLimit: string;
  status: 'Active' | 'Suspended' | 'Pending';
  type: 'Sole' | 'Joint';
  avatar: string;
  lastActive: string;
}

interface CompanyPOAProfile {
  id: string;
  name: string;
  industry: string;
  poas: POA[];
  signatories: Signatory[];
}

export const CorporatePOAPage: React.FC = () => {
  // Mock Data
  const companies: CompanyPOAProfile[] = [
    {
      id: '1',
      name: 'TechNova Solutions Ltd.',
      industry: 'Technology',
      poas: [
        { id: 'POA-101', grantor: 'Sarah Jenkins (CEO)', attorney: 'Marcus Thorne (CTO)', type: 'General', status: 'Active', effectiveDate: 'Jan 01, 2024', expirationDate: 'Dec 31, 2025', scope: ['Banking', 'Contracts', 'Real Estate'] },
        { id: 'POA-102', grantor: 'Sarah Jenkins (CEO)', attorney: 'Emily Davis (Legal)', type: 'Limited', status: 'Active', effectiveDate: 'Mar 15, 2024', expirationDate: 'Mar 15, 2025', scope: ['Intellectual Property Filings'] },
        { id: 'POA-103', grantor: 'Board of Directors', attorney: 'John Smith (CFO)', type: 'Durable', status: 'Expired', effectiveDate: 'Jan 01, 2023', expirationDate: 'Jan 01, 2024', scope: ['Financial Audits'] }
      ],
      signatories: [
        { id: 'SIG-1', name: 'Sarah Jenkins', role: 'CEO', authLevel: 'A', signingLimit: 'Unlimited', status: 'Active', type: 'Sole', avatar: 'https://picsum.photos/100/100?random=1', lastActive: '2 hours ago' },
        { id: 'SIG-2', name: 'John Smith', role: 'CFO', authLevel: 'A', signingLimit: '$5,000,000', status: 'Active', type: 'Joint', avatar: 'https://picsum.photos/100/100?random=2', lastActive: '1 day ago' },
        { id: 'SIG-3', name: 'Marcus Thorne', role: 'CTO', authLevel: 'B', signingLimit: '$500,000', status: 'Active', type: 'Sole', avatar: 'https://picsum.photos/100/100?random=3', lastActive: '3 days ago' },
      ]
    },
    {
      id: '2',
      name: 'GreenLeaf Logistics',
      industry: 'Logistics',
      poas: [
        { id: 'POA-201', grantor: 'Michael Chen (Owner)', attorney: 'David Wilson (Ops)', type: 'Limited', status: 'Active', effectiveDate: 'Jun 01, 2024', expirationDate: 'Jun 01, 2025', scope: ['Vehicle Registration', 'Customs Clearance'] },
        { id: 'POA-202', grantor: 'Michael Chen (Owner)', attorney: 'Legal Firm X', type: 'Springing', status: 'Pending', effectiveDate: 'TBD', expirationDate: 'TBD', scope: ['Litigation Defense'] }
      ],
      signatories: [
        { id: 'SIG-4', name: 'Michael Chen', role: 'Director', authLevel: 'A', signingLimit: 'Unlimited', status: 'Active', type: 'Sole', avatar: 'https://picsum.photos/100/100?random=4', lastActive: '5 hours ago' },
        { id: 'SIG-5', name: 'Lisa Ray', role: 'Finance Mgr', authLevel: 'C', signingLimit: '$50,000', status: 'Suspended', type: 'Joint', avatar: 'https://picsum.photos/100/100?random=5', lastActive: '1 month ago' }
      ]
    },
    {
      id: '3',
      name: 'Quantum Dynamics',
      industry: 'Manufacturing',
      poas: [],
      signatories: [
        { id: 'SIG-6', name: 'Robert Ford', role: 'Chairman', authLevel: 'A', signingLimit: 'Unlimited', status: 'Active', type: 'Joint', avatar: 'https://picsum.photos/100/100?random=6', lastActive: '1 week ago' }
      ]
    }
  ];

  const [selectedCompany, setSelectedCompany] = useState<CompanyPOAProfile>(companies[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState<'poa' | 'signatories'>('poa');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPOAType, setNewPOAType] = useState('General');

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCompany = (company: CompanyPOAProfile) => {
    setSelectedCompany(company);
    setSearchTerm("");
    setShowDropdown(false);
  };

  const handleRevokePOA = (id: string) => {
      if(window.confirm('Are you sure you want to revoke this Power of Attorney? This action cannot be undone.')) {
          const updatedPOAs = selectedCompany.poas.map(p => 
              p.id === id ? { ...p, status: 'Revoked' as const } : p
          );
          setSelectedCompany({ ...selectedCompany, poas: updatedPOAs });
      }
  };

  const handleAddPOA = (e: React.FormEvent) => {
      e.preventDefault();
      const newPOA: POA = {
          id: `POA-${Date.now().toString().slice(-4)}`,
          grantor: 'CEO',
          attorney: 'New Attorney',
          type: newPOAType as any,
          status: 'Active',
          effectiveDate: new Date().toLocaleDateString(),
          expirationDate: 'One Year Later',
          scope: ['General Administration']
      };
      setSelectedCompany({ ...selectedCompany, poas: [newPOA, ...selectedCompany.poas] });
      setIsModalOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800';
      case 'Pending': return 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800';
      case 'Revoked': return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800';
      case 'Expired': return 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  // Pie Chart Data
  const poaStatusData = [
      { name: 'Active', value: selectedCompany.poas.filter(p => p.status === 'Active').length, color: '#10b981' },
      { name: 'Revoked/Expired', value: selectedCompany.poas.filter(p => p.status === 'Revoked' || p.status === 'Expired').length, color: '#ef4444' },
      { name: 'Pending', value: selectedCompany.poas.filter(p => p.status === 'Pending').length, color: '#f59e0b' },
  ].filter(d => d.value > 0);

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-2 space-y-6">
      
      {/* Add Modal */}
      {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setIsModalOpen(false)}>
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md p-6 border border-slate-200 dark:border-slate-700" onClick={e => e.stopPropagation()}>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Grant Power of Attorney</h3>
                  <form onSubmit={handleAddPOA} className="space-y-4">
                      <div>
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1.5">Type</label>
                          <select 
                             value={newPOAType}
                             onChange={(e) => setNewPOAType(e.target.value)}
                             className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                          >
                              <option>General</option>
                              <option>Limited</option>
                              <option>Durable</option>
                              <option>Springing</option>
                          </select>
                      </div>
                      <div>
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1.5">Attorney-in-Fact</label>
                          <input type="text" placeholder="Full Name" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
                      </div>
                      <button type="submit" className="w-full py-2.5 bg-indigo-600 text-white rounded-lg font-bold text-sm hover:bg-indigo-700 transition-colors">Generate & Sign</button>
                  </form>
              </div>
          </div>
      )}

      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileSignature className="text-indigo-500" /> Powers of Attorney & Signatories
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
             Manage legal authority delegation and authorized signers.
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto relative z-20">
            <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search company profile..." 
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
            
            <button className="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">
                <Download size={18} />
            </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Active POAs</p>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{selectedCompany.poas.filter(p => p.status === 'Active').length}</h3>
              </div>
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl">
                  <Shield size={24} />
              </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Authorized Signers</p>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{selectedCompany.signatories.filter(s => s.status === 'Active').length}</h3>
              </div>
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl">
                  <PenTool size={24} />
              </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Pending Actions</p>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
                      {selectedCompany.poas.filter(p => p.status === 'Pending').length + selectedCompany.signatories.filter(s => s.status === 'Pending').length}
                  </h3>
              </div>
              <div className="p-3 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-xl">
                  <AlertCircle size={24} />
              </div>
          </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-fit">
          <button 
            onClick={() => setActiveTab('poa')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'poa' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
          >
            <Shield size={16} /> Powers of Attorney
          </button>
          <button 
            onClick={() => setActiveTab('signatories')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'signatories' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
          >
            <Users size={16} /> Authorized Signatories
          </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 overflow-hidden flex flex-col">
          
          {activeTab === 'poa' && (
              <div className="flex-1 flex flex-col animate-in fade-in slide-in-from-bottom-2">
                  <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">{selectedCompany.name} - POA Registry</h3>
                      <button 
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm"
                      >
                          <Plus size={16} /> Grant New POA
                      </button>
                  </div>
                  
                  <div className="flex flex-col xl:flex-row gap-8 flex-1 min-h-0">
                      {/* List */}
                      <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                          {selectedCompany.poas.length > 0 ? (
                              selectedCompany.poas.map(poa => (
                                  <div key={poa.id} className="p-5 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors shadow-sm">
                                      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                                          <div className="flex items-start gap-3">
                                              <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500 mt-1">
                                                  <FileText size={20} />
                                              </div>
                                              <div>
                                                  <div className="flex items-center gap-2">
                                                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">{poa.type} Power of Attorney</h4>
                                                      <span className="text-xs text-slate-500 font-mono bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">{poa.id}</span>
                                                  </div>
                                                  <div className="text-xs text-slate-500 mt-1 space-y-0.5">
                                                      <p>Grantor: <span className="font-medium text-slate-700 dark:text-slate-300">{poa.grantor}</span></p>
                                                      <p>Attorney: <span className="font-medium text-slate-700 dark:text-slate-300">{poa.attorney}</span></p>
                                                  </div>
                                              </div>
                                          </div>
                                          <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase border ${getStatusColor(poa.status)}`}>
                                              {poa.status}
                                          </span>
                                      </div>
                                      
                                      <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                                          <div>
                                              <span className="text-slate-400 block mb-0.5">Effective Date</span>
                                              <span className="font-medium text-slate-800 dark:text-slate-200">{poa.effectiveDate}</span>
                                          </div>
                                          <div>
                                              <span className="text-slate-400 block mb-0.5">Expiration Date</span>
                                              <span className="font-medium text-slate-800 dark:text-slate-200">{poa.expirationDate}</span>
                                          </div>
                                          <div className="col-span-2">
                                              <span className="text-slate-400 block mb-0.5">Scope</span>
                                              <div className="flex flex-wrap gap-1">
                                                  {poa.scope.map((s, i) => (
                                                      <span key={i} className="px-1.5 py-0.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-600 dark:text-slate-300">{s}</span>
                                                  ))}
                                              </div>
                                          </div>
                                      </div>

                                      <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-700">
                                          <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors">
                                              <Eye size={14} /> View Document
                                          </button>
                                          {poa.status === 'Active' && (
                                              <button 
                                                  onClick={() => handleRevokePOA(poa.id)}
                                                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                              >
                                                  <Trash2 size={14} /> Revoke
                                              </button>
                                          )}
                                      </div>
                                  </div>
                              ))
                          ) : (
                              <div className="flex flex-col items-center justify-center h-64 text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl">
                                  <Shield size={48} className="mb-4 opacity-20" />
                                  <p className="font-medium">No POA records found.</p>
                              </div>
                          )}
                      </div>

                      {/* Chart */}
                      <div className="w-full xl:w-80 shrink-0">
                          <div className="bg-slate-50 dark:bg-slate-900/30 p-4 rounded-xl border border-slate-100 dark:border-slate-700 h-64 flex flex-col">
                              <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-4">Status Distribution</h4>
                              <div className="flex-1 w-full min-h-0">
                                  <ResponsiveContainer width="100%" height="100%">
                                      <PieChart>
                                          <Pie
                                              data={poaStatusData}
                                              cx="50%"
                                              cy="50%"
                                              innerRadius={40}
                                              outerRadius={70}
                                              paddingAngle={5}
                                              dataKey="value"
                                          >
                                              {poaStatusData.map((entry, index) => (
                                                  <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                              ))}
                                          </Pie>
                                          <Tooltip />
                                          <Legend verticalAlign="bottom" height={36} iconType="circle" iconSize={8} wrapperStyle={{fontSize: '11px'}} />
                                      </PieChart>
                                  </ResponsiveContainer>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          )}

          {activeTab === 'signatories' && (
              <div className="flex-1 flex flex-col animate-in fade-in slide-in-from-bottom-2">
                   <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">{selectedCompany.name} - Authorized Signatories</h3>
                      <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm">
                          <Plus size={16} /> Add Signatory
                      </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 overflow-y-auto pr-2 pb-4">
                      {selectedCompany.signatories.map(sig => (
                          <div key={sig.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-5 hover:shadow-md transition-shadow relative group">
                              {sig.status === 'Suspended' && <div className="absolute inset-0 bg-white/50 dark:bg-slate-900/50 backdrop-blur-[1px] z-10 rounded-xl flex items-center justify-center"><span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold shadow-sm">SUSPENDED</span></div>}
                              
                              <div className="flex items-center gap-4 mb-4">
                                  <img src={sig.avatar} alt={sig.name} className="w-12 h-12 rounded-full border-2 border-slate-100 dark:border-slate-700" />
                                  <div>
                                      <h4 className="font-bold text-slate-900 dark:text-white">{sig.name}</h4>
                                      <p className="text-xs text-slate-500">{sig.role}</p>
                                  </div>
                                  <button className="ml-auto p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors self-start">
                                      <MoreHorizontal size={16} />
                                  </button>
                              </div>

                              <div className="space-y-3">
                                  <div className="flex justify-between items-center text-sm">
                                      <span className="text-slate-500">Signing Limit</span>
                                      <span className="font-bold text-indigo-600 dark:text-indigo-400">{sig.signingLimit}</span>
                                  </div>
                                  <div className="flex justify-between items-center text-sm">
                                      <span className="text-slate-500">Authority Level</span>
                                      <span className="font-mono bg-slate-100 dark:bg-slate-800 px-2 rounded text-xs font-bold">{sig.authLevel}</span>
                                  </div>
                                  <div className="flex justify-between items-center text-sm">
                                      <span className="text-slate-500">Requirement</span>
                                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${sig.type === 'Sole' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' : 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400'}`}>
                                          {sig.type} Signature
                                      </span>
                                  </div>
                              </div>

                              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center text-xs">
                                  <span className="text-slate-400">Last active: {sig.lastActive}</span>
                                  <button className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">View Log</button>
                              </div>
                          </div>
                      ))}
                      {selectedCompany.signatories.length === 0 && (
                          <div className="col-span-full py-16 text-center text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl">
                              <Users size={32} className="mx-auto mb-2 opacity-50" />
                              <p>No authorized signatories found.</p>
                          </div>
                      )}
                  </div>
              </div>
          )}
      </div>
    </div>
  );
};
