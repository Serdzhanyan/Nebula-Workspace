
import React, { useState } from 'react';
import { Plus, CheckCircle2, Circle, Sparkles, X, Loader2, Calendar } from 'lucide-react';
import { Task } from '../types';
import { generateTaskSuggestions } from '../services/geminiService';

interface TrackerWidgetProps {
  filterPriority?: 'all' | 'high' | 'medium' | 'low';
  enableAISuggestions?: boolean;
  onTaskClick?: (task: Task) => void;
}

export const TrackerWidget: React.FC<TrackerWidgetProps> = ({ filterPriority = 'all', enableAISuggestions = false, onTaskClick }) => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Review candidates for Design lead', status: 'in-progress', priority: 'high', dueDate: '2024-11-15' },
    { id: '2', title: 'Prepare Q4 presentation', status: 'todo', priority: 'medium', dueDate: '2024-11-20' },
    { id: '3', title: 'Update security protocols', status: 'done', priority: 'low' },
    { id: '4', title: 'Approve marketing budget', status: 'todo', priority: 'high', dueDate: '2024-11-10' },
    { id: '5', title: 'Team lunch logistics', status: 'done', priority: 'low' },
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'todo' | 'in-progress' | 'done'>('all');
  
  // AI Suggestion State
  const [suggestions, setSuggestions] = useState<{ title: string; priority: 'low' | 'medium' | 'high' }[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const toggleTask = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTasks(prev => prev.map(t => 
      t.id === id ? { ...t, status: t.status === 'done' ? 'todo' : 'done' } : t
    ));
  };

  const cycleTaskPriority = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTasks(prev => prev.map(t => {
      if (t.id !== id) return t;
      const next = t.priority === 'low' ? 'medium' : t.priority === 'medium' ? 'high' : 'low';
      return { ...t, priority: next };
    }));
  };

  const cycleNewTaskPriority = () => {
    setNewTaskPriority(prev => prev === 'low' ? 'medium' : prev === 'medium' ? 'high' : 'low');
  };

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      status: 'todo',
      priority: newTaskPriority,
      dueDate: newTaskDueDate || undefined,
    };
    setTasks([newTask, ...tasks]);
    setNewTaskTitle('');
    setNewTaskDueDate('');
  };

  const handleGenerateSuggestions = async () => {
    if (showSuggestions && suggestions.length > 0) {
      // Just toggle off if already showing
      setShowSuggestions(false);
      return;
    }
    
    setLoadingSuggestions(true);
    setShowSuggestions(true);
    const results = await generateTaskSuggestions();
    setSuggestions(results);
    setLoadingSuggestions(false);
  };

  const addSuggestion = (suggestion: { title: string; priority: 'low' | 'medium' | 'high' }) => {
    const newTask: Task = {
      id: Date.now().toString() + Math.random().toString(), // Ensure unique ID
      title: suggestion.title,
      status: 'todo',
      priority: suggestion.priority,
    };
    setTasks([newTask, ...tasks]);
    setSuggestions(prev => prev.filter(s => s.title !== suggestion.title));
    if (suggestions.length <= 1) setShowSuggestions(false);
  };

  const getPriorityColor = (p: 'low' | 'medium' | 'high') => {
    switch (p) {
      case 'high': return 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]';
      case 'medium': return 'bg-orange-400';
      case 'low': return 'bg-blue-400';
    }
  };

  const formatDate = (dateStr: string) => {
    try {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch (e) {
        return dateStr;
    }
  };

  const filteredTasks = tasks.filter(task => {
    const priorityMatch = filterPriority === 'all' || task.priority === filterPriority;
    const statusMatch = filterStatus === 'all' || task.status === filterStatus;
    return priorityMatch && statusMatch;
  });

  return (
    <div className="flex flex-col h-full relative">
      {/* Suggestion Panel */}
      {showSuggestions && (
        <div className="mb-3 animate-in slide-in-from-top-2 fade-in duration-300">
           <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                 <Sparkles size={12} /> AI Suggestions
              </span>
              <button onClick={() => setShowSuggestions(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                 <X size={12} />
              </button>
           </div>
           
           {loadingSuggestions ? (
             <div className="flex items-center gap-2 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-xs text-indigo-700 dark:text-indigo-300">
                <Loader2 size={12} className="animate-spin" /> Thinking of tasks...
             </div>
           ) : (
             <div className="space-y-2">
                {suggestions.map((s, idx) => (
                   <button 
                      key={idx}
                      onClick={() => addSuggestion(s)}
                      className="w-full text-left flex items-center justify-between p-2.5 bg-indigo-50 dark:bg-indigo-900/10 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 rounded-lg group transition-colors"
                   >
                      <div className="flex items-center gap-2">
                         <div className={`w-1.5 h-1.5 rounded-full ${getPriorityColor(s.priority)}`}></div>
                         <span className="text-xs font-medium text-slate-700 dark:text-slate-200">{s.title}</span>
                      </div>
                      <Plus size={12} className="text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                   </button>
                ))}
             </div>
           )}
        </div>
      )}

      {/* Status Filters */}
      <div className="flex gap-1.5 mb-2 overflow-x-auto scrollbar-hide pb-1">
        {(['all', 'todo', 'in-progress', 'done'] as const).map(status => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`
              px-2.5 py-1 rounded-full text-[10px] font-medium border transition-all whitespace-nowrap
              ${filterStatus === status 
                ? 'bg-indigo-600 text-white border-indigo-600 dark:bg-indigo-500 dark:border-indigo-500' 
                : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500'}
            `}
          >
            {status === 'all' ? 'All' : status === 'in-progress' ? 'In Progress' : status === 'todo' ? 'To Do' : 'Done'}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide space-y-2 pr-1">
        {filteredTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 text-xs">
            <p>No {filterStatus !== 'all' ? filterStatus.replace('-', ' ') : ''} tasks {filterPriority !== 'all' ? `(${filterPriority})` : ''}</p>
          </div>
        ) : (
          filteredTasks.map(task => (
            <div 
              key={task.id} 
              onClick={() => onTaskClick?.(task)}
              className={`group flex items-center gap-3 p-2.5 rounded-lg border transition-all ${
                  task.status === 'done' 
                  ? 'bg-slate-50 dark:bg-slate-800/50 border-transparent opacity-75' 
                  : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 hover:border-indigo-100 dark:hover:border-indigo-800 hover:shadow-sm cursor-pointer'
              }`}
            >
              <button 
                  onClick={(e) => toggleTask(task.id, e)}
                  className={`transition-colors ${task.status === 'done' ? 'text-emerald-500' : 'text-slate-300 dark:text-slate-500 hover:text-indigo-500 dark:hover:text-indigo-400'}`}
              >
                  {task.status === 'done' ? <CheckCircle2 size={18} /> : <Circle size={18} />}
              </button>
              
              <div className="flex-1 min-w-0">
                  <div className={`text-sm truncate ${task.status === 'done' ? 'text-slate-400 dark:text-slate-500 line-through' : 'text-slate-700 dark:text-slate-200 font-medium group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors'}`}>
                      {task.title}
                  </div>
                  {task.dueDate && (
                      <div className="flex items-center gap-1 mt-0.5 text-[10px] text-slate-400 dark:text-slate-500">
                          <Calendar size={10} />
                          <span>{formatDate(task.dueDate)}</span>
                      </div>
                  )}
              </div>
              
              <button
                onClick={(e) => cycleTaskPriority(task.id, e)}
                title={`Priority: ${task.priority}. Click to change.`}
                className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              >
                <div 
                  className={`w-2 h-2 rounded-full shrink-0 transition-colors ${getPriorityColor(task.priority)}`} 
                />
              </button>
            </div>
          ))
        )}
      </div>
      
      {/* Add Task Area */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center gap-2">
        <div className="flex-1 flex items-center gap-2 bg-slate-50 dark:bg-slate-900 rounded-lg px-3 border border-transparent focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all">
          <button 
            onClick={cycleNewTaskPriority}
            type="button"
            title={`New task priority: ${newTaskPriority}. Click to change.`}
            className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors"
          >
             <div className={`w-2 h-2 rounded-full ${getPriorityColor(newTaskPriority)}`} />
          </button>
          
          <input 
            type="text" 
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
            placeholder="Add a new task..." 
            className="flex-1 text-sm bg-transparent border-none py-2 outline-none text-slate-800 dark:text-slate-200 placeholder-slate-400 min-w-[50px]"
          />

          {/* Date Picker */}
          <div className="relative group">
              <Calendar size={14} className={`text-slate-400 group-hover:text-indigo-500 ${newTaskDueDate ? 'text-indigo-500' : ''}`} />
              <input 
                 type="date"
                 value={newTaskDueDate}
                 onChange={(e) => setNewTaskDueDate(e.target.value)}
                 className="absolute inset-0 opacity-0 cursor-pointer w-full"
                 title="Set Due Date"
              />
          </div>
        </div>
        
        {enableAISuggestions && (
          <button
            onClick={handleGenerateSuggestions}
            disabled={loadingSuggestions}
            title="Suggest tasks with AI"
            className="p-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors border border-indigo-200 dark:border-indigo-800"
          >
            {loadingSuggestions ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
          </button>
        )}

        <button 
          onClick={handleAddTask}
          disabled={!newTaskTitle.trim()}
          className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
            <Plus size={16} />
        </button>
      </div>
    </div>
  );
};
