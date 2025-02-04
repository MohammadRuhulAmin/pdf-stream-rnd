const http = require('node:http')
const {log} = require('node:console')
const agent = new http.Agent({keepAlive: true})

const request = http.request({
    agent:agent,
    hostname:"localhost",
    port:3000,
    method:"POST",
    path: "/create-post",
    headers:{
        "Content-Type":"application/json",
        //  "Content-Length":Buffer.length
    }

})

request.on("response",(response)=>{
    let data = ""
    response.on("data",(chunk)=>{
        data += chunk
    })
    response.on("end",()=>{
        log(data)
    })
})

request.write(JSON.stringify({message:"hi!"}))
request.write(JSON.stringify({message:"how are you!"}))
request.end();
