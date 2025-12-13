
import React from 'react';
import { Package, ChevronRight } from 'lucide-react';
import { SMEProductsOverview } from './SMEProductsOverview';
import { SMEProductsLoans } from './SMEProductsLoans';
import { SMEProductsTariffs } from './SMEProductsTariffs';
import { SMEProductsAcquiring } from './SMEProductsAcquiring';
import { SMEProductsOnlineBanking } from './SMEProductsOnlineBanking';
import { SMEProductsPayroll } from './SMEProductsPayroll';
import { SMEProductsLimits } from './SMEProductsLimits';
import { SMEProductsServices } from './SMEProductsServices';
import { SMEProductsFactoring } from './SMEProductsFactoring';
import { SMEProductsLeasing } from './SMEProductsLeasing';
import { SMEProductsDeposits } from './SMEProductsDeposits';
import { SMEProductsCards } from './SMEProductsCards';
import { SMEProductsPlans } from './SMEProductsPlans';
import { SMEProductsContracts } from './SMEProductsContracts';

interface Props {
  activeSubTab: string;
}

export const SMEProducts: React.FC<Props> = ({ activeSubTab }) => {
  const getLabel = () => {
      switch(activeSubTab) {
          case 'overview': return 'Products Dashboard';
          case 'loans': return 'SME Loans';
          case 'tariffs': return 'Active Tariffs';
          case 'acquiring': return 'Acquiring & POS';
          case 'online_banking': return 'Online Banking';
          case 'payroll': return 'Payroll Projects';
          case 'limits': return 'Limits Management';
          case 'services': return 'Extra Services';
          case 'factoring': return 'Factoring';
          case 'leasing': return 'Leasing';
          case 'deposits': return 'Deposits';
          case 'cards': return 'Business Cards';
          case 'plans': return 'Tariff Plans';
          case 'contracts': return 'Contracts';
          default: return activeSubTab.replace('_', ' ');
      }
  };

  const isFullscreen = activeSubTab === 'plans';

  return (
    <div className={isFullscreen ? "h-full w-full" : "space-y-6 max-w-7xl mx-auto"}>
        {!isFullscreen && (
            <header className="mb-6">
                 <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-2">
                     <span>Product Service</span>
                     <ChevronRight size={14} />
                     <span className="text-slate-900 dark:text-white font-medium capitalize">{activeSubTab.replace('_', ' ')}</span>
                 </div>
                 <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{getLabel()}</h1>
            </header>
        )}
        
        <div className={isFullscreen ? "h-full" : ""}>
            {activeSubTab === 'overview' && <SMEProductsOverview />}
            {activeSubTab === 'loans' && <SMEProductsLoans />}
            {activeSubTab === 'tariffs' && <SMEProductsTariffs />}
            {activeSubTab === 'acquiring' && <SMEProductsAcquiring />}
            {activeSubTab === 'online_banking' && <SMEProductsOnlineBanking />}
            {activeSubTab === 'payroll' && <SMEProductsPayroll />}
            {activeSubTab === 'limits' && <SMEProductsLimits />}
            {activeSubTab === 'services' && <SMEProductsServices />}
            {activeSubTab === 'factoring' && <SMEProductsFactoring />}
            {activeSubTab === 'leasing' && <SMEProductsLeasing />}
            {activeSubTab === 'deposits' && <SMEProductsDeposits />}
            {activeSubTab === 'cards' && <SMEProductsCards />}
            {activeSubTab === 'plans' && <SMEProductsPlans />}
            {activeSubTab === 'contracts' && <SMEProductsContracts />}
        </div>
    </div>
  );
};
