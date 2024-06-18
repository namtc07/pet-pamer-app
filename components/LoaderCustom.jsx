import { View, ActivityIndicator, Dimensions, Platform, Modal } from 'react-native';

const LoaderCustom = ({ isLoading, visible }) => {
  const osName = Platform.OS;
  const screenHeight = Dimensions.get('screen').height;

  if (!isLoading) return null;

  return (
    <Modal transparent={true} animationType="none" visible={visible}>
      <View
        className="absolute flex justify-center items-center w-full h-full bg-primary/40 z-10"
        style={{
          height: screenHeight,
        }}
      >
        <ActivityIndicator
          animating={isLoading}
          color="#FF8D4D"
          size={osName === 'ios' ? 'large' : 50}
        />
      </View>
    </Modal>
  );
};

export default LoaderCustom;
