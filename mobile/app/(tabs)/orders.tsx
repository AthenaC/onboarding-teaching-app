import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Colors } from '../../constants/colors';
import { useOrders } from '../../hooks/useOrders';
import { Order } from '../../types';

const OrderCard = ({ order }: { order: Order }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return '#4CAF50';
      case 'shipped': return '#2196F3';
      case 'processing': return '#FF9800';
      case 'cancelled': return '#F44336';
      default: return Colors.text.secondary;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <TouchableOpacity style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderId}>Order #{order.id}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
          <Text style={styles.statusText}>{order.status.toUpperCase()}</Text>
        </View>
      </View>
      
      <View style={styles.orderDetails}>
        <Text style={styles.orderDate}>Ordered: {formatDate(order.created_at)}</Text>
        <Text style={styles.orderTotal}>Total: ${order.total_amount.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function OrdersScreen() {
  const { orders, loading, error } = useOrders();

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Loading orders...</Text>
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
      <Text style={styles.title}>Order History</Text>
      {orders.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No orders yet</Text>
          <Text style={styles.emptySubtext}>Your orders will appear here</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <OrderCard order={item} />}
          contentContainerStyle={styles.ordersList}
          showsVerticalScrollIndicator={false}
        />
      )}
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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.text.primary,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: Colors.text.secondary,
  },
  errorText: {
    fontSize: 16,
    color: '#F44336',
    textAlign: 'center',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: Colors.text.secondary,
  },
  ordersList: {
    paddingBottom: 20,
  },
  orderCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderDate: {
    fontSize: 14,
    color: Colors.text.secondary,
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
  },
}); 