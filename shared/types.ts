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
  coachAssignments?: string[];
  pomodoroSessions?: number;
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
  date: string;
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
  progressToNextLevel: number;
  streakDays: number;
  pomodoroSessions: number;
}
export interface Recommendation {
  subject: TYTSubject;
  topic: string;
  reason: string;
}
export interface LeaderboardEntry {
  displayName: string;
  avgNet: number;
  level: number;
  isCurrentUser?: boolean;
}