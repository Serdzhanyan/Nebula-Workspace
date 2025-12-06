
import React, { useState } from 'react';
import { Search, Filter, Plus, Mail, Phone, MapPin, Calendar, Clock, DollarSign, ShoppingBag, MessageSquare, MoreHorizontal, ArrowLeft, Building, Tag, User, Briefcase, FileText, CheckCircle2, X, Mic, Video, PieChart, BarChart3, TrendingUp, Handshake, Truck, HelpCircle, Globe, Link as LinkIcon, Facebook, Linkedin, Twitter, MessageCircle, Star, List, LayoutGrid, AlertCircle, ArrowRight, Check, Share2, Bookmark } from 'lucide-react';

interface Interaction {
  id: string;
  type: 'email' | 'call' | 'meeting' | 'note' | 'social';
  date: string;
  summary: string;
  user: string;
  details?: string;
  platform?: string; // For social media (e.g., LinkedIn, Twitter)
  isImportant?: boolean; // New: Flag for important records
}

interface Purchase {
  id: string;
  product: string;
  date: string;
  amount: string;
  status: 'Completed' | 'Pending' | 'Refunded';
}

interface SocialProfile {
  network: 'LinkedIn' | 'Twitter' | 'Facebook' | 'Reviews' | 'Maps';
  handle: string;
  url: string;
}

interface Client {
  id: string;
  name: string;
  company: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  type: 'Client' | 'Potential' | 'Partner' | 'Supplier';
  status: 'Active' | 'Lead' | 'Churned' | 'Vetted';
  totalSpend: string;
  lastContact: string;
  nextFollowUp?: string;
  engagementScore: number;
  avatar: string;
  tags: string[];
  bio: string;
  interactions: Interaction[];
  purchases: Purchase[];
  socialProfiles: SocialProfile[];
  connectedChannels: {
      email: boolean;
      phone: boolean;
      chat: boolean;
  };
}

export const ContactsPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'directory' | 'tracking'>('directory');
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'purchases'>('overview');
  const [typeFilter, setTypeFilter] = useState<string>("All");
  
  // History Filter State
  const [showImportantOnly, setShowImportantOnly] = useState(false);
  
  // Modal State
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [activityForm, setActivityForm] = useState({
      type: 'call' as 'email' | 'call' | 'meeting' | 'note' | 'social',
      date: new Date().toISOString().split('T')[0],
      summary: '',
      details: '',
      isImportant: false
  });

  const [clients, setClients] = useState<Client[]>([
    { 
      id: '1', 
      name: 'Sarah Connor', 
      company: 'Cyberdyne Systems', 
      role: 'CTO',
      email: 'sarah.c@cyberdyne.net', 
      phone: '+1 (555) 019-2834',
      location: 'Los Angeles, CA',
      type: 'Client',
      status: 'Active', 
      totalSpend: '$45,200', 
      lastContact: '2 days ago',
      nextFollowUp: 'Tomorrow',
      engagementScore: 92,
      avatar: 'https://picsum.photos/100/100?random=20',
      tags: ['Enterprise', 'High Value', 'Tech'],
      bio: 'Key decision maker for infrastructure upgrades. Interested in AI security solutions and automation pipelines.',
      interactions: [
        { id: 'i1', type: 'meeting', date: 'Oct 24, 2024', summary: 'Q4 Strategy Review', details: 'Discussed roadmap and budget allocation for Q1.', user: 'Alex Johnson', isImportant: true },
        { id: 'i2', type: 'email', date: 'Oct 22, 2024', summary: 'Sent proposal for cloud migration', user: 'Alex Johnson' },
        { id: 'i3', type: 'call', date: 'Oct 15, 2024', summary: 'Discussed renewal terms', user: 'Sarah Lee' },
        { id: 'i_soc1', type: 'social', date: 'Oct 25, 2024', summary: 'Replied to LinkedIn Post', details: 'Engaged with her post about AI ethics.', user: 'Alex Johnson', platform: 'LinkedIn' },
      ],
      purchases: [
        { id: 'p1', product: 'Enterprise License Q4', date: 'Oct 01, 2024', amount: '$15,000', status: 'Completed' },
        { id: 'p2', product: 'Security Audit', date: 'Sep 15, 2024', amount: '$5,000', status: 'Completed' },
      ],
      socialProfiles: [
          { network: 'LinkedIn', handle: 'sarahconnor-tech', url: '#' },
          { network: 'Twitter', handle: '@resistence_leader', url: '#' }
      ],
      connectedChannels: { email: true, phone: true, chat: false }
    },
    { 
      id: '2', 
      name: 'Tony Stark', 
      company: 'Stark Industries', 
      role: 'CEO',
      email: 'tony@stark.com', 
      phone: '+1 (555) 999-8888',
      location: 'New York, NY',
      type: 'Potential',
      status: 'Lead', 
      totalSpend: '$0', 
      lastContact: '1 day ago', 
      nextFollowUp: 'Today',
      engagementScore: 78,
      avatar: 'https://picsum.photos/100/100?random=21',
      tags: ['VIP', 'Manufacturing', 'DefTech'],
      bio: 'Looking for advanced automation tools. High potential deal but requires high-level clearance discussions.',
      interactions: [
        { id: 'i4', type: 'email', date: 'Oct 25, 2024', summary: 'Demo scheduled for next week', user: 'Alex Johnson', isImportant: true },
        { id: 'i5', type: 'note', date: 'Oct 20, 2024', summary: 'Interested in the new API features', user: 'Mark Vos' },
        { id: 'i_soc2', type: 'social', date: 'Oct 24, 2024', summary: 'Direct Message', details: 'Asked about integration capabilities via Twitter DM.', user: 'Alex Johnson', platform: 'Twitter' },
      ],
      purchases: [],
      socialProfiles: [
          { network: 'LinkedIn', handle: 'tonystark', url: '#' },
          { network: 'Reviews', handle: 'G2 Reviews', url: '#' }
      ],
      connectedChannels: { email: true, phone: false, chat: false }
    },
    { 
      id: '3', 
      name: 'Diana Prince', 
      company: 'Themyscira Inc.', 
      role: 'Director of Ops',
      email: 'diana@themyscira.com', 
      phone: '+1 (555) 222-3333',
      location: 'Washington, DC',
      type: 'Partner',
      status: 'Active', 
      totalSpend: '$12,500', 
      lastContact: '3 weeks ago', 
      nextFollowUp: 'Overdue',
      engagementScore: 45,
      avatar: 'https://picsum.photos/100/100?random=22',
      tags: ['Non-Profit', 'Global'],
      bio: 'Long-term client focused on sustainable growth and museum partnerships.',
      interactions: [
        { id: 'i6', type: 'email', date: 'Oct 10, 2024', summary: 'Support ticket resolved', user: 'James D.' },
      ],
      purchases: [
        { id: 'p3', product: 'Consulting Package', date: 'Aug 10, 2024', amount: '$12,500', status: 'Completed' },
      ],
      socialProfiles: [
          { network: 'Maps', handle: 'Google Maps Profile', url: '#' }
      ],
      connectedChannels: { email: true, phone: true, chat: true }
    },
    { 
      id: '4', 
      name: 'Logistics Dept', 
      company: 'Acme Supply Co.', 
      role: 'Vendor Manager',
      email: 'orders@acme.com', 
      phone: '+1 (555) 777-6666',
      location: 'Chicago, IL',
      type: 'Supplier',
      status: 'Vetted', 
      totalSpend: '$0', 
      lastContact: '3 days ago', 
      engagementScore: 60,
      avatar: 'https://picsum.photos/100/100?random=23',
      tags: ['Hardware', 'Logistics'],
      bio: 'Primary supplier for server hardware and office equipment.',
      interactions: [],
      purchases: [],
      socialProfiles: [],
      connectedChannels: { email: true, phone: false, chat: false }
    },
  ]);

  const handleClientClick = (client: Client) => {
      setSelectedClient(client);
      setActiveTab('overview');
      setShowImportantOnly(false); // Reset filter on new client selection
  };

  const handleLogActivity = (e: React.FormEvent) => {
      e.preventDefault();
      if (!selectedClient) return;

      const newInteraction: Interaction = {
          id: `new-${Date.now()}`,
          type: activityForm.type,
          date: new Date(activityForm.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          summary: activityForm.summary,
          details: activityForm.details,
          isImportant: activityForm.isImportant,
          user: 'Alex Johnson' // Mock current user
      };

      const updatedClient = {
          ...selectedClient,
          interactions: [newInteraction, ...selectedClient.interactions],
          lastContact: 'Just now',
          engagementScore: Math.min(selectedClient.engagementScore + 5, 100) // Bump score
      };

      // Update local state and list
      setSelectedClient(updatedClient);
      setClients(prev => prev.map(c => c.id === updatedClient.id ? updatedClient : c));
      
      // Reset and close
      setActivityForm({
          type: 'call',
          date: new Date().toISOString().split('T')[0],
          summary: '',
          details: '',
          isImportant: false
      });
      setShowActivityModal(false);
  };

  const filteredClients = clients.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "All" || c.type === typeFilter;
    return matchesSearch && matchesType;
  });

  // Tracking View Filtering
  const upcomingFollowUps = clients.filter(c => c.nextFollowUp && c.nextFollowUp !== '');
  
  // Aggregate all interactions for the feed
  const allInteractions = clients.flatMap(client => 
      client.interactions.map(interaction => ({
          ...interaction,
          clientName: client.name,
          clientCompany: client.company,
          clientAvatar: client.avatar,
          clientId: client.id
      }))
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-900/30';
      case 'Lead': return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-900/30';
      case 'Churned': return 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-700 dark:text-slate-400 dark:border-slate-600';
      case 'Vetted': return 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-900/30';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getTypeIcon = (type: string) => {
      switch(type) {
          case 'Client': return <User size={14} className="text-blue-500" />;
          case 'Partner': return <Handshake size={14} className="text-purple-500" />;
          case 'Supplier': return <Truck size={14} className="text-amber-500" />;
          case 'Potential': return <HelpCircle size={14} className="text-emerald-500" />;
          default: return <User size={14} />;
      }
  };

  const getInteractionIcon = (type: string) => {
      switch(type) {
          case 'email': return <Mail size={16} />;
          case 'call': return <Phone size={16} />;
          case 'meeting': return <Calendar size={16} />;
          case 'social': return <Share2 size={16} />;
          default: return <FileText size={16} />;
      }
  };

  const getSocialIcon = (network: string) => {
      switch(network) {
          case 'LinkedIn': return <Linkedin size={16} />;
          case 'Twitter': return <Twitter size={16} />;
          case 'Facebook': return <Facebook size={16} />;
          case 'Reviews': return <Star size={16} />;
          case 'Maps': return <MapPin size={16} />;
          default: return <Globe size={16} />;
      }
  };

  // Analysis Helpers
  const getInteractionStats = (interactions: Interaction[]) => {
      const total = interactions.length;
      const emails = interactions.filter(i => i.type === 'email').length;
      const calls = interactions.filter(i => i.type === 'call').length;
      const meetings = interactions.filter(i => i.type === 'meeting').length;
      const social = interactions.filter(i => i.type === 'social').length;
      const notes = interactions.filter(i => i.type === 'note').length;
      
      return { total, emails, calls, meetings, notes, social };
  };

  if (selectedClient) {
      const stats = getInteractionStats(selectedClient.interactions);
      const displayedInteractions = showImportantOnly 
          ? selectedClient.interactions.filter(i => i.isImportant)
          : selectedClient.interactions;

      return (
          <div className="flex flex-col h-full animate-in slide-in-from-right-4 duration-300 relative">
              
              {/* Log Activity Modal */}
              {showActivityModal && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
                      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200 dark:border-slate-700" onClick={e => e.stopPropagation()}>
                          <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Log Activity</h3>
                              <button onClick={() => setShowActivityModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                                  <X size={20} />
                              </button>
                          </div>
                          <form onSubmit={handleLogActivity} className="p-6 space-y-4">
                              <div>
                                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 block">Interaction Type</label>
                                  <div className="grid grid-cols-5 gap-2">
                                      {['call', 'email', 'meeting', 'social', 'note'].map((type) => (
                                          <button
                                              type="button"
                                              key={type}
                                              onClick={() => setActivityForm({...activityForm, type: type as any})}
                                              className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                                                  activityForm.type === type 
                                                  ? 'bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-900/30 dark:border-indigo-800 dark:text-indigo-400 ring-1 ring-indigo-500/20' 
                                                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                                              }`}
                                          >
                                              {getInteractionIcon(type)}
                                              <span className="text-[10px] font-medium mt-1 capitalize">{type}</span>
                                          </button>
                                      ))}
                                  </div>
                              </div>
                              
                              <div className="grid grid-cols-1 gap-4">
                                  <div>
                                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Date</label>
                                      <input 
                                          type="date" 
                                          required
                                          value={activityForm.date}
                                          onChange={(e) => setActivityForm({...activityForm, date: e.target.value})}
                                          className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                                      />
                                  </div>
                                  <div>
                                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Summary</label>
                                      <input 
                                          type="text" 
                                          required
                                          placeholder="E.g. Strategy Call, Sent Proposal..."
                                          value={activityForm.summary}
                                          onChange={(e) => setActivityForm({...activityForm, summary: e.target.value})}
                                          className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                                      />
                                  </div>
                              </div>

                              <div>
                                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Notes / Details</label>
                                  <textarea 
                                      rows={4}
                                      placeholder="Add details about the interaction..."
                                      value={activityForm.details}
                                      onChange={(e) => setActivityForm({...activityForm, details: e.target.value})}
                                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white resize-none"
                                  />
                              </div>

                              <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-700">
                                  <input 
                                    type="checkbox" 
                                    id="isImportant"
                                    checked={activityForm.isImportant}
                                    onChange={(e) => setActivityForm({...activityForm, isImportant: e.target.checked})}
                                    className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                                  />
                                  <label htmlFor="isImportant" className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2 cursor-pointer">
                                      <Bookmark size={16} className="text-amber-500" />
                                      Mark as Important Record
                                  </label>
                              </div>

                              <div className="pt-2">
                                  <button 
                                      type="submit"
                                      className="w-full py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200/50 dark:shadow-none"
                                  >
                                      Save Interaction
                                  </button>
                              </div>
                          </form>
                      </div>
                  </div>
              )}

              <div className="flex items-center justify-between mb-6 px-1">
                  <button 
                    onClick={() => setSelectedClient(null)}
                    className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors text-sm font-medium px-2 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                      <ArrowLeft size={16} /> Back to Contacts
                  </button>
                  <div className="flex gap-2">
                      <button className="flex items-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium shadow-sm hover:bg-indigo-700 transition-colors">
                          <MessageSquare size={16} /> Send Message
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors border border-slate-200 dark:border-slate-700">
                          <MoreHorizontal size={18} />
                      </button>
                  </div>
              </div>

              {/* ... Profile Layout ... */}
              <div className="flex flex-col xl:flex-row gap-6 flex-1 overflow-y-auto pr-2 pb-6">
                  {/* Sidebar Profile Card */}
                  <div className="w-full xl:w-80 shrink-0 space-y-6">
                      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col items-center text-center shadow-sm overflow-hidden">
                          {/* Cover Image */}
                          <div className="w-full h-24 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
                              <div className="absolute inset-0 bg-black/10"></div>
                          </div>
                          
                          <div className="px-6 pb-6 -mt-12 w-full flex flex-col items-center">
                            <div className="w-24 h-24 rounded-full border-4 border-white dark:border-slate-800 mb-3 shadow-md overflow-hidden bg-white">
                                <img src={selectedClient.avatar} alt={selectedClient.name} className="w-full h-full object-cover" />
                            </div>
                            
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{selectedClient.name}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
                                <Briefcase size={12} /> {selectedClient.role} at <span className="font-semibold text-slate-700 dark:text-slate-300">{selectedClient.company}</span>
                            </p>
                            
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-600 flex items-center gap-1">
                                    {getTypeIcon(selectedClient.type)} {selectedClient.type}
                                </span>
                                <span className={`px-2 py-0.5 rounded-md text-xs font-bold uppercase tracking-wide border ${getStatusColor(selectedClient.status)}`}>
                                    {selectedClient.status}
                                </span>
                            </div>

                            <div className="w-full grid grid-cols-2 gap-3 mb-6">
                                <button className="flex items-center justify-center gap-2 py-2 rounded-xl bg-slate-50 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                                    <Phone size={14} /> Call
                                </button>
                                <button className="flex items-center justify-center gap-2 py-2 rounded-xl bg-slate-50 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                                    <Mail size={14} /> Email
                                </button>
                            </div>

                            <div className="w-full space-y-4 text-left pt-6 border-t border-slate-100 dark:border-slate-700">
                                <div className="group flex items-start gap-3">
                                    <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900/50 text-slate-400">
                                        <Mail size={16} />
                                    </div>
                                    <div className="min-w-0">
                                        <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Email</label>
                                        <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate group-hover:text-indigo-600 transition-colors cursor-pointer" title={selectedClient.email}>{selectedClient.email}</p>
                                    </div>
                                </div>
                                <div className="group flex items-start gap-3">
                                    <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900/50 text-slate-400">
                                        <Phone size={16} />
                                    </div>
                                    <div className="min-w-0">
                                        <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Phone</label>
                                        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{selectedClient.phone}</p>
                                    </div>
                                </div>
                                <div className="group flex items-start gap-3">
                                    <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900/50 text-slate-400">
                                        <MapPin size={16} />
                                    </div>
                                    <div className="min-w-0">
                                        <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Location</label>
                                        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{selectedClient.location}</p>
                                    </div>
                                </div>
                            </div>
                          </div>
                      </div>

                      {/* Linked Accounts */}
                      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
                          <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-4 flex items-center gap-2">
                              <LinkIcon size={16} className="text-indigo-500" /> Linked Accounts
                          </h4>
                          <div className="space-y-3">
                              {selectedClient.socialProfiles.length > 0 ? (
                                  selectedClient.socialProfiles.map((social, i) => (
                                      <a href={social.url} key={i} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 border border-transparent hover:border-slate-200 dark:hover:border-slate-600 transition-all group">
                                          <div className="flex items-center gap-3">
                                              <div className="text-slate-500 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                                  {getSocialIcon(social.network)}
                                              </div>
                                              <div>
                                                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{social.network}</p>
                                                  <p className="text-xs text-slate-400">{social.handle}</p>
                                              </div>
                                          </div>
                                          <ArrowLeft size={14} className="rotate-180 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                                      </a>
                                  ))
                              ) : (
                                  <p className="text-xs text-slate-400 italic">No linked accounts.</p>
                              )}
                              <button className="w-full py-2 text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors">
                                  + Link Account
                              </button>
                          </div>
                      </div>
                  </div>

                  {/* Main Content */}
                  <div className="flex-1 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col overflow-hidden h-full min-h-[500px]">
                      <div className="flex border-b border-slate-200 dark:border-slate-700 px-6">
                          {['overview', 'history', 'purchases'].map(tab => (
                              <button 
                                key={tab}
                                onClick={() => setActiveTab(tab as any)}
                                className={`px-6 py-4 text-sm font-semibold border-b-2 transition-all capitalize ${
                                    activeTab === tab 
                                    ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400' 
                                    : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                                }`}
                              >
                                  {tab === 'history' ? 'Events & Logs' : tab}
                              </button>
                          ))}
                      </div>

                      <div className="p-8 overflow-y-auto flex-1">
                          {activeTab === 'overview' && (
                              <div className="animate-in fade-in slide-in-from-bottom-2 space-y-8">
                                  {/* Connected Channels */}
                                  <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-700/50">
                                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Communication Channels</h4>
                                      <div className="grid grid-cols-3 gap-4">
                                          <div className={`p-3 rounded-lg border flex flex-col items-center gap-2 text-center transition-all ${
                                              selectedClient.connectedChannels.email 
                                              ? 'bg-white dark:bg-slate-800 border-emerald-200 dark:border-emerald-800' 
                                              : 'bg-slate-100 dark:bg-slate-800/50 border-transparent opacity-60'
                                          }`}>
                                              <div className={`p-2 rounded-full ${selectedClient.connectedChannels.email ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200 text-slate-500'}`}>
                                                  <Mail size={16} />
                                              </div>
                                              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Email Synced</span>
                                          </div>
                                          <div className={`p-3 rounded-lg border flex flex-col items-center gap-2 text-center transition-all ${
                                              selectedClient.connectedChannels.phone 
                                              ? 'bg-white dark:bg-slate-800 border-emerald-200 dark:border-emerald-800' 
                                              : 'bg-slate-100 dark:bg-slate-800/50 border-transparent opacity-60'
                                          }`}>
                                              <div className={`p-2 rounded-full ${selectedClient.connectedChannels.phone ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200 text-slate-500'}`}>
                                                  <Phone size={16} />
                                              </div>
                                              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">VoIP Active</span>
                                          </div>
                                          <div className={`p-3 rounded-lg border flex flex-col items-center gap-2 text-center transition-all ${
                                              selectedClient.connectedChannels.chat 
                                              ? 'bg-white dark:bg-slate-800 border-emerald-200 dark:border-emerald-800' 
                                              : 'bg-slate-100 dark:bg-slate-800/50 border-transparent opacity-60'
                                          }`}>
                                              <div className={`p-2 rounded-full ${selectedClient.connectedChannels.chat ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200 text-slate-500'}`}>
                                                  <MessageCircle size={16} />
                                              </div>
                                              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Chat Connected</span>
                                          </div>
                                      </div>
                                  </div>

                                  <div>
                                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">About</h4>
                                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900/50 p-5 rounded-xl border border-slate-100 dark:border-slate-700/50">
                                          {selectedClient.bio}
                                      </p>
                                  </div>
                                  
                                  <div>
                                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Key Metrics</h4>
                                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="p-5 rounded-xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-800/50 border border-slate-200 dark:border-slate-700 shadow-sm">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="p-1.5 rounded bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                                                    <DollarSign size={16} />
                                                </div>
                                                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Total Spend</span>
                                            </div>
                                            <span className="text-2xl font-bold text-slate-900 dark:text-white block">{selectedClient.totalSpend}</span>
                                        </div>
                                        <div className="p-5 rounded-xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-800/50 border border-slate-200 dark:border-slate-700 shadow-sm">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="p-1.5 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                                                    <ShoppingBag size={16} />
                                                </div>
                                                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Deals Won</span>
                                            </div>
                                            <span className="text-2xl font-bold text-slate-900 dark:text-white block">{selectedClient.purchases.length}</span>
                                        </div>
                                        <div className="p-5 rounded-xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-800/50 border border-slate-200 dark:border-slate-700 shadow-sm">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="p-1.5 rounded bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                                                    <Clock size={16} />
                                                </div>
                                                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Last Contact</span>
                                            </div>
                                            <span className="text-lg font-bold text-slate-900 dark:text-white block mt-1">{selectedClient.lastContact}</span>
                                        </div>
                                    </div>
                                  </div>
                              </div>
                          )}

                          {activeTab === 'history' && (
                              <div className="animate-in fade-in slide-in-from-bottom-2 space-y-8">
                                  {/* Analytics Dashboard */}
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                      <div className="bg-slate-50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-700/50 rounded-xl p-5">
                                          <h4 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2 mb-4">
                                              <TrendingUp size={16} className="text-indigo-500" /> Engagement Overview
                                          </h4>
                                          <div className="flex items-center gap-6">
                                              <div className="text-center">
                                                  <div className="text-2xl font-bold text-slate-900 dark:text-white">{stats.total}</div>
                                                  <div className="text-xs text-slate-500 font-medium uppercase tracking-wide mt-1">Interactions</div>
                                              </div>
                                              <div className="h-10 w-px bg-slate-200 dark:bg-slate-700"></div>
                                              <div className="text-center">
                                                  <div className="text-2xl font-bold text-emerald-500">Weekly</div>
                                                  <div className="text-xs text-slate-500 font-medium uppercase tracking-wide mt-1">Frequency</div>
                                              </div>
                                          </div>
                                      </div>

                                      <div className="bg-slate-50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-700/50 rounded-xl p-5">
                                          <h4 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2 mb-4">
                                              <PieChart size={16} className="text-purple-500" /> Type Breakdown
                                          </h4>
                                          <div className="space-y-3">
                                              <div className="flex items-center gap-3 text-xs">
                                                  <span className="w-16 font-medium text-slate-600 dark:text-slate-400">Emails</span>
                                                  <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                                      <div className="h-full bg-blue-500" style={{ width: `${(stats.emails / stats.total) * 100}%` }}></div>
                                                  </div>
                                                  <span className="w-6 text-right font-bold text-slate-700 dark:text-slate-300">{stats.emails}</span>
                                              </div>
                                              <div className="flex items-center gap-3 text-xs">
                                                  <span className="w-16 font-medium text-slate-600 dark:text-slate-400">Calls</span>
                                                  <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                                      <div className="h-full bg-emerald-500" style={{ width: `${(stats.calls / stats.total) * 100}%` }}></div>
                                                  </div>
                                                  <span className="w-6 text-right font-bold text-slate-700 dark:text-slate-300">{stats.calls}</span>
                                              </div>
                                              <div className="flex items-center gap-3 text-xs">
                                                  <span className="w-16 font-medium text-slate-600 dark:text-slate-400">Social</span>
                                                  <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                                      <div className="h-full bg-pink-500" style={{ width: `${(stats.social / stats.total) * 100}%` }}></div>
                                                  </div>
                                                  <span className="w-6 text-right font-bold text-slate-700 dark:text-slate-300">{stats.social}</span>
                                              </div>
                                          </div>
                                      </div>
                                  </div>

                                  <div className="space-y-6">
                                      <div className="flex items-center justify-between">
                                          <div className="flex items-center gap-4">
                                              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Interaction Log</h4>
                                              <button 
                                                  onClick={() => setShowImportantOnly(!showImportantOnly)}
                                                  className={`text-xs flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all border ${
                                                      showImportantOnly 
                                                      ? 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800' 
                                                      : 'bg-white dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700 hover:text-slate-700 dark:hover:text-slate-300'
                                                  }`}
                                              >
                                                  <Bookmark size={12} className={showImportantOnly ? "fill-current" : ""} />
                                                  {showImportantOnly ? 'Key Events Only' : 'Show All'}
                                              </button>
                                          </div>
                                          <button 
                                              onClick={() => setShowActivityModal(true)}
                                              className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-3 py-1.5 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors"
                                          >
                                              <Plus size={14} /> Log Activity
                                          </button>
                                      </div>
                                      
                                      <div className="relative pl-4 space-y-0 before:absolute before:left-[19px] before:top-2 before:bottom-0 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-700">
                                          {displayedInteractions.length === 0 ? (
                                              <div className="pl-8 py-8 text-slate-400 text-sm italic">
                                                  No interactions found.
                                              </div>
                                          ) : displayedInteractions.map((interaction, i) => (
                                              <div key={i} className="relative pl-8 pb-8 group last:pb-0">
                                                  <div className={`absolute left-0 top-0 p-2 rounded-full border-2 z-10 shadow-sm transition-colors ${
                                                      interaction.isImportant 
                                                      ? 'bg-amber-100 border-amber-300 text-amber-600 dark:bg-amber-900/50 dark:border-amber-700 dark:text-amber-400' 
                                                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 text-slate-400 group-hover:border-indigo-500 group-hover:text-indigo-500'
                                                  }`}>
                                                      {interaction.isImportant ? <Star size={16} className="fill-current" /> : getInteractionIcon(interaction.type)}
                                                  </div>
                                                  
                                                  <div className={`p-4 rounded-xl border transition-colors shadow-sm ${
                                                      interaction.isImportant 
                                                      ? 'bg-amber-50/50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800/50' 
                                                      : 'bg-slate-50 dark:bg-slate-900/50 border-slate-100 dark:border-slate-700/50 group-hover:border-indigo-200 dark:group-hover:border-indigo-800'
                                                  }`}>
                                                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-2">
                                                          <h5 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                                              {interaction.summary}
                                                              {interaction.isImportant && <span className="text-[10px] bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Key Event</span>}
                                                          </h5>
                                                          <span className="text-xs text-slate-400 font-medium bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-100 dark:border-slate-700">{interaction.date}</span>
                                                      </div>
                                                      <div className="flex items-center gap-2 mb-2">
                                                          <p className="text-xs text-slate-500 dark:text-slate-400 capitalize flex items-center gap-1.5">
                                                              <span className={`w-1.5 h-1.5 rounded-full ${interaction.type === 'meeting' ? 'bg-purple-500' : interaction.type === 'call' ? 'bg-emerald-500' : interaction.type === 'social' ? 'bg-pink-500' : 'bg-blue-500'}`}></span>
                                                              {interaction.type}
                                                          </p>
                                                          {interaction.platform && (
                                                              <span className="text-xs text-slate-400 bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded">
                                                                  {interaction.platform}
                                                              </span>
                                                          )}
                                                      </div>
                                                      {interaction.details && (
                                                          <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 leading-relaxed bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-100 dark:border-slate-700">
                                                              {interaction.details}
                                                          </p>
                                                      )}
                                                      <div className="flex items-center gap-2 text-xs text-slate-500 border-t border-slate-200 dark:border-slate-700 pt-3 mt-1">
                                                          <div className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-[9px] font-bold text-indigo-700 dark:text-indigo-300">
                                                              {interaction.user.charAt(0)}
                                                          </div>
                                                          <span className="font-medium">Logged by {interaction.user}</span>
                                                      </div>
                                                  </div>
                                              </div>
                                          ))}
                                      </div>
                                  </div>
                              </div>
                          )}

                          {activeTab === 'purchases' && (
                              <div className="animate-in fade-in slide-in-from-bottom-2">
                                  <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                                      <table className="w-full text-left border-collapse">
                                          <thead>
                                              <tr className="bg-slate-50/80 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                                                  <th className="py-3 px-5 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Product</th>
                                                  <th className="py-3 px-5 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Date</th>
                                                  <th className="py-3 px-5 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Amount</th>
                                                  <th className="py-3 px-5 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Status</th>
                                              </tr>
                                          </thead>
                                          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                                              {selectedClient.purchases.length === 0 ? (
                                                  <tr>
                                                      <td colSpan={4} className="py-12 text-center text-slate-400 text-sm">No purchases recorded.</td>
                                                  </tr>
                                              ) : selectedClient.purchases.map((p, i) => (
                                                  <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                                                      <td className="py-4 px-5 text-sm font-semibold text-slate-800 dark:text-slate-200">{p.product}</td>
                                                      <td className="py-4 px-5 text-sm text-slate-500 dark:text-slate-400">{p.date}</td>
                                                      <td className="py-4 px-5 text-sm font-bold text-slate-800 dark:text-slate-200">{p.amount}</td>
                                                      <td className="py-4 px-5">
                                                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                                                              p.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-900/30' :
                                                              'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-700/50 dark:text-slate-400 dark:border-slate-600'
                                                          }`}>
                                                              {p.status === 'Completed' && <CheckCircle2 size={10} />}
                                                              {p.status}
                                                          </span>
                                                      </td>
                                                  </tr>
                                              ))}
                                          </tbody>
                                      </table>
                                  </div>
                              </div>
                          )}
                      </div>
                  </div>
              </div>
          </div>
      );
  }

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
                type="text" 
                placeholder="Search clients by name, company..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900 focus:border-indigo-300 transition-all text-slate-800 dark:text-slate-200 placeholder-slate-400 shadow-sm"
            />
        </div>
        
        {/* View Toggle */}
        <div className="flex bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-1 shadow-sm">
            <button 
                onClick={() => setViewMode('directory')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${viewMode === 'directory' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}
            >
                <List size={16} /> Directory
            </button>
            <div className="w-px bg-slate-200 dark:bg-slate-700 my-1 mx-1"></div>
            <button 
                onClick={() => setViewMode('tracking')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${viewMode === 'tracking' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}
            >
                <LayoutGrid size={16} /> Tracking
            </button>
        </div>

        {/* Type Filter */}
        <div className="relative">
            <select 
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-sm"
            >
                <option value="All">All Types</option>
                <option value="Client">Clients</option>
                <option value="Partner">Partners</option>
                <option value="Supplier">Suppliers</option>
                <option value="Potential">Potential</option>
            </select>
            <Filter size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>

        <button className="flex items-center justify-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200/50 dark:shadow-none">
            <Plus size={18} /> Add Contact
        </button>
      </div>

      {/* Main Content Area */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex-1 flex flex-col overflow-hidden">
          
          {viewMode === 'directory' ? (
              <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[900px]">
                      <thead>
                          <tr className="bg-slate-50/50 dark:bg-slate-800/80 border-b border-slate-100 dark:border-slate-700">
                              <th className="py-4 pl-6 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Contact / Type</th>
                              <th className="py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Company</th>
                              <th className="py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Contact Info</th>
                              <th className="py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Status</th>
                              <th className="py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Last Contact</th>
                              <th className="py-4 pr-6 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-right">Lifetime Value</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                          {filteredClients.map(client => (
                              <tr 
                                key={client.id} 
                                onClick={() => handleClientClick(client)}
                                className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors cursor-pointer group"
                              >
                                  <td className="py-4 pl-6">
                                      <div className="flex items-center gap-4">
                                          <img src={client.avatar} alt={client.name} className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700" />
                                          <div>
                                              <p className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{client.name}</p>
                                              <div className="flex items-center gap-1.5 mt-0.5">
                                                  <span className="text-slate-400">{getTypeIcon(client.type)}</span>
                                                  <span className="text-xs text-slate-500 dark:text-slate-400">{client.role}</span>
                                              </div>
                                          </div>
                                      </div>
                                  </td>
                                  <td className="py-4">
                                      <div className="flex items-center gap-2">
                                          <Building size={14} className="text-slate-400" />
                                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{client.company}</span>
                                      </div>
                                  </td>
                                  <td className="py-4">
                                      <div className="flex flex-col gap-1">
                                          <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                                              <Mail size={12} className="text-slate-400" /> {client.email}
                                          </div>
                                          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-500">
                                              <Phone size={12} className="text-slate-400" /> {client.phone}
                                          </div>
                                      </div>
                                  </td>
                                  <td className="py-4">
                                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(client.status)}`}>
                                          {client.status}
                                      </span>
                                  </td>
                                  <td className="py-4">
                                      <span className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                                          <Clock size={12} /> {client.lastContact}
                                      </span>
                                  </td>
                                  <td className="py-4 pr-6 text-right">
                                      <span className="text-sm font-bold text-slate-900 dark:text-white">{client.totalSpend}</span>
                                  </td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
                  {filteredClients.length === 0 && (
                      <div className="flex flex-col items-center justify-center p-12 text-slate-400">
                          <Search size={48} className="mb-4 opacity-20" />
                          <p className="font-medium">No contacts found</p>
                      </div>
                  )}
              </div>
          ) : (
              <div className="flex-1 p-6 overflow-y-auto">
                  {/* Tracking Dashboard */}
                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 h-full">
                      
                      {/* Column 1 (Large): Unified Feed */}
                      <div className="xl:col-span-2 bg-slate-50 dark:bg-slate-900/30 rounded-xl border border-slate-100 dark:border-slate-700/50 p-4 flex flex-col">
                          <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                              <MessageSquare size={18} className="text-indigo-500" /> Omnichannel Interaction Feed
                          </h3>
                          <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                              {allInteractions.length > 0 ? allInteractions.map((interaction, idx) => (
                                  <div key={idx} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex gap-4 hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors relative">
                                      {interaction.isImportant && (
                                          <div className="absolute top-2 right-2 text-amber-500">
                                              <Star size={14} className="fill-current" />
                                          </div>
                                      )}
                                      <div className={`p-2.5 rounded-full h-fit flex-shrink-0 ${
                                          interaction.type === 'email' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20' : 
                                          interaction.type === 'call' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/20' :
                                          interaction.type === 'social' ? 'bg-pink-100 text-pink-600 dark:bg-pink-900/20' :
                                          interaction.type === 'meeting' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/20' :
                                          'bg-slate-100 text-slate-600 dark:bg-slate-700'
                                      }`}>
                                          {getInteractionIcon(interaction.type)}
                                      </div>
                                      <div className="flex-1">
                                          <div className="flex justify-between items-start mb-1 pr-4">
                                              <div>
                                                  <span className="text-sm font-bold text-slate-800 dark:text-white">{interaction.summary}</span>
                                                  <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500">
                                                      <span className="font-medium text-slate-700 dark:text-slate-300">{interaction.clientName}</span>
                                                      <span className="text-slate-400">•</span>
                                                      <span className="uppercase text-[10px] font-bold tracking-wide">{interaction.type}</span>
                                                      {interaction.platform && (
                                                          <span className="bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded text-[10px]">{interaction.platform}</span>
                                                      )}
                                                  </div>
                                              </div>
                                              <span className="text-xs text-slate-400 font-medium whitespace-nowrap">{interaction.date}</span>
                                          </div>
                                          {interaction.details && (
                                              <p className={`text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/50 p-2.5 rounded-lg border mt-2 ${
                                                  interaction.isImportant ? 'border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-900/10' : 'border-slate-100 dark:border-slate-700/50'
                                              }`}>
                                                  {interaction.details}
                                              </p>
                                          )}
                                      </div>
                                  </div>
                              )) : (
                                  <div className="flex flex-col items-center justify-center h-full text-slate-400">
                                      <MessageSquare size={32} className="mb-2 opacity-20" />
                                      <p>No recent interactions.</p>
                                  </div>
                              )}
                          </div>
                      </div>

                      {/* Column 2 & 3 Combined (Right Side Stack) */}
                      <div className="flex flex-col gap-6 h-full overflow-hidden">
                          
                          {/* Follow-up Queue */}
                          <div className="bg-slate-50 dark:bg-slate-900/30 rounded-xl border border-slate-100 dark:border-slate-700/50 p-4 flex flex-col flex-1 min-h-0">
                              <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                                  <AlertCircle size={18} className="text-amber-500" /> Follow-up Required
                              </h3>
                              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                                  {upcomingFollowUps.map(client => (
                                      <div key={client.id} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                                          <div className="flex justify-between items-start mb-2">
                                              <div className="flex items-center gap-3">
                                                  <img src={client.avatar} alt={client.name} className="w-8 h-8 rounded-full" />
                                                  <div>
                                                      <p className="font-bold text-sm text-slate-800 dark:text-white">{client.name}</p>
                                                      <p className="text-xs text-slate-500">{client.company}</p>
                                                  </div>
                                              </div>
                                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                                                  client.nextFollowUp === 'Today' ? 'bg-red-50 text-red-600 border-red-100 dark:bg-red-900/20 dark:text-red-400' : 
                                                  client.nextFollowUp === 'Overdue' ? 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/40 dark:text-red-300' :
                                                  'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400'
                                              }`}>
                                                  {client.nextFollowUp}
                                              </span>
                                          </div>
                                          <div className="flex gap-2 mt-3">
                                              <button className="flex-1 py-1.5 text-xs font-medium bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors">
                                                  Call Now
                                              </button>
                                              <button className="flex-1 py-1.5 text-xs font-medium border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                                                  Log Activity
                                              </button>
                                          </div>
                                      </div>
                                  ))}
                              </div>
                          </div>

                          {/* Relationship Health */}
                          <div className="bg-slate-50 dark:bg-slate-900/30 rounded-xl border border-slate-100 dark:border-slate-700/50 p-4 flex flex-col h-[300px]">
                              <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                                  <TrendingUp size={18} className="text-emerald-500" /> Relationship Health
                              </h3>
                              <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                                  {clients.slice(0, 4).map(client => (
                                      <div key={client.id} className="flex items-center gap-4 bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                                          <div className="relative">
                                              <img src={client.avatar} alt={client.name} className="w-10 h-10 rounded-full" />
                                              <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-slate-800 ${client.engagementScore > 80 ? 'bg-emerald-500' : client.engagementScore > 50 ? 'bg-amber-500' : 'bg-red-500'}`}></div>
                                          </div>
                                          <div className="flex-1 min-w-0">
                                              <div className="flex justify-between items-center mb-1">
                                                  <p className="font-semibold text-sm text-slate-800 dark:text-white truncate">{client.name}</p>
                                                  <span className="text-xs font-bold text-slate-500">{client.engagementScore}%</span>
                                              </div>
                                              <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                                                  <div 
                                                      className={`h-full rounded-full ${client.engagementScore > 80 ? 'bg-emerald-500' : client.engagementScore > 50 ? 'bg-amber-500' : 'bg-red-500'}`} 
                                                      style={{ width: `${client.engagementScore}%` }}
                                                  ></div>
                                              </div>
                                              <p className="text-[10px] text-slate-400 mt-1">Last Contact: {client.lastContact}</p>
                                          </div>
                                      </div>
                                  ))}
                              </div>
                          </div>

                      </div>
                  </div>
              </div>
          )}
      </div>
    </div>
  );
};
