
import React, { useState } from 'react';
import { Check, Plus, Search, Settings, Shield, MessageSquare, Briefcase, FileText, AlertCircle, X, Power, Loader2 } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  description: string;
  status: 'Active' | 'Inactive' | 'Pending';
  price: string;
  category: 'Communication' | 'Legal' | 'Support' | 'Financial';
}

interface CompanyData {
  id: string;
  name: string;
  services: Service[];
}

export const SMEProductsServices: React.FC = () => {
  // Mock Data
  const companiesList: CompanyData[] = [
      {
          id: '1',
          name: 'TechNova Solutions Ltd.',
          services: [
              { id: 'SVC-001', name: 'SMS Notifications', description: 'Real-time transaction alerts to mobile', status: 'Active', price: '$5.00/mo', category: 'Communication' },
              { id: 'SVC-002', name: 'Concierge Support', description: '24/7 Dedicated Personal Assistant', status: 'Active', price: '$150.00/mo', category: 'Support' },
              { id: 'SVC-003', name: 'Legal Doc Review', description: 'Monthly contract review (up to 5 docs)', status: 'Inactive', price: '$75.00/mo', category: 'Legal' }
          ]
      },
      {
          id: '2',
          name: 'GreenLeaf Logistics',
          services: [
              { id: 'SVC-004', name: 'Priority Audit', description: 'Expedited financial auditing', status: 'Pending', price: '$200.00/yr', category: 'Financial' },
              { id: 'SVC-001', name: 'SMS Notifications', description: 'Real-time transaction alerts to mobile', status: 'Active', price: '$5.00/mo', category: 'Communication' }
          ]
      },
      {
          id: '3',
          name: 'Quantum Dynamics',
          services: []
      }
  ];

  const [selectedCompany, setSelectedCompany] = useState<CompanyData>(companiesList[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCatalogModal, setShowCatalogModal] = useState(false);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const filteredCompanies = companiesList.filter(c =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCompany = (comp: CompanyData) => {
      setSelectedCompany(comp);
      setSearchTerm("");
      setShowDropdown(false);
  };

  const handleToggleService = (serviceId: string) => {
      setProcessingId(serviceId);
      setTimeout(() => {
          const updatedServices = selectedCompany.services.map(s => {
              if (s.id === serviceId) {
                  return { ...s, status: s.status === 'Active' ? 'Inactive' : 'Active' } as Service;
              }
              return s;
          });
          setSelectedCompany({ ...selectedCompany, services: updatedServices });
          setProcessingId(null);
      }, 800);
  };

  const getCategoryIcon = (category: string) => {
      switch(category) {
          case 'Communication': return <MessageSquare size={18} />;
          case 'Legal': return <FileText size={18} />;
          case 'Support': return <Shield size={18} />;
          case 'Financial': return <Briefcase size={18} />;
          default: return <Settings size={18} />;
      }
  };

  const getStatusColor = (status: string) => {
      switch(status) {
          case 'Active': return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800';
          case 'Pending': return 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800';
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
                    placeholder="Search company for services..."
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

        {/* Catalog Modal */}
        {showCatalogModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setShowCatalogModal(false)}>
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200 dark:border-slate-700" onClick={e => e.stopPropagation()}>
                    <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                            <Plus size={18} className="text-indigo-500" /> Service Catalog
                        </h3>
                        <button onClick={() => setShowCatalogModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20}/></button>
                    </div>
                    <div className="p-6">
                        <div className="space-y-3">
                            <div className="p-3 border border-slate-200 dark:border-slate-700 rounded-xl flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer">
                                <div>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white">Tax Advisory</p>
                                    <p className="text-xs text-slate-500">Expert consultation for quarterly filing</p>
                                </div>
                                <button className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700">Add</button>
                            </div>
                            <div className="p-3 border border-slate-200 dark:border-slate-700 rounded-xl flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer">
                                <div>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white">Cyber Insurance</p>
                                    <p className="text-xs text-slate-500">Coverage for data breaches</p>
                                </div>
                                <button className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700">Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                    <Settings size={20} className="text-indigo-500" /> Extra Services: {selectedCompany.name}
                </h3>
                <button 
                    onClick={() => setShowCatalogModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm"
                >
                    <Plus size={16} /> Browse Catalog
                </button>
            </div>
            
            {selectedCompany.services.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {selectedCompany.services.map((service) => (
                         <div key={service.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex flex-col justify-between">
                             <div className="flex justify-between items-start mb-2">
                                 <div className="flex items-center gap-3">
                                     <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500">
                                         {getCategoryIcon(service.category)}
                                     </div>
                                     <div>
                                         <p className="font-bold text-sm text-slate-900 dark:text-white">{service.name}</p>
                                         <span className="text-[10px] text-slate-400 uppercase tracking-wide font-semibold">{service.category}</span>
                                     </div>
                                 </div>
                                 <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${getStatusColor(service.status)}`}>
                                     {service.status}
                                 </span>
                             </div>
                             
                             <p className="text-xs text-slate-600 dark:text-slate-300 mb-4 pl-11">{service.description}</p>
                             
                             <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700">
                                 <p className="font-mono text-sm font-bold text-slate-800 dark:text-slate-200">{service.price}</p>
                                 <div className="flex gap-2">
                                     <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors" title="Configure">
                                         <Settings size={16} />
                                     </button>
                                     <button 
                                        onClick={() => handleToggleService(service.id)}
                                        disabled={processingId === service.id}
                                        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                                            service.status === 'Active' 
                                            ? 'bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40' 
                                            : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:hover:bg-emerald-900/40'
                                        }`}
                                     >
                                         {processingId === service.id ? <Loader2 size={14} className="animate-spin" /> : <Power size={14} />}
                                         {service.status === 'Active' ? 'Deactivate' : 'Activate'}
                                     </button>
                                 </div>
                             </div>
                         </div>
                     ))}
                </div>
            ) : (
                <div className="text-center py-12 text-slate-400 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-xl">
                    <Briefcase size={32} className="mx-auto mb-2 opacity-50" />
                    <p>No active services found for this company.</p>
                </div>
            )}
        </div>
    </div>
  );
};
