import db from "../db/database";

class User {
    constructor(
        public id: number,
        public name: string,
        public email: string,
        public password: string
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }
    
    static async create(user: User): Promise<User> {
        const [id] = await db('users').insert(user).returning('id');
        return new User(id, user.name, user.email, user.password);
    }

    static async findById(id: number): Promise<User | null> {
        const user = await db('users').where('id', id).first();
        return user ? new User(user.id, user.name, user.email, user.password) : null;
    }
    
    static async findAll(): Promise<User[]> {
        const users = await db('users').select('*');
        return users.map(user => new User(user.id, user.name, user.email, user.password));
    }

    static async update(id: number, user: User): Promise<User> {
        const [updatedUser] = await db('users').where('id', id).update(user).returning('*');
        return new User(updatedUser.id, updatedUser.name, updatedUser.email, updatedUser.password);
    }   

    static async delete(id: number): Promise<void> {
        await db('users').where('id', id).delete();
    }
}

export default User;