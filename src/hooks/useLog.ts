import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BACKUP_KEY} from 'constants/const';
import {ACTIONS, LogEntry} from 'constants/interfaces';
import {formatCurrency, getNewBalance, pickFile} from 'utils/utils';

export default function useLog() {
  const [balance, setBalance] = useState('');
  const [history, setHistory] = useState<LogEntry[]>([]);

  const calculateBalance = async () => {
    const keys = (await AsyncStorage.getAllKeys()).filter(
      k => ![BACKUP_KEY].includes(k),
    );
    const entries = await AsyncStorage.multiGet(keys);
    const historyList = [];

    let sum = 0;
    for (let i = 0; i < entries.length; i++) {
      const [_, value] = entries[i];
      const entry: LogEntry = JSON.parse(value || '');
      historyList.push(entry);
      sum = getNewBalance(entry.action, sum, entry.amount);
    }
    setBalance(formatCurrency(sum));
    setHistory(historyList);
  };

  const mutateBalance = async (action: ACTIONS, amount = 0, memo = '') => {
    const newBalance = getNewBalance(
      action,
      history.at(-1)?.balance || 0,
      amount,
    );
    const date = new Date().getTime().toString();

    const entry = {
      action,
      amount,
      balance: newBalance,
      date,
      memo: memo.trim(),
    };

    await AsyncStorage.setItem(date, JSON.stringify(entry));

    const newHistory = [...history, entry];

    setBalance(formatCurrency(newBalance));
    setHistory(newHistory);
  };

  const deleteAll = async () => {
    setBalance('$0.00');
    setHistory([]);
    await AsyncStorage.clear();
  };

  const importRecords = async () => {
    const parsed = await pickFile();
    if (parsed) {
      const backup = await AsyncStorage.getItem(BACKUP_KEY);
      await AsyncStorage.clear();
      if (backup) {
        AsyncStorage.setItem(BACKUP_KEY, backup);
      }
      const stringified = parsed.map(entry => [
        entry.date,
        JSON.stringify(entry),
      ]) as any;
      await AsyncStorage.multiSet(stringified);
      await calculateBalance();
    }
    return parsed?.length;
  };

  useEffect(() => {
    (async () => {
      await calculateBalance();
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
