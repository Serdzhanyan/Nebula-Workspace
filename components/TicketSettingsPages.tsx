
import React, { useState } from 'react';
import { ArrowLeft, Save, Plus, Trash2, GripVertical, Tag, CheckCircle2, User, ArrowRight, Layers, Settings } from 'lucide-react';

interface Props {
  onBack: () => void;
}

// --- Category Directories ---
export const TicketCategoriesPage: React.FC<Props> = ({ onBack }) => {
  const [categories, setCategories] = useState([
    { id: '1', name: 'Technical Issue', description: 'Bugs, errors, and system failures', active: true },
    { id: '2', name: 'Billing Inquiry', description: 'Invoices, payments, and refunds', active: true },
    { id: '3', name: 'Feature Request', description: 'Ideas and improvements', active: true },
    { id: '4', name: 'Account Access', description: 'Login issues and permissions', active: true },
  ]);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });

  const addCategory = () => {
    if (!newCategory.name) return;
    setCategories([...categories, { id: Date.now().toString(), name: newCategory.name, description: newCategory.description, active: true }]);
    setNewCategory({ name: '', description: '' });
  };

  const removeCategory = (id: string) => {
    setCategories(categories.filter(c => c.id !== id));
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950 animate-in fade-in slide-in-from-right-4 duration-300 absolute inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-between px-8 py-5 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-500 dark:text-slate-400 transition-colors"><ArrowLeft size={20} /></button>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Category Directories</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Classify incoming support requests</p>
          </div>
        </div>
      </div>
      <div className="p-8 max-w-4xl mx-auto w-full space-y-6">
        <div className="flex gap-2">
            <input type="text" value={newCategory.name} onChange={e => setNewCategory({...newCategory, name: e.target.value})} placeholder="Category Name" className="w-1/3 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white" />
            <input type="text" value={newCategory.description} onChange={e => setNewCategory({...newCategory, description: e.target.value})} placeholder="Description" className="flex-1 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white" />
            <button onClick={addCategory} className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors"><Plus size={18} /></button>
        </div>
        <div className="space-y-3">
            {categories.map(cat => (
                <div key={cat.id} className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:shadow-sm transition-shadow group">
                    <div className="flex items-center gap-4">
                        <GripVertical size={20} className="text-slate-300 cursor-move" />
                        <div>
                            <h3 className="font-bold text-slate-900 dark:text-white text-sm">{cat.name}</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{cat.description}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${cat.active ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-slate-100 text-slate-500'}`}>
                            {cat.active ? 'Active' : 'Inactive'}
                        </span>
                        <button onClick={() => removeCategory(cat.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"><Trash2 size={16} /></button>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

// --- Statuses ---
export const TicketStatusesPage: React.FC<Props> = ({ onBack }) => {
  const [statuses, setStatuses] = useState([
    { id: '1', name: 'Open', color: 'blue', type: 'system' },
    { id: '2', name: 'Pending', color: 'amber', type: 'custom' },
    { id: '3', name: 'Resolved', color: 'emerald', type: 'system' },
    { id: '4', name: 'Closed', color: 'slate', type: 'system' },
  ]);
  const [newStatusName, setNewStatusName] = useState("");

  const addStatus = () => {
      if (!newStatusName) return;
      setStatuses([...statuses, { id: Date.now().toString(), name: newStatusName, color: 'indigo', type: 'custom' }]);
      setNewStatusName("");
  };

  const getColorClass = (color: string) => {
      switch(color) {
          case 'blue': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
          case 'amber': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
          case 'emerald': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
          case 'slate': return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
          default: return 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400';
      }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950 animate-in fade-in slide-in-from-right-4 duration-300 absolute inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-between px-8 py-5 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-500 dark:text-slate-400 transition-colors"><ArrowLeft size={20} /></button>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Ticket Statuses</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Define the lifecycle stages of tickets</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm"><Save size={16} /> Save</button>
      </div>
      <div className="p-8 max-w-4xl mx-auto w-full space-y-6">
        <div className="flex gap-2">
            <input type="text" value={newStatusName} onChange={e => setNewStatusName(e.target.value)} placeholder="New Status Name" className="flex-1 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white" />
            <button onClick={addStatus} className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors"><Plus size={18} /></button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {statuses.map(status => (
                <div key={status.id} className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl">
                    <div className="flex items-center gap-3">
                        <CheckCircle2 size={18} className="text-slate-400" />
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${getColorClass(status.color)}`}>
                            {status.name}
                        </span>
                    </div>
                    {status.type === 'custom' && (
                        <button onClick={() => setStatuses(statuses.filter(s => s.id !== status.id))} className="text-slate-400 hover:text-red-500"><Trash2 size={16} /></button>
                    )}
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

// --- Auto-Assignment ---
export const TicketAutoAssignmentPage: React.FC<Props> = ({ onBack }) => {
  const [rules, setRules] = useState([
    { id: '1', condition: 'Category = "Billing"', assignee: 'Finance Team' },
    { id: '2', condition: 'Priority = "Urgent"', assignee: 'Tier 2 Support' },
    { id: '3', condition: 'Source = "Email"', assignee: 'General Support' },
  ]);

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950 animate-in fade-in slide-in-from-right-4 duration-300 absolute inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-between px-8 py-5 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-500 dark:text-slate-400 transition-colors"><ArrowLeft size={20} /></button>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Auto-assignment Rules</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Route tickets to the right team automatically</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm"><Plus size={16} /> New Rule</button>
      </div>
      <div className="p-8 max-w-4xl mx-auto w-full space-y-4">
         {rules.map(rule => (
             <div key={rule.id} className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-4 group">
                 <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-lg">
                     <Layers size={18} />
                 </div>
                 <div className="flex-1 flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                     <span className="font-bold">IF</span> 
                     <span className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">{rule.condition}</span>
                     <ArrowRight size={14} className="text-slate-400" />
                     <span className="font-bold">ASSIGN TO</span>
                     <span className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 px-2 py-1 rounded flex items-center gap-1 font-bold">
                        <User size={12} /> {rule.assignee}
                     </span>
                 </div>
                 <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                     <button className="p-2 text-slate-400 hover:text-indigo-600"><Settings size={16} /></button>
                     <button className="p-2 text-slate-400 hover:text-red-500"><Trash2 size={16} /></button>
                 </div>
             </div>
         ))}
      </div>
    </div>
  );
};
