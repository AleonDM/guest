const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["*"],
        credentials: false
    },
    transports: ['polling', 'websocket'],
    allowEIO3: true,
    path: '/socket.io/'
})

const cors = require('cors')

app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['*']
}))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', '*')
    if (req.method === 'OPTIONS') {
        res.sendStatus(200)
    } else {
        next()
    }
})

app.get('/api', (req, res) => {
    res.json({
        message: 'Hello'
    })
})

const users = []

io.on('connection', (socket) => {
    console.log(`${socket.id} зашел`)
    
    socket.on('message', (data) => {
        io.emit('response', data)
    })

    socket.on('typing', (data) => socket.broadcast.emit('responseTyping', data))

    socket.on('newUser', (data) => {
        users.push(data)
        io.emit('responseNewUser', users)
    })

    socket.on('disconnect', () => {
        console.log(`${socket.id} вышел`)
    })
})

const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})