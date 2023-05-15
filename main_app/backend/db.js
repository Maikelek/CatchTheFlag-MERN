const mysql = require('mysql');
require("dotenv").config();

const connection = mysql.createPool({
    connectionLimit: 10,
    host: process.env.HOST,
    user: process.env.DEV,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

connection.getConnection(function(err, connection) {
    if (err) throw err;
    console.log("Joined to the database");
});

process.on('exit', function() {
    connection.end();
});


module.exports = connection;
