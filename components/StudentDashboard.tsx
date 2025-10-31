import React, { useState, useEffect } from 'react';
import HomeIcon from './icons/HomeIcon';
import BookOpenIcon from './icons/BookOpenIcon';
import ChatBubbleIcon from './icons/ChatBubbleIcon';
import ClipboardCheckIcon from './icons/ClipboardCheckIcon';
import CogIcon from './icons/CogIcon';
import ThemeSwitcher from './ThemeSwitcher';
import { useData } from '../contexts/DataContext';

import StudentProfile from './student/StudentProfile';
import StudentLessons from './student/StudentLessons';
import StudentMessages from './student/StudentMessages';
import StudentTasks from './student/StudentTasks';
import StudentSettings from './student/StudentSettings';
import { User } from '../types';

interface DashboardProps {
  user: User;
  onGoBack: () => void;
}

type ActiveView = 'home' | 'lessons' | 'messages' | 'tasks' | 'settings';
type Theme = 'light' | 'dark' | 'soft';

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

const StudentDashboard: React.FC<DashboardProps> = ({ user: student, onGoBack }) => {
    const [activeView, setActiveView] = useState<ActiveView>('home');
    const [theme, setTheme] = useState<Theme>('light');
    const { data } = useData();

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark', 'soft');
        root.classList.add(theme);
    }, [theme]);

    const renderContent = () => {
        switch (activeView) {
            case 'home':
                // FIX: Pass student prop to StudentProfile
                return <StudentProfile student={student} setActiveView={setActiveView}/>;
            case 'lessons':
                // FIX: Pass student prop to StudentLessons
                return <StudentLessons student={student} />;
            case 'messages':
                // FIX: Pass student prop to StudentMessages
                return <StudentMessages student={student} />;
            case 'tasks':
                return <StudentTasks student={student} />;
            case 'settings':
                // FIX: Pass student prop to StudentSettings
                return <StudentSettings student={student} />;
            default:
                // FIX: Pass student prop to StudentProfile
                return <StudentProfile student={student} setActiveView={setActiveView}/>;
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
            <h1 className="text-xl font-bold text-brand-text">Portal del Alumno</h1>
            <p className="text-sm text-text-muted">¡Hola, {student.name.split(' ')[0]}!</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
            <ThemeSwitcher currentTheme={theme} setTheme={setTheme} />
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
                 <NavItem label="Lecciones" icon={<BookOpenIcon />} isActive={activeView === 'lessons'} onClick={() => setActiveView('lessons')} />
                 <NavItem label="Mensajes" icon={<ChatBubbleIcon />} isActive={activeView === 'messages'} onClick={() => setActiveView('messages')} />
                 <NavItem label="Tareas" icon={<ClipboardCheckIcon />} isActive={activeView === 'tasks'} onClick={() => setActiveView('tasks')} />
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

export default StudentDashboard;