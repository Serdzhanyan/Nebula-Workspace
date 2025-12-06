
import React from 'react';
import { ArrowLeft, Server, Activity, Database, Globe, Cpu, HardDrive, CheckCircle2, AlertTriangle, XCircle, RefreshCw } from 'lucide-react';

interface SystemMetricsPageProps {
  onBack: () => void;
}

interface ServiceMetric {
  id: string;
  name: string;
  type: 'api' | 'db' | 'worker' | 'cache';
  status: 'healthy' | 'degraded' | 'down';
  uptime: string;
  latency: string;
  cpu: number;
  memory: number;
  version: string;
  region: string;
}

export const SystemMetricsPage: React.FC<SystemMetricsPageProps> = ({ onBack }) => {
  const services: ServiceMetric[] = [
    { id: '1', name: 'Authentication Service', type: 'api', status: 'healthy', uptime: '99.99%', latency: '45ms', cpu: 12, memory: 24, version: 'v2.4.1', region: 'us-east-1' },
    { id: '2', name: 'Payment Gateway', type: 'api', status: 'healthy', uptime: '99.95%', latency: '120ms', cpu: 28, memory: 45, version: 'v1.8.0', region: 'us-east-1' },
    { id: '3', name: 'Notification Worker', type: 'worker', status: 'degraded', uptime: '98.50%', latency: '350ms', cpu: 85, memory: 70, version: 'v1.2.4', region: 'us-west-2' },
    { id: '4', name: 'Primary Database', type: 'db', status: 'healthy', uptime: '100%', latency: '15ms', cpu: 45, memory: 60, version: 'PostgreSQL 14', region: 'us-east-1' },
    { id: '5', name: 'Redis Cache Cluster', type: 'cache', status: 'healthy', uptime: '99.99%', latency: '2ms', cpu: 10, memory: 35, version: 'v6.2', region: 'us-east-1' },
    { id: '6', name: 'Search Indexer', type: 'worker', status: 'down', uptime: '0%', latency: '-', cpu: 0, memory: 0, version: 'v0.9.5', region: 'eu-central-1' },
    { id: '7', name: 'User Profile API', type: 'api', status: 'healthy', uptime: '99.98%', latency: '55ms', cpu: 15, memory: 30, version: 'v2.1.0', region: 'us-east-1' },
    { id: '8', name: 'Analytics Stream', type: 'worker', status: 'healthy', uptime: '99.90%', latency: '80ms', cpu: 55, memory: 40, version: 'v3.0.1', region: 'us-west-2' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle2 size={16} className="text-emerald-500" />;
      case 'degraded': return <AlertTriangle size={16} className="text-amber-500" />;
      case 'down': return <XCircle size={16} className="text-red-500" />;
      default: return <Activity size={16} className="text-slate-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-900/30';
      case 'degraded': return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-900/30';
      case 'down': return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/30';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'api': return <Globe size={16} />;
      case 'db': return <Database size={16} />;
      case 'worker': return <Cpu size={16} />;
      case 'cache': return <HardDrive size={16} />;
      default: return <Server size={16} />;
    }
  };

  const getUsageColor = (value: number) => {
    if (value > 80) return 'bg-red-500';
    if (value > 50) return 'bg-amber-500';
    return 'bg-emerald-500';
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
             <h2 className="text-3xl font-bold text-slate-900 dark:text-white">System Metrics</h2>
             <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/30 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                Live Monitoring
             </span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Real-time status of microservices and infrastructure.</p>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
          <RefreshCw size={16} /> Refresh Data
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
           <div className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Total Services</div>
           <div className="text-2xl font-bold text-slate-900 dark:text-white">24</div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
           <div className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Global Uptime</div>
           <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">99.98%</div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
           <div className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Avg Latency</div>
           <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">42ms</div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
           <div className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Incidents (24h)</div>
           <div className="text-2xl font-bold text-amber-500">1</div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {services.map((service) => (
            <div key={service.id} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                {/* Status Bar Top */}
                <div className={`absolute top-0 left-0 w-full h-1 ${
                    service.status === 'healthy' ? 'bg-emerald-500' : 
                    service.status === 'degraded' ? 'bg-amber-500' : 'bg-red-500'
                }`}></div>

                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-slate-50 dark:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300">
                            {getTypeIcon(service.type)}
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 dark:text-white text-sm">{service.name}</h3>
                            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                                <span>{service.version}</span>
                                <span>•</span>
                                <span className="uppercase">{service.region}</span>
                            </div>
                        </div>
                    </div>
                    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${getStatusColor(service.status)}`}>
                        {getStatusIcon(service.status)}
                        {service.status}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-700/50">
                        <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">CPU Usage</span>
                        <div className="flex items-center gap-2">
                             <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                 <div className={`h-full rounded-full ${getUsageColor(service.cpu)}`} style={{ width: `${service.cpu}%` }}></div>
                             </div>
                             <span className="text-xs font-bold text-slate-700 dark:text-slate-300 w-8 text-right">{service.cpu}%</span>
                        </div>
                    </div>
                     <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-700/50">
                        <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Memory</span>
                        <div className="flex items-center gap-2">
                             <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                 <div className={`h-full rounded-full ${getUsageColor(service.memory)}`} style={{ width: `${service.memory}%` }}></div>
                             </div>
                             <span className="text-xs font-bold text-slate-700 dark:text-slate-300 w-8 text-right">{service.memory}%</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                    <div className="flex gap-4">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-slate-400 uppercase font-semibold">Uptime</span>
                            <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{service.uptime}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] text-slate-400 uppercase font-semibold">Latency</span>
                            <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{service.latency}</span>
                        </div>
                    </div>
                    <button className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">
                        View Logs
                    </button>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};
