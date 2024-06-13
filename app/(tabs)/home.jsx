import React, { useCallback, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  ImageBackground,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Icon from 'react-native-vector-icons/Ionicons';
import { Images } from '../../assets/images';
import { StatusbarCustom } from '../../components/StatusbarCustom';

const data = [
  { img: Images.BannerHomepage, key: '1' },
  { img: Images.BannerHomepage, key: '2' },
  { img: Images.BannerHomepage, key: '3' },
];

function Home() {
  const width = Dimensions.get('window').width;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [iconColor, setIconColor] = useState('#ffffff');
  const [colorStatus, setColorStatus] = useState('light');

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scrollY = useRef(new Animated.Value(0)).current;

  const backgroundColor = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)'],
    extrapolate: 'clamp',
  });

  const handleScroll = (event) => {
    const y = event.nativeEvent.contentOffset.y;
    scrollY.setValue(y);

    if (y < 0) {
      fadeOut();
      setColorStatus('dark');
    } else if (y > 10) {
      fadeIn();
      setIconColor('#000000');
      setColorStatus('dark');
    } else {
      fadeIn();
      setIconColor('#ffffff');
      setColorStatus('light');
    }
  };

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 30,
      useNativeDriver: true,
    }).start();
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
            backgroundColor,
          },
        ]}
      >
        <Animated.View
          style={{ opacity: fadeAnim, flex: 1, flexDirection: 'row', alignItems: 'center' }}
        >
          <Icon name="search-outline" size={16} color="#999" style={styles.searchIcon} />
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
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            enabled={true}
            progressBackgroundColor="#FF8D4D"
            tintColor="#FF8D4D"
            title="Loading..."
            titleColor="#FF8D4D"
            colors={['white']}
          />
        }
      >
        <View style={styles.bannerContainer}>
          <View style={styles.carouselContainer}>
            <Carousel
              loop
              width={width}
              height={width / 2}
              autoPlay={true}
              autoPlayInterval={3000}
              data={data}
              keyExtractor={(item) => item.key}
              scrollAnimationDuration={1000}
              onSnapToItem={(index) => setCurrentIndex(index)}
              pagingEnabled={true}
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

export default Home;

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
    height: 36,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
    paddingLeft: 30,
  },
  searchIcon: {
    position: 'absolute',
    top: 14,
    left: 8,
    zIndex: 1,
  },
  icon: {
    padding: 10,
  },
  bannerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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
    position: 'absolute',
    bottom: 15,
    alignSelf: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#FF8D4D',
    width: 15,
  },
  inactiveDot: {
    backgroundColor: '#CBCBCB',
  },
});
