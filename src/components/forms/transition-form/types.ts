import { CategoryType } from '@/types/category';
import { TransitionEnum } from '@/types/transition';

/* eslint-disable @typescript-eslint/no-explicit-any */
export type TransitionFormProps = {
  createTransition: TransitionFormType;
};

export type CategoryFormProps = {
  createCategory: { id: string };
};

export type TransitionFormType = {
  id: string;
  amount: number;
  date: Date;
  type: TransitionEnum;
  category: CategoryType;
  note?: string;
  goal?: any;
};
