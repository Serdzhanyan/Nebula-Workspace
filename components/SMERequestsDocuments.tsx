
import React, { useState } from 'react';
import { FileQuestion, Send, Search, ChevronDown, Check, FileText, Clock, AlertCircle, Download, Eye, X, UploadCloud, CheckCircle2, RefreshCw } from 'lucide-react';

interface DocumentRequest {
  id: string;
  documentName: string;
  status: 'Pending Client' | 'Received' | 'Approved' | 'Rejected' | 'Expired';
  requestDate: string;
  dueDate?: string;
  description?: string;
  fileName?: string;
  size?: string;
}

interface CompanyDocuments {
  id: string;
  name: string;
  requests: DocumentRequest[];
}

export const SMERequestsDocuments: React.FC = () => {
    // Mock Data
    const companies: CompanyDocuments[] = [
        {
            id: '1',
            name: 'TechNova Solutions Ltd.',
            requests: [
                {
                    id: 'DR-101',
                    documentName: 'Updated Business License',
                    status: 'Pending Client',
                    requestDate: 'Oct 24, 2024',
                    dueDate: 'Nov 01, 2024',
                    description: 'Please provide the renewed business license for the current fiscal year.'
                },
                {
                    id: 'DR-102',
                    documentName: 'Q3 Financial Statements',
                    status: 'Received',
                    requestDate: 'Oct 15, 2024',
                    fileName: 'Q3_Financials_Signed.pdf',
                    size: '2.4 MB',
                    description: 'Audited financial statements for Q3.'
                },
                {
                    id: 'DR-103',
                    documentName: 'UBO Declaration',
                    status: 'Approved',
                    requestDate: 'Sep 01, 2024',
                    fileName: 'UBO_Form_Final.pdf',
                    size: '1.1 MB'
                }
            ]
        },
        {
            id: '2',
            name: 'GreenLeaf Logistics',
            requests: [
                {
                    id: 'DR-201',
                    documentName: 'Insurance Policy Certificate',
                    status: 'Rejected',
                    requestDate: 'Oct 20, 2024',
                    description: 'The uploaded policy was expired. Please upload the current valid policy.',
                    fileName: 'Insurance_Old.pdf',
                    size: '500 KB'
                }
            ]
        },
        {
            id: '3',
            name: 'Quantum Dynamics',
            requests: []
        }
    ];

    const [selectedCompany, setSelectedCompany] = useState<CompanyDocuments>(companies[0]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
    
    // New Request Form
    const [newRequestName, setNewRequestName] = useState("");
    const [newRequestDesc, setNewRequestDesc] = useState("");

    const filteredCompanies = companies.filter(c => 
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelectCompany = (comp: CompanyDocuments) => {
        setSelectedCompany(comp);
        setSearchTerm("");
        setShowDropdown(false);
    };

    const handleSendReminder = (id: string) => {
        alert(`Reminder sent for request ${id}`);
    };

    const handleReviewAction = (id: string, action: 'Approve' | 'Reject') => {
        const updatedRequests = selectedCompany.requests.map(req => 
            req.id === id ? { ...req, status: action === 'Approve' ? 'Approved' : 'Rejected' } as DocumentRequest : req
        );
        setSelectedCompany({ ...selectedCompany, requests: updatedRequests });
    };

    const handleCreateRequest = (e: React.FormEvent) => {
        e.preventDefault();
        const newReq: DocumentRequest = {
            id: `DR-${Date.now()}`,
            documentName: newRequestName,
            status: 'Pending Client',
            requestDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            description: newRequestDesc
        };
        setSelectedCompany({ ...selectedCompany, requests: [newReq, ...selectedCompany.requests] });
        setIsRequestModalOpen(false);
        setNewRequestName("");
        setNewRequestDesc("");
    };

    const getStatusColor = (status: string) => {
        switch(status) {
            case 'Approved': return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800';
            case 'Received': return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800';
            case 'Pending Client': return 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800';
            case 'Rejected': return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800';
            default: return 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600';
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 relative">
             {/* Search Bar */}
            <div className="relative z-20">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search company for document requests..." 
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setShowDropdown(true);
                        }}
                        onFocus={() => setShowDropdown(true)}
                        className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-slate-900 dark:text-white"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                        <ChevronDown size={16} />
                    </div>
                </div>
                
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
                                        <p className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{comp.name}</p>
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

            {/* New Request Modal */}
            {isRequestModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setIsRequestModalOpen(false)}>
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200 dark:border-slate-700" onClick={e => e.stopPropagation()}>
                        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Request Document</h3>
                            <button onClick={() => setIsRequestModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={20}/></button>
                        </div>
                        <form onSubmit={handleCreateRequest} className="p-6 space-y-4">
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Document Name</label>
                                <input 
                                    type="text" 
                                    required
                                    placeholder="e.g. Proof of Insurance"
                                    value={newRequestName}
                                    onChange={(e) => setNewRequestName(e.target.value)}
                                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Description / Instructions</label>
                                <textarea 
                                    rows={3}
                                    placeholder="Please provide additional details..."
                                    value={newRequestDesc}
                                    onChange={(e) => setNewRequestDesc(e.target.value)}
                                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white resize-none"
                                />
                            </div>
                            <button type="submit" className="w-full py-2.5 bg-indigo-600 text-white rounded-lg font-bold text-sm hover:bg-indigo-700 transition-colors shadow-lg mt-2">
                                Send Request
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                        <FileQuestion size={20} className="text-blue-500" /> 
                        Document Requests: {selectedCompany.name}
                    </h3>
                    <button 
                        onClick={() => setIsRequestModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm"
                    >
                        <Send size={16} /> New Request
                    </button>
                </div>
                
                {selectedCompany.requests.length > 0 ? (
                    <div className="space-y-4">
                        {selectedCompany.requests.map((req) => (
                            <div key={req.id} className="p-5 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors shadow-sm group">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500 mt-1">
                                            <FileText size={20} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-bold text-slate-900 dark:text-white text-base">{req.documentName}</h4>
                                                <span className="text-xs text-slate-400 font-mono">{req.id}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                                                <span className="flex items-center gap-1"><Clock size={12} /> Requested: {req.requestDate}</span>
                                                {req.dueDate && <span>Due: {req.dueDate}</span>}
                                            </div>
                                        </div>
                                    </div>
                                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase border ${getStatusColor(req.status)}`}>
                                        {req.status}
                                    </span>
                                </div>
                                
                                {req.description && (
                                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 pl-12 bg-slate-50 dark:bg-slate-900/50 p-2 rounded-lg border border-slate-100 dark:border-slate-800">
                                        {req.description}
                                    </p>
                                )}

                                {req.fileName && (
                                    <div className="flex items-center gap-3 pl-12 mb-4">
                                        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
                                            <FileText size={14} className="text-slate-500" />
                                            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{req.fileName}</span>
                                            <span className="text-[10px] text-slate-400">({req.size})</span>
                                        </div>
                                    </div>
                                )}

                                <div className="flex flex-wrap gap-2 pl-12 pt-2 border-t border-slate-100 dark:border-slate-700/50">
                                    {req.status === 'Pending Client' && (
                                        <button 
                                            onClick={() => handleSendReminder(req.id)}
                                            className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
                                        >
                                            <Send size={14} /> Send Reminder
                                        </button>
                                    )}
                                    
                                    {req.status === 'Received' && (
                                        <>
                                            <button className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5">
                                                <Download size={14} /> Download
                                            </button>
                                            <button 
                                                onClick={() => handleReviewAction(req.id, 'Approve')}
                                                className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700 transition-colors shadow-sm flex items-center gap-1.5"
                                            >
                                                <CheckCircle2 size={14} /> Approve
                                            </button>
                                            <button 
                                                onClick={() => handleReviewAction(req.id, 'Reject')}
                                                className="px-3 py-1.5 border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors flex items-center gap-1.5"
                                            >
                                                <X size={14} /> Reject
                                            </button>
                                        </>
                                    )}
                                    
                                    {req.status === 'Rejected' && (
                                        <button className="px-3 py-1.5 border border-indigo-200 dark:border-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/10 transition-colors flex items-center gap-1.5">
                                            <RefreshCw size={14} /> Re-request
                                        </button>
                                    )}
                                    
                                    {req.status === 'Approved' && (
                                        <button className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-xs font-bold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5">
                                            <Eye size={14} /> View
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-xl">
                        <FileQuestion size={32} className="mx-auto mb-2 opacity-50 text-slate-400" />
                        <p className="text-slate-500 dark:text-slate-400">No document requests found for this company.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
