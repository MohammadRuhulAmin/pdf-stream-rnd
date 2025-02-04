const { log } = require('node:console');
const http = require('node:http');


const server = http.createServer();

server.on("request",(request,response)=>{
     log("request.headers: ",request.headers)
     
    let data = ""
    request.on("data",(chunk)=>{
        data += chunk 
    })
    request.on("end",()=>{
        log("When Stream End: ", data)
        response.writeHead(200,{"Content-Type":"application/json"})
        response.end(JSON.stringify({message:"200"}))
    })
    
})

server.listen(3000,()=>{log('server is running')})