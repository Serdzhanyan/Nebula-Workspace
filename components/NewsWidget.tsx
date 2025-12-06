import React, { useState, useEffect } from 'react';
import { RefreshCw, ExternalLink } from 'lucide-react';
import { generateCompanyNews } from '../services/geminiService';
import { NewsItem } from '../types';

export const NewsWidget: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'All' | 'Company' | 'Industry' | 'Event'>('All');

  const fetchNews = async () => {
    setLoading(true);
    // Increased count to 5 to make filtering more effective in the widget view
    const data = await generateCompanyNews(5);
    setNews(data.map((item, idx) => ({
      id: idx.toString(),
      title: item.title,
      summary: item.summary,
      date: 'Today',
      category: (item.category as 'Company' | 'Industry' | 'Event') || 'Company'
    })));
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleRefresh = (e: React.MouseEvent) => {
    e.stopPropagation();
    fetchNews();
  };

  const filteredNews = activeFilter === 'All' 
    ? news 
    : news.filter(item => item.category === activeFilter);

  return (
    <div className="h-full flex flex-col">
      {/* Filter Tabs - prevent bubbling so card doesn't open */}
      <div className="flex gap-2 mb-3 pb-1" onClick={(e) => e.stopPropagation()}>
         {['All', 'Company', 'Industry', 'Event'].map((filter) => (
           <button
             key={filter}
             onClick={() => setActiveFilter(filter as any)}
             className={`text-[10px] px-2.5 py-1 rounded-full border transition-all ${
               activeFilter === filter
                 ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                 : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-600 hover:border-indigo-300 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400'
             }`}
           >
             {filter}
           </button>
         ))}
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto scrollbar-hide pr-2">
        {loading && news.length === 0 ? (
           <div className="flex flex-col items-center justify-center h-32 space-y-2">
              <RefreshCw className="animate-spin text-indigo-400" size={20} />
              <p className="text-[10px] text-slate-400">Curating headlines...</p>
           </div>
        ) : filteredNews.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 text-slate-400">
                <p className="text-xs">No updates in {activeFilter}</p>
            </div>
        ) : (
          filteredNews.map((item, i) => (
            <div key={i} className="group">
              <div className="flex justify-between items-start mb-1">
                <div className="flex flex-col gap-0.5">
                    {/* Show category badge only when viewing All to save space otherwise */}
                    {activeFilter === 'All' && (
                        <span className={`text-[9px] px-1.5 py-0.5 rounded w-fit font-medium ${
                            item.category === 'Company' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300' :
                            item.category === 'Event' ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-300' :
                            'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300'
                        }`}>
                            {item.category}
                        </span>
                    )}
                    <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">{item.title}</h4>
                </div>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 whitespace-nowrap ml-2 bg-slate-50 dark:bg-slate-700/50 px-1.5 py-0.5 rounded">{item.date}</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">{item.summary}</p>
            </div>
          ))
        )}
      </div>
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between gap-2">
        <button 
          onClick={handleRefresh}
          disabled={loading}
          className="flex items-center justify-center gap-2 flex-1 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors disabled:opacity-50"
        >
          <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
        <div className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-1 font-medium px-2">
            View All <ExternalLink size={10} />
        </div>
      </div>
    </div>
  );
};