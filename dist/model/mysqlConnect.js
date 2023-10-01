"use strict";
const util = require("util");
const mysql = require("mysql");

const pool = mysql.createPool({
    connectionLimit: 50,
    queueLimit: 50,
    acquireTimeout: 100000,
    connectTimeout: 5000,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

pool.getConnection((err, connection) =>{
    if(err) throw err;

    if(connection) connection.release();

    return;
})

pool.query = util.promisify(pool.query);

module.exports = pool;