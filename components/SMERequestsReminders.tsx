
import React, { useState } from 'react';
import { Bell, Calendar, Search, ChevronDown, Check, Clock, Send, CheckCircle2, AlertTriangle, Plus, X } from 'lucide-react';

interface Reminder {
  id: string;
  title: string;
  type: 'KYC' | 'Financials' | 'Contact Info' | 'Tax' | 'Other';
  dueDate: string;
  status: 'Pending' | 'Sent' | 'Overdue' | 'Completed';
  lastSent?: string;
  description?: string;
}

interface CompanyReminders {
  id: string;
  name: string;
  reminders: Reminder[];
}

export const SMERequestsReminders: React.FC = () => {
    // Mock Data
    const companies: CompanyReminders[] = [
        {
            id: '1',
            name: 'TechNova Solutions Ltd.',
            reminders: [
                {
                    id: 'REM-101',
                    title: 'Annual KYC Refresh',
                    type: 'KYC',
                    dueDate: 'Nov 15, 2024',
                    status: 'Pending',
                    description: 'Yearly update of beneficial ownership and director information.'
                },
                {
                    id: 'REM-102',
                    title: 'Q3 Financial Statements',
                    type: 'Financials',
                    dueDate: 'Oct 30, 2024',
                    status: 'Sent',
                    lastSent: 'Oct 20, 2024',
                    description: 'Submission of quarterly balance sheet and P&L.'
                }
            ]
        },
        {
            id: '2',
            name: 'GreenLeaf Logistics',
            reminders: [
                {
                    id: 'REM-201',
                    title: 'Tax Residency Certificate',
                    type: 'Tax',
                    dueDate: 'Oct 01, 2024',
                    status: 'Overdue',
                    lastSent: 'Sep 25, 2024',
                    description: 'Valid tax residency certificate for the current fiscal year.'
                }
            ]
        },
        {
            id: '3',
            name: 'Quantum Dynamics',
            reminders: []
        }
    ];

    const [selectedCompany, setSelectedCompany] = useState<CompanyReminders>(companies[0]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // New Reminder Form
    const [newReminder, setNewReminder] = useState<Partial<Reminder>>({
        title: '',
        type: 'KYC',
        dueDate: '',
        description: ''
    });

    const filteredCompanies = companies.filter(c => 
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelectCompany = (comp: CompanyReminders) => {
        setSelectedCompany(comp);
        setSearchTerm("");
        setShowDropdown(false);
    };

    const handleSendReminder = (id: string) => {
        const updatedReminders = selectedCompany.reminders.map(rem => 
            rem.id === id ? { ...rem, status: 'Sent', lastSent: 'Just now' } as Reminder : rem
        );
        setSelectedCompany({ ...selectedCompany, reminders: updatedReminders });
    };

    const handleMarkComplete = (id: string) => {
        const updatedReminders = selectedCompany.reminders.map(rem => 
            rem.id === id ? { ...rem, status: 'Completed' } as Reminder : rem
        );
        setSelectedCompany({ ...selectedCompany, reminders: updatedReminders });
    };

    const handleCreateReminder = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newReminder.title || !newReminder.dueDate) return;

        const reminder: Reminder = {
            id: `REM-${Date.now()}`,
            title: newReminder.title!,
            type: newReminder.type as any,
            dueDate: new Date(newReminder.dueDate!).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            status: 'Pending',
            description: newReminder.description
        };

        setSelectedCompany({
            ...selectedCompany,
            reminders: [reminder, ...selectedCompany.reminders]
        });
        setIsModalOpen(false);
        setNewReminder({ title: '', type: 'KYC', dueDate: '', description: '' });
    };

    const getStatusColor = (status: string) => {
        switch(status) {
            case 'Completed': return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800';
            case 'Sent': return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800';
            case 'Overdue': return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800';
            default: return 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800';
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 relative">
             {/* Search Bar */}
            <div className="relative z-20">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search company for data updates..." 
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

            {/* Create Reminder Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setIsModalOpen(false)}>
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200 dark:border-slate-700" onClick={e => e.stopPropagation()}>
                        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Set Reminder</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={20}/></button>
                        </div>
                        <form onSubmit={handleCreateReminder} className="p-6 space-y-4">
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Reminder Title</label>
                                <input 
                                    type="text" 
                                    required
                                    placeholder="e.g. Updated Insurance Policy"
                                    value={newReminder.title}
                                    onChange={(e) => setNewReminder({...newReminder, title: e.target.value})}
                                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Type</label>
                                    <select 
                                        value={newReminder.type}
                                        onChange={(e) => setNewReminder({...newReminder, type: e.target.value as any})}
                                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                                    >
                                        <option value="KYC">KYC</option>
                                        <option value="Financials">Financials</option>
                                        <option value="Contact Info">Contact Info</option>
                                        <option value="Tax">Tax</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Due Date</label>
                                    <input 
                                        type="date" 
                                        required
                                        value={newReminder.dueDate}
                                        onChange={(e) => setNewReminder({...newReminder, dueDate: e.target.value})}
                                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Description (Optional)</label>
                                <textarea 
                                    rows={3}
                                    placeholder="Additional context..."
                                    value={newReminder.description}
                                    onChange={(e) => setNewReminder({...newReminder, description: e.target.value})}
                                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white resize-none"
                                />
                            </div>
                            <button type="submit" className="w-full py-2.5 bg-indigo-600 text-white rounded-lg font-bold text-sm hover:bg-indigo-700 transition-colors shadow-lg mt-2">
                                Create Reminder
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                        <Bell size={20} className="text-amber-500" /> 
                        Reminders: {selectedCompany.name}
                    </h3>
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm"
                    >
                        <Plus size={16} /> New Reminder
                    </button>
                </div>
                
                {selectedCompany.reminders.length > 0 ? (
                    <div className="space-y-4">
                        {selectedCompany.reminders.map((rem) => (
                            <div key={rem.id} className="p-5 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors shadow-sm group">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500 mt-1">
                                            <Calendar size={20} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-bold text-slate-900 dark:text-white text-base">{rem.title}</h4>
                                                <span className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-600">
                                                    {rem.type}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                                                <span className="flex items-center gap-1"><Clock size={12} /> Due: {rem.dueDate}</span>
                                                {rem.lastSent && <span>Last Sent: {rem.lastSent}</span>}
                                            </div>
                                        </div>
                                    </div>
                                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase border ${getStatusColor(rem.status)}`}>
                                        {rem.status}
                                    </span>
                                </div>
                                
                                {rem.description && (
                                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 pl-12">
                                        {rem.description}
                                    </p>
                                )}

                                <div className="flex flex-wrap gap-2 pl-12 pt-2 border-t border-slate-100 dark:border-slate-700/50">
                                    {rem.status !== 'Completed' && (
                                        <>
                                            <button 
                                                onClick={() => handleSendReminder(rem.id)}
                                                className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
                                            >
                                                <Send size={14} /> {rem.status === 'Sent' ? 'Resend' : 'Send'} Reminder
                                            </button>
                                            <button 
                                                onClick={() => handleMarkComplete(rem.id)}
                                                className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700 transition-colors shadow-sm flex items-center gap-1.5"
                                            >
                                                <CheckCircle2 size={14} /> Mark Complete
                                            </button>
                                        </>
                                    )}
                                    {rem.status === 'Overdue' && (
                                        <span className="flex items-center gap-1 text-xs font-bold text-red-500 ml-auto">
                                            <AlertTriangle size={14} /> Action Required
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-xl">
                        <Bell size={32} className="mx-auto mb-2 opacity-50 text-slate-400" />
                        <p className="text-slate-500 dark:text-slate-400">No active reminders found for this company.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
