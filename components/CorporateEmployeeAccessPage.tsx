
import React, { useState, useMemo } from 'react';
/* Added missing icon imports: Edit2, RefreshCw, and Users */
import { Search, Filter, Download, UserPlus, Shield, CheckCircle2, XCircle, MoreHorizontal, Clock, Mail, ShieldCheck, Key, Eye, Trash2, ChevronDown, Check, X, Smartphone, Globe, Briefcase, Activity, Edit2, RefreshCw, Users } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

interface UserPermission {
  id: string;
  name: string;
  enabled: boolean;
}

interface CorporateEmployee {
  id: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'Finance Manager' | 'HR Lead' | 'Standard User' | 'Auditor';
  status: 'Active' | 'Pending' | 'Suspended';
  mfaEnabled: boolean;
  lastActive: string;
  avatar: string;
  permissions: UserPermission[];
}

interface CompanyAccessProfile {
  id: string;
  name: string;
  industry: string;
  totalUsers: number;
  adminCount: number;
  pendingInvites: number;
  mfaAdoption: number;
  employees: CorporateEmployee[];
}

export const CorporateEmployeeAccessPage: React.FC = () => {
  // Mock Data
  const companies: CompanyAccessProfile[] = [
    {
      id: '1',
      name: 'TechNova Solutions Ltd.',
      industry: 'Technology',
      totalUsers: 24,
      adminCount: 3,
      pendingInvites: 2,
      mfaAdoption: 92,
      employees: [
        { 
          id: 'U-101', 
          name: 'Sarah Jenkins', 
          email: 'sarah.j@technova.io', 
          role: 'Super Admin', 
          status: 'Active', 
          mfaEnabled: true, 
          lastActive: 'Now', 
          avatar: 'https://picsum.photos/100/100?random=50',
          permissions: [
            { id: 'p1', name: 'Manage Payments', enabled: true },
            { id: 'p2', name: 'Edit Structure', enabled: true },
            { id: 'p3', name: 'User Provisioning', enabled: true },
            { id: 'p4', name: 'Audit Logs', enabled: true }
          ]
        },
        { 
          id: 'U-102', 
          name: 'Marcus Thorne', 
          email: 'm.thorne@technova.io', 
          role: 'Finance Manager', 
          status: 'Active', 
          mfaEnabled: true, 
          lastActive: '4h ago', 
          avatar: 'https://picsum.photos/100/100?random=51',
          permissions: [
            { id: 'p1', name: 'Manage Payments', enabled: true },
            { id: 'p2', name: 'Edit Structure', enabled: false },
            { id: 'p3', name: 'User Provisioning', enabled: false },
            { id: 'p4', name: 'Audit Logs', enabled: true }
          ]
        },
        { 
          id: 'U-103', 
          name: 'Emma Watson', 
          email: 'e.watson@technova.io', 
          role: 'Standard User', 
          status: 'Pending', 
          mfaEnabled: false, 
          lastActive: '-', 
          avatar: 'https://picsum.photos/100/100?random=52',
          permissions: [
            { id: 'p1', name: 'Manage Payments', enabled: false },
            { id: 'p2', name: 'Edit Structure', enabled: false },
            { id: 'p3', name: 'User Provisioning', enabled: false },
            { id: 'p4', name: 'Audit Logs', enabled: false }
          ]
        }
      ]
    },
    {
      id: '2',
      name: 'GreenLeaf Logistics',
      industry: 'Logistics',
      totalUsers: 15,
      adminCount: 2,
      pendingInvites: 0,
      mfaAdoption: 85,
      employees: [
        { 
          id: 'U-201', 
          name: 'Michael Chen', 
          email: 'm.chen@greenleaf.com', 
          role: 'Super Admin', 
          status: 'Active', 
          mfaEnabled: true, 
          lastActive: '1d ago', 
          avatar: 'https://picsum.photos/100/100?random=53',
          permissions: [{ id: 'p1', name: 'Full Access', enabled: true }]
        }
      ]
    },
    {
      id: '3',
      name: 'Quantum Dynamics',
      industry: 'Manufacturing',
      totalUsers: 8,
      adminCount: 1,
      pendingInvites: 5,
      mfaAdoption: 60,
      employees: []
    }
  ];

  const [selectedCompany, setSelectedCompany] = useState<CompanyAccessProfile>(companies[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filterRole, setFilterRole] = useState("All");
  const [selectedUser, setSelectedUser] = useState<CorporateEmployee | null>(companies[0].employees[0] || null);

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredEmployees = useMemo(() => {
    return selectedCompany.employees.filter(e => 
      filterRole === 'All' || e.role === filterRole
    );
  }, [selectedCompany, filterRole]);

  const handleSelectCompany = (company: CompanyAccessProfile) => {
    setSelectedCompany(company);
    setSearchTerm("");
    setShowDropdown(false);
    setSelectedUser(company.employees.length > 0 ? company.employees[0] : null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
      case 'Pending': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800';
      case 'Suspended': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const roleDistributionData = [
    { name: 'Admins', value: selectedCompany.employees.filter(e => e.role.includes('Admin')).length, color: '#6366f1' },
    { name: 'Finance', value: selectedCompany.employees.filter(e => e.role === 'Finance Manager').length, color: '#10b981' },
    { name: 'Standard', value: selectedCompany.employees.filter(e => e.role === 'Standard User').length, color: '#3b82f6' },
    { name: 'Other', value: selectedCompany.employees.filter(e => !['Super Admin', 'Finance Manager', 'Standard User'].includes(e.role)).length, color: '#f59e0b' },
  ].filter(d => d.value > 0);

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-2 space-y-6">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="text-indigo-500" /> Employee Access Control
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
             Provision users, manage identity roles, and audit security compliance across the corporate group.
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto relative z-20">
            <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search merchant or merchant ID..." 
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowDropdown(true);
                    }}
                    onFocus={() => setShowDropdown(true)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-slate-900 dark:text-white transition-all shadow-sm focus:bg-white dark:focus:bg-slate-900"
                />
                
                {showDropdown && (
                    <>
                        <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)}></div>
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden z-20 max-h-60 overflow-y-auto animate-in zoom-in-95 duration-200">
                            {filteredCompanies.length > 0 ? (
                                filteredCompanies.map(comp => (
                                    <button
                                        key={comp.id}
                                        onClick={() => handleSelectCompany(comp)}
                                        className="w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 border-b border-slate-100 dark:border-slate-800 last:border-0 flex justify-between items-center group transition-colors"
                                    >
                                        <div>
                                            <p className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{comp.name}</p>
                                            <p className="text-xs text-slate-500">Users: {comp.totalUsers} • MFA: {comp.mfaAdoption}%</p>
                                        </div>
                                        {selectedCompany.id === comp.id && <Check size={16} className="text-indigo-600 dark:text-indigo-400" />}
                                    </button>
                                ))
                            ) : (
                                <div className="p-4 text-center text-slate-500 text-sm">No merchants found</div>
                            )}
                        </div>
                    </>
                )}
            </div>
            
            <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 dark:shadow-none">
                <UserPlus size={18} /> Invite User
            </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Total Authorized Users</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedCompany.totalUsers}</h3>
              <p className="text-xs text-emerald-500 font-medium mt-1 flex items-center gap-1"><Activity size={12}/> {selectedCompany.adminCount} Super Admins</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Pending Invites</p>
              <h3 className={`text-2xl font-bold ${selectedCompany.pendingInvites > 0 ? 'text-amber-500' : 'text-slate-900 dark:text-white'}`}>{selectedCompany.pendingInvites}</h3>
              <p className="text-xs text-slate-400 mt-1">Awaiting activation</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">MFA Enforcement</p>
              <h3 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{selectedCompany.mfaAdoption}%</h3>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-indigo-500" style={{ width: `${selectedCompany.mfaAdoption}%` }}></div>
              </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Access Logs (24h)</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">128 Sessions</h3>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1"><Clock size={12}/> Monitoring active</p>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
          
          {/* Left Column: User Directory */}
          <div className="lg:col-span-2 flex flex-col gap-4 overflow-y-auto pr-2 pb-10">
              <div className="flex justify-between items-center mb-2 px-1">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">Active Directory</h3>
                  <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                      {['All', 'Super Admin', 'Finance Manager', 'Standard User'].map(role => (
                          <button
                            key={role}
                            onClick={() => setFilterRole(role)}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                filterRole === role 
                                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-sm' 
                                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                            }`}
                          >
                              {role === 'Standard User' ? 'Users' : role === 'Super Admin' ? 'Admins' : role === 'Finance Manager' ? 'Finance' : 'All'}
                          </button>
                      ))}
                  </div>
              </div>

              {filteredEmployees.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                      {filteredEmployees.map(user => (
                          <div 
                            key={user.id} 
                            onClick={() => setSelectedUser(user)}
                            className={`bg-white dark:bg-slate-900 p-5 rounded-2xl border transition-all cursor-pointer group hover:shadow-md relative overflow-hidden ${
                                selectedUser?.id === user.id 
                                ? 'border-indigo-500 ring-1 ring-indigo-500 shadow-md' 
                                : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700'
                            }`}
                          >
                              <div className="flex justify-between items-start mb-4">
                                  <div className="flex items-center gap-3">
                                      <img src={user.avatar} className="w-12 h-12 rounded-xl object-cover border border-slate-100 dark:border-slate-800 shadow-sm" alt={user.name} />
                                      <div>
                                          <h4 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{user.name}</h4>
                                          <p className="text-xs text-slate-500 font-medium mt-0.5">{user.email}</p>
                                      </div>
                                  </div>
                                  <div className="flex flex-col items-end gap-2">
                                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${getStatusColor(user.status)}`}>
                                          {user.status}
                                      </span>
                                      <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 uppercase">{user.role}</span>
                                  </div>
                              </div>

                              <div className="flex justify-between items-end">
                                  <div className="text-xs text-slate-500 space-y-1">
                                      <p>Security: <span className={`font-bold ${user.mfaEnabled ? 'text-emerald-500' : 'text-red-500'}`}>MFA {user.mfaEnabled ? 'Active' : 'Disabled'}</span></p>
                                      <div className="flex items-center gap-2 mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                         <Clock size={12} /> Last active {user.lastActive}
                                      </div>
                                  </div>
                                  <div className="flex gap-2">
                                      <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"><Edit2 size={16} /></button>
                                      <button className="p-2 text-slate-400 hover:text-red-600 transition-colors"><Trash2 size={16} /></button>
                                  </div>
                              </div>
                          </div>
                      ))}
                  </div>
              ) : (
                  <div className="text-center py-16 text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                      <Shield size={48} className="mx-auto mb-2 opacity-30" />
                      <p className="font-medium">No users found for this role filter.</p>
                  </div>
              )}
          </div>

          {/* Right Column: User Management Details */}
          <div className="space-y-6">
              {selectedUser ? (
                  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col h-full animate-in slide-in-from-right duration-300">
                      <div className="flex justify-between items-start mb-6">
                          <div>
                              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Access Profile</h3>
                              <p className="text-xs text-slate-500">ID: {selectedUser.id}</p>
                          </div>
                          <button onClick={() => setSelectedUser(null)} className="md:hidden text-slate-400 p-1 hover:bg-slate-100 rounded-lg transition-colors"><X size={20} /></button>
                      </div>

                      <div className="space-y-6 flex-1">
                          {/* Role Breakdown */}
                          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 flex flex-col gap-4 shadow-inner overflow-hidden relative">
                                <div className="flex justify-between items-center relative z-10">
                                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide">Role Distribution</h4>
                                    <span className="text-[10px] font-bold text-indigo-500 flex items-center gap-1">Enterprise Pool</span>
                                </div>
                                <div className="h-40 w-full relative z-10">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={roleDistributionData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={45}
                                                outerRadius={60}
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {roleDistributionData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                          </div>

                          {/* Permissions Checklist */}
                          <div>
                              <div className="flex justify-between items-center mb-3 px-1">
                                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Functional Permissions</h4>
                              </div>
                              <div className="space-y-2">
                                  {selectedUser.permissions.map(perm => (
                                      <div key={perm.id} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800/50 hover:border-indigo-200 transition-colors shadow-sm">
                                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{perm.name}</span>
                                          <div className={`w-8 h-4 rounded-full relative transition-colors ${perm.enabled ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-700'}`}>
                                              <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${perm.enabled ? 'left-4.5' : 'left-0.5'}`} />
                                          </div>
                                      </div>
                                  ))}
                              </div>
                          </div>

                          {/* Security Info */}
                          <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-900/40">
                               <div className="flex items-center justify-between mb-2">
                                   <div className="flex items-center gap-2">
                                       <ShieldCheck size={16} className="text-indigo-600 dark:text-indigo-400" />
                                       <span className="text-xs font-bold text-indigo-900 dark:text-indigo-200">Identity Security</span>
                                   </div>
                                   <span className={`text-[10px] font-bold ${selectedUser.mfaEnabled ? 'text-emerald-600' : 'text-red-500'} uppercase`}>
                                       MFA {selectedUser.mfaEnabled ? 'Verified' : 'Required'}
                                   </span>
                               </div>
                               <p className="text-xs text-indigo-700 dark:text-indigo-300 leading-relaxed">
                                   Device recognized in San Francisco, CA. Session expires in 12 hours.
                               </p>
                          </div>

                          {/* Action Bar */}
                          <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-700 space-y-3">
                              <div className="grid grid-cols-2 gap-3">
                                  <button className="py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all active:scale-95 shadow-sm flex items-center justify-center gap-2">
                                      <RefreshCw size={16} /> Reset Password
                                  </button>
                                  <button className="py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95 shadow-sm">
                                      View Audit Log
                                  </button>
                              </div>
                              <button className="w-full py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-sm">
                                  <Key size={16} /> Regenerate API Keys
                              </button>
                              <button className="w-full py-2.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm font-bold hover:bg-red-100 dark:hover:bg-red-900/40 transition-all active:scale-95 flex items-center justify-center gap-2 border border-red-100 dark:border-red-900/30">
                                  <XCircle size={16} /> Suspend Account
                              </button>
                          </div>
                      </div>
                  </div>
              ) : (
                  <div className="bg-slate-50 dark:bg-slate-900/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 p-8 flex flex-col items-center justify-center text-center h-full text-slate-400">
                      <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-800 mb-4 opacity-50 shadow-inner">
                        <Users size={48} />
                      </div>
                      <p className="font-medium">Select a user to manage their corporate permissions and security status</p>
                      <p className="text-xs mt-1">Role assignments and identity audit trails will appear here.</p>
                  </div>
              )}
          </div>
      </div>
    </div>
  );
};
