const {mongoose} = require("mongoose");

const connectionsSchema = mongoose.Schema({
    name: String,
    connectionId: String,
    pId: String,
    isHost: Boolean
})

const roomSchema = mongoose.Schema({
    roomCode: String,
    connections: [connectionsSchema]
})

const Connection = mongoose.model('Connection', connectionsSchema)
const Room = mongoose.model('Room', roomSchema)

let Connections = {}

module.exports = {Connections, Connection, Room}