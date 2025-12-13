
import React from 'react';
import { MessageSquare, AlertCircle, Clock, CheckCircle2, TrendingUp, TrendingDown, ArrowUpRight, MoreHorizontal, User, Filter, Download } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend } from 'recharts';

export const SMERequestsOverview: React.FC = () => {
  // Mock Data for Charts
  const volumeData = [
      { day: 'Mon', new: 12, resolved: 10 },
      { day: 'Tue', new: 15, resolved: 12 },
      { day: 'Wed', new: 18, resolved: 16 },
      { day: 'Thu', new: 10, resolved: 14 },
      { day: 'Fri', new: 22, resolved: 18 },
      { day: 'Sat', new: 5, resolved: 4 },
      { day: 'Sun', new: 3, resolved: 2 },
  ];

  const typeData = [
      { name: 'Billing', value: 35, color: '#f59e0b' }, // Amber
      { name: 'Technical', value: 45, color: '#3b82f6' }, // Blue
      { name: 'General', value: 20, color: '#8b5cf6' }, // Purple
  ];

  const recentRequests = [
      { id: 'REQ-1024', subject: 'API Rate Limit Exceeded', client: 'TechNova Solutions', type: 'Technical', status: 'In Progress', priority: 'High', time: '2 hours ago', assignee: 'Alex J.' },
      { id: 'REQ-1023', subject: 'Invoice Discrepancy', client: 'GreenLeaf Logistics', type: 'Billing', status: 'New', priority: 'Medium', time: '5 hours ago', assignee: 'Sarah L.' },
      { id: 'REQ-1022', subject: 'Feature Request: Export', client: 'Quantum Dynamics', type: 'General', status: 'Pending', priority: 'Low', time: '1 day ago', assignee: 'Unassigned' },
      { id: 'REQ-1021', subject: 'Login Issues', client: 'Stark Ind', type: 'Technical', status: 'Resolved', priority: 'High', time: '2 days ago', assignee: 'James D.' },
      { id: 'REQ-1020', subject: 'Account Verification', client: 'Acme Corp', type: 'General', status: 'Resolved', priority: 'Medium', time: '2 days ago', assignee: 'Sarah L.' },
  ];

  const getPriorityColor = (p: string) => {
      switch(p) {
          case 'High': return 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 border-red-100 dark:border-red-900/30';
          case 'Medium': return 'text-amber-600 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400 border-amber-100 dark:border-amber-900/30';
          default: return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400 border-blue-100 dark:border-blue-900/30';
      }
  };

  const getStatusColor = (s: string) => {
      switch(s) {
          case 'New': return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400';
          case 'In Progress': return 'text-purple-600 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-400';
          case 'Resolved': return 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400';
          default: return 'text-slate-600 bg-slate-50 dark:bg-slate-800 dark:text-slate-400';
      }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                    <MessageSquare size={80} />
                </div>
                <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-xl">
                        <MessageSquare size={20} />
                    </div>
                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400 px-2 py-1 rounded-full">
                        <TrendingUp size={12} /> +12%
                    </span>
                </div>
                <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Open Requests</p>
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">24</h3>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                    <AlertCircle size={80} />
                </div>
                <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl">
                        <AlertCircle size={20} />
                    </div>
                    <span className="flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 px-2 py-1 rounded-full">
                        <TrendingUp size={12} /> +2
                    </span>
                </div>
                <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Urgent Attention</p>
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">5</h3>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                    <Clock size={80} />
                </div>
                <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-xl">
                        <Clock size={20} />
                    </div>
                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400 px-2 py-1 rounded-full">
                        <TrendingDown size={12} /> -15m
                    </span>
                </div>
                <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Avg Response Time</p>
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">2h 15m</h3>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                    <CheckCircle2 size={80} />
                </div>
                <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-xl">
                        <CheckCircle2 size={20} />
                    </div>
                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400 px-2 py-1 rounded-full">
                        98% Target
                    </span>
                </div>
                <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">SLA Compliance</p>
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">96.5%</h3>
                </div>
            </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col h-[350px]">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">Request Volume Trend</h3>
                    <div className="flex gap-2">
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                            <span className="w-2 h-2 rounded-full bg-indigo-500"></span> New
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Resolved
                        </div>
                    </div>
                </div>
                <div className="flex-1 w-full min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={volumeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                            <XAxis 
                                dataKey="day" 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fill: '#94a3b8', fontSize: 12 }} 
                                dy={10}
                            />
                            <YAxis 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fill: '#94a3b8', fontSize: 12 }} 
                            />
                            <Tooltip 
                                contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                itemStyle={{ color: '#1e293b' }}
                            />
                            <Area type="monotone" dataKey="new" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorNew)" />
                            <Area type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorResolved)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="lg:col-span-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col h-[350px]">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6">Request Distribution</h3>
                <div className="flex-1 w-full min-h-0 relative">
                     <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={typeData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {typeData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-3xl font-bold text-slate-900 dark:text-white">100%</span>
                        <span className="text-xs text-slate-500 uppercase font-medium">Breakdown</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Recent Requests Table */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
             <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                 <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">Recent Requests</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Latest tickets from all channels</p>
                 </div>
                 <div className="flex gap-2">
                     <button className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                         <Filter size={16} /> Filter
                     </button>
                     <button className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                         <Download size={16} /> Export
                     </button>
                 </div>
             </div>
             
             <div className="overflow-x-auto">
                 <table className="w-full text-left border-collapse min-w-[800px]">
                     <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-xs font-bold uppercase text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-700">
                         <tr>
                             <th className="px-6 py-4 pl-8">Request</th>
                             <th className="px-6 py-4">Client</th>
                             <th className="px-6 py-4">Status</th>
                             <th className="px-6 py-4">Priority</th>
                             <th className="px-6 py-4">Assignee</th>
                             <th className="px-6 py-4 text-right pr-8">Actions</th>
                         </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-sm">
                         {recentRequests.map((req) => (
                             <tr key={req.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors group cursor-pointer">
                                 <td className="px-6 py-4 pl-8">
                                     <div>
                                         <p className="font-bold text-slate-900 dark:text-white">{req.subject}</p>
                                         <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                                             <span className="font-mono">{req.id}</span>
                                             <span>•</span>
                                             <span>{req.time}</span>
                                             <span>•</span>
                                             <span className="text-indigo-600 dark:text-indigo-400 font-medium">{req.type}</span>
                                         </div>
                                     </div>
                                 </td>
                                 <td className="px-6 py-4">
                                     <div className="flex items-center gap-2">
                                         <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-500 dark:text-slate-400">
                                             {req.client.charAt(0)}
                                         </div>
                                         <span className="font-medium text-slate-700 dark:text-slate-300">{req.client}</span>
                                     </div>
                                 </td>
                                 <td className="px-6 py-4">
                                     <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${getStatusColor(req.status)}`}>
                                         {req.status}
                                     </span>
                                 </td>
                                 <td className="px-6 py-4">
                                     <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${getPriorityColor(req.priority)}`}>
                                         {req.priority === 'High' && <AlertCircle size={12} />}
                                         {req.priority === 'Medium' && <Clock size={12} />}
                                         {req.priority}
                                     </span>
                                 </td>
                                 <td className="px-6 py-4">
                                     {req.assignee === 'Unassigned' ? (
                                         <span className="text-slate-400 italic text-xs">Unassigned</span>
                                     ) : (
                                         <div className="flex items-center gap-2">
                                             <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-[10px] font-bold">
                                                 {req.assignee.charAt(0)}
                                             </div>
                                             <span className="text-slate-600 dark:text-slate-300">{req.assignee}</span>
                                         </div>
                                     )}
                                 </td>
                                 <td className="px-6 py-4 pr-8 text-right">
                                     <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors">
                                         <ArrowUpRight size={18} />
                                     </button>
                                 </td>
                             </tr>
                         ))}
                     </tbody>
                 </table>
             </div>
             
             <div className="p-4 border-t border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-center">
                 <button className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                     View All Requests
                 </button>
             </div>
        </div>
    </div>
  );
};
