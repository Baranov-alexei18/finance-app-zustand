/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';

import { CategoryType } from '@/types/category';
import { TransitionEnum, TransitionType } from '@/types/transition';
import { UserType } from '@/types/user';

type Props = {
  user: UserType | null;
  loading: boolean;
  error: Error | null;
  setUser: (user: UserType | null) => any;
  getTransactionsByType: (type: TransitionEnum) => TransitionType[];
  getCategoriesByType: (type: TransitionEnum) => CategoryType[];
};

export const useUserStore = create<Props>((set, get) => ({
  user: null,
  loading: false,
  error: null,
  setUser: (user: UserType | null) => set({ user }),
  getTransactionsByType: (type) => {
    const { user } = get();
    if (!user || !user?.transitions) {
      return [];
    }
    return user.transitions.filter((transaction: TransitionType) => transaction.type === type);
  },
  getCategoriesByType: (type) => {
    const { user } = get();
    if (!user || !user?.categories) {
      return [];
    }
    return user.categories.filter((category: CategoryType) => category.type === type);
  },
}));
