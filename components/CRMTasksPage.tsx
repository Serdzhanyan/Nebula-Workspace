
import React, { useState } from 'react';
import { 
  CheckSquare, 
  Plus, 
  Search, 
  Calendar, 
  Bell, 
  Clock, 
  Briefcase, 
  User, 
  MoreHorizontal, 
  X, 
  Save, 
  CheckCircle2, 
  Circle,
  AlertCircle,
  Users,
  CalendarCheck,
  Phone,
  Mail,
  Layout,
  Kanban,
  List,
  Folder,
  ArrowRight,
  BarChart2
} from 'lucide-react';

interface CRMProject {
  id: string;
  name: string;
  client: string;
  status: 'Active' | 'On Hold' | 'Completed';
  progress: number;
  dueDate: string;
  taskCount: number;
}

interface CRMTask {
  id: string;
  title: string;
  type: 'task' | 'reminder' | 'event' | 'call' | 'meeting' | 'email';
  dueDate: string;
  dueTime?: string;
  status: 'todo' | 'in-progress' | 'review' | 'done'; // Enhanced status
  linkedClient?: string; 
  linkedDeal?: string;
  linkedProject?: string; // New Link
  priority: 'high' | 'medium' | 'low';
  assignee: string;
  addToCalendar?: boolean;
  outcome?: string;
}

export const CRMTasksPage: React.FC = () => {
  const [activeView, setActiveView] = useState<'list' | 'board' | 'projects'>('list');
  const [filter, setFilter] = useState<'all' | 'task' | 'reminder' | 'event' | 'call' | 'meeting' | 'email'>('all');
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const employees = ['Alex J.', 'Sarah L.', 'James D.', 'Mark V.', 'Emma W.'];
  const clients = ['Acme Corp', 'Stark Industries', 'Wayne Enterprises', 'Cyberdyne Systems', 'Massive Dynamic', 'Hooli', 'Umbrella Corp'];
  const deals = ['Enterprise License', 'Global Rollout', 'Security Audit', 'Pilot Program', 'Consulting'];

  // Mock Projects
  const [projects, setProjects] = useState<CRMProject[]>([
    { id: 'p1', name: 'Q4 Marketing Push', client: 'Acme Corp', status: 'Active', progress: 65, dueDate: '2024-12-15', taskCount: 12 },
    { id: 'p2', name: 'Cloud Migration', client: 'Wayne Enterprises', status: 'Active', progress: 30, dueDate: '2025-01-20', taskCount: 45 },
    { id: 'p3', name: 'Employee Onboarding', client: 'Internal', status: 'On Hold', progress: 10, dueDate: '2024-11-30', taskCount: 8 },
    { id: 'p4', name: 'Website Redesign', client: 'Stark Industries', status: 'Completed', progress: 100, dueDate: '2024-10-15', taskCount: 24 },
  ]);

  // Mock Tasks
  const [tasks, setTasks] = useState<CRMTask[]>([
    { 
      id: '1', 
      title: 'Prepare Q4 Contract Draft', 
      type: 'task', 
      dueDate: '2024-10-28', 
      status: 'in-progress', 
      linkedClient: 'Acme Corp', 
      linkedProject: 'Q4 Marketing Push',
      priority: 'high',
      assignee: 'Alex J.'
    },
    { 
      id: '2', 
      title: 'Follow up on proposal', 
      type: 'call', 
      dueDate: '2024-10-25', 
      dueTime: '10:00 AM', 
      status: 'todo', 
      linkedClient: 'Stark Industries', 
      priority: 'medium',
      assignee: 'Sarah L.'
    },
    { 
      id: '3', 
      title: 'Lunch with CTO', 
      type: 'meeting', 
      dueDate: '2024-10-30', 
      dueTime: '12:30 PM', 
      status: 'todo', 
      linkedClient: 'Cyberdyne Systems', 
      linkedDeal: 'Pilot Program', 
      priority: 'medium',
      assignee: 'Alex J.',
      addToCalendar: true
    },
    { 
      id: '4', 
      title: 'Send Onboarding Email', 
      type: 'email', 
      dueDate: '2024-10-24', 
      status: 'done', 
      linkedClient: 'Wayne Enterprises',
      linkedProject: 'Cloud Migration',
      priority: 'low',
      assignee: 'James D.',
      outcome: 'Sent'
    },
    { 
      id: '5', 
      title: 'Review Server Logs', 
      type: 'task', 
      dueDate: '2024-10-29', 
      status: 'review', 
      linkedClient: 'Wayne Enterprises',
      linkedProject: 'Cloud Migration',
      priority: 'high',
      assignee: 'Mark V.'
    },
  ]);

  // Form State
  const [newTask, setNewTask] = useState<Partial<CRMTask>>({
    type: 'task',
    priority: 'medium',
    dueDate: new Date().toISOString().split('T')[0],
    assignee: 'Alex J.',
    addToCalendar: false,
    status: 'todo'
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title) return;

    const task: CRMTask = {
      id: Date.now().toString(),
      title: newTask.title,
      type: newTask.type || 'task',
      dueDate: newTask.dueDate || '',
      dueTime: newTask.dueTime,
      status: 'todo',
      linkedClient: newTask.linkedClient,
      linkedDeal: newTask.linkedDeal,
      linkedProject: newTask.linkedProject,
      priority: newTask.priority || 'medium',
      assignee: newTask.assignee || 'Alex J.',
      addToCalendar: newTask.addToCalendar,
      outcome: newTask.outcome
    };

    setTasks([task, ...tasks]);
    setIsModalOpen(false);
    
    // Reset form
    setNewTask({ 
        type: 'task', 
        priority: 'medium', 
        dueDate: new Date().toISOString().split('T')[0],
        assignee: 'Alex J.',
        addToCalendar: false
    });
    
    if (task.addToCalendar) {
        alert("Event scheduled and synced to team calendar.");
    }
  };

  const updateTaskStatus = (id: string, newStatus: CRMTask['status']) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  const filteredTasks = tasks.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.linkedClient?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.linkedProject?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || t.type === filter;
    return matchesSearch && matchesFilter;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'task': return <CheckSquare size={16} />;
      case 'reminder': return <Bell size={16} />;
      case 'event': return <Calendar size={16} />;
      case 'call': return <Phone size={16} />;
      case 'meeting': return <Users size={16} />;
      case 'email': return <Mail size={16} />;
      default: return <CheckSquare size={16} />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'task': return 'text-blue-500 bg-blue-50 dark:bg-blue-900/20';
      case 'reminder': return 'text-amber-500 bg-amber-50 dark:bg-amber-900/20';
      case 'event': return 'text-purple-500 bg-purple-50 dark:bg-purple-900/20';
      case 'call': return 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20';
      case 'meeting': return 'text-indigo-500 bg-indigo-50 dark:bg-indigo-900/20';
      case 'email': return 'text-pink-500 bg-pink-50 dark:bg-pink-900/20';
      default: return 'text-slate-500 bg-slate-50';
    }
  };

  // Kanban Columns
  const columns: { id: CRMTask['status']; label: string; color: string }[] = [
      { id: 'todo', label: 'To Do', color: 'bg-slate-200 dark:bg-slate-700' },
      { id: 'in-progress', label: 'In Progress', color: 'bg-blue-500' },
      { id: 'review', label: 'Review', color: 'bg-amber-500' },
      { id: 'done', label: 'Done', color: 'bg-emerald-500' },
  ];

  return (
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      
      {/* Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-lg border border-slate-200 dark:border-slate-700 overflow-hidden animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Create New Item</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleCreate} className="p-6 space-y-4">
              {/* Type Selection */}
              <div className="grid grid-cols-3 gap-2 bg-slate-50 dark:bg-slate-900/50 p-2 rounded-xl">
                {['task', 'call', 'meeting', 'email', 'reminder', 'event'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setNewTask({ ...newTask, type: type as any })}
                    className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-medium capitalize transition-all ${
                      newTask.type === type 
                      ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-100 dark:border-slate-700' 
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                    }`}
                  >
                    {getTypeIcon(type)}
                    {type}
                  </button>
                ))}
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="What needs to be done?"
                  value={newTask.title || ''}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Date</label>
                  <input 
                    type="date" 
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Time (Optional)</label>
                  <input 
                    type="time" 
                    value={newTask.dueTime || ''}
                    onChange={(e) => setNewTask({ ...newTask, dueTime: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Assignee Selection */}
              <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Assign To</label>
                  <div className="relative">
                    <Users size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <select 
                        value={newTask.assignee}
                        onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white appearance-none"
                    >
                        {employees.map(emp => (
                            <option key={emp} value={emp}>{emp}</option>
                        ))}
                    </select>
                  </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Link Project</label>
                  <div className="relative">
                    <Folder size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <select 
                      value={newTask.linkedProject || ''}
                      onChange={(e) => setNewTask({ ...newTask, linkedProject: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white appearance-none"
                    >
                        <option value="">No Project</option>
                        {projects.map(p => (
                            <option key={p.id} value={p.name}>{p.name}</option>
                        ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Link Client</label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <select 
                      value={newTask.linkedClient || ''}
                      onChange={(e) => setNewTask({ ...newTask, linkedClient: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white appearance-none"
                    >
                        <option value="">No Client</option>
                        {clients.map(c => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Calendar Toggle */}
              <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-100 dark:border-slate-700/50">
                  <input 
                    type="checkbox"
                    id="calendarToggle"
                    checked={newTask.addToCalendar}
                    onChange={(e) => setNewTask({...newTask, addToCalendar: e.target.checked})}
                    className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="calendarToggle" className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2 cursor-pointer select-none">
                      <CalendarCheck size={16} className="text-slate-400" />
                      Add to Calendar & Notify
                  </label>
              </div>

              <div className="pt-2">
                <button 
                  type="submit"
                  className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200/50 dark:shadow-none flex items-center justify-center gap-2"
                >
                  <Save size={18} /> Save & Assign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-start md:items-center">
        <div>
           <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckSquare className="text-indigo-500" /> Task & Project Organizer
           </h2>
           <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Distribute tasks, manage projects, and track deadlines.
           </p>
        </div>
        
        <div className="flex gap-2">
            {/* View Switcher */}
            <div className="flex bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-1 shadow-sm">
                <button 
                    onClick={() => setActiveView('list')}
                    className={`p-2 rounded-lg transition-colors ${activeView === 'list' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
                    title="List View"
                >
                    <List size={16} />
                </button>
                <button 
                    onClick={() => setActiveView('board')}
                    className={`p-2 rounded-lg transition-colors ${activeView === 'board' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
                    title="Board View"
                >
                    <Kanban size={16} />
                </button>
                <div className="w-px bg-slate-200 dark:bg-slate-700 my-1 mx-1"></div>
                <button 
                    onClick={() => setActiveView('projects')}
                    className={`p-2 rounded-lg transition-colors ${activeView === 'projects' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
                    title="Projects View"
                >
                    <Layout size={16} />
                </button>
            </div>

            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                    type="text" 
                    placeholder="Search..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white shadow-sm w-48"
                />
            </div>
            <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200/50 dark:shadow-none"
            >
                <Plus size={18} /> Add
            </button>
        </div>
      </div>

      {/* View Content */}
      <div className="flex-1 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col">
        
        {/* LIST VIEW */}
        {activeView === 'list' && (
            <>
                <div className="flex gap-2 p-4 border-b border-slate-100 dark:border-slate-700 overflow-x-auto pb-2 scrollbar-hide bg-slate-50/50 dark:bg-slate-800/80">
                    {['all', 'task', 'call', 'meeting', 'email', 'reminder', 'event'].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f as any)}
                        className={`px-4 py-1.5 rounded-lg text-xs font-medium capitalize transition-all border ${
                        filter === f 
                        ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800 shadow-sm' 
                        : 'bg-transparent border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
                        }`}
                    >
                        {f === 'all' ? 'All Items' : f + 's'}
                    </button>
                    ))}
                </div>

                <div className="flex-1 overflow-y-auto p-2">
                {filteredTasks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-slate-400 p-12">
                    <CheckSquare size={48} className="mb-4 opacity-20" />
                    <p className="font-medium">No tasks found</p>
                    <p className="text-sm">Create a new activity to get started.</p>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-100 dark:divide-slate-700">
                    {filteredTasks.map((task) => (
                        <div 
                        key={task.id} 
                        className={`p-4 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors group flex items-center gap-4 ${task.status === 'done' ? 'opacity-60' : ''}`}
                        >
                        <button 
                            onClick={() => updateTaskStatus(task.id, task.status === 'done' ? 'todo' : 'done')}
                            className={`shrink-0 transition-colors ${task.status === 'done' ? 'text-emerald-500' : 'text-slate-300 hover:text-indigo-500'}`}
                        >
                            {task.status === 'done' ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                        </button>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full flex items-center gap-1 ${getTypeColor(task.type)}`}>
                                {getTypeIcon(task.type)} {task.type}
                            </span>
                            {task.priority === 'high' && (
                                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 flex items-center gap-1">
                                <AlertCircle size={10} /> High
                                </span>
                            )}
                            {task.linkedProject && (
                                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400 flex items-center gap-1">
                                    <Folder size={10} /> {task.linkedProject}
                                </span>
                            )}
                            </div>
                            
                            <h4 className={`text-base font-semibold ${task.status === 'done' ? 'text-slate-500 line-through' : 'text-slate-900 dark:text-white'}`}>
                            {task.title}
                            </h4>
                            
                            <div className="flex items-center gap-4 mt-2 text-xs text-slate-500 dark:text-slate-400">
                            <div className="flex items-center gap-1.5">
                                <Calendar size={14} />
                                <span>{new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                {task.dueTime && (
                                <>
                                    <span className="mx-1">•</span>
                                    <Clock size={14} />
                                    <span>{task.dueTime}</span>
                                </>
                                )}
                            </div>
                            
                            {task.linkedClient && (
                                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-slate-100 dark:bg-slate-700 rounded-md">
                                <User size={12} /> {task.linkedClient}
                                </div>
                            )}
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="hidden sm:flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 flex items-center justify-center text-xs font-bold">
                                    {task.assignee.charAt(0)}
                                </div>
                                <span className="text-xs text-slate-500 dark:text-slate-400">{task.assignee}</span>
                            </div>
                            <button className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                            <MoreHorizontal size={18} />
                            </button>
                        </div>
                        </div>
                    ))}
                    </div>
                )}
                </div>
            </>
        )}

        {/* BOARD VIEW */}
        {activeView === 'board' && (
            <div className="flex-1 overflow-x-auto p-6 bg-slate-50 dark:bg-slate-900/50">
                <div className="flex gap-4 h-full min-w-[1000px]">
                    {columns.map(col => (
                        <div key={col.id} className="flex-1 flex flex-col bg-slate-100/50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/50">
                            <div className="p-3 border-b border-slate-200 dark:border-slate-700/50 flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${col.color}`}></div>
                                    <span className="font-bold text-sm text-slate-700 dark:text-slate-200">{col.label}</span>
                                </div>
                                <span className="text-xs text-slate-400 bg-white dark:bg-slate-800 px-2 py-0.5 rounded-full shadow-sm">
                                    {filteredTasks.filter(t => t.status === col.id).length}
                                </span>
                            </div>
                            
                            <div className="flex-1 overflow-y-auto p-3 space-y-3">
                                {filteredTasks.filter(t => t.status === col.id).map(task => (
                                    <div key={task.id} className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all cursor-grab active:cursor-grabbing group relative">
                                        
                                        <div className="flex justify-between items-start mb-2">
                                            <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded border ${getTypeColor(task.type)}`}>
                                                {task.type}
                                            </span>
                                            {task.priority === 'high' && (
                                                <AlertCircle size={12} className="text-red-500" />
                                            )}
                                        </div>
                                        
                                        <p className="text-sm font-semibold text-slate-900 dark:text-white mb-3 leading-tight">{task.title}</p>
                                        
                                        {task.linkedProject && (
                                            <div className="flex items-center gap-1.5 mb-3 text-xs text-slate-500 bg-slate-50 dark:bg-slate-700/50 p-1.5 rounded">
                                                <Folder size={12} className="text-indigo-500" />
                                                <span className="truncate">{task.linkedProject}</span>
                                            </div>
                                        )}

                                        <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-700">
                                            <div className="flex items-center gap-1">
                                                <Calendar size={12} /> {new Date(task.dueDate).toLocaleDateString('en-US', {month: 'short', day: 'numeric'})}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <div className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-[9px] font-bold text-slate-600 dark:text-slate-300">
                                                    {task.assignee.charAt(0)}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Simple Move Actions for Mock */}
                                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                            {col.id !== 'todo' && (
                                                <button 
                                                    onClick={() => updateTaskStatus(task.id, columns[columns.findIndex(c => c.id === col.id) - 1].id)}
                                                    className="p-1 bg-slate-100 dark:bg-slate-700 rounded hover:bg-indigo-100 dark:hover:bg-indigo-900/50 text-slate-500"
                                                >
                                                    <ArrowRight size={12} className="rotate-180" />
                                                </button>
                                            )}
                                            {col.id !== 'done' && (
                                                <button 
                                                    onClick={() => updateTaskStatus(task.id, columns[columns.findIndex(c => c.id === col.id) + 1].id)}
                                                    className="p-1 bg-slate-100 dark:bg-slate-700 rounded hover:bg-indigo-100 dark:hover:bg-indigo-900/50 text-slate-500"
                                                >
                                                    <ArrowRight size={12} />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* PROJECTS VIEW */}
        {activeView === 'projects' && (
            <div className="flex-1 overflow-y-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map(project => (
                        <div key={project.id} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm hover:shadow-md transition-all group cursor-pointer hover:border-indigo-300 dark:hover:border-indigo-700">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl text-indigo-600 dark:text-indigo-400">
                                    <Folder size={24} />
                                </div>
                                <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${
                                    project.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-900' :
                                    project.status === 'Completed' ? 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/20 dark:border-blue-900' :
                                    'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-700 dark:text-slate-400'
                                }`}>
                                    {project.status}
                                </span>
                            </div>
                            
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{project.name}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{project.client}</p>
                            
                            <div className="mb-6">
                                <div className="flex justify-between items-center text-xs font-semibold mb-2">
                                    <span className="text-slate-600 dark:text-slate-300">Progress</span>
                                    <span className="text-indigo-600 dark:text-indigo-400">{project.progress}%</span>
                                </div>
                                <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${project.progress}%` }}></div>
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700 text-xs">
                                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                    <CheckSquare size={14} /> 
                                    <span className="font-semibold">{project.taskCount}</span> Tasks
                                </div>
                                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                    <Calendar size={14} /> 
                                    <span>Due {new Date(project.dueDate).toLocaleDateString('en-US', {month: 'short', day: 'numeric'})}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    {/* Add Project Card */}
                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center p-6 text-slate-400 hover:text-indigo-600 hover:border-indigo-300 dark:hover:border-indigo-700/50 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/10 transition-all cursor-pointer min-h-[200px]">
                        <Plus size={48} className="mb-4 opacity-50" />
                        <h4 className="font-bold text-sm">Create New Project</h4>
                    </div>
                </div>
            </div>
        )}

      </div>
    </div>
  );
};
