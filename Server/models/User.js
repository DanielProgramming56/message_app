const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    user_name: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: String,
    profile_img: String,
    chats: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Message'
    }]
})


const User = mongoose.model('User', UserSchema)

module.exports = User
