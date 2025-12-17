
import React, { useState } from 'react';
import { Search, Filter, Download, User, Shield, CheckCircle2, XCircle, MoreHorizontal, Plus, Edit2, Trash2, Key, Lock, Eye, Check, ChevronDown, RefreshCw, Mail, Clock } from 'lucide-react';

interface Permission {
  id: string;
  name: string;
  description: string;
}

interface RoleDefinition {
  id: string;
  name: string;
  description: string;
  permissions: string[]; // IDs of permissions
  usersCount: number;
  color: string;
}

interface CorporateUser {
  id: string;
  name: string;
  email: string;
  roleId: string;
  status: 'Active' | 'Suspended' | 'Pending';
  lastActive: string;
  avatar: string;
  twoFactorEnabled: boolean;
}

interface CompanyRolesProfile {
  id: string;
  name: string;
  industry: string;
  users: CorporateUser[];
  roles: RoleDefinition[];
}

export const CorporateUserRolesPage: React.FC = () => {
  // Mock Permissions
  const allPermissions: Permission[] = [
    { id: 'view_financials', name: 'View Financials', description: 'Access to balance sheets and P&L' },
    { id: 'approve_payments', name: 'Approve Payments', description: 'Authorize outgoing transactions' },
    { id: 'manage_users', name: 'Manage Users', description: 'Create and delete user accounts' },
    { id: 'edit_settings', name: 'Edit Settings', description: 'Modify company profile and configuration' },
    { id: 'view_documents', name: 'View Documents', description: 'Access legal and corporate documents' },
    { id: 'trade_finance', name: 'Trade Finance', description: 'Access to factoring and loans' },
  ];

  // Mock Data
  const companies: CompanyRolesProfile[] = [
    {
      id: '1',
      name: 'TechNova Solutions Ltd.',
      industry: 'Technology',
      users: [
        { id: 'U1', name: 'Sarah Jenkins', email: 'sarah.j@technova.io', roleId: 'admin', status: 'Active', lastActive: '2 mins ago', avatar: 'https://picsum.photos/100/100?random=1', twoFactorEnabled: true },
        { id: 'U2', name: 'Marcus Thorne', email: 'm.thorne@technova.io', roleId: 'editor', status: 'Active', lastActive: '4 hours ago', avatar: 'https://picsum.photos/100/100?random=2', twoFactorEnabled: true },
        { id: 'U3', name: 'Emily Davis', email: 'emily.d@technova.io', roleId: 'viewer', status: 'Suspended', lastActive: '2 weeks ago', avatar: 'https://picsum.photos/100/100?random=3', twoFactorEnabled: false },
        { id: 'U4', name: 'John Doe', email: 'j.doe@technova.io', roleId: 'finance', status: 'Pending', lastActive: 'Never', avatar: 'https://picsum.photos/100/100?random=4', twoFactorEnabled: false },
      ],
      roles: [
        { id: 'admin', name: 'Administrator', description: 'Full access to all features', permissions: ['view_financials', 'approve_payments', 'manage_users', 'edit_settings', 'view_documents', 'trade_finance'], usersCount: 1, color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
        { id: 'editor', name: 'Editor', description: 'Can edit settings but not manage users', permissions: ['view_financials', 'edit_settings', 'view_documents'], usersCount: 1, color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
        { id: 'finance', name: 'Finance Manager', description: 'Focused on payments and reports', permissions: ['view_financials', 'approve_payments', 'trade_finance'], usersCount: 1, color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' },
        { id: 'viewer', name: 'Viewer', description: 'Read-only access', permissions: ['view_financials', 'view_documents'], usersCount: 1, color: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400' },
      ]
    },
    {
      id: '2',
      name: 'GreenLeaf Logistics',
      industry: 'Logistics',
      users: [
        { id: 'U5', name: 'Michael Chen', email: 'm.chen@greenleaf.com', roleId: 'admin', status: 'Active', lastActive: '10 mins ago', avatar: 'https://picsum.photos/100/100?random=5', twoFactorEnabled: true },
        { id: 'U6', name: 'Lisa Ray', email: 'lisa.r@greenleaf.com', roleId: 'viewer', status: 'Active', lastActive: '1 day ago', avatar: 'https://picsum.photos/100/100?random=6', twoFactorEnabled: true }
      ],
      roles: [
        { id: 'admin', name: 'Administrator', description: 'Full access', permissions: ['view_financials', 'approve_payments', 'manage_users', 'edit_settings'], usersCount: 1, color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
        { id: 'viewer', name: 'Logistics Viewer', description: 'View only access', permissions: ['view_documents'], usersCount: 1, color: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400' }
      ]
    },
    {
      id: '3',
      name: 'Quantum Dynamics',
      industry: 'Manufacturing',
      users: [
          { id: 'U7', name: 'Robert Ford', email: 'r.ford@quantum.inc', roleId: 'admin', status: 'Active', lastActive: 'Just now', avatar: 'https://picsum.photos/100/100?random=7', twoFactorEnabled: true }
      ],
      roles: [
          { id: 'admin', name: 'Master Admin', description: 'Root access', permissions: ['view_financials', 'approve_payments', 'manage_users', 'edit_settings', 'view_documents', 'trade_finance'], usersCount: 1, color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' }
      ]
    }
  ];

  const [selectedCompany, setSelectedCompany] = useState<CompanyRolesProfile>(companies[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState<'users' | 'roles'>('users');
  const [userFilter, setUserFilter] = useState("All");
  
  // Modal States
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [newUserForm, setNewUserForm] = useState({ name: '', email: '', roleId: 'viewer' });
  const [expandedRoleId, setExpandedRoleId] = useState<string | null>(null);

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCompany = (company: CompanyRolesProfile) => {
    setSelectedCompany(company);
    setSearchTerm("");
    setShowDropdown(false);
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: CorporateUser = {
        id: `U-${Date.now()}`,
        name: newUserForm.name,
        email: newUserForm.email,
        roleId: newUserForm.roleId,
        status: 'Pending',
        lastActive: 'Never',
        avatar: `https://ui-avatars.com/api/?name=${newUserForm.name}&background=random`,
        twoFactorEnabled: false
    };
    
    // Update local state (mock)
    const updatedCompany = { ...selectedCompany, users: [...selectedCompany.users, newUser] };
    setSelectedCompany(updatedCompany);
    setIsAddUserModalOpen(false);
    setNewUserForm({ name: '', email: '', roleId: 'viewer' });
  };

  const filteredUsers = selectedCompany.users.filter(u => userFilter === 'All' || u.status === userFilter);

  const getStatusBadge = (status: string) => {
      switch(status) {
          case 'Active': return <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"><CheckCircle2 size={12} /> Active</span>;
          case 'Suspended': return <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800"><XCircle size={12} /> Suspended</span>;
          case 'Pending': return <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800"><Clock size={12} /> Pending</span>;
          default: return null;
      }
  };

  const getRoleName = (roleId: string) => {
      return selectedCompany.roles.find(r => r.id === roleId)?.name || roleId;
  };

  const getRoleColor = (roleId: string) => {
      return selectedCompany.roles.find(r => r.id === roleId)?.color || 'bg-slate-100 text-slate-700';
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-2 space-y-6">
      
      {/* Add User Modal */}
      {isAddUserModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setIsAddUserModalOpen(false)}>
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md p-6 border border-slate-200 dark:border-slate-700" onClick={e => e.stopPropagation()}>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Add New User</h3>
                  <form onSubmit={handleAddUser} className="space-y-4">
                      <div>
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1.5">Full Name</label>
                          <input 
                              type="text" 
                              required
                              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                              value={newUserForm.name}
                              onChange={e => setNewUserForm({...newUserForm, name: e.target.value})}
                          />
                      </div>
                      <div>
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1.5">Email Address</label>
                          <input 
                              type="email" 
                              required
                              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                              value={newUserForm.email}
                              onChange={e => setNewUserForm({...newUserForm, email: e.target.value})}
                          />
                      </div>
                      <div>
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1.5">Role</label>
                          <select 
                              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                              value={newUserForm.roleId}
                              onChange={e => setNewUserForm({...newUserForm, roleId: e.target.value})}
                          >
                              {selectedCompany.roles.map(role => (
                                  <option key={role.id} value={role.id}>{role.name}</option>
                              ))}
                          </select>
                      </div>
                      <button type="submit" className="w-full py-2.5 bg-indigo-600 text-white rounded-lg font-bold text-sm hover:bg-indigo-700 transition-colors shadow-sm">Send Invitation</button>
                  </form>
              </div>
          </div>
      )}

      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <User className="text-indigo-500" /> User Roles & Rights
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
             Manage access control, user permissions, and security settings.
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto relative z-20">
            <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search company..." 
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowDropdown(true);
                    }}
                    onFocus={() => setShowDropdown(true)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-slate-900 dark:text-white"
                />
                
                {showDropdown && (
                    <>
                        <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)}></div>
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden z-20 max-h-60 overflow-y-auto">
                            {filteredCompanies.length > 0 ? (
                                filteredCompanies.map(comp => (
                                    <button
                                        key={comp.id}
                                        onClick={() => handleSelectCompany(comp)}
                                        className="w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 border-b border-slate-100 dark:border-slate-800 last:border-0 flex justify-between items-center group transition-colors"
                                    >
                                        <div>
                                            <p className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{comp.name}</p>
                                            <p className="text-xs text-slate-500">{comp.industry}</p>
                                        </div>
                                        {selectedCompany.id === comp.id && <Check size={16} className="text-indigo-600 dark:text-indigo-400" />}
                                    </button>
                                ))
                            ) : (
                                <div className="p-4 text-center text-slate-500 text-sm">No companies found</div>
                            )}
                        </div>
                    </>
                )}
            </div>
            
            <button className="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">
                <Download size={18} />
            </button>
        </div>
      </div>

      {/* Tabs & Stats */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
           
           {/* Left Sidebar Stats */}
           <div className="w-full lg:w-72 flex flex-col gap-4">
               <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                   <h3 className="font-bold text-slate-900 dark:text-white mb-4">Overview</h3>
                   <div className="space-y-4">
                       <div className="flex justify-between items-center">
                           <span className="text-sm text-slate-500">Total Users</span>
                           <span className="font-bold text-slate-900 dark:text-white">{selectedCompany.users.length}</span>
                       </div>
                       <div className="flex justify-between items-center">
                           <span className="text-sm text-slate-500">Active</span>
                           <span className="font-bold text-emerald-600">{selectedCompany.users.filter(u => u.status === 'Active').length}</span>
                       </div>
                       <div className="flex justify-between items-center">
                           <span className="text-sm text-slate-500">Pending</span>
                           <span className="font-bold text-amber-600">{selectedCompany.users.filter(u => u.status === 'Pending').length}</span>
                       </div>
                   </div>
               </div>

               <div className="bg-indigo-600 text-white p-5 rounded-2xl shadow-lg shadow-indigo-200 dark:shadow-none">
                   <h3 className="font-bold mb-2 flex items-center gap-2"><Shield size={18}/> Admin Tip</h3>
                   <p className="text-xs text-indigo-100 leading-relaxed mb-3">
                       Ensure at least two users have Admin privileges to prevent lockout scenarios.
                   </p>
                   <button className="text-xs font-bold bg-white text-indigo-600 px-3 py-1.5 rounded-lg hover:bg-indigo-50 transition-colors">
                       Manage Admins
                   </button>
               </div>
           </div>

           {/* Main Content Area */}
           <div className="flex-1 w-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col overflow-hidden min-h-[500px]">
               {/* Tabs Header */}
               <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 px-6 py-2">
                   <div className="flex gap-6">
                       <button 
                           onClick={() => setActiveTab('users')}
                           className={`py-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'users' ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                       >
                           Users
                       </button>
                       <button 
                           onClick={() => setActiveTab('roles')}
                           className={`py-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'roles' ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                       >
                           Role Definitions
                       </button>
                   </div>
                   {activeTab === 'users' && (
                       <button 
                            onClick={() => setIsAddUserModalOpen(true)}
                            className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 transition-colors shadow-sm"
                       >
                           <Plus size={14} /> Add User
                       </button>
                   )}
               </div>

               {/* Tab Content */}
               <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50 dark:bg-slate-900/50">
                   
                   {/* Users Tab */}
                   {activeTab === 'users' && (
                       <div className="space-y-4">
                           {/* Filter Row */}
                           <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
                               {['All', 'Active', 'Suspended', 'Pending'].map(filter => (
                                   <button 
                                       key={filter}
                                       onClick={() => setUserFilter(filter)}
                                       className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                                           userFilter === filter 
                                           ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-600 shadow-sm' 
                                           : 'border-transparent text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                                       }`}
                                   >
                                       {filter}
                                   </button>
                               ))}
                           </div>

                           <div className="space-y-3">
                               {filteredUsers.map(user => (
                                   <div key={user.id} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow group flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                       <div className="flex items-center gap-4">
                                           <div className="relative">
                                               <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700" />
                                               <div className={`absolute -bottom-1 -right-1 p-0.5 bg-white dark:bg-slate-800 rounded-full ${user.twoFactorEnabled ? 'text-emerald-500' : 'text-slate-300'}`}>
                                                   {user.twoFactorEnabled ? <Shield size={12} fill="currentColor" /> : <Shield size={12} />}
                                               </div>
                                           </div>
                                           <div>
                                               <h4 className="font-bold text-sm text-slate-900 dark:text-white">{user.name}</h4>
                                               <div className="flex items-center gap-2 text-xs text-slate-500">
                                                   <span className="flex items-center gap-1"><Mail size={10} /> {user.email}</span>
                                               </div>
                                           </div>
                                       </div>
                                       
                                       <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${getRoleColor(user.roleId)}`}>
                                                {getRoleName(user.roleId)}
                                            </span>
                                            
                                            <div className="flex items-center gap-4">
                                                <div className="text-right hidden sm:block">
                                                    {getStatusBadge(user.status)}
                                                    <p className="text-[10px] text-slate-400 mt-1">Last active: {user.lastActive}</p>
                                                </div>
                                                
                                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded transition-colors" title="Edit User">
                                                        <Edit2 size={16} />
                                                    </button>
                                                    <button className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded transition-colors" title="Reset Password">
                                                        <Key size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                       </div>
                                   </div>
                               ))}
                           </div>
                       </div>
                   )}

                   {/* Roles Tab */}
                   {activeTab === 'roles' && (
                       <div className="space-y-4">
                           {selectedCompany.roles.map(role => {
                               const isExpanded = expandedRoleId === role.id;
                               
                               return (
                                   <div key={role.id} className={`bg-white dark:bg-slate-800 rounded-xl border transition-all ${isExpanded ? 'border-indigo-500 ring-1 ring-indigo-500/20 shadow-md' : 'border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700'}`}>
                                       <div 
                                          className="p-4 flex items-center justify-between cursor-pointer"
                                          onClick={() => setExpandedRoleId(isExpanded ? null : role.id)}
                                       >
                                           <div className="flex items-center gap-4">
                                               <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold ${role.color}`}>
                                                   {role.name.charAt(0)}
                                               </div>
                                               <div>
                                                   <h4 className="font-bold text-sm text-slate-900 dark:text-white">{role.name}</h4>
                                                   <p className="text-xs text-slate-500">{role.description}</p>
                                               </div>
                                           </div>
                                           <div className="flex items-center gap-4">
                                               <span className="text-xs text-slate-500 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">{role.usersCount} Users</span>
                                               <ChevronDown size={16} className={`text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                                           </div>
                                       </div>
                                       
                                       {isExpanded && (
                                           <div className="px-4 pb-4 pt-0 border-t border-slate-100 dark:border-slate-700">
                                               <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wide mt-4 mb-3">Permissions</h5>
                                               <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                   {allPermissions.map(perm => {
                                                       const hasPerm = role.permissions.includes(perm.id);
                                                       return (
                                                           <div key={perm.id} className={`flex items-start gap-2 p-2 rounded-lg border ${hasPerm ? 'bg-indigo-50 dark:bg-indigo-900/10 border-indigo-100 dark:border-indigo-900/30' : 'bg-slate-50 dark:bg-slate-900/30 border-transparent opacity-60'}`}>
                                                               <div className={`mt-0.5 ${hasPerm ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`}>
                                                                   {hasPerm ? <CheckCircle2 size={14} /> : <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-300"></div>}
                                                               </div>
                                                               <div>
                                                                   <p className={`text-xs font-bold ${hasPerm ? 'text-indigo-900 dark:text-indigo-200' : 'text-slate-500'}`}>{perm.name}</p>
                                                                   <p className="text-[10px] text-slate-500 dark:text-slate-400">{perm.description}</p>
                                                               </div>
                                                           </div>
                                                       );
                                                   })}
                                               </div>
                                               <div className="mt-4 flex justify-end">
                                                   <button className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
                                                       <Edit2 size={12} /> Edit Permissions
                                                   </button>
                                               </div>
                                           </div>
                                       )}
                                   </div>
                               );
                           })}
                       </div>
                   )}
               </div>
           </div>
      </div>
    </div>
  );
};