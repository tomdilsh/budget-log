import {useContext, useState} from 'react';
import {useColorScheme, ScrollView, View} from 'react-native';
import {Button, TextInput, Text, Divider} from 'react-native-paper';
import {matchValidCurrency} from 'utils/utils';
import {ACTIONS} from 'constants/interfaces';
import {Colors} from 'constants/colours';
import {LogContext} from 'hooks/LogContext';

export default function LogScreen() {
  const {mutateBalance, balance} = useContext(LogContext);
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');
  const [error, setError] = useState(false);
  const colorScheme = useColorScheme();

  const mutate = async (action: ACTIONS) => {
    const amntNum = +amount;
    if (amntNum) {
      mutateBalance(action, amntNum, memo);
      setAmount('');
      setMemo('');
    } else {
      setError(true);
    }
  };

  const onAmntChange = (text: string) => {
    if (error) {
      setError(false);
    }

    const match = matchValidCurrency(text);
    if (!text || match?.length) {
      setAmount(match?.[0] || '');
    }
  };

  const onMemoChange = (text: string) => setMemo(text);

  const balanceLongPress = () => setAmount(balance.replace('$', ''));

  return (
    <ScrollView
      style={{
        margin: 30,
      }}
      contentContainerStyle={{
        justifyContent: 'center',
        flexDirection: 'column',
        flex: 1,
        gap: 10,
      }}
      keyboardShouldPersistTaps="handled">
      <Text
        style={{
          color: Colors[colorScheme ?? 'light'].text,
          alignSelf: 'center',
          marginBottom: 10,
        }}
        onLongPress={balanceLongPress}
        variant="displayLarge">
        {balance}
      </Text>
      <TextInput
        style={{
          backgroundColor: Colors[colorScheme ?? 'light'].background,
        }}
        textColor={Colors[colorScheme ?? 'light'].text}
        value={amount}
        onChangeText={onAmntChange}
        keyboardType="numeric"
        mode="outlined"
        label="Amount"
        error={error}
      />
      <TextInput
        style={{
          backgroundColor: Colors[colorScheme ?? 'light'].background,
        }}
        textColor={Colors[colorScheme ?? 'light'].text}
        value={memo}
        onChangeText={onMemoChange}
        mode="outlined"
        label="Memo"
      />
      <Divider
        style={{
          marginVertical: 10,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          gap: 15,
        }}>
        <Button
          style={{flex: 1}}
          mode="contained"
          onPress={async () => await mutate(ACTIONS.SPEND)}>
          Spend $
        </Button>
        <Button
          style={{flex: 1}}
          mode="contained"
          onPress={async () => await mutate(ACTIONS.ADD)}>
          Add $
        </Button>
      </View>
    </ScrollView>
  );
}
