import { useNavigation } from '@react-navigation/native';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import PlatformTouchable from './components/PlatformTouchable';
import { StatusbarCustom } from './components/StatusbarCustom';

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
        <PlatformTouchable
          onPress={() => navigation.navigate('Signup')}
          style={styles.signUp}
          hasShadow
          children={<Text style={styles.textSignUp}>Sign Up</Text>}
        />
        <PlatformTouchable
          onPress={() => navigation.navigate('Login')}
          style={styles.logIn}
          children={<Text style={styles.textLogIn}>Log in</Text>}
        />
        <PlatformTouchable
          onPress={() => navigation.navigate('Homepage')}
          style={styles.logIn}
          children={<Text style={styles.textLogIn}>Homepage</Text>}
        />
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
    gap: 18,
  },
  signUp: {
    backgroundColor: 'white',
    shadowColor: '#000',
  },
  textSignUp: {
    color: '#FF8D4D',
  },
  logIn: {
    backgroundColor: 'orange',
  },
  textLogIn: {
    color: 'white',
  },
});
