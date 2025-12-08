
import React, { useState } from 'react';
import { ArrowLeft, Save, Plus, Trash2, ArrowRight, Clock, User, Phone, Globe, AlertCircle, Check, Edit2, X, GripVertical, Shuffle, Zap } from 'lucide-react';

interface RoutingRule {
  id: string;
  name: string;
  isActive: boolean;
  priority: number;
  conditions: { field: string; operator: string; value: string }[];
  action: { type: string; target: string };
}

interface RoutingRulesPageProps {
  onBack: () => void;
}

export const RoutingRulesPage: React.FC<RoutingRulesPageProps> = ({ onBack }) => {
  const [rules, setRules] = useState<RoutingRule[]>([
    {
      id: '1',
      name: 'After Hours Handling',
      isActive: true,
      priority: 1,
      conditions: [{ field: 'Time', operator: '>', value: '17:00' }],
      action: { type: 'Route To', target: 'Voicemail' }
    },
    {
      id: '2',
      name: 'VIP Priority',
      isActive: true,
      priority: 2,
      conditions: [{ field: 'Customer Tag', operator: 'equals', value: 'VIP' }],
      action: { type: 'Route To', target: 'Priority Queue' }
    },
    {
      id: '3',
      name: 'Spanish Language',
      isActive: true,
      priority: 3,
      conditions: [{ field: 'IVR Selection', operator: 'equals', value: 'Español' }],
      action: { type: 'Route To', target: 'Skill: Spanish' }
    }
  ]);

  const [isAddingRule, setIsAddingRule] = useState(false);
  const [newRule, setNewRule] = useState<Partial<RoutingRule>>({
    name: '',
    conditions: [{ field: 'Time', operator: '>', value: '' }],
    action: { type: 'Route To', target: '' }
  });

  // Edit State
  const [editingRuleId, setEditingRuleId] = useState<string | null>(null);
  const [editedRuleData, setEditedRuleData] = useState<RoutingRule | null>(null);

  const toggleRuleStatus = (id: string) => {
    setRules(prev => prev.map(r => r.id === id ? { ...r, isActive: !r.isActive } : r));
  };

  const deleteRule = (id: string) => {
    if (window.confirm('Delete this routing rule?')) {
        setRules(prev => prev.filter(r => r.id !== id));
    }
  };

  const saveNewRule = () => {
      if (!newRule.name || !newRule.action?.target) return;
      
      const rule: RoutingRule = {
          id: Date.now().toString(),
          name: newRule.name,
          isActive: true,
          priority: rules.length + 1,
          conditions: newRule.conditions as any,
          action: newRule.action as any
      };
      
      setRules([...rules, rule]);
      setIsAddingRule(false);
      setNewRule({ name: '', conditions: [{ field: 'Time', operator: '>', value: '' }], action: { type: 'Route To', target: '' } });
  };

  const startEditing = (rule: RoutingRule) => {
      setEditingRuleId(rule.id);
      setEditedRuleData(JSON.parse(JSON.stringify(rule))); // Deep copy
  };

  const cancelEditing = () => {
      setEditingRuleId(null);
      setEditedRuleData(null);
  };

  const saveEdit = () => {
      if (!editedRuleData) return;
      setRules(prev => prev.map(r => r.id === editedRuleData.id ? editedRuleData : r));
      setEditingRuleId(null);
      setEditedRuleData(null);
  };

  const getConditionIcon = (field: string) => {
      switch(field) {
          case 'Time': return <Clock size={14} className="text-blue-500" />;
          case 'Customer Tag': return <User size={14} className="text-purple-500" />;
          case 'IVR Selection': return <Phone size={14} className="text-emerald-500" />;
          case 'Region': return <Globe size={14} className="text-amber-500" />;
          default: return <AlertCircle size={14} className="text-slate-400" />;
      }
  };

  const getActionIcon = (type: string) => {
      switch(type) {
          case 'Route To': return <Shuffle size={14} className="text-indigo-500" />;
          case 'Play Message': return <Zap size={14} className="text-amber-500" />;
          case 'Hang Up': return <X size={14} className="text-red-500" />;
          default: return <ArrowRight size={14} />;
      }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950 animate-in fade-in slide-in-from-right-4 duration-300 absolute inset-0 z-50 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-5 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-500 dark:text-slate-400 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Shuffle size={20} className="text-indigo-500" /> Routing Logic
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Manage call distribution and priority rules</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 dark:shadow-none">
          <Save size={16} /> Save Configuration
        </button>
      </div>

      <div className="p-8 max-w-6xl mx-auto w-full">
        
        {/* Rules Container */}
        <div className="space-y-6">
            <div className="flex justify-between items-end px-2">
                <div>
                    <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Active Rules</h3>
                    <p className="text-xs text-slate-400">Processed in order from top to bottom</p>
                </div>
                {!isAddingRule && (
                    <button 
                        onClick={() => setIsAddingRule(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-indigo-600 dark:text-indigo-400 rounded-xl text-sm font-bold hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
                    >
                        <Plus size={16} /> Add Rule
                    </button>
                )}
            </div>

            {/* Add New Rule Form */}
            {isAddingRule && (
                <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-dashed border-indigo-300 dark:border-indigo-700/50 p-6 animate-in slide-in-from-top-4 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <Plus size={18} className="text-indigo-500" /> New Routing Rule
                        </h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                        <div className="md:col-span-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block mb-2">Rule Name</label>
                            <input 
                                type="text" 
                                placeholder="e.g. Holiday Routing" 
                                className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                                value={newRule.name}
                                onChange={e => setNewRule({...newRule, name: e.target.value})}
                            />
                        </div>
                        
                        <div className="md:col-span-3 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50 flex flex-col md:flex-row items-center gap-4">
                            <div className="flex-1 w-full">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block mb-2">IF Condition</label>
                                <div className="flex gap-2">
                                    <select 
                                        className="flex-1 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:border-indigo-500"
                                        value={newRule.conditions?.[0].field}
                                        onChange={e => {
                                            const newConds = [...(newRule.conditions || [])];
                                            newConds[0].field = e.target.value;
                                            setNewRule({...newRule, conditions: newConds});
                                        }}
                                    >
                                        <option>Time</option>
                                        <option>Customer Tag</option>
                                        <option>IVR Selection</option>
                                        <option>Region</option>
                                    </select>
                                    <select 
                                        className="w-24 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:border-indigo-500"
                                        value={newRule.conditions?.[0].operator}
                                        onChange={e => {
                                            const newConds = [...(newRule.conditions || [])];
                                            newConds[0].operator = e.target.value;
                                            setNewRule({...newRule, conditions: newConds});
                                        }}
                                    >
                                        <option>equals</option>
                                        <option>contains</option>
                                        <option>&gt;</option>
                                        <option>&lt;</option>
                                    </select>
                                    <input 
                                        type="text" 
                                        placeholder="Value"
                                        className="flex-1 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                                        value={newRule.conditions?.[0].value}
                                        onChange={e => {
                                            const newConds = [...(newRule.conditions || [])];
                                            newConds[0].value = e.target.value;
                                            setNewRule({...newRule, conditions: newConds});
                                        }}
                                    />
                                </div>
                            </div>
                            
                            <ArrowRight className="text-slate-300 dark:text-slate-600 hidden md:block mt-6" />
                            
                            <div className="flex-1 w-full">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block mb-2">THEN Action</label>
                                <div className="flex gap-2">
                                    <select 
                                        className="w-32 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:border-indigo-500"
                                        value={newRule.action?.type}
                                        onChange={e => setNewRule({...newRule, action: { ...newRule.action!, type: e.target.value }})}
                                    >
                                        <option>Route To</option>
                                        <option>Play Message</option>
                                        <option>Hang Up</option>
                                    </select>
                                    <input 
                                        type="text" 
                                        placeholder="Target"
                                        className="flex-1 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                                        value={newRule.action?.target}
                                        onChange={e => setNewRule({...newRule, action: { ...newRule.action!, target: e.target.value }})}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                        <button 
                            onClick={() => setIsAddingRule(false)}
                            className="px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={saveNewRule}
                            className="px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors shadow-md"
                        >
                            Create Rule
                        </button>
                    </div>
                </div>
            )}

            {/* Rules List */}
            <div className="space-y-4">
                {rules.map((rule, index) => {
                    const isEditing = editingRuleId === rule.id;
                    
                    return (
                    <div key={rule.id} className={`relative group bg-white dark:bg-slate-900 rounded-2xl border transition-all duration-300 ${
                        isEditing 
                        ? 'border-indigo-500 ring-4 ring-indigo-500/10 shadow-lg z-10' 
                        : rule.isActive 
                            ? 'border-slate-200 dark:border-slate-800 shadow-sm hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md' 
                            : 'border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 opacity-70'
                    }`}>
                        <div className="flex flex-col md:flex-row items-stretch">
                            {/* Drag Handle & Priority */}
                            <div className="w-12 flex flex-col items-center justify-center border-r border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 rounded-l-2xl text-slate-400 cursor-grab active:cursor-grabbing">
                                <span className="text-[10px] font-bold mb-1">#{index + 1}</span>
                                <GripVertical size={16} />
                            </div>

                            {/* Content */}
                            <div className="flex-1 p-5">
                                <div className="flex flex-col md:flex-row md:items-center gap-6">
                                    {/* Name & Status */}
                                    <div className="w-full md:w-48 shrink-0">
                                        {isEditing && editedRuleData ? (
                                            <input 
                                                type="text"
                                                value={editedRuleData.name}
                                                onChange={(e) => setEditedRuleData({...editedRuleData, name: e.target.value})}
                                                className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold text-slate-900 dark:text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                                            />
                                        ) : (
                                            <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">{rule.name}</h4>
                                        )}
                                        
                                        {!isEditing && (
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full ${rule.isActive ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                                                <span className={`text-xs font-medium ${rule.isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`}>
                                                    {rule.isActive ? 'Active' : 'Disabled'}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Logic Visual / Edit Inputs */}
                                    <div className="flex-1 w-full bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 p-3 md:px-6 md:py-3 flex items-center justify-between">
                                        {isEditing && editedRuleData ? (
                                            <div className="flex flex-col md:flex-row gap-4 w-full items-center">
                                                {/* Edit Condition */}
                                                <div className="flex gap-2 flex-1 w-full">
                                                    <select 
                                                        className="w-1/3 px-2 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium outline-none focus:border-indigo-500"
                                                        value={editedRuleData.conditions[0].field}
                                                        onChange={(e) => {
                                                            const newCond = [...editedRuleData.conditions];
                                                            newCond[0].field = e.target.value;
                                                            setEditedRuleData({...editedRuleData, conditions: newCond});
                                                        }}
                                                    >
                                                        <option>Time</option>
                                                        <option>Customer Tag</option>
                                                        <option>IVR Selection</option>
                                                        <option>Region</option>
                                                    </select>
                                                    <select 
                                                        className="w-1/4 px-2 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium outline-none focus:border-indigo-500"
                                                        value={editedRuleData.conditions[0].operator}
                                                        onChange={(e) => {
                                                            const newCond = [...editedRuleData.conditions];
                                                            newCond[0].operator = e.target.value;
                                                            setEditedRuleData({...editedRuleData, conditions: newCond});
                                                        }}
                                                    >
                                                        <option>equals</option>
                                                        <option>contains</option>
                                                        <option>&gt;</option>
                                                        <option>&lt;</option>
                                                    </select>
                                                    <input 
                                                        type="text"
                                                        className="flex-1 px-2 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium outline-none focus:border-indigo-500"
                                                        value={editedRuleData.conditions[0].value}
                                                        onChange={(e) => {
                                                            const newCond = [...editedRuleData.conditions];
                                                            newCond[0].value = e.target.value;
                                                            setEditedRuleData({...editedRuleData, conditions: newCond});
                                                        }}
                                                    />
                                                </div>
                                                
                                                <ArrowRight size={14} className="text-slate-400 hidden md:block" />
                                                
                                                {/* Edit Action */}
                                                <div className="flex gap-2 flex-1 w-full">
                                                    <select 
                                                        className="w-1/3 px-2 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium outline-none focus:border-indigo-500"
                                                        value={editedRuleData.action.type}
                                                        onChange={(e) => setEditedRuleData({...editedRuleData, action: {...editedRuleData.action, type: e.target.value}})}
                                                    >
                                                        <option>Route To</option>
                                                        <option>Play Message</option>
                                                        <option>Hang Up</option>
                                                    </select>
                                                    <input 
                                                        type="text"
                                                        className="flex-1 px-2 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium outline-none focus:border-indigo-500"
                                                        value={editedRuleData.action.target}
                                                        onChange={(e) => setEditedRuleData({...editedRuleData, action: {...editedRuleData.action, target: e.target.value}})}
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                                                        {getConditionIcon(rule.conditions[0].field)}
                                                        <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                                                            IF {rule.conditions[0].field} {rule.conditions[0].operator} <span className="text-indigo-600 dark:text-indigo-400">{rule.conditions[0].value}</span>
                                                        </span>
                                                    </div>
                                                </div>
                                                
                                                <ArrowRight size={16} className="text-slate-300 dark:text-slate-600 mx-2" />
                                                
                                                <div className="flex items-center gap-3">
                                                    <div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                                                        {getActionIcon(rule.action.type)}
                                                        <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
                                                            THEN {rule.action.type}: <span className="text-emerald-600 dark:text-emerald-400">{rule.action.target}</span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-2 pl-2">
                                        {isEditing ? (
                                            <>
                                                <button 
                                                    onClick={saveEdit}
                                                    className="p-2 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-lg hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors"
                                                    title="Save"
                                                >
                                                    <Check size={16} />
                                                </button>
                                                <button 
                                                    onClick={cancelEditing}
                                                    className="p-2 bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                                                    title="Cancel"
                                                >
                                                    <X size={16} />
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <label className="relative inline-flex items-center cursor-pointer mr-2">
                                                    <input 
                                                        type="checkbox" 
                                                        className="sr-only peer"
                                                        checked={rule.isActive}
                                                        onChange={() => toggleRuleStatus(rule.id)}
                                                    />
                                                    <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-500"></div>
                                                </label>
                                                <button 
                                                    onClick={() => startEditing(rule)}
                                                    className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
                                                    title="Edit Rule"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button 
                                                    onClick={() => deleteRule(rule.id)}
                                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                                    title="Delete Rule"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )})}
            </div>
        </div>

      </div>
    </div>
  );
};
