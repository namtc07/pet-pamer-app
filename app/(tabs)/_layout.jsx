import { Tabs } from 'expo-router';

function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          borderTopWidth: 1,
          height: 84,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          headerShown: false,
        }}
      />
    </Tabs>
  );
}

export default TabsLayout;
