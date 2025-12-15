
import React, { useState } from 'react';
import { StickyNote, Plus, Search, ChevronDown, Check, User, Clock, Trash2, Pin, Send, MoreHorizontal, MessageSquare } from 'lucide-react';

interface Note {
  id: string;
  author: string;
  role: string;
  date: string;
  content: string;
  isPinned: boolean;
  type: 'Note' | 'Call Log' | 'System';
}

interface CompanyNotes {
  id: string;
  name: string;
  notes: Note[];
}

export const SMERequestsNotes: React.FC = () => {
    // Mock Data
    const companies: CompanyNotes[] = [
        {
            id: '1',
            name: 'TechNova Solutions Ltd.',
            notes: [
                {
                    id: 'N-101',
                    author: 'Alex Johnson',
                    role: 'Relationship Manager',
                    date: 'Oct 24, 2024 14:30',
                    content: 'Client requested express processing for international payments. Approved by Manager on Oct 20. Please ensure all future SWIFT transfers are prioritized.',
                    isPinned: true,
                    type: 'Note'
                },
                {
                    id: 'N-102',
                    author: 'System',
                    role: 'Automated',
                    date: 'Oct 22, 2024 09:15',
                    content: 'KYC Verification status changed to "Verified".',
                    isPinned: false,
                    type: 'System'
                },
                {
                    id: 'N-103',
                    author: 'Sarah Lee',
                    role: 'Compliance Officer',
                    date: 'Oct 15, 2024 11:00',
                    content: 'Called client regarding the missing beneficial owner document. They promised to upload it by EOD.',
                    isPinned: false,
                    type: 'Call Log'
                }
            ]
        },
        {
            id: '2',
            name: 'GreenLeaf Logistics',
            notes: [
                {
                    id: 'N-201',
                    author: 'Mark Vos',
                    role: 'Risk Analyst',
                    date: 'Oct 20, 2024 16:45',
                    content: 'Flagged for high transaction volume. Monitoring set to active for the next 7 days.',
                    isPinned: true,
                    type: 'Note'
                }
            ]
        },
        {
            id: '3',
            name: 'Quantum Dynamics',
            notes: []
        }
    ];

    const [selectedCompany, setSelectedCompany] = useState<CompanyNotes>(companies[0]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    
    // Add Note State
    const [isAddingNote, setIsAddingNote] = useState(false);
    const [newNoteContent, setNewNoteContent] = useState("");
    const [newNotePinned, setNewNotePinned] = useState(false);

    const filteredCompanies = companies.filter(c => 
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelectCompany = (comp: CompanyNotes) => {
        setSelectedCompany(comp);
        setSearchTerm("");
        setShowDropdown(false);
        setIsAddingNote(false);
    };

    const handleAddNote = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newNoteContent.trim()) return;

        const note: Note = {
            id: `N-${Date.now()}`,
            author: 'You', // Mock current user
            role: 'Admin',
            date: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }),
            content: newNoteContent,
            isPinned: newNotePinned,
            type: 'Note'
        };

        const updatedCompany = {
            ...selectedCompany,
            notes: [note, ...selectedCompany.notes]
        };

        setSelectedCompany(updatedCompany);
        setNewNoteContent("");
        setNewNotePinned(false);
        setIsAddingNote(false);
    };

    const handleDeleteNote = (noteId: string) => {
        if(window.confirm("Delete this note?")) {
            const updatedNotes = selectedCompany.notes.filter(n => n.id !== noteId);
            setSelectedCompany({ ...selectedCompany, notes: updatedNotes });
        }
    };

    const togglePin = (noteId: string) => {
        const updatedNotes = selectedCompany.notes.map(n => 
            n.id === noteId ? { ...n, isPinned: !n.isPinned } : n
        );
        setSelectedCompany({ ...selectedCompany, notes: updatedNotes });
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 relative">
             {/* Search Bar */}
            <div className="relative z-20">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search company for internal notes..." 
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

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm min-h-[500px] flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                        <StickyNote size={20} className="text-amber-500" /> 
                        Internal Notes: {selectedCompany.name}
                    </h3>
                    <button 
                        onClick={() => setIsAddingNote(!isAddingNote)}
                        className={`flex items-center gap-2 px-3 py-1.5 border rounded-lg text-xs font-bold transition-colors ${
                            isAddingNote 
                            ? 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200' 
                            : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-indigo-600 dark:text-indigo-400'
                        }`}
                    >
                        {isAddingNote ? <span className="flex items-center gap-1">Cancel</span> : <span className="flex items-center gap-1"><Plus size={14} /> Add Note</span>}
                    </button>
                </div>

                {isAddingNote && (
                    <form onSubmit={handleAddNote} className="mb-8 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700 animate-in slide-in-from-top-2">
                        <textarea 
                            autoFocus
                            placeholder="Type your internal note here..."
                            value={newNoteContent}
                            onChange={(e) => setNewNoteContent(e.target.value)}
                            className="w-full p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none h-24 mb-3 text-slate-900 dark:text-white"
                        />
                        <div className="flex justify-between items-center">
                            <label className="flex items-center gap-2 text-xs font-bold text-slate-500 cursor-pointer select-none">
                                <input 
                                    type="checkbox" 
                                    checked={newNotePinned} 
                                    onChange={(e) => setNewNotePinned(e.target.checked)}
                                    className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" 
                                />
                                Pin this note
                            </label>
                            <button 
                                type="submit" 
                                disabled={!newNoteContent.trim()}
                                className="px-4 py-2 bg-indigo-600 text-white text-sm font-bold rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                <Send size={14} /> Post Note
                            </button>
                        </div>
                    </form>
                )}
                
                <div className="space-y-4 flex-1 overflow-y-auto pr-2">
                     {selectedCompany.notes.length > 0 ? (
                         selectedCompany.notes.map((note) => (
                             <div 
                                key={note.id} 
                                className={`p-5 rounded-xl border transition-all group ${
                                    note.isPinned 
                                    ? 'bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-900/30' 
                                    : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 hover:border-slate-200 dark:hover:border-slate-600'
                                }`}
                             >
                                 <div className="flex justify-between items-start mb-3">
                                     <div className="flex items-center gap-3">
                                         <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                                             note.type === 'System' ? 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300' :
                                             'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400'
                                         }`}>
                                             {note.type === 'System' ? 'SYS' : note.author.substring(0, 2).toUpperCase()}
                                         </div>
                                         <div>
                                             <div className="flex items-center gap-2">
                                                <span className="font-bold text-sm text-slate-900 dark:text-white">{note.author}</span>
                                                {note.isPinned && <Pin size={12} className="text-amber-500 fill-current" />}
                                             </div>
                                             <p className="text-xs text-slate-500">{note.role} • {note.date}</p>
                                         </div>
                                     </div>
                                     
                                     <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                         <button 
                                            onClick={() => togglePin(note.id)}
                                            className="p-1.5 text-slate-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded transition-colors" 
                                            title={note.isPinned ? "Unpin" : "Pin"}
                                         >
                                             <Pin size={14} className={note.isPinned ? "fill-current" : ""} />
                                         </button>
                                         <button 
                                            onClick={() => handleDeleteNote(note.id)}
                                            className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                                            title="Delete"
                                         >
                                             <Trash2 size={14} />
                                         </button>
                                     </div>
                                 </div>
                                 
                                 <p className={`text-sm leading-relaxed ${note.isPinned ? 'text-slate-800 dark:text-slate-200' : 'text-slate-600 dark:text-slate-300'}`}>
                                     {note.content}
                                 </p>

                                 {note.type !== 'Note' && (
                                     <div className="mt-3">
                                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded">
                                            {note.type === 'System' ? <MoreHorizontal size={10} /> : <User size={10} />}
                                            {note.type}
                                        </span>
                                     </div>
                                 )}
                             </div>
                         ))
                     ) : (
                         <div className="text-center py-16 text-slate-400 flex flex-col items-center">
                             <MessageSquare size={32} className="mb-2 opacity-30" />
                             <p className="text-sm">No notes found for this company.</p>
                         </div>
                     )}
                </div>
            </div>
        </div>
    );
};
