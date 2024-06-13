import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';

const PlatformTouchable = ({ onPress, children, style, disabled, hasShadow, icon }) => {
  const ButtonComponent = Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;

  const buttonStyle = [commonStyles.button, style, hasShadow ? commonStyles.shadow : null];

  return (
    <ButtonComponent
      onPress={onPress}
      disabled={disabled}
      background={TouchableNativeFeedback.Ripple(5)}
    >
      <View style={buttonStyle}>
        {icon && <View style={commonStyles.icon}>{icon}</View>}
        <View style={commonStyles.textContainer}>
          <Text style={[commonStyles.text, icon && { paddingRight: 32 }]}>{children}</Text>
        </View>
      </View>
    </ButtonComponent>
  );
};

export default PlatformTouchable;

const commonStyles = StyleSheet.create({
  button: {
    borderRadius: 12,
    width: '100%',
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
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
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 27,
    textAlign: 'center',
  },
  icon: {
    marginLeft: 12,
    width: 24,
    height: 24,
  },
});
