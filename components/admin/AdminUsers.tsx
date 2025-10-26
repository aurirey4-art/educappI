import React, { useState } from 'react';
import { User } from '../../types';
import { useData } from '../../contexts/DataContext';
import AdminUsersManage from './users/AdminUsersManage';
import AdminUsersRoles from './users/AdminUsersRoles';

type ActiveTab = 'manage' | 'roles';

const AdminUsers: React.FC<{ onLoginAs: (user: User) => void }> = ({ onLoginAs }) => {
    const [activeTab, setActiveTab] = useState<ActiveTab>('manage');
    const { data } = useData();

    const TabButton: React.FC<{ tabName: ActiveTab; label: string }> = ({ tabName, label }) => (
        <button 
            onClick={() => setActiveTab(tabName)}
            className={`px-4 py-2 font-semibold transition-colors duration-200 ${activeTab === tabName ? 'text-brand-primary border-b-2 border-brand-primary' : 'text-text-muted hover:text-brand-primary'}`}
        >
            {label}
        </button>
    );

    return (
        <div className="animate-fade-in">
            <h2 className="text-3xl font-extrabold text-brand-text mb-6">Gestión de Usuarios y Roles</h2>
            
             <div className="flex border-b border-border-color mb-6">
                <TabButton tabName="manage" label="Administrar Usuarios" />
                <TabButton tabName="roles" label="Permisos por Rol" />
            </div>

            <div>
                {activeTab === 'manage' ? (
                    <AdminUsersManage users={data.users} onLoginAs={onLoginAs} />
                ) : (
                    <AdminUsersRoles />
                )}
            </div>
        </div>
    );
};

export default AdminUsers;