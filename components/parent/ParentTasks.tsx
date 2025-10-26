import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { User, Task } from '../../types';
import ClockIcon from '../icons/ClockIcon';
import CheckCircleIcon from '../icons/CheckCircleIcon';
import AlertCircleIcon from '../icons/AlertCircleIcon';
import PaperPlaneIcon from '../icons/PaperPlaneIcon';

const statusConfig = {
    pending: { icon: <ClockIcon />, color: 'text-status-pending', label: 'Pendiente' },
    submitted: { icon: <PaperPlaneIcon />, color: 'text-brand-primary', label: 'Enviado' },
    completed: { icon: <CheckCircleIcon />, color: 'text-status-completed', label: 'Completado' },
    overdue: { icon: <AlertCircleIcon />, color: 'text-status-overdue', label: 'Vencido' },
};

const TaskItem: React.FC<{ task: Task }> = ({ task }) => {
    const config = statusConfig[task.status];
    return (
        <div className="bg-brand-surface p-4 rounded-xl shadow-sm border border-border-color flex items-center justify-between">
            <div className="flex items-center">
                <div className={`${config.color} mr-4`}>{config.icon}</div>
                <div>
                    <p className="font-bold text-brand-text">{task.title}</p>
                    <p className="text-sm text-text-muted">{task.subject}</p>
                </div>
            </div>
            <div className="text-right">
                <p className="text-sm font-semibold text-text-muted">Vence: {new Date(task.dueDate).toLocaleDateString()}</p>
                <p className={`text-xs capitalize font-medium ${config.color}`}>{config.label}</p>
            </div>
        </div>
    );
};

const ParentTasks: React.FC<{ parent: User }> = ({ parent }) => {
    const { data } = useData();
    const children = data.users.filter(u => parent.childrenIds?.includes(u.id));
    const [selectedStudentId, setSelectedStudentId] = useState(children[0]?.id || '');
    
    const studentTasks = data.tasks.filter(t => t.studentId === selectedStudentId);
    const pending = studentTasks.filter(t => t.status === 'pending' || t.status === 'overdue');
    const completed = studentTasks.filter(t => t.status === 'completed' || t.status === 'submitted');

    return (
        <div className="animate-fade-in">
             <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
                <h2 className="text-3xl font-extrabold text-brand-text">Seguimiento de Tareas</h2>
                <select 
                    value={selectedStudentId}
                    onChange={(e) => setSelectedStudentId(e.target.value)}
                    className="border border-border-color rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-brand-secondary bg-brand-surface text-brand-text font-semibold"
                >
                    {children.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
            </div>

            <div>
                <h3 className="text-xl font-bold text-brand-text mb-4">Pendientes y Vencidas</h3>
                {pending.length > 0 ? (
                    <div className="space-y-4">
                        {pending.map((task) => <TaskItem key={task.id} task={task} />)}
                    </div>
                ) : <p className="text-text-muted text-center p-4">No hay tareas pendientes.</p>}
            </div>

            <div className="mt-8">
                <h3 className="text-xl font-bold text-brand-text mb-4">Completadas y Enviadas</h3>
                {completed.length > 0 ? (
                    <div className="space-y-4">
                        {completed.map((task) => <TaskItem key={task.id} task={task} />)}
                    </div>
                ) : <p className="text-text-muted text-center p-4">Aún no hay tareas completadas.</p>}
            </div>
        </div>
    );
};

export default ParentTasks;