import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useTheme} from '@react-navigation/native';

const ICON_SIZE = 25;

export function TabIcon({icon, focused}) {
  const {colors} = useTheme();

  return (
    <FontAwesomeIcon
      icon={icon}
      color={focused ? colors.primary : colors.text}
      size={ICON_SIZE}
    />
  );
}
