import React, { useState } from 'react';
import PaperClipIcon from '../icons/PaperClipIcon';
import { User } from '../../types';

const conversations = [
    { id: 1, name: 'Prof. Ana Torres', avatar: 'AT', lastMessage: 'Hola Alex, he revisado tu tarea...', time: '10:42 AM', unread: 2, role: 'Maestro' },
    { id: 2, name: 'Grupo de Ciencias', avatar: 'GC', lastMessage: 'No olviden el material para el laboratorio.', time: 'Ayer', unread: 0, role: 'Clase' },
    { id: 3, name: 'Dirección Escolar', avatar: 'DE', lastMessage: 'Comunicado: Próximo evento deportivo...', time: 'Ayer', unread: 1, role: 'Admin' },
    { id: 4, name: 'Prof. Laura Méndez', avatar: 'LM', lastMessage: '¡Excelente trabajo en tu ensayo!', time: 'Hace 3 días', unread: 0, role: 'Maestro' },
];

const messages = {
    1: [
        { from: 'other', text: 'Hola Alex, he revisado tu tarea y tengo algunos comentarios. ¿Podemos hablar mañana?', time: '10:40 AM' },
        { from: 'me', text: 'Claro, profesora. ¿A qué hora le parece bien?', time: '10:41 AM' },
        { from: 'other', text: 'A las 10 AM en mi oficina. ¡Gracias!', time: '10:42 AM' },
    ],
    2: [{ from: 'other', text: 'No olviden el material para el laboratorio.', time: 'Ayer' }],
    3: [{ from: 'other', text: 'Estimados alumnos y padres de familia, les informamos sobre el próximo evento deportivo...', time: 'Ayer' }],
    4: [{ from: 'other', text: '¡Excelente trabajo en tu ensayo!', time: 'Hace 3 días' }],
};

// FIX: Add student prop to component definition
const StudentMessages: React.FC<{ student: User }> = ({ student }) => {
    const [selectedId, setSelectedId] = useState(1);
    const selectedConversation = conversations.find(c => c.id === selectedId);

  return (
    <div className="animate-fade-in h-full flex flex-col">
      <h2 className="text-3xl font-extrabold text-brand-text mb-6 flex-shrink-0">Mensajes</h2>
      <div className="bg-brand-surface rounded-2xl shadow-sm border border-border-color flex flex-grow overflow-hidden">
        {/* Lista de Conversaciones */}
        <div className="w-1/3 border-r border-border-color flex-shrink-0 overflow-y-auto">
            <div className="p-4">
                 {conversations.map(conv => (
                     <div key={conv.id} onClick={() => setSelectedId(conv.id)}
                         className={`flex items-center p-3 rounded-lg cursor-pointer mb-2 transition-colors ${selectedId === conv.id ? 'bg-brand-primary bg-opacity-10' : 'hover:bg-brand-background'}`}>
                         <div className={`h-12 w-12 rounded-full flex items-center justify-center font-bold text-white ${selectedId === conv.id ? 'bg-brand-primary' : 'bg-brand-secondary'}`}>
                             {conv.avatar}
                         </div>
                         <div className="flex-1 ml-4">
                             <div className="flex justify-between items-center">
                                <p className={`font-bold text-sm ${selectedId === conv.id ? 'text-brand-primary' : 'text-brand-text'}`}>{conv.name}</p>
                                <p className="text-xs text-text-muted">{conv.time}</p>
                             </div>
                             <div className="flex justify-between items-center mt-1">
                                <p className="text-xs text-text-muted truncate w-40">{conv.lastMessage}</p>
                                {conv.unread > 0 && <span className="bg-brand-accent text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">{conv.unread}</span>}
                             </div>
                         </div>
                     </div>
                 ))}
            </div>
        </div>
        {/* Ventana de Chat */}
        <div className="w-2/3 flex flex-col">
            {selectedConversation ? (
                 <div className="flex-grow flex flex-col">
                    <header className="p-4 border-b border-border-color flex items-center flex-shrink-0">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-white bg-brand-primary`}>
                            {selectedConversation.avatar}
                        </div>
                        <div className="ml-4">
                            <h3 className="font-bold text-brand-text">{selectedConversation.name}</h3>
                            <p className="text-xs text-text-muted">{selectedConversation.role}</p>
                        </div>
                    </header>
                    <main className="flex-grow p-6 overflow-y-auto space-y-4">
                        {messages[selectedId].map((msg, index) => (
                            <div key={index} className={`flex items-end gap-2 ${msg.from === 'me' ? 'justify-end' : ''}`}>
                                 <div className={`max-w-xs md:max-w-md p-3 rounded-2xl ${msg.from === 'me' ? 'bg-brand-secondary text-white rounded-br-none' : 'bg-gray-200 text-brand-text rounded-bl-none'}`}>
                                     <p className="text-sm">{msg.text}</p>
                                     <p className={`text-xs mt-1 ${msg.from === 'me' ? 'text-blue-100' : 'text-text-muted'} text-right`}>{msg.time}</p>
                                 </div>
                            </div>
                        ))}
                    </main>
                    <footer className="p-4 border-t border-border-color">
                        <div className="relative">
                            <input type="text" placeholder="Escribe un mensaje..." className="w-full px-4 py-2 pr-12 border border-border-color rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-secondary bg-brand-background"/>
                            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-brand-primary">
                                <PaperClipIcon />
                            </button>
                        </div>
                    </footer>
                 </div>
            ) : (
                <div className="flex items-center justify-center h-full text-text-muted">Selecciona una conversación</div>
            )}
        </div>
      </div>
    </div>
  );
};

export default StudentMessages;