import create from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist((set) => ({
    user: {
      name: "",
      email: "",
      photoUrl: "",
    },

    setUser: (user) => set((state) => ({ user })),
  }))
);
