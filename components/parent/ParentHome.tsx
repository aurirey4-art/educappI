import React from 'react';
import { useData } from '../../contexts/DataContext';
import { User } from '../../types';
import AlertCircleIcon from '../icons/AlertCircleIcon';

const ProgressBar: React.FC<{ value: number; colorClass: string }> = ({ value, colorClass }) => (
    <div className="w-full bg-border-color rounded-full h-2.5">
        <div className={`${colorClass} h-2.5 rounded-full`} style={{ width: `${value}%` }}></div>
    </div>
);

const StudentCard: React.FC<{ student: User }> = ({ student }) => {
    const { data } = useData();
    const studentTasks = data.tasks.filter(t => t.studentId === student.id);
    const completed = studentTasks.filter(t => t.status === 'completed').length;
    const pending = studentTasks.filter(t => t.status === 'pending').length;
    const overdue = studentTasks.filter(t => t.status === 'overdue').length;
    
    // Static data for demo
    const avgGrade = student.name.includes('Ana') ? 9.2 : 8.5;
    const attendance = student.name.includes('Ana') ? 98 : 95;

    return (
    <div className="bg-brand-surface p-6 rounded-2xl shadow-sm border border-border-color">
        <div className="flex items-center mb-4">
            <img src={student.avatar} alt={student.name} className="w-16 h-16 rounded-full mr-4" />
            <div>
                <h3 className="text-xl font-bold text-brand-text">{student.name}</h3>
                <p className="text-text-muted">{student.name.includes('Ana') ? '5º Grado' : '3er Grado'}</p>
            </div>
        </div>
        
        <div className="space-y-4">
            <div>
                <div className="flex justify-between mb-1">
                    <span className="text-sm font-semibold text-text-muted">Promedio General</span>
                    <span className="text-sm font-bold text-brand-primary">{avgGrade}</span>
                </div>
                <ProgressBar value={avgGrade * 10} colorClass="bg-brand-primary" />
            </div>
            <div>
                <div className="flex justify-between mb-1">
                    <span className="text-sm font-semibold text-text-muted">Asistencia</span>
                    <span className="text-sm font-bold text-brand-accent">{attendance}%</span>
                </div>
                <ProgressBar value={attendance} colorClass="bg-brand-accent" />
            </div>
        </div>
        
        <div className="mt-6 grid grid-cols-3 gap-2 text-center">
            <div>
                <p className="text-lg font-bold text-status-completed">{completed}</p>
                <p className="text-xs text-text-muted">Completadas</p>
            </div>
            <div>
                <p className="text-lg font-bold text-status-pending">{pending}</p>
                <p className="text-xs text-text-muted">Pendientes</p>
            </div>
            <div>
                <p className="text-lg font-bold text-status-overdue">{overdue}</p>
                <p className="text-xs text-text-muted">Vencidas</p>
            </div>
        </div>
    </div>
    );
};

const ParentHome: React.FC<{ parent: User }> = ({ parent }) => {
    const { data } = useData();
    const children = data.users.filter(u => parent.childrenIds?.includes(u.id));

    // Demo alerts
     const allAlerts = [
            { type: 'warning', text: 'Tarea de Historia vencida.', studentName: 'Ana García' },
            { type: 'info', text: 'Próximo examen de Matemáticas el viernes.', studentName: 'Ana García' },
     ];


  return (
    <div className="animate-fade-in">
        <h2 className="text-3xl font-extrabold text-brand-text mb-6">Resumen Familiar</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {children.map(student => <StudentCard key={student.id} student={student} />)}
        </div>

        <div className="mt-8">
            <h3 className="text-xl font-bold text-brand-text mb-4">Avisos Importantes</h3>
            <div className="bg-brand-surface p-4 rounded-xl shadow-sm border border-border-color space-y-3">
                {allAlerts.length > 0 ? allAlerts.map((alert, i) => (
                    <div key={i} className={`flex items-start p-3 rounded-lg ${alert.type === 'warning' ? 'bg-red-50 text-status-overdue' : 'bg-brand-background text-text-muted'}`}>
                        <AlertCircleIcon width={20} height={20} className="mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="font-semibold">{alert.text}</p>
                            <p className="text-xs">{alert.studentName}</p>
                        </div>
                    </div>
                )) : <p className="text-text-muted text-center p-4">No hay avisos importantes por el momento.</p>}
            </div>
        </div>
    </div>
  );
};

export default ParentHome;