import { Tabs } from 'expo-router';
import { useBackHandler } from '@react-native-community/hooks'; // Import useBackHandler hook
import SvgIcon from '@/assets/svgs';

const tabScreens = [
  {
    name: 'home/home',
    title: 'Home',
    IconFill: SvgIcon.IconHomeFillColor,
    Icon: SvgIcon.IconHome,
  },
  {
    name: 'categories/categories',
    title: 'Categories',
    IconFill: SvgIcon.IconCategoriesFillColor,
    Icon: SvgIcon.IconCategories,
  },
  {
    name: 'orders/orders',
    title: 'Orders',
    IconFill: SvgIcon.IconOrdersFillColor,
    Icon: SvgIcon.IconOrders,
  },
  {
    name: 'chat/chat',
    title: 'Chat',
    IconFill: SvgIcon.IconChatFillColor,
    Icon: SvgIcon.IconChat,
  },
  {
    name: 'account/account',
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
          }}
        />
      ))}
    </Tabs>
  );
}

export default TabsLayout;
