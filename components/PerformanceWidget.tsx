import React, { useEffect, useState } from 'react';
import { TrendingUp, Loader2, CheckSquare, Users, Star, Archive } from 'lucide-react';
import { PerformanceMetric } from '../types';
import { analyzePerformance } from '../services/geminiService';
import { PerformanceChart } from './PerformanceChart';

export const performanceData: PerformanceMetric[] = [
  { month: 'Jul', score: 65, tasksCompleted: 12 },
  { month: 'Aug', score: 78, tasksCompleted: 18 },
  { month: 'Sep', score: 82, tasksCompleted: 24 },
  { month: 'Oct', score: 90, tasksCompleted: 28 },
];

interface PerformanceWidgetProps {
  onNavigate?: (section: string) => void;
}

export const PerformanceWidget: React.FC<PerformanceWidgetProps> = ({ onNavigate }) => {
  const [insight, setInsight] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleAnalyze();
  }, []);

  const handleAnalyze = async () => {
    setLoading(true);
    const result = await analyzePerformance(performanceData);
    setInsight(result);
    setLoading(false);
  };

  const actionButtons = [
    { id: 'tasks', label: 'My Tasks', icon: CheckSquare, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
    { id: 'team', label: 'My Team', icon: Users, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { id: 'review', label: 'Review', icon: Star, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/20' },
    { id: 'archive', label: 'Archive', icon: Archive, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/20' },
  ];

  return (
    <div className="h-full flex flex-col gap-4">
      {/* Top Section: Chart & Insight */}
      <div className="flex-1 flex flex-col relative min-h-[160px]">
        {/* Chart */}
        <div className="flex-1 -ml-4">
          <PerformanceChart data={performanceData} />
        </div>

        {/* Floating Trend Badge */}
        <div className="absolute top-0 right-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 backdrop-blur-sm">
           <TrendingUp size={12} className="text-emerald-600 dark:text-emerald-400" />
           <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300">+12% vs last mo</span>
        </div>
      </div>

      {/* AI Insight Compact */}
      <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
         <div className="mt-0.5">
             {loading ? <Loader2 size={14} className="animate-spin text-indigo-500"/> : <TrendingUp size={14} className="text-indigo-500"/>}
         </div>
         <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug">
            {loading ? "Analyzing performance data..." : insight}
         </p>
      </div>

      {/* Action Grid */}
      <div className="grid grid-cols-2 gap-2.5 mt-auto">
        {actionButtons.map((btn) => (
            <button 
                key={btn.id} 
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate?.(btn.id);
                }}
                className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-800 bg-white dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all group shadow-sm hover:shadow"
            >
                <div className="flex items-center gap-2.5">
                    <div className={`p-1.5 rounded-lg ${btn.bg} ${btn.color} group-hover:scale-110 transition-transform`}>
                        <btn.icon size={14} />
                    </div>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">{btn.label}</span>
                </div>
            </button>
        ))}
      </div>
    </div>
  );
};