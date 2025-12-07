
import React, { useState } from 'react';
import { Search, Plus, Filter, MoreHorizontal, Mail, Phone, ArrowRight, UserPlus, Trash2, CheckCircle2, X, Save, Loader2, User, Building, Calendar, Globe, Edit2 } from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  source: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Disqualified';
  dateAdded: string;
  avatar: string;
}

export const LeadsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  
  const [newLead, setNewLead] = useState({
    name: '',
    company: '',
    email: '',
    source: 'Website',
    status: 'New'
  });

  const [leads, setLeads] = useState<Lead[]>([
    { id: '1', name: 'John Doe', company: 'TechStart Inc', email: 'john@techstart.io', source: 'Website', status: 'New', dateAdded: '2 hours ago', avatar: 'https://picsum.photos/100/100?random=30' },
    { id: '2', name: 'Alice Smith', company: 'Global Solutions', email: 'alice@globalsol.com', source: 'LinkedIn', status: 'New', dateAdded: '5 hours ago', avatar: 'https://picsum.photos/100/100?random=31' },
    { id: '3', name: 'Robert Fox', company: 'Fox Logistics', email: 'robert@foxlog.com', source: 'Referral', status: 'Contacted', dateAdded: '1 day ago', avatar: 'https://picsum.photos/100/100?random=32' },
    { id: '4', name: 'Emily Davis', company: 'Creative Minds', email: 'emily@creative.co', source: 'Webinar', status: 'Qualified', dateAdded: '2 days ago', avatar: 'https://picsum.photos/100/100?random=33' },
    { id: '5', name: 'Michael Brown', company: 'Brown & Co', email: 'mike@brownco.com', source: 'Cold Call', status: 'Disqualified', dateAdded: '3 days ago', avatar: 'https://picsum.photos/100/100?random=34' },
    { id: '6', name: 'Sarah Wilson', company: 'Innovate Ltd', email: 'sarah@innovate.com', source: 'Website', status: 'New', dateAdded: '3 days ago', avatar: 'https://picsum.photos/100/100?random=35' },
    { id: '7', name: 'David Lee', company: 'NextGen Corp', email: 'david@nextgen.com', source: 'Partner', status: 'Contacted', dateAdded: '4 days ago', avatar: 'https://picsum.photos/100/100?random=36' },
  ]);

  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLead.name || !newLead.company) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
        const lead: Lead = {
            id: Date.now().toString(),
            name: newLead.name,
            company: newLead.company,
            email: newLead.email,
            source: newLead.source,
            status: newLead.status as any,
            dateAdded: 'Just now',
            avatar: `https://ui-avatars.com/api/?name=${newLead.name}&background=random`
        };
        
        setLeads([lead, ...leads]);
        setIsSubmitting(false);
        setIsModalOpen(false);
        setNewLead({ name: '', company: '', email: '', source: 'Website', status: 'New' });
    }, 800);
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          lead.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = statusFilter === 'All' || lead.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-900/30';
      case 'Contacted': return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-900/30';
      case 'Qualified': return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-900/30';
      case 'Disqualified': return 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-700 dark:text-slate-400 dark:border-slate-600';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      
      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setSelectedLead(null)}>
            <div 
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200 dark:border-slate-700" 
                onClick={e => e.stopPropagation()}
            >
                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                        Lead Details
                    </h3>
                    <button onClick={() => setSelectedLead(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700">
                        <X size={20} />
                    </button>
                </div>
                
                <div className="p-6">
                    <div className="flex items-center gap-4 mb-6">
                        <img src={selectedLead.avatar} alt={selectedLead.name} className="w-16 h-16 rounded-full object-cover border-2 border-white dark:border-slate-700 shadow-md" />
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">{selectedLead.name}</h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{selectedLead.company}</p>
                            <div className="mt-2">
                                <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusColor(selectedLead.status)}`}>
                                    {selectedLead.status}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 mb-8">
                        <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                            <Mail size={16} className="text-slate-400" />
                            {selectedLead.email}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                            <Globe size={16} className="text-slate-400" />
                            Source: {selectedLead.source}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                            <Calendar size={16} className="text-slate-400" />
                            Added {selectedLead.dateAdded}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <button className="flex items-center justify-center gap-2 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200/50 dark:shadow-none">
                            <UserPlus size={16} /> Convert to Deal
                        </button>
                        <button className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            <Edit2 size={16} /> Edit Lead
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* Add Lead Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setIsModalOpen(false)}>
            <div 
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200 dark:border-slate-700" 
                onClick={e => e.stopPropagation()}
            >
                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                        <UserPlus size={20} className="text-indigo-600 dark:text-indigo-400" />
                        Add New Lead
                    </h3>
                    <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                        <X size={20} />
                    </button>
                </div>
                
                <form onSubmit={handleAddLead} className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Full Name</label>
                            <input 
                                required
                                type="text" 
                                placeholder="Jane Doe"
                                value={newLead.name}
                                onChange={(e) => setNewLead({...newLead, name: e.target.value})}
                                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Company</label>
                            <input 
                                required
                                type="text" 
                                placeholder="Acme Inc."
                                value={newLead.company}
                                onChange={(e) => setNewLead({...newLead, company: e.target.value})}
                                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Email Address</label>
                        <input 
                            required
                            type="email" 
                            placeholder="jane@example.com"
                            value={newLead.email}
                            onChange={(e) => setNewLead({...newLead, email: e.target.value})}
                            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Source</label>
                            <select 
                                value={newLead.source}
                                onChange={(e) => setNewLead({...newLead, source: e.target.value})}
                                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                            >
                                <option>Website</option>
                                <option>LinkedIn</option>
                                <option>Referral</option>
                                <option>Cold Call</option>
                                <option>Webinar</option>
                                <option>Event</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Status</label>
                            <select 
                                value={newLead.status}
                                onChange={(e) => setNewLead({...newLead, status: e.target.value})}
                                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                            >
                                <option value="New">New</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Qualified">Qualified</option>
                                <option value="Disqualified">Disqualified</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button 
                            type="button" 
                            onClick={() => setIsModalOpen(false)}
                            className="flex-1 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-medium text-sm hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-200/50 dark:shadow-none disabled:opacity-70"
                        >
                            {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                            {isSubmitting ? 'Adding...' : 'Save Lead'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
                type="text" 
                placeholder="Search leads by name, company..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900 focus:border-indigo-300 transition-all text-slate-800 dark:text-slate-200 placeholder-slate-400 shadow-sm"
            />
        </div>
        <div className="flex gap-2">
            <div className="relative">
                <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="appearance-none pl-4 pr-10 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-sm"
                >
                    <option value="All">All Status</option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Disqualified">Disqualified</option>
                </select>
                <Filter size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
            <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200/50 dark:shadow-none"
            >
                <Plus size={18} /> Add Lead
            </button>
        </div>
      </div>

      {/* Leads List */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex-1 flex flex-col overflow-hidden">
          <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[900px]">
                  <thead>
                      <tr className="bg-slate-50/50 dark:bg-slate-800/80 border-b border-slate-100 dark:border-slate-700">
                          <th className="py-4 pl-6 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Name</th>
                          <th className="py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Company</th>
                          <th className="py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Source</th>
                          <th className="py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Status</th>
                          <th className="py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Date Added</th>
                          <th className="py-4 pr-6 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-right">Actions</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                      {filteredLeads.map(lead => (
                          <tr 
                            key={lead.id} 
                            onClick={() => setSelectedLead(lead)}
                            className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors group cursor-pointer"
                          >
                              <td className="py-4 pl-6">
                                  <div className="flex items-center gap-3">
                                      <img src={lead.avatar} alt={lead.name} className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-700" />
                                      <div>
                                          <p className="font-bold text-sm text-slate-900 dark:text-white">{lead.name}</p>
                                          <p className="text-xs text-slate-500 dark:text-slate-400">{lead.email}</p>
                                      </div>
                                  </div>
                              </td>
                              <td className="py-4">
                                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{lead.company}</span>
                              </td>
                              <td className="py-4">
                                  <span className="text-sm text-slate-600 dark:text-slate-400">{lead.source}</span>
                              </td>
                              <td className="py-4">
                                  <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(lead.status)}`}>
                                      {lead.status}
                                  </span>
                              </td>
                              <td className="py-4">
                                  <span className="text-sm text-slate-500 dark:text-slate-400">{lead.dateAdded}</span>
                              </td>
                              <td className="py-4 pr-6 text-right">
                                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors" title="Contact" onClick={(e) => { e.stopPropagation(); /* Add contact logic */ }}>
                                          <Mail size={16} />
                                      </button>
                                      <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors" title="Convert to Deal" onClick={(e) => { e.stopPropagation(); /* Add convert logic */ }}>
                                          <UserPlus size={16} />
                                      </button>
                                      <button className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors" onClick={(e) => { e.stopPropagation(); }}>
                                          <MoreHorizontal size={16} />
                                      </button>
                                  </div>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
              {filteredLeads.length === 0 && (
                  <div className="flex flex-col items-center justify-center p-12 text-slate-400">
                      <Search size={48} className="mb-4 opacity-20" />
                      <p className="font-medium">No leads found</p>
                  </div>
              )}
          </div>
      </div>
    </div>
  );
};
