const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
    cors: {
        origin: ["https://guest-cw8g.vercel.app", "http://localhost:5173"],
        methods: ["GET", "POST"],
        credentials: true
    },
    path: '/socket.io/',
    transports: ['websocket', 'polling']
})

const cors = require('cors')

app.use(cors({
    origin: ["https://guest-cw8g.vercel.app", "http://localhost:5173"],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

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