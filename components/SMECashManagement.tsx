
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { SMECashOverview } from './SMECashOverview';
import { SMECashApplications } from './SMECashApplications';
import { SMECashAccounts } from './SMECashAccounts';
import { SMECashStatuses } from './SMECashStatuses';
import { SMECashVerification } from './SMECashVerification';
import { SMECashApprovals } from './SMECashApprovals';
import { SMECashLicenses } from './SMECashLicenses';

interface Props {
  activeSubTab: string;
}

export const SMECashManagement: React.FC<Props> = ({ activeSubTab }) => {
  const getLabel = () => {
      switch(activeSubTab) {
          case 'overview': return 'Cash Management Dashboard';
          case 'applications': return 'Account Applications';
          case 'accounts': return 'Active Accounts';
          case 'statuses': return 'Processing Statuses';
          case 'verification': return 'Document Verification';
          case 'approvals': return 'Legal Approvals';
          case 'licenses': return 'Licenses & Permits';
          default: return activeSubTab;
      }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
        <header className="mb-6">
             <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-2">
                 <span>Cash Management</span>
                 <ChevronRight size={14} />
                 <span className="text-slate-900 dark:text-white font-medium capitalize">{activeSubTab.replace('_', ' ')}</span>
             </div>
             <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{getLabel()}</h1>
        </header>

        <div>
            {activeSubTab === 'overview' && <SMECashOverview />}
            {activeSubTab === 'applications' && <SMECashApplications />}
            {activeSubTab === 'accounts' && <SMECashAccounts />}
            {activeSubTab === 'statuses' && <SMECashStatuses />}
            {activeSubTab === 'verification' && <SMECashVerification />}
            {activeSubTab === 'approvals' && <SMECashApprovals />}
            {activeSubTab === 'licenses' && <SMECashLicenses />}
        </div>
    </div>
  );
};
