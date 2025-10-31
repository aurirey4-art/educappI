import React from 'react';
import { User } from '../../types';

const SettingsSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-brand-surface p-6 rounded-2xl shadow-sm border border-border-color mb-8">
        <h3 className="text-xl font-bold text-brand-text border-b border-border-color pb-4 mb-6">{title}</h3>
        <div className="space-y-4">
            {children}
        </div>
    </div>
);

// Fix: Add explicit prop types and make placeholder optional
interface InputFieldProps {
    label: string;
    type: string;
    value?: string;
    placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, value, placeholder }) => (
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

// FIX: Add teacher prop to component definition
const TeacherSettings: React.FC<{ teacher: User }> = ({ teacher }) => {
    return (
        <div className="animate-fade-in max-w-4xl mx-auto">
            <h2 className="text-3xl font-extrabold text-brand-text mb-8">Configuración</h2>

            <SettingsSection title="Perfil Profesional">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="Nombre Completo" type="text" value="Ana Torres" />
                    <InputField label="Correo Electrónico" type="email" value="ana.torres@educap.edu" />
                    <InputField label="Materia Principal" type="text" value="Matemáticas" />
                    <InputField label="Escuela" type="text" value="Instituto E-ducap" />
                </div>
            </SettingsSection>
            
            <SettingsSection title="Notificaciones">
                <div className="flex items-center justify-between">
                    <p className="text-brand-text">Nuevas entregas de tareas</p>
                    <label className="switch">
                        <input type="checkbox" defaultChecked />
                        <span className="slider round"></span>
                    </label>
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-brand-text">Mensajes de padres o alumnos</p>
                    <label className="switch">
                        <input type="checkbox" defaultChecked />
                        <span className="slider round"></span>
                    </label>
                </div>
                 <div className="flex items-center justify-between">
                    <p className="text-brand-text">Recordatorios de calendario</p>
                    <label className="switch">
                        <input type="checkbox" />
                        <span className="slider round"></span>
                    </label>
                </div>
            </SettingsSection>
            
            <div className="text-right mt-6">
                 <button className="bg-brand-primary text-white font-semibold py-2 px-6 rounded-lg hover:bg-opacity-90 transition-colors">
                    Guardar Cambios
                </button>
            </div>

            {/* Basic CSS for toggle switch */}
            <style>{`
                .switch{position:relative;display:inline-block;width:50px;height:28px}
                .switch input{opacity:0;width:0;height:0}
                .slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#ccc;transition:.4s}
                .slider:before{position:absolute;content:"";height:20px;width:20px;left:4px;bottom:4px;background-color:white;transition:.4s}
                input:checked+.slider{background-color:var(--color-brand-primary)}
                input:checked+.slider:before{transform:translateX(22px)}
                .slider.round{border-radius:34px}
                .slider.round:before{border-radius:50%}
            `}</style>
        </div>
    );
};

export default TeacherSettings;