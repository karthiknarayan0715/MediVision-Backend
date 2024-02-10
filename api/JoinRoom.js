const { AlertRoom } = require("../helpers/AlertRoom")
const { Room, Connection } = require("../models/Models")
const {createJWT} = require("../helpers/Jwt")

const JoinRoom = async (ws, req)=>{
    try {
        let room = await Room.findOne({roomCode: req.data.roomCode})
        if(room == null){
            ws.send(JSON.stringify({type: "feedback", message: "Room not found"}))
        }
        else{
            const cur_connection = await Connection.findOne({connectionId: ws.id})
            cur_connection.isHost = false
            await cur_connection.save()
            room.connections.push(cur_connection)
            await room.save()
            const token = await createJWT(ws.id);
            await AlertRoom(room.roomCode, {type: "new_member", data: {name: ws.name},  room_data: room})
            ws.send(JSON.stringify({type: "room_join_successful", roomCode: room.roomCode, room_data: room, jwt:token }))
        }   
    }
    catch(err){
        console.log(err)
    }
}

module.exports = {JoinRoom}