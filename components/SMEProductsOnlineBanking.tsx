
import React, { useState } from 'react';
import { Globe, UserPlus, Lock, Search, Check, Shield, Smartphone, Key, MoreHorizontal, Trash2, RefreshCw, X, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface BankingUser {
  id: string;
  name: string;
  role: 'Admin' | 'Viewer' | 'Approver' | 'Accountant';
  lastLogin: string;
  status: 'Active' | 'Locked' | 'Pending';
  hasToken: boolean;
}

interface CompanyData {
  id: string;
  name: string;
  settings: {
      twoFactor: boolean;
      apiAccess: boolean;
      ipRestriction: boolean;
  };
  users: BankingUser[];
}

export const SMEProductsOnlineBanking: React.FC = () => {
  // Mock Data
  const companiesList: CompanyData[] = [
      {
          id: '1',
          name: 'TechNova Solutions Ltd.',
          settings: { twoFactor: true, apiAccess: true, ipRestriction: false },
          users: [
              { id: 'USR-001', name: 'Sarah Jenkins', role: 'Admin', lastLogin: '2 mins ago', status: 'Active', hasToken: true },
              { id: 'USR-002', name: 'John Smith', role: 'Approver', lastLogin: 'Yesterday', status: 'Active', hasToken: true },
              { id: 'USR-003', name: 'External Auditor', role: 'Viewer', lastLogin: 'Oct 20, 2024', status: 'Locked', hasToken: false }
          ]
      },
      {
          id: '2',
          name: 'GreenLeaf Logistics',
          settings: { twoFactor: true, apiAccess: false, ipRestriction: true },
          users: [
              { id: 'USR-004', name: 'Michael Chen', role: 'Admin', lastLogin: '1 hour ago', status: 'Active', hasToken: true },
              { id: 'USR-005', name: 'Finance Dept', role: 'Accountant', lastLogin: '3 days ago', status: 'Pending', hasToken: false }
          ]
      },
      {
          id: '3',
          name: 'Quantum Dynamics',
          settings: { twoFactor: false, apiAccess: false, ipRestriction: false },
          users: [
              { id: 'USR-006', name: 'Robert Ford', role: 'Admin', lastLogin: '1 week ago', status: 'Active', hasToken: false }
          ]
      }
  ];

  const [selectedCompany, setSelectedCompany] = useState<CompanyData>(companiesList[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  
  // Modal State
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Viewer' });

  const filteredCompanies = companiesList.filter(c =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCompany = (comp: CompanyData) => {
      setSelectedCompany(comp);
      setSearchTerm("");
      setShowDropdown(false);
  };

  const handleAddUser = (e: React.FormEvent) => {
      e.preventDefault();
      const user: BankingUser = {
          id: `USR-${Date.now()}`,
          name: newUser.name,
          role: newUser.role as any,
          lastLogin: 'Never',
          status: 'Pending',
          hasToken: false
      };
      
      const updatedCompany = { ...selectedCompany, users: [...selectedCompany.users, user] };
      setSelectedCompany(updatedCompany);
      setShowAddUserModal(false);
      setNewUser({ name: '', email: '', role: 'Viewer' });
  };

  const toggleUserStatus = (userId: string) => {
      const updatedUsers = selectedCompany.users.map(u => 
          u.id === userId ? { ...u, status: u.status === 'Active' ? 'Locked' : 'Active' } : u
      );
      // Cast to fix type issue with 'Locked' | 'Active' vs string
      const updatedCompany = { ...selectedCompany, users: updatedUsers as BankingUser[] };
      setSelectedCompany(updatedCompany);
  };

  const toggleSetting = (setting: keyof typeof selectedCompany.settings) => {
      const updatedSettings = { ...selectedCompany.settings, [setting]: !selectedCompany.settings[setting] };
      setSelectedCompany({ ...selectedCompany, settings: updatedSettings });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 relative">
         {/* Search Bar */}
        <div className="relative z-20">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                    type="text"
                    placeholder="Search company for online banking settings..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowDropdown(true);
                    }}
                    onFocus={() => setShowDropdown(true)}
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-slate-900 dark:text-white"
                />
            </div>
            {showDropdown && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)}></div>
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden z-20">
                        {filteredCompanies.length > 0 ? (
                            filteredCompanies.map(comp => (
                                <button
                                    key={comp.id}
                                    onClick={() => handleSelectCompany(comp)}
                                    className="w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 border-b border-slate-100 dark:border-slate-800 last:border-0 flex justify-between items-center group transition-colors"
                                >
                                    <div>
                                        <p className="font-bold text-slate-900 dark:text-white text-sm">{comp.name}</p>
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

        {/* Add User Modal */}
        {showAddUserModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setShowAddUserModal(false)}>
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200 dark:border-slate-700" onClick={e => e.stopPropagation()}>
                    <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white">Grant Access</h3>
                        <button onClick={() => setShowAddUserModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20}/></button>
                    </div>
                    <form onSubmit={handleAddUser} className="p-6 space-y-4">
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Full Name</label>
                            <input 
                                type="text" 
                                required
                                value={newUser.name}
                                onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Email Address</label>
                            <input 
                                type="email" 
                                required
                                value={newUser.email}
                                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Access Role</label>
                            <select 
                                value={newUser.role}
                                onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="Admin">Admin (Full Access)</option>
                                <option value="Approver">Approver (Transactions)</option>
                                <option value="Accountant">Accountant (Reports Only)</option>
                                <option value="Viewer">Viewer (Read Only)</option>
                            </select>
                        </div>
                        <button type="submit" className="w-full py-2.5 bg-indigo-600 text-white rounded-lg font-bold text-sm hover:bg-indigo-700 mt-2">Grant Access</button>
                    </form>
                </div>
            </div>
        )}

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                    <Globe size={20} className="text-cyan-500" /> Online Banking Administration
                </h3>
            </div>
            
            {/* Security Settings Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700 flex justify-between items-start">
                    <div className="flex gap-3">
                        <div className="p-2 bg-white dark:bg-slate-800 rounded-lg text-emerald-600 dark:text-emerald-400 shadow-sm">
                            <Shield size={20} />
                        </div>
                        <div>
                            <p className="font-bold text-slate-900 dark:text-white text-sm">2-Factor Auth</p>
                            <p className="text-xs text-slate-500">{selectedCompany.settings.twoFactor ? 'Enforced for all' : 'Optional'}</p>
                        </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={selectedCompany.settings.twoFactor} onChange={() => toggleSetting('twoFactor')} />
                        <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-500"></div>
                    </label>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700 flex justify-between items-start">
                    <div className="flex gap-3">
                        <div className="p-2 bg-white dark:bg-slate-800 rounded-lg text-indigo-600 dark:text-indigo-400 shadow-sm">
                            <Key size={20} />
                        </div>
                        <div>
                            <p className="font-bold text-slate-900 dark:text-white text-sm">API Access</p>
                            <p className="text-xs text-slate-500">{selectedCompany.settings.apiAccess ? 'Enabled' : 'Disabled'}</p>
                        </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={selectedCompany.settings.apiAccess} onChange={() => toggleSetting('apiAccess')} />
                        <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                    </label>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700 flex justify-between items-start">
                    <div className="flex gap-3">
                        <div className="p-2 bg-white dark:bg-slate-800 rounded-lg text-amber-600 dark:text-amber-400 shadow-sm">
                            <Lock size={20} />
                        </div>
                        <div>
                            <p className="font-bold text-slate-900 dark:text-white text-sm">IP Restriction</p>
                            <p className="text-xs text-slate-500">{selectedCompany.settings.ipRestriction ? 'Whitelist Only' : 'Global Access'}</p>
                        </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={selectedCompany.settings.ipRestriction} onChange={() => toggleSetting('ipRestriction')} />
                        <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-amber-500"></div>
                    </label>
                </div>
            </div>
            
            {/* User List */}
            <div className="space-y-4">
                 <div className="flex justify-between items-end mb-2">
                     <h4 className="font-bold text-slate-900 dark:text-white text-sm">Authorized Users</h4>
                     <button 
                        onClick={() => setShowAddUserModal(true)}
                        className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                     >
                         <UserPlus size={14} /> Add User
                     </button>
                 </div>
                 
                 {selectedCompany.users.length > 0 ? (
                     selectedCompany.users.map((user) => (
                         <div key={user.id} className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                             <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-500">
                                     {user.name.substring(0, 2).toUpperCase()}
                                 </div>
                                 <div>
                                     <div className="flex items-center gap-2">
                                        <p className="font-bold text-sm text-slate-900 dark:text-white">{user.name}</p>
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                                            user.role === 'Admin' ? 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800' :
                                            'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600'
                                        }`}>
                                            {user.role}
                                        </span>
                                     </div>
                                     <p className="text-xs text-slate-500">Last login: {user.lastLogin}</p>
                                 </div>
                             </div>
                             
                             <div className="flex items-center gap-4">
                                 {user.hasToken ? (
                                    <span className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-full">
                                        <Smartphone size={12} /> Mobile Token
                                    </span>
                                 ) : (
                                    <span className="flex items-center gap-1 text-[10px] text-amber-600 dark:text-amber-400 font-bold bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-full">
                                        <AlertTriangle size={12} /> No Token
                                    </span>
                                 )}
                                 
                                 <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>
                                 
                                 <div className="flex items-center gap-2">
                                     <button 
                                        onClick={() => toggleUserStatus(user.id)}
                                        className={`p-2 rounded-lg transition-colors ${
                                            user.status === 'Active' 
                                            ? 'text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20' 
                                            : 'text-red-500 bg-red-50 dark:bg-red-900/20 hover:bg-red-100'
                                        }`}
                                        title={user.status === 'Active' ? 'Lock Account' : 'Unlock Account'}
                                     >
                                         <Lock size={16} />
                                     </button>
                                     <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors">
                                         <RefreshCw size={16} />
                                     </button>
                                 </div>
                             </div>
                         </div>
                     ))
                 ) : (
                     <div className="text-center py-12 text-slate-400 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-xl">
                         <Globe size={32} className="mx-auto mb-2 opacity-50" />
                         <p>No active online banking users found.</p>
                     </div>
                 )}
            </div>
        </div>
    </div>
  );
};
