
import React from 'react';
import { DollarSign, Users, AlertTriangle, Activity, TrendingUp } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const SMEAnalyticsOverview: React.FC = () => {
  const revenueData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 4500 },
    { name: 'May', value: 6000 },
    { name: 'Jun', value: 5500 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-lg"><DollarSign size={20} /></div>
                    <span className="text-xs font-bold uppercase text-slate-500">Total Revenue</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">$4.2M</p>
                <p className="text-xs text-emerald-500 font-medium mt-1 flex items-center gap-1"><TrendingUp size={12} /> +12%</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg"><Users size={20} /></div>
                    <span className="text-xs font-bold uppercase text-slate-500">Active Clients</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">1,240</p>
                <p className="text-xs text-emerald-500 font-medium mt-1 flex items-center gap-1"><TrendingUp size={12} /> +5%</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-lg"><AlertTriangle size={20} /></div>
                    <span className="text-xs font-bold uppercase text-slate-500">Risk Alerts</span>
                </div>
                <p className="text-xl font-bold text-slate-900 dark:text-white">24</p>
                <div className="flex items-center gap-1 mt-1 text-xs font-bold text-amber-500">
                    <Activity size={12} /> Medium
                </div>
            </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 flex flex-col h-[350px]">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6">Revenue Trend (6 Months)</h3>
            <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                        <Tooltip 
                            contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                            itemStyle={{ color: '#1e293b' }}
                            cursor={{ fill: 'transparent' }}
                        />
                        <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    </div>
  );
};
