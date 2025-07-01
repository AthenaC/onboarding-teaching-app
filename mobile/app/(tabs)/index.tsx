import React from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useProducts } from '../../hooks/useProducts';
import { ProductCard } from '../../components/ui/ProductCard';
import { Product } from '../../types';
import { Colors } from '../../constants/colors';
import { useRouter } from 'expo-router';

export default function ProductsScreen() {
  const { products, loading, error } = useProducts();
  const router = useRouter();

  const handleProductPress = (product: Product) => {
    // Product press handler - can be extended for navigation later
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product Store</Text>
      <Text style={styles.subtitle}>Found {products.length} products</Text>
      
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard product={item} onPress={handleProductPress} />
        )}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: Colors.text.primary,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.text.secondary,
    marginBottom: 20,
    textAlign: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.text.secondary,
  },
  errorText: {
    fontSize: 16,
    color: Colors.error,
    textAlign: 'center',
  },
  listContainer: {
    padding: 8,
  },
});
