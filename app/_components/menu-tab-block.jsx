import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Platform,
  TouchableNativeFeedback,
} from 'react-native';
import SvgIcon from '@/assets/svgs';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'relative',
    ...Platform.select({
      ios: {},
      android: {
        gap: 12,
      },
    }),
  },
  tabContainer: {
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 40,
    alignItems: 'center',
  },
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 40,
    backgroundColor: 'white',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  iconContainer: {
    width: 24,
    height: 24,
  },
  title: {
    color: '#FF8D4D',
    fontFamily: 'Exo-Bold',
    marginLeft: 8, // Add margin between icon and text
  },
});

function ButtonBlockCustom({ mode = 'single', icon, title, source }) {
  const ButtonComponent =
    Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;

  const renderUI = () => {
    switch (mode) {
      case 'multi':
        return source.map((tab, index) => (
          <ButtonComponent
            key={index}
            style={styles.tabContainer}
            background={TouchableNativeFeedback.Ripple(5)}
          >
            <View style={styles.tabContent}>
              <View style={styles.iconContainer}>{tab?.icon}</View>
              <Text style={styles.title}>{tab?.title}</Text>
            </View>
          </ButtonComponent>
        ));
      case 'single':
        return (
          <ButtonComponent
            style={styles.tabContainer}
            background={TouchableNativeFeedback.Ripple(5)}
          >
            <View style={styles.tabContent}>
              <View style={styles.iconContainer}>{icon}</View>
              <Text style={styles.title}>{title}</Text>
            </View>
          </ButtonComponent>
        );
      default:
    }

    return null;
  };

  return <View style={styles.container}>{renderUI()}</View>;
}

export default ButtonBlockCustom;
