  
// requiring the mysql package to connect to the database
const mysql = require("mysql");

//connecting to mysql to text the burgers_bd
const connect= {
    "host"    : "localhost",
    "port"    : 3306,
    "user"    : "root",
    "password": "Donald425@",
    "database": "burgers_db"
};

// creating connection to the database and 
const pool = mysql.createConnection(process.env.JAWSDB_URL || connect);



module.exports = pool;