import { CategoryType } from './category';

/* eslint-disable @typescript-eslint/no-explicit-any */
export type UserType = {
  id: string;
  email: string;
  password: string;
  name: string;
  avatar: any;
  transitions: any;
  categories: CategoryType[];
};
