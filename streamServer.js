const express = require('express');
const app = express();
const dotenv = require("dotenv")
const cors = require('cors');
const server = require('http').Server(app);
dotenv.config()
const port = process.env.STREAM_SERVER_PORT


const {ExpressPeerServer} = require('peer');

const peer = ExpressPeerServer(server , {
  debug:true
});

app.use(cors());
app.use('/peerjs', peer);

server.listen(port ,()=>{
  console.log("Stream Server running on port : " + port);
})