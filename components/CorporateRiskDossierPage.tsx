
import React, { useState } from 'react';
import { Search, Filter, Download, ShieldAlert, FileText, History, AlertTriangle, CheckCircle2, XCircle, ChevronDown, Check, ArrowRight, User, Globe, Building2, Eye, Calendar, AlertOctagon, MoreHorizontal, RefreshCw } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface RiskEvent {
  id: string;
  date: string;
  type: 'Alert' | 'Change' | 'Review' | 'Note';
  title: string;
  description: string;
  user: string;
  severity?: 'High' | 'Medium' | 'Low';
}

interface RiskDocument {
  id: string;
  name: string;
  type: string;
  date: string;
  status: 'Verified' | 'Flagged' | 'Pending';
}

interface CompanyDossier {
  id: string;
  name: string;
  industry: string;
  riskScore: number; // 0-100 (Higher is riskier)
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  kycStatus: 'Approved' | 'Pending' | 'Rejected';
  pepStatus: 'Clear' | 'Match Found';
  sanctionStatus: 'Clear' | 'Potential Match';
  adverseMedia: 'Clear' | 'Detected';
  lastReviewDate: string;
  nextReviewDate: string;
  timeline: RiskEvent[];
  documents: RiskDocument[];
  trendData: { month: string; score: number }[];
}

export const CorporateRiskDossierPage: React.FC = () => {
  // Mock Data
  const dossiers: CompanyDossier[] = [
    {
      id: '1',
      name: 'TechNova Solutions Ltd.',
      industry: 'Technology',
      riskScore: 12,
      riskLevel: 'Low',
      kycStatus: 'Approved',
      pepStatus: 'Clear',
      sanctionStatus: 'Clear',
      adverseMedia: 'Clear',
      lastReviewDate: 'Oct 15, 2024',
      nextReviewDate: 'Oct 15, 2025',
      timeline: [
        { id: 'e1', date: 'Oct 15, 2024', type: 'Review', title: 'Annual Risk Review', description: 'Routine check completed. No new risks identified.', user: 'System', severity: 'Low' },
        { id: 'e2', date: 'Jun 01, 2024', type: 'Change', title: 'Shareholder Structure Update', description: 'Minor change in minority shareholders (<10%).', user: 'Sarah L.', severity: 'Low' }
      ],
      documents: [
        { id: 'd1', name: 'Compliance Report 2024', type: 'Report', date: 'Oct 15, 2024', status: 'Verified' },
        { id: 'd2', name: 'UBO Declaration', type: 'Form', date: 'Jan 10, 2024', status: 'Verified' }
      ],
      trendData: [
        { month: 'May', score: 10 }, { month: 'Jun', score: 12 }, { month: 'Jul', score: 11 },
        { month: 'Aug', score: 12 }, { month: 'Sep', score: 12 }, { month: 'Oct', score: 12 }
      ]
    },
    {
      id: '2',
      name: 'GreenLeaf Logistics',
      industry: 'Logistics',
      riskScore: 45,
      riskLevel: 'Medium',
      kycStatus: 'Approved',
      pepStatus: 'Clear',
      sanctionStatus: 'Clear',
      adverseMedia: 'Detected',
      lastReviewDate: 'Sep 20, 2024',
      nextReviewDate: 'Mar 20, 2025',
      timeline: [
        { id: 'e3', date: 'Sep 20, 2024', type: 'Alert', title: 'Adverse Media Hit', description: 'Article regarding labor dispute in regional branch.', user: 'MediaScanner', severity: 'Medium' },
        { id: 'e4', date: 'Sep 19, 2024', type: 'Review', title: 'Manual Review Triggered', description: 'Analyst assigned to investigate media hit.', user: 'Alex J.', severity: 'Medium' }
      ],
      documents: [
        { id: 'd3', name: 'Audit Findings Q3', type: 'Report', date: 'Sep 22, 2024', status: 'Flagged' },
        { id: 'd4', name: 'Business License', type: 'Legal', date: 'Jan 15, 2024', status: 'Verified' }
      ],
      trendData: [
        { month: 'May', score: 20 }, { month: 'Jun', score: 22 }, { month: 'Jul', score: 25 },
        { month: 'Aug', score: 25 }, { month: 'Sep', score: 45 }, { month: 'Oct', score: 45 }
      ]
    },
    {
      id: '3',
      name: 'Quantum Dynamics',
      industry: 'Manufacturing',
      riskScore: 88,
      riskLevel: 'Critical',
      kycStatus: 'Pending',
      pepStatus: 'Match Found',
      sanctionStatus: 'Potential Match',
      adverseMedia: 'Detected',
      lastReviewDate: 'Today',
      nextReviewDate: 'Immediate',
      timeline: [
        { id: 'e5', date: 'Today', type: 'Alert', title: 'Sanctions List Match', description: 'Potential match for new Director on OFAC list.', user: 'Watchlist', severity: 'High' },
        { id: 'e6', date: 'Yesterday', type: 'Change', title: 'Jurisdiction Change', description: 'Registered address moved to high-risk jurisdiction.', user: 'System', severity: 'High' }
      ],
      documents: [
        { id: 'd5', name: 'Enhanced Due Diligence Report', type: 'EDD', date: 'Oct 24, 2024', status: 'Pending' }
      ],
      trendData: [
        { month: 'May', score: 40 }, { month: 'Jun', score: 45 }, { month: 'Jul', score: 60 },
        { month: 'Aug', score: 65 }, { month: 'Sep', score: 80 }, { month: 'Oct', score: 88 }
      ]
    }
  ];

  const [selectedDossier, setSelectedDossier] = useState<CompanyDossier>(dossiers[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'documents'>('overview');

  const filteredDossiers = dossiers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectDossier = (dossier: CompanyDossier) => {
    setSelectedDossier(dossier);
    setSearchTerm("");
    setShowDropdown(false);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Low': return 'text-emerald-600 bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800';
      case 'Medium': return 'text-amber-600 bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800';
      case 'High': return 'text-orange-600 bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800';
      case 'Critical': return 'text-red-600 bg-red-50 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  const getStatusIcon = (status: string) => {
      if (status === 'Clear' || status === 'Approved') return <CheckCircle2 size={16} className="text-emerald-500" />;
      if (status === 'Potential Match' || status === 'Detected' || status === 'Pending') return <AlertTriangle size={16} className="text-amber-500" />;
      return <XCircle size={16} className="text-red-500" />;
  };

  const getSeverityColor = (severity: string) => {
      switch(severity) {
          case 'High': return 'text-red-600 bg-red-50 dark:bg-red-900/20';
          case 'Medium': return 'text-amber-600 bg-amber-50 dark:bg-amber-900/20';
          default: return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20';
      }
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-2 space-y-6">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="text-indigo-500" /> Risk Dossier
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
             Consolidated risk profile and evidence repository.
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto relative z-20">
            <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search company dossier..." 
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
                            {filteredDossiers.length > 0 ? (
                                filteredDossiers.map(dossier => (
                                    <button
                                        key={dossier.id}
                                        onClick={() => handleSelectDossier(dossier)}
                                        className="w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 border-b border-slate-100 dark:border-slate-800 last:border-0 flex justify-between items-center group transition-colors"
                                    >
                                        <div>
                                            <p className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{dossier.name}</p>
                                            <p className="text-xs text-slate-500">{dossier.industry}</p>
                                        </div>
                                        {selectedDossier.id === dossier.id && <Check size={16} className="text-indigo-600 dark:text-indigo-400" />}
                                    </button>
                                ))
                            ) : (
                                <div className="p-4 text-center text-slate-500 text-sm">No dossiers found</div>
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
          
          {/* Left Column: Dossier Summary */}
          <div className="space-y-6">
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col items-center text-center relative overflow-hidden">
                  <div className={`absolute top-0 left-0 w-full h-1 ${
                      selectedDossier.riskLevel === 'Critical' ? 'bg-red-500' : 
                      selectedDossier.riskLevel === 'High' ? 'bg-orange-500' :
                      selectedDossier.riskLevel === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}></div>
                  
                  <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-4 text-3xl font-bold text-slate-400">
                      {selectedDossier.name.charAt(0)}
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{selectedDossier.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{selectedDossier.industry}</p>
                  
                  <div className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase border mb-6 ${getRiskColor(selectedDossier.riskLevel)}`}>
                      {selectedDossier.riskLevel} Risk
                  </div>

                  <div className="w-full grid grid-cols-2 gap-4 border-t border-slate-100 dark:border-slate-800 pt-6">
                      <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Risk Score</p>
                          <p className={`text-2xl font-bold ${
                                selectedDossier.riskScore > 75 ? 'text-red-500' :
                                selectedDossier.riskScore > 40 ? 'text-amber-500' : 'text-emerald-500'
                          }`}>{selectedDossier.riskScore}/100</p>
                      </div>
                      <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Last Review</p>
                          <p className="text-sm font-bold text-slate-800 dark:text-white mt-1">{selectedDossier.lastReviewDate}</p>
                      </div>
                  </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-sm uppercase tracking-wide">Risk Indicators</h3>
                  <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700/50">
                          <span className="text-sm text-slate-600 dark:text-slate-300">Sanctions</span>
                          <span className="flex items-center gap-1.5 text-sm font-medium">{getStatusIcon(selectedDossier.sanctionStatus)} {selectedDossier.sanctionStatus}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700/50">
                          <span className="text-sm text-slate-600 dark:text-slate-300">PEP Check</span>
                          <span className="flex items-center gap-1.5 text-sm font-medium">{getStatusIcon(selectedDossier.pepStatus)} {selectedDossier.pepStatus}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700/50">
                          <span className="text-sm text-slate-600 dark:text-slate-300">Adverse Media</span>
                          <span className="flex items-center gap-1.5 text-sm font-medium">{getStatusIcon(selectedDossier.adverseMedia)} {selectedDossier.adverseMedia}</span>
                      </div>
                  </div>
              </div>
          </div>

          {/* Right Column: Details & History */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col overflow-hidden">
              <div className="flex border-b border-slate-200 dark:border-slate-700">
                   <button 
                      onClick={() => setActiveTab('overview')}
                      className={`flex-1 py-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'overview' ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-200'}`}
                   >
                       Overview & Trends
                   </button>
                   <button 
                      onClick={() => setActiveTab('timeline')}
                      className={`flex-1 py-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'timeline' ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-200'}`}
                   >
                       Event History
                   </button>
                   <button 
                      onClick={() => setActiveTab('documents')}
                      className={`flex-1 py-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'documents' ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-200'}`}
                   >
                       Evidence Locker
                   </button>
              </div>

              <div className="flex-1 p-6 overflow-y-auto bg-slate-50/50 dark:bg-slate-900/50">
                  {activeTab === 'overview' && (
                      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                          <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm h-64 flex flex-col">
                              <h4 className="font-bold text-slate-900 dark:text-white mb-4">Risk Score Trend (6 Months)</h4>
                              <div className="flex-1 w-full min-h-0">
                                  <ResponsiveContainer width="100%" height="100%">
                                      <AreaChart data={selectedDossier.trendData}>
                                          <defs>
                                              <linearGradient id="colorDossierScore" x1="0" y1="0" x2="0" y2="1">
                                                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                                                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                                              </linearGradient>
                                          </defs>
                                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                                          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                                          <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                          <Tooltip 
                                              contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                              itemStyle={{ color: '#1e293b' }}
                                          />
                                          <Area type="monotone" dataKey="score" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#colorDossierScore)" />
                                      </AreaChart>
                                  </ResponsiveContainer>
                              </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                              <button className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors text-left group shadow-sm">
                                  <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-lg w-fit mb-3 group-hover:scale-110 transition-transform">
                                      <RefreshCw size={20} />
                                  </div>
                                  <h5 className="font-bold text-slate-900 dark:text-white">Refresh Data</h5>
                                  <p className="text-xs text-slate-500 mt-1">Run new screening check</p>
                              </button>
                              <button className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-red-300 dark:hover:border-red-700 transition-colors text-left group shadow-sm">
                                  <div className="p-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg w-fit mb-3 group-hover:scale-110 transition-transform">
                                      <AlertOctagon size={20} />
                                  </div>
                                  <h5 className="font-bold text-slate-900 dark:text-white">Escalate Case</h5>
                                  <p className="text-xs text-slate-500 mt-1">Flag for compliance review</p>
                              </button>
                          </div>
                      </div>
                  )}

                  {activeTab === 'timeline' && (
                      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                          <div className="relative pl-6 border-l-2 border-slate-200 dark:border-slate-700 space-y-8">
                              {selectedDossier.timeline.map((event, idx) => (
                                  <div key={event.id} className="relative">
                                      <div className={`absolute -left-[31px] top-0 w-4 h-4 rounded-full border-2 border-white dark:border-slate-900 ${
                                          event.type === 'Alert' ? 'bg-red-500' : 
                                          event.type === 'Change' ? 'bg-blue-500' : 'bg-slate-400'
                                      }`}></div>
                                      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                                          <div className="flex justify-between items-start mb-2">
                                              <div className="flex items-center gap-2">
                                                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                                                      event.type === 'Alert' ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400' : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                                                  }`}>
                                                      {event.type}
                                                  </span>
                                                  <span className="text-xs text-slate-400">{event.date}</span>
                                              </div>
                                              {event.severity && (
                                                  <span className={`text-[10px] font-bold uppercase ${getSeverityColor(event.severity)} px-2 py-0.5 rounded`}>
                                                      {event.severity} Priority
                                                  </span>
                                              )}
                                          </div>
                                          <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">{event.title}</h4>
                                          <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">{event.description}</p>
                                          <div className="text-xs text-slate-400 flex items-center gap-1">
                                              <User size={12} /> Logged by {event.user}
                                          </div>
                                      </div>
                                  </div>
                              ))}
                          </div>
                      </div>
                  )}

                  {activeTab === 'documents' && (
                      <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2">
                          {selectedDossier.documents.map((doc) => (
                              <div key={doc.id} className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
                                  <div className="flex items-center gap-4">
                                      <div className="p-2.5 bg-slate-100 dark:bg-slate-700 rounded-lg text-slate-500">
                                          <FileText size={20} />
                                      </div>
                                      <div>
                                          <p className="font-bold text-sm text-slate-900 dark:text-white">{doc.name}</p>
                                          <p className="text-xs text-slate-500">{doc.type} • {doc.date}</p>
                                      </div>
                                  </div>
                                  <div className="flex items-center gap-4">
                                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase border ${
                                          doc.status === 'Verified' ? 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800' : 
                                          doc.status === 'Flagged' ? 'bg-red-50 text-red-700 border-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800' :
                                          'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800'
                                      }`}>
                                          {doc.status}
                                      </span>
                                      <button className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                          <Eye size={18} />
                                      </button>
                                      <button className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                          <Download size={18} />
                                      </button>
                                  </div>
                              </div>
                          ))}
                          <button className="w-full py-3 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl text-slate-500 hover:border-indigo-300 hover:text-indigo-600 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                              <Download size={16} /> Request Additional Documents
                          </button>
                      </div>
                  )}
              </div>
          </div>
      </div>
    </div>
  );
};
