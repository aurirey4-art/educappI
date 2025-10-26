// types.ts

export type Role = 'student' | 'teacher' | 'parent' | 'admin';

export interface User {
  id: string;
  name: string;
  role: Role;
  avatar?: string;
  email?: string;
  status: 'active' | 'suspended';
  lastLogin: string;
  childrenIds?: string[];
  classIds?: string[];
}

export interface Lesson {
  id: string;
  title: string;
  subject: string;
  grade: number;
  authorId: string;
  creationDate: string;
  status: 'draft' | 'published' | 'archived';
  contentPreview: string;
  type: 'video' | 'text' | 'interactive' | '3d';
}

export interface Task {
  id: string;
  title: string;
  subject: string;
  classId: string;
  studentId: string;
  dueDate: string;
  status: 'completed' | 'pending' | 'overdue' | 'submitted';
  grade?: number;
  feedback?: string;
}

export interface StudyPlan {
  id: string;
  name: string;
  grade: number;
  subject: string;
  lessonIds: string[];
}

export interface MediaResource {
  id: string;
  name: string;
  type: 'image' | 'video' | '3d_model';
  url: string;
  size: string;
  uploadDate: string;
}

export interface SystemLog {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'debug';
  message: string;
}

export interface MockData {
  users: User[];
  lessons: Lesson[];
  tasks: Task[];
  studyPlans: StudyPlan[];
  mediaResources: MediaResource[];
  systemLogs: SystemLog[];
}