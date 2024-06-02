import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Page from "./index";
import Signup from "./Signup";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="index"
        screenOptions={{
          headerShown: false, // Ẩn header mặc định của Stack Navigator
          gestureEnabled: true, // Cho phép sử dụng các gesture để chuyển đổi màn hình
          ...TransitionPresets.SlideFromRightIOS, // Sử dụng animation slide từ phải sang trái
        }}
      >
        <Stack.Screen name="index" component={Page} />
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
