import knex from 'knex';
// @ts-ignore
const knexConfig = require('../../knexfile');

const environment = process.env.NODE_ENV || 'development';
const config = knexConfig[environment as keyof typeof knexConfig];

export default knex(config);