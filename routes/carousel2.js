const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'do2lKjv0lMD86OGT',
  database: 'library_managment_system'
});

// Connect to the MySQL database
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the MySQL database.');
});

// Define a route to fetch all books data from the database
router.get('/', function(req, res) {
  connection.query('SELECT * FROM book', function(error, results, fields) {
    if (error) throw error;
    res.render('carousel2', { books: results });
  });
});

module.exports = router;
