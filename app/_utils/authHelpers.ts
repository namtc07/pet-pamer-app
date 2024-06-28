// utils/authHelpers.ts

import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadStoredData = async (
  setEmail: (email: string) => void,
  setPassword: (password: string) => void,
) => {
  const storedEmail = await AsyncStorage.getItem('email');
  const storedPassword = await AsyncStorage.getItem('password');
  if (storedEmail) setEmail(storedEmail);
  if (storedPassword) setPassword(storedPassword);
};

export const checkButtonState = (
  email: string | undefined,
  password: string | undefined,
  emailValid: boolean,
  setButtonDisabled: (disabled: boolean) => void,
) => {
  if (email?.trim() !== '' && password?.trim() !== '' && emailValid) {
    setButtonDisabled(false);
  } else {
    setButtonDisabled(true);
  }
};

export const validateEmail = (
  email: string,
  setEmailValid: (valid: boolean) => void,
) => {
  const emailRegex = /\S+@\S+\.\S+/;
  setEmailValid(emailRegex.test(email));
};

export const saveDataToStorage = async (email: string, password: string) => {
  await AsyncStorage.setItem('email', email);
  await AsyncStorage.setItem('password', password);
};
