export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
export type TYTSubject = 'Matematik' | 'Türkçe' | 'Sosyal' | 'Fen';
export interface TYTTask {
  id: string;
  subject: TYTSubject;
  topic: string;
  done: boolean;
  createdAt: number;
}
export interface DenemeScore {
  id: string;
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