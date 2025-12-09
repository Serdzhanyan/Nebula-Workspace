
import React, { useState } from 'react';
import { ArrowLeft, Users, Wallet, ArrowRightLeft, Package, MessageSquare, BarChart3, ChevronDown, ChevronRight, Building, Shield, FileText, AlertTriangle, CheckCircle2, User, Globe, FileCheck, Briefcase, Key, ScrollText, CreditCard, Landmark, DollarSign, Clock, Stamp, FileSearch, AlertOctagon, Banknote, Search, Filter, Eye, Check, X, Percent, Smartphone, Layers, CreditCard as CardIcon, FileSpreadsheet, Plus, Settings, Inbox, MessageCircle, Flag, AlertCircle, FileInput, Bell, StickyNote, Download, TrendingUp, Activity, PieChart, Target, MapPin, Phone, Mail, Hash, Calendar, ArrowRight, Share2, FileCode, Database, TrendingDown, History, FileDiff } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, AreaChart, Area, PieChart as RePieChart, Pie, Cell, Legend } from 'recharts';

interface SMEPageProps {
  onBack: () => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ElementType;
  children?: { id: string; label: string }[];
}

export const SMEPage: React.FC<SMEPageProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('clients');
  const [activeSubTab, setActiveSubTab] = useState('overview');
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['clients']);
  const [clientSearch, setClientSearch] = useState("");
  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);

  // Mock Companies Data
  const companies = [
    { 
      id: '1', 
      name: 'TechNova Solutions Ltd.', 
      tin: '99281-XC', 
      joined: 'Oct 2021', 
      status: 'Active', 
      risk: 'Low', 
      industry: 'Technology', 
      employees: 120, 
      revenue: '$4.2M',
      address: '123 Innovation Blvd, Tech Park, CA',
      phone: '+1 (555) 010-2020',
      email: 'info@technova.io',
      website: 'technova.io',
      ceo: 'Sarah Jenkins',
      legalStructure: 'Corporation',
      description: 'TechNova provides cutting-edge cloud infrastructure solutions for enterprise clients, specializing in scalable microservices architecture and high-security data storage.',
      shareholders: [
          { name: 'Sarah Jenkins', type: 'Individual', share: 45, role: 'CEO & Founder' },
          { name: 'Marcus Thorne', type: 'Individual', share: 30, role: 'CTO' },
          { name: 'Venture Capital X', type: 'Entity', share: 25, role: 'Investor' }
      ],
      kyc: {
          status: 'Verified',
          lastCheck: 'Oct 15, 2024',
          nextReview: 'Oct 15, 2025',
          amlStatus: 'Clear',
          riskScore: 12,
          documents: [
              { name: 'Certificate of Incorporation', status: 'Approved', date: 'Oct 12, 2024' },
              { name: 'Articles of Association', status: 'Approved', date: 'Oct 12, 2024' },
              { name: 'Proof of Address', status: 'Approved', date: 'Oct 13, 2024' }
          ]
      },
      changeHistory: [
          { id: 'ch1', type: 'Address Change', date: 'Aug 10, 2024', status: 'Approved', oldValue: '45 Old Rd', newValue: '123 Innovation Blvd', requestor: 'Sarah Jenkins' },
          { id: 'ch2', type: 'Director Appointment', date: 'Jul 22, 2024', status: 'Approved', oldValue: '-', newValue: 'Marcus Thorne', requestor: 'Legal Dept' },
          { id: 'ch3', type: 'Share Capital Increase', date: 'Jan 15, 2024', status: 'Approved', oldValue: '10000', newValue: '50000', requestor: 'Sarah Jenkins' }
      ]
    },
    { 
      id: '2', 
      name: 'GreenLeaf Logistics', 
      tin: '88123-GL', 
      joined: 'Mar 2020', 
      status: 'Active', 
      risk: 'Medium', 
      industry: 'Logistics', 
      employees: 450, 
      revenue: '$12.5M',
      address: '456 Supply Chain Rd, Chicago, IL',
      phone: '+1 (555) 300-4000',
      email: 'ops@greenleaf.com',
      website: 'greenleaf.com',
      ceo: 'Michael Chen',
      legalStructure: 'LLC',
      description: 'Sustainable logistics and supply chain management services for retail chains. Focusing on carbon-neutral shipping methods.',
      shareholders: [
          { name: 'Michael Chen', type: 'Individual', share: 100, role: 'Sole Proprietor' }
      ],
      kyc: {
          status: 'Verified',
          lastCheck: 'Jan 20, 2024',
          nextReview: 'Jan 20, 2025',
          amlStatus: 'Clear',
          riskScore: 25,
          documents: [
              { name: 'Business License', status: 'Approved', date: 'Jan 15, 2024' },
              { name: 'Tax Registration', status: 'Approved', date: 'Jan 15, 2024' }
          ]
      },
      changeHistory: [
          { id: 'ch4', type: 'Trade Name Update', date: 'Sep 05, 2023', status: 'Approved', oldValue: 'GL Transport', newValue: 'GreenLeaf Logistics', requestor: 'Michael Chen' }
      ]
    },
    { 
      id: '3', 
      name: 'Quantum Finance Group', 
      tin: '77456-QF', 
      joined: 'Jan 2022', 
      status: 'Review', 
      risk: 'High', 
      industry: 'Finance', 
      employees: 85, 
      revenue: '$8.9M',
      address: '88 Wall St, New York, NY',
      phone: '+1 (555) 999-8888',
      email: 'contact@quantumfi.com',
      website: 'quantumfi.com',
      ceo: 'Amanda Waller',
      legalStructure: 'Partnership',
      description: 'High-frequency trading algorithms and quantitative analysis for institutional investors.',
      shareholders: [
          { name: 'Amanda Waller', type: 'Individual', share: 40, role: 'Partner' },
          { name: 'David Kim', type: 'Individual', share: 40, role: 'Partner' },
          { name: 'Global Holdings Inc.', type: 'Entity', share: 20, role: 'Silent Partner' }
      ],
      kyc: {
          status: 'Pending',
          lastCheck: 'Oct 26, 2024',
          nextReview: 'N/A',
          amlStatus: 'Flagged',
          riskScore: 78,
          documents: [
              { name: 'Partnership Agreement', status: 'Under Review', date: 'Oct 25, 2024' },
              { name: 'Source of Funds', status: 'Pending', date: '-' }
          ]
      },
      changeHistory: [
          { id: 'ch5', type: 'UBO Update', date: 'Oct 25, 2024', status: 'Pending', oldValue: '-', newValue: 'Global Holdings Inc.', requestor: 'Compliance Officer' },
          { id: 'ch6', type: 'Address Change', date: 'Jan 10, 2023', status: 'Approved', oldValue: '12 Broad St', newValue: '88 Wall St', requestor: 'David Kim' }
      ]
    },
    { 
      id: '4', 
      name: 'BlueSky Retailers', 
      tin: '55901-BS', 
      joined: 'Jun 2019', 
      status: 'Active', 
      risk: 'Low', 
      industry: 'Retail', 
      employees: 300, 
      revenue: '$22.1M',
      address: '77 Market St, Austin, TX',
      phone: '+1 (555) 222-3333',
      email: 'sales@bluesky.com',
      website: 'bluesky.com',
      ceo: 'David Miller',
      legalStructure: 'Corporation',
      description: 'Nationwide chain of outdoor and lifestyle retail stores.',
      shareholders: [
          { name: 'David Miller', type: 'Individual', share: 51, role: 'Chairman' },
          { name: 'Public Shares', type: 'Public', share: 49, role: 'Stockholders' }
      ],
      kyc: {
          status: 'Verified',
          lastCheck: 'Jun 01, 2024',
          nextReview: 'Jun 01, 2025',
          amlStatus: 'Clear',
          riskScore: 5,
          documents: [
              { name: 'Annual Report', status: 'Approved', date: 'May 20, 2024' }
          ]
      },
      changeHistory: []
    },
    { 
      id: '5', 
      name: 'SolarEdge Energy', 
      tin: '33211-SE', 
      joined: 'Nov 2023', 
      status: 'Pending', 
      risk: 'Medium', 
      industry: 'Energy', 
      employees: 50, 
      revenue: '$1.2M',
      address: '101 Sun Dr, Phoenix, AZ',
      phone: '+1 (555) 444-5555',
      email: 'support@solaredge.com',
      website: 'solaredge.com',
      ceo: 'Elena Rodriguez',
      legalStructure: 'LLC',
      description: 'Residential solar panel installation and maintenance services.',
      shareholders: [
          { name: 'Elena Rodriguez', type: 'Individual', share: 60, role: 'Founder' },
          { name: 'Green Fund', type: 'Entity', share: 40, role: 'Investor' }
      ],
      kyc: {
          status: 'In Progress',
          lastCheck: 'Nov 01, 2023',
          nextReview: 'N/A',
          amlStatus: 'Clear',
          riskScore: 35,
          documents: [
              { name: 'Operating Agreement', status: 'Approved', date: 'Nov 01, 2023' },
              { name: 'Utility Licenses', status: 'Pending', date: '-' }
          ]
      },
      changeHistory: [
           { id: 'ch7', type: 'Initial Registration', date: 'Nov 01, 2023', status: 'Approved', oldValue: '-', newValue: 'New Registration', requestor: 'System' }
      ]
    },
  ];

  const [selectedCompany, setSelectedCompany] = useState(companies[0]);

  const menuItems: MenuItem[] = [
    { 
      id: 'clients', 
      label: 'Client Management', 
      icon: Users,
      children: [
        { id: 'overview', label: 'Company Profile' },
        { id: 'ownership', label: 'Ownership Structure' },
        { id: 'kyc', label: 'KYC/KYB Checks' },
        { id: 'financials', label: 'Financial Profile' },
        { id: 'changes', label: 'Change Info' },
        { id: 'directors', label: 'Change Director' },
        { id: 'beneficiaries', label: 'Confirm Beneficiaries' },
        { id: 'documents', label: 'Document Updates' },
        { id: 'representatives', label: 'Auth Representatives' },
        { id: 'poa', label: 'Powers of Attorney' },
        { id: 'risks', label: 'Risks & Scoring' },
      ]
    },
    { 
      id: 'cash', 
      label: 'Cash Management', 
      icon: Wallet,
      children: [
        { id: 'overview', label: 'Dashboard' },
        { id: 'applications', label: 'Account Applications' },
        { id: 'accounts', label: 'Open/Close Accounts' },
        { id: 'statuses', label: 'Processing Statuses' },
        { id: 'verification', label: 'Document Verification' },
        { id: 'approvals', label: 'Legal Approvals' },
        { id: 'licenses', label: 'License & Permit Info' },
      ]
    },
    { 
      id: 'payments', 
      label: 'Payments & Settlements', 
      icon: ArrowRightLeft,
      children: [
        { id: 'overview', label: 'Overview' },
        { id: 'verification', label: 'Outgoing Verification' },
        { id: 'aml', label: 'AML Checks' },
        { id: 'refunds', label: 'Refunds & Clarifications' },
        { id: 'monitoring', label: 'Suspicious Monitoring' },
        { id: 'mass', label: 'Mass Payment Processing' },
        { id: 'suspicious_manual', label: 'Manual Suspicious Verify' },
        { id: 'large', label: 'Large Payment Confirm' },
        { id: 'docs', label: 'Transaction Docs' },
        { id: 'fraud', label: 'Fraud Alerts' },
      ]
    },
    { 
      id: 'products', 
      label: 'Product Service', 
      icon: Package,
      children: [
        { id: 'overview', label: 'Overview' },
        { id: 'loans', label: 'SME Loans' },
        { id: 'tariffs', label: 'Tariffs & Packages' },
        { id: 'acquiring', label: 'Acquiring / QR' },
        { id: 'online_banking', label: 'Online Banking' },
        { id: 'payroll', label: 'Payroll Projects' },
        { id: 'limits', label: 'Change Limits' },
        { id: 'services', label: 'Extra Services' },
        { id: 'factoring', label: 'Factoring' },
        { id: 'leasing', label: 'Leasing' },
        { id: 'deposits', label: 'Deposits' },
        { id: 'cards', label: 'Business Cards' },
        { id: 'plans', label: 'Tariff Plans' },
        { id: 'contracts', label: 'Contract History' },
      ]
    },
    { 
      id: 'requests', 
      label: 'Requests & Appeals', 
      icon: MessageSquare,
      children: [
        { id: 'overview', label: 'Overview' },
        { id: 'company_requests', label: 'Company Requests' },
        { id: 'approvals', label: 'Change Approvals' },
        { id: 'tariff_changes', label: 'Tariff Change Requests' },
        { id: 'complaints', label: 'Complaints' },
        { id: 'escalations', label: 'Escalations' },
        { id: 'correspondence', label: 'Client Correspondence' },
        { id: 'doc_requests', label: 'Document Requests' },
        { id: 'reminders', label: 'Data Update Reminders' },
        { id: 'notes', label: 'Comments & Notes' },
      ]
    },
    { 
      id: 'analytics', 
      label: 'Analytics & Reports', 
      icon: BarChart3,
      children: [
        { id: 'overview', label: 'Overview' },
        { id: 'activity', label: 'Account Activity' },
        { id: 'profitability', label: 'Client Profitability' },
        { id: 'risks', label: 'Risks' },
        { id: 'incidents', label: 'Incident Frequency' },
      ]
    },
  ];

  const toggleMenu = (id: string) => {
    if (expandedMenus.includes(id)) {
      setExpandedMenus(expandedMenus.filter(m => m !== id));
    } else {
      setExpandedMenus([...expandedMenus, id]);
    }
    setActiveTab(id);
    // Reset subtab to overview if clicking parent
    if (['clients', 'cash', 'payments', 'products', 'requests', 'analytics'].includes(id)) setActiveSubTab('overview');
  };

  const handleSubMenuClick = (parentId: string, subId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveTab(parentId);
    setActiveSubTab(subId);
  };

  // Filter companies for dropdown
  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(clientSearch.toLowerCase()) || 
    c.tin.toLowerCase().includes(clientSearch.toLowerCase())
  );

  // Mock data for charts
  const revenueData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 4500 },
    { name: 'May', value: 6000 },
    { name: 'Jun', value: 5500 },
  ];

  const expenseData = [
      { name: 'Payroll', value: 45, color: '#6366f1' },
      { name: 'Operations', value: 25, color: '#10b981' },
      { name: 'Marketing', value: 20, color: '#f59e0b' },
      { name: 'R&D', value: 10, color: '#ef4444' },
  ];

  return (
    <div className="flex h-full bg-slate-50 dark:bg-slate-950 animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Sidebar */}
      <div className="w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col flex-shrink-0">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
             <button 
                onClick={onBack} 
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
             >
                <ArrowLeft size={20} />
             </button>
             <span className="font-bold text-lg text-slate-900 dark:text-white">SME Portal</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
                const isExpanded = expandedMenus.includes(item.id);
                const isActive = activeTab === item.id;
                const hasChildren = item.children && item.children.length > 0;

                return (
                    <div key={item.id} className="mb-1">
                        <button
                            onClick={() => toggleMenu(item.id)}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                                isActive && !hasChildren
                                ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300 shadow-sm' 
                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <item.icon size={18} className={isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 group-hover:text-slate-600'} />
                                {item.label}
                            </div>
                            {hasChildren && (
                                <div className="text-slate-400">
                                    {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                </div>
                            )}
                        </button>

                        {hasChildren && isExpanded && (
                            <div className="ml-4 mt-1 border-l border-slate-100 dark:border-slate-800 pl-2 space-y-1">
                                {item.children?.map(child => (
                                    <button
                                        key={child.id}
                                        onClick={(e) => handleSubMenuClick(item.id, child.id, e)}
                                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left ${
                                            activeSubTab === child.id
                                            ? 'bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400'
                                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                                        }`}
                                    >
                                        <div className={`w-1.5 h-1.5 rounded-full ${activeSubTab === child.id ? 'bg-indigo-500' : 'bg-slate-300 dark:bg-slate-600'}`}></div>
                                        {child.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-400 text-center">
            SME Module v1.0
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-slate-50 dark:bg-slate-950 relative">
        <div className="flex-1 overflow-y-auto p-8 relative z-10">
            
            {/* CLIENT MANAGEMENT VIEW */}
            {activeTab === 'clients' && (
                <div className="space-y-6 max-w-7xl mx-auto">
                    {/* Header */}
                    <header className="mb-6">
                        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-2">
                             <span>Client Management</span>
                             <ChevronRight size={14} />
                             <span className="text-slate-900 dark:text-white font-medium">
                                {menuItems.find(m => m.id === 'clients')?.children?.find(c => c.id === activeSubTab)?.label}
                             </span>
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                            {activeSubTab === 'overview' ? selectedCompany.name : 
                             activeSubTab === 'ownership' ? `Ownership: ${selectedCompany.name}` :
                             activeSubTab === 'kyc' ? `KYC/KYB: ${selectedCompany.name}` :
                             activeSubTab === 'financials' ? `Financials: ${selectedCompany.name}` :
                             activeSubTab === 'changes' ? `Change History: ${selectedCompany.name}` :
                             menuItems.find(m => m.id === 'clients')?.children?.find(c => c.id === activeSubTab)?.label}
                        </h1>
                        {(['overview', 'ownership', 'kyc', 'financials', 'changes'].includes(activeSubTab)) && (
                             <p className="text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-1">
                                <span className={`text-xs px-2 py-0.5 rounded font-bold uppercase ${
                                    selectedCompany.status === 'Active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 
                                    selectedCompany.status === 'Pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                                    'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                }`}>
                                    {selectedCompany.status}
                                </span>
                                <span>• ID: {selectedCompany.tin}</span>
                                {activeSubTab === 'overview' && <span>• Since {selectedCompany.joined}</span>}
                             </p>
                        )}
                    </header>

                    {/* Content Switcher */}
                    {activeSubTab === 'overview' && (
                        <div className="space-y-6">
                             {/* Search Bar */}
                             <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-4 items-center z-20 relative">
                                <div className="relative flex-1 w-full">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input 
                                        type="text" 
                                        placeholder="Find company by Name, TIN, or ID..." 
                                        value={clientSearch}
                                        onChange={(e) => {
                                            setClientSearch(e.target.value);
                                            setShowCompanyDropdown(true);
                                        }}
                                        onFocus={() => setShowCompanyDropdown(true)}
                                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                                    />

                                    {/* Company Dropdown */}
                                    {showCompanyDropdown && (
                                        <>
                                            <div className="fixed inset-0 z-10" onClick={() => setShowCompanyDropdown(false)}></div>
                                            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-20 max-h-60 overflow-y-auto">
                                                {filteredCompanies.length > 0 ? (
                                                    filteredCompanies.map(company => (
                                                        <button
                                                            key={company.id}
                                                            onClick={() => {
                                                                setSelectedCompany(company);
                                                                setClientSearch(company.name);
                                                                setShowCompanyDropdown(false);
                                                            }}
                                                            className="w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors border-b border-slate-100 dark:border-slate-700 last:border-0 flex justify-between items-center group"
                                                        >
                                                            <div>
                                                                <p className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{company.name}</p>
                                                                <p className="text-xs text-slate-500">{company.tin} • {company.industry}</p>
                                                            </div>
                                                            {selectedCompany.id === company.id && <Check size={16} className="text-indigo-600" />}
                                                        </button>
                                                    ))
                                                ) : (
                                                    <div className="p-4 text-center text-slate-500 text-sm">No companies found</div>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div className="flex gap-2 w-full md:w-auto">
                                    <button className="flex-1 md:flex-none px-6 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm">
                                        Search
                                    </button>
                                    <button className="px-3 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                                        <Filter size={18} />
                                    </button>
                                </div>
                             </div>

                             {/* Stats */}
                             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wide">Risk Level</p>
                                    <p className={`text-lg font-bold flex items-center gap-2 mt-1 ${
                                        selectedCompany.risk === 'Low' ? 'text-emerald-600 dark:text-emerald-400' : 
                                        selectedCompany.risk === 'Medium' ? 'text-amber-600 dark:text-amber-400' : 
                                        'text-red-600 dark:text-red-400'
                                    }`}>
                                        <Shield size={18} /> {selectedCompany.risk}
                                    </p>
                                </div>
                                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wide">Industry</p>
                                    <p className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mt-1">
                                        <Building size={18} className="text-slate-400" /> {selectedCompany.industry}
                                    </p>
                                </div>
                                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wide">Employees</p>
                                    <p className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mt-1">
                                        <Users size={18} className="text-slate-400" /> {selectedCompany.employees}
                                    </p>
                                </div>
                                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wide">Est. Revenue</p>
                                    <p className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mt-1">
                                        <Banknote size={18} className="text-slate-400" /> {selectedCompany.revenue}
                                    </p>
                                </div>
                             </div>

                             {/* Detailed Profile View */}
                             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Left Column: Core Info */}
                                <div className="lg:col-span-2 space-y-6">
                                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Company Overview</h3>
                                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm mb-6">
                                            {selectedCompany.description || 'No description available for this company.'}
                                        </p>
                                        
                                        <div className="grid grid-cols-2 gap-6">
                                            <div>
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1">Legal Name</label>
                                                <p className="font-medium text-slate-900 dark:text-white">{selectedCompany.name}</p>
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1">Legal Structure</label>
                                                <p className="font-medium text-slate-900 dark:text-white">{selectedCompany.legalStructure || 'Corporation'}</p>
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1">Tax ID (TIN)</label>
                                                <p className="font-medium text-slate-900 dark:text-white font-mono">{selectedCompany.tin}</p>
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1">Incorporation Date</label>
                                                <p className="font-medium text-slate-900 dark:text-white">{selectedCompany.joined}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Contact Information</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                                             <div className="flex items-center gap-3">
                                                <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500"><MapPin size={18} /></div>
                                                <div>
                                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block">Address</label>
                                                    <p className="text-sm text-slate-900 dark:text-white">{selectedCompany.address || 'Not Provided'}</p>
                                                </div>
                                             </div>
                                             <div className="flex items-center gap-3">
                                                <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500"><Phone size={18} /></div>
                                                <div>
                                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block">Phone</label>
                                                    <p className="text-sm text-slate-900 dark:text-white">{selectedCompany.phone || 'N/A'}</p>
                                                </div>
                                             </div>
                                             <div className="flex items-center gap-3">
                                                <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500"><Mail size={18} /></div>
                                                <div>
                                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block">Email</label>
                                                    <p className="text-sm text-slate-900 dark:text-white">{selectedCompany.email || 'N/A'}</p>
                                                </div>
                                             </div>
                                             <div className="flex items-center gap-3">
                                                <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500"><Globe size={18} /></div>
                                                <div>
                                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block">Website</label>
                                                    <p className="text-sm text-indigo-600 dark:text-indigo-400">{selectedCompany.website || 'N/A'}</p>
                                                </div>
                                             </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column: Key People & Banking */}
                                <div className="lg:col-span-1 space-y-6">
                                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                                         <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Key Personnel</h3>
                                         <div className="flex items-center gap-4 mb-4">
                                            <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 font-bold">
                                                {selectedCompany.ceo ? selectedCompany.ceo.charAt(0) : 'C'}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900 dark:text-white">{selectedCompany.ceo || 'CEO Name'}</p>
                                                <p className="text-xs text-slate-500">Chief Executive Officer</p>
                                            </div>
                                         </div>
                                         <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
                                             <button className="text-sm text-indigo-600 dark:text-indigo-400 font-medium hover:underline flex items-center gap-1">
                                                View Organizational Chart <ArrowRight size={14} />
                                             </button>
                                         </div>
                                    </div>

                                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 shadow-lg">
                                         <div className="flex justify-between items-start mb-6">
                                             <h3 className="font-bold text-lg">Primary Account</h3>
                                             <Landmark size={20} className="text-slate-400" />
                                         </div>
                                         <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Account Number</p>
                                         <p className="font-mono text-xl mb-4 tracking-wider">**** **** **** 8821</p>
                                         
                                         <div className="flex justify-between items-end">
                                             <div>
                                                 <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Balance</p>
                                                 <p className="font-bold text-2xl">$1,240,500.00</p>
                                             </div>
                                             <span className="bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded text-xs font-bold">Active</span>
                                         </div>
                                    </div>
                                </div>
                             </div>
                        </div>
                    )}

                    {/* Ownership Structure */}
                    {activeSubTab === 'ownership' && (
                        <div className="space-y-6">
                             {/* Search Bar */}
                             <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-4 items-center z-20 relative">
                                <div className="relative flex-1 w-full">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input 
                                        type="text" 
                                        placeholder="Find company to view ownership..." 
                                        value={clientSearch}
                                        onChange={(e) => {
                                            setClientSearch(e.target.value);
                                            setShowCompanyDropdown(true);
                                        }}
                                        onFocus={() => setShowCompanyDropdown(true)}
                                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                                    />

                                    {/* Company Dropdown */}
                                    {showCompanyDropdown && (
                                        <>
                                            <div className="fixed inset-0 z-10" onClick={() => setShowCompanyDropdown(false)}></div>
                                            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-20 max-h-60 overflow-y-auto">
                                                {filteredCompanies.length > 0 ? (
                                                    filteredCompanies.map(company => (
                                                        <button
                                                            key={company.id}
                                                            onClick={() => {
                                                                setSelectedCompany(company);
                                                                setClientSearch(company.name);
                                                                setShowCompanyDropdown(false);
                                                            }}
                                                            className="w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors border-b border-slate-100 dark:border-slate-700 last:border-0 flex justify-between items-center group"
                                                        >
                                                            <div>
                                                                <p className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{company.name}</p>
                                                                <p className="text-xs text-slate-500">{company.tin} • {company.industry}</p>
                                                            </div>
                                                            {selectedCompany.id === company.id && <Check size={16} className="text-indigo-600" />}
                                                        </button>
                                                    ))
                                                ) : (
                                                    <div className="p-4 text-center text-slate-500 text-sm">No companies found</div>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>
                             </div>

                             <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                                 <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                     <Share2 size={20} className="text-indigo-500" /> Shareholder Structure
                                 </h3>

                                 {selectedCompany.shareholders && selectedCompany.shareholders.length > 0 ? (
                                     <div className="space-y-6">
                                         {/* Simple Visual Bar */}
                                         <div className="h-8 w-full rounded-full overflow-hidden flex bg-slate-100 dark:bg-slate-800">
                                            {selectedCompany.shareholders.map((holder, idx) => (
                                                <div 
                                                    key={idx} 
                                                    className={`h-full border-r border-white dark:border-slate-900 last:border-0 flex items-center justify-center text-[10px] font-bold text-white relative group`}
                                                    style={{ width: `${holder.share}%`, backgroundColor: ['#6366f1', '#10b981', '#f59e0b', '#ec4899'][idx % 4] }}
                                                >
                                                    <span className="truncate px-2">{holder.share}%</span>
                                                    <div className="absolute bottom-full mb-2 bg-slate-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                                                        {holder.name} ({holder.share}%)
                                                    </div>
                                                </div>
                                            ))}
                                         </div>

                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {selectedCompany.shareholders.map((holder, idx) => (
                                                <div key={idx} className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold`} style={{ backgroundColor: ['#6366f1', '#10b981', '#f59e0b', '#ec4899'][idx % 4] }}>
                                                            {holder.name.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-sm text-slate-900 dark:text-white">{holder.name}</p>
                                                            <p className="text-xs text-slate-500">{holder.role || 'Shareholder'} • {holder.type}</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="text-lg font-bold text-slate-900 dark:text-white">{holder.share}%</span>
                                                        <p className="text-[10px] text-slate-400 uppercase tracking-wide">Ownership</p>
                                                    </div>
                                                </div>
                                            ))}
                                         </div>

                                         <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
                                            <button className="text-sm text-indigo-600 dark:text-indigo-400 font-medium hover:underline flex items-center gap-2">
                                                <FileSearch size={16} /> View Beneficiary Documents
                                            </button>
                                         </div>
                                     </div>
                                 ) : (
                                     <div className="text-center py-12 text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
                                         <Users size={32} className="mx-auto mb-2 opacity-50" />
                                         <p>No ownership data available for this company.</p>
                                     </div>
                                 )}
                             </div>
                        </div>
                    )}
                    
                    {/* KYC/KYB Checks */}
                    {activeSubTab === 'kyc' && (
                        <div className="space-y-6">
                            {/* Search Bar */}
                             <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-4 items-center z-20 relative">
                                <div className="relative flex-1 w-full">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input 
                                        type="text" 
                                        placeholder="Find company to check KYC/KYB status..." 
                                        value={clientSearch}
                                        onChange={(e) => {
                                            setClientSearch(e.target.value);
                                            setShowCompanyDropdown(true);
                                        }}
                                        onFocus={() => setShowCompanyDropdown(true)}
                                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                                    />

                                    {/* Company Dropdown */}
                                    {showCompanyDropdown && (
                                        <>
                                            <div className="fixed inset-0 z-10" onClick={() => setShowCompanyDropdown(false)}></div>
                                            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-20 max-h-60 overflow-y-auto">
                                                {filteredCompanies.length > 0 ? (
                                                    filteredCompanies.map(company => (
                                                        <button
                                                            key={company.id}
                                                            onClick={() => {
                                                                setSelectedCompany(company);
                                                                setClientSearch(company.name);
                                                                setShowCompanyDropdown(false);
                                                            }}
                                                            className="w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors border-b border-slate-100 dark:border-slate-700 last:border-0 flex justify-between items-center group"
                                                        >
                                                            <div>
                                                                <p className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{company.name}</p>
                                                                <p className="text-xs text-slate-500">{company.tin} • {company.industry}</p>
                                                            </div>
                                                            {selectedCompany.id === company.id && <Check size={16} className="text-indigo-600" />}
                                                        </button>
                                                    ))
                                                ) : (
                                                    <div className="p-4 text-center text-slate-500 text-sm">No companies found</div>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>
                             </div>

                             {/* KYC Dashboard */}
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                 {/* Status Card */}
                                 <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                                     <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                         <FileCheck size={20} className="text-emerald-500" /> Verification Status
                                     </h3>
                                     
                                     <div className="flex items-center gap-4 mb-6">
                                         <div className={`w-16 h-16 rounded-full flex items-center justify-center border-4 text-2xl font-bold ${
                                             selectedCompany.kyc?.status === 'Verified' ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20' :
                                             selectedCompany.kyc?.status === 'Pending' ? 'border-amber-500 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20' :
                                             'border-red-500 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20'
                                         }`}>
                                             {selectedCompany.kyc?.status === 'Verified' ? <Check size={32} /> : 
                                              selectedCompany.kyc?.status === 'Pending' ? <Clock size={32} /> : <AlertTriangle size={32} />}
                                         </div>
                                         <div>
                                             <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Overall Status</p>
                                             <h4 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedCompany.kyc?.status || 'Unknown'}</h4>
                                         </div>
                                     </div>

                                     <div className="space-y-4">
                                         <div className="flex justify-between items-center text-sm p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
                                             <span className="text-slate-600 dark:text-slate-300">AML Screening</span>
                                             <span className={`font-bold ${selectedCompany.kyc?.amlStatus === 'Clear' ? 'text-emerald-500' : 'text-red-500'}`}>
                                                 {selectedCompany.kyc?.amlStatus}
                                             </span>
                                         </div>
                                         <div className="flex justify-between items-center text-sm p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
                                             <span className="text-slate-600 dark:text-slate-300">Risk Score</span>
                                             <div className="flex items-center gap-2">
                                                 <div className="w-24 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                                     <div className={`h-full ${selectedCompany.kyc?.riskScore < 30 ? 'bg-emerald-500' : selectedCompany.kyc?.riskScore < 70 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${selectedCompany.kyc?.riskScore}%` }}></div>
                                                 </div>
                                                 <span className="font-bold text-slate-900 dark:text-white">{selectedCompany.kyc?.riskScore || 0}/100</span>
                                             </div>
                                         </div>
                                         <div className="flex justify-between items-center text-sm p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
                                             <span className="text-slate-600 dark:text-slate-300">Last Checked</span>
                                             <span className="font-medium text-slate-900 dark:text-white">{selectedCompany.kyc?.lastCheck || 'Never'}</span>
                                         </div>
                                         <div className="flex justify-between items-center text-sm p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
                                             <span className="text-slate-600 dark:text-slate-300">Next Review</span>
                                             <span className="font-medium text-slate-900 dark:text-white">{selectedCompany.kyc?.nextReview || 'N/A'}</span>
                                         </div>
                                     </div>
                                 </div>

                                 {/* Documents Card */}
                                 <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col">
                                     <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                         <FileText size={20} className="text-blue-500" /> Required Documents
                                     </h3>
                                     
                                     <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                                         {selectedCompany.kyc?.documents?.map((doc: any, i: number) => (
                                             <div key={i} className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                                 <div className="flex items-center gap-3">
                                                     <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500">
                                                         <FileCode size={18} />
                                                     </div>
                                                     <div>
                                                         <p className="font-bold text-sm text-slate-900 dark:text-white">{doc.name}</p>
                                                         <p className="text-xs text-slate-500">{doc.date !== '-' ? `Uploaded: ${doc.date}` : 'Not uploaded'}</p>
                                                     </div>
                                                 </div>
                                                 <span className={`text-[10px] font-bold px-2 py-1 rounded border uppercase ${
                                                     doc.status === 'Approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800' :
                                                     doc.status === 'Pending' ? 'bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700' :
                                                     'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800'
                                                 }`}>
                                                     {doc.status}
                                                 </span>
                                             </div>
                                         ))}
                                         {(!selectedCompany.kyc?.documents || selectedCompany.kyc.documents.length === 0) && (
                                             <div className="text-center py-8 text-slate-400 text-sm">No documents found.</div>
                                         )}
                                     </div>

                                     <button className="w-full py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm flex items-center justify-center gap-2">
                                         <FileInput size={16} /> Request Document Update
                                     </button>
                                 </div>
                             </div>

                             {/* Database Checks Log */}
                             <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                                 <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                     <Database size={20} className="text-purple-500" /> Screening Logs
                                 </h3>
                                 <div className="overflow-x-auto">
                                     <table className="w-full text-left text-sm">
                                         <thead>
                                             <tr className="border-b border-slate-100 dark:border-slate-700 text-xs font-bold text-slate-500 uppercase">
                                                 <th className="pb-3 pl-2">Check Type</th>
                                                 <th className="pb-3">Date</th>
                                                 <th className="pb-3">Provider</th>
                                                 <th className="pb-3">Result</th>
                                                 <th className="pb-3 text-right pr-2">Reference</th>
                                             </tr>
                                         </thead>
                                         <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                                             <tr className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                                 <td className="py-3 pl-2 font-medium text-slate-900 dark:text-white">UBO Identification</td>
                                                 <td className="py-3 text-slate-500">{selectedCompany.kyc?.lastCheck}</td>
                                                 <td className="py-3 text-slate-500">Internal</td>
                                                 <td className="py-3"><span className="text-emerald-500 font-bold flex items-center gap-1"><CheckCircle2 size={12} /> Passed</span></td>
                                                 <td className="py-3 text-right pr-2 font-mono text-xs text-slate-400">REF-8821</td>
                                             </tr>
                                             <tr className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                                 <td className="py-3 pl-2 font-medium text-slate-900 dark:text-white">Global Sanctions List</td>
                                                 <td className="py-3 text-slate-500">{selectedCompany.kyc?.lastCheck}</td>
                                                 <td className="py-3 text-slate-500">LexisNexis</td>
                                                 <td className="py-3">
                                                     {selectedCompany.kyc?.amlStatus === 'Clear' ? (
                                                         <span className="text-emerald-500 font-bold flex items-center gap-1"><CheckCircle2 size={12} /> Clear</span>
                                                     ) : (
                                                         <span className="text-red-500 font-bold flex items-center gap-1"><AlertOctagon size={12} /> Match Found</span>
                                                     )}
                                                 </td>
                                                 <td className="py-3 text-right pr-2 font-mono text-xs text-slate-400">LN-9920</td>
                                             </tr>
                                             <tr className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                                 <td className="py-3 pl-2 font-medium text-slate-900 dark:text-white">Adverse Media</td>
                                                 <td className="py-3 text-slate-500">{selectedCompany.kyc?.lastCheck}</td>
                                                 <td className="py-3 text-slate-500">Google API</td>
                                                 <td className="py-3"><span className="text-emerald-500 font-bold flex items-center gap-1"><CheckCircle2 size={12} /> No Hits</span></td>
                                                 <td className="py-3 text-right pr-2 font-mono text-xs text-slate-400">GOOG-121</td>
                                             </tr>
                                         </tbody>
                                     </table>
                                 </div>
                             </div>
                        </div>
                    )}
                    
                    {/* Financial Profile */}
                    {activeSubTab === 'financials' && (
                         <div className="space-y-6">
                             {/* Search Bar */}
                             <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-4 items-center z-20 relative">
                                <div className="relative flex-1 w-full">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input 
                                        type="text" 
                                        placeholder="Find company to view financial profile..." 
                                        value={clientSearch}
                                        onChange={(e) => {
                                            setClientSearch(e.target.value);
                                            setShowCompanyDropdown(true);
                                        }}
                                        onFocus={() => setShowCompanyDropdown(true)}
                                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                                    />

                                    {/* Company Dropdown */}
                                    {showCompanyDropdown && (
                                        <>
                                            <div className="fixed inset-0 z-10" onClick={() => setShowCompanyDropdown(false)}></div>
                                            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-20 max-h-60 overflow-y-auto">
                                                {filteredCompanies.length > 0 ? (
                                                    filteredCompanies.map(company => (
                                                        <button
                                                            key={company.id}
                                                            onClick={() => {
                                                                setSelectedCompany(company);
                                                                setClientSearch(company.name);
                                                                setShowCompanyDropdown(false);
                                                            }}
                                                            className="w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors border-b border-slate-100 dark:border-slate-700 last:border-0 flex justify-between items-center group"
                                                        >
                                                            <div>
                                                                <p className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{company.name}</p>
                                                                <p className="text-xs text-slate-500">{company.tin} • {company.industry}</p>
                                                            </div>
                                                            {selectedCompany.id === company.id && <Check size={16} className="text-indigo-600" />}
                                                        </button>
                                                    ))
                                                ) : (
                                                    <div className="p-4 text-center text-slate-500 text-sm">No companies found</div>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>
                             </div>

                             {/* Financial Dashboard */}
                             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Annual Revenue</p>
                                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedCompany.revenue}</h3>
                                    </div>
                                    <div className="mt-4 flex items-center gap-2 text-xs font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded w-fit">
                                        <TrendingUp size={14} /> +8.5% YoY
                                    </div>
                                </div>
                                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Net Profit Margin</p>
                                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">18.2%</h3>
                                    </div>
                                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-4 overflow-hidden">
                                        <div className="bg-indigo-500 h-full w-[18%]"></div>
                                    </div>
                                </div>
                                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Total Assets</p>
                                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">$14.5M</h3>
                                    </div>
                                    <div className="mt-2 text-xs text-slate-500">Liabilities: $4.2M</div>
                                </div>
                                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-5"><Shield size={64} /></div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Credit Score</p>
                                        <h3 className="text-3xl font-bold text-emerald-500">785</h3>
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-wide text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded w-fit">Excellent</span>
                                </div>
                             </div>

                             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col h-[400px]">
                                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6">Financial Performance</h3>
                                    <div className="flex-1 w-full min-h-0">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={revenueData}>
                                                <defs>
                                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                                <Tooltip 
                                                    contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                                    itemStyle={{ color: '#1e293b' }}
                                                />
                                                <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm h-[240px] flex flex-col">
                                        <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-4 uppercase tracking-wide">Expense Breakdown</h3>
                                        <div className="flex-1 relative">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <RePieChart>
                                                    <Pie
                                                        data={expenseData}
                                                        cx="50%"
                                                        cy="50%"
                                                        innerRadius={40}
                                                        outerRadius={60}
                                                        paddingAngle={5}
                                                        dataKey="value"
                                                    >
                                                        {expenseData.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                                        ))}
                                                    </Pie>
                                                    <Tooltip />
                                                    <Legend verticalAlign="middle" align="right" layout="vertical" iconSize={8} wrapperStyle={{ fontSize: '11px' }}/>
                                                </RePieChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>

                                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex-1">
                                        <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-4 uppercase tracking-wide">Recent Statements</h3>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between p-3 border border-slate-100 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-lg"><FileText size={16} /></div>
                                                    <div>
                                                        <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">Balance Sheet 2023</p>
                                                        <p className="text-xs text-slate-500">Dec 31, 2023 • PDF</p>
                                                    </div>
                                                </div>
                                                <Download size={16} className="text-slate-400 group-hover:text-indigo-600" />
                                            </div>
                                            <div className="flex items-center justify-between p-3 border border-slate-100 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded-lg"><FileText size={16} /></div>
                                                    <div>
                                                        <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">P&L Q3 2024</p>
                                                        <p className="text-xs text-slate-500">Oct 01, 2024 • PDF</p>
                                                    </div>
                                                </div>
                                                <Download size={16} className="text-slate-400 group-hover:text-indigo-600" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                             </div>
                         </div>
                    )}
                    
                    {/* Change Info History */}
                    {activeSubTab === 'changes' && (
                        <div className="space-y-6">
                            {/* Search Bar */}
                             <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-4 items-center z-20 relative">
                                <div className="relative flex-1 w-full">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input 
                                        type="text" 
                                        placeholder="Find company to view change history..." 
                                        value={clientSearch}
                                        onChange={(e) => {
                                            setClientSearch(e.target.value);
                                            setShowCompanyDropdown(true);
                                        }}
                                        onFocus={() => setShowCompanyDropdown(true)}
                                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                                    />

                                    {/* Company Dropdown */}
                                    {showCompanyDropdown && (
                                        <>
                                            <div className="fixed inset-0 z-10" onClick={() => setShowCompanyDropdown(false)}></div>
                                            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-20 max-h-60 overflow-y-auto">
                                                {filteredCompanies.length > 0 ? (
                                                    filteredCompanies.map(company => (
                                                        <button
                                                            key={company.id}
                                                            onClick={() => {
                                                                setSelectedCompany(company);
                                                                setClientSearch(company.name);
                                                                setShowCompanyDropdown(false);
                                                            }}
                                                            className="w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors border-b border-slate-100 dark:border-slate-700 last:border-0 flex justify-between items-center group"
                                                        >
                                                            <div>
                                                                <p className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{company.name}</p>
                                                                <p className="text-xs text-slate-500">{company.tin} • {company.industry}</p>
                                                            </div>
                                                            {selectedCompany.id === company.id && <Check size={16} className="text-indigo-600" />}
                                                        </button>
                                                    ))
                                                ) : (
                                                    <div className="p-4 text-center text-slate-500 text-sm">No companies found</div>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>
                             </div>

                             <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                                        <History size={20} className="text-blue-500" /> Change Request Log
                                    </h3>
                                    <span className="text-sm text-slate-500 dark:text-slate-400">
                                        {selectedCompany.changeHistory?.length || 0} Total Changes
                                    </span>
                                </div>

                                {selectedCompany.changeHistory && selectedCompany.changeHistory.length > 0 ? (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left text-sm">
                                            <thead>
                                                <tr className="border-b border-slate-100 dark:border-slate-700 text-xs font-bold text-slate-500 uppercase">
                                                    <th className="pb-3 pl-2">Change Type</th>
                                                    <th className="pb-3">Date</th>
                                                    <th className="pb-3">Old Value</th>
                                                    <th className="pb-3">New Value</th>
                                                    <th className="pb-3">Status</th>
                                                    <th className="pb-3 text-right pr-2">Requestor</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                                                {selectedCompany.changeHistory.map((change, idx) => (
                                                    <tr key={idx} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                                        <td className="py-4 pl-2 font-medium text-slate-900 dark:text-white flex items-center gap-2">
                                                            <FileDiff size={16} className="text-slate-400" />
                                                            {change.type}
                                                        </td>
                                                        <td className="py-4 text-slate-500">{change.date}</td>
                                                        <td className="py-4 text-slate-500 max-w-xs truncate" title={change.oldValue}>{change.oldValue}</td>
                                                        <td className="py-4 text-slate-900 dark:text-white font-medium max-w-xs truncate" title={change.newValue}>{change.newValue}</td>
                                                        <td className="py-4">
                                                            <span className={`text-[10px] font-bold px-2 py-1 rounded border uppercase ${
                                                                change.status === 'Approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800' :
                                                                change.status === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800' :
                                                                'bg-red-50 text-red-600 border-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800'
                                                            }`}>
                                                                {change.status}
                                                            </span>
                                                        </td>
                                                        <td className="py-4 text-right pr-2 text-slate-500">{change.requestor}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="text-center py-12 text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
                                         <History size={32} className="mx-auto mb-2 opacity-50" />
                                         <p>No change history records found for this company.</p>
                                    </div>
                                )}
                             </div>
                        </div>
                    )}

                    {/* ... (Other Subsections) ... */}
                </div>
            )}

            {/* CASH MANAGEMENT VIEW */}
            {activeTab === 'cash' && (
                 <div className="space-y-6 max-w-7xl mx-auto">
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
                        <Wallet size={48} className="mx-auto text-slate-300 mb-4" />
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Cash Management Module</h3>
                        <p className="text-slate-500 mt-2">Dashboard active.</p>
                    </div>
                 </div>
            )}

            {/* PAYMENTS & SETTLEMENTS VIEW */}
            {activeTab === 'payments' && (
                <div className="space-y-6 max-w-7xl mx-auto">
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
                        <ArrowRightLeft size={48} className="mx-auto text-slate-300 mb-4" />
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Payments Module</h3>
                        <p className="text-slate-500 mt-2">Dashboard active.</p>
                    </div>
                </div>
            )}
            
            {/* PRODUCT SERVICE VIEW */}
            {activeTab === 'products' && (
                <div className="space-y-6 max-w-7xl mx-auto">
                     <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
                        <Package size={48} className="mx-auto text-slate-300 mb-4" />
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Products Module</h3>
                        <p className="text-slate-500 mt-2">Dashboard active.</p>
                    </div>
                </div>
            )}

            {/* REQUESTS & APPEALS VIEW */}
            {activeTab === 'requests' && (
                <div className="space-y-6 max-w-7xl mx-auto">
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
                        <MessageSquare size={48} className="mx-auto text-slate-300 mb-4" />
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Requests Module</h3>
                        <p className="text-slate-500 mt-2">Dashboard active.</p>
                    </div>
                </div>
            )}

            {/* ANALYTICS & REPORTS VIEW */}
            {activeTab === 'analytics' && (
                <div className="space-y-6 max-w-7xl mx-auto">
                     {/* Header */}
                     <header className="mb-6">
                        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-2">
                             <span>Analytics & Reports</span>
                             <ChevronRight size={14} />
                             <span className="text-slate-900 dark:text-white font-medium">
                                {menuItems.find(m => m.id === 'analytics')?.children?.find(c => c.id === activeSubTab)?.label}
                             </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                                {activeSubTab === 'overview' ? 'SME Analytics Dashboard' : menuItems.find(m => m.id === 'analytics')?.children?.find(c => c.id === activeSubTab)?.label}
                            </h1>
                            {activeSubTab === 'overview' && (
                                <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
                                    <Download size={16} /> Export Report
                                </button>
                            )}
                        </div>
                    </header>

                    {/* Dashboard / Overview */}
                    {activeSubTab === 'overview' && (
                        <div className="space-y-6">
                            {/* Key Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="p-1.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded">
                                            <DollarSign size={16} />
                                        </div>
                                        <p className="text-xs text-slate-500 uppercase font-bold tracking-wide">Total Revenue</p>
                                    </div>
                                    <p className="text-xl font-bold text-slate-900 dark:text-white">$4.2M</p>
                                    <div className="flex items-center gap-1 mt-1 text-xs font-bold text-emerald-500">
                                        <TrendingUp size={12} /> +12%
                                    </div>
                                </div>
                                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded">
                                            <Users size={16} />
                                        </div>
                                        <p className="text-xs text-slate-500 uppercase font-bold tracking-wide">Active Clients</p>
                                    </div>
                                    <p className="text-xl font-bold text-slate-900 dark:text-white">1,240</p>
                                    <div className="flex items-center gap-1 mt-1 text-xs font-bold text-emerald-500">
                                        <TrendingUp size={12} /> +5%
                                    </div>
                                </div>
                                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="p-1.5 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded">
                                            <AlertTriangle size={16} />
                                        </div>
                                        <p className="text-xs text-slate-500 uppercase font-bold tracking-wide">Risk Alerts</p>
                                    </div>
                                    <p className="text-xl font-bold text-slate-900 dark:text-white">24</p>
                                    <div className="flex items-center gap-1 mt-1 text-xs font-bold text-amber-500">
                                        <Activity size={12} /> Medium
                                    </div>
                                </div>
                                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="p-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded">
                                            <PieChart size={16} />
                                        </div>
                                        <p className="text-xs text-slate-500 uppercase font-bold tracking-wide">Product Usage</p>
                                    </div>
                                    <p className="text-xl font-bold text-slate-900 dark:text-white">3.5 / Client</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Revenue Chart */}
                                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 flex flex-col h-[350px]">
                                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6">Revenue Trend (6 Months)</h3>
                                    <div className="flex-1 w-full min-h-0">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={revenueData}>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                                <Tooltip 
                                                    contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                                    itemStyle={{ color: '#1e293b' }}
                                                    cursor={{ fill: 'transparent' }}
                                                />
                                                <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                {/* Quick Insights */}
                                <div className="space-y-6">
                                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
                                        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4">Risk Distribution</h3>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                                                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">High Risk</span>
                                                <span className="text-xs font-bold bg-red-100 text-red-700 px-2 py-1 rounded">5%</span>
                                            </div>
                                            <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                                                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Medium Risk</span>
                                                <span className="text-xs font-bold bg-amber-100 text-amber-700 px-2 py-1 rounded">15%</span>
                                            </div>
                                            <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                                                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Low Risk</span>
                                                <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-2 py-1 rounded">80%</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-indigo-600 rounded-2xl shadow-lg p-6 text-white">
                                        <div className="flex items-start gap-3">
                                            <Target className="text-indigo-200 shrink-0" />
                                            <div>
                                                <h4 className="font-bold text-lg mb-1">Growth Opportunity</h4>
                                                <p className="text-sm text-indigo-100 leading-relaxed">
                                                    15% of Low Risk clients are eligible for credit line increases. Campaign suggested.
                                                </p>
                                                <button className="mt-4 px-4 py-2 bg-white text-indigo-600 rounded-lg text-xs font-bold hover:bg-indigo-50 transition-colors">
                                                    View Eligible Clients
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Sub-tab placeholders for Analytics */}
                    {activeSubTab === 'activity' && (
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
                            <Activity size={48} className="mx-auto text-slate-300 mb-4" />
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Account Activity Report</h3>
                            <p className="text-slate-500 mt-2">Transaction volume logs and patterns.</p>
                        </div>
                    )}
                    {activeSubTab === 'profitability' && (
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
                            <TrendingUp size={48} className="mx-auto text-slate-300 mb-4" />
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Client Profitability Analysis</h3>
                            <p className="text-slate-500 mt-2">Revenue vs Cost per client breakdown.</p>
                        </div>
                    )}
                    {activeSubTab === 'risks' && (
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
                            <Shield size={48} className="mx-auto text-slate-300 mb-4" />
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Risk Analytics</h3>
                            <p className="text-slate-500 mt-2">Portfolio risk exposure and trends.</p>
                        </div>
                    )}
                    {activeSubTab === 'incidents' && (
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
                            <AlertCircle size={48} className="mx-auto text-slate-300 mb-4" />
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Incident Frequency</h3>
                            <p className="text-slate-500 mt-2">Operational incident reports and resolution times.</p>
                        </div>
                    )}
                </div>
            )}

        </div>
      </div>
    </div>
  );
};
