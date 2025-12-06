import React from 'react';
import { ArrowLeft, Mail, Phone, Award, TrendingUp, Clock, CheckCircle2, Calendar } from 'lucide-react';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  status: string;
  score: number;
  avatar?: string;
  trend?: number[]; // Added trend data for visual charts
}

interface EmployeeDetailPageProps {
  member: TeamMember;
  onBack: () => void;
}

export const EmployeeDetailPage: React.FC<EmployeeDetailPageProps> = ({ member, onBack }) => {
  // Mock detailed data based on the member
  const tasks = [
    { title: "Finalize Q3 roadmap", status: "In Progress", due: "Tomorrow" },
    { title: "Review junior dev PRs", status: "Pending", due: "Today" },
    { title: "Client meeting prep", status: "Done", due: "Yesterday" },
  ];

  const achievements = [
    { title: "Top Performer", icon: TrendingUp, color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20" },
    { title: "Team Player", icon: Award, color: "text-indigo-500 bg-indigo-50 dark:bg-indigo-900/20" },
    { title: "Early Bird", icon: Clock, color: "text-amber-500 bg-amber-50 dark:bg-amber-900/20" },
  ];

  return (
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Header / Back */}
      <div className="flex items-center justify-between mb-6">
        <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors text-sm font-medium w-fit"
        >
            <ArrowLeft size={16} /> Back to Team
        </button>
        <span className="text-sm text-slate-400">Employee Profile</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 overflow-y-auto pr-2">
        {/* Left Column: Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col items-center text-center">
             <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-400 to-purple-400 p-1 mb-4">
               <div className="w-full h-full rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-3xl text-white font-bold overflow-hidden">
                  <img src={`https://ui-avatars.com/api/?name=${member.name}&background=random`} alt={member.name} className="w-full h-full object-cover" />
               </div>
             </div>
             <h2 className="text-xl font-bold text-slate-900 dark:text-white">{member.name}</h2>
             <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium mb-4">{member.role}</p>
             
             <div className="flex gap-3 w-full justify-center mb-6">
                <button className="p-2 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 transition-colors">
                  <Mail size={18} />
                </button>
                <button className="p-2 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 transition-colors">
                  <Phone size={18} />
                </button>
             </div>

             <div className="w-full grid grid-cols-2 gap-4 pt-6 border-t border-slate-100 dark:border-slate-700">
                <div className="text-center">
                   <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Score</p>
                   <p className="text-xl font-bold text-emerald-500">{member.score}</p>
                </div>
                <div className="text-center">
                   <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Status</p>
                   <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mt-1">{member.status}</p>
                </div>
             </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
             <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
               <Award size={18} className="text-amber-500"/> Achievements
             </h3>
             <div className="space-y-3">
                {achievements.map((a, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/30 border border-slate-100 dark:border-slate-700/50">
                     <div className={`p-2 rounded-full ${a.color}`}>
                       <a.icon size={16} />
                     </div>
                     <div>
                       <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{a.title}</p>
                       <p className="text-xs text-slate-500 dark:text-slate-400">Awarded Oct 2024</p>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Right Column: Details */}
        <div className="lg:col-span-2 space-y-6">
           {/* Current Tasks */}
           <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                 <h3 className="font-bold text-slate-800 dark:text-white">Current Tasks</h3>
                 <span className="text-xs font-medium bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 px-2 py-1 rounded">3 Active</span>
              </div>
              <div className="space-y-3">
                 {tasks.map((task, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors">
                       <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${task.status === 'In Progress' ? 'bg-blue-500' : task.status === 'Done' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                          <div>
                             <p className="font-medium text-slate-800 dark:text-slate-200">{task.title}</p>
                             <p className="text-xs text-slate-500">Due: {task.due}</p>
                          </div>
                       </div>
                       <span className={`text-xs font-medium px-2 py-1 rounded ${
                          task.status === 'In Progress' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' :
                          task.status === 'Done' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400' :
                          'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400'
                       }`}>
                          {task.status}
                       </span>
                    </div>
                 ))}
              </div>
           </div>

           {/* Performance Metrics */}
           <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
              <h3 className="font-bold text-slate-800 dark:text-white mb-6">Performance Metrics</h3>
              <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/30">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Weekly Productivity</p>
                    <div className="flex items-end gap-2">
                       <span className="text-2xl font-bold text-slate-800 dark:text-white">94%</span>
                       <span className="text-xs text-emerald-500 font-medium mb-1">↑ 2%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-600 rounded-full mt-3 overflow-hidden">
                       <div className="h-full bg-indigo-500 w-[94%]"></div>
                    </div>
                 </div>
                 <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/30">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Project Completion</p>
                    <div className="flex items-end gap-2">
                       <span className="text-2xl font-bold text-slate-800 dark:text-white">88%</span>
                       <span className="text-xs text-emerald-500 font-medium mb-1">↑ 5%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-600 rounded-full mt-3 overflow-hidden">
                       <div className="h-full bg-emerald-500 w-[88%]"></div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};