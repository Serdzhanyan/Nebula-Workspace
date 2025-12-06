
import React, { useState } from 'react';
import { ArrowLeft, Bell, Check, Info, AlertCircle, CheckCircle2, Trash2, Filter } from 'lucide-react';
import { Notification } from '../types';

interface NotificationsPageProps {
  notifications: Notification[];
  onMarkAllRead: () => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
  onBack: () => void;
  onNotificationClick: (id: string) => void;
}

export const NotificationsPage: React.FC<NotificationsPageProps> = ({ 
  notifications, 
  onMarkAllRead, 
  onDelete,
  onClearAll,
  onBack,
  onNotificationClick 
}) => {
  const [filter, setFilter] = useState<'all' | 'unread' | 'alert' | 'info' | 'success'>('all');

  const getIcon = (type: string) => {
    switch (type) {
      case 'alert': return <AlertCircle size={20} className="text-red-500" />;
      case 'success': return <CheckCircle2 size={20} className="text-emerald-500" />;
      default: return <Info size={20} className="text-blue-500" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'alert': return 'bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-900/30';
      case 'success': return 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-900/30';
      default: return 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-900/30';
    }
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !n.read;
    return n.type === filter;
  });

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300 max-w-4xl mx-auto h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors mb-2 text-sm font-medium"
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </button>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <Bell className="text-indigo-500" /> Notifications
          </h2>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={onMarkAllRead}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            <Check size={16} /> Mark all read
          </button>
          <button 
            onClick={onClearAll}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-200 dark:hover:border-red-800 transition-colors"
          >
            <Trash2 size={16} /> Clear all
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-2 scrollbar-hide">
         {(['all', 'unread', 'alert', 'info', 'success'] as const).map(f => (
            <button
               key={f}
               onClick={() => setFilter(f)}
               className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors capitalize border ${
                  filter === f 
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200 dark:shadow-none' 
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400'
               }`}
            >
               {f}
            </button>
         ))}
      </div>

      {/* List */}
      <div className="space-y-3 flex-1 overflow-y-auto pr-2 pb-4">
         {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 border-dashed">
                <Bell size={48} className="mb-4 text-slate-200 dark:text-slate-600" />
                <p className="text-lg font-medium text-slate-600 dark:text-slate-300">No notifications found</p>
                <p className="text-sm">You're all caught up!</p>
            </div>
         ) : (
            filteredNotifications.map(notification => (
                <div 
                    key={notification.id}
                    onClick={() => onNotificationClick(notification.id)}
                    className={`group relative p-5 rounded-2xl border transition-all cursor-pointer flex gap-4 ${
                        !notification.read 
                        ? 'bg-white dark:bg-slate-800 border-indigo-200 dark:border-indigo-800 shadow-sm ring-1 ring-indigo-50 dark:ring-indigo-900/20' 
                        : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 opacity-90 hover:opacity-100 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md'
                    }`}
                >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${getBgColor(notification.type)}`}>
                        {getIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                            <h4 className={`font-bold text-base truncate pr-8 ${!notification.read ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                                {notification.title}
                            </h4>
                            <span className="text-xs text-slate-400 whitespace-nowrap bg-white dark:bg-slate-700 px-2 py-0.5 rounded-full border border-slate-100 dark:border-slate-600">
                                {notification.time}
                            </span>
                        </div>
                        <p className={`text-sm leading-relaxed ${!notification.read ? 'text-slate-700 dark:text-slate-200' : 'text-slate-500 dark:text-slate-400'}`}>
                            {notification.message}
                        </p>
                    </div>

                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(notification.id);
                        }}
                        className="absolute top-4 right-4 p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                        title="Delete notification"
                    >
                        <Trash2 size={16} />
                    </button>

                    {!notification.read && (
                        <div className="absolute top-5 right-5 w-2 h-2 rounded-full bg-indigo-500 ring-4 ring-white dark:ring-slate-800"></div>
                    )}
                </div>
            ))
         )}
      </div>
    </div>
  );
};
