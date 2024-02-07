const {mongoose} = require("mongoose");

const connectionsSchema = mongoose.Schema({
    name: String,
    connectionId: String
})

const roomSchema = mongoose.Schema({
    roomCode: String,
    connections: [String]
})

const Connection = mongoose.model('connections', connectionsSchema)
const Room = mongoose.model('rooms', roomSchema)

let Connections = {}

module.exports = {Connections, Connection, Room}