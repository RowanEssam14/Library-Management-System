const express = require('express');
const router = express.Router();
const connection = require('../../db.js');

router.get('/', function(req, res) {
  if (req.session.loggedin && req.session.role === 'admin' || req.session.role === 'librarian') {
    let sql = `SELECT book.*, author.*, publisher.*, GROUP_CONCAT(DISTINCT genre.genre_name SEPARATOR ', ') as genres, genre.genre_id
     FROM book INNER JOIN book_x_genre ON book.book_id = book_x_genre.book_id INNER JOIN genre ON book_x_genre.genre_id = genre.genre_id
     INNER JOIN author ON book.author_id = author.author_id INNER JOIN book_x_publisher ON book.book_id = book_x_publisher.book_id INNER JOIN publisher ON book_x_publisher.publisher_id = publisher.publisher_id GROUP BY book.book_id;`;

    connection.query(sql, function(error, results, fields) {
      if (error) throw error;

      // Fetch authors
      connection.query('SELECT * FROM author WHERE is_deleted = 0', function(error, authors, fields) {
        if (error) throw error;

        // Fetch publishers
        connection.query('SELECT * FROM publisher WHERE is_deleted = 0', function(error, publishers, fields) {
          if (error) throw error;

          // Fetch genres
          connection.query('SELECT * FROM genre WHERE is_deleted = 0', function(error, genres, fields) {
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

router.delete('/delete/:id', function(req, res) {
  const bookID = req.params.id;
  console.log("FROM the delete endpoint bookID = " + bookID);

  connection.query('DELETE FROM book WHERE book_id = ?', [bookID], (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send({ success: false, message: 'Database error' });
    } else {
      res.send({ success: true });
    }
  });
});

router.post('/addBook', function(req, res) {
  console.log('add book hit');
  var title = req.body.title;
  var ISBN = req.body.ISBN;
  var no_of_copies = req.body.no_of_copies;
  var language = req.body.language;
  var author_id = req.body.author_id;
  var genre_id = req.body.genre_id;
  var publisher_id = req.body.publisher_id;
  var publish_date = req.body.publish_date;
  var file_path = req.body.file_path;
  var pdf_path = req.body.pdf_path;
  var book_description = req.body.book_description;

  connection.query('INSERT INTO book (author_id, title, ISBN, language, publish_date, no_of_copies, book_description, file_path, pdf_path, is_deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0)', [author_id, title, ISBN, language, publish_date, no_of_copies, book_description, file_path, pdf_path], function(error, results, fields) {
    if (error) {
      console.error(error);
      res.send({ success: false, message: 'Database error' });
    } else {
      var book_id = results.insertId;
      connection.query('INSERT INTO book_x_genre (book_id, genre_id) VALUES (?, ?)', [book_id, genre_id], function(error, results, fields) {
        if (error) {
          console.error(error);
          res.send({ success: false, message: 'Database error' });
        } else {
          connection.query('INSERT INTO book_x_publisher (book_id, publisher_id) VALUES (?, ?)', [book_id, publisher_id], function(error, results, fields) {
            if (error) {
              console.error(error);
              res.send({ success: false, message: 'Database error' });
            } else {
              res.send({ success: true });
            }
          });
        }
      });
    }
  });

});


module.exports = router;
