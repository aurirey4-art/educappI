import React from 'react';

const DebugAction: React.FC<{ title: string; description: string; buttonText: string; buttonClass: string; }> = 
({ title, description, buttonText, buttonClass }) => (
    <div className="bg-brand-surface p-4 rounded-lg border border-border-color flex justify-between items-center">
        <div>
            <p className="font-bold text-brand-text">{title}</p>
            <p className="text-sm text-text-muted">{description}</p>
        </div>
        <button className={`font-semibold py-2 px-4 rounded-lg text-white ${buttonClass}`}>
            {buttonText}
        </button>
    </div>
);

const AdminSystemDebug: React.FC = () => {
    return (
        <div className="space-y-4">
            <DebugAction 
                title="Probar Conexión con API"
                description="Simula una llamada a la API de Gemini para verificar la latencia."
                buttonText="Ejecutar Ping"
                buttonClass="bg-brand-secondary"
            />
            <DebugAction 
                title="Forzar Error 500"
                description="Simula un error del servidor para probar las alertas del sistema."
                buttonText="Forzar Error"
                buttonClass="bg-status-overdue"
            />
             <DebugAction 
                title="Limpiar Caché de Contenido"
                description="Borra los datos de lecciones almacenados en caché para forzar una recarga."
                buttonText="Limpiar Caché"
                buttonClass="bg-status-pending"
            />
        </div>
    );
};

export default AdminSystemDebug;
