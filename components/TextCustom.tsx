import React from 'react';
import {
  StyleSheet,
  Text as TextNative,
  TextProps,
  TextStyle,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    fontFamily: 'Exo-Regular',
  },
  black: {
    fontFamily: 'Exo-Black',
  },
  bold: {
    fontFamily: 'Exo-Bold',
  },
  extraBold: {
    fontFamily: 'Exo-ExtraBold',
  },
  extraLight: {
    fontFamily: 'Exo-ExtraLight',
  },
  light: {
    fontFamily: 'Exo-Light',
  },
  medium: {
    fontFamily: 'Exo-Medium',
  },
  semiBold: {
    fontFamily: 'Exo-SemiBold',
  },
  thin: {
    fontFamily: 'Exo-Thin',
  },
});

interface CustomTextProps extends TextProps {
  lines?: number;
  fontWeight?:
    | 'black'
    | 'bold'
    | 'extraBold'
    | 'extraLight'
    | 'light'
    | 'medium'
    | 'semiBold'
    | 'thin'
    | 'regular';
  style?: TextStyle | TextStyle[];
}

export const Text: React.FC<CustomTextProps> = ({
  style,
  children,
  lines,
  fontWeight = 'regular',
}) => {
  let fontStyle = styles.container;

  switch (fontWeight) {
    case 'black':
      fontStyle = styles.black;
      break;
    case 'bold':
      fontStyle = styles.bold;
      break;
    case 'extraBold':
      fontStyle = styles.extraBold;
      break;
    case 'extraLight':
      fontStyle = styles.extraLight;
      break;
    case 'light':
      fontStyle = styles.light;
      break;
    case 'medium':
      fontStyle = styles.medium;
      break;
    case 'semiBold':
      fontStyle = styles.semiBold;
      break;
    case 'thin':
      fontStyle = styles.thin;
      break;
    default:
      fontStyle = styles.container;
      break;
  }

  return (
    <TextNative
      style={[fontStyle, style]}
      numberOfLines={lines}
      ellipsizeMode={lines ? 'tail' : undefined}
    >
      {children}
    </TextNative>
  );
};
