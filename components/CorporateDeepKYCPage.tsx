
import React, { useState } from 'react';
import { Search, Shield, Check, AlertTriangle, FileText, UserCheck, Eye, X, Download, ChevronDown, CheckCircle2, XCircle, Building2, Globe, Activity, RefreshCw } from 'lucide-react';

interface KYCDocument {
  id: string;
  name: string;
  type: string;
  status: 'Verified' | 'Pending' | 'Rejected' | 'Expired';
  date: string;
}

interface UBO {
  id: string;
  name: string;
  share: number;
  status: 'Verified' | 'Pending' | 'Flagged';
  citizenship: string;
}

interface AMLHit {
  id: string;
  source: string;
  matchType: string;
  score: number;
  status: 'False Positive' | 'Potential Match' | 'Confirmed';
  details: string;
}

interface CorporateClient {
  id: string;
  name: string;
  industry: string;
  riskScore: number; // 0-100 (High is bad)
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  kycStatus: 'Verified' | 'In Progress' | 'Review Required';
  lastReview: string;
  ubos: UBO[];
  documents: KYCDocument[];
  amlHits: AMLHit[];
}

export const CorporateDeepKYCPage: React.FC = () => {
  // Mock Data
  const clients: CorporateClient[] = [
    {
      id: '1',
      name: 'TechNova Solutions Ltd.',
      industry: 'Technology',
      riskScore: 12,
      riskLevel: 'Low',
      kycStatus: 'Verified',
      lastReview: 'Oct 15, 2024',
      ubos: [
        { id: 'ubo1', name: 'Sarah Jenkins', share: 45, status: 'Verified', citizenship: 'USA' },
        { id: 'ubo2', name: 'Marcus Thorne', share: 30, status: 'Verified', citizenship: 'UK' },
        { id: 'ubo3', name: 'Venture Capital X', share: 25, status: 'Verified', citizenship: 'Cayman Islands' }
      ],
      documents: [
        { id: 'doc1', name: 'Certificate of Incorporation', type: 'Corporate', status: 'Verified', date: 'Oct 10, 2024' },
        { id: 'doc2', name: 'Memorandum of Association', type: 'Corporate', status: 'Verified', date: 'Oct 10, 2024' },
        { id: 'doc3', name: 'Proof of Address (Utility)', type: 'Address', status: 'Expired', date: 'Jan 12, 2023' }
      ],
      amlHits: []
    },
    {
      id: '2',
      name: 'GreenLeaf Logistics',
      industry: 'Logistics',
      riskScore: 45,
      riskLevel: 'Medium',
      kycStatus: 'In Progress',
      lastReview: 'Oct 20, 2024',
      ubos: [
        { id: 'ubo4', name: 'Michael Chen', share: 100, status: 'Verified', citizenship: 'Canada' }
      ],
      documents: [
        { id: 'doc4', name: 'Business License', type: 'Legal', status: 'Pending', date: 'Oct 22, 2024' },
        { id: 'doc5', name: 'Tax Registration', type: 'Tax', status: 'Verified', date: 'Oct 22, 2024' }
      ],
      amlHits: [
        { id: 'aml1', source: 'PEP List', matchType: 'Name Match', score: 85, status: 'Potential Match', details: 'Possible match with politically exposed person in region.' }
      ]
    },
    {
      id: '3',
      name: 'Quantum Dynamics',
      industry: 'Manufacturing',
      riskScore: 78,
      riskLevel: 'High',
      kycStatus: 'Review Required',
      lastReview: 'Sep 30, 2024',
      ubos: [
        { id: 'ubo5', name: 'Robert Ford', share: 40, status: 'Flagged', citizenship: 'Unknown' },
        { id: 'ubo6', name: 'Shell Corp A', share: 60, status: 'Pending', citizenship: 'Panama' }
      ],
      documents: [
        { id: 'doc6', name: 'Register of Directors', type: 'Legal', status: 'Pending', date: 'Sep 29, 2024' },
        { id: 'doc7', name: 'Financial Statements 2023', type: 'Financial', status: 'Rejected', date: 'Sep 29, 2024' }
      ],
      amlHits: [
        { id: 'aml2', source: 'Sanctions List', matchType: 'Entity Match', score: 99, status: 'Potential Match', details: 'Entity name matches watchlist entry #8821.' },
        { id: 'aml3', source: 'Adverse Media', matchType: 'Fuzzy Match', score: 60, status: 'False Positive', details: 'Name similarity in news article about fraud.' }
      ]
    }
  ];

  const [selectedClient, setSelectedClient] = useState<CorporateClient>(clients[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectClient = (client: CorporateClient) => {
    setSelectedClient(client);
    setSearchTerm("");
    setShowDropdown(false);
  };

  const handleDocumentAction = (docId: string, action: 'Verified' | 'Rejected') => {
    const updatedDocs = selectedClient.documents.map(doc => 
      doc.id === docId ? { ...doc, status: action } : doc
    );
    setSelectedClient({ ...selectedClient, documents: updatedDocs });
  };

  const handleAMLAction = (hitId: string, action: 'False Positive' | 'Confirmed') => {
    const updatedHits = selectedClient.amlHits.map(hit => 
      hit.id === hitId ? { ...hit, status: action } : hit
    );
    setSelectedClient({ ...selectedClient, amlHits: updatedHits });
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Low': return 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800';
      case 'Medium': return 'text-amber-600 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800';
      case 'High': return 'text-orange-600 bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800';
      case 'Critical': return 'text-red-600 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  const getDocStatusColor = (status: string) => {
    switch (status) {
      case 'Verified': return 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20';
      case 'Pending': return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20';
      case 'Rejected': return 'text-red-600 bg-red-50 dark:bg-red-900/20';
      case 'Expired': return 'text-amber-600 bg-amber-50 dark:bg-amber-900/20';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  return (
    <div className="flex flex-col h-full space-y-6 animate-in fade-in slide-in-from-bottom-2">
      
      {/* Search Bar */}
      <div className="relative z-30">
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
                type="text" 
                placeholder="Search corporate client..." 
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-slate-900 dark:text-white transition-all"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <ChevronDown size={16} />
            </div>
        </div>
        
        {showDropdown && (
            <>
                <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)}></div>
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden z-20 max-h-60 overflow-y-auto">
                    {filteredClients.length > 0 ? (
                        filteredClients.map(client => (
                            <button
                                key={client.id}
                                onClick={() => handleSelectClient(client)}
                                className="w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 border-b border-slate-100 dark:border-slate-800 last:border-0 flex justify-between items-center group transition-colors"
                            >
                                <div>
                                    <p className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{client.name}</p>
                                    <p className="text-xs text-slate-500">{client.industry}</p>
                                </div>
                                {selectedClient.id === client.id && <Check size={16} className="text-indigo-600 dark:text-indigo-400" />}
                            </button>
                        ))
                    ) : (
                        <div className="p-4 text-center text-slate-500 text-sm">No clients found</div>
                    )}
                </div>
            </>
        )}
      </div>

      {/* Overview Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
             <div>
                 <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                     <Shield className="text-indigo-500" /> {selectedClient.name}
                 </h2>
                 <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-3">
                    <span className="flex items-center gap-1"><Building2 size={12}/> {selectedClient.industry}</span>
                    <span className="flex items-center gap-1"><Activity size={12}/> Last Reviewed: {selectedClient.lastReview}</span>
                 </p>
             </div>
             <div className="flex items-center gap-4">
                 <div className="text-right">
                     <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Risk Level</p>
                     <span className={`inline-flex mt-1 px-3 py-1 rounded-full text-xs font-bold uppercase border ${getRiskColor(selectedClient.riskLevel)}`}>
                         {selectedClient.riskLevel} Risk
                     </span>
                 </div>
                 <div className="w-16 h-16 rounded-full border-4 border-slate-100 dark:border-slate-800 flex items-center justify-center relative">
                     <div className="absolute inset-0 rounded-full border-4 border-indigo-500 border-r-transparent border-b-transparent transform -rotate-45"></div>
                     <span className="text-xl font-bold text-slate-900 dark:text-white">{selectedClient.riskScore}</span>
                 </div>
             </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Column 1: UBOs & Structure */}
          <div className="lg:col-span-1 space-y-6">
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                      <UserCheck size={18} className="text-blue-500" /> Beneficial Owners (UBO)
                  </h3>
                  <div className="space-y-4">
                      {selectedClient.ubos.map(ubo => (
                          <div key={ubo.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                              <div className="flex justify-between items-start mb-2">
                                  <span className="font-bold text-slate-900 dark:text-white text-sm">{ubo.name}</span>
                                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                                      ubo.status === 'Verified' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                                      ubo.status === 'Flagged' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                                      'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                                  }`}>{ubo.status}</span>
                              </div>
                              <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                                  <span className="flex items-center gap-1"><Globe size={10}/> {ubo.citizenship}</span>
                                  <span className="font-medium text-slate-700 dark:text-slate-300">Ownership: {ubo.share}%</span>
                              </div>
                              {ubo.status !== 'Verified' && (
                                  <button className="w-full mt-3 py-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors">
                                      Perform Check
                                  </button>
                              )}
                          </div>
                      ))}
                  </div>
              </div>
          </div>

          {/* Column 2: Documents & AML */}
          <div className="lg:col-span-2 space-y-6">
              
              {/* AML Screening - Show only if there are hits or status is high risk */}
              {(selectedClient.amlHits.length > 0 || selectedClient.riskLevel === 'High') && (
                  <div className="bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-200 dark:border-red-900/30 p-6 shadow-sm">
                      <h3 className="font-bold text-lg text-red-700 dark:text-red-400 mb-4 flex items-center gap-2">
                          <AlertTriangle size={18} /> AML & Sanctions Screening
                      </h3>
                      {selectedClient.amlHits.length > 0 ? (
                          <div className="space-y-3">
                              {selectedClient.amlHits.map(hit => (
                                  <div key={hit.id} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-red-100 dark:border-red-900/30 shadow-sm">
                                      <div className="flex justify-between items-start mb-2">
                                          <div>
                                              <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wide flex items-center gap-1">
                                                  {hit.source} • Score {hit.score}
                                              </span>
                                              <p className="font-bold text-slate-900 dark:text-white mt-1">{hit.matchType}</p>
                                          </div>
                                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase border ${
                                              hit.status === 'Confirmed' ? 'bg-red-100 text-red-700 border-red-200' :
                                              hit.status === 'False Positive' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' :
                                              'bg-amber-100 text-amber-700 border-amber-200'
                                          }`}>
                                              {hit.status}
                                          </span>
                                      </div>
                                      <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 bg-slate-50 dark:bg-slate-800 p-2 rounded">
                                          {hit.details}
                                      </p>
                                      {hit.status === 'Potential Match' && (
                                          <div className="flex justify-end gap-2">
                                              <button 
                                                onClick={() => handleAMLAction(hit.id, 'False Positive')}
                                                className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                                              >
                                                  Mark False Positive
                                              </button>
                                              <button 
                                                onClick={() => handleAMLAction(hit.id, 'Confirmed')}
                                                className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-bold hover:bg-red-700 transition-colors"
                                              >
                                                  Confirm Match
                                              </button>
                                          </div>
                                      )}
                                  </div>
                              ))}
                          </div>
                      ) : (
                          <div className="text-center py-4 text-emerald-600 dark:text-emerald-400 font-medium">
                              No active hits found. System monitoring active.
                          </div>
                      )}
                  </div>
              )}

              {/* Document Verification */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                  <div className="flex justify-between items-center mb-6">
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                          <FileText size={18} className="text-indigo-500" /> Document Verification
                      </h3>
                      <button className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
                          <RefreshCw size={12} /> Request Update
                      </button>
                  </div>

                  <div className="space-y-4">
                      {selectedClient.documents.map(doc => (
                          <div key={doc.id} className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                              <div className="flex items-center gap-4">
                                  <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500">
                                      <FileText size={20} />
                                  </div>
                                  <div>
                                      <p className="font-bold text-sm text-slate-900 dark:text-white">{doc.name}</p>
                                      <div className="flex items-center gap-2 mt-0.5">
                                          <span className="text-xs text-slate-500">{doc.type}</span>
                                          <span className="text-xs text-slate-400">• {doc.date}</span>
                                      </div>
                                  </div>
                              </div>

                              <div className="flex items-center gap-4">
                                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${getDocStatusColor(doc.status)}`}>
                                      {doc.status}
                                  </span>
                                  
                                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <button className="p-1.5 text-slate-400 hover:text-indigo-600 transition-colors" title="View">
                                          <Eye size={16} />
                                      </button>
                                      <button className="p-1.5 text-slate-400 hover:text-indigo-600 transition-colors" title="Download">
                                          <Download size={16} />
                                      </button>
                                      {doc.status === 'Pending' && (
                                          <>
                                              <button 
                                                onClick={() => handleDocumentAction(doc.id, 'Verified')}
                                                className="p-1.5 text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded transition-colors" title="Approve"
                                              >
                                                  <CheckCircle2 size={16} />
                                              </button>
                                              <button 
                                                onClick={() => handleDocumentAction(doc.id, 'Rejected')}
                                                className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors" title="Reject"
                                              >
                                                  <XCircle size={16} />
                                              </button>
                                          </>
                                      )}
                                  </div>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};
