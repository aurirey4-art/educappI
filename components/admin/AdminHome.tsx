import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import UsersIcon from '../icons/UsersIcon';
import BookOpenIcon from '../icons/BookOpenIcon';
import AlertCircleIcon from '../icons/AlertCircleIcon';
import PlayIcon from '../icons/PlayIcon';

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-brand-surface p-6 rounded-2xl shadow-sm border border-border-color">
        <div className="flex items-center gap-4">
            <div className="text-brand-primary p-3 bg-brand-primary bg-opacity-10 rounded-full">{icon}</div>
            <div>
                <p className="text-3xl font-bold text-brand-text">{value}</p>
                <p className="text-text-muted">{title}</p>
            </div>
        </div>
    </div>
);

const AdminHome: React.FC<{ setActiveView: (view: any) => void }> = ({ setActiveView }) => {
    const [isTesting, setIsTesting] = useState(false);
    const { data } = useData();
    
    const handleRunTest = () => {
        setIsTesting(true);
        setTimeout(() => setIsTesting(false), 3000);
    };

    return (
        <div className="animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
                <h2 className="text-3xl font-extrabold text-brand-text">Resumen del Sistema</h2>
                <button 
                    onClick={handleRunTest}
                    disabled={isTesting}
                    className="flex items-center gap-2 bg-brand-accent text-white font-semibold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors disabled:bg-opacity-50"
                >
                    {isTesting ? 'Probando...' : <><PlayIcon /> <span>Ejecutar Diagnóstico</span></>}
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Usuarios Activos" value={data.users.filter(u => u.status === 'active').length.toString()} icon={<UsersIcon />} />
                <StatCard title="Lecciones Publicadas" value={data.lessons.filter(l => l.status === 'published').length.toString()} icon={<BookOpenIcon />} />
                <StatCard title="Alertas del Sistema" value={data.systemLogs.filter(l => l.level === 'error' || l.level === 'warning').length.toString()} icon={<AlertCircleIcon />} />
            </div>
            
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3 bg-brand-surface p-6 rounded-2xl shadow-sm border border-border-color">
                    <h3 className="text-xl font-bold text-brand-text mb-4">Actividad de Usuarios (Últimos 7 días)</h3>
                    <div className="h-48 flex items-end justify-between px-2">
                        {[45, 60, 75, 50, 80, 95, 110].map((val, i) => (
                            <div key={i} className="w-8 bg-brand-secondary rounded-t-md" style={{ height: `${(val / 120) * 100}%` }} title={`${val} usuarios`}></div>
                        ))}
                    </div>
                </div>
                 <div className="lg:col-span-2 bg-brand-surface p-6 rounded-2xl shadow-sm border border-border-color">
                    <h3 className="text-xl font-bold text-brand-text mb-4">Atajos Rápidos</h3>
                    <div className="space-y-3">
                        <button onClick={() => setActiveView('ai-generator')} className="w-full text-left font-semibold text-brand-secondary hover:underline">&rarr; Crear lección con IA</button>
                        <button onClick={() => setActiveView('users')} className="w-full text-left font-semibold text-brand-secondary hover:underline">&rarr; Gestionar usuarios</button>
                        <button onClick={() => setActiveView('reports')} className="w-full text-left font-semibold text-brand-secondary hover:underline">&rarr; Ver reportes de actividad</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AdminHome;