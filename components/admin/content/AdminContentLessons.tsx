import React from 'react';
import { Lesson, User } from '../../../types';
import PlusCircleIcon from '../../icons/PlusCircleIcon';

const statusStyles = {
    published: 'bg-green-100 text-status-completed',
    draft: 'bg-yellow-100 text-status-pending',
    archived: 'bg-gray-100 text-text-muted',
};

const AdminContentLessons: React.FC<{ lessons: Lesson[], users: User[] }> = ({ lessons, users }) => {
    
    const getAuthorName = (authorId: string) => {
        return users.find(u => u.id === authorId)?.name || 'Desconocido';
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <div className="flex gap-2">
                    <select className="border border-border-color rounded-lg py-2 px-3 text-sm focus:outline-none bg-brand-surface">
                        <option>Filtrar por estado</option>
                        <option>Publicado</option>
                        <option>Borrador</option>
                        <option>Archivado</option>
                    </select>
                     <select className="border border-border-color rounded-lg py-2 px-3 text-sm focus:outline-none bg-brand-surface">
                        <option>Filtrar por materia</option>
                        <option>Matemáticas</option>
                        <option>Ciencias</option>
                    </select>
                </div>
                 <button className="flex items-center gap-2 bg-brand-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-opacity-90">
                    <PlusCircleIcon />
                    <span>Nueva Lección</span>
                </button>
            </div>
            <div className="bg-brand-surface rounded-lg shadow-sm border border-border-color overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-brand-background text-sm text-text-muted uppercase">
                        <tr>
                            <th className="p-4">Título</th>
                            <th className="p-4">Autor</th>
                            <th className="p-4">Materia</th>
                            <th className="p-4">Fecha</th>
                            <th className="p-4">Estado</th>
                            <th className="p-4"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {lessons.map(lesson => (
                            <tr key={lesson.id} className="border-b border-border-color hover:bg-brand-background">
                                <td className="p-4 font-semibold text-brand-text">{lesson.title}</td>
                                <td className="p-4 text-text-muted">{getAuthorName(lesson.authorId)}</td>
                                <td className="p-4 text-text-muted">{lesson.subject}</td>
                                <td className="p-4 text-text-muted">{new Date(lesson.creationDate).toLocaleDateString()}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full capitalize ${statusStyles[lesson.status]}`}>
                                        {lesson.status === 'draft' ? 'Borrador' : lesson.status}
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                     <button className="text-sm font-semibold text-brand-secondary hover:underline">Editar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminContentLessons;
