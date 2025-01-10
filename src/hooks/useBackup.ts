import AsyncStorage from '@react-native-async-storage/async-storage';
// import {getInfoAsync, StorageAccessFramework} from 'expo-file-system';
import {useContext, useEffect, useState} from 'react';

import {BACKUP_KEY, FILE_NAME} from 'constants/const';
import {LogContext} from './LogContext';

export default function useBackup() {
  const {history} = useContext(LogContext);
  const [backupOn, setBackupOn] = useState(false);
  const [backupLocation, setBackupLocation] = useState('');

  const testFileExists = async () => {
    const fileName = (await AsyncStorage.getItem(BACKUP_KEY)) || '';
    if (!fileName) {
      return null;
    }

    let info = null;
    try {
      // info = await getInfoAsync(fileName);
    } catch (e) {
      console.error(e);
    }
    return '';
    // return info?.exists ? fileName : null;
  };

  const pickDirAndCreateFile = async () => {
    let result = null;
    try {
      // @ts-ignore
      // const {directoryUri, granted} =
      // await StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (granted) {
        // const fileUri = await StorageAccessFramework.createFileAsync(
        //   directoryUri,
        //   FILE_NAME,
        //   'application/json',
        // );
        // result = fileUri;
        result = '';
      }
    } catch (err) {
      console.error(err);
    }
    return result;
  };

  const writeHistory = async (fileUri: string) => {
    try {
      // await StorageAccessFramework.writeAsStringAsync(
      //   fileUri,
      //   JSON.stringify(history),
      // );
    } catch (err) {
      console.error(err);
    }
  };

  const getDirectoryAndWrite = async () => {
    let fileUri = await testFileExists();
    if (!fileUri) {
      fileUri = await pickDirAndCreateFile();
    }
    if (fileUri) {
      writeHistory(fileUri);
    }
    return fileUri;
  };

  const turnOn = async (fileUri: string) => {
    await AsyncStorage.setItem(BACKUP_KEY, fileUri);
    setBackupOn(true);
    setBackupLocation(fileUri);
  };

  const turnOff = async () => {
    await AsyncStorage.removeItem(BACKUP_KEY);
    setBackupOn(false);
    setBackupLocation('');
  };

  const toggleBackupOn = async (on: boolean) => {
    if (on) {
      const fileUri = await getDirectoryAndWrite();
      if (fileUri) {
        await turnOn(fileUri);
      } else {
        turnOff();
      }
    } else {
      turnOff();
    }
  };

  useEffect(() => {
    (async () => {
      const fileUri = await testFileExists();
      if (fileUri) {
        turnOn(fileUri);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!history.length) {
        turnOff();
      } else if (backupOn) {
        await getDirectoryAndWrite();
      }
    })();
  }, [history]);

  return {
    backupOn,
    backupLocation,
    toggleBackupOn,
  };
}
