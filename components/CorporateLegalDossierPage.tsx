
import React, { useState } from 'react';
import { Search, Scale, FileText, Award, Gavel, AlertCircle, CheckCircle2, Clock, Download, ChevronDown, Building2, Globe, Shield, Calendar, ExternalLink, RefreshCw } from 'lucide-react';

interface LegalDocument {
  id: string;
  name: string;
  type: string;
  issueDate: string;
  expiryDate?: string;
  status: 'Active' | 'Expired' | 'Pending';
}

interface LitigationCase {
  id: string;
  title: string;
  type: 'Civil' | 'Commercial' | 'Labor' | 'Tax';
  status: 'Open' | 'Closed' | 'Settled';
  dateFiled: string;
  riskLevel: 'High' | 'Medium' | 'Low';
  description: string;
}

interface IPAsset {
  id: string;
  name: string;
  type: 'Trademark' | 'Patent' | 'Copyright';
  registrationNumber: string;
  status: 'Registered' | 'Pending' | 'Expiring';
  renewalDate: string;
}

interface CompanyLegalProfile {
  id: string;
  name: string;
  registrationNumber: string;
  jurisdiction: string;
  incorporationDate: string;
  legalStatus: 'Good Standing' | 'Dissolved' | 'Delinquent';
  legalAddress: string;
  documents: LegalDocument[];
  litigation: LitigationCase[];
  ipAssets: IPAsset[];
}

export const CorporateLegalDossierPage: React.FC = () => {
  // Mock Data
  const companies: CompanyLegalProfile[] = [
    {
      id: '1',
      name: 'TechNova Solutions Ltd.',
      registrationNumber: 'INC-2021-9921',
      jurisdiction: 'Delaware, USA',
      incorporationDate: 'Oct 15, 2018',
      legalStatus: 'Good Standing',
      legalAddress: '1200 Tech Blvd, Suite 400, San Francisco, CA 94107',
      documents: [
        { id: 'LD1', name: 'Articles of Incorporation', type: 'Corporate', issueDate: 'Oct 15, 2018', status: 'Active' },
        { id: 'LD2', name: 'Business License 2024', type: 'License', issueDate: 'Jan 01, 2024', expiryDate: 'Dec 31, 2024', status: 'Active' },
        { id: 'LD3', name: 'Tax Clearance Certificate', type: 'Tax', issueDate: 'Mar 10, 2024', status: 'Active' }
      ],
      litigation: [
        { id: 'LIT1', title: 'Smith vs. TechNova', type: 'Labor', status: 'Settled', dateFiled: 'Feb 12, 2023', riskLevel: 'Low', description: 'Employment dispute regarding contract termination.' }
      ],
      ipAssets: [
        { id: 'IP1', name: 'TechNova Logo', type: 'Trademark', registrationNumber: 'TM-882910', status: 'Registered', renewalDate: 'Oct 15, 2028' },
        { id: 'IP2', name: 'Quantum Encryption Algo', type: 'Patent', registrationNumber: 'US-992102', status: 'Pending', renewalDate: 'N/A' }
      ]
    },
    {
      id: '2',
      name: 'GreenLeaf Logistics',
      registrationNumber: 'LLC-2019-4421',
      jurisdiction: 'Illinois, USA',
      incorporationDate: 'Mar 22, 2019',
      legalStatus: 'Good Standing',
      legalAddress: '456 Supply Chain Rd, Chicago, IL 60601',
      documents: [
        { id: 'LD4', name: 'Operating Agreement', type: 'Corporate', issueDate: 'Mar 22, 2019', status: 'Active' },
        { id: 'LD5', name: 'Interstate Transport Permit', type: 'License', issueDate: 'Jun 15, 2023', expiryDate: 'Jun 15, 2024', status: 'Expired' }
      ],
      litigation: [
        { id: 'LIT2', title: 'Vendor Payment Dispute', type: 'Commercial', status: 'Open', dateFiled: 'Sep 05, 2024', riskLevel: 'Medium', description: 'Dispute over damaged goods liability with subcontractor.' }
      ],
      ipAssets: []
    },
    {
      id: '3',
      name: 'Quantum Dynamics',
      registrationNumber: 'CORP-2020-1102',
      jurisdiction: 'Berlin, Germany',
      incorporationDate: 'Jan 10, 2020',
      legalStatus: 'Delinquent',
      legalAddress: 'Tech Park 1, Berlin, 10115',
      documents: [
        { id: 'LD6', name: 'Certificate of Registration', type: 'Corporate', issueDate: 'Jan 10, 2020', status: 'Active' },
        { id: 'LD7', name: 'Environmental Compliance', type: 'Regulatory', issueDate: 'Feb 01, 2023', status: 'Pending' }
      ],
      litigation: [
        { id: 'LIT3', title: 'Regulatory Fine Appeal', type: 'Commercial', status: 'Open', dateFiled: 'Aug 20, 2024', riskLevel: 'High', description: 'Appealing fine for late filing of annual returns.' }
      ],
      ipAssets: [
        { id: 'IP3', name: 'Quantum Core', type: 'Trademark', registrationNumber: 'EU-112233', status: 'Registered', renewalDate: 'Jan 10, 2030' }
      ]
    }
  ];

  const [selectedCompany, setSelectedCompany] = useState<CompanyLegalProfile>(companies[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'litigation' | 'ip' | 'documents'>('overview');

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCompany = (company: CompanyLegalProfile) => {
    setSelectedCompany(company);
    setSearchTerm("");
    setShowDropdown(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Good Standing': return 'text-emerald-600 bg-emerald-50 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800';
      case 'Delinquent': return 'text-red-600 bg-red-50 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800';
      case 'Dissolved': return 'text-slate-600 bg-slate-50 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700';
      default: return 'text-amber-600 bg-amber-50 border-amber-200';
    }
  };

  const getRiskColor = (level: string) => {
      switch(level) {
          case 'High': return 'text-red-600 bg-red-50 border-red-100 dark:bg-red-900/20 dark:text-red-400';
          case 'Medium': return 'text-amber-600 bg-amber-50 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400';
          case 'Low': return 'text-emerald-600 bg-emerald-50 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400';
          default: return 'text-slate-600 bg-slate-50';
      }
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-2 space-y-6">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Scale className="text-indigo-500" /> Extended Legal Dossier
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
             Comprehensive legal records, litigation history, and IP assets.
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
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
                                            <p className="text-xs text-slate-500">{comp.registrationNumber}</p>
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

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row gap-6 h-full min-h-0">
          
          {/* Sidebar Info */}
          <div className="w-full lg:w-80 shrink-0 space-y-6">
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                  <div className="flex flex-col items-center text-center mb-6">
                      <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-4">
                          <Building2 size={32} className="text-slate-400" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{selectedCompany.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase mt-2 ${getStatusColor(selectedCompany.legalStatus)}`}>
                          {selectedCompany.legalStatus}
                      </span>
                  </div>
                  
                  <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                      <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Registration No.</p>
                          <p className="text-sm font-mono text-slate-700 dark:text-slate-200">{selectedCompany.registrationNumber}</p>
                      </div>
                      <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Jurisdiction</p>
                          <p className="text-sm font-medium text-slate-700 dark:text-slate-200 flex items-center gap-2">
                              <Globe size={14} /> {selectedCompany.jurisdiction}
                          </p>
                      </div>
                      <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Incorporation Date</p>
                          <p className="text-sm font-medium text-slate-700 dark:text-slate-200 flex items-center gap-2">
                              <Calendar size={14} /> {selectedCompany.incorporationDate}
                          </p>
                      </div>
                      <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Registered Address</p>
                          <p className="text-sm text-slate-600 dark:text-slate-300">{selectedCompany.legalAddress}</p>
                      </div>
                  </div>
              </div>
          </div>

          {/* Right Content */}
          <div className="flex-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col overflow-hidden">
              <div className="flex border-b border-slate-200 dark:border-slate-700 px-6 overflow-x-auto">
                  {[
                      { id: 'overview', label: 'Overview', icon: FileText },
                      { id: 'litigation', label: 'Litigation & Disputes', icon: Gavel },
                      { id: 'ip', label: 'Intellectual Property', icon: Award },
                      { id: 'documents', label: 'Corporate Docs', icon: FileText }
                  ].map(tab => (
                      <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id as any)}
                          className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                              activeTab === tab.id 
                              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400' 
                              : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                          }`}
                      >
                          <tab.icon size={16} /> {tab.label}
                      </button>
                  ))}
              </div>

              <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-50/50 dark:bg-slate-900/50">
                  {activeTab === 'overview' && (
                      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                                  <h4 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                      <Gavel size={18} className="text-red-500" /> Active Litigation
                                  </h4>
                                  <div className="text-center py-6">
                                      <span className="text-4xl font-bold text-slate-900 dark:text-white">
                                          {selectedCompany.litigation.filter(l => l.status === 'Open').length}
                                      </span>
                                      <p className="text-sm text-slate-500 mt-1">Open Cases</p>
                                  </div>
                              </div>
                              <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                                  <h4 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                      <Award size={18} className="text-purple-500" /> IP Portfolio
                                  </h4>
                                  <div className="text-center py-6">
                                      <span className="text-4xl font-bold text-slate-900 dark:text-white">
                                          {selectedCompany.ipAssets.length}
                                      </span>
                                      <p className="text-sm text-slate-500 mt-1">Registered Assets</p>
                                  </div>
                              </div>
                          </div>
                          
                          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                              <h4 className="font-bold text-slate-900 dark:text-white mb-4">Compliance Summary</h4>
                              <div className="space-y-4">
                                  <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-700/50">
                                      <div className="flex items-center gap-3">
                                          <Shield size={18} className="text-emerald-500" />
                                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Annual Return Filing</span>
                                      </div>
                                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded">Up to Date</span>
                                  </div>
                                  <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-700/50">
                                      <div className="flex items-center gap-3">
                                          <Shield size={18} className="text-emerald-500" />
                                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Tax Compliance</span>
                                      </div>
                                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded">Verified</span>
                                  </div>
                              </div>
                          </div>
                      </div>
                  )}

                  {activeTab === 'litigation' && (
                      <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                          {selectedCompany.litigation.length > 0 ? (
                              selectedCompany.litigation.map(item => (
                                  <div key={item.id} className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                                      <div className="flex justify-between items-start mb-3">
                                          <div>
                                              <div className="flex items-center gap-2 mb-1">
                                                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase border ${getRiskColor(item.riskLevel)}`}>
                                                      {item.riskLevel} Risk
                                                  </span>
                                                  <span className="text-xs text-slate-500 font-mono">{item.id}</span>
                                              </div>
                                              <h4 className="text-lg font-bold text-slate-900 dark:text-white">{item.title}</h4>
                                          </div>
                                          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                                              item.status === 'Open' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                                              item.status === 'Settled' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                                              'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                                          }`}>
                                              {item.status}
                                          </span>
                                      </div>
                                      <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-100 dark:border-slate-700/50">
                                          {item.description}
                                      </p>
                                      <div className="flex justify-between items-center text-xs text-slate-500">
                                          <span>Filed: {item.dateFiled}</span>
                                          <span className="font-medium text-slate-700 dark:text-slate-300">{item.type} Litigation</span>
                                      </div>
                                  </div>
                              ))
                          ) : (
                              <div className="text-center py-16 text-slate-400">
                                  <CheckCircle2 size={48} className="mx-auto mb-3 opacity-30" />
                                  <p>No litigation records found.</p>
                              </div>
                          )}
                      </div>
                  )}

                  {activeTab === 'ip' && (
                      <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                          {selectedCompany.ipAssets.length > 0 ? (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {selectedCompany.ipAssets.map(asset => (
                                      <div key={asset.id} className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                                          <div className="flex justify-between items-start mb-3">
                                              <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-indigo-600 dark:text-indigo-400">
                                                  <Award size={20} />
                                              </div>
                                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase border ${
                                                  asset.status === 'Registered' ? 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800' :
                                                  'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800'
                                              }`}>
                                                  {asset.status}
                                              </span>
                                          </div>
                                          <h4 className="font-bold text-slate-900 dark:text-white mb-1">{asset.name}</h4>
                                          <p className="text-xs text-slate-500 font-mono mb-4">{asset.registrationNumber}</p>
                                          
                                          <div className="flex justify-between items-center pt-3 border-t border-slate-100 dark:border-slate-700 text-xs">
                                              <span className="text-slate-500">Type: <span className="font-medium text-slate-700 dark:text-slate-300">{asset.type}</span></span>
                                              <span className="text-slate-500">Renewal: {asset.renewalDate}</span>
                                          </div>
                                      </div>
                                  ))}
                              </div>
                          ) : (
                              <div className="text-center py-16 text-slate-400">
                                  <Award size={48} className="mx-auto mb-3 opacity-30" />
                                  <p>No intellectual property assets registered.</p>
                              </div>
                          )}
                      </div>
                  )}

                  {activeTab === 'documents' && (
                      <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2">
                          {selectedCompany.documents.map(doc => (
                              <div key={doc.id} className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:shadow-md transition-shadow">
                                  <div className="flex items-center gap-4">
                                      <div className="p-2.5 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 rounded-lg">
                                          <FileText size={20} />
                                      </div>
                                      <div>
                                          <p className="font-bold text-sm text-slate-900 dark:text-white">{doc.name}</p>
                                          <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                                              <span>{doc.type}</span>
                                              <span>•</span>
                                              <span>Issued: {doc.issueDate}</span>
                                              {doc.expiryDate && (
                                                  <>
                                                      <span>•</span>
                                                      <span className={doc.status === 'Expired' ? 'text-red-500 font-bold' : ''}>Expires: {doc.expiryDate}</span>
                                                  </>
                                              )}
                                          </div>
                                      </div>
                                  </div>
                                  <div className="flex items-center gap-4">
                                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase border ${
                                          doc.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800' :
                                          doc.status === 'Expired' ? 'bg-red-50 text-red-700 border-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800' :
                                          'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800'
                                      }`}>
                                          {doc.status}
                                      </span>
                                      <button className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                          <Download size={18} />
                                      </button>
                                  </div>
                              </div>
                          ))}
                          <button className="w-full py-3 mt-4 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl text-slate-500 hover:text-indigo-600 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                              <RefreshCw size={16} /> Request Document Update
                          </button>
                      </div>
                  )}

              </div>
          </div>

      </div>
    </div>
  );
};
