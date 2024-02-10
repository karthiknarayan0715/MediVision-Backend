const { GenerateRandomCode } = require("../helpers/RandomCode")
const { Room, Connection } = require("../models/Models")
const {createJWT} = require("../helpers/Jwt")

const CreateRoom = async (ws, req)=>{
    try
    {
        const roomCode = GenerateRandomCode(6)
        const cur_connection = await Connection.findOne({connectionId: ws.id})
        cur_connection.isHost = true
        await cur_connection.save()
        const new_room = new Room({roomCode: roomCode, connections: [cur_connection]})
        await new_room.save();
        const token = await createJWT(ws.id);
        ws.send(JSON.stringify({type: "room_creation_successful", roomCode: roomCode, room_data: new_room,jwt:token}))
    }
    catch (err)
    {
        console.log(err);
        ws.send(JSON.stringify({type: "SERVER ERROR"}))
        return;
    }
    
}

module.exports = {CreateRoom}