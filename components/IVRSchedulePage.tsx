
import React, { useState } from 'react';
import { ArrowLeft, Save, Clock, Calendar, Plus, Trash2, Check, X } from 'lucide-react';

interface DaySchedule {
  day: string;
  isOpen: boolean;
  start: string;
  end: string;
}

interface Holiday {
  id: string;
  name: string;
  date: string;
  action: 'Closed' | 'Special Routing';
}

interface IVRSchedulePageProps {
  onBack: () => void;
}

export const IVRSchedulePage: React.FC<IVRSchedulePageProps> = ({ onBack }) => {
  const [weeklySchedule, setWeeklySchedule] = useState<DaySchedule[]>([
    { day: 'Monday', isOpen: true, start: '09:00', end: '17:00' },
    { day: 'Tuesday', isOpen: true, start: '09:00', end: '17:00' },
    { day: 'Wednesday', isOpen: true, start: '09:00', end: '17:00' },
    { day: 'Thursday', isOpen: true, start: '09:00', end: '17:00' },
    { day: 'Friday', isOpen: true, start: '09:00', end: '17:00' },
    { day: 'Saturday', isOpen: false, start: '10:00', end: '14:00' },
    { day: 'Sunday', isOpen: false, start: '10:00', end: '14:00' },
  ]);

  const [holidays, setHolidays] = useState<Holiday[]>([
    { id: '1', name: 'Christmas Day', date: '2024-12-25', action: 'Closed' },
    { id: '2', name: 'New Year\'s Day', date: '2025-01-01', action: 'Closed' },
  ]);

  const [newHoliday, setNewHoliday] = useState({ name: '', date: '', action: 'Closed' });
  const [isAddingHoliday, setIsAddingHoliday] = useState(false);

  const toggleDay = (index: number) => {
    const newSchedule = [...weeklySchedule];
    newSchedule[index].isOpen = !newSchedule[index].isOpen;
    setWeeklySchedule(newSchedule);
  };

  const updateTime = (index: number, field: 'start' | 'end', value: string) => {
    const newSchedule = [...weeklySchedule];
    newSchedule[index] = { ...newSchedule[index], [field]: value };
    setWeeklySchedule(newSchedule);
  };

  const addHoliday = () => {
    if (!newHoliday.name || !newHoliday.date) return;
    setHolidays([...holidays, { ...newHoliday, id: Date.now().toString(), action: newHoliday.action as any }]);
    setNewHoliday({ name: '', date: '', action: 'Closed' });
    setIsAddingHoliday(false);
  };

  const removeHoliday = (id: string) => {
    setHolidays(holidays.filter(h => h.id !== id));
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950 animate-in fade-in slide-in-from-right-4 duration-300 absolute inset-0 z-50 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-500 dark:text-slate-400 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar size={20} className="text-amber-500" /> IVR Schedule
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Configure business hours and holidays</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm">
          <Save size={16} /> Save Changes
        </button>
      </div>

      <div className="p-8 max-w-5xl mx-auto w-full space-y-8">
        
        {/* Weekly Schedule */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                    <Clock size={20} className="text-indigo-500" /> Weekly Hours
                </h3>
                <span className="text-xs text-slate-500 bg-white dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">Timezone: UTC-08:00 (Pacific Time)</span>
            </div>
            
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {weeklySchedule.map((day, index) => (
                    <div key={day.day} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <div className="flex items-center gap-4 w-40">
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    className="sr-only peer"
                                    checked={day.isOpen}
                                    onChange={() => toggleDay(index)}
                                />
                                <div className={`w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-500`}></div>
                            </label>
                            <span className={`font-medium ${day.isOpen ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>{day.day}</span>
                        </div>

                        {day.isOpen ? (
                            <div className="flex items-center gap-3">
                                <input 
                                    type="time" 
                                    value={day.start} 
                                    onChange={(e) => updateTime(index, 'start', e.target.value)}
                                    className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                                <span className="text-slate-400 font-medium">to</span>
                                <input 
                                    type="time" 
                                    value={day.end} 
                                    onChange={(e) => updateTime(index, 'end', e.target.value)}
                                    className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                        ) : (
                            <div className="flex-1 text-center pr-32">
                                <span className="text-sm font-medium text-slate-400 italic">Closed</span>
                            </div>
                        )}
                        
                        <div className="w-24 text-right">
                            {day.isOpen && (
                                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded">Open</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Holidays & Exceptions */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                    <Calendar size={20} className="text-red-500" /> Holidays & Exceptions
                </h3>
                <button 
                    onClick={() => setIsAddingHoliday(true)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
                >
                    <Plus size={14} /> Add Exception
                </button>
            </div>

            <div className="p-6">
                {isAddingHoliday && (
                    <div className="mb-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 animate-in fade-in slide-in-from-top-2">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase block mb-1.5">Holiday Name</label>
                                <input 
                                    type="text" 
                                    placeholder="e.g. Founder's Day" 
                                    className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={newHoliday.name}
                                    onChange={e => setNewHoliday({...newHoliday, name: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase block mb-1.5">Date</label>
                                <input 
                                    type="date" 
                                    className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={newHoliday.date}
                                    onChange={e => setNewHoliday({...newHoliday, date: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase block mb-1.5">Action</label>
                                <select 
                                    className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={newHoliday.action}
                                    onChange={e => setNewHoliday({...newHoliday, action: e.target.value})}
                                >
                                    <option>Closed</option>
                                    <option>Special Routing</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-end gap-2">
                            <button 
                                onClick={() => setIsAddingHoliday(false)}
                                className="px-3 py-1.5 text-sm font-medium text-slate-500 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={addHoliday}
                                className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors"
                            >
                                Add Holiday
                            </button>
                        </div>
                    </div>
                )}

                <div className="space-y-3">
                    {holidays.map(holiday => (
                        <div key={holiday.id} className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:shadow-sm transition-shadow">
                            <div className="flex items-center gap-6">
                                <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-500 dark:text-red-400">
                                    <Calendar size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white">{holiday.name}</h4>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">{new Date(holiday.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${
                                    holiday.action === 'Closed' ? 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600' : 
                                    'bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-800'
                                }`}>
                                    {holiday.action}
                                </span>
                                <button 
                                    onClick={() => removeHoliday(holiday.id)}
                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                    {holidays.length === 0 && (
                        <div className="text-center py-8 text-slate-400">
                            <p>No holidays configured.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};
