// Format price to currency
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

// Format date to readable string
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Truncate text to specified length
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

// Calculate total price for cart items
export const calculateTotal = (items: Array<{ price: number; quantity: number }>): number => {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
}; 