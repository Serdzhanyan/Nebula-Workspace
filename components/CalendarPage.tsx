
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, Clock, MapPin, User, Video, Filter, MoreHorizontal, X, AlignLeft, Users } from 'lucide-react';

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  type: 'meeting' | 'call' | 'task' | 'deadline';
  attendees?: string[];
  description?: string;
  location?: string;
}

export const CalendarPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  
  // Mock Events
  const generateEvents = (year: number, month: number) => {
      const events: CalendarEvent[] = [
        { 
            id: '1', 
            title: 'Q4 Strategy Board', 
            date: new Date(year, month, 5), 
            startTime: '10:00 AM', 
            endTime: '11:30 AM', 
            type: 'meeting',
            attendees: ['Sarah Lee', 'Alex Johnson', 'James D.'],
            location: 'Conference Room A',
            description: 'Quarterly review of strategic goals and KPIs. Please bring your department reports.'
        },
        { 
            id: '2', 
            title: 'Client: Acme Corp', 
            date: new Date(year, month, 5), 
            startTime: '02:00 PM', 
            endTime: '03:00 PM', 
            type: 'call',
            location: 'Zoom',
            description: 'Discussing the new enterprise license agreement terms.',
            attendees: ['Alex Johnson', 'Acme Rep']
        },
        { 
            id: '3', 
            title: 'Project Deadline', 
            date: new Date(year, month, 12), 
            startTime: '05:00 PM', 
            endTime: '05:00 PM', 
            type: 'deadline',
            description: 'Final submission for the Project Alpha milestones.'
        },
        { 
            id: '4', 
            title: 'Weekly Sync', 
            date: new Date(year, month, 15), 
            startTime: '09:00 AM', 
            endTime: '09:45 AM', 
            type: 'meeting',
            location: 'Huddle Room',
            attendees: ['Engineering Team'],
            description: 'Weekly engineering standup to discuss blockers and progress.'
        },
        { 
            id: '5', 
            title: 'Proposal Review', 
            date: new Date(year, month, 15), 
            startTime: '11:00 AM', 
            endTime: '12:00 PM', 
            type: 'task',
            description: 'Review the draft proposal for Stark Industries before sending.'
        },
        { 
            id: '6', 
            title: 'Lunch with Lead', 
            date: new Date(year, month, 22), 
            startTime: '12:30 PM', 
            endTime: '01:30 PM', 
            type: 'meeting',
            location: 'Downtown Bistro',
            attendees: ['Mark Vos'],
            description: 'Casual catch-up to discuss team dynamics.'
        },
      ];
      return events;
  };

  const [events, setEvents] = useState<CalendarEvent[]>(generateEvents(currentDate.getFullYear(), currentDate.getMonth()));

  // Calendar Logic
  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const generateCalendarGrid = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const startDay = getFirstDayOfMonth(year, month);
    const prevMonthDays = getDaysInMonth(year, month - 1);
    
    const grid = [];
    
    // Prev Month Padding
    for (let i = startDay - 1; i >= 0; i--) {
        grid.push({ day: prevMonthDays - i, type: 'prev', date: new Date(year, month - 1, prevMonthDays - i) });
    }
    
    // Current Month
    for (let i = 1; i <= daysInMonth; i++) {
        grid.push({ day: i, type: 'current', date: new Date(year, month, i) });
    }
    
    // Next Month Padding
    const remainingCells = 42 - grid.length;
    for (let i = 1; i <= remainingCells; i++) {
        grid.push({ day: i, type: 'next', date: new Date(year, month + 1, i) });
    }
    
    return grid;
  };

  const daysGrid = generateCalendarGrid();

  const nextMonth = () => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToToday = () => {
      const now = new Date();
      setCurrentDate(now);
      setSelectedDate(now);
  };

  const isToday = (date: Date) => {
      const today = new Date();
      return date.getDate() === today.getDate() && 
             date.getMonth() === today.getMonth() && 
             date.getFullYear() === today.getFullYear();
  };

  const isSelected = (date: Date) => {
      return date.getDate() === selectedDate.getDate() && 
             date.getMonth() === selectedDate.getMonth() && 
             date.getFullYear() === selectedDate.getFullYear();
  };

  const getEventsForDate = (date: Date) => {
      return events.filter(e => 
          e.date.getDate() === date.getDate() && 
          e.date.getMonth() === date.getMonth() && 
          e.date.getFullYear() === date.getFullYear()
      );
  };

  const getEventTypeStyles = (type: string) => {
      switch(type) {
          case 'meeting': return 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800';
          case 'call': return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800';
          case 'deadline': return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800';
          default: return 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600';
      }
  };

  const getEventTypeIcon = (type: string) => {
      switch(type) {
          case 'meeting': return <User size={12} />;
          case 'call': return <Video size={12} />;
          case 'deadline': return <Clock size={12} />;
          default: return <div className="w-1.5 h-1.5 rounded-full bg-current" />;
      }
  };

  const handleEventClick = (e: React.MouseEvent, event: CalendarEvent) => {
      e.stopPropagation();
      setSelectedEvent(event);
  };

  const selectedDayEvents = getEventsForDate(selectedDate);

  return (
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      
      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setSelectedEvent(null)}>
            <div 
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200 dark:border-slate-700" 
                onClick={e => e.stopPropagation()}
            >
                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">Event Details</h3>
                    <button onClick={() => setSelectedEvent(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                        <X size={20} />
                    </button>
                </div>
                
                <div className="p-6 space-y-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${getEventTypeStyles(selectedEvent.type)}`}>
                                {selectedEvent.type}
                            </span>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">{selectedEvent.title}</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                            <CalendarIcon size={18} className="text-slate-400 mt-0.5" />
                            <div>
                                <p className="text-sm font-semibold">
                                    {selectedEvent.date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                                </p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    {selectedEvent.startTime} - {selectedEvent.endTime}
                                </p>
                            </div>
                        </div>

                        {selectedEvent.location && (
                            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                                <MapPin size={18} className="text-slate-400" />
                                <span className="text-sm">{selectedEvent.location}</span>
                            </div>
                        )}

                        {selectedEvent.attendees && selectedEvent.attendees.length > 0 && (
                            <div className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                                <Users size={18} className="text-slate-400 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium mb-1">Attendees</p>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedEvent.attendees.map((attendee, i) => (
                                            <span key={i} className="text-xs bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-md border border-slate-200 dark:border-slate-600">
                                                {attendee}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {selectedEvent.description && (
                            <div className="flex items-start gap-3 text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-700">
                                <AlignLeft size={18} className="text-slate-400 mt-0.5" />
                                <p className="text-sm leading-relaxed">
                                    {selectedEvent.description}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="pt-2 flex gap-3">
                        <button className="flex-1 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm">
                            Edit Event
                        </button>
                        <button 
                            className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                            onClick={() => setSelectedEvent(null)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-center">
        <div className="flex items-center gap-4">
           <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CalendarIcon className="text-indigo-500" /> Calendar
           </h2>
           <div className="flex items-center bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-1">
               <button onClick={prevMonth} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-500 dark:text-slate-400 transition-colors">
                   <ChevronLeft size={18} />
               </button>
               <span className="px-4 text-sm font-bold text-slate-800 dark:text-white min-w-[140px] text-center">
                   {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
               </span>
               <button onClick={nextMonth} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-500 dark:text-slate-400 transition-colors">
                   <ChevronRight size={18} />
               </button>
           </div>
           <button onClick={goToToday} className="text-sm font-medium text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">
               Today
           </button>
        </div>
        
        <div className="flex gap-2">
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors shadow-sm">
                <Filter size={16} /> View
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200/50 dark:shadow-none">
                <Plus size={18} /> Add Event
            </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 h-full min-h-0">
         {/* Main Calendar Grid */}
         <div className="flex-1 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col overflow-hidden">
             {/* Weekday Headers */}
             <div className="grid grid-cols-7 border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50">
                 {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                     <div key={day} className="py-3 text-center text-xs font-bold uppercase text-slate-400 tracking-wider">
                         {day}
                     </div>
                 ))}
             </div>
             
             {/* Days Grid */}
             <div className="grid grid-cols-7 grid-rows-6 flex-1">
                 {daysGrid.map((cell, idx) => {
                     const cellEvents = getEventsForDate(cell.date);
                     const isSelectedDay = isSelected(cell.date);
                     const isTodayDay = isToday(cell.date);

                     return (
                         <div 
                            key={idx} 
                            onClick={() => setSelectedDate(cell.date)}
                            className={`
                                relative p-2 border-b border-r border-slate-100 dark:border-slate-700/50 transition-all cursor-pointer min-h-[100px] flex flex-col gap-1
                                ${cell.type !== 'current' ? 'bg-slate-50/30 dark:bg-slate-900/30 text-slate-400' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'}
                                ${isSelectedDay ? 'ring-2 ring-inset ring-indigo-500 z-10' : 'hover:bg-slate-50 dark:hover:bg-slate-700/30'}
                            `}
                         >
                             <div className="flex justify-between items-start">
                                 <span className={`
                                     text-sm font-semibold w-7 h-7 flex items-center justify-center rounded-full
                                     ${isTodayDay ? 'bg-indigo-600 text-white' : ''}
                                 `}>
                                     {cell.day}
                                 </span>
                             </div>
                             
                             <div className="flex flex-col gap-1 mt-1 overflow-hidden">
                                 {cellEvents.slice(0, 3).map(event => (
                                     <div 
                                        key={event.id}
                                        onClick={(e) => handleEventClick(e, event)}
                                        className={`px-1.5 py-0.5 text-[10px] font-medium rounded border truncate flex items-center gap-1 cursor-pointer hover:brightness-95 active:scale-95 transition-all ${getEventTypeStyles(event.type)}`}
                                     >
                                         <div className="shrink-0 opacity-70">{getEventTypeIcon(event.type)}</div>
                                         <span className="truncate">{event.title}</span>
                                     </div>
                                 ))}
                                 {cellEvents.length > 3 && (
                                     <div className="text-[10px] text-slate-400 pl-1">
                                         +{cellEvents.length - 3} more
                                     </div>
                                 )}
                             </div>
                         </div>
                     );
                 })}
             </div>
         </div>

         {/* Sidebar / Agenda */}
         <div className="w-full lg:w-80 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 flex flex-col">
             <div className="flex items-center justify-between mb-6">
                 <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                     {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                 </h3>
                 <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300">
                     <Clock size={16} />
                 </div>
             </div>

             <div className="flex-1 overflow-y-auto space-y-4">
                 {selectedDayEvents.length === 0 ? (
                     <div className="flex flex-col items-center justify-center h-48 text-slate-400">
                         <CalendarIcon size={32} className="mb-2 opacity-20" />
                         <p className="text-sm">No events scheduled</p>
                     </div>
                 ) : (
                     selectedDayEvents.map(event => (
                         <div 
                            key={event.id} 
                            onClick={(e) => handleEventClick(e, event)}
                            className="group relative pl-4 pb-4 last:pb-0 border-l-2 border-slate-100 dark:border-slate-700 cursor-pointer"
                         >
                             <div className={`absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-slate-800 ${
                                 event.type === 'meeting' ? 'bg-purple-500' :
                                 event.type === 'call' ? 'bg-blue-500' :
                                 event.type === 'deadline' ? 'bg-red-500' : 'bg-slate-400'
                             }`}></div>
                             
                             <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-100 dark:border-slate-700/50 group-hover:border-indigo-200 dark:group-hover:border-indigo-800 transition-colors">
                                 <div className="flex justify-between items-start mb-1">
                                     <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200 leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{event.title}</h4>
                                     <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                                         <MoreHorizontal size={14} />
                                     </button>
                                 </div>
                                 <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
                                     <span>{event.startTime} - {event.endTime}</span>
                                 </div>
                                 
                                 {event.location && (
                                     <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-2">
                                         <MapPin size={12} /> {event.location}
                                     </div>
                                 )}

                                 <div className="flex items-center gap-2 mt-2">
                                     <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border ${getEventTypeStyles(event.type)}`}>
                                         {event.type}
                                     </span>
                                     {event.attendees && (
                                         <div className="flex -space-x-1.5 ml-auto">
                                             {event.attendees.map((attendee, i) => (
                                                 <div key={i} className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900 border border-white dark:border-slate-800 flex items-center justify-center text-[8px] font-bold text-indigo-700 dark:text-indigo-300" title={attendee}>
                                                     {attendee.charAt(0)}
                                                 </div>
                                             ))}
                                         </div>
                                     )}
                                 </div>
                             </div>
                         </div>
                     ))
                 )}
             </div>
             
             {selectedDayEvents.length > 0 && (
                 <button className="mt-4 w-full py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors">
                     View All Details
                 </button>
             )}
         </div>
      </div>
    </div>
  );
};
