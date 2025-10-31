import React from 'react';
import PlusCircleIcon from '../icons/PlusCircleIcon';
import SearchIcon from '../icons/SearchIcon';
import { User } from '../../types';

// Fix: Define interfaces for lesson data and component props
interface Lesson {
    id: number;
    title: string;
    subject: string;
    type: string;
    shared: boolean;
}

const lessons: Lesson[] = [
    { id: 1, title: 'Introducción al Álgebra', subject: 'Matemáticas', type: 'Video Interactivo', shared: true },
    { id: 2, title: 'La Célula y sus Partes', subject: 'Ciencias', type: 'Modelo 3D', shared: false },
    { id: 3, title: 'La Revolución Industrial', subject: 'Historia', type: 'Documento', shared: true },
    { id: 4, title: 'Análisis de "Cien Años de Soledad"', subject: 'Literatura', type: 'Texto con Audio', shared: false },
];

interface LessonCardProps {
    lesson: Lesson;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson }) => (
    <div className="bg-brand-surface p-5 rounded-xl shadow-sm border border-border-color flex flex-col justify-between">
        <div>
            <span className="text-xs font-semibold text-brand-primary bg-brand-primary bg-opacity-10 px-2 py-1 rounded-full">{lesson.subject}</span>
            <h4 className="text-lg font-bold text-brand-text mt-3">{lesson.title}</h4>
            <p className="text-sm text-text-muted mt-1">{lesson.type}</p>
        </div>
        <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
                <button className="text-sm font-semibold text-brand-secondary hover:underline">Editar</button>
                <span className="mx-2 text-border-color">|</span>
                <button className="text-sm font-semibold text-brand-secondary hover:underline">Previsualizar</button>
            </div>
            {lesson.shared && <span className="text-xs font-medium text-brand-accent bg-green-100 px-2 py-1 rounded-full">Compartido</span>}
        </div>
    </div>
);

// FIX: Add teacher prop to component definition
const TeacherLessons: React.FC<{ teacher: User }> = ({ teacher }) => {
    return (
        <div className="animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
                <h2 className="text-3xl font-extrabold text-brand-text">Mis Lecciones</h2>
                <button className="flex items-center gap-2 bg-brand-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors">
                    <PlusCircleIcon width={20} height={20}/>
                    <span>Crear Lección</span>
                </button>
            </div>

            <div className="mb-6 flex gap-4 items-center">
                 <div className="relative flex-grow">
                    <input type="text" placeholder="Buscar lecciones..." className="w-full pl-10 pr-4 py-2 border border-border-color rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-secondary" />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <SearchIcon width={20} height={20}/>
                    </div>
                </div>
                <select className="border border-border-color rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-brand-secondary bg-brand-surface text-brand-text">
                    <option>Todas las Materias</option>
                    <option>Matemáticas</option>
                    <option>Ciencias</option>
                    <option>Historia</option>
                </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {lessons.map(lesson => <LessonCard key={lesson.id} lesson={lesson} />)}
            </div>
        </div>
    );
};

export default TeacherLessons;