import React, { useState } from 'react';
import ChevronLeftIcon from '../icons/ChevronLeftIcon';
import ChevronRightIcon from '../icons/ChevronRightIcon';

interface CalendarEvent {
  date: string; // YYYY-MM-DD
  title: string;
  type: 'holiday' | 'exam' | 'deadline' | 'trip';
}

interface CalendarProps {
  events: CalendarEvent[];
}

const eventConfig = {
    holiday: { color: 'bg-status-overdue', label: 'Feriado' },
    exam: { color: 'bg-purple-500', label: 'Examen' },
    deadline: { color: 'bg-status-pending', label: 'Entrega' },
    trip: { color: 'bg-brand-accent', label: 'Evento/Viaje' },
};

const Calendar: React.FC<CalendarProps> = ({ events }) => {
  const [currentDate, setCurrentDate] = useState(new Date('2023-11-15')); // Fecha fija para el demo
  const [selectedDate, setSelectedDate] = useState<string | null>('2023-11-22');

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const monthName = currentDate.toLocaleString('es-ES', { month: 'long' });

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (new Date(year, month, 1).getDay() + 6) % 7; // Lunes como primer dia
  
  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  
  const calendarDays = Array.from({ length: firstDayOfMonth }, () => null)
    .concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));
    
  const eventsForSelectedDate = selectedDate ? events.filter(e => e.date === selectedDate) : [];

  return (
    <div className="bg-brand-surface rounded-2xl shadow-lg border border-border-color p-4 flex gap-4">
      <div className="w-2/3">
        <header className="flex items-center justify-between mb-4">
          <button onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-brand-background"><ChevronLeftIcon /></button>
          <h3 className="font-bold text-brand-text capitalize">{monthName} {year}</h3>
          <button onClick={handleNextMonth} className="p-2 rounded-full hover:bg-brand-background"><ChevronRightIcon /></button>
        </header>
        
        <div className="grid grid-cols-7 gap-1 text-center text-xs text-text-muted font-semibold mb-2">
          {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map(day => <div key={day}>{day}</div>)}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => {
            if (!day) return <div key={index}></div>;
            
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayEvents = events.filter(e => e.date === dateStr);
            const isSelected = selectedDate === dateStr;

            return (
              <div key={index} 
                className={`flex flex-col items-center justify-center h-12 relative cursor-pointer rounded-lg transition-colors ${isSelected ? 'bg-brand-primary bg-opacity-10' : 'hover:bg-brand-background'}`}
                onClick={() => setSelectedDate(dateStr)}
              >
                <span className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${isSelected ? 'bg-brand-primary text-white' : 'text-brand-text'}`}>
                  {day}
                </span>
                <div className="flex gap-1 mt-1">
                  {dayEvents.slice(0, 3).map(event => (
                      <div key={event.title} className={`w-1.5 h-1.5 rounded-full ${eventConfig[event.type].color}`} title={event.title}></div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-1/3 border-l border-border-color pl-4">
        <h4 className="font-bold text-brand-text mb-4">Eventos del Día</h4>
        {eventsForSelectedDate.length > 0 ? (
            <div className="space-y-3">
                {eventsForSelectedDate.map(event => (
                    <div key={event.title} className="flex items-start text-sm">
                        <div className={`w-2 h-2 rounded-full mr-3 mt-1.5 flex-shrink-0 ${eventConfig[event.type].color}`}></div>
                        <div>
                            <p className="font-semibold text-brand-text">{event.title}</p>
                            <p className="text-xs text-text-muted">{eventConfig[event.type].label}</p>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <div className="text-center text-sm text-text-muted pt-8">
                <p>{selectedDate ? 'No hay eventos para este día.' : 'Selecciona un día para ver los eventos.'}</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;