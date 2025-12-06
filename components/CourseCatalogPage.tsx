
import React, { useState, useMemo } from 'react';
import { ArrowLeft, Search, Star, Clock, User, Plus, Filter } from 'lucide-react';
import { TrainingModule } from '../types';

interface CourseCatalogPageProps {
  onBack: () => void;
  onPreviewCourse: (course: TrainingModule) => void;
  onEnrollClick: (course: TrainingModule) => void;
}

export const CourseCatalogPage: React.FC<CourseCatalogPageProps> = ({ onBack, onPreviewCourse, onEnrollClick }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Engineering", "Design", "Product", "Management", "Security", "Marketing", "Data Science"];

  // Generate 30 mock courses
  const courses: TrainingModule[] = useMemo(() => {
    const topics = [
        { title: 'Machine Learning', cat: 'Engineering' }, { title: 'React Advanced', cat: 'Engineering' }, { title: 'Product Strategy', cat: 'Product' },
        { title: 'UX Research', cat: 'Design' }, { title: 'Agile Leadership', cat: 'Management' }, { title: 'Cyber Defense', cat: 'Security' },
        { title: 'SEO Mastery', cat: 'Marketing' }, { title: 'Python for Data', cat: 'Data Science' }, { title: 'Cloud Architecture', cat: 'Engineering' },
        { title: 'Design Systems', cat: 'Design' }, { title: 'Conflict Resolution', cat: 'Management' }, { title: 'Network Security', cat: 'Security' },
        { title: 'Content Marketing', cat: 'Marketing' }, { title: 'Deep Learning', cat: 'Data Science' }, { title: 'DevOps Pipelines', cat: 'Engineering' },
        { title: 'Figma Mastery', cat: 'Design' }, { title: 'Roadmap Planning', cat: 'Product' }, { title: 'Public Speaking', cat: 'Management' },
        { title: 'Ethical Hacking', cat: 'Security' }, { title: 'Social Media Strategy', cat: 'Marketing' }, { title: 'SQL Fundamentals', cat: 'Data Science' },
        { title: 'Go Programming', cat: 'Engineering' }, { title: 'User Testing', cat: 'Design' }, { title: 'OKR Goal Setting', cat: 'Product' },
        { title: 'Team Building', cat: 'Management' }, { title: 'Zero Trust Security', cat: 'Security' }, { title: 'Brand Storytelling', cat: 'Marketing' },
        { title: 'Tableau Viz', cat: 'Data Science' }, { title: 'Kubernetes 101', cat: 'Engineering' }, { title: 'Accessibility (A11y)', cat: 'Design' }
    ];

    return topics.map((t, i) => ({
        id: `c-${i}`,
        title: `${t.title} ${['Fundamentals', 'Masterclass', 'Bootcamp', 'Essentials'][i % 4]}`,
        progress: 0,
        dueDate: '',
        instructor: ['Dr. A. Ng', 'M. Perri', 'B. Frost', 'S. Sinek', 'J. Doe', 'D. Abramov', 'K. Simpson', 'A. Lovelace'][i % 8],
        duration: `${2 + (i % 10)}h ${(i * 15) % 60}m`,
        category: t.cat,
        thumbnail: `https://picsum.photos/seed/${i + 100}/400/220`,
        rating: 4 + (i % 10) / 10,
        reviewsCount: 50 + (i * 13),
        level: i % 3 === 0 ? 'Beginner' : i % 3 === 1 ? 'Intermediate' : 'Advanced',
        description: `Master ${t.title} with this comprehensive course designed for ${i % 3 === 0 ? 'beginners' : 'professionals'}. Learn industry-standard techniques and apply them in real-world scenarios.`
    }));
  }, []);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
       <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors mb-2 text-sm font-medium"
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </button>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Course Catalog</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Explore {courses.length} courses to advance your career.</p>
        </div>
        
        <div className="flex items-center bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-2 w-full md:w-80 shadow-sm focus-within:ring-2 focus-within:ring-indigo-100 dark:focus-within:ring-indigo-900 transition-all">
           <Search size={18} className="text-slate-400 mr-2" />
           <input 
              type="text" 
              placeholder="Search by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} 
              className="bg-transparent border-none outline-none text-sm w-full text-slate-900 dark:text-slate-200 placeholder-slate-400"
           />
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-4 scrollbar-hide">
         {categories.map(cat => (
            <button
               key={cat}
               onClick={() => setSelectedCategory(cat)}
               className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors border ${
                  selectedCategory === cat 
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200 dark:shadow-none' 
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400'
               }`}
            >
               {cat}
            </button>
         ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
         {filteredCourses.map(course => (
            <div 
                key={course.id} 
                onClick={() => onPreviewCourse(course)}
                className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-xl hover:-translate-y-1 hover:border-indigo-200 dark:hover:border-indigo-800 transition-all duration-300 flex flex-col h-full cursor-pointer"
            >
               <div className="h-40 bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                  <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                     {course.category}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-white flex items-center gap-1">
                     <Clock size={10} /> {course.duration}
                  </div>
               </div>
               
               <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                     <div className="flex items-center text-xs text-amber-500 font-medium">
                        <Star size={12} className="fill-current mr-1" /> {course.rating?.toFixed(1)}
                        <span className="text-slate-400 ml-1 font-normal">({course.reviewsCount})</span>
                     </div>
                     <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 font-medium">
                        {course.level}
                     </span>
                  </div>
                  
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                     {course.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 mt-auto mb-4">
                     <div className="p-1 bg-slate-100 dark:bg-slate-700 rounded-full">
                        <User size={12} className="text-slate-500 dark:text-slate-400" />
                     </div>
                     <span className="text-xs text-slate-500 dark:text-slate-400 truncate">{course.instructor}</span>
                  </div>
                  
                  <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        onEnrollClick(course);
                    }}
                    className="w-full py-2.5 bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium text-sm rounded-xl border border-slate-200 dark:border-slate-600 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 dark:hover:bg-indigo-600 dark:hover:border-indigo-600 transition-all flex items-center justify-center gap-2 group/btn"
                  >
                     <Plus size={16} className="group-hover/btn:scale-110 transition-transform" /> Enroll
                  </button>
               </div>
            </div>
         ))}
      </div>
    </div>
  );
};
