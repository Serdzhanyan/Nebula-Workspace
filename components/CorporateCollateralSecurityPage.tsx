
import React, { useState, useMemo } from 'react';
import { Search, Filter, Download, ShieldCheck, CheckCircle2, AlertTriangle, Scale, Building2, Landmark, FileText, Plus, ChevronDown, Check, Eye, Trash2, DollarSign, Activity, Lock, RefreshCw, X, FileSignature, Network, PieChart as PieChartIcon } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

interface CollateralAsset {
  id: string;
  name: string;
  type: 'Real Estate' | 'Securities' | 'Equipment' | 'Inventory' | 'Cash';
  valuation: number;
  loanToValue: number;
  status: 'Appraised' | 'Pending Appraisal' | 'Released' | 'Lien Active';
  lastAppraisal: string;
  description: string;
}

interface Guarantee {
  id: string;
  type: 'Bank Guarantee' | 'Letter of Credit' | 'Surety Bond';
  beneficiary: string;
  amount: number;
  currency: string;
  expiryDate: string;
  status: 'Active' | 'Pending' | 'Expired' | 'Claimed';
}

interface CompanySecurityProfile {
  id: string;
  name: string;
  industry: string;
  totalCollateralValue: number;
  totalGuaranteeExposure: number;
  assets: CollateralAsset[];
  guarantees: Guarantee[];
}

export const CorporateCollateralSecurityPage: React.FC = () => {
  // Mock Data
  const companies: CompanySecurityProfile[] = [
    {
      id: '1',
      name: 'TechNova Solutions Ltd.',
      industry: 'Technology',
      totalCollateralValue: 5500000,
      totalGuaranteeExposure: 1200000,
      assets: [
        { id: 'A1', name: 'HQ Building - Block A', type: 'Real Estate', valuation: 3500000, loanToValue: 60, status: 'Lien Active', lastAppraisal: 'Jan 15, 2024', description: 'Primary office building in San Francisco Tech Park.' },
        { id: 'A2', name: 'Server Infrastructure Pool', type: 'Equipment', valuation: 1200000, loanToValue: 40, status: 'Appraised', lastAppraisal: 'Jun 10, 2024', description: 'High-density GPU clusters and networking hardware.' },
        { id: 'A3', name: 'Treasury Securities', type: 'Securities', valuation: 800000, loanToValue: 90, status: 'Lien Active', lastAppraisal: 'Oct 20, 2024', description: 'US Treasury Bonds held as collateral for revolving line.' },
      ],
      guarantees: [
        { id: 'G1', type: 'Bank Guarantee', beneficiary: 'Global Chips HK', amount: 500000, currency: 'USD', expiryDate: 'Dec 31, 2025', status: 'Active' },
        { id: 'G2', type: 'Letter of Credit', beneficiary: 'EuroTech GmbH', amount: 700000, currency: 'EUR', expiryDate: 'Jun 15, 2025', status: 'Active' }
      ]
    },
    {
      id: '2',
      name: 'GreenLeaf Logistics',
      industry: 'Logistics',
      totalCollateralValue: 2100000,
      totalGuaranteeExposure: 450000,
      assets: [
        { id: 'A4', name: 'Trucking Fleet 2024', type: 'Equipment', valuation: 1500000, loanToValue: 50, status: 'Lien Active', lastAppraisal: 'Mar 22, 2024', description: '50 heavy-duty transport vehicles.' },
        { id: 'A5', name: 'Warehouse Inventory', type: 'Inventory', valuation: 600000, loanToValue: 30, status: 'Pending Appraisal', lastAppraisal: 'N/A', description: 'Seasonal retail goods held in storage.' }
      ],
      guarantees: [
        { id: 'G3', type: 'Surety Bond', beneficiary: 'Port Authority', amount: 450000, currency: 'USD', expiryDate: 'Mar 10, 2025', status: 'Active' }
      ]
    },
    {
      id: '3',
      name: 'Quantum Dynamics',
      industry: 'Manufacturing',
      totalCollateralValue: 12000000,
      totalGuaranteeExposure: 3500000,
      assets: [
         { id: 'A6', name: 'Industrial Complex Alpha', type: 'Real Estate', valuation: 10000000, loanToValue: 70, status: 'Lien Active', lastAppraisal: 'Jan 01, 2024', description: 'Main manufacturing facility in Berlin.' },
         { id: 'A7', name: 'Cash Reserve Account', type: 'Cash', valuation: 2000000, loanToValue: 100, status: 'Lien Active', lastAppraisal: 'Oct 24, 2024', description: 'Restricted account for debt service reserve.' }
      ],
      guarantees: [
          { id: 'G4', type: 'Bank Guarantee', beneficiary: 'Government Energy Grid', amount: 3500000, currency: 'EUR', expiryDate: 'Jan 01, 2026', status: 'Active' }
      ]
    }
  ];

  const [selectedCompany, setSelectedCompany] = useState<CompanySecurityProfile>(companies[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<CollateralAsset | null>(companies[0].assets[0] || null);
  const [categoryFilter, setCategoryFilter] = useState("All");

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAssets = useMemo(() => {
    return selectedCompany.assets.filter(a => 
      categoryFilter === "All" || a.type === categoryFilter
    );
  }, [selectedCompany, categoryFilter]);

  const handleSelectCompany = (company: CompanySecurityProfile) => {
    setSelectedCompany(company);
    setSearchTerm("");
    setShowDropdown(false);
    setSelectedAsset(company.assets.length > 0 ? company.assets[0] : null);
  };

  const getStatusColor = (status: string) => {
      switch(status) {
          case 'Lien Active': 
          case 'Active': return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
          case 'Appraised': return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
          case 'Pending Appraisal': 
          case 'Pending': return 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800';
          case 'Released': return 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700';
          case 'Expired': 
          case 'Claimed': return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
          default: return 'bg-slate-100 text-slate-700';
      }
  };

  const formatCurrency = (val: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(val);
  };

  // Chart Data
  const typeData = [
    { name: 'Real Estate', value: selectedCompany.assets.filter(a => a.type === 'Real Estate').reduce((acc, a) => acc + a.valuation, 0), color: '#6366f1' },
    { name: 'Securities', value: selectedCompany.assets.filter(a => a.type === 'Securities').reduce((acc, a) => acc + a.valuation, 0), color: '#10b981' },
    { name: 'Equipment', value: selectedCompany.assets.filter(a => a.type === 'Equipment').reduce((acc, a) => acc + a.valuation, 0), color: '#f59e0b' },
    { name: 'Other', value: selectedCompany.assets.filter(a => !['Real Estate', 'Securities', 'Equipment'].includes(a.type)).reduce((acc, a) => acc + a.valuation, 0), color: '#ec4899' },
  ].filter(d => d.value > 0);

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-2 space-y-6">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="text-indigo-500" /> Collateral & Security
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
             Manage security assets, bank guarantees, and letters of credit.
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto relative z-20">
            <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search company security..." 
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowDropdown(true);
                    }}
                    onFocus={() => setShowDropdown(true)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-slate-900 dark:text-white transition-all"
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
                <Plus size={18} /> Add Security
            </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between overflow-hidden relative">
              <div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none text-slate-900 dark:text-white">
                  <Activity size={120} />
              </div>
              <div className="relative z-10">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Collateral Value</p>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{formatCurrency(selectedCompany.totalCollateralValue)}</h3>
                  <p className="text-xs text-emerald-500 font-medium mt-1 flex items-center gap-1"><Activity size={12}/> Asset Coverage: 4.2x</p>
              </div>
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl relative z-10">
                  <Building2 size={24} />
              </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Guarantee Exposure</p>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{formatCurrency(selectedCompany.totalGuaranteeExposure)}</h3>
                  <p className="text-xs text-slate-400 mt-1">Across {selectedCompany.guarantees.length} items</p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
                  <Landmark size={24} />
              </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Security Score</p>
                  <h3 className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">92/100</h3>
                  <p className="text-xs text-slate-400 mt-1">High Quality Assets</p>
              </div>
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl">
                  <ShieldCheck size={24} />
              </div>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
          
          {/* Left Column: Asset & Guarantee List */}
          <div className="lg:col-span-2 flex flex-col gap-4 overflow-y-auto pr-2 pb-10">
              <div className="flex justify-between items-center mb-2 px-1">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">Collateral Pool</h3>
                  <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl shadow-sm">
                      {['All', 'Real Estate', 'Securities', 'Equipment', 'Cash'].map(cat => (
                          <button
                            key={cat}
                            onClick={() => setCategoryFilter(cat)}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                categoryFilter === cat 
                                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-sm' 
                                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                            }`}
                          >
                              {cat}
                          </button>
                      ))}
                  </div>
              </div>

              {filteredAssets.length > 0 ? filteredAssets.map(asset => (
                  <div 
                    key={asset.id} 
                    onClick={() => setSelectedAsset(asset)}
                    className={`bg-white dark:bg-slate-900 p-5 rounded-2xl border transition-all cursor-pointer group hover:shadow-md relative overflow-hidden ${
                        selectedAsset?.id === asset.id 
                        ? 'border-indigo-500 ring-1 ring-indigo-500 shadow-md' 
                        : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700'
                    }`}
                  >
                      <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                              <div className={`p-2.5 rounded-xl ${
                                  asset.type === 'Real Estate' ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30' :
                                  'bg-slate-100 text-slate-600 dark:bg-slate-800'
                              }`}>
                                  {asset.type === 'Real Estate' ? <Building2 size={20} /> : <Scale size={20} />}
                              </div>
                              <div>
                                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">{asset.name}</h4>
                                  <p className="text-xs text-slate-500 font-mono mt-0.5">{asset.id} • {asset.type}</p>
                              </div>
                          </div>
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${getStatusColor(asset.status)}`}>
                              {asset.status}
                          </span>
                      </div>

                      <div className="flex justify-between items-end">
                          <div className="text-xs text-slate-500 space-y-1">
                              <p>Last Appraised: <span className="font-medium text-slate-700 dark:text-slate-300">{asset.lastAppraisal}</span></p>
                              <div className="flex items-center gap-2 mt-2">
                                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">LTV Cap</span>
                                  <div className="flex-1 w-24 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                      <div className="h-full bg-blue-500" style={{width: `${asset.loanToValue}%`}}></div>
                                  </div>
                                  <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">{asset.loanToValue}%</span>
                              </div>
                          </div>
                          <div className="text-right">
                              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Market Value</p>
                              <p className="text-xl font-bold text-slate-900 dark:text-white">{formatCurrency(asset.valuation)}</p>
                          </div>
                      </div>
                  </div>
              )) : (
                  <div className="text-center py-16 text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                      <Lock size={48} className="mx-auto mb-2 opacity-30" />
                      <p className="font-medium">No security assets found matching this category.</p>
                  </div>
              )}

              {/* Guarantees Section */}
              <div className="mt-8">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4">Active Guarantees</h3>
                  <div className="space-y-3">
                      {selectedCompany.guarantees.map(g => (
                          <div key={g.id} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between group hover:border-indigo-300 transition-colors cursor-pointer">
                              <div className="flex items-center gap-4">
                                  <div className="p-2.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-lg">
                                      <FileSignature size={20} />
                                  </div>
                                  <div>
                                      <p className="font-bold text-slate-900 dark:text-white text-sm">{g.type}</p>
                                      <p className="text-xs text-slate-500">{g.beneficiary} • Expires {g.expiryDate}</p>
                                  </div>
                              </div>
                              <div className="text-right">
                                  <p className="font-bold text-slate-900 dark:text-white">{formatCurrency(g.amount, g.currency)}</p>
                                  <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded border ${getStatusColor(g.status)}`}>
                                      {g.status}
                                  </span>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          </div>

          {/* Right Column: Asset Details */}
          <div className="space-y-6">
              {selectedAsset ? (
                  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col h-full animate-in slide-in-from-right duration-300">
                      <div className="flex justify-between items-start mb-6">
                          <h3 className="font-bold text-lg text-slate-900 dark:text-white">Security Details</h3>
                          <button onClick={() => setSelectedAsset(null)} className="md:hidden text-slate-400 p-1 hover:bg-slate-100 rounded-lg transition-colors"><X size={20} /></button>
                      </div>

                      <div className="space-y-6 flex-1">
                          {/* Description Box */}
                          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 shadow-inner">
                              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Description</p>
                              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">"{selectedAsset.description}"</p>
                          </div>

                          {/* Asset Analytics */}
                          <div className="h-56 relative bg-slate-50 dark:bg-slate-950/50 rounded-2xl border border-slate-100 dark:border-slate-800 p-4">
                              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Pool Value Distribution</p>
                              <ResponsiveContainer width="100%" height="80%">
                                  <PieChart>
                                      <Pie
                                          data={typeData}
                                          cx="50%"
                                          cy="50%"
                                          innerRadius={45}
                                          outerRadius={65}
                                          paddingAngle={5}
                                          dataKey="value"
                                      >
                                          {typeData.map((entry, index) => (
                                              <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                          ))}
                                      </Pie>
                                      <Tooltip />
                                  </PieChart>
                              </ResponsiveContainer>
                              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-2">
                                  <span className="text-2xl font-bold text-slate-900 dark:text-white">100%</span>
                                  <span className="text-[10px] text-slate-500 uppercase font-medium">Security</span>
                              </div>
                          </div>

                          {/* Detail Grid */}
                          <div className="grid grid-cols-2 gap-4">
                              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm">
                                  <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Max Drawing</p>
                                  <p className="font-bold text-slate-900 dark:text-white text-base">
                                      {formatCurrency(selectedAsset.valuation * (selectedAsset.loanToValue / 100))}
                                  </p>
                              </div>
                              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm">
                                  <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Margin Status</p>
                                  <p className="font-bold text-emerald-600 dark:text-emerald-400 text-base">
                                      {selectedAsset.valuation > 1000000 ? 'Secure' : 'Stable'}
                                  </p>
                              </div>
                          </div>

                          {/* Action Bar */}
                          <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-700 space-y-3">
                              <div className="grid grid-cols-2 gap-3">
                                  <button className="py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all active:scale-95 shadow-sm flex items-center justify-center gap-2">
                                      <RefreshCw size={16} /> Re-Appraise
                                  </button>
                                  <button className="py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95">
                                      View Docs
                                  </button>
                              </div>
                              <button className="w-full py-2.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-xl text-sm font-bold hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-all active:scale-95 flex items-center justify-center gap-2 border border-emerald-100 dark:border-emerald-800">
                                  <CheckCircle2 size={16} /> Release Asset
                              </button>
                              <button className="w-full py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center gap-2">
                                  <Plus size={16} /> Add Substitution
                              </button>
                          </div>
                      </div>
                  </div>
              ) : (
                  <div className="bg-slate-50 dark:bg-slate-900/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 p-8 flex flex-col items-center justify-center text-center h-full text-slate-400">
                      <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-800 mb-4 opacity-50 shadow-inner">
                        <ShieldCheck size={48} />
                      </div>
                      <p className="font-medium">Select a collateral asset to view security details</p>
                      <p className="text-xs mt-1">Lien status and valuation analytics will appear here.</p>
                  </div>
              )}
          </div>
      </div>
    </div>
  );
};
