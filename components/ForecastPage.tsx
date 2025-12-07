
import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  Target, 
  AlertTriangle, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight, 
  Filter, 
  Download,
  DollarSign
} from 'lucide-react';
import { 
  ComposedChart, 
  Line, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  Area
} from 'recharts';

export const ForecastPage: React.FC = () => {
  const [period, setPeriod] = useState('Q4 2024');

  // Dynamic Data based on Period
  const datasets: Record<string, any[]> = {
    'Q3 2024': [
        { name: 'Jul', actual: 4200, forecast: 0, quota: 4000 },
        { name: 'Aug', actual: 3800, forecast: 0, quota: 4000 },
        { name: 'Sep', actual: 4500, forecast: 0, quota: 4000 },
    ],
    'Q4 2024': [
        { name: 'Oct', actual: 2100, forecast: 2800, quota: 4500 }, // Partial month actuals
        { name: 'Nov', actual: 0, forecast: 5200, quota: 4500 },
        { name: 'Dec', actual: 0, forecast: 6100, quota: 5000 },
    ],
    'FY 2025': [
        { name: 'Q1', actual: 0, forecast: 15000, quota: 14000 },
        { name: 'Q2', actual: 0, forecast: 18000, quota: 16000 },
        { name: 'Q3', actual: 0, forecast: 14000, quota: 14000 },
        { name: 'Q4', actual: 0, forecast: 22000, quota: 20000 },
    ]
  };

  const currentData = datasets[period] || datasets['Q4 2024'];

  // Calculate Metrics dynamically
  const metrics = useMemo(() => {
      const totalQuota = currentData.reduce((acc, item) => acc + item.quota, 0);
      const totalActual = currentData.reduce((acc, item) => acc + item.actual, 0);
      const totalForecast = currentData.reduce((acc, item) => acc + item.forecast, 0);
      const totalProjected = totalActual + totalForecast;
      const gap = totalProjected - totalQuota;
      const attainment = (totalProjected / totalQuota) * 100;

      return { totalProjected, totalQuota, gap, attainment };
  }, [currentData]);

  const dealsToWatch = [
    { id: 1, client: 'Stark Industries', value: '$1.2M', stage: 'Proposal', prob: 45, closeDate: 'Nov 15' },
    { id: 2, client: 'Wayne Enterprises', value: '$850k', stage: 'Qualified', prob: 30, closeDate: 'Dec 10' },
    { id: 3, client: 'Umbrella Corp', value: '$550k', stage: 'Negotiation', prob: 75, closeDate: 'Oct 30' },
  ];

  const handleExport = () => {
    // Mock PDF download behavior
    const element = document.createElement("a");
    // In a real app, this would be a Blob from a PDF generation library like jspdf
    const fileContent = `Sales Forecast Report - ${period}\n\nTotal Forecast: $${metrics.totalProjected}\nQuota: $${metrics.totalQuota}\nAttainment: ${metrics.attainment.toFixed(1)}%`;
    const file = new Blob([fileContent], {type: 'application/pdf'});
    element.href = URL.createObjectURL(file);
    element.download = `Sales_Forecast_${period.replace(' ', '_')}.pdf`;
    document.body.appendChild(element); 
    element.click();
    document.body.removeChild(element);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700">
          <p className="text-sm font-bold text-slate-800 dark:text-white mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-xs mb-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
              <span className="text-slate-500 dark:text-slate-400 capitalize">{entry.name}:</span>
              <span className="font-semibold text-slate-700 dark:text-slate-200">
                ${entry.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-start md:items-center">
        <div>
           <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="text-indigo-500" /> Sales Forecast
           </h2>
           <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Projected revenue based on pipeline probability and historical trends.
           </p>
        </div>
        
        <div className="flex gap-2">
            <div className="relative">
                <select 
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    className="appearance-none pl-4 pr-10 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-sm"
                >
                    <option value="Q3 2024">Q3 2024</option>
                    <option value="Q4 2024">Q4 2024</option>
                    <option value="FY 2025">FY 2025</option>
                </select>
                <Calendar size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
            <button 
                onClick={handleExport}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors shadow-sm active:scale-95"
            >
                <Download size={16} /> Export PDF
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full min-h-0">
         {/* Main Chart Area */}
         <div className="lg:col-span-2 flex flex-col gap-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Forecast Amount</span>
                        <div className="p-1.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg">
                            <ArrowUpRight size={16} />
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">${metrics.totalProjected.toLocaleString()}</h3>
                    <p className="text-xs text-slate-500 mt-1">Weighted Pipeline</p>
                </div>

                <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Quota Target</span>
                        <div className="p-1.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg">
                            <Target size={16} />
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">${metrics.totalQuota.toLocaleString()}</h3>
                    <p className="text-xs text-slate-500 mt-1">{metrics.attainment.toFixed(0)}% Attainment</p>
                </div>

                <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gap to Quota</span>
                        <div className={`p-1.5 rounded-lg ${metrics.gap >= 0 ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-600'}`}>
                            {metrics.gap >= 0 ? <TrendingUp size={16} /> : <AlertTriangle size={16} />}
                        </div>
                    </div>
                    <h3 className={`text-2xl font-bold ${metrics.gap >= 0 ? 'text-emerald-500' : 'text-amber-500'}`}>
                        {metrics.gap >= 0 ? '+' : ''}${metrics.gap.toLocaleString()}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">{metrics.gap >= 0 ? 'Projected Surplus' : 'Shortfall'}</p>
                </div>
            </div>

            {/* Chart */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex-1 min-h-[300px] flex flex-col">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-slate-900 dark:text-white">Revenue Projection</h3>
                    <div className="flex items-center gap-2 text-xs">
                        <span className="flex items-center gap-1 text-slate-500"><div className="w-2 h-2 rounded-full bg-indigo-500"></div> Actual</span>
                        <span className="flex items-center gap-1 text-slate-500"><div className="w-2 h-2 rounded-full bg-indigo-300"></div> Forecast</span>
                        <span className="flex items-center gap-1 text-slate-500"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Quota</span>
                    </div>
                </div>
                
                <div className="flex-1 w-full min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={currentData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                            <XAxis 
                                dataKey="name" 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fill: '#94a3b8', fontSize: 12 }} 
                                dy={10}
                            />
                            <YAxis 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fill: '#94a3b8', fontSize: 12 }} 
                                tickFormatter={(value) => `$${value}`}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                            <Bar dataKey="actual" barSize={32} fill="#6366f1" radius={[4, 4, 0, 0]} stackId="a" />
                            <Bar dataKey="forecast" barSize={32} fill="#a5b4fc" radius={[4, 4, 0, 0]} stackId="a" />
                            <Line type="monotone" dataKey="quota" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981', strokeWidth: 0 }} activeDot={{ r: 6 }} />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </div>
         </div>

         {/* Sidebar: Details & Risks */}
         <div className="flex flex-col gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
                <h3 className="font-bold text-slate-900 dark:text-white mb-4">Forecast Category ({period})</h3>
                <div className="space-y-4">
                    <div className="p-3 bg-slate-50 dark:bg-slate-700/30 rounded-xl border border-slate-100 dark:border-slate-700/50">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Commit</span>
                            <span className="font-bold text-slate-900 dark:text-white">${(metrics.totalProjected * 0.6).toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-600 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-emerald-500 h-full rounded-full w-[60%]"></div>
                        </div>
                        <p className="text-xs text-slate-400 mt-1.5">High confidence deals</p>
                    </div>

                    <div className="p-3 bg-slate-50 dark:bg-slate-700/30 rounded-xl border border-slate-100 dark:border-slate-700/50">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Best Case</span>
                            <span className="font-bold text-slate-900 dark:text-white">${(metrics.totalProjected * 1.2).toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-600 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-blue-500 h-full rounded-full w-[100%]"></div>
                        </div>
                        <p className="text-xs text-slate-400 mt-1.5">Total pipeline upside</p>
                    </div>

                    <div className="p-3 bg-slate-50 dark:bg-slate-700/30 rounded-xl border border-slate-100 dark:border-slate-700/50">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Pipeline Coverage</span>
                            <span className="font-bold text-slate-900 dark:text-white">3.2x</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">Ratio of pipeline to quota (Goal: 3.0x)</p>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 flex-1">
                <h3 className="font-bold text-slate-900 dark:text-white mb-4">Deals to Watch</h3>
                <div className="space-y-3">
                    {dealsToWatch.map((deal) => (
                        <div key={deal.id} className="p-3 rounded-xl border border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors cursor-pointer group">
                            <div className="flex justify-between items-start mb-1">
                                <span className="font-semibold text-sm text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                    {deal.client}
                                </span>
                                <span className="text-sm font-bold text-slate-900 dark:text-white">{deal.value}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
                                <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                                    {deal.stage}
                                </span>
                                <span>•</span>
                                <span>Closes {deal.closeDate}</span>
                            </div>
                            <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                                <div 
                                    className={`h-full rounded-full ${deal.prob > 60 ? 'bg-emerald-500' : deal.prob > 40 ? 'bg-blue-500' : 'bg-amber-500'}`} 
                                    style={{ width: `${deal.prob}%` }}
                                ></div>
                            </div>
                            <p className="text-[10px] text-right text-slate-400 mt-1">{deal.prob}% Probability</p>
                        </div>
                    ))}
                </div>
                <button className="w-full mt-4 py-2 text-xs font-medium text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors">
                    View All Opportunities
                </button>
            </div>
         </div>
      </div>
    </div>
  );
};
