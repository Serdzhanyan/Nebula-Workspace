
import React, { useState } from 'react';
import { Eye, Activity, Search, Check, AlertTriangle, ShieldCheck, X, TrendingUp } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine } from 'recharts';

interface SuspiciousFlag {
  id: string;
  type: string;
  time: string;
  riskScore: number;
  status: 'Pending' | 'Reviewed' | 'Dismissed';
}

interface CompanyData {
  id: string;
  name: string;
  monitoringStatus: 'Active' | 'Paused';
  riskLevel: 'Low' | 'Medium' | 'High';
  flags: SuspiciousFlag[];
}

export const SMEPaymentsMonitoring: React.FC = () => {
  // Mock Data
  const companiesList: CompanyData[] = [
      {
          id: '1',
          name: 'TechNova Solutions Ltd.',
          monitoringStatus: 'Active',
          riskLevel: 'Medium',
          flags: [
              { id: 'FLAG-001', type: 'Structuring Detection', time: '2 mins ago', riskScore: 85, status: 'Pending' },
              { id: 'FLAG-002', type: 'Velocity Limit Exceeded', time: '15 mins ago', riskScore: 60, status: 'Reviewed' }
          ]
      },
      {
          id: '2',
          name: 'GreenLeaf Logistics',
          monitoringStatus: 'Active',
          riskLevel: 'Low',
          flags: []
      },
      {
          id: '3',
          name: 'Quantum Dynamics',
          monitoringStatus: 'Active',
          riskLevel: 'High',
          flags: [
               { id: 'FLAG-003', type: 'Unexpected Geo-Location', time: '1 hour ago', riskScore: 92, status: 'Pending' },
               { id: 'FLAG-004', type: 'Round Dollar Amount', time: 'Yesterday', riskScore: 45, status: 'Dismissed' }
          ]
      }
  ];

  const monitoringData = [
      { time: '10:00', risk: 15 },
      { time: '10:05', risk: 12 },
      { time: '10:10', risk: 18 },
      { time: '10:15', risk: 45 },
      { time: '10:20', risk: 85 }, // Spike
      { time: '10:25', risk: 60 },
      { time: '10:30', risk: 25 },
      { time: '10:35', risk: 20 },
      { time: '10:40', risk: 15 },
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

  const handleAction = (flagId: string, action: 'Reviewed' | 'Dismissed') => {
      const updatedFlags = selectedCompany.flags.map(f => 
          f.id === flagId ? { ...f, status: action } : f
      );
      setSelectedCompany({ ...selectedCompany, flags: updatedFlags });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
         {/* Search Bar */}
        <div className="relative z-20">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                    type="text"
                    placeholder="Search company for suspicious monitoring..."
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
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                    <Eye size={20} className="text-amber-500" /> Suspicious Activity Monitoring: {selectedCompany.name}
                </h3>
                {selectedCompany.monitoringStatus === 'Active' && (
                     <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full border border-emerald-100 dark:border-emerald-900/30">
                         <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                         <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase">Live Analysis</span>
                     </div>
                )}
            </div>
            
            <div className="h-[300px] w-full bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800 p-4 mb-8">
                <div className="flex justify-between items-center mb-4 px-2">
                    <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">Real-time Risk Score</h4>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                        <TrendingUp size={14} className="text-red-500" /> Current Spike Detected
                    </div>
                </div>
                <ResponsiveContainer width="100%" height="85%">
                    <AreaChart data={monitoringData}>
                        <defs>
                            <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                        <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} domain={[0, 100]} />
                        <Tooltip 
                            contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                            itemStyle={{ color: '#1e293b' }}
                        />
                        {/* Threshold Line */}
                        <ReferenceLine y={80} stroke="red" strokeDasharray="3 3" label={{ value: 'High Risk Threshold', position: 'insideTopRight', fill: 'red', fontSize: 10 }} />
                        <Area type="monotone" dataKey="risk" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#colorRisk)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            
            <div className="mt-6">
                <div className="flex justify-between items-center mb-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Recent Flags</h4>
                    <span className={`text-xs px-2 py-0.5 rounded font-bold uppercase ${
                        selectedCompany.riskLevel === 'High' ? 'bg-red-100 text-red-600' : 
                        selectedCompany.riskLevel === 'Medium' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'
                    }`}>
                        {selectedCompany.riskLevel} Risk Profile
                    </span>
                </div>

                {selectedCompany.flags.length > 0 ? (
                    <div className="space-y-3">
                        {selectedCompany.flags.map((flag) => (
                            <div key={flag.id} className="p-4 border border-slate-100 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 shadow-sm hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-2">
                                        <AlertTriangle size={16} className={`mt-0.5 ${flag.riskScore > 80 ? 'text-red-500' : 'text-amber-500'}`} />
                                        <div>
                                            <span className="font-bold text-sm text-slate-800 dark:text-slate-200">{flag.type}</span>
                                            <p className="text-xs text-slate-500">{flag.time} • Risk Score: {flag.riskScore}/100</p>
                                        </div>
                                    </div>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase border ${
                                        flag.status === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-900/20 dark:border-amber-800' :
                                        flag.status === 'Reviewed' ? 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/20 dark:border-blue-800' :
                                        'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:border-slate-700'
                                    }`}>
                                        {flag.status}
                                    </span>
                                </div>
                                
                                {flag.status === 'Pending' && (
                                    <div className="flex justify-end gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                                        <button 
                                            onClick={() => handleAction(flag.id, 'Dismissed')}
                                            className="px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 rounded-lg transition-colors"
                                        >
                                            Dismiss
                                        </button>
                                        <button 
                                            onClick={() => handleAction(flag.id, 'Reviewed')}
                                            className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 transition-colors flex items-center gap-1"
                                        >
                                            <ShieldCheck size={12} /> Review
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 text-slate-400 bg-slate-50 dark:bg-slate-900/30 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
                        <ShieldCheck size={24} className="mx-auto mb-2 opacity-50 text-emerald-500" />
                        <p className="text-sm">No suspicious activity flags.</p>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};
