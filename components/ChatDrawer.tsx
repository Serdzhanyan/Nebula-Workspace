
import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Search, ArrowLeft, Phone, Video, MoreVertical, Circle, Image, Paperclip, Mic, MicOff, VideoOff, PhoneOff, User, BellOff, Ban, Trash2, MonitorUp, MonitorOff, Camera } from 'lucide-react';
import { ChatMessage, ChatContact } from '../types';

interface ChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock Contacts
const contacts: ChatContact[] = [
  { id: '1', name: 'Sarah Lee', role: 'Product Manager', avatar: 'https://picsum.photos/100/100?random=1', status: 'online', lastMessage: 'Can you review the roadmap?', lastMessageTime: '10:30 AM', unreadCount: 2 },
  { id: '2', name: 'Mark Vos', role: 'System Architect', avatar: 'https://picsum.photos/100/100?random=2', status: 'busy', lastMessage: 'API docs are updated.', lastMessageTime: 'Yesterday', unreadCount: 0 },
  { id: '3', name: 'Alice Chen', role: 'UX Designer', avatar: 'https://picsum.photos/100/100?random=3', status: 'offline', lastMessage: 'Thanks for the feedback!', lastMessageTime: 'Mon', unreadCount: 0 },
  { id: '4', name: 'James D.', role: 'DevOps', avatar: 'https://picsum.photos/100/100?random=4', status: 'online', lastMessage: 'Deployment is scheduled.', lastMessageTime: 'Mon', unreadCount: 0 },
  { id: '5', name: 'Emma Watson', role: 'Marketing', avatar: 'https://picsum.photos/100/100?random=5', status: 'online', lastMessage: 'Let\'s sync later.', lastMessageTime: 'Fri', unreadCount: 0 },
];

// Initial mock messages store
const initialMessages: Record<string, ChatMessage[]> = {
  '1': [
    { id: 'm1', text: "Hey! Have you had a chance to look at the Q3 goals?", senderId: '1', timestamp: new Date(Date.now() - 3600000) },
    { id: 'm2', text: "Can you review the roadmap?", senderId: '1', timestamp: new Date(Date.now() - 1800000) },
  ],
  '2': [
    { id: 'm3', text: "I've pushed the new API docs.", senderId: '2', timestamp: new Date(Date.now() - 86400000) },
    { id: 'm4', text: "Great, checking them now.", senderId: 'me', timestamp: new Date(Date.now() - 86000000) },
    { id: 'm5', text: "API docs are updated.", senderId: '2', timestamp: new Date(Date.now() - 85000000) },
  ]
};

export const ChatDrawer: React.FC<ChatDrawerProps> = ({ isOpen, onClose }) => {
  const [activeContactId, setActiveContactId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Call State
  const [activeCall, setActiveCall] = useState<{ type: 'audio' | 'video', status: 'calling' | 'connected' | 'ended' } | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  
  // Menu State
  const [showOptions, setShowOptions] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const activeContact = contacts.find(c => c.id === activeContactId);
  const currentMessages = activeContactId ? (messages[activeContactId] || []) : [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (activeContactId) {
      scrollToBottom();
      // Focus input when opening a chat
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [activeContactId, messages, isOpen]);

  // Simulate call connection
  useEffect(() => {
    if (activeCall?.status === 'calling') {
        const timer = setTimeout(() => {
            setActiveCall(prev => prev ? { ...prev, status: 'connected' } : null);
        }, 2500);
        return () => clearTimeout(timer);
    }
  }, [activeCall?.status]);

  // Filter contacts
  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || !activeContactId) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text: input,
      senderId: 'me',
      timestamp: new Date()
    };

    // Add user message
    setMessages(prev => ({
      ...prev,
      [activeContactId]: [...(prev[activeContactId] || []), newMessage]
    }));
    
    setInput("");
    
    // Simulate "Typing..." then reply
    setIsTyping(true);
    setTimeout(() => {
        setIsTyping(false);
        const replyMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            text: getSimulatedReply(input),
            senderId: activeContactId,
            timestamp: new Date()
        };
        setMessages(prev => ({
            ...prev,
            [activeContactId]: [...(prev[activeContactId] || []), replyMessage]
        }));
    }, 2000);
  };

  const getSimulatedReply = (text: string) => {
      const responses = [
          "Got it, thanks!",
          "I'll take a look shortly.",
          "Can we discuss this in the next meeting?",
          "Sounds good to me.",
          "Let me check with the team first.",
          "Interesting point.",
          "Could you send me the file?",
          "👍"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
  };

  const getStatusColor = (status: string) => {
      switch(status) {
          case 'online': return 'bg-emerald-500';
          case 'busy': return 'bg-red-500';
          case 'offline': return 'bg-slate-400';
          default: return 'bg-slate-400';
      }
  };

  const startCall = (type: 'audio' | 'video') => {
      setActiveCall({ type, status: 'calling' });
      setIsMuted(false);
      // Initialize video off if it's an audio call, on if it's a video call
      setIsVideoOff(type === 'audio'); 
      setIsScreenSharing(false);
  };

  const endCall = () => {
      setActiveCall(prev => prev ? { ...prev, status: 'ended' } : null);
      setTimeout(() => setActiveCall(null), 500);
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity" 
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white dark:bg-slate-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col border-l border-slate-200 dark:border-slate-800 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* VIEW 1: CONTACT LIST */}
        {!activeContactId && (
            <div className="flex flex-col h-full animate-in slide-in-from-left-4 fade-in duration-300">
                {/* Header */}
                <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-lg text-slate-800 dark:text-white">Messages</h3>
                        <button 
                            onClick={onClose}
                            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>
                    
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input 
                            type="text" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search people..." 
                            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900 focus:border-indigo-300 transition-all text-slate-900 dark:text-white placeholder-slate-400"
                        />
                    </div>
                </div>

                {/* List */}
                <div className="flex-1 overflow-y-auto p-2">
                    {filteredContacts.map(contact => (
                        <div 
                            key={contact.id}
                            onClick={() => setActiveContactId(contact.id)}
                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer group"
                        >
                            <div className="relative">
                                <img src={contact.avatar} alt={contact.name} className="w-12 h-12 rounded-full object-cover border border-slate-200 dark:border-slate-700" />
                                <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-slate-900 ${getStatusColor(contact.status)}`}></div>
                            </div>
                            
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline mb-0.5">
                                    <h4 className="font-semibold text-sm text-slate-900 dark:text-white truncate">{contact.name}</h4>
                                    <span className="text-[10px] text-slate-400 font-medium shrink-0">{contact.lastMessageTime}</span>
                                </div>
                                <p className={`text-xs truncate ${contact.unreadCount ? 'font-semibold text-slate-800 dark:text-slate-200' : 'text-slate-500 dark:text-slate-400'}`}>
                                    {contact.lastMessage || contact.role}
                                </p>
                            </div>

                            {contact.unreadCount ? (
                                <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                                    {contact.unreadCount}
                                </div>
                            ) : null}
                        </div>
                    ))}
                    {filteredContacts.length === 0 && (
                        <div className="p-8 text-center text-slate-400 text-sm">
                            No contacts found.
                        </div>
                    )}
                </div>
            </div>
        )}

        {/* VIEW 2: ACTIVE CHAT */}
        {activeContactId && activeContact && !activeCall && (
            <div className="flex flex-col h-full animate-in slide-in-from-right-4 fade-in duration-300 relative">
                {/* Chat Header */}
                <div className="flex items-center justify-between p-3 border-b border-slate-100 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md relative z-20">
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={() => setActiveContactId(null)}
                            className="p-1.5 -ml-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        
                        <div className="relative">
                            <img src={activeContact.avatar} alt={activeContact.name} className="w-9 h-9 rounded-full object-cover" />
                            <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-slate-900 ${getStatusColor(activeContact.status)}`}></div>
                        </div>

                        <div>
                            <h4 className="font-bold text-sm text-slate-800 dark:text-white leading-tight">{activeContact.name}</h4>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium capitalize">
                                {isTyping ? <span className="text-indigo-500 animate-pulse">Typing...</span> : activeContact.role}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-1 relative">
                        <button 
                            onClick={() => startCall('audio')}
                            className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors"
                            title="Start Audio Call"
                        >
                            <Phone size={18} />
                        </button>
                        <button 
                            onClick={() => startCall('video')}
                            className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors"
                            title="Start Video Call"
                        >
                            <Video size={18} />
                        </button>
                        <button 
                            onClick={() => setShowOptions(!showOptions)}
                            className={`p-2 rounded-full transition-colors ${showOptions ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' : 'text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                            title="More Options"
                        >
                            <MoreVertical size={18} />
                        </button>

                        {/* Options Dropdown */}
                        {showOptions && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setShowOptions(false)}></div>
                                <div className="absolute top-10 right-0 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 p-1 z-20 animate-in fade-in zoom-in-95 duration-200">
                                    <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors text-left">
                                        <User size={16} className="text-slate-400" /> View Profile
                                    </button>
                                    <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors text-left">
                                        <Search size={16} className="text-slate-400" /> Search Chat
                                    </button>
                                    <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors text-left">
                                        <BellOff size={16} className="text-slate-400" /> Mute Notifications
                                    </button>
                                    <div className="h-px bg-slate-100 dark:bg-slate-700 my-1"></div>
                                    <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors text-left">
                                        <Ban size={16} /> Block User
                                    </button>
                                    <button 
                                        onClick={() => {
                                            setMessages(prev => ({ ...prev, [activeContactId!]: [] }));
                                            setShowOptions(false);
                                        }}
                                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors text-left"
                                    >
                                        <Trash2 size={16} /> Clear Chat
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-slate-950">
                    <div className="text-center my-4">
                        <span className="text-[10px] text-slate-400 font-medium bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">
                            Today
                        </span>
                    </div>
                    
                    {currentMessages.map((msg) => (
                        <div key={msg.id} className={`flex gap-3 ${msg.senderId === 'me' ? 'flex-row-reverse' : ''}`}>
                            {msg.senderId !== 'me' && (
                                <img src={activeContact.avatar} alt="Sender" className="w-8 h-8 rounded-full self-end mb-1" />
                            )}
                            <div className={`flex flex-col max-w-[75%] ${msg.senderId === 'me' ? 'items-end' : 'items-start'}`}>
                                <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                                    msg.senderId === 'me' 
                                    ? 'bg-indigo-600 text-white rounded-br-none' 
                                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none border border-slate-200 dark:border-slate-700'
                                }`}>
                                    {msg.text}
                                </div>
                                <span className="text-[10px] text-slate-400 mt-1 px-1">
                                    {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </span>
                            </div>
                        </div>
                    ))}
                    
                    {isTyping && (
                        <div className="flex gap-3 animate-in fade-in slide-in-from-bottom-2">
                             <img src={activeContact.avatar} alt="Sender" className="w-8 h-8 rounded-full self-end mb-1" />
                             <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                             </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                    <form 
                        onSubmit={handleSend}
                        className="flex items-end gap-2"
                    >
                        <button type="button" className="p-2.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors">
                            <Paperclip size={20} />
                        </button>
                        
                        <div className="flex-1 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-indigo-100 dark:focus-within:ring-indigo-900 focus-within:border-indigo-300 transition-all flex items-center gap-2 px-3 py-2">
                            <input 
                                ref={inputRef}
                                type="text" 
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Message..."
                                className="flex-1 bg-transparent border-none outline-none text-sm text-slate-900 dark:text-white placeholder-slate-400 min-h-[20px]"
                            />
                            <button type="button" className="text-slate-400 hover:text-indigo-600 transition-colors">
                                <Image size={18} />
                            </button>
                        </div>

                        <button 
                            type="submit"
                            disabled={!input.trim()}
                            className="p-2.5 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-colors shadow-sm"
                        >
                            <Send size={18} className={input.trim() ? "translate-x-0.5 translate-y-px" : ""} />
                        </button>
                    </form>
                </div>
            </div>
        )}

        {/* VIEW 3: ACTIVE CALL OVERLAY */}
        {activeCall && activeContact && (
            <div className="absolute inset-0 z-50 bg-slate-900 flex flex-col items-center justify-between py-12 px-6 animate-in fade-in duration-300">
                {/* Background Image Effect */}
                <img src={activeContact.avatar} className="absolute inset-0 w-full h-full object-cover opacity-20 blur-xl pointer-events-none" alt="" />
                
                <div className="relative z-10 flex flex-col items-center mt-10">
                    <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-indigo-500 to-purple-500 mb-6 shadow-2xl relative">
                         <img src={activeContact.avatar} alt={activeContact.name} className="w-full h-full rounded-full object-cover border-4 border-slate-900" />
                         {/* Live Camera Feed Simulation */}
                         {!isVideoOff && activeCall.status === 'connected' && (
                             <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-emerald-500 z-10 bg-black">
                                <img src={`https://picsum.photos/seed/${activeContact.id}/300/300`} className="w-full h-full object-cover opacity-80" alt="Video Feed" />
                             </div>
                         )}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{activeContact.name}</h3>
                    <div className="flex flex-col items-center gap-1">
                        <p className="text-indigo-300 font-medium animate-pulse">
                            {activeCall.status === 'calling' ? 'Calling...' : 
                             activeCall.status === 'connected' ? (isVideoOff ? 'Audio Call' : 'Video Call') :
                             'Call Ended'}
                        </p>
                        {isScreenSharing && (
                            <p className="text-xs text-emerald-400 font-medium bg-emerald-900/50 px-2 py-0.5 rounded flex items-center gap-1">
                                <MonitorUp size={12} /> Screen Sharing Active
                            </p>
                        )}
                    </div>
                </div>

                <div className="relative z-10 w-full max-w-sm">
                    <div className="grid grid-cols-4 gap-4 items-center">
                        {/* Mute Button */}
                        <button 
                            onClick={() => setIsMuted(!isMuted)}
                            className={`flex flex-col items-center gap-2 group ${isMuted ? 'text-white' : 'text-slate-300 hover:text-white'}`}
                        >
                            <div className={`p-3.5 rounded-full transition-all ${isMuted ? 'bg-white text-slate-900' : 'bg-white/10 group-hover:bg-white/20'}`}>
                                {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
                            </div>
                            <span className="text-[10px] font-medium">Mute</span>
                        </button>

                        {/* Camera Button - Available in Audio & Video */}
                        <button 
                            onClick={() => setIsVideoOff(!isVideoOff)}
                            className={`flex flex-col items-center gap-2 group ${isVideoOff ? 'text-white' : 'text-slate-300 hover:text-white'}`}
                        >
                            <div className={`p-3.5 rounded-full transition-all ${isVideoOff ? 'bg-white text-slate-900' : 'bg-white/10 group-hover:bg-white/20'}`}>
                                {isVideoOff ? <VideoOff size={20} /> : <Video size={20} />}
                            </div>
                            <span className="text-[10px] font-medium">Camera</span>
                        </button>

                        {/* Screen Share Button */}
                        <button 
                            onClick={() => setIsScreenSharing(!isScreenSharing)}
                            className={`flex flex-col items-center gap-2 group ${isScreenSharing ? 'text-white' : 'text-slate-300 hover:text-white'}`}
                        >
                            <div className={`p-3.5 rounded-full transition-all ${isScreenSharing ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' : 'bg-white/10 group-hover:bg-white/20'}`}>
                                {isScreenSharing ? <MonitorUp size={20} /> : <MonitorOff size={20} />}
                            </div>
                            <span className="text-[10px] font-medium">Share</span>
                        </button>

                        {/* End Call Button */}
                        <button 
                            onClick={endCall}
                            className="flex flex-col items-center gap-2 group text-white"
                        >
                            <div className="p-3.5 rounded-full bg-red-500 group-hover:bg-red-600 shadow-lg shadow-red-500/30 transition-all scale-105">
                                <PhoneOff size={20} />
                            </div>
                            <span className="text-[10px] font-medium">End</span>
                        </button>
                    </div>
                </div>
            </div>
        )}
      </div>
    </>
  );
};
