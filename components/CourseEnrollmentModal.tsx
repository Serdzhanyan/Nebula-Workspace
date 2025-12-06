
import React, { useState } from 'react';
import { X, CheckCircle2, Loader2 } from 'lucide-react';
import { TrainingModule } from '../types';

interface CourseEnrollmentModalProps {
  course: TrainingModule;
  onClose: () => void;
  onConfirm: () => void;
}

export const CourseEnrollmentModal: React.FC<CourseEnrollmentModalProps> = ({ course, onClose, onConfirm }) => {
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onConfirm();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white">Confirm Enrollment</h3>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="flex gap-4 mb-6">
            <img 
              src={course.thumbnail} 
              alt={course.title} 
              className="w-20 h-20 rounded-lg object-cover shadow-sm bg-slate-100" 
            />
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1 block">
                {course.category}
              </span>
              <h4 className="font-bold text-slate-800 dark:text-slate-100 leading-tight mb-1">
                {course.title}
              </h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Instructor: {course.instructor}
              </p>
            </div>
          </div>

          <div className="mb-6">
             <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Add a note to your manager (optional)
             </label>
             <textarea 
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="I'm taking this course because..."
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none h-24 text-slate-800 dark:text-slate-200"
             />
          </div>

          <div className="flex items-center gap-3">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle2 size={18} />}
              {loading ? 'Enrolling...' : 'Confirm Enrollment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
