const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'catch_the_flag_game'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Pripojene k Databaze")
});

module.exports = connection;