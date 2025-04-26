import { create } from 'zustand';

import { UserType } from '@/types/user';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useUserStore = create<any>((set) => ({
  user: null,
  loading: false,
  error: null,
  setUser: (user: UserType) => set({ user }),
}));
