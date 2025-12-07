
import React, { useState } from 'react';
import { Search, Filter, AlertCircle, MessageSquare, CheckCircle2, Clock, MoreHorizontal, User, Tag, Send, X, Inbox, ThumbsUp, ThumbsDown, HelpCircle, ChevronRight, Lock, Globe, ChevronDown } from 'lucide-react';

interface Request {
  id: string;
  ticketId: string;
  subject: string;
  customer: string;
  type: 'Complaint' | 'Appeal' | 'Suggestion' | 'Support';
  priority: 'High' | 'Medium' | 'Low';
  status: 'New' | 'In Progress' | 'Resolved' | 'Closed';
  date: string;
  assignee?: string;
  description: string;
  messages: { sender: string; text: string; time: string; internal?: boolean }[];
}

export const RequestsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [replyText, setReplyText] = useState("");
  const [isInternalNote, setIsInternalNote] = useState(false);

  const [requests, setRequests] = useState<Request[]>([
    {
      id: '1',
      ticketId: 'REQ-1024',
      subject: 'Billing discrepancy in Oct Invoice',
      customer: 'Acme Corp',
      type: 'Complaint',
      priority: 'High',
      status: 'New',
      date: '2 hours ago',
      assignee: 'Unassigned',
      description: 'We noticed an extra charge of $500 on the October invoice that was not in the contract.',
      messages: [
        { sender: 'Sarah Connor (Acme)', text: 'Hi, I found an error in the latest invoice #INV-2024-10. There is a line item for "Data Overage" which we do not use. Please check.', time: '2 hours ago' }
      ]
    },
    {
      id: '2',
      ticketId: 'REQ-1023',
      subject: 'Feature Request: Dark Mode Export',
      customer: 'Stark Ind',
      type: 'Suggestion',
      priority: 'Low',
      status: 'In Progress',
      date: '1 day ago',
      assignee: 'Alex J.',
      description: 'Would be great to export reports with the dark theme styling applied for presentations.',
      messages: [
        { sender: 'Tony Stark', text: 'Love the dark mode. Can we export PDFs that look exactly like the screen?', time: 'Yesterday 10:00 AM' },
        { sender: 'Alex J.', text: 'Thanks for the suggestion! I\'ve added this to our product backlog.', time: 'Yesterday 2:00 PM', internal: true }
      ]
    },
    {
      id: '3',
      ticketId: 'REQ-1022',
      subject: 'Account Suspension Appeal',
      customer: 'Wayne Ent',
      type: 'Appeal',
      priority: 'Medium',
      status: 'In Progress',
      date: '2 days ago',
      assignee: 'Sarah L.',
      description: 'Requesting review of account suspension due to alleged policy violation.',
      messages: [
        { sender: 'Bruce Wayne', text: 'Our account was flagged for high volume API usage. This was a scheduled load test. Please reinstate access.', time: 'Oct 23, 4:00 PM' },
        { sender: 'Sarah L.', text: 'Investigating the traffic spikes now.', time: 'Oct 24, 9:00 AM', internal: true }
      ]
    },
    {
      id: '4',
      ticketId: 'REQ-1021',
      subject: 'Login Issues on Mobile',
      customer: 'Cyberdyne',
      type: 'Support',
      priority: 'High',
      status: 'Resolved',
      date: '3 days ago',
      assignee: 'James D.',
      description: 'App crashes when trying to login via SSO on iOS 17.',
      messages: [
        { sender: 'System Admin', text: 'Users reporting crashes on iOS login screen.', time: 'Oct 22, 11:00 AM' },
        { sender: 'James D.', text: 'Patch deployed. Verified fix with customer.', time: 'Oct 22, 4:00 PM' }
      ]
    }
  ]);

  const filteredRequests = requests.filter(req => {
    const matchesSearch = req.subject.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          req.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          req.ticketId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || req.status === statusFilter;
    const matchesType = typeFilter === 'All' || req.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Complaint': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'Appeal': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
      case 'Suggestion': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      default: return 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900/30';
      case 'In Progress': return 'bg-purple-50 text-purple-600 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-900/30';
      case 'Resolved': return 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-900/30';
      default: return 'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-700 dark:text-slate-400';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'High': return <AlertCircle size={14} className="text-red-500" />;
      case 'Medium': return <Clock size={14} className="text-amber-500" />;
      default: return <CheckCircle2 size={14} className="text-slate-400" />;
    }
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRequest || !replyText.trim()) return;

    const updatedRequest = {
        ...selectedRequest,
        messages: [...selectedRequest.messages, { 
            sender: 'You', 
            text: replyText, 
            time: 'Just now', 
            internal: isInternalNote 
        }]
    };

    setRequests(requests.map(r => r.id === selectedRequest.id ? updatedRequest : r));
    setSelectedRequest(updatedRequest);
    setReplyText("");
  };

  const updateStatus = (newStatus: Request['status']) => {
      if (!selectedRequest) return;
      const updatedRequest = { ...selectedRequest, status: newStatus };
      setRequests(requests.map(r => r.id === selectedRequest.id ? updatedRequest : r));
      setSelectedRequest(updatedRequest);
  };

  const updateAssignee = (newAssignee: string) => {
      if (!selectedRequest) return;
      const updatedRequest = { ...selectedRequest, assignee: newAssignee };
      setRequests(requests.map(r => r.id === selectedRequest.id ? updatedRequest : r));
      setSelectedRequest(updatedRequest);
  };

  const updatePriority = (newPriority: Request['priority']) => {
      if (!selectedRequest) return;
      const updatedRequest = { ...selectedRequest, priority: newPriority };
      setRequests(requests.map(r => r.id === selectedRequest.id ? updatedRequest : r));
      setSelectedRequest(updatedRequest);
  };

  return (
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      
      {/* Detail Drawer */}
      {selectedRequest && (
        <div className="absolute inset-0 z-20 flex justify-end">
            <div className="absolute inset-0 bg-slate-900/20" onClick={() => setSelectedRequest(null)}></div>
            <div className="w-full max-w-2xl bg-white dark:bg-slate-800 shadow-2xl h-full flex flex-col animate-in slide-in-from-right duration-300 border-l border-slate-200 dark:border-slate-700">
                {/* Drawer Header */}
                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-start bg-slate-50/50 dark:bg-slate-900/50">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <span className="text-xs font-mono text-slate-400">{selectedRequest.ticketId}</span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getTypeColor(selectedRequest.type)}`}>
                                {selectedRequest.type}
                            </span>
                        </div>
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-tight">{selectedRequest.subject}</h3>
                    </div>
                    <button onClick={() => setSelectedRequest(null)} className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors text-slate-400">
                        <X size={20} />
                    </button>
                </div>

                {/* Drawer Actions */}
                <div className="px-6 py-3 border-b border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-800">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mr-2">Status:</span>
                        <div className="flex bg-slate-100 dark:bg-slate-700 p-1 rounded-lg">
                            {(['New', 'In Progress', 'Resolved'] as const).map(status => (
                                <button
                                    key={status}
                                    onClick={() => updateStatus(status)}
                                    className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                                        selectedRequest.status === status 
                                        ? 'bg-white dark:bg-slate-600 text-indigo-600 dark:text-white shadow-sm' 
                                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                                    }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Assignee:</span>
                        <div className="relative">
                            <select 
                                value={selectedRequest.assignee}
                                onChange={(e) => updateAssignee(e.target.value)}
                                className="appearance-none pl-3 pr-8 py-1.5 bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                            >
                                <option value="Unassigned">Unassigned</option>
                                <option value="Alex J.">Alex J.</option>
                                <option value="Sarah L.">Sarah L.</option>
                                <option value="James D.">James D.</option>
                                <option value="Mark V.">Mark V.</option>
                            </select>
                            <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Drawer Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50 dark:bg-slate-900/50">
                    {/* Customer Info Card */}
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <User size={16} className="text-slate-400" /> {selectedRequest.customer}
                            </h4>
                            <div className="relative">
                                <select 
                                    value={selectedRequest.priority}
                                    onChange={(e) => updatePriority(e.target.value as any)}
                                    className={`appearance-none pl-2 pr-6 py-0.5 rounded text-xs font-medium cursor-pointer bg-transparent outline-none ${
                                        selectedRequest.priority === 'High' ? 'text-red-600' : 
                                        selectedRequest.priority === 'Medium' ? 'text-amber-500' : 'text-slate-500'
                                    }`}
                                >
                                    <option value="High">High Priority</option>
                                    <option value="Medium">Medium Priority</option>
                                    <option value="Low">Low Priority</option>
                                </select>
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
                                    {getPriorityIcon(selectedRequest.priority)}
                                </div>
                            </div>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-100 dark:border-slate-700/50">
                            {selectedRequest.description}
                        </p>
                    </div>

                    {/* Timeline / Messages */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="h-px bg-slate-200 dark:bg-slate-700 flex-1"></div>
                            <span className="text-xs text-slate-400 font-medium">Activity Log</span>
                            <div className="h-px bg-slate-200 dark:bg-slate-700 flex-1"></div>
                        </div>

                        {selectedRequest.messages.map((msg, i) => (
                            <div key={i} className={`flex flex-col ${msg.internal ? 'items-end' : 'items-start'}`}>
                                <div className={`max-w-[85%] rounded-xl p-4 shadow-sm relative ${
                                    msg.internal 
                                    ? 'bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/30' 
                                    : msg.sender === 'You'
                                    ? 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700'
                                    : 'bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-900/30'
                                }`}>
                                    <div className="flex justify-between items-baseline mb-1 gap-4">
                                        <span className={`text-xs font-bold flex items-center gap-1 ${
                                            msg.internal ? 'text-amber-700 dark:text-amber-400' : 'text-slate-700 dark:text-slate-200'
                                        }`}>
                                            {msg.internal && <Lock size={10} />}
                                            {msg.sender} 
                                            {msg.internal && <span className="uppercase tracking-wide opacity-70 ml-1 font-normal text-[10px]">(Internal Note)</span>}
                                        </span>
                                        <span className="text-[10px] text-slate-400">{msg.time}</span>
                                    </div>
                                    <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap">{msg.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Reply Box */}
                <div className="p-4 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
                    {/* Reply Type Toggle */}
                    <div className="flex gap-2 mb-2">
                        <button 
                            type="button"
                            onClick={() => setIsInternalNote(false)}
                            className={`text-xs font-medium px-3 py-1.5 rounded-t-lg transition-colors flex items-center gap-1.5 ${
                                !isInternalNote 
                                ? 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white' 
                                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                            }`}
                        >
                            <Globe size={12} /> Public Reply
                        </button>
                        <button 
                            type="button"
                            onClick={() => setIsInternalNote(true)}
                            className={`text-xs font-medium px-3 py-1.5 rounded-t-lg transition-colors flex items-center gap-1.5 ${
                                isInternalNote 
                                ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' 
                                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                            }`}
                        >
                            <Lock size={12} /> Internal Note
                        </button>
                    </div>

                    <form onSubmit={handleSendReply}>
                        <div className="relative">
                            <textarea 
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                placeholder={isInternalNote ? "Add a private note for the team..." : "Type your reply to the customer..."}
                                className={`w-full pl-4 pr-12 py-3 border rounded-b-xl rounded-tr-xl text-sm focus:ring-2 outline-none resize-none h-24 transition-all ${
                                    isInternalNote 
                                    ? 'bg-amber-50/50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-900/30 focus:ring-amber-200 dark:focus:ring-amber-900/50 text-slate-800 dark:text-slate-200 placeholder-amber-700/50' 
                                    : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 focus:ring-indigo-500 text-slate-800 dark:text-slate-200'
                                }`}
                            />
                            <div className="absolute bottom-3 right-3 flex gap-2">
                                <button type="button" className="p-1.5 text-slate-400 hover:text-indigo-600 transition-colors" title="Attach File">
                                    <Tag size={16} />
                                </button>
                                <button 
                                    type="submit" 
                                    disabled={!replyText.trim()} 
                                    className={`p-1.5 text-white rounded-lg transition-colors disabled:opacity-50 ${
                                        isInternalNote 
                                        ? 'bg-amber-500 hover:bg-amber-600' 
                                        : 'bg-indigo-600 hover:bg-indigo-700'
                                    }`}
                                >
                                    <Send size={16} />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
      )}

      {/* Main Page Header */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-start md:items-center">
        <div>
           <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Inbox className="text-indigo-500" /> Requests & Appeals
           </h2>
           <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Manage and track customer complaints, suggestions, and support tickets.
           </p>
        </div>
        
        <div className="flex gap-2">
            <div className="flex gap-4 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm">
                <div className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    <span className="text-slate-500 dark:text-slate-400">Open:</span>
                    <span className="font-bold text-slate-900 dark:text-white">5</span>
                </div>
                <div className="w-px bg-slate-200 dark:bg-slate-700"></div>
                <div className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="text-slate-500 dark:text-slate-400">Resolved:</span>
                    <span className="font-bold text-slate-900 dark:text-white">124</span>
                </div>
            </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 mb-6 shadow-sm flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                  type="text" 
                  placeholder="Search by ID, subject, or customer..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-slate-800 dark:text-slate-200"
              />
          </div>
          <div className="flex gap-3">
              <select 
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer text-slate-700 dark:text-slate-300"
              >
                  <option value="All">All Types</option>
                  <option value="Complaint">Complaints</option>
                  <option value="Appeal">Appeals</option>
                  <option value="Suggestion">Suggestions</option>
                  <option value="Support">Support</option>
              </select>
              <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer text-slate-700 dark:text-slate-300"
              >
                  <option value="All">All Status</option>
                  <option value="New">New</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
              </select>
          </div>
      </div>

      {/* Requests Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex-1 flex flex-col overflow-hidden">
          <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[1000px]">
                  <thead>
                      <tr className="bg-slate-50/50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700">
                          <th className="py-4 pl-6 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">ID / Subject</th>
                          <th className="py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Customer</th>
                          <th className="py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Type</th>
                          <th className="py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Status</th>
                          <th className="py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Priority</th>
                          <th className="py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Date</th>
                          <th className="py-4 pr-6 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-right">Action</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                      {filteredRequests.length === 0 ? (
                          <tr>
                              <td colSpan={7} className="py-16 text-center text-slate-400">
                                  <div className="flex flex-col items-center gap-2">
                                      <Inbox size={32} className="opacity-20" />
                                      <p className="text-sm">No requests found</p>
                                  </div>
                              </td>
                          </tr>
                      ) : filteredRequests.map((req) => (
                          <tr key={req.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors group cursor-pointer" onClick={() => setSelectedRequest(req)}>
                              <td className="py-4 pl-6">
                                  <div>
                                      <span className="text-xs font-mono text-slate-400 block mb-0.5">{req.ticketId}</span>
                                      <p className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{req.subject}</p>
                                  </div>
                              </td>
                              <td className="py-4">
                                  <div className="flex items-center gap-2">
                                      <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-500">
                                          {req.customer.substring(0,2).toUpperCase()}
                                      </div>
                                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{req.customer}</span>
                                  </div>
                              </td>
                              <td className="py-4">
                                  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${getTypeColor(req.type)}`}>
                                      {req.type}
                                  </span>
                              </td>
                              <td className="py-4">
                                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(req.status)}`}>
                                      {req.status}
                                  </span>
                              </td>
                              <td className="py-4">
                                  <div className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-300">
                                      {getPriorityIcon(req.priority)}
                                      {req.priority}
                                  </div>
                              </td>
                              <td className="py-4 text-sm text-slate-500 dark:text-slate-400">
                                  {req.date}
                              </td>
                              <td className="py-4 pr-6 text-right">
                                  <button className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center justify-end gap-1 ml-auto">
                                      Process <ChevronRight size={12} />
                                  </button>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      </div>
    </div>
  );
};
