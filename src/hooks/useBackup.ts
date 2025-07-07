import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';
import { useContext, useEffect, useState } from 'react';

import { BACKUP_KEY, FILE_NAME } from 'constants/const';
import { LogContext } from './LogContext';
import { pickDirectory } from '@react-native-documents/picker';

export default function useBackup() {
  const {history} = useContext(LogContext);
  const [backupOn, setBackupOn] = useState(false);
  const [backupLocation, setBackupLocation] = useState('');

  const convertContentUriToFilePath = async (contentUri: string) => {
    if (contentUri.startsWith('content://')) {
      try {
        const path = decodeURIComponent(contentUri).split('primary:')[1];
        return `${RNFS.ExternalStorageDirectoryPath}/${path}/${FILE_NAME}.json`;
      } catch (error) {
        console.error("Error converting content URI:", error);
        return null;
      }
    }
    return null;
  };

  const testFileExists = async () => {
    const fileName = (await AsyncStorage.getItem(BACKUP_KEY)) || '';
    if (!fileName) {
      return null;
    }

    try {
      const exists = await RNFS.exists(fileName);
      return exists ? fileName : null;
    } catch (e) {
      console.error('Error checking file existence:', e);
      return null;
    }
  };

  const pickDir = async () => {
    try {
      const {uri} = await pickDirectory({
        requestLongTermAccess: true,  
      });

      if (!uri) {
        return null;
      }

      return await convertContentUriToFilePath(uri);
    } catch (err) {
      console.error('Error picking directory:', err);
      return null;
    }
  };

  const writeHistory = async (path: string) => {
    try {
      await RNFS.writeFile(path, JSON.stringify(history), 'utf8');
    } catch (err) {
      console.error('Error writing backup file:', err);
    }
  };

  const getDirectoryAndWrite = async () => {
    let fileUri = await testFileExists();
    if (!fileUri) {
      fileUri = await pickDir();
    }
    if (fileUri) {
      await writeHistory(fileUri);
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
