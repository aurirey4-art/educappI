import React from 'react';
import ChartBarIcon from '../icons/ChartBarIcon';
import CheckCircleIcon from '../icons/CheckCircleIcon';
import ChatBubbleIcon from '../icons/ChatBubbleIcon';
import ProfileIcon from '../icons/ProfileIcon';
import { User } from '../../types';


const ReportCard = ({ title, description, icon }) => (
    <div className="bg-brand-surface p-6 rounded-2xl shadow-sm border border-border-color">
        <div className="flex items-center gap-4 mb-3">
            <div className="text-brand-primary">{icon}</div>
            <h4 className="text-xl font-bold text-brand-text">{title}</h4>
        </div>
        <p className="text-text-muted mb-4">{description}</p>
        <button className="font-semibold text-brand-secondary hover:underline">Generar Reporte &rarr;</button>
    </div>
);

// FIX: Add teacher prop to component definition
const TeacherReports: React.FC<{ teacher: User }> = ({ teacher }) => {
    return (
        <div className="animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
                <h2 className="text-3xl font-extrabold text-brand-text">Reportes y Seguimiento</h2>
                <div className="flex items-center gap-2">
                     <select className="border border-border-color rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-brand-secondary bg-brand-surface text-brand-text">
                        <option>Matemáticas V</option>
                        <option>Ciencias Naturales</option>
                        <option>Historia Universal</option>
                    </select>
                    <button className="bg-brand-accent text-white font-semibold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors">
                        Exportar
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ReportCard 
                    title="Rendimiento Académico"
                    description="Analiza las calificaciones promedio, el progreso en tareas y el desempeño en evaluaciones."
                    icon={<ChartBarIcon width={32} height={32}/>}
                />
                 <ReportCard 
                    title="Asistencia y Puntualidad"
                    description="Visualiza el registro de asistencia de los alumnos, detecta patrones y ausencias."
                    icon={<CheckCircleIcon width={32} height={32}/>}
                />
                 <ReportCard 
                    title="Participación en Clase"
                    description="Mide la frecuencia y calidad de la participación de los estudiantes en lecciones interactivas."
                    icon={<ChatBubbleIcon width={32} height={32}/>}
                />
                 <ReportCard 
                    title="Reporte Individual"
                    description="Genera un informe completo y detallado para un alumno específico, ideal para reuniones con padres."
                    icon={<ProfileIcon width={32} height={32}/>}
                />
            </div>
        </div>
    );
};

export default TeacherReports;