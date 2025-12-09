
import React from 'react';
import { ArrowRightLeft, ChevronRight } from 'lucide-react';
import { SMEPaymentsOverview } from './SMEPaymentsOverview';
import { SMEPaymentsVerification } from './SMEPaymentsVerification';
import { SMEPaymentsAML } from './SMEPaymentsAML';
import { SMEPaymentsRefunds } from './SMEPaymentsRefunds';
import { SMEPaymentsMonitoring } from './SMEPaymentsMonitoring';
import { SMEPaymentsMass } from './SMEPaymentsMass';
import { SMEPaymentsSuspicious } from './SMEPaymentsSuspicious';
import { SMEPaymentsLarge } from './SMEPaymentsLarge';
import { SMEPaymentsDocs } from './SMEPaymentsDocs';
import { SMEPaymentsFraud } from './SMEPaymentsFraud';

interface Props {
  activeSubTab: string;
}

export const SMEPayments: React.FC<Props> = ({ activeSubTab }) => {
  const getLabel = () => {
      switch(activeSubTab) {
          case 'overview': return 'Payments Dashboard';
          case 'verification': return 'Outgoing Verification';
          case 'aml': return 'AML Checks';
          case 'refunds': return 'Refunds & Clarifications';
          case 'monitoring': return 'Suspicious Monitoring';
          case 'mass': return 'Mass Payment Processing';
          case 'suspicious_manual': return 'Manual Suspicious Verification';
          case 'large': return 'Large Payment Confirmation';
          case 'docs': return 'Transaction Documentation';
          case 'fraud': return 'Fraud Alerts';
          default: return activeSubTab.replace('_', ' ');
      }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
        <header className="mb-6">
             <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-2">
                 <span>Payments & Settlements</span>
                 <ChevronRight size={14} />
                 <span className="text-slate-900 dark:text-white font-medium capitalize">{activeSubTab.replace('_', ' ')}</span>
             </div>
             <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{getLabel()}</h1>
        </header>
        
        <div>
            {activeSubTab === 'overview' && <SMEPaymentsOverview />}
            {activeSubTab === 'verification' && <SMEPaymentsVerification />}
            {activeSubTab === 'aml' && <SMEPaymentsAML />}
            {activeSubTab === 'refunds' && <SMEPaymentsRefunds />}
            {activeSubTab === 'monitoring' && <SMEPaymentsMonitoring />}
            {activeSubTab === 'mass' && <SMEPaymentsMass />}
            {activeSubTab === 'suspicious_manual' && <SMEPaymentsSuspicious />}
            {activeSubTab === 'large' && <SMEPaymentsLarge />}
            {activeSubTab === 'docs' && <SMEPaymentsDocs />}
            {activeSubTab === 'fraud' && <SMEPaymentsFraud />}
        </div>
    </div>
  );
};
