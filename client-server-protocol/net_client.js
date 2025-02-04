const net = require('node:net');
const {log} = require('node:console')

const socket = net.createConnection({host:"localhost",port :3000},()=>{
    socket.write("This is good ")
})

socket.on("data",(chunk)=>{
    log(chunk.toString())
    socket.end()
})


socket.on("end",()=>{
    log("connection closed")
})