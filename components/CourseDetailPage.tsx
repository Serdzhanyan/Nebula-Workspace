
import React, { useState } from 'react';
import { ArrowLeft, PlayCircle, CheckCircle2, Lock, FileText, Clock, Award, ChevronRight, Download, PenTool, MessageSquare, Volume2, Maximize, Pause, Settings, Layout } from 'lucide-react';
import { TrainingModule, TrainingLesson } from '../types';

interface CourseDetailPageProps {
  course: TrainingModule;
  onBack: () => void;
}

export const CourseDetailPage: React.FC<CourseDetailPageProps> = ({ course: initialCourse, onBack }) => {
  // Hydrate with mock data if missing from the list view
  const course: TrainingModule = {
    description: "This comprehensive course covers everything you need to know to master the subject. From basic principles to advanced techniques, we explore real-world scenarios and hands-on exercises.",
    syllabus: [
      { id: 'l1', title: 'Introduction & Overview', duration: '10:00', completed: true },
      { id: 'l2', title: 'Core Concepts Explained', duration: '25:00', completed: true },
      { id: 'l3', title: 'Setting Up Your Environment', duration: '15:30', completed: false },
      { id: 'l4', title: 'Advanced Techniques Part 1', duration: '45:00', completed: false, isLocked: true },
      { id: 'l5', title: 'Advanced Techniques Part 2', duration: '40:00', completed: false, isLocked: true },
      { id: 'l6', title: 'Final Assessment', duration: '30:00', completed: false, isLocked: true },
    ],
    ...initialCourse
  };

  const [activeLessonId, setActiveLessonId] = useState<string>(
    course.syllabus?.find(l => !l.completed)?.id || course.syllabus?.[0]?.id || 'l1'
  );
  const [activeTab, setActiveTab] = useState<'overview' | 'resources' | 'notes'>('overview');
  const [isPlaying, setIsPlaying] = useState(false);
  const [userNotes, setUserNotes] = useState("");
  
  const activeLesson = course.syllabus?.find(l => l.id === activeLessonId);

  // Mock Resources
  const resources = [
    { name: 'Lecture Slides.pdf', size: '2.4 MB' },
    { name: 'Exercise_Files.zip', size: '15 MB' },
    { name: 'Cheatsheet.png', size: '450 KB' },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300 h-full flex flex-col bg-slate-50/50 dark:bg-slate-950">
      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors text-sm font-medium px-2 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <ArrowLeft size={18} />
          <span>Back to Learning</span>
        </button>
        <div className="hidden sm:flex items-center gap-3">
             <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {Math.round(course.progress)}% Complete
             </div>
             <div className="w-32 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-indigo-500 rounded-full transition-all duration-500" 
                    style={{ width: `${course.progress}%` }}
                />
             </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        
        {/* Main Content Area (Left) */}
        <div className="flex-1 flex flex-col overflow-y-auto pr-1">
           
           {/* Video Player */}
           <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl group shrink-0 mb-6">
              <img 
                src={course.thumbnail || `https://picsum.photos/seed/${course.id}/1280/720`} 
                alt={activeLesson?.title} 
                className={`w-full h-full object-cover transition-opacity duration-500 ${isPlaying ? 'opacity-30' : 'opacity-60'}`} 
              />
              
              {/* Central Play Button */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <button 
                        onClick={() => setIsPlaying(true)}
                        className="w-20 h-20 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all transform hover:scale-110 shadow-2xl ring-1 ring-white/50"
                    >
                        <PlayCircle size={40} className="fill-white text-white ml-1" />
                    </button>
                </div>
              )}

              {/* Video Overlay Info */}
              <div className={`absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/80 to-transparent transition-opacity duration-300 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
                 <span className="text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1 block">
                    Now Playing
                 </span>
                 <h2 className="text-xl md:text-2xl font-bold text-white shadow-sm">
                    {activeLesson?.title}
                 </h2>
              </div>

              {/* Controls Bar */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                 {/* Progress Line */}
                 <div className="w-full h-1 bg-white/20 rounded-full mb-4 cursor-pointer hover:h-1.5 transition-all group/progress">
                    <div className="h-full w-1/3 bg-indigo-500 rounded-full relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md scale-0 group-hover/progress:scale-100 transition-transform"></div>
                    </div>
                 </div>

                 <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-indigo-400 transition-colors">
                            {isPlaying ? <Pause size={20} className="fill-current" /> : <PlayCircle size={20} className="fill-current" />}
                        </button>
                        <button className="hover:text-indigo-400 transition-colors"><Volume2 size={20} /></button>
                        <span className="text-xs font-medium opacity-80">04:20 / {activeLesson?.duration}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="hover:text-indigo-400 transition-colors"><Settings size={20} /></button>
                        <button className="hover:text-indigo-400 transition-colors"><Maximize size={20} /></button>
                    </div>
                 </div>
              </div>
           </div>

           {/* Content Tabs */}
           <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex-1 flex flex-col min-h-[400px]">
              {/* Tab Headers */}
              <div className="flex border-b border-slate-200 dark:border-slate-700">
                 <button 
                    onClick={() => setActiveTab('overview')}
                    className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-all ${
                        activeTab === 'overview' 
                        ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400' 
                        : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                    }`}
                 >
                    <Layout size={16} /> Overview
                 </button>
                 <button 
                    onClick={() => setActiveTab('resources')}
                    className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-all ${
                        activeTab === 'resources' 
                        ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400' 
                        : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                    }`}
                 >
                    <Download size={16} /> Resources
                 </button>
                 <button 
                    onClick={() => setActiveTab('notes')}
                    className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-all ${
                        activeTab === 'notes' 
                        ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400' 
                        : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                    }`}
                 >
                    <PenTool size={16} /> My Notes
                 </button>
              </div>

              {/* Tab Content */}
              <div className="p-6 md:p-8 flex-1">
                 {activeTab === 'overview' && (
                    <div className="animate-in fade-in slide-in-from-bottom-2">
                        <div className="flex items-center gap-3 mb-6">
                           <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                              {course.instructor?.charAt(0)}
                           </div>
                           <div>
                              <p className="text-sm font-medium text-slate-900 dark:text-white">{course.instructor}</p>
                              <p className="text-xs text-slate-500 dark:text-slate-400">Course Instructor</p>
                           </div>
                        </div>

                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">About this lesson</h3>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                            {course.description}
                        </p>

                        <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide mb-3">Learning Objectives</h4>
                        <ul className="space-y-2 mb-6">
                           {['Understand the core principles', 'Apply techniques in real-world scenarios', 'Debug common issues efficiently', 'Best practices for scalability'].map((item, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                                 <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                                 {item}
                              </li>
                           ))}
                        </ul>

                        <div className="flex gap-4 pt-6 border-t border-slate-100 dark:border-slate-700">
                             <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                <Clock size={16} /> {course.duration} Total
                             </div>
                             <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                <FileText size={16} /> {course.syllabus?.length} Lessons
                             </div>
                             <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                <Award size={16} /> Certificate
                             </div>
                        </div>
                    </div>
                 )}

                 {activeTab === 'resources' && (
                    <div className="animate-in fade-in slide-in-from-bottom-2">
                       <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Lesson Materials</h3>
                       <div className="grid gap-3">
                          {resources.map((res, i) => (
                             <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:border-indigo-300 dark:hover:border-indigo-500 transition-colors group cursor-pointer">
                                <div className="flex items-center gap-3">
                                   <div className="p-2 bg-white dark:bg-slate-700 rounded-lg shadow-sm text-indigo-500">
                                      <FileText size={20} />
                                   </div>
                                   <div>
                                      <p className="font-medium text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{res.name}</p>
                                      <p className="text-xs text-slate-400">{res.size}</p>
                                   </div>
                                </div>
                                <button className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                   <Download size={20} />
                                </button>
                             </div>
                          ))}
                       </div>
                    </div>
                 )}

                 {activeTab === 'notes' && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 h-full flex flex-col">
                       <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">My Notes</h3>
                       <textarea 
                          value={userNotes}
                          onChange={(e) => setUserNotes(e.target.value)}
                          placeholder="Type your key takeaways here..."
                          className="w-full flex-1 min-h-[200px] p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/50 focus:border-indigo-300 outline-none resize-none leading-relaxed"
                       />
                       <div className="flex justify-end mt-4">
                          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                             Save Notes
                          </button>
                       </div>
                    </div>
                 )}
              </div>
           </div>
        </div>

        {/* Sidebar (Syllabus) */}
        <div className="w-full lg:w-96 flex flex-col gap-6 shrink-0">
           <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col h-full overflow-hidden">
              <div className="p-5 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 backdrop-blur-sm sticky top-0 z-10">
                 <h4 className="font-bold text-slate-900 dark:text-white mb-1">Course Content</h4>
                 <p className="text-xs text-slate-500 dark:text-slate-400">
                    {course.syllabus?.filter(l => l.completed).length}/{course.syllabus?.length} Lessons Completed
                 </p>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-0">
                 {course.syllabus?.map((lesson, index) => {
                    const isActive = activeLessonId === lesson.id;
                    const isLast = index === (course.syllabus?.length || 0) - 1;

                    return (
                    <div key={lesson.id} className="relative pl-6 pb-2">
                       {/* Timeline Line */}
                       {!isLast && (
                           <div className="absolute left-[11px] top-7 bottom-0 w-0.5 bg-slate-100 dark:bg-slate-700" />
                       )}

                       {/* Status Dot */}
                       <div className={`absolute left-0 top-3 w-6 h-6 rounded-full flex items-center justify-center border-2 z-10 bg-white dark:bg-slate-800 transition-colors ${
                           isActive 
                             ? 'border-indigo-500 text-indigo-500 scale-110 shadow-lg shadow-indigo-100 dark:shadow-none' 
                             : lesson.completed 
                             ? 'border-emerald-500 text-emerald-500' 
                             : 'border-slate-200 dark:border-slate-700 text-slate-300'
                       }`}>
                           {lesson.completed ? (
                               <CheckCircle2 size={12} className="fill-emerald-50 dark:fill-emerald-900" />
                           ) : lesson.isLocked ? (
                               <Lock size={10} />
                           ) : (
                               <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-indigo-500' : 'bg-slate-300'}`} />
                           )}
                       </div>

                       <button
                          onClick={() => !lesson.isLocked && setActiveLessonId(lesson.id)}
                          disabled={lesson.isLocked}
                          className={`w-full text-left p-3 rounded-xl transition-all border group relative ${
                             isActive 
                                ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800' 
                                : 'bg-white dark:bg-slate-800 border-transparent hover:bg-slate-50 dark:hover:bg-slate-700/50'
                          } ${lesson.isLocked ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:shadow-sm'}`}
                       >
                          <div className="flex justify-between items-start gap-2">
                              <span className={`text-sm font-semibold leading-tight mb-1 ${
                                  isActive ? 'text-indigo-700 dark:text-indigo-300' : 'text-slate-700 dark:text-slate-200'
                              }`}>
                                {lesson.title}
                              </span>
                              {isActive && <div className="shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 animate-pulse" />}
                          </div>
                          
                          <div className="flex items-center gap-3 mt-1">
                             <span className="text-xs text-slate-400 flex items-center gap-1">
                                <PlayCircle size={10} /> {lesson.duration}
                             </span>
                             {lesson.isLocked && (
                                <span className="text-[10px] font-medium text-slate-400 bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">Locked</span>
                             )}
                          </div>
                       </button>
                    </div>
                 )})}
              </div>
           </div>

           {/* Community Widget (Visual only) */}
           <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                        <MessageSquare size={20} />
                    </div>
                    <div>
                        <h4 className="font-bold text-sm">Course Community</h4>
                        <p className="text-xs text-white/80">12 students online</p>
                    </div>
                </div>
                <p className="text-xs leading-relaxed opacity-90 mb-4">
                    Have questions? Join the discussion board to connect with peers and instructors.
                </p>
                <button className="w-full py-2 bg-white text-indigo-600 rounded-lg text-xs font-bold hover:bg-indigo-50 transition-colors">
                    Join Discussion
                </button>
           </div>
        </div>
      </div>
    </div>
  );
};
