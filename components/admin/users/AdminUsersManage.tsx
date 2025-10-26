import React from 'react';
import { User } from '../../../types';
import PlusCircleIcon from '../../icons/PlusCircleIcon';
import LoginIcon from '../../icons/LoginIcon';

const AdminUsersManage: React.FC<{ users: User[], onLoginAs: (user: User) => void }> = ({ users, onLoginAs }) => {
    const roleNames = { student: 'Alumno', teacher: 'Maestro', parent: 'Tutor', admin: 'Admin' };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                 <input type="text" placeholder="Buscar por nombre o email..." className="border border-border-color rounded-lg py-2 px-3 text-sm focus:outline-none bg-brand-surface w-64" />
                 <button className="flex items-center gap-2 bg-brand-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-opacity-90">
                    <PlusCircleIcon />
                    <span>Nuevo Usuario</span>
                </button>
            </div>
             <div className="bg-brand-surface rounded-lg shadow-sm border border-border-color overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-brand-background text-sm text-text-muted uppercase">
                        <tr>
                            <th className="p-4">Nombre</th>
                            <th className="p-4">Rol</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Estado</th>
                            <th className="p-4"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id} className="border-b border-border-color hover:bg-brand-background">
                                <td className="p-4 font-semibold text-brand-text flex items-center gap-3">
                                    <img src={user.avatar} className="w-8 h-8 rounded-full" />
                                    {user.name}
                                </td>
                                <td className="p-4 text-text-muted">{roleNames[user.role]}</td>
                                <td className="p-4 text-text-muted">{user.email}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full capitalize ${user.status === 'active' ? 'bg-green-100 text-status-completed' : 'bg-red-100 text-status-overdue'}`}>
                                        {user.status === 'active' ? 'Activo' : 'Suspendido'}
                                    </span>
                                </td>
                                <td className="p-4 text-right space-x-2">
                                    <button onClick={() => onLoginAs(user)} title="Iniciar sesión como" className="p-2 text-text-muted hover:text-brand-primary">
                                        <LoginIcon />
                                    </button>
                                     <button className="text-sm font-semibold text-brand-secondary hover:underline">Editar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminUsersManage;
