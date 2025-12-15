
import React, { useState } from 'react';
import { Mail, Search, Check, ChevronDown, Paperclip, MoreHorizontal, CornerUpLeft, Trash2, Archive, Star, Inbox, Send, ChevronRight, User } from 'lucide-react';

interface Attachment {
    name: string;
    size: string;
}

interface Message {
    id: string;
    sender: string;
    role?: string; // e.g., "Client" or "Support Agent"
    avatar?: string;
    content: string;
    timestamp: string;
    isInternal: boolean;
    attachments?: Attachment[];
}

interface Thread {
    id: string;
    subject: string;
    participants: string[];
    lastMessageDate: string;
    status: 'Unread' | 'Read' | 'Replied';
    messages: Message[];
    priority?: 'High' | 'Normal';
}

interface CompanyCorrespondence {
    id: string;
    name: string;
    threads: Thread[];
}

export const SMERequestsCorrespondence: React.FC = () => {
    // Mock Data
    const companies: CompanyCorrespondence[] = [
        {
            id: '1',
            name: 'TechNova Solutions Ltd.',
            threads: [
                {
                    id: 't1',
                    subject: 'Question about international transfer limits',
                    participants: ['Sarah Jenkins'],
                    lastMessageDate: 'Today, 10:30 AM',
                    status: 'Unread',
                    priority: 'High',
                    messages: [
                        { 
                            id: 'm1', 
                            sender: 'Sarah Jenkins', 
                            role: 'CEO',
                            content: 'Hi Team,\n\nWe are planning a large equipment purchase from Germany next month. Could you clarify the daily limit for SWIFT transfers for our account tier? We might need a temporary increase.\n\nThanks,\nSarah', 
                            timestamp: 'Today, 10:30 AM', 
                            isInternal: false 
                        }
                    ]
                },
                {
                    id: 't2',
                    subject: 'Clarification on Invoice #INV-2024-001',
                    participants: ['John Smith'],
                    lastMessageDate: 'Yesterday, 2:15 PM',
                    status: 'Read',
                    messages: [
                         { 
                             id: 'm2', 
                             sender: 'John Smith', 
                             role: 'CFO',
                             content: 'We received the invoice but the tax calculation seems off for the California branch. Can you please double check?', 
                             timestamp: 'Yesterday, 2:15 PM', 
                             isInternal: false, 
                             attachments: [{name: 'invoice_copy.pdf', size: '1.2 MB'}] 
                         }
                    ]
                }
            ]
        },
        {
            id: '2',
            name: 'GreenLeaf Logistics',
            threads: [
                {
                    id: 't3',
                    subject: 'New User Access Request',
                    participants: ['Michael Chen'],
                    lastMessageDate: 'Oct 22, 2024',
                    status: 'Replied',
                    messages: [
                        {
                            id: 'm3',
                            sender: 'Michael Chen',
                            role: 'Owner',
                            content: 'Please add David Wilson to our banking portal with "Viewer" access.',
                            timestamp: 'Oct 22, 09:00 AM',
                            isInternal: false
                        },
                        {
                            id: 'm4',
                            sender: 'Support Team',
                            role: 'Agent',
                            content: 'Hi Michael, I have sent the invitation to David. He should receive it shortly.',
                            timestamp: 'Oct 22, 09:45 AM',
                            isInternal: true
                        }
                    ]
                }
            ]
        },
        {
            id: '3',
            name: 'Quantum Dynamics',
            threads: []
        }
    ];

    const [selectedCompany, setSelectedCompany] = useState<CompanyCorrespondence>(companies[0]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [expandedThreadId, setExpandedThreadId] = useState<string | null>(null);
    const [replyText, setReplyText] = useState("");

    const filteredCompanies = companies.filter(c => 
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelectCompany = (comp: CompanyCorrespondence) => {
        setSelectedCompany(comp);
        setSearchTerm("");
        setShowDropdown(false);
        setExpandedThreadId(null);
    };

    const toggleThread = (id: string) => {
        if (expandedThreadId === id) {
            setExpandedThreadId(null);
        } else {
            setExpandedThreadId(id);
            // Mark as read logic would go here
        }
    };

    const handleSendReply = (e: React.FormEvent, threadId: string) => {
        e.preventDefault();
        if (!replyText.trim()) return;
        
        // In a real app, this would submit to API
        alert(`Reply sent to thread ${threadId}: ${replyText}`);
        setReplyText("");
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 relative">
             {/* Search Bar */}
            <div className="relative z-20">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search company for correspondence..." 
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setShowDropdown(true);
                        }}
                        onFocus={() => setShowDropdown(true)}
                        className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-slate-900 dark:text-white"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                        <ChevronDown size={16} />
                    </div>
                </div>
                
                {showDropdown && (
                    <>
                        <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)}></div>
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden z-20 max-h-60 overflow-y-auto">
                            {filteredCompanies.length > 0 ? (
                                filteredCompanies.map(comp => (
                                    <button
                                        key={comp.id}
                                        onClick={() => handleSelectCompany(comp)}
                                        className="w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 border-b border-slate-100 dark:border-slate-800 last:border-0 flex justify-between items-center group transition-colors"
                                    >
                                        <p className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{comp.name}</p>
                                        {selectedCompany.id === comp.id && <Check size={16} className="text-indigo-600 dark:text-indigo-400" />}
                                    </button>
                                ))
                            ) : (
                                <div className="p-4 text-center text-slate-500 text-sm">No companies found</div>
                            )}
                        </div>
                    </>
                )}
            </div>

            {/* Content Area */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm min-h-[400px] flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                        <Mail size={20} className="text-indigo-500" /> 
                        Correspondence: {selectedCompany.name}
                    </h3>
                    <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm">
                        <Mail size={16} /> Compose New
                    </button>
                </div>
                
                {selectedCompany.threads.length > 0 ? (
                    <div className="space-y-4">
                         {selectedCompany.threads.map((thread) => {
                             const isExpanded = expandedThreadId === thread.id;
                             
                             return (
                                 <div 
                                    key={thread.id} 
                                    className={`border rounded-xl transition-all duration-300 overflow-hidden ${
                                        isExpanded 
                                        ? 'border-indigo-200 dark:border-indigo-800 bg-white dark:bg-slate-900 shadow-md ring-1 ring-indigo-100 dark:ring-indigo-900/30' 
                                        : 'border-slate-200 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-800 hover:bg-slate-50 dark:hover:bg-slate-800/30 bg-white dark:bg-slate-900'
                                    }`}
                                 >
                                     {/* Thread Header / Summary */}
                                     <div 
                                        onClick={() => toggleThread(thread.id)}
                                        className="p-4 cursor-pointer flex flex-col sm:flex-row gap-4 items-start sm:items-center"
                                     >
                                         <div className="flex items-center gap-3 min-w-0 flex-1">
                                             {/* Avatar / Initial */}
                                             <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                                                 thread.status === 'Unread' 
                                                 ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400' 
                                                 : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                                             }`}>
                                                 {thread.participants[0].charAt(0)}
                                             </div>
                                             
                                             <div className="min-w-0 flex-1">
                                                 <div className="flex items-center gap-2 mb-0.5">
                                                     <p className={`text-sm truncate ${thread.status === 'Unread' ? 'font-bold text-slate-900 dark:text-white' : 'font-medium text-slate-700 dark:text-slate-200'}`}>
                                                         {thread.subject}
                                                     </p>
                                                     {thread.priority === 'High' && (
                                                         <span className="text-[10px] font-bold bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400 px-1.5 py-0.5 rounded">
                                                             High
                                                         </span>
                                                     )}
                                                     {thread.status === 'Unread' && (
                                                         <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                                                     )}
                                                 </div>
                                                 <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                                     {thread.participants.join(', ')} • {thread.messages[thread.messages.length - 1].content.substring(0, 60)}...
                                                 </p>
                                             </div>
                                         </div>
                                         
                                         <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                                             <span className="text-xs text-slate-400 font-medium whitespace-nowrap">{thread.lastMessageDate}</span>
                                             <div className="flex gap-1">
                                                 <button 
                                                    onClick={(e) => { e.stopPropagation(); /* Archive Logic */ }}
                                                    className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                                                    title="Archive"
                                                 >
                                                     <Archive size={16} />
                                                 </button>
                                                 <button 
                                                    className={`p-2 rounded-lg transition-colors ${isExpanded ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                                                 >
                                                     <ChevronRight size={16} className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
                                                 </button>
                                             </div>
                                         </div>
                                     </div>
                                     
                                     {/* Expanded Thread View */}
                                     {isExpanded && (
                                         <div className="border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                                             <div className="p-4 space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar">
                                                 {thread.messages.map((msg) => (
                                                     <div key={msg.id} className={`flex gap-3 ${msg.isInternal ? 'justify-end' : ''}`}>
                                                         {!msg.isInternal && (
                                                             <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-xs font-bold text-indigo-700 dark:text-indigo-300 shrink-0">
                                                                 {msg.sender.charAt(0)}
                                                             </div>
                                                         )}
                                                         
                                                         <div className={`flex flex-col max-w-[85%] ${msg.isInternal ? 'items-end' : 'items-start'}`}>
                                                             <div className="flex items-baseline gap-2 mb-1">
                                                                 <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{msg.sender}</span>
                                                                 <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                                                             </div>
                                                             <div className={`p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap shadow-sm ${
                                                                 msg.isInternal 
                                                                 ? 'bg-indigo-600 text-white rounded-tr-none' 
                                                                 : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-tl-none border border-slate-200 dark:border-slate-700'
                                                             }`}>
                                                                 {msg.content}
                                                             </div>
                                                             
                                                             {msg.attachments && msg.attachments.length > 0 && (
                                                                 <div className="mt-2 flex flex-wrap gap-2">
                                                                     {msg.attachments.map((att, i) => (
                                                                         <div key={i} className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                                                                             <Paperclip size={12} className="text-slate-400" />
                                                                             <span className="text-xs font-medium text-slate-600 dark:text-slate-300">{att.name}</span>
                                                                             <span className="text-[10px] text-slate-400">({att.size})</span>
                                                                         </div>
                                                                     ))}
                                                                 </div>
                                                             )}
                                                         </div>
                                                         
                                                         {msg.isInternal && (
                                                             <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-500 shrink-0">
                                                                 You
                                                             </div>
                                                         )}
                                                     </div>
                                                 ))}
                                             </div>
                                             
                                             {/* Reply Box */}
                                             <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                                                 <form onSubmit={(e) => handleSendReply(e, thread.id)} className="relative">
                                                     <textarea 
                                                         placeholder="Type your reply here..."
                                                         value={replyText}
                                                         onChange={(e) => setReplyText(e.target.value)}
                                                         className="w-full pl-4 pr-12 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none h-24 text-slate-800 dark:text-white"
                                                     />
                                                     <div className="absolute bottom-3 right-3 flex gap-2">
                                                         <button type="button" className="p-1.5 text-slate-400 hover:text-indigo-600 transition-colors" title="Attach File">
                                                             <Paperclip size={18} />
                                                         </button>
                                                         <button 
                                                            type="submit" 
                                                            disabled={!replyText.trim()}
                                                            className="p-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                         >
                                                             <Send size={16} />
                                                         </button>
                                                     </div>
                                                 </form>
                                             </div>
                                         </div>
                                     )}
                                 </div>
                             );
                         })}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                        <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                            <Inbox size={32} className="text-slate-300 dark:text-slate-600" />
                        </div>
                        <h4 className="text-slate-900 dark:text-white font-medium mb-1">No correspondence found</h4>
                        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs mx-auto">
                            There are no messages or threads for {selectedCompany.name}. Start a new conversation above.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};
