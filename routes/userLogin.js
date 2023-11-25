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
  res.render('userLogin', { errorMessage: null });
  });

  router.post('/', function(req, res) {
    const { library_id, password } = req.body;
    connection.query('SELECT user.*, role.role_name, role.max_borrow FROM user INNER JOIN role ON user.role_id = role.role_id WHERE library_id = ? AND password = ? AND is_deleted = 0', [library_id, password], function(error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
            req.session.loggedin = true;
            req.session.username = library_id;
            req.session.max_borrow = results[0].max_borrow ;
            req.session.user_id = results[0].user_id;
            req.session.role = results[0].role_name;
            console.log("User logged in successfully of max_borrow:" + req.session.max_borrow + " and role:" + req.session.role);
            res.redirect('http://localhost:3300/books'); // Redirect to the books page upon successful login
        } else {
          console.log("wrong password");
            res.render('userLogin', { errorMessage: 'Invalid login credentials!' }); // Render the login page with an error message
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
