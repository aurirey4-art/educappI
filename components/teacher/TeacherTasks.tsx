import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { Task, User } from '../../types';
import PlusCircleIcon from '../icons/PlusCircleIcon';
import CheckCircleIcon from '../icons/CheckCircleIcon';
import ClockIcon from '../icons/ClockIcon';
import PaperPlaneIcon from '../icons/PaperPlaneIcon';

interface TaskRowProps {
    task: Task;
    studentName: string;
}

const TaskRow: React.FC<TaskRowProps> = ({ task, studentName }) => {
    const isPendingReview = task.status === 'submitted';
    const isGraded = task.status === 'completed';

    const getStatus = () => {
        switch(task.status) {
            case 'pending':
            case 'overdue':
                return <span className="flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-full bg-yellow-100 text-status-pending"><ClockIcon width={14} height={14} />Asignado</span>;
            case 'submitted':
                 return <span className="flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-full bg-blue-100 text-brand-primary"><PaperPlaneIcon width={14} height={14} />Enviado</span>;
            case 'completed':
                return <span className="flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-status-completed"><CheckCircleIcon width={14} height={14} />Calificado</span>;
        }
    }

    return (
        <tr className="border-b border-border-color hover:bg-brand-background">
            <td className="p-4">
                <p className="font-bold text-brand-text">{task.title}</p>
                <p className="text-sm text-text-muted">{task.subject}</p>
            </td>
            <td className="p-4 text-text-muted">{studentName}</td>
            <td className="p-4 text-text-muted">{new Date(task.dueDate).toLocaleDateString()}</td>
            <td className="p-4">{getStatus()}</td>
            <td className="p-4 text-right">
                <button className="text-sm font-semibold text-brand-primary hover:underline">
                    {isPendingReview ? 'Revisar Entrega' : isGraded ? 'Ver Calificaciones' : 'Ver Detalles'}
                </button>
            </td>
        </tr>
    );
};

const AddTaskModal: React.FC<{ students: User[], teacher: User, onClose: () => void, onAddTask: (task: any) => void }> = ({ students, teacher, onClose, onAddTask }) => {
    const [title, setTitle] = useState('');
    const [subject, setSubject] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [studentId, setStudentId] = useState(students[0]?.id || '');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        onAddTask({ title, subject, dueDate, studentId, classId: teacher.classIds?.[0] || 'class-general' });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-brand-surface rounded-xl p-8 w-full max-w-lg shadow-2xl m-4">
                <h3 className="text-2xl font-bold text-brand-text mb-6">Asignar Nueva Tarea</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm font-semibold text-text-muted">Título de la Tarea</label>
                        <input type="text" value={title} onChange={e => setTitle(e.target.value)} required className="w-full mt-1 p-2 border border-border-color rounded-lg bg-brand-background" />
                    </div>
                    <div>
                        <label className="text-sm font-semibold text-text-muted">Materia</label>
                        <input type="text" value={subject} onChange={e => setSubject(e.target.value)} required className="w-full mt-1 p-2 border border-border-color rounded-lg bg-brand-background" />
                    </div>
                     <div>
                        <label className="text-sm font-semibold text-text-muted">Asignar a Alumno</label>
                        <select value={studentId} onChange={e => setStudentId(e.target.value)} required className="w-full mt-1 p-2 border border-border-color rounded-lg bg-brand-background">
                           {students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-semibold text-text-muted">Fecha de Vencimiento</label>
                        <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} required className="w-full mt-1 p-2 border border-border-color rounded-lg bg-brand-background" />
                    </div>
                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="font-semibold text-text-muted px-4 py-2 rounded-lg">Cancelar</button>
                        <button type="submit" className="bg-brand-primary text-white font-semibold px-6 py-2 rounded-lg">Asignar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

const TeacherTasks: React.FC<{ teacher: User, students: User[] }> = ({ teacher, students }) => {
    const { data, addTask } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Filter tasks for the classes this teacher is assigned to
    const teacherTasks = data.tasks.filter(task => teacher.classIds?.includes(task.classId));
    
    const pendingReview = teacherTasks.filter(t => t.status === 'submitted').length;
    const graded = teacherTasks.filter(t => t.status === 'completed').length;

    const getStudentName = (studentId: string) => {
        return students.find(s => s.id === studentId)?.name || 'N/A';
    }

    return (
        <div className="animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
                <h2 className="text-3xl font-extrabold text-brand-text">Tareas Asignadas</h2>
                <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-brand-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors">
                    <PlusCircleIcon width={20} height={20}/>
                    <span>Nueva Tarea</span>
                </button>
            </div>
            
            {isModalOpen && <AddTaskModal students={students} teacher={teacher} onClose={() => setIsModalOpen(false)} onAddTask={addTask} />}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl">
                    <p className="text-4xl font-bold text-brand-primary">{pendingReview}</p>
                    <p className="font-semibold text-blue-800">Pendientes de Revisar</p>
                </div>
                <div className="bg-green-50 border border-green-200 p-6 rounded-xl">
                    <p className="text-4xl font-bold text-status-completed">{graded}</p>
                    <p className="font-semibold text-green-800">Calificadas</p>
                </div>
            </div>

            <div className="bg-brand-surface rounded-lg shadow-sm border border-border-color overflow-x-auto">
                <table className="w-full text-left min-w-[600px]">
                    <thead className="bg-brand-background text-sm text-text-muted uppercase">
                        <tr>
                            <th className="p-4">Título</th>
                            <th className="p-4">Alumno</th>
                            <th className="p-4">Vencimiento</th>
                            <th className="p-4">Estado</th>
                            <th className="p-4"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {teacherTasks.map(task => <TaskRow key={task.id} task={task} studentName={getStudentName(task.studentId)} />)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TeacherTasks;