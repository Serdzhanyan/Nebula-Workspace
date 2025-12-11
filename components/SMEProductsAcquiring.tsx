
import React, { useState } from 'react';
import { Smartphone, Plus, Search, Check, Settings, MapPin, RefreshCw, X, Save, CreditCard } from 'lucide-react';

interface POSTerminal {
  id: string;
  model: string;
  tid: string;
  location: string;
  status: 'Online' | 'Offline' | 'Maintenance';
  lastActive: string;
}

interface CompanyData {
  id: string;
  name: string;
  terminals: POSTerminal[];
  rates: {
    cardPresent: string;
    cardNotPresent: string;
    qrPayment: string;
  };
}

export const SMEProductsAcquiring: React.FC = () => {
  // Mock Data
  const companiesList: CompanyData[] = [
      {
          id: '1',
          name: 'TechNova Solutions Ltd.',
          terminals: [
              { id: 'POS-001', model: 'SmartPOS X5', tid: '88291002', location: 'Main Store', status: 'Online', lastActive: '2 mins ago' },
              { id: 'POS-002', model: 'Mobile Reader V2', tid: '88291005', location: 'Pop-up Booth', status: 'Offline', lastActive: 'Yesterday' }
          ],
          rates: { cardPresent: '1.9% + $0.10', cardNotPresent: '2.9% + $0.30', qrPayment: '0.8%' }
      },
      {
          id: '2',
          name: 'GreenLeaf Logistics',
          terminals: [
              { id: 'POS-003', model: 'Countertop Pro', tid: '77102201', location: 'Warehouse Dispatch', status: 'Online', lastActive: '10 mins ago' }
          ],
          rates: { cardPresent: '2.1% + $0.10', cardNotPresent: '3.0% + $0.30', qrPayment: '1.0%' }
      },
      {
          id: '3',
          name: 'Quantum Dynamics',
          terminals: [],
          rates: { cardPresent: '2.5% + $0.15', cardNotPresent: '3.5% + $0.30', qrPayment: '1.2%' }
      }
  ];

  const [selectedCompany, setSelectedCompany] = useState<CompanyData>(companiesList[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  
  // Modal State
  const [showTerminalModal, setShowTerminalModal] = useState(false);
  const [showTariffModal, setShowTariffModal] = useState(false);
  const [newTerminalLocation, setNewTerminalLocation] = useState("");

  const filteredCompanies = companiesList.filter(c =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCompany = (comp: CompanyData) => {
      setSelectedCompany(comp);
      setSearchTerm("");
      setShowDropdown(false);
  };

  const handleRequestTerminal = (e: React.FormEvent) => {
      e.preventDefault();
      const newTerm: POSTerminal = {
          id: `POS-${Date.now()}`,
          model: 'SmartPOS X5 (New)',
          tid: 'PENDING',
          location: newTerminalLocation || 'Unassigned',
          status: 'Maintenance', // Pending setup
          lastActive: 'Never'
      };
      
      const updatedCompany = { ...selectedCompany, terminals: [...selectedCompany.terminals, newTerm] };
      setSelectedCompany(updatedCompany);
      setShowTerminalModal(false);
      setNewTerminalLocation("");
      alert("Terminal request submitted successfully.");
  };

  const handleUpdateTariff = (e: React.FormEvent) => {
      e.preventDefault();
      setShowTariffModal(false);
      alert("Tariff change request submitted for review.");
  };

  const getStatusColor = (status: string) => {
      switch(status) {
          case 'Online': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
          case 'Offline': return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
          case 'Maintenance': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
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
                    placeholder="Search company for acquiring info..."
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

        {/* Terminal Request Modal */}
        {showTerminalModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setShowTerminalModal(false)}>
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200 dark:border-slate-700" onClick={e => e.stopPropagation()}>
                    <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white">Order New Terminal</h3>
                        <button onClick={() => setShowTerminalModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20}/></button>
                    </div>
                    <form onSubmit={handleRequestTerminal} className="p-6 space-y-4">
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Terminal Model</label>
                            <select className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500">
                                <option>SmartPOS X5 (WiFi/4G)</option>
                                <option>Countertop Pro (Ethernet)</option>
                                <option>Mobile Reader V2 (Bluetooth)</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Location / Branch</label>
                            <input 
                                type="text" 
                                placeholder="e.g. Downtown Store"
                                required
                                value={newTerminalLocation}
                                onChange={(e) => setNewTerminalLocation(e.target.value)}
                                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <button type="submit" className="w-full py-2.5 bg-indigo-600 text-white rounded-lg font-bold text-sm hover:bg-indigo-700 mt-2">Submit Request</button>
                    </form>
                </div>
            </div>
        )}

        {/* Tariff Change Modal */}
        {showTariffModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setShowTariffModal(false)}>
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200 dark:border-slate-700" onClick={e => e.stopPropagation()}>
                    <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white">Change Acquiring Plan</h3>
                        <button onClick={() => setShowTariffModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20}/></button>
                    </div>
                    <form onSubmit={handleUpdateTariff} className="p-6 space-y-4">
                        <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800 mb-4">
                            <h4 className="font-bold text-indigo-700 dark:text-indigo-300 text-sm mb-2">Current Rates</h4>
                            <div className="grid grid-cols-2 gap-2 text-xs text-indigo-600 dark:text-indigo-400">
                                <span>Card Present:</span> <span className="font-bold">{selectedCompany.rates.cardPresent}</span>
                                <span>Card Not Present:</span> <span className="font-bold">{selectedCompany.rates.cardNotPresent}</span>
                            </div>
                        </div>
                        
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Select New Plan</label>
                            <div className="space-y-2">
                                <label className="flex items-center p-3 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                    <input type="radio" name="plan" className="w-4 h-4 text-indigo-600 focus:ring-indigo-500" />
                                    <div className="ml-3">
                                        <span className="block text-sm font-bold text-slate-900 dark:text-white">Volume Saver</span>
                                        <span className="block text-xs text-slate-500">1.7% + $0.05 (Monthly fee $29)</span>
                                    </div>
                                </label>
                                <label className="flex items-center p-3 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                    <input type="radio" name="plan" className="w-4 h-4 text-indigo-600 focus:ring-indigo-500" />
                                    <div className="ml-3">
                                        <span className="block text-sm font-bold text-slate-900 dark:text-white">Flat Rate Plus</span>
                                        <span className="block text-xs text-slate-500">2.5% Flat (No monthly fee)</span>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <button type="submit" className="w-full py-2.5 bg-indigo-600 text-white rounded-lg font-bold text-sm hover:bg-indigo-700 mt-2">Request Change</button>
                    </form>
                </div>
            </div>
        )}

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                    <Smartphone size={20} className="text-blue-500" /> Acquiring & POS: {selectedCompany.name}
                </h3>
                <button 
                    onClick={() => setShowTerminalModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm"
                >
                    <Plus size={16} /> Request Terminal
                </button>
            </div>
            
            {/* Rates Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 relative group">
                    <div className="flex justify-between items-start mb-1">
                        <span className="text-slate-600 dark:text-slate-300 text-xs font-bold uppercase">Card Present</span>
                        <CreditCard size={16} className="text-slate-400" />
                    </div>
                    <span className="text-xl font-bold text-slate-900 dark:text-white">{selectedCompany.rates.cardPresent}</span>
                    <button 
                        onClick={() => setShowTariffModal(true)}
                        className="absolute bottom-2 right-2 p-1.5 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" title="Change Rate"
                    >
                        <Settings size={14} />
                    </button>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 relative group">
                    <div className="flex justify-between items-start mb-1">
                        <span className="text-slate-600 dark:text-slate-300 text-xs font-bold uppercase">CNP / Online</span>
                        <RefreshCw size={16} className="text-slate-400" />
                    </div>
                    <span className="text-xl font-bold text-slate-900 dark:text-white">{selectedCompany.rates.cardNotPresent}</span>
                     <button 
                        onClick={() => setShowTariffModal(true)}
                        className="absolute bottom-2 right-2 p-1.5 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" title="Change Rate"
                    >
                        <Settings size={14} />
                    </button>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 relative group">
                    <div className="flex justify-between items-start mb-1">
                        <span className="text-slate-600 dark:text-slate-300 text-xs font-bold uppercase">QR Payment</span>
                        <Smartphone size={16} className="text-slate-400" />
                    </div>
                    <span className="text-xl font-bold text-slate-900 dark:text-white">{selectedCompany.rates.qrPayment}</span>
                     <button 
                        onClick={() => setShowTariffModal(true)}
                        className="absolute bottom-2 right-2 p-1.5 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" title="Change Rate"
                    >
                        <Settings size={14} />
                    </button>
                </div>
            </div>
            
            {/* Terminal List */}
            <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-4">Active Terminals</h4>
                {selectedCompany.terminals.length > 0 ? (
                    <div className="space-y-4">
                         {selectedCompany.terminals.map((term) => (
                             <div key={term.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                                 <div className="flex items-center gap-4">
                                     <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-400">
                                         <Smartphone size={24} />
                                     </div>
                                     <div>
                                         <p className="font-bold text-slate-900 dark:text-white">{term.model}</p>
                                         <p className="text-xs text-slate-500">TID: <span className="font-mono">{term.tid}</span></p>
                                     </div>
                                 </div>
                                 
                                 <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                                     <div className="flex items-center gap-2 text-xs text-slate-500">
                                         <MapPin size={14} />
                                         <span>{term.location}</span>
                                     </div>
                                     <div className="flex items-center gap-4">
                                         <div className="text-right">
                                             <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${getStatusColor(term.status)}`}>
                                                 {term.status}
                                             </span>
                                             <p className="text-[10px] text-slate-400 mt-0.5">Active: {term.lastActive}</p>
                                         </div>
                                         <button className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors">
                                             <Settings size={18} />
                                         </button>
                                     </div>
                                 </div>
                             </div>
                         ))}
                    </div>
                ) : (
                    <div className="text-center py-12 text-slate-400 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-xl">
                        <Smartphone size={32} className="mx-auto mb-2 opacity-50" />
                        <p>No active POS terminals found for this company.</p>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};
