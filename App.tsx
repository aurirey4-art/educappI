import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import StudentDashboard from './components/StudentDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import ParentDashboard from './components/ParentDashboard';
import AdminDashboard from './components/AdminDashboard';
import { User, Role } from './types';
import { DataProvider, useData } from './contexts/DataContext';
import LoginScreen from './components/LoginScreen';
import { auth } from './firebase';

function AppContent() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isSimulated, setIsSimulated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { data } = useData();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser && data.users.length > 0) {
        // A real user is logged in
        const userProfile = data.users.find(u => u.email === firebaseUser.email);
        setCurrentUser(userProfile || null);
        setIsSimulated(false); // This is a real session
      } else if (!isSimulated) {
        // No real user, and not in a simulation, so clear the user.
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Limpiar el listener al desmontar
  }, [data.users, isSimulated]);


  const handleLogout = async () => {
    try {
      if (auth.currentUser) {
        await signOut(auth);
      }
      // For both real and simulated sessions, reset state
      setCurrentUser(null);
      setIsSimulated(false);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };
  
  const handleLoginAs = (user: User) => {
    // This function is for an admin viewing as another user.
    // It's not a full simulation, as the admin auth state is preserved.
    console.log(`Admin is viewing as ${user.name}`);
    setCurrentUser(user);
  }
  
  const handleGoBack = () => {
      // Vuelve al usuario admin original
      const adminUser = data.users.find(u => u.email === auth.currentUser?.email);
      setCurrentUser(adminUser || null);
  }

  const handleSimulatedLogin = (role: Role) => {
    const userToSimulate = data.users.find(u => u.role === role);
    if (userToSimulate) {
      setCurrentUser(userToSimulate);
      setIsSimulated(true);
    } else {
      console.error(`Could not find a user with role: ${role} to simulate.`);
    }
  }

  const renderDashboard = () => {
    if (!currentUser) return null;
    
    // If an admin is viewing as another user, onGoBack restores the admin session.
    // For all other users (including simulated ones), it acts as a logout.
    const isAdminViewingAs = !isSimulated && currentUser.role !== 'admin' && data.users.find(u => u.email === auth.currentUser?.email)?.role === 'admin';
    
    const onGoBackAction = isAdminViewingAs ? handleGoBack : handleLogout;

    switch (currentUser.role) {
      case 'student':
        return <StudentDashboard user={currentUser} onGoBack={onGoBackAction} />;
      case 'teacher':
        return <TeacherDashboard user={currentUser} onGoBack={onGoBackAction} />;
      case 'parent':
        return <ParentDashboard user={currentUser} onGoBack={onGoBackAction} />;
      case 'admin':
        // For admin, the back button is always a logout unless they are viewing as someone else.
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
        {currentUser ? (
          renderDashboard()
        ) : (
          <LoginScreen onSimulatedLogin={handleSimulatedLogin} />
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