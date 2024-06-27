import React from 'react';
import { StyleSheet, Text as TextNative } from 'react-native';

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

function Text({ style, text, lines, fontWeight }) {
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
      {...(lines && {
        numberOfLines: lines,
        ellipsizeMode: 'tail',
      })}
    >
      {text}
    </TextNative>
  );
}

export default Text;
