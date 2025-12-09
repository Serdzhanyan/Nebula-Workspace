
import React, { useState } from 'react';
import { Search, ChevronRight, Check } from 'lucide-react';
import { SMECompany } from '../types';
import { SMEClientProfile } from './SMEClientProfile';
import { SMEClientOwnership } from './SMEClientOwnership';
import { SMEClientKYC } from './SMEClientKYC';
import { SMEClientFinancials } from './SMEClientFinancials';
import { SMEClientChanges } from './SMEClientChanges';
import { SMEClientDirectors } from './SMEClientDirectors';
import { SMEClientBeneficiaries } from './SMEClientBeneficiaries';
import { SMEClientDocuments } from './SMEClientDocuments';
import { SMEClientRisks } from './SMEClientRisks';
import { SMEClientRepresentatives } from './SMEClientRepresentatives';
import { SMEClientPOA } from './SMEClientPOA';

interface SMEClientManagementProps {
  activeSubTab: string;
}

export const SMEClientManagement: React.FC<SMEClientManagementProps> = ({ activeSubTab }) => {
  const [clientSearch, setClientSearch] = useState("");
  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);

  // Mock Companies Data
  const companies: SMECompany[] = [
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
      ],
      directors: [
          { name: 'Sarah Jenkins', role: 'Director', appointed: 'Oct 2021' },
          { name: 'Marcus Thorne', role: 'Director', appointed: 'Jul 2024' }
      ],
      beneficiaries: [
          { name: 'Sarah Jenkins', share: 45, verified: true },
          { name: 'Marcus Thorne', share: 30, verified: true },
          { name: 'Unknown Investor', share: 25, verified: false }
      ],
      corporateDocuments: [
          { name: 'Business License 2024', status: 'Current', date: 'Jan 15, 2024' },
          { name: 'Tax Clearance', status: 'Expired', date: 'Dec 31, 2023' }
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
      ],
      directors: [
          { name: 'Michael Chen', role: 'Managing Director', appointed: 'Mar 2020' }
      ],
      beneficiaries: [
          { name: 'Michael Chen', share: 100, verified: true }
      ],
      corporateDocuments: [
           { name: 'Operating Agreement', status: 'Current', date: 'Mar 20, 2020' }
      ]
    }
  ];

  const [selectedCompany, setSelectedCompany] = useState<SMECompany>(companies[0]);

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(clientSearch.toLowerCase()) || 
    c.tin.toLowerCase().includes(clientSearch.toLowerCase())
  );

  const getSubTabLabel = () => {
    switch(activeSubTab) {
        case 'overview': return 'Company Profile';
        case 'ownership': return 'Ownership Structure';
        case 'kyc': return 'KYC/KYB Checks';
        case 'financials': return 'Financial Profile';
        case 'changes': return 'Change Info';
        case 'directors': return 'Change Director';
        case 'beneficiaries': return 'Confirm Beneficiaries';
        case 'documents': return 'Document Updates';
        case 'representatives': return 'Auth Representatives';
        case 'poa': return 'Powers of Attorney';
        case 'risks': return 'Risks & Scoring';
        default: return activeSubTab.replace('_', ' ');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-6">
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-2">
                    <span>Client Management</span>
                    <ChevronRight size={14} />
                    <span className="text-slate-900 dark:text-white font-medium">
                    {getSubTabLabel()}
                    </span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                {getSubTabLabel()}: {selectedCompany.name}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-1">
                <span className={`text-xs px-2 py-0.5 rounded font-bold uppercase ${
                    selectedCompany.status === 'Active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 
                    selectedCompany.status === 'Pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                    'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                }`}>
                    {selectedCompany.status}
                </span>
                <span>• ID: {selectedCompany.tin}</span>
                <span>• Since {selectedCompany.joined}</span>
            </p>
        </header>

        {/* Common Search Bar */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-4 items-center z-20 relative">
            <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Find company..." 
                    value={clientSearch}
                    onChange={(e) => {
                        setClientSearch(e.target.value);
                        setShowCompanyDropdown(true);
                    }}
                    onFocus={() => setShowCompanyDropdown(true)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                />

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

        {/* Dynamic Content */}
        <div className="mt-6">
            {activeSubTab === 'overview' && <SMEClientProfile company={selectedCompany} />}
            {activeSubTab === 'ownership' && <SMEClientOwnership company={selectedCompany} />}
            {activeSubTab === 'kyc' && <SMEClientKYC company={selectedCompany} />}
            {activeSubTab === 'financials' && <SMEClientFinancials company={selectedCompany} />}
            {activeSubTab === 'changes' && <SMEClientChanges company={selectedCompany} />}
            {activeSubTab === 'directors' && <SMEClientDirectors company={selectedCompany} />}
            {activeSubTab === 'beneficiaries' && <SMEClientBeneficiaries company={selectedCompany} />}
            {activeSubTab === 'documents' && <SMEClientDocuments company={selectedCompany} />}
            {activeSubTab === 'risks' && <SMEClientRisks company={selectedCompany} />}
            {activeSubTab === 'representatives' && <SMEClientRepresentatives company={selectedCompany} />}
            {activeSubTab === 'poa' && <SMEClientPOA company={selectedCompany} />}
        </div>
    </div>
  );
};
