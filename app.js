//importing  necessary modules from nodejs 
const express = require('express');
const mysql = require('mysql');

//initializing the server instance for our application.
const app = express();
const port = 3300;


// Setting the view engine to EJS
app.set('view engine', 'ejs');

//importing the necessary path module from nodejs
const path = require('path');

//specifying the static files directory
app.use(express.static('public'));

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

// Define a route to fetch books data from the database
app.get('/books', function(req, res) {
  connection.query('SELECT * FROM book', function(error, results, fields) {
    if (error) throw error;
    res.render('books', { books: results });
  });
});

// Starting the server
app.listen(port, function() {
  console.log(`Server listening on port ${port}`);
});