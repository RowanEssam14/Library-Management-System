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

router.get('/json', function(req, res) {
  connection.query('SELECT * FROM book', function(error, results, fields) {
    if (error) throw error;
    res.json({ books: results });
  });
});
router.get('/', function(req, res) {
  connection.query('SELECT * FROM book INNER JOIN book_x_genre ON book.book_id = book_x_genre.book_id INNER JOIN genre ON book_x_genre.genre_id = genre.genre_id;', function(error, results, fields) {
    if (error) throw error;
    const booksByGenre = {};
    results.forEach(book => {
      if (!booksByGenre[book.genre_name]) {
        booksByGenre[book.genre_name] = [];
      }
      booksByGenre[book.genre_name].push(book);
    });
    res.render('books',{books:booksByGenre});
  });
});

router.get('/jsonn', function(req, res) {
  connection.query('SELECT * FROM book INNER JOIN book_x_genre ON book.book_id = book_x_genre.book_id INNER JOIN genre ON book_x_genre.genre_id = genre.genre_id;', function(error, results, fields) {
    if (error) throw error;
    const booksByGenre = {};
    results.forEach(book => {
      if (!booksByGenre[book.genre_name]) {
        booksByGenre[book.genre_name] = [];
      }
      booksByGenre[book.genre_name].push(book);
    });
    res.json({books:booksByGenre});
  });
});

module.exports = router;
