const sql = require('mssql');
require('dotenv').config();

const dbSettings = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT),
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

const getConnection = async () => {
    try {
        const pool = await sql.connect(dbSettings);
        console.log('Conectado a la base de datos');
        return pool;
    } catch (error) {
        console.error('Error de conexión:', error);
    }
};

module.exports = { getConnection, sql };