// import Ionicons from '@expo/vector-icons/build/Ionicons';
import {useContext} from 'react';
import {FlatList, ListRenderItemInfo, useColorScheme, View} from 'react-native';
import {Divider, Text} from 'react-native-paper';
import {formatCurrency, formatDate} from 'utils/utils';
import {ACTIONS, LogEntry} from 'constants/interfaces';
import {Colors} from 'constants/colours';
import {LogContext} from 'hooks/LogContext';
import React from 'react';

interface HistoryEntryProps {
  entry: ListRenderItemInfo<LogEntry>;
}

const HistoryEntry = ({entry}: HistoryEntryProps) => {
  const colorScheme = useColorScheme();

  const {item} = entry;

  const getIcon = (action: ACTIONS) => {
    let icon = '' as any;
    let colour = '';

    switch (action) {
      case ACTIONS.ADD:
        icon = 'add-circle';
        colour = 'green';
        break;
      case ACTIONS.SPEND:
        icon = 'remove-circle';
        colour = 'red';
        break;
    }

    return <>Icon</>;
    // return <Ionicons name={icon} color={colour} size={28} />;
  };

  return (
    <View
      style={{
        justifyContent: 'center',
        flexDirection: 'column',
        flex: 1,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          flex: 1,
          gap: 5,
        }}>
        {getIcon(item.action)}
        <Text
          style={{color: Colors[colorScheme ?? 'light'].text}}
          variant="headlineSmall">
          {formatCurrency(item.amount)}
        </Text>
      </View>
      <Text
        style={{color: Colors[colorScheme ?? 'light'].text, marginTop: 6}}
        variant="bodySmall">
        {formatDate(item.date)}
      </Text>
      <Text
        style={{
          color: Colors[colorScheme ?? 'light'].text,
          marginTop: 6,
        }}
        variant="bodySmall">
        Balance: {formatCurrency(item.balance)}
      </Text>
      <Text
        style={{
          color: Colors[colorScheme ?? 'light'].text,
          marginTop: 6,
          fontStyle: !item.memo ? 'italic' : 'normal',
        }}
        variant="bodyLarge">
        {item.memo ? item.memo : 'No memo'}
      </Text>
      <Divider style={{marginTop: 10, marginBottom: 6}} />
    </View>
  );
};

export default function HistoryScreen() {
  const {history} = useContext(LogContext);
  const colorScheme = useColorScheme();

  return (
    <View
      style={{
        margin: 30,
      }}>
      <FlatList
        style={{
          gap: 10,
          marginTop: 10,
        }}
        ListEmptyComponent={
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 30,
            }}>
            <Text
              style={{
                color: Colors[colorScheme ?? 'light'].text,
                fontStyle: 'italic',
              }}>
              No history yet!
            </Text>
          </View>
        }
        data={[...history].reverse()}
        renderItem={item => <HistoryEntry entry={item} />}
      />
    </View>
  );
}
