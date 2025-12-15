
import React from 'react';
import { ArrowLeft, Package, ShoppingCart, FileText, Truck, Users, Settings, Plus, Briefcase, Building2, Landmark, ShieldCheck, Globe, ArrowRightLeft, RefreshCw, Database, CreditCard, Percent, CheckCircle, ClipboardCheck, Files, ScanText, Archive } from 'lucide-react';

interface BackOfficePageProps {
  onBack: () => void;
  onNavigateToSME?: () => void;
  onNavigateToCorporate?: () => void;
}

export const BackOfficePage: React.FC<BackOfficePageProps> = ({ onBack, onNavigateToSME, onNavigateToCorporate }) => {
  const stats = [
    { label: 'Pending Orders', value: '42', change: '+12%', icon: ShoppingCart, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/30' },
    { label: 'Low Stock Items', value: '8', change: '-2', icon: Package, color: 'text-amber-600', bg: 'bg-amber-100 dark:bg-amber-900/30' },
    { label: 'Open Invoices', value: '$12.5k', change: '+5%', icon: FileText, color: 'text-emerald-600', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
    { label: 'Active Shipments', value: '156', change: '+24', icon: Truck, color: 'text-purple-600', bg: 'bg-purple-100 dark:bg-purple-900/30' },
  ];

  const businessServices = [
    { title: 'SME', subtitle: 'Small & Medium Business', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20', onClick: onNavigateToSME },
    { title: 'Corporate Clients', subtitle: 'Enterprise Solutions', icon: Building2, color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-900/20', onClick: onNavigateToCorporate },
    { title: 'Financial Institutions', subtitle: 'Banking Partners', icon: Landmark, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
    { title: 'Guarantees & Accreditations', subtitle: 'Security & Compliance', icon: ShieldCheck, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20' },
    { title: 'Foreign Economic Activity', subtitle: 'FEA & Global Trade', icon: Globe, color: 'text-cyan-600', bg: 'bg-cyan-50 dark:bg-cyan-900/20' },
  ];

  const operations = [
    { title: 'Payment Transactions', subtitle: 'Transfers & Wires', icon: ArrowRightLeft, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
    { title: 'Currency Control', subtitle: 'FX & Compliance', icon: RefreshCw, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { title: 'Depository Transactions', subtitle: 'Safekeeping', icon: Database, color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20' },
    { title: 'Card Transactions', subtitle: 'Issuing & Acquiring', icon: CreditCard, color: 'text-pink-600', bg: 'bg-pink-50 dark:bg-pink-900/20' },
    { title: 'Account Maintenance', subtitle: 'Lifecycle Mgmt', icon: Settings, color: 'text-slate-600', bg: 'bg-slate-50 dark:bg-slate-700/50' },
    { title: 'Credit Product Support', subtitle: 'Loans & Lines', icon: Percent, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20' },
    { title: 'Clearing Processes', subtitle: 'Settlements', icon: CheckCircle, color: 'text-teal-600', bg: 'bg-teal-50 dark:bg-teal-900/20' },
  ];

  const archiveDocs = [
    { title: 'Document Reception', subtitle: 'Verification & Entry', icon: ClipboardCheck, color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
    { title: 'Archive', subtitle: 'Physical & Digital', icon: Archive, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20' },
    { title: 'Doc & Contract Mgmt', subtitle: 'Versioning & Storage', icon: Files, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { title: 'OCR / Recognition', subtitle: 'Digitization', icon: ScanText, color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20' },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 px-8 pt-8">
        <div>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors mb-2 text-sm font-medium"
          >
            <ArrowLeft size={16} /> Back to Control Panel
          </button>
          <div className="flex items-center gap-3">
             <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Back Office</h2>
             <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                Operations
             </span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage inventory, fulfillment, and financial records.</p>
        </div>
        
        <div className="flex gap-3">
             <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
                <Settings size={16} /> Settings
             </button>
             <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200/50 dark:shadow-none">
                <Plus size={16} /> Create Order
             </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-8 pb-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, i) => (
                <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-start justify-between hover:shadow-md transition-shadow">
                    <div>
                        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">{stat.label}</p>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</h3>
                        <p className={`text-xs font-medium mt-1 ${stat.change.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>
                            {stat.change} <span className="text-slate-400 font-normal">from last week</span>
                        </p>
                    </div>
                    <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                        <stat.icon size={20} />
                    </div>
                </div>
            ))}
        </div>

        {/* Main Modules Area */}
        <div className="space-y-8">
            
            {/* Business Services Section */}
            <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <Briefcase size={20} className="text-blue-600" /> Business Services
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                    {businessServices.map((service, i) => (
                        <div 
                            key={i} 
                            onClick={service.onClick}
                            className={`bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors cursor-pointer group h-full ${service.onClick ? 'ring-2 ring-transparent hover:ring-indigo-100 dark:hover:ring-indigo-900/30' : ''}`}
                        >
                            <div className="flex flex-col gap-4">
                                <div className={`p-3 rounded-xl w-fit ${service.bg} ${service.color}`}>
                                    <service.icon size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{service.title}</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{service.subtitle}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Operations Section */}
            <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <Settings size={20} className="text-emerald-600" /> Operations
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {operations.map((op, i) => (
                        <div key={i} className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors cursor-pointer group h-full">
                            <div className="flex flex-col gap-4">
                                <div className={`p-3 rounded-xl w-fit ${op.bg} ${op.color}`}>
                                    <op.icon size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{op.title}</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{op.subtitle}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Archive & Document Section */}
            <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <Archive size={20} className="text-amber-600" /> Archive & Document Section
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {archiveDocs.map((doc, i) => (
                        <div key={i} className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors cursor-pointer group h-full">
                            <div className="flex flex-col gap-4">
                                <div className={`p-3 rounded-xl w-fit ${doc.bg} ${doc.color}`}>
                                    <doc.icon size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{doc.title}</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{doc.subtitle}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
