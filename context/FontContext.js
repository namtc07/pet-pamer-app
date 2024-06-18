// context/FontContext.js
import React, { createContext } from 'react';
import { useFonts } from 'expo-font';

const FontContext = createContext();

const FontProvider = ({ children }) => {
  const [fontsLoaded] = useFonts({
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

  return <FontContext.Provider value={{}}>{children}</FontContext.Provider>;
};

export { FontContext, FontProvider };
