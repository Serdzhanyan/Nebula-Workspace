
import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, User, Phone, Mic, Shield, Lock, LogOut, Activity, 
  BarChart2, Star, Clock, Headphones, MicOff, PhoneOff, AlertTriangle, 
  CheckCircle2, MoreHorizontal, Settings, RefreshCw, Zap, Calendar,
  MessageSquare
} from 'lucide-react';
import { Agent } from './CallCenterPage';

interface AgentProfilePageProps {
  agent: Agent;
  onBack: () => void;
}

export const AgentProfilePage: React.FC<AgentProfilePageProps> = ({ agent, onBack }) => {
  const [currentStatus, setCurrentStatus] = useState(agent.status);
  const [isBlocked, setIsBlocked] = useState(false);
  const [monitorMode, setMonitorMode] = useState<'none' | 'listen' | 'whisper' | 'barge'>('none');
  
  // Mock Stats
  const stats = {
    callsToday: Math.floor(Math.random() * 30) + 10,
    avgHandleTime: '4m 32s',
    satisfaction: '4.8',
    occupancy: '85%'
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentStatus(e.target.value as any);
  };

  const handleForceLogout = () => {
    if (window.confirm(`Are you sure you want to force logout ${agent.name}?`)) {
      alert(`${agent.name} has been logged out.`);
      onBack();
    }
  };

  const toggleBlock = () => {
    const action = isBlocked ? 'unblock' : 'block';
    if (window.confirm(`Are you sure you want to ${action} this agent?`)) {
      setIsBlocked(!isBlocked);
    }
  };

  // Mock waveform animation for live monitoring
  const Waveform = () => (
    <div className="flex items-center justify-center gap-1 h-16 w-full px-8">
      {[...Array(40)].map((_, i) => (
        <div 
          key={i} 
          className={`w-1.5 rounded-full ${
            monitorMode === 'barge' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]' : 
            monitorMode === 'whisper' ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]' : 
            'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]'
          } transition-all duration-300`} 
          style={{ 
            height: `${Math.max(10, Math.random() * 100)}%`, 
            animationDuration: `${Math.random() * 0.5 + 0.3}s`,
            animationName: 'pulse',
            animationIterationCount: 'infinite'
          }} 
        />
      ))}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-50 dark:bg-slate-950 flex flex-col animate-in fade-in slide-in-from-right-10 duration-300">
      {/* Header */}
      <div className="bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between shadow-sm backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-2"></div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              Agent Profile
              {isBlocked && <span className="bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wide font-bold">Blocked</span>}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Manage settings and permissions</p>
          </div>
        </div>
        
        <div className="flex gap-3">
           <button 
             onClick={toggleBlock}
             className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border transition-colors ${
               isBlocked 
               ? 'bg-slate-100 border-slate-200 text-slate-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300' 
               : 'bg-white border-red-200 text-red-600 hover:bg-red-50 dark:bg-slate-900 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-900/10'
             }`}
           >
             {isBlocked ? <CheckCircle2 size={16} /> : <Shield size={16} />}
             {isBlocked ? 'Unblock Access' : 'Block Access'}
           </button>
           <button 
             onClick={handleForceLogout}
             className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl text-sm font-bold hover:bg-red-700 transition-colors shadow-sm shadow-red-200 dark:shadow-none"
           >
             <LogOut size={16} /> Force Logout
           </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Profile & Stats */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Enhanced Profile Card */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden group">
               {/* Cover Gradient */}
               <div className="h-24 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative">
                  <div className="absolute inset-0 bg-black/10"></div>
                  {/* Status Badge Top Right */}
                  <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border shadow-sm backdrop-blur-md ${
                        currentStatus === 'Available' ? 'bg-emerald-500/90 text-white border-emerald-400' :
                        currentStatus === 'On Call' ? 'bg-red-500/90 text-white border-red-400' :
                        currentStatus === 'Break' ? 'bg-amber-500/90 text-white border-amber-400' : 
                        'bg-slate-500/90 text-white border-slate-400'
                      }`}>
                        {currentStatus}
                      </span>
                  </div>
               </div>
               
               <div className="px-6 pb-6 -mt-12 flex flex-col items-center text-center">
                  <div className="relative">
                      <div className="w-24 h-24 rounded-full border-4 border-white dark:border-slate-800 shadow-lg overflow-hidden bg-white">
                          <img src={agent.avatar} alt={agent.name} className="w-full h-full object-cover" />
                      </div>
                      <div className={`absolute bottom-1 right-1 w-5 h-5 rounded-full border-2 border-white dark:border-slate-800 ${
                        currentStatus === 'Available' ? 'bg-emerald-500' :
                        currentStatus === 'On Call' ? 'bg-red-500' :
                        currentStatus === 'Break' ? 'bg-amber-500' : 'bg-slate-400'
                      }`}></div>
                  </div>
                  
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-3">{agent.name}</h1>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-6">{agent.department} Department</p>

                  <div className="w-full space-y-4">
                      <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-700 text-left">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block mb-2">Override Status</label>
                          <div className="relative">
                              <select 
                                value={currentStatus}
                                onChange={handleStatusChange}
                                className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white appearance-none cursor-pointer hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors"
                              >
                                <option value="Available">Available</option>
                                <option value="On Call">On Call</option>
                                <option value="Break">Break</option>
                                <option value="Offline">Offline</option>
                              </select>
                              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                  <RefreshCw size={14} />
                              </div>
                          </div>
                      </div>
                  </div>
               </div>
            </div>

            {/* Stats Grid */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-4 uppercase tracking-wider flex items-center gap-2">
                    <Activity size={16} className="text-indigo-500" /> Today's Metrics
                </h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-indigo-50 dark:bg-indigo-900/10 rounded-2xl border border-indigo-100 dark:border-indigo-900/30 flex flex-col items-center justify-center text-center">
                        <div className="p-2 bg-white dark:bg-slate-800 rounded-full shadow-sm text-indigo-600 dark:text-indigo-400 mb-2">
                            <Phone size={18} />
                        </div>
                        <span className="text-2xl font-bold text-slate-900 dark:text-white">{stats.callsToday}</span>
                        <span className="text-[10px] font-bold text-slate-500 uppercase">Calls</span>
                    </div>
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-100 dark:border-emerald-900/30 flex flex-col items-center justify-center text-center">
                        <div className="p-2 bg-white dark:bg-slate-800 rounded-full shadow-sm text-emerald-600 dark:text-emerald-400 mb-2">
                            <Star size={18} />
                        </div>
                        <span className="text-2xl font-bold text-slate-900 dark:text-white">{stats.satisfaction}</span>
                        <span className="text-[10px] font-bold text-slate-500 uppercase">CSAT</span>
                    </div>
                    <div className="p-4 bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-100 dark:border-amber-900/30 flex flex-col items-center justify-center text-center">
                        <div className="p-2 bg-white dark:bg-slate-800 rounded-full shadow-sm text-amber-600 dark:text-amber-400 mb-2">
                            <Clock size={18} />
                        </div>
                        <span className="text-xl font-bold text-slate-900 dark:text-white">{stats.avgHandleTime}</span>
                        <span className="text-[10px] font-bold text-slate-500 uppercase">AHT</span>
                    </div>
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-900/30 flex flex-col items-center justify-center text-center">
                        <div className="p-2 bg-white dark:bg-slate-800 rounded-full shadow-sm text-blue-600 dark:text-blue-400 mb-2">
                            <Zap size={18} />
                        </div>
                        <span className="text-2xl font-bold text-slate-900 dark:text-white">{stats.occupancy}</span>
                        <span className="text-[10px] font-bold text-slate-500 uppercase">Util</span>
                    </div>
                </div>
            </div>
          </div>

          {/* Right Column: Monitoring & History */}
          <div className="lg:col-span-2 space-y-6">
             
             {/* Live Monitor Console - Pro Dark Theme */}
             <div className="bg-slate-900 text-white rounded-2xl p-1 shadow-xl overflow-hidden border border-slate-800">
                <div className="bg-slate-800/50 p-6 rounded-t-xl border-b border-slate-700/50 flex justify-between items-center">
                   <div>
                      <h3 className="text-lg font-bold flex items-center gap-2">
                         <Headphones size={20} className="text-emerald-400" /> Live Monitor Console
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">Real-time audio stream and intervention controls.</p>
                   </div>
                   {currentStatus === 'On Call' ? (
                      <div className="flex items-center gap-2 bg-red-500/20 text-red-400 px-3 py-1.5 rounded-lg border border-red-500/30 animate-pulse">
                          <div className="w-2 h-2 rounded-full bg-red-500"></div>
                          <span className="text-xs font-bold uppercase">Live Call</span>
                      </div>
                   ) : (
                      <div className="flex items-center gap-2 bg-slate-700/50 text-slate-400 px-3 py-1.5 rounded-lg border border-slate-600">
                          <div className="w-2 h-2 rounded-full bg-slate-500"></div>
                          <span className="text-xs font-bold uppercase">Idle</span>
                      </div>
                   )}
                </div>

                <div className="p-8">
                    {currentStatus === 'On Call' ? (
                       <div className="space-y-8">
                          {/* Visualizer Container */}
                          <div className="relative">
                              <div className="h-24 bg-black/40 rounded-xl border border-slate-700/50 flex items-center justify-center relative overflow-hidden backdrop-blur-sm">
                                 {monitorMode !== 'none' ? (
                                    <>
                                        <Waveform />
                                        <div className="absolute top-2 right-2 text-[10px] font-mono text-emerald-500 opacity-70">
                                            BITRATE: 128kbps | LATENCY: 24ms
                                        </div>
                                    </>
                                 ) : (
                                    <div className="text-slate-500 text-sm flex flex-col items-center gap-2">
                                       <Activity size={24} className="opacity-50" />
                                       <span>Monitoring Inactive</span>
                                    </div>
                                 )}
                              </div>
                              
                              {/* Status Overlay Label */}
                              {monitorMode !== 'none' && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                    <span className={`px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border shadow-lg ${
                                        monitorMode === 'listen' ? 'bg-emerald-500 text-white border-emerald-400' :
                                        monitorMode === 'whisper' ? 'bg-blue-500 text-white border-blue-400' :
                                        'bg-red-500 text-white border-red-400'
                                    }`}>
                                        {monitorMode === 'listen' ? 'Silent Monitoring' : monitorMode === 'whisper' ? 'Whispering Mode' : 'Barge In Active'}
                                    </span>
                                </div>
                              )}
                          </div>

                          {/* Controls */}
                          <div className="grid grid-cols-3 gap-4">
                             <button 
                               onClick={() => setMonitorMode(monitorMode === 'listen' ? 'none' : 'listen')}
                               className={`py-4 rounded-xl flex flex-col items-center gap-2 transition-all border ${
                                 monitorMode === 'listen' 
                                 ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' 
                                 : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white hover:border-slate-600'
                               }`}
                             >
                                <Headphones size={24} />
                                <span className="text-xs font-bold uppercase tracking-wider">Listen</span>
                             </button>
                             <button 
                               onClick={() => setMonitorMode(monitorMode === 'whisper' ? 'none' : 'whisper')}
                               className={`py-4 rounded-xl flex flex-col items-center gap-2 transition-all border ${
                                 monitorMode === 'whisper' 
                                 ? 'bg-blue-500/20 border-blue-500/50 text-blue-400' 
                                 : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white hover:border-slate-600'
                               }`}
                             >
                                {monitorMode === 'whisper' ? <Mic size={24} /> : <MicOff size={24} />}
                                <span className="text-xs font-bold uppercase tracking-wider">Whisper</span>
                             </button>
                             <button 
                               onClick={() => setMonitorMode(monitorMode === 'barge' ? 'none' : 'barge')}
                               className={`py-4 rounded-xl flex flex-col items-center gap-2 transition-all border ${
                                 monitorMode === 'barge' 
                                 ? 'bg-red-500/20 border-red-500/50 text-red-400' 
                                 : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white hover:border-slate-600'
                               }`}
                             >
                                {monitorMode === 'barge' ? <Phone size={24} /> : <PhoneOff size={24} />}
                                <span className="text-xs font-bold uppercase tracking-wider">Barge In</span>
                             </button>
                          </div>
                       </div>
                    ) : (
                       <div className="h-48 flex flex-col items-center justify-center text-slate-600 border-2 border-dashed border-slate-800 rounded-xl bg-slate-900/50">
                          <PhoneOff size={32} className="mb-3 opacity-50" />
                          <p className="font-bold text-slate-400">Agent is not on a call</p>
                          <p className="text-xs text-slate-600 mt-1">Monitoring tools will appear when a call starts.</p>
                       </div>
                    )}
                </div>
             </div>

             {/* Recent Logs Table */}
             <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                        <Clock size={18} className="text-slate-400" /> Recent Sessions
                    </h3>
                    <button className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">View All History</button>
                </div>
                <div className="space-y-0 divide-y divide-slate-100 dark:divide-slate-700">
                   {[1,2,3].map(i => (
                      <div key={i} className="flex items-center justify-between py-4 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors -mx-4 px-4">
                         <div className="flex items-center gap-4">
                             <div className={`p-2.5 rounded-lg ${i === 1 ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'}`}>
                                <Phone size={18} />
                             </div>
                             <div>
                                <p className="text-sm font-bold text-slate-900 dark:text-white">Inbound Call</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Sales Queue • {i * 2} hours ago</p>
                             </div>
                         </div>
                         <div className="flex items-center gap-6">
                             <div className="text-right">
                                <p className="text-xs font-bold text-slate-900 dark:text-white">12m 45s</p>
                                <p className="text-[10px] text-slate-500 uppercase tracking-wide">Duration</p>
                             </div>
                             <div className="flex gap-2">
                                <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded text-slate-600 dark:text-slate-300">Recording</span>
                                <span className="text-[10px] font-bold px-2 py-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 rounded border border-emerald-100 dark:border-emerald-900/30">Resolved</span>
                             </div>
                         </div>
                      </div>
                   ))}
                </div>
             </div>

          </div>
        </div>
      </div>
    </div>
  );
};
