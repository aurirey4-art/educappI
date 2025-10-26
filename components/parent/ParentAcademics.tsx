import React, { useState } from 'react';

const students = {
    'Ana García': {
        grades: [
            { subject: 'Matemáticas', grade: 9.5, teacher: 'Prof. Ana Torres' },
            { subject: 'Ciencias', grade: 9.0, teacher: 'Prof. Carlos Ruiz' },
            { subject: 'Historia', grade: 8.8, teacher: 'Prof. Laura Méndez' },
            { subject: 'Español', grade: 9.8, teacher: 'Prof. Jorge Salas' },
        ],
        performance: [8.5, 8.8, 9.0, 9.2] // Monthly avg
    },
    'Luis García': {
        grades: [
            { subject: 'Matemáticas', grade: 8.0, teacher: 'Prof. David Cruz' },
            { subject: 'Ciencias', grade: 8.5, teacher: 'Prof. L. Pérez' },
            { subject: 'Arte', grade: 9.2, teacher: 'Prof. S. Romero' },
            { subject: 'Educación Física', grade: 8.4, teacher: 'Prof. R. Díaz' },
        ],
        performance: [8.0, 8.2, 8.1, 8.5]
    }
};

const GradeRow: React.FC<{ grade: { subject: string; grade: number; teacher: string; } }> = ({ grade }) => {
    const getGradeColor = (g: number) => {
        if (g >= 9) return 'text-status-completed';
        if (g >= 7) return 'text-status-pending';
        return 'text-status-overdue';
    };
    return (
        <tr className="border-b border-border-color">
            <td className="p-4 font-semibold text-brand-text">{grade.subject}</td>
            <td className="p-4 text-text-muted">{grade.teacher}</td>
            <td className={`p-4 font-bold text-lg ${getGradeColor(grade.grade)}`}>{grade.grade.toFixed(1)}</td>
        </tr>
    );
};

const ParentAcademics: React.FC = () => {
    const [selectedStudent, setSelectedStudent] = useState('Ana García');
    const studentData = students[selectedStudent];

    return (
        <div className="animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
                <h2 className="text-3xl font-extrabold text-brand-text">Progreso Académico</h2>
                <select 
                    value={selectedStudent}
                    onChange={(e) => setSelectedStudent(e.target.value)}
                    className="border border-border-color rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-brand-secondary bg-brand-surface text-brand-text font-semibold"
                >
                    {Object.keys(students).map(name => <option key={name} value={name}>{name}</option>)}
                </select>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3 bg-brand-surface p-4 sm:p-6 rounded-2xl shadow-sm border border-border-color">
                    <h3 className="text-xl font-bold text-brand-text mb-4">Calificaciones Actuales</h3>
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-brand-background text-sm text-text-muted uppercase">
                                <th className="p-3">Materia</th>
                                <th className="p-3">Maestro</th>
                                <th className="p-3">Calificación</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentData.grades.map(grade => <GradeRow key={grade.subject} grade={grade} />)}
                        </tbody>
                    </table>
                </div>

                <div className="lg:col-span-2 bg-brand-surface p-6 rounded-2xl shadow-sm border border-border-color">
                    <h3 className="text-xl font-bold text-brand-text mb-4">Evolución de Promedio</h3>
                    <div className="flex justify-around items-end h-48 bg-brand-background p-4 rounded-lg">
                        {studentData.performance.map((p, i) => (
                            <div key={i} className="flex flex-col items-center">
                                <div className="w-8 bg-brand-secondary rounded-t-md" style={{ height: `${p * 10 - 60}%` }}></div>
                                <span className="text-xs text-text-muted mt-2">{['Jul', 'Ago', 'Sep', 'Oct'][i]}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ParentAcademics;