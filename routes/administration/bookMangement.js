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
    let sql = `SELECT book.*, author.*, publisher.*, GROUP_CONCAT(DISTINCT genre.genre_name SEPARATOR ', ') as genres, genre.genre_id
     FROM book INNER JOIN book_x_genre ON book.book_id = book_x_genre.book_id INNER JOIN genre ON book_x_genre.genre_id = genre.genre_id
     INNER JOIN author ON book.author_id = author.author_id INNER JOIN book_x_publisher ON book.book_id = book_x_publisher.book_id INNER JOIN publisher ON book_x_publisher.publisher_id = publisher.publisher_id GROUP BY book.book_id;`;

    connection.query(sql, function(error, results, fields) {
      if (error) throw error;

      // Fetch authors
      connection.query('SELECT * FROM author', function(error, authors, fields) {
        if (error) throw error;

        // Fetch publishers
        connection.query('SELECT * FROM publisher', function(error, publishers, fields) {
          if (error) throw error;

          // Fetch genres
          connection.query('SELECT * FROM genre', function(error, genres, fields) {
            if (error) throw error;

            console.log(results);

            // Render the page with all the data
            res.render('administration/bookMangement', {
              books: results,
              authors: authors,
              publishers: publishers,
              genres: genres,
              loggedIn: req.session.loggedin
            });
          });
        });
      });
    });
  } else {
    res.redirect('http://localhost:3300/adminLogin');
  }
});

router.post('/updateBook', function(req, res) {
  console.log('update endpoint hit');
  const book_id = req.body.bookId;
  const author_id = req.body.authorId;
  const genre_id = req.body.genreId;
  const publisher_id = req.body.publisherId;
  const bookTitle = req.body.bookTitle;
  const bookStock = req.body.bookStock;
  const bookISBN = req.body.bookISBN;
  const bookLanguage = req.body.bookLanguage;
  const bookImagePath = req.body.bookImagePath;
  const bookPdfPath = req.body.bookPdfPath;
  const bookDescription = req.body.bookDescription;
  const bookPublishDate = req.body.bookPublishDate;

  console.log( bookLanguage);

  connection.query('UPDATE book_x_genre SET genre_id = ? WHERE book_id = ?', [genre_id, book_id], function(error, result) {
    if (error) {
      console.error(error);
      return res.send({success: false, message: 'Database error'});
    }

    connection.query('UPDATE book_x_publisher SET publisher_id = ? WHERE book_id = ?', [publisher_id, book_id], function(error, result) {
      if (error) {
        console.error(error);
        return res.send({success: false, message: 'Database error'});
      }

      connection.query('UPDATE book SET author_id = ?, title = ?, ISBN = ?, no_of_copies = ?, language = ?, file_path = ?, pdf_path = ?, book_description = ?, publish_date = ? WHERE book_id = ?', [author_id, bookTitle,bookISBN,bookStock, bookLanguage,bookImagePath, bookPdfPath, bookDescription, bookPublishDate, book_id], function(error, result) {
        if (error) {
          console.error(error);
          return res.send({success: false, message: 'Database error'});
        }

        res.send({success: true});
      });
    });
  });
});

module.exports = router;
/*
SELECT borrow.borrow_id, borrow.borrower_id, borrow.librarian_id, borrow.borrow_date, borrow.due_date, borrow.status, borrow.details, GROUP_CONCAT(book.title SEPARATOR ', ') as books,
GROUP_CONCAT(book.book_id SEPARATOR ', ') as book_ids
FROM borrow INNER JOIN book_borrow ON borrow.borrow_id = book_borrow.borrow_id INNER JOIN book ON book_borrow.book_id = book.book_id WHERE borrow.status = 'online_reservation' GROUP BY borrow.borrow_id;
*/