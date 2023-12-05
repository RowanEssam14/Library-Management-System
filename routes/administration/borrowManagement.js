const express = require('express');
const router = express.Router();
const connection = require('../../db.js');

 router.get('/', function(req, res) {
  console.log('borrowManagement get request hit');

  if (req.session.loggedin && req.session.role === 'admin' || req.session.role === 'librarian') {
    // Fetch borrow details from the database
    connection.query('SELECT borrow.borrow_id, borrow.borrower_id, user.library_id, borrow.librarian_id, borrow.borrow_date, borrow.due_date, borrow.status, borrow.details, GROUP_CONCAT(book.title SEPARATOR \', \') as books, GROUP_CONCAT(book.book_id SEPARATOR \', \') as book_ids FROM borrow INNER JOIN book_borrow ON borrow.borrow_id = book_borrow.borrow_id INNER JOIN book ON book_borrow.book_id = book.book_id INNER JOIN user ON borrow.borrower_id = user.user_id WHERE borrow.status != \'online_reservation\' GROUP BY borrow.borrow_id', function(error, borrows, fields) {
      if (error) throw error;

      // Fetch books where no_of_copies is not zero
      connection.query('SELECT book_id,title FROM book WHERE no_of_copies != 0', function(error, books, fields) {
        if (error) throw error;

        // Pass borrow details and books to the view
        res.render('administration/borrowManagement', { borrows: borrows, books: books, errorMessage: null });
      });
    });
  } else {
    // Redirect user to admin login page
    res.redirect('http://localhost:3300/adminLogin');
  }
});

router.post('/addBorrow', function(req, res) {
  console.log('add borrow hit');

  const borrowerLibraryID = req.body.borrowerLibraryID;
  const librarian_library_id = (req.session.username);
  const borrowDate = req.body.borrowDate;
  const dueDate = req.body.dueDate;
  const status = req.body.status;
  const details = req.body.details;
  const bookIDs = req.body.bookIDs;

  connection.query('SELECT user_id FROM user WHERE library_id = ?', [librarian_library_id], function(error, librarianResults) {
    if (error) {
      console.error(error);
      res.send({success: false, message: 'Database error'});
    } else {
      // Check if a librarian was found
      if (librarianResults.length > 0) {
        const librarian_id = librarianResults[0].user_id;

        connection.query('SELECT user_id FROM user WHERE library_id = ?', [borrowerLibraryID], function(error, borrowerResults) {
          if (error) {
            console.error(error);
            res.send({success: false, message: 'Database error'});
          } else {
            // Check if a borrower was found
            if (borrowerResults.length > 0) {
              const borrowerID = borrowerResults[0].user_id;

              connection.query('INSERT INTO borrow (borrower_id, librarian_id, borrow_date, due_date, status, details) VALUES (?, ?, ?, ?, ?, ?)', [borrowerID, librarian_id, borrowDate, dueDate, status, details], function(error, results, fields) {
                if (error) {
                  console.error(error);
                  res.send({ success: false, message: 'Database error' });
                } else {
                  const borrowID = results.insertId; // get the auto-generated borrowID
                  bookIDs.forEach(function(bookID) {
                    connection.query('INSERT INTO book_borrow (borrow_id, book_id) VALUES (?, ?)', [borrowID, bookID], function(error, result) {
                      if (error) {
                        console.error(error);
                        res.send({success: false, message: 'Database error'});
                      }
                    });
                  });
                  res.send({ success: true });
                }
              });
            } else {
              // No borrower was found
              res.send({success: false, message: 'No borrower found with the provided library ID'});
            }
          }
        });
      } else {
        // No librarian was found
        res.send({success: false, message: 'No librarian found with the provided library ID'});
      }
    }
  });
});

router.post('/update',function(req,res){

  console.log(req.session.username);
  const details = req.body.details;
  const borrowDate = req.body.borrowDate;
  const dueDate = req.body.dueDate;
  const status = req.body.status;
  const borrowID = req.body.borrowID;
  const librarian_library_id = (req.session.username);
  const unformattedBookIDs =  Array.prototype.join.call(req.body.bookIDs, ',');
  console.log("The type of unformatted book ids are:" + typeof(unformattedBookIDs) + "ids are: "+ unformattedBookIDs);
  const bookIDs = unformattedBookIDs.split(','); // Split the string into an array
  console.log(" from the edit endpoint"+bookIDs);

  connection.query('SELECT user_id FROM user WHERE library_id = ?', [librarian_library_id], function(error, results) {
    if (error) {
      console.error(error);
      res.send({success: false, message: 'Database error'});
    } else {
      // Check if a user was found
      if (results.length > 0) {
        const librarian_id = results[0].user_id;
        connection.query('UPDATE borrow SET librarian_id = ?,borrow_date = ?, due_date = ?, status = ?, details = ? WHERE borrow_id = ?', [librarian_id, borrowDate, dueDate, status, details, borrowID], function(error, result) {
          if (error) {
            console.error(error);
            res.send({success: false, message: 'Database error'});
          } else {
            // If the status is "cancelled" or "returned", increment the number of copies for each book
            if (status === 'cancelled' || status === 'returned') {
              bookIDs.forEach(function(bookID) {
                connection.query('UPDATE book SET no_of_copies = no_of_copies + 1 WHERE book_id = ?', [bookID], function(error, result) {
                  if (error) {
                    console.error(error);
                    res.send({success: false, message: 'Database error'});
                  }
                });
              });
            }
            // If the status is "damaged", "lost", decrement the number of copies for each book
            else if (status === 'damaged' || status === 'lost') {
              bookIDs.forEach(function(bookID) {
                connection.query('UPDATE book SET no_of_copies = no_of_copies - 1 WHERE book_id = ?', [bookID], function(error, result) {
                  if (error) {
                    console.error(error);
                    res.send({success: false, message: 'Database error'});
                  }
                });
              });
            }

            // Delete all existing records for the given borrow_id in the book_borrow table
            connection.query('DELETE FROM book_borrow WHERE borrow_id = ?', [borrowID], function(error, result) {
                if (error) {
                    console.error(error);
                    res.send({success: false, message: 'Database error'});
                } else {
                    // After deleting the old records, insert the new ones
                    bookIDs.forEach(function(bookID) {
                        connection.query('INSERT INTO book_borrow (borrow_id, book_id) VALUES (?, ?)', [borrowID, bookID], function(error, result) {
                            if (error) {
                                console.error(error);
                                res.send({success: false, message: 'Database error'});
                            }
                        });
                    });

                    // Send the success response after all the new records have been inserted
                    res.send({success: true});
                }
            });
          }
        });
      } else {
        res.send({success: false, message: 'No user found with the provided library_id'});
      }
    }
  });
});



router.delete('/delete/:id', function(req, res) {
  const borrowID = req.params.id;
  console.log('delete borrow endpoint hit',borrowID);


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