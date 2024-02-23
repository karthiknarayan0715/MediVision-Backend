const AlertRoom = require("../helpers/AlertRoom").AlertRoom

const ChatMessage = async (ws, req)=>{
    try
    {
        AlertRoom(req.data.room_code, {type: "new_message", sender: req.data.sender, message: req.data.message})
    }
    catch (err)
    {
        console.log(err)
    } 
}

module.exports = {ChatMessage}