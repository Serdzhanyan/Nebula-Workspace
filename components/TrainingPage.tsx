
import React, { useState } from 'react';
import { ArrowLeft, BookOpen, CheckCircle, Clock, PlayCircle, Award, Search, MoreHorizontal, Filter, Target, Zap, Calendar } from 'lucide-react';
import { TrainingModule } from '../types';

interface TrainingPageProps {
  onBack: () => void;
  onCatalogClick: () => void;
  onCourseClick?: (course: TrainingModule) => void;
}

export const TrainingPage: React.FC<TrainingPageProps> = ({ onBack, onCatalogClick, onCourseClick }) => {
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const modules: TrainingModule[] = [
    { id: '2', title: 'Advanced React Patterns', progress: 45, dueDate: 'Nov 01', lastAccessed: '2 hours ago', instructor: 'Dan Abramov', duration: '4h 30m', category: 'Engineering' },
    { id: '3', title: 'Leadership 101', progress: 10, dueDate: 'Nov 15', lastAccessed: 'Yesterday', instructor: 'Simon Sinek', duration: '2h 15m', category: 'Management' },
    { id: '5', title: 'Agile Methodologies', progress: 75, dueDate: 'Nov 10', lastAccessed: '2 days ago', instructor: 'Jeff Sutherland', duration: '6h 00m', category: 'Product' },
    { id: '6', title: 'Data Security Fund.', progress: 30, dueDate: 'Nov 20', lastAccessed: '3 days ago', instructor: 'Alice Bob', duration: '1h 45m', category: 'Security' },
    { id: '1', title: 'Cybersecurity Basics', progress: 100, dueDate: 'Completed', lastAccessed: 'Oct 20', instructor: 'Alice Bob', duration: '1h 00m', category: 'Security' },
    { id: '4', title: 'Onboarding 101', progress: 100, dueDate: 'Completed', lastAccessed: 'Sep 05', instructor: 'HR Team', duration: '3h 00m', category: 'HR' },
  ];

  const categories = ["All", ...Array.from(new Set(modules.map(m => m.category || 'General'))).sort()];

  const displayedModules = modules.filter(m => {
    const matchesTab = activeTab === 'active' ? m.progress < 100 : m.progress === 100;
    const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          m.instructor?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "All" || m.category === categoryFilter;
    return matchesTab && matchesSearch && matchesCategory;
  });

  const activeCount = modules.filter(m => m.progress < 100).length;
  const completedCount = modules.filter(m => m.progress === 100).length;

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors mb-2 text-sm font-medium"
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </button>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">My Learning</h2>
        </div>
        <button 
          onClick={onCatalogClick}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200 dark:shadow-none whitespace-nowrap"
        >
          <BookOpen size={16} /> Browse Catalog
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar / Stats */}
        <div className="lg:col-span-1 space-y-6">
           {/* Weekly Goal Widget */}
           <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all"></div>
              
              <div className="flex items-center gap-2 mb-4 relative z-10">
                  <Target size={20} className="text-indigo-200" />
                  <h3 className="font-bold">Weekly Goal</h3>
              </div>
              
              <div className="flex items-end gap-2 mb-2 relative z-10">
                  <span className="text-4xl font-bold">3.5</span>
                  <span className="text-indigo-200 mb-1.5 font-medium">/ 5 hrs</span>
              </div>
              
              <div className="w-full bg-black/20 rounded-full h-2.5 mb-4 relative z-10">
                  <div className="bg-white/90 h-full rounded-full w-[70%] shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
              </div>
              
              <p className="text-xs text-indigo-100 opacity-90 leading-relaxed relative z-10">
                  You're on track! Keep learning to maintain your <span className="font-bold text-white">4-week streak</span>.
              </p>
           </div>

           <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
              <h3 className="font-bold text-slate-800 dark:text-white mb-5 flex items-center gap-2">
                 <Zap size={18} className="text-amber-500 fill-amber-500" /> Quick Stats
              </h3>
              <div className="space-y-4">
                 <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-700/30">
                    <div className="flex items-center gap-3">
                       <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                          <BookOpen size={18} />
                       </div>
                       <div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Active</p>
                          <p className="text-sm font-bold text-slate-800 dark:text-white">{activeCount} Courses</p>
                       </div>
                    </div>
                 </div>
                 
                 <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-700/30">
                    <div className="flex items-center gap-3">
                       <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                          <Award size={18} />
                       </div>
                       <div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Completed</p>
                          <p className="text-sm font-bold text-slate-800 dark:text-white">{completedCount} Certs</p>
                       </div>
                    </div>
                 </div>

                 <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-700/30">
                    <div className="flex items-center gap-3">
                       <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                          <Clock size={18} />
                       </div>
                       <div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Total Time</p>
                          <p className="text-sm font-bold text-slate-800 dark:text-white">12.5 Hrs</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 flex flex-col h-full">
           <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex-1 flex flex-col overflow-hidden">
              
              {/* Controls Header */}
              <div className="border-b border-slate-200 dark:border-slate-700 p-5 space-y-4">
                  {/* Tabs */}
                  <div className="flex gap-6 border-b border-slate-100 dark:border-slate-700/50 pb-px">
                      <button 
                        onClick={() => setActiveTab('active')}
                        className={`pb-3 text-sm font-bold transition-all relative ${activeTab === 'active' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                      >
                        In Progress
                        {activeTab === 'active' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-full"></span>}
                      </button>
                      <button 
                        onClick={() => setActiveTab('completed')}
                        className={`pb-3 text-sm font-bold transition-all relative ${activeTab === 'completed' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                      >
                        Completed
                        {activeTab === 'completed' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-full"></span>}
                      </button>
                  </div>

                  {/* Search and Filter */}
                  <div className="flex flex-col sm:flex-row gap-4">
                      <div className="relative flex-1">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                          <input 
                              type="text" 
                              placeholder="Search courses or instructors..." 
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/50 focus:border-indigo-300 transition-all text-slate-800 dark:text-slate-200 placeholder-slate-400"
                          />
                      </div>
                      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 sm:pb-0">
                          {categories.map(cat => (
                             <button
                                key={cat}
                                onClick={() => setCategoryFilter(cat)}
                                className={`px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all border ${
                                   categoryFilter === cat 
                                   ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200 dark:shadow-none' 
                                   : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400'
                                }`}
                             >
                                {cat}
                             </button>
                          ))}
                      </div>
                  </div>
              </div>

              {/* List */}
              <div className="p-5 space-y-4 flex-1 overflow-y-auto">
                 {displayedModules.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-slate-400">
                        <div className="w-16 h-16 bg-slate-50 dark:bg-slate-700/50 rounded-full flex items-center justify-center mb-4">
                            <Search size={32} className="opacity-50" />
                        </div>
                        <p className="text-sm font-medium">No courses found matching your criteria.</p>
                        <button 
                            onClick={() => {setSearchQuery(""); setCategoryFilter("All");}}
                            className="mt-2 text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:underline"
                        >
                            Clear filters
                        </button>
                    </div>
                 ) : (
                    displayedModules.map(mod => (
                        <div 
                            key={mod.id} 
                            onClick={() => onCourseClick?.(mod)}
                            className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50 bg-white dark:bg-slate-800 hover:border-indigo-200 dark:hover:border-indigo-800 hover:shadow-md transition-all cursor-pointer"
                        >
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-xl shrink-0 border border-indigo-100 dark:border-indigo-900/30 group-hover:scale-105 transition-transform">
                            {mod.title.charAt(0)}
                        </div>
                        
                        <div className="flex-1 min-w-0 w-full">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                                <h4 className="font-bold text-slate-800 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                    {mod.title}
                                </h4>
                                {mod.progress < 100 && (
                                    <span className="text-[10px] text-slate-400 bg-slate-50 dark:bg-slate-700/50 px-2 py-0.5 rounded-full w-fit">
                                        Last accessed {mod.lastAccessed}
                                    </span>
                                )}
                            </div>
                            
                            <div className="flex items-center flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500 dark:text-slate-400 mb-3">
                                <span className="flex items-center gap-1"><PlayCircle size={10} /> {mod.instructor}</span>
                                <span className="flex items-center gap-1"><Clock size={10} /> {mod.duration}</span>
                                <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium border ${
                                    mod.category === 'Engineering' ? 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-900/30' :
                                    mod.category === 'Management' ? 'bg-purple-50 text-purple-600 border-purple-100 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-900/30' :
                                    mod.category === 'Security' ? 'bg-red-50 text-red-600 border-red-100 dark:bg-red-900/20 dark:text-red-300 dark:border-red-900/30' :
                                    'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-700/50 dark:text-slate-300 dark:border-slate-600'
                                }`}>
                                    {mod.category}
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                    <div className={`h-full rounded-full transition-all duration-1000 ${mod.progress === 100 ? 'bg-emerald-500' : 'bg-indigo-500'}`} style={{ width: `${mod.progress}%` }}></div>
                                </div>
                                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 w-8 text-right">{mod.progress}%</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 w-full sm:w-auto mt-2 sm:mt-0">
                            {mod.progress === 100 ? (
                                <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-lg text-xs font-bold uppercase tracking-wide border border-emerald-100 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors">
                                    <Award size={14} /> Certificate
                                </button>
                            ) : (
                                <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-lg text-xs font-bold uppercase tracking-wide border border-indigo-100 dark:border-indigo-800 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all">
                                    <PlayCircle size={14} /> Continue
                                </button>
                            )}
                        </div>
                        </div>
                    ))
                 )}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
