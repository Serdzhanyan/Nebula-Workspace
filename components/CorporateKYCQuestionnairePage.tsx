
import React, { useState } from 'react';
import { Search, Filter, Download, Save, CheckCircle2, XCircle, AlertCircle, ChevronRight, ChevronDown, FileText, UserCheck, Building2, Globe, Shield, Clock, UploadCloud, Check, MessageCircle } from 'lucide-react';

interface QuestionnaireSection {
  id: string;
  title: string;
  status: 'Completed' | 'In Progress' | 'Pending' | 'Flagged';
}

interface Question {
  id: string;
  question: string;
  answer: string;
  type: 'text' | 'select' | 'boolean' | 'date';
  flagged?: boolean;
}

interface CompanyKYC {
  id: string;
  name: string;
  industry: string;
  status: 'Draft' | 'Submitted' | 'Under Review' | 'Approved' | 'Rejected';
  submissionDate: string;
  assignee: string;
  progress: number;
  sections: {
    general: Question[];
    ownership: Question[];
    business: Question[];
    aml: Question[];
  };
}

export const CorporateKYCQuestionnairePage: React.FC = () => {
  // Mock Data
  const companies: CompanyKYC[] = [
    {
      id: '1',
      name: 'TechNova Solutions Ltd.',
      industry: 'Technology',
      status: 'Under Review',
      submissionDate: 'Oct 24, 2024',
      assignee: 'Sarah Lee',
      progress: 90,
      sections: {
        general: [
          { id: 'g1', question: 'Legal Entity Name', answer: 'TechNova Solutions Ltd.', type: 'text' },
          { id: 'g2', question: 'Registration Number', answer: '99210-XC', type: 'text' },
          { id: 'g3', question: 'Date of Incorporation', answer: '2019-05-15', type: 'date' },
          { id: 'g4', question: 'Registered Address', answer: '123 Tech Park, San Francisco, CA', type: 'text' },
        ],
        ownership: [
          { id: 'o1', question: 'Are there any UBOs with >25% share?', answer: 'Yes', type: 'boolean' },
          { id: 'o2', question: 'List of Directors provided?', answer: 'Yes', type: 'boolean' },
          { id: 'o3', question: 'Is the entity owned by a trust?', answer: 'No', type: 'boolean' }
        ],
        business: [
          { id: 'b1', question: 'Primary Business Activity', answer: 'Software Development', type: 'text' },
          { id: 'b2', question: 'Expected Annual Turnover', answer: '$10M - $50M', type: 'select' },
          { id: 'b3', question: 'Source of Funds', answer: 'Venture Capital & Revenue', type: 'text' }
        ],
        aml: [
          { id: 'a1', question: 'Does the entity deal with PEPs?', answer: 'No', type: 'boolean' },
          { id: 'a2', question: 'Operations in High Risk Jurisdictions?', answer: 'No', type: 'boolean' },
          { id: 'a3', question: 'AML Policy in place?', answer: 'Yes', type: 'boolean' }
        ]
      }
    },
    {
      id: '2',
      name: 'GreenLeaf Logistics',
      industry: 'Logistics',
      status: 'Submitted',
      submissionDate: 'Oct 20, 2024',
      assignee: 'Unassigned',
      progress: 100,
      sections: {
        general: [
          { id: 'g1', question: 'Legal Entity Name', answer: 'GreenLeaf Logistics', type: 'text' },
          { id: 'g2', question: 'Registration Number', answer: '88123-GL', type: 'text' },
           { id: 'g3', question: 'Date of Incorporation', answer: '2020-03-10', type: 'date' },
          { id: 'g4', question: 'Registered Address', answer: '456 Supply Chain Rd, Chicago, IL', type: 'text' },
        ],
        ownership: [
           { id: 'o1', question: 'Are there any UBOs with >25% share?', answer: 'Yes', type: 'boolean' },
           { id: 'o2', question: 'List of Directors provided?', answer: 'Yes', type: 'boolean' },
           { id: 'o3', question: 'Is the entity owned by a trust?', answer: 'No', type: 'boolean' }
        ],
        business: [
          { id: 'b1', question: 'Primary Business Activity', answer: 'Freight & Logistics', type: 'text' },
          { id: 'b2', question: 'Expected Annual Turnover', answer: '$5M - $10M', type: 'select' },
          { id: 'b3', question: 'Source of Funds', answer: 'Business Operations', type: 'text' }
        ],
        aml: [
           { id: 'a1', question: 'Does the entity deal with PEPs?', answer: 'No', type: 'boolean' },
           { id: 'a2', question: 'Operations in High Risk Jurisdictions?', answer: 'Yes', type: 'boolean', flagged: true },
           { id: 'a3', question: 'AML Policy in place?', answer: 'Yes', type: 'boolean' }
        ]
      }
    },
    {
      id: '3',
      name: 'Quantum Dynamics',
      industry: 'Manufacturing',
      status: 'Draft',
      submissionDate: '-',
      assignee: 'Alex J.',
      progress: 45,
      sections: {
        general: [
          { id: 'g1', question: 'Legal Entity Name', answer: 'Quantum Dynamics', type: 'text' },
          { id: 'g2', question: 'Registration Number', answer: 'DE-BER-1122', type: 'text' },
           { id: 'g3', question: 'Date of Incorporation', answer: '', type: 'date' },
          { id: 'g4', question: 'Registered Address', answer: '', type: 'text' },
        ],
        ownership: [],
        business: [],
        aml: []
      }
    }
  ];

  const [selectedCompany, setSelectedCompany] = useState<CompanyKYC>(companies[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'ownership' | 'business' | 'aml'>('general');

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCompany = (company: CompanyKYC) => {
    setSelectedCompany(company);
    setSearchTerm("");
    setShowDropdown(false);
    setActiveTab('general');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
      case 'Rejected': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
      case 'Under Review': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800';
      case 'Submitted': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    }
  };

  const handleApprove = () => {
    alert(`KYC for ${selectedCompany.name} Approved`);
    // In a real app, update state/backend
  };

  const handleReject = () => {
    alert(`KYC for ${selectedCompany.name} Rejected`);
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-2 space-y-6">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <UserCheck className="text-indigo-500" /> Enterprise KYC Questionnaire
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
             Review and manage Know Your Customer data for corporate entities.
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto relative z-20">
            <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search company questionnaire..." 
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

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">
          
          {/* Left Sidebar: Progress & Status */}
          <div className="lg:col-span-1 space-y-6">
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">{selectedCompany.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{selectedCompany.industry}</p>
                  
                  <div className="space-y-4">
                      <div>
                          <div className="flex justify-between items-end mb-2">
                              <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Completion</span>
                              <span className="text-sm font-bold text-slate-900 dark:text-white">{selectedCompany.progress}%</span>
                          </div>
                          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                              <div 
                                  className={`h-full rounded-full transition-all duration-1000 ${selectedCompany.progress === 100 ? 'bg-emerald-500' : 'bg-indigo-500'}`} 
                                  style={{ width: `${selectedCompany.progress}%` }}
                              ></div>
                          </div>
                      </div>

                      <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50">
                          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Current Status</p>
                          <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold uppercase border ${getStatusColor(selectedCompany.status)}`}>
                              {selectedCompany.status}
                          </span>
                      </div>

                      <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 pt-2">
                          <span>Submitted: {selectedCompany.submissionDate}</span>
                          <span>Assignee: {selectedCompany.assignee}</span>
                      </div>
                  </div>

                  {selectedCompany.status !== 'Draft' && (
                      <div className="grid grid-cols-2 gap-3 mt-6">
                          <button 
                            onClick={handleApprove}
                            className="flex items-center justify-center gap-2 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition-colors shadow-sm"
                          >
                              <CheckCircle2 size={14} /> Approve
                          </button>
                          <button 
                            onClick={handleReject}
                            className="flex items-center justify-center gap-2 py-2 bg-white dark:bg-slate-800 border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-xs font-bold hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                          >
                              <XCircle size={14} /> Reject
                          </button>
                      </div>
                  )}
              </div>

              {/* Navigation Tabs */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                  <div className="p-2 space-y-1">
                      {[
                          { id: 'general', label: 'General Information', icon: Building2 },
                          { id: 'ownership', label: 'Ownership Structure', icon: UserCheck },
                          { id: 'business', label: 'Business Profile', icon: Globe },
                          { id: 'aml', label: 'AML / CFT Checks', icon: Shield },
                      ].map(tab => (
                          <button
                              key={tab.id}
                              onClick={() => setActiveTab(tab.id as any)}
                              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                                  activeTab === tab.id 
                                  ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400' 
                                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                              }`}
                          >
                              <tab.icon size={18} />
                              {tab.label}
                              {activeTab === tab.id && <ChevronRight size={16} className="ml-auto" />}
                          </button>
                      ))}
                  </div>
              </div>
          </div>

          {/* Right Column: Questionnaire Content */}
          <div className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col overflow-hidden">
              <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                   <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                       {activeTab === 'general' && <Building2 size={20} className="text-indigo-500" />}
                       {activeTab === 'ownership' && <UserCheck size={20} className="text-indigo-500" />}
                       {activeTab === 'business' && <Globe size={20} className="text-indigo-500" />}
                       {activeTab === 'aml' && <Shield size={20} className="text-indigo-500" />}
                       {activeTab === 'general' ? 'General Information' : activeTab === 'ownership' ? 'Ownership Structure' : activeTab === 'business' ? 'Business Profile' : 'AML / CFT Checks'}
                   </h3>
                   <div className="flex gap-2">
                       <button className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg transition-colors">
                           <Clock size={14} /> History
                       </button>
                       <button className="flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors">
                           <Save size={14} /> Save Draft
                       </button>
                   </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-50/50 dark:bg-slate-900/50">
                  <div className="max-w-3xl mx-auto space-y-6">
                      {selectedCompany.sections[activeTab] && selectedCompany.sections[activeTab].length > 0 ? (
                          selectedCompany.sections[activeTab].map((q) => (
                              <div key={q.id} className={`bg-white dark:bg-slate-800 p-5 rounded-xl border shadow-sm transition-all ${q.flagged ? 'border-red-300 dark:border-red-900/50 ring-1 ring-red-200 dark:ring-red-900/20' : 'border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700'}`}>
                                  <div className="flex justify-between items-start mb-2">
                                      <label className="text-sm font-bold text-slate-700 dark:text-slate-200 block">{q.question}</label>
                                      {q.flagged && (
                                          <span className="flex items-center gap-1 text-[10px] font-bold text-red-600 bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded-full uppercase tracking-wide">
                                              <AlertCircle size={12} /> Flagged
                                          </span>
                                      )}
                                  </div>
                                  
                                  {q.type === 'text' && (
                                      <input 
                                          type="text" 
                                          defaultValue={q.answer}
                                          className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                      />
                                  )}

                                  {q.type === 'date' && (
                                      <input 
                                          type="date" 
                                          defaultValue={q.answer}
                                          className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                      />
                                  )}

                                  {q.type === 'select' && (
                                      <select 
                                          defaultValue={q.answer}
                                          className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                      >
                                          <option>{q.answer}</option>
                                          <option>Option 2</option>
                                          <option>Option 3</option>
                                      </select>
                                  )}

                                  {q.type === 'boolean' && (
                                      <div className="flex gap-4 mt-2">
                                          <label className="flex items-center gap-2 cursor-pointer">
                                              <input type="radio" name={q.id} defaultChecked={q.answer === 'Yes'} className="text-indigo-600 focus:ring-indigo-500" />
                                              <span className="text-sm text-slate-700 dark:text-slate-300">Yes</span>
                                          </label>
                                          <label className="flex items-center gap-2 cursor-pointer">
                                              <input type="radio" name={q.id} defaultChecked={q.answer === 'No'} className="text-indigo-600 focus:ring-indigo-500" />
                                              <span className="text-sm text-slate-700 dark:text-slate-300">No</span>
                                          </label>
                                      </div>
                                  )}

                                  <div className="mt-3 flex justify-end">
                                      <button className="text-xs text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 transition-colors">
                                          <MessageCircle size={12} /> Add Comment
                                      </button>
                                  </div>
                              </div>
                          ))
                      ) : (
                          <div className="flex flex-col items-center justify-center py-16 text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl">
                              <FileText size={48} className="mb-4 opacity-20" />
                              <p className="font-medium">No questions in this section.</p>
                          </div>
                      )}
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};
