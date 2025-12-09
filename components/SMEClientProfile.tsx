
import React from 'react';
import { SMECompany } from '../types';

interface Props {
  company: SMECompany;
}

export const SMEClientProfile: React.FC<Props> = ({ company }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-2">
        <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Company Overview</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm mb-6">
                    {company.description}
                </p>
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1">Legal Name</label>
                        <p className="font-medium text-slate-900 dark:text-white">{company.name}</p>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1">Legal Structure</label>
                        <p className="font-medium text-slate-900 dark:text-white">{company.legalStructure}</p>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1">Industry</label>
                        <p className="font-medium text-slate-900 dark:text-white">{company.industry}</p>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1">Employees</label>
                        <p className="font-medium text-slate-900 dark:text-white">{company.employees}</p>
                    </div>
                </div>
            </div>
            
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1">Address</label>
                        <p className="font-medium text-slate-900 dark:text-white text-sm">{company.address}</p>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1">Website</label>
                        <p className="font-medium text-indigo-600 dark:text-indigo-400 text-sm">{company.website}</p>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1">Email</label>
                        <p className="font-medium text-slate-900 dark:text-white text-sm">{company.email}</p>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1">Phone</label>
                        <p className="font-medium text-slate-900 dark:text-white text-sm">{company.phone}</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Key Personnel</h3>
                    <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 font-bold">
                        {company.ceo ? company.ceo.charAt(0) : 'C'}
                    </div>
                    <div>
                        <p className="font-bold text-slate-900 dark:text-white">{company.ceo || 'CEO Name'}</p>
                        <p className="text-xs text-slate-500">Chief Executive Officer</p>
                    </div>
                    </div>
            </div>
             <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Annual Revenue</h3>
                <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{company.revenue}</p>
                <p className="text-xs text-slate-500 mt-1">Last Fiscal Year</p>
             </div>
        </div>
    </div>
  );
};
