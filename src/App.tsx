import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  ThemeProvider,
} from '@react-navigation/native';

import React from 'react';
import {useColorScheme} from 'react-native';
import LogProvider from 'hooks/LogContext';
import {Tabs} from 'components/tabs/Tabs';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer>
      <LogProvider>
        <ThemeProvider value={isDarkMode ? DarkTheme : DefaultTheme}>
          <Tabs />
        </ThemeProvider>
      </LogProvider>
    </NavigationContainer>
  );
}

export default App;
