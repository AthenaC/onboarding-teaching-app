// Product types matching backend schema
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  created_at: string;
  updated_at: string;
}

// User types matching backend schema
export interface User {
  id: number;
  email: string;
  password: string;
  created_at: string;
  updated_at: string;
}

// Order types matching backend schema
export interface Order {
  id: number;
  user_id: number;
  total_amount: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
}

// Frontend specific types
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

// Navigation types
export type RootStackParamList = {
  Home: undefined;
  ProductDetail: { product: Product };
  Cart: undefined;
  Orders: undefined;
  Profile: undefined;
}; 