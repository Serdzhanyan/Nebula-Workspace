
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Search, Plus, Filter, MoreHorizontal, Mail, Shield, CheckCircle2, XCircle, Clock, User as UserIcon, X, Loader2, ChevronDown, Eye, Edit2, Ban, Trash2 } from 'lucide-react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: 'active' | 'inactive' | 'pending';
  lastActive: string;
  avatar: string;
}

interface UserManagementPageProps {
  onBack: () => void;
  onUserClick?: (user: User) => void;
}

export const UserManagementPage: React.FC<UserManagementPageProps> = ({ onBack, onUserClick }) => {
  // State for Data
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'Alex Johnson', email: 'alex.j@nebula.com', role: 'Admin', department: 'Product', status: 'active', lastActive: 'Now', avatar: 'https://picsum.photos/100/100?random=user' },
    { id: '2', name: 'Sarah Lee', email: 'sarah.l@nebula.com', role: 'Manager', department: 'Marketing', status: 'active', lastActive: '10m ago', avatar: 'https://picsum.photos/100/100?random=1' },
    { id: '3', name: 'Mark Vos', email: 'mark.v@nebula.com', role: 'User', department: 'Engineering', status: 'active', lastActive: '1h ago', avatar: 'https://picsum.photos/100/100?random=2' },
    { id: '4', name: 'James D.', email: 'james.d@nebula.com', role: 'User', department: 'DevOps', status: 'inactive', lastActive: '2d ago', avatar: 'https://picsum.photos/100/100?random=4' },
    { id: '5', name: 'Emma Watson', email: 'emma.w@nebula.com', role: 'User', department: 'Sales', status: 'pending', lastActive: '-', avatar: 'https://picsum.photos/100/100?random=5' },
    { id: '6', name: 'Alice Chen', email: 'alice.c@nebula.com', role: 'Manager', department: 'Design', status: 'active', lastActive: '5h ago', avatar: 'https://picsum.photos/100/100?random=3' },
  ]);

  // State for Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'pending'>('all');
  const [deptFilter, setDeptFilter] = useState<string>('All Departments');
  const [showDeptDropdown, setShowDeptDropdown] = useState(false);

  // State for Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'User',
    department: 'Engineering'
  });

  // State for Row Actions Menu
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = () => setOpenMenuId(null);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  // Derived Data
  const departments = ['All Departments', ...Array.from(new Set(users.map(u => u.department)))];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesDept = deptFilter === 'All Departments' || user.department === deptFilter;
    return matchesSearch && matchesStatus && matchesDept;
  });

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.firstName || !newUser.lastName || !newUser.email) return;

    setIsSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
        const user: User = {
            id: Date.now().toString(),
            name: `${newUser.firstName} ${newUser.lastName}`,
            email: newUser.email,
            role: newUser.role,
            department: newUser.department,
            status: 'pending',
            lastActive: '-',
            avatar: `https://ui-avatars.com/api/?name=${newUser.firstName}+${newUser.lastName}&background=random`
        };

        setUsers([user, ...users]);
        setIsSubmitting(false);
        setShowAddModal(false);
        setNewUser({ firstName: '', lastName: '', email: '', role: 'User', department: 'Engineering' }); // Reset form
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'inactive': return 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400';
      case 'pending': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  const handleMenuClick = (e: React.MouseEvent, userId: string) => {
      e.stopPropagation();
      setOpenMenuId(openMenuId === userId ? null : userId);
  };

  const handleUserRowClick = (user: User) => {
      onUserClick?.(user);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col relative">
      
      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200 dark:border-slate-700" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-700">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Add New User</h3>
                    <button 
                        onClick={() => setShowAddModal(false)}
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>
                
                <form onSubmit={handleAddUser} className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">First Name</label>
                            <input 
                                required
                                type="text" 
                                value={newUser.firstName}
                                onChange={(e) => setNewUser({...newUser, firstName: e.target.value})}
                                placeholder="Jane"
                                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">Last Name</label>
                            <input 
                                required
                                type="text" 
                                value={newUser.lastName}
                                onChange={(e) => setNewUser({...newUser, lastName: e.target.value})}
                                placeholder="Doe"
                                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">Email Address</label>
                        <input 
                            required
                            type="email" 
                            value={newUser.email}
                            onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                            placeholder="jane.doe@nebula.com"
                            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">Role</label>
                            <select 
                                value={newUser.role}
                                onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                            >
                                <option value="User">User</option>
                                <option value="Manager">Manager</option>
                                <option value="Admin">Admin</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">Department</label>
                            <select 
                                value={newUser.department}
                                onChange={(e) => setNewUser({...newUser, department: e.target.value})}
                                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                            >
                                <option value="Engineering">Engineering</option>
                                <option value="Product">Product</option>
                                <option value="Design">Design</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Sales">Sales</option>
                                <option value="DevOps">DevOps</option>
                                <option value="HR">HR</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-4 flex items-center gap-3">
                        <button 
                            type="button"
                            onClick={() => setShowAddModal(false)}
                            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 px-4 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                            {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}
                            {isSubmitting ? 'Adding...' : 'Create User'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors mb-2 text-sm font-medium"
          >
            <ArrowLeft size={16} /> Back to Control Panel
          </button>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">User Management</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage employee access, roles, and status.</p>
        </div>
        
        <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200 dark:shadow-none"
        >
          <Plus size={18} /> Add New User
        </button>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 mb-6 shadow-sm flex flex-col md:flex-row gap-4 z-10">
        <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
                type="text" 
                placeholder="Search users by name or email..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900 focus:border-indigo-300 transition-all text-slate-800 dark:text-slate-200 placeholder-slate-400"
            />
        </div>
        
        <div className="flex gap-2 items-center">
            {/* Status Pills */}
            <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
                {(['all', 'active', 'pending', 'inactive'] as const).map(status => (
                    <button
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium capitalize border transition-all whitespace-nowrap ${
                            statusFilter === status 
                            ? 'bg-slate-100 text-slate-900 border-slate-200 dark:bg-slate-700 dark:text-white dark:border-slate-600' 
                            : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-transparent hover:bg-slate-50 dark:hover:bg-slate-700/50'
                        }`}
                    >
                        {status}
                    </button>
                ))}
            </div>

            <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>

            {/* Department Filter Dropdown */}
            <div className="relative" onClick={e => e.stopPropagation()}>
                <button 
                    onClick={() => setShowDeptDropdown(!showDeptDropdown)}
                    className="flex items-center gap-2 px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                    <Filter size={16} />
                    <span className="hidden sm:inline">{deptFilter}</span>
                    <ChevronDown size={14} className="text-slate-400" />
                </button>
                
                {showDeptDropdown && (
                    <>
                        <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 py-1 z-20 animate-in fade-in zoom-in-95 duration-200">
                            {departments.map((dept) => (
                                <button
                                    key={dept}
                                    onClick={() => {
                                        setDeptFilter(dept);
                                        setShowDeptDropdown(false);
                                    }}
                                    className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors ${
                                        deptFilter === dept ? 'text-indigo-600 dark:text-indigo-400 font-semibold' : 'text-slate-600 dark:text-slate-300'
                                    }`}
                                >
                                    {dept}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
      </div>

      {/* User List */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden flex-1 flex flex-col">
        <div className="overflow-x-auto min-h-[400px]">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/80">
                        <th className="p-4 pl-6 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">User</th>
                        <th className="p-4 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">Role</th>
                        <th className="p-4 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">Department</th>
                        <th className="p-4 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">Status</th>
                        <th className="p-4 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">Last Active</th>
                        <th className="p-4 pr-6 w-10"></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                    {filteredUsers.map(user => (
                        <tr 
                            key={user.id} 
                            onClick={() => handleUserRowClick(user)}
                            className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors group cursor-pointer"
                        >
                            <td className="p-4 pl-6">
                                <div className="flex items-center gap-3">
                                    <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700" />
                                    <div>
                                        <p className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{user.name}</p>
                                        <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                                            <Mail size={12} /> {user.email}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="p-4">
                                <div className="flex items-center gap-1.5 text-sm text-slate-700 dark:text-slate-300">
                                    <Shield size={14} className="text-indigo-500" />
                                    {user.role}
                                </div>
                            </td>
                            <td className="p-4">
                                <span className="text-sm text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-700/50 px-2.5 py-1 rounded-md">
                                    {user.department}
                                </span>
                            </td>
                            <td className="p-4">
                                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(user.status)}`}>
                                    {user.status === 'active' && <CheckCircle2 size={12} />}
                                    {user.status === 'inactive' && <XCircle size={12} />}
                                    {user.status === 'pending' && <Clock size={12} />}
                                    {user.status}
                                </div>
                            </td>
                            <td className="p-4">
                                <span className="text-sm text-slate-500 dark:text-slate-400">{user.lastActive}</span>
                            </td>
                            <td className="p-4 pr-6 text-right relative">
                                <button 
                                    onClick={(e) => handleMenuClick(e, user.id)}
                                    className={`p-2 rounded-lg transition-colors ${
                                        openMenuId === user.id 
                                        ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400' 
                                        : 'text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20'
                                    }`}
                                >
                                    <MoreHorizontal size={18} />
                                </button>
                                
                                {openMenuId === user.id && (
                                    <div className="absolute right-8 top-10 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 py-1 z-30 animate-in fade-in zoom-in-95 duration-200 text-left">
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); onUserClick?.(user); }}
                                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                                        >
                                            <Eye size={14} className="text-slate-400" /> View Profile
                                        </button>
                                        <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                            <Edit2 size={14} className="text-slate-400" /> Edit Details
                                        </button>
                                        <div className="h-px bg-slate-100 dark:bg-slate-700 my-1"></div>
                                        <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/10 transition-colors">
                                            <Ban size={14} /> Suspend
                                        </button>
                                        <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
                                            <Trash2 size={14} /> Delete
                                        </button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {filteredUsers.length === 0 && (
            <div className="flex flex-col items-center justify-center p-12 text-slate-400">
                <UserIcon size={48} className="mb-4 opacity-20" />
                <p className="font-medium">No users found</p>
                <p className="text-sm">Try adjusting your filters.</p>
            </div>
        )}
      </div>
    </div>
  );
};
