const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = 3300;


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
const loginCustomerRouter = require('./routes/loginCustomer');
/*const loginAdminRouter = require('./routes/loginAdmin');
const loginLibrarianRouter = require('./routes/loginLibrarian');*/

// Use the books route
app.use('/books', booksRouter);
app.use('/bookData', bookDataRouter);
app.use('/loginCustomer', loginCustomerRouter);
/*app.use('/loginAdmin', loginAdminRouter);
app.use('/loginLibrarian', loginLibrarianRouter);*/

// Starting the server
app.listen(port, function() {
  console.log(`Server listening on port ${port}`);
});

