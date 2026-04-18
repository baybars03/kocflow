import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import type { TYTTask, DenemeScore, UserStats } from '@shared/types';
export function useTasks() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['tasks'],
    queryFn: () => api<TYTTask[]>('/api/tasks'),
  });
  const createMutation = useMutation({
    mutationFn: (task: Partial<TYTTask>) => api<TYTTask>('/api/tasks', { method: 'POST', body: JSON.stringify(task) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    },
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, ...updates }: Partial<TYTTask> & { id: string }) => 
      api<TYTTask>(`/api/tasks/${id}`, { method: 'PUT', body: JSON.stringify(updates) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    },
  });
  const deleteMutation = useMutation({
    mutationFn: (id: string) => api<{ id: string }>(`/api/tasks/${id}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    },
  });
  return { ...query, createTask: createMutation, updateTask: updateMutation, deleteTask: deleteMutation };
}
export function useScores() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['scores'],
    queryFn: () => api<DenemeScore[]>('/api/scores'),
  });
  const createMutation = useMutation({
    mutationFn: (score: Omit<DenemeScore, 'id'>) => api<DenemeScore>('/api/scores', { method: 'POST', body: JSON.stringify(score) }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['scores'] }),
  });
  return { ...query, createScore: createMutation };
}
export function useStats() {
  return useQuery({
    queryKey: ['stats'],
    queryFn: () => api<UserStats>('/api/stats'),
  });
}