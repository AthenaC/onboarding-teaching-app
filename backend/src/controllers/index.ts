// Controllers will be added here
// Example: userController, productController, etc. 

// Export all product controller functions
export {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from './productController';

// Export all user controller functions
export {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} from './userController';
    
// Export all order controller functions
export { createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder } from './orderController';
