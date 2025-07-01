/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('orders', (table) => {
    table.increments('id').primary();
    table.integer('user_id').references('id').inTable('users').notNullable();
    table.decimal('total_amount', 10, 2).notNullable();
    table.string('status').notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('orders');
};
