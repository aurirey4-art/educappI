import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { Task, User } from '../../types';
import CheckCircleIcon from '../icons/CheckCircleIcon';
import ClockIcon from '../icons/ClockIcon';
import AlertCircleIcon from '../icons/AlertCircleIcon';
import PaperPlaneIcon from '../icons/PaperPlaneIcon';
import CalendarIcon from '../icons/CalendarIcon';
// FIX: Import CalendarEvent type
import Calendar, { CalendarEvent } from './Calendar';

// FIX: Explicitly type the importantDates array to match CalendarEvent[]
const importantDates: CalendarEvent[] = [
  { date: '2023-11-15', title: 'Entrega: Ecuaciones Cuadráticas', type: 'deadline' },
  { date: '2023-11-15', title: 'Examen de Matemáticas', type: 'exam' },
  { date: '2023-11-20', title: 'Día de la Revolución (Feriado)', type: 'holiday' },
  { date: '2023-11-22', title: 'Salida de campo: Museo de Antropología', type: 'trip' },
];

const statusConfig = {
    pending: { icon: <ClockIcon />, color: 'text-status-pending', label: 'Pendiente' },
    submitted: { icon: <PaperPlaneIcon />, color: 'text-brand-primary', label: 'Enviado' },
    completed: { icon: <CheckCircleIcon />, color: 'text-status-completed', label: 'Calificado' },
    overdue: { icon: <AlertCircleIcon />, color: 'text-status-overdue', label: 'Vencido' },
};

const TaskItem: React.FC<{ task: Task, onUpdateStatus: (id: string, status: Task['status']) => void }> = ({ task, onUpdateStatus }) => {
    const config = statusConfig[task.status];
    const [isFeedbackVisible, setFeedbackVisible] = useState(false);

    return (
        <div className="bg-brand-surface p-4 rounded-xl shadow-sm border border-border-color">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                <div className="flex items-center mb-2 sm:mb-0">
                    <div className={`${config.color} mr-4`}>{config.icon}</div>
                    <div>
                        <p className="font-bold text-brand-text">{task.title}</p>
                        <p className="text-sm text-text-muted">{task.subject}</p>
                    </div>
                </div>
                <div className="text-left sm:text-right w-full sm:w-auto">
                    <p className={`text-sm font-semibold text-text-muted`}>Vence: {new Date(task.dueDate).toLocaleDateString()}</p>
                     <p className={`text-xs capitalize font-medium ${config.color}`}>{config.label}</p>
                </div>
            </div>
             {(task.status === 'pending' || task.status === 'overdue') && (
                <div className="mt-3 pt-3 border-t border-border-color text-right">
                    <button onClick={() => onUpdateStatus(task.id, 'submitted')} className="bg-brand-secondary text-white font-semibold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors text-sm flex items-center gap-2 ml-auto">
                        <PaperPlaneIcon width={16} height={16} />
                        Entregar Tarea
                    </button>
                </div>
            )}
            {task.status === 'completed' && (
                <div className="mt-3 pt-3 border-t border-border-color">
                    <div className="flex justify-between items-center">
                        <div>
                            <span className="text-sm font-semibold text-text-muted">Calificación: </span>
                            <span className="font-bold text-brand-primary text-lg">{task.grade?.toFixed(1)}</span>
                        </div>
                        {task.feedback && (
                             <button onClick={() => setFeedbackVisible(!isFeedbackVisible)} className="text-sm font-semibold text-brand-secondary hover:underline">
                                {isFeedbackVisible ? 'Ocultar' : 'Ver'} Feedback
                            </button>
                        )}
                    </div>
                    {isFeedbackVisible && task.feedback && (
                        <div className="mt-2 p-3 bg-brand-background rounded-lg text-sm text-brand-text">
                            "{task.feedback}"
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

const StudentTasks: React.FC<{ student: User }> = ({ student }) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const { data, updateTaskStatus } = useData();

  const studentTasks = data.tasks.filter(t => t.studentId === student.id);

  const pendingTasks = studentTasks.filter(t => t.status === 'pending' || t.status === 'overdue');
  const submittedTasks = studentTasks.filter(t => t.status === 'submitted');
  const completedTasks = studentTasks.filter(t => t.status === 'completed');

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-extrabold text-brand-text">Mis Tareas</h2>
        <button
            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
            className="flex items-center gap-2 bg-brand-surface border border-border-color text-brand-text font-semibold py-2 px-4 rounded-lg hover:bg-brand-background transition-colors"
        >
            <CalendarIcon width={20} height={20}/>
            <span>{isCalendarOpen ? 'Ocultar Calendario' : 'Calendario'}</span>
        </button>
      </div>

      {isCalendarOpen && <div className="mb-8 animate-fade-in-down"><Calendar events={importantDates} /></div>}
      
      <div className="space-y-8">
        <TaskSection title="Pendientes" tasks={pendingTasks} emptyMessage="¡Felicidades! No tienes tareas pendientes." onUpdateStatus={updateTaskStatus} />
        <TaskSection title="Enviadas" tasks={submittedTasks} emptyMessage="No hay tareas enviadas esperando calificación." onUpdateStatus={updateTaskStatus} />
        {/* FIX: Corrected typo in prop name from onUpdate-Status to onUpdateStatus */}
        <TaskSection title="Calificadas" tasks={completedTasks} emptyMessage="Aún no tienes tareas calificadas." onUpdateStatus={updateTaskStatus} />
      </div>
    </div>
  );
};

const TaskSection: React.FC<{title: string, tasks: Task[], emptyMessage: string, onUpdateStatus: (id: string, status: Task['status']) => void}> = ({title, tasks, emptyMessage, onUpdateStatus}) => (
    <div>
        <h3 className="text-xl font-bold text-brand-text mb-4">{title} ({tasks.length})</h3>
        {tasks.length > 0 ? (
            <div className="space-y-4">
                {tasks.map((task) => <TaskItem key={task.id} task={task} onUpdateStatus={onUpdateStatus} />)}
            </div>
        ) : (
            <div className="text-center py-6 bg-brand-surface rounded-xl border border-dashed border-border-color">
                <p className="text-text-muted">{emptyMessage}</p>
            </div>
        )}
    </div>
);


export default StudentTasks;