import React from 'react';
import BookOpenIcon from '../icons/BookOpenIcon';
import SearchIcon from '../icons/SearchIcon';
import VideoCameraIcon from '../icons/VideoCameraIcon';
import DocumentTextIcon from '../icons/DocumentTextIcon';
import CubeIcon from '../icons/CubeIcon';
import BookmarkIcon from '../icons/BookmarkIcon';
import { User } from '../../types';


const lessons = [
  { title: 'Matemáticas V', teacher: 'Prof. Ana Torres', progress: 75, subject: 'Matemáticas', type: 'video' },
  { title: 'Ciencias Naturales', teacher: 'Prof. Carlos Ruiz', progress: 60, subject: 'Ciencias', type: '3d' },
  { title: 'Historia Universal', teacher: 'Prof. Laura Méndez', progress: 85, subject: 'Historia', type: 'text' },
  { title: 'Literatura', teacher: 'Prof. Jorge Salas', progress: 92, subject: 'Español', type: 'text' },
  { title: 'Inglés Avanzado', teacher: 'Prof. Sarah Miller', progress: 70, subject: 'Inglés', type: 'video' },
  { title: 'Educación Física', teacher: 'Prof. Roberto Díaz', progress: 100, subject: 'Deportes', type: 'video' },
];

const lessonTypeIcons = {
    video: <VideoCameraIcon />,
    text: <DocumentTextIcon />,
    '3d': <CubeIcon />,
};

const LessonCard: React.FC<{ lesson: typeof lessons[0] }> = ({ lesson }) => (
    <div className="bg-brand-surface p-5 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-border-color flex flex-col">
        <div className="flex-grow">
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2 text-brand-primary">
                    {lessonTypeIcons[lesson.type]}
                    <p className="text-xs font-semibold bg-brand-primary bg-opacity-10 px-2 py-1 rounded-full">{lesson.subject}</p>
                </div>
                <button className="text-text-muted hover:text-brand-primary"><BookmarkIcon /></button>
            </div>
            <h3 className="text-xl font-bold text-brand-text mt-2">{lesson.title}</h3>
            <p className="text-sm text-text-muted mb-6 mt-1">Impartido por: {lesson.teacher}</p>
        </div>
        <div>
            <div className="w-full bg-border-color rounded-full h-2 mb-2">
                <div className="bg-brand-accent h-2 rounded-full" style={{ width: `${lesson.progress}%` }}></div>
            </div>
             <div className="flex justify-between items-center text-xs font-semibold text-text-muted">
                <span>Progreso</span>
                <span>{lesson.progress}%</span>
            </div>
        </div>
         <button className="w-full bg-brand-primary text-white font-semibold py-2 rounded-lg mt-4 hover:bg-opacity-90 transition-colors">
            Iniciar Lección
        </button>
    </div>
);

// FIX: Add student prop to component definition
const StudentLessons: React.FC<{ student: User }> = ({ student }) => {
  return (
    <div className="animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
            <h2 className="text-3xl font-extrabold text-brand-text">Catálogo de Lecciones</h2>
            <div className="relative">
                <input type="text" placeholder="Buscar lecciones..." className="w-full md:w-64 pl-10 pr-4 py-2 border border-border-color rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-secondary bg-brand-surface" />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
                    <SearchIcon width={20} height={20}/>
                </div>
            </div>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson, index) => (
            <LessonCard key={index} lesson={lesson} />
        ))}
      </div>
    </div>
  );
};

export default StudentLessons;