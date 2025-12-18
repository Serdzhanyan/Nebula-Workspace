
import React, { useState } from 'react';
import { Search, Filter, Download, ShieldAlert, CheckCircle2, XCircle, AlertTriangle, FileText, Globe, DollarSign, Activity, RefreshCw, X, Eye, ShieldCheck, User, ArrowRight, Info, ExternalLink, ShieldMinus, SearchCode, History as HistoryIcon, Scale } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

interface AMLHit {
  id: string;
  entityName: string;
  source: 'Sanctions' | 'PEP' | 'Adverse Media' | 'Watchlist';
  matchScore: number;
  status: 'Pending' | 'False Positive' | 'Confirmed' | 'Reviewing';
  dateDetected: string;
  details: string;
  riskLevel: 'Critical' | 'High' | 'Medium' | 'Low';
}

interface CompanyAMLProfile {
  id: string;
  name: string;
  industry: string;
  registrationCountry: string;
  riskRating: 'Safe' | 'Enhanced Monitoring' | 'High Risk';
  lastFullScan: string;
  activeHits: number;
  hits: AMLHit[];
}

export const CorporateFATFAMLPage: React.FC = () => {
  // Mock Data
  const companies: CompanyAMLProfile[] = [
    {
      id: '1',
      name: 'TechNova Solutions Ltd.',
      industry: 'Technology',
      registrationCountry: 'USA',
      riskRating: 'Enhanced Monitoring',
      lastFullScan: 'Oct 24, 2024',
      activeHits: 2,
      hits: [
        {
          id: 'H1',
          entityName: 'Sarah Jenkins',
          source: 'PEP',
          matchScore: 95,
          status: 'Reviewing',
          dateDetected: 'Today, 08:30 AM',
          riskLevel: 'Medium',
          details: 'Subject matches record for "Sarah Jenkins", former official in regional administration. Possible Politically Exposed Person status.'
        },
        {
          id: 'H2',
          entityName: 'Global Microchips HK',
          source: 'Watchlist',
          matchScore: 82,
          status: 'Pending',
          dateDetected: 'Yesterday, 04:15 PM',
          riskLevel: 'High',
          details: 'Entity name similarity with "Global Chips Trading", a subsidiary previously flagged for unauthorized export patterns.'
        }
      ]
    },
    {
      id: '2',
      name: 'GreenLeaf Logistics',
      industry: 'Logistics',
      registrationCountry: 'United Kingdom',
      riskRating: 'Safe',
      lastFullScan: 'Oct 23, 2024',
      activeHits: 0,
      hits: [
        {
          id: 'H3',
          entityName: 'Michael Chen',
          source: 'Adverse Media',
          matchScore: 45,
          status: 'False Positive',
          dateDetected: 'Oct 15, 2024',
          riskLevel: 'Low',
          details: 'Name similarity in local news article regarding a petty theft case. Unrelated to corporate leadership.'
        }
      ]
    },
    {
      id: '3',
      name: 'Quantum Dynamics',
      industry: 'Manufacturing',
      registrationCountry: 'Germany',
      riskRating: 'High Risk',
      lastFullScan: 'Today, 09:00 AM',
      activeHits: 1,
      hits: [
        {
          id: 'H4',
          entityName: 'Energy Core Holdings',
          source: 'Sanctions',
          matchScore: 100,
          status: 'Confirmed',
          dateDetected: 'Today, 09:05 AM',
          riskLevel: 'Critical',
          details: 'Direct match on EU Sanctions list following updated regulatory annex #442. Asset freeze required.'
        }
      ]
    }
  ];

  const [selectedCompany, setSelectedCompany] = useState<CompanyAMLProfile>(companies[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedHit, setSelectedHit] = useState<AMLHit | null>(companies[0].hits[0] || null);
  const [filterSource, setFilterSource] = useState("All");

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredHits = selectedCompany.hits.filter(h => 
    filterSource === "All" || h.source === filterSource
  );

  const handleSelectCompany = (company: CompanyAMLProfile) => {
    setSelectedCompany(company);
    setSearchTerm("");
    setShowDropdown(false);
    setSelectedHit(company.hits.length > 0 ? company.hits[0] : null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
      case 'Reviewing': return 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800';
      case 'Pending': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800';
      case 'False Positive': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Critical': return 'text-red-600 font-bold';
      case 'High': return 'text-orange-600 font-bold';
      case 'Medium': return 'text-amber-600 font-bold';
      default: return 'text-emerald-600 font-bold';
    }
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-2 space-y-6">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldAlert className="text-indigo-500" /> FATF/AML Verification
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
             Regulatory screening for Money Laundering, Sanctions, and Politically Exposed Persons (PEPs).
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto relative z-20">
            <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search client to verify..." 
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
                            {filteredCompanies.length > 0 ? (
                                filteredCompanies.map(comp => (
                                    <button
                                        key={comp.id}
                                        onClick={() => handleSelectCompany(comp)}
                                        className="w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 border-b border-slate-100 dark:border-slate-800 last:border-0 flex justify-between items-center group transition-colors"
                                    >
                                        <div>
                                            <p className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{comp.name}</p>
                                            <p className="text-xs text-slate-500">{comp.registrationCountry} • {comp.riskRating}</p>
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
                <SearchCode size={18} /> Run New Scan
            </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Risk Profile</p>
                  <h3 className={`text-2xl font-bold ${
                      selectedCompany.riskRating === 'Safe' ? 'text-emerald-500' : 
                      selectedCompany.riskRating === 'High Risk' ? 'text-red-500' : 'text-amber-500'
                  }`}>{selectedCompany.riskRating}</h3>
                  <p className="text-xs text-slate-400 mt-1">Based on latest FATF standards</p>
              </div>
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl">
                  <Scale size={24} />
              </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Active Hits</p>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{selectedCompany.activeHits}</h3>
                  <p className="text-xs text-slate-400 mt-1">Pending manual review</p>
              </div>
              <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl">
                  <AlertTriangle size={24} />
              </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Last Full Scan</p>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{selectedCompany.lastFullScan.split(',')[0]}</h3>
                  <p className="text-xs text-slate-400 mt-1">Automated daily refresh active</p>
              </div>
              <div className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-xl">
                  <HistoryIcon size={24} />
              </div>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
          
          {/* Left Column: Screening Hits Feed */}
          <div className="lg:col-span-2 flex flex-col gap-4 overflow-y-auto pr-2">
              <div className="flex justify-between items-center mb-2 px-1">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">Detection Feed</h3>
                  <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                      {['All', 'Sanctions', 'PEP', 'Media'].map(s => (
                          <button
                            key={s}
                            onClick={() => setFilterSource(s === 'Media' ? 'Adverse Media' : s)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                (filterSource === s || (s === 'Media' && filterSource === 'Adverse Media')) 
                                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-sm' 
                                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                            }`}
                          >
                              {s}
                          </button>
                      ))}
                  </div>
              </div>

              {filteredHits.length > 0 ? filteredHits.map(hit => (
                  <div 
                    key={hit.id} 
                    onClick={() => setSelectedHit(hit)}
                    className={`bg-white dark:bg-slate-900 p-5 rounded-2xl border transition-all cursor-pointer group hover:shadow-md relative overflow-hidden ${
                        selectedHit?.id === hit.id 
                        ? 'border-indigo-500 ring-1 ring-indigo-500 shadow-md' 
                        : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700'
                    }`}
                  >
                      <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                              <div className={`p-2.5 rounded-xl ${
                                  hit.source === 'Sanctions' ? 'bg-red-100 text-red-600 dark:bg-red-900/30' :
                                  hit.source === 'PEP' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30' :
                                  'bg-slate-100 text-slate-600 dark:bg-slate-800'
                              }`}>
                                  <ShieldAlert size={20} />
                              </div>
                              <div>
                                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">{hit.entityName}</h4>
                                  <p className="text-xs text-slate-500 font-mono mt-0.5">{hit.source} • Detected {hit.dateDetected}</p>
                              </div>
                          </div>
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${getStatusColor(hit.status)}`}>
                              {hit.status}
                          </span>
                      </div>

                      <div className="flex justify-between items-end">
                          <div className="text-xs text-slate-600 dark:text-slate-400 max-w-[70%] line-clamp-1">
                              {hit.details}
                          </div>
                          <div className="text-right">
                              <p className="text-xs font-bold text-slate-400 uppercase mb-0.5">Confidence</p>
                              <p className={`text-xl font-bold ${hit.matchScore > 90 ? 'text-red-500' : 'text-indigo-600'}`}>{hit.matchScore}%</p>
                          </div>
                      </div>
                  </div>
              )) : (
                  <div className="text-center py-16 text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                      <ShieldCheck size={48} className="mx-auto mb-2 opacity-30" />
                      <p className="font-medium">No active AML flags found.</p>
                  </div>
              )}
          </div>

          {/* Right Column: Investigation Detail */}
          <div className="space-y-6">
              {selectedHit ? (
                  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col h-full animate-in slide-in-from-right duration-300">
                      <div className="flex justify-between items-start mb-6">
                          <div>
                              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Investigation Case</h3>
                              <p className="text-xs text-slate-500">ID: {selectedHit.id}</p>
                          </div>
                          <button onClick={() => setSelectedHit(null)} className="md:hidden text-slate-400"><X size={20} /></button>
                      </div>

                      <div className="space-y-6 flex-1">
                          {/* Risk Level Gauge */}
                          <div className="p-5 rounded-2xl bg-slate-800/50 border border-slate-100 dark:border-slate-700 flex items-center justify-between">
                              <div>
                                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">AI Risk Sentiment</span>
                                  <div className={`text-2xl font-bold ${getRiskColor(selectedHit.riskLevel)}`}>{selectedHit.riskLevel} Severity</div>
                              </div>
                              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
                                  <ShieldAlert className={selectedHit.matchScore > 80 ? 'text-red-500 animate-pulse' : 'text-amber-500'} size={24} />
                              </div>
                          </div>

                          {/* Analysis Details */}
                          <div>
                              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-1">Case Analysis</h4>
                              <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800/50 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                  {selectedHit.details}
                                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center gap-2">
                                      <Info size={14} className="text-indigo-500" />
                                      <span className="text-[10px] text-slate-500">Recommended action: Perform Enhanced Due Diligence (EDD) before next transaction.</span>
                                  </div>
                              </div>
                          </div>

                          {/* Source Info */}
                          <div className="grid grid-cols-2 gap-4">
                              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                                  <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Match Type</p>
                                  <p className="font-bold text-slate-900 dark:text-white text-sm">{selectedHit.source}</p>
                              </div>
                              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                                  <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Detected</p>
                                  <p className="font-bold text-slate-800 dark:text-white text-sm">{selectedHit.dateDetected.split(',')[0]}</p>
                              </div>
                          </div>

                          {/* Actions */}
                          <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-700 space-y-3">
                              <div className="grid grid-cols-2 gap-3">
                                  <button className="py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm flex items-center justify-center gap-2">
                                      <CheckCircle2 size={16} /> Confirm Hit
                                  </button>
                                  <button className="py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                      Request EDD
                                  </button>
                              </div>
                              <button className="w-full py-2.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-xl text-sm font-bold hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors flex items-center justify-center gap-2">
                                  <ShieldMinus size={16} /> Mark False Positive
                              </button>
                          </div>
                      </div>
                  </div>
              ) : (
                  <div className="bg-slate-50 dark:bg-slate-900/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 p-8 flex flex-col items-center justify-center text-center h-full text-slate-400">
                      <SearchCode size={48} className="mb-4 opacity-20" />
                      <p className="font-medium">Select a flag to investigate</p>
                  </div>
              )}
          </div>
      </div>
    </div>
  );
};
