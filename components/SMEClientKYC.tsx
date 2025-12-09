
import React from 'react';
import { FileCheck, FileText, FileCode } from 'lucide-react';
import { SMECompany } from '../types';

interface Props {
  company: SMECompany;
}

export const SMEClientKYC: React.FC<Props> = ({ company }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-2">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <FileCheck size={20} className="text-emerald-500" /> Verification Status
            </h3>
            <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
                        <span className="text-slate-600 dark:text-slate-300">AML Screening</span>
                        <span className={`font-bold ${company.kyc?.amlStatus === 'Clear' ? 'text-emerald-500' : 'text-red-500'}`}>
                            {company.kyc?.amlStatus}
                        </span>
                    </div>
                    <div className="flex justify-between items-center text-sm p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
                        <span className="text-slate-600 dark:text-slate-300">Risk Score</span>
                        <span className="font-bold text-slate-900 dark:text-white">{company.kyc?.riskScore || 0}/100</span>
                    </div>
                     <div className="flex justify-between items-center text-sm p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
                        <span className="text-slate-600 dark:text-slate-300">Last Check</span>
                        <span className="font-bold text-slate-900 dark:text-white">{company.kyc?.lastCheck}</span>
                    </div>
                     <div className="flex justify-between items-center text-sm p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
                        <span className="text-slate-600 dark:text-slate-300">Next Review</span>
                        <span className="font-bold text-slate-900 dark:text-white">{company.kyc?.nextReview}</span>
                    </div>
            </div>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <FileText size={20} className="text-blue-500" /> Documents
            </h3>
            <div className="space-y-3">
                {company.kyc?.documents?.map((doc: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-700 rounded-xl">
                        <div className="flex items-center gap-3">
                            <FileCode size={18} className="text-slate-500"/>
                            <span className="text-sm font-bold text-slate-900 dark:text-white">{doc.name}</span>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-1 rounded border ${
                            doc.status === 'Approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-800' :
                            'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-900/20 dark:border-amber-800'
                        }`}>{doc.status}</span>
                    </div>
                ))}
                {(!company.kyc?.documents || company.kyc.documents.length === 0) && (
                     <p className="text-sm text-slate-400 italic">No documents uploaded.</p>
                )}
            </div>
        </div>
    </div>
  );
};
