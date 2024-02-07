const EditName = (ws, req)=>{
    ws.name = req.data.name
    console.log(req.data.name)
    ws.send(JSON.stringify({type: "feedback", status: "200", message: "Name changed successfully"}))
}

module.exports = {EditName}