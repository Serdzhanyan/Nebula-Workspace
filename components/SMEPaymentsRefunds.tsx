
import React, { useState } from 'react';
import { RefreshCw, MessageCircle, Search, Check, CheckCircle2, XCircle } from 'lucide-react';

interface RefundRequest {
  id: string;
  orderId: string;
  amount: string;
  reason: string;
  customer: string;
  date: string;
  status: 'New' | 'Processed' | 'Dismissed';
}

interface CompanyData {
  id: string;
  name: string;
  refunds: RefundRequest[];
}

export const SMEPaymentsRefunds: React.FC = () => {
  // Mock Data
  const companiesList: CompanyData[] = [
      {
          id: '1',
          name: 'TechNova Solutions Ltd.',
          refunds: [
              { id: 'REF-001', orderId: 'ORD-2024-882', amount: '$1,200.00', reason: 'Customer claims duplicate charge on credit card statement.', customer: 'John Doe', date: 'Oct 24, 2024', status: 'New' },
              { id: 'REF-002', orderId: 'ORD-2024-771', amount: '$450.00', reason: 'Product damaged on arrival.', customer: 'Alice Smith', date: 'Oct 20, 2024', status: 'Processed' }
          ]
      },
      {
          id: '2',
          name: 'GreenLeaf Logistics',
          refunds: [
              { id: 'REF-003', orderId: 'ORD-2024-112', amount: '$2,500.00', reason: 'Service cancellation request.', customer: 'Robert Fox', date: 'Oct 22, 2024', status: 'New' }
          ]
      },
      {
          id: '3',
          name: 'Quantum Dynamics',
          refunds: []
      }
  ];

  const [selectedCompany, setSelectedCompany] = useState<CompanyData>(companiesList[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredCompanies = companiesList.filter(c =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCompany = (comp: CompanyData) => {
      setSelectedCompany(comp);
      setSearchTerm("");
      setShowDropdown(false);
  };

  const handleAction = (refId: string, action: 'Processed' | 'Dismissed') => {
      const updatedRefunds = selectedCompany.refunds.map(r => 
          r.id === refId ? { ...r, status: action } : r
      );
      setSelectedCompany({ ...selectedCompany, refunds: updatedRefunds });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
         {/* Search Bar */}
        <div className="relative z-20">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                    type="text"
                    placeholder="Search company for refunds..."
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
                <RefreshCw size={20} className="text-purple-500" /> Refunds & Clarifications: {selectedCompany.name}
            </h3>
            
            {selectedCompany.refunds.length > 0 ? (
                <div className="space-y-4">
                     {selectedCompany.refunds.map((refund) => (
                         <div key={refund.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                             <div className="flex justify-between items-start mb-2">
                                 <div>
                                     <span className="text-sm font-bold text-slate-900 dark:text-white">Order #{refund.orderId} Refund Request</span>
                                     <p className="text-xs text-slate-500">{refund.customer} • {refund.amount} • {refund.date}</p>
                                 </div>
                                 <span className={`text-xs font-bold px-2 py-0.5 rounded uppercase border ${
                                     refund.status === 'New' ? 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800' :
                                     refund.status === 'Processed' ? 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800' :
                                     'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600'
                                 }`}>
                                     {refund.status}
                                 </span>
                             </div>
                             
                             <div className="flex items-start gap-2 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800 mb-3">
                                 <MessageCircle size={16} className="text-slate-400 mt-0.5 shrink-0" />
                                 <p className="text-xs text-slate-600 dark:text-slate-300">"{refund.reason}"</p>
                             </div>

                             {refund.status === 'New' && (
                                 <div className="flex justify-end gap-2">
                                     <button 
                                        onClick={() => handleAction(refund.id, 'Dismissed')}
                                        className="text-xs font-bold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 px-3 py-1.5 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 rounded-lg transition-colors"
                                     >
                                         Dismiss
                                     </button>
                                     <button 
                                        onClick={() => handleAction(refund.id, 'Processed')}
                                        className="flex items-center gap-1 text-xs font-bold bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition-colors"
                                     >
                                         <RefreshCw size={12} /> Process Refund
                                     </button>
                                 </div>
                             )}
                             
                             {refund.status !== 'New' && (
                                 <div className="flex justify-end mt-2">
                                     {refund.status === 'Processed' ? (
                                         <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                             <CheckCircle2 size={14} /> Refund Issued
                                         </span>
                                     ) : (
                                         <span className="flex items-center gap-1 text-xs font-bold text-slate-500 dark:text-slate-400">
                                             <XCircle size={14} /> Request Dismissed
                                         </span>
                                     )}
                                 </div>
                             )}
                         </div>
                     ))}
                </div>
            ) : (
                <div className="text-center py-12 text-slate-400 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-xl">
                    <RefreshCw size={32} className="mx-auto mb-2 opacity-50" />
                    <p>No active refund requests for this company.</p>
                </div>
            )}
        </div>
    </div>
  );
};
