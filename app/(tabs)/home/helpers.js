// helpers.js
import { Animated } from 'react-native';

export const createBackgroundColorInterpolation = (scrollY) =>
  scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)'],
    extrapolate: 'clamp',
  });

export const fadeIn = (fadeAnim) => {
  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 100,
    useNativeDriver: true,
  }).start();
};

export const fadeOut = (fadeAnim) => {
  Animated.timing(fadeAnim, {
    toValue: 0,
    duration: 30,
    useNativeDriver: true,
  }).start();
};
