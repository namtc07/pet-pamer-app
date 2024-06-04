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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Feather } from '@expo/vector-icons';

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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.iconContainer}>
              <AntDesign name="left" size={24} color="#FF8D4D" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <View>
            <View>
              <Text style={styles.title}>Sign up</Text>
            </View>
            <View>
              <TextInput
                style={[styles.input, !emailValid && email.trim() !== '' && styles.invalidInput]}
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
                  style={styles.input}
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
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingHorizontal: 24,
    marginBottom: 18,
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
  invalidInput: {
    borderColor: 'red', // Change border color to red if email is invalid
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
    right: 20,
    top: '50%',
    transform: [{ translateY: -19 }],
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
