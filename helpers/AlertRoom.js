const { Room, Connection, Connections } = require("../models/Models")

const AlertRoom = async (room_code, message)=>{
    try{
        let RoomModel = await Room.findOne({roomCode: room_code})
        console.log(RoomModel)
        RoomModel.connections.forEach(async (participant, index) => {
            console.log(participant)
            Connections[participant.connectionId].send(JSON.stringify(message))
        })
    }
    catch(err){
        console.log(err)
    }
}

module.exports = {AlertRoom}