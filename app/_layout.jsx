// import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { FontProvider } from '../context/FontContext';

import 'react-native-url-polyfill/auto';

import '../config/appStyles';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    'Exo-Black': require('../assets/fonts/Exo-Black.ttf'),
    'Exo-Bold': require('../assets/fonts/Exo-Bold.ttf'),
    'Exo-ExtraBold': require('../assets/fonts/Exo-ExtraBold.ttf'),
    'Exo-ExtraLight': require('../assets/fonts/Exo-ExtraLight.ttf'),
    'Exo-Light': require('../assets/fonts/Exo-Light.ttf'),
    'Exo-Medium': require('../assets/fonts/Exo-Medium.ttf'),
    'Exo-Regular': require('../assets/fonts/Exo-Regular.ttf'),
    'Exo-SemiBold': require('../assets/fonts/Exo-SemiBold.ttf'),
    'Exo-Thin': require('../assets/fonts/Exo-Thin.ttf'),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <FontProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="index" />
      </Stack>
    </FontProvider>
  );
};

export default RootLayout;
