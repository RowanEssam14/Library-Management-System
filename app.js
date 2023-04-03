//importing  necessary modules from nodejs 
const express = require('express');
const mysql = require('mysql');

//initializing the server instance for our application.
const app = express();
const port = 3306;

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



  // Query to insert a new record into the 'author' table
  const author = { first_name: 'Sean', middle_name:'N/A', last_name:'Covey', specialization:null };
  connection.query('INSERT INTO author SET ?', author, (error, results, fields) => {
    if (error) throw error;
    console.log('New record inserted successfully into the author table.');
    console.log(results);
  });