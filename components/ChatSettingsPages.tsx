import React, { useState } from 'react';
import { ArrowLeft, Save, Plus, Trash2, Check, GripVertical, Clock, MessageSquare, Users, Tag, AlertCircle } from 'lucide-react';

interface Props {
  onBack: () => void;
}

// --- Assignment Rules ---
export const ChatAssignmentRulesPage: React.FC<Props> = ({ onBack }) => {
  const [rules, setRules] = useState([
    { id: '1', name: 'Round Robin', active: true, description: 'Distribute chats equally among available agents.' },
    { id: '2', name: 'Load Balanced', active: false, description: 'Assign to agent with fewest active chats.' },
    { id: '3', name: 'Skill Based', active: false, description: 'Route based on chat tags matching agent skills.' },
    { id: '4', name: 'VIP Priority', active: true, description: 'VIP tags jump to front of queue.' },
  ]);

  const toggleRule = (id: string) => {
    setRules(prev => prev.map(r => r.id === id ? { ...r, active: !r.active } : r));
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950 animate-in fade-in slide-in-from-right-4 duration-300 absolute inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-between px-8 py-5 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-500 dark:text-slate-400 transition-colors"><ArrowLeft size={20} /></button>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Assignment Rules</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Configure how incoming chats are distributed</p>
          </div>
        </div>
      </div>
      <div className="p-8 max-w-4xl mx-auto w-full space-y-4">
        {rules.map((rule) => (
          <div key={rule.id} className="flex items-center justify-between p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-1">{rule.name}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">{rule.description}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={rule.active} onChange={() => toggleRule(rule.id)} />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Auto-response ---
export const ChatAutoResponsePage: React.FC<Props> = ({ onBack }) => {
  const [welcomeMsg, setWelcomeMsg] = useState("Hello! Thanks for reaching out. An agent will be with you shortly.");
  const [offlineMsg, setOfflineMsg] = useState("We are currently offline. Please leave a message and we'll get back to you.");
  const [delay, setDelay] = useState(2);

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950 animate-in fade-in slide-in-from-right-4 duration-300 absolute inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-between px-8 py-5 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-500 dark:text-slate-400 transition-colors"><ArrowLeft size={20} /></button>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Auto-Responses</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Manage automated messages and triggers</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm"><Save size={16} /> Save</button>
      </div>
      <div className="p-8 max-w-4xl mx-auto w-full space-y-8">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
             <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2"><MessageSquare size={18} className="text-indigo-500"/> Welcome Message</h3>
             <div className="flex items-center gap-2 text-sm text-slate-500">
                <span>Delay:</span>
                <input type="number" value={delay} onChange={e => setDelay(Number(e.target.value))} className="w-16 p-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded text-center text-slate-900 dark:text-white" />
                <span>sec</span>
             </div>
          </div>
          <textarea className="w-full p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm resize-none focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 dark:text-white" rows={3} value={welcomeMsg} onChange={e => setWelcomeMsg(e.target.value)} />
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2"><Clock size={18} className="text-amber-500"/> Offline / After Hours</h3>
          <textarea className="w-full p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm resize-none focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 dark:text-white" rows={3} value={offlineMsg} onChange={e => setOfflineMsg(e.target.value)} />
        </div>
      </div>
    </div>
  );
};

// --- Tags & Categories ---
export const ChatTagsPage: React.FC<Props> = ({ onBack }) => {
  const [tags, setTags] = useState([
    { id: '1', name: 'Sales', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' },
    { id: '2', name: 'Support', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
    { id: '3', name: 'Urgent', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
    { id: '4', name: 'Billing', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' },
  ]);
  const [newTag, setNewTag] = useState("");

  const addTag = () => {
    if (!newTag) return;
    setTags([...tags, { id: Date.now().toString(), name: newTag, color: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300' }]);
    setNewTag("");
  };

  const removeTag = (id: string) => {
    setTags(tags.filter(t => t.id !== id));
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950 animate-in fade-in slide-in-from-right-4 duration-300 absolute inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-between px-8 py-5 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-500 dark:text-slate-400 transition-colors"><ArrowLeft size={20} /></button>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Tags & Categories</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Organize chats for better reporting</p>
          </div>
        </div>
      </div>
      <div className="p-8 max-w-4xl mx-auto w-full space-y-6">
        <div className="flex gap-2">
            <input type="text" value={newTag} onChange={e => setNewTag(e.target.value)} placeholder="New tag name..." className="flex-1 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white" />
            <button onClick={addTag} className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors"><Plus size={18} /></button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tags.map(tag => (
                <div key={tag.id} className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${tag.color}`}>{tag.name}</span>
                    <button onClick={() => removeTag(tag.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

// --- Work Queues ---
export const ChatQueuesPage: React.FC<Props> = ({ onBack }) => {
  const [queues, setQueues] = useState([
    { id: '1', name: 'General Support', agents: 12, limit: 5, status: 'Active' },
    { id: '2', name: 'Sales Inquiries', agents: 8, limit: 3, status: 'Active' },
    { id: '3', name: 'VIP Priority', agents: 4, limit: 2, status: 'Active' },
  ]);

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950 animate-in fade-in slide-in-from-right-4 duration-300 absolute inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-between px-8 py-5 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-500 dark:text-slate-400 transition-colors"><ArrowLeft size={20} /></button>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Chat Work Queues</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Manage capacity and limits</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm"><Plus size={16} /> Add Queue</button>
      </div>
      <div className="p-8 max-w-5xl mx-auto w-full space-y-4">
         {queues.map(queue => (
             <div key={queue.id} className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
                 <div className="flex items-center gap-4">
                     <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-lg">
                         <Users size={20} />
                     </div>
                     <div>
                         <h3 className="font-bold text-slate-900 dark:text-white">{queue.name}</h3>
                         <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mt-1">
                             <span className="flex items-center gap-1"><Users size={14} /> {queue.agents} Agents</span>
                             <span className="flex items-center gap-1"><AlertCircle size={14} /> Limit: {queue.limit} chats/agent</span>
                         </div>
                     </div>
                 </div>
                 <div className="flex items-center gap-4">
                     <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-xs font-bold uppercase">{queue.status}</span>
                     <button className="text-slate-400 hover:text-indigo-600"><GripVertical size={20} /></button>
                 </div>
             </div>
         ))}
      </div>
    </div>
  );
};
