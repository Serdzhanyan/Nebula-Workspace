
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, DollarSign, Users, Briefcase, TrendingUp, Filter, Search, MoreHorizontal, Calendar, CheckCircle2, FileText, Zap, Inbox, Package, Heart, PieChart, CheckSquare, ChevronRight, BarChart3, ChevronDown, Settings, X, Edit2, Trash2, Mail, Eye, Send, Save, Loader2 } from 'lucide-react';
import { ContactsPage } from './ContactsPage';
import { DealsPage } from './DealsPage';
import { LeadsPage } from './LeadsPage';
import { SalesFunnelsPage } from './SalesFunnelsPage';
import { ForecastPage } from './ForecastPage';
import { AutomationPage } from './AutomationPage';
import { AnalyticsPage } from './AnalyticsPage';
import { CalendarPage } from './CalendarPage';
import { CRMTasksPage } from './CRMTasksPage';
import { RequestsPage } from './RequestsPage';
import { ProductsPage } from './ProductsPage';
import { LoyaltyPage } from './LoyaltyPage';
import { CRMSettingsPage } from './CRMSettingsPage';

interface CRMPageProps {
  onBack: () => void;
}

interface Deal {
  id: string;
  client: string;
  value: string;
  stage: 'Lead' | 'Qualified' | 'Proposal' | 'Negotiation' | 'Closed';
  probability: number;
  owner: string;
  lastContact: string;
  avatar: string;
}

interface MenuItem {
  label: string;
  icon: React.ElementType;
  children?: { label: string; icon: React.ElementType }[];
}

export const CRMPage: React.FC<CRMPageProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [stageFilter, setStageFilter] = useState("All");
  const [activeModule, setActiveModule] = useState("Overview"); // Default to Overview (Dashboard)
  const [expandedSections, setExpandedSections] = useState<string[]>(['Sales']);
  
  // Deal Modal & Menu State
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [activeMenuDealId, setActiveMenuDealId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Edit & Email Modal States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState<Deal | null>(null);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [emailData, setEmailData] = useState({ to: '', subject: '', message: '' });
  const [isProcessing, setIsProcessing] = useState(false);

  const [dashboardDeals, setDashboardDeals] = useState<Deal[]>([
    { id: '1', client: 'Acme Corp', value: '$125,000', stage: 'Negotiation', probability: 80, owner: 'Sarah Lee', lastContact: '2h ago', avatar: 'https://picsum.photos/100/100?random=10' },
    { id: '2', client: 'Stark Industries', value: '$1,200,000', stage: 'Proposal', probability: 45, owner: 'Alex Johnson', lastContact: '1d ago', avatar: 'https://picsum.photos/100/100?random=11' },
    { id: '3', client: 'Wayne Ent.', value: '$850,000', stage: 'Qualified', probability: 30, owner: 'Emma Watson', lastContact: '3d ago', avatar: 'https://picsum.photos/100/100?random=12' },
    { id: '4', client: 'Cyberdyne', value: '$45,000', stage: 'Closed', probability: 100, owner: 'James D.', lastContact: '1w ago', avatar: 'https://picsum.photos/100/100?random=13' },
    { id: '5', client: 'Massive Dynamic', value: '$320,000', stage: 'Lead', probability: 10, owner: 'Sarah Lee', lastContact: '4h ago', avatar: 'https://picsum.photos/100/100?random=14' },
  ]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenuDealId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Closed': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 ring-1 ring-emerald-500/20';
      case 'Negotiation': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 ring-1 ring-purple-500/20';
      case 'Proposal': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 ring-1 ring-blue-500/20';
      case 'Qualified': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 ring-1 ring-amber-500/20';
      default: return 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300 ring-1 ring-slate-500/20';
    }
  };

  const filteredDeals = dashboardDeals.filter(deal => {
      const matchesSearch = deal.client.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStage = stageFilter === "All" || deal.stage === stageFilter;
      return matchesSearch && matchesStage;
  });

  const menuItems: MenuItem[] = [
    { label: 'Contacts and Clients', icon: Users },
    { 
      label: 'Sales', 
      icon: DollarSign,
      children: [
        { label: 'Overview', icon: BarChart3 },
        { label: 'Deals Pipeline', icon: Briefcase },
        { label: 'Leads', icon: Inbox },
        { label: 'Sales Funnels', icon: Filter },
        { label: 'Forecast', icon: TrendingUp },
        { label: 'Automation', icon: Zap },
        { label: 'Analytics', icon: PieChart },
      ]
    },
    { label: 'Calendar', icon: Calendar },
    { label: 'Tasks', icon: CheckSquare },
    { label: 'Reports', icon: FileText },
    { label: 'Requests', icon: Inbox },
    { label: 'Products', icon: Package },
    { label: 'Loyalty', icon: Heart },
    { label: 'Settings', icon: Settings },
  ];

  const toggleSection = (label: string) => {
    setExpandedSections(prev => 
      prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]
    );
  };

  const handleMenuAction = (action: string, deal: Deal) => {
      setActiveMenuDealId(null);
      if (action === 'view') {
          setSelectedDeal(deal);
      } else if (action === 'edit') {
          setEditFormData(deal);
          setIsEditModalOpen(true);
      } else if (action === 'email') {
          setEmailData({ to: deal.owner, subject: `Update regarding ${deal.client}`, message: '' });
          setIsEmailModalOpen(true);
      } else if (action === 'delete') {
          if (window.confirm(`Are you sure you want to delete the deal for ${deal.client}?`)) {
              setDashboardDeals(prev => prev.filter(d => d.id !== deal.id));
          }
      }
  };

  const handleSaveEdit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!editFormData) return;
      
      setIsProcessing(true);
      setTimeout(() => {
          setDashboardDeals(prev => prev.map(d => d.id === editFormData.id ? editFormData : d));
          setIsProcessing(false);
          setIsEditModalOpen(false);
          setEditFormData(null);
      }, 800);
  };

  const handleSendEmail = (e: React.FormEvent) => {
      e.preventDefault();
      setIsProcessing(true);
      setTimeout(() => {
          alert(`Email sent to ${emailData.to}`);
          setIsProcessing(false);
          setIsEmailModalOpen(false);
          setEmailData({ to: '', subject: '', message: '' });
      }, 800);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col md:flex-row bg-slate-50 dark:bg-slate-950 overflow-hidden font-sans">
      
      {/* Edit Deal Modal */}
      {isEditModalOpen && editFormData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setIsEditModalOpen(false)}>
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200 dark:border-slate-700" onClick={e => e.stopPropagation()}>
                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                        <Edit2 size={18} className="text-indigo-600 dark:text-indigo-400" /> Edit Deal
                    </h3>
                    <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                        <X size={20} />
                    </button>
                </div>
                <form onSubmit={handleSaveEdit} className="p-6 space-y-4">
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Client</label>
                        <input 
                            type="text" 
                            required
                            value={editFormData.client}
                            onChange={(e) => setEditFormData({...editFormData, client: e.target.value})}
                            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Value</label>
                        <input 
                            type="text" 
                            required
                            value={editFormData.value}
                            onChange={(e) => setEditFormData({...editFormData, value: e.target.value})}
                            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Stage</label>
                            <select 
                                value={editFormData.stage}
                                onChange={(e) => setEditFormData({...editFormData, stage: e.target.value as any})}
                                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                            >
                                <option value="Lead">Lead</option>
                                <option value="Qualified">Qualified</option>
                                <option value="Proposal">Proposal</option>
                                <option value="Negotiation">Negotiation</option>
                                <option value="Closed">Closed</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Probability (%)</label>
                            <input 
                                type="number"
                                min="0" max="100"
                                value={editFormData.probability}
                                onChange={(e) => setEditFormData({...editFormData, probability: parseInt(e.target.value)})}
                                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                            />
                        </div>
                    </div>
                    <button 
                        type="submit" 
                        disabled={isProcessing}
                        className="w-full py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200/50 dark:shadow-none flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                        {isProcessing ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
      )}

      {/* Email Modal */}
      {isEmailModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setIsEmailModalOpen(false)}>
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200 dark:border-slate-700" onClick={e => e.stopPropagation()}>
                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                        <Mail size={18} className="text-indigo-600 dark:text-indigo-400" /> Email Deal Owner
                    </h3>
                    <button onClick={() => setIsEmailModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                        <X size={20} />
                    </button>
                </div>
                <form onSubmit={handleSendEmail} className="p-6 space-y-4">
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">To</label>
                        <input 
                            type="text" 
                            disabled
                            value={emailData.to}
                            className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-500 dark:text-slate-400 cursor-not-allowed"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Subject</label>
                        <input 
                            type="text" 
                            required
                            value={emailData.subject}
                            onChange={(e) => setEmailData({...emailData, subject: e.target.value})}
                            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Message</label>
                        <textarea 
                            required
                            rows={4}
                            value={emailData.message}
                            onChange={(e) => setEmailData({...emailData, message: e.target.value})}
                            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white resize-none"
                            placeholder="Type your message here..."
                        />
                    </div>
                    <button 
                        type="submit" 
                        disabled={isProcessing}
                        className="w-full py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200/50 dark:shadow-none flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                        {isProcessing ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                        Send Email
                    </button>
                </form>
            </div>
        </div>
      )}

      {/* Deal Detail Modal */}
      {selectedDeal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setSelectedDeal(null)}>
            <div 
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200 dark:border-slate-700"
                onClick={e => e.stopPropagation()}
            >
                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-sm">
                            {selectedDeal.client.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-none">{selectedDeal.client}</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">ID: #{selectedDeal.id.padStart(4, '0')}</p>
                        </div>
                    </div>
                    <button onClick={() => setSelectedDeal(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700">
                        <X size={20} />
                    </button>
                </div>
                
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-700/50">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Deal Value</span>
                            <span className="text-xl font-bold text-slate-900 dark:text-white">{selectedDeal.value}</span>
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
                            <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${getStageColor(selectedDeal.stage)}`}>
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
                            <span className="text-sm text-slate-500 dark:text-slate-400">Last Contact</span>
                            <span className="text-sm font-medium text-slate-900 dark:text-white">{selectedDeal.lastContact}</span>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button 
                            onClick={() => {
                                setSelectedDeal(null);
                                setEditFormData(selectedDeal);
                                setIsEditModalOpen(true);
                            }}
                            className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200/50 dark:shadow-none"
                        >
                            Edit Deal
                        </button>
                        <button className="flex-1 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            Contact Client
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* Left Sidebar (Drawer) */}
      <div className="w-full md:w-72 bg-white dark:bg-slate-900 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 flex flex-col flex-shrink-0 z-20 shadow-xl shadow-slate-200/50 dark:shadow-none">
         <div className="p-6 flex items-center gap-3">
             <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30 text-white">
                <Briefcase className="w-5 h-5" />
             </div>
             <div>
                <h2 className="font-bold text-lg text-slate-900 dark:text-white leading-tight">CRM Suite</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Enterprise Edition</p>
             </div>
         </div>
         
         <nav className="px-4 space-y-1 flex-1 overflow-y-auto py-4 scrollbar-hide">
             <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">Main Menu</div>
             {menuItems.map((item) => {
                const isExpanded = expandedSections.includes(item.label);
                const hasChildren = item.children && item.children.length > 0;
                const isActive = activeModule === item.label;

                return (
                  <div key={item.label} className="mb-1">
                    <button
                      onClick={() => {
                        if (hasChildren) {
                          toggleSection(item.label);
                        } else {
                          setActiveModule(item.label);
                        }
                      }}
                      className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                          isActive && !hasChildren
                          ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                          <item.icon size={18} className={`transition-colors ${isActive && !hasChildren ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'}`} />
                          {item.label}
                      </div>
                      {hasChildren ? (
                        <div className="text-slate-400">
                           {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        </div>
                      ) : isActive ? (
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400"></div>
                      ) : null}
                    </button>

                    {/* Children Items */}
                    {hasChildren && isExpanded && (
                      <div className="ml-9 space-y-1 mt-1 border-l border-slate-100 dark:border-slate-800 pl-2">
                        {item.children?.map((child) => (
                          <button
                            key={child.label}
                            onClick={() => setActiveModule(child.label)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                              activeModule === child.label
                              ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300'
                              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/30'
                            }`}
                          >
                             <child.icon size={16} className={activeModule === child.label ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'} />
                             {child.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
             })}
         </nav>

         <div className="p-4 border-t border-slate-100 dark:border-slate-800">
             <button 
               onClick={onBack}
               className="w-full flex items-center gap-3 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors text-sm font-medium px-3 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 group"
             >
               <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/30 transition-colors">
                  <ArrowLeft size={16} />
               </div>
               Back to Control Panel
             </button>
         </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-50/50 dark:bg-slate-950 relative">
         {/* Decorative Background */}
         <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-indigo-50/50 to-transparent dark:from-indigo-900/10 dark:to-transparent pointer-events-none"></div>

         {/* Page Header (Only for Overview/Default Views) */}
         {activeModule === 'Overview' && (
            <div className="px-8 py-6 flex items-center justify-between sticky top-0 z-10 backdrop-blur-sm bg-slate-50/80 dark:bg-slate-950/80 border-b border-slate-200/50 dark:border-slate-800/50">
                <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Sales Dashboard</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    System Operational
                </p>
                </div>
                
                <div className="flex gap-3">
                    <button className="p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
                        <Filter size={18} />
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200/50 dark:shadow-indigo-900/20 hover:shadow-indigo-300/50 dark:hover:shadow-indigo-800/30 transform active:scale-95 duration-200">
                        <Briefcase size={16} /> New Deal
                    </button>
                </div>
            </div>
         )}

         <div className="flex-1 overflow-y-auto px-8 py-6">
            
            {/* --- SALES OVERVIEW / DASHBOARD VIEW --- */}
            {activeModule === 'Overview' && (
                <>
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8 animate-in fade-in slide-in-from-bottom-2">
                        <div 
                            className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400">
                                    <DollarSign size={22} />
                                </div>
                                <div className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400 px-2 py-1 rounded-full">
                                    <TrendingUp size={12} className="mr-1" />
                                    +15%
                                </div>
                            </div>
                            <div className="space-y-1">
                                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Pipeline</span>
                                <div className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">$2.4M</div>
                            </div>
                        </div>

                        {/* CLICKABLE ACTIVE DEALS CARD */}
                        <div 
                            onClick={() => setActiveModule('Deals Pipeline')}
                            className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 group cursor-pointer ring-2 ring-transparent hover:ring-indigo-100 dark:hover:ring-indigo-900/30"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                                    <Briefcase size={22} />
                                </div>
                                <div className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400 px-2 py-1 rounded-full">
                                    <TrendingUp size={12} className="mr-1" />
                                    12 closing soon
                                </div>
                            </div>
                            <div className="space-y-1">
                                <span className="text-sm font-medium text-slate-500 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Active Deals</span>
                                <div className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">42</div>
                            </div>
                        </div>

                        {/* CLICKABLE NEW LEADS CARD */}
                        <div 
                            onClick={() => setActiveModule('Leads')}
                            className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 group cursor-pointer ring-2 ring-transparent hover:ring-indigo-100 dark:hover:ring-indigo-900/30"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
                                    <Users size={22} />
                                </div>
                                <div className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400 px-2 py-1 rounded-full">
                                    <TrendingUp size={12} className="mr-1" />
                                    +8% this week
                                </div>
                            </div>
                            <div className="space-y-1">
                                <span className="text-sm font-medium text-slate-500 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">New Leads</span>
                                <div className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">128</div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400">
                                    <CheckCircle2 size={22} />
                                </div>
                                <div className="flex items-center text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-700 dark:text-slate-400 px-2 py-1 rounded-full">
                                    Avg 45 days
                                </div>
                            </div>
                            <div className="space-y-1">
                                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Win Rate</span>
                                <div className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">68%</div>
                            </div>
                        </div>
                    </div>

                    {/* Deals List */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex-1 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 min-h-[400px]">
                        {/* Toolbar */}
                        <div className="p-5 border-b border-slate-100 dark:border-slate-700 flex flex-col md:flex-row gap-4 bg-slate-50/30 dark:bg-slate-800/30">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input 
                                    type="text" 
                                    placeholder="Search active deals, companies..." 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900 focus:border-indigo-300 transition-all text-slate-800 dark:text-slate-200 placeholder-slate-400 shadow-sm"
                                />
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl">
                                    <Filter size={16} className="text-slate-400" />
                                    <select 
                                        value={stageFilter}
                                        onChange={(e) => setStageFilter(e.target.value)}
                                        className="bg-transparent text-sm text-slate-700 dark:text-slate-300 outline-none cursor-pointer border-none p-0 focus:ring-0 w-32"
                                    >
                                        <option value="All">All Stages</option>
                                        <option value="Lead">Lead</option>
                                        <option value="Qualified">Qualified</option>
                                        <option value="Proposal">Proposal</option>
                                        <option value="Negotiation">Negotiation</option>
                                        <option value="Closed">Closed</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 overflow-x-auto pb-10">
                            <table className="w-full text-left border-collapse min-w-[900px]">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700">
                                    <th className="py-4 pl-6 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Client / Deal</th>
                                    <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Value</th>
                                    <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Stage</th>
                                    <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 w-48">Probability</th>
                                    <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Owner</th>
                                    <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Last Contact</th>
                                    <th className="px-4 py-4 w-10"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                                {filteredDeals.map(deal => (
                                    <tr 
                                        key={deal.id} 
                                        onClick={() => setSelectedDeal(deal)}
                                        className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors cursor-pointer group"
                                    >
                                        <td className="py-4 pl-6 pr-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold text-sm shadow-sm border border-slate-200 dark:border-slate-600">
                                                    {deal.client.substring(0, 2).toUpperCase()}
                                                </div>
                                                <div>
                                                    <span className="block font-bold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{deal.client}</span>
                                                    <span className="text-xs text-slate-500 dark:text-slate-400">ID: #{deal.id.padStart(4, '0')}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm font-bold text-slate-800 dark:text-slate-200">
                                            {deal.value}
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${getStageColor(deal.stage)}`}>
                                                <div className={`w-1.5 h-1.5 rounded-full ${
                                                    deal.stage === 'Closed' ? 'bg-emerald-500' : 
                                                    deal.stage === 'Negotiation' ? 'bg-purple-500' :
                                                    deal.stage === 'Proposal' ? 'bg-blue-500' : 'bg-amber-500'
                                                }`}></div>
                                                {deal.stage}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="w-full">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{deal.probability}%</span>
                                                </div>
                                                <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                                    <div 
                                                        className={`h-full rounded-full transition-all duration-500 ${deal.probability > 70 ? 'bg-emerald-500' : deal.probability > 40 ? 'bg-blue-500' : 'bg-amber-500'}`} 
                                                        style={{ width: `${deal.probability}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-2">
                                                <img src={deal.avatar} alt={deal.owner} className="w-6 h-6 rounded-full border border-slate-200 dark:border-slate-600" />
                                                <span className="text-sm text-slate-600 dark:text-slate-300 font-medium">{deal.owner}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm text-slate-500 dark:text-slate-400">
                                            {deal.lastContact}
                                        </td>
                                        <td className="px-4 py-4 pr-6 text-right relative" ref={activeMenuDealId === deal.id ? menuRef : null}>
                                            <button 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setActiveMenuDealId(activeMenuDealId === deal.id ? null : deal.id);
                                                }}
                                                className={`p-2 rounded-lg transition-colors ${
                                                    activeMenuDealId === deal.id
                                                    ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400'
                                                    : 'text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20'
                                                }`}
                                            >
                                                <MoreHorizontal size={18} />
                                            </button>

                                            {/* Context Menu */}
                                            {activeMenuDealId === deal.id && (
                                                <div className="absolute right-8 top-10 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 py-1 z-30 animate-in fade-in zoom-in-95 duration-200 text-left">
                                                    <button 
                                                        onClick={(e) => { e.stopPropagation(); handleMenuAction('view', deal); }}
                                                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                                                    >
                                                        <Eye size={14} className="text-slate-400" /> View Details
                                                    </button>
                                                    <button 
                                                        onClick={(e) => { e.stopPropagation(); handleMenuAction('edit', deal); }}
                                                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                                                    >
                                                        <Edit2 size={14} className="text-slate-400" /> Edit Deal
                                                    </button>
                                                    <button 
                                                        onClick={(e) => { e.stopPropagation(); handleMenuAction('email', deal); }}
                                                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                                                    >
                                                        <Mail size={14} className="text-slate-400" /> Email Owner
                                                    </button>
                                                    <div className="h-px bg-slate-100 dark:bg-slate-700 my-1"></div>
                                                    <button 
                                                        onClick={(e) => { e.stopPropagation(); handleMenuAction('delete', deal); }}
                                                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                                                    >
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
                        <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 flex justify-center">
                            <button 
                                onClick={() => setActiveModule('Deals Pipeline')}
                                className="text-xs font-bold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors uppercase tracking-wide"
                            >
                                View All Deals
                            </button>
                        </div>
                    </div>
                </>
            )}

            {/* --- CONTACTS & CLIENTS VIEW --- */}
            {activeModule === 'Contacts and Clients' && (
                <ContactsPage />
            )}

            {/* --- DEALS PIPELINE VIEW --- */}
            {activeModule === 'Deals Pipeline' && (
                <DealsPage />
            )}

            {/* --- LEADS VIEW --- */}
            {activeModule === 'Leads' && (
                <LeadsPage />
            )}

            {/* --- SALES FUNNELS VIEW --- */}
            {activeModule === 'Sales Funnels' && (
                <SalesFunnelsPage />
            )}

            {/* --- SALES FORECAST VIEW --- */}
            {activeModule === 'Forecast' && (
                <ForecastPage />
            )}

            {/* --- AUTOMATION VIEW --- */}
            {activeModule === 'Automation' && (
                <AutomationPage />
            )}

            {/* --- ANALYTICS VIEW --- */}
            {activeModule === 'Analytics' && (
                <AnalyticsPage />
            )}

            {/* --- CALENDAR VIEW --- */}
            {activeModule === 'Calendar' && (
                <CalendarPage />
            )}

            {/* --- TASKS VIEW --- */}
            {activeModule === 'Tasks' && (
                <CRMTasksPage />
            )}

            {/* --- REQUESTS VIEW --- */}
            {activeModule === 'Requests' && (
                <RequestsPage />
            )}

            {/* --- PRODUCTS VIEW --- */}
            {activeModule === 'Products' && (
                <ProductsPage />
            )}

            {/* --- LOYALTY VIEW --- */}
            {activeModule === 'Loyalty' && (
                <LoyaltyPage />
            )}

            {/* --- SETTINGS VIEW --- */}
            {activeModule === 'Settings' && (
                <CRMSettingsPage />
            )}

            {/* --- PLACEHOLDER FOR OTHER MODULES --- */}
            {activeModule !== 'Overview' && activeModule !== 'Contacts and Clients' && activeModule !== 'Deals Pipeline' && activeModule !== 'Leads' && activeModule !== 'Sales Funnels' && activeModule !== 'Forecast' && activeModule !== 'Automation' && activeModule !== 'Analytics' && activeModule !== 'Calendar' && activeModule !== 'Tasks' && activeModule !== 'Requests' && activeModule !== 'Products' && activeModule !== 'Loyalty' && activeModule !== 'Settings' && (
                <div className="flex flex-col items-center justify-center h-full text-slate-400 animate-in fade-in zoom-in-95">
                    <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 shadow-inner">
                        <Package size={48} className="opacity-40" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-700 dark:text-slate-200">{activeModule}</h3>
                    <p className="text-sm text-slate-500 max-w-xs text-center mt-2 leading-relaxed">
                        This module is currently under development. <br/>Check back later for updates and features.
                    </p>
                    <button className="mt-6 px-6 py-2 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full text-sm font-medium hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
                        Notify when ready
                    </button>
                </div>
            )}

         </div>
      </div>
    </div>
  );
};
