
import React, { useState } from 'react';
import { Sliders, Search, Check, Save, AlertTriangle, ShieldCheck } from 'lucide-react';

interface TransactionLimits {
  dailyTransfer: number;
  monthlyTransfer: number;
  cardDaily: number;
  cardMonthly: number;
  wireTransfer: number;
}

interface CompanyData {
  id: string;
  name: string;
  limits: TransactionLimits;
}

export const SMEProductsLimits: React.FC = () => {
  // Mock Data
  const companiesList: CompanyData[] = [
      {
          id: '1',
          name: 'TechNova Solutions Ltd.',
          limits: { dailyTransfer: 50000, monthlyTransfer: 500000, cardDaily: 10000, cardMonthly: 100000, wireTransfer: 250000 }
      },
      {
          id: '2',
          name: 'GreenLeaf Logistics',
          limits: { dailyTransfer: 25000, monthlyTransfer: 200000, cardDaily: 5000, cardMonthly: 50000, wireTransfer: 100000 }
      },
      {
          id: '3',
          name: 'Quantum Dynamics',
          limits: { dailyTransfer: 100000, monthlyTransfer: 1000000, cardDaily: 20000, cardMonthly: 200000, wireTransfer: 500000 }
      }
  ];

  const [selectedCompany, setSelectedCompany] = useState<CompanyData>(companiesList[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [tempLimits, setTempLimits] = useState<TransactionLimits>(selectedCompany.limits);

  const filteredCompanies = companiesList.filter(c =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCompany = (comp: CompanyData) => {
      setSelectedCompany(comp);
      setTempLimits(comp.limits);
      setSearchTerm("");
      setShowDropdown(false);
  };

  const handleLimitChange = (field: keyof TransactionLimits, value: number) => {
      setTempLimits({ ...tempLimits, [field]: value });
  };

  const handleSaveLimits = () => {
      // Simulate API call
      setSelectedCompany({ ...selectedCompany, limits: tempLimits });
      alert("Limits updated successfully.");
  };

  const formatCurrency = (val: number) => {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 relative">
         {/* Search Bar */}
        <div className="relative z-20">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                    type="text"
                    placeholder="Search company for limit management..."
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
                <Sliders size={20} className="text-slate-500" /> Transaction Limits: {selectedCompany.name}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Transfer Limits */}
                <div className="space-y-6">
                    <h4 className="font-bold text-slate-800 dark:text-white text-sm uppercase tracking-wide border-b border-slate-100 dark:border-slate-800 pb-2">Online Transfers</h4>
                    
                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Daily Transfer Limit</label>
                            <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{formatCurrency(tempLimits.dailyTransfer)}</span>
                        </div>
                        <input 
                            type="range" 
                            min="0" max="200000" step="5000"
                            value={tempLimits.dailyTransfer}
                            onChange={(e) => handleLimitChange('dailyTransfer', parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600" 
                        />
                        <p className="text-xs text-slate-500 mt-1">Maximum allowed for online transfers per day.</p>
                    </div>

                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Monthly Transfer Limit</label>
                            <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{formatCurrency(tempLimits.monthlyTransfer)}</span>
                        </div>
                        <input 
                            type="range" 
                            min="0" max="2000000" step="50000"
                            value={tempLimits.monthlyTransfer}
                            onChange={(e) => handleLimitChange('monthlyTransfer', parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600" 
                        />
                    </div>

                     <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Wire Transfer (Single)</label>
                            <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{formatCurrency(tempLimits.wireTransfer)}</span>
                        </div>
                        <input 
                            type="range" 
                            min="0" max="1000000" step="10000"
                            value={tempLimits.wireTransfer}
                            onChange={(e) => handleLimitChange('wireTransfer', parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600" 
                        />
                    </div>
                </div>

                {/* Card Limits */}
                <div className="space-y-6">
                    <h4 className="font-bold text-slate-800 dark:text-white text-sm uppercase tracking-wide border-b border-slate-100 dark:border-slate-800 pb-2">Corporate Cards</h4>
                    
                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Daily Card Spend</label>
                            <span className="text-sm font-bold text-purple-600 dark:text-purple-400">{formatCurrency(tempLimits.cardDaily)}</span>
                        </div>
                        <input 
                            type="range" 
                            min="0" max="50000" step="1000"
                            value={tempLimits.cardDaily}
                            onChange={(e) => handleLimitChange('cardDaily', parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-600" 
                        />
                    </div>
                    
                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Monthly Card Spend</label>
                            <span className="text-sm font-bold text-purple-600 dark:text-purple-400">{formatCurrency(tempLimits.cardMonthly)}</span>
                        </div>
                        <input 
                            type="range" 
                            min="0" max="500000" step="5000"
                            value={tempLimits.cardMonthly}
                            onChange={(e) => handleLimitChange('cardMonthly', parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-600" 
                        />
                    </div>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center">
                 <div className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-3 py-2 rounded-lg">
                     <AlertTriangle size={14} />
                     Limits above $250k require additional security verification.
                 </div>
                 <button 
                    onClick={handleSaveLimits}
                    className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-lg flex items-center gap-2"
                 >
                     <Save size={18} /> Save Limits
                 </button>
            </div>
        </div>
    </div>
  );
};
