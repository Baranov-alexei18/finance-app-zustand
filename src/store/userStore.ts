/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';

import { TransitionEnum } from '@/types/transition';
import { UserType } from '@/types/user';

type Props = {
  user: UserType | null;
  loading: boolean;
  error: Error | null;
  setUser: (user: UserType) => any;
  getTransactionsByType: (type: TransitionEnum) => any[];
};

export const useUserStore = create<Props>((set, get) => ({
  user: null,
  loading: false,
  error: null,
  setUser: (user: UserType) => set({ user }),
  getTransactionsByType: (type) => {
    const { user } = get();
    if (!user || !user?.transitions) {
      return [];
    }
    return user.transitions.filter((transaction: any) => transaction.type === type);
  },
}));
