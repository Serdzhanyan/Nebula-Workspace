
import React from 'react';
import { User, Settings, LogOut, HelpCircle, Shield } from 'lucide-react';

interface ProfileMenuProps {
  onClose: () => void;
  onViewProfile: () => void;
  onViewSettings: () => void;
  onLogout: () => void;
  status: 'online' | 'busy' | 'offline';
  onStatusChange: (status: 'online' | 'busy' | 'offline') => void;
}

export const ProfileMenu: React.FC<ProfileMenuProps> = ({ 
  onClose, 
  onViewProfile,
  onViewSettings, 
  onLogout,
  status,
  onStatusChange
}) => {
  return (
    <>
      {/* Backdrop to close on click outside */}
      <div className="fixed inset-0 z-40" onClick={onClose}></div>
      
      <div className="absolute top-16 right-0 w-72 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
        {/* User Info Header */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
           <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                 <img src="https://picsum.photos/100/100?random=user" alt="Alex" className="w-full h-full object-cover"/>
              </div>
              <div>
                 <h4 className="font-bold text-slate-900 dark:text-white leading-tight">Alex Johnson</h4>
                 <p className="text-xs text-slate-500 dark:text-slate-400">alex.j@nebula.com</p>
              </div>
           </div>
           
           {/* Status Selector */}
           <div className="flex bg-white dark:bg-slate-900 rounded-lg p-1 border border-slate-200 dark:border-slate-700">
              {(['online', 'busy', 'offline'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => onStatusChange(s)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${
                    status === s 
                    ? s === 'online' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300' 
                    : s === 'busy' ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'
                    : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                  }`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full ${
                    s === 'online' ? 'bg-emerald-500' : s === 'busy' ? 'bg-red-500' : 'bg-slate-400'
                  }`} />
                  {s}
                </button>
              ))}
           </div>
        </div>

        {/* Menu Items */}
        <div className="p-2 space-y-1">
           <button 
             onClick={() => { onViewProfile(); onClose(); }}
             className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-xl transition-colors text-left"
           >
              <User size={18} className="text-slate-400" /> My Profile
           </button>
           <button 
             onClick={() => { onViewSettings(); onClose(); }}
             className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-xl transition-colors text-left"
           >
              <Settings size={18} className="text-slate-400" /> Account Settings
           </button>
        </div>
        
        <div className="h-px bg-slate-100 dark:bg-slate-700 mx-4 my-1"></div>

        <div className="p-2 space-y-1">
            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-xl transition-colors text-left">
              <Shield size={18} className="text-slate-400" /> Privacy & Security
            </button>
             <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-xl transition-colors text-left">
              <HelpCircle size={18} className="text-slate-400" /> Help & Support
            </button>
        </div>

        <div className="p-2 border-t border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
           <button 
             onClick={onLogout}
             className="w-full flex items-center gap-3 px-3 py-2 text-sm font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-colors text-left"
           >
              <LogOut size={18} /> Sign Out
           </button>
        </div>
      </div>
    </>
  );
};
