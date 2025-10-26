import React, { useState } from 'react';
import { User } from '../types';
import { useData } from '../contexts/DataContext';
import ShieldCheckIcon from './icons/ShieldCheckIcon';
import WandSparklesIcon from './icons/WandSparklesIcon';
import CollectionIcon from './icons/CollectionIcon';
import UsersIcon from './icons/UsersIcon';
import PresentationChartLineIcon from './icons/PresentationChartLineIcon';
import ServerIcon from './icons/ServerIcon';
import CogIcon from './icons/CogIcon';

import AdminHome from './admin/AdminHome';
import AdminAIGenerator from './admin/AdminAIGenerator';
import AdminContent from './admin/AdminContent';
import AdminUsers from './admin/AdminUsers';
import AdminReports from './admin/AdminReports';
import AdminSystem from './admin/AdminSystem';
import AdminSettings from './admin/AdminSettings';


interface DashboardProps {
  user: User;
  onGoBack: () => void;
  onLoginAs: (user: User) => void;
}

type ActiveView = 'home' | 'ai-generator' | 'content' | 'users' | 'reports' | 'system' | 'settings';

const NavItem: React.FC<{
    label: string;
    icon: React.ReactNode;
    isActive: boolean;
    onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 group relative ${
            isActive
                ? 'text-brand-primary bg-brand-primary bg-opacity-10'
                : 'text-text-muted hover:bg-brand-primary hover:bg-opacity-5 hover:text-brand-primary'
        }`}
    >
        <div className={`absolute left-0 top-0 h-full w-1 rounded-r-lg ${isActive ? 'bg-brand-primary' : 'bg-transparent'}`}></div>
        <div className={isActive ? 'text-brand-primary' : 'text-gray-400 group-hover:text-brand-primary'}>{icon}</div>
        <span className="ml-4 font-semibold">{label}</span>
    </button>
);

const AdminDashboard: React.FC<DashboardProps> = ({ user, onGoBack, onLoginAs }) => {
    const [activeView, setActiveView] = useState<ActiveView>('home');
    const { data } = useData();

    const renderContent = () => {
        switch (activeView) {
            case 'home': return <AdminHome setActiveView={setActiveView} />;
            case 'ai-generator': return <AdminAIGenerator />;
            case 'content': return <AdminContent />;
            case 'users': return <AdminUsers onLoginAs={onLoginAs} />;
            case 'reports': return <AdminReports />;
            case 'system': return <AdminSystem />;
            case 'settings': return <AdminSettings />;
            default: return <AdminHome setActiveView={setActiveView}/>;
        }
    };

    return (
        <div className="w-full h-[95vh] max-w-7xl mx-auto bg-brand-surface rounded-2xl shadow-xl flex flex-col animate-fade-in overflow-hidden border border-border-color">
            <header className="flex items-center justify-between p-4 border-b border-border-color flex-shrink-0">
                <div className="flex items-center gap-4">
                    <div className="text-brand-accent">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brand-primary">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-brand-text">Panel de Administrador</h1>
                        <p className="text-sm text-text-muted">Usuario: {user.name}</p>
                    </div>
                </div>
                <button
                    onClick={onGoBack}
                    className="bg-brand-background text-brand-text font-semibold py-2 px-4 rounded-lg hover:bg-opacity-80 border border-border-color transition-colors text-sm"
                >
                    &larr; Salir del Panel
                </button>
            </header>
            <div className="flex flex-grow overflow-hidden">
                <aside className="w-64 bg-brand-surface p-4 border-r border-border-color flex flex-col flex-shrink-0">
                    <nav className="space-y-2 mt-4 flex-grow">
                        <NavItem label="Panel Principal" icon={<ShieldCheckIcon />} isActive={activeView === 'home'} onClick={() => setActiveView('home')} />
                        <NavItem label="Generador IA" icon={<WandSparklesIcon />} isActive={activeView === 'ai-generator'} onClick={() => setActiveView('ai-generator')} />
                        <NavItem label="Contenido" icon={<CollectionIcon />} isActive={activeView === 'content'} onClick={() => setActiveView('content')} />
                        <NavItem label="Usuarios" icon={<UsersIcon />} isActive={activeView === 'users'} onClick={() => setActiveView('users')} />
                        <NavItem label="Reportes" icon={<PresentationChartLineIcon />} isActive={activeView === 'reports'} onClick={() => setActiveView('reports')} />
                        <NavItem label="Sistema" icon={<ServerIcon />} isActive={activeView === 'system'} onClick={() => setActiveView('system')} />
                    </nav>
                    <div className="pb-4">
                        <NavItem label="Configuración" icon={<CogIcon />} isActive={activeView === 'settings'} onClick={() => setActiveView('settings')} />
                    </div>
                </aside>
                <main className="flex-grow p-6 md:p-8 bg-brand-background overflow-y-auto">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;