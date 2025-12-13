
import React, { useState } from 'react';
import { ArrowLeft, Users, Wallet, ArrowRightLeft, Package, MessageSquare, BarChart3, ChevronDown, ChevronRight } from 'lucide-react';
import { SMEClientManagement } from './SMEClientManagement';
import { SMECashManagement } from './SMECashManagement';
import { SMEPayments } from './SMEPayments';
import { SMEProducts } from './SMEProducts';
import { SMERequests } from './SMERequests';
import { SMEAnalytics } from './SMEAnalytics';

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
    setActiveSubTab('overview');
  };

  const handleSubMenuClick = (parentId: string, subId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveTab(parentId);
    setActiveSubTab(subId);
  };

  const isFullscreenView = activeTab === 'products' && activeSubTab === 'plans';

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
            SME Module v2.0
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden bg-slate-50 dark:bg-slate-950 relative">
        <div className={`flex-1 overflow-y-auto relative z-10 ${isFullscreenView ? 'p-0' : 'p-8'}`}>
            {activeTab === 'clients' && <SMEClientManagement activeSubTab={activeSubTab} />}
            {activeTab === 'cash' && <SMECashManagement activeSubTab={activeSubTab} />}
            {activeTab === 'payments' && <SMEPayments activeSubTab={activeSubTab} />}
            {activeTab === 'products' && <SMEProducts activeSubTab={activeSubTab} />}
            {activeTab === 'requests' && <SMERequests activeSubTab={activeSubTab} />}
            {activeTab === 'analytics' && <SMEAnalytics activeSubTab={activeSubTab} />}
        </div>
      </div>
    </div>
  );
};
