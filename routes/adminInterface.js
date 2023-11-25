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
    if (req.session.loggedin && req.session.role === 'admin') { //or librarian , render management page,pass the role name then we can use it in the nav bar to manage access according to role
      res.render('adminInterface');
    } else {
      res.redirect('http://localhost:3300/userLogin');
    }
  });

  module.exports = router;