import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StatusbarCustom } from './StatusbarCustom';
import { Platform } from 'react-native';

export default function Page() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusbarCustom color={'dark-content'} />
      <View style={styles.header}>
        <Text style={styles.title}>Pet pamper</Text>
        <Text style={styles.subtitle}>Taking care of your pet</Text>
      </View>
      <View style={styles.middle}>
        <Image style={styles.img} source={require('../assets/images/cat_home.png')} />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <View style={styles.signUp}>
            <Text style={styles.textSignUp}>Sign Up</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert('Pressed!')}>
          <View style={styles.logIn}>
            <Text style={styles.textLogIn}>Log in</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
    display: 'flex',
    gap: 24,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  header: {
    // paddingTop: 57,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#5A2828',
    textTransform: 'uppercase',
    lineHeight: 54,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FF8D4D',
    textAlign: 'center',
    lineHeight: 27,
    paddingBottom: 30,
  },
  middle: {
    alignItems: 'center',
  },
  img: {
    width: 343,
    height: 343,
  },
  footer: {
    width: 342,
    display: 'flex',
    gap: 8,
  },
  signUp: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 5,
      },
    }),
    borderRadius: 12,
    width: '100%',
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textSignUp: {
    color: '#FF8D4D',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 27,
  },
  logIn: {
    backgroundColor: 'orange',
    borderRadius: 12,
    width: '100%',
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textLogIn: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 27,
  },
});
