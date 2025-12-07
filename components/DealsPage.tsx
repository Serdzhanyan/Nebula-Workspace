
import React, { useState } from 'react';
import { Search, Plus, MoreHorizontal, DollarSign, Calendar, User, ArrowRight, Filter, ChevronDown, BarChart3, GripVertical, LayoutGrid, List, X, Save, Tag, Briefcase, Percent, Clock, Check, ArrowUp, ArrowDown, Trash2, Mail, Edit2 } from 'lucide-react';

interface Deal {
  id: string;
  title: string;
  client: string;
  value: number;
  owner: string;
  avatar: string;
  stage: 'Lead' | 'Qualified' | 'Proposal' | 'Negotiation' | 'Closed';
  probability: number;
  closingDate: string;
  tags?: string[];
}

export const DealsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<'board' | 'list'>('board');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Deal Detail State
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  
  // Forecast & Filter State
  const [showForecastModal, setShowForecastModal] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [ownerFilter, setOwnerFilter] = useState("All");
  const [minValueFilter, setMinValueFilter] = useState<string>("");

  // Column Actions State
  const [activeColumnMenu, setActiveColumnMenu] = useState<string | null>(null);
  const [columnSorts, setColumnSorts] = useState<Record<string, 'asc' | 'desc' | 'none'>>({});

  const [deals, setDeals] = useState<Deal[]>([
    { id: '1', title: 'Enterprise License', client: 'Acme Corp', value: 125000, owner: 'Sarah Lee', avatar: 'https://picsum.photos/100/100?random=10', stage: 'Negotiation', probability: 80, closingDate: 'Nov 15', tags: ['SaaS', 'Upsell'] },
    { id: '2', title: 'Global Rollout', client: 'Stark Ind', value: 1200000, owner: 'Alex Johnson', avatar: 'https://picsum.photos/100/100?random=11', stage: 'Proposal', probability: 45, closingDate: 'Dec 01', tags: ['Enterprise'] },
    { id: '3', title: 'Security Audit', client: 'Wayne Ent', value: 850000, owner: 'Emma Watson', avatar: 'https://picsum.photos/100/100?random=12', stage: 'Qualified', probability: 30, closingDate: 'Jan 20' },
    { id: '4', title: 'Pilot Program', client: 'Cyberdyne', value: 45000, owner: 'James D.', avatar: 'https://picsum.photos/100/100?random=13', stage: 'Closed', probability: 100, closingDate: 'Oct 20', tags: ['New Logo'] },
    { id: '5', title: 'Consulting', client: 'Massive Dynamic', value: 320000, owner: 'Sarah Lee', avatar: 'https://picsum.photos/100/100?random=14', stage: 'Lead', probability: 10, closingDate: 'Feb 15' },
    { id: '6', title: 'API Integration', client: 'Hooli', value: 65000, owner: 'Mark Vos', avatar: 'https://picsum.photos/100/100?random=15', stage: 'Proposal', probability: 60, closingDate: 'Nov 30' },
    { id: '7', title: 'Cloud Migration', client: 'Umbrella Corp', value: 550000, owner: 'Alex Johnson', avatar: 'https://picsum.photos/100/100?random=16', stage: 'Qualified', probability: 35, closingDate: 'Dec 15' },
  ]);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    client: '',
    value: '',
    owner: 'Alex Johnson', // Default to current user
    stage: 'Lead',
    probability: 20,
    closingDate: '',
    tags: ''
  });

  const stages: { id: Deal['stage']; label: string; color: string }[] = [
    { id: 'Lead', label: 'Leads', color: 'bg-slate-200 dark:bg-slate-700' },
    { id: 'Qualified', label: 'Qualified', color: 'bg-blue-500' },
    { id: 'Proposal', label: 'Proposal', color: 'bg-indigo-500' },
    { id: 'Negotiation', label: 'Negotiation', color: 'bg-purple-500' },
    { id: 'Closed', label: 'Closed Won', color: 'bg-emerald-500' },
  ];

  const owners = ['All', ...Array.from(new Set(deals.map(d => d.owner)))];

  const filteredDeals = deals.filter(deal => {
    const matchesSearch = deal.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          deal.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesOwner = ownerFilter === 'All' || deal.owner === ownerFilter;
    const matchesValue = !minValueFilter || deal.value >= Number(minValueFilter);
    
    return matchesSearch && matchesOwner && matchesValue;
  });

  const getStageTotal = (stage: Deal['stage']) => {
    return filteredDeals.filter(d => d.stage === stage).reduce((acc, curr) => acc + curr.value, 0);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  const moveDeal = (id: string, direction: 'next' | 'prev', e: React.MouseEvent) => {
      e.stopPropagation(); // Prevent opening modal
      setDeals(prev => prev.map(d => {
          if (d.id !== id) return d;
          const currentIndex = stages.findIndex(s => s.id === d.stage);
          if (currentIndex === -1) return d;
          
          let newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
          if (newIndex < 0 || newIndex >= stages.length) return d;
          
          return { ...d, stage: stages[newIndex].id };
      }));
  };

  const getStageBadgeStyle = (stageId: string) => {
      switch(stageId) {
          case 'Lead': return 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300';
          case 'Qualified': return 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-300';
          case 'Proposal': return 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-300';
          case 'Negotiation': return 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-300';
          case 'Closed': return 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-300';
          default: return 'bg-slate-100 text-slate-600';
      }
  };

  const handleCreateDeal = (e: React.FormEvent) => {
      e.preventDefault();
      const newDeal: Deal = {
          id: Date.now().toString(),
          title: formData.title,
          client: formData.client,
          value: parseFloat(formData.value) || 0,
          owner: formData.owner,
          avatar: `https://ui-avatars.com/api/?name=${formData.owner}&background=random`,
          stage: formData.stage as Deal['stage'],
          probability: Number(formData.probability),
          closingDate: formData.closingDate ? new Date(formData.closingDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'TBD',
          tags: formData.tags.split(',').map(t => t.trim()).filter(t => t !== '')
      };

      setDeals([...deals, newDeal]);
      setIsModalOpen(false);
      setFormData({
        title: '',
        client: '',
        value: '',
        owner: 'Alex Johnson',
        stage: 'Lead',
        probability: 20,
        closingDate: '',
        tags: ''
      });
  };

  const getSortedStageDeals = (stageId: string, stageDeals: Deal[]) => {
      const sortType = columnSorts[stageId] || 'none';
      if (sortType === 'none') return stageDeals;
      
      return [...stageDeals].sort((a, b) => {
          if (sortType === 'asc') return a.value - b.value;
          return b.value - a.value; // desc
      });
  };

  const handleClearStage = (stageId: string) => {
      if (window.confirm(`Are you sure you want to remove all deals from ${stageId}? This cannot be undone.`)) {
          setDeals(prev => prev.filter(d => d.stage !== stageId));
      }
      setActiveColumnMenu(null);
  };

  const toggleSort = (stageId: string, type: 'asc' | 'desc' | 'none') => {
      setColumnSorts(prev => ({ ...prev, [stageId]: type }));
      setActiveColumnMenu(null);
  };

  // Forecast Logic
  const totalPipelineValue = filteredDeals.reduce((acc, d) => acc + d.value, 0);
  const weightedPipelineValue = filteredDeals.reduce((acc, d) => acc + (d.value * (d.probability / 100)), 0);

  return (
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      
      {/* Deal Detail Modal */}
      {selectedDeal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setSelectedDeal(null)}>
            <div 
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200 dark:border-slate-700"
                onClick={e => e.stopPropagation()}
            >
                {/* Modal Header */}
                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-sm">
                            {selectedDeal.client.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-none">{selectedDeal.title}</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{selectedDeal.client}</p>
                        </div>
                    </div>
                    <button onClick={() => setSelectedDeal(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700">
                        <X size={20} />
                    </button>
                </div>
                
                {/* Modal Content */}
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-700/50">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Value</span>
                            <span className="text-xl font-bold text-slate-900 dark:text-white">{formatCurrency(selectedDeal.value)}</span>
                        </div>
                        <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-700/50">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Probability</span>
                            <div className="flex items-center gap-2">
                                <span className="text-xl font-bold text-slate-900 dark:text-white">{selectedDeal.probability}%</span>
                                <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden max-w-[60px]">
                                    <div className="h-full bg-emerald-500" style={{ width: `${selectedDeal.probability}%` }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-700">
                            <span className="text-sm text-slate-500 dark:text-slate-400">Stage</span>
                            <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${getStageBadgeStyle(selectedDeal.stage)}`}>
                                {selectedDeal.stage}
                            </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-700">
                            <span className="text-sm text-slate-500 dark:text-slate-400">Owner</span>
                            <div className="flex items-center gap-2">
                                <img src={selectedDeal.avatar} alt={selectedDeal.owner} className="w-6 h-6 rounded-full border border-slate-200 dark:border-slate-600" />
                                <span className="text-sm font-medium text-slate-900 dark:text-white">{selectedDeal.owner}</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-700">
                            <span className="text-sm text-slate-500 dark:text-slate-400">Closing Date</span>
                            <div className="flex items-center gap-1.5 text-sm text-slate-700 dark:text-slate-200">
                                <Calendar size={14} className="text-slate-400" /> {selectedDeal.closingDate}
                            </div>
                        </div>
                        {selectedDeal.tags && selectedDeal.tags.length > 0 && (
                            <div className="py-2">
                                <span className="text-xs text-slate-500 dark:text-slate-400 block mb-2">Tags</span>
                                <div className="flex flex-wrap gap-2">
                                    {selectedDeal.tags.map(tag => (
                                        <span key={tag} className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded border border-slate-200 dark:border-slate-600">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200/50 dark:shadow-none flex items-center justify-center gap-2">
                            <Edit2 size={16} /> Edit Deal
                        </button>
                        <button className="flex-1 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                            <Mail size={16} /> Contact
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* Create Deal Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div 
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200 dark:border-slate-700"
                onClick={e => e.stopPropagation()}
            >
                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                        <Briefcase size={20} className="text-indigo-600 dark:text-indigo-400" /> 
                        Create New Deal
                    </h3>
                    <button 
                        onClick={() => setIsModalOpen(false)}
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors rounded-full p-1 hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                        <X size={20} />
                    </button>
                </div>
                
                <form onSubmit={handleCreateDeal} className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Title */}
                        <div className="md:col-span-2">
                            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5 block">Deal Title</label>
                            <input 
                                required
                                type="text" 
                                placeholder="e.g. Enterprise License Expansion"
                                value={formData.title}
                                onChange={(e) => setFormData({...formData, title: e.target.value})}
                                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white transition-all"
                            />
                        </div>

                        {/* Client */}
                        <div>
                            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5 block">Client Name</label>
                            <div className="relative">
                                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input 
                                    required
                                    type="text" 
                                    placeholder="Company or Contact"
                                    value={formData.client}
                                    onChange={(e) => setFormData({...formData, client: e.target.value})}
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white transition-all"
                                />
                            </div>
                        </div>

                        {/* Value */}
                        <div>
                            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5 block">Deal Value</label>
                            <div className="relative">
                                <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input 
                                    required
                                    type="number" 
                                    placeholder="0.00"
                                    value={formData.value}
                                    onChange={(e) => setFormData({...formData, value: e.target.value})}
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white transition-all"
                                />
                            </div>
                        </div>

                        {/* Stage */}
                        <div>
                            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5 block">Pipeline Stage</label>
                            <div className="relative">
                                <select 
                                    value={formData.stage}
                                    onChange={(e) => setFormData({...formData, stage: e.target.value})}
                                    className="w-full pl-4 pr-10 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white appearance-none cursor-pointer transition-all"
                                >
                                    {stages.map(s => (
                                        <option key={s.id} value={s.id}>{s.label}</option>
                                    ))}
                                </select>
                                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            </div>
                        </div>

                        {/* Closing Date */}
                        <div>
                            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5 block">Expected Closing</label>
                            <div className="relative">
                                <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input 
                                    type="date" 
                                    value={formData.closingDate}
                                    onChange={(e) => setFormData({...formData, closingDate: e.target.value})}
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white transition-all"
                                />
                            </div>
                        </div>

                        {/* Probability */}
                        <div className="md:col-span-2">
                            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2 flex justify-between">
                                <span>Probability</span>
                                <span className="text-indigo-600 dark:text-indigo-400">{formData.probability}%</span>
                            </label>
                            <input 
                                type="range" 
                                min="0" 
                                max="100" 
                                step="5"
                                value={formData.probability}
                                onChange={(e) => setFormData({...formData, probability: Number(e.target.value)})}
                                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                            />
                            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                                <span>0%</span>
                                <span>50%</span>
                                <span>100%</span>
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="md:col-span-2">
                            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5 block">Tags</label>
                            <div className="relative">
                                <Tag size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input 
                                    type="text" 
                                    placeholder="SaaS, Enterprise, Q4 (comma separated)"
                                    value={formData.tags}
                                    onChange={(e) => setFormData({...formData, tags: e.target.value})}
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
                        <button 
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-200/50 dark:shadow-none"
                        >
                            <Save size={18} /> Create Deal
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}

      {/* Forecast Modal */}
      {showForecastModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setShowForecastModal(false)}>
            <div 
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200 dark:border-slate-700"
                onClick={e => e.stopPropagation()}
            >
                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                        <BarChart3 size={20} className="text-emerald-500" /> 
                        Pipeline Forecast
                    </h3>
                    <button onClick={() => setShowForecastModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
                </div>
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1">Total Pipeline</span>
                            <span className="text-xl font-bold text-slate-900 dark:text-white">{formatCurrency(totalPipelineValue)}</span>
                        </div>
                        <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1">Weighted Value</span>
                            <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(weightedPipelineValue)}</span>
                        </div>
                    </div>
                    
                    <div className="space-y-3">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">By Stage</h4>
                        {stages.map(stage => {
                            const val = getStageTotal(stage.id);
                            const percent = totalPipelineValue > 0 ? (val / totalPipelineValue) * 100 : 0;
                            return (
                                <div key={stage.id} className="space-y-1">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-slate-600 dark:text-slate-300 font-medium">{stage.label}</span>
                                        <span className="text-slate-900 dark:text-white font-bold">{formatCurrency(val)}</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                        <div className={`h-full ${stage.color.split(' ')[0].replace('bg-', 'bg-')}`} style={{ width: `${percent}%` }}></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
                type="text" 
                placeholder="Search deals, clients, or owners..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900 focus:border-indigo-300 transition-all text-slate-800 dark:text-slate-200 placeholder-slate-400 shadow-sm"
            />
        </div>
        <div className="flex gap-2 relative">
            <div className="flex bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-1 shadow-sm">
                <button 
                    onClick={() => setViewMode('board')}
                    className={`p-2 rounded-lg transition-colors ${viewMode === 'board' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
                    title="Board View"
                >
                    <LayoutGrid size={16} />
                </button>
                <div className="w-px bg-slate-200 dark:bg-slate-700 my-1 mx-1"></div>
                <button 
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
                    title="List View"
                >
                    <List size={16} />
                </button>
            </div>

            <button 
                onClick={() => setShowForecastModal(true)}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors shadow-sm"
            >
                <BarChart3 size={16} /> Forecast
            </button>
            
            <div className="relative">
                <button 
                    onClick={() => setShowFilterMenu(!showFilterMenu)}
                    className={`flex items-center justify-center gap-2 px-4 py-2.5 border rounded-xl text-sm font-medium transition-colors shadow-sm ${
                        showFilterMenu || ownerFilter !== 'All' || minValueFilter 
                        ? 'bg-indigo-50 text-indigo-600 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-800' 
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                    }`}
                >
                    <Filter size={16} /> Filter {(ownerFilter !== 'All' || minValueFilter) && <span className="w-2 h-2 rounded-full bg-indigo-500"></span>}
                </button>
                
                {/* Filter Dropdown */}
                {showFilterMenu && (
                    <>
                        <div className="fixed inset-0 z-10" onClick={() => setShowFilterMenu(false)}></div>
                        <div className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 p-4 z-20 animate-in fade-in zoom-in-95">
                            <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-3">Filter Deals</h4>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Owner</label>
                                    <select 
                                        value={ownerFilter}
                                        onChange={(e) => setOwnerFilter(e.target.value)}
                                        className="w-full p-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:border-indigo-500 text-slate-700 dark:text-slate-200"
                                    >
                                        {owners.map(owner => (
                                            <option key={owner} value={owner}>{owner}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Min Value ($)</label>
                                    <input 
                                        type="number" 
                                        placeholder="e.g. 10000"
                                        value={minValueFilter}
                                        onChange={(e) => setMinValueFilter(e.target.value)}
                                        className="w-full p-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:border-indigo-500 text-slate-700 dark:text-slate-200"
                                    />
                                </div>
                                <div className="pt-2 border-t border-slate-100 dark:border-slate-700 flex justify-end">
                                    <button 
                                        onClick={() => {
                                            setOwnerFilter("All");
                                            setMinValueFilter("");
                                            setShowFilterMenu(false);
                                        }}
                                        className="text-xs text-slate-500 hover:text-indigo-600 font-medium"
                                    >
                                        Clear Filters
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

            <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200/50 dark:shadow-none"
            >
                <Plus size={18} /> New Deal
            </button>
        </div>
      </div>

      {/* Content Area */}
      {viewMode === 'board' ? (
        <div className="flex-1 overflow-x-auto overflow-y-hidden pb-4">
            <div className="flex h-full gap-4 min-w-[1200px]">
                {stages.map((stage) => {
                    const stageDealsOriginal = filteredDeals.filter(d => d.stage === stage.id);
                    const stageDeals = getSortedStageDeals(stage.id, stageDealsOriginal);
                    const totalValue = getStageTotal(stage.id);

                    return (
                        <div key={stage.id} className="flex-1 flex flex-col min-w-[280px] bg-slate-100/50 dark:bg-slate-900/50 rounded-2xl border border-slate-200/50 dark:border-slate-800/50">
                            {/* Column Header */}
                            <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-t-2xl sticky top-0 z-10 relative">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                        {stage.label}
                                        <span className="bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[10px] px-2 py-0.5 rounded-full">{stageDeals.length}</span>
                                    </span>
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setActiveColumnMenu(activeColumnMenu === stage.id ? null : stage.id);
                                        }}
                                        className="text-slate-400 cursor-pointer hover:text-slate-600 dark:hover:text-slate-300 p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors"
                                    >
                                        <MoreHorizontal size={16} />
                                    </button>
                                </div>
                                
                                {activeColumnMenu === stage.id && (
                                    <>
                                        <div className="fixed inset-0 z-20" onClick={() => setActiveColumnMenu(null)}></div>
                                        <div className="absolute top-8 right-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-1 z-30 animate-in fade-in zoom-in-95 duration-200 text-left">
                                            <button 
                                                onClick={() => toggleSort(stage.id, 'desc')}
                                                className={`w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors ${columnSorts[stage.id] === 'desc' ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600' : ''}`}
                                            >
                                                <ArrowDown size={14} className="text-slate-400" /> Sort Value (High-Low)
                                            </button>
                                            <button 
                                                onClick={() => toggleSort(stage.id, 'asc')}
                                                className={`w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors ${columnSorts[stage.id] === 'asc' ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600' : ''}`}
                                            >
                                                <ArrowUp size={14} className="text-slate-400" /> Sort Value (Low-High)
                                            </button>
                                            {columnSorts[stage.id] && columnSorts[stage.id] !== 'none' && (
                                                <button 
                                                    onClick={() => toggleSort(stage.id, 'none')}
                                                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                                                >
                                                    <X size={14} className="text-slate-400" /> Clear Sort
                                                </button>
                                            )}
                                            <div className="h-px bg-slate-100 dark:bg-slate-700 my-1"></div>
                                            <button 
                                                onClick={() => handleClearStage(stage.id)}
                                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                                                disabled={stageDeals.length === 0}
                                            >
                                                <Trash2 size={14} /> Clear All Deals
                                            </button>
                                        </div>
                                    </>
                                )}

                                <div className={`h-1 w-full rounded-full ${stage.color} mb-2 opacity-50`}></div>
                                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                                    {formatCurrency(totalValue)}
                                </div>
                            </div>

                            {/* Cards Container */}
                            <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-hide">
                                {stageDeals.map((deal) => (
                                    <div 
                                        key={deal.id}
                                        onClick={() => setSelectedDeal(deal)}
                                        className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all group cursor-pointer active:cursor-grabbing relative"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">{deal.client}</div>
                                            {/* Hover Actions */}
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                                {stage.id !== 'Lead' && (
                                                    <button onClick={(e) => moveDeal(deal.id, 'prev', e)} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-400" title="Move Back">
                                                        <ChevronDown size={14} className="rotate-90" />
                                                    </button>
                                                )}
                                                {stage.id !== 'Closed' && (
                                                    <button onClick={(e) => moveDeal(deal.id, 'next', e)} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-400" title="Move Next">
                                                        <ChevronDown size={14} className="-rotate-90" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        
                                        <h4 className="font-bold text-slate-900 dark:text-white mb-3 text-sm leading-tight">{deal.title}</h4>
                                        
                                        <div className="flex items-center gap-2 mb-4">
                                            {deal.tags?.map(tag => (
                                                <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded border border-slate-200 dark:border-slate-600">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="mb-4">
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Probability</span>
                                                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{deal.probability}%</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                                <div 
                                                    className={`h-full rounded-full transition-all duration-500 ${
                                                        deal.probability >= 70 ? 'bg-emerald-500' : 
                                                        deal.probability >= 40 ? 'bg-blue-500' : 'bg-amber-500'
                                                    }`} 
                                                    style={{ width: `${deal.probability}%` }}
                                                ></div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700">
                                            <div className="flex items-center gap-2">
                                                <img src={deal.avatar} alt={deal.owner} className="w-6 h-6 rounded-full border border-slate-100 dark:border-slate-600" title={deal.owner} />
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] text-slate-400">Value</span>
                                                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{formatCurrency(deal.value)}</span>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium bg-slate-50 dark:bg-slate-700/50 px-2 py-1 rounded">
                                                <Clock size={12} /> {deal.closingDate}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {stageDeals.length === 0 && (
                                    <div className="h-24 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-center text-slate-400 text-xs font-medium">
                                        Drop items here
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden flex-1 flex flex-col">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[900px]">
                    <thead>
                        <tr className="bg-slate-50/80 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700">
                            <th className="py-4 pl-6 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Deal Name</th>
                            <th className="py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Stage</th>
                            <th className="py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Value</th>
                            <th className="py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 w-48">Probability</th>
                            <th className="py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Owner</th>
                            <th className="py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Closing</th>
                            <th className="py-4 pr-6 w-10"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                        {filteredDeals.map(deal => (
                            <tr 
                                key={deal.id} 
                                onClick={() => setSelectedDeal(deal)}
                                className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors cursor-pointer group"
                            >
                                <td className="py-4 pl-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 font-bold text-xs shrink-0">
                                            {deal.client.substring(0, 2).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm text-slate-900 dark:text-white">{deal.title}</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">{deal.client}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStageBadgeStyle(deal.stage)}`}>
                                        {deal.stage}
                                    </span>
                                </td>
                                <td className="py-4 text-sm font-bold text-slate-700 dark:text-slate-300">
                                    {formatCurrency(deal.value)}
                                </td>
                                <td className="py-4">
                                    <div className="w-full pr-4">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{deal.probability}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full rounded-full transition-all duration-500 ${
                                                    deal.probability > 70 ? 'bg-emerald-500' : 
                                                    deal.probability > 40 ? 'bg-blue-500' : 'bg-amber-500'
                                                }`} 
                                                style={{ width: `${deal.probability}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4">
                                    <div className="flex items-center gap-2">
                                        <img src={deal.avatar} alt={deal.owner} className="w-6 h-6 rounded-full border border-slate-200 dark:border-slate-600" />
                                        <span className="text-sm text-slate-600 dark:text-slate-300">{deal.owner}</span>
                                    </div>
                                </td>
                                <td className="py-4">
                                    <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                                        <Calendar size={14} /> {deal.closingDate}
                                    </div>
                                </td>
                                <td className="py-4 pr-6 text-right">
                                    <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                                        <MoreHorizontal size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      )}
    </div>
  );
};
