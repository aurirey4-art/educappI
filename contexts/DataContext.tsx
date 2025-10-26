import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, addDoc, updateDoc, doc, DocumentData } from 'firebase/firestore';
import { MockData, Task, User, Lesson, StudyPlan, MediaResource, SystemLog } from '../types';
import { mockData as initialMockData } from '../data/mockData'; // Usado para inicialización si no hay datos

interface DataContextType {
  data: MockData;
  loading: boolean;
  addTask: (task: Omit<Task, 'id' | 'status'>) => Promise<void>;
  updateTaskStatus: (taskId: string, status: Task['status']) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<MockData>(initialMockData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const collections = ['users', 'lessons', 'tasks', 'studyPlans', 'mediaResources', 'systemLogs'];
    const unsubscribes = collections.map(collectionName => {
        const q = collection(db, collectionName);
        return onSnapshot(q, (querySnapshot) => {
            const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as DocumentData));
            setData(prevData => ({
                ...prevData,
                [collectionName]: items
            }));
        }, (error) => {
            console.error(`Error fetching ${collectionName}: `, error);
        });
    });

    // Simulamos carga para que no sea instantáneo
     setTimeout(() => setLoading(false), 500);

    // Limpiar listeners al desmontar
    return () => unsubscribes.forEach(unsub => unsub());
  }, []);


  const addTask = async (task: Omit<Task, 'id' | 'status'>) => {
    try {
        const newTask = {
            ...task,
            status: 'pending'
        };
        await addDoc(collection(db, 'tasks'), newTask);
    } catch (error) {
        console.error("Error adding task: ", error);
    }
  };

  const updateTaskStatus = async (taskId: string, status: Task['status']) => {
    try {
        const taskRef = doc(db, 'tasks', taskId);
        await updateDoc(taskRef, { status });
    } catch (error) {
        console.error("Error updating task status: ", error);
    }
  };

  return (
    <DataContext.Provider value={{ data, loading, addTask, updateTaskStatus }}>
      {!loading && children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
