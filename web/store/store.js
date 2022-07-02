import create from "zustand";
import { persist } from "zustand/middleware";

export default useStore = create(
  persist((set) => ({
    user: {},

    setUser: (user) => set((state) => ({ user })),
  }))
);
