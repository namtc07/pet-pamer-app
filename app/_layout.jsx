import 'expo-dev-client';
import 'react-native-url-polyfill/auto';
import { SplashScreen, Stack } from 'expo-router';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
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
