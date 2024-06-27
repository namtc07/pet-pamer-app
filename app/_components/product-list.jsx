import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import ProductCard from '@/app/_components/product-card';

function ProductList({ sourceList = [] }) {
  const [mode, setMode] = useState(false);

  const handleSwitchGrid = () => {
    setMode(!mode);
  };

  return (
    <View style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Ionicons
        name={mode ? 'grid-outline' : 'grid'}
        size={24}
        color="#FF8D4D"
        onPress={() => handleSwitchGrid(!mode)}
      />
      <View
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 12,
        }}
      >
        {sourceList.map((item, index) => (
          <ProductCard key={index} modeRow={mode} />
        ))}
      </View>
    </View>
  );
}

export default ProductList;
