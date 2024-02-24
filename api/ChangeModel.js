const {Room} = require('../models/Models');
const {AlertRoom} = require("../helpers/AlertRoom");

const ChangeModel = async (ws, req) => {
  try {
    const { room_code, model } = req.data;
    const updatedRoom = await Room.findOneAndUpdate(
      { roomCode: room_code },
      { $set: { model: model } },
      { new: true } // To return the updated document
    );

    // Notify room participants about the model change
    AlertRoom(room_code, { type: 'change_model', model: model });
  } catch (err) {
    console.error(err);
  }
};

module.exports = { ChangeModel };
