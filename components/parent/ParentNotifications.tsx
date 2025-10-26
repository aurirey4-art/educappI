import React from 'react';
import CheckCircleIcon from '../icons/CheckCircleIcon';
import AlertCircleIcon from '../icons/AlertCircleIcon';
import ChatBubbleIcon from '../icons/ChatBubbleIcon';

const notifications = [
    { type: 'grade', text: 'Ana G. ha recibido un 9.5 en su examen de Matemáticas.', time: 'Hace 1 hora', icon: <CheckCircleIcon /> },
    { type: 'task', text: 'La tarea de Historia para Ana G. está vencida.', time: 'Hace 3 horas', icon: <AlertCircleIcon /> },
    { type: 'message', text: 'Nuevo mensaje del Prof. David Cruz.', time: 'Ayer', icon: <ChatBubbleIcon /> },
    { type: 'attendance', text: 'Luis G. fue registrado con un retardo hoy.', time: 'Ayer', icon: <AlertCircleIcon /> },
];

const ParentNotifications: React.FC = () => {
    return (
        <div className="animate-fade-in">
            <h2 className="text-3xl font-extrabold text-brand-text mb-6">Centro de Notificaciones</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                    {notifications.map((n, i) => (
                        <div key={i} className="bg-brand-surface p-4 rounded-xl shadow-sm border border-border-color flex items-start">
                           <div className={`mr-4 mt-1 ${n.type === 'task' || n.type === 'attendance' ? 'text-status-overdue' : 'text-brand-primary'}`}>
                                {n.icon}
                           </div>
                           <div className="flex-grow">
                                <p className="text-brand-text">{n.text}</p>
                                <p className="text-xs text-text-muted mt-1">{n.time}</p>
                           </div>
                        </div>
                    ))}
                </div>
                <div className="lg:col-span-1">
                    <div className="bg-brand-surface p-6 rounded-2xl shadow-sm border border-border-color">
                        <h3 className="text-lg font-bold text-brand-text mb-4">Preferencias</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-text-muted">Nuevas Calificaciones</span>
                                <input type="checkbox" className="toggle" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-text-muted">Tareas Vencidas</span>
                                <input type="checkbox" className="toggle" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-text-muted">Nuevos Mensajes</span>
                                <input type="checkbox" className="toggle" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-text-muted">Alertas de Asistencia</span>
                                <input type="checkbox" className="toggle" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Basic CSS for toggle switch */}
            <style>{`
                .toggle {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 40px;
                    height: 22px;
                    background-color: #ccc;
                    border-radius: 9999px;
                    position: relative;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }
                .toggle:checked {
                    background-color: var(--color-brand-primary);
                }
                .toggle::before {
                    content: '';
                    position: absolute;
                    width: 16px;
                    height: 16px;
                    background-color: white;
                    border-radius: 50%;
                    top: 3px;
                    left: 4px;
                    transition: transform 0.3s;
                }
                .toggle:checked::before {
                    transform: translateX(17px);
                }
            `}</style>
        </div>
    );
};

export default ParentNotifications;