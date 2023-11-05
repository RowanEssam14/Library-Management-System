const express = require('express');
const session = require('express-session'); // Add this line

const router = express.Router();
const mysql = require('mysql');

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'do2lKjv0lMD86OGT',
  database: 'library_managment_system'
});

// Set up session middleware
router.use(session({
  secret: 'my-secret-key', 
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 30 * 60 * 1000 }
}));

// Connect to the MySQL database
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the MySQL database.');
 });

 router.get('/', function(req, res) {
  res.render('loginCustomer', { errorMessage: null });
  });

  router.post('/', function(req, res) {
    console.log('endpoint hit');
    const { library_id, password } = req.body;
    connection.query('SELECT * FROM user INNER JOIN user_x_role ON user.user_id = user_x_role.user_id INNER JOIN role ON user_x_role.role_id = role.role_id WHERE library_id = ? AND password = ? AND role_name = "customer" ', [library_id, password], function(error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
            req.session.loggedin = true;
            req.session.username = library_id;
            res.redirect('http://localhost:3300/books'); // Redirect to the books page upon successful login
        } else {
          console.log("wrong pass");
            res.render('loginCustomer', { errorMessage: 'Invalid login credentials!' }); // Render the login page with an error message
        }
    });
});
  
 module.exports = router;
