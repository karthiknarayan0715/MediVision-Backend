const { Room, Connection, Connections } = require("../models/Models")

const AlertRoom = async (room_code, message)=>{
    try{
        let RoomModel = await Room.findOne({roomCode: room_code})
        RoomModel.connections.forEach(async (participant, index) => {
            Connections[participant.connectionId].send(JSON.stringify(message))
        })
    }
    catch(err){
        console.log(err)
    }
}

module.exports = {AlertRoom}