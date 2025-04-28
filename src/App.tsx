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
  const {colors} = isDarkMode ? DarkTheme : DefaultTheme;

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
                tabBarIcon: ({focused}) => (
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    color={focused ? colors.primary : colors.text}
                    size={25}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="History"
              component={History}
              options={{
                tabBarLabel: 'History',
                tabBarIcon: ({focused}) => (
                  <FontAwesomeIcon
                    icon={faLandmark}
                    color={focused ? colors.primary : colors.text}
                    size={25}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Settings"
              component={Settings}
              options={{
                tabBarLabel: 'Settings',
                tabBarIcon: ({focused}) => (
                  <FontAwesomeIcon
                    icon={faGears}
                    color={focused ? colors.primary : colors.text}
                    size={25}
                  />
                ),
              }}
            />
          </Tab.Navigator>
        </ThemeProvider>
      </LogProvider>
    </NavigationContainer>
  );
}

export default App;
