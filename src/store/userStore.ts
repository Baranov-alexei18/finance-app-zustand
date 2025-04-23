/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';

export const useUserStore = create<any>((set) => ({
  user: null,
  loading: false,
  error: null,
  setUser: (user: any) => set({ user }),
}));
