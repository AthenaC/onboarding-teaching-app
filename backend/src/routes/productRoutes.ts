 import { Router } from "express";
 import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/productController';

 const router = Router();

 router.route('/').get(getAllProducts);
 router.route('/:id').get(getProductById);
 router.route('/').post(createProduct);
 router.route('/:id').put(updateProduct);
 router.route('/:id').delete(deleteProduct);

 export default router;