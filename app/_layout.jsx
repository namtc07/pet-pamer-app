import { SplashScreen, Stack } from 'expo-router';
import { FontProvider } from '../context/FontContext';

import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';

import 'react-native-url-polyfill/auto';

import { ApolloProvider } from 'react-apollo';
import 'expo-dev-client';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

const httpLink = createHttpLink({
  uri: 'https://gw.devapi.honganh.vn/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjExMTUsImV4cCI6MTcyNDg0MTU5MCwiaWF0IjoxNzE3MDY1NTkwLCJpc3MiOiJoYS1mdWxmaWxsbWVudCIsIm5iZiI6MTcxNzA2NTU5MH0.e8E9uRn0qiVuaUUhSkkSpbx9TJLgLBjnLyaxUuoJZhc';
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

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
    <ApolloProvider client={client}>
      <FontProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </FontProvider>
    </ApolloProvider>
  );
};

export default RootLayout;
