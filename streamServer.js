// const express = require('express');
// const app = express();
// const server = require('http').Server(app);
// const io = require('socket.io')(server);
// const port = 3002;

// const {ExpressPeerServer} = require('peer')
// const peer = ExpressPeerServer(server , {
//   debug:true
// });
// app.use('/peerjs', peer);

// io.on("connection" , (socket)=>{
//   socket.on('newUser' , (id , room)=>{
//     socket.join(room);
//     socket.to(room).emit('userJoined' , id);
//     socket.on('disconnect' , ()=>{
//         socket.to(room).emit('userDisconnect' , id);
//     })
//   })
// })
// server.listen(port , '0.0.0.0',()=>{
//   console.log("Server running on port : " + port);
// })
