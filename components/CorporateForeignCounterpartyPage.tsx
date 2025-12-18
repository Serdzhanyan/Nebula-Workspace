
import React, { useState } from 'react';
import { Search, Filter, Download, Globe, ShieldAlert, CheckCircle2, XCircle, AlertTriangle, FileText, Activity, RefreshCw, X, Eye, ShieldCheck, User, ArrowRight, Info, ExternalLink, Building2, Landmark, Scale, PieChart, MapPin, SearchCode, Clock, History as HistoryIcon } from 'lucide-react';
import { ResponsiveContainer, PieChart as RePieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

interface CounterpartyDoc {
  id: string;
  name: string;
  type: string;
  status: 'Verified' | 'Pending' | 'Expired';
  expiryDate: string;
}

interface Counterparty {
  id: string;
  name: string;
  country: string;
  registrationNo: string;
  industry: string;
  riskScore: number; // 0-100
  riskLevel: 'Low' | 'Medium' | 'High';
  verificationStatus: 'Cleared' | 'Under Review' | 'Blocked';
  lastChecked: string;
  uboCount: number;
  documents: CounterpartyDoc[];
  description: string;
}

export const CorporateForeignCounterpartyPage: React.FC = () => {
  // Mock Data
  const counterparties: Counterparty[] = [
    {
      id: 'FC-001',
      name: 'Global Chips Trading HK',
      country: 'Hong Kong',
      registrationNo: 'HK-9928100',
      industry: 'Semiconductors',
      riskScore: 24,
      riskLevel: 'Low',
      verificationStatus: 'Cleared',
      lastChecked: 'Oct 20, 2024',
      uboCount: 2,
      description: 'Major supplier of specialized processing units. Long-term partner with transparent ownership structure.',
      documents: [
        { id: 'd1', name: 'Certificate of Incumbency', type: 'Legal', status: 'Verified', expiryDate: 'Oct 15, 2025' },
        { id: 'd2', name: 'AML Policy 2024', type: 'Compliance', status: 'Verified', expiryDate: 'Jan 01, 2025' }
      ]
    },
    {
      id: 'FC-002',
      name: 'Nordic Logistics AB',
      country: 'Sweden',
      registrationNo: 'SE-55678-12',
      industry: 'Logistics',
      riskScore: 48,
      riskLevel: 'Medium',
      verificationStatus: 'Under Review',
      lastChecked: 'Today, 09:15 AM',
      uboCount: 5,
      description: 'Regional logistics hub. Current review triggered by change in beneficial ownership of parent holding company.',
      documents: [
        { id: 'd3', name: 'Trading License', type: 'Legal', status: 'Verified', expiryDate: 'Dec 31, 2024' },
        { id: 'd4', name: 'Owner ID Proofs', type: 'KYB', status: 'Pending', expiryDate: 'N/A' }
      ]
    },
    {
      id: 'FC-003',
      name: 'Sahara Mining & Energy',
      country: 'Nigeria',
      registrationNo: 'NG-RC-22019',
      industry: 'Energy',
      riskScore: 82,
      riskLevel: 'High',
      verificationStatus: 'Blocked',
      lastChecked: 'Yesterday, 14:30 PM',
      uboCount: 3,
      description: 'Energy infrastructure provider. Blocked due to significant adverse media hits and potential PEP association in the board.',
      documents: [
        { id: 'd5', name: 'Corporate Registry Extract', type: 'Legal', status: 'Expired', expiryDate: 'Sep 30, 2024' },
        { id: 'd6', name: 'Financial Audit 2023', type: 'Financial', status: 'Verified', expiryDate: 'Oct 15, 2025' }
      ]
    },
    {
      id: 'FC-004',
      name: 'Pacific Blue Seafoods',
      country: 'Vietnam',
      registrationNo: 'VN-110299',
      industry: 'Retail/Food',
      riskScore: 35,
      riskLevel: 'Low',
      verificationStatus: 'Cleared',
      lastChecked: 'Oct 12, 2024',
      uboCount: 1,
      description: 'Seafood exporter. Standard risk profile for agricultural trade entities.',
      documents: [
        { id: 'd7', name: 'Export Permit', type: 'License', status: 'Verified', expiryDate: 'May 10, 2025' }
      ]
    }
  ];

  const [selectedFC, setSelectedFC] = useState<Counterparty>(counterparties[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filterRisk, setFilterRisk] = useState("All");

  const filteredList = counterparties.filter(c => 
    (c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.country.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterRisk === "All" || c.riskLevel === filterRisk)
  );

  const handleSelect = (fc: Counterparty) => {
    setSelectedFC(fc);
    setSearchTerm("");
    setShowDropdown(false);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'High': return 'text-red-600 dark:text-red-400';
      case 'Medium': return 'text-amber-600 dark:text-amber-400';
      default: return 'text-emerald-600 dark:text-emerald-400';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'Cleared': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
      case 'Under Review': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800';
      case 'Blocked': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  // Chart Data
  const chartData = counterparties.map(c => ({
      name: c.name.split(' ')[0],
      score: c.riskScore,
      level: c.riskLevel
  }));

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-2 space-y-6">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Globe className="text-indigo-500" /> Foreign Counterparty Check
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
             Verify international business partners, analyze UBO chains and cross-border risk.
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto relative z-20">
            <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search counterparty by name or country..." 
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
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden z-20 max-h-60 overflow-y-auto">
                            {filteredList.length > 0 ? (
                                filteredList.map(fc => (
                                    <button
                                        key={fc.id}
                                        onClick={() => handleSelect(fc)}
                                        className="w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 border-b border-slate-100 dark:border-slate-800 last:border-0 flex justify-between items-center group transition-colors"
                                    >
                                        <div>
                                            <p className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{fc.name}</p>
                                            <p className="text-xs text-slate-500">{fc.country} • {fc.industry}</p>
                                        </div>
                                        {selectedFC.id === fc.id && <CheckCircle2 size={16} className="text-indigo-600 dark:text-indigo-400" />}
                                    </button>
                                ))
                            ) : (
                                <div className="p-4 text-center text-slate-500 text-sm">No entities found</div>
                            )}
                        </div>
                    </>
                )}
            </div>
            
            <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 dark:shadow-none">
                <SearchCode size={18} /> New Check
            </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Monitored</p>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white">128</h3>
              </div>
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl">
                  <Activity size={24} />
              </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">High Risk</p>
                  <h3 className="text-3xl font-bold text-red-600">3</h3>
              </div>
              <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl">
                  <AlertTriangle size={24} />
              </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Under Review</p>
                  <h3 className="text-3xl font-bold text-amber-500">12</h3>
              </div>
              <div className="p-3 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-xl">
                  <Clock size={24} />
              </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Avg Compliance</p>
                  <h3 className="text-3xl font-bold text-emerald-500">94%</h3>
              </div>
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl">
                  <ShieldCheck size={24} />
              </div>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
          
          {/* Left Column: Entity List */}
          <div className="lg:col-span-2 flex flex-col gap-4 overflow-y-auto pr-2">
              <div className="flex justify-between items-center mb-2 px-1">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">Active Counterparties</h3>
                  <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                      {['All', 'Low', 'Medium', 'High'].map(r => (
                          <button
                            key={r}
                            onClick={() => setFilterRisk(r)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                filterRisk === r 
                                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-sm' 
                                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                            }`}
                          >
                              {r}
                          </button>
                      ))}
                  </div>
              </div>

              {filteredList.length > 0 ? filteredList.map(fc => (
                  <div 
                    key={fc.id} 
                    onClick={() => setSelectedFC(fc)}
                    className={`bg-white dark:bg-slate-900 p-5 rounded-2xl border transition-all cursor-pointer group hover:shadow-md relative overflow-hidden ${
                        selectedFC?.id === fc.id 
                        ? 'border-indigo-500 ring-1 ring-indigo-500 shadow-md' 
                        : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700'
                    }`}
                  >
                      <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 font-bold text-lg border border-slate-200 dark:border-slate-700 shadow-sm group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20 group-hover:text-indigo-600 transition-colors">
                                  {fc.name.charAt(0)}
                              </div>
                              <div>
                                  <h4 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-indigo-600 transition-colors">{fc.name}</h4>
                                  <p className="text-xs text-slate-500 font-medium mt-0.5 flex items-center gap-2">
                                      <MapPin size={10} /> {fc.country} • {fc.industry}
                                  </p>
                              </div>
                          </div>
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${getStatusBg(fc.verificationStatus)}`}>
                              {fc.verificationStatus}
                          </span>
                      </div>

                      <div className="flex justify-between items-end">
                          <div className="text-xs text-slate-500 space-y-1">
                              <p>Last Activity: <span className="font-medium text-slate-700 dark:text-slate-300">{fc.lastChecked}</span></p>
                              <div className="flex items-center gap-2">
                                  <span className="text-[10px] text-slate-400 uppercase font-bold">Risk Assessment</span>
                                  <div className="w-24 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                      <div className={`h-full ${fc.riskScore > 75 ? 'bg-red-500' : fc.riskScore > 40 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{width: `${fc.riskScore}%`}}></div>
                                  </div>
                                  <span className={`text-[10px] font-bold ${getRiskColor(fc.riskLevel)}`}>{fc.riskScore}%</span>
                              </div>
                          </div>
                          <div className="flex gap-2">
                              <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors" title="View Dossier"><Eye size={16}/></button>
                              <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors" title="Download Report"><Download size={16}/></button>
                          </div>
                      </div>
                  </div>
              )) : (
                  <div className="text-center py-16 text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                      <ShieldCheck size={48} className="mx-auto mb-2 opacity-30" />
                      <p className="font-medium">No counterparties found.</p>
                  </div>
              )}
          </div>

          {/* Right Column: Deep Dive */}
          <div className="space-y-6">
              {selectedFC ? (
                  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col h-full animate-in slide-in-from-right duration-300">
                      <div className="flex justify-between items-start mb-6">
                          <div>
                              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Entity Dossier</h3>
                              <p className="text-xs text-slate-500">Ref: {selectedFC.id}</p>
                          </div>
                          <button onClick={() => setSelectedFC(counterparties[0])} className="lg:hidden text-slate-400"><X size={20} /></button>
                      </div>

                      <div className="space-y-6 flex-1">
                          {/* Overview Card */}
                          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700">
                              <div className="flex justify-between mb-4">
                                  <div>
                                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Reg No.</p>
                                      <p className="text-sm font-bold text-slate-900 dark:text-white font-mono">{selectedFC.registrationNo}</p>
                                  </div>
                                  <div className="text-right">
                                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">UBOs</p>
                                      <p className="text-sm font-bold text-slate-900 dark:text-white">{selectedFC.uboCount} Identified</p>
                                  </div>
                              </div>
                              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed italic">"{selectedFC.description}"</p>
                          </div>

                          {/* Risk Distribution Chart */}
                          <div className="h-48 bg-white dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 p-4">
                              <p className="text-[10px] font-bold text-slate-400 uppercase mb-4 tracking-wider">Metric Comparison</p>
                              <ResponsiveContainer width="100%" height="80%">
                                  <BarChart data={chartData}>
                                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                                      <XAxis dataKey="name" hide />
                                      <YAxis hide domain={[0, 100]} />
                                      <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                                          {chartData.map((entry, index) => (
                                              <Cell key={`cell-${index}`} fill={entry.level === 'High' ? '#ef4444' : entry.level === 'Medium' ? '#f59e0b' : '#10b981'} />
                                          ))}
                                      </Bar>
                                  </BarChart>
                              </ResponsiveContainer>
                          </div>

                          {/* Documents List */}
                          <div>
                              <div className="flex justify-between items-center mb-3">
                                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Compliance Assets</h4>
                                  <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold cursor-pointer hover:underline">Verify All</span>
                              </div>
                              <div className="space-y-2">
                                  {selectedFC.documents.map(doc => (
                                      <div key={doc.id} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 transition-colors">
                                          <div className="flex items-center gap-2">
                                              <FileText size={14} className="text-slate-400" />
                                              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{doc.name}</span>
                                          </div>
                                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                              doc.status === 'Verified' ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20' : 
                                              'text-amber-600 bg-amber-50 dark:bg-amber-900/20'
                                          }`}>
                                              {doc.status}
                                          </span>
                                      </div>
                                  ))}
                              </div>
                          </div>

                          {/* Action Bar */}
                          <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-700 space-y-3">
                              <div className="grid grid-cols-2 gap-3">
                                  <button className="py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition-colors shadow-sm flex items-center justify-center gap-2">
                                      <ShieldCheck size={16} /> Approve Entry
                                  </button>
                                  <button className="py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                                      <RefreshCw size={16} /> Request KYC
                                  </button>
                              </div>
                              <button className="w-full py-2.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm font-bold hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors flex items-center justify-center gap-2">
                                  <XCircle size={16} /> Block Counterparty
                              </button>
                          </div>
                      </div>
                  </div>
              ) : (
                  <div className="bg-slate-50 dark:bg-slate-900/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 p-8 flex flex-col items-center justify-center text-center h-full text-slate-400">
                      <Globe size={48} className="mb-4 opacity-20" />
                      <p className="font-medium">Select an entity to view global check details</p>
                  </div>
              )}
          </div>
      </div>
    </div>
  );
};
