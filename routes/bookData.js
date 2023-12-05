const express = require('express');
const router = express.Router();
const connection = require('../db.js');
const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

router.get('/:id', function(req, res) {
  let sql = `SELECT *
             FROM book
             INNER JOIN book_x_genre ON book.book_id = book_x_genre.book_id
             INNER JOIN genre ON book_x_genre.genre_id = genre.genre_id
             INNER JOIN author ON book.author_id = author.author_id
             INNER JOIN book_x_publisher ON book.book_id = book_x_publisher.book_id
             INNER JOIN publisher ON book_x_publisher.publisher_id = publisher.publisher_id
             WHERE book.book_id = ?;`;

  let id = req.params.id;
  connection.query(sql, [id], function(error, results, fields) {
    if (error) throw error;
    res.render('bookData', { books: results ,  loggedIn: req.session.loggedin});
  });
});

router.get('/:id/preview', function(req, res) {
  // Fetch the PDF path from the database
  let sql = 'SELECT pdf_path FROM book WHERE book_id = ?';
  let id = req.params.id;
  connection.query(sql, [id], async function(error, results, fields) {
    if (error) throw error;

    try {
      const pdfPathFromDb = results[0].pdf_path.trim();

      const pdfPath = path.join(__dirname, '..', 'public', 'assets', 'pdfs',pdfPathFromDb );
      const originalPdfBytes = fs.readFileSync(pdfPath);
      const pdfDoc = await PDFDocument.load(originalPdfBytes);
      const totalPages = pdfDoc.getPageCount();

      // Remove extra pages
      for (let i = totalPages - 1; i >= 10; i--) {
        pdfDoc.removePage(i);
      }

      const pdfBytes = await pdfDoc.save();

      // Send the preview PDF bytes directly in the response
      res.contentType("application/pdf");

      // Create a Readable stream and pipe it to the response
      const readableStream = new require('stream').Readable();
      readableStream._read = () => {};
      readableStream.push(pdfBytes);
      readableStream.push(null); // indicateds we have reached the end of the file thus teh end of the steam-
      readableStream.pipe(res); // pipe the stream to the response

    } catch (error) {
      console.error('Error in /preview route:', error);
    }
  });
});


  module.exports = router;
