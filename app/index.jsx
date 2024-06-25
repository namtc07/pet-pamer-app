import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { AuthContext } from '@/context/AuthContext';
import Welcome from './Welcome';
import { LoaderCustom } from '@/components';

function Index() {
  const [loading, setLoading] = useState(false);
  const { auth } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (auth?.token) {
      setLoading(!auth?.token);
      router.replace('/(tabs)/home');
    }
  }, [auth]);

  return (
    <>
      <Welcome />
      {loading && <LoaderCustom visible={loading} isLoading={loading} />}
    </>
  );
}

export default Index;
