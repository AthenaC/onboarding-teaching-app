import { useState, useEffect } from 'react';
import { Order, OrderItem } from '../types';
import { mockOrders, mockOrderItems, getProductForOrderItem } from '../utils/mockData';

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate a small delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setOrders(mockOrders);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getOrderById = async (id: number): Promise<Order | null> => {
    try {
      const order = mockOrders.find(o => o.id === id);
      if (order) {
        return order;
      } else {
        setError('Order not found');
        return null;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    }
  };

  const getOrderItems = (orderId: number): OrderItem[] => {
    return mockOrderItems.filter(item => item.order_id === orderId);
  };

  const getOrderWithItems = (orderId: number) => {
    const order = mockOrders.find(o => o.id === orderId);
    const items = getOrderItems(orderId);
    
    if (order) {
      const itemsWithProducts = items.map(item => ({
        ...item,
        product: getProductForOrderItem(item.product_id)
      }));
      
      return {
        order,
        items: itemsWithProducts
      };
    }
    
    return null;
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    orders,
    loading,
    error,
    refetch: fetchOrders,
    getOrderById,
    getOrderItems,
    getOrderWithItems,
  };
}; 