// utils/authHelpers.js

import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadStoredData = async (setEmail, setPassword) => {
  const storedEmail = await AsyncStorage.getItem('email');
  const storedPassword = await AsyncStorage.getItem('password');
  if (storedEmail) setEmail(storedEmail);
  if (storedPassword) setPassword(storedPassword);
};

export const checkButtonState = (
  email,
  password,
  emailValid,
  setButtonDisabled,
) => {
  if (email.trim() !== '' && password.trim() !== '' && emailValid) {
    setButtonDisabled(false);
  } else {
    setButtonDisabled(true);
  }
};

export const validateEmail = (email, setEmailValid) => {
  const emailRegex = /\S+@\S+\.\S+/;
  setEmailValid(emailRegex.test(email));
};

export const saveDataToStorage = async (email, password) => {
  await AsyncStorage.setItem('email', email);
  await AsyncStorage.setItem('password', password);
};
