const {Pool} = require('pg');
const pool = new Pool({
    user: 'postgres',
    password: 'Parash1998',
    host: 'localhost',
    port: 5432,
    database: "book-server"
});

module.exports = pool;