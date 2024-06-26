// pages/Login.jsx
import { AntDesign, Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import {
  Alert,
  Keyboard,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  checkButtonState,
  loadStoredData,
  saveDataToStorage,
  validateEmail,
} from '@/_utils/authHelpers';
import SvgIcon from '@/assets/svgs';
import {
  FacebookLogin,
  LoaderCustom,
  PlatformTouchable,
  SeparatorCustom,
  StatusbarCustom,
} from '@/components';
import { AuthContext } from '@/context/AuthContext';
import { styles } from './styles';

function Login() {
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const { setAuth } = useContext(AuthContext);

  useEffect(() => {
    loadStoredData(setEmail, setPassword);
  }, []);

  useEffect(() => {
    checkButtonState(email, password, emailValid, setButtonDisabled);
    validateEmail(email, setEmailValid);
  }, [email, password]);

  const handleEmailChange = (text) => {
    setEmail(text);
    checkButtonState(text, password, emailValid, setButtonDisabled);
    validateEmail(text, setEmailValid);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    checkButtonState(email, text, emailValid, setButtonDisabled);
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
      <StatusbarCustom color="dark-content" />
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
              <Text style={styles.title}>Log in</Text>
            </View>
            <View>
              <View style={[styles.emailContainer]}>
                <TextInput
                  style={[
                    styles.input,
                    !emailValid && email.trim() !== '' && styles.invalidInput,
                  ]}
                  placeholder="Email"
                  placeholderTextColor="#979797"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={handleEmailChange}
                />
                {!emailValid && email.trim() !== '' && (
                  <View style={{ paddingLeft: 4 }}>
                    <Text style={styles.invalidText}>
                      Please enter your email address in format:
                    </Text>
                    <Text style={styles.invalidText}>yourname@example.com</Text>
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
                  <TouchableOpacity onPress={() => router.navigate()}>
                    <Text style={{ color: '#FF8D4D', fontWeight: 600 }}>
                      Forgot password?
                    </Text>
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
              children={
                <Text
                  style={[
                    styles.textLogin,
                    { color: buttonDisabled ? '#979797' : 'white' },
                  ]}
                >
                  Log in
                </Text>
              }
            />
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
              children={<Text style={styles.textGoogle}>Google</Text>}
              icon={<SvgIcon.IconGoogle />}
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
            <Text style={{ color: '#CBCBCB' }}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.navigate('sign-up')}>
              <Text style={{ color: '#FF8D4D', fontWeight: 600 }}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
      {loading && <LoaderCustom visible={loading} isLoading={loading} />}
    </SafeAreaView>
  );
}

export default Login;
