//var config = require("nfig").config;
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'abhishek',
    password: 'A88902616a',
    database: 'User',
});

let getDB = () => {
  return connection;
}

module.exports = {
    getDB: getDB
}
