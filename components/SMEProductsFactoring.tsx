
import React, { useState } from 'react';
import { ArrowUpRight, FileText, Search, Check, DollarSign, PieChart, Plus, X, UploadCloud, Calendar, Percent } from 'lucide-react';

interface FactoringInvoice {
  id: string;
  customer: string;
  amount: string;
  dueDate: string;
  status: 'Available' | 'Factored' | 'Pending' | 'Paid';
  advanceRate: number; // e.g. 85%
  fee: string;
}

interface CompanyData {
  id: string;
  name: string;
  limit: string;
  outstanding: string;
  available: string;
  invoices: FactoringInvoice[];
}

export const SMEProductsFactoring: React.FC = () => {
  // Mock Data
  const companiesList: CompanyData[] = [
      {
          id: '1',
          name: 'TechNova Solutions Ltd.',
          limit: '$500,000.00',
          outstanding: '$125,400.00',
          available: '$374,600.00',
          invoices: [
              { id: 'INV-2024-001', customer: 'Global Corp', amount: '$45,000.00', dueDate: 'Nov 15, 2024', status: 'Available', advanceRate: 90, fee: '1.5%' },
              { id: 'INV-2024-002', customer: 'StartUp Inc', amount: '$12,000.00', dueDate: 'Dec 01, 2024', status: 'Factored', advanceRate: 85, fee: '2.0%' },
              { id: 'INV-2024-003', customer: 'Mega Retail', amount: '$8,500.00', dueDate: 'Oct 30, 2024', status: 'Pending', advanceRate: 90, fee: '1.5%' }
          ]
      },
      {
          id: '2',
          name: 'GreenLeaf Logistics',
          limit: '$150,000.00',
          outstanding: '$45,000.00',
          available: '$105,000.00',
          invoices: [
              { id: 'INV-GL-101', customer: 'SuperMart', amount: '$22,000.00', dueDate: 'Nov 20, 2024', status: 'Available', advanceRate: 85, fee: '2.5%' }
          ]
      },
      {
          id: '3',
          name: 'Quantum Dynamics',
          limit: '$1,000,000.00',
          outstanding: '$0.00',
          available: '$1,000,000.00',
          invoices: []
      }
  ];

  const [selectedCompany, setSelectedCompany] = useState<CompanyData>(companiesList[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [newInvoice, setNewInvoice] = useState({ number: '', customer: '', amount: '', date: '' });

  const filteredCompanies = companiesList.filter(c =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCompany = (comp: CompanyData) => {
      setSelectedCompany(comp);
      setSearchTerm("");
      setShowDropdown(false);
  };

  const handleFactorInvoice = (invId: string) => {
      const updatedInvoices = selectedCompany.invoices.map(inv => 
          inv.id === invId ? { ...inv, status: 'Pending' as const } : inv
      );
      setSelectedCompany({ ...selectedCompany, invoices: updatedInvoices });
      alert(`Invoice ${invId} submitted for factoring.`);
  };

  const handleSubmitInvoice = (e: React.FormEvent) => {
      e.preventDefault();
      const invoice: FactoringInvoice = {
          id: newInvoice.number || `INV-${Date.now()}`,
          customer: newInvoice.customer,
          amount: `$${newInvoice.amount}`,
          dueDate: newInvoice.date,
          status: 'Available',
          advanceRate: 85, // Default
          fee: '2.0%'
      };
      
      const updatedCompany = { ...selectedCompany, invoices: [invoice, ...selectedCompany.invoices] };
      setSelectedCompany(updatedCompany);
      setShowSubmitModal(false);
      setNewInvoice({ number: '', customer: '', amount: '', date: '' });
  };

  const getStatusColor = (status: string) => {
      switch(status) {
          case 'Available': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
          case 'Factored': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
          case 'Pending': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800';
          case 'Paid': return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
          default: return 'bg-slate-100 text-slate-700';
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
                    placeholder="Search company for factoring..."
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

        {/* Submit Invoice Modal */}
        {showSubmitModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setShowSubmitModal(false)}>
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200 dark:border-slate-700" onClick={e => e.stopPropagation()}>
                    <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white">Submit Invoice</h3>
                        <button onClick={() => setShowSubmitModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20}/></button>
                    </div>
                    <form onSubmit={handleSubmitInvoice} className="p-6 space-y-4">
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Invoice Number</label>
                            <input 
                                type="text" 
                                required
                                value={newInvoice.number}
                                onChange={(e) => setNewInvoice({...newInvoice, number: e.target.value})}
                                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Customer Name</label>
                            <input 
                                type="text" 
                                required
                                value={newInvoice.customer}
                                onChange={(e) => setNewInvoice({...newInvoice, customer: e.target.value})}
                                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                             <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Amount ($)</label>
                                <input 
                                    type="number" 
                                    required
                                    value={newInvoice.amount}
                                    onChange={(e) => setNewInvoice({...newInvoice, amount: e.target.value})}
                                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Due Date</label>
                                <input 
                                    type="date" 
                                    required
                                    value={newInvoice.date}
                                    onChange={(e) => setNewInvoice({...newInvoice, date: e.target.value})}
                                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                        </div>
                        
                        <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-6 text-center bg-slate-50 dark:bg-slate-900/50">
                             <UploadCloud size={24} className="mx-auto text-indigo-500 mb-2" />
                             <p className="text-xs text-slate-500">Upload invoice PDF (Optional)</p>
                        </div>

                        <button type="submit" className="w-full py-2.5 bg-indigo-600 text-white rounded-lg font-bold text-sm hover:bg-indigo-700 mt-2">Submit for Factoring</button>
                    </form>
                </div>
            </div>
        )}

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                    <ArrowUpRight size={20} className="text-indigo-500" /> Factoring Overview: {selectedCompany.name}
                </h3>
                <button 
                    onClick={() => setShowSubmitModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm"
                >
                    <Plus size={16} /> Submit Invoice
                </button>
            </div>
            
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="p-5 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2 mb-2 text-slate-500 uppercase text-xs font-bold tracking-wide">
                        <DollarSign size={16} className="text-blue-500" /> Total Limit
                    </div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{selectedCompany.limit}</p>
                </div>
                <div className="p-5 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2 mb-2 text-slate-500 uppercase text-xs font-bold tracking-wide">
                        <PieChart size={16} className="text-amber-500" /> Outstanding
                    </div>
                    <p className="text-2xl font-bold text-amber-600 dark:text-amber-500">{selectedCompany.outstanding}</p>
                </div>
                <div className="p-5 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2 mb-2 text-slate-500 uppercase text-xs font-bold tracking-wide">
                        <Check size={16} className="text-emerald-500" /> Available to Factor
                    </div>
                    <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-500">{selectedCompany.available}</p>
                </div>
            </div>

            {/* Invoices List */}
            <div>
                 <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-4">Invoice Management</h4>
                 {selectedCompany.invoices.length > 0 ? (
                     <div className="space-y-4">
                         {selectedCompany.invoices.map((inv) => (
                             <div key={inv.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                 <div className="flex justify-between items-start mb-3">
                                     <div>
                                         <div className="flex items-center gap-2 mb-1">
                                             <FileText size={16} className="text-slate-400" />
                                             <span className="font-bold text-slate-900 dark:text-white text-sm">{inv.id}</span>
                                         </div>
                                         <p className="text-xs text-slate-500">{inv.customer} • Due {inv.dueDate}</p>
                                     </div>
                                     <div className="text-right">
                                         <p className="font-bold text-lg text-slate-900 dark:text-white">{inv.amount}</p>
                                         <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${getStatusColor(inv.status)}`}>
                                             {inv.status}
                                         </span>
                                     </div>
                                 </div>
                                 
                                 <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700">
                                     <div className="flex gap-4 text-xs text-slate-500">
                                         <span className="flex items-center gap-1"><ArrowUpRight size={12} /> Advance: {inv.advanceRate}%</span>
                                         <span className="flex items-center gap-1"><Percent size={12} /> Fee: {inv.fee}</span>
                                     </div>
                                     
                                     {inv.status === 'Available' && (
                                         <button 
                                            onClick={() => handleFactorInvoice(inv.id)}
                                            className="px-4 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 transition-colors"
                                         >
                                             Factor This
                                         </button>
                                     )}
                                 </div>
                             </div>
                         ))}
                     </div>
                 ) : (
                     <div className="text-center py-12 text-slate-400 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-xl">
                         <FileText size={32} className="mx-auto mb-2 opacity-50" />
                         <p>No invoices available for factoring.</p>
                     </div>
                 )}
            </div>
        </div>
    </div>
  );
};
