import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Role } from '../types';

interface LoginScreenProps {
  onSimulatedLogin: (role: Role) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onSimulatedLogin }) => {
    const [email, setEmail] = useState('alex.j@email.com');
    const [password, setPassword] = useState('password123'); // Usar una contraseña de prueba
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        const auth = getAuth();

        try {
            await signInWithEmailAndPassword(auth, email, password);
            // El listener onAuthStateChanged en App.tsx se encargará de la redirección
        } catch (error) {
            setError('Credenciales inválidas. Por favor, inténtalo de nuevo.');
            console.error("Error de autenticación:", error);
        } finally {
            setIsLoading(false);
        }
    };

  return (
    <div className="animate-fade-in text-center flex flex-col items-center">
        <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-extrabold text-brand-text">Bienvenido a E-ducap</h1>
            <p className="text-lg text-text-muted mt-2">Ingresa a la plataforma educativa</p>
        </div>

        <div className="bg-brand-surface p-8 rounded-2xl shadow-lg border border-border-color w-full max-w-md">
            <form onSubmit={handleLogin} className="space-y-6">
                <div>
                    <label className="block text-left text-sm font-semibold text-text-muted mb-1">Correo Electrónico</label>
                    <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-border-color rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-secondary bg-brand-background"
                        placeholder="tu.correo@ejemplo.com"
                    />
                </div>
                 <div>
                    <label className="block text-left text-sm font-semibold text-text-muted mb-1">Contraseña</label>
                    <input 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-border-color rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-secondary bg-brand-background"
                        placeholder="••••••••"
                    />
                </div>

                {error && <p className="text-sm text-status-overdue">{error}</p>}
                
                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-brand-primary text-white font-semibold py-3 rounded-lg hover:bg-opacity-90 transition-colors disabled:bg-opacity-50"
                >
                    {isLoading ? 'Ingresando...' : 'Ingresar'}
                </button>
            </form>
             <div className="relative my-6">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-border-color" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-brand-surface px-2 text-sm text-text-muted">O</span>
              </div>
            </div>

            <div>
                <p className="text-sm text-text-muted">Probar la aplicación como:</p>
                <div className="grid grid-cols-2 gap-3 mt-3">
                    <button onClick={() => onSimulatedLogin('student')} className="w-full bg-brand-background border border-border-color text-brand-text font-semibold py-2 rounded-lg hover:bg-brand-surface transition-colors">Alumno</button>
                    <button onClick={() => onSimulatedLogin('teacher')} className="w-full bg-brand-background border border-border-color text-brand-text font-semibold py-2 rounded-lg hover:bg-brand-surface transition-colors">Maestro</button>
                    <button onClick={() => onSimulatedLogin('parent')} className="w-full bg-brand-background border border-border-color text-brand-text font-semibold py-2 rounded-lg hover:bg-brand-surface transition-colors">Tutor</button>
                    <button onClick={() => onSimulatedLogin('admin')} className="w-full bg-brand-background border border-border-color text-brand-text font-semibold py-2 rounded-lg hover:bg-brand-surface transition-colors">Admin</button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default LoginScreen;