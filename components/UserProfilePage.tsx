
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Mail, Phone, MapPin, Building, Shield, Calendar, Briefcase, MoreHorizontal, UserCheck, UserX, Trash2, Save, X, Key, Loader2, RefreshCw } from 'lucide-react';
import { User } from './UserManagementPage'; // Importing User type from sibling

interface UserProfilePageProps {
  user: User;
  onBack: () => void;
}

export const UserProfilePage: React.FC<UserProfilePageProps> = ({ user, onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showActionsMenu, setShowActionsMenu] = useState(false);
  const actionsRef = useRef<HTMLDivElement>(null);

  // Initialize form data merging props with mock extended data
  const [formData, setFormData] = useState({
    ...user,
    location: 'San Francisco, CA',
    bio: 'Software engineer with a focus on scalable systems and cloud infrastructure.',
    phone: '+1 (555) 012-3456',
    joinDate: 'Oct 2022'
  });

  // Close actions menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (actionsRef.current && !actionsRef.current.contains(event.target as Node)) {
        setShowActionsMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSave = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setIsEditing(false);
    }, 1000);
  };

  const handleAction = (action: string) => {
    setShowActionsMenu(false);
    if (action === 'delete') {
        if(window.confirm(`Are you sure you want to delete ${formData.name}?`)) {
            onBack(); // Go back to list after delete
        }
    } else {
        alert(`${action} action triggered for ${formData.name}`);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-900/30';
      case 'inactive': return 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-700 dark:text-slate-400 dark:border-slate-600';
      case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-900/30';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
         <div>
            <button 
                onClick={onBack}
                className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors mb-2 text-sm font-medium"
            >
                <ArrowLeft size={16} /> Back to Users
            </button>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">User Profile</h2>
         </div>
         
         <div className="flex gap-3 relative" ref={actionsRef}>
             {isEditing ? (
                 <>
                    <button 
                        onClick={() => setIsEditing(false)}
                        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                    >
                        <X size={16} /> Cancel
                    </button>
                    <button 
                        onClick={handleSave}
                        disabled={loading}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200 dark:shadow-none disabled:opacity-70"
                    >
                        {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                 </>
             ) : (
                 <>
                    <div className="relative">
                        <button 
                            onClick={() => setShowActionsMenu(!showActionsMenu)}
                            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors shadow-sm"
                        >
                            <MoreHorizontal size={16} /> Actions
                        </button>
                        
                        {showActionsMenu && (
                            <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 py-1 z-30 animate-in fade-in zoom-in-95 duration-200">
                                <button 
                                    onClick={() => handleAction('reset_password')}
                                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors text-left"
                                >
                                    <Key size={14} className="text-slate-400" /> Reset Password
                                </button>
                                <button 
                                    onClick={() => handleAction('force_logout')}
                                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors text-left"
                                >
                                    <RefreshCw size={14} className="text-slate-400" /> Force Logout
                                </button>
                                <div className="h-px bg-slate-100 dark:bg-slate-700 my-1"></div>
                                <button 
                                    onClick={() => handleAction('delete')}
                                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors text-left"
                                >
                                    <Trash2 size={14} /> Delete User
                                </button>
                            </div>
                        )}
                    </div>
                    
                    <button 
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200 dark:shadow-none"
                    >
                        Edit User
                    </button>
                 </>
             )}
         </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 flex-1 overflow-y-auto pr-2">
         {/* Left Column - Card */}
         <div className="w-full lg:w-80 space-y-6">
             <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 flex flex-col items-center text-center shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800"></div>
                
                <div className="relative mt-8 mb-4">
                    <div className="w-28 h-28 rounded-full border-4 border-white dark:border-slate-800 shadow-md overflow-hidden bg-white">
                        <img src={formData.avatar} alt="Profile" className="w-full h-full object-cover" />
                    </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{formData.name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{formData.role}</p>

                <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border mb-6 ${getStatusColor(formData.status)}`}>
                    {formData.status}
                </div>

                {!isEditing && (
                    <div className="w-full space-y-3 pt-4 border-t border-slate-100 dark:border-slate-700">
                        {formData.status === 'active' ? (
                            <button className="w-full py-2 flex items-center justify-center gap-2 text-sm font-medium text-amber-600 bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/30 rounded-lg transition-colors">
                                <UserX size={16} /> Suspend Account
                            </button>
                        ) : (
                            <button className="w-full py-2 flex items-center justify-center gap-2 text-sm font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 rounded-lg transition-colors">
                                <UserCheck size={16} /> Activate Account
                            </button>
                        )}
                        <button className="w-full py-2 flex items-center justify-center gap-2 text-sm font-medium text-red-600 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors">
                            <Trash2 size={16} /> Delete User
                        </button>
                    </div>
                )}
             </div>
         </div>

         {/* Right Column - Info */}
         <div className="flex-1 space-y-6">
             <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
                 <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">User Details</h3>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                     <div>
                         <label className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 block mb-1.5">Full Name</label>
                         {isEditing ? (
                             <input 
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-900 dark:text-white"
                             />
                         ) : (
                             <div className="text-sm font-medium text-slate-900 dark:text-white py-2">{formData.name}</div>
                         )}
                     </div>
                     <div>
                         <label className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 block mb-1.5">Email Address</label>
                         {isEditing ? (
                             <div className="relative">
                                 <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                 <input 
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-900 dark:text-white"
                                 />
                             </div>
                         ) : (
                             <div className="flex items-center gap-2 text-sm font-medium text-slate-900 dark:text-white py-2">
                                 <Mail size={14} className="text-slate-400" /> {formData.email}
                             </div>
                         )}
                     </div>
                     <div>
                         <label className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 block mb-1.5">Department</label>
                         {isEditing ? (
                             <div className="relative">
                                 <Building size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                 <select 
                                    value={formData.department}
                                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                                    className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-900 dark:text-white appearance-none"
                                 >
                                    <option>Engineering</option>
                                    <option>Product</option>
                                    <option>Design</option>
                                    <option>Marketing</option>
                                    <option>Sales</option>
                                    <option>HR</option>
                                    <option>DevOps</option>
                                 </select>
                             </div>
                         ) : (
                             <div className="flex items-center gap-2 text-sm font-medium text-slate-900 dark:text-white py-2">
                                 <Building size={14} className="text-slate-400" /> {formData.department}
                             </div>
                         )}
                     </div>
                     <div>
                         <label className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 block mb-1.5">Role</label>
                         {isEditing ? (
                             <div className="relative">
                                 <Shield size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                 <select 
                                    value={formData.role}
                                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                                    className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-900 dark:text-white appearance-none"
                                 >
                                    <option>Admin</option>
                                    <option>Manager</option>
                                    <option>User</option>
                                 </select>
                             </div>
                         ) : (
                             <div className="flex items-center gap-2 text-sm font-medium text-slate-900 dark:text-white py-2">
                                 <Shield size={14} className="text-slate-400" /> {formData.role}
                             </div>
                         )}
                     </div>
                     <div>
                         <label className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 block mb-1.5">Phone</label>
                         {isEditing ? (
                             <div className="relative">
                                 <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                 <input 
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                    className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-900 dark:text-white"
                                 />
                             </div>
                         ) : (
                             <div className="flex items-center gap-2 text-sm font-medium text-slate-900 dark:text-white py-2">
                                 <Phone size={14} className="text-slate-400" /> {formData.phone}
                             </div>
                         )}
                     </div>
                     <div>
                         <label className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 block mb-1.5">Location</label>
                         {isEditing ? (
                             <div className="relative">
                                 <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                 <input 
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                                    className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-900 dark:text-white"
                                 />
                             </div>
                         ) : (
                             <div className="flex items-center gap-2 text-sm font-medium text-slate-900 dark:text-white py-2">
                                 <MapPin size={14} className="text-slate-400" /> {formData.location}
                             </div>
                         )}
                     </div>
                     <div className="md:col-span-2">
                         <label className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 block mb-1.5">Bio</label>
                         {isEditing ? (
                             <textarea 
                                value={formData.bio}
                                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                                className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none h-24 text-slate-900 dark:text-white"
                             />
                         ) : (
                             <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed py-2">
                                 {formData.bio}
                             </p>
                         )}
                     </div>
                 </div>

                 <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700 flex items-center gap-6">
                     <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                         <Calendar size={14} /> Joined {formData.joinDate}
                     </div>
                     <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                         <Briefcase size={14} /> Last Active: {formData.lastActive}
                     </div>
                 </div>
             </div>
         </div>
      </div>
    </div>
  );
};
