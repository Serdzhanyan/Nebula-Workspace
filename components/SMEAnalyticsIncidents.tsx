
import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, Server, Search, ChevronDown, Check, Activity, Clock, XCircle, AlertCircle, BarChart3, Wifi, Database, Globe } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface Incident {
    id: string;
    title: string;
    description: string;
    status: 'Resolved' | 'Monitoring' | 'Investigating' | 'Identified';
    severity: 'Critical' | 'Major' | 'Minor' | 'Maintenance';
    service: string;
    startTime: string;
    duration: string;
}

interface ServiceUptime {
    name: string;
    type: 'API' | 'Database' | 'Network' | 'Web';
    uptime: string; // e.g. "99.9%"
    status: 'Operational' | 'Degraded' | 'Outage' | 'Maintenance';
}

interface CompanyIncidents {
    id: string;
    name: string;
    industry: string;
    mttr: string; // Mean Time To Resolve
    totalIncidents: number;
    healthScore: number; // 0-100
    incidentHistory: { month: string; count: number }[];
    activeIncidents: Incident[];
    resolvedIncidents: Incident[];
    services: ServiceUptime[];
}

export const SMEAnalyticsIncidents: React.FC = () => {
    // Mock Data
    const companies: CompanyIncidents[] = [
        {
            id: '1',
            name: 'TechNova Solutions Ltd.',
            industry: 'Technology',
            mttr: '1h 15m',
            totalIncidents: 12,
            healthScore: 98,
            incidentHistory: [
                { month: 'May', count: 1 }, { month: 'Jun', count: 0 }, { month: 'Jul', count: 2 },
                { month: 'Aug', count: 1 }, { month: 'Sep', count: 0 }, { month: 'Oct', count: 1 }
            ],
            activeIncidents: [],
            resolvedIncidents: [
                { id: 'INC-101', title: 'API Latency Spike', description: 'Increased response times on checkout endpoints.', status: 'Resolved', severity: 'Minor', service: 'Payment API', startTime: 'Oct 24, 09:30 AM', duration: '45m' },
                { id: 'INC-099', title: 'Webhook Delivery Failure', description: 'Webhooks timed out due to destination server load.', status: 'Resolved', severity: 'Major', service: 'Webhooks', startTime: 'Aug 15, 14:20 PM', duration: '2h 10m' }
            ],
            services: [
                { name: 'Core API', type: 'API', uptime: '99.99%', status: 'Operational' },
                { name: 'Primary DB', type: 'Database', uptime: '100%', status: 'Operational' },
                { name: 'CDN', type: 'Network', uptime: '99.95%', status: 'Operational' }
            ]
        },
        {
            id: '2',
            name: 'GreenLeaf Logistics',
            industry: 'Logistics',
            mttr: '45m',
            totalIncidents: 5,
            healthScore: 92,
            incidentHistory: [
                { month: 'May', count: 0 }, { month: 'Jun', count: 1 }, { month: 'Jul', count: 0 },
                { month: 'Aug', count: 2 }, { month: 'Sep', count: 1 }, { month: 'Oct', count: 1 }
            ],
            activeIncidents: [
                { id: 'INC-205', title: 'Tracking Portal Slowdown', description: 'Users reporting slow loads on tracking pages.', status: 'Investigating', severity: 'Minor', service: 'Web Portal', startTime: 'Oct 25, 10:00 AM', duration: 'Ongoing' }
            ],
            resolvedIncidents: [
                { id: 'INC-201', title: 'Label Generation Error', description: 'PDF generation service failed for batch #992.', status: 'Resolved', severity: 'Major', service: 'Reporting', startTime: 'Sep 10, 08:00 AM', duration: '30m' }
            ],
            services: [
                { name: 'Web Portal', type: 'Web', uptime: '98.50%', status: 'Degraded' },
                { name: 'Logistics API', type: 'API', uptime: '99.90%', status: 'Operational' },
                { name: 'Tracking DB', type: 'Database', uptime: '99.99%', status: 'Operational' }
            ]
        },
        {
            id: '3',
            name: 'Quantum Dynamics',
            industry: 'Manufacturing',
            mttr: '3h 30m',
            totalIncidents: 24,
            healthScore: 85,
            incidentHistory: [
                { month: 'May', count: 3 }, { month: 'Jun', count: 4 }, { month: 'Jul', count: 2 },
                { month: 'Aug', count: 5 }, { month: 'Sep', count: 3 }, { month: 'Oct', count: 2 }
            ],
            activeIncidents: [
                { id: 'INC-305', title: 'ERP Sync Failure', description: 'Data not syncing to SAP backend.', status: 'Identified', severity: 'Critical', service: 'Integrations', startTime: 'Oct 24, 23:00 PM', duration: '12h' }
            ],
            resolvedIncidents: [
                { id: 'INC-301', title: 'Authentication Outage', description: 'Users unable to login via SSO.', status: 'Resolved', severity: 'Critical', service: 'Auth', startTime: 'Oct 10, 11:00 AM', duration: '1h 15m' }
            ],
            services: [
                { name: 'ERP Connector', type: 'API', uptime: '95.00%', status: 'Outage' },
                { name: 'Inventory DB', type: 'Database', uptime: '99.99%', status: 'Operational' },
                { name: 'Order System', type: 'Web', uptime: '99.80%', status: 'Operational' }
            ]
        }
    ];

    const [selectedCompany, setSelectedCompany] = useState<CompanyIncidents>(companies[0]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);

    const filteredCompanies = companies.filter(c => 
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelectCompany = (company: CompanyIncidents) => {
        setSelectedCompany(company);
        setSearchTerm("");
        setShowDropdown(false);
    };

    const getSeverityColor = (severity: string) => {
        switch(severity) {
            case 'Critical': return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-900/50';
            case 'Major': return 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-900/50';
            case 'Minor': return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-900/50';
            default: return 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';
        }
    };

    const getStatusColor = (status: string) => {
        switch(status) {
            case 'Operational': return 'bg-emerald-500';
            case 'Degraded': return 'bg-amber-500';
            case 'Outage': return 'bg-red-500';
            case 'Maintenance': return 'bg-blue-500';
            default: return 'bg-slate-400';
        }
    };

    const getServiceIcon = (type: string) => {
        switch(type) {
            case 'API': return <Server size={18} />;
            case 'Database': return <Database size={18} />;
            case 'Network': return <Wifi size={18} />;
            case 'Web': return <Globe size={18} />;
            default: return <Activity size={18} />;
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            
            {/* Company Selector */}
            <div className="relative z-30">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search company incidents..." 
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setShowDropdown(true);
                        }}
                        onFocus={() => setShowDropdown(true)}
                        className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-slate-900 dark:text-white transition-all"
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
                                        <div>
                                            <p className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{comp.name}</p>
                                            <p className="text-xs text-slate-500">{comp.industry}</p>
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

            {/* Header Stats */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                     <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedCompany.name}</h2>
                     <p className="text-sm text-slate-500 dark:text-slate-400">Incident Management Dashboard</p>
                </div>
                
                <div className="flex gap-4">
                    <div className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm">
                        <span className="text-xs font-bold text-slate-500 uppercase block">System Health</span>
                        <span className={`text-xl font-bold ${selectedCompany.healthScore > 90 ? 'text-emerald-500' : selectedCompany.healthScore > 80 ? 'text-amber-500' : 'text-red-500'}`}>
                            {selectedCompany.healthScore}%
                        </span>
                    </div>
                    <div className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm">
                        <span className="text-xs font-bold text-slate-500 uppercase block">MTTR (Avg)</span>
                        <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{selectedCompany.mttr}</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Incident Frequency Chart */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col h-[350px]">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                            <BarChart3 size={18} className="text-indigo-500" /> Incident Frequency
                        </h3>
                    </div>
                    <div className="flex-1 w-full min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={selectedCompany.incidentHistory} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} allowDecimals={false} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                    itemStyle={{ color: '#1e293b' }}
                                    cursor={{ fill: 'transparent' }}
                                />
                                <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Service Health Status */}
                <div className="lg:col-span-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                        <Activity size={18} className="text-emerald-500" /> System Status
                    </h3>
                    <div className="space-y-4">
                        {selectedCompany.services.map((service, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white dark:bg-slate-700 rounded-lg text-slate-500 dark:text-slate-300 shadow-sm">
                                        {getServiceIcon(service.type)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">{service.name}</p>
                                        <p className="text-xs text-slate-500">{service.type}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center justify-end gap-1.5 mb-1">
                                        <div className={`w-2 h-2 rounded-full ${getStatusColor(service.status)} ${service.status !== 'Operational' ? 'animate-pulse' : ''}`}></div>
                                        <span className={`text-xs font-bold ${
                                            service.status === 'Operational' ? 'text-emerald-600 dark:text-emerald-400' :
                                            service.status === 'Degraded' ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400'
                                        }`}>
                                            {service.status}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-400 font-mono">{service.uptime}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Active Incidents */}
            {selectedCompany.activeIncidents.length > 0 && (
                <div className="bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-200 dark:border-red-900/30 p-6 shadow-sm">
                    <h3 className="font-bold text-lg text-red-700 dark:text-red-400 mb-4 flex items-center gap-2">
                        <AlertCircle size={20} className="fill-red-100 stroke-red-600 dark:fill-red-900 dark:stroke-red-400" /> Active Incidents
                    </h3>
                    <div className="space-y-3">
                        {selectedCompany.activeIncidents.map(inc => (
                            <div key={inc.id} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-red-100 dark:border-red-900/30 shadow-sm flex flex-col md:flex-row justify-between gap-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase border ${getSeverityColor(inc.severity)}`}>
                                            {inc.severity}
                                        </span>
                                        <span className="text-xs font-mono text-slate-400">{inc.id}</span>
                                    </div>
                                    <h4 className="font-bold text-slate-900 dark:text-white">{inc.title}</h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{inc.description}</p>
                                </div>
                                <div className="flex flex-col items-start md:items-end gap-1 text-sm text-slate-500">
                                    <span className="font-medium text-slate-700 dark:text-slate-200 flex items-center gap-1">
                                        <Activity size={14} className="text-red-500" /> {inc.status}
                                    </span>
                                    <span>Started: {inc.startTime}</span>
                                    <span className="font-mono text-red-600 dark:text-red-400">Duration: {inc.duration}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Resolved Incidents Log */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                    <CheckCircle2 size={20} className="text-emerald-500" /> Resolved Incidents History
                </h3>
                {selectedCompany.resolvedIncidents.length > 0 ? (
                    <div className="space-y-3">
                        {selectedCompany.resolvedIncidents.map(inc => (
                            <div key={inc.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                <div className="flex items-start gap-4 mb-2 sm:mb-0">
                                    <div className="mt-1">
                                        {inc.severity === 'Major' || inc.severity === 'Critical' ? (
                                            <AlertTriangle size={18} className="text-amber-500" />
                                        ) : (
                                            <CheckCircle2 size={18} className="text-emerald-500" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-slate-900 dark:text-white">{inc.title}</p>
                                        <p className="text-xs text-slate-500">{inc.description}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 w-full sm:w-auto justify-between sm:justify-end pl-8 sm:pl-0">
                                    <span>{inc.service}</span>
                                    <span>{inc.startTime}</span>
                                    <span className="font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">{inc.duration}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 text-slate-400 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-xl">
                        <CheckCircle2 size={32} className="mx-auto mb-2 opacity-50 text-emerald-500" />
                        <p>No recent resolved incidents.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
