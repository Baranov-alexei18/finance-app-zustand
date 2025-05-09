import { CategoryType } from './category';
import { TransitionType } from './transition';

/* eslint-disable @typescript-eslint/no-explicit-any */
export type UserType = {
  id: string;
  email: string;
  password: string;
  name: string;
  avatar: any;
  transitions: TransitionType[];
  categories: CategoryType[];
};
