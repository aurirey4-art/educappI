import React from 'react';

const SettingsSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-brand-surface p-6 rounded-2xl shadow-sm border border-border-color mb-8">
        <h3 className="text-xl font-bold text-brand-text border-b border-border-color pb-4 mb-6">{title}</h3>
        <div className="space-y-4">
            {children}
        </div>
    </div>
);

const InputField: React.FC<{ label: string; type: string; value: string; placeholder?: string }> = ({ label, type, value, placeholder }) => (
    <div>
        <label className="block text-sm font-semibold text-text-muted mb-1">{label}</label>
        <input 
            type={type} 
            defaultValue={value}
            placeholder={placeholder}
            className="w-full px-3 py-2 border border-border-color rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-secondary bg-brand-background"
        />
    </div>
);

const StudentSettings: React.FC = () => {
    return (
        <div className="animate-fade-in max-w-4xl mx-auto">
            <h2 className="text-3xl font-extrabold text-brand-text mb-8">Configuración de la Cuenta</h2>

            <SettingsSection title="Información Personal">
                 <div className="flex items-center gap-6">
                    <img src="https://i.pravatar.cc/150?u=alex" alt="Avatar" className="w-24 h-24 rounded-full"/>
                    <button className="bg-brand-surface border border-border-color text-brand-text font-semibold py-2 px-4 rounded-lg hover:bg-brand-background transition-colors">
                        Cambiar Avatar
                    </button>
                 </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <InputField label="Nombre(s)" type="text" value="Alex" />
                    <InputField label="Apellidos" type="text" value="Johnson" />
                </div>
            </SettingsSection>
            
            <SettingsSection title="Seguridad">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="Nueva Contraseña" type="password" value="" placeholder="••••••••" />
                    <InputField label="Confirmar Contraseña" type="password" value="" placeholder="••••••••" />
                 </div>
            </SettingsSection>

            <SettingsSection title="Notificaciones">
                <div className="flex items-center justify-between">
                    <p className="text-brand-text">Nuevas tareas asignadas</p>
                    <input type="checkbox" className="toggle" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-brand-text">Tareas calificadas</p>
                    <input type="checkbox" className="toggle" defaultChecked />
                </div>
                 <div className="flex items-center justify-between">
                    <p className="text-brand-text">Recordatorios de entrega</p>
                    <input type="checkbox" />
                </div>
            </SettingsSection>
            
            <div className="text-right mt-6">
                 <button className="bg-brand-primary text-white font-semibold py-2 px-6 rounded-lg hover:bg-opacity-90 transition-colors">
                    Guardar Cambios
                </button>
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

export default StudentSettings;