
import React, { useState } from 'react';
import { ArrowLeft, Shield, AlertTriangle, CheckCircle, Search, Filter, FileText, Lock, Globe, User, Clock, Download } from 'lucide-react';

interface DCAPPageProps {
  onBack: () => void;
}

interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  resource: string;
  status: 'success' | 'failure' | 'warning';
  ip: string;
}

export const DCAPPage: React.FC<DCAPPageProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<'all' | 'failure' | 'warning'>('all');

  const logs: AuditLog[] = [
    { id: 'log-1', timestamp: 'Oct 24, 10:42:15', user: 'Alex Johnson', action: 'Login Attempt', resource: 'Admin Portal', status: 'success', ip: '192.168.1.42' },
    { id: 'log-2', timestamp: 'Oct 24, 10:45:30', user: 'Unknown', action: 'API Request', resource: '/api/v1/users', status: 'failure', ip: '45.23.11.90' },
    { id: 'log-3', timestamp: 'Oct 24, 11:05:12', user: 'Sarah Lee', action: 'File Download', resource: 'Q3_Financials.pdf', status: 'success', ip: '192.168.1.15' },
    { id: 'log-4', timestamp: 'Oct 24, 11:20:00', user: 'System', action: 'Backup Scheduled', resource: 'Database-Primary', status: 'success', ip: 'localhost' },
    { id: 'log-5', timestamp: 'Oct 24, 12:15:45', user: 'Mark Vos', action: 'Permission Change', resource: 'DevOps Group', status: 'warning', ip: '192.168.1.88' },
    { id: 'log-6', timestamp: 'Oct 24, 13:30:22', user: 'James D.', action: 'Deploy', resource: 'Production-US', status: 'success', ip: '192.168.1.92' },
    { id: 'log-7', timestamp: 'Oct 24, 14:10:05', user: 'Unknown', action: 'Port Scan', resource: 'Firewall', status: 'failure', ip: '103.44.22.11' },
    { id: 'log-8', timestamp: 'Oct 24, 14:45:18', user: 'Alex Johnson', action: 'Update Config', resource: 'Global Settings', status: 'success', ip: '192.168.1.42' },
  ];

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.resource.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || log.status === filterType;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success': return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-[10px] font-bold uppercase"><CheckCircle size={10} /> Success</span>;
      case 'failure': return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 text-[10px] font-bold uppercase"><AlertTriangle size={10} /> Failure</span>;
      case 'warning': return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 text-[10px] font-bold uppercase"><AlertTriangle size={10} /> Warning</span>;
      default: return null;
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors mb-2 text-sm font-medium"
          >
            <ArrowLeft size={16} /> Back to Control Panel
          </button>
          <div className="flex items-center gap-3">
             <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Security Audit (DCAP)</h2>
             <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-900/30 text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wide">
                <Shield size={12} className="fill-current" />
                Protected
             </span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Data-Centric Audit & Protection logs and compliance status.</p>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
          <Download size={16} /> Export Logs
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
         <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
               <Shield size={80} />
            </div>
            <div className="flex items-center gap-2 mb-2 text-sm font-medium text-slate-500 dark:text-slate-400">
               <Shield size={16} className="text-emerald-500" /> Compliance Score
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">98%</div>
            <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">SOC2 Compliant</div>
         </div>

         <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="flex items-center gap-2 mb-2 text-sm font-medium text-slate-500 dark:text-slate-400">
               <AlertTriangle size={16} className="text-red-500" /> Critical Incidents (24h)
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">2</div>
            <div className="text-xs text-red-500 font-medium">Requires attention</div>
         </div>

         <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="flex items-center gap-2 mb-2 text-sm font-medium text-slate-500 dark:text-slate-400">
               <FileText size={16} className="text-blue-500" /> Total Events (Today)
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">1,429</div>
            <div className="text-xs text-blue-500 font-medium">Normal volume</div>
         </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex-1 flex flex-col overflow-hidden">
         {/* Table Toolbar */}
         <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
               <input 
                  type="text" 
                  placeholder="Search by user, action, or resource..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900 focus:border-indigo-300 transition-all text-slate-800 dark:text-slate-200"
               />
            </div>
            <div className="flex items-center gap-2">
               <Filter size={16} className="text-slate-400" />
               <select 
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as any)}
                  className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-indigo-500"
               >
                  <option value="all">All Events</option>
                  <option value="failure">Failures</option>
                  <option value="warning">Warnings</option>
               </select>
            </div>
         </div>

         {/* Logs */}
         <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
               <thead>
                  <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-700">
                     <th className="p-4 pl-6 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 w-48">Timestamp</th>
                     <th className="p-4 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 w-48">User</th>
                     <th className="p-4 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 w-48">Action</th>
                     <th className="p-4 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">Resource</th>
                     <th className="p-4 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 w-32">Status</th>
                     <th className="p-4 pr-6 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 w-32">IP Address</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {filteredLogs.map(log => (
                     <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                        <td className="p-4 pl-6 text-sm text-slate-500 dark:text-slate-400 font-mono flex items-center gap-2">
                           <Clock size={12} /> {log.timestamp}
                        </td>
                        <td className="p-4">
                           <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                              <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs">
                                 <User size={12} />
                              </div>
                              {log.user}
                           </div>
                        </td>
                        <td className="p-4 text-sm text-slate-700 dark:text-slate-300 font-medium">
                           {log.action}
                        </td>
                        <td className="p-4 text-sm text-slate-600 dark:text-slate-400 font-mono text-xs">
                           {log.resource}
                        </td>
                        <td className="p-4">
                           {getStatusBadge(log.status)}
                        </td>
                        <td className="p-4 pr-6 text-sm text-slate-500 dark:text-slate-400 font-mono">
                           <div className="flex items-center gap-1.5">
                              <Globe size={12} /> {log.ip}
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
            {filteredLogs.length === 0 && (
               <div className="flex flex-col items-center justify-center p-12 text-slate-400">
                  <Shield size={48} className="mb-4 opacity-20" />
                  <p className="font-medium">No logs found</p>
               </div>
            )}
         </div>
      </div>
    </div>
  );
};
