
import React, { useState } from 'react';
import { CheckCircle2, XCircle, FileText, Search, Check, AlertCircle, X } from 'lucide-react';

interface PaymentRequest {
  id: string;
  type: string;
  beneficiary: string;
  amount: string;
  date: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  details?: string;
  invoiceId?: string;
}

interface CompanyData {
  id: string;
  name: string;
  payments: PaymentRequest[];
}

export const SMEPaymentsVerification: React.FC = () => {
  // Mock Data
  const companiesList: CompanyData[] = [
      {
          id: '1',
          name: 'TechNova Solutions Ltd.',
          payments: [
              { id: 'PAY-001', type: 'Wire Transfer', beneficiary: 'Global Mfg Ltd. (CN)', amount: '$45,000.00', date: 'Oct 24, 2024', status: 'Pending', details: 'Equipment purchase', invoiceId: 'INV-2024-001' },
              { id: 'PAY-002', type: 'ACH Payment', beneficiary: 'Cloud Services Inc.', amount: '$1,200.00', date: 'Oct 23, 2024', status: 'Approved', details: 'Monthly hosting' }
          ]
      },
      {
          id: '2',
          name: 'GreenLeaf Logistics',
          payments: [
              { id: 'PAY-003', type: 'International Wire', beneficiary: 'EuroParts GmbH', amount: '€12,500.00', date: 'Oct 22, 2024', status: 'Pending', details: 'Spare parts inventory', invoiceId: 'INV-DE-882' }
          ]
      },
      {
          id: '3',
          name: 'Quantum Dynamics',
          payments: []
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

  const handleAction = (payId: string, action: 'Approved' | 'Rejected') => {
      const updatedPayments = selectedCompany.payments.map(p => 
          p.id === payId ? { ...p, status: action } : p
      );
      setSelectedCompany({ ...selectedCompany, payments: updatedPayments });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
         {/* Search Bar */}
        <div className="relative z-20">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                    type="text"
                    placeholder="Search company for outgoing payments..."
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
                <CheckCircle2 size={20} className="text-blue-500" /> Outgoing Payment Verification: {selectedCompany.name}
            </h3>
            
            {selectedCompany.payments.length > 0 ? (
                <div className="space-y-4">
                    {selectedCompany.payments.map((payment) => (
                        <div key={payment.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                                        payment.status === 'Pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                                        payment.status === 'Approved' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                                        'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                    }`}>
                                        {payment.status === 'Pending' ? 'Manual Review' : payment.status}
                                    </span>
                                    <h4 className="font-bold text-slate-900 dark:text-white mt-2">{payment.type}</h4>
                                    <p className="text-sm text-slate-500">Beneficiary: {payment.beneficiary}</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-xl font-bold text-slate-900 dark:text-white">{payment.amount}</span>
                                    <p className="text-xs text-slate-400">Date: {payment.date}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-800 mb-4">
                                <FileText size={16} className="text-slate-400" />
                                <span className="text-sm text-slate-600 dark:text-slate-300">
                                    {payment.details} {payment.invoiceId && `• Invoice #${payment.invoiceId}`}
                                </span>
                                {payment.invoiceId && (
                                    <button className="text-xs text-indigo-600 dark:text-indigo-400 font-bold ml-auto hover:underline">View Invoice</button>
                                )}
                            </div>

                            {payment.status === 'Pending' && (
                                <div className="flex gap-3">
                                    <button 
                                        onClick={() => handleAction(payment.id, 'Approved')}
                                        className="flex-1 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Check size={16} /> Approve
                                    </button>
                                    <button 
                                        onClick={() => handleAction(payment.id, 'Rejected')}
                                        className="flex-1 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <X size={16} /> Reject
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 text-slate-400 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-xl">
                    <CheckCircle2 size={32} className="mx-auto mb-2 opacity-50" />
                    <p>No outgoing payments pending verification.</p>
                </div>
            )}
        </div>
    </div>
  );
};
