import React, { useState } from 'react';
import HomeIcon from './icons/HomeIcon';
import UsersIcon from './icons/UsersIcon';
import BookOpenIcon from './icons/BookOpenIcon';
import ClipboardListIcon from './icons/ClipboardListIcon';
import ChatBubbleIcon from './icons/ChatBubbleIcon';
import ChartBarIcon from './icons/ChartBarIcon';
import CogIcon from './icons/CogIcon';
import { useData } from '../contexts/DataContext';

import TeacherHome from './teacher/TeacherHome';
import TeacherClasses from './teacher/TeacherClasses';
import TeacherLessons from './teacher/TeacherLessons';
import TeacherTasks from './teacher/TeacherTasks';
import TeacherMessages from './teacher/TeacherMessages';
import TeacherReports from './teacher/TeacherReports';
import TeacherSettings from './teacher/TeacherSettings';
import { User } from '../types';

interface DashboardProps {
  user: User;
  onGoBack: () => void;
}

type ActiveView = 'home' | 'classes' | 'lessons' | 'tasks' | 'messages' | 'reports' | 'settings';

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


const TeacherDashboard: React.FC<DashboardProps> = ({ user: teacher, onGoBack }) => {
    const [activeView, setActiveView] = useState<ActiveView>('home');
    const { data, addTask } = useData();

    const renderContent = () => {
        const teacherClasses = data.users.filter(u => u.role === 'student' && u.classIds?.some(id => teacher.classIds?.includes(id)));

        switch (activeView) {
            // FIX: Pass teacher prop to child components
            case 'home': return <TeacherHome teacher={teacher} setActiveView={setActiveView} />;
            case 'classes': return <TeacherClasses teacher={teacher} />;
            case 'lessons': return <TeacherLessons teacher={teacher} />;
            case 'tasks': return <TeacherTasks teacher={teacher} students={teacherClasses} />;
            case 'messages': return <TeacherMessages teacher={teacher} />;
            case 'reports': return <TeacherReports teacher={teacher} />;
            case 'settings': return <TeacherSettings teacher={teacher} />;
            default: return <TeacherHome teacher={teacher} setActiveView={setActiveView} />;
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
            <h1 className="text-xl font-bold text-brand-text">Portal del Maestro</h1>
            <p className="text-sm text-text-muted">¡Hola, {teacher.name}!</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
            <button
              onClick={onGoBack}
              className="bg-brand-background text-brand-text font-semibold py-2 px-4 rounded-lg hover:bg-opacity-80 border border-border-color transition-colors text-sm"
            >
              &larr; Cambiar Rol
            </button>
        </div>
      </header>
      <div className="flex flex-grow overflow-hidden">
        <aside className="w-64 bg-brand-surface p-4 border-r border-border-color flex flex-col justify-between flex-shrink-0">
            <nav className="space-y-2 mt-4">
                 <NavItem label="Inicio" icon={<HomeIcon />} isActive={activeView === 'home'} onClick={() => setActiveView('home')} />
                 <NavItem label="Mis Clases" icon={<UsersIcon />} isActive={activeView === 'classes'} onClick={() => setActiveView('classes')} />
                 <NavItem label="Lecciones" icon={<BookOpenIcon />} isActive={activeView === 'lessons'} onClick={() => setActiveView('lessons')} />
                 <NavItem label="Tareas" icon={<ClipboardListIcon />} isActive={activeView === 'tasks'} onClick={() => setActiveView('tasks')} />
                 <NavItem label="Mensajes" icon={<ChatBubbleIcon />} isActive={activeView === 'messages'} onClick={() => setActiveView('messages')} />
                 <NavItem label="Reportes" icon={<ChartBarIcon />} isActive={activeView === 'reports'} onClick={() => setActiveView('reports')} />
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

export default TeacherDashboard;