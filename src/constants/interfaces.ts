export enum ACTIONS {
  ADD,
  SPEND,
}

export interface LogEntry {
  action: ACTIONS;
  amount: number;
  balance: number;
  date: number;
  memo?: string;
}
