
import React, { useState } from 'react';
import { Search, Filter, Download, Plus, CreditCard, Lock, Eye, EyeOff, MoreHorizontal, ShieldAlert, DollarSign, Calendar, TrendingUp, CheckCircle2, XCircle, ChevronDown, Check, Settings, FileText } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts';

interface CardTransaction {
  id: string;
  merchant: string;
  amount: number;
  date: string;
  category: string;
  status: 'Pending' | 'Posted' | 'Declined';
  cardLast4: string;
}

interface CorporateCard {
  id: string;
  last4: string;
  holderName: string;
  type: 'Physical' | 'Virtual';
  network: 'Visa' | 'Mastercard';
  tier: 'Platinum' | 'Black' | 'Gold';
  status: 'Active' | 'Frozen' | 'Cancelled';
  expiry: string;
  monthlyLimit: number;
  currentSpend: number;
  cvv?: string; // Mock property for reveal
}

interface CompanyCardProfile {
  id: string;
  name: string;
  industry: string;
  totalLimit: number;
  totalSpend: number;
  cards: CorporateCard[];
  transactions: CardTransaction[];
}

export const CorporateCardsPage: React.FC = () => {
  // Mock Data
  const companies: CompanyCardProfile[] = [
    {
      id: '1',
      name: 'TechNova Solutions Ltd.',
      industry: 'Technology',
      totalLimit: 500000,
      totalSpend: 124500,
      cards: [
        { id: 'C1', last4: '4242', holderName: 'Sarah Jenkins', type: 'Physical', network: 'Visa', tier: 'Black', status: 'Active', expiry: '12/26', monthlyLimit: 50000, currentSpend: 12450, cvv: '123' },
        { id: 'C2', last4: '8821', holderName: 'Engineering Ops', type: 'Virtual', network: 'Mastercard', tier: 'Platinum', status: 'Active', expiry: '09/25', monthlyLimit: 25000, currentSpend: 8200, cvv: '456' },
        { id: 'C3', last4: '1102', holderName: 'John Smith', type: 'Physical', network: 'Visa', tier: 'Gold', status: 'Frozen', expiry: '05/25', monthlyLimit: 15000, currentSpend: 0, cvv: '789' },
      ],
      transactions: [
        { id: 'TX1', merchant: 'AWS Web Services', amount: 4500.00, date: 'Oct 24, 2024', category: 'Software', status: 'Posted', cardLast4: '8821' },
        { id: 'TX2', merchant: 'Delta Airlines', amount: 1250.00, date: 'Oct 23, 2024', category: 'Travel', status: 'Posted', cardLast4: '4242' },
        { id: 'TX3', merchant: 'Hilton Hotels', amount: 850.00, date: 'Oct 22, 2024', category: 'Travel', status: 'Pending', cardLast4: '4242' },
        { id: 'TX4', merchant: 'Uber', amount: 45.50, date: 'Oct 21, 2024', category: 'Travel', status: 'Posted', cardLast4: '4242' },
        { id: 'TX5', merchant: 'GitHub Enterprise', amount: 2500.00, date: 'Oct 20, 2024', category: 'Software', status: 'Posted', cardLast4: '8821' },
      ]
    },
    {
      id: '2',
      name: 'GreenLeaf Logistics',
      industry: 'Logistics',
      totalLimit: 250000,
      totalSpend: 85000,
      cards: [
        { id: 'C4', last4: '5541', holderName: 'Michael Chen', type: 'Physical', network: 'Mastercard', tier: 'Platinum', status: 'Active', expiry: '11/27', monthlyLimit: 40000, currentSpend: 15200, cvv: '321' },
        { id: 'C5', last4: '9922', holderName: 'Fleet Fuel 01', type: 'Physical', network: 'Visa', tier: 'Gold', status: 'Active', expiry: '08/26', monthlyLimit: 10000, currentSpend: 4500, cvv: '654' }
      ],
      transactions: [
        { id: 'TX6', merchant: 'Shell Station #882', amount: 125.50, date: 'Oct 25, 2024', category: 'Fuel', status: 'Pending', cardLast4: '9922' },
        { id: 'TX7', merchant: 'FedEx Shipping', amount: 3400.00, date: 'Oct 24, 2024', category: 'Logistics', status: 'Posted', cardLast4: '5541' }
      ]
    },
    {
      id: '3',
      name: 'Quantum Dynamics',
      industry: 'Manufacturing',
      totalLimit: 1000000,
      totalSpend: 0,
      cards: [],
      transactions: []
    }
  ];

  const [selectedCompany, setSelectedCompany] = useState<CompanyCardProfile>(companies[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CorporateCard | null>(companies[0].cards[0] || null);
  const [showSensitiveData, setShowSensitiveData] = useState(false);

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCompany = (company: CompanyCardProfile) => {
    setSelectedCompany(company);
    setSearchTerm("");
    setShowDropdown(false);
    setSelectedCard(company.cards.length > 0 ? company.cards[0] : null);
    setShowSensitiveData(false);
  };

  const handleToggleFreeze = (cardId: string) => {
    const updatedCards = selectedCompany.cards.map(c => 
      c.id === cardId ? { ...c, status: c.status === 'Active' ? 'Frozen' : 'Active' as const } : c
    );
    setSelectedCompany({ ...selectedCompany, cards: updatedCards });
    if (selectedCard?.id === cardId) {
      setSelectedCard(prev => prev ? { ...prev, status: prev.status === 'Active' ? 'Frozen' : 'Active' } : null);
    }
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  const getCardGradient = (tier: string, status: string) => {
    if (status === 'Frozen') return 'from-slate-400 to-slate-500 grayscale';
    switch (tier) {
      case 'Black': return 'from-slate-900 via-slate-800 to-black';
      case 'Platinum': return 'from-slate-300 via-slate-400 to-slate-500';
      case 'Gold': return 'from-amber-200 via-amber-400 to-amber-500';
      default: return 'from-blue-600 to-indigo-700';
    }
  };

  const spendData = selectedCompany.cards.map(card => ({
      name: card.holderName.split(' ')[0], // First name for chart brevity
      spend: card.currentSpend,
      limit: card.monthlyLimit
  }));

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-2 space-y-6">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CreditCard className="text-indigo-500" /> Corporate Cards
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
             Manage employee cards, set spending limits, and track expenses.
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto relative z-20">
            <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search company..." 
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowDropdown(true);
                    }}
                    onFocus={() => setShowDropdown(true)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-slate-900 dark:text-white"
                />
                
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
                                        <div>
                                            <p className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{comp.name}</p>
                                            <p className="text-xs text-slate-500">{comp.industry}</p>
                                        </div>
                                        {selectedCompany.id === comp.id && <CheckCircle2 size={16} className="text-indigo-600 dark:text-indigo-400" />}
                                    </button>
                                ))
                            ) : (
                                <div className="p-4 text-center text-slate-500 text-sm">No companies found</div>
                            )}
                        </div>
                    </>
                )}
            </div>
            
            <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 dark:shadow-none">
                <Plus size={18} /> Issue Card
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
          
          {/* Left Column: Card Visuals & Controls */}
          <div className="space-y-6">
              {/* Active Card Display */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col items-center">
                  <div className="w-full flex justify-between items-center mb-4">
                      <h3 className="font-bold text-slate-900 dark:text-white text-lg">Selected Card</h3>
                      <div className="flex gap-2">
                         {selectedCompany.cards.map((card, idx) => (
                             <div 
                                key={card.id} 
                                onClick={() => setSelectedCard(card)}
                                className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all ${selectedCard?.id === card.id ? 'bg-indigo-600 scale-125' : 'bg-slate-300 dark:bg-slate-700'}`}
                             ></div>
                         ))}
                      </div>
                  </div>

                  {selectedCard ? (
                      <div className={`w-full aspect-[1.586] rounded-2xl bg-gradient-to-br ${getCardGradient(selectedCard.tier, selectedCard.status)} p-6 text-white shadow-xl relative overflow-hidden transition-all duration-500`}>
                          {/* Card Content */}
                          <div className="relative z-10 flex flex-col h-full justify-between">
                              <div className="flex justify-between items-start">
                                  <div className="italic font-serif font-bold text-2xl tracking-wider opacity-90">BankCorp</div>
                                  <div className="text-lg font-bold italic opacity-90">{selectedCard.network}</div>
                              </div>
                              
                              <div className="flex items-center gap-4 my-2">
                                  <div className="w-12 h-9 bg-yellow-200/20 rounded-md border border-white/30 backdrop-blur-sm"></div>
                                  <div className="rotate-90"><span className="block w-6 h-6 border-2 border-white/50 rounded-full"></span></div>
                              </div>

                              <div className="space-y-4">
                                  <div className="font-mono text-xl md:text-2xl tracking-widest drop-shadow-md">
                                      {showSensitiveData ? `4532 1029 3847 ${selectedCard.last4}` : `•••• •••• •••• ${selectedCard.last4}`}
                                  </div>
                                  
                                  <div className="flex justify-between items-end text-xs uppercase tracking-wider font-medium opacity-90">
                                      <div>
                                          <p className="opacity-70 text-[8px]">Card Holder</p>
                                          <p className="text-sm">{selectedCard.holderName}</p>
                                      </div>
                                      <div>
                                          <p className="opacity-70 text-[8px]">Expires</p>
                                          <p className="text-sm">{selectedCard.expiry}</p>
                                      </div>
                                      {showSensitiveData && (
                                         <div>
                                            <p className="opacity-70 text-[8px]">CVV</p>
                                            <p className="text-sm">{selectedCard.cvv}</p>
                                         </div>
                                      )}
                                  </div>
                              </div>
                          </div>
                          
                          {/* Frozen Overlay */}
                          {selectedCard.status === 'Frozen' && (
                              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center text-white">
                                  <Lock size={32} className="mb-2" />
                                  <span className="font-bold uppercase tracking-widest text-lg">Card Frozen</span>
                              </div>
                          )}
                      </div>
                  ) : (
                      <div className="w-full aspect-[1.586] rounded-2xl bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center text-slate-400">
                          <CreditCard size={48} className="mb-2 opacity-50" />
                          <p>No cards available</p>
                      </div>
                  )}

                  {/* Card Controls */}
                  {selectedCard && (
                      <div className="w-full mt-6 grid grid-cols-2 gap-3">
                          <button 
                            onClick={() => setShowSensitiveData(!showSensitiveData)}
                            className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors font-medium text-sm"
                          >
                              {showSensitiveData ? <EyeOff size={16} /> : <Eye size={16} />}
                              {showSensitiveData ? 'Hide Details' : 'Show Details'}
                          </button>
                          <button 
                            onClick={() => handleToggleFreeze(selectedCard.id)}
                            className={`flex items-center justify-center gap-2 p-3 rounded-xl border transition-colors font-medium text-sm ${
                                selectedCard.status === 'Frozen' 
                                ? 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400' 
                                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                            }`}
                          >
                              {selectedCard.status === 'Frozen' ? <Lock size={16} /> : <Lock size={16} />}
                              {selectedCard.status === 'Frozen' ? 'Unfreeze Card' : 'Freeze Card'}
                          </button>
                          <button className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors font-medium text-sm">
                              <Settings size={16} /> Limits & Controls
                          </button>
                          <button className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors font-medium text-sm">
                              <FileText size={16} /> Statements
                          </button>
                      </div>
                  )}
              </div>

              {/* Spend Analytics Chart */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm h-64 flex flex-col">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-sm uppercase tracking-wide">Monthly Spend vs Limit</h3>
                  <div className="flex-1 w-full min-h-0">
                      <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={spendData}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                              <YAxis hide />
                              <Tooltip 
                                  cursor={{fill: 'transparent'}}
                                  contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', fontSize: '12px' }}
                              />
                              <Bar dataKey="limit" fill="#e2e8f0" radius={[4, 4, 4, 4]} barSize={20} />
                              <Bar dataKey="spend" fill="#6366f1" radius={[4, 4, 4, 4]} barSize={20} />
                          </BarChart>
                      </ResponsiveContainer>
                  </div>
              </div>
          </div>

          {/* Right Column: Transactions & List */}
          <div className="lg:col-span-2 space-y-6">
              
              {/* Transactions List */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col h-full min-h-[500px]">
                  <div className="flex justify-between items-center mb-6">
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white">Recent Transactions</h3>
                      <div className="flex gap-2">
                           <button className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-indigo-600 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg transition-colors">
                               <Filter size={14} /> Filter
                           </button>
                           <button className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-indigo-600 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg transition-colors">
                               <Download size={14} /> Export
                           </button>
                      </div>
                  </div>

                  <div className="flex-1 overflow-y-auto pr-2">
                      {selectedCompany.transactions.length > 0 ? (
                          <div className="space-y-3">
                              {selectedCompany.transactions.map((tx) => (
                                  <div key={tx.id} className="flex items-center justify-between p-4 border border-slate-100 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                                      <div className="flex items-center gap-4">
                                          <div className={`p-2.5 rounded-full ${
                                              tx.category === 'Software' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' :
                                              tx.category === 'Travel' ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400' :
                                              tx.category === 'Fuel' ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400' :
                                              'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                                          }`}>
                                              <DollarSign size={18} />
                                          </div>
                                          <div>
                                              <p className="font-bold text-sm text-slate-900 dark:text-white">{tx.merchant}</p>
                                              <p className="text-xs text-slate-500">{tx.date} • {tx.category} • •••• {tx.cardLast4}</p>
                                          </div>
                                      </div>
                                      
                                      <div className="flex items-center gap-6">
                                          <div className="text-right">
                                              <p className="font-mono font-bold text-slate-900 dark:text-white">{formatCurrency(tx.amount)}</p>
                                              <p className={`text-[10px] font-bold uppercase ${
                                                  tx.status === 'Posted' ? 'text-emerald-500' : 
                                                  tx.status === 'Pending' ? 'text-amber-500' : 'text-red-500'
                                              }`}>{tx.status}</p>
                                          </div>
                                          <button className="p-1.5 text-slate-400 hover:text-indigo-600 rounded hover:bg-slate-100 dark:hover:bg-slate-800 opacity-0 group-hover:opacity-100 transition-opacity">
                                              <MoreHorizontal size={16} />
                                          </button>
                                      </div>
                                  </div>
                              ))}
                          </div>
                      ) : (
                          <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                              <DollarSign size={48} className="mb-4 opacity-20" />
                              <p className="font-medium">No recent transactions found.</p>
                          </div>
                      )}
                  </div>
              </div>
          </div>

      </div>
    </div>
  );
};
