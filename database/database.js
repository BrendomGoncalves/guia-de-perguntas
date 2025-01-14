const Sequelize = require('sequelize');
require('dotenv').config();

const connection = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT
    }
);

connection
    .authenticate()
    .then(() => console.log('Banco de Dados [OK]'))
    .catch((error) => console.log(error))

module.exports = connection;