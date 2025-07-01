import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Product } from '../../types';
import { formatPrice, truncateText } from '../../utils/formatters';
import { Colors } from '../../constants/colors';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  const { state, dispatch } = useCart();
  
  const cartItem = state.items.find(item => item.product.id === product.id);
  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const handleRemoveFromCart = () => {
    dispatch({ type: 'REMOVE_ITEM', payload: product.id });
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      dispatch({ 
        type: 'UPDATE_QUANTITY', 
        payload: { productId: product.id, quantity: quantity - 1 } 
      });
    } else {
      handleRemoveFromCart();
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(product)}
      activeOpacity={0.7}
    >
      <Image source={{ uri: product.image_url }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{truncateText(product.name, 30)}</Text>
        <Text style={styles.description}>
          {truncateText(product.description, 60)}
        </Text>
        <Text style={styles.price}>{formatPrice(product.price)}</Text>
        
        <View style={styles.cartControls}>
          {quantity === 0 ? (
            <TouchableOpacity 
              style={styles.addButton} 
              onPress={handleAddToCart}
              activeOpacity={0.7}
            >
              <Text style={styles.addButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.quantityControls}>
              <TouchableOpacity 
                style={styles.quantityButton} 
                onPress={handleDecreaseQuantity}
                activeOpacity={0.7}
              >
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              
              <View style={styles.quantityDisplay}>
                <Text style={styles.quantityText}>{quantity}</Text>
              </View>
              
              <TouchableOpacity 
                style={styles.quantityButton} 
                onPress={handleAddToCart}
                activeOpacity={0.7}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.removeButton} 
                onPress={handleRemoveFromCart}
                activeOpacity={0.7}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    margin: 8,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 12,
    lineHeight: 20,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 12,
  },
  cartControls: {
    marginTop: 8,
  },
  addButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantityButton: {
    backgroundColor: Colors.primary,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityDisplay: {
    backgroundColor: Colors.background,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    minWidth: 40,
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  removeButton: {
    backgroundColor: '#F44336',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  removeButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
}); 