
import React, { useState } from 'react';
import { Check, Edit2, Save, X, Plus, Trash2, Sliders, Shield, Zap, Globe, Users, Database, Layout, CreditCard, Server, Briefcase } from 'lucide-react';

interface PlanFeature {
  id: string;
  name: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  description: string;
  priceMonthly: number;
  priceYearly: number;
  currency: string;
  billingCycle: 'Monthly' | 'Yearly';
  limits: {
    users: number;
    storageGB: number;
    transactions: number;
  };
  features: PlanFeature[];
  isPopular?: boolean;
  color: string;
}

export const SMEProductsPlans: React.FC = () => {
  const [activeCycle, setActiveCycle] = useState<'Monthly' | 'Yearly'>('Monthly');
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // 10 Mock Plans
  const [plans, setPlans] = useState<Plan[]>([
    {
      id: '1',
      name: 'Starter',
      description: 'Perfect for freelancers and solopreneurs.',
      priceMonthly: 0,
      priceYearly: 0,
      currency: '$',
      billingCycle: 'Monthly',
      limits: { users: 1, storageGB: 5, transactions: 50 },
      features: [
        { id: 'f1', name: 'Basic Reporting', included: true },
        { id: 'f2', name: 'API Access', included: false },
        { id: 'f3', name: 'Priority Support', included: false },
        { id: 'f4', name: 'Custom Domain', included: false },
      ],
      color: 'bg-slate-500'
    },
    {
      id: '2',
      name: 'Micro Biz',
      description: 'For small teams getting started.',
      priceMonthly: 15,
      priceYearly: 150,
      currency: '$',
      billingCycle: 'Monthly',
      limits: { users: 5, storageGB: 20, transactions: 500 },
      features: [
        { id: 'f1', name: 'Basic Reporting', included: true },
        { id: 'f2', name: 'API Access', included: false },
        { id: 'f3', name: 'Priority Support', included: false },
        { id: 'f4', name: 'Custom Domain', included: true },
      ],
      color: 'bg-blue-500'
    },
    {
      id: '3',
      name: 'Growth',
      description: 'Scaling operations and sales.',
      priceMonthly: 49,
      priceYearly: 490,
      currency: '$',
      billingCycle: 'Monthly',
      limits: { users: 20, storageGB: 100, transactions: 5000 },
      features: [
        { id: 'f1', name: 'Advanced Reporting', included: true },
        { id: 'f2', name: 'API Access', included: true },
        { id: 'f3', name: 'Priority Support', included: true },
        { id: 'f4', name: 'Custom Domain', included: true },
      ],
      isPopular: true,
      color: 'bg-indigo-500'
    },
    {
      id: '4',
      name: 'Pro',
      description: 'Full power for established businesses.',
      priceMonthly: 99,
      priceYearly: 990,
      currency: '$',
      billingCycle: 'Monthly',
      limits: { users: 50, storageGB: 500, transactions: 20000 },
      features: [
        { id: 'f1', name: 'Advanced Reporting', included: true },
        { id: 'f2', name: 'API Access', included: true },
        { id: 'f3', name: '24/7 Support', included: true },
        { id: 'f4', name: 'White Labeling', included: true },
      ],
      color: 'bg-purple-500'
    },
    {
      id: '5',
      name: 'Enterprise',
      description: 'Maximum security and control.',
      priceMonthly: 299,
      priceYearly: 2990,
      currency: '$',
      billingCycle: 'Monthly',
      limits: { users: 500, storageGB: 5000, transactions: 100000 },
      features: [
        { id: 'f1', name: 'Custom Reporting', included: true },
        { id: 'f2', name: 'Dedicated API', included: true },
        { id: 'f3', name: 'SLA Support', included: true },
        { id: 'f4', name: 'SSO & Audit Logs', included: true },
      ],
      color: 'bg-slate-800'
    },
    {
      id: '6',
      name: 'E-Commerce',
      description: 'Specialized for online retailers.',
      priceMonthly: 79,
      priceYearly: 790,
      currency: '$',
      billingCycle: 'Monthly',
      limits: { users: 10, storageGB: 200, transactions: 50000 },
      features: [
        { id: 'f1', name: 'Inventory Sync', included: true },
        { id: 'f2', name: 'Marketplace Connect', included: true },
        { id: 'f3', name: 'Shipping Label Gen', included: true },
        { id: 'f4', name: 'Abandoned Cart', included: true },
      ],
      color: 'bg-emerald-500'
    },
    {
      id: '7',
      name: 'SaaS Starter',
      description: 'For software startups.',
      priceMonthly: 129,
      priceYearly: 1290,
      currency: '$',
      billingCycle: 'Monthly',
      limits: { users: 15, storageGB: 1000, transactions: 10000 },
      features: [
        { id: 'f1', name: 'Subscription Mgmt', included: true },
        { id: 'f2', name: 'Usage Metering', included: true },
        { id: 'f3', name: 'Churn Analytics', included: true },
        { id: 'f4', name: 'Dunning Mgmt', included: true },
      ],
      color: 'bg-pink-500'
    },
    {
      id: '8',
      name: 'Non-Profit',
      description: 'Discounted rate for NGOs.',
      priceMonthly: 25,
      priceYearly: 250,
      currency: '$',
      billingCycle: 'Monthly',
      limits: { users: 100, storageGB: 50, transactions: 2000 },
      features: [
        { id: 'f1', name: 'Donation Processing', included: true },
        { id: 'f2', name: 'Volunteer Mgmt', included: true },
        { id: 'f3', name: 'Grant Reporting', included: true },
        { id: 'f4', name: 'Tax Receipts', included: true },
      ],
      color: 'bg-amber-500'
    },
    {
      id: '9',
      name: 'Agency',
      description: 'Manage multiple client accounts.',
      priceMonthly: 199,
      priceYearly: 1990,
      currency: '$',
      billingCycle: 'Monthly',
      limits: { users: 25, storageGB: 2000, transactions: 15000 },
      features: [
        { id: 'f1', name: 'Multi-Tenant', included: true },
        { id: 'f2', name: 'Client Portal', included: true },
        { id: 'f3', name: 'White Label Reports', included: true },
        { id: 'f4', name: 'Commission Tracking', included: true },
      ],
      color: 'bg-cyan-500'
    },
    {
      id: '10',
      name: 'Global',
      description: 'For international operations.',
      priceMonthly: 499,
      priceYearly: 4990,
      currency: '$',
      billingCycle: 'Monthly',
      limits: { users: 1000, storageGB: 10000, transactions: 500000 },
      features: [
        { id: 'f1', name: 'Multi-Currency', included: true },
        { id: 'f2', name: 'Global Compliance', included: true },
        { id: 'f3', name: '24/7 Multi-lang Support', included: true },
        { id: 'f4', name: 'Local Routing', included: true },
      ],
      color: 'bg-violet-600'
    }
  ]);

  const handleEditPlan = (plan: Plan) => {
    setSelectedPlan(JSON.parse(JSON.stringify(plan))); // Deep copy
    setIsEditing(true);
  };

  const handleSavePlan = () => {
    if (selectedPlan) {
      setPlans(prev => prev.map(p => p.id === selectedPlan.id ? selectedPlan : p));
      setIsEditing(false);
      setSelectedPlan(null);
    }
  };

  const updateSelectedPlan = (field: keyof Plan, value: any) => {
    if (selectedPlan) {
      setSelectedPlan({ ...selectedPlan, [field]: value });
    }
  };

  const updateLimit = (limit: keyof Plan['limits'], value: number) => {
    if (selectedPlan) {
      setSelectedPlan({
        ...selectedPlan,
        limits: { ...selectedPlan.limits, [limit]: value }
      });
    }
  };

  const toggleFeature = (featureIndex: number) => {
    if (selectedPlan) {
      const updatedFeatures = [...selectedPlan.features];
      updatedFeatures[featureIndex].included = !updatedFeatures[featureIndex].included;
      setSelectedPlan({ ...selectedPlan, features: updatedFeatures });
    }
  };

  return (
    <div className="flex h-full animate-in fade-in slide-in-from-bottom-2 gap-6 relative px-8 pt-6 pb-2">
      
      {/* Plans Grid */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isEditing ? 'w-2/3 pr-2' : 'w-full'}`}>
        
        <div className="flex justify-between items-center mb-6">
           <div>
             <h3 className="text-3xl font-bold text-slate-900 dark:text-white">Tariff Plans</h3>
             <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage and customize your product pricing tiers.</p>
           </div>
           
           <div className="flex items-center bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <button 
                onClick={() => setActiveCycle('Monthly')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeCycle === 'Monthly' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setActiveCycle('Yearly')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeCycle === 'Yearly' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}
              >
                Yearly <span className="ml-1 text-[10px] font-normal opacity-80">(Save 20%)</span>
              </button>
           </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 pb-6">
           <div className={`grid gap-6 ${isEditing ? 'grid-cols-1 xl:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'}`}>
              {plans.map((plan) => (
                <div 
                  key={plan.id} 
                  onClick={() => handleEditPlan(plan)}
                  className={`relative group bg-white dark:bg-slate-900 rounded-2xl border transition-all cursor-pointer hover:shadow-lg flex flex-col overflow-hidden ${
                    selectedPlan?.id === plan.id 
                    ? 'border-indigo-500 ring-2 ring-indigo-500/20 z-10' 
                    : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700'
                  }`}
                >
                  {plan.isPopular && (
                    <div className="absolute top-0 right-0 bg-gradient-to-l from-indigo-500 to-purple-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl shadow-sm z-10">
                      MOST POPULAR
                    </div>
                  )}
                  
                  {/* Card Header */}
                  <div className={`h-2 ${plan.color}`}></div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                     <div className="flex justify-between items-start mb-4">
                        <div>
                           <h4 className="font-bold text-xl text-slate-900 dark:text-white">{plan.name}</h4>
                           <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{plan.description}</p>
                        </div>
                        <div className={`p-2 rounded-lg ${plan.color} bg-opacity-10 text-opacity-100`}>
                           <Briefcase size={20} className={plan.color.replace('bg-', 'text-')} />
                        </div>
                     </div>
                     
                     <div className="mb-6">
                        <div className="flex items-baseline gap-1">
                           <span className="text-3xl font-bold text-slate-900 dark:text-white">
                              {activeCycle === 'Monthly' ? `${plan.currency}${plan.priceMonthly}` : `${plan.currency}${plan.priceYearly}`}
                           </span>
                           <span className="text-sm text-slate-500 font-medium">/{activeCycle === 'Monthly' ? 'mo' : 'yr'}</span>
                        </div>
                     </div>
                     
                     <div className="space-y-3 mb-6 flex-1">
                        <div className="flex items-center justify-between text-xs">
                           <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5"><Users size={14}/> Users</span>
                           <span className="font-bold text-slate-700 dark:text-slate-200">{plan.limits.users}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                           <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5"><Database size={14}/> Storage</span>
                           <span className="font-bold text-slate-700 dark:text-slate-200">{plan.limits.storageGB} GB</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                           <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5"><Server size={14}/> Transactions</span>
                           <span className="font-bold text-slate-700 dark:text-slate-200">{plan.limits.transactions.toLocaleString()}</span>
                        </div>
                     </div>

                     <ul className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                        {plan.features.slice(0, 3).map(feat => (
                           <li key={feat.id} className={`text-xs flex items-center gap-2 ${feat.included ? 'text-slate-600 dark:text-slate-300' : 'text-slate-400 dark:text-slate-600 line-through decoration-slate-400'}`}>
                              <Check size={12} className={feat.included ? "text-emerald-500" : "text-slate-300"} />
                              {feat.name}
                           </li>
                        ))}
                        {plan.features.length > 3 && <li className="text-xs text-slate-400 italic pl-5">+ {plan.features.length - 3} more features</li>}
                     </ul>
                  </div>
                  
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800">
                     <button className="w-full py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2 group-hover:border-indigo-300 dark:group-hover:border-indigo-700">
                        <Edit2 size={14} /> Customize
                     </button>
                  </div>
                </div>
              ))}

              {/* Add New Plan Card */}
              <div className="bg-slate-50 dark:bg-slate-800/30 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center text-center p-8 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/10 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all cursor-pointer group min-h-[400px]">
                 <div className="w-16 h-16 rounded-full bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-slate-400 mb-4 group-hover:scale-110 transition-transform">
                    <Plus size={32} />
                 </div>
                 <h4 className="text-lg font-bold text-slate-700 dark:text-slate-300">Create New Plan</h4>
                 <p className="text-xs text-slate-500 mt-1 max-w-[200px]">Define a custom pricing tier for specific market segments.</p>
              </div>
           </div>
        </div>
      </div>

      {/* Editor Sidebar */}
      {isEditing && selectedPlan && (
        <div className="w-[400px] bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col h-full absolute right-0 top-0 bottom-0 z-20 animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
               <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">Edit Plan</h3>
                  <p className="text-xs text-slate-500">Customize limits & features</p>
               </div>
               <div className="flex gap-2">
                  <button onClick={handleSavePlan} className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"><Save size={18} /></button>
                  <button onClick={() => { setIsEditing(false); setSelectedPlan(null); }} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"><X size={18} /></button>
               </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
               {/* General Info */}
               <section className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2"><Layout size={14}/> General Information</h4>
                  <div className="space-y-3">
                     <div>
                        <label className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1 block">Plan Name</label>
                        <input 
                           type="text" 
                           value={selectedPlan.name}
                           onChange={(e) => updateSelectedPlan('name', e.target.value)}
                           className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 dark:text-white"
                        />
                     </div>
                     <div>
                        <label className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1 block">Description</label>
                        <textarea 
                           value={selectedPlan.description}
                           onChange={(e) => updateSelectedPlan('description', e.target.value)}
                           className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none h-20 text-slate-900 dark:text-white"
                        />
                     </div>
                     <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1 block">Monthly Price</label>
                            <div className="relative">
                               <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">{selectedPlan.currency}</span>
                               <input 
                                  type="number"
                                  value={selectedPlan.priceMonthly}
                                  onChange={(e) => updateSelectedPlan('priceMonthly', Number(e.target.value))}
                                  className="w-full pl-6 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                               />
                            </div>
                        </div>
                        <div>
                            <label className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1 block">Yearly Price</label>
                            <div className="relative">
                               <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">{selectedPlan.currency}</span>
                               <input 
                                  type="number"
                                  value={selectedPlan.priceYearly}
                                  onChange={(e) => updateSelectedPlan('priceYearly', Number(e.target.value))}
                                  className="w-full pl-6 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                               />
                            </div>
                        </div>
                     </div>
                  </div>
               </section>

               {/* Limits */}
               <section className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2"><Sliders size={14}/> Usage Limits</h4>
                  <div className="space-y-6">
                     <div>
                        <div className="flex justify-between items-center mb-2">
                           <label className="text-xs font-medium text-slate-600 dark:text-slate-300 flex items-center gap-1.5"><Users size={12}/> Max Users</label>
                           <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-2 py-0.5 rounded">{selectedPlan.limits.users}</span>
                        </div>
                        <input 
                           type="range" 
                           min="1" max="1000" step="1"
                           value={selectedPlan.limits.users}
                           onChange={(e) => updateLimit('users', Number(e.target.value))}
                           className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        />
                     </div>
                     <div>
                        <div className="flex justify-between items-center mb-2">
                           <label className="text-xs font-medium text-slate-600 dark:text-slate-300 flex items-center gap-1.5"><Database size={12}/> Storage (GB)</label>
                           <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-2 py-0.5 rounded">{selectedPlan.limits.storageGB}</span>
                        </div>
                        <input 
                           type="range" 
                           min="1" max="10000" step="10"
                           value={selectedPlan.limits.storageGB}
                           onChange={(e) => updateLimit('storageGB', Number(e.target.value))}
                           className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        />
                     </div>
                     <div>
                        <div className="flex justify-between items-center mb-2">
                           <label className="text-xs font-medium text-slate-600 dark:text-slate-300 flex items-center gap-1.5"><Server size={12}/> Monthly Tx</label>
                           <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-2 py-0.5 rounded">{selectedPlan.limits.transactions.toLocaleString()}</span>
                        </div>
                        <input 
                           type="range" 
                           min="100" max="500000" step="100"
                           value={selectedPlan.limits.transactions}
                           onChange={(e) => updateLimit('transactions', Number(e.target.value))}
                           className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        />
                     </div>
                  </div>
               </section>

               {/* Feature Toggles */}
               <section className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2"><Zap size={14}/> Feature Toggles</h4>
                  <div className="space-y-2">
                     {selectedPlan.features.map((feature, idx) => (
                        <div key={feature.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer" onClick={() => toggleFeature(idx)}>
                           <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{feature.name}</span>
                           <div className={`w-10 h-5 rounded-full relative transition-colors ${feature.included ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'}`}>
                              <div className={`absolute top-1 left-1 w-3 h-3 rounded-full bg-white shadow-sm transition-transform ${feature.included ? 'translate-x-5' : 'translate-x-0'}`}></div>
                           </div>
                        </div>
                     ))}
                  </div>
                  <button className="w-full py-2 border border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-slate-500 hover:text-indigo-600 hover:border-indigo-300 text-xs font-bold transition-colors flex items-center justify-center gap-1">
                     <Plus size={14} /> Add Feature
                  </button>
               </section>

               <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                  <button className="w-full py-2.5 bg-red-50 text-red-600 dark:bg-red-900/10 dark:text-red-400 border border-red-100 dark:border-red-900/30 rounded-xl text-sm font-bold hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors flex items-center justify-center gap-2">
                     <Trash2 size={16} /> Delete Plan
                  </button>
               </div>
            </div>
        </div>
      )}

    </div>
  );
};
