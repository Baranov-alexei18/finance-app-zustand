/* eslint-disable @typescript-eslint/no-explicit-any */
export enum TransitionEnum {
  EXPENSE = 'EXPENSE',
  INCOME = 'INCOME',
}

export type TransitionType = {
  id: string;
  amount: number;
  date: Date;
  note: string;
  type: TransitionEnum.EXPENSE | TransitionEnum.INCOME;
  goal: any;
  authUser: string;
  category: any;
};
