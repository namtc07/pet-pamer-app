import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Page from './index';
import Signup from './Signup';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen name="index" component={Page} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}
