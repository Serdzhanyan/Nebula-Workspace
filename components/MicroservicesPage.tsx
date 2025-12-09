
import React from 'react';
import { ArrowLeft, Activity, Users, Shield, Key, Settings, Database, Briefcase, Phone, Building2 } from 'lucide-react';

interface ControlPanelPageProps {
  onBack: () => void;
  onNavigateToMetrics: () => void;
  onNavigateToUsers: () => void;
  onNavigateToDCAP: () => void;
  onNavigateToCRM: () => void;
  onNavigateToConfig: () => void;
  onNavigateToCallCenter: () => void;
  onNavigateToBackOffice: () => void;
}

export const MicroservicesPage: React.FC<ControlPanelPageProps> = ({ 
  onBack, 
  onNavigateToMetrics, 
  onNavigateToUsers, 
  onNavigateToDCAP, 
  onNavigateToCRM, 
  onNavigateToConfig, 
  onNavigateToCallCenter,
  onNavigateToBackOffice
}) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors mb-2 text-sm font-medium"
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </button>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Control Panel</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Administration and system management tools.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* System Metrics Widget */}
        <div 
          onClick={onNavigateToMetrics}
          className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:ring-2 hover:ring-indigo-50/50 dark:hover:ring-indigo-900/20 transition-all cursor-pointer relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <Activity size={120} />
          </div>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl">
              <Activity size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">System Metrics</h3>
              <div className="flex items-center gap-2 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">All Systems Operational</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-6">
             <div className="p-3 bg-slate-50 dark:bg-slate-700/30 rounded-lg">
                <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">CPU Load</span>
                <span className="font-mono text-sm font-bold text-slate-800 dark:text-slate-200">24%</span>
             </div>
             <div className="p-3 bg-slate-50 dark:bg-slate-700/30 rounded-lg">
                <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Uptime</span>
                <span className="font-mono text-sm font-bold text-slate-800 dark:text-slate-200">99.9%</span>
             </div>
          </div>

          <div className="mt-6 flex items-center justify-between text-sm font-medium text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            <span>View detailed stats</span>
            <ArrowLeft size={16} className="rotate-180" />
          </div>
        </div>

        {/* User Management (Clickable) */}
        <div 
          onClick={onNavigateToUsers}
          className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:ring-2 hover:ring-indigo-50/50 dark:hover:ring-indigo-900/20 transition-all cursor-pointer"
        >
           <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
              <Users size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">User Management</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Manage access and roles</p>
            </div>
          </div>
          <div className="space-y-3 mt-6">
             <div className="flex justify-between items-center text-sm p-2 rounded bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/50">
                <span className="text-slate-600 dark:text-slate-300">Active Users</span>
                <span className="font-bold text-slate-900 dark:text-white">142</span>
             </div>
             <div className="flex justify-between items-center text-sm p-2 rounded bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/50">
                <span className="text-slate-600 dark:text-slate-300">Pending Invites</span>
                <span className="font-bold text-amber-500">3</span>
             </div>
          </div>
          <div className="mt-6 flex items-center justify-between text-sm font-medium text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            <span>Manage users</span>
            <ArrowLeft size={16} className="rotate-180" />
          </div>
        </div>

        {/* Security Audit (DCAP) - Clickable */}
         <div 
           onClick={onNavigateToDCAP}
           className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:ring-2 hover:ring-indigo-50/50 dark:hover:ring-indigo-900/20 transition-all cursor-pointer"
         >
           <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl">
              <Shield size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Security Audit</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">DCAP & Compliance</p>
            </div>
          </div>
          <div className="space-y-3 mt-6">
             <div className="flex justify-between items-center text-sm p-2 rounded bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/50">
                <span className="text-slate-600 dark:text-slate-300">Compliance</span>
                <span className="font-bold text-emerald-500">98%</span>
             </div>
             <div className="flex justify-between items-center text-sm p-2 rounded bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/50">
                <span className="text-slate-600 dark:text-slate-300">Open Alerts</span>
                <span className="font-bold text-red-500">2</span>
             </div>
          </div>
          <div className="mt-6 flex items-center justify-between text-sm font-medium text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            <span>View audit logs</span>
            <ArrowLeft size={16} className="rotate-180" />
          </div>
        </div>

        {/* CRM Widget (Clickable) */}
        <div 
           onClick={onNavigateToCRM}
           className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:ring-2 hover:ring-indigo-50/50 dark:hover:ring-indigo-900/20 transition-all cursor-pointer"
         >
           <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-xl">
              <Briefcase size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">CRM</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Leads & Customers</p>
            </div>
          </div>
          <div className="space-y-3 mt-6">
             <div className="flex justify-between items-center text-sm p-2 rounded bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/50">
                <span className="text-slate-600 dark:text-slate-300">Pipeline Value</span>
                <span className="font-bold text-slate-900 dark:text-white">$2.4M</span>
             </div>
             <div className="flex justify-between items-center text-sm p-2 rounded bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/50">
                <span className="text-slate-600 dark:text-slate-300">New Leads</span>
                <span className="font-bold text-emerald-500">+128</span>
             </div>
          </div>
          <div className="mt-6 flex items-center justify-between text-sm font-medium text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            <span>Manage pipeline</span>
            <ArrowLeft size={16} className="rotate-180" />
          </div>
        </div>

        {/* Call Center Widget */}
        <div 
           onClick={onNavigateToCallCenter}
           className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:ring-2 hover:ring-indigo-50/50 dark:hover:ring-indigo-900/20 transition-all cursor-pointer"
         >
           <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl">
              <Phone size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Call Center</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Agents & Live Calls</p>
            </div>
          </div>
          <div className="space-y-3 mt-6">
             <div className="flex justify-between items-center text-sm p-2 rounded bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/50">
                <span className="text-slate-600 dark:text-slate-300">Active Calls</span>
                <span className="font-bold text-slate-900 dark:text-white">12</span>
             </div>
             <div className="flex justify-between items-center text-sm p-2 rounded bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/50">
                <span className="text-slate-600 dark:text-slate-300">Agents Online</span>
                <span className="font-bold text-emerald-500">8</span>
             </div>
          </div>
          <div className="mt-6 flex items-center justify-between text-sm font-medium text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            <span>Monitor activity</span>
            <ArrowLeft size={16} className="rotate-180" />
          </div>
        </div>

        {/* Back Office Widget (New) */}
        <div 
           onClick={onNavigateToBackOffice}
           className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:ring-2 hover:ring-indigo-50/50 dark:hover:ring-indigo-900/20 transition-all cursor-pointer"
         >
           <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 rounded-xl">
              <Building2 size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Back Office</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Internal operations & admin</p>
            </div>
          </div>
          <div className="space-y-3 mt-6">
             <div className="flex justify-between items-center text-sm p-2 rounded bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/50">
                <span className="text-slate-600 dark:text-slate-300">Pending Orders</span>
                <span className="font-bold text-slate-900 dark:text-white">42</span>
             </div>
             <div className="flex justify-between items-center text-sm p-2 rounded bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/50">
                <span className="text-slate-600 dark:text-slate-300">Open Invoices</span>
                <span className="font-bold text-amber-500">18</span>
             </div>
          </div>
          <div className="mt-6 flex items-center justify-between text-sm font-medium text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            <span>Manage operations</span>
            <ArrowLeft size={16} className="rotate-180" />
          </div>
        </div>

         {/* General Settings (Now Clickable) */}
         <div 
            onClick={onNavigateToConfig}
            className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:ring-2 hover:ring-indigo-50/50 dark:hover:ring-indigo-900/20 transition-all cursor-pointer"
         >
           <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/30 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              <Settings size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Global Config</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">App-wide settings</p>
            </div>
          </div>
          <div className="space-y-3 mt-6">
             <div className="flex justify-between items-center text-sm p-2 rounded bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/50">
                <span className="text-slate-600 dark:text-slate-300">System Mode</span>
                <span className="font-bold text-emerald-500">Live</span>
             </div>
             <div className="flex justify-between items-center text-sm p-2 rounded bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/50">
                <span className="text-slate-600 dark:text-slate-300">Version</span>
                <span className="font-bold text-slate-900 dark:text-white">v3.4.0</span>
             </div>
          </div>
          <div className="mt-6 flex items-center justify-between text-sm font-medium text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
             <span>Edit Configuration</span>
             <ArrowLeft size={16} className="rotate-180" />
          </div>
        </div>

         {/* API Keys (Placeholder) */}
         <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm hover:border-slate-300 dark:hover:border-slate-600 transition-colors opacity-75 hover:opacity-100">
           <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl">
              <Key size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">API Keys</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Manage developer access</p>
            </div>
          </div>
           <div className="space-y-3 mt-6">
             <div className="flex justify-between items-center text-sm p-2 rounded border border-slate-100 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-900/50">
                <code className="text-xs text-slate-500">pk_live_...9x2</code>
                <span className="text-[10px] font-bold text-emerald-500 uppercase">Active</span>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};
