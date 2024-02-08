const { Connection } = require("../models/Models")

const EditName = async (ws, req)=>{
    ws.name = req.data.name
    try{
        let connectionModel = await Connection.findOne({connectionId: ws.id})
        connectionModel.name = req.data.name
        await connectionModel.save()
        ws.send(JSON.stringify({type: "feedback", status: "200", message: "Name changed successfully"}))
    }
    catch(err){
        ws.send(JSON.stringify({type: "feedback", status: "500", message: "Internal Server Error" + err}))
    }
}

module.exports = {EditName}