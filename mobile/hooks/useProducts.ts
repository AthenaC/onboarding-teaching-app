import { useState, useEffect } from 'react';
import { Product } from '../types';
import { getAllProducts, getProduct } from '../adapters/product-adapter';
import { mockProducts } from '../utils/mockData';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

    const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate a small delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProducts(mockProducts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const fetchProductById = async (id: number): Promise<Product | null> => {
    try {
      // Find product in mock data
      const product = mockProducts.find(p => p.id === id);
      if (product) {
        return product;
      } else {
        setError('Product not found');
        return null;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
    fetchProductById,
  };
}; 