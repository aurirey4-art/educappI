import React from 'react';
import PlusCircleIcon from '../icons/PlusCircleIcon';
import BookOpenIcon from '../icons/BookOpenIcon';
import { useData } from '../../contexts/DataContext';
import { User } from '../../types';

const ProgressCircle = ({ progress, size = 60 }) => {
    const strokeWidth = 6;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg className="transform -rotate-90" width={size} height={size}>
                <circle
                    className="text-border-color"
                    strokeWidth={strokeWidth}
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
                <circle
                    className="text-brand-primary"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-brand-text">
                {progress}%
            </span>
        </div>
    );
};

const ClassCard = ({ group, students, pending, progress }) => (
    <div className="bg-brand-surface p-6 rounded-2xl shadow-sm border border-border-color hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between">
        <div>
            <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-brand-text">{group}</h3>
                <ProgressCircle progress={progress} />
            </div>
            <p className="text-sm text-text-muted mb-6">Progreso Grupal</p>
        </div>
        <div className="flex justify-between text-center">
            <div>
                <p className="text-2xl font-bold text-brand-primary">{students}</p>
                <p className="text-xs text-text-muted">Alumnos</p>
            </div>
            <div>
                <p className="text-2xl font-bold text-status-pending">{pending}</p>
                <p className="text-xs text-text-muted">Tareas por Revisar</p>
            </div>
        </div>
    </div>
);

const TeacherHome: React.FC<{ setActiveView: (view: any) => void; teacher: User }> = ({ setActiveView, teacher }) => {
  const { data } = useData();
  const tasksToReview = data.tasks.filter(t => teacher.classIds?.includes(t.classId) && t.status === 'submitted').length;

  return (
    <div className="animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
            <h2 className="text-3xl font-extrabold text-brand-text">Resumen de Clases</h2>
            <div className="flex gap-2">
                 <button onClick={() => setActiveView('tasks')} className="flex items-center gap-2 bg-brand-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors">
                    <PlusCircleIcon width={20} height={20}/>
                    <span>Nueva Tarea</span>
                </button>
                 <button onClick={() => setActiveView('lessons')} className="flex items-center gap-2 bg-brand-surface border border-border-color text-brand-text font-semibold py-2 px-4 rounded-lg hover:bg-brand-background transition-colors">
                    <BookOpenIcon width={20} height={20}/>
                    <span>Crear Lección</span>
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ClassCard group="Matemáticas V" students={32} pending={tasksToReview} progress={78} />
            <ClassCard group="Ciencias Naturales" students={28} pending={2} progress={65} />
            <ClassCard group="Historia Universal" students={30} pending={8} progress={85} />
        </div>

        <div className="mt-10 bg-brand-surface p-6 rounded-2xl shadow-sm border border-border-color">
            <h3 className="text-xl font-bold text-brand-text mb-4">Próximos Eventos</h3>
            <ul className="space-y-3">
                <li className="flex items-center justify-between p-3 bg-brand-background rounded-lg">
                    <div>
                        <p className="font-semibold text-brand-text">Examen Parcial de Matemáticas</p>
                        <p className="text-sm text-text-muted">Viernes, 10:00 AM</p>
                    </div>
                    <span className="text-sm font-bold text-status-overdue">En 2 días</span>
                </li>
                <li className="flex items-center justify-between p-3 bg-brand-background rounded-lg">
                    <div>
                        <p className="font-semibold text-brand-text">Entrega de Proyecto de Ciencias</p>
                        <p className="text-sm text-text-muted">Lunes, 11:59 PM</p>
                    </div>
                    <span className="text-sm font-bold text-status-pending">En 5 días</span>
                </li>
            </ul>
        </div>
    </div>
  );
};

export default TeacherHome;