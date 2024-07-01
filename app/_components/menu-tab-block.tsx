import Text from '@/components/TextCustom';
import React from 'react';
import {
  Platform,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';

interface Tab {
  icon: React.ReactNode; // Assuming icon is a React component or element
  title: string;
}

interface MenuTabBlockProps {
  mode?: 'single' | 'multi';
  icon?: React.ReactNode;
  title?: string;
  source?: Tab[];
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'relative',
    ...Platform.select({
      ios: {},
      android: {
        gap: 12,
      },
    }),
  },
  tabContainer: {
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 40,
    alignItems: 'center',
  },
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 40,
    backgroundColor: 'white',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  iconContainer: {
    width: 24,
    height: 24,
  },
  title: {
    color: '#FF8D4D',
    fontFamily: 'Exo-Bold',
    marginLeft: 8,
  },
});

const MenuTabBlock: React.FC<MenuTabBlockProps> = ({
  icon,
  title,
  source,
  mode = 'single',
}) => {
  const renderTab = (tab: Tab, index: number) => (
    <View key={index} style={styles.tabContainer}>
      <View style={styles.tabContent}>
        <View style={styles.iconContainer}>{tab?.icon}</View>
        <Text style={styles.title}>{tab?.title}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' ? (
        mode === 'multi' ? (
          source?.map((tab, index) => (
            <TouchableOpacity key={index} style={styles.tabContainer}>
              {renderTab(tab, index)}
            </TouchableOpacity>
          ))
        ) : (
          <TouchableOpacity style={styles.tabContainer}>
            <View style={styles.tabContent}>
              <View style={styles.iconContainer}>{icon}</View>
              <Text style={styles.title}>{title}</Text>
            </View>
          </TouchableOpacity>
        )
      ) : mode === 'multi' ? (
        source?.map((tab, index) => (
          <TouchableNativeFeedback
            key={index}
            background={TouchableNativeFeedback.Ripple('#000', false)}
          >
            {renderTab(tab, index)}
          </TouchableNativeFeedback>
        ))
      ) : (
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple('#000', false)}
        >
          <View style={styles.tabContainer}>
            <View style={styles.tabContent}>
              <View style={styles.iconContainer}>{icon}</View>
              <Text style={styles.title}>{title}</Text>
            </View>
          </View>
        </TouchableNativeFeedback>
      )}
    </View>
  );
};

export default MenuTabBlock;
