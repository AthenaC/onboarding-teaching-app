import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../context/CartContext';

export default function TabLayout() {
  const { state } = useCart();
  const itemCount = state.items.reduce((total, item) => total + item.quantity, 0);
  
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Products',
          tabBarLabel: 'Products',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="grid-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarLabel: 'Cart',
          tabBarBadge: itemCount > 0 ? itemCount : undefined,
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="cart-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          tabBarLabel: 'Orders',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="list-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
