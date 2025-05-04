import {TabBar} from 'components/tabs/TabBar';
import Log from 'pages/Log';
import History from 'pages/History';
import Settings from 'pages/Settings';
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons/faPenToSquare';
import {faLandmark} from '@fortawesome/free-solid-svg-icons/faLandmark';
import {faGears} from '@fortawesome/free-solid-svg-icons/faGears';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TabIcon} from './TabIcon';

const Tab = createBottomTabNavigator();

export function Tabs() {
  return (
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
            <TabIcon icon={faPenToSquare} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarLabel: 'History',
          tabBarIcon: ({focused}) => (
            <TabIcon icon={faLandmark} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({focused}) => (
            <TabIcon icon={faGears} focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
