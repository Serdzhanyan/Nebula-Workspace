
import React, { useState } from 'react';
import { ArrowLeft, Phone, Users, Clock, Headphones, Activity, User, Mic, MoreVertical, Pause, Play, PhoneOff, X, MapPin, Calendar, MessageSquare, Search, Package, Check, MicOff, Grip, LayoutGrid, Send, Paperclip, Mail, FileText, MessageCircle, ArrowUpRight, ArrowDownLeft, Ticket, AlertCircle, CheckCircle2, Plus, Filter, Download, ChevronDown, ChevronUp, PlayCircle, Tag, ExternalLink, Delete, Shield, AlertTriangle, RefreshCw, Box, BookOpen, Search as SearchIcon, FileQuestion, ArrowRight, ShieldCheck, CreditCard, LogOut, Lock, Settings as SettingsIcon, GitBranch, Cpu, List, BarChart3, Briefcase, Hash, ToggleLeft, Minus, TrendingUp, TrendingDown, Zap } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { AgentProfilePage } from './AgentProfilePage';
import { IVREditorPage } from './IVREditorPage';
import { IVRSchedulePage } from './IVRSchedulePage';
import { RoutingRulesPage } from './RoutingRulesPage';
import { ChatAssignmentRulesPage, ChatAutoResponsePage, ChatTagsPage, ChatQueuesPage } from './ChatSettingsPages';
import { TicketCategoriesPage, TicketStatusesPage, TicketAutoAssignmentPage } from './TicketSettingsPages';

interface CallCenterPageProps {
  onBack: () => void;
  onNavigateToTicket?: (ticketId: string) => void;
}

export interface Agent {
  id: string;
  name: string;
  status: 'Available' | 'On Call' | 'Break' | 'Offline';
  department: string;
  duration?: string; // Duration in current status
  avatar: string;
}

interface ActiveCall {
  id: string;
  caller: string;
  number: string;
  agent: string;
  duration: string;
  queue: string;
  status: 'Active' | 'Holding' | 'Ringing';
  location?: string;
  email?: string;
}

interface CustomerProduct {
  id: string;
  name: string;
  sku: string;
  purchaseDate: string;
  warrantyStatus: 'Active' | 'Expired' | 'Extended';
  warrantyExpiry: string;
  status: 'Active' | 'Inactive' | 'Pending';
  price: string;
  image: string;
  specs?: string[];
  lastTicket?: string;
}

interface ChatMsg {
  id: string;
  sender: 'Client' | 'Agent';
  text: string;
  time: string;
}

interface InteractionHistory {
  id: string;
  type: 'call' | 'email' | 'ticket' | 'chat';
  direction?: 'inbound' | 'outbound';
  date: string;
  subject: string;
  agent: string;
  duration?: string;
  status?: string;
  outcome?: string;
  notes?: string;
  recording?: boolean;
}

interface GlobalCallHistoryItem {
  id: string;
  caller: string;
  number: string;
  agent: string;
  date: string;
  time: string;
  duration: string;
  queue: string;
  status: 'Completed' | 'Missed' | 'Voicemail' | 'Abandoned';
  tags: string[];
  notes?: string;
  sentiment: 'Positive' | 'Neutral' | 'Negative';
}

export const CallCenterPage: React.FC<CallCenterPageProps> = ({ onBack, onNavigateToTicket }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'agents' | 'history' | 'settings'>('dashboard');
  const [settingsSubTab, setSettingsSubTab] = useState<'ivr' | 'chat' | 'tickets' | 'analytics' | 'admin'>('ivr');
  const [selectedCall, setSelectedCall] = useState<ActiveCall | null>(null);
  const [note, setNote] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [isOnHold, setIsOnHold] = useState(false);
  const [productSearch, setProductSearch] = useState("");
  
  // Analytics State
  const [analyticsTimeRange, setAnalyticsTimeRange] = useState<'24h' | '7d' | '30d'>('7d');
  const [selectedAnalyticsMetric, setSelectedAnalyticsMetric] = useState<'calls' | 'queue' | 'callback' | 'aht'>('calls');

  // Agents Tab State
  const [agentSearch, setAgentSearch] = useState("");
  const [agentFilter, setAgentFilter] = useState("All");
  const [monitoringAgent, setMonitoringAgent] = useState<Agent | null>(null);
  const [messagingAgent, setMessagingAgent] = useState<Agent | null>(null);
  const [activeAgentMenuId, setActiveAgentMenuId] = useState<string | null>(null);
  const [agentMessageInput, setAgentMessageInput] = useState("");
  const [selectedAgentProfile, setSelectedAgentProfile] = useState<Agent | null>(null);
  
  // Call Actions State
  const [isKeypadOpen, setIsKeypadOpen] = useState(false);
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [dialedNumbers, setDialedNumbers] = useState("");
  const [transferSearch, setTransferSearch] = useState("");

  // History Tab State
  const [expandedHistoryId, setExpandedHistoryId] = useState<string | null>(null);
  const [historySearch, setHistorySearch] = useState("");

  // Call Detail States
  const [callDetailTab, setCallDetailTab] = useState<'script' | 'chat' | 'history' | 'tickets'>('script');
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMsg[]>([
      { id: '1', sender: 'Client', text: 'Hi, I have an issue with my recent order.', time: '10:00 AM' },
      { id: '2', sender: 'Agent', text: 'Hello! I can certainly help with that. Could you provide the order ID?', time: '10:01 AM' },
      { id: '3', sender: 'Client', text: 'Yes, it is ORD-9921.', time: '10:02 AM' },
  ]);
  const [expandedUserHistoryId, setExpandedUserHistoryId] = useState<string | null>(null);
  const [expandedTicketId, setExpandedTicketId] = useState<string | null>(null);
  const [expandedProductId, setExpandedProductId] = useState<string | null>(null);

  // New Modal States
  const [viewingHistoryItem, setViewingHistoryItem] = useState<InteractionHistory | null>(null);
  const [viewingRelatedTicket, setViewingRelatedTicket] = useState<any | null>(null);
  const [viewingWarrantyProduct, setViewingWarrantyProduct] = useState<CustomerProduct | null>(null);

  // Product Actions State
  const [activeProductAction, setActiveProductAction] = useState<{
    productId: string;
    type: 'ticket' | 'manual';
    product: CustomerProduct;
  } | null>(null);
  const [panelState, setPanelState] = useState<'standard' | 'expanded' | 'collapsed'>('standard');
  const [manualSearch, setManualSearch] = useState("");
  const [selectedManualSection, setSelectedManualSection] = useState<{ title: string; content: string } | null>(null);
  const [ticketForm, setTicketForm] = useState({ subject: '', priority: 'Medium', description: '' });

  // IVR Editor State
  const [showIVREditor, setShowIVREditor] = useState(false);
  // Schedule Editor State
  const [showScheduleEditor, setShowScheduleEditor] = useState(false);
  // Routing Rules Editor State
  const [showRoutingRules, setShowRoutingRules] = useState(false);

  // Chat Settings View State
  const [chatSettingsView, setChatSettingsView] = useState<'main' | 'assignment' | 'auto-response' | 'tags' | 'queues'>('main');
  
  // Ticket Settings View State
  const [ticketSettingsView, setTicketSettingsView] = useState<'main' | 'categories' | 'statuses' | 'auto-assignment'>('main');

  const agents: Agent[] = [
    { id: '1', name: 'Sarah Lee', status: 'On Call', department: 'Support', duration: '04:23', avatar: 'https://picsum.photos/100/100?random=1' },
    { id: '2', name: 'Mark Vos', status: 'Available', department: 'Sales', duration: '12:00', avatar: 'https://picsum.photos/100/100?random=2' },
    { id: '3', name: 'James D.', status: 'Break', department: 'Support', duration: '08:45', avatar: 'https://picsum.photos/100/100?random=3' },
    { id: '4', name: 'Emma Watson', status: 'On Call', department: 'Sales', duration: '02:10', avatar: 'https://picsum.photos/100/100?random=4' },
    { id: '5', name: 'Alex Johnson', status: 'Available', department: 'Tech', duration: '05:30', avatar: 'https://picsum.photos/100/100?random=5' },
  ];

  const activeCalls: ActiveCall[] = [
    { id: 'c1', caller: 'John Doe', number: '+1 (555) 012-3456', agent: 'Sarah Lee', duration: '04:25', queue: 'Support', status: 'Active', location: 'San Francisco, CA', email: 'john.doe@example.com' },
    { id: 'c2', caller: 'Acme Corp', number: '+1 (555) 098-7654', agent: 'Emma Watson', duration: '02:12', queue: 'Sales', status: 'Active', location: 'New York, NY', email: 'procurement@acme.com' },
    { id: 'c3', caller: 'Unknown', number: '+1 (555) 456-7890', agent: 'unassigned', duration: '00:45', queue: 'General', status: 'Ringing', location: 'Chicago, IL' },
  ];

  const customerProducts: CustomerProduct[] = [
      { 
          id: 'cp1', 
          name: 'Enterprise License', 
          sku: 'SW-ENT-001', 
          purchaseDate: 'Jan 15, 2024', 
          warrantyStatus: 'Active', 
          warrantyExpiry: 'Jan 15, 2025', 
          status: 'Active', 
          price: '$12,500', 
          image: 'https://picsum.photos/seed/p1/200/200',
          specs: ['Unlimited Users', '24/7 Support', 'Advanced Security'],
          lastTicket: 'T-2024-001'
      },
      { 
          id: 'cp2', 
          name: 'Cloud Server Blade', 
          sku: 'HW-SRV-X1', 
          purchaseDate: 'Mar 10, 2023', 
          warrantyStatus: 'Expired', 
          warrantyExpiry: 'Mar 10, 2024', 
          status: 'Inactive', 
          price: '$3,500', 
          image: 'https://picsum.photos/seed/p3/200/200',
          specs: ['32 Core CPU', '128GB RAM', '2TB SSD'],
          lastTicket: 'T-2023-882'
      },
      { 
          id: 'cp3', 
          name: 'Legacy Adapter', 
          sku: 'HW-ADP-005', 
          purchaseDate: 'Jun 20, 2024', 
          warrantyStatus: 'Active', 
          warrantyExpiry: 'Jun 20, 2025', 
          status: 'Active', 
          price: '$150', 
          image: 'https://picsum.photos/seed/p5/200/200',
          specs: ['USB-C to Serial', 'Ruggedized'],
      }
  ];

  const manualSections = [
    { title: 'Getting Started', content: 'Unbox the device and connect to power. The initial LED should blink green. Press the reset button for 3 seconds to enter pairing mode.' },
    { title: 'Troubleshooting', content: 'If the LED is red, check the power connection. A solid amber light indicates network negotiation. Restart the router if connection fails.' },
    { title: 'Maintenance', content: 'Clean the air intake filter every 2 weeks. Do not use abrasive chemicals. Keep firmware updated via the admin portal.' },
    { title: 'Technical Specifications', content: 'Input: 100-240V AC, 50/60Hz. Output: 12V DC, 2A. Operating Temperature: 0-40°C. Storage: -20-70°C.' },
    { title: 'Warranty Terms', content: 'Standard 1-year warranty covers defects in materials and workmanship. Does not cover water damage or accidental drops.' }
  ];

  const historyItems: InteractionHistory[] = [
      { id: 'h1', type: 'call', direction: 'inbound', date: 'Today, 10:00 AM', subject: 'Order Inquiry', agent: 'Sarah Lee', duration: 'Current', status: 'Active', notes: 'Currently ongoing call regarding missing shipment.' },
      { id: 'h2', type: 'ticket', date: 'Oct 22, 2024', subject: 'Ticket #8821: Login Failure', agent: 'Helpdesk', status: 'Resolved', notes: 'User reset password successfully. Ticket closed.' },
      { id: 'h3', type: 'email', date: 'Oct 15, 2024', subject: 'Re: Subscription Renewal', agent: 'Auto-Sender', status: 'Sent', notes: 'Automated renewal notice sent to main contact.' },
      { id: 'h4', type: 'call', direction: 'outbound', date: 'Sep 30, 2024', subject: 'Follow-up Call', agent: 'Mark Vos', duration: '12m 10s', outcome: 'Voicemail', recording: true, notes: 'Left voicemail regarding Q4 promo. Customer requested callback.' },
      { id: 'h5', type: 'chat', date: 'Sep 25, 2024', subject: 'Live Chat Session', agent: 'Emma Watson', duration: '8m 45s', outcome: 'Resolved', notes: 'Chat transcript saved. Issue with payment gateway resolved.' },
      { id: 'h6', type: 'call', direction: 'inbound', date: 'Sep 10, 2024', subject: 'Support Request', agent: 'James D.', duration: '15m 30s', outcome: 'Escalated', recording: true, notes: 'Escalated to Tier 2 support due to complexity.' },
  ];

  const globalHistory: GlobalCallHistoryItem[] = [
      { id: 'gh1', caller: 'Alice Smith', number: '+1 (555) 111-2222', agent: 'Sarah Lee', date: 'Oct 24', time: '14:30', duration: '05:12', queue: 'Support', status: 'Completed', tags: ['Resolved', 'Billing'], sentiment: 'Positive', notes: 'Customer clarified invoice discrepancy. Refund issued.' },
      { id: 'gh2', caller: 'Robert Fox', number: '+1 (555) 333-4444', agent: 'Mark Vos', date: 'Oct 24', time: '11:15', duration: '12:45', queue: 'Sales', status: 'Completed', tags: ['Upgrade', 'Lead'], sentiment: 'Positive', notes: 'Discussed Enterprise plan features. Sent proposal.' },
      { id: 'gh3', caller: 'Unknown', number: '+1 (555) 555-6666', agent: '-', date: 'Oct 24', time: '09:05', duration: '00:30', queue: 'General', status: 'Abandoned', tags: [], sentiment: 'Neutral' },
      { id: 'gh4', caller: 'Emily Davis', number: '+1 (555) 777-8888', agent: 'James D.', date: 'Oct 23', time: '16:45', duration: '03:20', queue: 'Support', status: 'Completed', tags: ['Technical', 'Bug'], sentiment: 'Negative', notes: 'Reported login issue on mobile app. Ticket #9921 created.' },
      { id: 'gh5', caller: 'Michael Brown', number: '+1 (555) 999-0000', agent: 'Emma Watson', date: 'Oct 23', time: '10:00', duration: '00:00', queue: 'Sales', status: 'Voicemail', tags: ['Callback'], sentiment: 'Neutral', notes: 'Left message regarding Q4 promotion.' },
  ];

  const callerTickets = [
      { id: 'T-2024-001', subject: 'Login issue on mobile app', status: 'Open', priority: 'High', created: '2 hours ago', description: 'User unable to login after update.', assignee: 'Sarah L.', lastUpdate: 'Escalated to dev team.' },
      { id: 'T-2024-002', subject: 'Billing inquiry Q3', status: 'Resolved', priority: 'Medium', created: '2 days ago', description: 'Question about line item 4.', assignee: 'Finance Team', lastUpdate: 'Invoice resent.' },
      { id: 'T-2024-003', subject: 'Feature request: Dark mode', status: 'Closed', priority: 'Low', created: '1 week ago', description: 'Customer wants dark mode support.', assignee: 'Product Team', lastUpdate: 'Added to backlog.' }
  ];

  // Mock Analytics Data
  const analyticsData = {
    calls: [
      { name: 'Mon', value: 145 }, { name: 'Tue', value: 230 }, { name: 'Wed', value: 180 }, { name: 'Thu', value: 210 }, { name: 'Fri', value: 195 }, { name: 'Sat', value: 80 }, { name: 'Sun', value: 65 }
    ],
    queue: [
      { name: '08:00', value: 2 }, { name: '10:00', value: 15 }, { name: '12:00', value: 8 }, { name: '14:00', value: 22 }, { name: '16:00', value: 10 }, { name: '18:00', value: 4 }
    ],
    aht: [
      { name: 'Mon', value: 245 }, { name: 'Tue', value: 230 }, { name: 'Wed', value: 255 }, { name: 'Thu', value: 210 }, { name: 'Fri', value: 280 }, { name: 'Sat', value: 190 }, { name: 'Sun', value: 180 }
    ],
    callback: [
        { name: 'Mon', value: 45 }, { name: 'Tue', value: 30 }, { name: 'Wed', value: 55 }, { name: 'Thu', value: 40 }, { name: 'Fri', value: 60 }, { name: 'Sat', value: 20 }, { name: 'Sun', value: 15 }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-emerald-500';
      case 'On Call': return 'bg-red-500';
      case 'Break': return 'bg-amber-500';
      case 'Offline': return 'bg-slate-400';
      default: return 'bg-slate-400';
    }
  };

  const getHistoryIcon = (type: string, direction?: string) => {
      switch(type) {
          case 'call': return direction === 'outbound' ? <ArrowUpRight size={16} /> : <ArrowDownLeft size={16} />;
          case 'email': return <Mail size={16} />;
          case 'ticket': return <FileText size={16} />;
          case 'chat': return <MessageCircle size={16} />;
          default: return <Clock size={16} />;
      }
  };

  const getCallStatusColor = (status: string) => {
      switch (status) {
          case 'Completed': return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400';
          case 'Missed': 
          case 'Abandoned': return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400';
          case 'Voicemail': return 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400';
          default: return 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300';
      }
  };

  const getTicketStatusColor = (status: string) => {
      switch (status) {
          case 'Open': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
          case 'Resolved': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
          case 'Closed': return 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300';
          default: return 'bg-slate-100 text-slate-700';
      }
  };

  const handleSendChat = (e: React.FormEvent) => {
      e.preventDefault();
      if(!chatInput.trim()) return;
      const msg: ChatMsg = {
          id: Date.now().toString(),
          sender: 'Agent',
          text: chatInput,
          time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      };
      setChatHistory([...chatHistory, msg]);
      setChatInput("");
  };

  const handleViewHistoryDetails = (item: InteractionHistory) => {
      setViewingHistoryItem(item);
  };

  const handleViewRelatedTicket = (item: InteractionHistory) => {
      setViewingRelatedTicket({
          id: `TICKET-${item.id.toUpperCase()}`,
          subject: item.subject,
          status: item.status === 'Resolved' ? 'Resolved' : 'Open',
          priority: 'Medium',
          created: item.date,
          assignee: item.agent,
          description: `Automatic ticket created from interaction.\n\nType: ${item.type}\nNotes: ${item.notes || 'No notes provided.'}`,
          lastUpdate: '1 hour ago'
      });
  };

  const handleViewTicketDetails = (ticket: any) => {
      setViewingRelatedTicket(ticket);
  };

  const handleProductAction = (product: CustomerProduct, type: 'ticket' | 'manual') => {
      setActiveProductAction({ productId: product.id, type, product });
      setTicketForm({ subject: `Support for ${product.name}`, priority: 'Medium', description: '' });
      setManualSearch("");
      setSelectedManualSection(null);
      setPanelState('standard');
  };

  const handleCreateTicket = (e: React.FormEvent) => {
      e.preventDefault();
      alert(`Ticket created for ${activeProductAction?.product.name}:\nSubject: ${ticketForm.subject}`);
      setActiveProductAction(null);
  };

  const handleDial = (digit: string) => {
      setDialedNumbers(prev => prev + digit);
  };

  const handleTransfer = (agent: Agent) => {
      alert(`Transferring call to ${agent.name}...`);
      setIsTransferOpen(false);
      setSelectedCall(null);
  };

  const handleProductTicketClick = (ticketId: string) => {
      const ticket = callerTickets.find(t => t.id === ticketId) || {
          id: ticketId,
          subject: 'Hardware Issue Report',
          status: 'Resolved',
          priority: 'Medium',
          created: '3 weeks ago',
          assignee: 'Support Team',
          description: 'Customer reported intermittent connectivity issues with the device.',
          lastUpdate: 'Firmware update resolved the issue.'
      };
      setViewingRelatedTicket(ticket);
  };

  const handleViewWarranty = (product: CustomerProduct) => {
      setViewingWarrantyProduct(product);
  };

  const handleExtendWarranty = (option: string) => {
      alert(`Warranty for ${viewingWarrantyProduct?.name} extended: ${option}`);
      setViewingWarrantyProduct(null);
  };

  const handleMonitor = (agent: Agent) => {
      setMonitoringAgent(agent);
  };

  const handleMessage = (agent: Agent) => {
      setMessagingAgent(agent);
      setAgentMessageInput("");
  };

  const handleSendMessage = (e: React.FormEvent) => {
      e.preventDefault();
      if(!agentMessageInput.trim() || !messagingAgent) return;
      alert(`Message sent to ${messagingAgent.name}: "${agentMessageInput}"`);
      setMessagingAgent(null);
  };

  const handleAgentMenuAction = (action: string, agent: Agent) => {
      setActiveAgentMenuId(null);
      alert(`Triggered action: ${action} for ${agent.name}`);
  };

  const filteredCustomerProducts = customerProducts.filter(p => p.name.toLowerCase().includes(productSearch.toLowerCase()) || p.sku.toLowerCase().includes(productSearch.toLowerCase()));
  const filteredHistory = globalHistory.filter(h => h.caller.toLowerCase().includes(historySearch.toLowerCase()) || h.number.includes(historySearch) || h.agent.toLowerCase().includes(historySearch));
  const filteredTransferAgents = agents.filter(a => a.name.toLowerCase().includes(transferSearch.toLowerCase()) || a.department.toLowerCase().includes(transferSearch.toLowerCase()));
  
  const filteredManualSections = manualSections.filter(s => 
      s.title.toLowerCase().includes(manualSearch.toLowerCase()) || 
      s.content.toLowerCase().includes(manualSearch.toLowerCase())
  );

  const filteredAgentsList = agents.filter(a => {
      const matchesSearch = a.name.toLowerCase().includes(agentSearch.toLowerCase()) || a.department.toLowerCase().includes(agentSearch.toLowerCase());
      const matchesFilter = agentFilter === 'All' || a.status === agentFilter;
      return matchesSearch && matchesFilter;
  });

  if (showIVREditor) {
      return (
          <IVREditorPage onBack={() => setShowIVREditor(false)} />
      );
  }

  if (showScheduleEditor) {
      return (
          <IVRSchedulePage onBack={() => setShowScheduleEditor(false)} />
      );
  }

  if (showRoutingRules) {
      return (
          <RoutingRulesPage onBack={() => setShowRoutingRules(false)} />
      );
  }

  if (chatSettingsView === 'assignment') return <ChatAssignmentRulesPage onBack={() => setChatSettingsView('main')} />;
  if (chatSettingsView === 'auto-response') return <ChatAutoResponsePage onBack={() => setChatSettingsView('main')} />;
  if (chatSettingsView === 'tags') return <ChatTagsPage onBack={() => setChatSettingsView('main')} />;
  if (chatSettingsView === 'queues') return <ChatQueuesPage onBack={() => setChatSettingsView('main')} />;

  if (ticketSettingsView === 'categories') return <TicketCategoriesPage onBack={() => setTicketSettingsView('main')} />;
  if (ticketSettingsView === 'statuses') return <TicketStatusesPage onBack={() => setTicketSettingsView('main')} />;
  if (ticketSettingsView === 'auto-assignment') return <TicketAutoAssignmentPage onBack={() => setTicketSettingsView('main')} />;

  if (selectedAgentProfile) {
      return (
          <AgentProfilePage 
              agent={selectedAgentProfile} 
              onBack={() => setSelectedAgentProfile(null)} 
          />
      );
  }

  // Full Screen Call Card View
  if (selectedCall) {
      // ... (Call Card View implementation remains unchanged - omitting for brevity as it is long and unchanged) ...
      return (
          <div className="fixed inset-0 z-50 bg-white dark:bg-slate-900 flex animate-in slide-in-from-bottom-10 duration-300">
              
              {/* Keypad Modal */}
              {isKeypadOpen && (
                  <div className="absolute inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={() => setIsKeypadOpen(false)}>
                      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-2xl w-[320px] flex flex-col items-center" onClick={e => e.stopPropagation()}>
                          <div className="w-full flex justify-between items-center mb-6">
                              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Keypad</h3>
                              <button onClick={() => setIsKeypadOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"><X size={20}/></button>
                          </div>
                          
                          <div className="w-full mb-6 p-4 bg-slate-100 dark:bg-slate-700/50 rounded-xl flex justify-between items-center">
                              <span className="text-2xl font-mono text-slate-900 dark:text-white tracking-widest">{dialedNumbers}</span>
                              {dialedNumbers && (
                                  <button onClick={() => setDialedNumbers(prev => prev.slice(0, -1))} className="text-slate-400 hover:text-red-500">
                                      <Delete size={20} />
                                  </button>
                              )}
                          </div>

                          <div className="grid grid-cols-3 gap-4 w-full">
                              {[1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, '#'].map((digit) => (
                                  <button
                                      key={digit}
                                      onClick={() => handleDial(digit.toString())}
                                      className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-700/30 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 text-slate-700 dark:text-slate-200 font-bold text-xl flex items-center justify-center transition-colors border border-slate-200 dark:border-slate-700"
                                  >
                                      {digit}
                                  </button>
                              ))}
                          </div>
                      </div>
                  </div>
              )}

              {/* Transfer Modal */}
              {isTransferOpen && (
                  <div className="absolute inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={() => setIsTransferOpen(false)}>
                      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-2xl w-full max-w-md h-[500px] flex flex-col" onClick={e => e.stopPropagation()}>
                          <div className="w-full flex justify-between items-center mb-4">
                              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Transfer Call</h3>
                              <button onClick={() => setIsTransferOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"><X size={20}/></button>
                          </div>
                          <div className="relative mb-4">
                              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                              <input 
                                  type="text" 
                                  placeholder="Search agents or departments..." 
                                  value={transferSearch}
                                  onChange={(e) => setTransferSearch(e.target.value)}
                                  className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                              />
                          </div>
                          <div className="flex-1 overflow-y-auto space-y-2">
                              {filteredTransferAgents.map(agent => (
                                  <div key={agent.id} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer" onClick={() => handleTransfer(agent)}>
                                      <div className="flex items-center gap-3">
                                          <div className="relative">
                                              <img src={agent.avatar} alt={agent.name} className="w-10 h-10 rounded-full" />
                                              <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-slate-800 ${getStatusColor(agent.status)}`}></div>
                                          </div>
                                          <div>
                                              <p className="font-bold text-sm text-slate-900 dark:text-white">{agent.name}</p>
                                              <p className="text-xs text-slate-500">{agent.department}</p>
                                          </div>
                                      </div>
                                      <button className="px-3 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700">Transfer</button>
                                  </div>
                              ))}
                          </div>
                      </div>
                  </div>
              )}

              {/* Left Panel: User Data & Call Controls */}
              <div className="w-1/2 h-full flex flex-col border-r border-slate-200 dark:border-slate-800 relative bg-slate-50 dark:bg-slate-900">
                  <div className="flex-1 overflow-y-auto p-8 pb-32">
                      <div className="flex items-center gap-6 mb-8">
                          <div className="w-20 h-20 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-2xl font-bold text-slate-500">
                              {selectedCall.caller.charAt(0)}
                          </div>
                          <div>
                              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{selectedCall.caller}</h2>
                              <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400 text-sm">
                                  <span className="flex items-center gap-1"><Phone size={14} /> {selectedCall.number}</span>
                                  {selectedCall.location && <span className="flex items-center gap-1"><MapPin size={14} /> {selectedCall.location}</span>}
                                  {selectedCall.email && <span className="flex items-center gap-1"><Mail size={14} /> {selectedCall.email}</span>}
                              </div>
                              <div className="flex gap-2 mt-3">
                                  <span className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide">VIP</span>
                                  <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide">Verified</span>
                              </div>
                          </div>
                      </div>

                      {/* Tabs */}
                      <div className="flex border-b border-slate-200 dark:border-slate-700 mb-6">
                          {['script', 'chat', 'history', 'tickets'].map(tab => (
                              <button 
                                  key={tab}
                                  onClick={() => setCallDetailTab(tab as any)}
                                  className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors capitalize ${callDetailTab === tab ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-200'}`}
                              >
                                  {tab === 'history' ? 'User History' : tab === 'script' ? 'Script & Notes' : tab}
                              </button>
                          ))}
                      </div>

                      {callDetailTab === 'script' && (
                          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                              <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                                  <h3 className="font-bold text-slate-900 dark:text-white mb-3 text-sm uppercase tracking-wide">Call Script</h3>
                                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                                      "Hello, thank you for calling Nebula Support. My name is {selectedCall.agent}. How can I assist you today?"
                                      <br/><br/>
                                      <strong>If reporting an issue:</strong> "I'm sorry to hear that. Could you please provide your order number or account ID so I can look that up?"
                                  </p>
                              </div>

                              <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm h-64 flex flex-col">
                                  <h3 className="font-bold text-slate-900 dark:text-white mb-3 text-sm uppercase tracking-wide">Call Notes</h3>
                                  <textarea 
                                      className="flex-1 w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500 resize-none text-slate-800 dark:text-slate-200"
                                      placeholder="Type notes here..."
                                      value={note}
                                      onChange={(e) => setNote(e.target.value)}
                                  />
                              </div>
                          </div>
                      )}

                      {callDetailTab === 'chat' && (
                          <div className="flex flex-col h-[500px] bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2">
                              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                  {chatHistory.map((msg) => (
                                      <div key={msg.id} className={`flex flex-col ${msg.sender === 'Agent' ? 'items-end' : 'items-start'}`}>
                                          <div className={`max-w-[80%] p-3 rounded-xl text-sm ${
                                              msg.sender === 'Agent' 
                                              ? 'bg-indigo-600 text-white rounded-br-none' 
                                              : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-bl-none'
                                          }`}>
                                              {msg.text}
                                          </div>
                                          <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.time}</span>
                                      </div>
                                  ))}
                              </div>
                              <form onSubmit={handleSendChat} className="p-3 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 flex gap-2">
                                  <input 
                                      type="text" 
                                      className="flex-1 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                                      placeholder="Type a message..."
                                      value={chatInput}
                                      onChange={(e) => setChatInput(e.target.value)}
                                  />
                                  <button type="submit" className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                                      <Send size={18} />
                                  </button>
                              </form>
                          </div>
                      )}

                      {/* ... other tabs ... */}
                  </div>
                  {/* ... call controls ... */}
              </div>
              {/* ... Right Panel ... */}
          </div>
      );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col relative">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors mb-2 text-sm font-medium"
          >
            <ArrowLeft size={16} /> Back to Control Panel
          </button>
          <div className="flex items-center gap-3">
             <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Call Center</h2>
             <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wide">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                Live
             </span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Real-time monitoring of agents and queues.</p>
        </div>
        
        <div className="flex bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            {['dashboard', 'agents', 'history', 'settings'].map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                        activeTab === tab 
                        ? 'bg-indigo-600 text-white shadow-sm' 
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                    }`}
                >
                    {tab}
                </button>
            ))}
        </div>
      </div>

      {/* Dashboard View */}
      {activeTab === 'dashboard' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
            {/* ... Dashboard content ... */}
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Metrics Cards */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Active Calls</p>
                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white">12</h3>
                    </div>
                    <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl">
                        <Phone size={24} />
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Agents Online</p>
                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white">8</h3>
                    </div>
                    <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl">
                        <Headphones size={24} />
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Avg Wait Time</p>
                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white">1m 30s</h3>
                    </div>
                    <div className="p-3 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-xl">
                        <Clock size={24} />
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Abandon Rate</p>
                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white">2%</h3>
                    </div>
                    <div className="p-3 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl">
                        <Activity size={24} />
                    </div>
                </div>
            </div>

            {/* Live Calls Table */}
            <div className="lg:col-span-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col h-[500px]">
                <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">Live Calls</h3>
                    <div className="flex gap-2">
                        <span className="flex items-center gap-1.5 px-3 py-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs font-bold rounded-full border border-red-100 dark:border-red-900/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span> 3 Queueing
                        </span>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 dark:bg-slate-900/50 text-xs uppercase text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-100 dark:border-slate-700">
                            <tr>
                                <th className="p-4 pl-6">Caller</th>
                                <th className="p-4">Number</th>
                                <th className="p-4">Agent</th>
                                <th className="p-4">Duration</th>
                                <th className="p-4">Queue</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 pr-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-sm">
                            {activeCalls.map((call) => (
                                <tr key={call.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors group cursor-pointer" onClick={() => setSelectedCall(call)}>
                                    <td className="p-4 pl-6 font-medium text-slate-900 dark:text-white">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 font-bold text-xs">
                                                {call.caller.charAt(0)}
                                            </div>
                                            {call.caller}
                                        </div>
                                    </td>
                                    <td className="p-4 text-slate-500 dark:text-slate-400 font-mono">{call.number}</td>
                                    <td className="p-4 text-slate-700 dark:text-slate-300">{call.agent}</td>
                                    <td className="p-4 font-mono text-slate-600 dark:text-slate-300">{call.duration}</td>
                                    <td className="p-4"><span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-xs font-medium">{call.queue}</span></td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wide ${
                                            call.status === 'Active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                                            call.status === 'Holding' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                                            'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                        }`}>
                                            {call.status}
                                        </span>
                                    </td>
                                    <td className="p-4 pr-6 text-right">
                                        <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors" title="Monitor" onClick={(e) => e.stopPropagation()}>
                                            <Headphones size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      )}

      {/* Agents View */}
      {activeTab === 'agents' && (
        <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300">
             {/* ... Agents content ... */}
             <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                        type="text" 
                        placeholder="Search agents..." 
                        value={agentSearch}
                        onChange={(e) => setAgentSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <div className="flex gap-2">
                    {['All', 'Available', 'On Call', 'Break', 'Offline'].map(filter => (
                        <button 
                            key={filter}
                            onClick={() => setAgentFilter(filter)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                                agentFilter === filter 
                                ? 'bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-900/30 dark:border-indigo-800 dark:text-indigo-400' 
                                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                            }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
             </div>
             
             <div className="flex-1 overflow-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50/50 dark:bg-slate-900/50 text-xs font-bold uppercase text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-700 sticky top-0 backdrop-blur-sm">
                        <tr>
                            <th className="p-4 pl-6">Agent Name</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Department</th>
                            <th className="p-4">Duration</th>
                            <th className="p-4 pr-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-sm">
                        {filteredAgentsList.map(agent => (
                            <tr key={agent.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors group cursor-pointer" onClick={() => setSelectedAgentProfile(agent)}>
                                <td className="p-4 pl-6">
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <img src={agent.avatar} alt={agent.name} className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700" />
                                            <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-slate-800 ${getStatusColor(agent.status)}`}></div>
                                        </div>
                                        <span className="font-semibold text-slate-900 dark:text-white">{agent.name}</span>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                                        agent.status === 'Available' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800' :
                                        agent.status === 'On Call' ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800' :
                                        agent.status === 'Break' ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800' :
                                        'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-700 dark:text-slate-400'
                                    }`}>
                                        {agent.status}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <span className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-xs text-slate-600 dark:text-slate-300 font-medium">
                                        {agent.department}
                                    </span>
                                </td>
                                <td className="p-4 font-mono text-slate-500 dark:text-slate-400">{agent.duration}</td>
                                <td className="p-4 pr-6 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity" onClick={e => e.stopPropagation()}>
                                        <button onClick={() => handleMessage(agent)} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors" title="Message">
                                            <MessageSquare size={16} />
                                        </button>
                                        <button onClick={() => handleMonitor(agent)} className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors" title="Monitor">
                                            <Headphones size={16} />
                                        </button>
                                        <div className="relative">
                                            <button 
                                                onClick={() => setActiveAgentMenuId(activeAgentMenuId === agent.id ? null : agent.id)}
                                                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                                            >
                                                <MoreVertical size={16} />
                                            </button>
                                            {activeAgentMenuId === agent.id && (
                                                <>
                                                    <div className="fixed inset-0 z-10" onClick={() => setActiveAgentMenuId(null)}></div>
                                                    <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 py-1 z-20 animate-in fade-in zoom-in-95 duration-200 text-left">
                                                        <button onClick={() => handleAgentMenuAction('Force Logout', agent)} className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 flex items-center gap-2">
                                                            <LogOut size={14} /> Force Logout
                                                        </button>
                                                        <button onClick={() => handleAgentMenuAction('Change Status', agent)} className="w-full px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2">
                                                            <RefreshCw size={14} /> Change Status
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
             </div>
        </div>
      )}

      {/* History View */}
      {activeTab === 'history' && (
          <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300">
              {/* ... History content ... */}
              <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center gap-4">
                  <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input 
                          type="text" 
                          placeholder="Search call history..." 
                          value={historySearch}
                          onChange={(e) => setHistorySearch(e.target.value)}
                          className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                  </div>
                  <div className="flex gap-2">
                      <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-2">
                          <Filter size={16} /> Filter
                      </button>
                      <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-2">
                          <Download size={16} /> Export
                      </button>
                  </div>
              </div>

              <div className="flex-1 overflow-auto">
                  <table className="w-full text-left border-collapse">
                      <thead className="bg-slate-50/50 dark:bg-slate-900/50 text-xs font-bold uppercase text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-700 sticky top-0 backdrop-blur-sm">
                          <tr>
                              <th className="p-4 pl-6">Caller</th>
                              <th className="p-4">Agent</th>
                              <th className="p-4">Date/Time</th>
                              <th className="p-4">Duration</th>
                              <th className="p-4">Status</th>
                              <th className="p-4">Sentiment</th>
                              <th className="p-4 pr-6 w-10"></th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-sm">
                          {filteredHistory.map((item) => (
                              <React.Fragment key={item.id}>
                                  <tr 
                                      className={`hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors cursor-pointer ${expandedHistoryId === item.id ? 'bg-slate-50 dark:bg-slate-700/30' : ''}`}
                                      onClick={() => setExpandedHistoryId(expandedHistoryId === item.id ? null : item.id)}
                                  >
                                      <td className="p-4 pl-6">
                                          <div>
                                              <p className="font-bold text-slate-900 dark:text-white">{item.caller}</p>
                                              <p className="text-xs text-slate-500 font-mono">{item.number}</p>
                                          </div>
                                      </td>
                                      <td className="p-4 text-slate-700 dark:text-slate-300">{item.agent}</td>
                                      <td className="p-4 text-slate-500 dark:text-slate-400">
                                          <div>{item.date}</div>
                                          <div className="text-xs">{item.time}</div>
                                      </td>
                                      <td className="p-4 font-mono text-slate-600 dark:text-slate-300">{item.duration}</td>
                                      <td className="p-4">
                                          <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wide border ${getCallStatusColor(item.status)}`}>
                                              {item.status}
                                          </span>
                                      </td>
                                      <td className="p-4">
                                          {item.sentiment === 'Positive' && <span className="text-emerald-500 flex items-center gap-1 font-medium"><CheckCircle2 size={14} /> Positive</span>}
                                          {item.sentiment === 'Negative' && <span className="text-red-500 flex items-center gap-1 font-medium"><AlertCircle size={14} /> Negative</span>}
                                          {item.sentiment === 'Neutral' && <span className="text-slate-500 flex items-center gap-1 font-medium"><Minus size={14} /> Neutral</span>}
                                      </td>
                                      <td className="p-4 pr-6">
                                          <ChevronDown size={16} className={`text-slate-400 transition-transform ${expandedHistoryId === item.id ? 'rotate-180' : ''}`} />
                                      </td>
                                  </tr>
                                  {expandedHistoryId === item.id && (
                                      <tr>
                                          <td colSpan={7} className="p-0 bg-slate-50 dark:bg-slate-900/30 border-b border-slate-100 dark:border-slate-700">
                                              <div className="p-6 grid grid-cols-2 gap-8 animate-in fade-in slide-in-from-top-2">
                                                  <div>
                                                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Recording & Transcript</h4>
                                                      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 mb-4">
                                                          <div className="flex items-center gap-4">
                                                              <button className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 transition-colors">
                                                                  <Play size={18} fill="currentColor" className="ml-1" />
                                                              </button>
                                                              <div className="flex-1">
                                                                  <div className="h-8 w-full flex items-center gap-0.5 opacity-50">
                                                                      {[...Array(40)].map((_, i) => (
                                                                          <div key={i} className="w-1 bg-slate-800 dark:bg-slate-200 rounded-full" style={{ height: `${Math.random() * 100}%` }}></div>
                                                                      ))}
                                                                  </div>
                                                              </div>
                                                              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">{item.duration}</span>
                                                          </div>
                                                      </div>
                                                      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 h-32 overflow-y-auto">
                                                          <p className="text-sm text-slate-600 dark:text-slate-300 italic">
                                                              [00:00] Agent: Thank you for calling...<br/>
                                                              [00:05] Client: Hi, I have a problem with...<br/>
                                                              [00:15] Agent: I can help with that...
                                                          </p>
                                                      </div>
                                                  </div>
                                                  <div>
                                                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Call Details</h4>
                                                      <div className="space-y-4">
                                                          <div>
                                                              <label className="text-xs text-slate-400">Queue</label>
                                                              <p className="font-medium text-slate-800 dark:text-white">{item.queue}</p>
                                                          </div>
                                                          <div>
                                                              <label className="text-xs text-slate-400">Notes</label>
                                                              <p className="text-sm text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                                                                  {item.notes || 'No notes added.'}
                                                              </p>
                                                          </div>
                                                          <div>
                                                              <label className="text-xs text-slate-400 mb-2 block">Tags</label>
                                                              <div className="flex flex-wrap gap-2">
                                                                  {item.tags.map(tag => (
                                                                      <span key={tag} className="px-2 py-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs rounded-md">
                                                                          {tag}
                                                                      </span>
                                                                  ))}
                                                              </div>
                                                          </div>
                                                          <div className="flex justify-end pt-2">
                                                              <button className="px-4 py-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 text-sm font-bold rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/40">
                                                                  View Full Record
                                                              </button>
                                                          </div>
                                                      </div>
                                                  </div>
                                              </div>
                                          </td>
                                      </tr>
                                  )}
                              </React.Fragment>
                          ))}
                      </tbody>
                  </table>
              </div>
          </div>
      )}

      {/* Settings View */}
      {activeTab === 'settings' && (
        <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex h-full">
                {/* Settings Sidebar */}
                <div className="w-64 border-r border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 p-4 flex flex-col gap-2">
                    <button 
                        onClick={() => setSettingsSubTab('ivr')}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${settingsSubTab === 'ivr' ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                    >
                        <GitBranch size={18} /> IVR & Routing
                    </button>
                    <button 
                        onClick={() => setSettingsSubTab('chat')}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${settingsSubTab === 'chat' ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                    >
                        <MessageSquare size={18} /> Chat Settings
                    </button>
                    <button 
                        onClick={() => setSettingsSubTab('tickets')}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${settingsSubTab === 'tickets' ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                    >
                        <Ticket size={18} /> Ticket Settings
                    </button>
                    <button 
                        onClick={() => setSettingsSubTab('analytics')}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${settingsSubTab === 'analytics' ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                    >
                        <BarChart3 size={18} /> Analytics
                    </button>
                    <button 
                        onClick={() => setSettingsSubTab('admin')}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${settingsSubTab === 'admin' ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                    >
                        <SettingsIcon size={18} /> Administration
                    </button>
                </div>

                {/* Settings Content */}
                <div className="flex-1 overflow-y-auto p-8">
                    {/* ... (Other settings tabs) ... */}
                    {settingsSubTab === 'ivr' && (
                        /* ... (IVR Content unchanged) ... */
                        <div className="space-y-6 animate-in fade-in duration-300">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">IVR & Routing</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div 
                                    onClick={() => setShowIVREditor(true)}
                                    className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-indigo-300 transition-colors group cursor-pointer bg-white dark:bg-slate-800"
                                >
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl text-purple-600 dark:text-purple-400"><GitBranch size={24} /></div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">IVR Editor</h4>
                                            <p className="text-sm text-slate-500">Design call flow trees, phrases & audio</p>
                                        </div>
                                    </div>
                                    <div className="h-32 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 text-sm group-hover:bg-slate-100 dark:group-hover:bg-slate-800/50 transition-colors">
                                        Click to Open Visual Editor
                                    </div>
                                </div>
                                <div 
                                    onClick={() => setShowRoutingRules(true)}
                                    className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-indigo-300 transition-colors group cursor-pointer bg-white dark:bg-slate-800"
                                >
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-600 dark:text-blue-400"><ArrowRight size={24} /></div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Routing Rules</h4>
                                            <p className="text-sm text-slate-500">Skill & time-based routing logic</p>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="p-2 bg-slate-50 dark:bg-slate-900/50 rounded border border-slate-100 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-300">If Time &gt; 17:00 THEN Voicemail</div>
                                        <div className="p-2 bg-slate-50 dark:bg-slate-900/50 rounded border border-slate-100 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-300">If VIP Customer THEN Priority Queue</div>
                                    </div>
                                </div>
                                <div 
                                    onClick={() => setShowScheduleEditor(true)}
                                    className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-indigo-300 transition-colors group cursor-pointer bg-white dark:bg-slate-800"
                                >
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl text-amber-600 dark:text-amber-400"><Calendar size={24} /></div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">IVR Schedule</h4>
                                            <p className="text-sm text-slate-500">Working hours, holidays & exceptions</p>
                                        </div>
                                    </div>
                                    <div className="h-32 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 text-sm group-hover:bg-slate-100 dark:group-hover:bg-slate-800/50 transition-colors">
                                        Click to Manage Schedule
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {settingsSubTab === 'chat' && (
                        /* ... (Chat Content unchanged) ... */
                        <div className="space-y-6 animate-in fade-in duration-300">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Chat Settings</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div 
                                    onClick={() => setChatSettingsView('assignment')}
                                    className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all cursor-pointer group"
                                >
                                    <h4 className="font-bold text-slate-900 dark:text-white mb-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Assignment Rules</h4>
                                    <div className="space-y-3 pointer-events-none">
                                        <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                                            <span className="text-sm font-medium">Round Robin</span>
                                            <input type="checkbox" checked className="toggle" readOnly />
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                                            <span className="text-sm font-medium">Load Balanced</span>
                                            <input type="checkbox" className="toggle" readOnly />
                                        </div>
                                    </div>
                                </div>
                                <div 
                                    onClick={() => setChatSettingsView('auto-response')}
                                    className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all cursor-pointer group"
                                >
                                    <h4 className="font-bold text-slate-900 dark:text-white mb-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Auto-Response</h4>
                                    <div className="w-full h-24 p-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-500 overflow-hidden pointer-events-none">
                                        Hello! Thanks for reaching out. An agent will be with you shortly.
                                    </div>
                                </div>
                                <div 
                                    onClick={() => setChatSettingsView('tags')}
                                    className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all cursor-pointer group"
                                >
                                    <h4 className="font-bold text-slate-900 dark:text-white mb-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Tags & Categories</h4>
                                    <div className="flex flex-wrap gap-2 pointer-events-none">
                                        {['Sales', 'Support', 'Billing', 'Urgent', 'VIP'].map(tag => (
                                            <span key={tag} className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-bold border border-indigo-100 dark:border-indigo-900/30">{tag}</span>
                                        ))}
                                        <button className="px-3 py-1 border border-dashed border-slate-300 dark:border-slate-600 text-slate-400 rounded-full text-xs font-bold">+ Add</button>
                                    </div>
                                </div>
                                <div 
                                    onClick={() => setChatSettingsView('queues')}
                                    className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all cursor-pointer group"
                                >
                                    <h4 className="font-bold text-slate-900 dark:text-white mb-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Chat Work Queues</h4>
                                    <div className="space-y-3 pointer-events-none">
                                        <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                                            <div>
                                                <p className="text-sm font-bold">General Support</p>
                                                <p className="text-xs text-slate-500">Limit: 5 chats/agent</p>
                                            </div>
                                            <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded">Active</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                                            <div>
                                                <p className="text-sm font-bold">Sales Inquiries</p>
                                                <p className="text-xs text-slate-500">Limit: 3 chats/agent</p>
                                            </div>
                                            <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded">Active</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {settingsSubTab === 'tickets' && (
                        /* ... (Ticket Content unchanged) ... */
                        <div className="space-y-6 animate-in fade-in duration-300">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Ticket Settings</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                                    <h4 className="font-bold text-slate-900 dark:text-white mb-4">SLA Parameters</h4>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-xs font-bold text-slate-500 uppercase">First Response Time</label>
                                            <div className="flex items-center gap-2 mt-1">
                                                <input type="number" defaultValue="30" className="w-16 p-2 bg-slate-50 dark:bg-slate-900 border rounded-lg text-sm outline-none" />
                                                <span className="text-sm text-slate-600 dark:text-slate-400">minutes</span>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-slate-500 uppercase">Resolution Time</label>
                                            <div className="flex items-center gap-2 mt-1">
                                                <input type="number" defaultValue="24" className="w-16 p-2 bg-slate-50 dark:bg-slate-900 border rounded-lg text-sm outline-none" />
                                                <span className="text-sm text-slate-600 dark:text-slate-400">hours</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div 
                                    onClick={() => setTicketSettingsView('categories')}
                                    className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all cursor-pointer group"
                                >
                                    <h4 className="font-bold text-slate-900 dark:text-white mb-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Category Directories</h4>
                                    <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300 pointer-events-none">
                                        <li className="p-2 bg-slate-50 dark:bg-slate-900/50 rounded flex justify-between">Technical Issue <SettingsIcon size={14} className="text-slate-400"/></li>
                                        <li className="p-2 bg-slate-50 dark:bg-slate-900/50 rounded flex justify-between">Billing Inquiry <SettingsIcon size={14} className="text-slate-400"/></li>
                                        <li className="p-2 bg-slate-50 dark:bg-slate-900/50 rounded flex justify-between">Feature Request <SettingsIcon size={14} className="text-slate-400"/></li>
                                    </ul>
                                </div>
                                <div 
                                    onClick={() => setTicketSettingsView('statuses')}
                                    className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all cursor-pointer group"
                                >
                                    <h4 className="font-bold text-slate-900 dark:text-white mb-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Statuses</h4>
                                    <div className="flex flex-wrap gap-2 pointer-events-none">
                                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">Open</span>
                                        <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold">Pending</span>
                                        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">Resolved</span>
                                        <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-bold">Closed</span>
                                        <button className="px-3 py-1 border border-dashed border-slate-300 text-slate-400 rounded-full text-xs font-bold">+ Add</button>
                                    </div>
                                </div>
                                <div 
                                    onClick={() => setTicketSettingsView('auto-assignment')}
                                    className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all cursor-pointer group"
                                >
                                    <h4 className="font-bold text-slate-900 dark:text-white mb-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Auto-assignment Rules</h4>
                                    <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300 pointer-events-none">
                                        <div className="p-2 border border-slate-100 dark:border-slate-700 rounded bg-slate-50 dark:bg-slate-900/50">
                                            IF <strong>Category</strong> = "Billing" THEN Assign to <strong>Finance Team</strong>
                                        </div>
                                        <div className="p-2 border border-slate-100 dark:border-slate-700 rounded bg-slate-50 dark:bg-slate-900/50">
                                            IF <strong>Priority</strong> = "Urgent" THEN Assign to <strong>Tier 2 Support</strong>
                                        </div>
                                        <button className="text-xs text-indigo-600 hover:underline mt-2">+ New Rule</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {settingsSubTab === 'analytics' && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Performance Analytics</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Deep dive into operational metrics and efficiency</p>
                                </div>
                                <div className="flex gap-2">
                                    <div className="bg-slate-100 dark:bg-slate-700 p-1 rounded-lg flex">
                                        {['24h', '7d', '30d'].map(range => (
                                            <button 
                                                key={range}
                                                onClick={() => setAnalyticsTimeRange(range as any)}
                                                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${analyticsTimeRange === range ? 'bg-white dark:bg-slate-600 text-indigo-600 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}
                                            >
                                                {range}
                                            </button>
                                        ))}
                                    </div>
                                    <button className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
                                        <Download size={14} /> Export Report
                                    </button>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <button 
                                    onClick={() => setSelectedAnalyticsMetric('calls')}
                                    className={`p-5 rounded-2xl border text-left transition-all ${
                                        selectedAnalyticsMetric === 'calls' 
                                        ? 'bg-indigo-50 border-indigo-200 dark:bg-indigo-900/20 dark:border-indigo-800 ring-1 ring-indigo-500/20' 
                                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-800'
                                    }`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <p className={`text-xs font-bold uppercase tracking-wider ${selectedAnalyticsMetric === 'calls' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500'}`}>Processed Calls</p>
                                        <Phone size={16} className={selectedAnalyticsMetric === 'calls' ? 'text-indigo-500' : 'text-slate-400'} />
                                    </div>
                                    <p className="text-2xl font-bold text-slate-900 dark:text-white">1,248</p>
                                    <div className="flex items-center gap-1 mt-1 text-xs font-bold text-emerald-500">
                                        <TrendingUp size={12} /> +12.5%
                                    </div>
                                </button>
                                
                                <button 
                                    onClick={() => setSelectedAnalyticsMetric('queue')}
                                    className={`p-5 rounded-2xl border text-left transition-all ${
                                        selectedAnalyticsMetric === 'queue' 
                                        ? 'bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800 ring-1 ring-amber-500/20' 
                                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-amber-200 dark:hover:border-amber-800'
                                    }`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <p className={`text-xs font-bold uppercase tracking-wider ${selectedAnalyticsMetric === 'queue' ? 'text-amber-600 dark:text-amber-400' : 'text-slate-500'}`}>Avg Queue Size</p>
                                        <Users size={16} className={selectedAnalyticsMetric === 'queue' ? 'text-amber-500' : 'text-slate-400'} />
                                    </div>
                                    <p className="text-2xl font-bold text-slate-900 dark:text-white">4.2</p>
                                    <div className="flex items-center gap-1 mt-1 text-xs font-bold text-red-500">
                                        <TrendingUp size={12} /> +2.1%
                                    </div>
                                </button>

                                <button 
                                    onClick={() => setSelectedAnalyticsMetric('callback')}
                                    className={`p-5 rounded-2xl border text-left transition-all ${
                                        selectedAnalyticsMetric === 'callback' 
                                        ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800 ring-1 ring-blue-500/20' 
                                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-800'
                                    }`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <p className={`text-xs font-bold uppercase tracking-wider ${selectedAnalyticsMetric === 'callback' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500'}`}>Avg Callback</p>
                                        <Clock size={16} className={selectedAnalyticsMetric === 'callback' ? 'text-blue-500' : 'text-slate-400'} />
                                    </div>
                                    <p className="text-2xl font-bold text-slate-900 dark:text-white">4m 12s</p>
                                    <div className="flex items-center gap-1 mt-1 text-xs font-bold text-emerald-500">
                                        <TrendingDown size={12} /> -0.5%
                                    </div>
                                </button>

                                <button 
                                    onClick={() => setSelectedAnalyticsMetric('aht')}
                                    className={`p-5 rounded-2xl border text-left transition-all ${
                                        selectedAnalyticsMetric === 'aht' 
                                        ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800 ring-1 ring-emerald-500/20' 
                                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-emerald-200 dark:hover:border-emerald-800'
                                    }`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <p className={`text-xs font-bold uppercase tracking-wider ${selectedAnalyticsMetric === 'aht' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500'}`}>AHT</p>
                                        <Zap size={16} className={selectedAnalyticsMetric === 'aht' ? 'text-emerald-500' : 'text-slate-400'} />
                                    </div>
                                    <p className="text-2xl font-bold text-slate-900 dark:text-white">3m 45s</p>
                                    <div className="flex items-center gap-1 mt-1 text-xs font-bold text-emerald-500">
                                        <TrendingDown size={12} /> -12s
                                    </div>
                                </button>
                            </div>

                            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 flex flex-col h-[400px]">
                                <div className="flex justify-between items-center mb-6">
                                    <h4 className="font-bold text-lg text-slate-900 dark:text-white">
                                        {selectedAnalyticsMetric === 'calls' ? 'Call Volume Trend' : 
                                         selectedAnalyticsMetric === 'queue' ? 'Queue Load Analysis' :
                                         selectedAnalyticsMetric === 'callback' ? 'Response Time Metrics' : 'Average Handle Time'}
                                    </h4>
                                    <div className="flex items-center gap-2">
                                        <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                                            <div className="w-2 h-2 rounded-full bg-indigo-500"></div> Current
                                        </span>
                                        <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                                            <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600"></div> Previous
                                        </span>
                                    </div>
                                </div>
                                <div className="flex-1 w-full min-h-0">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={analyticsData[selectedAnalyticsMetric]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                            <defs>
                                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor={
                                                        selectedAnalyticsMetric === 'calls' ? '#6366f1' : 
                                                        selectedAnalyticsMetric === 'queue' ? '#f59e0b' :
                                                        selectedAnalyticsMetric === 'callback' ? '#3b82f6' : '#10b981'
                                                    } stopOpacity={0.3}/>
                                                    <stop offset="95%" stopColor={
                                                        selectedAnalyticsMetric === 'calls' ? '#6366f1' : 
                                                        selectedAnalyticsMetric === 'queue' ? '#f59e0b' :
                                                        selectedAnalyticsMetric === 'callback' ? '#3b82f6' : '#10b981'
                                                    } stopOpacity={0}/>
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                                            <XAxis 
                                                dataKey="name" 
                                                axisLine={false} 
                                                tickLine={false} 
                                                tick={{ fill: '#94a3b8', fontSize: 12 }} 
                                                dy={10}
                                            />
                                            <YAxis 
                                                axisLine={false} 
                                                tickLine={false} 
                                                tick={{ fill: '#94a3b8', fontSize: 12 }} 
                                            />
                                            <Tooltip 
                                                contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                                itemStyle={{ color: '#1e293b' }}
                                            />
                                            <Area 
                                                type="monotone" 
                                                dataKey="value" 
                                                stroke={
                                                    selectedAnalyticsMetric === 'calls' ? '#6366f1' : 
                                                    selectedAnalyticsMetric === 'queue' ? '#f59e0b' :
                                                    selectedAnalyticsMetric === 'callback' ? '#3b82f6' : '#10b981'
                                                } 
                                                strokeWidth={3} 
                                                fillOpacity={1} 
                                                fill="url(#colorValue)" 
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
                                    <h4 className="font-bold text-slate-900 dark:text-white mb-4 text-sm uppercase tracking-wide">Queue Breakdown</h4>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Sales Support</span>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="w-24 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                                    <div className="h-full bg-indigo-500 w-[45%]"></div>
                                                </div>
                                                <span className="text-sm font-bold text-slate-900 dark:text-white w-8 text-right">45%</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Technical Help</span>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="w-24 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                                    <div className="h-full bg-emerald-500 w-[30%]"></div>
                                                </div>
                                                <span className="text-sm font-bold text-slate-900 dark:text-white w-8 text-right">30%</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Billing Inquiry</span>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="w-24 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                                    <div className="h-full bg-amber-500 w-[25%]"></div>
                                                </div>
                                                <span className="text-sm font-bold text-slate-900 dark:text-white w-8 text-right">25%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
                                     <h4 className="font-bold text-slate-900 dark:text-white mb-4 text-sm uppercase tracking-wide">Agent Efficiency</h4>
                                     <div className="space-y-3">
                                        {agents.slice(0, 3).map((agent, i) => (
                                            <div key={agent.id} className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <img src={agent.avatar} className="w-8 h-8 rounded-full" alt={agent.name} />
                                                    <div>
                                                        <p className="text-sm font-bold text-slate-900 dark:text-white">{agent.name}</p>
                                                        <p className="text-xs text-slate-500">{agent.department}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">98%</p>
                                                    <p className="text-[10px] text-slate-400 uppercase">Resolution</p>
                                                </div>
                                            </div>
                                        ))}
                                     </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {settingsSubTab === 'admin' && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Administration</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-indigo-600"><Briefcase size={20} /></div>
                                        <h4 className="font-bold text-slate-900 dark:text-white">Skill Management</h4>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                                            <div>
                                                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Spanish Language</p>
                                                <p className="text-xs text-slate-500">12 Agents Assigned</p>
                                            </div>
                                            <span className="text-xs font-bold bg-indigo-100 text-indigo-700 px-2 py-1 rounded">Lvl 1-10</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                                            <div>
                                                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Technical Support</p>
                                                <p className="text-xs text-slate-500">8 Agents Assigned</p>
                                            </div>
                                            <span className="text-xs font-bold bg-indigo-100 text-indigo-700 px-2 py-1 rounded">Lvl 5-10</span>
                                        </div>
                                        <button className="w-full py-2 border border-dashed border-slate-300 dark:border-slate-600 text-slate-500 rounded-lg text-xs font-bold hover:text-indigo-600 hover:border-indigo-400">
                                            + Add New Skill
                                        </button>
                                    </div>
                                </div>

                                <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg text-emerald-600"><Calendar size={20} /></div>
                                        <h4 className="font-bold text-slate-900 dark:text-white">Shift Scheduling</h4>
                                    </div>
                                    <div className="h-32 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 text-sm">
                                        Shift Calendar Placeholder
                                    </div>
                                </div>

                                <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 md:col-span-2">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg text-amber-600"><List size={20} /></div>
                                        <h4 className="font-bold text-slate-900 dark:text-white">Queue Configuration</h4>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-700">
                                            <p className="text-sm font-bold">Sales Queue</p>
                                            <p className="text-xs text-slate-500">Priority: High</p>
                                        </div>
                                        <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-700">
                                            <p className="text-sm font-bold">Support Queue</p>
                                            <p className="text-xs text-slate-500">Priority: Medium</p>
                                        </div>
                                        <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-700">
                                            <p className="text-sm font-bold">General</p>
                                            <p className="text-xs text-slate-500">Priority: Low</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
      )}
    </div>
  );
};
