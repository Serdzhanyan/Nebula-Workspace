
import React, { useState } from 'react';
import { Activity, Clock, ArrowRightLeft, Search, ChevronDown, Check, TrendingUp, AlertCircle, DollarSign, Calendar, Filter, Download } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts';

interface Transaction {
    id: string;
    type: 'Credit' | 'Debit' | 'Transfer';
    description: string;
    amount: string;
    date: string;
    status: 'Completed' | 'Pending' | 'Failed';
}

interface CompanyActivity {
    id: string;
    name: string;
    industry: string;
    metrics: {
        volume: string;
        peakHour: string;
        activeUsers: number;
        volumeChange: string; // e.g., "+12%"
    };
    chartData: { time: string; transactions: number; value: number }[];
    recentTransactions: Transaction[];
}

export const SMEAnalyticsActivity: React.FC = () => {
  // Mock Data
  const companies: CompanyActivity[] = [
      {
          id: '1',
          name: 'TechNova Solutions Ltd.',
          industry: 'Technology',
          metrics: {
              volume: '12,450',
              peakHour: '14:00 - 16:00',
              activeUsers: 842,
              volumeChange: '+12.5%'
          },
          chartData: [
              { time: '08:00', transactions: 120, value: 5000 },
              { time: '10:00', transactions: 350, value: 15000 },
              { time: '12:00', transactions: 480, value: 22000 },
              { time: '14:00', transactions: 420, value: 18000 },
              { time: '16:00', transactions: 550, value: 28000 },
              { time: '18:00', transactions: 200, value: 8000 },
          ],
          recentTransactions: [
              { id: 'TX-1001', type: 'Credit', description: 'Invoice Payment - Global Corp', amount: '$12,500.00', date: 'Today, 14:30', status: 'Completed' },
              { id: 'TX-1002', type: 'Debit', description: 'AWS Service Charge', amount: '$450.00', date: 'Today, 11:15', status: 'Completed' },
              { id: 'TX-1003', type: 'Transfer', description: 'Payroll Batch #22', amount: '$45,000.00', date: 'Yesterday, 16:00', status: 'Pending' },
          ]
      },
      {
          id: '2',
          name: 'GreenLeaf Logistics',
          industry: 'Logistics',
          metrics: {
              volume: '5,200',
              peakHour: '09:00 - 11:00',
              activeUsers: 120,
              volumeChange: '-3.2%'
          },
          chartData: [
              { time: '08:00', transactions: 300, value: 12000 },
              { time: '10:00', transactions: 450, value: 18000 },
              { time: '12:00', transactions: 200, value: 8000 },
              { time: '14:00', transactions: 150, value: 6000 },
              { time: '16:00', transactions: 220, value: 9000 },
              { time: '18:00', transactions: 100, value: 4000 },
          ],
          recentTransactions: [
              { id: 'TX-2001', type: 'Debit', description: 'Fuel Card Settlement', amount: '$2,100.00', date: 'Today, 09:45', status: 'Completed' },
              { id: 'TX-2002', type: 'Credit', description: 'Client Payment', amount: '$5,500.00', date: 'Yesterday, 14:20', status: 'Completed' },
          ]
      },
      {
          id: '3',
          name: 'Quantum Dynamics',
          industry: 'Manufacturing',
          metrics: {
              volume: '8,900',
              peakHour: '10:00 - 12:00',
              activeUsers: 350,
              volumeChange: '+5.8%'
          },
          chartData: [
              { time: '08:00', transactions: 150, value: 10000 },
              { time: '10:00', transactions: 280, value: 25000 },
              { time: '12:00', transactions: 350, value: 30000 },
              { time: '14:00', transactions: 300, value: 28000 },
              { time: '16:00', transactions: 250, value: 20000 },
              { time: '18:00', transactions: 120, value: 12000 },
          ],
          recentTransactions: []
      }
  ];

  const [selectedCompany, setSelectedCompany] = useState<CompanyActivity>(companies[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [chartType, setChartType] = useState<'volume' | 'value'>('volume');

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCompany = (company: CompanyActivity) => {
      setSelectedCompany(company);
      setSearchTerm("");
      setShowDropdown(false);
  };

  const getStatusColor = (status: string) => {
      switch(status) {
          case 'Completed': return 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400';
          case 'Pending': return 'text-amber-600 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400';
          case 'Failed': return 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400';
          default: return 'text-slate-600 bg-slate-100';
      }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
        
        {/* Company Selector */}
        <div className="relative z-30">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search company account..." 
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowDropdown(true);
                    }}
                    onFocus={() => setShowDropdown(true)}
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-slate-900 dark:text-white transition-all"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    <ChevronDown size={16} />
                </div>
            </div>
            
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

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
             <div>
                 <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedCompany.name}</h2>
                 <p className="text-sm text-slate-500 dark:text-slate-400">Account Activity Dashboard</p>
             </div>
             <div className="flex gap-2">
                 <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                     <Calendar size={16} /> Last 24 Hours
                 </button>
                 <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm">
                     <Download size={16} /> Export Report
                 </button>
             </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <ArrowRightLeft size={18} className="text-blue-500" /> Transaction Vol
                    </h3>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${selectedCompany.metrics.volumeChange.startsWith('+') ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                        {selectedCompany.metrics.volumeChange}
                    </span>
                </div>
                <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{selectedCompany.metrics.volume}</p>
                <p className="text-xs text-slate-500 mt-1">Processed in last 24h</p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
                    <Clock size={18} className="text-indigo-500" /> Peak Hour
                </h3>
                <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{selectedCompany.metrics.peakHour}</p>
                <p className="text-xs text-slate-500 mt-1">UTC Time</p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
                    <Activity size={18} className="text-emerald-500" /> Active Users
                </h3>
                <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{selectedCompany.metrics.activeUsers}</p>
                <p className="text-xs text-slate-500 mt-1">Currently logged in</p>
            </div>
        </div>

        {/* Main Chart */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm h-[450px] flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">Activity Timeline</h3>
                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                    <button 
                        onClick={() => setChartType('volume')}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${chartType === 'volume' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}
                    >
                        Volume
                    </button>
                    <button 
                        onClick={() => setChartType('value')}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${chartType === 'value' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}
                    >
                        Value
                    </button>
                </div>
            </div>
            <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={selectedCompany.chartData}>
                        <defs>
                            <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={chartType === 'volume' ? "#3b82f6" : "#10b981"} stopOpacity={0.3}/>
                                <stop offset="95%" stopColor={chartType === 'volume' ? "#3b82f6" : "#10b981"} stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                        <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                        <Tooltip 
                            contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                            itemStyle={{ color: '#1e293b' }}
                        />
                        <Area 
                            type="monotone" 
                            dataKey={chartType === 'volume' ? 'transactions' : 'value'} 
                            stroke={chartType === 'volume' ? "#3b82f6" : "#10b981"} 
                            fillOpacity={1} 
                            fill="url(#colorActivity)" 
                            strokeWidth={3} 
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Transaction History Table */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
             <div className="flex justify-between items-center mb-6">
                 <h3 className="font-bold text-lg text-slate-900 dark:text-white">Recent Transactions</h3>
                 <button className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline">View All</button>
             </div>

             {selectedCompany.recentTransactions.length > 0 ? (
                 <div className="overflow-x-auto">
                     <table className="w-full text-left border-collapse">
                         <thead>
                             <tr className="border-b border-slate-100 dark:border-slate-800 text-xs font-bold uppercase text-slate-500 dark:text-slate-400">
                                 <th className="py-3 px-4">Transaction</th>
                                 <th className="py-3 px-4">Type</th>
                                 <th className="py-3 px-4">Date</th>
                                 <th className="py-3 px-4">Amount</th>
                                 <th className="py-3 px-4 text-right">Status</th>
                             </tr>
                         </thead>
                         <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                             {selectedCompany.recentTransactions.map((tx) => (
                                 <tr key={tx.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                     <td className="py-4 px-4">
                                         <div>
                                             <p className="font-medium text-slate-900 dark:text-white">{tx.description}</p>
                                             <p className="text-xs text-slate-500 font-mono">{tx.id}</p>
                                         </div>
                                     </td>
                                     <td className="py-4 px-4">
                                         <span className="text-sm text-slate-600 dark:text-slate-300">{tx.type}</span>
                                     </td>
                                     <td className="py-4 px-4">
                                         <span className="text-sm text-slate-600 dark:text-slate-300">{tx.date}</span>
                                     </td>
                                     <td className="py-4 px-4">
                                         <span className="font-bold text-slate-900 dark:text-white">{tx.amount}</span>
                                     </td>
                                     <td className="py-4 px-4 text-right">
                                         <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${getStatusColor(tx.status)}`}>
                                             {tx.status}
                                         </span>
                                     </td>
                                 </tr>
                             ))}
                         </tbody>
                     </table>
                 </div>
             ) : (
                 <div className="text-center py-12 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-xl">
                     <AlertCircle size={32} className="mx-auto mb-2 opacity-50 text-slate-400" />
                     <p className="text-slate-500 dark:text-slate-400">No recent transactions found.</p>
                 </div>
             )}
        </div>
    </div>
  );
};
