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

router.get('/', function(req, res) {
    if (req.session.loggedin && req.session.role === 'admin') {
        let sql = `SELECT book.*, author.*, publisher.*, GROUP_CONCAT(DISTINCT genre.genre_name SEPARATOR ', ') as genres
        FROM book
        INNER JOIN book_x_genre ON book.book_id = book_x_genre.book_id
        INNER JOIN genre ON book_x_genre.genre_id = genre.genre_id
        INNER JOIN author ON book.author_id = author.author_id
        INNER JOIN book_x_publisher ON book.book_id = book_x_publisher.book_id
        INNER JOIN publisher ON book_x_publisher.publisher_id = publisher.publisher_id
        GROUP BY book.book_id`;

    connection.query(sql, function(error, results, fields) {
      if (error) throw error;
      res.render('administration/bookMangement', { books: results ,  loggedIn: req.session.loggedin});
    });
        } else {
            res.redirect('http://localhost:3300/adminLogin');
        }
  });

module.exports = router;
/*
SELECT borrow.borrow_id, borrow.borrower_id, borrow.librarian_id, borrow.borrow_date, borrow.due_date, borrow.status, borrow.details, GROUP_CONCAT(book.title SEPARATOR ', ') as books,
GROUP_CONCAT(book.book_id SEPARATOR ', ') as book_ids
FROM borrow INNER JOIN book_borrow ON borrow.borrow_id = book_borrow.borrow_id INNER JOIN book ON book_borrow.book_id = book.book_id WHERE borrow.status = 'online_reservation' GROUP BY borrow.borrow_id;
*/