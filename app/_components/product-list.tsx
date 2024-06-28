import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import ProductCard from '@/app/_components/product-card';

interface ProductListProps {
  sourceList?: any[]; // Thay thế any bằng kiểu dữ liệu chính xác của sourceList nếu có
}

const ProductList: React.FC<ProductListProps> = ({ sourceList = [] }) => {
  const [mode, setMode] = useState(false);

  const handleSwitchGrid = () => {
    setMode(!mode);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSwitchGrid}>
        <Ionicons
          name={mode ? 'grid-outline' : 'grid'}
          size={24}
          color="#FF8D4D"
        />
      </TouchableOpacity>
      <View style={styles.productContainer}>
        {sourceList.map((item, index) => (
          <ProductCard key={index} modeRow={mode} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    gap: 8,
  },
  productContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
});

export default ProductList;
