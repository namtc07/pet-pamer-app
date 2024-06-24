import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';

const STYLES = ['default', 'dark', 'light'];

function StatusbarCustom({ color, ...props }) {
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[0]);

  useEffect(() => {
    setStatusBarStyle(color);
  }, [color]);

  return <StatusBar animated style={statusBarStyle} {...props} />;
}

export default StatusbarCustom;
