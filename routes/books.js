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

// In-memory cache for books data
let booksCache = null;

// Function to fetch books data from the database
const fetchBooksData = (callback) => {
  connection.query('SELECT * FROM book INNER JOIN book_x_genre ON book.book_id = book_x_genre.book_id INNER JOIN genre ON book_x_genre.genre_id = genre.genre_id;', function(error, results, fields) {
    if (error) {
      callback(error, null);
    } else {
      const booksByGenre = {};
      results.forEach(book => {
        if (!booksByGenre[book.genre_name]) {
          booksByGenre[book.genre_name] = [];
        }
        booksByGenre[book.genre_name].push(book);
      });
      callback(null, booksByGenre);
    }
  });
};

const cacheTimeout = 60000; // Cache expires after 1 minute

//Middleware to handle caching
const cacheMiddleware = (req, res, next) => {
  if (booksCache === null || Date.now() - cacheTimestamp > cacheTimeout) {
    // If the cache is empty or expired, fetch data from the database
    fetchBooksData((error, data) => {
      if (error) {
        res.status(500).send('Internal Server Error');
      } else {
        // Cache the fetched data
        booksCache = data;
        cacheTimestamp = Date.now(); // Update the cache timestamp
        res.locals.books = booksCache;
        next();
      }
    });
  } else {
    // If the cache is not empty and not expired, use the cached data
    res.locals.books = booksCache;
    next();
  }
};

// Route to render books.ejs
router.get('/', cacheMiddleware, function(req, res) {
  res.render('books', { loggedIn: req.session.loggedin,books: res.locals.books });
});

//endpoint for handling the reserve button
router.post('/reserve', function(req, res) {
  console.log('reserve endpoint hit');
  //if user is logged in store book_id & no of copies available
  if (req.session.loggedin) {
    const { book_id , no_of_copies } = req.body;
    //Checking if the book is in the stock
    if (no_of_copies == 0) {
      res.json({status: 'out_of_stock'});
      return;
    }
    // Checking if user exceeded the borrow limit
    if (req.session.cart && req.session.cart.length >= req.session.max_borrow) {
      res.json({status: 'limit_exceeded', max_borrow: req.session.max_borrow});
      return;
    }
    // Checking if the book already exists in the cart
    if (req.session.cart && req.session.cart.includes(book_id)) {
      res.json({status: 'already_reserved'});
      return;
    }
    // The where condition in the query checks that the user doesn't have an active borrowing if the borrower_id exists in the table and status equals ('online_reservation','borrowed','overdue')
    connection.query('SELECT * FROM `borrow` WHERE `borrower_id` = ? AND `status` IN (?, ?, ?)', [req.session.user_id, 'online_reservation', 'borrowed', 'overdue'], function(error, results, fields) {
      if (error) {
        throw error;
      }
      // if the results returned from the query equals 0 that means the user doesn't have an active borrow and can reserve books
      if (results.length === 0) {
        // If the cart exist push book_id
        if (req.session.cart) {
          req.session.cart.push(book_id);
          res.json({status: 'success'});
        } else { //if the cart doesn't exist , initialize it and add the book_id
          req.session.cart = [book_id];
          console.log("First element added of book_id:"+ req.session.cart + "no. of copies are: " + no_of_copies);
          res.json({status: 'success'});
        }
      } else { //if the query returned a result, this means that the user have an active borrow and cannot borrow again
        res.json({status: 'two_borrows'});
      }
    });
  } else { // If the user is not logged in, redirect them to the login page
    console.log('user needs to login')
    res.json({status: 'redirect', url: 'http://localhost:3300/userLogin'});
  }
});

module.exports = router;

