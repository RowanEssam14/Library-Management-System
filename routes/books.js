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

// getting books from the database to display in carousels
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

//endpoint for handling the reserve button
router.post('/reserve', function(req, res) {
  console.log('reserve endpoint hit');
  //if user is logged store book_id & no of copies avaliable 
  if (req.session.loggedin) {
    console.log('user is already logged in of MAXBORROW: '+ req.session.max_borrow);
    const { book_id , no_of_copies } = req.body;
    //Checking if the book is in stock
    if (no_of_copies == 0) {
      res.json({status: 'out_of_stock'});
      return;
    }
    // Checking if user exceceeded the borrow limit
    if (req.session.cart && req.session.cart.length >= req.session.max_borrow) {
      res.json({status: 'limit_exceeded', max_borrow: req.session.max_borrow});
      return;
    }
    // If the cart exist push book_id 
    if (req.session.cart) {
      req.session.cart.push(book_id);
      console.log("nth number being added: of id " + book_id);
      console.log("Number of books reserved is: }" +req.session.cart.length+"The array is: "+ req.session.cart);
      res.json({status: 'success'});
    } else { //if the cart doesn't exist , intialize it and add the book_id
      req.session.cart = [book_id];
      console.log("First element added of book_id:"+ req.session.cart + "no. of copies are: " + no_of_copies);
      res.json({status: 'success'});
    }
  } else {
    // If the user is not logged in, redirect them to the login page
    console.log('user needs to login')
    res.json({status: 'redirect', url: 'http://localhost:3300/loginCustomer'});
  }
});

module.exports = router;
