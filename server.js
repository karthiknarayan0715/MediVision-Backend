const WebSocketServer = require("ws").WebSocketServer
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const Connections = require("./models/Models").Connections;
const {v4: uuidv4} = require("uuid")
const url = require('url');
const uri = "mongodb://localhost:27017/SIH_Dev"

const EditName = require("./api/EditName.js").EditName
const CreateRoom = require("./api/CreateRoom.js").CreateRoom

mongoose.connect(uri).then(()=>{
    console.log("Connected to MongoDB!")
});


//HELPS US USE THE .env FILE IN OUR CODE
dotenv.config()

//HANDLES EVERY REQUEST 
const HandleMessage = (ws, req)=>{
    const func = req.type.charAt(0).toUpperCase() + req.type.slice(1)
    eval(func)(ws, req)
}


const wss = new WebSocketServer({
    host: process.env.HOST,
    port: process.env.PORT
})
console.log("THE SERVER IS UP AND RUNNING ON PORT "+process.env.PORT)


wss.on('connection', (ws, req)=>{
    const queryObject = url.parse(req.url, true).query;
    console.log(queryObject.name + " CONNECTED")
    let uuid = uuidv4();
    ws.id = uuid
    ws.name = queryObject.name
    Connections[uuid] = ws

    //TELLING THE CLIENT THE CONNECTION IS SUCCESSFUL
    ws.send(JSON.stringify({
        type: "connection_successful",
        message: "Client connected successfully",
        data: {
            result: "success",
            user_id: uuid
        }
    }))

    //HANDLING MESSAGES
    ws.on("message", async (message)=>{
        const req = await JSON.parse(message)
        HandleMessage(ws, req)
    })

    //HANDLING CLIENT DISCONNECTION
    ws.on('close', ()=>{
        console.log(`${ws.name} DISCONNECTED | ${ws.id}`)
    })
})