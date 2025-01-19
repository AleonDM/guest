const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const http = require('http').Server(app)
const cors = require('cors')

app.use(cors({
    origin: 'https://guest-cw8g.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}))

// Handle preflight requests
app.options('*', cors())

const socketIO = require('socket.io')(http, {
    pingTimeout: 60000,
    cors: {
        origin: 'https://guest-cw8g.vercel.app',
        methods: ['GET', 'POST'],
        credentials: true
    }
})

app.get('/api', (req, res) => {
    res.json({
        message: 'Hello'
    })
})

const users = []

socketIO.on('connection', (socket) => {
    console.log(`${socket.id} зашел`)
    
    socket.on('message', (data) => {
        socketIO.emit('response', data)
    })

    socket.on('typing', (data) => socket.broadcast.emit('responseTyping', data))

    socket.on('newUser', (data) => {
        users.push(data)
        socketIO.emit('responseNewUser', users)
    })

    socket.on('disconnect', () => {
        console.log(`${socket.id} вышел`)
    })
})

http.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})