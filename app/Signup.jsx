import React, { useState, useEffect, useCallback } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  SafeAreaView,
  ScrollView,
  StatusBar,
  RefreshControl,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign, Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusbarCustom } from './StatusbarCustom';

function Signup() {
  const navigation = useNavigation();
  const route = useRoute();
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

  useEffect(() => {
    checkButtonState(email, password);
    validateEmail(email);
  }, [email, password]);

  const handleEmailChange = (text) => {
    setEmail(text);
    checkButtonState(text, password);
    validateEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    checkButtonState(email, text);
  };

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

  const handleSignUp = () => {
    // Your sign-up logic here
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleBackPress = async () => {
    await AsyncStorage.setItem('email', email);
    await AsyncStorage.setItem('password', password);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusbarCustom color={'dark-content'} />
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress}>
          <View style={styles.iconContainer}>
            <AntDesign name="left" size={24} color="#FF8D4D" />
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={styles.content}>
          <View>
            <View>
              <Text style={styles.title}>Sign up</Text>
            </View>
            <View>
              <View style={[styles.emailContainer]}>
                <TextInput
                  style={[styles.input, !emailValid && email.trim() !== '' && styles.invalidInput]}
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
                  <Feather name={passwordVisible ? 'eye' : 'eye-off'} size={22} color="#979797" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View>
            <TouchableOpacity disabled={buttonDisabled} onPress={handleSignUp}>
              <View
                style={[styles.button, { backgroundColor: buttonDisabled ? '#CBCBCB' : '#FF8D4D' }]}
              >
                <Text style={[styles.textSignUp, { color: buttonDisabled ? '#979797' : 'white' }]}>
                  Sign Up
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Signup;

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
    // backgroundColor: 'red',
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
});
