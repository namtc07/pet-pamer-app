import { Tabs } from 'expo-router';
import { useBackHandler } from '@react-native-community/hooks'; // Import useBackHandler hook
import { Platform } from 'react-native';
import SvgIcon from '@/assets/svgs';

const tabScreens = [
  {
    name: 'home/home',
    title: 'Home',
    IconFill: SvgIcon.IconHomeFillColor,
    Icon: SvgIcon.IconHome,
  },
  {
    name: 'categories/index',
    title: 'Categories',
    IconFill: SvgIcon.IconCategoriesFillColor,
    Icon: SvgIcon.IconCategories,
  },
  {
    name: 'orders/index',
    title: 'Orders',
    IconFill: SvgIcon.IconOrdersFillColor,
    Icon: SvgIcon.IconOrders,
  },
  {
    name: 'chat/index',
    title: 'Chat',
    IconFill: SvgIcon.IconChatFillColor,
    Icon: SvgIcon.IconChat,
  },
  {
    name: 'account/index',
    title: 'Account',
    IconFill: SvgIcon.IconAccountFillColor,
    Icon: SvgIcon.IconAccount,
  },
];

function TabsLayout() {
  useBackHandler(() => true); // Always return true to prevent default back behavior

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FF8D4D',
      }}
    >
      {tabScreens.map(({ name, title, IconFill, Icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            headerShown: false,
            gestureEnabled: false,
            tabBarIcon: ({ focused }) => (focused ? <IconFill /> : <Icon />),
            tabBarLabelStyle: {
              fontFamily: 'Exo-Bold',
            },
            tabBarStyle: {
              ...Platform.select({
                android: {
                  paddingVertical: 5,
                  paddingBottom: 5,
                  height: 55,
                },
              }),
            },
          }}
        />
      ))}
    </Tabs>
  );
}

export default TabsLayout;
