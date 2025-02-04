const http = require("node:http");
const fs = require("node:fs/promises");
const { log } = require("node:console");

const server = http.createServer();

server.on("request", async (request, response) => {
  if (request.url === "/text" && request.method === "GET") {
    response.setHeader("Content-Type", "text/html");

    const fileHandleRead = await fs.open("./index.html", "r");
    const fileReadStream = fileHandleRead.createReadStream({highWaterMark:1000});
    fileReadStream.on("data",(chunk)=>{
        setTimeout(()=>{
            log(chunk)
            response.write(chunk)

        },100)
        
    })
    // setTimeout(()=>{
    //     log(response)
    //     fileReadStream.pipe(response);
    // },10000)
    
  }

  if (request.url === "/videos" && request.method === "GET") {
    
    log(response)
    response.setHeader("Content-Type", "video/mp4");

    const fileHandle = await fs.open("../source/source.mp4", "r");
    const fileStream = fileHandle.createReadStream({highWaterMark:1000});
    

    fileStream.on("data",(chunk)=>{
        response.write(chunk)
        // log(chunk)
    })
    // fileStream.pipe(response);
  }

  if (request.url === "/download" && request.method === "GET") {
    response.setHeader("Content-Type", "text/javascript");

    const fileHandle = await fs.open("./public/scripts.js", "r");
    const fileStream = fileHandle.createReadStream();

    fileStream.pipe(response);
  }
});

server.listen(9000, () => {
  console.log("Web server is live at http://localhost:9000");
});
