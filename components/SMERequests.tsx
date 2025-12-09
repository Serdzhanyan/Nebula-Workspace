
import React from 'react';
import { MessageSquare, ChevronRight } from 'lucide-react';
import { SMERequestsOverview } from './SMERequestsOverview';
import { SMERequestsCompany } from './SMERequestsCompany';
import { SMERequestsApprovals } from './SMERequestsApprovals';
import { SMERequestsTariffs } from './SMERequestsTariffs';
import { SMERequestsComplaints } from './SMERequestsComplaints';
import { SMERequestsEscalations } from './SMERequestsEscalations';
import { SMERequestsCorrespondence } from './SMERequestsCorrespondence';
import { SMERequestsDocuments } from './SMERequestsDocuments';
import { SMERequestsReminders } from './SMERequestsReminders';
import { SMERequestsNotes } from './SMERequestsNotes';

interface Props {
  activeSubTab: string;
}

export const SMERequests: React.FC<Props> = ({ activeSubTab }) => {
  const getLabel = () => {
      switch(activeSubTab) {
          case 'overview': return 'Requests Dashboard';
          case 'company_requests': return 'Company Requests';
          case 'approvals': return 'Change Approvals';
          case 'tariff_changes': return 'Tariff Change Requests';
          case 'complaints': return 'Complaints';
          case 'escalations': return 'Escalations';
          case 'correspondence': return 'Client Correspondence';
          case 'doc_requests': return 'Document Requests';
          case 'reminders': return 'Data Update Reminders';
          case 'notes': return 'Comments & Internal Notes';
          default: return activeSubTab.replace('_', ' ');
      }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
        <header className="mb-6">
             <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-2">
                 <span>Requests & Appeals</span>
                 <ChevronRight size={14} />
                 <span className="text-slate-900 dark:text-white font-medium capitalize">{activeSubTab.replace('_', ' ')}</span>
             </div>
             <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{getLabel()}</h1>
        </header>

        <div>
            {activeSubTab === 'overview' && <SMERequestsOverview />}
            {activeSubTab === 'company_requests' && <SMERequestsCompany />}
            {activeSubTab === 'approvals' && <SMERequestsApprovals />}
            {activeSubTab === 'tariff_changes' && <SMERequestsTariffs />}
            {activeSubTab === 'complaints' && <SMERequestsComplaints />}
            {activeSubTab === 'escalations' && <SMERequestsEscalations />}
            {activeSubTab === 'correspondence' && <SMERequestsCorrespondence />}
            {activeSubTab === 'doc_requests' && <SMERequestsDocuments />}
            {activeSubTab === 'reminders' && <SMERequestsReminders />}
            {activeSubTab === 'notes' && <SMERequestsNotes />}
        </div>
    </div>
  );
};
