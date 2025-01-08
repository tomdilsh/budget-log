import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  ThemeProvider,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import React from 'react';
import {useColorScheme} from 'react-native';
import Log from './pages/Log';
import History from './pages/History';
import Settings from './pages/Settings';
import {TabBar} from './components/TabBar';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPenNib} from '@fortawesome/free-solid-svg-icons/faPenNib';

const Tab = createBottomTabNavigator();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer>
      <ThemeProvider value={isDarkMode ? DarkTheme : DefaultTheme}>
        <Tab.Navigator
          tabBar={props => <TabBar {...props} />}
          screenOptions={{
            headerShown: false,
          }}>
          <Tab.Screen
            name="Log"
            component={Log}
            options={{
              tabBarLabel: 'Log',
              tabBarIcon: () => <FontAwesomeIcon icon={faPenNib} />,
            }}
          />
          <Tab.Screen name="History" component={History} />
          <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
      </ThemeProvider>
    </NavigationContainer>
  );
}

export default App;
