
import React from 'react';
import { ChevronRight, Download } from 'lucide-react';
import { SMEAnalyticsOverview } from './SMEAnalyticsOverview';
import { SMEAnalyticsActivity } from './SMEAnalyticsActivity';
import { SMEAnalyticsProfitability } from './SMEAnalyticsProfitability';
import { SMEAnalyticsRisks } from './SMEAnalyticsRisks';
import { SMEAnalyticsIncidents } from './SMEAnalyticsIncidents';

interface SMEAnalyticsProps {
  activeSubTab: string;
}

export const SMEAnalytics: React.FC<SMEAnalyticsProps> = ({ activeSubTab }) => {
  const getLabel = () => {
      switch(activeSubTab) {
          case 'overview': return 'Analytics Dashboard';
          case 'activity': return 'Account Activity';
          case 'profitability': return 'Client Profitability';
          case 'risks': return 'Risk Analysis';
          case 'incidents': return 'Incident Frequency';
          default: return activeSubTab.replace('_', ' ');
      }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
        <header className="mb-6">
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-2">
                    <span>Analytics & Reports</span>
                    <ChevronRight size={14} />
                    <span className="text-slate-900 dark:text-white font-medium capitalize">
                    {activeSubTab.replace('_', ' ')}
                    </span>
            </div>
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                    {getLabel()}
                </h1>
                <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
                    <Download size={16} /> Export Report
                </button>
            </div>
        </header>

        <div>
            {activeSubTab === 'overview' && <SMEAnalyticsOverview />}
            {activeSubTab === 'activity' && <SMEAnalyticsActivity />}
            {activeSubTab === 'profitability' && <SMEAnalyticsProfitability />}
            {activeSubTab === 'risks' && <SMEAnalyticsRisks />}
            {activeSubTab === 'incidents' && <SMEAnalyticsIncidents />}
        </div>
    </div>
  );
};
