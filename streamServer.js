const express = require('express');
const mongoose = require("mongoose")
const app = express();
const dotenv = require("dotenv")
const server = require('http').Server(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});
dotenv.config()
const port = process.env.STREAM_SERVER_PORT;

const { Room, Connection } = require("./models/Models")

mongoose.connect(process.env.DB_URI).then(()=>{
  console.log("Connected to MongoDB!")
});

const {ExpressPeerServer} = require('peer');

const peer = ExpressPeerServer(server , {
  debug:true
});

app.use('/peerjs', peer);

io.on("connection" , (socket)=>{
  const { Id } = socket.handshake.query;
  socket.on('newUser' , async(id , roomCode)=>{
    let room = await Room.findOne({roomCode:roomCode});
    if(room == null) return;
    if(!room.connections.includes(Id)) return;
    socket.join(roomCode);
    socket.to(roomCode).emit('userJoined' , Id);
    socket.on('disconnect' , ()=>{
        socket.to(room).emit('userDisconnect' , Id);
    })
  })
})

server.listen(port ,()=>{
  console.log("Stream Server running on port : " + port);
})
