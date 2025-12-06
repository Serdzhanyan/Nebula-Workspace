
import React, { useState } from 'react';
import { ArrowLeft, Bell, Lock, Globe, Moon, Monitor, Laptop, Smartphone, Key, Eye } from 'lucide-react';

interface SettingsPageProps {
  onBack: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'general' | 'notifications' | 'security'>('general');
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

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
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Account Settings</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your preferences and security settings.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 flex-1 overflow-hidden">
        {/* Sidebar Tabs */}
        <div className="w-full lg:w-64 flex flex-col gap-2">
           <button
             onClick={() => setActiveTab('general')}
             className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${
                activeTab === 'general' 
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-none' 
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
             }`}
           >
              <Globe size={18} /> General
           </button>
           <button
             onClick={() => setActiveTab('notifications')}
             className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${
                activeTab === 'notifications' 
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-none' 
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
             }`}
           >
              <Bell size={18} /> Notifications
           </button>
           <button
             onClick={() => setActiveTab('security')}
             className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${
                activeTab === 'security' 
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-none' 
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
             }`}
           >
              <Lock size={18} /> Security
           </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto pr-2 pb-8">
           <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 lg:p-8">
              
              {activeTab === 'general' && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-right-2 duration-300">
                      <div>
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Language & Region</h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Set your preferred language and regional settings.</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Language</label>
                                  <select className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-indigo-500">
                                      <option>English (US)</option>
                                      <option>English (UK)</option>
                                      <option>Spanish</option>
                                      <option>French</option>
                                  </select>
                              </div>
                              <div className="space-y-1.5">
                                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Timezone</label>
                                  <select className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-indigo-500">
                                      <option>(GMT-08:00) Pacific Time</option>
                                      <option>(GMT-05:00) Eastern Time</option>
                                      <option>(GMT+00:00) UTC</option>
                                  </select>
                              </div>
                          </div>
                      </div>

                      <div className="border-t border-slate-100 dark:border-slate-700 pt-6">
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Display</h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Manage how the dashboard looks and feels.</p>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                              <button className="flex flex-col items-center gap-3 p-4 rounded-xl border-2 border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 cursor-pointer">
                                  <Monitor size={24} className="text-indigo-600 dark:text-indigo-400" />
                                  <span className="text-sm font-medium text-slate-900 dark:text-white">System</span>
                              </button>
                              <button className="flex flex-col items-center gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500 transition-colors cursor-pointer bg-white dark:bg-slate-800">
                                  <Moon size={24} className="text-slate-400" />
                                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Dark</span>
                              </button>
                               <button className="flex flex-col items-center gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500 transition-colors cursor-pointer bg-white dark:bg-slate-800">
                                  <Globe size={24} className="text-slate-400" />
                                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Light</span>
                              </button>
                          </div>
                      </div>
                  </div>
              )}

              {activeTab === 'notifications' && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-right-2 duration-300">
                      <div>
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Email Notifications</h3>
                          <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                  <div>
                                      <p className="text-sm font-medium text-slate-900 dark:text-white">Product Updates</p>
                                      <p className="text-xs text-slate-500 dark:text-slate-400">Receive emails about new features and improvements.</p>
                                  </div>
                                  <label className="relative inline-flex items-center cursor-pointer">
                                      <input type="checkbox" className="sr-only peer" checked={emailNotifs} onChange={() => setEmailNotifs(!emailNotifs)} />
                                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                                  </label>
                              </div>
                              <div className="flex items-center justify-between">
                                  <div>
                                      <p className="text-sm font-medium text-slate-900 dark:text-white">Marketing Emails</p>
                                      <p className="text-xs text-slate-500 dark:text-slate-400">Receive special offers and promotions.</p>
                                  </div>
                                  <label className="relative inline-flex items-center cursor-pointer">
                                      <input type="checkbox" className="sr-only peer" checked={marketingEmails} onChange={() => setMarketingEmails(!marketingEmails)} />
                                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                                  </label>
                              </div>
                          </div>
                      </div>

                      <div className="border-t border-slate-100 dark:border-slate-700 pt-6">
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Push Notifications</h3>
                          <div className="flex items-center justify-between">
                              <div>
                                  <p className="text-sm font-medium text-slate-900 dark:text-white">Direct Messages</p>
                                  <p className="text-xs text-slate-500 dark:text-slate-400">Receive alerts when someone sends you a message.</p>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                  <input type="checkbox" className="sr-only peer" checked={pushNotifs} onChange={() => setPushNotifs(!pushNotifs)} />
                                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                              </label>
                          </div>
                      </div>
                  </div>
              )}

              {activeTab === 'security' && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-right-2 duration-300">
                      <div>
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Change Password</h3>
                          <div className="space-y-4 max-w-md">
                              <div className="space-y-1.5">
                                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Current Password</label>
                                  <div className="relative">
                                      <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                      <input type="password" placeholder="••••••••" className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
                                  </div>
                              </div>
                              <div className="space-y-1.5">
                                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">New Password</label>
                                  <div className="relative">
                                      <Key size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                      <input type="password" placeholder="••••••••" className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
                                  </div>
                              </div>
                              <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                                  Update Password
                              </button>
                          </div>
                      </div>

                      <div className="border-t border-slate-100 dark:border-slate-700 pt-6">
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Active Sessions</h3>
                          <div className="space-y-3">
                              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-700/30">
                                  <div className="flex items-center gap-3">
                                      <div className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                                          <Laptop size={20} className="text-indigo-500" />
                                      </div>
                                      <div>
                                          <p className="text-sm font-medium text-slate-900 dark:text-white">MacBook Pro 16"</p>
                                          <p className="text-xs text-emerald-500 font-medium">Active now • San Francisco, US</p>
                                      </div>
                                  </div>
                                  <button className="text-xs font-medium text-slate-400 hover:text-red-500 transition-colors">Revoke</button>
                              </div>
                              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-700/30">
                                  <div className="flex items-center gap-3">
                                      <div className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                                          <Smartphone size={20} className="text-slate-500" />
                                      </div>
                                      <div>
                                          <p className="text-sm font-medium text-slate-900 dark:text-white">iPhone 13</p>
                                          <p className="text-xs text-slate-500">2 hours ago • San Francisco, US</p>
                                      </div>
                                  </div>
                                  <button className="text-xs font-medium text-slate-400 hover:text-red-500 transition-colors">Revoke</button>
                              </div>
                          </div>
                      </div>
                  </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};
