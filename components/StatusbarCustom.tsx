import React, { useEffect, useState } from 'react';
import { StatusBar, StatusBarProps } from 'expo-status-bar';

// Định nghĩa lại kiểu dữ liệu StatusBarStyle từ StatusBarProps
export type StatusBarStyle = 'auto' | 'inverted' | 'light' | 'dark';

interface StatusbarCustomProps extends StatusBarProps {
  color?: StatusBarStyle; // Sử dụng optional để cho phép không truyền vào
}

export const StatusbarCustom: React.FC<StatusbarCustomProps> = ({
  color = 'auto',
  ...props
}) => {
  // State để lưu trữ giá trị color
  const [statusBarStyle, setStatusBarStyle] = useState<StatusBarStyle>('auto');

  // Effect để cập nhật state khi color thay đổi
  useEffect(() => {
    setStatusBarStyle(color);
  }, [color]);

  // Trả về StatusBar với style và các props khác
  return <StatusBar animated style={statusBarStyle} {...props} />;
};
