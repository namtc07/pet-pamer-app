import { StatusBar, StyleSheet } from 'react-native';

export const EMAIL_REGEX = /\S+@\S+\.\S+/;

export const styles = StyleSheet.create({
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
    paddingStart: 10,
    paddingEnd: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  eyeIconSignup: {
    transform: [{ translateY: -20 }],
  },
  eyeIconLogin: {
    transform: [{ translateY: -32 }],
  },
  button: {
    borderRadius: 12,
    width: '100%',
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
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
