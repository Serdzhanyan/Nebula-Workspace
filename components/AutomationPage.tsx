
import React, { useState } from 'react';
import { Plus, Zap, ArrowRight, Mail, Bell, CheckSquare, MoreHorizontal, Play, Pause, Trash2, Settings, UserPlus, DollarSign, Users, Target, Send, Filter, Layers, Megaphone, BarChart2, MousePointer, Eye, TrendingUp, X, Smartphone, Share2, MessageSquare, Check, Save, Edit2, Copy, FileText, Loader2, Globe } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface Workflow {
  id: string;
  name: string;
  trigger: string;
  action: string;
  status: 'active' | 'paused';
  runs: number;
}

interface Segment {
  id: string;
  name: string;
  criteria: string;
  count: number;
  lastUpdated: string;
  tags: string[];
}

interface Campaign {
  id: string;
  name: string;
  type: 'Email' | 'SMS' | 'Social' | 'Ad';
  status: 'Active' | 'Completed' | 'Scheduled' | 'Draft';
  sent: number;
  openRate?: number;
  clickRate: number;
  conversionRate: number;
  revenue: number;
}

export const AutomationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'workflows' | 'segments' | 'marketing'>('workflows');
  const [activeWorkflowMenu, setActiveWorkflowMenu] = useState<string | null>(null);
  const [activeSegmentMenu, setActiveSegmentMenu] = useState<string | null>(null);
  
  // State for Create Campaign Modal
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    channel: 'Email' as 'Email' | 'SMS' | 'Social' | 'Ad',
    segment: '',
    content: ''
  });

  // State for Campaign Detail Modal
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  // State for Create Workflow Modal
  const [isWorkflowModalOpen, setIsWorkflowModalOpen] = useState(false);
  const [newWorkflow, setNewWorkflow] = useState({
    name: '',
    trigger: 'New Lead Created',
    action: 'Send Email Sequence'
  });

  // State for Create Segment Modal
  const [isSegmentModalOpen, setIsSegmentModalOpen] = useState(false);
  const [newSegment, setNewSegment] = useState({
    name: '',
    criteria: '',
    tags: ''
  });

  const [workflows, setWorkflows] = useState<Workflow[]>([
    { id: '1', name: 'New Lead Welcome', trigger: 'New Lead Created', action: 'Send Email Sequence', status: 'active', runs: 1240 },
    { id: '2', name: 'High Value Deal Alert', trigger: 'Deal Value > $10k', action: 'Notify Manager', status: 'active', runs: 45 },
    { id: '3', name: 'Stalled Deal Follow-up', trigger: 'Stage unchanged 7 days', action: 'Create Task', status: 'paused', runs: 89 },
    { id: '4', name: 'Contract Signed', trigger: 'Stage moves to Closed', action: 'Create Onboarding Project', status: 'active', runs: 12 },
  ]);

  const [segments, setSegments] = useState<Segment[]>([
    { id: 's1', name: 'High Value Customers', criteria: 'Lifetime Value > $10,000', count: 142, lastUpdated: '2 hours ago', tags: ['VIP', 'Revenue'] },
    { id: 's2', name: 'At Risk Churn', criteria: 'No activity > 60 days', count: 58, lastUpdated: '1 day ago', tags: ['Risk', 'Retention'] },
    { id: 's3', name: 'Recent Signups', criteria: 'Joined in last 30 days', count: 320, lastUpdated: '10 mins ago', tags: ['New', 'Onboarding'] },
    { id: 's4', name: 'Enterprise Leads', criteria: 'Company Size > 500', count: 85, lastUpdated: '3 days ago', tags: ['B2B', 'Sales'] },
    { id: 's5', name: 'Product A Users', criteria: 'Purchased Product A', count: 1250, lastUpdated: '5 hours ago', tags: ['Product', 'Upsell'] },
    { id: 's6', name: 'Webinar Attendees', criteria: 'Attended Q3 Webinar', count: 450, lastUpdated: '1 week ago', tags: ['Event', 'Marketing'] },
  ]);

  const [campaigns, setCampaigns] = useState<Campaign[]>([
    { id: 'c1', name: 'Q4 Product Launch', type: 'Email', status: 'Active', sent: 5400, openRate: 45.2, clickRate: 12.5, conversionRate: 3.8, revenue: 12500 },
    { id: 'c2', name: 'Black Friday Prep', type: 'Ad', status: 'Scheduled', sent: 0, clickRate: 0, conversionRate: 0, revenue: 0 },
    { id: 'c3', name: 'Webinar Invite', type: 'Email', status: 'Completed', sent: 2100, openRate: 68.5, clickRate: 25.1, conversionRate: 15.2, revenue: 4500 },
    { id: 'c4', name: 'Retargeting Alpha', type: 'Ad', status: 'Active', sent: 15000, clickRate: 2.1, conversionRate: 0.8, revenue: 3200 },
    { id: 'c5', name: 'Loyalty Rewards', type: 'Social', status: 'Completed', sent: 8500, clickRate: 5.4, conversionRate: 1.2, revenue: 1800 },
  ]);

  const campaignChartData = campaigns
    .filter(c => c.status === 'Completed' || c.status === 'Active')
    .map(c => ({
      name: c.name,
      Revenue: c.revenue,
      Cost: c.sent * 0.15 // Mock cost calculation
    }));

  const toggleStatus = (id: string) => {
    setWorkflows(prev => prev.map(w => w.id === id ? { ...w, status: w.status === 'active' ? 'paused' : 'active' } : w));
  };

  const deleteWorkflow = (id: string) => {
      if (window.confirm("Are you sure you want to delete this workflow?")) {
          setWorkflows(prev => prev.filter(w => w.id !== id));
      }
      setActiveWorkflowMenu(null);
  };

  const deleteSegment = (id: string) => {
      if (window.confirm("Are you sure you want to delete this segment?")) {
          setSegments(prev => prev.filter(s => s.id !== id));
      }
      setActiveSegmentMenu(null);
  };

  const launchCampaign = (segmentName: string) => {
      // Pre-fill modal
      setNewCampaign({ ...newCampaign, segment: segmentName });
      setIsCampaignModalOpen(true);
      setActiveTab('marketing');
  };

  const handleCreateCampaign = (e: React.FormEvent) => {
      e.preventDefault();
      const campaign: Campaign = {
          id: `c-${Date.now()}`,
          name: newCampaign.name,
          type: newCampaign.channel,
          status: 'Scheduled',
          sent: 0,
          clickRate: 0,
          conversionRate: 0,
          revenue: 0
      };
      setCampaigns([campaign, ...campaigns]);
      setIsCampaignModalOpen(false);
      setNewCampaign({ name: '', channel: 'Email', segment: '', content: '' });
  };

  const handleCreateWorkflow = (e: React.FormEvent) => {
      e.preventDefault();
      const workflow: Workflow = {
          id: `w-${Date.now()}`,
          name: newWorkflow.name,
          trigger: newWorkflow.trigger,
          action: newWorkflow.action,
          status: 'active',
          runs: 0
      };
      setWorkflows([workflow, ...workflows]);
      setIsWorkflowModalOpen(false);
      setNewWorkflow({ name: '', trigger: 'New Lead Created', action: 'Send Email Sequence' });
  };

  const handleCreateSegment = (e: React.FormEvent) => {
      e.preventDefault();
      const segment: Segment = {
          id: `s-${Date.now()}`,
          name: newSegment.name,
          criteria: newSegment.criteria,
          count: 0,
          lastUpdated: 'Just now',
          tags: newSegment.tags.split(',').map(t => t.trim()).filter(t => t)
      };
      setSegments([segment, ...segments]);
      setIsSegmentModalOpen(false);
      setNewSegment({ name: '', criteria: '', tags: '' });
  };

  const insertToken = (token: string) => {
      setNewCampaign(prev => ({ ...prev, content: prev.content + ` ${token} ` }));
  };

  const getTriggerIcon = (trigger: string) => {
    if (trigger.includes('Lead')) return <UserPlus size={16} className="text-blue-500" />;
    if (trigger.includes('Value')) return <DollarSign size={16} className="text-emerald-500" />;
    return <Zap size={16} className="text-amber-500" />;
  };

  const getActionIcon = (action: string) => {
    if (action.includes('Email')) return <Mail size={16} className="text-purple-500" />;
    if (action.includes('Notify')) return <Bell size={16} className="text-red-500" />;
    if (action.includes('Task')) return <CheckSquare size={16} className="text-indigo-500" />;
    return <Settings size={16} className="text-slate-500" />;
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  const getStatusColor = (status: string) => {
      switch(status) {
          case 'Active': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
          case 'Completed': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
          case 'Scheduled': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800';
          default: return 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400 border-slate-200 dark:border-slate-600';
      }
  };

  const getTypeIcon = (type: string) => {
      switch(type) {
          case 'Email': return <Mail size={16} />;
          case 'SMS': return <Smartphone size={16} />;
          case 'Social': return <Share2 size={16} />;
          case 'Ad': return <Globe size={16} />;
          default: return <Megaphone size={16} />;
      }
  };

  return (
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      
      {/* Create Workflow Modal */}
      {isWorkflowModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setIsWorkflowModalOpen(false)}>
            <div 
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200 dark:border-slate-700" 
                onClick={e => e.stopPropagation()}
            >
                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                        <Layers size={20} className="text-indigo-600 dark:text-indigo-400" />
                        Create Automation Workflow
                    </h3>
                    <button onClick={() => setIsWorkflowModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                        <X size={20} />
                    </button>
                </div>
                
                <form onSubmit={handleCreateWorkflow} className="p-6 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Workflow Name</label>
                            <input 
                                type="text" 
                                placeholder="e.g. VIP Onboarding"
                                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                                value={newWorkflow.name}
                                onChange={e => setNewWorkflow({...newWorkflow, name: e.target.value})}
                                required
                            />
                        </div>
                        
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Trigger</label>
                            <div className="relative">
                                <Zap size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                <select 
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white appearance-none cursor-pointer"
                                    value={newWorkflow.trigger}
                                    onChange={e => setNewWorkflow({...newWorkflow, trigger: e.target.value})}
                                >
                                    <option>New Lead Created</option>
                                    <option>Deal Value {'>'} $10k</option>
                                    <option>Stage unchanged 7 days</option>
                                    <option>Contract Signed</option>
                                    <option>Deal Lost</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Action</label>
                            <div className="relative">
                                <Settings size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                <select 
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white appearance-none cursor-pointer"
                                    value={newWorkflow.action}
                                    onChange={e => setNewWorkflow({...newWorkflow, action: e.target.value})}
                                >
                                    <option>Send Email Sequence</option>
                                    <option>Notify Manager</option>
                                    <option>Create Task</option>
                                    <option>Create Onboarding Project</option>
                                    <option>Update Field</option>
                                    <option>Send Email</option>
                                    <option>Send Notification</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button 
                            type="button" 
                            onClick={() => setIsWorkflowModalOpen(false)}
                            className="flex-1 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-medium text-sm hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-200/50 dark:shadow-none"
                        >
                            <Plus size={16} /> Create Workflow
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}

      {/* Create Segment Modal */}
      {isSegmentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setIsSegmentModalOpen(false)}>
            <div 
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200 dark:border-slate-700" 
                onClick={e => e.stopPropagation()}
            >
                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                        <Users size={20} className="text-indigo-600 dark:text-indigo-400" />
                        Create New Segment
                    </h3>
                    <button onClick={() => setIsSegmentModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                        <X size={20} />
                    </button>
                </div>
                
                <form onSubmit={handleCreateSegment} className="p-6 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Segment Name</label>
                            <input 
                                type="text" 
                                placeholder="e.g. Loyal Customers"
                                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                                value={newSegment.name}
                                onChange={e => setNewSegment({...newSegment, name: e.target.value})}
                                required
                            />
                        </div>
                        
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Filtering Criteria</label>
                            <input 
                                type="text" 
                                placeholder="e.g. Total Spend > $500"
                                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                                value={newSegment.criteria}
                                onChange={e => setNewSegment({...newSegment, criteria: e.target.value})}
                                required
                            />
                        </div>

                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Tags (comma separated)</label>
                            <input 
                                type="text" 
                                placeholder="e.g. Sales, Marketing, VIP"
                                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                                value={newSegment.tags}
                                onChange={e => setNewSegment({...newSegment, tags: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button 
                            type="button" 
                            onClick={() => setIsSegmentModalOpen(false)}
                            className="flex-1 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-medium text-sm hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-200/50 dark:shadow-none"
                        >
                            <Plus size={16} /> Save Segment
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}

      {/* Campaign Detail Modal */}
      {selectedCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setSelectedCampaign(null)}>
            <div 
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200 dark:border-slate-700" 
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                    <div className="flex items-center gap-3">
                         <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg">
                            {getTypeIcon(selectedCampaign.type)}
                         </div>
                         <div>
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-tight">{selectedCampaign.name}</h3>
                            <div className="mt-1">
                                <span className={`text-[10px] font-bold uppercase tracking-wider ${getStatusColor(selectedCampaign.status)} px-2 py-0.5 rounded-full border`}>
                                    {selectedCampaign.status}
                                </span>
                            </div>
                         </div>
                    </div>
                    <button onClick={() => setSelectedCampaign(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors rounded-full p-1 hover:bg-slate-100 dark:hover:bg-slate-700">
                        <X size={20} />
                    </button>
                </div>
                
                <div className="p-6 space-y-6">
                    {/* Key Stats */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-700">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1">Total Revenue</span>
                            <span className="text-xl font-bold text-slate-900 dark:text-white">{formatCurrency(selectedCampaign.revenue)}</span>
                        </div>
                        <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-700">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1">Audience Size</span>
                            <span className="text-xl font-bold text-slate-900 dark:text-white">{selectedCampaign.sent.toLocaleString()}</span>
                        </div>
                    </div>

                    {/* Funnel Metrics */}
                    <div className="space-y-4">
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">Engagement Funnel</h4>
                        
                        {selectedCampaign.openRate !== undefined && (
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-slate-600 dark:text-slate-300">Open Rate</span>
                                    <span className="font-bold text-slate-900 dark:text-white">{selectedCampaign.openRate}%</span>
                                </div>
                                <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                                    <div className="bg-blue-500 h-full rounded-full" style={{ width: `${selectedCampaign.openRate}%` }}></div>
                                </div>
                            </div>
                        )}

                        <div>
                            <div className="flex justify-between text-xs mb-1">
                                <span className="text-slate-600 dark:text-slate-300">Click Rate</span>
                                <span className="font-bold text-slate-900 dark:text-white">{selectedCampaign.clickRate}%</span>
                            </div>
                            <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                                <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${selectedCampaign.clickRate}%` }}></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-xs mb-1">
                                <span className="text-slate-600 dark:text-slate-300">Conversion Rate</span>
                                <span className="font-bold text-slate-900 dark:text-white">{selectedCampaign.conversionRate}%</span>
                            </div>
                            <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                                <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${selectedCampaign.conversionRate}%` }}></div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="pt-2 flex justify-end gap-2 border-t border-slate-100 dark:border-slate-700">
                         <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                            View Report
                         </button>
                         <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm">
                            Edit Campaign
                         </button>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* Create Campaign Modal */}
      {isCampaignModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setIsCampaignModalOpen(false)}>
            <div 
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200 dark:border-slate-700" 
                onClick={e => e.stopPropagation()}
            >
                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                        <Megaphone size={20} className="text-indigo-600 dark:text-indigo-400" />
                        New Marketing Campaign
                    </h3>
                    <button onClick={() => setIsCampaignModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                        <X size={20} />
                    </button>
                </div>
                
                <form onSubmit={handleCreateCampaign} className="p-6 space-y-6">
                    {/* Name & Channel */}
                    <div className="space-y-4">
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Campaign Name</label>
                            <input 
                                type="text" 
                                placeholder="e.g. Summer Sale Announcement"
                                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                                value={newCampaign.name}
                                onChange={e => setNewCampaign({...newCampaign, name: e.target.value})}
                                required
                            />
                        </div>
                        
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 block">Select Channel</label>
                            <div className="grid grid-cols-4 gap-3">
                                {['Email', 'SMS', 'Social', 'Ad'].map((channel) => (
                                    <div 
                                        key={channel}
                                        onClick={() => setNewCampaign({...newCampaign, channel: channel as any})}
                                        className={`cursor-pointer rounded-xl border p-4 flex flex-col items-center gap-2 transition-all ${
                                            newCampaign.channel === channel 
                                            ? 'bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-900/20 dark:border-indigo-700 dark:text-indigo-300 ring-1 ring-indigo-500/50' 
                                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                                        }`}
                                    >
                                        {channel === 'Email' && <Mail size={24} />}
                                        {channel === 'SMS' && <Smartphone size={24} />}
                                        {channel === 'Social' && <Share2 size={24} />}
                                        {channel === 'Ad' && <Globe size={24} />}
                                        <span className="text-xs font-bold">{channel}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Audience */}
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Target Audience</label>
                        <div className="relative">
                            <select 
                                className="w-full pl-4 pr-10 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white appearance-none cursor-pointer"
                                value={newCampaign.segment}
                                onChange={e => setNewCampaign({...newCampaign, segment: e.target.value})}
                                required
                            >
                                <option value="">Select a segment...</option>
                                {segments.map(s => (
                                    <option key={s.id} value={s.name}>{s.name} ({s.count} contacts)</option>
                                ))}
                            </select>
                            <Users size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Content */}
                    <div>
                        <div className="flex justify-between items-center mb-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block">Message Content</label>
                            <div className="flex gap-1">
                                {['{FirstName}', '{Company}', '{City}'].map(token => (
                                    <button 
                                        key={token}
                                        type="button"
                                        onClick={() => insertToken(token)}
                                        className="text-[10px] bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
                                    >
                                        + {token}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <textarea 
                            className="w-full p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white resize-none h-32 leading-relaxed"
                            placeholder={newCampaign.channel === 'Email' ? "Subject: Exclusive Offer for {FirstName}..." : "Hi {FirstName}, check out our latest..."}
                            value={newCampaign.content}
                            onChange={e => setNewCampaign({...newCampaign, content: e.target.value})}
                            required
                        />
                        <p className="text-[10px] text-slate-400 mt-1 text-right">
                            {newCampaign.content.length} characters
                        </p>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button 
                            type="button" 
                            onClick={() => setIsCampaignModalOpen(false)}
                            className="flex-1 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-medium text-sm hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-200/50 dark:shadow-none"
                        >
                            <Send size={16} /> Schedule Campaign
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
              <Zap className="text-indigo-500" /> Automation & Segmentation
           </h2>
           <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Streamline workflows, target groups, and track marketing effectiveness.
           </p>
        </div>
        
        <div className="flex gap-2">
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                <button 
                    onClick={() => setActiveTab('workflows')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'workflows' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                >
                    Workflows
                </button>
                <button 
                    onClick={() => setActiveTab('segments')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'segments' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                >
                    Segments
                </button>
                <button 
                    onClick={() => setActiveTab('marketing')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'marketing' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                >
                    Marketing
                </button>
            </div>
            <button 
                onClick={() => {
                    if (activeTab === 'marketing') {
                        setIsCampaignModalOpen(true);
                    } else if (activeTab === 'segments') {
                        setIsSegmentModalOpen(true);
                    } else {
                        setIsWorkflowModalOpen(true);
                    }
                }}
                className="flex items-center justify-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200/50 dark:shadow-none"
            >
                <Plus size={18} /> 
                {activeTab === 'workflows' ? 'Create Workflow' : activeTab === 'segments' ? 'Create Segment' : 'New Campaign'}
            </button>
        </div>
      </div>

      {activeTab === 'workflows' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full min-h-0">
            {/* Main List */}
            <div className="lg:col-span-2 flex flex-col gap-4 overflow-y-auto pr-2">
                {workflows.map((workflow) => (
                    <div key={workflow.id} className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all group">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${workflow.status === 'active' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 'bg-slate-100 dark:bg-slate-700 text-slate-500'}`}>
                                    <Zap size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">{workflow.name}</h3>
                                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                                        <span className={`flex items-center gap-1 ${workflow.status === 'active' ? 'text-emerald-600' : 'text-slate-400'}`}>
                                            <div className={`w-1.5 h-1.5 rounded-full ${workflow.status === 'active' ? 'bg-emerald-500' : 'bg-slate-400'}`}></div>
                                            {workflow.status === 'active' ? 'Active' : 'Paused'}
                                        </span>
                                        <span>•</span>
                                        <span>{workflow.runs} runs</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 relative">
                                <button 
                                    onClick={() => toggleStatus(workflow.id)}
                                    className={`p-2 rounded-lg transition-colors ${workflow.status === 'active' ? 'text-slate-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20' : 'text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20'}`}
                                    title={workflow.status === 'active' ? 'Pause' : 'Activate'}
                                >
                                    {workflow.status === 'active' ? <Pause size={16} /> : <Play size={16} />}
                                </button>
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveWorkflowMenu(activeWorkflowMenu === workflow.id ? null : workflow.id);
                                    }}
                                    className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
                                >
                                    <Settings size={16} />
                                </button>

                                {/* Context Menu */}
                                {activeWorkflowMenu === workflow.id && (
                                    <>
                                        <div className="fixed inset-0 z-10" onClick={() => setActiveWorkflowMenu(null)}></div>
                                        <div className="absolute top-10 right-0 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 py-1 z-20 animate-in fade-in zoom-in-95 duration-200">
                                            <button 
                                                onClick={() => setActiveWorkflowMenu(null)}
                                                className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2"
                                            >
                                                <Edit2 size={14} className="text-slate-400" /> Edit Workflow
                                            </button>
                                            <button 
                                                onClick={() => setActiveWorkflowMenu(null)}
                                                className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2"
                                            >
                                                <Copy size={14} className="text-slate-400" /> Duplicate
                                            </button>
                                            <button 
                                                onClick={() => setActiveWorkflowMenu(null)}
                                                className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2"
                                            >
                                                <FileText size={14} className="text-slate-400" /> View Logs
                                            </button>
                                            <div className="h-px bg-slate-100 dark:bg-slate-700 my-1"></div>
                                            <button 
                                                onClick={() => deleteWorkflow(workflow.id)}
                                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 flex items-center gap-2"
                                            >
                                                <Trash2 size={14} /> Delete
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Flow Visual */}
                        <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-700/50 relative overflow-hidden">
                            {/* Connecting Line */}
                            <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-slate-200 dark:bg-slate-700 -z-10"></div>

                            <div className="flex-1 flex items-center gap-3 bg-white dark:bg-slate-800 p-2 rounded-lg border border-slate-200 dark:border-slate-700 z-10 min-w-0">
                                <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                                    {getTriggerIcon(workflow.trigger)}
                                </div>
                                <div className="min-w-0">
                                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">IF</span>
                                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 truncate block">{workflow.trigger}</span>
                                </div>
                            </div>

                            <div className="z-10 bg-slate-200 dark:bg-slate-700 rounded-full p-1 text-slate-500">
                                <ArrowRight size={12} />
                            </div>

                            <div className="flex-1 flex items-center gap-3 bg-white dark:bg-slate-800 p-2 rounded-lg border border-slate-200 dark:border-slate-700 z-10 min-w-0">
                                <div className="w-8 h-8 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center shrink-0">
                                    {getActionIcon(workflow.action)}
                                </div>
                                <div className="min-w-0">
                                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">THEN</span>
                                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 truncate block">{workflow.action}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Sidebar: Activity Log */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 flex flex-col">
                <h3 className="font-bold text-slate-900 dark:text-white mb-4">Recent Activity</h3>
                <div className="space-y-4 flex-1 overflow-y-auto pr-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex gap-3 items-start">
                            <div className="mt-1 w-2 h-2 rounded-full bg-indigo-500 shrink-0"></div>
                            <div>
                                <p className="text-xs text-slate-600 dark:text-slate-300">
                                    <span className="font-semibold text-slate-800 dark:text-slate-100">New Lead Welcome</span> ran for <span className="font-semibold text-slate-800 dark:text-slate-100">John Doe</span>
                                </p>
                                <p className="text-[10px] text-slate-400 mt-0.5">{i * 15} minutes ago</p>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="w-full mt-4 py-2 text-xs font-medium text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors">
                    View Full Logs
                </button>
            </div>
        </div>
      )}

      {activeTab === 'segments' && (
        <div className="animate-in fade-in slide-in-from-bottom-2">
            {/* Segments Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {segments.map(segment => (
                    <div key={segment.id} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-lg transition-all hover:border-indigo-200 dark:hover:border-indigo-800 group relative">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-xl">
                                <Users size={22} />
                            </div>
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveSegmentMenu(activeSegmentMenu === segment.id ? null : segment.id);
                                }}
                                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
                            >
                                <MoreHorizontal size={18} />
                            </button>

                            {/* Segment Context Menu */}
                            {activeSegmentMenu === segment.id && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setActiveSegmentMenu(null)}></div>
                                    <div className="absolute top-12 right-4 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 py-1 z-20 animate-in fade-in zoom-in-95 duration-200">
                                        <button 
                                            onClick={() => setActiveSegmentMenu(null)}
                                            className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2"
                                        >
                                            <Edit2 size={14} className="text-slate-400" /> Edit Segment
                                        </button>
                                        <button 
                                            onClick={() => setActiveSegmentMenu(null)}
                                            className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2"
                                        >
                                            <Users size={14} className="text-slate-400" /> View Contacts
                                        </button>
                                        <div className="h-px bg-slate-100 dark:bg-slate-700 my-1"></div>
                                        <button 
                                            onClick={() => deleteSegment(segment.id)}
                                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 flex items-center gap-2"
                                        >
                                            <Trash2 size={14} /> Delete Segment
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                        
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{segment.name}</h3>
                        
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-xs font-medium px-2 py-1 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600">
                                {segment.count} Contacts
                            </span>
                            {segment.tags.map(tag => (
                                <span key={tag} className="text-[10px] font-medium px-2 py-1 rounded bg-slate-50 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-100 dark:border-slate-700/50 mb-6">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Criteria</span>
                            <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                                <Filter size={14} className="text-indigo-500" />
                                {segment.criteria}
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                            <span className="text-[10px] text-slate-400">Updated {segment.lastUpdated}</span>
                            <button 
                                onClick={() => launchCampaign(segment.name)}
                                className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 transition-colors shadow-sm"
                            >
                                <Send size={12} /> Launch Campaign
                            </button>
                        </div>
                    </div>
                ))}
                
                {/* Add New Segment Card */}
                <div 
                    onClick={() => setIsSegmentModalOpen(true)}
                    className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 p-6 flex flex-col items-center justify-center text-center hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/10 transition-all cursor-pointer group h-full min-h-[250px]"
                >
                    <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
                        <Plus size={24} className="text-indigo-500" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Create New Segment</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 max-w-[200px]">Define criteria to group your customers for targeted actions.</p>
                </div>
            </div>
        </div>
      )}

      {activeTab === 'marketing' && (
          <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 h-full">
              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Reach</span>
                          <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                              <Megaphone size={16} />
                          </div>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white">31,000</h3>
                      <div className="flex items-center gap-1 mt-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                          <TrendingUp size={12} /> +12.5% <span className="font-normal text-slate-400 ml-1">last 30 days</span>
                      </div>
                  </div>

                  <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Conversions</span>
                          <div className="p-1.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg">
                              <Target size={16} />
                          </div>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white">482</h3>
                      <div className="flex items-center gap-1 mt-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                          <TrendingUp size={12} /> +5.4% <span className="font-normal text-slate-400 ml-1">avg. rate 4.2%</span>
                      </div>
                  </div>

                  <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Avg. ROI</span>
                          <div className="p-1.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg">
                              <BarChart2 size={16} />
                          </div>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white">315%</h3>
                      <p className="text-xs text-slate-500 mt-1">$2.40 revenue per $1 spend</p>
                  </div>
              </div>

              <div className="flex flex-col xl:flex-row gap-6 flex-1 min-h-0">
                  {/* Campaign Table */}
                  <div className="flex-1 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col">
                      <div className="p-5 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                          <div className="flex items-center gap-4">
                              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Campaign Performance</h3>
                              <button 
                                  onClick={() => setIsCampaignModalOpen(true)}
                                  className="flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-3 py-1.5 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors"
                              >
                                  <Plus size={14} /> New Campaign
                              </button>
                          </div>
                          <button className="text-xs font-medium text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline">View All</button>
                      </div>
                      <div className="flex-1 overflow-x-auto">
                          <table className="w-full text-left border-collapse min-w-[600px]">
                              <thead className="bg-slate-50/50 dark:bg-slate-900/50 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                                  <tr>
                                      <th className="p-4 pl-6">Campaign</th>
                                      <th className="p-4">Status</th>
                                      <th className="p-4">Sent/Reach</th>
                                      <th className="p-4">Conv. Rate</th>
                                      <th className="p-4 pr-6 text-right">Revenue</th>
                                  </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                                  {campaigns.map((campaign) => (
                                      <tr 
                                        key={campaign.id} 
                                        onClick={() => setSelectedCampaign(campaign)}
                                        className="hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors cursor-pointer"
                                      >
                                          <td className="p-4 pl-6">
                                              <div>
                                                  <p className="font-bold text-sm text-slate-900 dark:text-white">{campaign.name}</p>
                                                  <p className="text-xs text-slate-500">{campaign.type}</p>
                                              </div>
                                          </td>
                                          <td className="p-4">
                                              <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${getStatusColor(campaign.status)}`}>
                                                  {campaign.status}
                                              </span>
                                          </td>
                                          <td className="p-4 text-sm text-slate-600 dark:text-slate-300">
                                              {campaign.sent.toLocaleString()}
                                          </td>
                                          <td className="p-4">
                                              <div className="flex items-center gap-2">
                                                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{campaign.conversionRate}%</span>
                                                  <div className="w-16 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                                      <div className="h-full bg-emerald-500" style={{ width: `${Math.min(campaign.conversionRate * 5, 100)}%` }}></div>
                                                  </div>
                                              </div>
                                          </td>
                                          <td className="p-4 pr-6 text-right font-mono text-sm font-bold text-slate-900 dark:text-white">
                                              {formatCurrency(campaign.revenue)}
                                          </td>
                                      </tr>
                                  ))}
                              </tbody>
                          </table>
                      </div>
                  </div>

                  {/* Chart Section */}
                  <div className="xl:w-96 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 flex flex-col">
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6">Revenue vs Cost</h3>
                      <div className="flex-1 w-full min-h-[200px]">
                          <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={campaignChartData}>
                                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                                  <XAxis dataKey="name" hide />
                                  <YAxis hide />
                                  <Tooltip 
                                      contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                      itemStyle={{ color: '#1e293b', fontSize: '12px' }}
                                      cursor={{ fill: 'transparent' }}
                                  />
                                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                                  <Bar dataKey="Revenue" fill="#6366f1" radius={[4, 4, 0, 0]} />
                                  <Bar dataKey="Cost" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
                              </BarChart>
                          </ResponsiveContainer>
                      </div>
                      <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-700/30 rounded-xl border border-slate-100 dark:border-slate-700/50">
                          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Best Performer</h4>
                          <p className="text-sm font-bold text-slate-900 dark:text-white">Q4 Product Launch</p>
                          <p className="text-xs text-emerald-500 font-medium mt-1">3.8x ROI</p>
                      </div>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};
