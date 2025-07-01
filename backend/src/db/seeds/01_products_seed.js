/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('products').del();

  // Inserts seed entries
  await knex('products').insert([
    {
      name: 'Wireless Bluetooth Headphones',
      description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life',
      price: 89.99,
      image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'Smartphone Case',
      description: 'Durable protective case for iPhone and Android phones with shock absorption',
      price: 24.99,
      image_url: 'https://images.unsplash.com/photo-1603313011108-4f2d0b4b4b4b?w=400',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'Portable Power Bank',
      description: '10000mAh portable charger with fast charging for phones and tablets',
      price: 39.99,
      image_url: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=400',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'Wireless Mouse',
      description: 'Ergonomic wireless mouse with precision tracking and long battery life',
      price: 29.99,
      image_url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'USB-C Cable',
      description: 'High-speed USB-C cable for fast charging and data transfer',
      price: 12.99,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'Laptop Stand',
      description: 'Adjustable aluminum laptop stand for better ergonomics and cooling',
      price: 49.99,
      image_url: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'Webcam',
      description: '1080p HD webcam with built-in microphone for video calls and streaming',
      price: 79.99,
      image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'Mechanical Keyboard',
      description: 'RGB mechanical keyboard with customizable switches and backlighting',
      price: 129.99,
      image_url: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400',
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
}; 