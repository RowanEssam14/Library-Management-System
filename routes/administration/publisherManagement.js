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
  console.log('publisherManagement get request hit');

  // Check if user is logged in and has the role of 'admin'
  if (req.session.loggedin && req.session.role === 'admin') {
    // Fetch publishers from publisher table
    connection.query('SELECT * FROM publisher', function(error, publishers, fields) {
      if (error) throw error;

      // Pass publishers to the view
      res.render('administration/publisherManagement', { publishers: publishers, errorMessage: null });
    });
  } else {
    // Redirect user to admin login page
    res.redirect('http://localhost:3300/adminLogin');
  }
});



  module.exports = router;
