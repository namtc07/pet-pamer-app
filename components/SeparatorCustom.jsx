import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    flex: 1,
  },
  textStart: {
    paddingRight: 12,
  },
  textMiddle: {
    paddingHorizontal: 12,
  },
  textEnd: {
    paddingLeft: 12,
  },
});

const getPositionStyle = (position) => {
  switch (position) {
    case 'start':
      return styles.textStart;
    case 'middle':
      return styles.textMiddle;
    case 'end':
      return styles.textEnd;
    default:
      return {};
  }
};

function SeparatorCustom({
  text,
  position = 'none',
  width = 1,
  color = '#979797',
  textColor = '#737373',
  propsText,
  propsSeparator,
}) {
  const separatorStyle = {
    backgroundColor: color,
    height: width,
    ...propsSeparator,
  };

  const textStyle = {
    color: textColor,
    ...propsText,
  };

  const renderText = position !== 'none' && text && (
    <Text style={[textStyle, getPositionStyle(position)]}>{text}</Text>
  );

  return (
    <View style={styles.container}>
      {position === 'start' && renderText}
      <View style={styles.wrapper}>
        <View style={[styles.separator, separatorStyle]} />
        {position === 'middle' && renderText}
        <View style={[styles.separator, separatorStyle]} />
      </View>
      {position === 'end' && renderText}
    </View>
  );
}

export default SeparatorCustom;
