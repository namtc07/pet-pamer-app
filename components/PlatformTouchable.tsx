import React from 'react';
import {
  Platform,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Text } from './TextCustom';

const commonStyles = StyleSheet.create({
  button: {
    borderRadius: 12,
    width: '100%',
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  } as ViewStyle,
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 5,
      },
    }),
  } as ViewStyle,
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  } as ViewStyle,
  text: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 27,
    textAlign: 'center',
  } as TextStyle,
  icon: {
    marginLeft: 12,
    width: 24,
    height: 24,
  } as ViewStyle,
});

interface PlatformTouchableProps {
  onPress: () => void;
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  disabled?: boolean;
  hasShadow?: boolean;
  icon?: React.ReactNode;
}

export const PlatformTouchable: React.FC<PlatformTouchableProps> = ({
  onPress,
  children,
  style,
  disabled,
  hasShadow,
  icon,
}) => {
  const buttonStyle = [
    commonStyles.button,
    style,
    hasShadow ? commonStyles.shadow : null,
  ];

  const paddingStyle: TextStyle = icon ? { paddingRight: 32 } : {};

  return (
    <View style={buttonStyle}>
      {Platform.OS === 'ios' ? (
        <TouchableOpacity onPress={onPress} disabled={disabled}>
          <View style={buttonStyle}>
            {icon && <View style={commonStyles.icon}>{icon}</View>}
            <View style={commonStyles.textContainer}>
              <Text style={[commonStyles.text, paddingStyle]}>{children}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableNativeFeedback
          onPress={onPress}
          disabled={disabled}
          background={TouchableNativeFeedback.Ripple('#000', false)}
        >
          <View style={buttonStyle}>
            {icon && <View style={commonStyles.icon}>{icon}</View>}
            <View style={commonStyles.textContainer}>
              <Text style={[commonStyles.text, paddingStyle]}>{children}</Text>
            </View>
          </View>
        </TouchableNativeFeedback>
      )}
    </View>
  );
};
