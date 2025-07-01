import { Request, Response } from 'express';
import Product from '../models/Product';

// GET all products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// GET single product by ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(Number(id));
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

// POST create new product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, image_url } = req.body;
    // Basic validation
    if (!name || !price) {
      return res.status(400).json({ error: 'Name and price are required' });
    }
    const product = new Product(0, name, description, price, image_url);
    const newProduct = await Product.create(product);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
};

// PUT update product
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, price, image_url } = req.body;
    const product = new Product(Number(id), name, description, price, image_url);
    const updatedProduct = await Product.update(Number(id), product);
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
};

// DELETE product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Product.delete(Number(id));
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
};
