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
  console.log('genreManagementget request hit');

  if (req.session.loggedin && req.session.role === 'admin') {
    // Fetch genres from genre table
    connection.query('SELECT * FROM genre', function(error, genres, fields) {
      if (error) throw error;

      // Pass genres to the view
      res.render('administration/genreManagement', { genres: genres, errorMessage: null });
    });
  } else {
    // Redirect user to admin login page
    res.redirect('http://localhost:3300/adminLogin');
  }
});



  module.exports = router;
