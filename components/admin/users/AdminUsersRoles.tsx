import React from 'react';

const PermissionRow: React.FC<{ description: string; roles: boolean[] }> = ({ description, roles }) => (
    <tr className="border-b border-border-color">
        <td className="p-4 font-semibold text-brand-text">{description}</td>
        {roles.map((hasPermission, i) => (
            <td key={i} className="p-4 text-center">
                 <input type="checkbox" className="toggle" defaultChecked={hasPermission} />
            </td>
        ))}
    </tr>
);

const AdminUsersRoles: React.FC = () => {
    return (
        <div>
             <div className="bg-brand-surface rounded-lg shadow-sm border border-border-color overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-brand-background text-sm text-text-muted uppercase">
                        <tr>
                            <th className="p-4">Permiso</th>
                            <th className="p-4 text-center">Alumno</th>
                            <th className="p-4 text-center">Maestro</th>
                            <th className="p-4 text-center">Tutor</th>
                            <th className="p-4 text-center">Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        <PermissionRow description="Ver lecciones" roles={[true, true, true, true]} />
                        <PermissionRow description="Crear lecciones" roles={[false, true, false, true]} />
                        <PermissionRow description="Calificar tareas" roles={[false, true, false, true]} />
                        <PermissionRow description="Ver reportes de otros" roles={[false, true, true, true]} />
                        <PermissionRow description="Gestionar usuarios" roles={[false, false, false, true]} />
                    </tbody>
                </table>
            </div>
             {/* Basic CSS for toggle switch */}
            <style>{`
                .toggle {
                    -webkit-appearance: none; appearance: none; width: 40px; height: 22px;
                    background-color: var(--color-border); border-radius: 9999px; position: relative;
                    cursor: pointer; transition: background-color 0.3s;
                }
                .toggle:checked { background-color: var(--color-brand-primary); }
                .toggle::before {
                    content: ''; position: absolute; width: 16px; height: 16px;
                    background-color: white; border-radius: 50%; top: 3px; left: 4px;
                    transition: transform 0.3s;
                }
                .toggle:checked::before { transform: translateX(17px); }
            `}</style>
        </div>
    );
};

export default AdminUsersRoles;
