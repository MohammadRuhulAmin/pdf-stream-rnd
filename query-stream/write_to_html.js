const mysql = require('mysql2');
const http = require('http')
const {Transform} = require('node:stream')
const fs = require('fs')
const fsPromise = require('fs/promises')
const {log} = require('node:console')
// Create MySQL connection pool
const pool = mysql.createPool({
  host: '172.16.44.250',
  user: 'ruhuldba',
  password: 'UvSWqjg2q1wm0yhSWKAH',
  database: 'mutation_sylhet',
  connectionLimit: 10
});

// Query to fetch data
async function queryStream(){


  const query = 'SELECT id, case_no, total_land_amount_txt,users_tagged_receive  FROM applications limit 999999999';

  // Transform Stream to process data
  const transformStream = new Transform({
    objectMode: true,
    transform(row, encoding, callback) {
      // console.log(row)
      row.date = new Date().toString();

      const string = `<tr> <td> ${row.id} </td> <td>${row.case_no}</td> <td>${row.total_land_amount_txt}</td> <td>${row.users_tagged_receive}</td> </tr><br>`
      callback(null, string);
    },
  });


  const fileWriteHandle = await fsPromise.open('output.html','a')
  const fileWriteStream = fileWriteHandle.createWriteStream();

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
  startStream()
}



const server = http.createServer()
server.on("request",async(request,response)=>{
  if(request.url === '/query-stream' && request.method === 'GET'){
    response.setHeader("Content-Type", "text/plain");
    const fileHandleRead = await fsPromise.open("./output.html", "r");
    const fileReadStream = fileHandleRead.createReadStream({highWaterMark:10});
    fileReadStream.pipe(response)
    // fileReadStream.on("data",(chunk)=>{
    //     setTimeout(()=>{
    //         log(chunk)
    //         response.write(chunk.toString('utf-8'))
    //     },100)
        
    // })
    
  }
})

server.listen(3000,()=>{
  log("server is running")
})