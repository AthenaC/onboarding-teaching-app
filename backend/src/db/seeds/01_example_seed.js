/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('examples').del();
  
  // Inserts seed entries
  await knex('examples').insert([
    {
      name: 'Example 1',
      description: 'This is the first example',
      is_active: true,
    },
    {
      name: 'Example 2',
      description: 'This is the second example',
      is_active: true,
    },
  ]);
}; 