const express = require('express');
const session = require('express-session');
const app = express();
const port = 3300;

// Set up session middleware to be used across multiple routes
app.use(session({
  secret: 'my-secret-key',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 30 * 60 * 1000 }
}));

// Setting the view engine to EJS
app.set('view engine', 'ejs');

// Import the necessary path module from Node.js
const path = require('path');

// Specify the static files directory
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Import the routes
const booksRouter = require('./routes/books');
const bookDataRouter = require('./routes/bookData');
const userLoginRouter = require('./routes/userLogin');
const controllerRouter = require('./routes/controller');
const checkoutRouter = require('./routes/checkout');
const adminLoginRouter = require('./routes/administration/adminLogin');
const adminInterfaceRouter = require('./routes/administration/adminInterface');
//const loginLibrarianRouter = require('./routes/loginLibrarian');

// Use the books route
app.use('/books', booksRouter);
app.use('/bookData', bookDataRouter);
app.use('/userLogin', userLoginRouter);
app.use('/controller', controllerRouter);
app.use('/checkout',checkoutRouter)
app.use('/adminLogin', adminLoginRouter);
app.use('/adminInterface', adminInterfaceRouter);
//app.use('/loginLibrarian', loginLibrarianRouter);

// Starting the server
app.listen(port, function() {
  console.log(`Server listening on port ${port}`);
});

