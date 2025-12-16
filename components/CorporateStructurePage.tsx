
import React, { useState } from 'react';
import { Search, Filter, Plus, Building2, Globe, Percent, Users, MoreHorizontal, ArrowRight, Download, Check, Edit2, Network, MapPin, Calendar, FileText, ChevronDown, Activity, Briefcase, Share2, DollarSign, X } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';

interface Entity {
  id: string;
  name: string;
  type: 'Subsidiary' | 'Joint Venture' | 'Holding Company' | 'Branch';
  ownership: number;
  jurisdiction: string;
  status: 'Active' | 'Dormant' | 'Liquidation';
  incorporationDate: string;
  currency: string;
  shareCapital: string;
  directors: number;
  employees: number;
  taxId: string;
}

interface RootCompany {
  id: string;
  name: string;
  industry: string;
  headquarters: string;
  entities: Entity[];
}

export const CorporateStructurePage: React.FC = () => {
  // Mock Data
  const rootCompanies: RootCompany[] = [
    {
      id: '1',
      name: 'TechNova Solutions Ltd.',
      industry: 'Technology',
      headquarters: 'San Francisco, USA',
      entities: [
        { id: 'E1', name: 'TechNova Europe Ltd.', type: 'Subsidiary', ownership: 100, jurisdiction: 'United Kingdom', status: 'Active', incorporationDate: 'Mar 15, 2022', currency: 'GBP', shareCapital: '50,000', directors: 3, employees: 45, taxId: 'GB-992102' },
        { id: 'E2', name: 'TechNova Asia Pte. Ltd.', type: 'Subsidiary', ownership: 100, jurisdiction: 'Singapore', status: 'Active', incorporationDate: 'Nov 01, 2021', currency: 'SGD', shareCapital: '10,000', directors: 2, employees: 12, taxId: 'SG-220192' },
        { id: 'E3', name: 'Nova-Soft JV', type: 'Joint Venture', ownership: 49, jurisdiction: 'Germany', status: 'Active', incorporationDate: 'Jun 20, 2023', currency: 'EUR', shareCapital: '25,000', directors: 2, employees: 8, taxId: 'DE-882100' },
        { id: 'E4', name: 'TN Holdings', type: 'Holding Company', ownership: 100, jurisdiction: 'Delaware, USA', status: 'Active', incorporationDate: 'Jan 10, 2020', currency: 'USD', shareCapital: '1,000,000', directors: 5, employees: 0, taxId: 'US-991001' },
        { id: 'E5', name: 'TechNova Labs', type: 'Branch', ownership: 100, jurisdiction: 'Canada', status: 'Dormant', incorporationDate: 'Aug 15, 2019', currency: 'CAD', shareCapital: 'N/A', directors: 1, employees: 0, taxId: 'CA-110291' },
      ]
    },
    {
      id: '2',
      name: 'GreenLeaf Logistics',
      industry: 'Logistics',
      headquarters: 'Chicago, USA',
      entities: [
        { id: 'E6', name: 'GreenLeaf Transport', type: 'Subsidiary', ownership: 100, jurisdiction: 'USA', status: 'Active', incorporationDate: 'May 22, 2018', currency: 'USD', shareCapital: '500,000', directors: 4, employees: 120, taxId: 'US-552100' },
        { id: 'E7', name: 'GL Warehousing', type: 'Subsidiary', ownership: 80, jurisdiction: 'Mexico', status: 'Active', incorporationDate: 'Feb 10, 2020', currency: 'MXN', shareCapital: '2,000,000', directors: 3, employees: 45, taxId: 'MX-220119' },
      ]
    },
    {
      id: '3',
      name: 'Quantum Dynamics',
      industry: 'Manufacturing',
      headquarters: 'Berlin, Germany',
      entities: [
        { id: 'E8', name: 'Quantum Components', type: 'Subsidiary', ownership: 100, jurisdiction: 'China', status: 'Active', incorporationDate: 'Dec 01, 2019', currency: 'CNY', shareCapital: '1,000,000', directors: 3, employees: 300, taxId: 'CN-882110' }
      ]
    }
  ];

  // State
  const [selectedCompany, setSelectedCompany] = useState<RootCompany>(rootCompanies[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);
  const [entityFilter, setEntityFilter] = useState("All");
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);

  const filteredRootCompanies = rootCompanies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredEntities = selectedCompany.entities.filter(e => 
    entityFilter === "All" || e.type === entityFilter
  );

  const handleSelectCompany = (company: RootCompany) => {
    setSelectedCompany(company);
    setSearchTerm("");
    setShowCompanyDropdown(false);
    setSelectedEntity(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800';
      case 'Dormant': return 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700';
      case 'Liquidation': return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Subsidiary': return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20';
      case 'Joint Venture': return 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20';
      case 'Holding Company': return 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20';
      default: return 'text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800';
    }
  };

  // Pie Chart Data for Entity Types
  const typeDistribution = [
    { name: 'Subsidiary', value: selectedCompany.entities.filter(e => e.type === 'Subsidiary').length, color: '#3b82f6' },
    { name: 'Joint Venture', value: selectedCompany.entities.filter(e => e.type === 'Joint Venture').length, color: '#8b5cf6' },
    { name: 'Holding', value: selectedCompany.entities.filter(e => e.type === 'Holding Company').length, color: '#f59e0b' },
    { name: 'Branch', value: selectedCompany.entities.filter(e => e.type === 'Branch').length, color: '#64748b' },
  ].filter(d => d.value > 0);

  return (
    <div className="flex flex-col h-full w-full bg-slate-50 dark:bg-slate-950 animate-in fade-in slide-in-from-bottom-2 duration-300 overflow-hidden">
      
      {/* Top Header Section */}
      <div className="flex-none px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 z-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                    <Building2 className="text-indigo-500" size={28} /> 
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
                        Corporate Structure
                    </span>
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage subsidiaries, joint ventures, and ownership hierarchy for {selectedCompany.name}.</p>
            </div>
            
            <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-sm">
                    <Network size={16} /> Visual Chart
                </button>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 dark:shadow-none">
                    <Plus size={18} /> Add Entity
                </button>
            </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1 max-w-lg">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search group structure..." 
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowCompanyDropdown(true);
                    }}
                    onFocus={() => setShowCompanyDropdown(true)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white transition-all shadow-sm focus:bg-white dark:focus:bg-slate-900"
                />
                
                {showCompanyDropdown && (
                    <>
                        <div className="fixed inset-0 z-10" onClick={() => setShowCompanyDropdown(false)}></div>
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-20 max-h-60 overflow-y-auto">
                            {filteredRootCompanies.length > 0 ? (
                                filteredRootCompanies.map(comp => (
                                    <button
                                        key={comp.id}
                                        onClick={() => handleSelectCompany(comp)}
                                        className="w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 border-b border-slate-100 dark:border-slate-800 last:border-0 flex justify-between items-center group transition-colors"
                                    >
                                        <div>
                                            <p className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{comp.name}</p>
                                            <p className="text-xs text-slate-500">{comp.industry} • {comp.headquarters}</p>
                                        </div>
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

            <div className="flex items-center gap-2">
                 <div className="relative">
                     <select 
                        value={entityFilter}
                        onChange={(e) => setEntityFilter(e.target.value)}
                        className="appearance-none pl-4 pr-10 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                     >
                         <option value="All">All Entities</option>
                         <option value="Subsidiary">Subsidiaries</option>
                         <option value="Joint Venture">Joint Ventures</option>
                         <option value="Holding Company">Holdings</option>
                         <option value="Branch">Branches</option>
                     </select>
                     <Filter size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                 </div>
                 <button className="p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
                     <Download size={18} />
                 </button>
            </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col lg:flex-row w-full">
         
         {/* Main Content Area (List) */}
         <div className="flex-1 overflow-y-auto p-4 md:p-8 w-full">
             <div className="max-w-5xl mx-auto space-y-6">
                 
                 {/* Statistics Row */}
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                         <div className="flex justify-between items-start mb-2">
                             <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Entities</p>
                             <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                                 <Building2 size={16} />
                             </div>
                         </div>
                         <div className="flex items-baseline gap-2">
                             <span className="text-3xl font-bold text-slate-900 dark:text-white">{selectedCompany.entities.length}</span>
                             <span className="text-xs text-slate-500">Active Units</span>
                         </div>
                     </div>
                     <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                         <div className="flex justify-between items-start mb-2">
                             <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Global Reach</p>
                             <div className="p-1.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg">
                                 <Globe size={16} />
                             </div>
                         </div>
                         <div className="flex items-baseline gap-2">
                             <span className="text-3xl font-bold text-slate-900 dark:text-white">{new Set(selectedCompany.entities.map(e => e.jurisdiction)).size}</span>
                             <span className="text-xs text-slate-500">Jurisdictions</span>
                         </div>
                     </div>
                     <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
                         <div className="h-16 w-16 relative">
                             <ResponsiveContainer width="100%" height="100%">
                                 <PieChart>
                                     <Pie data={typeDistribution} innerRadius={15} outerRadius={30} dataKey="value" stroke="none">
                                        {typeDistribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                     </Pie>
                                 </PieChart>
                             </ResponsiveContainer>
                         </div>
                         <div>
                             <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Structure Mix</p>
                             <div className="flex flex-col text-xs text-slate-600 dark:text-slate-300 gap-0.5">
                                 {typeDistribution.slice(0, 2).map((d, i) => (
                                     <span key={i} className="flex items-center gap-1.5">
                                         <div className="w-1.5 h-1.5 rounded-full" style={{backgroundColor: d.color}}></div> {d.name}: {d.value}
                                     </span>
                                 ))}
                             </div>
                         </div>
                     </div>
                 </div>

                 {/* Entities List */}
                 <div className="space-y-4">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                        Entity List <span className="text-xs font-normal text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{filteredEntities.length}</span>
                    </h3>
                    
                    {filteredEntities.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4">
                            {filteredEntities.map(entity => (
                                <div 
                                    key={entity.id} 
                                    onClick={() => setSelectedEntity(entity)}
                                    className={`bg-white dark:bg-slate-900 p-5 rounded-2xl border transition-all cursor-pointer group relative overflow-hidden ${
                                        selectedEntity?.id === entity.id 
                                        ? 'border-indigo-500 ring-1 ring-indigo-500 shadow-md' 
                                        : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md'
                                    }`}
                                >
                                    {/* Selection Indicator */}
                                    {selectedEntity?.id === entity.id && (
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500"></div>
                                    )}

                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 font-bold text-lg border border-slate-200 dark:border-slate-700 shadow-sm group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                                {entity.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{entity.name}</h4>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide ${getTypeColor(entity.type)}`}>{entity.type}</span>
                                                    <span className="text-xs text-slate-400">•</span>
                                                    <span className="text-xs text-slate-500 dark:text-slate-400">{entity.jurisdiction}</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                                            <div className="flex flex-col items-end">
                                                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wide mb-1">Ownership</span>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-20 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                                        <div className={`h-full rounded-full ${entity.ownership === 100 ? 'bg-emerald-500' : 'bg-indigo-500'}`} style={{width: `${entity.ownership}%`}}></div>
                                                    </div>
                                                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{entity.ownership}%</span>
                                                </div>
                                            </div>
                                            
                                            <div className="flex flex-col items-end min-w-[80px]">
                                                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wide mb-1">Status</span>
                                                <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${getStatusColor(entity.status)}`}>
                                                    {entity.status}
                                                </span>
                                            </div>

                                            <div className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                                                <ChevronDown className={`transform transition-transform ${selectedEntity?.id === entity.id ? '-rotate-90' : 'rotate-0'}`} size={20} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                         <div className="p-12 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                             <Building2 size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
                             <p className="text-slate-500 dark:text-slate-400 font-medium">No entities found matching your filters.</p>
                             <button 
                                onClick={() => { setSearchTerm(""); setEntityFilter("All"); }}
                                className="mt-4 text-indigo-600 dark:text-indigo-400 text-sm font-bold hover:underline"
                             >
                                 Clear Filters
                             </button>
                         </div>
                    )}
                 </div>
             </div>
         </div>

         {/* Right Column: Entity Details (Sidebar) */}
         <div className={`w-full lg:w-[400px] border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all duration-300 transform ${selectedEntity ? 'translate-x-0' : 'translate-x-full lg:translate-x-0 lg:w-0 lg:opacity-0 lg:overflow-hidden'} flex flex-col shadow-2xl lg:shadow-none z-30 absolute inset-y-0 right-0 lg:relative`}>
             {selectedEntity && (
                 <div className="h-full flex flex-col animate-in slide-in-from-right duration-300">
                     {/* Sidebar Header */}
                     <div className="h-32 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 relative shrink-0">
                         <div className="absolute inset-0 bg-black/10"></div>
                         <button 
                            onClick={() => setSelectedEntity(null)}
                            className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/30 text-white rounded-full transition-colors backdrop-blur-sm z-10"
                         >
                             <X size={18} />
                         </button>
                         <div className="absolute -bottom-10 left-6">
                             <div className="w-20 h-20 rounded-2xl bg-white dark:bg-slate-900 border-4 border-white dark:border-slate-900 shadow-xl flex items-center justify-center text-3xl font-bold text-slate-700 dark:text-slate-200">
                                 {selectedEntity.name.charAt(0)}
                             </div>
                         </div>
                     </div>
                     
                     <div className="px-6 pt-12 pb-6 flex-1 overflow-y-auto">
                         <h3 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight mb-1">{selectedEntity.name}</h3>
                         <div className="flex flex-wrap gap-2 mb-6">
                            <span className={`text-xs px-2 py-0.5 rounded font-bold ${getTypeColor(selectedEntity.type)}`}>{selectedEntity.type}</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 font-mono">ID: {selectedEntity.taxId}</span>
                         </div>

                         <div className="space-y-6">
                             <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm">
                                 <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-4">Key Information</h4>
                                 <div className="space-y-4">
                                     <div className="flex justify-between items-center text-sm">
                                         <span className="text-slate-500 flex items-center gap-2"><MapPin size={16} className="text-slate-400"/> Jurisdiction</span>
                                         <span className="font-semibold text-slate-900 dark:text-white">{selectedEntity.jurisdiction}</span>
                                     </div>
                                     <div className="flex justify-between items-center text-sm">
                                         <span className="text-slate-500 flex items-center gap-2"><Calendar size={16} className="text-slate-400"/> Incorporated</span>
                                         <span className="font-semibold text-slate-900 dark:text-white">{selectedEntity.incorporationDate}</span>
                                     </div>
                                     <div className="flex justify-between items-center text-sm">
                                         <span className="text-slate-500 flex items-center gap-2"><Percent size={16} className="text-slate-400"/> Ownership</span>
                                         <span className="font-bold text-indigo-600 dark:text-indigo-400">{selectedEntity.ownership}%</span>
                                     </div>
                                     <div className="flex justify-between items-center text-sm">
                                         <span className="text-slate-500 flex items-center gap-2"><Activity size={16} className="text-slate-400"/> Status</span>
                                         <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${getStatusColor(selectedEntity.status)}`}>{selectedEntity.status}</span>
                                     </div>
                                 </div>
                             </div>

                             <div className="grid grid-cols-2 gap-4">
                                 <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 text-center">
                                     <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wide mb-1">Share Capital</p>
                                     <p className="font-mono font-bold text-slate-900 dark:text-white">{selectedEntity.currency} {selectedEntity.shareCapital}</p>
                                 </div>
                                 <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 text-center">
                                     <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wide mb-1">Board Size</p>
                                     <p className="font-bold text-slate-900 dark:text-white flex items-center justify-center gap-1">
                                         <Users size={14} className="text-indigo-500"/> {selectedEntity.directors}
                                     </p>
                                 </div>
                                 <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 text-center">
                                     <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wide mb-1">Employees</p>
                                     <p className="font-bold text-slate-900 dark:text-white">{selectedEntity.employees}</p>
                                 </div>
                                 <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 text-center">
                                     <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wide mb-1">Documents</p>
                                     <p className="font-bold text-slate-900 dark:text-white flex items-center justify-center gap-1">
                                         <FileText size={14} className="text-emerald-500"/> 5
                                     </p>
                                 </div>
                             </div>
                             
                             <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-900/30">
                                 <div className="flex items-center gap-3 mb-2">
                                     <div className="p-1.5 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
                                         <Share2 size={16} />
                                     </div>
                                     <span className="text-sm font-bold text-indigo-900 dark:text-indigo-200">Shareholding Structure</span>
                                 </div>
                                 <p className="text-xs text-indigo-700 dark:text-indigo-300 leading-relaxed">
                                     Wholly owned subsidiary of {selectedCompany.name}. No external minority shareholders registered.
                                 </p>
                             </div>
                         </div>
                     </div>

                     <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col gap-3">
                         <button className="w-full py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200/50 dark:shadow-none flex items-center justify-center gap-2">
                             <FileText size={18} /> View Corporate Documents
                         </button>
                         <div className="flex gap-3">
                             <button className="flex-1 py-2.5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2">
                                 <Edit2 size={16} /> Edit Details
                             </button>
                             <button className="flex-1 py-2.5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2">
                                 <Network size={16} /> Org Chart
                             </button>
                         </div>
                     </div>
                 </div>
             )}
         </div>

      </div>

    </div>
  );
};
