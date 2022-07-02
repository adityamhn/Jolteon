import create from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist((set) => ({
    user: {},
    setUser: (user) => set((state) => ({ user })),
  }))
);
