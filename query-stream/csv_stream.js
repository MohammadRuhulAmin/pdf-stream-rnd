const mysql = require('mysql2');

const {Transform} = require('node:stream')
const fs = require('fs')

// Create MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'ruhulamin',
  database: 'sdg-prod',
  connectionLimit: 10
});

// Query to fetch data
const query = 'SELECT * FROM indicator_disagg_data LIMIT 1000000';

// Transform Stream to process data
const transformStream = new Transform({
  objectMode: true,
  transform(row, encoding, callback) {
    row.date = new Date().toString();
    callback(null, `${row.id}, ${row.disagg_name}, ${row.updated_at}\n`);
  },
});

// Writable Stream to write to a file
const fileWriteStream = fs.createWriteStream('output.csv');

// Start streaming data
const startStream = () => {
  console.log("STARTED ", new Date());
  
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting connection:', err);
      return;
    }

    // Run the query and stream the result set
    connection.query(query)
      .stream()
      .pipe(transformStream)
      .pipe(fileWriteStream)
      .on('error', console.error)
      .on('finish', () => {
        console.log('FINISHED: ', new Date());
        connection.release();
      });
  });
};

startStream();
