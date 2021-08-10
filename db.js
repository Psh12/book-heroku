const {Pool} = require('pg');
require("dotenv").config();

const devConfig = {
    user: process.env.PG_user,
    password: process.env.PG_password,
    host: process.env.PG_host,
    port: process.env.PG_port,
    database: process.env.PG_database
};

const proConfig = {
    connectionString: process.env.PG_database_URL, 
};
const pool = new Pool(process.env.NODE_ENV === "production" ? proConfig : devConfig);

module.exports = pool;