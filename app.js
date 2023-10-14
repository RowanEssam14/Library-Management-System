const express = require('express');
const app = express();
const port = 3300;

// Setting the view engine to EJS
app.set('view engine', 'ejs');

// Import the necessary path module from Node.js
const path = require('path');

// Specify the static files directory
app.use(express.static('public'));

// Import the routes
const booksRouter = require('./routes/books');

// Use the books route
app.use('/books', booksRouter);

// Starting the server
app.listen(port, function() {
  console.log(`Server listening on port ${port}`);
});

