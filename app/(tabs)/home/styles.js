import { Platform, StatusBar, StyleSheet } from 'react-native';
import Images from '@/assets/images';

export const banners = [
  { img: Images.BannerHomepage, key: '1' },
  { img: Images.BannerHomepage, key: '2' },
  { img: Images.BannerHomepage, key: '3' },
];

export const styles = StyleSheet.create({
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
    paddingTop:
      Platform.OS === 'ios'
        ? StatusBar.currentHeight + 50
        : StatusBar.currentHeight + 20,
    justifyContent: 'space-between',
    zIndex: 1,
  },
  searchInput: {
    flex: 1,
    height: 36,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    paddingHorizontal: 30,
    marginRight: 10,
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
  image: {
    height: 225,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
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
