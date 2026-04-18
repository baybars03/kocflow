import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import type { TYTTask, DenemeScore, UserStats, Recommendation, LeaderboardEntry, AdminAnalytics, User, CoachStudentStats, BulkTaskRequest } from '@shared/types';
export function useTasks(userId?: string) {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['tasks', userId],
    queryFn: () => api<TYTTask[]>(`/api/tasks${userId ? `?userId=${userId}` : ''}`),
    enabled: !!userId,
  });
  const createMutation = useMutation({
    mutationFn: (task: Partial<TYTTask>) => api<TYTTask>('/api/tasks', { method: 'POST', body: JSON.stringify(task) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', userId] });
      queryClient.invalidateQueries({ queryKey: ['stats', userId] });
    },
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, ...updates }: Partial<TYTTask> & { id: string }) =>
      api<TYTTask>(`/api/tasks/${id}`, { method: 'PUT', body: JSON.stringify(updates) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', userId] });
      queryClient.invalidateQueries({ queryKey: ['stats', userId] });
    },
  });
  const deleteMutation = useMutation({
    mutationFn: (id: string) => api<{ id: string }>(`/api/tasks/${id}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', userId] });
      queryClient.invalidateQueries({ queryKey: ['stats', userId] });
    },
  });
  return { ...query, createTask: createMutation, updateTask: updateMutation, deleteTask: deleteMutation };
}
export function useScores(userId?: string) {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['scores', userId],
    queryFn: () => api<DenemeScore[]>(`/api/scores${userId ? `?userId=${userId}` : ''}`),
    enabled: !!userId,
  });
  const createMutation = useMutation({
    mutationFn: (score: Omit<DenemeScore, 'id'>) => api<DenemeScore>('/api/scores', { method: 'POST', body: JSON.stringify(score) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scores', userId] });
      queryClient.invalidateQueries({ queryKey: ['stats', userId] });
    },
  });
  return { ...query, createScore: createMutation };
}
export function useStats(userId?: string) {
  return useQuery({
    queryKey: ['stats', userId],
    queryFn: () => api<UserStats>(`/api/stats${userId ? `?userId=${userId}` : ''}`),
    enabled: !!userId,
  });
}
export function useRecommendations(userId?: string) {
  return useQuery({
    queryKey: ['recommendations', userId],
    queryFn: () => api<Recommendation[]>(`/api/ai-tasks/${userId}`),
    enabled: !!userId,
  });
}
export function useLeaderboard() {
  return useQuery({
    queryKey: ['leaderboard'],
    queryFn: () => api<LeaderboardEntry[]>('/api/leaderboard'),
  });
}
export function useCompletePomodoro(userId?: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => api('/api/pomodoro/complete', { method: 'POST', body: JSON.stringify({ userId }) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stats', userId] });
    },
  });
}
// Phase 11 Unicorn Hooks
export function useAdminAnalytics() {
  return useQuery({
    queryKey: ['admin-analytics'],
    queryFn: () => api<AdminAnalytics>('/api/admin/analytics'),
  });
}
export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...updates }: Partial<User> & { id: string }) =>
      api<User>(`/api/admin/users/${id}`, { method: 'PUT', body: JSON.stringify(updates) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    },
  });
}
export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api(`/api/admin/users/${id}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    },
  });
}
export function useCoachStudents(coachId?: string) {
  return useQuery({
    queryKey: ['coach-students-stats', coachId],
    queryFn: () => api<CoachStudentStats[]>(`/api/coach/students/${coachId}`),
    enabled: !!coachId,
  });
}
export function useBulkAssignTask() {
  return useMutation({
    mutationFn: (req: BulkTaskRequest) => api('/api/coach/assign-bulk', { method: 'POST', body: JSON.stringify(req) }),
  });
}