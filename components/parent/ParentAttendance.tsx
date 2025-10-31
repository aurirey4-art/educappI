import React from 'react';
import { User } from '../../types';

const attendanceData = {
    'Ana García': {
        summary: { present: 68, late: 2, absent: 1 },
        notes: [
            { date: 'Oct 15, 2023', note: 'Excelente participación en clase de ciencias.', author: 'Prof. Ruiz' }
        ]
    },
    'Luis García': {
        summary: { present: 70, late: 1, absent: 0 },
        notes: []
    }
};

const AttendanceCalendar: React.FC<{ summary: { present: number, late: number, absent: number } }> = ({ summary }) => {
    const totalDays = summary.present + summary.late + summary.absent;
    const days = Array(30).fill(0).map((_, i) => {
        if (i < summary.absent) return 'absent';
        if (i < summary.absent + summary.late) return 'late';
        return 'present';
    }).sort(() => Math.random() - 0.5); // Randomize for visual effect

    const colorMap = {
        present: 'bg-status-completed',
        late: 'bg-status-pending',
        absent: 'bg-status-overdue'
    };

    return (
        <div className="grid grid-cols-10 gap-1.5">
            {days.map((status, i) => <div key={i} className={`w-full h-4 rounded ${colorMap[status]}`}></div>)}
        </div>
    );
};

const StudentAttendanceCard: React.FC<{ name: string }> = ({ name }) => {
    const data = attendanceData[name];

    return (
        <div className="bg-brand-surface p-6 rounded-2xl shadow-sm border border-border-color">
            <h3 className="text-xl font-bold text-brand-text mb-4">{name}</h3>
            <div className="mb-6">
                <h4 className="font-semibold text-text-muted mb-3">Registro de Asistencia (Últimos 30 días)</h4>
                <AttendanceCalendar summary={data.summary} />
                <div className="flex justify-end gap-4 mt-2 text-xs">
                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-status-completed"></div> Asistió</span>
                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-status-pending"></div> Retardo</span>
                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-status-overdue"></div> Ausente</span>
                </div>
            </div>
            <div>
                <h4 className="font-semibold text-text-muted mb-3">Notas de Comportamiento</h4>
                {data.notes.length > 0 ? (
                    <div className="space-y-2">
                        {data.notes.map((n, i) => (
                            <div key={i} className="bg-brand-background p-3 rounded-lg">
                                <p className="text-sm text-brand-text">"{n.note}"</p>
                                <p className="text-xs text-right text-text-muted mt-1">- {n.author}</p>
                            </div>
                        ))}
                    </div>
                ) : <p className="text-sm text-text-muted text-center p-4">No hay notas de comportamiento.</p>}
            </div>
        </div>
    );
};

// FIX: Add parent prop to component definition
const ParentAttendance: React.FC<{ parent: User }> = ({ parent }) => {
    return (
        <div className="animate-fade-in">
            <h2 className="text-3xl font-extrabold text-brand-text mb-6">Asistencia y Comportamiento</h2>
            <div className="space-y-6">
                {Object.keys(attendanceData).map(name => <StudentAttendanceCard key={name} name={name} />)}
            </div>
        </div>
    );
};

export default ParentAttendance;