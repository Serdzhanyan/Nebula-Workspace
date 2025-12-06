
import React, { useState } from 'react';
import { ArrowLeft, Save, Globe, Shield, Bell, Check, Server, Lock, AlertTriangle, Loader2 } from 'lucide-react';

interface SystemConfigPageProps {
  onBack: () => void;
}

export const SystemConfigPage: React.FC<SystemConfigPageProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'general' | 'security' | 'notifications'>('general');
  const [isSaving, setIsSaving] = useState(false);

  // Mock Configuration State
  const [config, setConfig] = useState({
    appName: 'Nebula Workspace',
    supportEmail: 'support@nebula.com',
    maintenanceMode: false,
    defaultLanguage: 'English (US)',
    minPasswordLength: 12,
    sessionTimeout: 30, // minutes
    require2FA: true,
    restrictIPs: false,
    smtpServer: 'smtp.nebula.internal',
    senderName: 'Nebula System',
    enableEmailAlerts: true
  });

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      // In a real app, this would trigger a toast notification
    }, 1000);
  };

  const handleChange = (key: keyof typeof config, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
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
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">System Configuration</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage global application settings and policies.</p>
        </div>
        
        <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200/50 dark:shadow-none disabled:opacity-70"
        >
            {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 flex-1 min-h-0">
        {/* Sidebar Navigation */}
        <div className="w-full lg:w-64 flex flex-col gap-2">
            <button
                onClick={() => setActiveTab('general')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${
                activeTab === 'general' 
                ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm border border-indigo-100 dark:border-indigo-900' 
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
            >
                <Globe size={18} /> General
            </button>
            <button
                onClick={() => setActiveTab('security')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${
                activeTab === 'security' 
                ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm border border-indigo-100 dark:border-indigo-900' 
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
            >
                <Shield size={18} /> Security & Access
            </button>
            <button
                onClick={() => setActiveTab('notifications')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${
                activeTab === 'notifications' 
                ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm border border-indigo-100 dark:border-indigo-900' 
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
            >
                <Bell size={18} /> Notifications
            </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-8 overflow-y-auto">
            
            {activeTab === 'general' && (
                <div className="space-y-8 animate-in fade-in max-w-2xl">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Application Basics</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Application Name</label>
                                <input 
                                    type="text" 
                                    value={config.appName}
                                    onChange={(e) => handleChange('appName', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Support Email</label>
                                    <input 
                                        type="email" 
                                        value={config.supportEmail}
                                        onChange={(e) => handleChange('supportEmail', e.target.value)}
                                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Default Language</label>
                                    <select 
                                        value={config.defaultLanguage}
                                        onChange={(e) => handleChange('defaultLanguage', e.target.value)}
                                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                                    >
                                        <option>English (US)</option>
                                        <option>English (UK)</option>
                                        <option>Spanish</option>
                                        <option>French</option>
                                        <option>German</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100 dark:border-slate-700">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">System Status</h3>
                        <div className="flex items-center justify-between p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-xl">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg">
                                    <AlertTriangle size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">Maintenance Mode</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Prevent non-admin users from accessing the system.</p>
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    className="sr-only peer" 
                                    checked={config.maintenanceMode}
                                    onChange={(e) => handleChange('maintenanceMode', e.target.checked)}
                                />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-amber-500"></div>
                            </label>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'security' && (
                <div className="space-y-8 animate-in fade-in max-w-2xl">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Authentication Policies</h3>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-900 dark:text-white">Require Two-Factor Authentication (2FA)</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Enforce 2FA for all user accounts.</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        className="sr-only peer" 
                                        checked={config.require2FA}
                                        onChange={(e) => handleChange('require2FA', e.target.checked)}
                                    />
                                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                                </label>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Min Password Length</label>
                                    <input 
                                        type="number" 
                                        value={config.minPasswordLength}
                                        onChange={(e) => handleChange('minPasswordLength', parseInt(e.target.value))}
                                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Session Timeout (Minutes)</label>
                                    <input 
                                        type="number" 
                                        value={config.sessionTimeout}
                                        onChange={(e) => handleChange('sessionTimeout', parseInt(e.target.value))}
                                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100 dark:border-slate-700">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Network Security</h3>
                        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg">
                                    <Lock size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">Restrict Login by IP</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Only allow logins from whitelisted IP addresses.</p>
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    className="sr-only peer" 
                                    checked={config.restrictIPs}
                                    onChange={(e) => handleChange('restrictIPs', e.target.checked)}
                                />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                            </label>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'notifications' && (
                <div className="space-y-8 animate-in fade-in max-w-2xl">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Email Configuration</h3>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">SMTP Server</label>
                                    <input 
                                        type="text" 
                                        value={config.smtpServer}
                                        onChange={(e) => handleChange('smtpServer', e.target.value)}
                                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Sender Name</label>
                                    <input 
                                        type="text" 
                                        value={config.senderName}
                                        onChange={(e) => handleChange('senderName', e.target.value)}
                                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100 dark:border-slate-700">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">System Alerts</h3>
                        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                                    <Server size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">System Health Alerts</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Receive emails when system resources are low.</p>
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    className="sr-only peer" 
                                    checked={config.enableEmailAlerts}
                                    onChange={(e) => handleChange('enableEmailAlerts', e.target.checked)}
                                />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                    </div>
                </div>
            )}

        </div>
      </div>
    </div>
  );
};
