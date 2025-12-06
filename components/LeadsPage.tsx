
import React, { useState } from 'react';
import { Search, Plus, Filter, MoreHorizontal, Mail, Phone, ArrowRight, UserPlus, Trash2, CheckCircle2 } from 'lucide-react';

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

  const [leads, setLeads] = useState<Lead[]>([
    { id: '1', name: 'John Doe', company: 'TechStart Inc', email: 'john@techstart.io', source: 'Website', status: 'New', dateAdded: '2 hours ago', avatar: 'https://picsum.photos/100/100?random=30' },
    { id: '2', name: 'Alice Smith', company: 'Global Solutions', email: 'alice@globalsol.com', source: 'LinkedIn', status: 'New', dateAdded: '5 hours ago', avatar: 'https://picsum.photos/100/100?random=31' },
    { id: '3', name: 'Robert Fox', company: 'Fox Logistics', email: 'robert@foxlog.com', source: 'Referral', status: 'Contacted', dateAdded: '1 day ago', avatar: 'https://picsum.photos/100/100?random=32' },
    { id: '4', name: 'Emily Davis', company: 'Creative Minds', email: 'emily@creative.co', source: 'Webinar', status: 'Qualified', dateAdded: '2 days ago', avatar: 'https://picsum.photos/100/100?random=33' },
    { id: '5', name: 'Michael Brown', company: 'Brown & Co', email: 'mike@brownco.com', source: 'Cold Call', status: 'Disqualified', dateAdded: '3 days ago', avatar: 'https://picsum.photos/100/100?random=34' },
    { id: '6', name: 'Sarah Wilson', company: 'Innovate Ltd', email: 'sarah@innovate.com', source: 'Website', status: 'New', dateAdded: '3 days ago', avatar: 'https://picsum.photos/100/100?random=35' },
    { id: '7', name: 'David Lee', company: 'NextGen Corp', email: 'david@nextgen.com', source: 'Partner', status: 'Contacted', dateAdded: '4 days ago', avatar: 'https://picsum.photos/100/100?random=36' },
  ]);

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
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
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
            <button className="flex items-center justify-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200/50 dark:shadow-none">
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
                          <tr key={lead.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors group">
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
                                      <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors" title="Contact">
                                          <Mail size={16} />
                                      </button>
                                      <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors" title="Convert to Deal">
                                          <UserPlus size={16} />
                                      </button>
                                      <button className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
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
