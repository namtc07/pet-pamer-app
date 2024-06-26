import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { router } from 'expo-router';
// Create a context
const AuthContext = createContext({});

const configureAxiosHeaders = (token, phone) => {
  axios.defaults.headers['X-Auth-Token'] = token;
  axios.defaults.headers['X-Auth-Phone'] = phone;
};

function AuthProvider(props) {
  const [auth, setAuthState] = useState();

  // Get current auth state from AsyncStorage
  const getAuthState = async () => {
    try {
      const authDataString = await AsyncStorage.getItem('auth');
      const authData = JSON.parse(authDataString || {});
      // Configure axios headers
      configureAxiosHeaders(authData.token, authData.phone);
      setAuthState(authData);
    } catch (err) {
      setAuthState({});
    }
  };

  // Update AsyncStorage & context state
  const updateAuthState = async (newAuthState) => {
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
  console.log('auth:::', auth);
  useEffect(() => {
    if (auth?.token) {
      router.replace('/(tabs)/home');
    }
  }, [auth]);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth: updateAuthState,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
