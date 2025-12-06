import React from 'react';
import { ArrowLeft, Calendar, CheckCircle2, TrendingUp, Target, BarChart2, Download } from 'lucide-react';

export interface ReviewData {
  id: string;
  period: string;
  rating: string;
  date: string;
  reviewer: string;
  summary: string;
  metrics: { category: string; score: number; max: number }[];
  strengths: string[];
  improvements: string[];
  goals: { title: string; status: 'Pending' | 'In Progress' | 'Completed' }[];
}

interface ReviewDetailPageProps {
  review: ReviewData;
  onBack: () => void;
}

export const ReviewDetailPage: React.FC<ReviewDetailPageProps> = ({ review, onBack }) => {
  const getRatingColor = (rating: string) => {
    if (rating.includes('Exceeds')) return 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-900';
    if (rating.includes('Meets')) return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-900';
    return 'text-amber-600 bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-900';
  };

  return (
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors text-sm font-medium"
        >
          <ArrowLeft size={16} /> Back to Reviews
        </button>
        <button className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
           <Download size={14} /> Download PDF
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-6">
        {/* Title Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{review.period} Performance Review</h2>
              <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1"><Calendar size={14}/> {review.date}</span>
                <span>Reviewer: {review.reviewer}</span>
              </div>
            </div>
            <div className={`px-4 py-2 rounded-xl border font-bold text-sm ${getRatingColor(review.rating)}`}>
              {review.rating}
            </div>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-700/30 rounded-xl border border-slate-100 dark:border-slate-700/50">
            <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Executive Summary</h4>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
              {review.summary}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {/* Metrics */}
           <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
              <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                 <BarChart2 size={18} className="text-indigo-500" /> Key Metrics
              </h3>
              <div className="space-y-4">
                 {review.metrics.map((m, i) => (
                    <div key={i}>
                       <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-600 dark:text-slate-300">{m.category}</span>
                          <span className="font-semibold text-slate-900 dark:text-white">{m.score}/{m.max}</span>
                       </div>
                       <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-indigo-500 rounded-full" 
                            style={{ width: `${(m.score / m.max) * 100}%` }}
                          />
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           {/* Feedback */}
           <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col gap-6">
              <div>
                 <h3 className="font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                    <TrendingUp size={18} className="text-emerald-500" /> Strengths
                 </h3>
                 <ul className="space-y-2">
                    {review.strengths.map((s, i) => (
                       <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                          <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                          {s}
                       </li>
                    ))}
                 </ul>
              </div>
              <div>
                 <h3 className="font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                    <Target size={18} className="text-amber-500" /> Areas for Improvement
                 </h3>
                 <ul className="space-y-2">
                    {review.improvements.map((s, i) => (
                       <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 ml-1 shrink-0" />
                          {s}
                       </li>
                    ))}
                 </ul>
              </div>
           </div>
        </div>

        {/* Goals */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
           <h3 className="font-bold text-slate-800 dark:text-white mb-4">Goals for Next Period</h3>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {review.goals.map((g, i) => (
                 <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/30 border border-slate-100 dark:border-slate-700/50 flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{g.title}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                        g.status === 'Completed' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' :
                        g.status === 'In Progress' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                        'bg-slate-200 text-slate-600 dark:bg-slate-600 dark:text-slate-300'
                    }`}>
                       {g.status}
                    </span>
                 </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};