import {useEffect, useState} from 'react';
import {ACTIONS, LogEntry} from 'constants/interfaces';
import {getNewBalance, pickFile} from 'utils/utils';
import {
  clearLogEntries,
  createTable,
  getDBConnection,
  saveLogEntries,
  saveLogEntry,
} from 'src/services/database';

export default function useLog() {
  const [balance, setBalance] = useState(0);
  const [history, setHistory] = useState<LogEntry[]>([]);

  const mutateBalance = async (action: ACTIONS, amount = 0, memo = '') => {
    const newBalance = getNewBalance(
      action,
      history.at(-1)?.balance || 0,
      amount,
    );
    const date = new Date().getTime();

    const entry = {
      action,
      amount,
      balance: newBalance,
      date,
      memo: memo.trim(),
    };

    try {
      const db = await getDBConnection();
      await saveLogEntry(db, entry);

      const newHistory = [...history, entry];

      setBalance(newBalance);
      setHistory(newHistory);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAll = async () => {
    try {
      const db = await getDBConnection();
      await clearLogEntries(db);
      setBalance(0);
      setHistory([]);
    } catch (error) {
      console.error(error);
    }
  };

  const importRecords = async () => {
    const parsed = await pickFile();
    if (parsed) {
      const db = await getDBConnection();
      await clearLogEntries(db);
      await saveLogEntries(db, parsed);
      setCurrentBalance();
    }
    return parsed?.length;
  };

  const setCurrentBalance = () => setBalance(history.at(-1)?.balance || 0);

  useEffect(() => {
    (async () => {
      const db = await getDBConnection();
      await createTable(db);
      setCurrentBalance();
    })();
  }, []);

  return {
    balance,
    history,
    mutateBalance,
    importRecords,
    deleteAll,
  };
}
