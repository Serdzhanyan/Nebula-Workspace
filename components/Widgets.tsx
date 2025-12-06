
import React from 'react';
import { FileText, FileSpreadsheet, File as FileIcon, Cake, UserPlus, Brain, Zap, Users, BookOpen, ChevronRight, PlayCircle } from 'lucide-react';
import { DocumentItem, Employee, TrainingModule } from '../types';

// --- Documents Widget ---
export const DocumentsWidget: React.FC = () => {
  const docs: DocumentItem[] = [
    { id: '1', name: 'Q3 Financial Report', type: 'pdf', date: 'Oct 24' },
    { id: '2', name: 'Project Alpha Specs', type: 'doc', date: 'Oct 22' },
    { id: '3', name: 'Employee Handbook', type: 'pdf', date: 'Sep 15' },
    { id: '4', name: 'Budget Forecast', type: 'sheet', date: 'Oct 20' },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileIcon className="text-red-500 w-4 h-4" />;
      case 'sheet': return <FileSpreadsheet className="text-green-500 w-4 h-4" />;
      default: return <FileText className="text-blue-500 w-4 h-4" />;
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {docs.map(doc => (
        <div key={doc.id} className="flex items-center justify-between p-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors cursor-pointer group">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-100 dark:bg-slate-700/50 rounded-md group-hover:bg-white dark:group-hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700">
              {getIcon(doc.type)}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{doc.name}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500">{doc.date}</p>
            </div>
          </div>
          <button className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium">View</button>
        </div>
      ))}
    </div>
  );
};

// --- Training Widget ---
interface TrainingWidgetProps {
  onCatalogClick?: () => void;
}

export const TrainingWidget: React.FC<TrainingWidgetProps> = ({ onCatalogClick }) => {
  const modules: TrainingModule[] = [
    { id: '2', title: 'Advanced React Patterns', progress: 45, dueDate: 'Nov 01', lastAccessed: '2h ago', category: 'Dev' },
    { id: '3', title: 'Leadership 101', progress: 10, dueDate: 'Nov 15', lastAccessed: '1d ago', category: 'Mgmt' },
    { id: '5', title: 'Agile Methodologies', progress: 75, dueDate: 'Nov 10', lastAccessed: '2d ago', category: 'Product' },
    { id: '6', title: 'Data Security Fund.', progress: 30, dueDate: 'Nov 20', lastAccessed: '3d ago', category: 'Sec' },
  ];

  const getCategoryColor = (cat?: string) => {
      switch(cat) {
          case 'Dev': return 'bg-blue-400';
          case 'Mgmt': return 'bg-purple-400';
          case 'Product': return 'bg-orange-400';
          case 'Sec': return 'bg-emerald-400';
          default: return 'bg-slate-400';
      }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 space-y-2.5">
        {modules.slice(0, 4).map(mod => (
          <div key={mod.id} className="group relative flex items-center gap-3 p-2.5 rounded-xl border border-transparent hover:border-indigo-100 dark:hover:border-indigo-900 bg-slate-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md transition-all duration-300">
             
             {/* Progress */}
             <div className="shrink-0 relative w-9 h-9">
               <svg className="w-full h-full transform -rotate-90">
                  <circle cx="18" cy="18" r="15" stroke="currentColor" strokeWidth="2.5" fill="transparent" className="text-slate-200 dark:text-slate-700" />
                  <circle cx="18" cy="18" r="15" stroke="currentColor" strokeWidth="2.5" fill="transparent" strokeDasharray={94.2} strokeDashoffset={94.2 - (94.2 * mod.progress) / 100} className="text-indigo-500" strokeLinecap="round" />
               </svg>
               <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-slate-600 dark:text-slate-300">
                 {mod.progress}%
               </span>
             </div>
             
             <div className="flex-1 min-w-0">
                 <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-200 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {mod.title}
                 </h4>
                 <div className="flex items-center gap-1.5 mt-0.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${getCategoryColor(mod.category)}`}></span>
                    <span className="text-[10px] text-slate-400">{mod.category} • {mod.lastAccessed}</span>
                 </div>
             </div>
             
             <div className="w-6 h-6 rounded-full bg-white dark:bg-slate-700 shadow-sm flex items-center justify-center text-indigo-500 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all">
                <PlayCircle size={12} className="ml-0.5" />
             </div>
          </div>
        ))}
      </div>
      
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onCatalogClick?.();
        }}
        className="mt-3 w-full py-2 flex items-center justify-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-800 transition-all shadow-sm"
      >
        <BookOpen size={14} />
        Course Catalog
      </button>
    </div>
  );
};

// --- Talents (Employees) Widget ---
export const TalentsWidget: React.FC = () => {
  const talents = [
    { name: 'Alice Chen', role: 'Senior UX Designer' },
    { name: 'Mark Vos', role: 'System Architect' },
    { name: 'Sarah Lee', role: 'Product Manager' },
    { name: 'James D.', role: 'DevOps Engineer' },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {talents.map((t, i) => (
        <div key={i} className="flex items-center gap-2 p-2 border border-slate-100 dark:border-slate-700 rounded-lg hover:shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-all">
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-400 to-purple-400 flex items-center justify-center text-white text-xs font-bold shrink-0">
            {t.name.charAt(0)}
          </div>
          <div className="overflow-hidden min-w-0">
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 truncate">{t.name}</p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{t.role}</p>
          </div>
        </div>
      ))}
      <div className="col-span-2 flex justify-center mt-2">
         <button className="flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
            <Users size={12}/> View All Talents
         </button>
      </div>
    </div>
  );
};

// --- Birthdays Widget ---
export const BirthdaysWidget: React.FC = () => {
  return (
    <div className="relative overflow-hidden h-full flex flex-col items-center justify-center text-center space-y-3">
      <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-pink-100 dark:bg-pink-900/20 rounded-full opacity-50 blur-xl"></div>
      <Cake className="text-pink-500 w-8 h-8 mb-1" />
      <div>
        <p className="font-semibold text-slate-700 dark:text-slate-200">Emma Watson</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">Turning 28 tomorrow</p>
      </div>
      <div className="w-full h-px bg-slate-100 dark:bg-slate-700 my-2"></div>
      <div>
        <p className="font-semibold text-slate-700 dark:text-slate-200">Liam Johnson</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">Nov 3rd</p>
      </div>
      <button className="text-xs text-pink-500 dark:text-pink-400 font-medium hover:text-pink-600 dark:hover:text-pink-300 mt-2">Send Wishes</button>
    </div>
  );
};

// --- New Employees Widget ---
export const NewEmployeesWidget: React.FC = () => {
  const newHires: Employee[] = [
    { id: '101', name: 'Sofia Davis', role: 'Marketing Lead', department: 'Marketing', avatarUrl: 'https://picsum.photos/100/100?random=1' },
    { id: '102', name: 'Jackson Pot', role: 'Jr. Developer', department: 'Engineering', avatarUrl: 'https://picsum.photos/100/100?random=2' },
  ];

  return (
    <div className="flex flex-col gap-4">
      {newHires.map(emp => (
        <div key={emp.id} className="flex items-center gap-3">
          <img src={emp.avatarUrl} alt={emp.name} className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-slate-700 shadow-sm" />
          <div>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{emp.name}</p>
            <p className="text-xs text-indigo-500 dark:text-indigo-400 font-medium">{emp.role}</p>
          </div>
        </div>
      ))}
      <button className="flex items-center justify-center gap-2 w-full py-2 bg-slate-50 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
        <UserPlus size={14} /> Onboard New Hire
      </button>
    </div>
  );
};

// --- About Us Widget ---
export const AboutUsWidget: React.FC<{ description: string, onRegenerate: () => void, loading: boolean }> = ({ description, onRegenerate, loading }) => {
  return (
    <div className="h-full flex flex-col justify-between">
      <div className="prose prose-sm dark:prose-invert">
        <h4 className="text-slate-900 dark:text-white font-bold mb-2 flex items-center gap-2">
          <Brain size={16} className="text-indigo-600 dark:text-indigo-400" />
          Mission & Vision
        </h4>
        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
          {description}
        </p>
      </div>
      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
        <button 
          onClick={onRegenerate}
          disabled={loading}
          className="flex items-center gap-2 text-xs text-indigo-600 dark:text-indigo-400 font-medium hover:bg-indigo-50 dark:hover:bg-indigo-900/30 px-3 py-1.5 rounded-md transition-colors w-fit disabled:opacity-50"
        >
          <Zap size={12} className={loading ? "animate-spin" : ""} />
          {loading ? 'Thinking...' : 'Rewrite with AI'}
        </button>
      </div>
    </div>
  );
};
