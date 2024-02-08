const {mongoose} = require("mongoose");

const connectionsSchema = mongoose.Schema({
    name: String,
    connectionId: String
})

const roomSchema = mongoose.Schema({
    roomCode: String,
    connections: [String]
})

const Connection = mongoose.model('Connection', connectionsSchema)
const Room = mongoose.model('Room', roomSchema)

let Connections = {}

module.exports = {Connections, Connection, Room}