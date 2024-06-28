import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router, useRouter } from 'expo-router';

interface AuthData {
  token: string;
  phone: string;
}

interface AuthContextType {
  auth: AuthData | undefined;
  setAuth: (newAuthState: AuthData) => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

// Create a context
const AuthContext = createContext<AuthContextType>({
  auth: undefined,
  setAuth: () => {},
});

const configureAxiosHeaders = (token: string, phone: string) => {
  axios.defaults.headers['X-Auth-Token'] = token;
  axios.defaults.headers['X-Auth-Phone'] = phone;
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuthState] = useState<AuthData | undefined>(undefined);
  const routerCustom = useRouter();

  // Get current auth state from AsyncStorage
  const getAuthState = async () => {
    try {
      const authDataString = await AsyncStorage.getItem('auth');
      const authData: AuthData = JSON.parse(authDataString || '{}');
      // Configure axios headers
      configureAxiosHeaders(authData.token, authData.phone);
      setAuthState(authData);
    } catch (err) {
      setAuthState(undefined);
    }
  };

  // Update AsyncStorage & context state
  const updateAuthState = async (newAuthState: AuthData) => {
    try {
      await AsyncStorage.setItem('auth', JSON.stringify(newAuthState));
      // Configure axios headers
      configureAxiosHeaders(newAuthState.token, newAuthState.phone);
      setAuthState(newAuthState);
    } catch (error) {
      console.error('Failed to update auth state in AsyncStorage:', error);
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  useEffect(() => {
    if (auth?.token) {
      router.replace('/(tabs)/home/home');
      // Remove the following line as canGoBack does not take arguments
      // routerCustom.canGoBack(false);
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth: updateAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
