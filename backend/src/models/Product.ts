import db from "../db/database";

class Product {
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public price: number,
        public image_url: string
    ) {
        this.id = id;   
        this.name = name;
        this.description = description;
        this.price = price;
        this.image_url = image_url;
    }

    static async create(product: Product): Promise<Product> {
        const [id] = await db('products').insert(product).returning('id');
        return new Product(id, product.name, product.description, product.price, product.image_url);
    }

    static async findById(id: number): Promise<Product | null> {
        const product = await db('products').where('id', id).first();
        return product ? new Product(product.id, product.name, product.description, product.price, product.image_url) : null;
    }

    static async findAll(): Promise<Product[]> {
        const products = await db('products').select('*');
        return products.map(product => new Product(product.id, product.name, product.description, product.price, product.image_url));
    }

    static async update(id: number, product: Product): Promise<Product> {
        const [updatedProduct] = await db('products').where('id', id).update(product).returning('*');
        return new Product(updatedProduct.id, updatedProduct.name, updatedProduct.description, updatedProduct.price, updatedProduct.image_url);
    }

    static async delete(id: number): Promise<void> {
        await db('products').where('id', id).delete();
    }
}

export default Product;