import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatters';
import { Button } from '../ui/Button';
import { Colors } from '../../constants/colors';

export const CartScreen: React.FC = () => {
  const { state, dispatch } = useCart();

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      dispatch({ type: 'REMOVE_ITEM', payload: productId });
    } else {
      dispatch({ 
        type: 'UPDATE_QUANTITY', 
        payload: { productId, quantity: newQuantity } 
      });
    }
  };

  const renderCartItem = ({ item }: { item: any }) => (
    <View style={styles.cartItem}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.product.name}</Text>
        <Text style={styles.itemPrice}>{formatPrice(item.product.price)}</Text>
      </View>
      
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => updateQuantity(item.product.id, item.quantity - 1)}
        >
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        
        <Text style={styles.quantity}>{item.quantity}</Text>
        
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => updateQuantity(item.product.id, item.quantity + 1)}
        >
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <>
    <StatusBar backgroundColor={Colors.background} barStyle="dark-content" />
    <View style={styles.container}>
      {state.items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your cart is empty</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={state.items}
            keyExtractor={(item) => item.product.id.toString()}
            renderItem={renderCartItem}
            contentContainerStyle={styles.listContainer}
            />
          
          <View style={styles.footer}>
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalAmount}>{formatPrice(state.total)}</Text>
            </View>
            
            <Button
              title="Checkout"
              onPress={() => {
                // Handle checkout logic
              }}
              style={styles.checkoutButton}
              />
          </View>
        </>
      )}
    </View>
      </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: Colors.text.secondary,
  },
  listContainer: {
    padding: 16,
  },
  cartItem: {
    backgroundColor: Colors.surface,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: Colors.text.secondary,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantity: {
    marginHorizontal: 16,
    fontSize: 16,
    fontWeight: '600',
    minWidth: 20,
    textAlign: 'center',
  },
  footer: {
    padding: 16,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  checkoutButton: {
    width: '100%',
  },
}); 