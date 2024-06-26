import { Tabs } from 'expo-router';

function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: '#FFA001',
        // tabBarInactiveTintColor: '#CDCDE0',
        // tabBarShowLabel: false,
        tabBarStyle: {
          // backgroundColor: '#161622',
          borderTopWidth: 1,
          // borderTopColor: '#232533',
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

export default TabLayout;
