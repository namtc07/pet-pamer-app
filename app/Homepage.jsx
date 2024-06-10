import React, { useCallback, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  ImageBackground,
  Platform,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Icon from 'react-native-vector-icons/Ionicons';
import { Images } from '../assets/images';
import { StatusbarCustom } from './components/StatusbarCustom';
import { Button } from 'react-native';

const data = [
  { img: Images.BannerHomepage, key: '1' },
  { img: Images.BannerHomepage, key: '2' },
  { img: Images.BannerHomepage, key: '3' },
];

function Homepage() {
  const width = Dimensions.get('window').width;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [headerBackground, setHeaderBackground] = useState('transparent');
  const [iconColor, setIconColor] = useState('#ffffff');
  const [colorStatus, setColorStatus] = useState('light');

  const fadeAnim = useRef(new Animated.Value(1)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 50,
      useNativeDriver: true,
    }).start();
  };

  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;

    if (scrollY < 0) {
      fadeOut();
      setColorStatus('dark');
    } else if (scrollY > 10) {
      fadeIn();
      setHeaderBackground('#ffffff');
      setIconColor('#000000');
      setColorStatus('dark');
    } else {
      fadeIn();
      setHeaderBackground('transparent');
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

  return (
    <View style={styles.container}>
      <StatusbarCustom color={colorStatus} />
      <Animated.View
        style={[
          styles.header,
          {
            opacity: fadeAnim,
          },
          { backgroundColor: headerBackground },
        ]}
      >
        <TextInput style={styles.searchInput} placeholder="Search" placeholderTextColor="#999" />
        <TouchableOpacity style={styles.icon}>
          <Icon name="cart-outline" size={30} color={iconColor} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Icon name="notifications-outline" size={30} color={iconColor} />
        </TouchableOpacity>
      </Animated.View>

      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.bannerContainer}>
          <View style={styles.carouselContainer}>
            <Carousel
              loop
              width={width}
              height={width / 2}
              autoPlay={true}
              autoPlayInterval={2000}
              data={data}
              keyExtractor={(item) => item.key}
              scrollAnimationDuration={1000}
              onSnapToItem={(index) => setCurrentIndex(index)}
              renderItem={({ item }) => (
                <View style={styles.imageContainer} key={item?.key}>
                  <ImageBackground source={item?.img} resizeMode="cover" style={styles.image} />
                </View>
              )}
              panGestureHandlerProps={{
                activeOffsetX: [-10, 10],
              }}
            />
            <View style={styles.pagination}>
              {data.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    currentIndex === index ? styles.activeDot : styles.inactiveDot,
                  ]}
                />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default Homepage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight + 50 : StatusBar.currentHeight + 20,
    justifyContent: 'space-between',
    zIndex: 1,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  icon: {
    padding: 10,
  },
  bannerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingBottom: 20,
  },
  carouselContainer: {
    overflow: 'hidden',
  },
  imageContainer: {},
  image: {
    height: 225,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#FF8D4D',
    width: 20,
  },
  inactiveDot: {
    backgroundColor: '#CBCBCB',
  },
});
