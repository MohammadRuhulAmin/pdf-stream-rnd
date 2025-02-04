var mysql = require('mysql2');
const fsPromise = require('node:fs/promises')


  var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'ruhulamin',
    database: 'sdg-prod',
    port:3306
  });
  
  connection.connect(function (err) {
    if (err) {
      console.error('Error connecting: ' + err.stack);
      return;
    }
    console.log('Connected as id ' + connection.threadId);
  });
  
  
  async function processRow(row, callback) {
    console.log('Processing row:', row);
    
  }
  
  var query = connection.query('SELECT * FROM indicator_disagg_data');
  
  query
    .on('error', function (err) {
      console.error('Query error:', err);
    })
    .on('fields', function (fields) {
      console.log('Fields received:', fields.map(f => f.name));
    })
    .on('result', function (row) {
      connection.pause(); // Pause to process row
      processRow(row, function () {
        connection.resume(); // Resume fetching rows
      });
    })
    .on('end', function () {
      console.log('Query execution completed.');
      connection.end();
    });
