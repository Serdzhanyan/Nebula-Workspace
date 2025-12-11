
import React, { useState } from 'react';
import { Layers, UploadCloud, Search, Check, FileText, AlertTriangle, CheckCircle2, Clock, X, ArrowRight, RefreshCw, Download } from 'lucide-react';

interface PaymentBatch {
  id: string;
  name: string;
  uploadDate: string;
  totalRecords: number;
  totalAmount: string;
  status: 'Processing' | 'Completed' | 'Failed' | 'Validation Error';
  processedCount: number;
  errorCount: number;
}

interface CompanyData {
  id: string;
  name: string;
  batches: PaymentBatch[];
}

export const SMEPaymentsMass: React.FC = () => {
  // Mock Data
  const companiesList: CompanyData[] = [
      {
          id: '1',
          name: 'TechNova Solutions Ltd.',
          batches: [
              { id: 'BATCH-2024-10-01', name: 'Monthly Payroll - Oct', uploadDate: 'Oct 24, 2024 09:30 AM', totalRecords: 145, totalAmount: '$452,000.00', status: 'Processing', processedCount: 82, errorCount: 0 },
              { id: 'BATCH-2024-09-05', name: 'Vendor Payments Q3', uploadDate: 'Sep 30, 2024 14:15 PM', totalRecords: 50, totalAmount: '$120,500.00', status: 'Completed', processedCount: 50, errorCount: 0 },
              { id: 'BATCH-2024-09-01', name: 'Expense Reimbursements', uploadDate: 'Sep 05, 2024 10:00 AM', totalRecords: 12, totalAmount: '$8,400.00', status: 'Validation Error', processedCount: 0, errorCount: 3 }
          ]
      },
      {
          id: '2',
          name: 'GreenLeaf Logistics',
          batches: [
              { id: 'BATCH-GL-001', name: 'Driver Payouts', uploadDate: 'Oct 20, 2024 16:45 PM', totalRecords: 320, totalAmount: '$640,000.00', status: 'Completed', processedCount: 320, errorCount: 0 }
          ]
      },
      {
          id: '3',
          name: 'Quantum Dynamics',
          batches: []
      }
  ];

  const [selectedCompany, setSelectedCompany] = useState<CompanyData>(companiesList[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const filteredCompanies = companiesList.filter(c =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCompany = (comp: CompanyData) => {
      setSelectedCompany(comp);
      setSearchTerm("");
      setShowDropdown(false);
  };

  const getStatusColor = (status: string) => {
      switch(status) {
          case 'Completed': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
          case 'Processing': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
          case 'Validation Error': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800';
          case 'Failed': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
          default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
      }
  };

  const getStatusIcon = (status: string) => {
      switch(status) {
          case 'Completed': return <CheckCircle2 size={16} />;
          case 'Processing': return <RefreshCw size={16} className="animate-spin" />;
          case 'Validation Error': return <AlertTriangle size={16} />;
          case 'Failed': return <X size={16} />;
          default: return <Clock size={16} />;
      }
  };

  const handleFileUpload = () => {
      setIsUploading(true);
      setTimeout(() => setIsUploading(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
         {/* Search Bar */}
        <div className="relative z-20">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                    type="text"
                    placeholder="Search company for mass payments..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowDropdown(true);
                    }}
                    onFocus={() => setShowDropdown(true)}
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-slate-900 dark:text-white"
                />
            </div>
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
                                        <p className="font-bold text-slate-900 dark:text-white text-sm">{comp.name}</p>
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

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Layers size={20} className="text-indigo-500" /> Mass Payment Processing: {selectedCompany.name}
            </h3>
            
            {/* Upload Area */}
            <div className="mb-8 p-8 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900/50 flex flex-col items-center justify-center text-center hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group" onClick={handleFileUpload}>
                <div className={`p-4 rounded-full bg-white dark:bg-slate-800 shadow-sm mb-4 group-hover:scale-110 transition-transform ${isUploading ? 'animate-bounce' : ''}`}>
                    <UploadCloud size={32} className="text-indigo-500" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-1">
                    {isUploading ? 'Uploading & Validating...' : 'Upload Payment File'}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
                    Drag and drop your CSV, XML, or JSON file here. Supported templates: ISO 20022, NACHA, SEPA.
                </p>
                <div className="flex gap-4 mt-6">
                    <button className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
                        <FileText size={12} /> Download Template
                    </button>
                    <button className="text-xs font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:underline">
                        View Specification
                    </button>
                </div>
            </div>

            {/* Recent Batches */}
            <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-4">Recent Batches</h4>
                
                {selectedCompany.batches.length > 0 ? (
                    <div className="space-y-4">
                         {selectedCompany.batches.map((batch) => (
                             <div key={batch.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                                     <div className="flex items-center gap-4">
                                         <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500 border border-slate-200 dark:border-slate-700">
                                             <FileText size={20} />
                                         </div>
                                         <div>
                                             <p className="font-bold text-sm text-slate-900 dark:text-white">{batch.name}</p>
                                             <p className="text-xs text-slate-500 font-mono">{batch.id} • {batch.uploadDate}</p>
                                         </div>
                                     </div>
                                     <div className="flex items-center gap-6 w-full md:w-auto justify-between">
                                         <div className="text-right">
                                             <p className="text-sm font-bold text-slate-900 dark:text-white">{batch.totalAmount}</p>
                                             <p className="text-xs text-slate-500">{batch.totalRecords} records</p>
                                         </div>
                                         <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center gap-1.5 border ${getStatusColor(batch.status)}`}>
                                             {getStatusIcon(batch.status)}
                                             {batch.status}
                                         </span>
                                     </div>
                                 </div>
                                 
                                 {/* Progress / Status Detail */}
                                 <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800 flex items-center gap-4 text-xs">
                                     <div className="flex-1">
                                         <div className="flex justify-between mb-1">
                                             <span className="text-slate-600 dark:text-slate-400">Processing Progress</span>
                                             <span className="font-bold text-slate-800 dark:text-white">{Math.round((batch.processedCount / batch.totalRecords) * 100)}%</span>
                                         </div>
                                         <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                                             <div 
                                                 className={`h-full transition-all duration-1000 ${
                                                     batch.status === 'Completed' ? 'bg-emerald-500' :
                                                     batch.status === 'Processing' ? 'bg-blue-500' :
                                                     'bg-amber-500'
                                                 }`} 
                                                 style={{ width: `${(batch.processedCount / batch.totalRecords) * 100}%` }}
                                             ></div>
                                         </div>
                                     </div>
                                     
                                     {batch.errorCount > 0 ? (
                                         <button className="flex items-center gap-1 px-3 py-1.5 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg font-bold hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors">
                                             <AlertTriangle size={12} /> {batch.errorCount} Errors
                                         </button>
                                     ) : (
                                        <button className="flex items-center gap-1 px-3 py-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 rounded-lg font-bold transition-colors">
                                            <Download size={12} /> Report
                                        </button>
                                     )}
                                     
                                     <button className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-400">
                                         <ArrowRight size={14} />
                                     </button>
                                 </div>
                             </div>
                         ))}
                    </div>
                ) : (
                    <div className="text-center py-12 text-slate-400 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-xl">
                        <Layers size={32} className="mx-auto mb-2 opacity-50" />
                        <p>No payment batches found for this company.</p>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};
