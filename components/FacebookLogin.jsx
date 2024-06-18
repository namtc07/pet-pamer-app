import { Redirect, router } from 'expo-router';
import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';
import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text } from 'react-native';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
  Settings,
} from 'react-native-fbsdk-next';
import { SvgIcon } from '../assets/images';
import PlatformTouchable from './PlatformTouchable';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FacebookLogin = ({ onLoading }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const requestTracking = async () => {
      const { status } = await requestTrackingPermissionsAsync();
      if (Platform.OS === 'ios') {
        Settings.initializeSDK();
      }
      if (status === 'granted' && Platform.OS === 'ios') {
        await Settings.setAdvertiserTrackingEnabled(true);
      }
    };
    requestTracking();
  }, []);

  const handleFacebookLogin = async () => {
    try {
      onLoading(true);
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
      if (result.isCancelled) {
        console.log('Login cancelled');
        onLoading(false);
      } else {
        const data = await AccessToken.getCurrentAccessToken();
        if (!data) {
          throw new Error('Something went wrong obtaining access token');
        }
        const accessToken = data.accessToken;
        const responseInfoCallback = async (error, result) => {
          if (error) {
            console.log('Error fetching data: ', error.toString());
          } else {
            setUser(result);
            await AsyncStorage.setItem('userToken', accessToken);
            await AsyncStorage.setItem('userData', JSON.stringify(result));
            router.navigate('home');
          }
          onLoading(false);
        };

        const infoRequest = new GraphRequest(
          '/me',
          {
            accessToken,
            parameters: {
              fields: {
                string: 'id, name, email, picture',
              },
            },
          },
          responseInfoCallback
        );

        new GraphRequestManager().addRequest(infoRequest).start();
      }
    } catch (error) {
      console.log('Login failed with error: ' + error);
      onLoading(false);
    }
  };

  return (
    <PlatformTouchable
      hasShadow
      style={styles.facebook}
      onPress={handleFacebookLogin}
      children={<Text style={styles.textFacebook}>Facebook</Text>}
      icon={<SvgIcon.IconFacebook />}
    />
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
