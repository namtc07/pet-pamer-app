// pages/Login.tsx

import { AntDesign, Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import {
  Alert,
  Keyboard,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
  TextStyle,
  TextInputProps,
  TouchableOpacityProps,
} from 'react-native';
import {
  // checkButtonState,
  loadStoredData,
  saveDataToStorage,
  validateEmail,
} from '@/app/_utils/authHelpers';
import {
  LoaderCustom,
  PlatformTouchable,
  SeparatorCustom,
  StatusbarCustom,
  Text,
} from '@/components';
import { styles } from './styles';
import Svgs from '@/assets/svgs';
import FacebookLogin from '../_components/FacebookLogin';
import { AuthContext } from '@/context/AuthContext';

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [emailValid, setEmailValid] = useState<boolean>(true);
  const { setAuth } = useContext(AuthContext);

  useEffect(() => {
    loadStoredData(setEmail, setPassword);
  }, []);

  useEffect(() => {
    // checkButtonState(email, password, emailValid, setButtonDisabled);
    validateEmail(email, setEmailValid);
  }, [email, password]);

  const handleEmailChange = (text: string) => {
    setEmail(text);
    // checkButtonState(text, password, emailValid, setButtonDisabled);
    validateEmail(text, setEmailValid);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    // checkButtonState(email, text, emailValid, setButtonDisabled);
  };

  const handleLogin = () => {
    if (email === 'admin@gmail.com' && password === '123') {
      saveDataToStorage(email, password);
      setAuth({ token: email, phone: '' });
    } else {
      Alert.alert('Sai roi !');
    }
  };

  const handleBackPress = async () => {
    saveDataToStorage(email, password);
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusbarCustom color="dark" />
      <View style={styles.header}>
        <TouchableWithoutFeedback onPress={handleBackPress}>
          <View style={styles.iconContainer}>
            <AntDesign name="left" size={24} color="#FF8D4D" />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.content}>
          <View>
            <View>
              <Text style={styles.title} children="Log in" />
            </View>
            <View>
              <View style={[styles.emailContainer]}>
                <TextInput
                  style={[
                    styles.input,
                    !emailValid && email?.trim() !== '' && styles.invalidInput,
                  ]}
                  placeholder="Email"
                  placeholderTextColor="#979797"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={handleEmailChange}
                />
                {!emailValid && email?.trim() !== '' && (
                  <View style={{ paddingLeft: 4 }}>
                    <Text
                      style={styles.invalidText}
                      children="Please enter your email address in format:"
                    />
                    <Text
                      style={styles.invalidText}
                      children="yourname@example.com"
                    />
                  </View>
                )}
              </View>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.input]}
                  placeholder="Password"
                  secureTextEntry={!passwordVisible}
                  placeholderTextColor="#979797"
                  keyboardType="default"
                  value={password}
                  onChangeText={handlePasswordChange}
                />
                <TouchableOpacity
                  style={[styles.eyeIcon, styles.eyeIconLogin]}
                  onPress={() => setPasswordVisible(!passwordVisible)}
                >
                  <Feather
                    name={passwordVisible ? 'eye' : 'eye-off'}
                    size={22}
                    color="#979797"
                  />
                </TouchableOpacity>
                <View style={{ paddingTop: 4, alignItems: 'flex-end' }}>
                  <TouchableOpacity
                    onPress={() => router.navigate('Forgot password?')}
                  >
                    <Text
                      style={{ color: '#FF8D4D', fontWeight: '600' }}
                      children="Forgot password?"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View style={{ paddingTop: 32 }}>
            <PlatformTouchable
              disabled={buttonDisabled}
              onPress={handleLogin}
              style={[
                styles.button,
                { backgroundColor: buttonDisabled ? '#CBCBCB' : '#FF8D4D' },
              ]}
            >
              <Text
                style={[
                  // styles.textLogin,
                  { color: buttonDisabled ? '#979797' : 'white' },
                ]}
                children="Log in"
              />
            </PlatformTouchable>
          </View>
          <View style={{ paddingTop: 32 }}>
            <SeparatorCustom
              text="Or"
              position="middle"
              propsText={{ fontWeight: '700' }}
            />
          </View>
          <View style={styles.buttonGroup}>
            <PlatformTouchable
              style={styles.google}
              hasShadow
              children={<Text style={styles.textGoogle} children="Google" />}
              icon={<Svgs.IconGoogle />}
              onPress={() => console.log('Google')}
            />
            <FacebookLogin onLoading={setLoading} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 32,
            }}
          >
            <Text
              style={{ color: '#CBCBCB' }}
              children="Already have an account?"
            />
            <TouchableOpacity onPress={() => router.navigate('sign-up')}>
              <Text
                style={{ color: '#FF8D4D', fontWeight: '600' }}
                children="Sign up"
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
      {loading && <LoaderCustom visible={loading} isLoading={loading} />}
    </SafeAreaView>
  );
};

export default Login;
