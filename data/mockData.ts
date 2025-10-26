// data/mockData.ts
import { MockData, User } from '../types';

export const allUsers: User[] = [
  { 
    id: 'student-alex-johnson', 
    name: 'Alex Johnson', 
    role: 'student',
    avatar: 'https://i.pravatar.cc/150?u=alex',
    email: 'alex.j@email.com',
    status: 'active',
    lastLogin: '2023-11-10T09:00:00Z',
    classIds: ['class-math-5', 'class-science-5']
  },
   { 
    id: 'student-ana-garcia', 
    name: 'Ana García', 
    role: 'student',
    avatar: 'https://i.pravatar.cc/150?u=ana',
    email: 'ana.g@email.com',
    status: 'active',
    lastLogin: '2023-11-10T08:30:00Z',
    classIds: ['class-math-5']
  },
  { 
    id: 'student-luis-garcia', 
    name: 'Luis García', 
    role: 'student',
    avatar: 'https://i.pravatar.cc/150?u=luis',
    email: 'luis.g@email.com',
    status: 'active',
    lastLogin: '2023-11-09T11:00:00Z',
     classIds: ['class-art-3']
  },
  { 
    id: 'teacher-ana-torres', 
    name: 'Ana Torres', 
    role: 'teacher',
    avatar: 'https://i.pravatar.cc/150?u=anatorres',
    email: 'ana.torres@educap.edu',
    status: 'active',
    lastLogin: '2023-11-10T07:45:00Z',
    classIds: ['class-math-5']
  },
  { 
    id: 'teacher-carlos-ruiz', 
    name: 'Carlos Ruiz', 
    role: 'teacher',
    avatar: 'https://i.pravatar.cc/150?u=carlosruiz',
    email: 'carlos.ruiz@educap.edu',
    status: 'suspended',
    lastLogin: '2023-10-25T14:00:00Z',
    classIds: ['class-science-5']
  },
  { 
    id: 'parent-carlos-garcia', 
    name: 'Carlos García', 
    role: 'parent', 
    childrenIds: ['student-ana-garcia', 'student-luis-garcia'],
    avatar: 'https://i.pravatar.cc/150?u=carlosg',
    email: 'c.garcia@email.com',
    status: 'active',
    lastLogin: '2023-11-10T18:00:00Z',
  },
  {
    id: 'admin-main',
    name: 'Admin General',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?u=admin',
    email: 'admin@educap.edu',
    status: 'active',
    lastLogin: '2023-11-10T09:15:00Z',
  }
];

export const mockData: MockData = {
  users: allUsers,
  lessons: [
    { id: 'lesson-001', title: 'Introducción al Álgebra', subject: 'Matemáticas', grade: 5, authorId: 'teacher-ana-torres', creationDate: '2023-10-15', status: 'published', contentPreview: 'Conceptos básicos de variables y ecuaciones...', type: 'video' },
    { id: 'lesson-002', title: 'La Célula Animal', subject: 'Ciencias', grade: 5, authorId: 'teacher-carlos-ruiz', creationDate: '2023-10-20', status: 'published', contentPreview: 'Un modelo 3D interactivo de la célula...', type: '3d' },
    { id: 'lesson-003', title: 'La Fotosíntesis (Borrador)', subject: 'Ciencias', grade: 5, authorId: 'admin-main', creationDate: '2023-11-05', status: 'draft', contentPreview: 'Generado por IA. Proceso de conversión de luz...', type: 'interactive' },
  ],
  tasks: [
    { id: 'task-001', title: 'Resolver Ecuaciones Cuadráticas', subject: 'Matemáticas V', classId: 'class-math-5', studentId: 'student-alex-johnson', dueDate: '2023-11-15', status: 'pending' },
    { id: 'task-002', title: 'Ensayo sobre la Revolución Francesa', subject: 'Historia Universal', classId: 'class-history-5', studentId: 'student-alex-johnson', dueDate: '2023-11-08', status: 'overdue' },
    { id: 'task-003', title: 'Reporte de Laboratorio: Célula Animal', subject: 'Ciencias Naturales', classId: 'class-science-5', studentId: 'student-ana-garcia', dueDate: '2023-11-10', status: 'submitted' },
    { id: 'task-004', title: 'Análisis del poema "La Suave Patria"', subject: 'Literatura', classId: 'class-lit-5', studentId: 'student-ana-garcia', dueDate: '2023-11-05', status: 'completed', grade: 9.5, feedback: '¡Excelente análisis! Muy bien estructurado.' },
    { id: 'task-005', title: 'Presentación Oral: Verbos Irregulares', subject: 'Inglés Avanzado', classId: 'class-eng-5', studentId: 'student-alex-johnson', dueDate: '2023-11-01', status: 'completed', grade: 8.0, feedback: 'Buen trabajo, cuidar la pronunciación de algunas palabras.' },
    { id: 'task-006', title: 'Dibujo de la Familia', subject: 'Arte', classId: 'class-art-3', studentId: 'student-luis-garcia', dueDate: '2023-11-12', status: 'pending' },
  ],
  studyPlans: [
      { id: 'plan-math-5', name: 'Plan de Matemáticas - 5º Grado', grade: 5, subject: 'Matemáticas', lessonIds: ['lesson-001'] },
      { id: 'plan-science-5', name: 'Plan de Ciencias - 5º Grado', grade: 5, subject: 'Ciencias', lessonIds: ['lesson-002', 'lesson-003'] },
  ],
  mediaResources: [
      { id: 'media-01', name: 'celula_animal.glb', type: '3d_model', url: '#', size: '15.2MB', uploadDate: '2023-10-19' },
      { id: 'media-02', name: 'bienvenida_curso.mp4', type: 'video', url: '#', size: '45.8MB', uploadDate: '2023-09-01' },
      { id: 'media-03', name: 'logo_escuela.png', type: 'image', url: '#', size: '120KB', uploadDate: '2023-08-15' },
  ],
  systemLogs: [
      { id: 'log-1', timestamp: new Date(Date.now() - 1 * 60 * 1000).toISOString(), level: 'info', message: "Usuario 'admin-main' ha iniciado sesión." },
      { id: 'log-2', timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(), level: 'debug', message: "Prueba de rendimiento de base de datos completada (25ms)." },
      { id: 'log-3', timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(), level: 'warning', message: "API de Gemini respondió con latencia alta (2.5s)." },
      { id: 'log-4', timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(), level: 'info', message: "Usuario 'teacher-ana-torres' publicó la lección 'lesson-001'." },
  ]
};

// Simplified users array for the RoleSelector
export const users: User[] = [
  allUsers.find(u => u.role === 'student'),
  allUsers.find(u => u.role === 'teacher'),
  allUsers.find(u => u.role === 'parent'),
  allUsers.find(u => u.role === 'admin'),
].filter(Boolean) as User[];