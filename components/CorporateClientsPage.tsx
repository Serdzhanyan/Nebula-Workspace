
import React, { useState } from 'react';
import { ArrowLeft, UserCircle, Briefcase, Activity, ShieldCheck, Landmark, Globe, FileText, ChevronRight, ChevronDown, LayoutDashboard } from 'lucide-react';
import { CorporateSection } from './CorporateSection';

interface CorporateClientsPageProps {
  onBack: () => void;
  onNavigateToProfileDashboard?: () => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ElementType;
  children?: { id: string; label: string }[];
}

export const CorporateClientsPage: React.FC<CorporateClientsPageProps> = ({ onBack, onNavigateToProfileDashboard }) => {
  const [activeTab, setActiveTab] = useState('structure');
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['profile', 'accounts']);

  const menuItems: MenuItem[] = [
    { 
      id: 'profile', 
      label: 'Client Profile Management', 
      icon: UserCircle,
      children: [
        { id: 'dashboard', label: 'Dashboard Overview' },
        { id: 'structure', label: 'Corporate structure' },
        { id: 'deep_kyc', label: 'Deep KYC' },
        { id: 'risk_assessments', label: 'End-to-end risk assessments' },
        { id: 'financial_statements', label: 'Company financial statements' },
        { id: 'legal_dossier', label: 'Extended legal dossier' },
        { id: 'ownership_structure', label: 'Ownership structure' },
        { id: 'financial_statements_2', label: 'Financial statements' },
        { id: 'credit_scoring', label: 'Company credit scoring' },
        { id: 'risk_dossier', label: 'Risk dossier' },
        { id: 'kyc_questionnaire', label: 'Enterprise KYC questionnaire' }
      ]
    },
    { 
      id: 'accounts', 
      label: 'Account Management', 
      icon: Briefcase,
      children: [
        { id: 'multi_accounts', label: 'Multi-accounts' },
        { id: 'currency_accounts', label: 'Currency accounts' },
        { id: 'poa_signatory', label: 'Powers of attorney and signatory authorities' },
        { id: 'regulated_limits', label: 'Regulated limits' },
        { id: 'corporate_limits', label: 'Corporate limits' },
        { id: 'user_roles', label: 'User roles and rights' },
        { id: 'spending_requirements', label: 'Spending requirements' },
        { id: 'currency_control', label: 'Currency control' },
        { id: 'corporate_cards', label: 'Corporate cards' },
        { id: 'special_accounts', label: 'Special accounts' }
      ]
    },
    { 
      id: 'transactions', 
      label: 'Transaction Support', 
      icon: Activity,
      children: [
        { id: 'complex_payments', label: 'Complex payments' },
        { id: 'contract_approval', label: 'Contract approval' },
        { id: 'multi_stage_verification', label: 'Multi-stage verification' },
        { id: 'compliance_monitoring', label: 'Transaction compliance' },
        { id: 'guarantees_collateral', label: 'Guarantees and collateral' }
      ]
    },
    { 
      id: 'payments', 
      label: 'Payments and Monitoring', 
      icon: Globe,
      children: [
        { id: 'large_payment_control', label: 'Large payment control' },
        { id: 'fatf_aml_verification', label: 'FATF/AML verification' },
        { id: 'interbank_settlements', label: 'Interbank settlements' },
        { id: 'currency_transactions', label: 'Currency transactions' },
        { id: 'foreign_counterparty', label: 'Foreign counterparty check' }
      ]
    },
    { 
      id: 'lending', 
      label: 'Corporate Lending', 
      icon: Landmark,
      children: [
        { id: 'credit_line_management', label: 'Credit Line Management' },
        { id: 'covenant_control', label: 'Covenant Control' },
        { id: 'collateral_security', label: 'Collateral and Security' },
        { id: 'overdrafts', label: 'Overdrafts' },
        { id: 'syndicated_loans', label: 'Syndicated Loans' },
        { id: 'portfolio_risk', label: 'Portfolio Risk' }
      ]
    },
    { 
      id: 'services', 
      label: 'Special Services', 
      icon: FileText,
      children: [
        { id: 'payroll_projects', label: 'Payroll Projects' },
        { id: 'collection', label: 'Collection' },
        { id: 'acquiring', label: 'Acquiring' },
        { id: 'letters_of_credit', label: 'Letters of Credit' },
        { id: 'treasury_services', label: 'Treasury Services' },
        { id: 'liquidity_management', label: 'Liquidity Management' },
        { id: 'service_terms_changes', label: 'Changes to Terms' },
        { id: 'new_service_requests', label: 'New Service Requests' },
        { id: 'employee_access', label: 'Employee Access' },
        { id: 'signatory_config', label: 'Signatory Config' },
        { id: 'corporate_reports', label: 'Corporate Reports' }
      ]
    },
    { 
      id: 'risk', 
      label: 'Risk Management', 
      icon: ShieldCheck,
      children: [
        { id: 'operation_analytics', label: 'Operation Analytics' },
        { id: 'suspicious_schemes', label: 'Suspicious Schemes' },
        { id: 'financial_stability', label: 'Financial Stability' },
        { id: 'regulatory_checks', label: 'Regulatory Checks' }
      ]
    },
  ];

  const toggleMenu = (id: string) => {
    setExpandedMenus(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleMenuClick = (item: MenuItem) => {
    // If it has children, toggle menu, but also set active tab to the parent ID to show the overview page
    if (item.children && item.children.length > 0) {
        toggleMenu(item.id);
        setActiveTab(item.id); 
    } else {
        setActiveTab(item.id);
    }
  };

  const handleSubMenuClick = (childId: string) => {
      if (childId === 'dashboard' && onNavigateToProfileDashboard) {
          onNavigateToProfileDashboard();
      } else {
          setActiveTab(childId);
      }
  };

  const getActiveLabel = () => {
    for (const item of menuItems) {
      if (item.id === activeTab) return item.label;
      if (item.children) {
        const child = item.children.find(c => c.id === activeTab);
        if (child) return child.label;
      }
    }
    return 'Overview';
  };

  return (
    <div className="flex h-full bg-slate-50 dark:bg-slate-950 animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Sidebar */}
      <div className="w-80 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col flex-shrink-0">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
             <button
                onClick={onBack}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
             >
                <ArrowLeft size={20} />
             </button>
             <span className="font-bold text-lg text-slate-900 dark:text-white">Corporate Clients</span>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
                const hasChildren = item.children && item.children.length > 0;
                const isExpanded = expandedMenus.includes(item.id);
                // Parent is visually active if activeTab matches parent ID or any child ID
                const isParentActive = activeTab === item.id || (hasChildren && item.children?.some(c => c.id === activeTab));

                return (
                  <div key={item.id} className="mb-1">
                    <button
                        onClick={() => handleMenuClick(item)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                            isParentActive && activeTab === item.id
                            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-none'
                            : isParentActive
                            ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300 shadow-sm'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                        }`}
                    >
                        <div className="flex items-center gap-3">
                            <item.icon size={18} className={isParentActive && activeTab === item.id ? 'text-white' : isParentActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 group-hover:text-slate-600'} />
                            {item.label}
                        </div>
                        {hasChildren && (
                             <div className={isParentActive && activeTab === item.id ? 'text-white/80' : 'text-slate-400'}>
                                {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                             </div>
                        )}
                    </button>
                    
                    {hasChildren && isExpanded && (
                        <div className="ml-4 pl-4 border-l border-slate-200 dark:border-slate-800 space-y-1 mt-1">
                            {item.children?.map(child => (
                                <button
                                    key={child.id}
                                    onClick={() => handleSubMenuClick(child.id)}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-2 ${
                                        activeTab === child.id 
                                        ? 'bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-bold' 
                                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                                    }`}
                                >
                                    {child.id === 'dashboard' && <LayoutDashboard size={12} />}
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
            Corporate Module v1.9
        </div>
      </div>

      {/* Main Content Area - Renders generic section page */}
      <CorporateSection title={getActiveLabel()} id={activeTab} />
      
    </div>
  );
};
