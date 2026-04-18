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
  assignedCoachId?: string;
  pomodoroSessions?: number;
  isPremium?: boolean;
  isSuspended?: boolean;
  isAITutorActive?: boolean;
  createdAt?: number;
}
export interface CoachProfile {
  id: string; // Same as User ID
  displayName: string;
  bio: string;
  avatarUrl: string;
  rating: number;
  reviewCount: number;
  studentCount: number;
  price: number;
  successRate: number;
  specialties: string[];
  isVerified: boolean;
}
export interface CoachSubscription {
  id: string;
  studentId: string;
  coachId: string;
  status: 'active' | 'pending' | 'cancelled';
  startDate: number;
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
export type TYTSubject = 
  | 'Matematik' 
  | 'Türkçe' 
  | 'Sosyal' 
  | 'Fen' 
  | 'İngilizce' 
  | 'Din Kültürü' 
  | 'Geometri' 
  | 'LGS-Matematik' 
  | 'LGS-Fen' 
  | 'LGS-Türkçe' 
  | 'LGS-Sosyal';
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
  ingilizce?: number;
  din?: number;
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
  totalQuizPoints?: number;
  badges?: string[];
}
export interface QuizQuestion {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  subject: TYTSubject;
}
export interface QuizResult {
  score: number;
  nets: number;
  correctCount: number;
  totalQuestions: number;
  timeSpent: number;
  xpEarned: number;
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
export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: number;
}
export interface AIChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'task' | 'streak' | 'chat' | 'system';
  read: boolean;
  createdAt: number;
}
export interface AdminAnalytics {
  totalGrowth: { date: string; count: number }[];
  retentionRate: number;
  popularTasks: { subject: string; count: number }[];
  activeSessions: number;
}
export interface BulkTaskRequest {
  studentIds: string[];
  subject: TYTSubject;
  topic: string;
}
export interface CoachStudentStats {
  studentId: string;
  email: string;
  level: number;
  streak: number;
  latestNet: number;
  lowProgressAlert: boolean;
}