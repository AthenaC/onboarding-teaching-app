import { Request, Response } from 'express';
import User from '../models/User';

export const createUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = new User(0, '', email, password);
        const newUser = await User.create(user);
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
    }
}

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await User.findById(Number(id));
        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { email, password } = req.body;
        const user = new User(Number(id), '', email, password);
        const updatedUser = await User.update(Number(id), user);
        res.json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
    }
}   

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await User.delete(Number(id));
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting user:', error);
    }
}