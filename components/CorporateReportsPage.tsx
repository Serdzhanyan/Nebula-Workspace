import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  FileText, 
  BarChart3, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  MoreHorizontal, 
  Share2, 
  RefreshCw, 
  X, 
  TrendingUp, 
  PieChart as PieIcon, 
  Plus, 
  Check, 
  Archive,
  Eye,
  Settings,
  Mail,
  Zap,
  Layers,
  Table
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

interface Report {
  id: string;
  name: string;
  category: 'Financial' | 'Operational' | 'Compliance' | 'Audit';
  status: 'Ready' | 'Processing' | 'Failed';
  generatedDate: string;
  size: string;
  format: 'PDF' | 'CSV' | 'XLSX';
  summary: string;
  recipientsCount: number;
  dataPoints: number;
}

interface CompanyReportsProfile {
  id: string;
  name: string;
  industry: string;
  totalReports: number;
  scheduledCount: number;
  dataFreshness: string;
  storageUsed: string;
  reports: Report[];
  trendData: { period: string; volume: number }[];
}

export const CorporateReportsPage: React.FC = () => {
  // Mock Data
  const companies: CompanyReportsProfile[] = [
    {
      id: '1',
      name: 'TechNova Solutions Ltd.',
      industry: 'Technology',
      totalReports: 156,
      scheduledCount: 12,
      dataFreshness: '98%',
      storageUsed: '2.4 GB',
      trendData: [
        { period: 'May', volume: 12 }, { period: 'Jun', volume: 15 }, { period: 'Jul', volume: 10 },
        { period: 'Aug', volume: 22 }, { period: 'Sep', volume: 18 }, { period: 'Oct', volume: 25 },
      ],
      reports: [
        { id: 'REP-001', name: 'Monthly Financial Consolidation', category: 'Financial', status: 'Ready', generatedDate: 'Today, 09:00 AM', size: '4.2 MB', format: 'PDF', summary: 'Consolidated view of all subsidiary P&L and Balance Sheet data for October.', recipientsCount: 8, dataPoints: 1240 },
        { id: 'REP-002', name: 'Operational Efficiency Audit', category: 'Operational', status: 'Ready', generatedDate: 'Yesterday', size: '12.8 MB', format: 'XLSX', summary: 'Deep dive into supply chain latency and throughput metrics across 4 regions.', recipientsCount: 12, dataPoints: 8500 },
        { id: 'REP-003', name: 'Compliance & AML Annual Scan', category: 'Compliance', status: 'Processing', generatedDate: 'Started 10m ago', size: '-', format: 'PDF', summary: 'Global sanctions and PEP matching results for the current fiscal year.', recipientsCount: 5, dataPoints: 45000 },
        { id: 'REP-004', name: 'Internal Access Control Log', category: 'Audit', status: 'Failed', generatedDate: 'Oct 22, 2024', size: '0 KB', format: 'CSV', summary: 'Weekly log of user permissions changes and identity management actions.', recipientsCount: 3, dataPoints: 0 }
      ]
    },
    {
      id: '2',
      name: 'GreenLeaf Logistics',
      industry: 'Logistics',
      totalReports: 42,
      scheduledCount: 4,
      dataFreshness: '94%',
      storageUsed: '850 MB',
      trendData: [
        { period: 'Aug', volume: 8 }, { period: 'Sep', volume: 10 }, { period: 'Oct', volume: 12 },
      ],
      reports: [
        { id: 'REP-005', name: 'Fleet Utilization Report', category: 'Operational', status: 'Ready', generatedDate: 'Oct 24, 2024', size: '1.5 MB', format: 'PDF', summary: 'Analysis of fuel efficiency and route optimization for the delivery fleet.', recipientsCount: 4, dataPoints: 2100 },
        { id: 'REP-006', name: 'Quarterly Risk Assessment', category: 'Compliance', status: 'Ready', generatedDate: 'Oct 15, 2024', size: '2.1 MB', format: 'PDF', summary: 'Aggregated risk scoring for regional hubs and international partners.', recipientsCount: 6, dataPoints: 450 }
      ]
    },
    {
      id: '3',
      name: 'Quantum Dynamics',
      industry: 'Manufacturing',
      totalReports: 88,
      scheduledCount: 15,
      dataFreshness: '100%',
      storageUsed: '1.1 GB',
      trendData: [
        { period: 'Q1', volume: 24 }, { period: 'Q2', volume: 32 }, { period: 'Q3', volume: 32 },
      ],
      reports: []
    }
  ];

  const [selectedCompany, setSelectedCompany] = useState<CompanyReportsProfile>(companies[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filterCategory, setFilterCategory] = useState("All");
  const [selectedReport, setSelectedReport] = useState<Report | null>(companies[0].reports[0] || null);

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredReports = useMemo(() => {
    return selectedCompany.reports.filter(r => 
      filterCategory === 'All' || r.category === filterCategory
    );
  }, [selectedCompany, filterCategory]);

  const handleSelectCompany = (company: CompanyReportsProfile) => {
    setSelectedCompany(company);
    setSearchTerm("");
    setShowDropdown(false);
    setSelectedReport(company.reports.length > 0 ? company.reports[0] : null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ready': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
      case 'Processing': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      case 'Failed': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getCategoryColor = (cat: string) => {
      switch(cat) {
          case 'Financial': return 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20';
          case 'Operational': return 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20';
          case 'Compliance': return 'text-amber-600 bg-amber-50 dark:bg-amber-900/20';
          case 'Audit': return 'text-purple-600 bg-purple-50 dark:bg-purple-900/20';
          default: return 'text-slate-600 bg-slate-50';
      }
  };

  const typeDistribution = [
      { name: 'Financial', value: selectedCompany.reports.filter(r => r.category === 'Financial').length, color: '#6366f1' },
      { name: 'Operational', value: selectedCompany.reports.filter(r => r.category === 'Operational').length, color: '#10b981' },
      { name: 'Compliance', value: selectedCompany.reports.filter(r => r.category === 'Compliance').length, color: '#f59e0b' },
      { name: 'Audit', value: selectedCompany.reports.filter(r => r.category === 'Audit').length, color: '#8b5cf6' },
  ].filter(d => d.value > 0);

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-2 space-y-6">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="text-indigo-500" /> Corporate Reports
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
             Generate and manage high-level analytical documents for corporate group oversight.
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto relative z-20">
            <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search by company or report title..." 
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
                                            <p className="text-xs text-slate-500">{comp.industry} • {comp.totalReports} Reports</p>
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
                <Plus size={18} /> New Report
            </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Total Reports</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedCompany.totalReports}</h3>
              <p className="text-xs text-indigo-500 font-medium mt-1 flex items-center gap-1"><TrendingUp size={12}/> +5% this month</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Scheduled Runs</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedCompany.scheduledCount} Active</h3>
              <p className="text-xs text-slate-400 mt-1">Daily & Weekly automations</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Data Freshness</p>
              <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{selectedCompany.dataFreshness}</h3>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1"><Clock size={12}/> Average sync latency</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Archive Storage</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedCompany.storageUsed}</h3>
              <p className="text-xs text-slate-400 mt-1">Compressed PDF/XLSX</p>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
          
          {/* Left Column: Reports List */}
          <div className="lg:col-span-2 flex flex-col gap-4 overflow-y-auto pr-2 pb-10">
              <div className="flex justify-between items-center mb-2 px-1">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">Recent Reports</h3>
                  <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                      {['All', 'Financial', 'Operational', 'Compliance', 'Audit'].map(cat => (
                          <button
                            key={cat}
                            onClick={() => setFilterCategory(cat)}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                filterCategory === cat 
                                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-sm' 
                                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                            }`}
                          >
                              {cat}
                          </button>
                      ))}
                  </div>
              </div>

              {filteredReports.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                      {filteredReports.map(report => (
                          <div 
                            key={report.id} 
                            onClick={() => setSelectedReport(report)}
                            className={`bg-white dark:bg-slate-900 p-5 rounded-2xl border transition-all cursor-pointer group hover:shadow-md relative overflow-hidden ${
                                selectedReport?.id === report.id 
                                ? 'border-indigo-500 ring-1 ring-indigo-500 shadow-md' 
                                : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700'
                            }`}
                          >
                              <div className="flex justify-between items-start mb-4">
                                  <div className="flex items-center gap-3">
                                      <div className={`p-2.5 rounded-xl ${
                                          report.status === 'Ready' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30' :
                                          report.status === 'Processing' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30' :
                                          'bg-slate-100 text-slate-600 dark:bg-slate-800'
                                      }`}>
                                          <FileText size={20} />
                                      </div>
                                      <div>
                                          <h4 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{report.name}</h4>
                                          <p className="text-xs text-slate-500 font-mono mt-0.5">{report.id} • {report.category}</p>
                                      </div>
                                  </div>
                                  <div className="flex flex-col items-end gap-2">
                                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${getStatusColor(report.status)}`}>
                                          {report.status}
                                      </span>
                                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{report.format} • {report.size}</span>
                                  </div>
                              </div>

                              <div className="flex justify-between items-end">
                                  <div className="text-xs text-slate-500 space-y-1">
                                      <p className="line-clamp-1 max-w-md italic">"{report.summary}"</p>
                                      <div className="flex items-center gap-2 mt-2">
                                          <Calendar size={14} className="text-slate-400" />
                                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Generated: {report.generatedDate}</span>
                                      </div>
                                  </div>
                                  <div className="flex gap-2">
                                      <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors" title="Download"><Download size={16}/></button>
                                      <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors" title="Share"><Share2 size={16}/></button>
                                  </div>
                              </div>
                          </div>
                      ))}
                  </div>
              ) : (
                  <div className="text-center py-16 text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                      <RefreshCw size={48} className="mx-auto mb-2 opacity-30" />
                      <p className="font-medium">No reports found for this filter.</p>
                  </div>
              )}
          </div>

          {/* Right Column: Report Breakdown & Analysis */}
          <div className="space-y-6">
              {selectedReport ? (
                  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col h-full animate-in slide-in-from-right duration-300">
                      <div className="flex justify-between items-start mb-6">
                          <div>
                              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Report Insight</h3>
                              <p className="text-xs text-slate-500">REF: {selectedReport.id}</p>
                          </div>
                          <button onClick={() => setSelectedReport(null)} className="md:hidden text-slate-400 p-1 hover:bg-slate-100 rounded-lg transition-colors"><X size={20} /></button>
                      </div>

                      <div className="space-y-6 flex-1">
                          {/* Distribution Overview */}
                          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 flex flex-col gap-4 shadow-inner overflow-hidden relative">
                                <div className="flex justify-between items-center relative z-10">
                                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide">Generation Trend</h4>
                                    <span className="text-[10px] font-bold text-indigo-500 flex items-center gap-1"><TrendingUp size={10} /> Volume</span>
                                </div>
                                <div className="h-40 w-full relative z-10">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={selectedCompany.trendData}>
                                            <defs>
                                                <linearGradient id="colorReport" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                                </linearGradient>
                                            </defs>
                                            <Area type="monotone" dataKey="volume" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorReport)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                          </div>

                          {/* Data Coverage */}
                          <div>
                              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-4">Coverage Analysis</h4>
                              <div className="grid grid-cols-2 gap-4">
                                  <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm">
                                      <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Data Points</p>
                                      <p className="font-bold text-slate-900 dark:text-white text-lg">{selectedReport.dataPoints.toLocaleString()}</p>
                                  </div>
                                  <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm">
                                      <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Recipients</p>
                                      <p className="font-bold text-indigo-600 dark:text-indigo-400 text-lg">{selectedReport.recipientsCount}</p>
                                  </div>
                              </div>
                          </div>

                          {/* Summary Info */}
                          <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-900/40">
                               <div className="flex items-center gap-2 mb-2">
                                   <Zap size={16} className="text-indigo-600 dark:text-indigo-400" />
                                   <span className="text-xs font-bold text-indigo-900 dark:text-indigo-200">Executive Summary</span>
                               </div>
                               <p className="text-xs text-indigo-700 dark:text-indigo-300 leading-relaxed italic">
                                   "{selectedReport.summary}"
                               </p>
                          </div>

                          {/* Action Bar */}
                          <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-700 space-y-3">
                              <div className="grid grid-cols-2 gap-3">
                                  <button className="py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all active:scale-95 shadow-sm flex items-center justify-center gap-2">
                                      <Download size={16} /> Download
                                  </button>
                                  <button className="py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95 shadow-sm">
                                      <Share2 size={16} /> Share
                                  </button>
                              </div>
                              <button className="w-full py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-sm">
                                  <Clock size={16} /> Schedule Recurring
                              </button>
                              <button className="w-full py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center gap-2">
                                  <Archive size={16} /> Archive Report
                              </button>
                          </div>
                      </div>
                  </div>
              ) : (
                  <div className="bg-slate-50 dark:bg-slate-900/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 p-8 flex flex-col items-center justify-center text-center h-full text-slate-400">
                      <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-800 mb-4 opacity-50 shadow-inner">
                        <Table size={48} />
                      </div>
                      <p className="font-medium">Select a report to view details and distribution analytics</p>
                      <p className="text-xs mt-1">PDF previews and export options will appear here.</p>
                  </div>
              )}
          </div>
      </div>
    </div>
  );
};
