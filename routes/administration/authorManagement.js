const express = require('express');
const router = express.Router();
const connection = require('../../db.js');

 router.get('/', function(req, res) {
  console.log('authorManagement get request hit');

  if (req.session.loggedin && req.session.role === 'admin' || req.session.role === 'librarian') {
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

router.post('/addAuthor', function(req, res) {
  console.log('add author hit');
  const authorFirstName = req.body.authorFirstName;
  const authorMiddleName  = req.body.authorMiddleName;
  const authorLastName  = req.body.authorLastName;
  const authorSpecialization  = req.body.authorSpecialization;

  connection.query('INSERT INTO author (author_first_name, author_middle_name, author_last_name, specialization) VALUES (?, ?, ?, ?)', [authorFirstName, authorMiddleName, authorLastName,authorSpecialization], function(error, results, fields) {
    if (error) {
      console.error(error);
      res.send({ success: false, message: 'Database error' });
    } else {
      res.send({ success: true });
    }
  });
});

router.post('/update',function(req,res){
  const authorFirstName = req.body.authorFirstName;
  const authorMiddleName  = req.body.authorMiddleName;
  const authorLastName  = req.body.authorLastName;
  const authorSpecialization  = req.body.authorSpecialization;
  const authorID = req.body.authorID;

  connection.query('UPDATE author SET author_first_name = ?, author_middle_name = ?, author_last_name = ?, specialization = ? WHERE author_id = ? ',[authorFirstName,authorMiddleName,authorLastName,authorSpecialization,authorID], function(error,result){
    if(error) {
      console.error(error);
      res.send({success: false, message: 'Database error'})
    }else{
        res.send({success:true})
      }
    })
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
/*
*/