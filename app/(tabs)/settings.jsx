import React, { useCallback, useEffect, useState } from 'react';
import {
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LoginManager } from 'react-native-fbsdk-next';
import PlatformTouchable from '../../components/PlatformTouchable';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Settings() {
  const handleFacebookLogout = async () => {
    LoginManager.logOut();
    await AsyncStorage.removeItem('userToken');
    router.navigate('/');
  };
  const [user, setUser] = useState(null);

  const loadStoredData = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.log('Error loading user data:', error);
    }
  };

  useEffect(() => {
    loadStoredData();
  }, []);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    console.log(user);
    setRefreshing(true);
    loadStoredData();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          enabled={true}
          progressBackgroundColor="#FF8D4D"
          tintColor="#FF8D4D"
          title="Loading..."
          titleColor="#FF8D4D"
          colors={['white']}
        />
      }
    >
      <SafeAreaView style={styles.container}>
        <View>
          <Image
            width={50}
            height={50}
            source={{
              uri: user?.picture?.data?.url,
            }}
          />
          <Text style={{ color: 'black' }}>{user?.email}</Text>
          <Text style={{ color: 'black' }}>{user?.name}</Text>
          <Text style={{ color: 'black' }}>{user?.id}</Text>
        </View>
        <PlatformTouchable
          hasShadow
          style={styles.facebook}
          onPress={handleFacebookLogout}
          children={<Text>Log out</Text>}
        />
      </SafeAreaView>
    </ScrollView>
  );
}

export default Settings;

const styles = StyleSheet.create({});
