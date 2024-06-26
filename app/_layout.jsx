/* eslint-disable global-require */
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import { Slot, SplashScreen, Stack, router } from 'expo-router';
import React, { useContext, useEffect } from 'react';
import { ApolloProvider } from 'react-apollo';
import { useFonts } from 'expo-font';
import { AuthContext, AuthProvider } from '@/context/AuthContext';

SplashScreen.preventAutoHideAsync();

const httpLink = createHttpLink({
  uri: 'https://gw.devapi.honganh.vn/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = ''; // Thay thế bằng logic lấy token thực tế từ context AuthContext
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

function RootLayout() {
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
    <AuthProvider>
      <ApolloProvider client={client}>
        <Stack
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false, gestureEnabled: false }}
          />
        </Stack>
      </ApolloProvider>
    </AuthProvider>
  );
}

export default RootLayout;
