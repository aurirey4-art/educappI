import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import AdminSystemMonitoring from './system/AdminSystemMonitoring';
import AdminSystemDebug from './system/AdminSystemDebug';

type ActiveTab = 'monitoring' | 'debug';

const AdminSystem: React.FC = () => {
    const [activeTab, setActiveTab] = useState<ActiveTab>('monitoring');
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
            <h2 className="text-3xl font-extrabold text-brand-text mb-6">Estado del Sistema</h2>
            
             <div className="flex border-b border-border-color mb-6">
                <TabButton tabName="monitoring" label="Monitoreo de Servicios" />
                <TabButton tabName="debug" label="Pruebas y Depuración" />
            </div>

            <div>
                {activeTab === 'monitoring' ? (
                    <AdminSystemMonitoring logs={data.systemLogs} />
                ) : (
                    <AdminSystemDebug />
                )}
            </div>
        </div>
    );
};

export default AdminSystem;