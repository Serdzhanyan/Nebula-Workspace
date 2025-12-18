
import React, { useState, useMemo } from 'react';
import { Search, Filter, Download, Landmark, Users, TrendingUp, DollarSign, Clock, CheckCircle2, AlertTriangle, FileText, ChevronRight, MoreHorizontal, X, Plus, ChevronDown, Check, Activity, Globe, ShieldCheck, PieChart as PieIcon, Briefcase } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

interface Participant {
  bankName: string;
  role: 'Lead Arranger' | 'Agent' | 'Participant';
  commitment: number;
  share: number;
}

interface Tranche {
  id: string;
  name: string;
  amount: number;
  utilized: number;
  rate: string;
  maturity: string;
}

interface SyndicatedLoan {
  id: string;
  reference: string;
  facilityName: string;
  totalFacilityAmount: number;
  agentBank: string;
  status: 'Active' | 'Closing' | 'In Restructuring' | 'Repaid';
  dateClosed: string;
  nextRepayment: string;
  participants: Participant[];
  tranches: Tranche[];
  covenantsCount: number;
  description: string;
}

interface CompanySyndicationProfile {
  id: string;
  name: string;
  industry: string;
  totalDebt: number;
  totalFacilities: number;
  avgMargin: string;
  loans: SyndicatedLoan[];
}

export const CorporateSyndicatedLoansPage: React.FC = () => {
  // Mock Data
  const companies: CompanySyndicationProfile[] = [
    {
      id: '1',
      name: 'TechNova Solutions Ltd.',
      industry: 'Technology',
      totalDebt: 75000000,
      totalFacilities: 2,
      avgMargin: 'LIBOR + 2.25%',
      loans: [
        {
          id: 'SL-101',
          reference: 'SYN-2024-TN',
          facilityName: 'Senior Secured Credit Facility',
          totalFacilityAmount: 50000000,
          agentBank: 'JP Morgan Chase',
          status: 'Active',
          dateClosed: 'Jan 15, 2024',
          nextRepayment: 'Dec 31, 2024',
          description: 'Multicurrency syndicated loan for corporate expansion and working capital.',
          covenantsCount: 5,
          participants: [
            { bankName: 'JP Morgan Chase', role: 'Agent', commitment: 15000000, share: 30 },
            { bankName: 'HSBC', role: 'Lead Arranger', commitment: 15000000, share: 30 },
            { bankName: 'CitiBank', role: 'Participant', commitment: 10000000, share: 20 },
            { bankName: 'Barclays', role: 'Participant', commitment: 10000000, share: 20 },
          ],
          tranches: [
            { id: 'T1', name: 'Term Loan A', amount: 30000000, utilized: 30000000, rate: 'L+2.0%', maturity: 'Jan 2029' },
            { id: 'T2', name: 'Revolving Credit', amount: 20000000, utilized: 5000000, rate: 'L+2.5%', maturity: 'Jan 2027' }
          ]
        },
        {
          id: 'SL-102',
          reference: 'SYN-2022-TN-B',
          facilityName: 'Acquisition Facility',
          totalFacilityAmount: 25000000,
          agentBank: 'HSBC',
          status: 'Active',
          dateClosed: 'Jun 10, 2022',
          nextRepayment: 'Nov 15, 2024',
          description: 'Special purpose facility for the acquisition of CloudScale Inc.',
          covenantsCount: 3,
          participants: [
            { bankName: 'HSBC', role: 'Agent', commitment: 10000000, share: 40 },
            { bankName: 'Standard Chartered', role: 'Lead Arranger', commitment: 10000000, share: 40 },
            { bankName: 'BNP Paribas', role: 'Participant', commitment: 5000000, share: 20 },
          ],
          tranches: [
            { id: 'T3', name: 'Capex Tranche', amount: 25000000, utilized: 12000000, rate: 'L+2.75%', maturity: 'Jun 2026' }
          ]
        }
      ]
    },
    {
      id: '2',
      name: 'GreenLeaf Logistics',
      industry: 'Logistics',
      totalDebt: 15000000,
      totalFacilities: 1,
      avgMargin: 'SOFR + 3.10%',
      loans: [
        {
          id: 'SL-201',
          reference: 'SYN-GL-24',
          facilityName: 'Fleet Expansion Loan',
          totalFacilityAmount: 15000000,
          agentBank: 'Wells Fargo',
          status: 'Active',
          dateClosed: 'Mar 22, 2024',
          nextRepayment: 'Oct 31, 2024',
          description: 'Asset-backed syndicated facility for green-energy transport vehicles.',
          covenantsCount: 4,
          participants: [
            { bankName: 'Wells Fargo', role: 'Agent', commitment: 7500000, share: 50 },
            { bankName: 'BofA Securities', role: 'Lead Arranger', commitment: 7500000, share: 50 },
          ],
          tranches: [
            { id: 'T4', name: 'Equipment Line', amount: 15000000, utilized: 14200000, rate: 'S+3.1%', maturity: 'Mar 2028' }
          ]
        }
      ]
    },
    {
      id: '3',
      name: 'Quantum Dynamics',
      industry: 'Manufacturing',
      totalDebt: 120000000,
      totalFacilities: 1,
      avgMargin: 'EURIBOR + 1.85%',
      loans: [
        {
          id: 'SL-301',
          reference: 'SYN-QD-BER',
          facilityName: 'European Manufacturing Bond',
          totalFacilityAmount: 120000000,
          agentBank: 'Deutsche Bank',
          status: 'In Restructuring',
          dateClosed: 'Aug 10, 2021',
          nextRepayment: 'Immediate',
          description: 'Long-term infrastructure funding for the Berlin gigafactory.',
          covenantsCount: 8,
          participants: [
            { bankName: 'Deutsche Bank', role: 'Agent', commitment: 40000000, share: 33.3 },
            { bankName: 'Commerzbank', role: 'Lead Arranger', commitment: 40000000, share: 33.3 },
            { bankName: 'BNP Paribas', role: 'Participant', commitment: 40000000, share: 33.3 },
          ],
          tranches: [
             { id: 'T5', name: 'Infrastructure A', amount: 120000000, utilized: 120000000, rate: 'E+1.85%', maturity: 'Aug 2031' }
          ]
        }
      ]
    }
  ];

  const [selectedCompany, setSelectedCompany] = useState<CompanySyndicationProfile>(companies[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState<SyndicatedLoan | null>(companies[0].loans[0] || null);
  const [filterType, setFilterType] = useState("All");

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredLoans = useMemo(() => {
    return selectedCompany.loans.filter(loan => 
      filterType === 'All' || loan.status === filterType
    );
  }, [selectedCompany, filterType]);

  const handleSelectCompany = (company: CompanySyndicationProfile) => {
    setSelectedCompany(company);
    setSearchTerm("");
    setShowDropdown(false);
    setSelectedLoan(company.loans.length > 0 ? company.loans[0] : null);
  };

  const formatCurrency = (val: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(val);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
      case 'Closing': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      case 'In Restructuring': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800';
      case 'Repaid': return 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];

  const participantData = selectedLoan?.participants.map(p => ({
      name: p.bankName,
      value: p.share
  })) || [];

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-2 space-y-6">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Landmark className="text-indigo-500" /> Syndicated Loans
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
             Oversee multi-bank lending facilities, manage participant shares and monitor tranche utilization.
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto relative z-20">
            <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search company debt facilities..." 
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
                                            <p className="text-xs text-slate-500">Industry: {comp.industry} • {comp.totalFacilities} Facilities</p>
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
            
            <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 dark:shadow-none">
                <Plus size={18} /> New Syndication
            </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Portfolio Exposure</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{formatCurrency(selectedCompany.totalDebt)}</h3>
              <p className="text-xs text-slate-400 mt-1">Across all syndicates</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Active Facilities</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedCompany.totalFacilities}</h3>
              <p className="text-xs text-emerald-500 font-medium mt-1">Operational units</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Avg. Margin</p>
              <h3 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{selectedCompany.avgMargin}</h3>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1"><TrendingUp size={12}/> Yield optimized</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Next Rollover</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {selectedCompany.loans[0]?.nextRepayment || 'N/A'}
              </h3>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1"><Clock size={12}/> Periodic interest</p>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
          
          {/* Left Column: Loan Directory */}
          <div className="lg:col-span-2 flex flex-col gap-4 overflow-y-auto pr-2 pb-10">
              <div className="flex justify-between items-center mb-2 px-1">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">Debt Facilities</h3>
                  <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                      {['All', 'Active', 'Closing', 'In Restructuring'].map(t => (
                          <button
                            key={t}
                            onClick={() => setFilterType(t)}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                filterType === t 
                                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-sm' 
                                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                            }`}
                          >
                              {t}
                          </button>
                      ))}
                  </div>
              </div>

              {filteredLoans.map(loan => (
                  <div 
                    key={loan.id} 
                    onClick={() => setSelectedLoan(loan)}
                    className={`bg-white dark:bg-slate-900 p-5 rounded-2xl border transition-all cursor-pointer group hover:shadow-md relative overflow-hidden ${
                        selectedLoan?.id === loan.id 
                        ? 'border-indigo-500 ring-1 ring-indigo-500 shadow-md' 
                        : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700'
                    }`}
                  >
                      <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                              <div className={`p-2.5 rounded-xl ${
                                  loan.status === 'Active' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30' :
                                  loan.status === 'In Restructuring' ? 'bg-red-50 text-red-600 dark:bg-red-900/30' :
                                  'bg-blue-50 text-blue-600 dark:bg-blue-900/30'
                              }`}>
                                  <Landmark size={20} />
                              </div>
                              <div>
                                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">{loan.facilityName}</h4>
                                  <p className="text-xs text-slate-500 font-mono mt-0.5">{loan.reference} • Agent: {loan.agentBank}</p>
                              </div>
                          </div>
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${getStatusColor(loan.status)}`}>
                              {loan.status}
                          </span>
                      </div>

                      <div className="flex justify-between items-end">
                          <div className="text-xs text-slate-500 space-y-1">
                              <p>Closed Date: <span className="font-medium text-slate-700 dark:text-slate-300">{loan.dateClosed}</span></p>
                              <div className="flex items-center gap-2 mt-2">
                                 <div className="flex -space-x-1">
                                     {loan.participants.map((p, i) => (
                                         <div key={i} className={`w-5 h-5 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[8px] font-bold text-slate-500`} title={p.bankName}>
                                             {p.bankName.charAt(0)}
                                         </div>
                                     ))}
                                 </div>
                                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{loan.participants.length} Participants</span>
                              </div>
                          </div>
                          <div className="text-right">
                              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">Facility Limit</p>
                              <p className="text-xl font-bold text-slate-900 dark:text-white">
                                  {formatCurrency(loan.totalFacilityAmount)}
                              </p>
                          </div>
                      </div>
                  </div>
              ))}

              {filteredLoans.length === 0 && (
                  <div className="text-center py-16 text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                      <Landmark size={48} className="mx-auto mb-2 opacity-30" />
                      <p className="font-medium">No syndicated facilities match your filter.</p>
                  </div>
              )}
          </div>

          {/* Right Column: Deep Dive Analysis */}
          <div className="space-y-6">
              {selectedLoan ? (
                  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col h-full animate-in slide-in-from-right duration-300">
                      <div className="flex justify-between items-start mb-6">
                          <div>
                              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Arrangement Details</h3>
                              <p className="text-xs text-slate-500">Ref: {selectedLoan.id}</p>
                          </div>
                          <button onClick={() => setSelectedLoan(null)} className="md:hidden text-slate-400 p-1 hover:bg-slate-100 rounded-lg transition-colors"><X size={20} /></button>
                      </div>

                      <div className="space-y-6 flex-1">
                          {/* Commitment Breakdown Chart */}
                          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 flex flex-col gap-4 shadow-inner overflow-hidden relative">
                                <div className="flex justify-between items-center relative z-10">
                                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide">Participant Share</h4>
                                    <span className="text-[10px] font-bold text-indigo-500 flex items-center gap-1"><PieIcon size={10} /> Allocation</span>
                                </div>
                                <div className="h-40 w-full relative z-10">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={participantData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={45}
                                                outerRadius={65}
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {participantData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                          </div>

                          {/* Tranches Section */}
                          <div>
                              <div className="flex justify-between items-center mb-3 px-1">
                                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Facility Tranches</h4>
                              </div>
                              <div className="space-y-2">
                                  {selectedLoan.tranches.map(tranche => (
                                      <div key={tranche.id} className="p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800/50 hover:border-indigo-200 transition-colors shadow-sm">
                                          <div className="flex justify-between items-start mb-2">
                                              <span className="text-sm font-bold text-slate-800 dark:text-white">{tranche.name}</span>
                                              <span className="text-[10px] font-mono text-slate-500">{tranche.maturity}</span>
                                          </div>
                                          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1 rounded-full overflow-hidden mb-2">
                                              <div className="h-full bg-indigo-500" style={{ width: `${(tranche.utilized / tranche.amount) * 100}%` }}></div>
                                          </div>
                                          <div className="flex justify-between items-center text-[10px]">
                                              <span className="text-slate-500">Used: {formatCurrency(tranche.utilized)}</span>
                                              <span className="font-bold text-indigo-600">{tranche.rate}</span>
                                          </div>
                                      </div>
                                  ))}
                              </div>
                          </div>

                          {/* Compliance/Covenants Summary */}
                          <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-900/40">
                               <div className="flex items-center justify-between mb-2">
                                   <div className="flex items-center gap-2">
                                       <ShieldCheck size={16} className="text-indigo-600 dark:text-indigo-400" />
                                       <span className="text-xs font-bold text-indigo-900 dark:text-indigo-200">Compliance Status</span>
                                   </div>
                                   <span className="text-[10px] font-bold text-emerald-600 uppercase">92% Health</span>
                               </div>
                               <p className="text-xs text-indigo-700 dark:text-indigo-300 leading-relaxed">
                                   Monitoring {selectedLoan.covenantsCount} active covenants for this facility. No current violations detected.
                               </p>
                          </div>

                          {/* Action Bar */}
                          <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-700 space-y-3">
                              <div className="grid grid-cols-2 gap-3">
                                  <button className="py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all active:scale-95 shadow-sm flex items-center justify-center gap-2">
                                      <Activity size={16} /> Drawdown
                                  </button>
                                  <button className="py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95 shadow-sm">
                                      Term Sheet
                                  </button>
                              </div>
                              <button className="w-full py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center gap-2">
                                  <Briefcase size={16} /> Manage Participants
                              </button>
                              <button className="w-full py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center gap-2">
                                  <Download size={16} /> Export Compliance Cert
                              </button>
                          </div>
                      </div>
                  </div>
              ) : (
                  <div className="bg-slate-50 dark:bg-slate-900/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 p-8 flex flex-col items-center justify-center text-center h-full text-slate-400">
                      <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-800 mb-4 opacity-50 shadow-inner">
                        <Users size={48} />
                      </div>
                      <p className="font-medium">Select a syndicated loan to view participant shares and utilization</p>
                      <p className="text-xs mt-1">Detailed breakdown and facility controls will appear here.</p>
                  </div>
              )}
          </div>
      </div>
    </div>
  );
};
