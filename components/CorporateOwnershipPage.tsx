
import React, { useState } from 'react';
import { Search, Filter, Download, User, Building2, Globe, ArrowRight, Share2, Layers, MoreHorizontal, AlertCircle, CheckCircle2, ChevronRight, ShieldCheck, MapPin, Network, Activity } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

interface EntityNode {
  id: string;
  name: string;
  type: 'Individual' | 'Corporate' | 'Trust' | 'Fund';
  share: number;
  country: string;
  status: 'Verified' | 'Pending' | 'Flagged';
  children?: EntityNode[];
}

interface CompanyProfile {
  id: string;
  name: string;
  registrationNumber: string;
  jurisdiction: string;
  uboStatus: 'Clear' | 'Review Needed';
  shareholders: EntityNode[];
  subsidiaries: EntityNode[];
}

export const CorporateOwnershipPage: React.FC = () => {
  // Mock Data
  const companies: CompanyProfile[] = [
    {
      id: '1',
      name: 'TechNova Solutions Ltd.',
      registrationNumber: 'US-DE-882190',
      jurisdiction: 'Delaware, USA',
      uboStatus: 'Clear',
      shareholders: [
        { id: 'S1', name: 'Sarah Jenkins', type: 'Individual', share: 45.0, country: 'USA', status: 'Verified' },
        { id: 'S2', name: 'Horizon Ventures LP', type: 'Fund', share: 30.0, country: 'Cayman Islands', status: 'Verified' },
        { id: 'S3', name: 'TechNova Holdings', type: 'Corporate', share: 25.0, country: 'UK', status: 'Verified' }
      ],
      subsidiaries: [
        { id: 'SUB1', name: 'TechNova Europe', type: 'Corporate', share: 100, country: 'Ireland', status: 'Verified' },
        { id: 'SUB2', name: 'TN Asia Pte Ltd', type: 'Corporate', share: 80, country: 'Singapore', status: 'Verified' }
      ]
    },
    {
      id: '2',
      name: 'GreenLeaf Logistics',
      registrationNumber: 'UK-0029910',
      jurisdiction: 'London, UK',
      uboStatus: 'Review Needed',
      shareholders: [
        { id: 'S4', name: 'GreenLeaf Global', type: 'Corporate', share: 100.0, country: 'Jersey', status: 'Flagged' }
      ],
      subsidiaries: [
        { id: 'SUB3', name: 'GL Transport', type: 'Corporate', share: 100, country: 'France', status: 'Verified' }
      ]
    },
    {
      id: '3',
      name: 'Quantum Dynamics',
      registrationNumber: 'DE-BER-112233',
      jurisdiction: 'Berlin, Germany',
      uboStatus: 'Clear',
      shareholders: [
        { id: 'S5', name: 'Robert Ford', type: 'Individual', share: 51.0, country: 'Germany', status: 'Verified' },
        { id: 'S6', name: 'Arnold Weber', type: 'Individual', share: 49.0, country: 'Germany', status: 'Verified' }
      ],
      subsidiaries: []
    }
  ];

  const [selectedCompany, setSelectedCompany] = useState<CompanyProfile>(companies[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [viewMode, setViewMode] = useState<'visual' | 'list'>('visual');

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCompany = (company: CompanyProfile) => {
    setSelectedCompany(company);
    setSearchTerm("");
    setShowDropdown(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Verified': return 'text-emerald-600 bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800';
      case 'Pending': return 'text-amber-600 bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800';
      case 'Flagged': return 'text-red-600 bg-red-50 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const getTypeIcon = (type: string) => {
      switch(type) {
          case 'Individual': return <User size={16} />;
          case 'Corporate': return <Building2 size={16} />;
          case 'Fund': return <Layers size={16} />;
          default: return <Share2 size={16} />;
      }
  };

  // Prepare Chart Data
  const pieData = selectedCompany.shareholders.map((s, index) => ({
      name: s.name,
      value: s.share,
      color: ['#6366f1', '#10b981', '#f59e0b', '#ec4899'][index % 4]
  }));

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-2 space-y-6">
      
      {/* Search & Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Network className="text-indigo-500" /> Ownership Structure
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
             Visualize beneficial ownership chains, UBOs, and subsidiary hierarchies.
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto relative z-20">
            <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search company structure..." 
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
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden z-20">
                            {filteredCompanies.length > 0 ? (
                                filteredCompanies.map(comp => (
                                    <button
                                        key={comp.id}
                                        onClick={() => handleSelectCompany(comp)}
                                        className="w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 border-b border-slate-100 dark:border-slate-800 last:border-0 flex justify-between items-center group transition-colors"
                                    >
                                        <div>
                                            <p className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{comp.name}</p>
                                            <p className="text-xs text-slate-500">{comp.jurisdiction}</p>
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

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
          
          {/* Left Panel: Structure Visualizer */}
          <div className="lg:col-span-2 flex flex-col gap-6 overflow-y-auto pr-2">
              
              {/* Company Header Card */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                      <div>
                          <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-xl">
                                  {selectedCompany.name.charAt(0)}
                              </div>
                              <div>
                                  <h1 className="text-xl font-bold text-slate-900 dark:text-white">{selectedCompany.name}</h1>
                                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                      <Building2 size={14} /> {selectedCompany.registrationNumber}
                                      <span>•</span>
                                      <Globe size={14} /> {selectedCompany.jurisdiction}
                                  </div>
                              </div>
                          </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${
                          selectedCompany.uboStatus === 'Clear' 
                          ? 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800' 
                          : 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800'
                      }`}>
                          UBO Status: {selectedCompany.uboStatus}
                      </span>
                  </div>
              </div>

              {/* Ownership Structure (Upstream) */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                      <ArrowRight className="text-indigo-500 rotate-270" size={20} /> Shareholding Structure (Upstream)
                  </h3>
                  
                  <div className="space-y-4">
                      {selectedCompany.shareholders.map((shareholder) => (
                          <div key={shareholder.id} className="relative group">
                              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors cursor-pointer">
                                  <div className="flex items-center gap-4">
                                      <div className={`p-2 rounded-lg ${
                                          shareholder.type === 'Individual' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 
                                          'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
                                      }`}>
                                          {getTypeIcon(shareholder.type)}
                                      </div>
                                      <div>
                                          <p className="font-bold text-slate-900 dark:text-white text-sm">{shareholder.name}</p>
                                          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                                              <Globe size={10} /> {shareholder.country}
                                              <span>•</span>
                                              <span className={`font-medium ${
                                                  shareholder.status === 'Verified' ? 'text-emerald-500' : 'text-amber-500'
                                              }`}>{shareholder.status}</span>
                                          </div>
                                      </div>
                                  </div>
                                  
                                  <div className="flex items-center gap-6">
                                      <div className="text-right">
                                          <p className="text-xs font-bold text-slate-400 uppercase">Ownership</p>
                                          <p className="font-bold text-slate-900 dark:text-white text-lg">{shareholder.share}%</p>
                                      </div>
                                      <ChevronRight size={18} className="text-slate-400" />
                                  </div>
                              </div>
                              {/* Connector Line Visualization */}
                              <div className="absolute left-8 bottom-0 h-4 w-0.5 bg-slate-300 dark:bg-slate-700 -mb-4 last:hidden"></div>
                          </div>
                      ))}
                      
                      {/* Current Company Node */}
                      <div className="p-4 bg-indigo-50 dark:bg-indigo-900/10 border-2 border-indigo-200 dark:border-indigo-800 rounded-xl flex items-center justify-center gap-2 mt-2">
                          <Building2 className="text-indigo-600 dark:text-indigo-400" size={20} />
                          <span className="font-bold text-indigo-900 dark:text-indigo-200">{selectedCompany.name}</span>
                      </div>
                  </div>
              </div>

              {/* Subsidiaries (Downstream) */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                      <ArrowRight className="text-emerald-500 rotate-90" size={20} /> Subsidiaries (Downstream)
                  </h3>
                  
                  {selectedCompany.subsidiaries.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {selectedCompany.subsidiaries.map((sub) => (
                              <div key={sub.id} className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
                                  <div className="flex justify-between items-start mb-2">
                                      <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded-lg">
                                          <Building2 size={16} />
                                      </div>
                                      <span className="text-xs font-bold bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded text-slate-600 dark:text-slate-300">{sub.share}% Owned</span>
                                  </div>
                                  <p className="font-bold text-slate-900 dark:text-white text-sm mb-1">{sub.name}</p>
                                  <p className="text-xs text-slate-500 flex items-center gap-1"><MapPin size={10} /> {sub.country}</p>
                              </div>
                          ))}
                      </div>
                  ) : (
                      <div className="text-center py-8 text-slate-400 text-sm border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-xl">
                          No direct subsidiaries registered.
                      </div>
                  )}
              </div>
          </div>

          {/* Right Panel: Analytics & Actions */}
          <div className="lg:col-span-1 space-y-6">
              
              {/* Equity Breakdown Chart */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-4">Ownership Breakdown</h3>
                  <div className="h-64 w-full relative">
                      <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
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
                              <Tooltip 
                                  contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                  itemStyle={{ color: '#1e293b' }}
                              />
                              <Legend verticalAlign="bottom" iconType="circle" />
                          </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
                          <span className="text-3xl font-bold text-slate-900 dark:text-white">100%</span>
                          <span className="text-xs text-slate-500 uppercase font-medium">Equity</span>
                      </div>
                  </div>
              </div>

              {/* UBO Verification Status */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                      <ShieldCheck size={18} className="text-emerald-500" /> UBO Verification
                  </h3>
                  <div className="space-y-4">
                      {selectedCompany.shareholders.filter(s => s.type === 'Individual').map(ubo => (
                          <div key={ubo.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
                              <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-600">
                                      {ubo.name.charAt(0)}
                                  </div>
                                  <div>
                                      <p className="text-xs font-bold text-slate-900 dark:text-white">{ubo.name}</p>
                                      <p className="text-[10px] text-slate-500">Ultimate Beneficial Owner</p>
                                  </div>
                              </div>
                              {ubo.status === 'Verified' ? (
                                  <CheckCircle2 size={18} className="text-emerald-500" />
                              ) : (
                                  <AlertCircle size={18} className="text-amber-500" />
                              )}
                          </div>
                      ))}
                      <button className="w-full py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-colors shadow-sm">
                          Run Full KYC Check
                      </button>
                  </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                   <h3 className="font-bold text-slate-900 dark:text-white mb-4">Actions</h3>
                   <div className="space-y-2">
                       <button className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm font-medium text-slate-700 dark:text-slate-300">
                           Export Structure Chart <Download size={16} />
                       </button>
                       <button className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm font-medium text-slate-700 dark:text-slate-300">
                           Simulate Equity Change <Activity size={16} />
                       </button>
                       <button className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm font-medium text-slate-700 dark:text-slate-300">
                           View Corporate Registry <Globe size={16} />
                       </button>
                   </div>
              </div>

          </div>
      </div>
    </div>
  );
};
