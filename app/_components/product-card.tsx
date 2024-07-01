import React from 'react';
import { Image, Platform, StyleSheet, View } from 'react-native';
import Images from '@/assets/images';
import Svgs from '@/assets/svgs';
import Text from '@/components/TextCustom';

interface ProductCardProps {
  modeRow?: boolean;
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    borderRadius: 12,
    backgroundColor: 'white',
    gap: 8,
    paddingHorizontal: 6,
    paddingVertical: 6,
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
  containerRow: {
    height: 159,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  containerColumn: {
    width: '48%',
    flexDirection: 'column',
  },
  content: {
    flex: 1,
    gap: 8,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageProduct: {
    width: 147,
    height: 147,
    borderRadius: 12,
  },
  textContainer: {
    flex: 1,
    display: 'flex',
  },
  textPrimary: {
    color: '#5A2828',
    fontFamily: 'Exo-Bold',
    fontSize: 12,
    lineHeight: 18,
  },
  textSecondary: {
    color: '#5A2828',
    fontSize: 12,
  },
  priceContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  priceCurrent: {
    color: '#FF8D4D',
    fontSize: 16,
    fontFamily: 'Exo-Bold',
  },
  priceOld: {
    color: '#979797',
    fontSize: 10,
    textDecorationLine: 'line-through',
  },
  discountContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  discountText: {
    position: 'absolute',
    color: '#fff',
    fontSize: 10,
    textAlign: 'center',
  },
  ratingContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 6,
  },
  ratingTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    fontSize: 10,
  },
  ratingStar: {
    paddingTop: 1,
  },
  ratingText: {
    color: '#979797',
    fontSize: 10,
  },
  separator: {
    color: '#979797',
    fontSize: 10,
  },
});

const ProductCard: React.FC<ProductCardProps> = ({ modeRow }) => {
  return (
    <View
      style={[
        styles.container,
        modeRow ? styles.containerRow : styles.containerColumn,
      ]}
    >
      <View style={styles.imageContainer}>
        <Image style={styles.imageProduct} source={Images.ProductCard} />
      </View>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.textPrimary} children="Brit Care" />
          <Text
            style={styles.textSecondary}
            lines={2}
            children="Wet cat food salmon & herring supper puppies & adults"
          />
        </View>
        <View style={styles.priceContainer}>
          <View style={styles.priceTextContainer}>
            <Text style={styles.priceCurrent} children="$18" />
            <Text style={styles.priceOld} children="$20" />
          </View>
          <View style={styles.discountContainer}>
            <Svgs.ZigzagTag />
            <Text style={styles.discountText} children="Giảm 100%" />
          </View>
        </View>
        <View style={styles.ratingContainer}>
          <View style={styles.ratingTextContainer}>
            <View style={styles.ratingStar}>
              <Svgs.IconStart />
            </View>
            <Text style={styles.ratingText} children="4.8" />
          </View>
          <Text style={styles.separator} children="|" />
          <Text style={styles.ratingText} children="1,6k sold" />
        </View>
      </View>
    </View>
  );
};

export default ProductCard;
