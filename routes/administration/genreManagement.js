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
    connection.query('SELECT * FROM genre WHERE is_deleted = 0', function(error, genres, fields) {
      if (error) throw error;

      // Pass genres to the view
      res.render('administration/genreManagement', { genres: genres, errorMessage: null });
    });
  } else {
    // Redirect user to admin login page
    res.redirect('http://localhost:3300/adminLogin');
  }
});

router.delete('/delete/:id', function(req, res) {
  const genreID = req.params.id;
  console.log('delete genre endpoint hit',genreID);


  connection.query('UPDATE genre SET is_deleted = 1 WHERE genre_id = ?', [genreID], (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send({ success: false, message: 'Database error' });
    } else {
      res.send({ success: true });
    }
  });
});

router.post('/update',function(req,res){
  const genreName = req.body.genreName;
  const genreID = req.body.genreID;

  connection.query('UPDATE genre SET genre_name = ? WHERE genre_id = ? ',[genreName,genreID], function(error,result){
    if(error) {
      console.error(error);
      res.send({success: false, message: 'Database error'})
    }else{
        res.send({success:true})
      }
    })
  });

  module.exports = router;
