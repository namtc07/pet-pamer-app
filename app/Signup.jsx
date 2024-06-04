import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  StatusBar,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Feather } from '@expo/vector-icons';
import { StatusbarCustom } from './StatusbarCustom';

function Signup() {
  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [emailValid, setEmailValid] = useState(true);

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
    if (email.trim() !== '' && password.trim() !== '') {
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

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  console.log(StatusBar.currentHeight);
  return (
    <SafeAreaView style={styles.container}>
      <StatusbarCustom color={'dark-content'} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
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
              <TextInput
                style={[
                  styles.input,
                  emailValid && styles.inputEmail,
                  !emailValid && email.trim() !== '' && styles.invalidInput,
                ]}
                placeholder="Email"
                placeholderTextColor="#979797"
                keyboardType="email-address"
                value={email}
                onChangeText={handleEmailChange}
              />
              {!emailValid && email.trim() !== '' && (
                <Text style={styles.invalidText}>
                  Please enter your email address in format: yourname@example.com
                </Text>
              )}
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.input, emailValid && styles.inputPassword]}
                  placeholder="Password"
                  secureTextEntry={!passwordVisible}
                  placeholderTextColor="#979797"
                  keyboardType="visible-password"
                  value={password}
                  onChangeText={handlePasswordChange}
                  e
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
        {/* <View>
          <Text style={{ fontSize: 42 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </Text>
        </View> */}
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
  input: {
    backgroundColor: '#CBCBCB30',
    height: 52,
    borderWidth: 1,
    padding: 10,
    borderRadius: 12,
    borderColor: 'transparent',
    marginBottom: 16,
    color: '#5A2828',
    fontSize: 14,
  },
  inputEmail: {
    marginBottom: '0 !important',
  },
  inputPassword: {
    marginBottom: '0 !important',
  },
  invalidInput: {
    borderColor: 'red',
  },
  invalidText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
  },
  passwordContainer: {
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: [{ translateY: -29 }],
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
