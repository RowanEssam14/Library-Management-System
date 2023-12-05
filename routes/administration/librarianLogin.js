const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const connection = require('../../db.js');

 router.get('/', function(req, res) {
  console.log('librarianLogin get request hit');
  res.render('administration/librarianLogin', { errorMessage: null });
  });

  router.post('/', function(req, res) {
    const { library_id, password } = req.body;
    console.log('adminLogin post request hit');
    connection.query('SELECT user.*, role.role_name, role.max_borrow FROM user INNER JOIN role ON user.role_id = role.role_id WHERE library_id = ? AND role_name = "librarian" AND is_deleted = 0', [library_id], function(error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        // Compare the entered password with the hashed password stored in the database
        bcrypt.compare(password, results[0].password, function(err, result) {
          if (result == true) {
            req.session.loggedin = true;
            req.session.username = library_id;
            req.session.role = results[0].role_name;
            res.redirect('http://localhost:3300/adminInterface');
          } else {
            console.log("wrong password");
            res.render('administration/librarianLogin', { errorMessage: 'Invalid login credentials!', role: req.session.role });
          }
        });
      } else {
        res.render('administration/librarianLogin', { errorMessage: 'Invalid login credentials!' });
      }
    });
  });

  router.get('/logout', function(req, res) {
    req.session.destroy(function(err) {
      if (err) {
        console.log(err);
      } else {
        res.redirect('http://localhost:3300/controller/index');
      }
    });
  });

 module.exports = router;
