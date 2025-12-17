
import React, { useState } from 'react';
/* Added missing X and RefreshCw imports */
import { Search, Filter, Download, FileCheck, CheckCircle2, XCircle, Clock, AlertCircle, FileText, ChevronRight, User, Building2, Gavel, MoreHorizontal, Plus, ChevronDown, Check, Eye, Send, FileSignature, X, RefreshCw } from 'lucide-react';

interface ApprovalStep {
  id: string;
  role: string;
  name: string;
  status: 'Approved' | 'Pending' | 'Rejected' | 'In Progress';
  date?: string;
}

interface CorporateContract {
  id: string;
  title: string;
  type: 'MSA' | 'SLA' | 'NDA' | 'Lease' | 'Partnership';
  counterparty: string;
  value: string;
  dateSubmitted: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending Review' | 'In Review' | 'Approved' | 'Changes Requested' | 'Rejected';
  description: string;
  workflow: ApprovalStep[];
  attachments: { name: string; size: string }[];
}

interface CompanyContractProfile {
  id: string;
  name: string;
  industry: string;
  pendingCount: number;
  contracts: CorporateContract[];
}

export const CorporateContractApprovalPage: React.FC = () => {
  // Mock Data
  const companies: CompanyContractProfile[] = [
    {
      id: '1',
      name: 'TechNova Solutions Ltd.',
      industry: 'Technology',
      pendingCount: 2,
      contracts: [
        {
          id: 'CTR-8821',
          title: 'Master Service Agreement - Global Chips',
          type: 'MSA',
          counterparty: 'Global Chips Inc.',
          value: '$1,200,000',
          dateSubmitted: 'Oct 24, 2024',
          priority: 'High',
          status: 'In Review',
          description: 'Standard MSA for long-term component supply and technical support services.',
          attachments: [{ name: 'MSA_Draft_v2.pdf', size: '1.4 MB' }, { name: 'Annex_A_Pricing.xlsx', size: '450 KB' }],
          workflow: [
            { id: 'w1', role: 'Legal Review', name: 'Emily Davis', status: 'Approved', date: 'Oct 24, 10:00 AM' },
            { id: 'w2', role: 'Finance Review', name: 'John Smith', status: 'In Progress' },
            { id: 'w3', role: 'Executive Sign-off', name: 'Sarah Jenkins', status: 'Pending' }
          ]
        },
        {
          id: 'CTR-8822',
          title: 'Office Lease Renewal - Building 4',
          type: 'Lease',
          counterparty: 'PropMgmt Group',
          value: '$45,000/mo',
          dateSubmitted: 'Oct 22, 2024',
          priority: 'Medium',
          status: 'Pending Review',
          description: 'Renewal of the main engineering floor lease for an additional 36 months.',
          attachments: [{ name: 'Lease_Renewal_TermSheet.pdf', size: '890 KB' }],
          workflow: [
            { id: 'w4', role: 'Facilities Head', name: 'Marcus Thorne', status: 'Pending' },
            { id: 'w5', role: 'Legal Review', name: 'Emily Davis', status: 'Pending' }
          ]
        }
      ]
    },
    {
      id: '2',
      name: 'GreenLeaf Logistics',
      industry: 'Logistics',
      pendingCount: 1,
      contracts: [
        {
          id: 'CTR-7711',
          title: 'Vendor SLA - FastRoads Inc.',
          type: 'SLA',
          counterparty: 'FastRoads Delivery',
          value: 'Variable',
          dateSubmitted: 'Oct 25, 2024',
          priority: 'Low',
          status: 'Changes Requested',
          description: 'Service level agreement for secondary carrier services in the Midwest region.',
          attachments: [{ name: 'Carrier_SLA_Final.pdf', size: '2.1 MB' }],
          workflow: [
            { id: 'w6', role: 'Ops Manager', name: 'Michael Chen', status: 'Rejected', date: 'Today, 09:15 AM' }
          ]
        }
      ]
    }
  ];

  const [selectedCompany, setSelectedCompany] = useState<CompanyContractProfile>(companies[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedContract, setSelectedContract] = useState<CorporateContract | null>(companies[0].contracts[0] || null);
  const [filterType, setFilterType] = useState("All");

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCompany = (company: CompanyContractProfile) => {
    setSelectedCompany(company);
    setSearchTerm("");
    setShowDropdown(false);
    setSelectedContract(company.contracts.length > 0 ? company.contracts[0] : null);
  };

  const getStatusColor = (status: string) => {
      switch(status) {
          case 'Approved': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
          case 'In Review': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
          case 'Pending Review': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800';
          case 'Changes Requested': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800';
          case 'Rejected': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
          default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700';
      }
  };

  const getStepStatusIcon = (status: string) => {
      switch(status) {
          case 'Approved': return <CheckCircle2 size={16} className="text-emerald-500" />;
          case 'Rejected': return <XCircle size={16} className="text-red-500" />;
          case 'In Progress': return <Clock size={16} className="text-blue-500 animate-pulse" />;
          default: return <div className="w-4 h-4 rounded-full border-2 border-slate-200 dark:border-slate-700" />;
      }
  };

  const filteredContracts = selectedCompany.contracts.filter(c => filterType === "All" || c.type === filterType);

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-2 space-y-6">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileCheck className="text-indigo-500" /> Contract Approval
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
             Multi-stage internal verification and signatory workflow management.
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto relative z-20">
            <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search company or contract..." 
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
                <Plus size={18} /> New Contract
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
          
          {/* Left Column: Contracts List */}
          <div className="lg:col-span-2 flex flex-col gap-4 overflow-y-auto pr-2">
              <div className="flex justify-between items-center mb-2 px-1">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">Approval Queue</h3>
                  <div className="flex gap-2">
                       <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">
                           <Filter size={14} /> Filter
                       </button>
                  </div>
              </div>

              {filteredContracts.length > 0 ? filteredContracts.map(contract => (
                  <div 
                    key={contract.id} 
                    onClick={() => setSelectedContract(contract)}
                    className={`bg-white dark:bg-slate-900 p-5 rounded-2xl border transition-all cursor-pointer group hover:shadow-md relative overflow-hidden ${
                        selectedContract?.id === contract.id 
                        ? 'border-indigo-500 ring-1 ring-indigo-500 shadow-md' 
                        : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700'
                    }`}
                  >
                      <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                              <div className={`p-2.5 rounded-xl ${
                                  contract.priority === 'High' ? 'bg-red-50 text-red-600 dark:bg-red-900/30' :
                                  'bg-slate-100 text-slate-600 dark:bg-slate-800'
                              }`}>
                                  {contract.priority === 'High' ? <AlertCircle size={20} /> : <FileText size={20} />}
                              </div>
                              <div>
                                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">{contract.title}</h4>
                                  <p className="text-xs text-slate-500 font-mono mt-0.5">{contract.id} • {contract.type}</p>
                              </div>
                          </div>
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${getStatusColor(contract.status)}`}>
                              {contract.status}
                          </span>
                      </div>

                      <div className="flex justify-between items-end">
                          <div className="text-xs text-slate-500 space-y-1">
                              <p>Counterparty: <span className="font-medium text-slate-700 dark:text-slate-300">{contract.counterparty}</span></p>
                              <p>Submitted: <span className="font-medium text-slate-700 dark:text-slate-300">{contract.dateSubmitted}</span></p>
                          </div>
                          <div className="text-right">
                              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Value</p>
                              <p className="text-xl font-bold text-slate-900 dark:text-white">{contract.value}</p>
                          </div>
                      </div>
                  </div>
              )) : (
                  <div className="text-center py-16 text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                      <FileSignature size={48} className="mx-auto mb-2 opacity-30" />
                      <p className="font-medium">No contracts pending approval.</p>
                  </div>
              )}
          </div>

          {/* Right Column: Workflow Details */}
          <div className="space-y-6">
              {selectedContract ? (
                  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col h-full animate-in slide-in-from-right duration-300">
                      <div className="flex justify-between items-start mb-6">
                          <h3 className="font-bold text-lg text-slate-900 dark:text-white">Review Progress</h3>
                          <button onClick={() => setSelectedContract(null)} className="md:hidden text-slate-400"><X size={20} /></button>
                      </div>

                      <div className="space-y-6 flex-1">
                          {/* Details Summary */}
                          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700">
                              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Subject Summary</p>
                              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">"{selectedContract.description}"</p>
                          </div>

                          {/* Approval Stepper */}
                          <div className="relative pl-6 space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100 dark:before:bg-slate-800">
                              {selectedContract.workflow.map((step) => (
                                  <div key={step.id} className="relative group">
                                      <div className={`absolute -left-[31px] top-0 w-6 h-6 rounded-full border-4 border-white dark:border-slate-900 z-10 flex items-center justify-center transition-all bg-white dark:bg-slate-800 shadow-sm`}>
                                          {getStepStatusIcon(step.status)}
                                      </div>
                                      
                                      <div>
                                          <div className="flex justify-between items-baseline mb-0.5">
                                              <p className={`text-sm font-bold ${
                                                  step.status === 'Approved' ? 'text-slate-900 dark:text-white' :
                                                  step.status === 'In Progress' ? 'text-indigo-600 dark:text-indigo-400' :
                                                  'text-slate-400'
                                              }`}>
                                                  {step.role}
                                              </p>
                                              {step.date && <span className="text-[10px] text-slate-400 font-medium">{step.date}</span>}
                                          </div>
                                          <div className="flex items-center gap-2 mt-1">
                                              <div className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-[8px] font-bold text-slate-500">
                                                  {step.name.charAt(0)}
                                              </div>
                                              <span className="text-xs text-slate-500">{step.name}</span>
                                          </div>
                                      </div>
                                  </div>
                              ))}
                          </div>

                          {/* Attachments */}
                          <div>
                              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Documents</h4>
                              <div className="space-y-2">
                                  {selectedContract.attachments.map((file, i) => (
                                      <div key={i} className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 transition-colors cursor-pointer group">
                                          <div className="flex items-center gap-2">
                                              <FileText size={16} className="text-slate-400" />
                                              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{file.name}</span>
                                          </div>
                                          <Download size={14} className="text-slate-400 group-hover:text-indigo-500" />
                                      </div>
                                  ))}
                              </div>
                          </div>

                          {/* Action Bar */}
                          <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-700 space-y-3">
                              <div className="grid grid-cols-2 gap-3">
                                  <button className="py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm flex items-center justify-center gap-2">
                                      <Check size={16} /> Approve
                                  </button>
                                  <button className="py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                                      <RefreshCw size={16} /> Request Changes
                                  </button>
                              </div>
                              <button className="w-full py-2.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm font-bold hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors flex items-center justify-center gap-2">
                                  <XCircle size={16} /> Reject Contract
                              </button>
                          </div>
                      </div>
                  </div>
              ) : (
                  <div className="bg-slate-50 dark:bg-slate-900/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 p-8 flex flex-col items-center justify-center text-center h-full text-slate-400">
                      <FileCheck size={48} className="mb-4 opacity-20" />
                      <p className="font-medium">Select a contract to view its approval details</p>
                  </div>
              )}
          </div>
      </div>
    </div>
  );
};
