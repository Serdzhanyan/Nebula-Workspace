
import React, { useState } from 'react';
import { Lock, TrendingUp, Search, Check, Plus, Calculator, Calendar, DollarSign, X, Save, ArrowRight } from 'lucide-react';

interface Deposit {
  id: string;
  type: string;
  amount: string;
  rate: string;
  startDate: string;
  maturityDate: string;
  status: 'Active' | 'Matured' | 'Pending';
  projectedReturn: string;
}

interface CompanyData {
  id: string;
  name: string;
  deposits: Deposit[];
}

export const SMEProductsDeposits: React.FC = () => {
  // Mock Data
  const companiesList: CompanyData[] = [
      {
          id: '1',
          name: 'TechNova Solutions Ltd.',
          deposits: [
              { id: 'DEP-001', type: '12-Month Fixed', amount: '$100,000.00', rate: '4.5%', startDate: 'Aug 15, 2024', maturityDate: 'Aug 15, 2025', status: 'Active', projectedReturn: '$4,500.00' },
              { id: 'DEP-002', type: 'Business Savings', amount: '$50,000.00', rate: '2.1%', startDate: 'Jan 01, 2024', maturityDate: 'Open', status: 'Active', projectedReturn: 'Variable' }
          ]
      },
      {
          id: '2',
          name: 'GreenLeaf Logistics',
          deposits: [
              { id: 'DEP-003', type: '6-Month Term', amount: '$25,000.00', rate: '3.8%', startDate: 'Oct 01, 2024', maturityDate: 'Apr 01, 2025', status: 'Pending', projectedReturn: '$475.00' }
          ]
      },
      {
          id: '3',
          name: 'Quantum Dynamics',
          deposits: []
      }
  ];

  const [selectedCompany, setSelectedCompany] = useState<CompanyData>(companiesList[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  
  // Modal & Calculator State
  const [showOpenModal, setShowOpenModal] = useState(false);
  const [calcAmount, setCalcAmount] = useState<number | ''>('');
  const [calcTerm, setCalcTerm] = useState<number>(12);
  const [calcRate, setCalcRate] = useState<number>(4.5);

  const filteredCompanies = companiesList.filter(c =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCompany = (comp: CompanyData) => {
      setSelectedCompany(comp);
      setSearchTerm("");
      setShowDropdown(false);
  };

  const handleOpenDeposit = (e: React.FormEvent) => {
      e.preventDefault();
      const newDep: Deposit = {
          id: `DEP-${Date.now()}`,
          type: `${calcTerm}-Month Fixed`,
          amount: `$${Number(calcAmount).toLocaleString()}`,
          rate: `${calcRate}%`,
          startDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          maturityDate: new Date(new Date().setMonth(new Date().getMonth() + calcTerm)).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          status: 'Pending',
          projectedReturn: `$${((Number(calcAmount) * (calcRate / 100) * (calcTerm / 12))).toFixed(2)}`
      };
      
      const updatedCompany = { ...selectedCompany, deposits: [newDep, ...selectedCompany.deposits] };
      setSelectedCompany(updatedCompany);
      setShowOpenModal(false);
      setCalcAmount('');
  };

  const calculateReturn = () => {
      if (!calcAmount) return 0;
      return (Number(calcAmount) * (calcRate / 100) * (calcTerm / 12));
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 relative">
         {/* Search Bar */}
        <div className="relative z-20">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                    type="text"
                    placeholder="Search company for deposits..."
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

        {/* Open Deposit Modal */}
        {showOpenModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setShowOpenModal(false)}>
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200 dark:border-slate-700" onClick={e => e.stopPropagation()}>
                    <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white">Open Fixed Deposit</h3>
                        <button onClick={() => setShowOpenModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20}/></button>
                    </div>
                    <form onSubmit={handleOpenDeposit} className="p-6 space-y-6">
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Deposit Amount</label>
                            <div className="relative">
                                <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input 
                                    type="number" 
                                    required
                                    min="1000"
                                    value={calcAmount}
                                    onChange={(e) => setCalcAmount(e.target.value ? Number(e.target.value) : '')}
                                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-lg font-bold outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                                    placeholder="10,000.00"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                             <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Term (Months)</label>
                                <select 
                                    value={calcTerm}
                                    onChange={(e) => setCalcTerm(Number(e.target.value))}
                                    className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value={6}>6 Months</option>
                                    <option value={12}>12 Months</option>
                                    <option value={24}>24 Months</option>
                                    <option value={36}>36 Months</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Interest Rate</label>
                                <div className="px-3 py-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-300">
                                    {calcRate}% APY
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30 rounded-xl">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-sm font-medium text-emerald-800 dark:text-emerald-300">Est. Return</span>
                                <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                                    +${calculateReturn().toFixed(2)}
                                </span>
                            </div>
                            <p className="text-xs text-emerald-600/70 dark:text-emerald-400/70">Maturity: {new Date(new Date().setMonth(new Date().getMonth() + calcTerm)).toLocaleDateString()}</p>
                        </div>

                        <button type="submit" className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors shadow-lg">Confirm & Open</button>
                    </form>
                </div>
            </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                            <Lock size={20} className="text-blue-500" /> Active Deposits: {selectedCompany.name}
                        </h3>
                        <button 
                            onClick={() => setShowOpenModal(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm"
                        >
                            <Plus size={16} /> Open Deposit
                        </button>
                    </div>
                    
                    {selectedCompany.deposits.length > 0 ? (
                        <div className="space-y-4">
                            {selectedCompany.deposits.map((dep) => (
                                <div key={dep.id} className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors shadow-sm group">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <p className="text-xs text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wide mb-1">{dep.type}</p>
                                            <p className="text-2xl font-bold text-slate-900 dark:text-white">{dep.amount}</p>
                                        </div>
                                        <div className="text-right">
                                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${dep.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-400' : 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-400'}`}>
                                                {dep.status}
                                            </span>
                                            <p className="text-lg font-bold text-emerald-500 mt-1">{dep.rate}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden mb-4">
                                        <div className="bg-indigo-500 h-full w-[45%]"></div>
                                    </div>

                                    <div className="flex justify-between items-end">
                                        <div className="text-xs text-slate-500 space-y-1">
                                            <p className="flex items-center gap-1"><Calendar size={12}/> Start: {dep.startDate}</p>
                                            <p className="flex items-center gap-1"><ArrowRight size={12}/> Maturity: {dep.maturityDate}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] text-slate-400 uppercase">Proj. Return</p>
                                            <p className="font-bold text-slate-800 dark:text-white">{dep.projectedReturn}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-slate-400 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-xl">
                            <TrendingUp size={32} className="mx-auto mb-2 opacity-50" />
                            <p>No active deposits found for this company.</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg sticky top-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                            <Calculator size={24} />
                        </div>
                        <h3 className="font-bold text-lg">Return Simulator</h3>
                    </div>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="text-xs font-bold text-indigo-100 uppercase tracking-wide block mb-1">Investment Amount</label>
                            <div className="relative">
                                <DollarSign size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-200" />
                                <input 
                                    type="number" 
                                    value={calcAmount}
                                    onChange={(e) => setCalcAmount(e.target.value ? Number(e.target.value) : '')}
                                    placeholder="50,000"
                                    className="w-full pl-8 pr-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-indigo-300 outline-none focus:bg-white/20 transition-colors"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-indigo-100 uppercase tracking-wide block mb-1">Term (Months)</label>
                            <input 
                                type="range" 
                                min="6" max="60" step="6"
                                value={calcTerm}
                                onChange={(e) => setCalcTerm(Number(e.target.value))}
                                className="w-full h-2 bg-black/20 rounded-lg appearance-none cursor-pointer accent-white"
                            />
                            <div className="flex justify-between text-xs text-indigo-200 mt-1">
                                <span>6m</span>
                                <span className="font-bold text-white">{calcTerm} Months</span>
                                <span>60m</span>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-white/10 mt-2">
                             <div className="flex justify-between items-center mb-1">
                                 <span className="text-sm text-indigo-100">Interest Rate</span>
                                 <span className="font-bold">{calcRate}%</span>
                             </div>
                             <div className="flex justify-between items-center">
                                 <span className="text-sm text-indigo-100">Total Return</span>
                                 <span className="text-xl font-bold text-emerald-300">+${calculateReturn().toFixed(2)}</span>
                             </div>
                        </div>

                        <button 
                            onClick={() => setShowOpenModal(true)}
                            className="w-full py-2.5 bg-white text-indigo-600 rounded-xl text-sm font-bold hover:bg-indigo-50 transition-colors mt-2"
                        >
                            Apply for This Rate
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};
