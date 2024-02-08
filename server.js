const WebSocketServer = require("ws").WebSocketServer
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const Connections = require("./models/Models").Connections;
const Connection = require("./models/Models").Connection;
const {v4: uuidv4} = require("uuid")
const url = require('url');
//HELPS US USE THE .env FILE IN OUR CODE
dotenv.config()

const EditName = require("./api/EditName.js").EditName
const CreateRoom = require("./api/CreateRoom.js").CreateRoom
const JoinRoom = require("./api/JoinRoom.js").JoinRoom

mongoose.connect(process.env.DB_URI).then(()=>{
    console.log("Connected to MongoDB!")
});


//HANDLES EVERY REQUEST 
const HandleMessage = (ws, req)=>{
    const func = req.type.charAt(0).toUpperCase() + req.type.slice(1)
    eval(func)(ws, req)
}


const wss = new WebSocketServer({
    // host: process.env.HOST,
    port: process.env.PORT
})
console.log("THE SERVER IS UP AND RUNNING ON PORT "+process.env.PORT)


wss.on('connection', async (ws, req)=>{
    const queryObject = url.parse(req.url, true).query;
    console.log(queryObject.name + " CONNECTED")
    let uuid = uuidv4();
    ws.id = uuid
    ws.name = queryObject.name
    Connections[uuid] = ws

    try{
        let new_connection = new Connection({
            name: ws.name,
            connectionId: ws.id,
        }) 
        await new_connection.save()
        //TELLING THE CLIENT THE CONNECTION IS SUCCESSFUL
        ws.send(JSON.stringify({
            type: "connection_successful",
            message: "Client connected successfully",
            data: {
                result: "success",
                user_id: uuid
            }
        }))
    }
    catch(err){
        ws.send(JSON.stringify({
            type: "connection_failed",
            message: "Internal Server Error: " + err,
            data: {
                result: "success",
                user_id: uuid
            }
        }))
    }

    

    //HANDLING MESSAGES
    ws.on("message", async (message)=>{
        const req = await JSON.parse(message)
        HandleMessage(ws, req)
    })

    //HANDLING CLIENT DISCONNECTION
    ws.on('close', async ()=>{
        try{
            await Connection.deleteOne({connectionId: ws.id})
        }
        catch(err){
            console.error("ERROR: " + err)
        }
        console.log(`${ws.name} DISCONNECTED | ${ws.id}`)
    })
})