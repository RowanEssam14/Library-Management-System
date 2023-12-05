const express = require('express');
const router = express.Router();
const connection = require('../../db.js');

 router.get('/', function(req, res) {
  console.log('publisherManagement get request hit');

  if (req.session.loggedin && req.session.role === 'admin' || req.session.role === 'librarian') {
    // Fetch publishers from publisher table
    connection.query('SELECT * FROM publisher WHERE is_deleted = 0', function(error, publishers, fields) {
      if (error) throw error;

      // Pass publishers to the view
      res.render('administration/publisherManagement', { publishers: publishers, errorMessage: null });
    });
  } else {
    // Redirect user to admin login page
    res.redirect('http://localhost:3300/adminLogin');
  }
});

router.post('/addPublisher', function(req, res) {
  console.log('add publisher hit');

  const publisherFirstName = req.body.publisherFirstName;
  const publisherLastName  = req.body.publisherLastName;

  connection.query('INSERT INTO publisher (publisher_first_name, publisher_last_name) VALUES (?, ?)', [publisherFirstName, publisherLastName], function(error, results, fields) {
    if (error) {
      console.error(error);
      res.send({ success: false, message: 'Database error' });
    } else {
      res.send({ success: true });
    }
  });
});

router.post('/update',function(req,res){
  const publisherFirstName = req.body.publisherFirstName;
  const publisherLastName  = req.body.publisherLastName;
  const publisherID = req.body.publisherID;

  connection.query('UPDATE publisher SET publisher_first_name = ?, publisher_last_name = ? WHERE publisher_id = ? ',[publisherFirstName,publisherLastName,publisherID], function(error,result){
    if(error) {
      console.error(error);
      res.send({success: false, message: 'Database error'})
    }else{
        res.send({success:true})
      }
    })
  });

router.delete('/delete/:id', function(req, res) {
  const publisherID = req.params.id;
  console.log('delete publsiher endpoint hit',publisherID);


  connection.query('UPDATE publisher SET is_deleted = 1 WHERE publisher_id = ?', [publisherID], (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send({ success: false, message: 'Database error' });
    } else {
      res.send({ success: true });
    }
  });
});





  module.exports = router;
