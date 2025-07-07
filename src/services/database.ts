import {LogEntry} from 'constants/interfaces';
import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({name: 'budget_log.db', location: 'default'});
};

export const createTable = async (db: SQLiteDatabase) => {
  const query = `
    CREATE TABLE IF NOT EXISTS log_entries(
      id INTEGER PRIMARY KEY NOT NULL,  
      action INTEGER NOT NULL,
      amount REAL NOT NULL,
      balance REAL NOT NULL,
      date INTEGER NOT NULL,
      memo TEXT
    );`;

  await db.executeSql(query);
};

export const getLogEntries = async (
  db: SQLiteDatabase,
): Promise<LogEntry[]> => {
  try {
    const logEntries: LogEntry[] = [];
    const results = await db.executeSql('SELECT * FROM log_entries LIMIT 100');
    results.forEach(result => {
      for (let i = 0; i < result.rows.length; i++) {
        logEntries.push(result.rows.item(i));
      }
    });
    return logEntries;
  } catch (error) {
    throw Error('Failed to get log entries.');
  }
};

export const saveLogEntries = async (
  db: SQLiteDatabase,
  logEntries: LogEntry[],
) => {
  const insertQuery = `
    INSERT OR REPLACE INTO log_entries(
      action, 
      amount,
      balance,
      date,
      memo
    ) VALUES
     ${logEntries
      .map(entry => `(${Object.values(entry)
        .map(e => typeof e === 'string' ? `"${e}"` : e)
        .join(',')})`)
      .join(',')}`;

  return db.executeSql(insertQuery);
};

export const saveLogEntry = async (db: SQLiteDatabase, logEntry: LogEntry) =>
  saveLogEntries(db, [logEntry]);

export const clearLogEntries = async (db: SQLiteDatabase) => {
  return db.executeSql('DELETE FROM log_entries');
};
