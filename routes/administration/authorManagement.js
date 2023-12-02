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
  console.log('authorManagement get request hit');

  if (req.session.loggedin && req.session.role === 'admin') {
    // Fetch authors from author table
    connection.query('SELECT * FROM author WHERE is_deleted = 0', function(error, authors, fields) {
      if (error) throw error;

      // Pass authors to the view
      res.render('administration/authorManagement', { authors: authors, errorMessage: null });
    });
  } else {
    // Redirect user to admin login page
    res.redirect('http://localhost:3300/adminLogin');
  }
});

router.delete('/delete/:id', function(req, res) {
  const authorID = req.params.id;
  console.log('delete author endpoint hit',authorID);


  connection.query('UPDATE author SET is_deleted = 1 WHERE author_id = ?', [authorID], (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send({ success: false, message: 'Database error' });
    } else {
      res.send({ success: true });
    }
  });
});




  module.exports = router;
