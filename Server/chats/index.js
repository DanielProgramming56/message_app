const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const Message = require('../models/Message')
const { v4: uuidv4 } = require('uuid')

const app = express()
const server = http.createServer(app)
const io = socketIo(server)

const messageConnection = () => {
    io.on('connection', (socket) => {
        console.log('A user connected');

        // Generate a unique room name using
        const room = uuidv4()

        // Listen for joining a room
        socket.join(room)
        console.log('User joined room: ${room}');

        socket.on('chat message', async (msg) => {
            const newMessage = new Message({ ...msg, room })
            await newMessage.save()


            io.to(room).emit('chat message', msg)
        })

        socket.on('disconnect', () => {
            console.log('User disconnected');
        })
    })
}

module.exports = { messageConnection }