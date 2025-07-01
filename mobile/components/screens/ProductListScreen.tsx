import React from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { ProductCard } from '../ui/ProductCard';
import { useProducts } from '../../hooks/useProducts';
import { Product } from '../../types';
import { Colors } from '../../constants/colors';

interface ProductListScreenProps {
  onProductPress: (product: Product) => void;
}

export const ProductListScreen: React.FC<ProductListScreenProps> = ({ onProductPress }) => {
  const { products, loading, error } = useProducts();

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard product={item} onPress={onProductPress} />
        )}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContainer: {
    padding: 8,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: Colors.text.secondary,
  },
  errorText: {
    fontSize: 16,
    color: Colors.error,
    textAlign: 'center',
    padding: 20,
  },
}); 