import React from 'react';
import {
  View,
  ActivityIndicator,
  Dimensions,
  Platform,
  Modal,
  StyleSheet,
  ViewStyle,
} from 'react-native';

interface LoaderCustomProps {
  isLoading: boolean;
  visible: boolean;
}

const LoaderCustom: React.FC<LoaderCustomProps> = ({ isLoading, visible }) => {
  const osName = Platform.OS;
  const screenHeight = Dimensions.get('screen').height;

  if (!isLoading) return null;

  return (
    <Modal transparent animationType="none" visible={visible}>
      <View style={[styles.modalBackground, { height: screenHeight }]}>
        <ActivityIndicator
          animating={isLoading}
          color="#FF8D4D"
          size={osName === 'ios' ? 'large' : 50}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoaderCustom;
