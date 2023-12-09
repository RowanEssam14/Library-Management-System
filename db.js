const mysql = require('mysql');

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'do2lKjv0lMD86OGT', // This is the password, if you have changed in the default settings, please update it.
  database: 'library_managment_system'
});

// Connect to the MySQL database
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the MySQL database.');
});

module.exports = connection;
