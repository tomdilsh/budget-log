// import {StorageAccessFramework} from 'expo-file-system';
// import * as DocumentPicker from 'expo-document-picker';
import {ACTIONS, LogEntry} from 'constants/interfaces';

export function formatCurrency(value = 0) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return formatter.format(value);
}

export function matchValidCurrency(value: string) {
  return value.match(/^\d+(?:\.{0,1}\d{0,2})/);
}

export const getNewBalance = (action: ACTIONS, balance: number, amount = 0) => {
  switch (action) {
    case ACTIONS.ADD:
      return balance + amount;
    case ACTIONS.SPEND:
      return balance - amount;
    default:
      return balance;
  }
};

export const formatDate = (date: number) => {
  const jsDate = new Date(date);
  return `${jsDate.toLocaleDateString()} ${jsDate.toLocaleTimeString()}`;
};

export const pickFile = async () => {
  try {
    // const result = await DocumentPicker.getDocumentAsync({
    //   copyToCacheDirectory: true,
    // });
    const result = '';
    if (result?.assets?.[0].uri) {
      // const content = await StorageAccessFramework.readAsStringAsync(
      //   result.assets[0].uri,
      // );
      const content = '';
      const parsed = parseAndValidateFile(content);
      return parsed;
    }
  } catch (e) {
    console.log(e);
  }
  return null;
};

const parseAndValidateFile = (content: string) => {
  let result = null;
  try {
    const parsed: LogEntry[] = JSON.parse(content);
    const valid = parsed.every(entry => {
      return (
        entry.amount &&
        entry.balance != null &&
        new Date(entry.date).valueOf() &&
        entry.action in ACTIONS
      );
    });
    if (parsed.length && valid) {
      result = parsed;
    }
  } catch (e) {
    console.error(e);
  }
  return result;
};
