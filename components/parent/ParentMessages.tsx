import React, { useState } from 'react';
import { User } from '../../types';

const conversations = [
    { id: 1, name: 'Prof. Ana Torres (Mat.)', avatar: 'AT', lastMessage: 'Re: Duda sobre tarea de Ana', time: '11:30 AM', unread: 1 },
    { id: 2, name: 'Prof. David Cruz (Mat.)', avatar: 'DC', lastMessage: '¡Hola! Quería felicitar a Luis...', time: 'Ayer', unread: 0 },
    { id: 3, name: 'Dirección Escolar', avatar: 'DE', lastMessage: 'Comunicado: Junta de Padres', time: 'Hace 2 días', unread: 0 },
];

// FIX: Add parent prop to component definition
const ParentMessages: React.FC<{ parent: User }> = ({ parent }) => {
    const [selectedId, setSelectedId] = useState(1);

    return (
        <div className="animate-fade-in h-full flex flex-col">
          <h2 className="text-3xl font-extrabold text-brand-text mb-6 flex-shrink-0">Mensajes</h2>
          <div className="bg-brand-surface rounded-2xl shadow-sm border border-border-color flex flex-grow overflow-hidden">
            <div className="w-full md:w-1/3 border-r border-border-color flex-shrink-0 overflow-y-auto p-2">
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
            <div className="hidden md:flex w-2/3 flex-col">
                 <div className="flex items-center justify-center h-full text-text-muted text-center p-4">
                    <p>Selecciona una conversación para leer y enviar mensajes.</p>
                 </div>
            </div>
          </div>
        </div>
    );
};

export default ParentMessages;