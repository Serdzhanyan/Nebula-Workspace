import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Smartphone, 
  CreditCard, 
  Zap, 
  Plus, 
  MoreHorizontal, 
  Check, 
  X, 
  ArrowRight, 
  RefreshCw, 
  BarChart3, 
  Activity, 
  ShieldCheck, 
  Globe, 
  QrCode, 
  Monitor, 
  Signal, 
  SignalLow, 
  SignalZero, 
  TrendingUp, 
  Settings 
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  BarChart, 
  Bar, 
  Cell, 
  PieChart, 
  Pie, 
  Legend 
} from 'recharts';

interface AcquiringTerminal {
  id: string;
  tid: string; // Terminal ID
  name: string;
  type: 'POS' | 'Virtual' | 'QR' | 'mPOS';
  status: 'Online' | 'Offline' | 'Maintenance';
  location: string;
  lastActive: string;
  dailyVolume: number;
}

interface AcquiringProfile {
  id: string;
  name: string;
  industry: string;
  totalTurnover: number;
  activeTerminals: number;
  avgTransaction: number;
  refundRate: number;
  terminals: AcquiringTerminal[];
  volumeTrend: { time: string; amount: number }[];
}

export const CorporateAcquiringPage: React.FC = () => {
  // Mock Data for different corporate clients
  const companies: AcquiringProfile[] = [
    {
      id: '1',
      name: 'TechNova Solutions Ltd.',
      industry: 'Technology',
      totalTurnover: 1450000,
      activeTerminals: 12,
      avgTransaction: 125.50,
      refundRate: 0.8,
      terminals: [
        { id: 'T1', tid: '8821001', name: 'Main Lobby POS', type: 'POS', status: 'Online', location: 'Floor 1', lastActive: '2 mins ago', dailyVolume: 12500 },
        { id: 'T2', tid: '8821002', name: 'E-commerce Gateway', type: 'Virtual', status: 'Online', location: 'Cloud', lastActive: 'Now', dailyVolume: 85000 },
        { id: 'T3', tid: '8821003', name: 'Cafeteria QR', type: 'QR', status: 'Online', location: 'Floor 2', lastActive: '15 mins ago', dailyVolume: 4200 },
        { id: 'T4', tid: '8821004', name: 'Mobile Reader 1', type: 'mPOS', status: 'Offline', location: 'Field', lastActive: '3 days ago', dailyVolume: 0 },
      ],
      volumeTrend: [
        { time: '08:00', amount: 12000 }, { time: '10:00', amount: 45000 }, { time: '12:00', amount: 82000 },
        { time: '14:00', amount: 55000 }, { time: '16:00', amount: 95000 }, { time: '18:00', amount: 30000 },
      ]
    },
    {
      id: '2',
      name: 'GreenLeaf Logistics',
      industry: 'Logistics',
      totalTurnover: 850000,
      activeTerminals: 45,
      avgTransaction: 450.00,
      refundRate: 1.2,
      terminals: [
        { id: 'T5', tid: '7721051', name: 'Warehouse Dispatch', type: 'POS', status: 'Online', location: 'Chicago Hub', lastActive: '5 mins ago', dailyVolume: 22000 },
        { id: 'T6', tid: '7721052', name: 'Driver App SDK', type: 'Virtual', status: 'Online', location: 'Mobile App', lastActive: 'Now', dailyVolume: 145000 },
        { id: 'T7', tid: '7721053', name: 'Front Desk', type: 'POS', status: 'Maintenance', location: 'Office', lastActive: 'Yesterday', dailyVolume: 0 },
      ],
      volumeTrend: [
        { time: '08:00', amount: 50000 }, { time: '10:00', amount: 120000 }, { time: '12:00', amount: 90000 },
        { time: '14:00', amount: 110000 }, { time: '16:00', amount: 130000 }, { time: '18:00', amount: 70000 },
      ]
    },
    {
      id: '3',
      name: 'Quantum Dynamics',
      industry: 'Manufacturing',
      totalTurnover: 2800000,
      activeTerminals: 5,
      avgTransaction: 5200.00,
      refundRate: 0.2,
      terminals: [
        { id: 'T8', tid: '1102991', name: 'Procurement Kiosk', type: 'POS', status: 'Online', location: 'Main Gate', lastActive: '1 hour ago', dailyVolume: 500000 },
        { id: 'T9', tid: '1102992', name: 'B2B Portal Gateway', type: 'Virtual', status: 'Online', location: 'AWS-Region-1', lastActive: 'Now', dailyVolume: 1200000 },
      ],
      volumeTrend: [
        { time: 'Q1', amount: 2100000 }, { time: 'Q2', amount: 2450000 }, { time: 'Q3', amount: 2800000 },
      ]
    }
  ];

  const [selectedCompany, setSelectedCompany] = useState<AcquiringProfile>(companies[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [selectedTerminal, setSelectedTerminal] = useState<AcquiringTerminal | null>(null);

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTerminals = useMemo(() => {
    return selectedCompany.terminals.filter(t => 
      filterStatus === 'All' || t.status === filterStatus
    );
  }, [selectedCompany, filterStatus]);

  const handleSelectCompany = (company: AcquiringProfile) => {
    setSelectedCompany(company);
    setSearchTerm("");
    setShowDropdown(false);
    setSelectedTerminal(null);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact', maximumFractionDigits: 1 }).format(val);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Online': return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800';
      case 'Offline': return 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700';
      case 'Maintenance': return 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'POS': return <CreditCard size={18} />;
      case 'Virtual': return <Globe size={18} />;
      case 'QR': return <QrCode size={18} />;
      case 'mPOS': return <Smartphone size={18} />;
      default: return <Monitor size={18} />;
    }
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-2 space-y-6">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Smartphone className="text-indigo-500" /> Acquiring Management
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
             Manage payment terminals, online gateways, and merchant settlement flows.
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto relative z-20">
            <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search merchant or terminal ID..." 
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowDropdown(true);
                    }}
                    onFocus={() => setShowDropdown(true)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-slate-900 dark:text-white transition-all shadow-sm focus:bg-white dark:focus:bg-slate-900"
                />
                
                {showDropdown && (
                    <>
                        <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)}></div>
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden z-20 max-h-60 overflow-y-auto animate-in zoom-in-95 duration-200">
                            {filteredCompanies.length > 0 ? (
                                filteredCompanies.map(comp => (
                                    <button
                                        key={comp.id}
                                        onClick={() => handleSelectCompany(comp)}
                                        className="w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 border-b border-slate-100 dark:border-slate-800 last:border-0 flex justify-between items-center group transition-colors"
                                    >
                                        <div>
                                            <p className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{comp.name}</p>
                                            <p className="text-xs text-slate-500">Industry: {comp.industry} • {comp.activeTerminals} Terminals</p>
                                        </div>
                                        {selectedCompany.id === comp.id && <Check size={16} className="text-indigo-600 dark:text-indigo-400" />}
                                    </button>
                                ))
                            ) : (
                                <div className="p-4 text-center text-slate-500 text-sm">No merchants found</div>
                            )}
                        </div>
                    </>
                )}
            </div>
            
            <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 dark:shadow-none">
                <Plus size={18} /> Add Terminal
            </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Total Turnover</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{formatCurrency(selectedCompany.totalTurnover)}</h3>
              <div className="flex items-center gap-1 mt-1 text-xs text-emerald-500 font-medium">
                  <TrendingUp size={12}/> +12.4% vs prev
              </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Active Devices</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedCompany.activeTerminals}</h3>
              <p className="text-xs text-slate-400 mt-1">Across all locations</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Avg Transaction</p>
              <h3 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(selectedCompany.avgTransaction)}
              </h3>
              <p className="text-xs text-slate-400 mt-1">Ticket size optimized</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Refund Rate</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {selectedCompany.refundRate}%
              </h3>
              <p className="text-xs text-emerald-500 font-medium mt-1">Below industry threshold</p>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
          
          {/* Left Column: Terminals List */}
          <div className="lg:col-span-2 flex flex-col gap-4 overflow-y-auto pr-2 pb-10">
              <div className="flex justify-between items-center mb-2 px-1">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">Device Fleet</h3>
                  <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                      {['All', 'Online', 'Offline', 'Maintenance'].map(s => (
                          <button
                            key={s}
                            onClick={() => setFilterStatus(s)}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                filterStatus === s 
                                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-sm' 
                                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                            }`}
                          >
                              {s}
                          </button>
                      ))}
                  </div>
              </div>

              {filteredTerminals.map(terminal => (
                  <div 
                    key={terminal.id} 
                    onClick={() => setSelectedTerminal(terminal)}
                    className={`bg-white dark:bg-slate-900 p-5 rounded-2xl border transition-all cursor-pointer group hover:shadow-md relative overflow-hidden ${
                        selectedTerminal?.id === terminal.id 
                        ? 'border-indigo-500 ring-1 ring-indigo-500 shadow-md' 
                        : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700'
                    }`}
                  >
                      <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                              <div className={`p-2.5 rounded-xl ${
                                  terminal.status === 'Online' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30' :
                                  'bg-slate-100 text-slate-600 dark:bg-slate-800'
                              }`}>
                                  {getTypeIcon(terminal.type)}
                              </div>
                              <div>
                                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">{terminal.name}</h4>
                                  <p className="text-xs text-slate-500 font-mono mt-0.5">TID: {terminal.tid} • {terminal.type}</p>
                              </div>
                          </div>
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${getStatusColor(terminal.status)}`}>
                              {terminal.status}
                          </span>
                      </div>

                      <div className="flex justify-between items-end">
                          <div className="text-xs text-slate-500 space-y-1">
                              <p>Location: <span className="font-medium text-slate-700 dark:text-slate-300">{terminal.location}</span></p>
                              <div className="flex items-center gap-2 mt-2">
                                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Connection Status</span>
                                 {terminal.status === 'Online' ? <Signal size={14} className="text-emerald-500" /> : <SignalZero size={14} className="text-slate-300" />}
                                 <span className="text-[10px] text-slate-400 ml-1">Last sync: {terminal.lastActive}</span>
                              </div>
                          </div>
                          <div className="text-right">
                              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">Daily Volume</p>
                              <p className="text-xl font-bold text-slate-900 dark:text-white">
                                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(terminal.dailyVolume)}
                              </p>
                          </div>
                      </div>
                  </div>
              ))}

              {filteredTerminals.length === 0 && (
                  <div className="text-center py-16 text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                      <Smartphone size={48} className="mx-auto mb-2 opacity-30" />
                      <p className="font-medium">No terminals found for this criteria.</p>
                  </div>
              )}
          </div>

          {/* Right Column: Terminal Details & Performance */}
          <div className="space-y-6">
              {selectedTerminal ? (
                  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col h-full animate-in slide-in-from-right duration-300">
                      <div className="flex justify-between items-start mb-6">
                          <div>
                              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Terminal Health</h3>
                              <p className="text-xs text-slate-500">ID: {selectedTerminal.id}</p>
                          </div>
                          <button onClick={() => setSelectedTerminal(null)} className="md:hidden text-slate-400 p-1 hover:bg-slate-100 rounded-lg transition-colors"><X size={20} /></button>
                      </div>

                      <div className="space-y-6 flex-1">
                          {/* Live Volume Chart */}
                          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 flex flex-col gap-4 shadow-inner overflow-hidden">
                                <div className="flex justify-between items-center relative z-10">
                                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide">Volume Trend (24h)</h4>
                                    <span className="text-[10px] font-bold text-indigo-500 flex items-center gap-1"><Activity size={10} /> Real-time</span>
                                </div>
                                <div className="h-32 w-full relative z-10">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={selectedCompany.volumeTrend}>
                                            <defs>
                                                <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                                </linearGradient>
                                            </defs>
                                            <Area type="monotone" dataKey="amount" stroke="#6366f1" fillOpacity={1} fill="url(#colorVolume)" strokeWidth={2} />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                          </div>

                          {/* Detail Info */}
                          <div className="grid grid-cols-2 gap-4">
                              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm">
                                  <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Maturity</p>
                                  <p className="text-sm font-bold text-slate-800 dark:text-white">v3.4.2 (Latest)</p>
                              </div>
                              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm">
                                  <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Encryption</p>
                                  <p className="text-sm font-bold text-emerald-600 flex items-center gap-1">
                                      <ShieldCheck size={14} /> PCI-DSS
                                  </p>
                              </div>
                          </div>

                          {/* Diagnostic Info */}
                          <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-900/40">
                               <div className="flex items-center gap-2 mb-2">
                                   <Zap size={16} className="text-indigo-600 dark:text-indigo-400" />
                                   <span className="text-xs font-bold text-indigo-900 dark:text-indigo-200">Diagnostics</span>
                               </div>
                               <div className="space-y-2">
                                  <div className="flex justify-between text-[10px]">
                                      <span className="text-indigo-600 dark:text-indigo-300">Battery Level</span>
                                      <span className="font-bold">92%</span>
                                  </div>
                                  <div className="flex justify-between text-[10px]">
                                      <span className="text-indigo-600 dark:text-indigo-300">Paper Roll</span>
                                      <span className="font-bold">OK</span>
                                  </div>
                               </div>
                          </div>

                          {/* Action Bar */}
                          <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-700 space-y-3">
                              <div className="grid grid-cols-2 gap-3">
                                  <button className="py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all active:scale-95 shadow-sm flex items-center justify-center gap-2">
                                      <RefreshCw size={16} /> Reset TID
                                  </button>
                                  <button className="py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95 shadow-sm">
                                      Logs
                                  </button>
                              </div>
                              <button className="w-full py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center gap-2">
                                  <Settings size={16} /> Config Device
                              </button>
                              <button className="w-full py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center gap-2">
                                  <Download size={16} /> Settlement Report
                              </button>
                          </div>
                      </div>
                  </div>
              ) : (
                  <div className="bg-slate-50 dark:bg-slate-900/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 p-8 flex flex-col items-center justify-center text-center h-full text-slate-400">
                      <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-800 mb-4 opacity-50 shadow-inner">
                        <CreditCard size={48} />
                      </div>
                      <p className="font-medium">Select a terminal to view status and management controls</p>
                      <p className="text-xs mt-1">Real-time health and transaction volume will appear here.</p>
                  </div>
              )}
          </div>
      </div>
    </div>
  );
};
