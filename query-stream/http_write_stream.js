const http = require('node:http')
const fs = require('node:fs/promises')


const server = http.createServer();

server.on("request",async (request,response)=>{
    if(request.url === "/" && request.method === "GET"){
        response.setHeader("Content-Type","text/html");
        // const fileHandle = await fs.open("./public/index.html","r")
        const fileHandle = await fs.open("../source/source.mp4","r")
        const filestream = fileHandle.createReadStream()
        filestream.pipe(response)
    }
})


server.listen(3000);