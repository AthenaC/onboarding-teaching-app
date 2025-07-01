import db from "../db/database";

class Order {
    constructor(
        public id: number,
        public user_id: number,
        public order_items: any[],
        public total_amount: number,
        public status: string
    ) {
        this.id = id;
        this.user_id = user_id;
        this.order_items = order_items;
        this.total_amount = total_amount;
        this.status = status;
    }

    static async create(order: Order): Promise<Order> {
        const [id] = await db('orders').insert(order).returning('id');
        return new Order(id, order.user_id, order.order_items, order.total_amount, order.status);
    }

    static async findById(id: number): Promise<Order | null> {
        const order = await db('orders').where('id', id).first();
        return order ? new Order(order.id, order.user_id, order.order_items, order.total_amount, order.status) : null;
    }

    static async findAll(): Promise<Order[]> {
        const orders = await db('orders').select('*');
        return orders.map(order => new Order(order.id, order.user_id, order.order_items, order.total_amount, order.status));
    }

    static async update(id: number, order: Order): Promise<Order> {
        const [updatedOrder] = await db('orders').where('id', id).update(order).returning('*');
        return new Order(updatedOrder.id, updatedOrder.user_id, updatedOrder.order_items, updatedOrder.total_amount, updatedOrder.status);
    }

    static async delete(id: number): Promise<void> {
        await db('orders').where('id', id).delete();
    }   
}

export default Order;