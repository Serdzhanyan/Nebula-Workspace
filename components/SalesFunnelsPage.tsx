
import React, { useState } from 'react';
import { Plus, BarChart3, Settings, MoreHorizontal, ArrowRight, TrendingUp, Users, DollarSign, Filter, ChevronRight, X, Save, Trash2, GripVertical, PieChart, Info, Calendar } from 'lucide-react';
import { ResponsiveContainer, FunnelChart, Funnel, LabelList, Tooltip, Cell } from 'recharts';

interface FunnelStage {
  id: string;
  name: string;
  conversionRate: number;
  dealCount: number;
  value: number;
  color: string;
}

interface FunnelData {
  id: string;
  name: string;
  type: 'B2B' | 'B2C' | 'Partnership';
  stages: FunnelStage[];
  totalValue: number;
  avgConversion: number;
  active: boolean;
}

export const SalesFunnelsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'stages' | 'analysis' | 'config'>('stages');
  
  const [funnels, setFunnels] = useState<FunnelData[]>([
    {
      id: '1',
      name: 'Enterprise B2B Sales',
      type: 'B2B',
      totalValue: 4200000,
      avgConversion: 12.5,
      active: true,
      stages: [
        { id: 's1', name: 'Lead Qualification', conversionRate: 100, dealCount: 150, value: 0, color: '#6366f1' },
        { id: 's2', name: 'Discovery Call', conversionRate: 45, dealCount: 68, value: 1200000, color: '#818cf8' },
        { id: 's3', name: 'Solution Demo', conversionRate: 60, dealCount: 41, value: 2100000, color: '#a5b4fc' },
        { id: 's4', name: 'Proposal', conversionRate: 50, dealCount: 20, value: 900000, color: '#c7d2fe' },
        { id: 's5', name: 'Negotiation', conversionRate: 80, dealCount: 16, value: 850000, color: '#e0e7ff' },
        { id: 's6', name: 'Closed Won', conversionRate: 75, dealCount: 12, value: 4200000, color: '#10b981' },
      ]
    },
    {
      id: '2',
      name: 'Partnership Program',
      type: 'Partnership',
      totalValue: 850000,
      avgConversion: 8.2,
      active: true,
      stages: [
        { id: 'p1', name: 'Initial Outreach', conversionRate: 100, dealCount: 300, value: 0, color: '#8b5cf6' },
        { id: 'p2', name: 'Meeting', conversionRate: 15, dealCount: 45, value: 0, color: '#a78bfa' },
        { id: 'p3', name: 'Term Sheet', conversionRate: 30, dealCount: 14, value: 500000, color: '#c4b5fd' },
        { id: 'p4', name: 'Signed', conversionRate: 90, dealCount: 12, value: 850000, color: '#10b981' },
      ]
    }
  ]);

  const [selectedFunnel, setSelectedFunnel] = useState<FunnelData>(funnels[0]);
  const [funnelInModal, setFunnelInModal] = useState<FunnelData | null>(null);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  const updateStageName = (index: number, newName: string) => {
      const updatedStages = [...selectedFunnel.stages];
      updatedStages[index].name = newName;
      setSelectedFunnel({ ...selectedFunnel, stages: updatedStages });
  };

  const removeStage = (index: number) => {
      const updatedStages = [...selectedFunnel.stages];
      updatedStages.splice(index, 1);
      setSelectedFunnel({ ...selectedFunnel, stages: updatedStages });
  };

  const addStage = () => {
      const newStage: FunnelStage = {
          id: `new-${Date.now()}`,
          name: 'New Stage',
          conversionRate: 0,
          dealCount: 0,
          value: 0,
          color: '#cbd5e1'
      };
      setSelectedFunnel({ ...selectedFunnel, stages: [...selectedFunnel.stages, newStage] });
  };

  return (
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Funnel Detail Modal */}
      {funnelInModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setFunnelInModal(null)}>
            <div 
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200 dark:border-slate-700"
                onClick={e => e.stopPropagation()}
            >
                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                        <Filter size={20} className="text-indigo-600 dark:text-indigo-400" /> 
                        Funnel Details
                    </h3>
                    <button onClick={() => setFunnelInModal(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors rounded-full p-1 hover:bg-slate-100 dark:hover:bg-slate-700">
                        <X size={20} />
                    </button>
                </div>
                <div className="p-6 space-y-6">
                    <div>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Funnel Name</span>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{funnelInModal.name}</h2>
                        <span className={`inline-flex mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium border ${funnelInModal.active ? 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                            {funnelInModal.active ? 'Active' : 'Inactive'}
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-700/50">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Total Value</span>
                            <span className="text-xl font-bold text-slate-900 dark:text-white">{formatCurrency(funnelInModal.totalValue)}</span>
                        </div>
                        <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-700/50">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Avg Conversion</span>
                            <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{funnelInModal.avgConversion}%</span>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-3">Stages Configuration</h4>
                        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                            {funnelInModal.stages.map((stage, i) => (
                                <div key={i} className="flex justify-between items-center text-sm p-2 rounded bg-slate-50 dark:bg-slate-700/30 border border-slate-100 dark:border-slate-700/50">
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-600 flex items-center justify-center text-[10px] font-bold text-slate-600 dark:text-slate-300">
                                            {i + 1}
                                        </div>
                                        <span className="text-slate-700 dark:text-slate-200 font-medium">{stage.name}</span>
                                    </div>
                                    <span className="text-slate-500 dark:text-slate-400 text-xs">{stage.conversionRate}% Conv.</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-400 border-t border-slate-100 dark:border-slate-700 pt-4">
                        <Calendar size={12} /> Created: Oct 24, 2023 • Last Modified: 2 days ago
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-start md:items-center">
        <div>
           <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Filter className="text-indigo-500" /> Sales Funnels
           </h2>
           <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage pipeline stages, track conversions, and analyze success.</p>
        </div>
        
        <div className="flex gap-2">
            <button 
                onClick={() => setActiveTab('analysis')}
                className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors shadow-sm ${activeTab === 'analysis' ? 'bg-indigo-100 text-indigo-700 border border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}
            >
                <BarChart3 size={16} /> Analysis
            </button>
            <button 
                onClick={() => setActiveTab('config')}
                className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors shadow-sm ${activeTab === 'config' ? 'bg-indigo-100 text-indigo-700 border border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}
            >
                <Settings size={16} /> Configure
            </button>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-6 h-full min-h-0">
         {/* Sidebar List */}
         <div className="w-full xl:w-80 flex flex-col gap-4">
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 shadow-sm">
               <div className="flex items-center justify-between mb-3 px-2">
                   <h3 className="text-sm font-bold text-slate-900 dark:text-white">Your Funnels</h3>
                   <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-400 hover:text-indigo-600">
                       <Plus size={14} />
                   </button>
               </div>
               <div className="space-y-2">
                  {funnels.map(funnel => (
                     <div 
                        key={funnel.id}
                        onClick={() => setSelectedFunnel(funnel)}
                        className={`p-3 rounded-xl cursor-pointer transition-all border group relative ${
                           selectedFunnel.id === funnel.id 
                           ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800 ring-1 ring-indigo-500/20' 
                           : 'bg-transparent border-transparent hover:bg-slate-50 dark:hover:bg-slate-700/30'
                        }`}
                     >
                        <div className="flex justify-between items-start mb-1">
                           <span className={`font-semibold text-sm ${selectedFunnel.id === funnel.id ? 'text-indigo-700 dark:text-indigo-300' : 'text-slate-700 dark:text-slate-200'}`}>
                              {funnel.name}
                           </span>
                           {funnel.active && <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5"></span>}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                           <span>{funnel.stages.length} Stages</span>
                           <span>•</span>
                           <span>{funnel.type}</span>
                        </div>
                        
                        {/* Info Button */}
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                setFunnelInModal(funnel);
                            }}
                            className="absolute right-2 top-2 p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-white dark:hover:bg-slate-800 rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-sm ring-1 ring-slate-200 dark:ring-slate-700"
                            title="View Details"
                        >
                            <Info size={14} />
                        </button>
                     </div>
                  ))}
               </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white shadow-lg">
                <h4 className="font-bold text-lg mb-2">Performance</h4>
                <div className="space-y-3">
                    <div>
                        <div className="flex justify-between text-xs opacity-80 mb-1">
                            <span>Win Rate</span>
                            <span>{selectedFunnel.avgConversion}%</span>
                        </div>
                        <div className="w-full bg-black/20 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${selectedFunnel.avgConversion}%` }}></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-xs opacity-80 mb-1">
                            <span>Total Value</span>
                            <span>{formatCurrency(selectedFunnel.totalValue)}</span>
                        </div>
                    </div>
                </div>
            </div>
         </div>

         {/* Main Content */}
         <div className="flex-1 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
               <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{selectedFunnel.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                     <span className="flex items-center gap-1"><Users size={14} /> Total Pipeline: {selectedFunnel.stages[0].dealCount} Deals</span>
                  </div>
               </div>
               <div className="flex bg-slate-100 dark:bg-slate-700/50 p-1 rounded-lg">
                   {(['stages', 'analysis', 'config'] as const).map(tab => (
                       <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-all ${
                              activeTab === tab 
                              ? 'bg-white dark:bg-slate-600 text-indigo-600 dark:text-white shadow-sm' 
                              : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                          }`}
                       >
                           {tab}
                       </button>
                   ))}
               </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50 dark:bg-slate-900/50">
               
               {activeTab === 'stages' && (
                   <div className="max-w-3xl mx-auto space-y-4 animate-in fade-in slide-in-from-bottom-2">
                      {selectedFunnel.stages.map((stage, index) => (
                         <div key={stage.id} className="relative">
                            {/* Connecting Line */}
                            {index !== selectedFunnel.stages.length - 1 && (
                               <div className="absolute left-[28px] top-12 bottom-[-16px] w-0.5 bg-slate-200 dark:bg-slate-700 -z-10"></div>
                            )}

                            <div className="flex items-center gap-4 group">
                               <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 border-2 border-indigo-100 dark:border-slate-700 flex items-center justify-center font-bold text-lg text-indigo-600 dark:text-indigo-400 shadow-sm z-10 shrink-0 group-hover:border-indigo-500 transition-colors">
                                  {index + 1}
                               </div>

                               <div className="flex-1 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 shadow-sm hover:shadow-md transition-all flex items-center justify-between">
                                  <div>
                                     <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">{stage.name}</h4>
                                     <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                                        <span className="bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded font-medium">{stage.dealCount} Deals</span>
                                        <span>Value: {formatCurrency(stage.value)}</span>
                                     </div>
                                  </div>

                                  <div className="flex items-center gap-6">
                                     {index > 0 && (
                                        <div className="text-right">
                                           <span className="block text-[10px] text-slate-400 uppercase font-bold tracking-wider">Conversion</span>
                                           <span className={`text-sm font-bold ${stage.conversionRate > 50 ? 'text-emerald-500' : 'text-amber-500'}`}>
                                              {stage.conversionRate}%
                                           </span>
                                        </div>
                                     )}
                                  </div>
                               </div>
                            </div>
                            
                            {/* Dropoff metric visual */}
                            {index !== selectedFunnel.stages.length - 1 && (
                               <div className="absolute left-[64px] top-[calc(100%+2px)] transform -translate-y-1/2 flex items-center">
                                  <div className="text-[10px] bg-slate-200 dark:bg-slate-700 text-slate-500 px-1.5 py-0.5 rounded-r">
                                     ▼ {100 - selectedFunnel.stages[index + 1].conversionRate}% Drop
                                  </div>
                               </div>
                            )}
                         </div>
                      ))}
                   </div>
               )}

               {activeTab === 'analysis' && (
                   <div className="h-full flex flex-col animate-in fade-in zoom-in-95">
                       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                           <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                               <div className="flex items-center gap-2 mb-2 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                                   <Users size={14} /> Total Volume
                               </div>
                               <div className="text-2xl font-bold text-slate-900 dark:text-white">{selectedFunnel.stages[0].dealCount}</div>
                           </div>
                           <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                               <div className="flex items-center gap-2 mb-2 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                                   <DollarSign size={14} /> Pipeline Value
                               </div>
                               <div className="text-2xl font-bold text-slate-900 dark:text-white">{formatCurrency(selectedFunnel.totalValue)}</div>
                           </div>
                           <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                               <div className="flex items-center gap-2 mb-2 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                                   <TrendingUp size={14} /> Win Rate
                               </div>
                               <div className="text-2xl font-bold text-emerald-500">{selectedFunnel.avgConversion}%</div>
                           </div>
                       </div>

                       <div className="flex-1 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm min-h-[400px]">
                           <h4 className="font-bold text-slate-800 dark:text-white mb-6 text-center">Funnel Conversion Analysis</h4>
                           <ResponsiveContainer width="100%" height="100%">
                               <FunnelChart>
                                   <Tooltip 
                                       contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                       itemStyle={{ color: '#1e293b' }}
                                   />
                                   <Funnel
                                       dataKey="dealCount"
                                       data={selectedFunnel.stages}
                                       isAnimationActive
                                   >
                                       <LabelList position="right" fill="#64748b" stroke="none" dataKey="name" />
                                       {selectedFunnel.stages.map((entry, index) => (
                                           <Cell key={`cell-${index}`} fill={entry.color} />
                                       ))}
                                   </Funnel>
                               </FunnelChart>
                           </ResponsiveContainer>
                       </div>
                   </div>
               )}

               {activeTab === 'config' && (
                   <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2">
                       <div className="p-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/80 flex justify-between items-center">
                           <h4 className="font-bold text-slate-800 dark:text-white">Edit Stages</h4>
                           <button onClick={addStage} className="text-xs flex items-center gap-1 font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                               <Plus size={12} /> Add Stage
                           </button>
                       </div>
                       <div className="divide-y divide-slate-100 dark:divide-slate-700">
                           {selectedFunnel.stages.map((stage, index) => (
                               <div key={stage.id} className="p-4 flex items-center gap-3 group hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                                   <div className="text-slate-400 cursor-grab hover:text-slate-600">
                                       <GripVertical size={16} />
                                   </div>
                                   <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-500">
                                       {index + 1}
                                   </div>
                                   <div className="flex-1">
                                       <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1 block">Stage Name</label>
                                       <input 
                                           type="text" 
                                           value={stage.name}
                                           onChange={(e) => updateStageName(index, e.target.value)}
                                           className="w-full bg-transparent border-b border-slate-200 dark:border-slate-700 focus:border-indigo-500 outline-none text-sm font-medium text-slate-800 dark:text-slate-200 py-1"
                                       />
                                   </div>
                                   <div className="w-24">
                                       <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1 block">Est. Conv</label>
                                       <div className="flex items-center gap-1">
                                           <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{stage.conversionRate}%</span>
                                       </div>
                                   </div>
                                   <button 
                                      onClick={() => removeStage(index)}
                                      className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                                      disabled={selectedFunnel.stages.length <= 2}
                                   >
                                       <Trash2 size={16} />
                                   </button>
                               </div>
                           ))}
                       </div>
                       <div className="p-4 bg-slate-50 dark:bg-slate-900/30 border-t border-slate-200 dark:border-slate-700 flex justify-end">
                           <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm">
                               <Save size={16} /> Save Changes
                           </button>
                       </div>
                   </div>
               )}

            </div>
         </div>
      </div>
    </div>
  );
};
