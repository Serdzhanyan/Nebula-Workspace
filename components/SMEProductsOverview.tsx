
import React, { useState } from 'react';
import { Package, CreditCard, Percent, Briefcase, Search, Check, DollarSign, Calendar, TrendingUp, ChevronRight, MoreHorizontal, Settings } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

interface ProductOverview {
  id: string;
  name: string;
  type: 'Loan' | 'Card' | 'Service' | 'Account';
  balance: string;
  status: 'Active' | 'Pending' | 'Blocked' | 'Review';
  nextPayment?: string;
}

interface CompanyData {
  id: string;
  name: string;
  totalExposure: string;
  activeProductsCount: number;
  monthlyFees: string;
  nextBilling: string;
  products: ProductOverview[];
}

export const SMEProductsOverview: React.FC = () => {
  // Mock Data
  const companiesList: CompanyData[] = [
      {
          id: '1',
          name: 'TechNova Solutions Ltd.',
          totalExposure: '$450,000',
          activeProductsCount: 8,
          monthlyFees: '$249.00',
          nextBilling: 'Nov 01, 2024',
          products: [
              { id: 'LN-2023', name: 'Working Capital Loan', type: 'Loan', balance: '$125,400', status: 'Active', nextPayment: 'Nov 05' },
              { id: 'CC-9921', name: 'Corporate Platinum', type: 'Card', balance: '$12,500', status: 'Active', nextPayment: 'Nov 15' },
              { id: 'PR-001', name: 'Payroll Service', type: 'Service', balance: '-', status: 'Active' },
              { id: 'AC-8821', name: 'Business Checking', type: 'Account', balance: '$240,000', status: 'Active' }
          ]
      },
      {
          id: '2',
          name: 'GreenLeaf Logistics',
          totalExposure: '$85,000',
          activeProductsCount: 3,
          monthlyFees: '$99.00',
          nextBilling: 'Oct 31, 2024',
          products: [
              { id: 'LN-2024', name: 'Equipment Lease', type: 'Loan', balance: '$45,000', status: 'Active', nextPayment: 'Nov 10' },
              { id: 'CC-7711', name: 'Fuel Card', type: 'Card', balance: '$2,100', status: 'Active', nextPayment: 'Nov 20' },
              { id: 'AC-3321', name: 'Operations Account', type: 'Account', balance: '$12,500', status: 'Active' }
          ]
      },
      {
          id: '3',
          name: 'Quantum Dynamics',
          totalExposure: '$1.2M',
          activeProductsCount: 12,
          monthlyFees: '$599.00',
          nextBilling: 'Nov 01, 2024',
          products: [
              { id: 'LN-2022', name: 'Growth Term Loan', type: 'Loan', balance: '$850,000', status: 'Active', nextPayment: 'Nov 01' },
              { id: 'CC-5522', name: 'Executive Card', type: 'Card', balance: '$45,000', status: 'Blocked', nextPayment: 'Overdue' }
          ]
      }
  ];

  const [selectedCompany, setSelectedCompany] = useState<CompanyData>(companiesList[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredCompanies = companiesList.filter(c =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCompany = (comp: CompanyData) => {
      setSelectedCompany(comp);
      setSearchTerm("");
      setShowDropdown(false);
  };

  const getStatusColor = (status: string) => {
      switch(status) {
          case 'Active': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
          case 'Pending': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
          case 'Blocked': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
          case 'Review': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
          default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
      }
  };

  const getTypeIcon = (type: string) => {
      switch(type) {
          case 'Loan': return <DollarSign size={18} />;
          case 'Card': return <CreditCard size={18} />;
          case 'Service': return <Briefcase size={18} />;
          case 'Account': return <Package size={18} />;
          default: return <Package size={18} />;
      }
  };

  const pieData = [
      { name: 'Loans', value: selectedCompany.products.filter(p => p.type === 'Loan').length, color: '#10b981' },
      { name: 'Cards', value: selectedCompany.products.filter(p => p.type === 'Card').length, color: '#6366f1' },
      { name: 'Services', value: selectedCompany.products.filter(p => p.type === 'Service').length, color: '#f59e0b' },
      { name: 'Accounts', value: selectedCompany.products.filter(p => p.type === 'Account').length, color: '#3b82f6' },
  ].filter(d => d.value > 0);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
         {/* Search Bar */}
        <div className="relative z-20">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                    type="text"
                    placeholder="Search company for product dashboard..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowDropdown(true);
                    }}
                    onFocus={() => setShowDropdown(true)}
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-slate-900 dark:text-white"
                />
            </div>
            {showDropdown && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)}></div>
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden z-20">
                        {filteredCompanies.length > 0 ? (
                            filteredCompanies.map(comp => (
                                <button
                                    key={comp.id}
                                    onClick={() => handleSelectCompany(comp)}
                                    className="w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 border-b border-slate-100 dark:border-slate-800 last:border-0 flex justify-between items-center group transition-colors"
                                >
                                    <div>
                                        <p className="font-bold text-slate-900 dark:text-white text-sm">{comp.name}</p>
                                    </div>
                                    {selectedCompany.id === comp.id && <Check size={16} className="text-indigo-600 dark:text-indigo-400" />}
                                </button>
                            ))
                        ) : (
                            <div className="p-4 text-center text-slate-500 text-sm">No companies found</div>
                        )}
                    </div>
                </>
            )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 rounded-lg"><Package size={20} /></div>
                    <span className="text-xs font-bold uppercase text-slate-500">Active Products</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{selectedCompany.activeProductsCount}</p>
                <p className="text-xs text-slate-400 font-medium mt-1">Across {pieData.length} categories</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-lg"><Briefcase size={20} /></div>
                    <span className="text-xs font-bold uppercase text-slate-500">Loan Exposure</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{selectedCompany.totalExposure}</p>
                <p className="text-xs text-emerald-500 font-medium mt-1">Good Standing</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg"><CreditCard size={20} /></div>
                    <span className="text-xs font-bold uppercase text-slate-500">Monthly Fees</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{selectedCompany.monthlyFees}</p>
                <p className="text-xs text-slate-400 font-medium mt-1">Service Charges</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-lg"><Calendar size={20} /></div>
                    <span className="text-xs font-bold uppercase text-slate-500">Next Billing</span>
                </div>
                <p className="text-lg font-bold text-slate-900 dark:text-white truncate">{selectedCompany.nextBilling}</p>
                <button className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline mt-1">View Invoice</button>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Products List */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4">Product Portfolio</h3>
                <div className="space-y-3">
                    {selectedCompany.products.map((product) => (
                        <div key={product.id} className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className={`p-2.5 rounded-xl ${
                                    product.type === 'Loan' ? 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600' :
                                    product.type === 'Card' ? 'bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600' :
                                    product.type === 'Account' ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600' :
                                    'bg-amber-100 dark:bg-amber-900/20 text-amber-600'
                                }`}>
                                    {getTypeIcon(product.type)}
                                </div>
                                <div>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white">{product.name}</p>
                                    <p className="text-xs text-slate-500">ID: {product.id} • {product.balance}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase border ${getStatusColor(product.status)}`}>
                                    {product.status}
                                </span>
                                <button className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                                    <Settings size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Distribution Chart */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 flex flex-col">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4">Product Distribution</h3>
                <div className="flex-1 w-full min-h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                ))}
                            </Pie>
                            <Tooltip 
                                contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                itemStyle={{ color: '#1e293b' }}
                            />
                            <Legend verticalAlign="bottom" height={36} iconType="circle" />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 text-center">
                    <p className="text-xs text-slate-500 mb-1">Most Utilized Category</p>
                    <p className="font-bold text-slate-900 dark:text-white text-lg">
                        {pieData.sort((a,b) => b.value - a.value)[0]?.name || 'N/A'}
                    </p>
                </div>
            </div>
        </div>
    </div>
  );
};
