export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
export type UserRole = 'admin' | 'öğrenci' | 'koç';
export interface User {
  id: string;
  email: string;
  role: UserRole;
  password?: string;
  coachAssignments?: string[]; // IDs of students assigned to this coach
}
export interface AuthResponse {
  user: User;
  token: string;
}
export interface LoginRequest {
  email: string;
  password?: string;
}
export interface SignupRequest {
  email: string;
  password?: string;
  role: UserRole;
}
export type TYTSubject = 'Matematik' | 'Türkçe' | 'Sosyal' | 'Fen';
export interface TYTTask {
  id: string;
  userId: string;
  subject: TYTSubject;
  topic: string;
  done: boolean;
  createdAt: number;
}
export interface DenemeScore {
  id: string;
  userId: string;
  date: string; // ISO format
  turkce: number;
  matematik: number;
  sosyal: number;
  fen: number;
  totalNet: number;
}
export interface UserStats {
  level: number;
  points: number;
  completedTasks: number;
  totalTasks: number;
  nextLevelPoints: number;
  progressToNextLevel: number; // 0-100
  streakDays: number;
}