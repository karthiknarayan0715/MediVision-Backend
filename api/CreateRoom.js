const { GenerateRandomCode } = require("../helpers/RandomCode")
const { Room } = require("../models/Models")

const CreateRoom = (ws, req)=>{
    const roomCode = GenerateRandomCode(6)
    const new_room = new Room({roomId: roomCode, connections: [ws.id]})

    ws.send(JSON.stringify({type: "room_creation_successful", roomCode: roomCode}))
}

module.exports = {CreateRoom}