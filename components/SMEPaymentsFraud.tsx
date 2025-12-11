
import React, { useState } from 'react';
import { AlertOctagon, Search, Check, ShieldAlert, MapPin, Activity, Lock, Phone, Mail, X, Smartphone, Globe, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface FraudAlert {
  id: string;
  type: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  score: number;
  timestamp: string;
  location: string;
  device: string;
  description: string;
  status: 'Active' | 'Investigating' | 'Resolved' | 'False Positive';
  customerID: string;
  transactionAmount?: string;
  ipAddress: string;
}

interface CompanyData {
  id: string;
  name: string;
  alerts: FraudAlert[];
}

export const SMEPaymentsFraud: React.FC = () => {
  // Mock Data
  const companiesList: CompanyData[] = [
      {
          id: '1',
          name: 'TechNova Solutions Ltd.',
          alerts: [
              { 
                  id: 'FR-2024-001', 
                  type: 'Impossible Travel', 
                  severity: 'Critical', 
                  score: 95, 
                  timestamp: '10 mins ago', 
                  location: 'Lagos, Nigeria (Previous: New York, USA)', 
                  device: 'iPhone 13 (Unrecognized)', 
                  description: 'Login attempt and transaction initiation from a location physically impossible to reach since last activity.',
                  status: 'Active',
                  customerID: 'C-8821',
                  transactionAmount: '$15,000.00',
                  ipAddress: '197.210.x.x'
              },
              { 
                  id: 'FR-2024-002', 
                  type: 'Velocity Limit', 
                  severity: 'Medium', 
                  score: 65, 
                  timestamp: '2 hours ago', 
                  location: 'New York, USA', 
                  device: 'Chrome / Windows', 
                  description: '5 small transactions to new beneficiaries within 10 minutes.',
                  status: 'Investigating',
                  customerID: 'C-8821',
                  transactionAmount: '$450.00 (avg)',
                  ipAddress: '68.12.x.x'
              }
          ]
      },
      {
          id: '2',
          name: 'GreenLeaf Logistics',
          alerts: []
      },
      {
          id: '3',
          name: 'Quantum Dynamics',
          alerts: [
               { 
                  id: 'FR-2024-003', 
                  type: 'Account Takeover Risk', 
                  severity: 'High', 
                  score: 88, 
                  timestamp: 'Yesterday', 
                  location: 'Unknown Proxy', 
                  device: 'Firefox / Linux', 
                  description: 'Password reset followed immediately by large beneficiary addition.',
                  status: 'Active',
                  customerID: 'C-9901',
                  ipAddress: '104.22.x.x (Tor Exit Node)'
              }
          ]
      }
  ];

  const [selectedCompany, setSelectedCompany] = useState<CompanyData>(companiesList[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<FraudAlert | null>(null);

  const filteredCompanies = companiesList.filter(c =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCompany = (comp: CompanyData) => {
      setSelectedCompany(comp);
      setSearchTerm("");
      setShowDropdown(false);
      setSelectedAlert(null);
  };

  const handleAction = (alertId: string, action: 'Resolved' | 'False Positive' | 'Investigating') => {
      const updatedAlerts = selectedCompany.alerts.map(a => 
          a.id === alertId ? { ...a, status: action } : a
      );
      setSelectedCompany({ ...selectedCompany, alerts: updatedAlerts });
      if (selectedAlert?.id === alertId) {
          setSelectedAlert({ ...selectedAlert, status: action });
      }
  };

  const getSeverityColor = (severity: string) => {
      switch(severity) {
          case 'Critical': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
          case 'High': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800';
          case 'Medium': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800';
          default: return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 relative">
         
         {/* Alert Detail Modal */}
         {selectedAlert && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setSelectedAlert(null)}>
                <div 
                    className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200 dark:border-slate-700 flex flex-col max-h-[90vh]" 
                    onClick={e => e.stopPropagation()}
                >
                    <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-lg">
                                <AlertOctagon size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                                    {selectedAlert.type}
                                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase border ${getSeverityColor(selectedAlert.severity)}`}>
                                        {selectedAlert.severity}
                                    </span>
                                </h3>
                                <p className="text-xs text-slate-500">ID: {selectedAlert.id} • {selectedAlert.timestamp}</p>
                            </div>
                        </div>
                        <button onClick={() => setSelectedAlert(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                            <X size={20} />
                        </button>
                    </div>
                    
                    <div className="p-6 overflow-y-auto">
                        {/* Risk Score */}
                        <div className="flex items-center gap-6 mb-6 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800">
                            <div className="relative w-20 h-20 flex items-center justify-center">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-200 dark:text-slate-700" />
                                    <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={226} strokeDashoffset={226 - (226 * selectedAlert.score / 100)} className="text-red-500" strokeLinecap="round" />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center font-bold text-xl text-slate-900 dark:text-white">
                                    {selectedAlert.score}
                                </div>
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Risk Analysis</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-300">{selectedAlert.description}</p>
                                {selectedAlert.transactionAmount && (
                                    <div className="mt-2 text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                        Amount at Risk: <span className="text-red-500">{selectedAlert.transactionAmount}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl">
                                <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3 flex items-center gap-2">
                                    <MapPin size={14} /> Location Data
                                </h5>
                                <p className="text-sm font-medium text-slate-900 dark:text-white mb-1">{selectedAlert.location}</p>
                                <p className="text-xs text-slate-500 font-mono">IP: {selectedAlert.ipAddress}</p>
                            </div>
                            <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl">
                                <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3 flex items-center gap-2">
                                    <Smartphone size={14} /> Device Fingerprint
                                </h5>
                                <p className="text-sm font-medium text-slate-900 dark:text-white mb-1">{selectedAlert.device}</p>
                                <p className="text-xs text-slate-500">First time seen on account</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                             <h5 className="text-sm font-bold text-slate-900 dark:text-white">Recommended Actions</h5>
                             <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                 <button 
                                    onClick={() => alert("Account frozen successfully. Notification sent to customer.")}
                                    className="flex flex-col items-center justify-center p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-xl text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors"
                                 >
                                     <Lock size={20} className="mb-2" />
                                     <span className="text-xs font-bold">Freeze Account</span>
                                 </button>
                                 <button className="flex flex-col items-center justify-center p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-xl text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-colors">
                                     <Phone size={20} className="mb-2" />
                                     <span className="text-xs font-bold">Contact Customer</span>
                                 </button>
                                 <button 
                                    onClick={() => handleAction(selectedAlert.id, 'False Positive')}
                                    className="flex flex-col items-center justify-center p-4 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30 rounded-xl text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/20 transition-colors"
                                 >
                                     <CheckCircle2 size={20} className="mb-2" />
                                     <span className="text-xs font-bold">Mark Safe</span>
                                 </button>
                             </div>
                        </div>
                    </div>
                    
                    <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3">
                        {selectedAlert.status !== 'Resolved' && (
                            <button 
                                onClick={() => handleAction(selectedAlert.id, 'Resolved')}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors"
                            >
                                Mark as Resolved
                            </button>
                        )}
                    </div>
                </div>
            </div>
         )}

         {/* Search Bar */}
        <div className="relative z-20">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                    type="text"
                    placeholder="Search company for fraud alerts..."
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
                <AlertOctagon size={20} className="text-red-600" /> Fraud Alerts: {selectedCompany.name}
            </h3>
            
            {selectedCompany.alerts.length > 0 ? (
                <div className="space-y-4">
                     {selectedCompany.alerts.map((alert) => (
                         <div key={alert.id} className="p-5 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors shadow-sm">
                             <div className="flex justify-between items-start mb-4">
                                 <div>
                                     <div className="flex items-center gap-2 mb-1">
                                         <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase border ${getSeverityColor(alert.severity)}`}>
                                             {alert.severity} Risk
                                         </span>
                                         <span className="text-xs text-slate-400 font-mono">{alert.id}</span>
                                     </div>
                                     <h4 className="font-bold text-sm text-slate-900 dark:text-white">{alert.type}</h4>
                                     <p className="text-xs text-slate-500">{alert.timestamp} • Customer {alert.customerID}</p>
                                 </div>
                                 <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                                     alert.status === 'Active' ? 'bg-red-50 text-red-600 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900' :
                                     alert.status === 'Resolved' ? 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-900' :
                                     'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600'
                                 }`}>
                                     {alert.status}
                                 </span>
                             </div>
                             
                             <div className="flex flex-col sm:flex-row gap-4 mb-4">
                                 <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/50 px-3 py-2 rounded-lg border border-slate-100 dark:border-slate-800 flex-1">
                                     <MapPin size={14} className="text-slate-400" />
                                     {alert.location}
                                 </div>
                                 <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/50 px-3 py-2 rounded-lg border border-slate-100 dark:border-slate-800 flex-1">
                                     <Smartphone size={14} className="text-slate-400" />
                                     {alert.device}
                                 </div>
                             </div>

                             <div className="flex justify-end pt-3 border-t border-slate-100 dark:border-slate-700">
                                 <button 
                                    onClick={() => setSelectedAlert(alert)}
                                    className="flex items-center gap-1 px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 transition-colors shadow-sm"
                                 >
                                     <ShieldAlert size={14} /> Investigate
                                 </button>
                             </div>
                         </div>
                     ))}
                </div>
            ) : (
                <div className="text-center py-12 text-slate-400 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-xl">
                    <CheckCircle2 size={32} className="mx-auto mb-2 opacity-50 text-emerald-500" />
                    <p>No active fraud alerts detected for this company.</p>
                </div>
            )}
        </div>
    </div>
  );
};
