import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Page from './index';
import Signup from './Signup';
import Login from './Login';
import Homepage from './Homepage';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Homepage"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen name="index" component={Page} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Homepage" component={Homepage} />
    </Stack.Navigator>
  );
}
