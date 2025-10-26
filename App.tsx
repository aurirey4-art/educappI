import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import StudentDashboard from './components/StudentDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import ParentDashboard from './components/ParentDashboard';
import AdminDashboard from './components/AdminDashboard';
import { User } from './types';
import { DataProvider, useData } from './contexts/DataContext';
import LoginScreen from './components/LoginScreen';
import { auth } from './firebase';

function AppContent() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { data } = useData();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser && data.users.length > 0) {
        // En una app real, obtendrías el perfil del usuario desde Firestore.
        // Aquí, lo buscamos en nuestros datos cargados por email.
        const userProfile = data.users.find(u => u.email === firebaseUser.email);
        setCurrentUser(userProfile || null);
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Limpiar el listener al desmontar
  }, [data.users]);


  const handleLogout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };
  
  const handleLoginAs = (user: User) => {
    // Esta función ahora simula el cambio de usuario en el frontend,
    // ya que la autenticación real no permite un "login as" directo.
    console.log(`Admin is viewing as ${user.name}`);
    setCurrentUser(user);
  }
  
  const handleGoBack = () => {
      // Vuelve al usuario admin original
      const adminUser = data.users.find(u => u.role === 'admin');
      setCurrentUser(adminUser || null);
  }

  const renderDashboard = () => {
    if (!currentUser) return null;
    
    // Si el admin está viendo como otro usuario, el botón de "volver" debe restaurar al admin.
    const onGoBack = currentUser.role !== 'admin' && data.users.find(u => u.email === auth.currentUser?.email)?.role === 'admin' 
        ? handleGoBack 
        : handleLogout;

    switch (currentUser.role) {
      case 'student':
        return <StudentDashboard user={currentUser} onGoBack={onGoBack} />;
      case 'teacher':
        return <TeacherDashboard user={currentUser} onGoBack={onGoBack} />;
      case 'parent':
        return <ParentDashboard user={currentUser} onGoBack={onGoBack} />;
      case 'admin':
        return <AdminDashboard user={currentUser} onGoBack={handleLogout} onLoginAs={handleLoginAs} />;
      default:
        return null;
    }
  };

  if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-brand-primary"></div>
        </div>
      );
  }

  return (
      <div className="bg-brand-background min-h-screen w-full flex items-center justify-center font-sans p-4">
        {auth.currentUser && currentUser ? (
          renderDashboard()
        ) : (
          <LoginScreen />
        )}
      </div>
  );
}


function App() {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  )
}

export default App;
