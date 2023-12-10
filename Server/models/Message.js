const mongoose = require('mongoose')


const MessageSchema = new mongoose.Schema({
    user_name: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    message: String,
    room: String
})


const Message = mongoose.model('Message', MessageSchema)

module.exports = Message