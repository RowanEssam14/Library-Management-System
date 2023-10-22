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

// for testing purposes (to be able to render the view)
router.get('/', function(req, res) {
  connection.query('SELECT * FROM book', function(error, results, fields) {
    if (error) throw error;
    res.render('bookData', { books: results });
  });
});

/*router.get('/:book_id', async (req, res) => {
  const bookId = req.params.book_id;

  try {
    const query = `
      SELECT * 
      FROM book 
      INNER JOIN book_x_genre ON book.book_id = book_x_genre.book_id 
      INNER JOIN genre ON book_x_genre.genre_id = genre.genre_id 
      INNER JOIN author ON book.author_id = author.author_id 
      INNER JOIN book_x_publisher ON book.book_id = book_x_publisher.book_id 
      INNER JOIN publisher ON book_x_publisher.publisher_id = book_x_publisher.publisher_id 
      WHERE book.book_id = ?;
    `;

    const [bookData] = await db.query(query, [bookId]);
    console.log(bookData);

    if (bookData.length === 0) {
      return res.status(404).send('Book not found');
    }

    res.render('bookData', { bookData }); 
  } catch (error) {
    console.error('Error fetching book data:', error);
    res.status(500).send('Internal Server Error');
  }
});*/

router.get('/:id', function(req, res) {
  let sql = `SELECT * 
             FROM book 
             INNER JOIN book_x_genre ON book.book_id = book_x_genre.book_id 
             INNER JOIN genre ON book_x_genre.genre_id = genre.genre_id 
             INNER JOIN author ON book.author_id = author.author_id 
             INNER JOIN book_x_publisher ON book.book_id = book_x_publisher.book_id 
             INNER JOIN publisher ON book_x_publisher.publisher_id = publisher.publisher_id 
             WHERE book.book_id = ?;`;

  let id = req.params.id;
  connection.query(sql, [id], function(error, results, fields) {
    if (error) throw error;
    res.render('bookData', { books: results });
  });
});

  module.exports = router;