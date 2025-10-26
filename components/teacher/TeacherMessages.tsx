import React, { useState } from 'react';
import PlusCircleIcon from '../icons/PlusCircleIcon';

const conversations = [
    { id: 1, name: 'Alex Johnson', avatar: 'AJ', lastMessage: 'Gracias por la retroalimentación, profesora.', time: '10:55 AM', unread: 0, role: 'Alumno' },
    { id: 2, name: 'Grupo: Matemáticas V', avatar: 'M5', lastMessage: 'Recuerden estudiar para el examen.', time: 'Ayer', unread: 0, role: 'Clase' },
    { id: 3, name: 'Sra. García (Madre de Ana)', avatar: 'SG', lastMessage: 'Quisiera agendar una reunión...', time: 'Ayer', unread: 1, role: 'Padre' },
    { id: 4, name: 'Dirección Escolar', avatar: 'DE', lastMessage: 'Junta de personal el próximo viernes.', time: 'Hace 2 días', unread: 0, role: 'Admin' },
];

const TeacherMessages: React.FC = () => {
    const [selectedId, setSelectedId] = useState(1);

    return (
        <div className="animate-fade-in h-full flex flex-col">
          <div className="flex justify-between items-center mb-6 flex-shrink-0">
            <h2 className="text-3xl font-extrabold text-brand-text">Mensajes</h2>
             <button className="flex items-center gap-2 bg-brand-accent text-white font-semibold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors">
                <PlusCircleIcon width={20} height={20}/>
                <span>Nuevo Comunicado</span>
            </button>
          </div>
          <div className="bg-brand-surface rounded-2xl shadow-sm border border-border-color flex flex-grow overflow-hidden">
            <div className="w-1/3 border-r border-border-color flex-shrink-0 overflow-y-auto p-2">
                 {conversations.map(conv => (
                     <div key={conv.id} onClick={() => setSelectedId(conv.id)}
                         className={`flex items-center p-3 rounded-lg cursor-pointer mb-1 transition-colors ${selectedId === conv.id ? 'bg-brand-primary bg-opacity-10' : 'hover:bg-brand-background'}`}>
                         <div className={`h-12 w-12 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0 ${selectedId === conv.id ? 'bg-brand-primary' : 'bg-brand-secondary'}`}>
                             {conv.avatar}
                         </div>
                         <div className="flex-1 ml-4 overflow-hidden">
                             <div className="flex justify-between items-center">
                                <p className={`font-bold text-sm ${selectedId === conv.id ? 'text-brand-primary' : 'text-brand-text'}`}>{conv.name}</p>
                                <p className="text-xs text-text-muted flex-shrink-0">{conv.time}</p>
                             </div>
                             <div className="flex justify-between items-center mt-1">
                                <p className="text-xs text-text-muted truncate">{conv.lastMessage}</p>
                                {conv.unread > 0 && <span className="bg-brand-accent text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">{conv.unread}</span>}
                             </div>
                         </div>
                     </div>
                 ))}
            </div>
            <div className="w-2/3 flex flex-col">
                 <div className="flex items-center justify-center h-full text-text-muted">
                    <p>Selecciona una conversación para empezar a chatear.</p>
                 </div>
            </div>
          </div>
        </div>
    );
};

export default TeacherMessages;
