
import React, { useState, useMemo } from 'react';
import { ArrowLeft, Calendar, CheckCircle2, Circle, Clock, Hash, MoreHorizontal, Paperclip, Plus, Send, Tag, Trash2, User, AlertCircle, CheckSquare, ArrowUpDown, AlignLeft, AlertTriangle } from 'lucide-react';
import { Task, SubTask, Comment } from '../types';

interface TaskDetailPageProps {
  task: Task;
  onBack: () => void;
}

export const TaskDetailPage: React.FC<TaskDetailPageProps> = ({ task: initialTask, onBack }) => {
  // Hydrate task with mock details if missing (since widget data is simple)
  const [task, setTask] = useState<Task>({
    description: "Review and analyze the current requirements for the Q4 project deliverables. Ensure all stakeholders have provided their input and that the timeline aligns with the broader company goals.",
    subtasks: [
      { id: 'st1', title: 'Gather stakeholder requirements', completed: true, dueDate: '2024-11-01', description: 'Interview key leads from Marketing and Sales.', createdAt: '2024-10-20T10:00:00Z' },
      { id: 'st2', title: 'Draft initial documentation', completed: false, dueDate: new Date(Date.now() - 86400000).toISOString().split('T')[0], createdAt: '2024-10-22T14:30:00Z' }, // Overdue mock
      { id: 'st3', title: 'Schedule review meeting', completed: false, dueDate: new Date().toISOString().split('T')[0], description: 'Invite project sponsors and tech leads.', createdAt: '2024-10-25T09:15:00Z' }, // Due today mock
      { id: 'st4', title: 'Finalize approval', completed: false, dueDate: '2024-12-01', createdAt: '2024-10-26T11:00:00Z' },
    ],
    tags: ['Planning', 'Q4'],
    assignee: { name: 'Alex (You)', avatar: 'https://picsum.photos/100/100?random=user' },
    comments: [
      { id: 'c1', author: 'Sarah Lee', avatar: 'https://picsum.photos/100/100?random=1', text: 'Please ensure the budget section is included.', date: '2h ago' }
    ],
    attachments: [
        { name: 'Specs_v1.pdf', size: '2.4 MB', type: 'pdf' }
    ],
    ...initialTask
  });

  const [newSubtask, setNewSubtask] = useState("");
  const [newSubtaskDesc, setNewSubtaskDesc] = useState("");
  const [newSubtaskDate, setNewSubtaskDate] = useState("");
  const [newComment, setNewComment] = useState("");
  const [sortCriteria, setSortCriteria] = useState<'added' | 'dueDate' | 'status'>('added');

  const getPriorityColor = (p: string) => {
    switch (p) {
      case 'high': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
      case 'medium': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300';
      case 'low': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusColor = (s: string) => {
      switch(s) {
          case 'done': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300';
          case 'in-progress': return 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300';
          default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
      }
  };

  const toggleSubtask = (id: string) => {
    setTask(prev => ({
      ...prev,
      subtasks: prev.subtasks?.map(st => st.id === id ? { ...st, completed: !st.completed } : st)
    }));
  };

  const deleteSubtask = (id: string) => {
    if (window.confirm("Are you sure you want to delete this subtask?")) {
        setTask(prev => ({
            ...prev,
            subtasks: prev.subtasks?.filter(st => st.id !== id)
        }));
    }
  };

  const addSubtask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubtask.trim()) return;
    const st: SubTask = { 
        id: Date.now().toString(), 
        title: newSubtask, 
        completed: false,
        dueDate: newSubtaskDate || undefined,
        description: newSubtaskDesc || undefined,
        createdAt: new Date().toISOString()
    };
    setTask(prev => ({ ...prev, subtasks: [...(prev.subtasks || []), st] }));
    setNewSubtask("");
    setNewSubtaskDesc("");
    setNewSubtaskDate("");
  };

  const addComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const c: Comment = {
        id: Date.now().toString(),
        author: 'Alex (You)',
        avatar: 'https://picsum.photos/100/100?random=user',
        text: newComment,
        date: 'Just now'
    };
    setTask(prev => ({ ...prev, comments: [...(prev.comments || []), c] }));
    setNewComment("");
  };

  const getDateStatus = (dateStr: string | undefined, completed: boolean) => {
      if (!dateStr || completed) return 'none';
      const due = new Date(dateStr);
      due.setHours(0,0,0,0);
      const today = new Date();
      today.setHours(0,0,0,0);

      const diffTime = due.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays < 0) return 'overdue';
      if (diffDays === 0) return 'today';
      if (diffDays === 1) return 'tomorrow';
      return 'future';
  };

  const sortedSubtasks = useMemo(() => {
    if (!task.subtasks) return [];
    const sorted = [...task.subtasks];
    switch (sortCriteria) {
      case 'dueDate':
        return sorted.sort((a, b) => {
          if (a.dueDate && b.dueDate) return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
          if (a.dueDate) return -1; // Tasks with due dates come first
          if (b.dueDate) return 1;
          return 0;
        });
      case 'status':
        return sorted.sort((a, b) => {
            if (a.completed === b.completed) return 0;
            return a.completed ? 1 : -1; // Incomplete first
        });
      case 'added':
        return sorted.sort((a, b) => {
           if (a.createdAt && b.createdAt) return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
           return 0;
        });
      default:
        return sorted; // Keep original order
    }
  }, [task.subtasks, sortCriteria]);

  return (
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-4">
            <button 
                onClick={onBack}
                className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors text-sm font-medium"
            >
                <ArrowLeft size={16} /> Back
            </button>
            <div className="h-4 w-px bg-slate-200 dark:bg-slate-700"></div>
            <span className="text-sm text-slate-400 font-mono">TASK-{task.id.slice(-4)}</span>
        </div>
        
        <div className="flex items-center gap-3">
             <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 transition-colors">
                <Trash2 size={16} />
             </button>
             <button className="px-3 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                Mark Complete
             </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 flex-1 overflow-y-auto pr-2">
        
        {/* Main Content (Left) */}
        <div className="flex-1 space-y-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">{task.title}</h1>
                <div className="prose prose-slate dark:prose-invert max-w-none">
                    <h4 className="text-sm uppercase tracking-wide text-slate-400 font-bold mb-2">Description</h4>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                        {task.description}
                    </p>
                </div>
            </div>

            {/* Subtasks */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <h4 className="text-sm uppercase tracking-wide text-slate-400 font-bold flex items-center gap-2">
                            <CheckSquare size={16} /> Subtasks
                        </h4>
                        <span className="text-xs text-slate-500 bg-slate-100 dark:bg-slate-700/50 px-2 py-0.5 rounded-full">
                            {task.subtasks?.filter(st => st.completed).length}/{task.subtasks?.length}
                        </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <ArrowUpDown size={14} className="text-slate-400" />
                        <select 
                            value={sortCriteria}
                            onChange={(e) => setSortCriteria(e.target.value as any)}
                            className="bg-transparent text-xs font-medium text-slate-500 dark:text-slate-400 outline-none border-none hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer"
                        >
                            <option value="added">Sort by Added</option>
                            <option value="dueDate">Sort by Due Date</option>
                            <option value="status">Sort by Status</option>
                        </select>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
                    {sortedSubtasks.map(st => {
                        const dateStatus = getDateStatus(st.dueDate, st.completed);
                        
                        return (
                        <div 
                            key={st.id} 
                            onClick={() => toggleSubtask(st.id)}
                            className={`flex items-start gap-3 p-4 border-b border-slate-100 dark:border-slate-700 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-all cursor-pointer group ${st.completed ? 'bg-slate-50/50 dark:bg-slate-800/50' : ''}`}
                        >
                             <div className={`shrink-0 mt-0.5 transition-colors duration-300 ${st.completed ? 'text-emerald-500' : 'text-slate-300 group-hover:text-indigo-500'}`}>
                                 {st.completed ? <CheckCircle2 size={20} className="fill-emerald-50 dark:fill-emerald-900/20" /> : <Circle size={20} />}
                             </div>
                             
                             <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-3">
                                    <span className={`text-sm font-medium transition-all ${st.completed ? 'text-slate-400 line-through decoration-slate-300' : 'text-slate-700 dark:text-slate-200'}`}>
                                        {st.title}
                                    </span>
                                    
                                    {/* Date Badge */}
                                    {st.dueDate && (
                                        <div className={`shrink-0 flex items-center gap-1.5 text-[10px] font-semibold px-2 py-1 rounded-md border transition-colors ${
                                            st.completed 
                                                ? 'bg-slate-100 text-slate-400 border-transparent dark:bg-slate-700 dark:text-slate-500' 
                                                : dateStatus === 'overdue' 
                                                ? 'bg-red-50 text-red-600 border-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/50'
                                                : dateStatus === 'today'
                                                ? 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-900/50'
                                                : 'bg-slate-50 text-slate-500 border-slate-100 dark:bg-slate-700/50 dark:text-slate-400 dark:border-slate-600'
                                        }`}>
                                            {dateStatus === 'overdue' && <AlertCircle size={10} />}
                                            {dateStatus === 'today' && <Clock size={10} />}
                                            {!['overdue', 'today'].includes(dateStatus) && <Calendar size={10} />}
                                            
                                            <span>
                                                {dateStatus === 'today' ? 'Today' : 
                                                 dateStatus === 'tomorrow' ? 'Tomorrow' :
                                                 new Date(st.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                
                                {st.description && (
                                    <p className={`text-xs mt-1 leading-relaxed ${st.completed ? 'text-slate-300 dark:text-slate-600' : 'text-slate-500 dark:text-slate-400'}`}>
                                        {st.description}
                                    </p>
                                )}
                             </div>

                             <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteSubtask(st.id);
                                }}
                                className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                                title="Delete subtask"
                             >
                                <Trash2 size={14} />
                             </button>
                        </div>
                    )})}
                    {task.subtasks?.length === 0 && (
                        <div className="p-6 text-center text-slate-400 bg-slate-50/50 dark:bg-slate-800/50">
                            <div className="inline-flex p-3 rounded-full bg-slate-100 dark:bg-slate-700 mb-2 text-slate-300 dark:text-slate-500">
                                <CheckSquare size={24} />
                            </div>
                            <p className="text-sm font-medium">No subtasks yet</p>
                            <p className="text-xs mt-1">Break this task down into smaller steps.</p>
                        </div>
                    )}
                    
                    <form onSubmit={addSubtask} className="p-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-3 mb-2 px-1">
                            <Plus size={18} className="text-indigo-500" />
                            <input 
                               type="text" 
                               value={newSubtask}
                               onChange={(e) => setNewSubtask(e.target.value)}
                               placeholder="Add a new subtask..." 
                               className="flex-1 bg-transparent text-sm font-medium outline-none text-slate-800 dark:text-slate-200 placeholder-slate-400"
                            />
                        </div>
                        
                        <div className="flex items-center gap-2 pl-8">
                            <div className="flex-1 flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1.5 focus-within:border-indigo-400 dark:focus-within:border-indigo-500 transition-colors">
                                <AlignLeft size={14} className="text-slate-400" />
                                <input 
                                    type="text"
                                    value={newSubtaskDesc}
                                    onChange={(e) => setNewSubtaskDesc(e.target.value)}
                                    placeholder="Add description (optional)..."
                                    className="flex-1 bg-transparent text-xs outline-none text-slate-600 dark:text-slate-300 placeholder-slate-400"
                                />
                            </div>
                            
                            {/* Date Picker Trigger */}
                            <div className="relative flex items-center shrink-0">
                                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                                    newSubtaskDate 
                                    ? 'bg-indigo-50 text-indigo-600 border-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-800' 
                                    : 'bg-white dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                                }`}>
                                    <Calendar size={14} />
                                    <span className="text-xs font-medium">
                                        {newSubtaskDate 
                                            ? new Date(newSubtaskDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                                            : 'Due Date'
                                        }
                                    </span>
                                </div>
                                <input 
                                    type="date"
                                    value={newSubtaskDate}
                                    onChange={(e) => setNewSubtaskDate(e.target.value)}
                                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                    title="Set due date"
                                />
                            </div>

                            <button 
                                type="submit"
                                disabled={!newSubtask.trim()}
                                className="px-4 py-1.5 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 shadow-sm shadow-indigo-200 dark:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
                            >
                                Add
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Attachments */}
            {task.attachments && task.attachments.length > 0 && (
                 <div>
                    <h4 className="text-sm uppercase tracking-wide text-slate-400 font-bold flex items-center gap-2 mb-3">
                        <Paperclip size={16} /> Attachments
                    </h4>
                    <div className="flex flex-wrap gap-3">
                        {task.attachments.map((file, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-500 transition-colors cursor-pointer group shadow-sm">
                                <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-lg">
                                    <Paperclip size={16} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{file.name}</p>
                                    <p className="text-xs text-slate-400">{file.size}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Activity / Comments */}
            <div>
                 <h4 className="text-sm uppercase tracking-wide text-slate-400 font-bold mb-4">Activity</h4>
                 <div className="space-y-6">
                    {task.comments?.map(c => (
                        <div key={c.id} className="flex gap-3">
                            <img src={c.avatar} alt={c.author} className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700" />
                            <div className="flex-1">
                                <div className="flex items-baseline gap-2 mb-1">
                                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{c.author}</span>
                                    <span className="text-xs text-slate-400">{c.date}</span>
                                </div>
                                <p className="text-sm text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 p-3 rounded-lg rounded-tl-none border border-slate-100 dark:border-slate-700">
                                    {c.text}
                                </p>
                            </div>
                        </div>
                    ))}
                    
                    <form onSubmit={addComment} className="flex gap-3 items-start">
                         <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0">
                             <User size={14} className="text-slate-500" />
                         </div>
                         <div className="flex-1 relative">
                             <textarea 
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Leave a comment..."
                                className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900 focus:border-indigo-300 outline-none min-h-[80px] text-slate-800 dark:text-slate-200 placeholder-slate-400 resize-none shadow-sm"
                             />
                             <button 
                                type="submit"
                                disabled={!newComment.trim()}
                                className="absolute bottom-3 right-3 p-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
                             >
                                <Send size={14} />
                             </button>
                         </div>
                    </form>
                 </div>
            </div>
        </div>

        {/* Sidebar (Right) */}
        <div className="w-full lg:w-80 space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm space-y-5">
                
                {/* Status & Priority */}
                <div className="grid grid-cols-2 gap-4">
                     <div>
                         <label className="text-xs text-slate-400 font-semibold uppercase mb-1.5 block">Status</label>
                         <div className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium capitalize border border-transparent ${getStatusColor(task.status)}`}>
                             {task.status.replace('-', ' ')}
                         </div>
                     </div>
                     <div>
                         <label className="text-xs text-slate-400 font-semibold uppercase mb-1.5 block">Priority</label>
                         <div className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium capitalize border border-transparent ${getPriorityColor(task.priority)}`}>
                             <AlertCircle size={14} />
                             {task.priority}
                         </div>
                     </div>
                </div>

                {/* Assignee */}
                <div>
                     <label className="text-xs text-slate-400 font-semibold uppercase mb-1.5 block">Assignee</label>
                     <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                         <img src={task.assignee?.avatar} alt="Assignee" className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700" />
                         <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{task.assignee?.name}</span>
                     </div>
                </div>

                 {/* Due Date */}
                 <div>
                     <label className="text-xs text-slate-400 font-semibold uppercase mb-1.5 block">Due Date</label>
                     <div className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm">
                         <Calendar size={16} className="text-slate-400" />
                         {task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric' }) : 'No due date'}
                     </div>
                </div>

                {/* Tags */}
                <div>
                    <label className="text-xs text-slate-400 font-semibold uppercase mb-1.5 block">Tags</label>
                    <div className="flex flex-wrap gap-2">
                        {task.tags?.map(tag => (
                            <span key={tag} className="flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                                <Tag size={10} /> {tag}
                            </span>
                        ))}
                        <button className="flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-md border border-dashed border-slate-300 text-slate-400 hover:text-indigo-500 hover:border-indigo-400 transition-colors">
                            <Plus size={10} /> Add
                        </button>
                    </div>
                </div>
            </div>

            {/* Meta Info */}
            <div className="text-xs text-slate-400 space-y-1 px-1">
                <p>Created on Oct 24, 2024 by Jordan Smith</p>
                <p>Last updated 2 hours ago</p>
            </div>
        </div>
      </div>
    </div>
  );
};
