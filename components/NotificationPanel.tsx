
import React from 'react';
import { Bell, Check, Info, AlertCircle, CheckCircle2, X } from 'lucide-react';
import { AppNotification } from '../types';

interface NotificationPanelProps {
  notifications: AppNotification[];
  onMarkAllRead: () => void;
  onClose: () => void;
  onNotificationClick: (id: string) => void;
  onViewAll: () => void;
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({ 
  notifications, 
  onMarkAllRead, 
  onClose,
  onNotificationClick,
  onViewAll
}) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'alert': return <AlertCircle size={16} className="text-red-500" />;
      case 'success': return <CheckCircle2 size={16} className="text-emerald-500" />;
      default: return <Info size={16} className="text-blue-500" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'alert': return 'bg-red-50 dark:bg-red-900/20';
      case 'success': return 'bg-emerald-50 dark:bg-emerald-900/20';
      default: return 'bg-blue-50 dark:bg-blue-900/20';
    }
  };

  return (
    <div className="absolute top-12 right-0 w-80 md:w-96 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
      <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
        <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <Bell size={16} className="text-indigo-500" /> Notifications
        </h3>
        <div className="flex items-center gap-2">
          <button 
            onClick={onMarkAllRead}
            className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
          >
            Mark all read
          </button>
          <button 
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      <div className="max-h-[400px] overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-slate-400">
            <Bell size={32} className="mx-auto mb-2 opacity-20" />
            <p className="text-sm">No notifications</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-700">
            {notifications.map((notification) => (
              <div 
                key={notification.id}
                onClick={() => onNotificationClick(notification.id)}
                className={`p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer flex gap-3 ${!notification.read ? 'bg-indigo-50/30 dark:bg-indigo-900/10' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${getBgColor(notification.type)}`}>
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-0.5">
                    <p className={`text-sm font-medium truncate pr-2 ${!notification.read ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-300'}`}>
                      {notification.title}
                    </p>
                    {!notification.read && (
                      <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0 mt-1.5"></span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                    {notification.message}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-2 font-medium">
                    {notification.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="p-2 border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-center">
        <button 
          onClick={() => {
            onViewAll();
            onClose();
          }}
          className="text-xs font-medium text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors py-1 w-full"
        >
          View all history
        </button>
      </div>
    </div>
  );
};
