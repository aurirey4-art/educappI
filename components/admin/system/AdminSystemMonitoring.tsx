import React from 'react';
import { SystemLog } from '../../../types';
import CheckCircleIcon from '../../icons/CheckCircleIcon';
import AlertCircleIcon from '../../icons/AlertCircleIcon';

const ServiceStatusCard: React.FC<{ name: string, status: 'ok' | 'issue' }> = ({ name, status }) => (
    <div className="bg-brand-surface p-4 rounded-lg border border-border-color flex justify-between items-center">
        <p className="font-semibold text-brand-text">{name}</p>
        {status === 'ok' ? (
            <span className="flex items-center gap-1.5 text-xs font-semibold text-status-completed">
                <CheckCircleIcon width={16}/> Operacional
            </span>
        ) : (
             <span className="flex items-center gap-1.5 text-xs font-semibold text-status-overdue">
                <AlertCircleIcon width={16}/> Error
            </span>
        )}
    </div>
);

const logColors = {
    info: 'text-blue-400',
    debug: 'text-gray-500',
    warning: 'text-yellow-400',
    error: 'text-red-400',
};

const AdminSystemMonitoring: React.FC<{ logs: SystemLog[] }> = ({ logs }) => {
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <ServiceStatusCard name="Base de Datos (Firebase)" status="ok" />
                <ServiceStatusCard name="API de Gemini" status="ok" />
                <ServiceStatusCard name="Servidor de Aplicación" status="ok" />
            </div>
             <div className="bg-gray-800 text-sm text-white font-mono p-4 rounded-lg h-80 overflow-y-auto">
                {logs.map(log => (
                    <div key={log.id} className="flex gap-4">
                        <span className="text-gray-600">{new Date(log.timestamp).toLocaleTimeString()}</span>
                        <span className={`${logColors[log.level]} font-bold uppercase`}>{log.level}</span>
                        <span>{log.message}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminSystemMonitoring;
