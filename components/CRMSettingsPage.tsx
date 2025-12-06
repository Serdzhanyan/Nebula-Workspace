
import React, { useState } from 'react';
import { Save, Plus, Trash2, GripVertical, Check, Globe, CreditCard, Mail, Slack, Layout, Database, Bell, Server, FileText, ArrowLeftRight, Code, Folder, HardDrive, Workflow, Shield, Cloud } from 'lucide-react';

export const CRMSettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'pipelines' | 'integrations'>('general');
  
  const [currency, setCurrency] = useState('USD');
  const [dealRotting, setDealRotting] = useState('30');
  
  const [pipelineStages, setPipelineStages] = useState([
    { id: '1', name: 'Lead', probability: 10, color: 'bg-slate-200' },
    { id: '2', name: 'Qualified', probability: 40, color: 'bg-blue-500' },
    { id: '3', name: 'Proposal', probability: 60, color: 'bg-indigo-500' },
    { id: '4', name: 'Negotiation', probability: 80, color: 'bg-purple-500' },
    { id: '5', name: 'Closed Won', probability: 100, color: 'bg-emerald-500' },
  ]);

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  const deleteStage = (id: string) => {
    setPipelineStages(pipelineStages.filter(s => s.id !== id));
  };

  const addStage = () => {
    const newStage = {
      id: Date.now().toString(),
      name: 'New Stage',
      probability: 50,
      color: 'bg-slate-200'
    };
    setPipelineStages([...pipelineStages, newStage]);
  };

  const updateStage = (id: string, field: string, value: any) => {
    setPipelineStages(pipelineStages.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  return (
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">CRM Settings</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Configure your sales pipeline, general preferences, and integrations.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 flex-1 min-h-0">
        {/* Sidebar */}
        <div className="w-full lg:w-64 flex flex-col gap-2">
          <button
            onClick={() => setActiveTab('general')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${
              activeTab === 'general'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Globe size={18} /> General
          </button>
          <button
            onClick={() => setActiveTab('pipelines')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${
              activeTab === 'pipelines'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Layout size={18} /> Pipelines
          </button>
          <button
            onClick={() => setActiveTab('integrations')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${
              activeTab === 'integrations'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Database size={18} /> Integrations
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-8 overflow-y-auto">
          
          {activeTab === 'general' && (
            <div className="space-y-8 max-w-2xl animate-in fade-in">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Regional Settings</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Default Currency</label>
                    <select 
                      value={currency} 
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Fiscal Year Start</label>
                    <select className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500">
                      <option>January</option>
                      <option>April</option>
                      <option>July</option>
                      <option>October</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-700 pt-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Deal Settings</h3>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Deal Rotting (Days)</label>
                  <p className="text-xs text-slate-400 mb-2">Highlight deals that haven't been updated in this many days.</p>
                  <input 
                    type="number" 
                    value={dealRotting}
                    onChange={(e) => setDealRotting(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button 
                  onClick={handleSave}
                  className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200/50 dark:shadow-none flex items-center gap-2"
                >
                  <Save size={18} /> Save Preferences
                </button>
              </div>
            </div>
          )}

          {activeTab === 'pipelines' && (
            <div className="space-y-6 max-w-3xl animate-in fade-in">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Sales Pipeline Stages</h3>
                <button 
                  onClick={addStage}
                  className="text-sm text-indigo-600 dark:text-indigo-400 font-bold hover:underline flex items-center gap-1"
                >
                  <Plus size={14} /> Add Stage
                </button>
              </div>
              
              <div className="space-y-3">
                {pipelineStages.map((stage, index) => (
                  <div key={stage.id} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl group">
                    <GripVertical size={20} className="text-slate-400 cursor-move" />
                    <div className="flex-1 grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-1 flex justify-center">
                         <div className={`w-4 h-4 rounded-full ${stage.color}`}></div>
                      </div>
                      <div className="col-span-6">
                        <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Stage Name</label>
                        <input 
                          type="text" 
                          value={stage.name}
                          onChange={(e) => updateStage(stage.id, 'name', e.target.value)}
                          className="w-full bg-transparent border-b border-slate-300 dark:border-slate-600 focus:border-indigo-500 outline-none text-sm font-medium pb-1 text-slate-900 dark:text-white"
                        />
                      </div>
                      <div className="col-span-4">
                        <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Probability (%)</label>
                        <input 
                          type="number" 
                          value={stage.probability}
                          onChange={(e) => updateStage(stage.id, 'probability', parseInt(e.target.value))}
                          className="w-full bg-transparent border-b border-slate-300 dark:border-slate-600 focus:border-indigo-500 outline-none text-sm font-medium pb-1 text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>
                    <button 
                      onClick={() => deleteStage(stage.id)}
                      className="p-2 text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
                <button 
                  onClick={handleSave}
                  className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors shadow-lg flex items-center gap-2"
                >
                  <Save size={18} /> Save Pipeline
                </button>
              </div>
            </div>
          )}

          {activeTab === 'integrations' && (
            <div className="space-y-10 animate-in fade-in pb-12">
              
              {/* Communication */}
              <section>
                <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 dark:border-slate-700 pb-2">Communication & Collaboration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between hover:border-indigo-300 transition-colors bg-white dark:bg-slate-800">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                        <Mail size={24} className="text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white">Gmail</h4>
                        <p className="text-xs text-slate-500">Sync emails and calendar</p>
                      </div>
                    </div>
                    <button className="px-3 py-1.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-lg text-xs font-bold flex items-center gap-1">
                      <Check size={12} /> Connected
                    </button>
                  </div>

                  <div className="p-5 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between hover:border-indigo-300 transition-colors bg-white dark:bg-slate-800">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                        <Slack size={24} className="text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white">Slack</h4>
                        <p className="text-xs text-slate-500">Deal notifications</p>
                      </div>
                    </div>
                    <button className="px-3 py-1.5 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700">
                      Connect
                    </button>
                  </div>
                </div>
              </section>

              {/* ERP & Enterprise */}
              <section>
                <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 dark:border-slate-700 pb-2">ERP & Enterprise Systems</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between hover:border-indigo-300 transition-colors bg-white dark:bg-slate-800">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                        <Server size={24} className="text-blue-700" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white">SAP ERP</h4>
                        <p className="text-xs text-slate-500">Sync customer & order data</p>
                      </div>
                    </div>
                    <button className="px-3 py-1.5 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700">
                      Configure
                    </button>
                  </div>

                  <div className="p-5 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between hover:border-indigo-300 transition-colors bg-white dark:bg-slate-800">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-xl">
                        <Server size={24} className="text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white">Oracle NetSuite</h4>
                        <p className="text-xs text-slate-500">Inventory & Financials</p>
                      </div>
                    </div>
                    <button className="px-3 py-1.5 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700">
                      Connect
                    </button>
                  </div>
                </div>
              </section>

              {/* Accounting */}
              <section>
                <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 dark:border-slate-700 pb-2">Accounting & Finance</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between hover:border-indigo-300 transition-colors bg-white dark:bg-slate-800">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                        <FileText size={24} className="text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white">QuickBooks</h4>
                        <p className="text-xs text-slate-500">Invoicing & Payments</p>
                      </div>
                    </div>
                    <button className="px-3 py-1.5 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700">
                      Connect
                    </button>
                  </div>

                  <div className="p-5 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between hover:border-indigo-300 transition-colors bg-white dark:bg-slate-800">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-cyan-50 dark:bg-cyan-900/20 rounded-xl">
                        <FileText size={24} className="text-cyan-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white">Xero</h4>
                        <p className="text-xs text-slate-500">Accounting Data Sync</p>
                      </div>
                    </div>
                    <button className="px-3 py-1.5 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700">
                      Connect
                    </button>
                  </div>

                  <div className="p-5 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between hover:border-indigo-300 transition-colors bg-white dark:bg-slate-800">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl">
                        <CreditCard size={24} className="text-indigo-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white">Stripe</h4>
                        <p className="text-xs text-slate-500">Payment processing</p>
                      </div>
                    </div>
                    <button className="px-3 py-1.5 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700">
                      Connect
                    </button>
                  </div>
                </div>
              </section>

              {/* Document Management (New) */}
              <section>
                <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 dark:border-slate-700 pb-2">Document Management</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between hover:border-indigo-300 transition-colors bg-white dark:bg-slate-800">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                        <Folder size={24} className="text-blue-500" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white">Google Drive</h4>
                        <p className="text-xs text-slate-500">Store contracts & proposals</p>
                      </div>
                    </div>
                    <button className="px-3 py-1.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-lg text-xs font-bold flex items-center gap-1">
                      <Check size={12} /> Linked
                    </button>
                  </div>

                  <div className="p-5 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between hover:border-indigo-300 transition-colors bg-white dark:bg-slate-800">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-cyan-50 dark:bg-cyan-900/20 rounded-xl">
                        <Cloud size={24} className="text-cyan-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white">SharePoint</h4>
                        <p className="text-xs text-slate-500">Corporate document sync</p>
                      </div>
                    </div>
                    <button className="px-3 py-1.5 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700">
                      Connect
                    </button>
                  </div>
                </div>
              </section>

              {/* Record Keeping & Archives (New) */}
              <section>
                <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 dark:border-slate-700 pb-2">Record Keeping & Compliance</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between hover:border-indigo-300 transition-colors bg-white dark:bg-slate-800">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
                        <HardDrive size={24} className="text-amber-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white">Digital Archive</h4>
                        <p className="text-xs text-slate-500">Long-term record retention</p>
                      </div>
                    </div>
                    <button className="px-3 py-1.5 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700">
                      Configure
                    </button>
                  </div>

                  <div className="p-5 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between hover:border-indigo-300 transition-colors bg-white dark:bg-slate-800">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-xl">
                        <Shield size={24} className="text-slate-600 dark:text-slate-300" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white">Compliance Vault</h4>
                        <p className="text-xs text-slate-500">Audit logs & legal hold</p>
                      </div>
                    </div>
                    <button className="px-3 py-1.5 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700">
                      Connect
                    </button>
                  </div>
                </div>
              </section>

              {/* Automation & Sync (New) */}
              <section>
                <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 dark:border-slate-700 pb-2">Automation & Synchronization</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between hover:border-indigo-300 transition-colors bg-white dark:bg-slate-800">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
                        <Workflow size={24} className="text-orange-500" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white">Zapier</h4>
                        <p className="text-xs text-slate-500">Connect to 5,000+ apps</p>
                      </div>
                    </div>
                    <button className="px-3 py-1.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-lg text-xs font-bold flex items-center gap-1">
                      <Check size={12} /> Active
                    </button>
                  </div>

                  <div className="p-5 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between hover:border-indigo-300 transition-colors bg-white dark:bg-slate-800">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                        <ArrowLeftRight size={24} className="text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white">Power Automate</h4>
                        <p className="text-xs text-slate-500">Microsoft ecosystem sync</p>
                      </div>
                    </div>
                    <button className="px-3 py-1.5 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700">
                      Connect
                    </button>
                  </div>
                </div>
              </section>

              {/* Data Exchange */}
              <section>
                <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 dark:border-slate-700 pb-2">Developer Tools</h3>
                <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <Code size={20} className="text-indigo-500" />
                            <h4 className="font-bold text-slate-900 dark:text-white">Webhooks</h4>
                        </div>
                        <button className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline">+ Add Endpoint</button>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                            <div>
                                <p className="text-sm font-mono text-slate-600 dark:text-slate-300">https://api.erp-system.com/hooks/crm-update</p>
                                <div className="flex gap-2 mt-1">
                                    <span className="text-[10px] bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded text-slate-500">deal.updated</span>
                                    <span className="text-[10px] bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded text-slate-500">client.created</span>
                                </div>
                            </div>
                            <span className="text-[10px] bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-2 py-0.5 rounded font-bold">Active</span>
                        </div>
                    </div>
                </div>
                
                <div className="mt-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                            <Code size={20} className="text-indigo-500" />
                            <h4 className="font-bold text-slate-900 dark:text-white">API Access</h4>
                        </div>
                        <button className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline">Manage Keys</button>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                        Use the CRM API to sync data with custom internal applications.
                    </p>
                    <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                        <code className="text-xs text-slate-500">pk_live_...8x92m</code>
                        <span className="text-[10px] text-slate-400">Last used: 2m ago</span>
                    </div>
                </div>
              </section>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
