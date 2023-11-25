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
  console.log('adminLogin get request hit');
  res.render('administration/adminLogin', { errorMessage: null });
  });

  router.post('/', function(req, res) {
    const { library_id, password } = req.body;
    console.log('adminLogin post request hit');
    connection.query('SELECT user.*, role.role_name, role.max_borrow FROM user INNER JOIN role ON user.role_id = role.role_id WHERE library_id = ? AND password = ? AND role_name = "admin" AND is_deleted = 0', [library_id, password], function(error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
            req.session.loggedin = true;
            req.session.username = library_id;
            req.session.role = results[0].role_name;
            res.redirect('http://localhost:3300/adminInterface');
        } else {
          console.log("wrong password");
            res.render('administration/adminLogin', { errorMessage: 'Invalid login credentials!' });
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
