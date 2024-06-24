import { AntDesign, Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SvgIcon } from '../../assets/images';
import FacebookLogin from '../../components/FacebookLogin';
import LoaderCustom from '../../components/LoaderCustom';
import PlatformTouchable from '../../components/PlatformTouchable';
import SeparatorCustom from '../../components/SeparatorCustom';
import { StatusbarCustom } from '../../components/StatusbarCustom';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: StatusBar.currentHeight,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: StatusBar.currentHeight,
  },
  iconContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    marginTop: 18,
  },
  title: {
    color: '#5A2828',
    fontSize: 24,
    lineHeight: 36,
    fontWeight: '700',
    marginBottom: 18,
  },
  emailContainer: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#CBCBCB30',
    height: 52,
    borderWidth: 1,
    padding: 10,
    borderRadius: 12,
    borderColor: 'transparent',

    color: '#5A2828',
    fontSize: 14,
  },
  invalidInput: {
    borderColor: 'red',
  },
  invalidText: {
    color: 'red',
    fontSize: 12,
  },
  passwordContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  eyeIcon: {
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: [{ translateY: -20 }],
    paddingStart: 10,
    paddingEnd: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  button: {
    borderRadius: 12,
    width: '100%',
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textSignUp: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonGroup: {
    paddingVertical: 32,
    display: 'flex',
    gap: 18,
  },
  google: {
    backgroundColor: 'white',
  },
  facebook: {
    backgroundColor: 'white',
  },
  textGoogle: {
    color: '#CBCBCB',
  },
  textFacebook: {
    color: '#CBCBCB',
  },
});

function Signup() {
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [emailValid, setEmailValid] = useState(true);

  useEffect(() => {
    const loadStoredData = async () => {
      const storedEmail = await AsyncStorage.getItem('email');
      const storedPassword = await AsyncStorage.getItem('password');
      if (storedEmail) setEmail(storedEmail);
      if (storedPassword) setPassword(storedPassword);
    };
    loadStoredData();
  }, []);

  const checkButtonState = (email, password) => {
    if (email.trim() !== '' && password.trim() !== '' && emailValid) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    setEmailValid(emailRegex.test(email));
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    checkButtonState(text, password);
    validateEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    checkButtonState(email, text);
  };

  useEffect(() => {
    checkButtonState(email, password);
    validateEmail(email);
  }, [email, password]);

  const handleGetValueLoading = (value) => {
    setLoading(value);
  };

  const handleSignUp = () => {
    // Your sign-up logic here
  };

  const handleBackPress = async () => {
    await AsyncStorage.setItem('email', email);
    await AsyncStorage.setItem('password', password);
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
      <ScrollView>
        <View style={styles.content}>
          <View>
            <View>
              <Text style={styles.title}>Sign up</Text>
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
                  style={styles.eyeIcon}
                  onPress={() => setPasswordVisible(!passwordVisible)}
                >
                  <Feather
                    name={passwordVisible ? 'eye' : 'eye-off'}
                    size={22}
                    color="#979797"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{ paddingTop: 32 }}>
            <PlatformTouchable
              disabled={buttonDisabled}
              onPress={handleSignUp}
              style={[
                styles.button,
                { backgroundColor: buttonDisabled ? '#CBCBCB' : '#FF8D4D' },
              ]}
              children={
                <Text
                  style={[
                    styles.textSignUp,
                    { color: buttonDisabled ? '#979797' : 'white' },
                  ]}
                >
                  Sign Up
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
            <FacebookLogin onLoading={handleGetValueLoading} />
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
            <TouchableOpacity onPress={() => router.navigate('log-in')}>
              <Text style={{ color: '#FF8D4D', fontWeight: 600 }}>Log in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {loading && <LoaderCustom visible={loading} isLoading={loading} />}
    </SafeAreaView>
  );
}

export default Signup;
