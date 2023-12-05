const express = require('express');
const router = express.Router();
const connection = require('../db.js');

router.get('/', function(req, res) {
  // Initialize the cart if it's not set before
  if (!req.session.cart) {
    req.session.cart = [];
  }

  if (req.session.cart.length === 0) {
    // If the cart is empty, render the checkout page with an empty list of books
    res.render('checkout', { loggedIn: req.session.loggedin, books: [], cartCount: 0 });
  } else {
    const bookIds = req.session.cart.join(',');

    connection.query(`SELECT book_id,title, file_path FROM book WHERE book_id IN (${bookIds})`, function(error, results, fields) {
      if (error) {
        res.status(500).send('Internal Server Error');
      } else {
        res.render('checkout', { loggedIn: req.session.loggedin, books: results, cartCount: req.session.cartCount });
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

                    if (error) {
                        return connection.rollback(function() {
                            throw error;
                        });
                    }

                    // Decrement the no_of_copies in the books table
                    connection.query('UPDATE book SET no_of_copies = no_of_copies - 1 WHERE book_id = ?', [bookId], function(error, result) {
                      if (error) {
                        console.error(error);
                        res.send({success: false, message: 'Database error'});
                      }
                    });
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

  router.post('/delete', function(req, res) {
    const bookIdToDelete = req.body.book_id;
    const index = req.session.cart.indexOf(bookIdToDelete);
    if (index !== -1) {
      // Remove the book ID from the cart array
      req.session.cart.splice(index, 1);
      // Decrement the cart count in the session
      req.session.cartCount = req.session.cartCount > 1 ? req.session.cartCount - 1 : 0;
      res.status(200).send({ success: true,cartCount: req.session.cartCount || 0 });
    } else {
      res.status(404).send({ success: false, message: 'Book ID not found in cart' });
    }
  });

module.exports = router;
