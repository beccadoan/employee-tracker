require('dotenv').config();
const mysql = require('mysql2');

const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASS;

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: db_user,
        password: db_pass,
        database: 'employee_tracker'
    }
)

module.exports = db;