import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';
import React, { useContext, useEffect } from 'react';
import { Platform, StyleSheet } from 'react-native';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
  Settings,
} from 'react-native-fbsdk-next';
import { AuthContext } from '@/context/AuthContext';
import Svgs from '@/assets/svgs';
import PlatformTouchable from '@/components/PlatformTouchable';
import Text from '@/components/TextCustom';

const styles = StyleSheet.create({
  facebook: {
    backgroundColor: 'white',
  },
  textFacebook: {
    color: '#CBCBCB',
  },
});

interface FacebookLoginProps {
  onLoading: (loading: boolean) => void;
}

const FacebookLogin: React.FC<FacebookLoginProps> = ({ onLoading }) => {
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
        const responseInfoCallback = async (error: any, result: any) => {
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
      console.error('Facebook login error:', error);
      onLoading(false);
    }
  };

  return (
    <PlatformTouchable
      hasShadow
      style={styles.facebook}
      onPress={handleFacebookLogin}
      children={<Text style={styles.textFacebook} children="Facebook" />}
      icon={<Svgs.IconFacebook />}
    />
  );
};

export default FacebookLogin;
