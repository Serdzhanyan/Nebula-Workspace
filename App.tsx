
import React, { useState, useEffect } from 'react';
import { LayoutGrid, Bell, Search, Settings, Moon, Sun, MessageCircle } from 'lucide-react';
import { generateAboutUs } from './services/geminiService';
import { NewsItem, Task, TrainingModule, Notification } from './types';

// Widgets
import { NewsWidget } from './components/NewsWidget';
import { DocumentsWidget } from './components/Widgets';
import { PerformanceWidget } from './components/PerformanceWidget';
import { TrainingWidget } from './components/Widgets';
import { TalentsWidget } from './components/Widgets';
import { TrackerWidget } from './components/TrackerWidget';
import { AboutUsWidget } from './components/Widgets';
import { BirthdaysWidget } from './components/Widgets';
import { NewEmployeesWidget } from './components/Widgets';
import { AllNewsPage } from './components/AllNewsPage';
import { NewsDetailPage } from './components/NewsDetailPage';
import { PerformancePage } from './components/PerformancePage';
import { TaskDetailPage } from './components/TaskDetailPage';
import { TrainingPage } from './components/TrainingPage';
import { CourseCatalogPage } from './components/CourseCatalogPage';
import { CourseDetailPage } from './components/CourseDetailPage';
import { CoursePreviewPage } from './components/CoursePreviewPage';
import { CourseEnrollmentModal } from './components/CourseEnrollmentModal';
import { NotificationPanel } from './components/NotificationPanel';
import { NotificationsPage } from './components/NotificationsPage';
import { ChatDrawer } from './components/ChatDrawer';
import { ProfileMenu } from './components/ProfileMenu';
import { MyProfilePage } from './components/MyProfilePage';
import { SettingsPage } from './components/SettingsPage';
import { MicroservicesPage } from './components/MicroservicesPage';
import { SystemMetricsPage } from './components/SystemMetricsPage';
import { UserManagementPage, User } from './components/UserManagementPage';
import { UserProfilePage } from './components/UserProfilePage';
import { DCAPPage } from './components/DCAPPage';
import { CRMPage } from './components/CRMPage';
import { SystemConfigPage } from './components/SystemConfigPage';

const Card: React.FC<{ 
  title: string; 
  className?: string; 
  children: React.ReactNode;
  headerAction?: React.ReactNode;
  onClick?: () => void;
}> = ({ title, className = "", children, headerAction, onClick }) => (
  <div 
    onClick={onClick}
    className={`bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 p-5 flex flex-col transition-all duration-300 ${className} ${onClick ? 'cursor-pointer hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:ring-4 hover:ring-indigo-50/50 dark:hover:ring-indigo-900/20' : 'hover:shadow-md'}`}
  >
    <div className="flex items-center justify-between mb-4">
      <h3 className={`font-bold tracking-tight ${onClick ? 'text-indigo-900 dark:text-indigo-300 group-hover:text-indigo-700 dark:group-hover:text-indigo-200' : 'text-slate-800 dark:text-slate-100'}`}>{title}</h3>
      {headerAction}
    </div>
    <div className="flex-1 overflow-hidden">
      {children}
    </div>
  </div>
);

function App() {
  const [view, setView] = useState<'dashboard' | 'news' | 'newsDetail' | 'performance' | 'taskDetail' | 'training' | 'catalog' | 'courseDetail' | 'coursePreview' | 'notifications' | 'profile' | 'settings' | 'microservices' | 'systemMetrics' | 'userManagement' | 'userProfile' | 'dcap' | 'crm' | 'systemConfig'>('dashboard');
  const [previousView, setPreviousView] = useState<'dashboard' | 'performance'>('dashboard');
  const [selectedNewsItem, setSelectedNewsItem] = useState<NewsItem | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<TrainingModule | null>(null);
  const [selectedUserForManagement, setSelectedUserForManagement] = useState<User | null>(null);
  const [performanceTab, setPerformanceTab] = useState('tasks');
  const [aboutUsText, setAboutUsText] = useState("Nebula Workspace is an AI-driven environment designed to boost productivity.");
  const [aboutLoading, setAboutLoading] = useState(false);
  
  // Enrollment Modal State
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [courseToEnroll, setCourseToEnroll] = useState<TrainingModule | null>(null);

  // Notification State
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: '1', title: 'New Task Assigned', message: 'Sarah assigned "Q4 Roadmap Review" to you.', time: '5m ago', read: false, type: 'info' },
    { id: '2', title: 'Meeting Reminder', message: 'All-Hands meeting starts in 15 minutes.', time: '15m ago', read: false, type: 'alert' },
    { id: '3', title: 'Course Completed', message: 'Congratulations! You completed "Security Basics".', time: '2h ago', read: true, type: 'success' },
    { id: '4', title: 'System Update', message: 'Nebula will be under maintenance tonight at 2 AM.', time: '1d ago', read: true, type: 'info' }
  ]);

  // Chat State
  const [showChat, setShowChat] = useState(false);

  // Profile State
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [userStatus, setUserStatus] = useState<'online' | 'busy' | 'offline'>('online');

  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('theme')) {
        return localStorage.getItem('theme') as 'light' | 'dark';
    }
    return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleGenerateAbout = async () => {
    setAboutLoading(true);
    const text = await generateAboutUs();
    setAboutUsText(text);
    setAboutLoading(false);
  };

  useEffect(() => {
    handleGenerateAbout();
  }, []);

  const handleNewsClick = (item: NewsItem) => {
    setSelectedNewsItem(item);
    setView('newsDetail');
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    if (view === 'performance') {
      setPreviousView('performance');
    } else {
      setPreviousView('dashboard');
    }
    setView('taskDetail');
  };

  const handleCourseClick = (course: TrainingModule) => {
    setSelectedCourse(course);
    setView('courseDetail');
  };

  const handleTaskDetailBack = () => {
    setView(previousView);
    setSelectedTask(null);
  };

  const navigateToPerformance = (tab: string = 'tasks') => {
    setPerformanceTab(tab);
    setView('performance');
  };

  // Course Catalog Logic
  const handlePreviewCourse = (course: TrainingModule) => {
    setSelectedCourse(course);
    setView('coursePreview');
  };

  const handleEnrollClick = (course: TrainingModule) => {
    setCourseToEnroll(course);
    setShowEnrollModal(true);
  };

  const confirmEnrollment = () => {
    setShowEnrollModal(false);
    // Ideally update user's enrolled courses here
    alert("Successfully enrolled! Redirecting to your learning dashboard...");
    setView('training');
  };

  // Notification Logic
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNotificationClick = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAllNotifications = () => {
    if (window.confirm("Are you sure you want to clear all notifications?")) {
      setNotifications([]);
    }
  };

  const handleViewAllNotifications = () => {
    setView('notifications');
    setShowNotifications(false);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
        alert("Signing out... (Mock)");
        setView('dashboard');
    }
  };
  
  // User Management Logic
  const handleUserClick = (user: User) => {
      setSelectedUserForManagement(user);
      setView('userProfile');
  };

  return (
    <div className={`min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 relative flex flex-col ${view === 'crm' ? 'h-screen overflow-hidden' : 'pb-12'}`}>
      <ChatDrawer isOpen={showChat} onClose={() => setShowChat(false)} />

      {/* Enrollment Modal */}
      {showEnrollModal && courseToEnroll && (
        <CourseEnrollmentModal 
           course={courseToEnroll}
           onClose={() => setShowEnrollModal(false)}
           onConfirm={confirmEnrollment}
        />
      )}

      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between shrink-0">
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => setView('microservices')}
          title="Control Panel"
        >
          <div className="bg-indigo-600 dark:bg-indigo-500 p-2.5 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-indigo-200 dark:shadow-none">
            <LayoutGrid className="text-white w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-indigo-600 dark:from-white dark:to-indigo-400 tracking-tight hidden sm:block">Nebula Workspace</h1>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden md:flex bg-slate-100 dark:bg-slate-800 rounded-xl px-4 py-2.5 items-center w-64 border border-transparent focus-within:border-indigo-300 dark:focus-within:border-indigo-700 transition-all">
            <Search className="text-slate-400 w-4 h-4 mr-2" />
            <input 
              type="text" 
              placeholder="Search anything..." 
              className="bg-transparent border-none outline-none text-sm w-full placeholder-slate-400 dark:text-slate-200"
            />
          </div>

          <button 
             onClick={toggleTheme}
             className="p-2.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
             {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button 
             onClick={() => setShowChat(true)}
             className="p-2.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors relative"
          >
             <MessageCircle size={20} />
             {/* Mock unread chat badge */}
             <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border border-white dark:border-slate-900"></span>
          </button>

          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className={`p-2.5 rounded-xl transition-colors relative ${showNotifications ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border border-white dark:border-slate-900 animate-pulse"></span>
              )}
            </button>
            {showNotifications && (
              <NotificationPanel 
                notifications={notifications}
                onMarkAllRead={markAllNotificationsRead}
                onClose={() => setShowNotifications(false)}
                onNotificationClick={handleNotificationClick}
                onViewAll={handleViewAllNotifications}
              />
            )}
          </div>
          
          <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-1 hidden sm:block"></div>
          
          <div className="relative">
             <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-3 pl-1 hover:opacity-80 transition-opacity"
             >
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-200 leading-none">Alex J.</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Product Lead</p>
                </div>
                <div className="relative">
                    <img 
                      src="https://picsum.photos/100/100?random=user" 
                      alt="Profile" 
                      className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-700 shadow-sm"
                    />
                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-slate-900 ${
                       userStatus === 'online' ? 'bg-emerald-500' : userStatus === 'busy' ? 'bg-red-500' : 'bg-slate-400'
                    }`}></div>
                </div>
             </button>
             {showProfileMenu && (
                <ProfileMenu 
                   onClose={() => setShowProfileMenu(false)}
                   onViewProfile={() => setView('profile')}
                   onViewSettings={() => setView('settings')}
                   onLogout={handleLogout}
                   status={userStatus}
                   onStatusChange={setUserStatus}
                />
             )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={view === 'crm' ? "flex-1 flex flex-col overflow-hidden relative" : "max-w-7xl mx-auto px-6 py-8 w-full"}>
        {view === 'dashboard' && (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-min">
              
              {/* Row 1 */}
              <Card 
                title="Company News" 
                className="col-span-1 md:col-span-2 min-h-[320px] group"
                onClick={() => setView('news')}
                headerAction={<div className="text-xs font-medium text-slate-400 group-hover:text-indigo-500 transition-colors">View All</div>}
              >
                <NewsWidget />
              </Card>

              <Card title="Documents" className="col-span-1 min-h-[320px]">
                <DocumentsWidget />
              </Card>

              <Card 
                title="Performance" 
                className="col-span-1 min-h-[320px] group" 
                onClick={() => navigateToPerformance()}
                headerAction={<div className="text-xs font-medium text-slate-400 group-hover:text-indigo-500 transition-colors">Details</div>}
              >
                <PerformanceWidget onNavigate={navigateToPerformance} />
              </Card>

              {/* Row 2 */}
              <Card title="My Training" className="col-span-1 md:col-span-2 min-h-[280px]">
                <TrainingWidget onCatalogClick={() => setView('catalog')} />
              </Card>

              <Card title="Talents" className="col-span-1 min-h-[280px]">
                <TalentsWidget />
              </Card>
              
              <Card title="Task Tracker" className="col-span-1 xl:row-span-2 min-h-[280px]">
                <TrackerWidget onTaskClick={handleTaskClick} />
              </Card>

              {/* Row 3 */}
              <Card title="About Us" className="col-span-1 min-h-[240px]">
                <AboutUsWidget 
                  description={aboutUsText} 
                  onRegenerate={handleGenerateAbout}
                  loading={aboutLoading}
                />
              </Card>

              <Card title="Birthdays" className="col-span-1 min-h-[240px]">
                <BirthdaysWidget />
              </Card>

              <Card title="New Employees" className="col-span-1 min-h-[240px]">
                <NewEmployeesWidget />
              </Card>

            </div>
          </div>
        )}

        {/* Detailed Views */}
        {view === 'news' && <AllNewsPage onBack={() => setView('dashboard')} onNewsClick={handleNewsClick} />}
        {view === 'newsDetail' && selectedNewsItem && <NewsDetailPage newsItem={selectedNewsItem} onBack={() => setView('news')} />}
        
        {view === 'performance' && (
            <PerformancePage 
                initialTab={performanceTab} 
                onBack={() => setView('dashboard')} 
                onTaskClick={handleTaskClick}
            />
        )}
        
        {view === 'taskDetail' && selectedTask && (
            <TaskDetailPage 
                task={selectedTask} 
                onBack={handleTaskDetailBack} 
            />
        )}
        
        {view === 'training' && (
            <TrainingPage 
                onBack={() => setView('dashboard')} 
                onCatalogClick={() => setView('catalog')} 
                onCourseClick={handleCourseClick}
            />
        )}
        
        {view === 'catalog' && (
            <CourseCatalogPage 
                onBack={() => setView('training')} 
                onPreviewCourse={handlePreviewCourse}
                onEnrollClick={handleEnrollClick}
            />
        )}
        
        {view === 'courseDetail' && selectedCourse && (
            <CourseDetailPage 
                course={selectedCourse} 
                onBack={() => setView('training')} 
            />
        )}

        {view === 'coursePreview' && selectedCourse && (
            <CoursePreviewPage 
                course={selectedCourse}
                onBack={() => setView('catalog')}
                onEnroll={() => handleEnrollClick(selectedCourse)}
            />
        )}

        {view === 'notifications' && (
            <NotificationsPage 
                notifications={notifications}
                onMarkAllRead={markAllNotificationsRead}
                onDelete={deleteNotification}
                onClearAll={clearAllNotifications}
                onBack={() => setView('dashboard')}
                onNotificationClick={handleNotificationClick}
            />
        )}

        {view === 'profile' && (
            <MyProfilePage 
                onBack={() => setView('dashboard')}
                userStatus={userStatus}
            />
        )}

        {view === 'settings' && (
            <SettingsPage 
                onBack={() => setView('dashboard')}
            />
        )}

        {view === 'microservices' && (
            <MicroservicesPage 
                onBack={() => setView('dashboard')}
                onNavigateToMetrics={() => setView('systemMetrics')}
                onNavigateToUsers={() => setView('userManagement')}
                onNavigateToDCAP={() => setView('dcap')}
                onNavigateToCRM={() => setView('crm')}
                onNavigateToConfig={() => setView('systemConfig')}
            />
        )}

        {view === 'systemMetrics' && (
            <SystemMetricsPage 
                onBack={() => setView('microservices')}
            />
        )}

        {view === 'userManagement' && (
            <UserManagementPage 
                onBack={() => setView('microservices')}
                onUserClick={handleUserClick}
            />
        )}

        {view === 'userProfile' && selectedUserForManagement && (
            <UserProfilePage 
                user={selectedUserForManagement}
                onBack={() => setView('userManagement')}
            />
        )}

        {view === 'dcap' && (
            <DCAPPage 
                onBack={() => setView('microservices')}
            />
        )}

        {view === 'crm' && (
            <CRMPage 
                onBack={() => setView('microservices')}
            />
        )}

        {view === 'systemConfig' && (
            <SystemConfigPage 
                onBack={() => setView('microservices')}
            />
        )}
      </main>
    </div>
  );
}

export default App;
