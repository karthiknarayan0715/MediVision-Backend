const AlertRoom = require("../helpers/AlertRoom").AlertRoom

const UpdateCanvas = async (ws, req)=>{
    try
    {
        AlertRoom(req.data.room_code, {type: "update_canvas", canvas_data: req.data.canvasData})
    }
    catch (err)
    {
        ws.send(JSON.stringify({type: "SERVER ERROR"}))
        return;
    }
    
}

module.exports = {UpdateCanvas}