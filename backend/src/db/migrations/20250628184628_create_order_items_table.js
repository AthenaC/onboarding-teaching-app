/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('order_items', (table) => {
    table.increments('id').primary();
    table.integer('order_id').references('id').inTable('orders').notNullable();
    table.integer('product_id').references('id').inTable('products').notNullable();
    table.integer('quantity').notNullable();
    table.decimal('price', 10, 2).notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('order_items');
};
