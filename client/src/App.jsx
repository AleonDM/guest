import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'
import Home from './components/home/home'
import ChatPage from './components/chat'

const socket = io('https://guest-xi.vercel.app', {
  transports: ['websocket', 'polling'],
  path: '/socket.io/',
  withCredentials: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  autoConnect: true
})

socket.on('connect', () => {
  console.log('Connected to server')
})

socket.on('connect_error', (error) => {
  console.error('Connection error:', error.message)
})

socket.on('disconnect', (reason) => {
  console.log('Disconnected:', reason)
})

function App() {
  const [user, setUser] = useState(localStorage.getItem('user'))

  useEffect(() => {
    const handleConnect = () => {
      console.log('Connected to server')
    }

    const handleDisconnect = () => {
      console.log('Disconnected from server')
    }

    const handleError = (err) => {
      console.log('Connection error:', err)
      // Попробуем переподключиться через polling если websocket не работает
      if (socket.io.opts.transports[0] === 'websocket') {
        socket.io.opts.transports = ['polling', 'websocket']
        socket.connect()
      }
    }

    socket.on('connect', handleConnect)
    socket.on('disconnect', handleDisconnect)
    socket.on('connect_error', handleError)

    return () => {
      socket.off('connect', handleConnect)
      socket.off('disconnect', handleDisconnect)
      socket.off('connect_error', handleError)
    }
  }, [])

  return user ? <ChatPage socket={socket} /> : <Home socket={socket} setUser={setUser} />
}

export default App
