import {PlatformPressable, Text} from '@react-navigation/elements';
import {useLinkBuilder, useTheme} from '@react-navigation/native';
import {Dimensions, TouchableOpacity, View} from 'react-native';

const screenWidth = Dimensions.get('window').width;

export function TabBar({state, descriptors, navigation}) {
  const {colors} = useTheme();
  const {buildHref} = useLinkBuilder();

  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            key={index}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              paddingTop: 6,
              paddingBottom: 2,
            }}>
            {options?.tabBarIcon && <options.tabBarIcon focused={isFocused} />}
            <Text
              style={{
                color: isFocused ? colors.primary : colors.text,
                fontSize: 10,
                marginTop: 4,
              }}>
              {options.label || label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
