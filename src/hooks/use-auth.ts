import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, LoginRequest, SignupRequest, AuthResponse } from '@shared/types';
import { api } from '@/lib/api-client';
interface AuthState {
  user: User | null;
  token: string | null;
  login: (req: LoginRequest) => Promise<void>;
  signup: (req: SignupRequest) => Promise<void>;
  logout: () => void;
}
export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: async (req) => {
        const res = await api<AuthResponse>('/api/auth/login', {
          method: 'POST',
          body: JSON.stringify(req),
        });
        set({ user: res.user, token: res.token });
      },
      signup: async (req) => {
        const res = await api<AuthResponse>('/api/auth/signup', {
          method: 'POST',
          body: JSON.stringify(req),
        });
        set({ user: res.user, token: res.token });
      },
      logout: () => {
        set({ user: null, token: null });
      },
    }),
    {
      name: 'tyt-kampus-auth',
    }
  )
);