
import React, { useState } from 'react';
import { AlertOctagon, ShieldAlert, Globe, Search, ChevronDown, Check, TrendingUp, TrendingDown, Activity, AlertTriangle, ShieldCheck, FileText, Download, Eye } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import { PieChart as RePieChart, Pie, Cell } from 'recharts';

interface RiskAlert {
    id: string;
    type: string;
    severity: 'Critical' | 'High' | 'Medium' | 'Low';
    date: string;
    description: string;
    status: 'Active' | 'Investigating' | 'Resolved';
}

interface RiskMetric {
    category: string;
    score: number; // 0-100, where 100 is high risk
    fullMark: number;
}

interface CompanyRiskProfile {
    id: string;
    name: string;
    industry: string;
    overallScore: number; // 0-100, where 100 is Safe/Low Risk, 0 is High Risk
    riskLevel: 'Low' | 'Medium' | 'High';
    creditRating: string;
    trend: { month: string; score: number }[];
    categories: RiskMetric[];
    alerts: RiskAlert[];
    geoExposure: { region: string; risk: 'Low' | 'Medium' | 'High' }[];
}

export const SMEAnalyticsRisks: React.FC = () => {
    // Mock Data
    const companies: CompanyRiskProfile[] = [
        {
            id: '1',
            name: 'TechNova Solutions Ltd.',
            industry: 'Technology',
            overallScore: 88,
            riskLevel: 'Low',
            creditRating: 'AA+',
            trend: [
                { month: 'May', score: 85 }, { month: 'Jun', score: 86 }, { month: 'Jul', score: 84 },
                { month: 'Aug', score: 88 }, { month: 'Sep', score: 87 }, { month: 'Oct', score: 88 }
            ],
            categories: [
                { category: 'Financial', score: 20, fullMark: 100 },
                { category: 'Operational', score: 15, fullMark: 100 },
                { category: 'Legal', score: 10, fullMark: 100 },
                { category: 'Reputation', score: 5, fullMark: 100 },
                { category: 'Strategic', score: 25, fullMark: 100 },
            ],
            alerts: [
                { id: 'R-001', type: 'Sanction Screen', severity: 'Low', date: '2 days ago', description: 'Potential name match in secondary database (False Positive likely).', status: 'Investigating' }
            ],
            geoExposure: [
                { region: 'North America', risk: 'Low' },
                { region: 'Europe', risk: 'Low' }
            ]
        },
        {
            id: '2',
            name: 'GreenLeaf Logistics',
            industry: 'Logistics',
            overallScore: 65,
            riskLevel: 'Medium',
            creditRating: 'BBB',
            trend: [
                { month: 'May', score: 75 }, { month: 'Jun', score: 72 }, { month: 'Jul', score: 68 },
                { month: 'Aug', score: 65 }, { month: 'Sep', score: 64 }, { month: 'Oct', score: 65 }
            ],
            categories: [
                { category: 'Financial', score: 45, fullMark: 100 },
                { category: 'Operational', score: 60, fullMark: 100 },
                { category: 'Legal', score: 30, fullMark: 100 },
                { category: 'Reputation', score: 20, fullMark: 100 },
                { category: 'Strategic', score: 40, fullMark: 100 },
            ],
            alerts: [
                { id: 'R-002', type: 'Credit Limit', severity: 'Medium', date: 'Yesterday', description: 'Utilization exceeded 85% of approved limit.', status: 'Active' },
                { id: 'R-003', type: 'Late Payment', severity: 'Medium', date: '3 days ago', description: 'Invoice INV-9921 overdue by 15 days.', status: 'Active' }
            ],
            geoExposure: [
                { region: 'North America', risk: 'Low' },
                { region: 'Asia Pacific', risk: 'Medium' }
            ]
        },
        {
            id: '3',
            name: 'Quantum Dynamics',
            industry: 'Manufacturing',
            overallScore: 42,
            riskLevel: 'High',
            creditRating: 'CC',
            trend: [
                { month: 'May', score: 60 }, { month: 'Jun', score: 55 }, { month: 'Jul', score: 45 },
                { month: 'Aug', score: 40 }, { month: 'Sep', score: 38 }, { month: 'Oct', score: 42 }
            ],
            categories: [
                { category: 'Financial', score: 85, fullMark: 100 },
                { category: 'Operational', score: 50, fullMark: 100 },
                { category: 'Legal', score: 70, fullMark: 100 },
                { category: 'Reputation', score: 40, fullMark: 100 },
                { category: 'Strategic', score: 60, fullMark: 100 },
            ],
            alerts: [
                { id: 'R-004', type: 'Legal Action', severity: 'Critical', date: 'Today', description: 'New litigation filed against subsidiary.', status: 'Active' },
                { id: 'R-005', type: 'Liquidity', severity: 'High', date: '1 week ago', description: 'Cash ratio dropped below threshold.', status: 'Active' }
            ],
            geoExposure: [
                { region: 'Global', risk: 'High' }
            ]
        }
    ];

    const [selectedCompany, setSelectedCompany] = useState<CompanyRiskProfile>(companies[0]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);

    const filteredCompanies = companies.filter(c => 
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelectCompany = (company: CompanyRiskProfile) => {
        setSelectedCompany(company);
        setSearchTerm("");
        setShowDropdown(false);
    };

    const getRiskColor = (level: string) => {
        switch(level) {
            case 'Low': return 'text-emerald-500';
            case 'Medium': return 'text-amber-500';
            case 'High': return 'text-red-500';
            case 'Critical': return 'text-red-600';
            default: return 'text-slate-500';
        }
    };

    const getRiskBg = (level: string) => {
        switch(level) {
            case 'Low': return 'bg-emerald-50 dark:bg-emerald-900/20';
            case 'Medium': return 'bg-amber-50 dark:bg-amber-900/20';
            case 'High': return 'bg-red-50 dark:bg-red-900/20';
            case 'Critical': return 'bg-red-100 dark:bg-red-900/40';
            default: return 'bg-slate-50 dark:bg-slate-800';
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
                        placeholder="Search company risk profile..." 
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

            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                     <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedCompany.name}</h2>
                     <p className="text-sm text-slate-500 dark:text-slate-400">Risk Assessment Dashboard</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
                    <Download size={16} /> Export Audit Report
                </button>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Overall Score Card */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
                    <div className="flex justify-between items-start z-10 relative">
                        <div>
                            <p className="text-xs font-bold uppercase text-slate-500 tracking-wider mb-1">Safety Score</p>
                            <h3 className={`text-4xl font-bold ${
                                selectedCompany.overallScore > 80 ? 'text-emerald-500' : 
                                selectedCompany.overallScore > 50 ? 'text-amber-500' : 'text-red-500'
                            }`}>{selectedCompany.overallScore}/100</h3>
                            <p className="text-xs text-slate-400 mt-2">Higher is safer</p>
                        </div>
                        <div className="h-16 w-16">
                            <ResponsiveContainer width="100%" height="100%">
                                <RePieChart>
                                    <Pie
                                        data={[{ value: selectedCompany.overallScore }, { value: 100 - selectedCompany.overallScore }]}
                                        cx="50%" cy="50%"
                                        innerRadius={20}
                                        outerRadius={35}
                                        startAngle={90}
                                        endAngle={-270}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        <Cell fill={selectedCompany.overallScore > 80 ? '#10b981' : selectedCompany.overallScore > 50 ? '#f59e0b' : '#ef4444'} />
                                        <Cell fill="#e2e8f0" />
                                    </Pie>
                                </RePieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Risk Level Card */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                        <div className={`p-2 rounded-lg ${getRiskBg(selectedCompany.riskLevel)}`}>
                            <AlertOctagon size={20} className={getRiskColor(selectedCompany.riskLevel)} />
                        </div>
                        <span className="text-xs font-bold uppercase text-slate-500">Risk Level</span>
                    </div>
                    <p className={`text-2xl font-bold ${getRiskColor(selectedCompany.riskLevel)}`}>{selectedCompany.riskLevel}</p>
                    <p className="text-xs text-slate-500 mt-1">Based on aggregated metrics</p>
                </div>

                {/* Credit Rating Card */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                            <ShieldCheck size={20} />
                        </div>
                        <span className="text-xs font-bold uppercase text-slate-500">Credit Rating</span>
                    </div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{selectedCompany.creditRating}</p>
                    <p className="text-xs text-slate-500 mt-1">External Bureau Data</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Risk Trend Chart */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col h-[350px]">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                            <Activity size={18} className="text-indigo-500" /> Score Trend
                        </h3>
                    </div>
                    <div className="flex-1 w-full min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={selectedCompany.trend}>
                                <defs>
                                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} domain={[0, 100]} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                    itemStyle={{ color: '#1e293b' }}
                                />
                                <Area type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Risk Categories Radar */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col h-[350px]">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                        <AlertTriangle size={18} className="text-amber-500" /> Risk Exposure
                    </h3>
                    <p className="text-xs text-slate-500 mb-4">Lower is better (closer to center)</p>
                    <div className="flex-1 w-full min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={selectedCompany.categories}>
                                <PolarGrid stroke="#e2e8f0" />
                                <PolarAngleAxis dataKey="category" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                <Radar
                                    name="Risk"
                                    dataKey="score"
                                    stroke="#f59e0b"
                                    strokeWidth={2}
                                    fill="#f59e0b"
                                    fillOpacity={0.4}
                                />
                                <Tooltip 
                                     contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                     itemStyle={{ color: '#1e293b' }}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Alerts List */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                        <ShieldAlert size={20} className="text-red-500" /> Active Alerts
                    </h3>
                </div>
                
                {selectedCompany.alerts.length > 0 ? (
                    <div className="space-y-3">
                        {selectedCompany.alerts.map((alert) => (
                            <div key={alert.id} className="flex items-start justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                <div className="flex items-start gap-4">
                                    <div className={`mt-1 p-2 rounded-lg ${getRiskBg(alert.severity)}`}>
                                        <AlertTriangle size={18} className={getRiskColor(alert.severity)} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase border ${
                                                alert.severity === 'Critical' ? 'bg-red-100 text-red-700 border-red-200' :
                                                alert.severity === 'High' ? 'bg-orange-100 text-orange-700 border-orange-200' :
                                                'bg-blue-100 text-blue-700 border-blue-200'
                                            }`}>
                                                {alert.severity}
                                            </span>
                                            <span className="font-bold text-slate-900 dark:text-white text-sm">{alert.type}</span>
                                        </div>
                                        <p className="text-sm text-slate-600 dark:text-slate-300">{alert.description}</p>
                                        <p className="text-xs text-slate-400 mt-1">{alert.date}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <span className={`text-xs font-bold ${
                                        alert.status === 'Active' ? 'text-red-500' : 'text-amber-500'
                                    }`}>
                                        {alert.status}
                                    </span>
                                    <button className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1">
                                        <Eye size={12} /> Investigate
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 text-slate-400 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-xl">
                        <ShieldCheck size={32} className="mx-auto mb-2 opacity-50 text-emerald-500" />
                        <p>No active risk alerts found.</p>
                    </div>
                )}
            </div>

            {/* Geo Exposure */}
             <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <Globe size={20} className="text-blue-500" /> Geographic Exposure
                </h3>
                <div className="flex flex-wrap gap-4">
                    {selectedCompany.geoExposure.map((geo, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700">
                            <Globe size={16} className="text-slate-400" />
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{geo.region}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                                geo.risk === 'Low' ? 'bg-emerald-100 text-emerald-700' :
                                geo.risk === 'Medium' ? 'bg-amber-100 text-amber-700' :
                                'bg-red-100 text-red-700'
                            }`}>{geo.risk} Risk</span>
                        </div>
                    ))}
                </div>
             </div>
        </div>
    );
};
