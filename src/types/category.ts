import { TransitionEnum } from './transition';
import { UserType } from './user';

/* eslint-disable @typescript-eslint/no-explicit-any */
export type CategoryType = {
  id: string;
  name: string;
  chartColor: string;
  type: TransitionEnum;
  authUser?: UserType;
  goals?: any;
};
