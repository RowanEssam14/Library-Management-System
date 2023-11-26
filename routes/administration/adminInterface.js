const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bcrypt = require('bcrypt');

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
  if (req.session.loggedin && req.session.role === 'admin') {
    connection.query('SELECT * FROM role', (error, roles, fields) => {
      if (error) throw error;
      connection.query('SELECT user.*, role.role_name, role.max_borrow FROM user INNER JOIN role ON user.role_id = role.role_id WHERE is_deleted = 0 ORDER BY role.role_name ASC', (error, users, fields) => {
        console.log(roles)
        if (error) throw error;
        res.render('administration/adminInterface', { user: users, roles: roles });
      });
    });
  } else {
    res.redirect('http://localhost:3300/adminLogin');
  }
});

router.post('/addUser', function(req, res) {
  console.log('add user hit');
  var libraryId = req.body.libraryId;
  var password = req.body.password;
  var role = req.body.role;
  const hashedPassword = bcrypt.hashSync(password, 10);

  connection.query('INSERT INTO user (library_id, password, role_id, is_deleted) VALUES (?, ?, ?, 0)', [libraryId, hashedPassword, role], function(error, results, fields) {
    if (error) {
      console.error(error);
      res.send({ success: false, message: 'Database error' });
    } else {
      res.send({ success: true });
    }
  });
});

router.delete('/delete/:id', function(req, res) {
  const user_id = req.params.id;

  connection.query('UPDATE user SET is_deleted = 1 WHERE user_id = ?', [user_id], (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send({ success: false, message: 'Database error' });
    } else {
      res.send({ success: true });
    }
  });
});

// router.post('/update', function(req, res) {
//   const { libraryId, role } = req.body;
//   console.log(libraryId,role)

//   connection.query('UPDATE user SET role_id = (SELECT role_id FROM `role` WHERE `role`.role_name = ?) WHERE user.library_id = ?', [role, libraryId], (error, results, fields) => {
//     if (error) {
//       console.error(error);
//       res.status(500).send({ success: false, message: 'Database error' });
//     } else {
//       res.send({ success: true });
//     }
//   });
// });


router.post('/changePassword/:id', function(req, res) {
  const userId = req.params.id;
  const newPassword = req.body.newPassword;
  // Hash the new password before storing it in the database
  const hashedPassword = bcrypt.hashSync(newPassword, 10);

  connection.query('UPDATE user SET password = ? WHERE user_id = ?', [hashedPassword, userId], (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send({ success: false, message: 'Database error' });
    } else {
      res.send({ success: true });
    }
  });
});

  module.exports = router;
