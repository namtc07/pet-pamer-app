import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';

const STYLES = ['default', 'dark-content', 'light-content'];

export const StatusbarCustom = ({ color, ...props }) => {
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[0]);

  useEffect(() => {
    setStatusBarStyle(color);
  }, [JSON.stringify(color)]);

  return <StatusBar animated={true} style={statusBarStyle} {...props} />;
};
