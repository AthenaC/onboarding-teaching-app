import { Product, Order, OrderItem } from '../types';

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    description: "High-quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.",
    price: 89.99,
    image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 2,
    name: "Smartphone Case",
    description: "Durable protective case for iPhone and Android phones with shock absorption. Available in multiple colors.",
    price: 24.99,
    image_url: "https://images.unsplash.com/photo-1603313011108-4f2d0b4b4b4b?w=400",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 3,
    name: "Portable Power Bank",
    description: "10000mAh portable charger with fast charging for phones and tablets. Compact and lightweight design.",
    price: 39.99,
    image_url: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=400",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 4,
    name: "Wireless Mouse",
    description: "Ergonomic wireless mouse with precision tracking and long battery life. Perfect for work and gaming.",
    price: 29.99,
    image_url: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 5,
    name: "USB-C Cable",
    description: "High-speed USB-C cable for fast charging and data transfer. Compatible with all modern devices.",
    price: 12.99,
    image_url: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 6,
    name: "Laptop Stand",
    description: "Adjustable aluminum laptop stand for better ergonomics and cooling. Fits laptops up to 17 inches.",
    price: 49.99,
    image_url: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 7,
    name: "Webcam",
    description: "1080p HD webcam with built-in microphone for video calls and streaming. Auto-focus and noise cancellation.",
    price: 79.99,
    image_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 8,
    name: "Mechanical Keyboard",
    description: "RGB mechanical keyboard with customizable switches and backlighting. Perfect for typing and gaming.",
    price: 129.99,
    image_url: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  }
];

export const mockOrders: Order[] = [
  {
    id: 1,
    user_id: 1,
    total_amount: 154.98,
    status: "delivered",
    created_at: "2024-06-15T10:30:00Z",
    updated_at: "2024-06-17T14:20:00Z"
  },
  {
    id: 2,
    user_id: 1,
    total_amount: 89.99,
    status: "shipped",
    created_at: "2024-06-20T09:15:00Z",
    updated_at: "2024-06-22T11:45:00Z"
  },
  {
    id: 3,
    user_id: 1,
    total_amount: 259.97,
    status: "processing",
    created_at: "2024-06-25T16:45:00Z",
    updated_at: "2024-06-25T16:45:00Z"
  },
  {
    id: 4,
    user_id: 1,
    total_amount: 42.98,
    status: "delivered",
    created_at: "2024-06-10T13:20:00Z",
    updated_at: "2024-06-12T10:30:00Z"
  },
  {
    id: 5,
    user_id: 1,
    total_amount: 179.98,
    status: "cancelled",
    created_at: "2024-06-18T11:00:00Z",
    updated_at: "2024-06-19T09:30:00Z"
  }
];

export const mockOrderItems: OrderItem[] = [
  // Order 1 - Headphones + Power Bank
  {
    id: 1,
    order_id: 1,
    product_id: 1,
    quantity: 1,
    price: 89.99
  },
  {
    id: 2,
    order_id: 1,
    product_id: 3,
    quantity: 1,
    price: 39.99
  },
  {
    id: 3,
    order_id: 1,
    product_id: 5,
    quantity: 2,
    price: 12.99
  },
  
  // Order 2 - Just Headphones
  {
    id: 4,
    order_id: 2,
    product_id: 1,
    quantity: 1,
    price: 89.99
  },
  
  // Order 3 - Multiple items
  {
    id: 5,
    order_id: 3,
    product_id: 8,
    quantity: 1,
    price: 129.99
  },
  {
    id: 6,
    order_id: 3,
    product_id: 7,
    quantity: 1,
    price: 79.99
  },
  {
    id: 7,
    order_id: 3,
    product_id: 6,
    quantity: 1,
    price: 49.99
  },
  
  // Order 4 - Small items
  {
    id: 8,
    order_id: 4,
    product_id: 2,
    quantity: 1,
    price: 24.99
  },
  {
    id: 9,
    order_id: 4,
    product_id: 5,
    quantity: 1,
    price: 12.99
  },
  {
    id: 10,
    order_id: 4,
    product_id: 4,
    quantity: 1,
    price: 29.99
  },
  
  // Order 5 - Cancelled order
  {
    id: 11,
    order_id: 5,
    product_id: 8,
    quantity: 1,
    price: 129.99
  },
  {
    id: 12,
    order_id: 5,
    product_id: 6,
    quantity: 1,
    price: 49.99
  }
];

// Helper function to get order items for a specific order
export const getOrderItems = (orderId: number): OrderItem[] => {
  return mockOrderItems.filter(item => item.order_id === orderId);
};

// Helper function to get product details for an order item
export const getProductForOrderItem = (productId: number): Product | undefined => {
  return mockProducts.find(product => product.id === productId);
}; 