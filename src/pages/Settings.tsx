import {useContext, useState} from 'react';
import {ScrollView, useColorScheme, View, Alert} from 'react-native';
import {Button, Divider, Snackbar, Switch, Text} from 'react-native-paper';
import {LogContext} from 'hooks/LogContext';
import {Colors} from 'constants/colours';
import useBackup from 'hooks/useBackup';

export default function SettingsScreen() {
  const {deleteAll, importRecords} = useContext(LogContext);
  const {backupLocation, backupOn, toggleBackupOn} = useBackup();
  const colorScheme = useColorScheme();
  const [numRecords, setNumRecords] = useState(0);

  const getFormattedLocation = () => {
    return decodeURIComponent(backupLocation);
  };

  const deleteAllData = () => {
    Alert.alert(
      'Are you sure?',
      'This will permanently delete all records and turn off backups. Backup files will not be deleted.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'OK', onPress: deleteAll},
      ],
    );
  };

  const importNewData = () => {
    Alert.alert(
      'Are you sure?',
      'This will replace all records. If backups are currently on they will not be turned off, however the backup file will be overwritten with the new imported data.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            const result = await importRecords();
            if (result) {
              setNumRecords(result);
            }
          },
        },
      ],
    );
  };

  const dismissSnackbar = () => setNumRecords(0);

  return (
    <ScrollView
      style={{
        margin: 30,
        marginTop: 30,
      }}
      contentContainerStyle={{
        justifyContent: 'flex-start',
        flexDirection: 'column',
        flex: 1,
        gap: 15,
      }}
      keyboardShouldPersistTaps="handled">
      <Snackbar
        visible={!!numRecords}
        onDismiss={dismissSnackbar}
        duration={2000}>
        <Text
          style={{
            color: Colors[colorScheme ?? 'light'].text,
          }}>
          Successfully added {numRecords} entries.
        </Text>
      </Snackbar>
      <View>
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            marginBottom: 5,
          }}>
          <Text
            style={{
              color: Colors[colorScheme ?? 'light'].text,
            }}>
            Backup to File
          </Text>
          <Switch
            value={backupOn}
            onValueChange={value => toggleBackupOn(value)}
          />
        </View>
        {backupOn ? (
          <View>
            <Text
              style={{
                color: Colors[colorScheme ?? 'light'].text,
                marginBottom: 5,
              }}
              variant="bodySmall">
              Backing up to:
            </Text>
            <Text
              style={{
                color: Colors[colorScheme ?? 'light'].text,
              }}
              variant="bodySmall">
              {getFormattedLocation()}
            </Text>
          </View>
        ) : null}
      </View>
      <Divider horizontalInset />
      <Button mode="contained" onPress={importNewData}>
        Import from Backup
      </Button>
      <Divider horizontalInset />
      <Button mode="contained" buttonColor="red" onPress={deleteAllData}>
        Delete All Data
      </Button>
    </ScrollView>
  );
}
