
import React from 'react';
import { Activity, Clock, ArrowRightLeft } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export const SMEAnalyticsActivity: React.FC = () => {
  const activityData = [
    { time: '08:00', transactions: 120 },
    { time: '10:00', transactions: 350 },
    { time: '12:00', transactions: 480 },
    { time: '14:00', transactions: 420 },
    { time: '16:00', transactions: 550 },
    { time: '18:00', transactions: 200 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
                    <ArrowRightLeft size={18} className="text-blue-500" /> Transaction Vol
                </h3>
                <p className="text-2xl font-bold">12,450</p>
                <p className="text-xs text-slate-500">Last 24 hours</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
                    <Clock size={18} className="text-indigo-500" /> Peak Hour
                </h3>
                <p className="text-2xl font-bold">16:00 - 17:00</p>
                <p className="text-xs text-slate-500">UTC Time</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
                    <Activity size={18} className="text-emerald-500" /> Active Users
                </h3>
                <p className="text-2xl font-bold">842</p>
                <p className="text-xs text-slate-500">Currently logged in</p>
            </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm h-[400px]">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6">Activity Timeline</h3>
            <div className="flex-1 w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={activityData}>
                        <defs>
                            <linearGradient id="colorTx" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                        <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                        <Tooltip />
                        <Area type="monotone" dataKey="transactions" stroke="#3b82f6" fillOpacity={1} fill="url(#colorTx)" strokeWidth={3} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    </div>
  );
};
