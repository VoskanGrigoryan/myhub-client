import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface IUIStore {
  navbarOpen: boolean;
  setNavbarOpen: (open: boolean) => void;
  selectedNavItem: string;
  setSelectedNavItem: (label: string) => void;
}

export const useUIStore = create<IUIStore>()(
  persist(
    (set) => ({
      navbarOpen: false,
      setNavbarOpen: (open) => set({ navbarOpen: open }),
      selectedNavItem: "Dashboard",
      setSelectedNavItem: (label) => set({ selectedNavItem: label }),
    }),
    {
      name: "ui-store",
    }
  )
);
