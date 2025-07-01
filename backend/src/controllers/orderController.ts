import { Request, Response } from 'express';
import Order from '../models/Order';

export const createOrder = async (req: Request, res: Response) => {
    try {
        const { user_id, total_amount, status } = req.body;
        const order = new Order(0, user_id, [], total_amount, status);
        const newOrder = await Order.create(order);
        res.status(201).json(order);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Failed to create order' });
    }
};

export const getAllOrders = async (req: Request, res: Response) => {
    try {
        const orders = await Order.findAll();
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
};

export const getOrderById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(Number(id));
        res.json(order);
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ error: 'Failed to fetch order' });
    }
};

export const updateOrder = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { user_id, total_amount, status } = req.body;
        const order = new Order(Number(id), user_id, [], total_amount, status);
        const updatedOrder = await Order.update(Number(id), order);
        res.json(updatedOrder);
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ error: 'Failed to update order' });
    }
};

export const deleteOrder = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await Order.delete(Number(id));
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ error: 'Failed to delete order' });
    }
};