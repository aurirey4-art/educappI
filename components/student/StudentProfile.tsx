import React from 'react';
import TrophyIcon from '../icons/TrophyIcon';
import DownloadIcon from '../icons/DownloadIcon';
import BookOpenIcon from '../icons/BookOpenIcon';
import ClipboardCheckIcon from '../icons/ClipboardCheckIcon';
import ChartBarIcon from '../icons/ChartBarIcon';

const CircularProgress: React.FC<{ progress: number }> = ({ progress }) => {
    const strokeWidth = 10;
    const radius = 80;
    const normalizedRadius = radius - strokeWidth * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <div className="relative flex items-center justify-center">
            <svg height={radius * 2} width={radius * 2} className="-rotate-90">
                <circle
                    className="text-border-color"
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
                <circle
                    stroke="url(#progressGradient)"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference + ' ' + circumference}
                    style={{ strokeDashoffset }}
                    strokeLinecap="round"
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
                <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="var(--color-brand-secondary)" />
                        <stop offset="100%" stopColor="var(--color-brand-accent)" />
                    </linearGradient>
                </defs>
            </svg>
            <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-extrabold text-brand-text">{progress}%</span>
                <span className="text-sm text-text-muted">Progreso Total</span>
            </div>
        </div>
    );
};

const QuickAccessCard: React.FC<{ title: string; icon: React.ReactNode; onClick: () => void }> = ({ title, icon, onClick }) => (
    <button onClick={onClick} className="bg-brand-surface p-4 rounded-2xl shadow-sm border border-border-color hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center text-center">
        <div className="text-brand-primary mb-2">{icon}</div>
        <p className="font-semibold text-brand-text text-sm">{title}</p>
    </button>
);


const StudentProfile: React.FC<{setActiveView: (view: any) => void}> = ({ setActiveView }) => {
  return (
    <div className="animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
            <h2 className="text-3xl font-extrabold text-brand-text">Mi Panel</h2>
             <button className="flex items-center gap-2 bg-brand-surface border border-border-color text-brand-text font-semibold py-2 px-4 rounded-lg hover:bg-brand-background transition-colors">
                <DownloadIcon width={20} height={20}/>
                <span>Descargar Reporte</span>
            </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-8">
                <div className="bg-brand-surface p-6 rounded-2xl shadow-sm text-center flex flex-col items-center">
                    <img
                        className="h-28 w-28 rounded-full object-cover ring-4 ring-brand-secondary ring-offset-4 ring-offset-brand-surface"
                        src="https://i.pravatar.cc/150?u=alex"
                        alt="Foto de perfil de Alex"
                    />
                    <h3 className="text-2xl font-bold text-brand-text mt-4">Alex Johnson</h3>
                    <p className="text-md text-text-muted">5º Grado - Grupo A</p>
                    <p className="text-sm text-text-muted mt-1">Instituto E-ducap</p>
                </div>

                <div className="bg-brand-surface p-6 rounded-2xl shadow-sm">
                    <h4 className="text-lg font-bold text-brand-text mb-4 text-center">Progreso General</h4>
                    <CircularProgress progress={78} />
                </div>
            </div>

            <div className="lg:col-span-2 space-y-8">
                <div className="bg-brand-surface p-6 rounded-2xl shadow-sm">
                    <h4 className="text-lg font-bold text-brand-text mb-4">Accesos Rápidos</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <QuickAccessCard title="Lección Actual" icon={<BookOpenIcon width={32} height={32} />} onClick={() => setActiveView('lessons')} />
                        <QuickAccessCard title="Entregar Tareas" icon={<ClipboardCheckIcon width={32} height={32} />} onClick={() => setActiveView('tasks')} />
                        <QuickAccessCard title="Ver Calificaciones" icon={<ChartBarIcon width={32} height={32} />} onClick={() => setActiveView('tasks')} />
                    </div>
                </div>

                <div className="bg-brand-surface p-6 rounded-2xl shadow-sm">
                    <h4 className="text-lg font-bold text-brand-text mb-4">Logros y Medallas</h4>
                    <div className="flex flex-wrap gap-4">
                        <div className="flex flex-col items-center text-center p-3 bg-brand-background rounded-xl">
                            <div className="bg-yellow-100 p-3 rounded-full text-yellow-500"><TrophyIcon/></div>
                            <p className="text-xs font-semibold text-brand-text mt-2">Estudiante del Mes</p>
                            <p className="text-xs text-text-muted">Octubre</p>
                        </div>
                        <div className="flex flex-col items-center text-center p-3 bg-brand-background rounded-xl">
                             <div className="bg-green-100 p-3 rounded-full text-brand-accent"><TrophyIcon/></div>
                            <p className="text-xs font-semibold text-brand-text mt-2">Participación Perfecta</p>
                             <p className="text-xs text-text-muted">Ciencias</p>
                        </div>
                         <div className="flex flex-col items-center text-center p-3 bg-brand-background rounded-xl">
                             <div className="bg-blue-100 p-3 rounded-full text-brand-secondary"><TrophyIcon/></div>
                            <p className="text-xs font-semibold text-brand-text mt-2">Maestro de Álgebra</p>
                             <p className="text-xs text-text-muted">Matemáticas</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default StudentProfile;