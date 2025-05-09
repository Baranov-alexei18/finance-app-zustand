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
  addNewTransaction: (transaction: TransitionType) => void;
  updateTransactionById: (id: string, updatedFields: Partial<TransitionType>) => void;
  deleteTransactionById: (id: string) => void;
  addNewCategory: (category: CategoryType) => void;
  updateCategoryById: (id: string, updatedFields: Partial<CategoryType>) => void;
  deleteCategoryById: (id: string) => void;
};

export const useUserStore = create<Props>((set, get) => ({
  user: null,
  loading: false,
  error: null,
  setUser: (user: UserType | null) => set({ user }),

  // user transitions
  getTransactionsByType: (type) => {
    const { user } = get();
    if (!user || !user?.transitions) {
      return [];
    }
    return user.transitions.filter((transaction: TransitionType) => transaction.type === type);
  },

  addNewTransaction: (transaction: TransitionType) => {
    const { user } = get();

    if (!user) {
      return;
    }

    set({ user: { ...user, transitions: [...user.transitions, transaction] } });
  },

  updateTransactionById: (id: string, updatedFields: Partial<TransitionType>) => {
    const { user } = get();

    if (!user) {
      return;
    }

    const updatedCategories = user.transitions.map((transition) =>
      transition.id === id ? { ...transition, ...updatedFields } : transition
    );

    set({ user: { ...user, transitions: updatedCategories } });
  },

  deleteTransactionById: (id: string) => {
    const { user } = get();

    if (!user) {
      return;
    }

    const updatedCategories = user.transitions.filter((transition) => transition.id !== id);

    set({ user: { ...user, transitions: updatedCategories } });
  },

  // user categories
  getCategoriesByType: (type) => {
    const { user } = get();
    if (!user || !user?.categories) {
      return [];
    }
    return user.categories.filter((category: CategoryType) => category.type === type);
  },
  addNewCategory: (category: CategoryType) => {
    const { user } = get();

    if (!user) {
      return;
    }

    set({ user: { ...user, categories: [...user.categories, category] } });
  },

  updateCategoryById: (id: string, updatedFields: Partial<CategoryType>) => {
    const { user } = get();

    if (!user) {
      return;
    }

    const updatedCategories = user.categories.map((category) =>
      category.id === id ? { ...category, ...updatedFields } : category
    );

    set({ user: { ...user, categories: updatedCategories } });
  },

  deleteCategoryById: (id: string) => {
    const { user } = get();

    if (!user) {
      return;
    }

    const updatedCategories = user.categories.filter((category) => category.id !== id);

    set({ user: { ...user, categories: updatedCategories } });
  },
}));
