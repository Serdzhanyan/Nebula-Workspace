
import React, { useState } from 'react';
import { CreditCard, Lock, Eye, Plus, Search, Check, MoreHorizontal, Settings, Shield, DollarSign, X, Save, RefreshCw, Smartphone, Wifi } from 'lucide-react';

interface Card {
  id: string;
  type: 'Physical' | 'Virtual';
  network: 'Visa' | 'Mastercard';
  last4: string;
  holder: string;
  expiry: string;
  status: 'Active' | 'Frozen' | 'Cancelled';
  limit: string;
  spent: string;
  color: 'Black' | 'Blue' | 'Silver';
}

interface CompanyData {
  id: string;
  name: string;
  cards: Card[];
}

export const SMEProductsCards: React.FC = () => {
  // Mock Data
  const companiesList: CompanyData[] = [
      {
          id: '1',
          name: 'TechNova Solutions Ltd.',
          cards: [
              { id: 'C-001', type: 'Physical', network: 'Visa', last4: '4291', holder: 'Sarah Jenkins', expiry: '12/25', status: 'Active', limit: '$50,000', spent: '$12,450', color: 'Black' },
              { id: 'C-002', type: 'Virtual', network: 'Mastercard', last4: '8821', holder: 'Marketing Team', expiry: '09/26', status: 'Active', limit: '$10,000', spent: '$4,200', color: 'Blue' },
              { id: 'C-003', type: 'Physical', network: 'Visa', last4: '1102', holder: 'John Smith', expiry: '11/24', status: 'Frozen', limit: '$25,000', spent: '$0', color: 'Silver' }
          ]
      },
      {
          id: '2',
          name: 'GreenLeaf Logistics',
          cards: [
              { id: 'C-004', type: 'Physical', network: 'Mastercard', last4: '5543', holder: 'Michael Chen', expiry: '05/27', status: 'Active', limit: '$30,000', spent: '$15,100', color: 'Blue' }
          ]
      },
      {
          id: '3',
          name: 'Quantum Dynamics',
          cards: []
      }
  ];

  const [selectedCompany, setSelectedCompany] = useState<CompanyData>(companiesList[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  
  // Modal State
  const [showNewCardModal, setShowNewCardModal] = useState(false);
  const [newCardForm, setNewCardForm] = useState({ holder: '', type: 'Virtual', limit: '' });

  // UI State
  const [visiblePINs, setVisiblePINs] = useState<Set<string>>(new Set());

  const filteredCompanies = companiesList.filter(c =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCompany = (comp: CompanyData) => {
      setSelectedCompany(comp);
      setSearchTerm("");
      setShowDropdown(false);
  };

  const togglePIN = (cardId: string) => {
      const newSet = new Set(visiblePINs);
      if (newSet.has(cardId)) {
          newSet.delete(cardId);
      } else {
          newSet.add(cardId);
          // Auto-hide after 3 seconds
          setTimeout(() => {
              setVisiblePINs(prev => {
                  const s = new Set(prev);
                  s.delete(cardId);
                  return s;
              });
          }, 3000);
      }
      setVisiblePINs(newSet);
  };

  const toggleFreeze = (cardId: string) => {
      const updatedCards = selectedCompany.cards.map(card => 
          card.id === cardId ? { ...card, status: card.status === 'Active' ? 'Frozen' : 'Active' } : card
      );
      // Cast to fix type inference issue if needed, but map should preserve types here
      setSelectedCompany({ ...selectedCompany, cards: updatedCards as Card[] });
  };

  const handleCreateCard = (e: React.FormEvent) => {
      e.preventDefault();
      const newCard: Card = {
          id: `C-${Date.now().toString().slice(-3)}`,
          type: newCardForm.type as 'Physical' | 'Virtual',
          network: 'Visa', // Default
          last4: Math.floor(1000 + Math.random() * 9000).toString(),
          holder: newCardForm.holder,
          expiry: '12/28',
          status: 'Active',
          limit: `$${newCardForm.limit}`,
          spent: '$0',
          color: 'Blue'
      };

      setSelectedCompany({ ...selectedCompany, cards: [...selectedCompany.cards, newCard] });
      setShowNewCardModal(false);
      setNewCardForm({ holder: '', type: 'Virtual', limit: '' });
  };

  const getCardGradient = (color: string, status: string) => {
      if (status === 'Frozen') return 'from-slate-400 to-slate-500 grayscale';
      switch(color) {
          case 'Black': return 'from-slate-900 to-slate-800';
          case 'Blue': return 'from-blue-600 to-indigo-700';
          case 'Silver': return 'from-slate-400 to-slate-300';
          default: return 'from-slate-900 to-slate-800';
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
                    placeholder="Search company for cards..."
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

        {/* New Card Modal */}
        {showNewCardModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setShowNewCardModal(false)}>
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200 dark:border-slate-700" onClick={e => e.stopPropagation()}>
                    <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white">Issue New Card</h3>
                        <button onClick={() => setShowNewCardModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20}/></button>
                    </div>
                    <form onSubmit={handleCreateCard} className="p-6 space-y-4">
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Cardholder Name</label>
                            <input 
                                type="text" 
                                required
                                placeholder="e.g. Employee Name or Department"
                                value={newCardForm.holder}
                                onChange={(e) => setNewCardForm({...newCardForm, holder: e.target.value})}
                                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Card Type</label>
                                <select 
                                    value={newCardForm.type}
                                    onChange={(e) => setNewCardForm({...newCardForm, type: e.target.value})}
                                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                                >
                                    <option>Virtual</option>
                                    <option>Physical</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Monthly Limit</label>
                                <input 
                                    type="number" 
                                    placeholder="5000"
                                    required
                                    value={newCardForm.limit}
                                    onChange={(e) => setNewCardForm({...newCardForm, limit: e.target.value})}
                                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                                />
                            </div>
                        </div>
                        <button type="submit" className="w-full py-2.5 bg-indigo-600 text-white rounded-lg font-bold text-sm hover:bg-indigo-700 transition-colors shadow-lg mt-2">
                            Issue Card
                        </button>
                    </form>
                </div>
            </div>
        )}

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                    <CreditCard size={20} className="text-purple-500" /> Corporate Cards: {selectedCompany.name}
                </h3>
                <button 
                    onClick={() => setShowNewCardModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm"
                >
                    <Plus size={16} /> New Card
                </button>
            </div>
            
            {selectedCompany.cards.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {selectedCompany.cards.map((card) => (
                        <div key={card.id} className="group">
                            {/* Card Visual */}
                            <div className={`p-5 rounded-2xl bg-gradient-to-br ${getCardGradient(card.color, card.status)} text-white shadow-lg relative overflow-hidden transition-all transform hover:-translate-y-1 mb-4`}>
                                <div className="absolute top-0 right-0 p-4 opacity-10"><CreditCard size={100} /></div>
                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-8">
                                        <div className="flex items-center gap-2">
                                            {card.network === 'Visa' ? (
                                                <span className="font-bold italic text-lg">VISA</span>
                                            ) : (
                                                <div className="flex">
                                                    <div className="w-6 h-6 rounded-full bg-red-500/80"></div>
                                                    <div className="w-6 h-6 rounded-full bg-yellow-500/80 -ml-3"></div>
                                                </div>
                                            )}
                                            {card.type === 'Virtual' && <Smartphone size={14} className="opacity-70 ml-1" />}
                                            <Wifi size={14} className="opacity-60 rotate-90 ml-2" />
                                        </div>
                                        {card.status === 'Frozen' && (
                                            <span className="bg-red-500/20 backdrop-blur-sm border border-red-400/30 text-red-100 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide flex items-center gap-1">
                                                <Lock size={10} /> Frozen
                                            </span>
                                        )}
                                    </div>
                                    <p className="font-mono text-xl tracking-widest mb-4 drop-shadow-md">
                                        **** **** **** {card.last4}
                                    </p>
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-[10px] uppercase opacity-60 font-medium tracking-wider">Card Holder</p>
                                            <p className="font-medium text-sm">{card.holder}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase opacity-60 font-medium tracking-wider text-right">Expires</p>
                                            <p className="font-medium text-sm">{card.expiry}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Controls */}
                            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 p-4 flex flex-col gap-4">
                                <div className="flex justify-between items-center text-sm">
                                    <div>
                                        <span className="text-slate-500 dark:text-slate-400 text-xs">Available / Limit</span>
                                        <div className="font-bold text-slate-900 dark:text-white">
                                            {/* Calculating available just for visual based on spent/limit strings */}
                                            {card.spent} <span className="text-slate-400 font-normal">/ {card.limit}</span>
                                        </div>
                                    </div>
                                    <div className="w-24 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-indigo-500 w-1/3"></div>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-4 gap-2">
                                     <button 
                                        onClick={() => togglePIN(card.id)}
                                        className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-300"
                                     >
                                         <Eye size={16} />
                                         <span className="text-[10px] font-medium">{visiblePINs.has(card.id) ? '1234' : 'PIN'}</span>
                                     </button>
                                     <button 
                                        onClick={() => toggleFreeze(card.id)}
                                        className={`flex flex-col items-center justify-center gap-1 p-2 rounded-lg transition-colors ${
                                            card.status === 'Frozen' 
                                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' 
                                            : 'hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
                                        }`}
                                     >
                                         <Lock size={16} />
                                         <span className="text-[10px] font-medium">{card.status === 'Frozen' ? 'Unfreeze' : 'Freeze'}</span>
                                     </button>
                                     <button className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-300">
                                         <DollarSign size={16} />
                                         <span className="text-[10px] font-medium">Limits</span>
                                     </button>
                                     <button className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-300">
                                         <Settings size={16} />
                                         <span className="text-[10px] font-medium">Manage</span>
                                     </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 text-slate-400 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-xl">
                    <CreditCard size={32} className="mx-auto mb-2 opacity-50" />
                    <p>No active cards found for this company.</p>
                </div>
            )}
        </div>
    </div>
  );
};
