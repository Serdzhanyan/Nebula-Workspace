
import React from 'react';
import { Share2, Download, Building2, User } from 'lucide-react';
import { SMECompany } from '../types';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

interface Props {
  company: SMECompany;
}

export const SMEClientOwnership: React.FC<Props> = ({ company }) => {
  const data = company.shareholders.map((s) => ({
    name: s.name,
    value: s.share,
    type: s.type
  }));

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           {/* Chart Section */}
           <div className="lg:col-span-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col items-center justify-center">
               <h3 className="font-bold text-slate-900 dark:text-white mb-4 w-full text-left flex items-center gap-2">
                   <Share2 size={18} className="text-indigo-500" /> Equity Distribution
               </h3>
               <div className="w-full h-64 relative">
                   <ResponsiveContainer width="100%" height="100%">
                       <PieChart>
                           <Pie
                               data={data}
                               cx="50%"
                               cy="50%"
                               innerRadius={60}
                               outerRadius={80}
                               paddingAngle={5}
                               dataKey="value"
                           >
                               {data.map((entry, index) => (
                                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={0} />
                                ))}
                           </Pie>
                           <Tooltip 
                               contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                               itemStyle={{ color: '#1e293b' }}
                           />
                       </PieChart>
                   </ResponsiveContainer>
                   <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                       <span className="text-3xl font-bold text-slate-900 dark:text-white">100%</span>
                       <span className="text-xs text-slate-500 uppercase tracking-wide">Allocated</span>
                   </div>
               </div>
           </div>

           {/* List Section */}
           <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">Shareholders</h3>
                    <button className="flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 px-3 py-1.5 rounded-lg transition-colors">
                        <Download size={16} /> Export Register
                    </button>
                </div>
                
                {company.shareholders && company.shareholders.length > 0 ? (
                    <div className="space-y-3">
                        {company.shareholders.map((holder, idx) => (
                            <div key={idx} className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${holder.type === 'Entity' ? 'bg-indigo-500' : 'bg-emerald-500'}`}>
                                        {holder.type === 'Entity' ? <Building2 size={18} /> : <User size={18} />}
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900 dark:text-white text-sm">{holder.name}</p>
                                        <p className="text-xs text-slate-500">{holder.role || 'Shareholder'} • {holder.type}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="text-right">
                                        <p className="font-bold text-slate-900 dark:text-white">{holder.share}%</p>
                                        <p className="text-[10px] text-slate-400 uppercase tracking-wide">Equity</p>
                                    </div>
                                    <div 
                                        className="w-2 h-10 rounded-full" 
                                        style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 text-slate-500 dark:text-slate-400">No shareholders found.</div>
                )}
           </div>
       </div>
    </div>
  );
};
