import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'
import Home from './components/home/home'
import ChatPage from './components/chat'

const socket = io('https://guest-xi.vercel.app', {
  transports: ['websocket'],
  secure: true,
  rejectUnauthorized: false,
  path: '/socket.io/',
  withCredentials: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000
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
    socket.on('connect_error', (err) => {
      console.log('Connection error:', err)
    })

    socket.on('connect', () => {
      console.log('Connected to server')
    })

    socket.on('disconnect', () => {
      console.log('Disconnected from server')
    })

    return () => {
      socket.off('connect_error')
      socket.off('connect')
      socket.off('disconnect')
    }
  }, [])

  return user ? <ChatPage socket={socket} /> : <Home socket={socket} setUser={setUser} />
}

export default App
