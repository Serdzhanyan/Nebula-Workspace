import React, { useEffect, useState } from 'react';
import { ArrowLeft, RefreshCw, Tag, Calendar, Newspaper, ExternalLink, Search } from 'lucide-react';
import { generateCompanyNews } from '../services/geminiService';
import { NewsItem } from '../types';

interface AllNewsPageProps {
  onBack: () => void;
  onNewsClick: (item: NewsItem) => void;
}

export const AllNewsPage: React.FC<AllNewsPageProps> = ({ onBack, onNewsClick }) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const loadAllNews = async () => {
    setLoading(true);
    // Fetch a larger set of news for the full page view
    const data = await generateCompanyNews(9);
    setNews(data.map((item, idx) => ({
      id: idx.toString(),
      title: item.title,
      summary: item.summary,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      category: (item.category as 'Company' | 'Industry' | 'Event') || 'Company'
    })));
    setLoading(false);
  };

  useEffect(() => {
    loadAllNews();
  }, []);

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Company': return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800';
      case 'Industry': return 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800';
      case 'Event': return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800';
      default: return 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';
    }
  };

  const filteredNews = news.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors mb-2 text-sm font-medium"
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </button>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Company Newsroom</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Latest updates, announcements, and industry highlights.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search news..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 dark:focus-ring-indigo-900 focus:border-indigo-300 transition-all shadow-sm text-slate-900 dark:text-slate-200 placeholder-slate-400"
            />
          </div>
          <button 
            onClick={loadAllNews}
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm text-slate-700 dark:text-slate-200 px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-indigo-200 transition-all disabled:opacity-50 whitespace-nowrap"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            Refresh Feed
          </button>
        </div>
      </div>

      {/* Grid */}
      {loading && news.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-48 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm animate-pulse p-6">
              <div className="h-4 w-1/3 bg-slate-100 dark:bg-slate-700 rounded mb-4"></div>
              <div className="h-6 w-3/4 bg-slate-100 dark:bg-slate-700 rounded mb-2"></div>
              <div className="h-6 w-1/2 bg-slate-100 dark:bg-slate-700 rounded mb-4"></div>
              <div className="h-20 w-full bg-slate-50 dark:bg-slate-700/50 rounded"></div>
            </div>
          ))}
        </div>
      ) : filteredNews.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 border-dashed">
            <Search size={48} className="mb-4 text-slate-200 dark:text-slate-600" />
            <p className="text-lg font-medium text-slate-600 dark:text-slate-300">No news found</p>
            <p className="text-sm">Try adjusting your search terms.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((item) => (
            <div 
              key={item.id} 
              onClick={() => onNewsClick(item)}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:ring-2 hover:ring-indigo-50/50 dark:hover:ring-indigo-900/20 transition-all duration-300 flex flex-col group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md border ${getCategoryColor(item.category)}`}>
                  {item.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500 font-medium">
                  <Calendar size={12} /> {item.date}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-tight">
                {item.title}
              </h3>
              
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 flex-1 line-clamp-3">
                {item.summary}
              </p>
              
              <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                        <Newspaper size={12} className="text-slate-400 dark:text-slate-300"/>
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Internal Comms</span>
                </div>
                <div className="text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
                  <ExternalLink size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};