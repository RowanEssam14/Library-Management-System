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
  console.log('reservationsManagement get request hit');

  if (req.session.loggedin && req.session.role === 'admin') {
    // Fetch borrow details from the database
    connection.query('SELECT borrow.borrow_id, borrow.borrower_id, user.library_id, borrow.librarian_id, borrow.borrow_date, borrow.due_date, borrow.status, borrow.details, GROUP_CONCAT(book.title SEPARATOR \', \') as books, GROUP_CONCAT(book.book_id SEPARATOR \', \') as book_ids FROM borrow INNER JOIN book_borrow ON borrow.borrow_id = book_borrow.borrow_id INNER JOIN book ON book_borrow.book_id = book.book_id INNER JOIN user ON borrow.borrower_id = user.user_id WHERE borrow.status = \'online_reservation\' GROUP BY borrow.borrow_id', function(error, reservations, fields) {
      if (error) throw error;

      // Pass borrow details to the view
      res.render('administration/reservationsManagement', { reservations: reservations, errorMessage: null });
    });
  } else {
    // Redirect user to admin login page
    res.redirect('http://localhost:3300/adminLogin');
  }
});

router.post('/update', function(req, res) {
  console.log(req.session.username);

  const details = req.body.details;
  const borrowDate = req.body.borrowDate;
  const dueDate = req.body.dueDate;
  const status = req.body.status;
  const borrowID = req.body.borrowID;
  const librarian_library_id = req.session.username;
  const bookIDs = req.body.bookIDs;

  console.log(bookIDs);

  connection.query('SELECT user_id FROM user WHERE library_id = ?', [librarian_library_id], function(error, results) {
    if (error) {
      console.error(error);
      res.send({ success: false, message: 'Database error' });
    } else {
      // Check if a user was found
      if (results.length > 0) {
        const librarian_id = results[0].user_id;

        connection.query('UPDATE borrow SET librarian_id = ?, borrow_date = ?, due_date = ?, status = ?, details = ? WHERE borrow_id = ?', [librarian_id, borrowDate, dueDate, status, details, borrowID], function(error, result) {
          if (error) {
            console.error(error);
            res.send({ success: false, message: 'Database error' });
          } else {
            // Delete all existing records for the given borrow_id in the book_borrow table
            connection.query('DELETE FROM book_borrow WHERE borrow_id = ?', [borrowID], function(error, result) {
              if (error) {
                console.error(error);
                res.send({ success: false, message: 'Database error' });
              } else {
                // After deleting the old records, insert the new ones
                bookIDs.forEach(function(bookID) {
                  connection.query('INSERT INTO book_borrow (borrow_id, book_id) VALUES (?, ?)', [borrowID, bookID], async function(error, result) {
                    if (error) {
                      console.error(error);
                      res.send({ success: false, message: 'Database error' });
                    } else {
                      // Decrement the no_of_copies for the new book IDs in the book table
                      await connection.query('UPDATE book SET no_of_copies = no_of_copies - 1 WHERE book_id = ?', [bookID]);
                    }
                  });
                });

                // Send the success response after all the new records have been inserted and no_of_copies decremented
                res.send({ success: true });
              }
            });
          }
        });
      } else {
        res.send({ success: false, message: 'No user found with the provided library_id' });
      }
    }
  });
});


router.delete('/delete/:id', function(req, res) {
  const borrowID = req.params.id;
  console.log('delete reservation endpoint hit',borrowID);


  connection.query('DELETE FROM borrow WHERE borrow_id = ? ', [borrowID], (error, results, fields) => {
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
UPDATE `borrow` SET `librarian_id` = '25', `due_date` = '2023-12-13', `status` = 'borrowed', `details` = 'test' WHERE `borrow`.`borrow_id` = 37;
*/