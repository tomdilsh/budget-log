import React from 'react';
import useLog from './useLog';

const initState = {
  balance: 0,
  history: [] as any,
  mutateBalance: (() => {}) as any,
  deleteAll: (() => {}) as any,
  importRecords: (() => {}) as any,
};

export const LogContext = React.createContext(initState);

export default function LogProvider({children}: any) {
  const log: any = useLog();
  return <LogContext.Provider value={log}>{children}</LogContext.Provider>;
}
