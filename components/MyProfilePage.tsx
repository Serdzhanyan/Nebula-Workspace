
import React, { useState } from 'react';
import { ArrowLeft, Camera, Mail, Phone, MapPin, Building, Globe, Save, X, Calendar, Award, Briefcase, Lock } from 'lucide-react';

interface MyProfilePageProps {
  onBack: () => void;
  userStatus: string;
}

export const MyProfilePage: React.FC<MyProfilePageProps> = ({ onBack, userStatus }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Mock User Data State
  const [formData, setFormData] = useState({
    firstName: 'Alex',
    lastName: 'Johnson',
    role: 'Senior Product Manager',
    department: 'Product',
    email: 'alex.j@nebula.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Passionate about building products that users love. 10+ years of experience in SaaS and AI technologies. Always learning, always shipping.',
    website: 'www.alexjohnson.dev',
    joinDate: 'Oct 2021'
  });

  const handleSave = () => {
    setLoading(true);
    // Simulate API save
    setTimeout(() => {
        setLoading(false);
        setIsEditing(false);
    }, 1000);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
         <div>
            <button 
                onClick={onBack}
                className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors mb-2 text-sm font-medium"
            >
                <ArrowLeft size={16} /> Back to Dashboard
            </button>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">My Profile</h2>
         </div>
         
         <div className="flex gap-3">
            {isEditing ? (
                <>
                    <button 
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-medium text-sm"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleSave}
                        disabled={loading}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-sm shadow-indigo-200 dark:shadow-none"
                    >
                        {loading ? 'Saving...' : <><Save size={16} /> Save Changes</>}
                    </button>
                </>
            ) : (
                <button 
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors shadow-sm"
                >
                    Edit Profile
                </button>
            )}
         </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 flex-1 overflow-y-auto pr-2">
         {/* Left Column - Card & Stats */}
         <div className="w-full lg:w-80 space-y-6">
             <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 flex flex-col items-center text-center shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                
                <div className="relative mt-8 mb-4">
                    <div className="w-28 h-28 rounded-full border-4 border-white dark:border-slate-800 shadow-md overflow-hidden bg-white">
                        <img src="https://picsum.photos/100/100?random=user" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    {isEditing && (
                        <button className="absolute bottom-0 right-0 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors shadow-sm border-2 border-white dark:border-slate-800">
                            <Camera size={14} />
                        </button>
                    )}
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{formData.firstName} {formData.lastName}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{formData.role}</p>

                <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border mb-6 ${
                    userStatus === 'online' ? 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-900/30' : 
                    userStatus === 'busy' ? 'bg-red-50 text-red-600 border-red-100 dark:bg-red-900/20 dark:border-red-900/30' :
                    'bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600'
                }`}>
                    {userStatus}
                </div>

                <div className="w-full grid grid-cols-2 gap-4 border-t border-slate-100 dark:border-slate-700 pt-4">
                    <div>
                        <span className="block text-2xl font-bold text-slate-900 dark:text-white">42</span>
                        <span className="text-xs text-slate-500 uppercase font-semibold">Tasks Done</span>
                    </div>
                    <div>
                        <span className="block text-2xl font-bold text-slate-900 dark:text-white">8</span>
                        <span className="text-xs text-slate-500 uppercase font-semibold">Projects</span>
                    </div>
                </div>
             </div>

             <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
                 <h4 className="font-bold text-slate-900 dark:text-white mb-4">About Me</h4>
                 {isEditing ? (
                    <textarea 
                        value={formData.bio}
                        onChange={(e) => setFormData({...formData, bio: e.target.value})}
                        className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none h-32"
                    />
                 ) : (
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {formData.bio}
                    </p>
                 )}
                 
                 <div className="mt-6 space-y-3">
                     <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                         <Calendar size={16} className="text-slate-400" />
                         Joined {formData.joinDate}
                     </div>
                     <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                         <Building size={16} className="text-slate-400" />
                         {formData.department} Dept.
                     </div>
                     <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                         <MapPin size={16} className="text-slate-400" />
                         {formData.location}
                     </div>
                 </div>
             </div>
         </div>

         {/* Right Column - Forms */}
         <div className="flex-1 space-y-6">
             {/* Personal Information */}
             <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
                 <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Personal Information</h3>
                    <Lock size={16} className="text-slate-300" />
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                         <label className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">First Name</label>
                         {isEditing ? (
                             <input 
                                type="text" 
                                value={formData.firstName}
                                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                             />
                         ) : (
                             <div className="px-3 py-2 text-sm text-slate-800 dark:text-slate-200 font-medium">{formData.firstName}</div>
                         )}
                     </div>
                     <div className="space-y-2">
                         <label className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">Last Name</label>
                         {isEditing ? (
                             <input 
                                type="text" 
                                value={formData.lastName}
                                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                             />
                         ) : (
                             <div className="px-3 py-2 text-sm text-slate-800 dark:text-slate-200 font-medium">{formData.lastName}</div>
                         )}
                     </div>
                     <div className="space-y-2">
                         <label className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">Email Address</label>
                         {isEditing ? (
                             <div className="relative">
                                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input 
                                    type="email" 
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                />
                             </div>
                         ) : (
                             <div className="flex items-center gap-2 px-3 py-2 text-sm text-slate-800 dark:text-slate-200 font-medium">
                                 <Mail size={16} className="text-slate-400" /> {formData.email}
                             </div>
                         )}
                     </div>
                     <div className="space-y-2">
                         <label className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">Phone</label>
                         {isEditing ? (
                             <div className="relative">
                                <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input 
                                    type="tel" 
                                    value={formData.phone}
                                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                    className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                />
                             </div>
                         ) : (
                             <div className="flex items-center gap-2 px-3 py-2 text-sm text-slate-800 dark:text-slate-200 font-medium">
                                 <Phone size={16} className="text-slate-400" /> {formData.phone}
                             </div>
                         )}
                     </div>
                 </div>
             </div>

             {/* Professional Details */}
             <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
                 <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Role & Location</h3>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                         <label className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">Current Role</label>
                         {isEditing ? (
                             <div className="relative">
                                <Briefcase size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input 
                                    type="text" 
                                    value={formData.role}
                                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                                    className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                />
                             </div>
                         ) : (
                             <div className="flex items-center gap-2 px-3 py-2 text-sm text-slate-800 dark:text-slate-200 font-medium">
                                 <Briefcase size={16} className="text-slate-400" /> {formData.role}
                             </div>
                         )}
                     </div>
                     <div className="space-y-2">
                         <label className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">Department</label>
                         {isEditing ? (
                             <div className="relative">
                                <Building size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input 
                                    type="text" 
                                    value={formData.department}
                                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                                    className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                />
                             </div>
                         ) : (
                             <div className="flex items-center gap-2 px-3 py-2 text-sm text-slate-800 dark:text-slate-200 font-medium">
                                 <Building size={16} className="text-slate-400" /> {formData.department}
                             </div>
                         )}
                     </div>
                     <div className="space-y-2">
                         <label className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">Office Location</label>
                         {isEditing ? (
                             <div className="relative">
                                <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input 
                                    type="text" 
                                    value={formData.location}
                                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                                    className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                />
                             </div>
                         ) : (
                             <div className="flex items-center gap-2 px-3 py-2 text-sm text-slate-800 dark:text-slate-200 font-medium">
                                 <MapPin size={16} className="text-slate-400" /> {formData.location}
                             </div>
                         )}
                     </div>
                     <div className="space-y-2">
                         <label className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">Website / Portfolio</label>
                         {isEditing ? (
                             <div className="relative">
                                <Globe size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input 
                                    type="text" 
                                    value={formData.website}
                                    onChange={(e) => setFormData({...formData, website: e.target.value})}
                                    className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                />
                             </div>
                         ) : (
                             <div className="flex items-center gap-2 px-3 py-2 text-sm text-indigo-600 dark:text-indigo-400 font-medium underline">
                                 <Globe size={16} className="text-slate-400 no-underline" /> {formData.website}
                             </div>
                         )}
                     </div>
                 </div>
             </div>

             {/* Recent Badges / Awards */}
             <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Badges & Recognition</h3>
                  <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/30 rounded-full">
                          <Award size={16} className="text-amber-500" />
                          <span className="text-xs font-bold text-amber-700 dark:text-amber-300">5 Year Anniv.</span>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-900/30 rounded-full">
                          <Award size={16} className="text-indigo-500" />
                          <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300">Top Performer Q3</span>
                      </div>
                       <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/30 rounded-full">
                          <Award size={16} className="text-emerald-500" />
                          <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">Mentor</span>
                      </div>
                  </div>
             </div>
         </div>
      </div>
    </div>
  );
};
