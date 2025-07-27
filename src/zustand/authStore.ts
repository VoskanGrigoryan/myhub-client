import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
  provider: string;
}

interface AuthStore {
  user: User | null;
  isNewUser: boolean;
  setUser: (user: User, isNewUser: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isNewUser: false,

      setUser: (user, isNewUser) => set({ user, isNewUser }),

      logout: () => set({ user: null, isNewUser: false }),
    }),
    {
      name: "auth-store", // key in localStorage
      partialize: (state) => ({ user: state.user, isNewUser: state.isNewUser }),
    }
  )
);
