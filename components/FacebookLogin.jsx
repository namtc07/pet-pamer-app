import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';
import React, { useContext, useEffect } from 'react';
import { Platform, StyleSheet, Text } from 'react-native';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
  Settings,
} from 'react-native-fbsdk-next';
import { AuthContext } from '@/context/AuthContext';
import { SvgIcon } from '@/assets/images';
import PlatformTouchable from './PlatformTouchable';

const styles = StyleSheet.create({
  facebook: {
    backgroundColor: 'white',
  },
  textFacebook: {
    color: '#CBCBCB',
  },
});

function FacebookLogin({ onLoading }) {
  const { setAuth } = useContext(AuthContext);

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
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);
      if (result.isCancelled) {
        console.info('Login cancelled');
        onLoading(false);
      } else {
        const data = await AccessToken.getCurrentAccessToken();
        if (!data) {
          throw new Error('Something went wrong obtaining access token');
        }
        const { accessToken } = data;
        const responseInfoCallback = async (error, result) => {
          if (error) {
            console.info('Error fetching data: ', error.toString());
          } else {
            setAuth({ token: accessToken, phone: '' });
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
          responseInfoCallback,
        );

        new GraphRequestManager().addRequest(infoRequest).start();
      }
    } catch (error) {
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
}

export default FacebookLogin;
