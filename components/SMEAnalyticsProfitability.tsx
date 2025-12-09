
import React from 'react';
import { PieChart, TrendingUp, Users } from 'lucide-react';
import { ResponsiveContainer, PieChart as RePieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

export const SMEAnalyticsProfitability: React.FC = () => {
  const segmentData = [
    { name: 'Enterprise', value: 45, color: '#6366f1' },
    { name: 'Mid-Market', value: 30, color: '#8b5cf6' },
    { name: 'Small Biz', value: 25, color: '#ec4899' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm h-[400px]">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                    <PieChart size={20} className="text-purple-500" /> Revenue by Segment
                </h3>
                <div className="flex-1 w-full h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <RePieChart>
                            <Pie
                                data={segmentData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {segmentData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend verticalAlign="bottom" height={36} />
                        </RePieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6">Top Profitable Clients</h3>
                <div className="space-y-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 font-bold">#{i}</div>
                                <div>
                                    <p className="font-bold text-slate-900 dark:text-white">Client Corp {i}</p>
                                    <p className="text-xs text-slate-500">Tech Sector</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-slate-900 dark:text-white">$120,000</p>
                                <p className="text-xs text-emerald-500">Margin: 22%</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};
