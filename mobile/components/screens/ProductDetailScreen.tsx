import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Product } from '../../types';
import { formatPrice } from '../../utils/formatters';
import { Button } from '../ui/Button';
import { Colors } from '../../constants/colors';

interface ProductDetailScreenProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({ 
  product, 
  onAddToCart 
}) => {
  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image_url }} style={styles.image} />
      
      <View style={styles.content}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>{formatPrice(product.price)}</Text>
        
        <Text style={styles.description}>{product.description}</Text>
        
        <View style={styles.buttonContainer}>
          <Button
            title="Add to Cart"
            onPress={() => onAddToCart(product)}
            style={styles.addButton}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: Colors.text.secondary,
    lineHeight: 24,
    marginBottom: 24,
  },
  buttonContainer: {
    marginTop: 16,
  },
  addButton: {
    width: '100%',
  },
}); 