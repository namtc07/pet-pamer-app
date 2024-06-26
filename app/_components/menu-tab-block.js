import React from 'react';
import { Text } from 'react-native';
import { PlatformTouchable } from '@/components';

function MenuTabBlock({ icon, text }) {
  return <PlatformTouchable icon={icon} children={text} />;
}

export default MenuTabBlock;
