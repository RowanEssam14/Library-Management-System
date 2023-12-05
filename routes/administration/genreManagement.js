const express = require('express');
const router = express.Router();
const connection = require('../../db.js');

router.get('/', function(req, res) {
  console.log('genreManagementget request hit');

  if (req.session.loggedin && req.session.role === 'admin' || req.session.role === 'librarian') {
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

router.post('/addGenre', function(req, res) {
  console.log('add genre hit');
  const genreName = req.body.genreName;

  connection.query('INSERT INTO genre (genre_name) VALUES (?)', [genreName], function(error, results, fields) {
    if (error) {
      console.error(error);
      res.send({ success: false, message: 'Database error' });
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

  module.exports = router;
