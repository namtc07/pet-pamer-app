import { router } from 'expo-router';
import {
  Image,
  ImageStyle,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';

import Images from '@/assets/images';
import StatusbarCustom from '@/components/StatusbarCustom';
import Text from '@/components/TextCustom';
import PlatformTouchable from '@/components/PlatformTouchable';

interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusbarCustom color={'dark'} />
      <View style={styles.header}>
        <Text style={styles.title} children="Pet pamper" />
        <Text style={styles.subtitle} children="Taking care of your pet" />
      </View>
      <View style={styles.middle}>
        <Image style={styles.img as ImageStyle} source={Images.BannerPreview} />
      </View>
      <View style={styles.footer}>
        <PlatformTouchable
          onPress={() => router.navigate('sign-up')}
          style={styles.signUp}
          hasShadow
        >
          <Text style={styles.textSignUp} children="Sign Up" />
        </PlatformTouchable>
        <PlatformTouchable
          onPress={() => router.navigate('log-in')}
          style={styles.logIn}
        >
          <Text style={styles.textLogIn} children="Log in" />
        </PlatformTouchable>
      </View>
    </SafeAreaView>
  );
};

export default App;

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
    color: '#5A2828',
    textTransform: 'uppercase',
    lineHeight: 54,
  },
  subtitle: {
    fontSize: 18,
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
    fontFamily: 'Exo-Bold',
  },
  logIn: {
    backgroundColor: 'orange',
  },
  textLogIn: {
    color: 'white',
    fontFamily: 'Exo-Bold',
  },
});
