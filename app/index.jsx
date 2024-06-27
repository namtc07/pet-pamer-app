import { router } from 'expo-router';
import { Image, SafeAreaView, StyleSheet, View } from 'react-native';

import { PlatformTouchable, StatusbarCustom, Text } from '@/components';
import Images from '@/assets/images';

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
    fontFamily: 'Exo-Bold',
  },
  subtitle: {
    fontSize: 18,
    color: '#FF8D4D',
    textAlign: 'center',
    lineHeight: 27,
    paddingBottom: 30,
    fontFamily: 'Exo-Bold',
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

function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusbarCustom color="dark-content" />
      <View style={styles.header}>
        <Text style={styles.title} text="Pet pamper" />
        <Text style={styles.subtitle} text="Taking care of your pet" />
      </View>
      <View style={styles.middle}>
        <Image style={styles.img} source={Images.BannerPreview} />
      </View>
      <View style={styles.footer}>
        <PlatformTouchable
          onPress={() => router.navigate('sign-up')}
          style={styles.signUp}
          hasShadow
        >
          <Text style={styles.textSignUp} text="Sign Up" />
        </PlatformTouchable>
        <PlatformTouchable
          onPress={() => router.navigate('log-in')}
          style={styles.logIn}
        >
          <Text style={styles.textLogIn} text="Log in" />
        </PlatformTouchable>
      </View>
    </SafeAreaView>
  );
}

export default Index;
