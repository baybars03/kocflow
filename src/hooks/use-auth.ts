import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User, LoginRequest, SignupRequest, AuthResponse } from '@shared/types';
import { api } from '@/lib/api-client';
interface AuthState {
  user: User | null;
  token: string | null;
  isHydrated: boolean;
  login: (req: LoginRequest) => Promise<void>;
  signup: (req: SignupRequest) => Promise<void>;
  logout: () => void;
  setHydrated: (val: boolean) => void;
}
export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isHydrated: false,
      login: async (req: LoginRequest) => {
        const res = await api<AuthResponse>('/api/auth/login', {
          method: 'POST',
          body: JSON.stringify(req),
        });
        set({ user: res.user, token: res.token });
      },
      signup: async (req: SignupRequest) => {
        const res = await api<AuthResponse>('/api/auth/signup', {
          method: 'POST',
          body: JSON.stringify(req),
        });
        set({ user: res.user, token: res.token });
      },
      logout: () => {
        set({ user: null, token: null });
      },
      setHydrated: (val: boolean) => set({ isHydrated: val }),
    }),
    {
      name: 'tyt-kampus-auth',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);