import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell, TooltipProps } from 'recharts';
import { PerformanceMetric } from '../types';

interface PerformanceChartProps {
  data: PerformanceMetric[];
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-xl border border-slate-100 dark:border-slate-700 ring-1 ring-black/5">
        <p className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-1">{label}</p>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Score: <span className="font-semibold text-slate-700 dark:text-slate-200">{payload[0].value}%</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Tasks: <span className="font-semibold text-slate-700 dark:text-slate-200">{payload[0].payload.tasksCompleted}</span>
            </p>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export const PerformanceChart: React.FC<PerformanceChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <XAxis 
            dataKey="month" 
            stroke="#94a3b8" 
            fontSize={11} 
            tickLine={false} 
            axisLine={false}
            dy={10} 
        />
        <Tooltip 
          content={<CustomTooltip />} 
          cursor={{ fill: 'currentColor', opacity: 0.05 }} 
        />
        <Bar dataKey="score" radius={[6, 6, 6, 6]} barSize={28}>
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              className={`transition-all duration-300 hover:opacity-80 ${index === data.length - 1 ? 'fill-indigo-500 dark:fill-indigo-500' : 'fill-slate-200 dark:fill-slate-700'}`}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};