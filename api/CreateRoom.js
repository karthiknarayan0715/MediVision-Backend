const { GenerateRandomCode } = require("../helpers/RandomCode")
const { Room } = require("../models/Models")

const CreateRoom = async (ws, req)=>{
    try
    {
        const roomCode = GenerateRandomCode(6)
        const new_room = new Room({roomId: roomCode, connections: [ws.id]})
        await new_room.save();
        ws.send(JSON.stringify({type: "room_creation_successful", roomCode: roomCode}))
    }
    catch (err)
    {
        console.log(err);
        ws.send(JSON.stringify({type: "SERVER ERROR"}))
        return;
    }
    
}

module.exports = {CreateRoom}