import React from 'react';
import { useData } from '../../contexts/DataContext';
import PresentationChartLineIcon from '../icons/PresentationChartLineIcon';

const reportTemplates = [
    'Rendimiento General de Alumnos',
    'Actividad de Maestros',
    'Uso de Recursos Digitales',
    'Reporte de Asistencia Global',
    'Resumen de Comunicaciones',
    'Uso del Generador IA'
];

const AdminReports: React.FC = () => {
    const { data } = useData();
    return (
        <div className="animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
                <h2 className="text-3xl font-extrabold text-brand-text">Reportes y Estadísticas</h2>
                 <div className="flex items-center gap-2">
                    <input type="date" defaultValue="2023-10-01" className="border border-border-color rounded-lg py-2 px-3 text-sm focus:outline-none bg-brand-surface" />
                    <span className="text-text-muted">-</span>
                    <input type="date" defaultValue="2023-11-10" className="border border-border-color rounded-lg py-2 px-3 text-sm focus:outline-none bg-brand-surface" />
                    <button className="bg-brand-accent text-white font-semibold py-2 px-4 rounded-lg hover:bg-opacity-90">Exportar</button>
                 </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reportTemplates.map((template, i) => (
                    <div key={i} className="bg-brand-surface p-6 rounded-2xl shadow-sm border border-border-color">
                        <div className="flex items-center gap-4 mb-3">
                            <div className="text-brand-primary"><PresentationChartLineIcon /></div>
                            <h4 className="text-lg font-bold text-brand-text">{template}</h4>
                        </div>
                        <div className="h-24 bg-brand-background rounded-lg flex items-center justify-center text-sm text-text-muted">
                           [ Vista previa del gráfico ]
                        </div>
                        <button className="font-semibold text-brand-secondary hover:underline mt-4">Ver Reporte Completo &rarr;</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminReports;