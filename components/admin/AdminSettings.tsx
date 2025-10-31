import React, { useState, useEffect } from 'react';

const SettingsSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-brand-surface p-6 rounded-2xl shadow-sm border border-border-color mb-8">
        <h3 className="text-xl font-bold text-brand-text border-b border-border-color pb-4 mb-6">{title}</h3>
        <div className="space-y-4">
            {children}
        </div>
    </div>
);

const ColorInput: React.FC<{ label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; }> = ({ label, name, value, onChange }) => (
    <div className="flex-1">
        <label className="block text-sm font-semibold text-text-muted mb-1">{label}</label>
        <div className="flex items-center gap-2 border border-border-color rounded-lg bg-brand-background pr-2">
            <input
                type="color"
                name={name}
                value={value}
                onChange={onChange}
                className="w-10 h-10 p-1 bg-transparent border-none cursor-pointer"
            />
            <input
                type="text"
                name={name}
                value={value}
                onChange={onChange}
                className="w-full bg-transparent focus:outline-none text-brand-text font-mono"
            />
        </div>
    </div>
);


const AdminSettings: React.FC = () => {
    const [customColors, setCustomColors] = useState({
        primary: '#2B6CB0',
        secondary: '#4299E1',
        accent: '#38A169',
    });
    // FIX: Initialize with the correct shape to avoid type errors.
    const [initialColors, setInitialColors] = useState({
        primary: '',
        secondary: '',
        accent: '',
    });

    useEffect(() => {
        // Al montar el componente, leer los colores actuales del tema
        const rootStyles = getComputedStyle(document.documentElement);
        const colors = {
            primary: rootStyles.getPropertyValue('--color-brand-primary').trim(),
            secondary: rootStyles.getPropertyValue('--color-brand-secondary').trim(),
            accent: rootStyles.getPropertyValue('--color-brand-accent').trim(),
        };
        setCustomColors(colors);
        setInitialColors(colors);
    }, []);

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCustomColors(prev => ({ ...prev, [name]: value }));
    };

    const applyCustomColors = () => {
        const root = document.documentElement;
        root.style.setProperty('--color-brand-primary', customColors.primary);
        root.style.setProperty('--color-brand-secondary', customColors.secondary);
        root.style.setProperty('--color-brand-accent', customColors.accent);
    };
    
    const resetToThemeDefaults = () => {
        setCustomColors(initialColors);
        const root = document.documentElement;
        root.style.removeProperty('--color-brand-primary');
        root.style.removeProperty('--color-brand-secondary');
        root.style.removeProperty('--color-brand-accent');
    };

    return (
        <div className="animate-fade-in max-w-4xl mx-auto">
            <h2 className="text-3xl font-extrabold text-brand-text mb-8">Configuración Avanzada</h2>

            <SettingsSection title="Paletas de Colores Personalizadas">
                <p className="text-sm text-text-muted -mt-2 mb-4">
                    Define los colores de la marca. Estos se aplicarán sobre el tema visual seleccionado (claro, oscuro o suave).
                </p>
                <div className="flex flex-col md:flex-row gap-6">
                    <ColorInput label="Color Primario" name="primary" value={customColors.primary} onChange={handleColorChange} />
                    <ColorInput label="Color Secundario" name="secondary" value={customColors.secondary} onChange={handleColorChange} />
                    <ColorInput label="Color de Acento" name="accent" value={customColors.accent} onChange={handleColorChange} />
                </div>
                <div className="flex gap-4 mt-4">
                    <button onClick={applyCustomColors} className="bg-brand-secondary text-white font-semibold py-2 px-4 rounded-lg">
                        Aplicar Paleta
                    </button>
                    <button onClick={resetToThemeDefaults} className="bg-brand-surface border border-border-color text-brand-text font-semibold py-2 px-4 rounded-lg">
                        Restaurar
                    </button>
                </div>
            </SettingsSection>

            <SettingsSection title="Personalización Visual">
                <div className="flex items-center justify-between">
                    <p className="text-brand-text">Permitir a los usuarios cambiar de tema</p>
                    <input type="checkbox" className="toggle" defaultChecked />
                </div>
                 <div className="flex items-center justify-between">
                    <p className="text-brand-text">Logo de la Institución</p>
                    <button className="text-sm font-semibold text-brand-secondary hover:underline">Subir nuevo logo</button>
                </div>
            </SettingsSection>
            
            <SettingsSection title="Configuración de IA (Gemini)">
                 <div>
                    <label className="block text-sm font-semibold text-text-muted mb-1">Modelo de Lenguaje Principal</label>
                    <select className="w-full p-2 border border-border-color rounded-lg bg-brand-background">
                        <option>gemini-2.5-flash</option>
                        <option>gemini-2.5-pro</option>
                    </select>
                </div>
                 <div>
                    <label className="block text-sm font-semibold text-text-muted mb-1">Nivel de Autonomía de la IA (0 a 1)</label>
                    <input type="range" min="0" max="1" step="0.1" defaultValue="0.7" className="w-full" />
                </div>
            </SettingsSection>

            <SettingsSection title="Seguridad y Respaldos">
                <div className="flex items-center justify-between">
                    <p className="text-brand-text">Frecuencia de Respaldo de Base de Datos</p>
                    <select className="p-2 border border-border-color rounded-lg bg-brand-background text-sm">
                        <option>Diario</option>
                        <option>Semanal</option>
                        <option>Mensual</option>
                    </select>
                </div>
            </SettingsSection>
            
            <div className="text-right mt-6">
                 <button className="bg-brand-primary text-white font-semibold py-2 px-6 rounded-lg hover:bg-opacity-90">
                    Guardar Configuración
                </button>
            </div>

            <style>{`
                .toggle{-webkit-appearance:none;appearance:none;width:40px;height:22px;background-color:var(--color-border);border-radius:9999px;position:relative;cursor:pointer;transition:background-color .3s}
                .toggle:checked{background-color:var(--color-brand-primary)}
                .toggle::before{content:'';position:absolute;width:16px;height:16px;background-color:#fff;border-radius:50%;top:3px;left:4px;transition:transform .3s}
                .toggle:checked::before{transform:translateX(17px)}
                input[type="color"]::-webkit-color-swatch-wrapper { padding: 0; }
                input[type="color"]::-webkit-color-swatch { border: none; border-radius: 0.375rem 0 0 0.375rem; }
            `}</style>
        </div>
    );
};

export default AdminSettings;