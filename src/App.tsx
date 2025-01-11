import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  ThemeProvider,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import React from 'react';
import {useColorScheme} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons/faPenToSquare';
import {faLandmark} from '@fortawesome/free-solid-svg-icons/faLandmark';
import {faGears} from '@fortawesome/free-solid-svg-icons/faGears';
import LogProvider from 'hooks/LogContext';
import {TabBar} from 'components/TabBar';
import Log from 'pages/Log';
import History from 'pages/History';
import Settings from 'pages/Settings';

const Tab = createBottomTabNavigator();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer>
      <LogProvider>
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
                tabBarIcon: () => (
                  <FontAwesomeIcon icon={faPenToSquare} size={25} />
                ),
              }}
            />
            <Tab.Screen
              name="History"
              component={History}
              options={{
                tabBarLabel: 'History',
                tabBarIcon: () => (
                  <FontAwesomeIcon icon={faLandmark} size={25} />
                ),
              }}
            />
            <Tab.Screen
              name="Settings"
              component={Settings}
              options={{
                tabBarLabel: 'Settings',
                tabBarIcon: () => <FontAwesomeIcon icon={faGears} size={25} />,
              }}
            />
          </Tab.Navigator>
        </ThemeProvider>
      </LogProvider>
    </NavigationContainer>
  );
}

export default App;
