import React, { useEffect, useState } from 'react';
import * as Facebook from 'expo-auth-session/providers/facebook';
import { Alert, StyleSheet, Text } from 'react-native';
import { SvgIcon } from '../assets/images';
import PlatformTouchable from './PlatformTouchable';
import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';
import { AccessToken, LoginButton, Settings } from 'react-native-fbsdk-next';

const FacebookLogin = () => {
  const [user, setUser] = useState(null);
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: '477086288337851',
    redirectUri: 'https://auth.expo.io/@namtc07/pet-pamper-app', // URI chuyển hướng
  });

  // useEffect(() => {
  //   if (response) {
  //     console.log('Response: ', response); // In ra response để kiểm tra chi tiết
  //     if (response.type === 'success' && response.authentication) {
  //       (async () => {
  //         try {
  //           const userInfoResponse = await fetch(
  //             `https://graph.facebook.com/me?access_token=${response.authentication.accessToken}&fields=id,name`
  //           );
  //           const userInfo = await userInfoResponse.json();
  //           setUser(userInfo);
  //         } catch (error) {
  //           console.error('Failed to fetch user info: ', error);
  //           Alert.alert('Error', 'Failed to fetch user info. Please try again.');
  //         }
  //       })();
  //     } else {
  //       Alert.alert('Error', 'Something went wrong trying to finish signing in.');
  //     }
  //   }
  // }, [response]);

  // const handlePressFacebook = async () => {
  //   const result = await promptAsync();
  //   if (result.type !== 'success') {
  //     Alert.alert('Login Failed', 'Unable to login with Facebook. Please try again later.');
  //   }
  // };

  return (
    <View>
      <LoginButton
        onLogoutFinished={() => console.log('Logged out')}
        onLoginFinished={(error, data) => {
          console.log(error, data);
          AccessToken.getCurrentAccessToken().then((data) => {
            console.log(data);
          });
        }}
      />
    </View>
    // <PlatformTouchable
    //   hasShadow
    //   style={styles.facebook}
    //   children={<Text style={styles.textFacebook}>Facebook</Text>}
    //   icon={<SvgIcon.IconFacebook />}
    //   onPress={() => handlePressFacebook()}
    // />
  );
};

export default FacebookLogin;

const styles = StyleSheet.create({
  facebook: {
    backgroundColor: 'white',
  },
  textFacebook: {
    color: '#CBCBCB',
  },
});
