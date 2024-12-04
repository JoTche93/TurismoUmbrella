import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { validateCredentials } from '../utils/validation';
import { sendWelcomeEmail, sendLoginNotification } from '../utils/email';

export interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

// Simulación de base de datos de usuarios
const users = new Map<string, { password: string; user: User }>();

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        const validation = validateCredentials(email, password);
        if (!validation.success) {
          return { success: false, error: validation.error };
        }

        const userRecord = users.get(email);
        if (!userRecord || userRecord.password !== password) {
          return { success: false, error: 'Credenciales inválidas' };
        }

        await sendLoginNotification(userRecord.user);
        set({ user: userRecord.user, isAuthenticated: true });
        return { success: true };
      },
      register: async (email: string, password: string) => {
        const validation = validateCredentials(email, password);
        if (!validation.success) {
          return { success: false, error: validation.error };
        }

        if (users.has(email)) {
          return { success: false, error: 'El correo ya está registrado' };
        }

        const newUser: User = {
          id: Math.random().toString(36).substr(2, 9),
          email,
          name: email.split('@')[0],
        };

        users.set(email, { password, user: newUser });
        await sendWelcomeEmail(newUser);
        set({ user: newUser, isAuthenticated: true });
        return { success: true };
      },
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
);