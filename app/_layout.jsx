/* eslint-disable global-require */
import 'expo-dev-client';
import 'react-native-url-polyfill/auto';
import { SplashScreen, Stack } from 'expo-router';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { ApolloProvider } from 'react-apollo';

SplashScreen.preventAutoHideAsync();

const httpLink = createHttpLink({
  uri: 'https://gw.devapi.honganh.vn/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = '';
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
  // const [fontsLoaded, error] = useFonts({
  //   'Exo-Black': require('../assets/fonts/Exo-Black.ttf'),
  //   'Exo-Bold': require('../assets/fonts/Exo-Bold.ttf'),
  //   'Exo-ExtraBold': require('../assets/fonts/Exo-ExtraBold.ttf'),
  //   'Exo-ExtraLight': require('../assets/fonts/Exo-ExtraLight.ttf'),
  //   'Exo-Light': require('../assets/fonts/Exo-Light.ttf'),
  //   'Exo-Medium': require('../assets/fonts/Exo-Medium.ttf'),
  //   'Exo-Regular': require('../assets/fonts/Exo-Regular.ttf'),
  //   'Exo-SemiBold': require('../assets/fonts/Exo-SemiBold.ttf'),
  //   'Exo-Thin': require('../assets/fonts/Exo-Thin.ttf'),
  // });

  // useEffect(() => {
  //   if (error) throw error;

  //   if (fontsLoaded) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded, error]);

  // if (!fontsLoaded) {
  //   return null;
  // }

  // if (!fontsLoaded && !error) {
  //   return null;
  // }

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  );
}

export default RootLayout;
