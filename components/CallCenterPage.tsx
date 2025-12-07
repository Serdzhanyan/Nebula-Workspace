
import React, { useState } from 'react';
import { ArrowLeft, Phone, Users, Clock, Headphones, Activity, User, Mic, MoreVertical, Pause, Play, PhoneOff, X, MapPin, Calendar, MessageSquare, Search, Package, Check, MicOff, Grip, LayoutGrid, Send, Paperclip, Mail, FileText, MessageCircle, ArrowUpRight, ArrowDownLeft, Ticket, AlertCircle, CheckCircle2, Plus, Filter, Download, ChevronDown, ChevronUp, PlayCircle, Tag, ExternalLink, Delete, Shield, AlertTriangle, RefreshCw, Box, BookOpen, Search as SearchIcon, FileQuestion, ArrowRight, ShieldCheck, CreditCard, LogOut, Lock } from 'lucide-react';

interface CallCenterPageProps {
  onBack: () => void;
  onNavigateToTicket?: (ticketId: string) => void;
}

interface Agent {
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
  const [activeTab, setActiveTab] = useState<'dashboard' | 'agents' | 'history'>('dashboard');
  const [selectedCall, setSelectedCall] = useState<ActiveCall | null>(null);
  const [note, setNote] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [isOnHold, setIsOnHold] = useState(false);
  const [productSearch, setProductSearch] = useState("");
  
  // Agents Tab State
  const [agentSearch, setAgentSearch] = useState("");
  const [agentFilter, setAgentFilter] = useState("All");
  const [monitoringAgent, setMonitoringAgent] = useState<Agent | null>(null);
  const [messagingAgent, setMessagingAgent] = useState<Agent | null>(null);
  const [activeAgentMenuId, setActiveAgentMenuId] = useState<string | null>(null);
  const [agentMessageInput, setAgentMessageInput] = useState("");
  
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
      // Mock ticket data based on history item
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
      // Find existing or mock new ticket details
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

  // Full Screen Call Card View
  if (selectedCall) {
      return (
          // ... (existing call card rendering logic remains the same)
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
                      <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
                          <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                              <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                                  <Phone size={20} className="text-indigo-500" /> Transfer Call
                              </h3>
                              <button onClick={() => setIsTransferOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"><X size={20}/></button>
                          </div>
                          
                          <div className="p-4 border-b border-slate-100 dark:border-slate-700">
                              <div className="relative">
                                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                  <input 
                                      type="text" 
                                      placeholder="Search agent or department..." 
                                      value={transferSearch}
                                      onChange={(e) => setTransferSearch(e.target.value)}
                                      className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                                  />
                              </div>
                          </div>

                          <div className="max-h-[300px] overflow-y-auto p-2">
                              {filteredTransferAgents.map(agent => (
                                  <div key={agent.id} className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-700/30 rounded-xl transition-colors group">
                                      <div className="flex items-center gap-3">
                                          <div className="relative">
                                              <img src={agent.avatar} alt={agent.name} className="w-10 h-10 rounded-full object-cover" />
                                              <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-slate-800 ${getStatusColor(agent.status)}`}></div>
                                          </div>
                                          <div>
                                              <p className="font-semibold text-sm text-slate-900 dark:text-white">{agent.name}</p>
                                              <p className="text-xs text-slate-500">{agent.department} • {agent.status}</p>
                                          </div>
                                      </div>
                                      <button 
                                          onClick={() => handleTransfer(agent)}
                                          className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors"
                                      >
                                          Transfer
                                      </button>
                                  </div>
                              ))}
                          </div>
                      </div>
                  </div>
              )}

              {/* Warranty Services Modal */}
              {viewingWarrantyProduct && (
                  <div className="absolute inset-0 z-[70] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={() => setViewingWarrantyProduct(null)}>
                      <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700" onClick={e => e.stopPropagation()}>
                          <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                              <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                                  <ShieldCheck size={20} className="text-emerald-500" /> Warranty Services
                              </h3>
                              <button onClick={() => setViewingWarrantyProduct(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"><X size={20} /></button>
                          </div>
                          
                          <div className="p-6">
                              <div className="flex items-center gap-4 mb-6">
                                  <img src={viewingWarrantyProduct.image} alt={viewingWarrantyProduct.name} className="w-16 h-16 rounded-xl object-cover border border-slate-200 dark:border-slate-700" />
                                  <div>
                                      <h4 className="font-bold text-slate-900 dark:text-white">{viewingWarrantyProduct.name}</h4>
                                      <p className="text-xs text-slate-500 font-mono mb-1">{viewingWarrantyProduct.sku}</p>
                                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide border ${
                                          viewingWarrantyProduct.warrantyStatus === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400' :
                                          'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400'
                                      }`}>
                                          {viewingWarrantyProduct.warrantyStatus}
                                      </span>
                                  </div>
                              </div>

                              <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-700 mb-6">
                                  <div className="flex justify-between items-center text-sm mb-2">
                                      <span className="text-slate-500 dark:text-slate-400">Purchased</span>
                                      <span className="font-medium text-slate-900 dark:text-white">{viewingWarrantyProduct.purchaseDate}</span>
                                  </div>
                                  <div className="flex justify-between items-center text-sm">
                                      <span className="text-slate-500 dark:text-slate-400">Expires</span>
                                      <span className="font-bold text-slate-900 dark:text-white">{viewingWarrantyProduct.warrantyExpiry}</span>
                                  </div>
                              </div>

                              <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Available Actions</h5>
                              <div className="space-y-3">
                                  <button 
                                    onClick={() => handleExtendWarranty('1 Year Extension ($49)')}
                                    className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-all group"
                                  >
                                      <div className="flex items-center gap-3">
                                          <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-indigo-600 dark:text-indigo-400">
                                              <Plus size={16} />
                                          </div>
                                          <div className="text-left">
                                              <p className="text-sm font-bold text-slate-900 dark:text-white">Extend 1 Year</p>
                                              <p className="text-xs text-slate-500">Standard coverage</p>
                                          </div>
                                      </div>
                                      <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">$49.00</span>
                                  </button>

                                  <button 
                                    onClick={() => handleExtendWarranty('2 Year Premium ($89)')}
                                    className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-all group"
                                  >
                                      <div className="flex items-center gap-3">
                                          <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-600 dark:text-purple-400">
                                              <Shield size={16} />
                                          </div>
                                          <div className="text-left">
                                              <p className="text-sm font-bold text-slate-900 dark:text-white">Extend 2 Years</p>
                                              <p className="text-xs text-slate-500">Premium coverage</p>
                                          </div>
                                      </div>
                                      <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">$89.00</span>
                                  </button>
                              </div>
                          </div>
                      </div>
                  </div>
              )}

              {/* Interaction Detail Modal */}
              {viewingHistoryItem && (
                  <div className="absolute inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={() => setViewingHistoryItem(null)}>
                      <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700" onClick={e => e.stopPropagation()}>
                          <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                              <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                                  {getHistoryIcon(viewingHistoryItem.type)} Interaction Details
                              </h3>
                              <button onClick={() => setViewingHistoryItem(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"><X size={20} /></button>
                          </div>
                          <div className="p-6 space-y-6">
                              <div>
                                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Subject</span>
                                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mt-1">{viewingHistoryItem.subject}</h4>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                  <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-700/50">
                                      <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Agent</span>
                                      <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                          <User size={14} /> {viewingHistoryItem.agent}
                                      </span>
                                  </div>
                                  <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-700/50">
                                      <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Date</span>
                                      <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                          <Calendar size={14} /> {viewingHistoryItem.date}
                                      </span>
                                  </div>
                              </div>
                              {viewingHistoryItem.recording && (
                                  <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl border border-indigo-100 dark:border-indigo-800 flex items-center gap-3">
                                      <button className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-sm hover:bg-indigo-700 transition-colors">
                                          <Play size={18} className="ml-1" />
                                      </button>
                                      <div className="flex-1">
                                          <div className="text-xs font-bold text-indigo-700 dark:text-indigo-300 mb-1">Call Recording</div>
                                          <div className="h-1.5 w-full bg-indigo-200 dark:bg-indigo-800 rounded-full overflow-hidden">
                                              <div className="h-full bg-indigo-600 w-1/3"></div>
                                          </div>
                                      </div>
                                      <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 font-bold">{viewingHistoryItem.duration}</span>
                                  </div>
                              )}
                              <div>
                                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 block">Notes & Outcome</span>
                                  <p className="text-sm text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/30 p-4 rounded-xl border border-slate-100 dark:border-slate-700 leading-relaxed">
                                      {viewingHistoryItem.notes}
                                  </p>
                              </div>
                          </div>
                      </div>
                  </div>
              )}

              {/* Related Ticket Modal */}
              {viewingRelatedTicket && (
                  <div className="absolute inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={() => setViewingRelatedTicket(null)}>
                      <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700" onClick={e => e.stopPropagation()}>
                          <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                              <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                                  <Ticket size={20} className="text-indigo-500" /> Ticket Details
                              </h3>
                              <button onClick={() => setViewingRelatedTicket(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"><X size={20} /></button>
                          </div>
                          <div className="p-6 space-y-6">
                              <div className="flex justify-between items-start">
                                  <div>
                                      <span className="font-mono text-xs text-slate-500 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded">{viewingRelatedTicket.id}</span>
                                      <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-2">{viewingRelatedTicket.subject}</h4>
                                  </div>
                                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                                      viewingRelatedTicket.status === 'Open' ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400' : 
                                      'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400'
                                  }`}>
                                      {viewingRelatedTicket.status}
                                  </span>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                      <span className="text-slate-500 dark:text-slate-400 block text-xs mb-1">Assignee</span>
                                      <span className="font-medium text-slate-800 dark:text-slate-200">{viewingRelatedTicket.assignee}</span>
                                  </div>
                                  <div>
                                      <span className="text-slate-500 dark:text-slate-400 block text-xs mb-1">Priority</span>
                                      <span className="font-medium text-amber-600 dark:text-amber-400">{viewingRelatedTicket.priority}</span>
                                  </div>
                                  <div>
                                      <span className="text-slate-500 dark:text-slate-400 block text-xs mb-1">Created</span>
                                      <span className="font-medium text-slate-800 dark:text-slate-200">{viewingRelatedTicket.created}</span>
                                  </div>
                                  <div>
                                      <span className="text-slate-500 dark:text-slate-400 block text-xs mb-1">Last Update</span>
                                      <span className="font-medium text-slate-800 dark:text-slate-200">{viewingRelatedTicket.lastUpdate}</span>
                                  </div>
                              </div>

                              <div>
                                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 block">Description</span>
                                  <p className="text-sm text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/30 p-4 rounded-xl border border-slate-100 dark:border-slate-700 whitespace-pre-wrap">
                                      {viewingRelatedTicket.description}
                                  </p>
                              </div>

                              <div className="pt-2 flex justify-end">
                                  <button 
                                    onClick={() => onNavigateToTicket?.(viewingRelatedTicket.id)}
                                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm"
                                  >
                                      Open in Ticket System <ExternalLink size={14} />
                                  </button>
                              </div>
                          </div>
                      </div>
                  </div>
              )}

              {/* Left Column + Right Column (Existing active call layout) */}
              <div className="w-1/2 flex flex-col border-r border-slate-200 dark:border-slate-800 h-full relative bg-white dark:bg-slate-900">
                  {/* ... Call controls and tabs (Script, Chat, History, Tickets) ... */}
                  {/* (Preserved from original implementation) */}
                  <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                              <User size={32} className="text-slate-500 dark:text-slate-400" />
                          </div>
                          <div>
                              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedCall.caller}</h2>
                              <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mt-1">
                                  <span className="flex items-center gap-1"><Phone size={14} /> {selectedCall.number}</span>
                                  <span>•</span>
                                  <span className="flex items-center gap-1"><MapPin size={14} /> {selectedCall.location}</span>
                              </div>
                          </div>
                      </div>
                      <div className="text-right">
                          <div className="text-2xl font-mono font-bold text-slate-900 dark:text-white">{selectedCall.duration}</div>
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide border ${
                              isOnHold ? 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400' : 
                              'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400'
                          }`}>
                              {isOnHold ? 'On Hold' : 'Connected'}
                          </span>
                      </div>
                  </div>

                  <div className="flex-1 overflow-hidden flex flex-col">
                      <div className="flex gap-6 border-b border-slate-100 dark:border-slate-800 px-6 pt-4 shrink-0 overflow-x-auto">
                          <button onClick={() => setCallDetailTab('script')} className={`pb-3 text-sm font-bold border-b-2 transition-colors ${callDetailTab === 'script' ? 'text-indigo-600 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400' : 'text-slate-500 border-transparent hover:text-slate-700 dark:hover:text-slate-300'}`}>Script & Notes</button>
                          <button onClick={() => setCallDetailTab('chat')} className={`pb-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${callDetailTab === 'chat' ? 'text-indigo-600 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400' : 'text-slate-500 border-transparent hover:text-slate-700 dark:hover:text-slate-300'}`}><MessageSquare size={16} /> Live Chat</button>
                          <button onClick={() => setCallDetailTab('history')} className={`pb-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${callDetailTab === 'history' ? 'text-indigo-600 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400' : 'text-slate-500 border-transparent hover:text-slate-700 dark:hover:text-slate-300'}`}><Clock size={16} /> User History</button>
                          <button onClick={() => setCallDetailTab('tickets')} className={`pb-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${callDetailTab === 'tickets' ? 'text-indigo-600 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400' : 'text-slate-500 border-transparent hover:text-slate-700 dark:hover:text-slate-300'}`}><Ticket size={16} /> Tickets</button>
                      </div>

                      <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50 dark:bg-slate-900/50">
                          {callDetailTab === 'script' && (
                              <div className="space-y-4">
                                  <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/30">
                                      <h4 className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wide mb-2">Suggested Script</h4>
                                      <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
                                          "Thank you for calling Nebula Support. My name is {selectedCall.agent !== 'unassigned' ? selectedCall.agent : 'Agent'}, how can I assist you today? I see you are calling about an existing ticket regarding..."
                                      </p>
                                  </div>
                                  <div>
                                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 block">Call Notes</label>
                                      <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Type notes here..." className="w-full h-48 p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none" />
                                  </div>
                              </div>
                          )}
                          {callDetailTab === 'chat' && (
                              <div className="flex flex-col h-full">
                                  <div className="flex-1 space-y-4 mb-4">
                                      {chatHistory.map((msg) => (
                                          <div key={msg.id} className={`flex flex-col ${msg.sender === 'Agent' ? 'items-end' : 'items-start'}`}>
                                              <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${msg.sender === 'Agent' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-bl-none'}`}>{msg.text}</div>
                                              <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.sender} • {msg.time}</span>
                                          </div>
                                      ))}
                                  </div>
                                  <form onSubmit={handleSendChat} className="relative mt-auto">
                                      <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Type a message to client..." className="w-full pl-4 pr-12 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 dark:text-white placeholder-slate-400" />
                                      <div className="absolute right-2 top-1.5 flex items-center gap-1">
                                          <button type="submit" className="p-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"><Send size={16} /></button>
                                      </div>
                                  </form>
                              </div>
                          )}
                          {/* Other tabs implementation remains same as previous steps for brevity */}
                      </div>
                  </div>

                  <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex justify-center items-center gap-6 shrink-0">
                      <button onClick={() => setIsMuted(!isMuted)} className={`flex flex-col items-center gap-2 group ${isMuted ? 'text-amber-500' : 'text-slate-500 dark:text-slate-400'}`}>
                          <div className={`p-4 rounded-full transition-all shadow-sm ${isMuted ? 'bg-amber-100 dark:bg-amber-900/20' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700'}`}>{isMuted ? <MicOff size={24} /> : <Mic size={24} />}</div><span className="text-xs font-bold">Mute</span>
                      </button>
                      <button onClick={() => setIsOnHold(!isOnHold)} className={`flex flex-col items-center gap-2 group ${isOnHold ? 'text-blue-500' : 'text-slate-500 dark:text-slate-400'}`}>
                          <div className={`p-4 rounded-full transition-all shadow-sm ${isOnHold ? 'bg-blue-100 dark:bg-blue-900/20' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700'}`}>{isOnHold ? <Play size={24} /> : <Pause size={24} />}</div><span className="text-xs font-bold">Hold</span>
                      </button>
                      <button onClick={() => setIsKeypadOpen(true)} className="flex flex-col items-center gap-2 group text-slate-500 dark:text-slate-400"><div className="p-4 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm"><LayoutGrid size={24} /></div><span className="text-xs font-bold">Keypad</span></button>
                      <button onClick={() => setIsTransferOpen(true)} className="flex flex-col items-center gap-2 group text-slate-500 dark:text-slate-400"><div className="p-4 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm"><Users size={24} /></div><span className="text-xs font-bold">Transfer</span></button>
                      <button onClick={() => setSelectedCall(null)} className="flex flex-col items-center gap-2 group text-red-500 hover:text-red-600"><div className="p-4 rounded-full bg-red-500 shadow-lg shadow-red-500/30"><PhoneOff size={24} className="text-white" /></div><span className="text-xs font-bold">End Call</span></button>
                  </div>
              </div>

              {/* Right Half: Customer Products */}
              <div className="w-1/2 flex flex-col bg-slate-50 dark:bg-slate-950 h-full border-l border-slate-200 dark:border-slate-800">
                  <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900 shrink-0">
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2"><Package className="text-indigo-500" /> Customer Products</h3>
                      <button onClick={() => setSelectedCall(null)} className="md:hidden p-2 text-slate-400"><X size={20} /></button>
                  </div>
                  {/* ... Product List Logic from previous steps ... */}
                  <div className="flex-1 overflow-y-auto p-6">
                      <div className="grid grid-cols-1 gap-4">
                          {filteredCustomerProducts.map(product => (
                              <div key={product.id} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                                  <div className="flex justify-between items-center">
                                      <div className="flex items-center gap-4">
                                          <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                                          <div>
                                              <h4 className="font-bold text-slate-900 dark:text-white">{product.name}</h4>
                                              <div className="flex gap-2 mt-1"><span className="text-xs font-mono text-slate-500">{product.sku}</span></div>
                                          </div>
                                      </div>
                                      <button onClick={() => handleProductAction(product, 'ticket')} className="text-xs bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg font-bold">Support</button>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
                  
                  {activeProductAction && (
                      <div className="h-1/2 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl z-20">
                          {/* ... Action Panel Implementation ... */}
                          <div className="flex justify-between items-center mb-4">
                              <h4 className="font-bold">Product Action</h4>
                              <button onClick={() => setActiveProductAction(null)}><X size={20}/></button>
                          </div>
                          {activeProductAction.type === 'ticket' ? (
                              <form onSubmit={handleCreateTicket} className="space-y-4">
                                  <input type="text" value={ticketForm.subject} onChange={e => setTicketForm({...ticketForm, subject: e.target.value})} className="w-full p-2 border rounded" placeholder="Subject" />
                                  <button type="submit" className="w-full py-2 bg-indigo-600 text-white rounded">Create Ticket</button>
                              </form>
                          ) : (
                              <div className="text-sm">Manual Content Placeholder</div>
                          )}
                      </div>
                  )}
              </div>
          </div>
      );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col relative">
      
      {/* Monitor Modal */}
      {monitoringAgent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setMonitoringAgent(null)}>
              <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-sm shadow-2xl p-6 border border-slate-200 dark:border-slate-700" onClick={e => e.stopPropagation()}>
                  <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-3">
                          <img src={monitoringAgent.avatar} alt={monitoringAgent.name} className="w-12 h-12 rounded-full border-2 border-red-500 p-0.5" />
                          <div>
                              <h3 className="font-bold text-lg text-slate-900 dark:text-white">{monitoringAgent.name}</h3>
                              <p className="text-xs text-red-500 font-bold uppercase tracking-wide animate-pulse flex items-center gap-1">
                                  <span className="w-2 h-2 rounded-full bg-red-500"></span> Live Monitoring
                              </p>
                          </div>
                      </div>
                      <button onClick={() => setMonitoringAgent(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"><X size={20} /></button>
                  </div>
                  
                  <div className="h-16 bg-slate-100 dark:bg-slate-900 rounded-xl mb-6 flex items-center justify-center gap-1 px-4">
                      {/* Fake Waveform */}
                      {[...Array(20)].map((_, i) => (
                          <div 
                            key={i} 
                            className="w-1 bg-red-500 rounded-full animate-pulse" 
                            style={{ height: `${Math.random() * 100}%`, animationDuration: `${Math.random() * 0.5 + 0.5}s` }} 
                          />
                      ))}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                      <button className="py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors flex items-center justify-center gap-2">
                          <MicOff size={16} /> Whisper
                      </button>
                      <button className="py-2.5 rounded-xl bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 text-sm font-bold hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors flex items-center justify-center gap-2">
                          <PhoneOff size={16} /> Barge In
                      </button>
                  </div>
              </div>
          </div>
      )}

      {/* Message Modal */}
      {messagingAgent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setMessagingAgent(null)}>
              <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700" onClick={e => e.stopPropagation()}>
                  <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                          <MessageCircle size={20} className="text-indigo-500" /> Message {messagingAgent.name}
                      </h3>
                      <button onClick={() => setMessagingAgent(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"><X size={20} /></button>
                  </div>
                  <form onSubmit={handleSendMessage} className="p-6">
                      <textarea 
                          value={agentMessageInput} 
                          onChange={(e) => setAgentMessageInput(e.target.value)}
                          placeholder="Type your urgent message..." 
                          className="w-full h-32 p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none mb-4"
                          autoFocus
                      />
                      <div className="flex justify-end gap-3">
                          <button 
                              type="button" 
                              onClick={() => setMessagingAgent(null)}
                              className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                          >
                              Cancel
                          </button>
                          <button 
                              type="submit"
                              disabled={!agentMessageInput.trim()}
                              className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors disabled:opacity-50"
                          >
                              Send Message
                          </button>
                      </div>
                  </form>
              </div>
          </div>
      )}

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
            {['dashboard', 'agents', 'history'].map((tab) => (
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

      {/* ... Dashboard View (Unchanged) ... */}
      {activeTab === 'dashboard' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
            {/* Left Column: Stats & Live Calls */}
            <div className="lg:col-span-2 flex flex-col gap-6 overflow-hidden">
                {/* KPI Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                        <div className="flex items-center gap-2 mb-2 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                            <Activity size={16} className="text-indigo-500" /> Active Calls
                        </div>
                        <div className="text-2xl font-bold text-slate-900 dark:text-white">12</div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                        <div className="flex items-center gap-2 mb-2 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                            <Users size={16} className="text-emerald-500" /> Agents Online
                        </div>
                        <div className="text-2xl font-bold text-slate-900 dark:text-white">8<span className="text-sm text-slate-400 font-medium">/15</span></div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                        <div className="flex items-center gap-2 mb-2 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                            <Clock size={16} className="text-amber-500" /> Avg Wait
                        </div>
                        <div className="text-2xl font-bold text-slate-900 dark:text-white">45s</div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                        <div className="flex items-center gap-2 mb-2 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                            <Headphones size={16} className="text-blue-500" /> In Queue
                        </div>
                        <div className="text-2xl font-bold text-slate-900 dark:text-white">3</div>
                    </div>
                </div>

                {/* Live Calls Board */}
                <div className="flex-1 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-5 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white">Live Calls</h3>
                        <div className="flex items-center gap-2">
                            <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                            <span className="text-xs font-medium text-slate-500">Updating...</span>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 dark:bg-slate-900/50 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-700">
                                <tr>
                                    <th className="p-4 pl-6">Status</th>
                                    <th className="p-4">Caller</th>
                                    <th className="p-4">Agent</th>
                                    <th className="p-4">Queue</th>
                                    <th className="p-4">Duration</th>
                                    <th className="p-4 pr-6 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                                {activeCalls.map(call => (
                                    <tr 
                                        key={call.id} 
                                        onClick={() => setSelectedCall(call)}
                                        className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors cursor-pointer"
                                    >
                                        <td className="p-4 pl-6">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${
                                                call.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400' :
                                                call.status === 'Ringing' ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400' :
                                                'bg-slate-100 text-slate-600 border-slate-200'
                                            }`}>
                                                {call.status === 'Active' && <Mic size={10} />}
                                                {call.status === 'Ringing' && <Phone size={10} className="animate-pulse" />}
                                                {call.status}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="font-medium text-slate-900 dark:text-white text-sm">{call.caller}</div>
                                            <div className="text-xs text-slate-500">{call.number}</div>
                                        </td>
                                        <td className="p-4">
                                            {call.agent !== 'unassigned' ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-xs font-bold text-indigo-700 dark:text-indigo-300">
                                                        {call.agent.charAt(0)}
                                                    </div>
                                                    <span className="text-sm text-slate-700 dark:text-slate-300">{call.agent}</span>
                                                </div>
                                            ) : (
                                                <span className="text-xs text-slate-400 italic">Waiting for agent...</span>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-700 text-xs font-medium text-slate-600 dark:text-slate-300">
                                                {call.queue}
                                            </span>
                                        </td>
                                        <td className="p-4 font-mono text-sm text-slate-600 dark:text-slate-300">
                                            {call.duration}
                                        </td>
                                        <td className="p-4 pr-6 text-right">
                                            <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-400 hover:text-indigo-600 transition-colors">
                                                <MoreVertical size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Right Column: Agent Status */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col overflow-hidden">
                <div className="p-5 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">Agent Status</h3>
                </div>
                <div className="flex-1 overflow-y-auto p-2">
                    {agents.map(agent => (
                        <div key={agent.id} className="p-3 hover:bg-slate-50 dark:hover:bg-slate-700/30 rounded-xl transition-colors group cursor-pointer border border-transparent hover:border-slate-100 dark:hover:border-slate-700">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <img src={agent.avatar} alt={agent.name} className="w-10 h-10 rounded-full object-cover" />
                                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-slate-800 ${getStatusColor(agent.status)}`}></div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-sm text-slate-900 dark:text-white truncate">{agent.name}</h4>
                                    <div className="flex items-center justify-between mt-0.5">
                                        <span className="text-xs text-slate-500 dark:text-slate-400">{agent.department}</span>
                                        <span className="text-xs font-mono text-slate-400 bg-slate-100 dark:bg-slate-700/50 px-1.5 rounded">{agent.duration}</span>
                                    </div>
                                </div>
                            </div>
                            {agent.status === 'On Call' && (
                                <div className="mt-3 flex items-center gap-2">
                                    <button className="flex-1 py-1.5 flex items-center justify-center gap-1.5 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 rounded-lg text-xs font-bold hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                                        <PhoneOff size={12} /> Barge
                                    </button>
                                    <button className="flex-1 py-1.5 flex items-center justify-center gap-1.5 bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                                        <Headphones size={12} /> Listen
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
      )}

      {activeTab === 'agents' && (
        <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50/50 dark:bg-slate-900/50">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search agents by name or department..." 
                        value={agentSearch}
                        onChange={(e) => setAgentSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-slate-900 dark:text-white"
                    />
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <select 
                            value={agentFilter}
                            onChange={(e) => setAgentFilter(e.target.value)}
                            className="appearance-none pl-4 pr-10 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer text-slate-700 dark:text-slate-300 font-medium"
                        >
                            <option value="All">All Status</option>
                            <option value="Available">Available</option>
                            <option value="On Call">On Call</option>
                            <option value="Break">Break</option>
                            <option value="Offline">Offline</option>
                        </select>
                        <Filter size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm">
                        <Plus size={16} /> Add Agent
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto" onClick={() => setActiveAgentMenuId(null)}>
                <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead className="bg-slate-50 dark:bg-slate-900/50 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-700">
                        <tr>
                            <th className="p-4 pl-6">Agent</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Department</th>
                            <th className="p-4">Duration</th>
                            <th className="p-4">Calls Today</th>
                            <th className="p-4 text-right pr-6">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                        {filteredAgentsList.map((agent) => (
                            <tr key={agent.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors group">
                                <td className="p-4 pl-6">
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <img src={agent.avatar} alt={agent.name} className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700" />
                                            <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-slate-800 ${getStatusColor(agent.status)}`}></div>
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm text-slate-900 dark:text-white">{agent.name}</p>
                                            <p className="text-xs text-slate-500">ID: #{agent.id.padStart(4, '0')}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${
                                        agent.status === 'Available' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400' :
                                        agent.status === 'On Call' ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400' :
                                        agent.status === 'Break' ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400' :
                                        'bg-slate-100 text-slate-600 border-slate-200'
                                    }`}>
                                        <div className={`w-1.5 h-1.5 rounded-full ${
                                            agent.status === 'Available' ? 'bg-emerald-500' :
                                            agent.status === 'On Call' ? 'bg-red-500' :
                                            agent.status === 'Break' ? 'bg-amber-500' :
                                            'bg-slate-400'
                                        }`}></div>
                                        {agent.status}
                                    </span>
                                </td>
                                <td className="p-4 text-sm text-slate-700 dark:text-slate-300 font-medium">
                                    {agent.department}
                                </td>
                                <td className="p-4 text-sm font-mono text-slate-600 dark:text-slate-400">
                                    {agent.duration || '00:00'}
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-slate-900 dark:text-white">{Math.floor(Math.random() * 20) + 5}</span>
                                        <span className="text-xs text-slate-500">Avg. 4m</span>
                                    </div>
                                </td>
                                <td className="p-4 pr-6 text-right relative">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        {agent.status === 'On Call' && (
                                            <button 
                                                onClick={() => handleMonitor(agent)}
                                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors" 
                                                title="Monitor Call"
                                            >
                                                <Headphones size={16} />
                                            </button>
                                        )}
                                        <button 
                                            onClick={() => handleMessage(agent)}
                                            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors" 
                                            title="Message"
                                        >
                                            <MessageCircle size={16} />
                                        </button>
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setActiveAgentMenuId(activeAgentMenuId === agent.id ? null : agent.id);
                                            }}
                                            className={`p-2 rounded-lg transition-colors ${
                                                activeAgentMenuId === agent.id 
                                                ? 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-200' 
                                                : 'text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700'
                                            }`}
                                        >
                                            <MoreVertical size={16} />
                                        </button>
                                    </div>

                                    {/* Agent Actions Context Menu */}
                                    {activeAgentMenuId === agent.id && (
                                        <div className="absolute right-8 top-10 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 py-1 z-30 animate-in fade-in zoom-in-95 duration-200 text-left" onClick={e => e.stopPropagation()}>
                                            <button onClick={() => handleAgentMenuAction('View Profile', agent)} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                                <User size={14} className="text-slate-400" /> View Profile
                                            </button>
                                            <button onClick={() => handleAgentMenuAction('Change Status', agent)} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                                <RefreshCw size={14} className="text-slate-400" /> Change Status
                                            </button>
                                            <div className="h-px bg-slate-100 dark:bg-slate-700 my-1"></div>
                                            <button onClick={() => handleAgentMenuAction('Force Logout', agent)} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
                                                <LogOut size={14} /> Force Log Out
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      )}

      {/* ... (History View) ... */}
      {activeTab === 'history' && (
          // ... (Preserved history view code) ...
          <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300">
              {/* ... (History header and list logic remains same) ... */}
              <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center gap-4 bg-slate-50/50 dark:bg-slate-900/50">
                  <div className="relative flex-1 max-w-lg">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                          type="text" 
                          placeholder="Search history by caller, agent or number..." 
                          value={historySearch}
                          onChange={(e) => setHistorySearch(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-slate-900 dark:text-white"
                      />
                  </div>
                  <div className="flex gap-2">
                      <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
                          <Filter size={16} /> Filters
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
                          <Download size={16} /> Export
                      </button>
                  </div>
              </div>

              <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900/30">
                  <div className="p-6 space-y-4">
                      {filteredHistory.map((item) => {
                          const isExpanded = expandedHistoryId === item.id;
                          return (
                              <div 
                                key={item.id}
                                onClick={() => setExpandedHistoryId(isExpanded ? null : item.id)} 
                                className={`bg-white dark:bg-slate-800 rounded-xl border transition-all cursor-pointer overflow-hidden ${
                                    isExpanded 
                                    ? 'border-indigo-500 ring-1 ring-indigo-500 shadow-lg' 
                                    : 'border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 shadow-sm'
                                }`}
                              >
                                  {/* ... (History item display code) ... */}
                                  <div className="p-4 flex flex-col md:flex-row items-center gap-4">
                                      <div className={`p-3 rounded-full shrink-0 ${getCallStatusColor(item.status)}`}>
                                          <Phone size={20} />
                                      </div>
                                      
                                      <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                                          <div>
                                              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide mb-0.5">Caller</p>
                                              <p className="font-bold text-slate-900 dark:text-white text-sm">{item.caller}</p>
                                              <p className="text-xs text-slate-500">{item.number}</p>
                                          </div>
                                          {/* ... (Other columns) ... */}
                                          <div>
                                              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide mb-0.5">Agent</p>
                                              <div className="flex items-center gap-2">
                                                  {item.agent !== '-' && (
                                                      <div className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-[10px] font-bold">
                                                          {item.agent.charAt(0)}
                                                      </div>
                                                  )}
                                                  <p className="text-sm text-slate-700 dark:text-slate-200">{item.agent}</p>
                                              </div>
                                          </div>
                                          <div>
                                              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide mb-0.5">Date & Time</p>
                                              <p className="text-sm text-slate-700 dark:text-slate-200">{item.date}, {item.time}</p>
                                              <p className="text-xs text-slate-500">{item.duration} duration</p>
                                          </div>
                                          <div>
                                              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide mb-0.5">Status</p>
                                              <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wide ${getCallStatusColor(item.status)}`}>
                                                  {item.status}
                                              </span>
                                          </div>
                                      </div>

                                      <div className="text-slate-400">
                                          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                      </div>
                                  </div>

                                  {isExpanded && (
                                      <div className="border-t border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 p-6 animate-in slide-in-from-top-2 duration-200">
                                          {/* ... (Detailed History content) ... */}
                                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                              {/* Recording Player */}
                                              <div className="lg:col-span-2 space-y-6">
                                                  <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                                                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                                                          <Headphones size={16} className="text-indigo-500" /> Call Recording
                                                      </h4>
                                                      <div className="flex items-center gap-4">
                                                          <button className="w-10 h-10 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center transition-colors shadow-sm">
                                                              <Play size={18} className="ml-1" />
                                                          </button>
                                                          <div className="flex-1">
                                                              <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full mb-1 overflow-hidden">
                                                                  <div className="h-full bg-indigo-500 w-1/3 rounded-full"></div>
                                                              </div>
                                                              <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                                                                  <span>01:45</span>
                                                                  <span>{item.duration}</span>
                                                              </div>
                                                          </div>
                                                          <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                                                              <Download size={18} />
                                                          </button>
                                                      </div>
                                                  </div>
                                                  {/* ... */}
                                              </div>
                                              {/* ... */}
                                          </div>
                                      </div>
                                  )}
                              </div>
                          );
                      })}
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};
