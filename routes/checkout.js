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
    // Initialize the cart if it'snot set before
    if (!req.session.cart) {
      req.session.cart = [];
    }
    // Check if the cart is empty
    if (req.session.cart.length === 0) {
      // Render the checkout page with an empty list of books
      res.render('checkout', { loggedIn: req.session.loggedin, books: [] });
    } else {
      // Convert the array of book_ids to a string
      const bookIds = req.session.cart.join(',');

      // Query the database
      connection.query(`SELECT title, file_path FROM book WHERE book_id IN (${bookIds})`, function(error, results, fields) {
        if (error) {
          res.status(500).send('Internal Server Error');
        } else {
          // Render the checkout page with the book data
          res.render('checkout', { loggedIn: req.session.loggedin, books: results });
        }
      });
    }
  });


router.post('/borrow', function(req, res) {

  const borrowDate = req.body.date;
  const borrowerId = req.session.user_id;

  // Start a transaction
  connection.beginTransaction(function(err) {
      if (err) { throw err; }

      // Insert the borrow record
      connection.query('INSERT INTO `borrow` (`borrower_id`, `borrow_date`,`status`) VALUES (?, ?, ?)', [borrowerId, borrowDate, 'online_reservation'], function(error, results, fields) {
          if (error) {
              return connection.rollback(function() {
                  throw error;
              });
          }
          // Get the last inserted ID
          const lastIdInBorrow = results.insertId;

          // Insert the book_borrow records using foreach loop
          req.session.cart.forEach(function(bookId) {
              connection.query('INSERT INTO `book_borrow` (`borrow_id`, `book_id`) VALUES (?, ?)', [lastIdInBorrow, bookId], function(error, results, fields) {
                console.log("we are going to insert in book_borrow now",lastIdInBorrow)
                  if (error) {
                      return connection.rollback(function() {
                        console.log("hi there is an error inserting book_borrow");
                          throw error;
                      });
                  }
              });
          });

          // Commit the transaction
          connection.commit(function(err) {
              if (err) {
                  return connection.rollback(function() {
                      throw err;
                  });
              }
              req.session.cart = []
              res.send({success:true});
          });
      });
  });
});

module.exports = router;
