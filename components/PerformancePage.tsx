
import React, { useState, useRef } from 'react';
import { ArrowLeft, CheckSquare, Users, Star, Archive, MoreHorizontal, Download, TrendingUp, UploadCloud, FileText, Calendar } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { PerformanceChart } from './PerformanceChart';
import { performanceData } from './PerformanceWidget';
import { TrackerWidget } from './TrackerWidget';
import { EmployeeDetailPage, TeamMember } from './EmployeeDetailPage';
import { ReviewDetailPage, ReviewData } from './ReviewDetailPage';
import { Task } from '../types';

interface PerformancePageProps {
  initialTab: string;
  onBack: () => void;
  onTaskClick?: (task: Task) => void;
}

export const PerformancePage: React.FC<PerformancePageProps> = ({ initialTab, onBack, onTaskClick }) => {
  const [activeTab, setActiveTab] = useState(initialTab || 'tasks');
  const [taskFilter, setTaskFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [selectedReview, setSelectedReview] = useState<ReviewData | null>(null);
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const tabs = [
    { id: 'tasks', label: 'My Tasks', icon: CheckSquare },
    { id: 'team', label: 'My Team', icon: Users },
    { id: 'review', label: 'Review', icon: Star },
    { id: 'archive', label: 'Archive', icon: Archive },
  ];

  const teamMembers: TeamMember[] = [
    { id: '1', name: 'Sarah Lee', role: 'Product Manager', status: 'Online', score: 92, trend: [65, 75, 78, 85, 92] },
    { id: '2', name: 'Mark Vos', role: 'System Arch', status: 'In Meeting', score: 88, trend: [70, 75, 80, 82, 88] },
    { id: '3', name: 'Alice Chen', role: 'UX Design', status: 'Offline', score: 95, trend: [85, 88, 90, 92, 95] },
    { id: '4', name: 'James D.', role: 'DevOps', status: 'Online', score: 85, trend: [60, 68, 75, 80, 85] },
  ];

  const reviews: ReviewData[] = [
    { 
      id: 'r1', 
      period: 'Q3 2024', 
      rating: 'Exceeds Expectations', 
      date: 'Oct 15, 2024',
      reviewer: 'Jordan Smith',
      summary: 'Alex has shown exceptional leadership in the Q3 migration project. Technical output was high, and cross-functional communication has improved significantly.',
      metrics: [
        { category: 'Technical Skills', score: 9, max: 10 },
        { category: 'Communication', score: 8, max: 10 },
        { category: 'Leadership', score: 9, max: 10 },
        { category: 'Productivity', score: 10, max: 10 }
      ],
      strengths: ['Project Management', 'Cloud Architecture', 'Mentoring Junior Devs'],
      improvements: ['Public Speaking', 'Documentation depth'],
      goals: [
        { title: 'Lead the AI integration initiative', status: 'In Progress' },
        { title: 'Speak at one internal tech talk', status: 'Pending' }
      ]
    },
    { 
      id: 'r2', 
      period: 'Q2 2024', 
      rating: 'Meets Expectations', 
      date: 'Jul 10, 2024',
      reviewer: 'Jordan Smith',
      summary: 'Solid performance this quarter. Delivered all key features on time. Focus next quarter on reducing technical debt.',
      metrics: [
        { category: 'Technical Skills', score: 8, max: 10 },
        { category: 'Communication', score: 7, max: 10 },
        { category: 'Leadership', score: 6, max: 10 },
        { category: 'Productivity', score: 8, max: 10 }
      ],
      strengths: ['React Development', 'Reliability'],
      improvements: ['Proactive reporting', 'Unit test coverage'],
      goals: [
        { title: 'Reduce backlog by 20%', status: 'Completed' },
        { title: 'Complete advanced TS training', status: 'Completed' }
      ]
    },
  ];

  const archivedReviews: ReviewData[] = [
    { 
      id: 'ar1', 
      period: 'Q1 2024', 
      rating: 'Meets Expectations', 
      date: 'Apr 12, 2024',
      reviewer: 'Jordan Smith',
      summary: 'Consistent performance. Delivered the authentication module ahead of schedule. Needs to improve on API documentation.',
      metrics: [
        { category: 'Technical Skills', score: 7, max: 10 },
        { category: 'Communication', score: 8, max: 10 },
        { category: 'Leadership', score: 5, max: 10 },
        { category: 'Productivity', score: 8, max: 10 }
      ],
      strengths: ['Authentication', 'Security Mindset'],
      improvements: ['API Design', 'Cross-team sync'],
      goals: [
        { title: 'Refactor legacy login code', status: 'Completed' }
      ]
    },
    { 
      id: 'ar2', 
      period: 'Q4 2023', 
      rating: 'Exceeds Expectations', 
      date: 'Jan 15, 2024',
      reviewer: 'Jordan Smith',
      summary: 'Outstanding end to the year. The dashboard redesign was a massive success.',
      metrics: [
        { category: 'Technical Skills', score: 9, max: 10 },
        { category: 'Communication', score: 9, max: 10 },
        { category: 'Leadership', score: 8, max: 10 },
        { category: 'Productivity', score: 9, max: 10 }
      ],
      strengths: ['UI/UX Implementation', 'Speed'],
      improvements: ['Mentorship'],
      goals: [
        { title: 'Launch Dashboard 2.0', status: 'Completed' }
      ]
    },
  ];

  const handleUploadClick = (e: React.MouseEvent, reviewId: string) => {
    e.stopPropagation();
    if (fileInputRefs.current[reviewId]) {
      fileInputRefs.current[reviewId]?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, reviewId: string) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        alert('Please upload a PDF file.');
        return;
      }
      // Mock upload process
      alert(`Uploaded ${file.name} for review ${reviewId}`);
    }
  };

  if (selectedMember) {
    return <EmployeeDetailPage member={selectedMember} onBack={() => setSelectedMember(null)} />;
  }

  if (selectedReview) {
    return <ReviewDetailPage review={selectedReview} onBack={() => setSelectedReview(null)} />;
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-[calc(100vh-140px)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors mb-2 text-sm font-medium"
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </button>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Performance Overview</h2>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200 dark:shadow-none">
          <Download size={16} /> Export Report
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        {/* Left Column: Main Content */}
        <div className="flex-1 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-slate-200 dark:border-slate-700 px-6 pt-4">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
                    : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="p-6 flex-1 overflow-y-auto">
            {activeTab === 'tasks' && (
              <div className="h-full flex flex-col">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                  <h3 className="font-semibold text-slate-800 dark:text-white">Active Tasks</h3>
                  <div className="flex bg-slate-100 dark:bg-slate-700/50 rounded-lg p-1">
                      {(['all', 'high', 'medium', 'low'] as const).map((priority) => (
                          <button
                            key={priority}
                            onClick={() => setTaskFilter(priority)}
                            className={`px-3 py-1 text-xs font-medium rounded-md capitalize transition-all ${
                                taskFilter === priority 
                                ? 'bg-white dark:bg-slate-600 shadow-sm text-indigo-600 dark:text-white' 
                                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                            }`}
                          >
                            {priority}
                          </button>
                      ))}
                  </div>
                </div>
                {/* Reusing TrackerWidget with filter prop and AI enabled */}
                <div className="flex-1 border border-slate-100 dark:border-slate-700/50 rounded-xl p-4 bg-slate-50/50 dark:bg-slate-800/50">
                   <TrackerWidget 
                        filterPriority={taskFilter} 
                        enableAISuggestions={true} 
                        onTaskClick={onTaskClick}
                   />
                </div>
              </div>
            )}

            {activeTab === 'team' && (
              <div className="space-y-4">
                 <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-slate-800 dark:text-white">Team Performance</h3>
                  <span className="text-xs text-slate-500 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-lg">4 Members</span>
                </div>
                {teamMembers.map((member) => (
                  <div 
                    key={member.id} 
                    onClick={() => setSelectedMember(member)}
                    className="flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-800 bg-slate-50 dark:bg-slate-800/50 transition-all cursor-pointer hover:shadow-md hover:scale-[1.01]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-400 to-purple-400 flex items-center justify-center text-white font-bold">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                           <p className="font-medium text-slate-900 dark:text-white">{member.name}</p>
                           <div 
                              title={`Current Score: ${member.score}`}
                              className={`w-2 h-2 rounded-full ${
                                  member.score >= 90 ? 'bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]' : 
                                  member.score >= 85 ? 'bg-blue-500' : 'bg-amber-500'
                              }`} 
                           />
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{member.role}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      {/* Trend Chart */}
                      <div className="hidden sm:block w-24 h-8">
                         <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={member.trend?.map(v => ({ value: v })) || []}>
                               <Area 
                                  type="monotone" 
                                  dataKey="value" 
                                  stroke={member.score >= 90 ? "#10b981" : "#6366f1"} 
                                  fill={member.score >= 90 ? "#d1fae5" : "#e0e7ff"} 
                                  fillOpacity={0.4}
                                  strokeWidth={2}
                                  isAnimationActive={false}
                                />
                            </AreaChart>
                         </ResponsiveContainer>
                      </div>

                      <div className="text-right">
                        <p className="text-xs text-slate-400 mb-1">Score</p>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">{member.score}%</span>
                      </div>
                      <button className="p-2 text-slate-400 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-colors">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'review' && (
              <div className="space-y-6">
                <div className="p-5 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-900/50">
                  <h3 className="font-bold text-indigo-900 dark:text-indigo-200 mb-2">Upcoming Review</h3>
                  <p className="text-sm text-indigo-700 dark:text-indigo-300 mb-4">Your Q4 performance review is scheduled for November 15th.</p>
                  <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                    Prepare Self-Assessment
                  </button>
                </div>

                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-white mb-4">Past Reviews</h3>
                  <div className="space-y-3">
                    {reviews.map((review) => (
                      <div 
                        key={review.id} 
                        onClick={() => setSelectedReview(review)}
                        className="flex items-center justify-between p-4 border border-slate-100 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors group bg-white dark:bg-slate-800"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-2.5 rounded-lg ${review.rating.includes('Exceeds') ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30' : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30'}`}>
                            <FileText size={20} />
                          </div>
                          <div>
                            <span className="block text-sm font-bold text-slate-800 dark:text-slate-200">{review.period}</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400">{review.rating}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                           {/* Hidden File Input */}
                           <input 
                              type="file" 
                              accept=".pdf" 
                              className="hidden"
                              ref={(el) => { fileInputRefs.current[review.id] = el; }}
                              onChange={(e) => handleFileChange(e, review.id)}
                              onClick={(e) => e.stopPropagation()} // Prevent double trigger
                           />
                           <button 
                              onClick={(e) => handleUploadClick(e, review.id)}
                              title="Upload PDF"
                              className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
                           >
                              <UploadCloud size={18} />
                           </button>
                           <button className="text-xs font-medium text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                              View
                           </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'archive' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-amber-50 dark:bg-amber-900/10 text-amber-800 dark:text-amber-200 text-sm rounded-lg border border-amber-100 dark:border-amber-900/30">
                  <Archive size={16} />
                  <span>Archived reviews are available for reference.</span>
                </div>
                
                <div className="space-y-3">
                    {archivedReviews.map((review) => (
                      <div 
                        key={review.id} 
                        onClick={() => setSelectedReview(review)}
                        className="flex items-center justify-between p-4 border border-slate-100 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors group bg-white dark:bg-slate-800 opacity-90 hover:opacity-100"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2.5 rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-900/30">
                            <Archive size={20} />
                          </div>
                          <div>
                            <span className="block text-sm font-bold text-slate-800 dark:text-slate-200">{review.period}</span>
                            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                                <Calendar size={10} />
                                {review.date}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                           {/* Hidden File Input */}
                           <input 
                              type="file" 
                              accept=".pdf" 
                              className="hidden"
                              ref={(el) => { fileInputRefs.current[review.id] = el; }}
                              onChange={(e) => handleFileChange(e, review.id)}
                              onClick={(e) => e.stopPropagation()} // Prevent double trigger
                           />
                           <button 
                              onClick={(e) => handleUploadClick(e, review.id)}
                              title="Upload PDF"
                              className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
                           >
                              <UploadCloud size={18} />
                           </button>
                           <div className="px-2 py-1 text-[10px] font-medium border border-slate-200 dark:border-slate-600 rounded text-slate-500">
                              {review.rating}
                           </div>
                        </div>
                      </div>
                    ))}
                  </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Graphs Panel */}
        <div className="w-full lg:w-80 flex flex-col gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-5">
             <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-800 dark:text-white">Stats</h3>
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 dark:text-emerald-400 px-2 py-1 rounded-full">+12%</span>
             </div>
             
             <div className="h-48 mb-6">
                <PerformanceChart data={performanceData} />
             </div>

             <div className="space-y-4">
                <div className="p-3 bg-slate-50 dark:bg-slate-700/30 rounded-xl">
                   <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-500 dark:text-slate-400">Productivity</span>
                      <span className="font-bold text-slate-800 dark:text-white">92%</span>
                   </div>
                   <div className="h-2 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 w-[92%]"></div>
                   </div>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-700/30 rounded-xl">
                   <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-500 dark:text-slate-400">Goals Met</span>
                      <span className="font-bold text-slate-800 dark:text-white">8/10</span>
                   </div>
                   <div className="h-2 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-[80%]"></div>
                   </div>
                </div>
             </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl shadow-lg p-5 text-white">
             <div className="flex items-start justify-between mb-4">
                <TrendingUp className="text-indigo-200" />
                <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded text-white">PRO TIP</span>
             </div>
             <p className="text-sm font-medium leading-relaxed opacity-90 mb-4">
               "Consistently updating your task status before EOD improves team sync by 40%."
             </p>
             <button className="w-full py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-xs font-bold transition-colors">
                View More Insights
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};
