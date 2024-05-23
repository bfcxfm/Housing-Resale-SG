import { create } from "zustand";

export const useSharedStore = create((set) => ({
  resaleMounted: false,
  setResaleMounted: (mounted) => set({ resaleMounted: mounted }),
}));
