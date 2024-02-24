const {mongoose} = require("mongoose");

const connectionsSchema = mongoose.Schema({
    name: String,
    connectionId: String,
    peerId: String,
    isHost: Boolean
})

const roomSchema = mongoose.Schema({
    roomCode: String,
    model: String,
    connections: [connectionsSchema]
})

const Connection = mongoose.model('Connection', connectionsSchema)
const Room = mongoose.model('Room', roomSchema)

let Connections = {}

module.exports = {Connections, Connection, Room}