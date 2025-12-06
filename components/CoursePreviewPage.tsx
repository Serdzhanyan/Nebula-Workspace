
import React, { useState } from 'react';
import { ArrowLeft, Clock, Award, Star, BarChart, User, CheckCircle2, Lock, PlayCircle, BookOpen, Globe, MessageCircle, Share2, Heart, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { TrainingModule } from '../types';

interface CoursePreviewPageProps {
  course: TrainingModule;
  onBack: () => void;
  onEnroll: () => void;
}

export const CoursePreviewPage: React.FC<CoursePreviewPageProps> = ({ course: initialCourse, onBack, onEnroll }) => {
  const [activeTab, setActiveTab] = useState<'about' | 'curriculum' | 'reviews'>('about');
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Mock extended data for the preview
  const course = {
    ...initialCourse,
    description: initialCourse.description || "In this comprehensive course, you will dive deep into the fundamentals and advanced concepts. Designed for professionals looking to upskill, this module combines theoretical knowledge with practical, hands-on examples. By the end of this course, you will have a solid understanding of the core principles and be ready to apply them in your daily work.",
    outcomes: [
        "Master the core principles and advanced strategies",
        "Build real-world projects from scratch",
        "Understand industry best practices and workflows",
        "Debug and troubleshoot complex issues efficiently",
        "Collaborate effectively within a modern team structure",
        "Prepare for professional certification exams"
    ],
    requirements: [
        "Basic understanding of the subject matter",
        "Access to a computer with internet connection",
        "No prior advanced experience required"
    ],
    lastUpdated: "October 2024",
    language: "English"
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col bg-slate-50/50 dark:bg-slate-950">
      {/* Navbar / Breadcrumbs */}
      <div className="sticky top-0 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between">
         <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors text-sm font-medium"
         >
            <ArrowLeft size={16} /> Back to Catalog
         </button>
         <div className="flex items-center gap-3">
            <button 
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`p-2 rounded-full border transition-all ${isWishlisted ? 'bg-pink-50 border-pink-200 text-pink-500 dark:bg-pink-900/20 dark:border-pink-800' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 hover:text-pink-500'}`}
            >
                <Heart size={18} className={isWishlisted ? "fill-current" : ""} />
            </button>
            <button className="p-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-indigo-600 transition-colors">
                <Share2 size={18} />
            </button>
         </div>
      </div>

      <div className="flex-1 overflow-y-auto">
          {/* Hero Section */}
          <div className="bg-slate-900 text-white relative overflow-hidden">
             {/* Background Decoration */}
             <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-900/40 to-transparent pointer-events-none"></div>
             <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>

             <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16 relative z-10 flex flex-col lg:flex-row gap-12">
                <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-3 text-sm font-medium text-indigo-300">
                        <span className="bg-indigo-500/20 text-indigo-200 px-2.5 py-0.5 rounded text-xs uppercase tracking-wider border border-indigo-500/30">
                            {course.category}
                        </span>
                        <span>Last updated {course.lastUpdated}</span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-bold leading-tight">{course.title}</h1>
                    <p className="text-lg text-slate-300 max-w-2xl leading-relaxed">
                        {course.description.substring(0, 150)}...
                    </p>

                    <div className="flex items-center flex-wrap gap-6 text-sm">
                        <div className="flex items-center gap-1.5 text-amber-400">
                            <span className="font-bold">{course.rating?.toFixed(1) || 4.8}</span>
                            <div className="flex">
                                {[1,2,3,4,5].map(i => <Star key={i} size={14} className="fill-current" />)}
                            </div>
                            <span className="text-slate-400 underline decoration-slate-600 underline-offset-4 decoration-1 ml-1 cursor-pointer hover:text-white transition-colors">
                                ({course.reviewsCount || 120} ratings)
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-300">
                            <User size={16} />
                            <span>Created by <span className="text-white font-medium underline decoration-slate-600 underline-offset-4 cursor-pointer hover:text-indigo-300 transition-colors">{course.instructor}</span></span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-300">
                            <Globe size={16} />
                            <span>{course.language}</span>
                        </div>
                    </div>
                </div>

                {/* Placeholder for layout balance on large screens (Sidebar takes this spot visually) */}
                <div className="hidden lg:block w-80 shrink-0"></div>
             </div>
          </div>

          <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8 relative">
              
              {/* Main Content */}
              <div className="flex-1 min-w-0">
                  {/* Tabs */}
                  <div className="flex items-center gap-6 border-b border-slate-200 dark:border-slate-800 mb-8 overflow-x-auto">
                      {['About', 'Curriculum', 'Reviews'].map((tab) => (
                          <button
                            key={tab}
                            onClick={() => setActiveTab(tab.toLowerCase() as any)}
                            className={`pb-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap px-1 ${
                                activeTab === tab.toLowerCase()
                                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
                                : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                            }`}
                          >
                              {tab}
                          </button>
                      ))}
                  </div>

                  {activeTab === 'about' && (
                      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2">
                          {/* Outcomes */}
                          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 md:p-8">
                              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">What you'll learn</h3>
                              <div className="grid md:grid-cols-2 gap-4">
                                  {course.outcomes.map((outcome, i) => (
                                      <div key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                                          <Check size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                                          <span>{outcome}</span>
                                      </div>
                                  ))}
                              </div>
                          </div>

                          {/* Description */}
                          <div className="prose prose-slate dark:prose-invert max-w-none">
                              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Description</h3>
                              <p className="leading-relaxed text-slate-600 dark:text-slate-300">
                                  {course.description}
                              </p>
                              <p className="leading-relaxed text-slate-600 dark:text-slate-300 mt-4">
                                  This course is designed to be comprehensive yet accessible. Whether you are a beginner looking to get started or an experienced professional aiming to refine your skills, you'll find value in the structured lessons and practical exercises.
                              </p>
                          </div>

                          {/* Requirements */}
                          <div>
                              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Requirements</h3>
                              <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300 ml-2">
                                  {course.requirements.map((req, i) => (
                                      <li key={i}>{req}</li>
                                  ))}
                              </ul>
                          </div>

                          {/* Instructor */}
                          <div>
                              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Instructor</h3>
                              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6">
                                  <div className="flex items-start gap-4">
                                      <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden shrink-0">
                                          <img src={`https://ui-avatars.com/api/?name=${course.instructor}&background=random&size=128`} alt={course.instructor} className="w-full h-full object-cover" />
                                      </div>
                                      <div>
                                          <h4 className="text-lg font-bold text-indigo-600 dark:text-indigo-400 mb-1 underline cursor-pointer">{course.instructor}</h4>
                                          <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">Senior Industry Specialist & Educator</p>
                                          
                                          <div className="flex items-center gap-4 text-xs font-medium text-slate-600 dark:text-slate-300 mb-4">
                                              <span className="flex items-center gap-1"><Star size={12} className="fill-slate-600 dark:fill-slate-300"/> 4.8 Rating</span>
                                              <span className="flex items-center gap-1"><Award size={12} /> 15k Students</span>
                                              <span className="flex items-center gap-1"><PlayCircle size={12} /> 12 Courses</span>
                                          </div>
                                          
                                          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                              {course.instructor} is a passionate educator with over 10 years of experience in the field. Having worked with top Fortune 500 companies, they bring real-world insights into the classroom, ensuring students learn not just the theory, but how to apply it effectively.
                                          </p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  )}

                  {activeTab === 'curriculum' && (
                      <div className="animate-in fade-in slide-in-from-bottom-2">
                          <div className="flex items-center justify-between mb-6">
                              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Course Content</h3>
                              <span className="text-sm text-slate-500 dark:text-slate-400">
                                  {course.syllabus?.length || 6} lessons • {course.duration} total length
                              </span>
                          </div>
                          
                          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden divide-y divide-slate-100 dark:divide-slate-700/50">
                              {(course.syllabus || [
                                  {title: 'Introduction & Course Overview', duration: '15:00', completed: false},
                                  {title: 'Setting Up the Environment', duration: '20:00', completed: false},
                                  {title: 'Core Methodologies Explained', duration: '45:00', completed: false},
                                  {title: 'First Practical Exercise', duration: '30:00', completed: false},
                                  {title: 'Advanced Strategies', duration: '40:00', completed: false},
                                  {title: 'Final Project & Review', duration: '55:00', completed: false},
                              ]).map((lesson: any, i) => (
                                  <div key={i} className="p-4 flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors group cursor-default">
                                     <div className="text-slate-400 group-hover:text-indigo-500 transition-colors">
                                         {i === 0 ? <PlayCircle size={20} /> : <Lock size={20} />}
                                     </div>
                                     <div className="flex-1">
                                         <p className="text-sm font-medium text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                            {lesson.title}
                                         </p>
                                         <div className="flex items-center gap-2 mt-0.5">
                                            {i === 0 && <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-1.5 rounded">PREVIEW</span>}
                                            <span className="text-xs text-slate-400">{lesson.duration}</span>
                                         </div>
                                     </div>
                                     <span className="text-xs text-slate-400 font-mono">
                                        0{i+1}
                                     </span>
                                  </div>
                              ))}
                          </div>
                      </div>
                  )}

                  {activeTab === 'reviews' && (
                      <div className="animate-in fade-in slide-in-from-bottom-2">
                           <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Student Feedback</h3>
                           <div className="flex items-center gap-8 mb-8">
                               <div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                                   <span className="text-4xl font-bold text-slate-900 dark:text-white">{course.rating?.toFixed(1) || 4.8}</span>
                                   <div className="flex text-amber-400 my-2">
                                       {[1,2,3,4,5].map(i => <Star key={i} size={16} className="fill-current" />)}
                                   </div>
                                   <span className="text-xs text-slate-500 font-medium">Course Rating</span>
                               </div>
                               
                               <div className="flex-1 space-y-2">
                                   {[5,4,3,2,1].map((stars, i) => (
                                       <div key={stars} className="flex items-center gap-3">
                                           <div className="w-full bg-slate-100 dark:bg-slate-700/50 rounded-full h-2">
                                               <div 
                                                className="bg-slate-800 dark:bg-slate-400 h-full rounded-full"
                                                style={{ width: i === 0 ? '70%' : i === 1 ? '20%' : '5%' }}
                                               ></div>
                                           </div>
                                           <div className="flex items-center gap-1 min-w-[60px] text-xs text-slate-500">
                                               <div className="flex text-amber-400">
                                                 {[...Array(stars)].map((_, j) => <Star key={j} size={10} className="fill-current" />)}
                                               </div>
                                               <span>{i === 0 ? '70%' : i === 1 ? '20%' : '5%'}</span>
                                           </div>
                                       </div>
                                   ))}
                               </div>
                           </div>

                           <div className="space-y-4">
                               {[1, 2, 3].map((r) => (
                                   <div key={r} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6">
                                       <div className="flex items-start justify-between mb-4">
                                           <div className="flex items-center gap-3">
                                               <img src={`https://picsum.photos/seed/${r+50}/100/100`} alt="User" className="w-10 h-10 rounded-full" />
                                               <div>
                                                   <h5 className="text-sm font-bold text-slate-900 dark:text-white">Student Name</h5>
                                                   <div className="flex items-center gap-2">
                                                        <div className="flex text-amber-400">
                                                            {[1,2,3,4,5].map(s => <Star key={s} size={10} className="fill-current" />)}
                                                        </div>
                                                        <span className="text-xs text-slate-400">2 weeks ago</span>
                                                   </div>
                                               </div>
                                           </div>
                                       </div>
                                       <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                           "This course was exactly what I needed. The instructor explains concepts clearly and the practical examples are very relevant to my day-to-day work. Highly recommended!"
                                       </p>
                                   </div>
                               ))}
                           </div>
                      </div>
                  )}
              </div>

              {/* Sticky Sidebar */}
              <div className="lg:w-80 shrink-0 relative">
                  <div className="lg:absolute lg:-top-64 left-0 right-0">
                      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden sticky top-24">
                          {/* Preview Video / Image */}
                          <div className="h-48 relative group cursor-pointer bg-slate-900">
                              <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity" />
                              <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                      <PlayCircle size={28} className="text-indigo-600 ml-1" />
                                  </div>
                              </div>
                              <div className="absolute bottom-4 left-0 right-0 text-center">
                                  <span className="text-white font-bold text-sm drop-shadow-md">Preview this course</span>
                              </div>
                          </div>

                          <div className="p-6">
                              <div className="flex items-baseline gap-2 mb-6">
                                  <span className="text-3xl font-bold text-slate-900 dark:text-white">Free</span>
                                  <span className="text-sm text-slate-500 line-through decoration-slate-400">$99.99</span>
                                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 ml-auto">100% OFF</span>
                              </div>

                              <button 
                                onClick={onEnroll}
                                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-base shadow-lg shadow-indigo-200 dark:shadow-none transition-all mb-4"
                              >
                                Enroll Now
                              </button>
                              <p className="text-xs text-center text-slate-400 mb-6">30-Day Money-Back Guarantee</p>

                              <div className="space-y-4">
                                  <h5 className="text-sm font-bold text-slate-900 dark:text-white">This course includes:</h5>
                                  <ul className="space-y-3">
                                      <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                                          <Clock size={16} className="text-slate-400" />
                                          <span>{course.duration} on-demand video</span>
                                      </li>
                                      <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                                          <BookOpen size={16} className="text-slate-400" />
                                          <span>{course.syllabus?.length || 6} lessons</span>
                                      </li>
                                      <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                                          <BarChart size={16} className="text-slate-400" />
                                          <span>Level: {course.level || 'Intermediate'}</span>
                                      </li>
                                      <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                                          <Globe size={16} className="text-slate-400" />
                                          <span>Access on mobile and TV</span>
                                      </li>
                                      <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                                          <Award size={16} className="text-slate-400" />
                                          <span>Certificate of completion</span>
                                      </li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};
