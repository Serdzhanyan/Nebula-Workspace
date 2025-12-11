
import React, { useState } from 'react';
import { Tag, Check, Search, CreditCard, Shield, Zap, Plus, ArrowRight } from 'lucide-react';

interface TariffPlan {
  id: string;
  name: string;
  price: string;
  billing: 'Monthly' | 'Yearly';
  features: string[];
  isCurrent?: boolean;
}

interface ServicePackage {
  id: string;
  name: string;
  description: string;
  price: string;
  active: boolean;
}

interface CompanyData {
  id: string;
  name: string;
  currentPlan: TariffPlan;
  availablePlans: TariffPlan[];
  services: ServicePackage[];
}

export const SMEProductsTariffs: React.FC = () => {
  // Mock Data
  const companiesList: CompanyData[] = [
      {
          id: '1',
          name: 'TechNova Solutions Ltd.',
          currentPlan: { 
              id: 'PLAN-002', 
              name: 'Business Professional', 
              price: '$49.99', 
              billing: 'Monthly', 
              features: ['50 Free Transfers', 'Multi-currency Accounts', 'Dedicated Support'], 
              isCurrent: true 
          },
          availablePlans: [
              { id: 'PLAN-001', name: 'Start', price: '$0', billing: 'Monthly', features: ['5 Free Transfers', '1 Card'] },
              { id: 'PLAN-003', name: 'Enterprise', price: '$199', billing: 'Monthly', features: ['Unlimited Transfers', 'Unlimited Cards', 'Dedicated Manager'] }
          ],
          services: [
              { id: 'SVC-001', name: 'Payroll Plus', description: 'Automated tax handling', price: '$15/mo', active: true },
              { id: 'SVC-002', name: 'Legal Advisory', description: '2 hrs/month consultation', price: '$100/mo', active: false }
          ]
      },
      {
          id: '2',
          name: 'GreenLeaf Logistics',
          currentPlan: { 
              id: 'PLAN-001', 
              name: 'Start', 
              price: '$0', 
              billing: 'Monthly', 
              features: ['5 Free Transfers', '1 Card'], 
              isCurrent: true 
          },
          availablePlans: [
              { id: 'PLAN-002', name: 'Business Professional', price: '$49.99', billing: 'Monthly', features: ['50 Free Transfers', 'Multi-currency Accounts', 'Dedicated Support'] },
              { id: 'PLAN-003', name: 'Enterprise', price: '$199', billing: 'Monthly', features: ['Unlimited Transfers', 'Unlimited Cards', 'Dedicated Manager'] }
          ],
          services: [
              { id: 'SVC-001', name: 'Payroll Plus', description: 'Automated tax handling', price: '$15/mo', active: false }
          ]
      },
      {
          id: '3',
          name: 'Quantum Dynamics',
          currentPlan: { 
              id: 'PLAN-003', 
              name: 'Enterprise', 
              price: '$199', 
              billing: 'Monthly', 
              features: ['Unlimited Transfers', 'Unlimited Cards', 'Dedicated Manager'], 
              isCurrent: true 
          },
          availablePlans: [
               { id: 'PLAN-001', name: 'Start', price: '$0', billing: 'Monthly', features: ['5 Free Transfers', '1 Card'] },
               { id: 'PLAN-002', name: 'Business Professional', price: '$49.99', billing: 'Monthly', features: ['50 Free Transfers', 'Multi-currency Accounts', 'Dedicated Support'] }
          ],
          services: [
              { id: 'SVC-002', name: 'Legal Advisory', description: '2 hrs/month consultation', price: '$100/mo', active: true }
          ]
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

  const toggleService = (serviceId: string) => {
      const updatedServices = selectedCompany.services.map(s => 
          s.id === serviceId ? { ...s, active: !s.active } : s
      );
      setSelectedCompany({ ...selectedCompany, services: updatedServices });
  };

  const switchPlan = (planId: string) => {
      const newPlan = selectedCompany.availablePlans.find(p => p.id === planId);
      if (!newPlan) return;

      const oldCurrent = { ...selectedCompany.currentPlan, isCurrent: false };
      const newAvailable = selectedCompany.availablePlans.filter(p => p.id !== planId);
      newAvailable.push(oldCurrent); // Move old plan to available

      setSelectedCompany({
          ...selectedCompany,
          currentPlan: { ...newPlan, isCurrent: true },
          availablePlans: newAvailable.sort((a,b) => a.id.localeCompare(b.id))
      });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
         {/* Search Bar */}
        <div className="relative z-20">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                    type="text"
                    placeholder="Search company for tariffs..."
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                        <Tag size={20} className="text-purple-500" /> Current Plan: {selectedCompany.name}
                    </h3>
                    <div className="flex flex-col sm:flex-row items-start justify-between p-6 bg-purple-50 dark:bg-purple-900/10 rounded-2xl border border-purple-100 dark:border-purple-900/30 mt-4">
                        <div>
                            <h4 className="font-bold text-purple-900 dark:text-purple-100 text-2xl mb-1">{selectedCompany.currentPlan.name}</h4>
                            <p className="text-sm text-purple-700 dark:text-purple-300 font-medium">{selectedCompany.currentPlan.price} <span className="text-xs opacity-70">/ {selectedCompany.currentPlan.billing}</span></p>
                            <ul className="mt-6 space-y-3">
                                {selectedCompany.currentPlan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-sm text-purple-800 dark:text-purple-200">
                                        <div className="p-0.5 bg-purple-200 dark:bg-purple-800 rounded-full"><Check size={10} /></div> {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="mt-6 sm:mt-0">
                            <span className="inline-block px-3 py-1 bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 rounded-full text-xs font-bold uppercase tracking-wide border border-purple-100 dark:border-purple-900">Active Since Jan 2024</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6">Available Plans</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedCompany.availablePlans.map((plan) => (
                            <div key={plan.id} className="p-6 border border-slate-200 dark:border-slate-700 rounded-2xl hover:border-indigo-300 dark:hover:border-indigo-700 transition-all group bg-slate-50 dark:bg-slate-900/50">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white">{plan.name}</h4>
                                        <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">{plan.price} <span className="text-xs text-slate-500 font-normal">/ mo</span></p>
                                    </div>
                                    <div className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                                        {plan.name === 'Enterprise' ? <Shield size={20} className="text-indigo-500" /> : <Zap size={20} className="text-amber-500" />}
                                    </div>
                                </div>
                                <ul className="space-y-2 mb-6">
                                    {plan.features.slice(0, 2).map((feat, i) => (
                                        <li key={i} className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-2">
                                            <Check size={12} className="text-slate-400" /> {feat}
                                        </li>
                                    ))}
                                    <li className="text-xs text-slate-400 italic">+ more</li>
                                </ul>
                                <button 
                                    onClick={() => switchPlan(plan.id)}
                                    className="w-full py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                                >
                                    Switch to {plan.name}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="lg:col-span-1">
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm sticky top-6">
                     <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                         <Plus size={20} className="text-emerald-500" /> Service Packages
                     </h3>
                     <div className="space-y-4">
                         {selectedCompany.services.map((service) => (
                             <div key={service.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                 <div className="flex justify-between items-start mb-2">
                                     <div>
                                         <p className="font-bold text-slate-900 dark:text-white text-sm">{service.name}</p>
                                         <p className="text-xs text-slate-500 mt-0.5">{service.description}</p>
                                     </div>
                                     <div className="relative inline-flex items-center cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            className="sr-only peer"
                                            checked={service.active}
                                            onChange={() => toggleService(service.id)}
                                        />
                                        <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                                     </div>
                                 </div>
                                 <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-100 dark:border-slate-700">
                                     <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300">{service.price}</span>
                                     <span className={`text-[10px] uppercase font-bold ${service.active ? 'text-emerald-500' : 'text-slate-400'}`}>
                                         {service.active ? 'Active' : 'Inactive'}
                                     </span>
                                 </div>
                             </div>
                         ))}
                         <button className="w-full py-2 border border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-slate-500 hover:text-indigo-600 hover:border-indigo-300 transition-colors text-xs font-bold flex items-center justify-center gap-1">
                             <Plus size={14} /> Browse Catalog
                         </button>
                     </div>
                </div>
            </div>
        </div>
    </div>
  );
};
