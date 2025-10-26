import React from 'react';

const InputField: React.FC<{ label: string; type: string; value: string; }> = ({ label, type, value }) => (
    <div>
        <label className="block text-sm font-semibold text-text-muted mb-1">{label}</label>
        <input 
            type={type} 
            defaultValue={value}
            className="w-full px-3 py-2 border border-border-color rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-secondary bg-brand-background"
        />
    </div>
);

const ParentSettings: React.FC = () => {
    return (
        <div className="animate-fade-in max-w-3xl mx-auto">
            <h2 className="text-3xl font-extrabold text-brand-text mb-8">Configuración del Perfil</h2>

            <div className="bg-brand-surface p-6 rounded-2xl shadow-sm border border-border-color mb-6">
                <h3 className="text-xl font-bold text-brand-text border-b border-border-color pb-4 mb-6">Información del Tutor</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="Nombre" type="text" value="Carlos" />
                    <InputField label="Apellidos" type="text" value="García" />
                    <InputField label="Relación" type="text" value="Padre / Tutor" />
                    <InputField label="Correo Electrónico" type="email" value="carlos.garcia@email.com" />
                    <InputField label="Teléfono" type="tel" value="+52 55 1234 5678" />
                </div>
            </div>

            <div className="bg-brand-surface p-6 rounded-2xl shadow-sm border border-border-color">
                 <h3 className="text-xl font-bold text-brand-text mb-4">Alumnos Vinculados</h3>
                 <div className="space-y-3">
                    <div className="flex items-center justify-between bg-brand-background p-3 rounded-lg">
                        <p className="font-semibold text-brand-text">Ana García</p>
                        <p className="text-sm text-text-muted">5º Grado</p>
                    </div>
                    <div className="flex items-center justify-between bg-brand-background p-3 rounded-lg">
                        <p className="font-semibold text-brand-text">Luis García</p>
                        <p className="text-sm text-text-muted">3er Grado</p>
                    </div>
                 </div>
            </div>
            
            <div className="text-right mt-6">
                 <button className="bg-brand-primary text-white font-semibold py-2 px-6 rounded-lg hover:bg-opacity-90 transition-colors">
                    Guardar Cambios
                </button>
            </div>
        </div>
    );
};

export default ParentSettings;