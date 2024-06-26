import React, { useCallback, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  ImageBackground,
  RefreshControl,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Icon from 'react-native-vector-icons/Ionicons';
import { StatusbarCustom } from '@/components';
import ButtonBlockCustom from '@/app/_components/menu-tab-block';
import DatePicker from '@/app/_components/date-picker';
import { createBackgroundColorInterpolation, fadeIn, fadeOut } from './helpers';
import { banners, styles } from './styles';
import SvgIcon from '@/assets/svgs';

function HomeScreen() {
  const { width } = Dimensions.get('window');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [iconColor, setIconColor] = useState('#ffffff');
  const [colorStatus, setColorStatus] = useState('light');
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scrollY = useRef(new Animated.Value(0)).current;

  const backgroundColor = createBackgroundColorInterpolation(scrollY);

  const handleScroll = (event) => {
    const { y } = event.nativeEvent.contentOffset;
    scrollY.setValue(y);

    if (y < 0) {
      fadeOut(fadeAnim);
      setColorStatus('dark');
    } else if (y > 10) {
      fadeIn(fadeAnim);
      setIconColor('#000000');
      setColorStatus('dark');
    } else {
      fadeIn(fadeAnim);
      setIconColor('#ffffff');
      setColorStatus('light');
    }
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const menuTabs = [
    {
      title: 'Service',
      icon: <SvgIcon.IconService />,
    },
    {
      title: 'Products',
      icon: <SvgIcon.IconProducts />,
    },
    {
      title: 'My pets',
      icon: <SvgIcon.IconCamera />,
    },
  ];

  return (
    <View style={styles.container}>
      <StatusbarCustom color={colorStatus} />
      <Animated.View style={[styles.header, { backgroundColor }]}>
        <Animated.View
          style={{
            opacity: fadeAnim,
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Icon
            name="search-outline"
            size={16}
            color="#999"
            style={styles.searchIcon}
          />
          <TextInput
            clearButtonMode="while-editing"
            style={styles.searchInput}
            placeholder="Tìm kiếm sản phẩm, dịch vụ,..."
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.icon}>
            <Icon name="cart-outline" size={24} color={iconColor} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon}>
            <Icon name="notifications-outline" size={24} color={iconColor} />
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
      <ScrollView
        onScroll={handleScroll}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            progressBackgroundColor="#FF8D4D"
            tintColor="#FF8D4D"
            title="Loading..."
            titleColor="#FF8D4D"
            colors={['white']}
          />
        }
      >
        <View style={styles.carouselContainer}>
          <Carousel
            loop
            width={width}
            height={width / 2}
            autoPlay
            autoPlayInterval={5000}
            data={banners}
            keyExtractor={(item) => item.key}
            scrollAnimationDuration={1000}
            onSnapToItem={(index) => setCurrentIndex(index)}
            renderItem={({ item }) => (
              <View style={styles.imageContainer} key={item.key}>
                <ImageBackground
                  source={item.img}
                  resizeMode="cover"
                  style={styles.image}
                />
              </View>
            )}
            panGestureHandlerProps={{
              activeOffsetX: [-10, 10],
            }}
          />
          <View style={styles.pagination}>
            {banners.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  currentIndex === index
                    ? styles.activeDot
                    : styles.inactiveDot,
                ]}
              />
            ))}
          </View>
          <View style={styles.menuTabBLock}>
            <ButtonBlockCustom mode="multi" source={menuTabs} />
          </View>
        </View>
        <View>
          <DatePicker />
        </View>
      </ScrollView>
    </View>
  );
}

export default HomeScreen;
