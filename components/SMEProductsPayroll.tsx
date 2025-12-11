
import React, { useState } from 'react';
import { Users, UploadCloud, Search, Check, FileText, DollarSign, Calendar, AlertCircle, CheckCircle2, Clock, X, Download, Play, MoreHorizontal } from 'lucide-react';

interface PayrollEmployee {
  id: string;
  name: string;
  account: string;
  amount: string;
  status: 'Pending' | 'Processed' | 'Failed';
}

interface PayrollProject {
  id: string;
  name: string;
  type: 'Salary' | 'Bonus' | 'Contractor';
  period: string;
  totalAmount: string;
  employeeCount: number;
  status: 'Draft' | 'Processing' | 'Completed' | 'Failed';
  uploadDate: string;
  employees: PayrollEmployee[]; 
}

interface CompanyData {
  id: string;
  name: string;
  projects: PayrollProject[];
}

export const SMEProductsPayroll: React.FC = () => {
  // Mock Data
  const companiesList: CompanyData[] = [
      {
          id: '1',
          name: 'TechNova Solutions Ltd.',
          projects: [
              { 
                  id: 'PR-001', 
                  name: 'Main Office Staff - Oct', 
                  type: 'Salary', 
                  period: 'Oct 01 - Oct 31, 2024', 
                  totalAmount: '$450,200.00', 
                  employeeCount: 112, 
                  status: 'Draft', 
                  uploadDate: 'Oct 24, 2024',
                  employees: [
                      { id: 'EMP-001', name: 'John Doe', account: '**** 1234', amount: '$4,500.00', status: 'Pending' },
                      { id: 'EMP-002', name: 'Jane Smith', account: '**** 5678', amount: '$5,200.00', status: 'Pending' }
                  ]
              },
              { 
                  id: 'PR-002', 
                  name: 'Sales Commission Q3', 
                  type: 'Bonus', 
                  period: 'Jul 01 - Sep 30, 2024', 
                  totalAmount: '$125,000.00', 
                  employeeCount: 15, 
                  status: 'Completed', 
                  uploadDate: 'Oct 05, 2024',
                  employees: [
                      { id: 'EMP-010', name: 'Mike Ross', account: '**** 9921', amount: '$12,000.00', status: 'Processed' }
                  ]
              }
          ]
      },
      {
          id: '2',
          name: 'GreenLeaf Logistics',
          projects: [
              { 
                  id: 'PR-003', 
                  name: 'Driver Weekly Payout', 
                  type: 'Contractor', 
                  period: 'Oct 14 - Oct 20, 2024', 
                  totalAmount: '$68,500.00', 
                  employeeCount: 45, 
                  status: 'Processing', 
                  uploadDate: 'Oct 21, 2024',
                  employees: []
              }
          ]
      },
      {
          id: '3',
          name: 'Quantum Dynamics',
          projects: []
      }
  ];

  const [selectedCompany, setSelectedCompany] = useState<CompanyData>(companiesList[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  
  // Modal States
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<PayrollProject | null>(null);
  
  // New Project Form
  const [newProject, setNewProject] = useState({ name: '', type: 'Salary', period: '' });

  const filteredCompanies = companiesList.filter(c =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCompany = (comp: CompanyData) => {
      setSelectedCompany(comp);
      setSearchTerm("");
      setShowDropdown(false);
      setSelectedProject(null);
  };

  const handleUpload = (e: React.FormEvent) => {
      e.preventDefault();
      const project: PayrollProject = {
          id: `PR-${Date.now()}`,
          name: newProject.name,
          type: newProject.type as any,
          period: newProject.period,
          totalAmount: '$0.00', // Mock initial
          employeeCount: 0,
          status: 'Draft',
          uploadDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          employees: []
      };
      
      const updatedCompany = { ...selectedCompany, projects: [project, ...selectedCompany.projects] };
      setSelectedCompany(updatedCompany);
      setShowUploadModal(false);
      setNewProject({ name: '', type: 'Salary', period: '' });
  };

  const handleProcess = (projectId: string) => {
      const updatedProjects = selectedCompany.projects.map(p => 
          p.id === projectId ? { ...p, status: 'Processing' as const } : p
      );
      setSelectedCompany({ ...selectedCompany, projects: updatedProjects });
      if (selectedProject?.id === projectId) setSelectedProject(null);
  };

  const getStatusColor = (status: string) => {
      switch(status) {
          case 'Completed': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
          case 'Processing': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
          case 'Draft': return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700';
          case 'Failed': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
          default: return 'bg-slate-100 text-slate-700';
      }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 relative">
         {/* Search Bar */}
        <div className="relative z-20">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                    type="text"
                    placeholder="Search company for payroll projects..."
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

        {/* Upload Modal */}
        {showUploadModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setShowUploadModal(false)}>
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200 dark:border-slate-700" onClick={e => e.stopPropagation()}>
                    <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white">Upload Payroll Batch</h3>
                        <button onClick={() => setShowUploadModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20}/></button>
                    </div>
                    <form onSubmit={handleUpload} className="p-6 space-y-4">
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Project Name</label>
                            <input 
                                type="text" 
                                required
                                placeholder="e.g. November Salaries"
                                value={newProject.name}
                                onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Type</label>
                                <select 
                                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={newProject.type}
                                    onChange={(e) => setNewProject({...newProject, type: e.target.value})}
                                >
                                    <option>Salary</option>
                                    <option>Bonus</option>
                                    <option>Contractor</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Pay Period</label>
                                <input 
                                    type="text" 
                                    placeholder="e.g. Nov 1 - 30"
                                    value={newProject.period}
                                    onChange={(e) => setNewProject({...newProject, period: e.target.value})}
                                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                        </div>
                        
                        <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-8 text-center bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
                            <UploadCloud size={32} className="mx-auto text-indigo-500 mb-2" />
                            <p className="text-sm font-medium text-slate-900 dark:text-white">Click to upload file</p>
                            <p className="text-xs text-slate-500">CSV, XLS, or XML (Max 10MB)</p>
                        </div>

                        <button type="submit" className="w-full py-2.5 bg-indigo-600 text-white rounded-lg font-bold text-sm hover:bg-indigo-700 mt-2">Create & Upload</button>
                    </form>
                </div>
            </div>
        )}

        {/* Project Details Modal */}
        {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setSelectedProject(null)}>
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200 dark:border-slate-700 flex flex-col max-h-[85vh]" onClick={e => e.stopPropagation()}>
                    <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                        <div>
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white">{selectedProject.name}</h3>
                            <p className="text-xs text-slate-500">{selectedProject.id} • {selectedProject.period}</p>
                        </div>
                        <button onClick={() => setSelectedProject(null)} className="text-slate-400 hover:text-slate-600"><X size={20}/></button>
                    </div>
                    
                    <div className="p-6 overflow-y-auto flex-1">
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-700 text-center">
                                <p className="text-xs text-slate-500 uppercase font-bold">Total Payout</p>
                                <p className="text-lg font-bold text-slate-900 dark:text-white">{selectedProject.totalAmount}</p>
                            </div>
                            <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-700 text-center">
                                <p className="text-xs text-slate-500 uppercase font-bold">Employees</p>
                                <p className="text-lg font-bold text-slate-900 dark:text-white">{selectedProject.employeeCount}</p>
                            </div>
                            <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-700 text-center">
                                <p className="text-xs text-slate-500 uppercase font-bold">Status</p>
                                <p className={`text-lg font-bold ${
                                    selectedProject.status === 'Completed' ? 'text-emerald-500' :
                                    selectedProject.status === 'Processing' ? 'text-blue-500' :
                                    selectedProject.status === 'Failed' ? 'text-red-500' : 'text-slate-500'
                                }`}>{selectedProject.status}</p>
                            </div>
                        </div>

                        <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-3">Employee List</h4>
                        <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-slate-50 dark:bg-slate-900/50 text-xs uppercase text-slate-500">
                                    <tr>
                                        <th className="p-3">Name</th>
                                        <th className="p-3">Account</th>
                                        <th className="p-3">Amount</th>
                                        <th className="p-3 text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                                    {selectedProject.employees && selectedProject.employees.length > 0 ? (
                                        selectedProject.employees.map(emp => (
                                            <tr key={emp.id}>
                                                <td className="p-3 font-medium">{emp.name}</td>
                                                <td className="p-3 text-slate-500 font-mono">{emp.account}</td>
                                                <td className="p-3 font-bold">{emp.amount}</td>
                                                <td className="p-3 text-right">
                                                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase border ${
                                                        emp.status === 'Processed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20' : 
                                                        'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400'
                                                    }`}>
                                                        {emp.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className="p-6 text-center text-slate-400 italic">No employee details available.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3">
                         <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-2">
                             <Download size={14} /> Report
                         </button>
                         {selectedProject.status === 'Draft' && (
                             <button 
                                onClick={() => handleProcess(selectedProject.id)}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors flex items-center gap-2"
                             >
                                 <Play size={14} /> Process Payments
                             </button>
                         )}
                    </div>
                </div>
            </div>
        )}

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                    <Users size={20} className="text-indigo-500" /> Payroll Projects: {selectedCompany.name}
                </h3>
                <button 
                    onClick={() => setShowUploadModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm"
                >
                    <UploadCloud size={16} /> Upload Batch
                </button>
            </div>
            
            {selectedCompany.projects.length > 0 ? (
                <div className="space-y-4">
                     {selectedCompany.projects.map((proj) => (
                         <div key={proj.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group" onClick={() => setSelectedProject(proj)}>
                             <div className="flex justify-between items-start mb-3">
                                 <div className="flex items-center gap-3">
                                     <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500 group-hover:text-indigo-600 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20 transition-colors">
                                         <FileText size={20} />
                                     </div>
                                     <div>
                                         <p className="font-bold text-slate-900 dark:text-white">{proj.name}</p>
                                         <p className="text-xs text-slate-500 font-mono">ID: {proj.id} • {proj.type}</p>
                                     </div>
                                 </div>
                                 <div className="flex items-center gap-3">
                                     <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase border ${getStatusColor(proj.status)}`}>
                                         {proj.status}
                                     </span>
                                     <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"><MoreHorizontal size={18}/></button>
                                 </div>
                             </div>
                             
                             <div className="grid grid-cols-3 gap-4 text-sm pl-12">
                                 <div>
                                     <span className="text-slate-500 text-xs block uppercase font-bold tracking-wide">Period</span>
                                     <span className="font-medium text-slate-800 dark:text-white flex items-center gap-1"><Calendar size={12} className="text-slate-400" /> {proj.period}</span>
                                 </div>
                                 <div>
                                     <span className="text-slate-500 text-xs block uppercase font-bold tracking-wide">Total Amount</span>
                                     <span className="font-medium text-slate-800 dark:text-white flex items-center gap-1"><DollarSign size={12} className="text-slate-400" /> {proj.totalAmount}</span>
                                 </div>
                                 <div>
                                     <span className="text-slate-500 text-xs block uppercase font-bold tracking-wide">Employees</span>
                                     <span className="font-medium text-slate-800 dark:text-white flex items-center gap-1"><Users size={12} className="text-slate-400" /> {proj.employeeCount}</span>
                                 </div>
                             </div>
                         </div>
                     ))}
                </div>
            ) : (
                <div className="text-center py-12 text-slate-400 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-xl">
                    <Users size={32} className="mx-auto mb-2 opacity-50" />
                    <p>No payroll projects found for this company.</p>
                </div>
            )}
        </div>
    </div>
  );
};
