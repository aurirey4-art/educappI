import React, { useState } from 'react';
import UsersIcon from '../icons/UsersIcon';
import ArchiveIcon from '../icons/ArchiveIcon';
import PlusCircleIcon from '../icons/PlusCircleIcon';

// Fix: Define interfaces for class data and component props
interface ClassInfo {
    id: number;
    name: string;
    students: number;
    subject: string;
    avgGrade: number;
}

const classes: { active: ClassInfo[]; archived: ClassInfo[] } = {
    active: [
        { id: 1, name: 'Matemáticas V', students: 32, subject: 'Matemáticas', avgGrade: 8.5 },
        { id: 2, name: 'Ciencias Naturales', students: 28, subject: 'Ciencias', avgGrade: 9.1 },
        { id: 3, name: 'Historia Universal', students: 30, subject: 'Historia', avgGrade: 8.8 },
    ],
    archived: [
        { id: 4, name: 'Matemáticas IV (2022)', students: 35, subject: 'Matemáticas', avgGrade: 8.2 },
    ]
};

interface ClassRowProps {
    classInfo: ClassInfo;
    onArchive: () => void;
}

const ClassRow: React.FC<ClassRowProps> = ({ classInfo, onArchive }) => (
    <tr className="border-b border-border-color hover:bg-brand-background">
        <td className="p-4 font-semibold text-brand-text">{classInfo.name}</td>
        <td className="p-4 text-text-muted">{classInfo.students}</td>
        <td className="p-4 text-text-muted">{classInfo.subject}</td>
        <td className="p-4 font-bold text-brand-primary">{classInfo.avgGrade.toFixed(1)}</td>
        <td className="p-4 text-right">
            <button className="text-sm font-semibold text-brand-secondary hover:underline mr-4">Ver Detalles</button>
            <button onClick={onArchive} className="text-sm font-semibold text-status-pending hover:underline">Archivar</button>
        </td>
    </tr>
);

const TeacherClasses: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'active' | 'archived'>('active');

    return (
        <div className="animate-fade-in">
            <h2 className="text-3xl font-extrabold text-brand-text mb-6">Gestión de Clases</h2>

            <div className="flex border-b border-border-color mb-4">
                <button 
                    onClick={() => setActiveTab('active')}
                    className={`px-4 py-2 font-semibold ${activeTab === 'active' ? 'text-brand-primary border-b-2 border-brand-primary' : 'text-text-muted'}`}
                >
                    Activas ({classes.active.length})
                </button>
                <button 
                    onClick={() => setActiveTab('archived')}
                    className={`px-4 py-2 font-semibold ${activeTab === 'archived' ? 'text-brand-primary border-b-2 border-brand-primary' : 'text-text-muted'}`}
                >
                    Archivadas ({classes.archived.length})
                </button>
            </div>

            <div className="bg-brand-surface rounded-lg shadow-sm border border-border-color overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-brand-background text-sm text-text-muted uppercase">
                        <tr>
                            <th className="p-4">Nombre de la Clase</th>
                            <th className="p-4">Alumnos</th>
                            <th className="p-4">Materia</th>
                            <th className="p-4">Promedio</th>
                            <th className="p-4"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes[activeTab].map(c => (
                            <ClassRow key={c.id} classInfo={c} onArchive={() => alert('Archivando clase...')} />
                        ))}
                    </tbody>
                </table>
            </div>

            <button className="fixed bottom-10 right-10 flex items-center gap-2 bg-brand-accent text-white font-semibold py-3 px-5 rounded-full shadow-lg hover:scale-105 transition-transform">
                <PlusCircleIcon width={24} height={24} />
                <span>Nueva Clase</span>
            </button>
        </div>
    );
};

export default TeacherClasses;